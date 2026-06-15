import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { User, Cpu, Zap, Link, Brain } from 'lucide-react';

const stages = [
  {
    era: '01',
    title: 'Human Era',
    year: '100,000 BCE',
    subtitle: 'BIOLOGICAL ORIGIN',
    description: 'The baseline state of Homo sapiens. 86 billion neurons operating at chemical speeds, bound by evolutionary constraints. Intelligence locked in fragile organic tissue — vulnerable, finite, and unoptimized.',
    icon: <User size={32} />,
    color: '#94a3b8',
    glowColor: 'rgba(148,163,184,0.3)',
    gradient: 'from-gray-800 to-gray-900',
    bg: 'rgba(148,163,184,0.06)',
    border: 'rgba(148,163,184,0.2)',
    detail: '86B neurons · 20W power draw · ~150ms reflex',
  },
  {
    era: '02',
    title: 'AI Revolution',
    year: '2025 CE',
    subtitle: 'MACHINE AWAKENING',
    description: 'Artificial superintelligence surpasses human cognitive benchmarks across all domains. The great disruption: machines rewire civilization, compress decades of progress into months, and begin the countdown to convergence.',
    icon: <Cpu size={32} />,
    color: '#3b82f6',
    glowColor: 'rgba(59,130,246,0.3)',
    gradient: 'from-blue-900 to-blue-950',
    bg: 'rgba(59,130,246,0.06)',
    border: 'rgba(59,130,246,0.25)',
    detail: 'GPT-∞ · AGI achieved · Recursive self-improvement',
  },
  {
    era: '03',
    title: 'Human Enhancement',
    year: '2031 CE',
    subtitle: 'EARLY AUGMENTATION',
    description: 'First generation of bionic implants enter clinical deployment. Neural interfaces, synthetic limbs, and sensory expansions begin closing the gap between human and machine. The boundary starts to blur.',
    icon: <Zap size={32} />,
    color: '#a855f7',
    glowColor: 'rgba(168,85,247,0.3)',
    gradient: 'from-purple-900 to-purple-950',
    bg: 'rgba(168,85,247,0.06)',
    border: 'rgba(168,85,247,0.25)',
    detail: 'BCI implants · Neuroprosthetics · Genome editing',
  },
  {
    era: '04',
    title: 'Cyborg Integration',
    year: '2038 CE',
    subtitle: 'THE CONVERGENCE',
    description: 'Full neural-digital merger achieved. Synthetic subsystems replace degraded biological structures. Continuous AI co-processing at millisecond latency. Humans become the first post-biological intelligence.',
    icon: <Link size={32} />,
    color: '#06b6d4',
    glowColor: 'rgba(6,182,212,0.4)',
    gradient: 'from-cyan-900 to-cyan-950',
    bg: 'rgba(6,182,212,0.08)',
    border: 'rgba(6,182,212,0.35)',
    detail: '98.3% sync rate · 0.003ms latency · 47× baseline',
  },
  {
    era: '05',
    title: 'Super Intelligence',
    year: '2045 CE',
    subtitle: 'TRANSCENDENCE',
    description: 'The Technological Singularity arrives. Augmented humanity achieves recursive self-improvement. Consciousness unbounded from biology. Collective intelligence spans planetary networks, solving problems once deemed impossible.',
    icon: <Brain size={32} />,
    color: '#ec4899',
    glowColor: 'rgba(236,72,153,0.4)',
    gradient: 'from-pink-900 to-pink-950',
    bg: 'rgba(236,72,153,0.08)',
    border: 'rgba(236,72,153,0.35)',
    detail: '∞ IQ · Planetary network · Singularity achieved',
  },
];

