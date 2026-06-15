import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
}

export function BackgroundEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const [scanLine, setScanLine] = useState(0);
  const scanLineRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const colors = ['#06b6d4', '#a855f7', '#3b82f6', '#8b5cf6', '#ec4899'];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const spawnParticle = (x?: number, y?: number): Particle => ({
      x: x ?? Math.random() * canvas.width,
      y: y ?? Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: -Math.random() * 0.7 - 0.1,
      size: Math.random() * 1.8 + 0.3,
      opacity: Math.random() * 0.5 + 0.15,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 0,
      maxLife: Math.random() * 250 + 100,
    });

    for (let i = 0; i < 150; i++) particlesRef.current.push(spawnParticle());

    const drawGrid = () => {
      ctx.strokeStyle = 'rgba(6,182,212,0.035)';
      ctx.lineWidth = 1;
      const cell = 70;
      for (let x = 0; x < canvas.width; x += cell) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += cell) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }
    };

    const nodePositions = [
      [0.08, 0.18], [0.92, 0.12], [0.04, 0.62],
      [0.96, 0.58], [0.5, 0.06], [0.28, 0.88],
      [0.72, 0.92], [0.14, 0.96], [0.86, 0.85],
    ];

    const drawNodesAndLines = (t: number) => {
      nodePositions.forEach(([nx, ny], i) => {
        const px = nx * canvas.width;
        const py = ny * canvas.height;
        const pulse = 0.5 + 0.5 * Math.sin(t * 0.001 + i * 0.9);

        nodePositions.forEach(([nx2, ny2], j) => {
          if (j <= i) return;
          const px2 = nx2 * canvas.width;
          const py2 = ny2 * canvas.height;
          const dist = Math.hypot(px2 - px, py2 - py);
          if (dist < canvas.width * 0.4) {
            const a = (1 - dist / (canvas.width * 0.4)) * 0.07 * pulse;
            ctx.strokeStyle = `rgba(6,182,212,${a})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px2, py2); ctx.stroke();
          }
        });

        ctx.beginPath();
        ctx.arc(px, py, 2 + pulse * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6,182,212,${0.25 + pulse * 0.5})`;
        ctx.fill();

        const grd = ctx.createRadialGradient(px, py, 0, px, py, 35);
        grd.addColorStop(0, `rgba(6,182,212,${0.1 * pulse})`);
        grd.addColorStop(1, 'transparent');
        ctx.beginPath(); ctx.arc(px, py, 35, 0, Math.PI * 2);
        ctx.fillStyle = grd; ctx.fill();
      });
    };

    let t = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawGrid();
      drawNodesAndLines(t);

      particlesRef.current.forEach((p, idx) => {
        p.x += p.vx; p.y += p.vy; p.life++;
        const lifeRatio = p.life / p.maxLife;
        const alpha = p.opacity * (1 - lifeRatio);
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.globalAlpha = 1;
        if (p.life >= p.maxLife || p.y < -10) particlesRef.current[idx] = spawnParticle();
      });

      // Data streams
      [0.15, 0.38, 0.62, 0.85].forEach((sx, si) => {
        const x = sx * canvas.width;
        const offset = ((t * 0.5 + si * 280) % (canvas.height + 140));
        const grad = ctx.createLinearGradient(x, offset - 140, x, offset);
        grad.addColorStop(0, 'transparent');
        grad.addColorStop(1, si % 2 === 0 ? 'rgba(6,182,212,0.15)' : 'rgba(168,85,247,0.15)');
        ctx.strokeStyle = grad; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(x, offset - 140); ctx.lineTo(x, offset); ctx.stroke();
      });

      // Scan line
      scanLineRef.current = (scanLineRef.current + 2.5) % canvas.height;
      setScanLine(Math.floor(scanLineRef.current));

      t++;
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animate();

    const handleMouse = (e: MouseEvent) => {
      if (Math.random() < 0.25) {
        particlesRef.current.push(
          spawnParticle(e.clientX + (Math.random() - 0.5) * 30, e.clientY + (Math.random() - 0.5) * 30)
        );
      }
    };
    window.addEventListener('mousemove', handleMouse);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #020208 0%, #050510 50%, #02020a 100%)' }} />

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute rounded-full" style={{
          top: '-10%', left: '10%', width: '900px', height: '700px',
          background: 'radial-gradient(ellipse, rgba(6,182,212,0.09) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }} />
        <div className="absolute rounded-full" style={{
          bottom: '5%', right: '5%', width: '700px', height: '600px',
          background: 'radial-gradient(ellipse, rgba(168,85,247,0.08) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }} />
        <div className="absolute rounded-full" style={{
          top: '50%', left: '50%', width: '500px', height: '400px', transform: 'translate(-50%,-50%)',
          background: 'radial-gradient(ellipse, rgba(59,130,246,0.05) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }} />
      </div>

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="absolute left-0 right-0 pointer-events-none" style={{
        top: `${scanLine}px`, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.35), rgba(6,182,212,0.7), rgba(6,182,212,0.35), transparent)',
        boxShadow: '0 0 10px rgba(6,182,212,0.5)',
      }} />

      {/* Corner HUD brackets */}
      {[
        { style: 'top-4 left-4', d: 'M0 24 L0 0 L24 0' },
        { style: 'top-4 right-4 scale-x-[-1]', d: 'M0 24 L0 0 L24 0' },
        { style: 'bottom-4 left-4 scale-y-[-1]', d: 'M0 24 L0 0 L24 0' },
        { style: 'bottom-4 right-4 scale-x-[-1] scale-y-[-1]', d: 'M0 24 L0 0 L24 0' },
      ].map((c, i) => (
        <div key={i} className={`absolute ${c.style} opacity-25`}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d={c.d} stroke="#06b6d4" strokeWidth="1.5" />
          </svg>
        </div>
      ))}

      {/* Radar widget */}
      <div className="absolute bottom-10 right-10 w-28 h-28 opacity-15">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {[48, 32, 16].map(r => (
            <circle key={r} cx="50" cy="50" r={r} fill="none" stroke="#06b6d4" strokeWidth="0.5" />
          ))}
          <line x1="50" y1="2" x2="50" y2="98" stroke="#06b6d4" strokeWidth="0.4" />
          <line x1="2" y1="50" x2="98" y2="50" stroke="#06b6d4" strokeWidth="0.4" />
          <motion.g style={{ transformOrigin: '50px 50px' }} animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}>
            <line x1="50" y1="50" x2="98" y2="50" stroke="url(#rsweep)" strokeWidth="1.5" />
          </motion.g>
          <defs>
            <linearGradient id="rsweep" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.9" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
