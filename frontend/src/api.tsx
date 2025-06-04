// Configuration
const API_BASE_URL = "https://socialmediabrandingagent-662824162875.us-west1.run.app";

// Types for the message structure
interface MessagePart {
  text: string;
}

interface Message {
  role: 'user' | 'model';
  parts: MessagePart[];
}

interface AgentRequestPayload {
  appName: string;
  userId: string;
  sessionId: string;
  newMessage: Message;
  streaming: boolean;
}

interface AgentResponse {
  content: {
    parts: Array<{
      text?: string;
      functionCall?: any;
      functionResponse?: any;
    }>;
    role: string;
  };
  invocation_id: string;
  author: string;
  partial: boolean;
  actions: {
    state_delta: Record<string, any>;
    artifact_delta: Record<string, any>;
    requested_auth_configs: Record<string, any>;
  };
  id: string;
  timestamp: number;
}

// Callbacks interface for handling SSE events
interface SSECallbacks {
  onData: (data: AgentResponse) => void;
  onError?: (error: Error) => void;
  onComplete?: () => void;
}

// Main function to send message and handle SSE response
export const sendMessageToAgentSSE = (
  message: string,
  user_id: string,
  session_id: string,
  callbacks: SSECallbacks
) => {
  const payload: AgentRequestPayload = {
    appName: "agents",
    userId: user_id,
    sessionId: session_id,
    newMessage: {
      role: "user",
      parts: [{ text: message }]
    },
    streaming: true
  };

  // Make the POST request and handle the SSE stream
  fetch(`${API_BASE_URL}/run_sse`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'text/event-stream',
    },
    body: JSON.stringify(payload)
  }).then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    if (!response.body) {
      throw new Error('Response body is null');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = ''; // Buffer to hold incomplete lines

    function processLine(line: string) {
      if (line.startsWith('data: ')) {
        try {
          const jsonStr = line.slice(6); // Remove 'data: ' prefix
          const data = JSON.parse(jsonStr) as AgentResponse; // AgentResponse is defined above
          if (data.partial == true) {
            callbacks.onData(data);
          }
        } catch (error) {
          console.error('[SSE PARSE ERROR]', error, 'on line:', line);
          if (callbacks.onError) {
            callbacks.onError(error as Error);
          }
        }
      }
    }

    function readStream() {
      reader.read().then(({done, value}) => {
        if (done) {
          // Process any remaining data in the buffer when the stream is closed.
          if (buffer.trim()) {
            processLine(buffer.trim());
          }
          if (callbacks.onComplete) {
            callbacks.onComplete();
          }
          return;
        }

        // Decode the current chunk and add it to the buffer.
        // Using { stream: true } is important for multi-byte characters.
        buffer += decoder.decode(value, { stream: true });

        // Process all complete lines (ending with \n) in the buffer.
        let newlineIndex;
        while ((newlineIndex = buffer.indexOf('\n')) !== -1) {
          const line = buffer.substring(0, newlineIndex).trim(); // Get the line
          buffer = buffer.substring(newlineIndex + 1); // Remove the line from the buffer

          if (line) { // Process the line if it's not empty
            processLine(line);
          }
        }
        
        // Continue reading the stream
        readStream();
      }).catch(error => {
        console.error('[SSE ERROR]', error);
        if (callbacks.onError) {
          callbacks.onError(error);
        }
      });
    }

    readStream();
  }).catch(error => {
    console.error('[FETCH ERROR]', error);
    if (callbacks.onError) {
      callbacks.onError(error);
    }
  });

  // Return cleanup function
  return () => {
    // If you had an AbortController, you could call abort() here.
    // For now, we'll just signal completion if the callback exists.
    if (callbacks.onComplete) {
      callbacks.onComplete();
    }
  };
};

// Helper function to extract text content from agent response
export const extractTextFromResponse = (response: AgentResponse): string | null => {
  if (response.content?.parts?.[0]?.text) {
    return response.content.parts[0].text;
  }
  return null;
};
