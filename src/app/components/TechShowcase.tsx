import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Cpu, Radio, Activity, Database, Layers, GitBranch } from 'lucide-react';

const technologies = [
  {
    id: 'neural-chip',
    name: 'NeuroChip X-9',
    category: 'NEURAL PROCESSOR',
    description: 'The world\'s first quantum-biological interface chip. 512-core neuromorphic processor with direct synaptic binding at the molecular level.',
    specs: [
      { label: 'Core Count', value: '512 cores' },
      { label: 'Clock Speed', value: '48 THz' },
      { label: 'Memory', value: '2 PB neural cache' },
      { label: 'Power', value: '0.8W bio-draw' },
    ],
    icon: <Cpu size={40} />,
    color: '#06b6d4',
    accentColor: '#3b82f6',
    visual: 'chip',
  },
  {
    id: 'retinal-implant',
    name: 'OcuSync Pro',
    category: 'OCULAR ENHANCEMENT',
    description: 'Retinal overlay system delivering full-spectrum vision, real-time HUD projection, and AI-powered threat analysis with sub-millisecond response.',
    specs: [
      { label: 'Resolution', value: '32K per eye' },
      { label: 'Spectrum', value: '340–1400nm' },
      { label: 'Refresh Rate', value: '1000Hz' },
      { label: 'AI Layers', value: '64 parallel' },
    ],
    icon: <Radio size={40} />,
    color: '#a855f7',
    accentColor: '#8b5cf6',
    visual: 'eye',
  },
  {
    id: 'spine-enhancer',
    name: 'SpineCore v7',
    category: 'NEURAL HIGHWAY',
    description: 'Carbon nanotube spinal replacement enabling 100Gb/s neural bandwidth with self-healing damage repair and EMP shielding at military grade.',
    specs: [
      { label: 'Bandwidth', value: '100 Gb/s' },
      { label: 'Channels', value: '4,096 neural' },
      { label: 'Latency', value: '0.001ms' },
      { label: 'Durability', value: '300,000 cycles' },
    ],
    icon: <Activity size={40} />,
    color: '#ec4899',
    accentColor: '#f43f5e',
    visual: 'spine',
  },
  {
    id: 'memory-bank',
    name: 'MemPlex Array',
    category: 'COGNITIVE STORAGE',
    description: 'Exabyte-scale biological memory array. Perfect recall at any depth of storage, with AI-curated memory indexing and cross-reference synthesis.',
    specs: [
      { label: 'Capacity', value: '1 Exabyte' },
      { label: 'Recall Speed', value: '0.002ms' },
      { label: 'Accuracy', value: '99.9999%' },
      { label: 'Index Type', value: 'Quantum hash' },
    ],
    icon: <Database size={40} />,
    color: '#3b82f6',
    accentColor: '#06b6d4',
    visual: 'memory',
  },
  {
    id: 'exoskeleton',
    name: 'TitanFrame MK-IV',
    category: 'STRUCTURAL ENHANCEMENT',
    description: 'Full skeletal replacement using carbon-titanium composites. Modular armor plating with active camouflage and environmental adaptation.',
    specs: [
      { label: 'Strength', value: '47× baseline' },
      { label: 'Material', value: 'C-Ti composite' },
      { label: 'Armor Class', value: 'Military IV-E' },
      { label: 'Weight Add', value: '+2.3 kg' },
    ],
    icon: <Layers size={40} />,
    color: '#8b5cf6',
    accentColor: '#a855f7',
    visual: 'skeleton',
  },
  {
    id: 'neuro-link',
    name: 'SynaptiLink Hub',
    category: 'CONNECTIVITY CORE',
    description: 'Central integration hub connecting all augmentation systems. Manages priority arbitration, power distribution, and emergency failsafes with zero single points of failure.',
    specs: [
      { label: 'Ports', value: '2,048 neural' },
      { label: 'Uptime', value: '99.9997%' },
      { label: 'Failsafes', value: '12 layers' },
      { label: 'Update OTA', value: 'Real-time' },
    ],
    icon: <GitBranch size={40} />,
    color: '#06b6d4',
    accentColor: '#a855f7',
    visual: 'hub',
  },
];

