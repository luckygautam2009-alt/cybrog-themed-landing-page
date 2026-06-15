import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Brain, Eye, Zap, Cpu, RefreshCw, Link } from 'lucide-react';

const features = [
  {
    icon: <Brain size={28} />,
    title: 'Neural Intelligence',
    subtitle: 'COGNITIVE ENHANCEMENT',
    description: 'Direct neural uplink to distributed AI networks. Process information at speeds 10,000× beyond biological limits with quantum-entangled synaptic bridges.',
    stat: '10,000×',
    statLabel: 'Processing Speed',
    color: '#06b6d4',
    glow: 'rgba(6,182,212,0.3)',
    delay: 0,
  },
  {
    icon: <Eye size={28} />,
    title: 'Augmented Vision',
    subtitle: 'PERCEPTUAL OVERRIDE',
    description: 'Expand visual spectrum to 340nm–1400nm. Integrated HUD overlay with real-time biometric analysis, threat detection, and environmental mapping.',
    stat: '340–1400nm',
    statLabel: 'Spectrum Range',
    color: '#a855f7',
    glow: 'rgba(168,85,247,0.3)',
    delay: 0.1,
  },
  {
    icon: <Zap size={28} />,
    title: 'Cybernetic Strength',
    subtitle: 'PHYSICAL AMPLIFICATION',
    description: 'Carbon-titanium muscle fibers deliver 47× baseline human strength with zero fatigue. Adaptive load-balancing exoskeleton with 300,000-cycle endurance.',
    stat: '47×',
    statLabel: 'Strength Multiplier',
    color: '#ec4899',
    glow: 'rgba(236,72,153,0.3)',
    delay: 0.2,
  },
  {
    icon: <Cpu size={28} />,
    title: 'Quantum Processing',
    subtitle: 'COMPUTATIONAL CORE',
    description: 'Embedded 256-qubit processor performs parallel reality simulations, predictive modeling, and complex problem resolution in microseconds.',
    stat: '256-qubit',
    statLabel: 'Processing Core',
    color: '#3b82f6',
    glow: 'rgba(59,130,246,0.3)',
    delay: 0.3,
  },
  {
    icon: <RefreshCw size={28} />,
    title: 'Autonomous Learning',
    subtitle: 'ADAPTIVE INTELLIGENCE',
    description: 'Continuous self-optimization through deep reinforcement learning. Every experience is encoded, analyzed, and integrated into enhanced behavioral patterns.',
    stat: '∞',
    statLabel: 'Learning Cycles',
    color: '#8b5cf6',
    glow: 'rgba(139,92,246,0.3)',
    delay: 0.4,
  },
  {
    icon: <Link size={28} />,
    title: 'Human-Machine Sync',
    subtitle: 'UNIFIED CONSCIOUSNESS',
    description: 'Seamless bi-directional data flow between biological and synthetic systems. Latency of 0.003ms ensures the body and machine operate as one unified entity.',
    stat: '0.003ms',
    statLabel: 'Sync Latency',
    color: '#06b6d4',
    glow: 'rgba(6,182,212,0.3)',
    delay: 0.5,
  },
];

