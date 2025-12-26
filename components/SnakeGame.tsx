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

  return (
    <div className="flex flex-col items-center min-h-screen w-full bg-gray-100 dark:bg-[#0a0a0f] text-gray-900 dark:text-gray-100 p-4 overflow-hidden touch-none select-none font-sans transition-colors duration-300">
      {/* Voltar para tela inicial */}
      <div className="w-full flex justify-start" style={{ width: 'min(90vw, 500px)' }}>
        <button
          className="inline-flex items-center justify-center mt-2 ml-2 w-9 h-9 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-700 shadow"
          title="Voltar para início"
          onClick={onLogout}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 24 }}>arrow_back_ios_new</span>
        </button>
      </div>
      {/* Header */}
      <header 
        className="flex justify-between items-center mb-4 bg-white/80 dark:bg-gray-900/80 p-4 rounded-xl border border-gray-200 dark:border-gray-800 shadow-xl backdrop-blur-md transition-colors duration-300"
        style={{ width: 'min(90vw, 500px)' }}
      >
        <div className="flex-1 min-w-0 mr-2">
          <h2 className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Jogador</h2>
          <div className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-cyan-500 dark:from-green-400 dark:to-cyan-400 text-sm md:text-lg leading-tight truncate">
            {user.nickname}
          </div>
        </div>
        
        <div className="flex items-center gap-3 md:gap-8 flex-shrink-0">
          {/* Theme Toggle in Header */}
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors hidden xs:block"
          >
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
          <div className="text-right hidden sm:block">
            <h2 className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Pontos</h2>
            <div className="font-bold text-xl font-mono text-green-600 dark:text-green-400 drop-shadow-[0_0_5px_rgba(34,197,94,0.5)]">{score}</div>
          </div>
          <button
            onClick={() => setIsPaused(p => !p)}
            className="ml-2 p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            title={isPaused ? 'Continuar' : 'Pausar'}
          >
            {isPaused ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" /></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
            )}
          </button>
        </div>
      </header>
  const lastProcessedDirection = useRef<Direction>(Direction.RIGHT); 

  // Initialize
  useEffect(() => {
    const initData = async () => {
      const stored = localStorage.getItem('snake_highscore');
      if (stored) setHighScore(parseInt(stored, 10));
    };
    initData();
  }, []); 

  // Countdown Logic
  useEffect(() => {
    if (status === GameStatus.COUNTDOWN) {
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            playSound.start();
            setStatus(GameStatus.PLAYING);
            return 3;
          }
          playSound.countdown();
          return prev - 1;
        });
      }, 800);
      return () => clearInterval(interval);
    }
  }, [status]);

  // Particle Loop
  useEffect(() => {
    let animationFrame: number;
    if (particles.length > 0) {
      const updateParticles = () => {
        setParticles(prev => prev.map(p => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          life: p.life - 0.05
        })).filter(p => p.life > 0));
        animationFrame = requestAnimationFrame(updateParticles);
      };
      animationFrame = requestAnimationFrame(updateParticles);
    }
    return () => cancelAnimationFrame(animationFrame);
  }, [particles.length]);

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
    const newParticles: Particle[] = [];
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

  const config = DIFFICULTY_CONFIG[difficulty];
  const calculatedSpeed = Math.max(50, config.baseSpeed - (score * config.speedMultiplier));
  
  useInterval(
    moveSnake, 
    (status === GameStatus.PLAYING && !isPaused) ? calculatedSpeed : null
  );

  return (
    <div className="flex flex-col items-center min-h-screen w-full bg-gray-100 dark:bg-[#0a0a0f] text-gray-900 dark:text-gray-100 p-4 overflow-hidden touch-none select-none font-sans transition-colors duration-300">
      
      {/* Header */}
      <header 
        className="flex justify-between items-center mb-4 bg-white/80 dark:bg-gray-900/80 p-4 rounded-xl border border-gray-200 dark:border-gray-800 shadow-xl backdrop-blur-md transition-colors duration-300"
        style={{ width: 'min(90vw, 500px)' }}
      >
        <div className="flex-1 min-w-0 mr-2">
          <h2 className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Jogador</h2>
          <div className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-cyan-500 dark:from-green-400 dark:to-cyan-400 text-sm md:text-lg leading-tight truncate">
            {user.nickname}
          </div>
        </div>
        
        <div className="flex items-center gap-3 md:gap-8 flex-shrink-0">
          {/* Theme Toggle in Header */}
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors hidden xs:block"
          >
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
          
          <button 
            onClick={togglePause}
            className={`ml-1 p-3 rounded-lg border transition-all active:scale-95 shadow-md ${
              isPaused 
              ? 'bg-yellow-100 dark:bg-yellow-500/20 border-yellow-400 dark:border-yellow-500 text-yellow-600 dark:text-yellow-400' 
              : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
            disabled={status !== GameStatus.PLAYING}
          >
            {isPaused ? (
              // Play Icon (Resume)
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            ) : (
              // Pause Icon
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                 <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Game Board Container */}
      <div 
        className={`relative bg-gray-200 dark:bg-gray-900 rounded-xl border-4 ${shake ? 'border-red-500 translate-x-1' : 'border-gray-300 dark:border-gray-800'} shadow-2xl overflow-hidden touch-none transition-all duration-300`}
        style={{
          width: 'min(90vw, 500px)',
          height: 'min(90vw, 500px)',
          boxShadow: isDarkMode ? '0 0 40px rgba(0,0,0,0.6)' : '0 10px 30px rgba(0,0,0,0.1)'
        }}
      >
        {/* Game Grid */}
        <div 
          className="absolute inset-0"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
            gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
          }}
        >
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
            const x = i % GRID_SIZE;
            const y = Math.floor(i / GRID_SIZE);
            const isFood = food.x === x && food.y === y;
            const isSnakeHead = snake[0].x === x && snake[0].y === y;
            const isSnakeBody = snake.some((s, idx) => idx !== 0 && s.x === x && s.y === y);

            return (
              <div key={i} className="relative w-full h-full">
                {/* Subtle Grid Lines */}
                <div className="absolute inset-0 border-[0.5px] border-gray-300/50 dark:border-gray-800/30"></div>

                {isFood && (
                  <div className="absolute inset-1.5 bg-red-500 rounded-full shadow-[0_0_15px_rgba(239,68,68,0.8)] animate-pulse">
                     <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-white rounded-full opacity-50"></div>
                  </div>
                )}
                
                {isSnakeHead && (
                  <div className="absolute inset-0.5 bg-green-500 dark:bg-green-400 rounded-sm z-10 shadow-[0_0_15px_rgba(74,222,128,0.6)]">
                    <div className="absolute top-[20%] right-[20%] w-[20%] h-[20%] bg-black/80 rounded-full" />
                    <div className="absolute top-[20%] left-[20%] w-[20%] h-[20%] bg-black/80 rounded-full" />
                  </div>
                )}
                
                {isSnakeBody && (
                  <div className="absolute inset-0.5 bg-green-700 dark:bg-green-600 rounded-sm opacity-90 shadow-inner" />
                )}
              </div>
            );
          })}
        </div>

        {/* Particles Overlay */}
        {particles.map((p) => (
           <div 
             key={p.id}
             className="absolute w-2 h-2 rounded-full pointer-events-none"
             style={{
                backgroundColor: p.color,
                left: `${(p.x / GRID_SIZE)}%`, // Simplified projection
                top: `${(p.y / GRID_SIZE)}%`,
                opacity: p.life,
                transform: 'translate(-50%, -50%)'
             }}
           />
        ))}

        {/* --- OVERLAYS --- */}

        {/* IDLE */}
        {status === GameStatus.IDLE && (
          <div className="absolute inset-0 z-30 bg-white/80 dark:bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 transition-colors duration-300">
            <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-cyan-500 dark:from-green-400 dark:to-cyan-400 font-bold mb-6 tracking-[0.2em] uppercase text-sm">Dificuldade</h3>
            <div className="grid grid-cols-2 gap-3 w-full max-w-xs mb-8">
              {(Object.keys(DIFFICULTY_CONFIG) as Difficulty[]).map((diff) => (
                <button
                  key={diff}
                  onClick={() => setDifficulty(diff)}
                  className={`p-3 rounded-lg border transition-all text-left group relative overflow-hidden ${
                    difficulty === diff 
                      ? `${DIFFICULTY_CONFIG[diff].color} bg-gray-100 dark:bg-gray-900 shadow-lg` 
                      : 'border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-white dark:hover:bg-gray-800'
                  }`}
                >
                  <div className="font-bold text-sm relative z-10">{DIFFICULTY_CONFIG[diff].label}</div>
                  <div className="text-[10px] opacity-70 group-hover:opacity-100 transition-opacity relative z-10">
                    {DIFFICULTY_CONFIG[diff].desc}
                  </div>
                </button>
              ))}
            </div>
            
            <button 
              onClick={startCountdown}
              className="w-full max-w-xs bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl text-xl shadow-[0_0_30px_rgba(22,163,74,0.4)] transition-all hover:scale-105 active:scale-95"
            >
              JOGAR
            </button>
          </div>
        )}

        {/* COUNTDOWN */}
        {status === GameStatus.COUNTDOWN && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/20 dark:bg-black/40">
            <div className="text-8xl font-black text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-bounce pixel-font">
              {countdown}
            </div>
          </div>
        )}

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
};