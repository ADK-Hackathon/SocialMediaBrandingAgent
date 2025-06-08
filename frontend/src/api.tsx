// Configuration
const API_BASE_URL = "https://socialmediabrandingagent-662824162875.us-west1.run.app";
// const API_BASE_URL = "http://0.0.0.0:8080";

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

// Define the response type for starting a new session
interface StartSessionResponse {
  id: string;
  appName: string;
  userId: string;
  state: Record<string, any>;
  events: any[];
  lastUpdateTime: number;
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

// Function to start a new session
export const startNewSession = async (userId: string): Promise<string> => {
  // Generate a client-side session ID, e.g., using UUID
  const newSessionId = `s_${crypto.randomUUID()}`;
  const requestUrl = `${API_BASE_URL}/apps/agents/users/${userId}/sessions/${newSessionId}`;

  try {
    const response = await fetch(requestUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}), // Sending an empty JSON object as per Content-Type
    });

    if (!response.ok) {
      const errorBody = await response.text();
      // Enhanced error logging with URL
      console.error(`[START SESSION HTTP ERROR ${response.status}]`, errorBody, 'on URL:', requestUrl);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: StartSessionResponse = await response.json();
    if (!data.id) {
      // Enhanced error logging with URL
      console.error('[START SESSION ERROR]', 'id (session_id) not found in response', data, 'on URL:', requestUrl);
      throw new Error('Session ID (id) not found in response.');
    }
    // Optionally, you might want to verify if data.id matches newSessionId
    // For example: if (data.id !== newSessionId) console.warn(...);
    return data.id; // Return the session ID from the backend's response (data.id)
  } catch (error) {
    // Improved catch block to provide more details and avoid re-wrapping Error instances
    if (error instanceof Error) {
        console.error('[START SESSION FETCH ERROR]', error.message, 'on URL:', requestUrl, error);
        throw error;
    } else {
        // Catching non-Error types (e.g., strings) and converting to Error
        const errorMessage = String(error);
        console.error('[START SESSION FETCH ERROR]', errorMessage, 'on URL:', requestUrl, error);
        throw new Error(errorMessage);
    }
  }
};

// Helper function to extract text content from agent response
export const extractTextFromResponse = (response: AgentResponse): string | null => {
  if (response.content?.parts?.[0]?.text) {
    return response.content.parts[0].text;
  }
  return null;
};


interface ParsedChatResponse {
    text?: string;
    imageUrl?: string;
    videoUrl?: string;
}

export function parseChatResponse(responseString: string): ParsedChatResponse {
    try {
        console.log('responseString:', responseString);

        const parsed: ParsedChatResponse = {};

        // Regex to find Text content (anything after "Text: " and before "Image: " or "Video: " or end of string)
        const textMatch = responseString.match(/\*\*text:\*\* "(.*?)"/s);
        if (textMatch && textMatch[1]) {
            parsed.text = textMatch[1].trim();
        }

        // Looks for "URL: " followed by http(s)://... any characters ... .png
        const imageMatch = responseString.match(/(https?:\/\/[^\s"]+\.png)/i);
        if (imageMatch && imageMatch[1]) {
            parsed.imageUrl = imageMatch[1];
        }

        // Looks for "URL: " followed by http(s)://... any characters ... .mp4
        const videoMatch = responseString.match(/(https?:\/\/[^\s"]+\.mp4)/i);
        if (videoMatch && videoMatch[1]) {
            parsed.videoUrl = videoMatch[1];
        }

        return parsed;
    } catch (error) {
        return null;
    }
}
