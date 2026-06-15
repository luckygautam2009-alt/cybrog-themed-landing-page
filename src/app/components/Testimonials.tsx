import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Star, Zap } from 'lucide-react';

const testimonials = [
  {
    name: 'Dr. Kira Nakamura',
    role: 'Neural Surgeon, CyberCore Institute',
    designation: 'Augmentation Level 4',
    quote: 'The NeuroChip X-9 integration exceeded every clinical expectation. My surgical precision improved by an order of magnitude — I can now operate at the nanoscale with machine-assisted accuracy. The latency is imperceptible. It genuinely feels like an extension of thought.',
    rating: 5,
    augmentations: ['Neural Chip', 'Ocular HUD', 'Memory Bank'],
    color: '#06b6d4',
    avatar: 'KN',
    syncRate: '99.2%',
    uptime: '847 days',
  },
  {
    name: 'Marcus Okafor',
    role: 'Combat Systems Engineer, Elysium Corp',
    designation: 'Augmentation Level 7',
    quote: 'TitanFrame MK-IV changed the definition of human physical limits. Operational in environments that would kill unaugmented personnel. The adaptive camouflage is seamlessly integrated — I stopped thinking of it as hardware after the first week.',
    rating: 5,
    augmentations: ['TitanFrame', 'Neural Link', 'SynaptiHub'],
    color: '#a855f7',
    avatar: 'MO',
    syncRate: '98.7%',
    uptime: '1,203 days',
  },
  {
    name: 'Aria Chen',
    role: 'Quantum Researcher, HelixOS Labs',
    designation: 'Augmentation Level 5',
    quote: 'MemPlex Array transformed my research throughput. I now hold 847 active research threads in parallel with zero context degradation. The OTA update cycle is seamless — each version is noticeably smarter. This is what scientific human potential looks like.',
    rating: 5,
    augmentations: ['MemPlex', 'Neural Chip', 'OcuSync'],
    color: '#ec4899',
    avatar: 'AC',
    syncRate: '99.8%',
    uptime: '512 days',
  },
  {
    name: 'Viktor Volkov',
    role: 'Special Operations, Aegis Division',
    designation: 'Augmentation Level 9',
    quote: 'SpineCore v7 gave me capabilities that exist outside any previous human performance envelope. What used to be impossible reaction times are now my baseline. Full-spectrum integration with zero rejection events across 3 years of operational deployment.',
    rating: 5,
    augmentations: ['SpineCore', 'TitanFrame', 'Neural Chip'],
    color: '#3b82f6',
    avatar: 'VV',
    syncRate: '100%',
    uptime: '1,096 days',
  },
  {
    name: 'Lyra Santos',
    role: 'AI Ethics Director, Nexus Foundation',
    designation: 'Augmentation Level 3',
    quote: 'The ethical frameworks CyberCore has embedded into their augmentation stack are as impressive as the technology itself. Human agency is preserved. I am still fundamentally myself — but optimized. The consent architecture is the gold standard for the industry.',
    rating: 5,
    augmentations: ['Neural Chip', 'MemPlex', 'OcuSync'],
    color: '#8b5cf6',
    avatar: 'LS',
    syncRate: '97.4%',
    uptime: '388 days',
  },
];