function FeatureCard({ f, index }: { f: typeof features[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      className="relative group cursor-default"
      initial={{ opacity: 0, y: 60, scale: 0.92 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: f.delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Hover border glow */}
      <div className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(135deg, ${f.color}40, transparent, ${f.color}20)` }}
      />

      {/* Card */}
      <div className="relative rounded-xl border h-full overflow-hidden transition-all duration-500 group-hover:-translate-y-2"
        style={{
          borderColor: `${f.color}25`,
          background: 'linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
          backdropFilter: 'blur(20px)',
          boxShadow: `0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)`,
        }}
      >
        {/* Top edge glow line */}
        <div className="absolute top-0 left-8 right-8 h-px" style={{ background: `linear-gradient(90deg, transparent, ${f.color}60, transparent)` }} />

        {/* Corner markers */}
        <div className="absolute top-3 left-3 w-4 h-4 opacity-40" style={{ borderTop: `1px solid ${f.color}`, borderLeft: `1px solid ${f.color}` }} />
        <div className="absolute top-3 right-3 w-4 h-4 opacity-40" style={{ borderTop: `1px solid ${f.color}`, borderRight: `1px solid ${f.color}` }} />
        <div className="absolute bottom-3 left-3 w-4 h-4 opacity-40" style={{ borderBottom: `1px solid ${f.color}`, borderLeft: `1px solid ${f.color}` }} />
        <div className="absolute bottom-3 right-3 w-4 h-4 opacity-40" style={{ borderBottom: `1px solid ${f.color}`, borderRight: `1px solid ${f.color}` }} />

        <div className="p-8">
          {/* Icon */}
          <div className="relative mb-6 inline-flex">
            <div className="w-16 h-16 rounded-xl flex items-center justify-center relative overflow-hidden"
              style={{ background: `linear-gradient(135deg, ${f.color}18, ${f.color}08)`, border: `1px solid ${f.color}30` }}>
              <div style={{ color: f.color }}>{f.icon}</div>
              <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(ellipse at center, ${f.color}25, transparent)` }}
              />
            </div>
            <motion.div
              className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: `radial-gradient(ellipse at center, ${f.color}15, transparent)` }}
            />
          </div>

          {/* Subtitle */}
          <div className="text-[9px] tracking-[0.2em] mb-2 font-mono-cyber" style={{ color: `${f.color}80` }}>
            {f.subtitle}
          </div>

          {/* Title */}
          <h3 className="mb-3" style={{ fontFamily: 'Orbitron', fontSize: '1.1rem', fontWeight: 700, color: '#fff', letterSpacing: '0.02em' }}>
            {f.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-400 mb-6 leading-relaxed" style={{ fontFamily: 'Exo 2' }}>
            {f.description}
          </p>

          {/* Stat */}
          <div className="flex items-end justify-between pt-4 border-t" style={{ borderColor: `${f.color}15` }}>
            <div>
              <div className="text-[9px] text-gray-500 tracking-widest font-mono-cyber mb-0.5">{f.statLabel}</div>
              <div style={{ fontFamily: 'Orbitron', fontSize: '1.3rem', fontWeight: 800, color: f.color, textShadow: `0 0 20px ${f.glow}` }}>
                {f.stat}
              </div>
            </div>
            <motion.div
              className="w-8 h-8 rounded border flex items-center justify-center"
              style={{ borderColor: `${f.color}30`, background: `${f.color}08` }}
              whileHover={{ rotate: 90, scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-2 h-2 rounded-sm" style={{ background: f.color }} />
            </motion.div>
          </div>
        </div>

        {/* Bottom scan animation on hover */}
        <motion.div
          className="absolute left-0 right-0 h-px opacity-0 group-hover:opacity-100"
          style={{ background: `linear-gradient(90deg, transparent, ${f.color}80, transparent)` }}
          animate={{ top: ['0%', '100%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    </motion.div>
  );
}

export function Features() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      {/* Section separator */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.4), rgba(168,85,247,0.4), transparent)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            className="inline-flex items-center gap-3 mb-6"
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          >
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, transparent, #06b6d4)' }} />
            <span className="text-[10px] tracking-[0.3em] text-cyan-400 font-mono-cyber">CAPABILITY MATRIX</span>
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
            BEYOND HUMAN<br />CAPABILITY
          </motion.h2>

          <motion.p
            className="mt-6 max-w-2xl mx-auto text-gray-400"
            style={{ fontFamily: 'Exo 2', fontSize: '1.05rem', lineHeight: 1.7 }}
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}
          >
            Six core augmentation pillars that redefine what it means to be human. Each module designed for seamless integration with organic systems.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => <FeatureCard key={f.title} f={f} index={i} />)}
        </div>
      </div>

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ background: 'radial-gradient(ellipse at center, #06b6d4 0%, transparent 70%)' }} />
      </div>
    </section>
  );
}
