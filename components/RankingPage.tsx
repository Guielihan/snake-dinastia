import React from 'react';

const rankingData = [
  {
    position: 1,
    name: 'MasterSnake',
    score: 152,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSaB5gpPgv3z-KpV_7XCaYK0KOwjYqNXzw3yyxYZIFga4K2eaLrWRFudT-sQA5jPZfl8YcgjQCIe9AUBX8Kp7DSPtKG1BeFNDBHszR96c_PN57yHYSk2XLf82NazUlPK-NjN3wXYQ5jmY_BHWbENanrS-tqrS4v_ioklgLAS16SoKxtvvqfPiW4PaKz4w9z4zSYahRJJClLOR6jPiNsQNAIe97uBNN7Zw4sN-B0HNRq4f8T27MEwSbTlA7sIzZZWQjSiyk5sMLpCw',
    color: '#FFD700',
    icon: 'crown',
    apples: '🍎',
  },
  {
    position: 2,
    name: 'CodeWarrior',
    score: 148,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2gv14u5yF7-GTeULi1AYp8fsB-y-q1tDp5cXYZ2eUd50DjtQDOg3mQ8qso4EuuZmn_qXgzrtZs1RZirE8L3Si1W48c-LYC6v8m_LhguOgohnmmcAR7IGZSPORCnYw4KUit94uExQAFsmTkGrb8RcLgRNn80_Larh4tLHhggK3KmihjnoTXym65c1u01j3avwwuQB-lGGLplGPYlhTHZNgI07-GGaKD8n8qb47tI-VGSHF80F8f8elBy2he7XL9LhskOXi1oe0alM',
    color: 'silver',
    apples: '🍎',
  },
  {
    position: 3,
    name: 'Pythonista',
    score: 130,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBaHwmon5xhbs7ekwZF0P736lHu2ujuhLTTwobNigIsFtNGK_FvwtUNxSwkZetNEAR4fc2FW2Xk392nKg6IVzrM3rVccETY3WeXyIxaGov_O8nd4hlHJi5eC7wNf1ancnt7VStzmTWJlKsinrs7GVAeOiAb32ZJw6Xm4Wati8hG9RmGMC0X7zE7zqs9lMxm69VBktjExcaoAafAbQO5SA25dmRo8ABuy1Q7bomfpkvFlPMLb338cqOExgXocXuX9LcsbF83wDCstmE',
    color: '#CD7F32',
    apples: '🍎',
  },
];

const others = [
  {
    position: 4,
    name: 'DevHunter_99',
    score: 125,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjdb_0-Bse2kk_ezP1E272VXloALYSjiCq91VSFM_WkOINX7BA_SkLjC21CzjGmR6vd3AKqDicJHAzYtox2UOR2-Ptey-xIotiB4dO95rbBxrsfL5fyGxXBj8LNqss9sFdveReg5Gs6B108PDFwXewPQR3w6exVbud-6sbl5J-DLpnf6V2Z-YqlFLo0bUsZ9XHMPlahGQBHAnwsTqJzraJM2RXW19ZC7JcgpXA5sbdfzhJInNTU8CNlKbUnk273orMadnEECs-nRU',
    time: '09:42',
  },
  {
    position: 5,
    name: 'AlgoRythm',
    score: 118,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMq-CwqKipLLt7XDQOiUmYGFhSbIg8_o8WxMTS922fVD8bGritMKWIyI8XA6_of2Hczz1gYSltVaal3ssPo8z_EGwzfcPlotJ0_5yfhATY6JzQVbMCqNIZUQNXiRokhmDDJC9j-Bwj_TyxhVy19GPCSGSrKSE0FC8s0Rj7CkISGLQWdSfu5-JHE8AqVu4nYsxNPfvSghz-CfL5Z7inSBpCbFDnaWnneKehNDBBCSDPuZvCSLPyP2QjdopwrcGIm_2tZWGOvHgnp00',
    time: '08:15',
  },
  {
    position: 6,
    name: 'JS_Junkie',
    score: 112,
    avatar: '',
    initials: 'JJ',
    color: 'bg-gradient-to-br from-purple-500 to-indigo-600',
    time: '07:55',
  },
  {
    position: 7,
    name: 'PixelQueen',
    score: 105,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnEoUuRhzLJdYLUbgjq3nOs2UBguKMpglhoLXKPoM3Nlpslhcq9L32VnGw0cSW7FRpzKV8gz-Am0VX7E0ZBubbSZWeufzrdm43j42U67cd7d3tgyJPUC6twCvTsL1cL0hTfmUiq6OPmGbl9muSvy5Yqzb5Y0yFrM0NQJJPJxoHU_quuN2beqGz88uz7s411ovmXBeKaCJ5BhBOPwrQqGAPssXpoU9110XIN5NS6PxX_Tbfy6z4Z1kBlM1lXynG6ZPFhsv4Cw-0Lcs',
    time: '07:12',
  },
  {
    position: 8,
    name: 'GreenThumb',
    score: 98,
    avatar: '',
    initials: 'GT',
    color: 'bg-gradient-to-br from-green-600 to-teal-700',
    time: '06:45',
  },
  {
    position: 9,
    name: 'LoopMaster',
    score: 95,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmZ9jdYVetx9L1M-vTYsUn0btn-bjM1Es9dpLOrq6AjZieXZsFPwah4WOKlE6vQEFhBoKwREF6KOsMv9AVpZZuV6d3_ZTrgAgXizRxIDKysCQ4KlLnZVFvnbtFhBcJM3oIX_ghpPzU9H8ni0wtux0SiNxU0_tH-T2mk4wfsofrgFJ0kglnoFrTX718njXc2EErxhG35jV0ov-N_AcekOj4Dp20gET2ng7IjQEb2CXfJk1lJdSYitc197Rfq2PnQN_ud8yNahSYkoc',
    time: '06:20',
  },
];

