import React, { useState, useEffect } from 'react';
import { LoginForm } from './components/LoginForm';
import { SnakeGame } from './components/SnakeGame';
import { UserProfile } from './types';

export default function App() {
  const [user, setUser] = useState<UserProfile | null>(null);
  // Default to dark mode
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleLogin = (profile: UserProfile) => {
    setUser(profile);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen transition-colors duration-300 bg-gray-100 text-gray-900 dark:bg-[#0a0a0f] dark:text-gray-100 font-sans">
        {!user ? (
          <LoginForm onLogin={handleLogin} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        ) : (
          <SnakeGame user={user} onLogout={handleLogout} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        )}
      </div>
    </div>
  );
}