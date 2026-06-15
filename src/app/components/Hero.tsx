import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ChevronDown, Zap, Brain, Cpu } from 'lucide-react';

function NeuralNetwork() {
  const nodes = [
    { x: 50, y: 20 }, { x: 20, y: 45 }, { x: 80, y: 45 },
    { x: 35, y: 70 }, { x: 65, y: 70 }, { x: 50, y: 92 },
    { x: 10, y: 20 }, { x: 90, y: 20 }, { x: 10, y: 80 }, { x: 90, y: 80 },
  ];
  const edges = [
    [0,1],[0,2],[1,3],[2,4],[3,5],[4,5],[0,6],[0,7],[1,6],[2,7],[3,8],[4,9],[5,8],[5,9],[6,8],[7,9],[1,4],[2,3],
  ];

  return (
    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
      {edges.map(([a, b], i) => (
        <motion.line
          key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
          stroke="url(#nline)" strokeWidth="0.3"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.1, 0.5, 0.1] }}
          transition={{ duration: 2 + (i % 4) * 0.5, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
        />
      ))}
      {nodes.map((n, i) => (
        <motion.circle key={i} cx={n.x} cy={n.y} r="1.2"
          fill="#06b6d4"
          animate={{ r: [1, 2.2, 1], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
        />
      ))}
      <defs>
        <linearGradient id="nline" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#a855f7" stopOpacity="0.6" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function CyborgFigure() {
  return (
    <div className="relative w-full h-full flex items-end justify-center">
      {/* City skyline background */}
      <svg viewBox="0 0 800 400" className="absolute bottom-0 w-full" preserveAspectRatio="xMidYMax meet">
        <defs>
          <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(6,182,212,0.05)" />
            <stop offset="100%" stopColor="rgba(6,182,212,0.15)" />
          </linearGradient>
          <linearGradient id="buildingGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(6,182,212,0.3)" />
            <stop offset="100%" stopColor="rgba(6,182,212,0.05)" />
          </linearGradient>
        </defs>
        {/* Buildings */}
        {[
          { x: 0, w: 80, h: 200 }, { x: 90, w: 60, h: 280 }, { x: 160, w: 90, h: 180 },
          { x: 260, w: 50, h: 320 }, { x: 320, w: 120, h: 150 }, { x: 450, w: 70, h: 290 },
          { x: 530, w: 50, h: 240 }, { x: 590, w: 100, h: 190 }, { x: 700, w: 60, h: 260 },
          { x: 770, w: 80, h: 200 },
        ].map((b, i) => (
          <g key={i}>
            <rect x={b.x} y={400 - b.h} width={b.w} height={b.h} fill="url(#buildingGrad)" opacity="0.4" />
            <rect x={b.x} y={400 - b.h} width={b.w} height="1" fill="#06b6d4" opacity="0.6" />
            {/* Windows */}
            {Array.from({ length: Math.floor(b.h / 30) }).map((_, wi) =>
              Array.from({ length: Math.floor(b.w / 18) }).map((_, wj) => (
                <motion.rect
                  key={`${wi}-${wj}`}
                  x={b.x + 5 + wj * 18} y={400 - b.h + 10 + wi * 28}
                  width="8" height="12" rx="1"
                  fill="#06b6d4"
                  animate={{ opacity: [0.1, 0.5, 0.1] }}
                  transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 5 }}
                />
              ))
            )}
          </g>
        ))}
        {/* Ground glow */}
        <rect x="0" y="395" width="800" height="5" fill="url(#skyGrad)" opacity="0.8" />
      </svg>

      {/* Cyborg figure */}
      <motion.div
        className="relative z-10 flex items-end justify-center"
        style={{ width: '420px', height: '520px' }}
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg viewBox="0 0 420 520" className="w-full h-full" fill="none">
          <defs>
            <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e3a4a" />
              <stop offset="50%" stopColor="#0f2030" />
              <stop offset="100%" stopColor="#0a1520" />
            </linearGradient>
            <linearGradient id="glowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.8" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="strongGlow">
              <feGaussianBlur stdDeviation="6" result="coloredBlur" />
              <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Legs */}
          <rect x="155" y="380" width="45" height="130" rx="8" fill="url(#bodyGrad)" />
          <rect x="220" y="380" width="45" height="130" rx="8" fill="url(#bodyGrad)" />
          <rect x="158" y="380" width="39" height="4" fill="#06b6d4" opacity="0.7" filter="url(#glow)" />
          <rect x="223" y="380" width="39" height="4" fill="#06b6d4" opacity="0.7" filter="url(#glow)" />
          <rect x="158" y="440" width="39" height="3" fill="#a855f7" opacity="0.5" />
          <rect x="223" y="440" width="39" height="3" fill="#a855f7" opacity="0.5" />
          {/* Knee joints */}
          <circle cx="177" cy="450" r="12" fill="#0f2030" stroke="#06b6d4" strokeWidth="1.5" filter="url(#glow)" />
          <circle cx="242" cy="450" r="12" fill="#0f2030" stroke="#06b6d4" strokeWidth="1.5" filter="url(#glow)" />

          {/* Torso */}
          <path d="M120 200 L130 380 L290 380 L300 200 Z" fill="url(#bodyGrad)" />
          <path d="M125 205 L135 375 L285 375 L295 205 Z" fill="none" stroke="#06b6d4" strokeWidth="0.8" opacity="0.3" />
          {/* Chest armor plates */}
          <path d="M160 220 L210 215 L260 220 L255 300 L210 310 L165 300 Z" fill="#0a1a28" stroke="#06b6d4" strokeWidth="1" />
          <path d="M175 235 L210 230 L245 235 L241 285 L210 292 L179 285 Z" fill="#061520" stroke="#06b6d4" strokeWidth="0.5" opacity="0.6" />
          {/* Core reactor */}
          <motion.circle cx="210" cy="262" r="20" fill="#061520" stroke="#06b6d4" strokeWidth="2" filter="url(#strongGlow)"
            animate={{ r: [18, 22, 18] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.circle cx="210" cy="262" r="12" fill="#06b6d4" opacity="0.3"
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <circle cx="210" cy="262" r="6" fill="#06b6d4" filter="url(#strongGlow)" />
          {/* Energy lines on torso */}
          {[-1, 1].map(side => (
            <g key={side}>
              <motion.line x1={210 + side * 35} y1="240" x2={210 + side * 35} y2="330"
                stroke="url(#glowGrad)" strokeWidth="1.5"
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: side === 1 ? 0.5 : 0 }}
              />
            </g>
          ))}

          {/* Arms */}
          <rect x="75" y="205" width="50" height="150" rx="12" fill="url(#bodyGrad)" />
          <rect x="295" y="205" width="50" height="150" rx="12" fill="url(#bodyGrad)" />
          {/* Arm details */}
          {[80, 85, 300, 305].map((ax, i) => (
            <motion.rect key={i} x={ax} y={240 + (i % 2) * 40} width={i < 2 ? 40 : 40} height="2" fill="#06b6d4" opacity="0.6"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
          {/* Shoulder joints */}
          <circle cx="122" cy="205" r="16" fill="#0f2030" stroke="#06b6d4" strokeWidth="2" filter="url(#glow)" />
          <circle cx="298" cy="205" r="16" fill="#0f2030" stroke="#06b6d4" strokeWidth="2" filter="url(#glow)" />
          <circle cx="122" cy="205" r="8" fill="#06b6d4" opacity="0.4" />
          <circle cx="298" cy="205" r="8" fill="#06b6d4" opacity="0.4" />
          {/* Hands */}
          <ellipse cx="100" cy="370" rx="22" ry="14" fill="url(#bodyGrad)" stroke="#06b6d4" strokeWidth="1" />
          <ellipse cx="320" cy="370" rx="22" ry="14" fill="url(#bodyGrad)" stroke="#06b6d4" strokeWidth="1" />

          {/* Neck */}
          <rect x="195" y="155" width="30" height="50" rx="5" fill="url(#bodyGrad)" />
          <rect x="198" y="158" width="24" height="3" fill="#06b6d4" opacity="0.7" />

          {/* Head */}
          <path d="M150 80 Q150 50 210 48 Q270 50 270 80 L268 155 Q268 165 210 165 Q152 165 152 155 Z" fill="url(#bodyGrad)" stroke="#06b6d4" strokeWidth="1.5" />
          {/* Visor */}
          <path d="M165 88 Q210 82 255 88 L252 118 Q210 125 168 118 Z" fill="#061a28" />
          <motion.path d="M165 88 Q210 82 255 88 L252 118 Q210 125 168 118 Z"
            fill="none" stroke="#06b6d4" strokeWidth="1"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          {/* Eye glow */}
          <motion.ellipse cx="186" cy="103" rx="14" ry="8" fill="#06b6d4" opacity="0.15"
            animate={{ opacity: [0.1, 0.4, 0.1] }} transition={{ duration: 1.8, repeat: Infinity }}
          />
          <motion.ellipse cx="234" cy="103" rx="14" ry="8" fill="#06b6d4" opacity="0.15"
            animate={{ opacity: [0.1, 0.4, 0.1] }} transition={{ duration: 1.8, repeat: Infinity, delay: 0.3 }}
          />
          <motion.circle cx="186" cy="103" r="5" fill="#06b6d4" filter="url(#strongGlow)"
            animate={{ r: [4, 7, 4] }} transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.circle cx="234" cy="103" r="5" fill="#06b6d4" filter="url(#strongGlow)"
            animate={{ r: [4, 7, 4] }} transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
          />
          {/* Head details */}
          <line x1="155" y1="130" x2="165" y2="130" stroke="#06b6d4" strokeWidth="1" opacity="0.6" />
          <line x1="255" y1="130" x2="265" y2="130" stroke="#06b6d4" strokeWidth="1" opacity="0.6" />
          {/* Antenna */}
          <line x1="210" y1="48" x2="210" y2="20" stroke="#06b6d4" strokeWidth="1.5" filter="url(#glow)" />
          <motion.circle cx="210" cy="18" r="4" fill="#06b6d4" filter="url(#strongGlow)"
            animate={{ r: [3, 6, 3], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />

          {/* Ground shadow/glow */}
          <ellipse cx="210" cy="510" rx="120" ry="12" fill="#06b6d4" opacity="0.08" />
          <motion.ellipse cx="210" cy="510" rx="120" ry="12" fill="#06b6d4" opacity="0.05"
            animate={{ rx: [100, 140, 100] }} transition={{ duration: 4, repeat: Infinity }}
          />
        </svg>
      </motion.div>

      {/* Floating HUD panels */}
      <motion.div
        className="absolute top-[15%] left-[2%] rounded-lg border border-cyan-500/30 backdrop-blur-sm p-3 hidden lg:block"
        style={{ background: 'rgba(6,182,212,0.05)', width: '160px' }}
        animate={{ y: [0, -8, 0], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="text-[9px] text-cyan-400/60 font-mono-cyber mb-1">NEURAL SYNC</div>
        <div className="flex items-center gap-2 mb-2">
          <div className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
            <motion.div className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
              animate={{ width: ['60%', '92%', '78%', '88%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
          <span className="text-[9px] text-cyan-300 font-mono-cyber">88%</span>
        </div>
        <div className="text-[9px] text-cyan-400/60 font-mono-cyber mb-1">CORE TEMP</div>
        <div className="text-[11px] text-cyan-300 font-mono-cyber">36.7°C</div>
        <div className="mt-2 flex gap-1">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div key={i} className="flex-1 rounded-sm" style={{ height: '16px', background: '#06b6d4' }}
              animate={{ scaleY: [0.3, 1, 0.3] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.08, ease: 'easeInOut' }}
            />
          ))}
        </div>
      </motion.div>

      <motion.div
        className="absolute top-[15%] right-[2%] rounded-lg border border-purple-500/30 backdrop-blur-sm p-3 hidden lg:block"
        style={{ background: 'rgba(168,85,247,0.05)', width: '160px' }}
        animate={{ y: [0, -6, 0], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        <div className="text-[9px] text-purple-400/60 font-mono-cyber mb-1">AUGMENTATION</div>
        {['Vision', 'Strength', 'Cognition', 'Reflex'].map((stat, i) => (
          <div key={stat} className="flex justify-between items-center mb-1">
            <span className="text-[9px] text-gray-400 font-mono-cyber">{stat}</span>
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, j) => (
                <motion.div key={j} className="w-2 h-2 rounded-sm"
                  style={{ background: j < 4 ? '#a855f7' : '#1e1e2e', opacity: j < 4 ? 1 : 0.3 }}
                  animate={{ opacity: j < [4, 5, 3, 4][i] ? [0.6, 1, 0.6] : 0.2 }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: j * 0.1 + i * 0.2 }}
                />
              ))}
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div
        className="absolute bottom-[18%] left-[4%] rounded-lg border border-cyan-500/20 backdrop-blur-sm px-3 py-2 hidden lg:block"
        style={{ background: 'rgba(6,182,212,0.04)' }}
        animate={{ x: [0, 4, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="text-[9px] text-cyan-400/50 font-mono-cyber">SYSTEM STATUS</div>
        {['Neural Link', 'Cybernetics', 'Power Cell'].map((s, i) => (
          <div key={s} className="flex items-center gap-2 mt-1">
            <motion.div className="w-1.5 h-1.5 rounded-full"
              style={{ background: '#06b6d4' }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.3 }}
            />
            <span className="text-[9px] text-gray-400 font-mono-cyber">{s}</span>
            <span className="text-[9px] text-green-400 font-mono-cyber ml-1">ACTIVE</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-6, 6]);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const heroRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(nx);
    mouseY.set(ny);
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section ref={heroRef} onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ perspective: '1200px' }}>

      {/* Custom holographic cursor */}
      <motion.div
        className="fixed pointer-events-none z-50 mix-blend-screen"
        style={{ left: cursorPos.x - 20, top: cursorPos.y - 20, width: 40, height: 40 }}
      >
        <svg viewBox="0 0 40 40" className="w-full h-full">
          <circle cx="20" cy="20" r="16" fill="none" stroke="#06b6d4" strokeWidth="1" opacity="0.7" />
          <circle cx="20" cy="20" r="3" fill="#06b6d4" />
          <line x1="20" y1="4" x2="20" y2="12" stroke="#06b6d4" strokeWidth="1" />
          <line x1="20" y1="28" x2="20" y2="36" stroke="#06b6d4" strokeWidth="1" />
          <line x1="4" y1="20" x2="12" y2="20" stroke="#06b6d4" strokeWidth="1" />
          <line x1="28" y1="20" x2="36" y2="20" stroke="#06b6d4" strokeWidth="1" />
        </svg>
      </motion.div>

      {/* Navbar */}
      <nav className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-8 py-6">
        <motion.div className="flex items-center gap-3" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          <div className="w-8 h-8 rounded border border-cyan-500/60 flex items-center justify-center" style={{ background: 'rgba(6,182,212,0.1)' }}>
            <div className="w-3 h-3 rounded-sm bg-cyan-400" style={{ boxShadow: '0 0 8px #06b6d4' }} />
          </div>
          <span className="text-white tracking-widest" style={{ fontFamily: 'Orbitron', fontSize: '14px', fontWeight: 700 }}>CYBERCORE</span>
        </motion.div>
        <motion.div className="hidden md:flex items-center gap-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
          {['Technology', 'Features', 'Evolution', 'Contact'].map(link => (
            <a key={link} href="#" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors duration-300 tracking-wider"
              style={{ fontFamily: 'Rajdhani', fontWeight: 500 }}>{link}</a>
          ))}
        </motion.div>
        <motion.button
          className="hidden md:block px-5 py-2 text-xs tracking-widest border border-cyan-500/50 text-cyan-400 relative overflow-hidden group"
          style={{ fontFamily: 'Rajdhani', background: 'rgba(6,182,212,0.05)', clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)' }}
          initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
        >
          <span className="relative z-10">INITIATE</span>
          <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.2), transparent)' }}
            animate={{ x: ['-100%', '200%'] }} transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.button>
      </nav>

      {/* Neural network overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <NeuralNetwork />
      </div>

      {/* Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-screen pt-24 pb-12">

        {/* Text side */}
        <div className="flex flex-col justify-center order-2 lg:order-1 text-center lg:text-left">
          <motion.div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-cyan-500/30 self-center lg:self-start"
            style={{ background: 'rgba(6,182,212,0.06)' }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div className="w-2 h-2 rounded-full bg-cyan-400"
              animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.3, 0.8] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-xs text-cyan-400 tracking-widest font-mono-cyber">NEURAL INTERFACE v3.7.2 ACTIVE</span>
          </motion.div>

          <motion.h1
            className="mb-4 leading-none"
            style={{
              fontFamily: 'Orbitron',
              fontWeight: 900,
              fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
              background: 'linear-gradient(135deg, #ffffff 0%, #06b6d4 40%, #a855f7 80%, #ec4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.02em',
            }}
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }}
          >
            Evolution<br />Beyond<br />Humanity
          </motion.h1>

          <motion.p
            className="text-gray-400 mb-8 max-w-lg mx-auto lg:mx-0"
            style={{ fontFamily: 'Exo 2', fontSize: '1.1rem', lineHeight: 1.7 }}
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }}
          >
            Where biological limits dissolve and synthetic potential is unleashed. Step into the next chapter of human existence — augmented, optimized, and evolved beyond imagination.
          </motion.p>

          <motion.div className="flex flex-wrap gap-4 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9 }}
          >
            <motion.button
              className="relative px-8 py-4 text-sm font-semibold tracking-widest text-black overflow-hidden group"
              style={{
                fontFamily: 'Orbitron', fontSize: '12px',
                background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
                clipPath: 'polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)',
                boxShadow: '0 0 30px rgba(6,182,212,0.4)',
              }}
              whileHover={{ scale: 1.04, boxShadow: '0 0 50px rgba(6,182,212,0.6)' }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="relative z-10">AUGMENT NOW</span>
              <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }}
                animate={{ x: ['-100%', '200%'] }} transition={{ duration: 1.2, repeat: Infinity }}
              />
            </motion.button>

            <motion.button
              className="px-8 py-4 text-sm tracking-widest text-cyan-400 border border-cyan-500/40 backdrop-blur-sm relative overflow-hidden group"
              style={{
                fontFamily: 'Orbitron', fontSize: '12px',
                background: 'rgba(6,182,212,0.05)',
                clipPath: 'polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)',
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="relative z-10">EXPLORE SYSTEM</span>
              <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.1), transparent)' }}
              />
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div className="flex gap-8 mt-12 justify-center lg:justify-start"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.2 }}
          >
            {[
              { value: '2,847', label: 'AUGMENTED', icon: <Zap size={14} /> },
              { value: '99.7%', label: 'SYNC RATE', icon: <Brain size={14} /> },
              { value: '∞', label: 'POTENTIAL', icon: <Cpu size={14} /> },
            ].map(stat => (
              <div key={stat.label} className="text-center lg:text-left">
                <div className="flex items-center gap-1 mb-1 justify-center lg:justify-start text-cyan-400 opacity-60">{stat.icon}<span className="text-[9px] tracking-widest font-mono-cyber">{stat.label}</span></div>
                <div style={{ fontFamily: 'Orbitron', fontSize: '1.4rem', fontWeight: 700, background: 'linear-gradient(135deg, #06b6d4, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{stat.value}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Cyborg figure side */}
        <motion.div
          className="relative order-1 lg:order-2 flex items-center justify-center"
          style={{ height: '80vh', minHeight: '500px', rotateX, rotateY, transformStyle: 'preserve-3d' }}
          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 0.4 }}
        >
          <CyborgFigure />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 2 }}
      >
        <span className="text-[9px] text-gray-500 tracking-widest font-mono-cyber">SCROLL TO EXPLORE</span>
        <ChevronDown size={16} className="text-cyan-500" />
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(5,5,16,0.9))' }}
      />
    </section>
  );
}
