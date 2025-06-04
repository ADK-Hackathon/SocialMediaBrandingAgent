import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { useState, useRef, useEffect } from 'react';
import { sendMessageToAgentSSE, extractTextFromResponse } from '../api';

interface Message {
  role: 'user' | 'agent';
  content: string;
  isComplete?: boolean;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'agent', content: 'Hi! I am your social media branding agent. How can I help you today?', isComplete: true }
  ]);
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
    
    // Create placeholder for agent's response
    const agentPlaceholder: Message = { role: 'agent' as const, content: '', isComplete: false };
    setMessages(prev => [...prev, agentPlaceholder]);
    
    setInputMessage('');
    setIsLoading(true);

    // Send message to agent
    const cleanup = sendMessageToAgentSSE(
      inputMessage,
      "u_123",
      "s_123",
      {
        onData: (response) => {
          const text = extractTextFromResponse(response);
          const chunkId = response.id;
          if (text) {
            setMessages(prev => {
              const newMessages = [...prev];
              const lastMessage = newMessages[newMessages.length - 1];
              if (lastMessage.role === 'agent' && !lastMessage.isComplete && lastChunkId.current !== chunkId) {
                lastChunkId.current = chunkId;
                lastMessage.content += text;
              }
              return newMessages;
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
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
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
        ))}
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