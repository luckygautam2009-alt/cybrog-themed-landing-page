import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { TechShowcase } from './components/TechShowcase';
import { Timeline } from './components/Timeline';
import { Testimonials } from './components/Testimonials';
import { CTASection } from './components/CTASection';
import { BackgroundEffects } from './components/BackgroundEffects';
import { motion } from 'motion/react';

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ background: '#020208', cursor: 'none' }}>
      <BackgroundEffects />

      <main className="relative z-10">
        <Hero />
        <Features />
        <TechShowcase />
        <Timeline />
        <Testimonials />
        <CTASection />
      </main>

      {/* Footer */}
      <footer className="relative z-10" style={{ borderTop: '1px solid rgba(6,182,212,0.15)', background: 'rgba(2,2,8,0.9)', backdropFilter: 'blur(30px)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
            {/* Brand */}
            <div className="md:col-span-2 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded border border-cyan-500/40 flex items-center justify-center" style={{ background: 'rgba(6,182,212,0.1)' }}>
                  <div className="w-3 h-3 rounded-sm bg-cyan-400" style={{ boxShadow: '0 0 8px #06b6d4' }} />
                </div>
                <span style={{ fontFamily: 'Orbitron', fontSize: '14px', fontWeight: 700, letterSpacing: '0.1em', color: '#fff' }}>CYBERCORE</span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed" style={{ fontFamily: 'Exo 2' }}>
                Pioneering the convergence of human biology and synthetic intelligence since 2031. Augmenting humanity, one integration at a time.
              </p>
              <div className="flex gap-3">
                {['X', 'IN', 'GH', 'YT'].map(s => (
                  <a key={s} href="#" className="w-8 h-8 rounded border border-cyan-500/20 flex items-center justify-center text-xs text-gray-500 hover:text-cyan-400 hover:border-cyan-500/40 transition-all duration-300"
                    style={{ fontFamily: 'Orbitron', background: 'rgba(6,182,212,0.03)' }}>
                    {s}
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {[
              { title: 'TECHNOLOGY', links: ['Neural Chips', 'Ocular Systems', 'Exoskeleton', 'Memory Array', 'SynaptiLink'] },
              { title: 'COMPANY', links: ['About', 'Research', 'Careers', 'Ethics Board', 'Press'] },
              { title: 'LEGAL', links: ['Privacy', 'Terms', 'Compliance', 'Consent Framework'] },
            ].map(col => (
              <div key={col.title}>
                <div className="text-[9px] tracking-[0.25em] text-cyan-400/60 font-mono-cyber mb-4">{col.title}</div>
                <ul className="space-y-2.5">
                  {col.links.map(link => (
                    <li key={link}>
                      <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors duration-300"
                        style={{ fontFamily: 'Exo 2' }}>
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8" style={{ borderTop: '1px solid rgba(6,182,212,0.08)' }}>
            <div className="text-xs text-gray-600 font-mono-cyber">
              © 2026 CYBERCORE TECHNOLOGIES — ALL RIGHTS RESERVED
            </div>
            <div className="flex items-center gap-6">
              <motion.div
                className="flex items-center gap-2"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" style={{ boxShadow: '0 0 6px #4ade80' }} />
                <span className="text-[9px] text-gray-500 font-mono-cyber">ALL SYSTEMS OPERATIONAL</span>
              </motion.div>
              <div className="text-[9px] text-gray-600 font-mono-cyber">v4.7.2-stable</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