function TestimonialCard({ t, index }: { t: typeof testimonials[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      className="flex-shrink-0 relative group"
      style={{ width: '380px' }}
      initial={{ opacity: 0, x: 60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1 }}
    >
      {/* Glow on hover */}
      <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(135deg, ${t.color}25, transparent 50%, ${t.color}15)` }}
      />

      <div className="relative h-full rounded-2xl border p-8 overflow-hidden transition-transform duration-400 group-hover:-translate-y-2"
        style={{
          borderColor: `${t.color}20`,
          background: 'linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* Top accent */}
        <div className="absolute top-0 left-12 right-12 h-px" style={{ background: `linear-gradient(90deg, transparent, ${t.color}50, transparent)` }} />

        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          {/* Avatar ring */}
          <div className="relative">
            <motion.div
              className="absolute -inset-1 rounded-full"
              style={{ border: `1px solid ${t.color}40` }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />
            <div className="w-14 h-14 rounded-full flex items-center justify-center relative"
              style={{ background: `linear-gradient(135deg, ${t.color}30, ${t.color}10)`, border: `2px solid ${t.color}50` }}>
              <span style={{ fontFamily: 'Orbitron', fontSize: '0.75rem', fontWeight: 700, color: t.color }}>{t.avatar}</span>
              <motion.div className="absolute inset-0 rounded-full opacity-40"
                style={{ background: `radial-gradient(circle, ${t.color}30, transparent)` }}
                animate={{ opacity: [0.2, 0.6, 0.2] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </div>

          {/* Stars */}
          <div className="flex gap-1">
            {Array.from({ length: t.rating }).map((_, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1 + i * 0.05 + 0.3 }}
              >
                <Star size={12} fill={t.color} style={{ color: t.color }} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Name + role */}
        <div className="mb-1" style={{ fontFamily: 'Orbitron', fontSize: '0.9rem', fontWeight: 700, color: '#fff' }}>
          {t.name}
        </div>
        <div className="text-xs text-gray-500 mb-1" style={{ fontFamily: 'Exo 2' }}>{t.role}</div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded mb-5"
          style={{ background: `${t.color}10`, border: `1px solid ${t.color}25` }}>
          <Zap size={9} style={{ color: t.color }} />
          <span className="text-[9px] font-mono-cyber" style={{ color: `${t.color}80` }}>{t.designation}</span>
        </div>

        {/* Quote */}
        <blockquote className="text-gray-400 text-sm leading-relaxed mb-6" style={{ fontFamily: 'Exo 2', lineHeight: 1.7 }}>
          "{t.quote}"
        </blockquote>

        {/* Stats row */}
        <div className="flex items-center gap-4 pt-4 border-t" style={{ borderColor: `${t.color}12` }}>
          <div>
            <div className="text-[8px] text-gray-500 tracking-wider font-mono-cyber mb-0.5">SYNC RATE</div>
            <div style={{ fontFamily: 'Orbitron', fontSize: '0.85rem', fontWeight: 700, color: t.color }}>{t.syncRate}</div>
          </div>
          <div>
            <div className="text-[8px] text-gray-500 tracking-wider font-mono-cyber mb-0.5">UPTIME</div>
            <div style={{ fontFamily: 'Orbitron', fontSize: '0.85rem', fontWeight: 700, color: t.color }}>{t.uptime}</div>
          </div>
          <div className="ml-auto flex flex-wrap gap-1">
            {t.augmentations.map(aug => (
              <span key={aug} className="px-1.5 py-0.5 rounded text-[8px] font-mono-cyber"
                style={{ background: `${t.color}10`, color: `${t.color}70`, border: `1px solid ${t.color}20` }}>
                {aug}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(236,72,153,0.4), rgba(168,85,247,0.4), transparent)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            className="inline-flex items-center gap-3 mb-6"
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          >
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, transparent, #ec4899)' }} />
            <span className="text-[10px] tracking-[0.3em] text-pink-400 font-mono-cyber">FIELD REPORTS</span>
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, #ec4899, transparent)' }} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontFamily: 'Orbitron',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #fff 20%, #ec4899 60%, #a855f7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}
          >
            AUGMENTED<br />TESTIMONIALS
          </motion.h2>

          <motion.p
            className="mt-6 text-gray-400 max-w-xl mx-auto"
            style={{ fontFamily: 'Exo 2', fontSize: '1.05rem', lineHeight: 1.7 }}
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}
          >
            Real experiences from the enhanced. Verified data from integrated humans operating beyond biological limits.
          </motion.p>
        </div>

        {/* Scrolling track */}
        <div className="overflow-x-auto pb-6" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(6,182,212,0.3) transparent' }}>
          <div className="flex gap-6 w-max px-2">
            {testimonials.map((t, i) => <TestimonialCard key={t.name} t={t} index={i} />)}
          </div>
        </div>

        {/* Summary stats */}
        <motion.div
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.4 }}
        >
          {[
            { value: '2,847', label: 'AUGMENTED HUMANS', color: '#06b6d4' },
            { value: '99.4%', label: 'SATISFACTION RATE', color: '#a855f7' },
            { value: '0.002%', label: 'REJECTION RATE', color: '#ec4899' },
            { value: '∞', label: 'UPSIDE POTENTIAL', color: '#3b82f6' },
          ].map(s => (
            <div key={s.label} className="rounded-xl border p-6 text-center"
              style={{ borderColor: `${s.color}20`, background: `${s.color}05`, backdropFilter: 'blur(20px)' }}>
              <div style={{ fontFamily: 'Orbitron', fontSize: '2rem', fontWeight: 800, color: s.color, textShadow: `0 0 30px ${s.color}60` }}>
                {s.value}
              </div>
              <div className="text-[9px] text-gray-500 tracking-widest mt-1 font-mono-cyber">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
