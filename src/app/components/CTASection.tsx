import { motion, useInView, useMotionValue, useSpring } from 'motion/react';
import { useRef, useState } from 'react';
import { ArrowRight, Zap, Shield, Globe } from 'lucide-react';

function HolographicPortal() {
  return (
    <div className="relative w-full flex items-center justify-center" style={{ height: '500px' }}>
      <svg viewBox="0 0 600 500" className="absolute inset-0 w-full h-full" fill="none" preserveAspectRatio="xMidYMid meet">
        <defs>
          <radialGradient id="portalCore" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.9" />
            <stop offset="30%" stopColor="#3b82f6" stopOpacity="0.5" />
            <stop offset="70%" stopColor="#a855f7" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="portalOuter" cx="50%" cy="50%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="60%" stopColor="#06b6d4" stopOpacity="0.08" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <filter id="portalGlow">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="bigGlow">
            <feGaussianBlur stdDeviation="8" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Outer energy field */}
        <circle cx="300" cy="250" r="220" fill="url(#portalOuter)" />

        {/* Rotating rings */}
        {[200, 170, 145, 120].map((r, i) => (
          <motion.circle key={r} cx="300" cy="250" r={r}
            fill="none"
            stroke={i % 2 === 0 ? '#06b6d4' : '#a855f7'}
            strokeWidth={i === 0 ? 1 : 0.6}
            strokeDasharray={i === 0 ? '8 6' : i === 1 ? '4 8' : '2 12'}
            opacity={0.4 - i * 0.05}
            style={{ transformOrigin: '300px 250px' }}
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 6 + i * 3, repeat: Infinity, ease: 'linear' }}
          />
        ))}

        {/* Inner portal glow */}
        <motion.circle cx="300" cy="250" r="90" fill="url(#portalCore)"
          animate={{ r: [85, 95, 85] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.circle cx="300" cy="250" r="70" fill="none" stroke="#06b6d4" strokeWidth="2" filter="url(#portalGlow)"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.circle cx="300" cy="250" r="45" fill="#050a15"
          animate={{ r: [42, 48, 42] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.circle cx="300" cy="250" r="20" fill="#06b6d4" filter="url(#bigGlow)"
          animate={{ r: [18, 24, 18], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Light beams */}
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i / 8) * Math.PI * 2;
          const x1 = 300 + Math.cos(a) * 95, y1 = 250 + Math.sin(a) * 95;
          const x2 = 300 + Math.cos(a) * 210, y2 = 250 + Math.sin(a) * 210;
          return (
            <motion.line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="url(#beamGrad)" strokeWidth="1.5"
              animate={{ opacity: [0.1, 0.6, 0.1] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.25 }}
            />
          );
        })}

        {/* Particle orbits */}
        {[160, 185].map((r, ri) => (
          Array.from({ length: ri === 0 ? 6 : 4 }).map((_, i) => {
            const total = ri === 0 ? 6 : 4;
            const phaseOffset = (i / total) * Math.PI * 2;
            return (
              <motion.circle key={`${ri}-${i}`} r="3" fill={ri === 0 ? '#06b6d4' : '#a855f7'}
                filter="url(#portalGlow)"
                style={{ transformOrigin: '300px 250px' }}
                animate={{
                  cx: [300 + Math.cos(phaseOffset) * r],
                  cy: [250 + Math.sin(phaseOffset) * r],
                  rotate: 360,
                }}
                initial={{ rotate: 0 }}
                transition={{
                  rotate: { duration: ri === 0 ? 4 : 7, repeat: Infinity, ease: 'linear' },
                }}
                custom={phaseOffset}
              >
                <animateMotion dur={`${ri === 0 ? 4 : 7}s`} repeatCount="indefinite">
                  <mpath href={`#orbit${ri}`} />
                </animateMotion>
              </motion.circle>
            );
          })
        ))}

        {/* Orbit paths (invisible) */}
        <ellipse id="orbit0" cx="300" cy="250" rx="160" ry="160" fill="none" />
        <ellipse id="orbit1" cx="300" cy="250" rx="185" ry="185" fill="none" />

        <defs>
          <linearGradient id="beamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export function CTASection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [hovered, setHovered] = useState(false);

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.5), rgba(168,85,247,0.5), transparent)' }} />

      {/* Background portal glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(6,182,212,0.07) 0%, rgba(168,85,247,0.05) 40%, transparent 70%)', filter: 'blur(40px)' }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Portal visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="order-2 lg:order-1"
          >
            <HolographicPortal />
          </motion.div>

          {/* Text + CTA */}
          <div className="order-1 lg:order-2">
            <motion.div
              className="inline-flex items-center gap-3 mb-8"
              initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}
            >
              <div className="h-px w-8" style={{ background: '#06b6d4' }} />
              <span className="text-[10px] tracking-[0.3em] text-cyan-400 font-mono-cyber">FINAL PROTOCOL</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}
              style={{
                fontFamily: 'Orbitron',
                fontSize: 'clamp(2.2rem, 5vw, 4rem)',
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                background: 'linear-gradient(135deg, #ffffff 0%, #06b6d4 40%, #a855f7 80%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Become Part of<br />The Next<br />Evolution
            </motion.h2>

            <motion.p
              className="mt-6 mb-10 text-gray-400"
              style={{ fontFamily: 'Exo 2', fontSize: '1.05rem', lineHeight: 1.75 }}
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.25 }}
            >
              The portal to post-humanity is open. Join 2,847 pioneers who have already stepped beyond biological limits. Your augmentation protocol begins with a single decision.
            </motion.p>

            {/* Feature pills */}
            <motion.div
              className="flex flex-wrap gap-3 mb-10"
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.35 }}
            >
              {[
                { icon: <Zap size={12} />, text: '72hr Integration', color: '#06b6d4' },
                { icon: <Shield size={12} />, text: 'Lifetime Warranty', color: '#a855f7' },
                { icon: <Globe size={12} />, text: 'Global Network Access', color: '#ec4899' },
              ].map(p => (
                <div key={p.text} className="flex items-center gap-2 px-4 py-2 rounded-full border text-sm"
                  style={{ borderColor: `${p.color}30`, background: `${p.color}08`, color: p.color, fontFamily: 'Rajdhani', fontWeight: 500 }}>
                  {p.icon}
                  {p.text}
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.4 }}
            >
              <motion.button
                onHoverStart={() => setHovered(true)}
                onHoverEnd={() => setHovered(false)}
                className="relative px-10 py-5 overflow-hidden group"
                style={{
                  fontFamily: 'Orbitron',
                  fontSize: '13px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  color: '#000',
                  background: 'linear-gradient(135deg, #06b6d4, #3b82f6, #a855f7)',
                  clipPath: 'polygon(16px 0%, 100% 0%, calc(100% - 16px) 100%, 0% 100%)',
                  boxShadow: hovered ? '0 0 80px rgba(6,182,212,0.6), 0 0 160px rgba(168,85,247,0.3)' : '0 0 40px rgba(6,182,212,0.3)',
                  transition: 'box-shadow 0.3s',
                }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="relative z-10 flex items-center gap-3">
                  ENTER THE PORTAL
                  <motion.div animate={hovered ? { x: [0, 4, 0] } : {}} transition={{ duration: 0.6, repeat: Infinity }}>
                    <ArrowRight size={16} />
                  </motion.div>
                </span>
                <motion.div className="absolute inset-0"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)' }}
                  animate={{ x: ['-200%', '200%'] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
              </motion.button>

              <motion.button
                className="px-8 py-5 text-cyan-400 border border-cyan-500/30 relative overflow-hidden group"
                style={{
                  fontFamily: 'Orbitron',
                  fontSize: '11px',
                  letterSpacing: '0.12em',
                  background: 'rgba(6,182,212,0.04)',
                  clipPath: 'polygon(16px 0%, 100% 0%, calc(100% - 16px) 100%, 0% 100%)',
                }}
                whileHover={{ scale: 1.04, borderColor: 'rgba(6,182,212,0.6)' }}
                whileTap={{ scale: 0.97 }}
              >
                REQUEST DEMO
                <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.08), transparent)' }}
                />
              </motion.button>
            </motion.div>

            {/* Trust badge */}
            <motion.div
              className="mt-10 flex items-center gap-3"
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }}
            >
              <div className="flex">
                {['#06b6d4', '#a855f7', '#ec4899', '#3b82f6', '#8b5cf6'].map((c, i) => (
                  <div key={c} className="w-7 h-7 rounded-full border-2 border-black flex items-center justify-center -ml-1 first:ml-0"
                    style={{ background: `linear-gradient(135deg, ${c}60, ${c}20)`, zIndex: 5 - i }}>
                    <span style={{ fontFamily: 'Orbitron', fontSize: '7px', color: c }}>C{i + 1}</span>
                  </div>
                ))}
              </div>
              <div>
                <div className="text-xs text-white font-medium" style={{ fontFamily: 'Rajdhani' }}>+2,847 augmented and counting</div>
                <div className="text-[10px] text-gray-500 font-mono-cyber">99.4% would augment again</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative energy lines */}
      {[0.2, 0.8].map((pos, i) => (
        <motion.div key={i}
          className="absolute top-0 bottom-0 w-px pointer-events-none"
          style={{ left: `${pos * 100}%`, background: `linear-gradient(180deg, transparent, ${i === 0 ? 'rgba(6,182,212,0.15)' : 'rgba(168,85,247,0.15)'}, transparent)` }}
        />
      ))}
    </section>
  );
}
