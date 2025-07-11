import React from 'react';

// This component generates the CSS needed for our particle animations.
// It's kept separate for clarity.
const AnimationStyles = () => (
  <style>{`
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    /* 
      The key animation for the particles.
      - It moves them from the bottom of the screen to just off the top.
      - A gentle horizontal sway is added using translateX.
      - Opacity fades in and out for a soft appearance/disappearance.
    */
    @keyframes drift {
      0% {
        transform: translateY(0) translateX(0);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        transform: translateY(-100vh) translateX(var(--drift-x, 20px));
        opacity: 0;
      }
    }
  `}</style>
);

const CelestialParticles = () => {
  // We'll create a set of particles programmatically.
  // In a real-world scenario, you might generate more, but 40 is a great number
  // to create a lush yet uncluttered feel.
  const particleCount = 40;
  const particles = Array.from({ length: particleCount }).map((_, index) => {
    const size = Math.random() * 3 + 1; // Size from 1px to 4px
    const duration = Math.random() * 20 + 15; // Animation duration between 15s and 35s
    const delay = Math.random() * -30; // Negative delay makes them start at different points
    const left = Math.random() * 100; // Random horizontal start position
    const driftX = (Math.random() - 0.5) * 100; // Random horizontal drift

    return {
      id: index,
      style: {
        width: `${size}px`,
        height: `${size}px`,
        left: `${left}%`,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        // CSS custom properties are used to pass values to the keyframe animation
        '--drift-x': `${driftX}px`
      }
    };
  });

  return (
    <>
      <AnimationStyles />
      <div 
        className="celestial-background"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: -1,
          overflow: 'hidden',
          // A beautiful, deep, and professional blue gradient
          background: 'linear-gradient(180deg, #111827, #040714)',
          animation: 'fadeIn 1.5s ease-out forwards'
        }}
      >
        {particles.map(p => (
          <div
            key={p.id}
            className="particle"
            style={{
              position: 'absolute',
              bottom: 0,
              borderRadius: '50%',
              background: '#FFD700', // A rich gold color
              // The box-shadow is what creates the soft, "lovable" glow
              boxShadow: '0 0 8px #FFD700, 0 0 12px #FFC700',
              animationName: 'drift',
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite',
              ...p.style
            }}
          />
        ))}
      </div>
    </>
  );
};

export default CelestialParticles;