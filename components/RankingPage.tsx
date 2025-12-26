import React, { useEffect, useState } from 'react';

interface RankingEntry {
  nickname: string;
  score: number;
}

interface RankingPageProps {
  onBack?: () => void;
}


export default function RankingPage({ onBack }: RankingPageProps) {
  const [ranking, setRanking] = useState<RankingEntry[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('ranking') || '[]');
    setRanking(data);
  }, []);

  return (
    <div className="min-h-screen bg-[#152012] text-white font-display flex flex-col">
      <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-background-dark/80 border-b border-white/5 transition-all duration-300">
        <div className="flex items-center justify-between p-4 pb-2">
          <button
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 transition-colors text-white/80 hover:text-white"
            onClick={onBack}
          >
            <span className="material-symbols-outlined">arrow_back_ios_new</span>
          </button>
          <div className="flex flex-col items-center flex-1">
            <h2 className="text-white text-lg font-bold leading-tight tracking-tight">Ranking Snake</h2>
            <span className="text-[10px] text-primary font-bold tracking-[0.2em] uppercase opacity-90 mt-0.5">Top 10 Jogadores</span>
          </div>
          <div className="w-10 h-10"></div>
        </div>
      </header>
      <main className="flex-1 px-4 py-6 flex flex-col gap-5 pb-24">
        <div className="flex flex-col gap-3">
          {ranking.length === 0 ? (
            <div className="text-center text-gray-400">Nenhum score registrado ainda.</div>
          ) : (
            ranking.map((entry, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-white/5 p-3 rounded-2xl border border-white/5">
                <span className="font-bold text-lg w-8 text-center text-primary">#{idx + 1}</span>
                <span className="flex-1 font-bold text-white truncate">{entry.nickname}</span>
                <span className="font-mono text-yellow-400 text-lg">{entry.score}</span>
              </div>
            ))
          )}
        </div>
      </main>
      <div className="fixed bottom-0 left-0 w-full pointer-events-none z-50">
        <div className="h-28 bg-gradient-to-t from-background-dark via-background-dark/90 to-transparent"></div>
        <div className="absolute bottom-6 right-6 flex flex-col items-end gap-0.5 pointer-events-auto group">
          <span className="text-[10px] text-gray-500 font-medium tracking-wide uppercase transition-colors group-hover:text-gray-300">Created by</span>
          <div className="flex items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
            <span className="material-symbols-outlined text-primary text-sm">code</span>
            <span className="text-sm text-white font-bold font-display tracking-wide">guielihan</span>
          </div>
        </div>
      </div>
    </div>
  );
}