function TechVisual({ type, color }: { type: string; color: string }) {
  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <svg viewBox="0 0 200 200" className="w-48 h-48" fill="none">
        <defs>
          <radialGradient id={`rg-${type}`} cx="50%" cy="50%">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>
          <filter id={`gf-${type}`}>
            <feGaussianBlur stdDeviation="2" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {type === 'chip' && (
          <g>
            <rect x="60" y="60" width="80" height="80" rx="8" fill="rgba(0,0,0,0.5)" stroke={color} strokeWidth="1.5" />
            <rect x="72" y="72" width="56" height="56" rx="4" fill="none" stroke={color} strokeWidth="0.8" opacity="0.5" />
            {Array.from({ length: 4 }).map((_, i) => (
              <g key={i}>
                <line x1="60" y1={78 + i * 16} x2="40" y2={78 + i * 16} stroke={color} strokeWidth="1" opacity="0.7" />
                <line x1="140" y1={78 + i * 16} x2="160" y2={78 + i * 16} stroke={color} strokeWidth="1" opacity="0.7" />
                <line x1={78 + i * 16} y1="60" x2={78 + i * 16} y2="40" stroke={color} strokeWidth="1" opacity="0.7" />
                <line x1={78 + i * 16} y1="140" x2={78 + i * 16} y2="160" stroke={color} strokeWidth="1" opacity="0.7" />
              </g>
            ))}
            <circle cx="100" cy="100" r="15" fill={`${color}20`} stroke={color} strokeWidth="1.5" filter={`url(#gf-${type})`} />
            <circle cx="100" cy="100" r="6" fill={color} />
            {Array.from({ length: 6 }).map((_, i) => {
              const a = (i / 6) * Math.PI * 2;
              return <circle key={i} cx={100 + Math.cos(a) * 22} cy={100 + Math.sin(a) * 22} r="2.5" fill={color} opacity="0.6" />;
            })}
          </g>
        )}

        {type === 'eye' && (
          <g>
            <ellipse cx="100" cy="100" rx="70" ry="40" fill={`url(#rg-${type})`} />
            <path d="M30 100 Q100 40 170 100 Q100 160 30 100Z" fill="none" stroke={color} strokeWidth="1.5" />
            <circle cx="100" cy="100" r="22" fill="none" stroke={color} strokeWidth="2" />
            <circle cx="100" cy="100" r="12" fill={`${color}20`} />
            <circle cx="100" cy="100" r="6" fill={color} filter={`url(#gf-${type})`} />
            {Array.from({ length: 8 }).map((_, i) => {
              const a = (i / 8) * Math.PI * 2;
              return <line key={i} x1={100 + Math.cos(a) * 22} y1={100 + Math.sin(a) * 22} x2={100 + Math.cos(a) * 35} y2={100 + Math.sin(a) * 35} stroke={color} strokeWidth="0.8" opacity="0.5" />;
            })}
          </g>
        )}

        {(type === 'spine' || type === 'skeleton' || type === 'memory' || type === 'hub') && (
          <g>
            <circle cx="100" cy="100" r="55" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
            <circle cx="100" cy="100" r="35" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
            <circle cx="100" cy="100" r="18" fill={`${color}15`} stroke={color} strokeWidth="1.5" />
            <circle cx="100" cy="100" r="6" fill={color} filter={`url(#gf-${type})`} />
            {Array.from({ length: 6 }).map((_, i) => {
              const a = (i / 6) * Math.PI * 2;
              const x1 = 100 + Math.cos(a) * 18, y1 = 100 + Math.sin(a) * 18;
              const x2 = 100 + Math.cos(a) * 55, y2 = 100 + Math.sin(a) * 55;
              return (
                <g key={i}>
                  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="0.8" opacity="0.4" />
                  <circle cx={x2} cy={y2} r="4" fill={`${color}30`} stroke={color} strokeWidth="1" />
                </g>
              );
            })}
          </g>
        )}
      </svg>
    </div>
  );
}

