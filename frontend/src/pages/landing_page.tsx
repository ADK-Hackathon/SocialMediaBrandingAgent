import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Base } from '../base';

const LandingPage = () => {
  const [goal, setGoal] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (goal.trim()) {
      const initialBase: Base = {
        goal: goal.trim(),

        // Context
        trends: {
          value: {
            selected_trend: "",
            trending: []
          },
          enabled: false,
        },
        audiences: {
          value: [],
          enabled: true,
        },
        styles: {
          value: [],
          enabled: false,
        },

        // Intermediate
        guideline: {
          value: "",
          enabled: true,
        },
        image_prompt: {
          value: "",
          enabled: true,
        },
        video_prompt: {
          value: "",
          enabled: true,
        },

        // Artifacts
        twitter_post: {
          value: "",
          enabled: true,
        },
        youtube_post: {
          value: {
            video_url: "",
          },
          enabled: true,
        },
        tiktok_post: {
          value: {
            video_url: "",
          },
          enabled: true,
        },
        instagram_post: {
          value: {
            video_url: "",
          },
          enabled: true,
        },
      };

      navigate('/main', { state: { initialBase } });
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-50 text-gray-900 font-sans overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        {/* Large background shapes */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-indigo-100 rounded-full opacity-30"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-blue-100 rounded-full opacity-40"></div>
        <div className="absolute bottom-32 left-32 w-28 h-28 bg-purple-100 rounded-full opacity-35"></div>
        <div className="absolute bottom-20 right-20 w-36 h-36 bg-indigo-100 rounded-full opacity-25"></div>
        
        {/* Medium shapes */}
        <div className="absolute top-32 left-1/2 w-16 h-16 bg-indigo-200 rounded-lg opacity-50 transform rotate-45"></div>
        <div className="absolute top-1/2 right-40 w-20 h-20 bg-blue-200 rounded-full opacity-40"></div>
        <div className="absolute bottom-1/2 left-40 w-18 h-18 bg-purple-200 rounded-lg opacity-45"></div>
        
        {/* Small accent dots */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-indigo-300 rounded-full"></div>
        <div className="absolute top-3/4 right-1/4 w-6 h-6 bg-blue-300 rounded-full"></div>
        <div className="absolute top-1/2 left-1/6 w-3 h-3 bg-purple-300 rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/3 w-5 h-5 bg-indigo-300 rounded-full"></div>
        
        {/* Mock social media cards */}
        <div className="absolute top-1/3 left-16 bg-white p-6 rounded-xl shadow-lg border border-gray-200 w-64 transform -rotate-3">
          <div className="w-full h-32 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-lg mb-4"></div>
          <div className="w-3/4 h-3 bg-gray-200 rounded mb-2"></div>
          <div className="w-1/2 h-3 bg-gray-200 rounded mb-4"></div>
          <div className="flex space-x-2">
            <div className="w-6 h-6 bg-indigo-200 rounded-full"></div>
            <div className="w-6 h-6 bg-blue-200 rounded-full"></div>
            <div className="w-6 h-6 bg-purple-200 rounded-full"></div>
          </div>
        </div>
        
        <div className="absolute bottom-1/3 right-16 bg-white p-6 rounded-xl shadow-lg border border-gray-200 w-64 transform rotate-2">
          <div className="w-full h-32 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg mb-4"></div>
          <div className="w-3/4 h-3 bg-gray-200 rounded mb-2"></div>
          <div className="w-1/2 h-3 bg-gray-200 rounded mb-4"></div>
          <div className="flex space-x-2">
            <div className="w-6 h-6 bg-purple-200 rounded-full"></div>
            <div className="w-6 h-6 bg-indigo-200 rounded-full"></div>
            <div className="w-6 h-6 bg-blue-200 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-12 shadow-xl border border-white/20 max-w-2xl w-full text-center">
          <h1 className="text-5xl font-semibold mb-4 text-gray-900">
            Your AI Social Media Manager
          </h1>
          <p className="text-xl text-gray-600 mb-10">
            Enter your goal and let our AI create the perfect branding for you.
          </p>
          <div className="flex w-full max-w-lg mx-auto">
            <input
              type="text"
              className="flex-grow p-4 text-base border border-gray-200 rounded-l-lg bg-white text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="e.g., 'Grow my tech startup's audience'"
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            />
            <button
              className="p-4 text-base font-medium rounded-r-lg bg-indigo-600 text-white cursor-pointer transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={handleSubmit}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
