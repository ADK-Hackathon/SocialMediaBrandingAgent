import { PaperAirplaneIcon, ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { useState, useRef, useEffect } from 'react';
import { sendMessageToAgentSSE, extractTextFromResponse } from '../api';
import type { Base, SocialMediaAgentOutput } from '../base';
import type { Dispatch, SetStateAction } from 'react';

interface Message {
  // Role determines how the message is rendered.
  // `base_content` is not rendered as a chat bubble but as a "Restore" button.
  role: 'user' | 'reasoning' | 'base_content' | 'agent';
  content: string;
  isComplete?: boolean;
}

// Define props interface
interface ChatInterfaceProps {
  userId: string;
  sessionId: string;
  base: Base;
  setBase: Dispatch<SetStateAction<Base>>;
}

export default function ChatInterface({ userId, sessionId, base, setBase }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'agent', content: 'Hi! I am your social media branding agent. How can I help you today?', isComplete: true }
  ]);
  const [reasoningCollapsed, setReasoningCollapsed] = useState<Record<number, boolean>>({});
  const lastChunkId = useRef<string | null>(null);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    // Add user message
    const userMessage: Message = { role: 'user' as const, content: inputMessage, isComplete: true };
    setMessages(prev => [...prev, userMessage]);
    
    // Create placeholder for agent's reasoning
    const reasoningPlaceholder: Message = { role: 'reasoning' as const, content: '', isComplete: false };
    setMessages(prev => [...prev, reasoningPlaceholder]);
    
    setInputMessage('');
    setIsLoading(true);

    // Send message to agent
    const cleanup = sendMessageToAgentSSE(
      inputMessage,
      base,      // Use prop
      userId,    // Use prop
      sessionId, // Use prop
      {
        onData: (response) => {
          const text = extractTextFromResponse(response);
          const author = response.author;
          const chunkId = response.id;

          if (!text || lastChunkId.current === chunkId) return;
          lastChunkId.current = chunkId;

          if (author === "social_media_branding_content_agent") {
            setMessages(prev => {
              const lastMessage = prev[prev.length - 1];
              if (lastMessage?.role === 'reasoning' && !lastMessage.isComplete) {
                const updatedLastMessage = { ...lastMessage, content: lastMessage.content + text };
                return [...prev.slice(0, -1), updatedLastMessage];
              }
              return prev;
            });
          } else if (author === "format_agent") {
            setMessages(prev => {
              const lastMessage = prev[prev.length - 1];

              if (lastMessage?.role === 'reasoning' && !lastMessage.isComplete) {
                const updatedReasoningMessage = { ...lastMessage, isComplete: true };
                const newAgentMessage: Message = { role: 'base_content', content: text, isComplete: false };
                
                return [...prev.slice(0, -1), updatedReasoningMessage, newAgentMessage];
              } else if (lastMessage?.role === 'base_content' && !lastMessage.isComplete) {
                const updatedAgentMessage = { ...lastMessage, content: lastMessage.content + text };
                return [...prev.slice(0, -1), updatedAgentMessage];
              }
              
              return prev;
            });
          } else if (author === "response_agent") {
            // If last message is base_content, we can automatically set the base to the updated base.
            if (messages[messages.length - 1].role === 'base_content') {
              const jsonString = messages[messages.length - 1].content
                .replace(/^```json/, "")
                .replace(/```$/, "");
              const agent_output: SocialMediaAgentOutput = JSON.parse(jsonString);
              if (agent_output.is_updated) {
                console.log("Setting base to: ", agent_output.updated_base);
                setBase(agent_output.updated_base);
              }
            }
            setMessages(prev => {
              const lastMessage = prev[prev.length - 1];

              if (lastMessage?.role === 'base_content' && !lastMessage.isComplete) {
                const updatedBaseContentMessage = { ...lastMessage, isComplete: true };
                const newAgentMessage: Message = { role: 'agent', content: text, isComplete: false };
                
                return [...prev.slice(0, -1), updatedBaseContentMessage, newAgentMessage];
              } else if (lastMessage?.role === 'agent' && !lastMessage.isComplete) {
                const updatedAgentMessage = { ...lastMessage, content: lastMessage.content + text };
                return [...prev.slice(0, -1), updatedAgentMessage];
              }
              
              return prev;
            });
          } 
        },
        onError: (error) => {
          console.error('Error from agent:', error);
          setMessages(prev => [
            ...prev,
            { role: 'agent', content: 'Sorry, I encountered an error. Please try again.', isComplete: true }
          ]);
          setIsLoading(false);
        },
        onComplete: () => {
          setMessages(prev => {
            const newMessages = [...prev];
            const lastMessage = newMessages[newMessages.length - 1];
            if (lastMessage.role === 'agent') {
              lastMessage.isComplete = true;
            }
            return newMessages;
          });
          setIsLoading(false);
        }
      }
    );

    // Cleanup on component unmount
    return cleanup;
  };

  return (
    <div className="flex h-full flex-col">
      {/* Conversation History */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message, index) => {
          if (message.role === 'reasoning') {
            const isCollapsed = reasoningCollapsed[index] ?? false;
            return (
              <div key={index} className="w-full my-2 text-gray-500">
                <button
                  onClick={() =>
                    setReasoningCollapsed((prev) => ({
                      ...prev,
                      [index]: !isCollapsed,
                    }))
                  }
                  className="flex items-center text-sm font-medium hover:text-gray-700"
                >
                  {isCollapsed ? (
                    <ChevronRightIcon className="h-4 w-4 mr-1" />
                  ) : (
                    <ChevronDownIcon className="h-4 w-4 mr-1" />
                  )}
                  <span>Agent Reasoning</span>
                </button>
                {!isCollapsed && (
                  <div className="mt-1 p-2 text-sm text-gray-600 border-l-2 border-gray-200 ml-2 pl-2 whitespace-pre-wrap">
                    {message.content}
                    {!message.isComplete && (
                      <span className="inline-block animate-pulse">▋</span>
                    )}
                  </div>
                )}
              </div>
            );
          }
          if (message.role === 'base_content') {
            if (!message.isComplete) return null; // Don't render while streaming
            return (
              <div key={index} className="w-full my-2 flex justify-start">
                <button
                  onClick={() => {
                    try {
                      const jsonString = message.content
                        .replace(/^```json/, "")
                        .replace(/```$/, "");
                      const agent_output: SocialMediaAgentOutput = JSON.parse(jsonString);
                      if (agent_output.is_updated) {
                        console.log("Setting base to: ", agent_output.updated_base);
                        setBase(agent_output.updated_base);
                      }
                    } catch (e) {
                      console.error("Failed to parse and set base from checkpoint", e);
                    }
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 text-sm font-medium"
                >
                  Restore Checkpoint
                </button>
              </div>
            );
          }
          return (
            <div
              key={index}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`rounded-lg p-3 text-sm max-w-[80%] ${
                  message.role === 'user'
                    ? 'bg-indigo-500 text-white'
                    : 'bg-gray-200 text-gray-900'
                }`}
              >
                {message.content}
                {!message.isComplete && (
                  <span className="inline-block animate-pulse">▋</span>
                )}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 bg-white p-4">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !inputMessage.trim()}
            className={`inline-flex items-center justify-center rounded-md border border-transparent ${
              isLoading || !inputMessage.trim()
                ? 'bg-indigo-300 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700'
            } p-2 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
          >
            <PaperAirplaneIcon className="size-5" aria-hidden="true" />
            <span className="sr-only">Send message</span>
          </button>
        </form>
      </div>
    </div>
  );
} 