export function TechShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const active = technologies[activeIdx];

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.4), transparent)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            className="inline-flex items-center gap-3 mb-6"
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          >
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, transparent, #06b6d4)' }} />
            <span className="text-[10px] tracking-[0.3em] text-cyan-400 font-mono-cyber">TECHNOLOGY SHOWCASE</span>
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, #06b6d4, transparent)' }} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontFamily: 'Orbitron',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #fff 30%, #06b6d4 70%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}
          >
            AUGMENTATION<br />ARSENAL
          </motion.h2>
        </div>

        {/* Tab strip */}
        <motion.div
          className="flex flex-wrap gap-2 justify-center mb-12"
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}
        >
          {technologies.map((t, i) => (
            <button key={t.id} onClick={() => setActiveIdx(i)}
              className="relative px-4 py-2 text-xs tracking-wider transition-all duration-300"
              style={{
                fontFamily: 'Rajdhani',
                fontWeight: 600,
                color: activeIdx === i ? t.color : 'rgba(255,255,255,0.4)',
                border: `1px solid ${activeIdx === i ? t.color + '60' : 'rgba(255,255,255,0.08)'}`,
                background: activeIdx === i ? `${t.color}10` : 'transparent',
                clipPath: 'polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)',
              }}
            >
              {t.category.split(' ')[0]}
              {activeIdx === i && (
                <motion.div className="absolute inset-0 opacity-30" layoutId="tab-bg"
                  style={{ background: `linear-gradient(90deg, transparent, ${t.color}20, transparent)` }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Main showcase panel */}
        <motion.div
          key={activeIdx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border"
          style={{ borderColor: `${active.color}25`, background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(30px)' }}
        >
          {/* Visual panel */}
          <div className="relative flex items-center justify-center p-12 min-h-80"
            style={{ background: `radial-gradient(ellipse at center, ${active.color}12 0%, transparent 70%)` }}>
            {/* Corner brackets */}
            {[['top-4 left-4', '0 0'], ['top-4 right-4', '1 0'], ['bottom-4 left-4', '0 1'], ['bottom-4 right-4', '1 1']].map(([pos, flip], i) => (
              <div key={i} className={`absolute ${pos} w-6 h-6`} style={{
                borderTop: i < 2 ? `1px solid ${active.color}50` : 'none',
                borderBottom: i >= 2 ? `1px solid ${active.color}50` : 'none',
                borderLeft: i % 2 === 0 ? `1px solid ${active.color}50` : 'none',
                borderRight: i % 2 === 1 ? `1px solid ${active.color}50` : 'none',
              }} />
            ))}

            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute w-64 h-64 rounded-full opacity-10"
              style={{ border: `1px dashed ${active.color}` }}
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="absolute w-48 h-48 rounded-full opacity-15"
              style={{ border: `1px solid ${active.color}` }}
            />

            <motion.div
              className="relative z-10"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="w-32 h-32 rounded-2xl flex items-center justify-center relative"
                style={{
                  background: `linear-gradient(135deg, ${active.color}20, ${active.accentColor}10)`,
                  border: `2px solid ${active.color}40`,
                  boxShadow: `0 0 60px ${active.color}30, inset 0 0 30px ${active.color}10`,
                }}>
                <div style={{ color: active.color }}>{active.icon}</div>
                <motion.div className="absolute inset-0 rounded-2xl"
                  animate={{ opacity: [0.2, 0.6, 0.2] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ background: `radial-gradient(circle, ${active.color}20, transparent)` }}
                />
              </div>
            </motion.div>

            {/* HUD readouts */}
            <div className="absolute top-6 right-6 text-right">
              <div className="text-[8px] font-mono-cyber mb-1" style={{ color: `${active.color}60` }}>STATUS</div>
              <div className="text-[10px] font-mono-cyber" style={{ color: active.color }}>OPERATIONAL</div>
            </div>
            <div className="absolute bottom-6 left-6">
              <div className="text-[8px] font-mono-cyber mb-1" style={{ color: `${active.color}60` }}>ID</div>
              <div className="text-[10px] font-mono-cyber" style={{ color: active.color }}>{active.id.toUpperCase()}</div>
            </div>
          </div>

          {/* Info panel */}
          <div className="p-8 lg:p-12 flex flex-col justify-center border-t lg:border-t-0 lg:border-l"
            style={{ borderColor: `${active.color}15` }}>
            <div className="text-[9px] tracking-[0.3em] font-mono-cyber mb-2" style={{ color: `${active.color}70` }}>
              {active.category}
            </div>
            <h3 className="mb-4" style={{ fontFamily: 'Orbitron', fontSize: '1.8rem', fontWeight: 800, color: '#fff', letterSpacing: '0.02em' }}>
              {active.name}
            </h3>
            <p className="text-gray-400 mb-8 leading-relaxed" style={{ fontFamily: 'Exo 2', fontSize: '0.95rem' }}>
              {active.description}
            </p>

            {/* Specs grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {active.specs.map(spec => (
                <div key={spec.label} className="p-3 rounded-lg border"
                  style={{ borderColor: `${active.color}15`, background: `${active.color}05` }}>
                  <div className="text-[9px] font-mono-cyber text-gray-500 mb-1 tracking-wider">{spec.label}</div>
                  <div className="text-sm font-semibold" style={{ fontFamily: 'Orbitron', color: active.color, fontSize: '0.85rem' }}>{spec.value}</div>
                </div>
              ))}
            </div>

            <motion.button
              className="self-start px-6 py-3 text-xs tracking-widest relative overflow-hidden group"
              style={{
                fontFamily: 'Orbitron',
                color: active.color,
                border: `1px solid ${active.color}50`,
                background: `${active.color}08`,
                clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)',
              }}
              whileHover={{ scale: 1.03, boxShadow: `0 0 30px ${active.color}30` }}
            >
              VIEW SPECIFICATIONS
              <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100"
                style={{ background: `linear-gradient(90deg, transparent, ${active.color}15, transparent)` }}
                animate={{ x: ['-100%', '200%'] }} transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.button>
          </div>
        </motion.div>

        {/* Navigation dots */}
        <div className="flex justify-center gap-3 mt-8">
          {technologies.map((t, i) => (
            <button key={t.id} onClick={() => setActiveIdx(i)}
              className="transition-all duration-300 rounded-full"
              style={{
                width: activeIdx === i ? '24px' : '8px',
                height: '8px',
                background: activeIdx === i ? t.color : 'rgba(255,255,255,0.15)',
                boxShadow: activeIdx === i ? `0 0 12px ${t.color}60` : 'none',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