interface RankingPageProps {
  onBack?: () => void;
}

export default function RankingPage({ onBack }: RankingPageProps) {
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
            <h2 className="text-white text-lg font-bold leading-tight tracking-tight">Geração Tech 3.0</h2>
            <span className="text-[10px] text-primary font-bold tracking-[0.2em] uppercase opacity-90 mt-0.5">Ranking dos Alunos</span>
          </div>
          <div className="w-10 h-10"></div>
        </div>
        <div className="w-full flex justify-center pb-4 pt-1">
          <div className="flex h-7 items-center justify-center gap-x-2 rounded-full bg-[#2d372a]/50 border border-primary/20 pl-3 pr-4 shadow-[0_0_10px_rgba(83,210,45,0.1)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <p className="text-white text-xs font-bold tracking-wide uppercase">Ao Vivo</p>
          </div>
        </div>
      </header>
      <main className="flex-1 px-4 py-6 flex flex-col gap-5 pb-24">
        <div className="grid grid-cols-3 gap-2 items-end mb-4 px-2">
          {/* Top 3 */}
          {rankingData.map((user, idx) => (
            <div
              key={user.position}
              className={`flex flex-col items-center gap-2 order-${user.position} ${user.position === 1 ? '-mt-6 z-10' : user.position === 2 ? 'translate-y-2' : 'translate-y-3'}`}
            >
              <div className="relative group">
                {user.position === 1 && (
                  <div className="absolute -top-7 inset-x-0 flex justify-center text-[#FFD700] animate-bounce duration-[2000ms]">
                    <span className="material-symbols-outlined text-3xl drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]">crown</span>
                  </div>
                )}
                <div
                  className={`rounded-full bg-surface-dark shadow-lg p-1 ${user.position === 1 ? 'w-24 h-24 border-4 border-[#FFD700] shadow-[0_0_25px_rgba(255,215,0,0.25)]' : user.position === 2 ? 'w-16 h-16 border-2 border-slate-300' : 'w-16 h-16 border-2 border-[#CD7F32]'}`}
                >
                  <img
                    alt={`Avatar of ${user.name}`}
                    className="w-full h-full rounded-full object-cover"
                    src={user.avatar}
                  />
                </div>
                <div className={`absolute -bottom-${user.position === 1 ? '3' : '2'} inset-x-0 flex justify-center`}>
                  <span
                    className={
                      user.position === 1
                        ? 'bg-gradient-to-r from-yellow-400 to-[#FFD700] text-black text-xs font-extrabold px-3 py-0.5 rounded-full shadow-lg ring-2 ring-background-dark'
                        : user.position === 2
                        ? 'bg-gradient-to-r from-slate-300 to-slate-400 text-black text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md'
                        : 'bg-gradient-to-r from-[#CD7F32] to-orange-400 text-black text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md'
                    }
                  >
                    #{user.position}
                  </span>
                </div>
              </div>
              <div className={`text-center mt-${user.position === 1 ? '3' : '1'} w-full`}>
                <p
                  className={
                    user.position === 1
                      ? 'text-sm font-bold text-[#FFD700] truncate'
                      : user.position === 2
                      ? 'text-xs font-bold truncate text-slate-200'
                      : 'text-xs font-bold truncate text-orange-200'
                  }
                >
                  {user.name}
                </p>
                <p className={user.position === 1 ? 'text-xs text-primary font-bold' : 'text-[10px] text-primary font-medium'}>
                  {user.score} {user.apples}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="flex flex-col gap-3">
          {others.map((user) => (
            <div
              key={user.position}
              className="group flex items-center gap-3 bg-white/5 active:bg-white/10 p-3 pr-4 rounded-2xl border border-white/5 hover:border-primary/30 transition-all duration-200"
            >
              <span className="text-white/40 font-bold text-sm w-6 text-center group-hover:text-primary transition-colors">
                {user.position}
              </span>
              <div className="relative shrink-0">
                {user.avatar ? (
                  <img
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full object-cover ring-1 ring-white/10"
                    src={user.avatar}
                  />
                ) : (
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${user.color} ring-1 ring-white/10`}
                  >
                    <span className="text-white text-xs font-bold">{user.initials}</span>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <p className="text-white font-bold text-sm truncate">{user.name}</p>
                <div className="flex items-center gap-3 mt-0.5">
                  <div className="flex items-center gap-1 text-primary text-[10px] font-bold">
                    <span className="material-symbols-outlined text-[12px] align-bottom">nutrition</span>
                    {user.score}
                  </div>
                  <div className="w-0.5 h-0.5 rounded-full bg-white/30"></div>
                  <div className="flex items-center gap-1 text-gray-400 text-[10px] font-medium">
                    <span className="material-symbols-outlined text-[12px]">timer</span>
                    {user.time}
                  </div>
                </div>
              </div>
            </div>
          ))}
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
