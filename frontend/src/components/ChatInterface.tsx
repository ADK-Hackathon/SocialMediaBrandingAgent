import { PaperAirplaneIcon } from '@heroicons/react/24/outline';

export default function ChatInterface() {
  return (
    <div className="flex h-full flex-col">
      {/* Conversation History */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50">
        {/* Placeholder for messages */}
        <div className="text-center text-gray-400">Conversation history will appear here.</div>
        {/* Example messages (can be removed later) */}
        <div className="flex justify-start">
          <div className="rounded-lg bg-gray-200 p-3 text-sm">
            Hi! I am your social media branding agent. How can I help you today?
          </div>
        </div>
        <div className="flex justify-end">
          <div className="rounded-lg bg-indigo-500 p-3 text-sm text-white">
            Hi there! I would like to create a new social media account for my business.
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 bg-white p-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
          />
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <PaperAirplaneIcon className="size-5" aria-hidden="true" />
            <span className="sr-only">Send message</span>
          </button>
        </div>
      </div>
    </div>
  );
} 