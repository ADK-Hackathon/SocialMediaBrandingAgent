import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [goal, setGoal] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (goal.trim()) {
      // Here you could also pass the goal to the main page, e.g., via state
      navigate('/main');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white font-sans">
      <h1 className="text-5xl font-semibold mb-4 text-center">Your AI Social Media Manager</h1>
      <p className="text-xl text-gray-400 mb-10 text-center">
        Enter your goal and let our AI create the perfect branding for you.
      </p>
      <div className="flex w-full max-w-lg">
        <input
          type="text"
          className="flex-grow p-4 text-base border border-gray-700 rounded-l-lg bg-gray-900 text-white outline-none focus:border-white"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="e.g., 'Grow my tech startup's audience'"
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        />
        <button
          className="p-4 text-base font-medium border border-gray-700 border-l-0 rounded-r-lg bg-white text-black cursor-pointer transition-colors hover:bg-gray-300"
          onClick={handleSubmit}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