function StageCard({ stage, index }: { stage: typeof stages[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className={`relative flex items-center gap-0 md:gap-12 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col`}>

      {/* Content card */}
      <motion.div
        className={`flex-1 ${isEven ? 'md:text-right' : 'md:text-left'} text-left`}
        initial={{ opacity: 0, x: isEven ? -60 : 60 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="inline-block rounded-xl overflow-hidden border p-6 md:p-8 max-w-lg group hover:-translate-y-1 transition-transform duration-300"
          style={{ borderColor: stage.border, background: stage.bg, backdropFilter: 'blur(20px)' }}>

          {/* Era + year header */}
          <div className={`flex items-center gap-3 mb-4 ${isEven ? 'md:justify-end' : 'md:justify-start'} justify-start`}>
            <span className="font-mono-cyber text-[10px] tracking-[0.3em]" style={{ color: `${stage.color}80` }}>
              STAGE {stage.era}
            </span>
            <div className="h-px flex-1 max-w-[60px]" style={{ background: `linear-gradient(${isEven ? '90deg' : '270deg'}, ${stage.color}60, transparent)` }} />
            <span className="font-mono-cyber text-[10px]" style={{ color: `${stage.color}60` }}>{stage.year}</span>
          </div>

          {/* Subtitle */}
          <div className="text-[9px] tracking-[0.25em] mb-2 font-mono-cyber" style={{ color: `${stage.color}70` }}>
            {stage.subtitle}
          </div>

          {/* Title */}
          <h3 className="mb-3" style={{ fontFamily: 'Orbitron', fontSize: '1.4rem', fontWeight: 800, color: stage.color, letterSpacing: '0.02em', textShadow: `0 0 30px ${stage.glowColor}` }}>
            {stage.title}
          </h3>

          <p className="text-gray-400 mb-4 text-sm leading-relaxed" style={{ fontFamily: 'Exo 2' }}>
            {stage.description}
          </p>

          {/* Detail tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded border"
            style={{ borderColor: `${stage.color}25`, background: `${stage.color}08` }}>
            <div className="w-1 h-1 rounded-full" style={{ background: stage.color }} />
            <span className="text-[9px] font-mono-cyber" style={{ color: `${stage.color}80` }}>{stage.detail}</span>
          </div>
        </div>
      </motion.div>

      {/* Center node */}
      <motion.div
        className="relative flex-shrink-0 z-10 my-4 md:my-0"
        initial={{ opacity: 0, scale: 0 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.div
          className="w-20 h-20 rounded-full flex items-center justify-center relative"
          style={{ background: `radial-gradient(circle, ${stage.bg} 0%, rgba(0,0,0,0.4) 100%)`, border: `2px solid ${stage.color}40` }}
          animate={{ boxShadow: [`0 0 20px ${stage.glowColor}`, `0 0 50px ${stage.glowColor}`, `0 0 20px ${stage.glowColor}`] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div style={{ color: stage.color }}>{stage.icon}</div>
        </motion.div>
        {/* Era label */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-mono-cyber text-[10px] whitespace-nowrap" style={{ color: `${stage.color}60` }}>
          [{stage.era}]
        </div>
      </motion.div>

      {/* Right spacer */}
      <div className="flex-1 hidden md:block" />
    </div>
  );
}

export function Timeline() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.4), rgba(6,182,212,0.4), transparent)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-24">
          <motion.div
            className="inline-flex items-center gap-3 mb-6"
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          >
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, transparent, #a855f7)' }} />
            <span className="text-[10px] tracking-[0.3em] text-purple-400 font-mono-cyber">EVOLUTIONARY TIMELINE</span>
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, #a855f7, transparent)' }} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontFamily: 'Orbitron',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #fff 20%, #a855f7 60%, #06b6d4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}
          >
            THE PATH TO<br />TRANSCENDENCE
          </motion.h2>

          <motion.p
            className="mt-6 max-w-2xl mx-auto text-gray-400"
            style={{ fontFamily: 'Exo 2', fontSize: '1.05rem', lineHeight: 1.7 }}
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.7, delay: 0.2 }}
          >
            Five defining epochs in humanity's transformation from biological beings to post-human superintelligences.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px hidden md:block"
            style={{ background: 'linear-gradient(180deg, transparent, rgba(6,182,212,0.2) 10%, rgba(6,182,212,0.2) 90%, transparent)' }}>
            <motion.div className="absolute top-0 left-0 right-0 origin-top"
              style={{ height: lineHeight, background: 'linear-gradient(180deg, #06b6d4, #a855f7, #ec4899)' }}
            />
          </div>

          <div className="flex flex-col gap-20 md:gap-24">
            {stages.map((stage, i) => <StageCard key={stage.era} stage={stage} index={i} />)}
          </div>
        </div>
      </div>

      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-0 w-96 h-96 rounded-full opacity-4"
          style={{ background: 'radial-gradient(ellipse, #a855f7 0%, transparent 70%)', filter: 'blur(80px)' }} />
        <div className="absolute bottom-1/3 right-0 w-80 h-80 rounded-full opacity-4"
          style={{ background: 'radial-gradient(ellipse, #06b6d4 0%, transparent 70%)', filter: 'blur(80px)' }} />
      </div>
    </section>
  );
}
