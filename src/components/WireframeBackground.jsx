import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WireframeBackground = () => {
  const svgRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Draw paths on scroll ──────────────────────────────────────────────
      const paths = svgRef.current.querySelectorAll('.wire-path');
      paths.forEach((path, i) => {
        const length = path.getTotalLength ? path.getTotalLength() : 800;
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

        gsap.to(path, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: 'body',
            start: `${i * 8}% top`,
            end: `${i * 8 + 35}% top`,
            scrub: 1.5,
          },
        });
      });

      // ── Node pulse ────────────────────────────────────────────────────────
      gsap.to('.wire-node', {
        opacity: 0.08,
        duration: 2,
        stagger: { each: 0.3, repeat: -1, yoyo: true },
        ease: 'sine.inOut',
      });

      // ── Floating scanline ─────────────────────────────────────────────────
      gsap.to('.scanline', {
        y: '100vh',
        duration: 6,
        ease: 'none',
        repeat: -1,
      });

      // ── Corner text opacity pulse ─────────────────────────────────────────
      gsap.to('.sys-text', {
        opacity: 0.3,
        duration: 1.8,
        yoyo: true,
        repeat: -1,
        ease: 'power1.inOut',
        stagger: 0.5,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Scanline sweep */}
      <div
        className="scanline absolute top-0 left-0 right-0 h-px opacity-20"
        style={{ background: 'linear-gradient(90deg, transparent, #00FF41, transparent)' }}
      />

      {/* Main SVG wireframe */}
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ── Circuit Paths ── */}
        {/* Horizontal main lines */}
        <path className="wire-path" d="M-50 80 H300 V200 H700 V80 H1000 V180 H1490" stroke="#00FF41" strokeWidth="0.8" fill="none" opacity="0.6"/>
        <path className="wire-path" d="M-50 820 H400 V700 H900 V820 H1490" stroke="#00FF41" strokeWidth="0.8" fill="none" opacity="0.6"/>

        {/* Vertical spines */}
        <path className="wire-path" d="M200 -50 V180 H600 V400 H200 V700 H450 V950" stroke="#00FF41" strokeWidth="0.6" fill="none" opacity="0.5"/>
        <path className="wire-path" d="M1240 -50 V200 H900 V450 H1240 V750 H1000 V950" stroke="#00FF41" strokeWidth="0.6" fill="none" opacity="0.5"/>

        {/* Danger accent lines */}
        <path className="wire-path" d="M1490 300 H1100 V500 H600 V300 H100 V500 H-50" stroke="#FF003C" strokeWidth="0.7" fill="none" opacity="0.4"/>
        <path className="wire-path" d="M-50 600 H250 V400 H750 V600 H1200 V400 H1490" stroke="#FF003C" strokeWidth="0.5" fill="none" opacity="0.3"/>

        {/* Diagonal cross lines */}
        <path className="wire-path" d="M0 0 L400 350 L720 200 L1100 500 L1440 300" stroke="#ffffff" strokeWidth="0.3" fill="none" opacity="0.15"/>
        <path className="wire-path" d="M1440 900 L1000 550 L720 700 L350 400 L0 600" stroke="#ffffff" strokeWidth="0.3" fill="none" opacity="0.15"/>

        {/* Inner grid boxes */}
        <path className="wire-path" d="M580 230 H860 V520 H580 Z" stroke="#00FF41" strokeWidth="0.5" fill="none" opacity="0.25"/>
        <path className="wire-path" d="M100 350 H350 V580 H100 Z" stroke="#FF003C" strokeWidth="0.4" fill="none" opacity="0.2"/>
        <path className="wire-path" d="M1090 350 H1340 V580 H1090 Z" stroke="#FF003C" strokeWidth="0.4" fill="none" opacity="0.2"/>

        {/* ── Nodes ── */}
        {[
          [300, 80], [700, 80], [1000, 80], [200, 200], [600, 400],
          [200, 700], [450, 950], [1240, 200], [900, 450], [1240, 750],
          [1100, 500], [600, 300], [100, 500], [720, 200], [1100, 500],
          [580, 230], [860, 230], [580, 520], [860, 520],
        ].map(([cx, cy], i) => (
          <circle
            key={i}
            className="wire-node"
            cx={cx}
            cy={cy}
            r={i % 3 === 0 ? 4 : 2.5}
            fill={i % 4 === 0 ? '#FF003C' : '#00FF41'}
            opacity="0.5"
          />
        ))}

        {/* ── Corner system labels ── */}
        <text className="sys-text" x="16" y="22" fill="#00FF41" fontSize="9" fontFamily="JetBrains Mono, monospace" opacity="0.6">
          SYS://PORTFOLIO_V2.0
        </text>
        <text className="sys-text" x="16" y="892" fill="#FF003C" fontSize="9" fontFamily="JetBrains Mono, monospace" opacity="0.6">
          STATUS:_ONLINE &gt;&gt; ACCEPTING_CONNECTIONS
        </text>
        <text className="sys-text" x="1150" y="892" fill="#00FF41" fontSize="9" fontFamily="JetBrains Mono, monospace" opacity="0.6">
          BUILD:_2026.07.01
        </text>
        <text className="sys-text" x="1280" y="22" fill="#FF003C" fontSize="9" fontFamily="JetBrains Mono, monospace" opacity="0.6">
          ROOT_ACCESS
        </text>
      </svg>

      {/* Subtle vignette overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, #050505 100%)',
        }}
      />
    </div>
  );
};

export default WireframeBackground;
