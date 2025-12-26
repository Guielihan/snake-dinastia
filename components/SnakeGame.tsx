import React, { useState, useEffect, useCallback, useRef } from 'react';
import { UserProfile, GameStatus, Coordinate, Direction, Difficulty } from '../types';
import { GRID_SIZE, getRandomCoordinate, checkCollision } from '../utils/gameUtils';
import { playSound } from '../utils/audioUtils';

interface SnakeGameProps {
  user: UserProfile;
  onLogout: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

// TODO: Adicione aqui todos os hooks, funções e o corpo do componente que estavam fora da função.
export const SnakeGame: React.FC<SnakeGameProps> = ({ user, onLogout, isDarkMode, toggleTheme }) => {
  // Estados e refs principais
  const [snake, setSnake] = useState<Coordinate[]>([
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 },
  ]);
  const [food, setFood] = useState<Coordinate>(getRandomCoordinate([{ x: 10, y: 10 }]));
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => Number(localStorage.getItem('snake_highscore')) || 0);
  const [status, setStatus] = useState<GameStatus>(GameStatus.IDLE);
  const [isPaused, setIsPaused] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty>('normal');
  const [countdown, setCountdown] = useState(3);
  const [particles, setParticles] = useState<any[]>([]);
  const [shake, setShake] = useState(false);
  const currentDirection = useRef(Direction.RIGHT);
  const lastProcessedDirection = useRef(Direction.RIGHT);
  const moveQueue = useRef<Direction[]>([]);

  // Config de dificuldade
  const DIFFICULTY_CONFIG = {
    facil: { label: 'Fácil', desc: 'Para iniciantes', color: 'border-green-400 text-green-600', baseSpeed: 200, speedMultiplier: 2 },
    normal: { label: 'Normal', desc: 'Desafio padrão', color: 'border-blue-400 text-blue-600', baseSpeed: 120, speedMultiplier: 3 },
    dificil: { label: 'Difícil', desc: 'Só para brabos', color: 'border-red-400 text-red-600', baseSpeed: 80, speedMultiplier: 4 },
  };

  // Funções principais
  const startCountdown = () => {
    setSnake([{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }]);
    setFood(getRandomCoordinate([{ x: 10, y: 10 }]));
    currentDirection.current = Direction.RIGHT;
    lastProcessedDirection.current = Direction.RIGHT;
    moveQueue.current = [];
    setParticles([]);
    setScore(0);
    setIsPaused(false);
    setCountdown(3);
    playSound.countdown();
    setStatus(GameStatus.COUNTDOWN);
  };

  const spawnParticles = (x: number, y: number, color: string) => {
    const newParticles: any[] = [];
    for (let i = 0; i < 8; i++) {
      const angle = (Math.PI * 2 * i) / 8;
      newParticles.push({
        id: Math.random(),
        x: x * 100 + 50,
        y: y * 100 + 50,
        vx: Math.cos(angle) * 0.5,
        vy: Math.sin(angle) * 0.5,
        life: 1.0,
        color
      });
    }
    setParticles(prev => [...prev, ...newParticles]);
  };

  const togglePause = () => {
    if (status === GameStatus.PLAYING) {
      setIsPaused(!isPaused);
    }
  };

  const gameOver = () => {
    playSound.die();
    setShake(true);
    setTimeout(() => setShake(false), 500);
    setStatus(GameStatus.GAME_OVER);
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('snake_highscore', score.toString());
    }
  };

  const isValidTurn = (current: Direction, next: Direction) => {
    if (next === Direction.UP && current === Direction.DOWN) return false;
    if (next === Direction.DOWN && current === Direction.UP) return false;
    if (next === Direction.LEFT && current === Direction.RIGHT) return false;
    if (next === Direction.RIGHT && current === Direction.LEFT) return false;
    if (next === current) return false;
    return true;
  };

  const queueMove = (newDir: Direction) => {
    const lastScheduled = moveQueue.current.length > 0 
      ? moveQueue.current[moveQueue.current.length - 1] 
      : lastProcessedDirection.current;
    if (isValidTurn(lastScheduled, newDir)) {
      if (moveQueue.current.length < 3) {
        moveQueue.current.push(newDir);
        playSound.move();
      }
    }
  };

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (e.code === 'Space' || e.key.toLowerCase() === 'p') {
      if (status === GameStatus.PLAYING) togglePause();
      return;
    }
    if (status !== GameStatus.PLAYING || isPaused) return;
    switch (e.key) {
      case 'ArrowUp': queueMove(Direction.UP); break;
      case 'ArrowDown': queueMove(Direction.DOWN); break;
      case 'ArrowLeft': queueMove(Direction.LEFT); break;
      case 'ArrowRight': queueMove(Direction.RIGHT); break;
      case 'w': queueMove(Direction.UP); break;
      case 's': queueMove(Direction.DOWN); break;
      case 'a': queueMove(Direction.LEFT); break;
      case 'd': queueMove(Direction.RIGHT); break;
    }
  }, [status, isPaused]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const moveSnake = () => {
    if (isPaused) return;
    if (moveQueue.current.length > 0) {
      currentDirection.current = moveQueue.current.shift() as Direction;
    }
    lastProcessedDirection.current = currentDirection.current;
    const head = { ...snake[0] };
    switch (currentDirection.current) {
      case Direction.UP: head.y -= 1; break;
      case Direction.DOWN: head.y += 1; break;
      case Direction.LEFT: head.x -= 1; break;
      case Direction.RIGHT: head.x += 1; break;
    }
    if (checkCollision(head, snake)) {
      gameOver();
      return;
    }
    const newSnake = [head, ...snake];
    if (head.x === food.x && head.y === food.y) {
      playSound.eat();
      setScore(s => s + 1);
      setFood(getRandomCoordinate(newSnake));
      spawnParticles(head.x, head.y, '#4ade80');
    } else {
      newSnake.pop();
    }
    setSnake(newSnake);
  };

  // Hook customizado para intervalos
  function useInterval(callback: () => void, delay: number | null) {
    const savedCallback = useRef<() => void>();
    useEffect(() => { savedCallback.current = callback; }, [callback]);
    useEffect(() => {
      if (delay === null) return;
      const id = setInterval(() => savedCallback.current && savedCallback.current(), delay);
      return () => clearInterval(id);
    }, [delay]);
  }

  const config = DIFFICULTY_CONFIG[difficulty];
  const calculatedSpeed = Math.max(50, config.baseSpeed - (score * config.speedMultiplier));
  useInterval(moveSnake, (status === GameStatus.PLAYING && !isPaused) ? calculatedSpeed : null);

  // Countdown
  useEffect(() => {
    if (status === GameStatus.COUNTDOWN && countdown > 0) {
      const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
      return () => clearTimeout(timer);
    } else if (status === GameStatus.COUNTDOWN && countdown === 0) {
      setStatus(GameStatus.PLAYING);
    }
  }, [status, countdown]);

  // Partículas
  useInterval(() => {
    setParticles(prev => prev.filter(p => p.life > 0.1).map(p => ({ ...p, x: p.x + p.vx * 10, y: p.y + p.vy * 10, life: p.life * 0.85 })));
  }, 40);

  // Renderização principal
  return (
    <div className="flex flex-col items-center min-h-screen w-full bg-gray-100 dark:bg-[#0a0a0f] text-gray-900 dark:text-gray-100 p-4 overflow-hidden touch-none select-none font-sans transition-colors duration-300">
      {/* Header */}
      <header className="flex justify-between items-center mb-4 bg-white/80 dark:bg-gray-900/80 p-4 rounded-xl border border-gray-200 dark:border-gray-800 shadow-xl backdrop-blur-md transition-colors duration-300" style={{ width: 'min(90vw, 500px)' }}>
        <div className="flex-1 min-w-0 mr-2">
          <h2 className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Jogador</h2>
          <div className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-cyan-500 dark:from-green-400 dark:to-cyan-400 text-sm md:text-lg leading-tight truncate">{user.nickname}</div>
        </div>
        <div className="flex items-center gap-3 md:gap-8 flex-shrink-0">
          <button onClick={toggleTheme} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors hidden xs:block">
            {isDarkMode ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            )}
          </button>
          <div className="text-right hidden sm:block">
            <h2 className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Recorde</h2>
            <div className="font-bold text-xl font-mono text-yellow-600 dark:text-yellow-500 drop-shadow-[0_0_5px_rgba(234,179,8,0.5)]">{highScore}</div>
          </div>
          <div className="text-right">
            <h2 className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Pontos</h2>
            <div className="font-bold text-xl font-mono text-gray-800 dark:text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">{score}</div>
          </div>
          <button onClick={togglePause} className={`ml-1 p-3 rounded-lg border transition-all active:scale-95 shadow-md ${isPaused ? 'bg-yellow-100 dark:bg-yellow-500/20 border-yellow-400 dark:border-yellow-500 text-yellow-600 dark:text-yellow-400' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`} disabled={status !== GameStatus.PLAYING}>
            {isPaused ? (
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            ) : (
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
            )}
          </button>
        </div>
      </header>
      {/* ...existing code... */}
    </div>
  );
};

        {/* PAUSE */}
        {status === GameStatus.PLAYING && isPaused && (
          <div className="absolute inset-0 z-30 bg-white/40 dark:bg-black/60 backdrop-blur-[2px] flex items-center justify-center">
            <div className="text-4xl font-black text-gray-900 dark:text-white tracking-widest pixel-font animate-pulse drop-shadow-lg">
              PAUSE
            </div>
          </div>
        )}

        {/* GAME OVER */}
        {status === GameStatus.GAME_OVER && (
          <div className="absolute inset-0 z-30 bg-red-100/90 dark:bg-red-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center transition-colors duration-300">
            <h2 className="text-3xl md:text-4xl font-bold text-red-600 dark:text-white mb-2 pixel-font drop-shadow-[0_0_10px_rgba(255,0,0,0.5)] whitespace-nowrap">GAME OVER</h2>
            <div className="bg-white/60 dark:bg-black/40 p-6 rounded-xl mb-8 border border-red-200 dark:border-red-500/30 w-full max-w-[200px]">
              <p className="text-red-800 dark:text-red-300 text-xs uppercase tracking-widest mb-1">Score</p>
              <p className="text-4xl font-mono font-bold text-red-900 dark:text-white">{score}</p>
            </div>
            <button 
              onClick={() => setStatus(GameStatus.IDLE)}
              className="bg-white text-red-900 font-bold py-3 px-10 rounded-full text-lg shadow-xl hover:bg-gray-50 transition transform hover:scale-105 active:scale-95 border border-red-200"
            >
              MENU
            </button>
          </div>
        )}
      </div>

      {/* Mobile Controls */}
      <div className="mt-6 grid grid-cols-3 gap-3 md:hidden w-full max-w-[280px]">
        <div />
        <button className="ctrl-btn bg-white dark:bg-gray-800 active:bg-green-100 dark:active:bg-green-700 h-16 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-800 dark:text-white transition-colors" onPointerDown={(e) => { e.preventDefault(); queueMove(Direction.UP); }}>
          <span className="text-2xl">▲</span>
        </button>
        <div />
        <button className="ctrl-btn bg-white dark:bg-gray-800 active:bg-green-100 dark:active:bg-green-700 h-16 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-800 dark:text-white transition-colors" onPointerDown={(e) => { e.preventDefault(); queueMove(Direction.LEFT); }}>
          <span className="text-2xl">◀</span>
        </button>
        <button className="ctrl-btn bg-white dark:bg-gray-800 active:bg-green-100 dark:active:bg-green-700 h-16 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-800 dark:text-white transition-colors" onPointerDown={(e) => { e.preventDefault(); queueMove(Direction.DOWN); }}>
          <span className="text-2xl">▼</span>
        </button>
        <button className="ctrl-btn bg-white dark:bg-gray-800 active:bg-green-100 dark:active:bg-green-700 h-16 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-800 dark:text-white transition-colors" onPointerDown={(e) => { e.preventDefault(); queueMove(Direction.RIGHT); }}>
           <span className="text-2xl">▶</span>
        </button>
      </div>

      <div className="mt-6 text-xs font-mono text-gray-400 dark:text-gray-600 opacity-75">
        dev: guielihan
      </div>
    </div>
  );
}