
import React, { useState, useEffect } from 'react';
import { LoginForm } from './components/LoginForm';
import { SnakeGame } from './components/SnakeGame';
import RankingPage from './components/RankingPage';
import { UserProfile } from './types';

export default function App() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showRanking, setShowRanking] = useState(false);

  useEffect(() => {
    const handleRanking = () => setShowRanking(true);
    window.addEventListener('navigate-to-ranking', handleRanking);
    return () => window.removeEventListener('navigate-to-ranking', handleRanking);
  }, []);

  const handleLogin = (profile: UserProfile) => {
    setUser(profile);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleBackFromRanking = () => {
    setShowRanking(false);
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen transition-colors duration-300 bg-gray-100 text-gray-900 dark:bg-[#0a0a0f] dark:text-gray-100 font-sans">
        {showRanking ? (
          <RankingPage onBack={handleBackFromRanking} />
        ) : !user ? (
          <LoginForm onLogin={handleLogin} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        ) : (
          <SnakeGame user={user} onLogout={handleLogout} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        )}
      </div>
    </div>
  );
}