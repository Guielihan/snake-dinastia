import React, { useState } from 'react';
import { UserProfile } from '../types';

interface LoginFormProps {
  onLogin: (profile: UserProfile) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin, isDarkMode, toggleTheme }) => {
  const [nickname, setNickname] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Outro');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname || !age) return;

    // Create base profile without AI title
    const baseProfile: UserProfile = { nickname, age, gender };
    onLogin(baseProfile);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 w-full max-w-md mx-auto">
      
      <div className="relative w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 p-8 rounded-2xl shadow-2xl transition-colors duration-300">
        
        {/* Theme Toggle Inside Card */}
        <button 
          onClick={toggleTheme}
          className="absolute top-4 right-4 p-2 rounded-lg bg-gray-100 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          title="Alternar Tema"
        >
          {isDarkMode ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
          )}
        </button>

        <div className="mb-8 text-center mt-2">
          <h1 className="text-4xl font-bold text-green-500 dark:text-green-400 pixel-font mb-2">SNAKE.AI</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Entre na arena ao vivo</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Apelido</label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
              placeholder="Ex: CobraRei"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Idade</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 outline-none transition-all"
                placeholder="Ex: 25"
                required
                min="1"
                max="120"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gênero</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 outline-none transition-all"
              >
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
                <option value="Não-binário">Não-binário</option>
                <option value="Outro">Outro</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl font-bold text-lg tracking-wide transition-all transform hover:scale-[1.02] active:scale-[0.98] bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white shadow-lg shadow-green-500/30 dark:shadow-green-900/50"
          >
            INICIAR SESSÃO
          </button>
          <button
            type="button"
            className="w-full mt-2 py-3 rounded-xl font-bold text-base tracking-wide transition-all transform hover:scale-[1.02] active:scale-[0.98] bg-gradient-to-r from-[#53d22d] to-[#1e2b1a] hover:from-green-400 hover:to-emerald-500 text-white shadow-md border border-primary/40"
            onClick={() => window.dispatchEvent(new CustomEvent('navigate-to-ranking'))}
          >
            RANKING
          </button>
        </form>

        <div className="mt-6 text-center text-xs font-mono text-gray-400 dark:text-gray-600 opacity-75">
          dev: guielihan
        </div>
      </div>
    </div>
  );
};