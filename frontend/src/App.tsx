import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { startNewSession } from './api';
import LandingPage from './pages/landing_page';
import MainPage from './pages/main_page';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/main" element={<MainApp />} />
      </Routes>
    </Router>
  );
}

function MainApp() {
  // TODO: Replace "u_123" with actual user ID retrieval logic
  const [userId, _] = useState<string>("u_123");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeSession = async () => {
      if (userId) { // Ensure userId is available
        try {
          console.log(`Initializing session for user: ${userId}`);
          const newSessionId = await startNewSession(userId);
          setSessionId(newSessionId);
          console.log(`Session started with ID: ${newSessionId}`);
        } catch (err) {
          console.error("Failed to start new session:", err);
          setError(err instanceof Error ? err.message : String(err));
        }
      }
    };

    initializeSession();
  }, [userId]); // Effect runs when userId changes (or once if userId is stable)

  // Optional: Display loading or error states
  if (error) {
    return <div>Error initializing session: {error}. Please try refreshing the page.</div>;
  }

  if (!sessionId) {
    return <div>Loading session...</div>; // Or some other loading indicator
  }

  return (
    <>
      {/* Pass userId and sessionId to MainPage if needed */}
      <MainPage userId={userId} sessionId={sessionId} />
    </>
  );
}

export default App;
