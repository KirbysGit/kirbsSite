// aurora.jsx

// i tried to get this to look like the northern lights, but right now its just colorful
// waves. i put too much time into it to not keep it so its STAYING!

// imports.
import React, { useState, useEffect, useRef, useMemo } from 'react';
import styled, { css } from 'styled-components';

// generate smooth wave paths.
function generateWavePath(width = 2400, height = 120, amplitude = 26, frequency = 5, phase = 0, thickness = 36) {
  
  // calculate the step size.
  const step = width / (frequency * 20);

  // arrays for top and bottom waves.
  let topPath = [];
  let bottomPath = [];
  
  // generate top wave from left to right. using sine func w/ our vals.
  for (let x = 0; x <= width; x += step) {
    const y = height/2 + Math.sin((x / width) * frequency * 2 * Math.PI + phase) * amplitude;
    topPath.push({ x, y });
  }
  
  // generate bottom wave from right to left. same pattern but offset by thickness.
  for (let x = width; x >= 0; x -= step) {
    const y = height/2 + Math.sin((x / width) * frequency * 2 * Math.PI + phase) * amplitude + thickness;
    bottomPath.push({ x, y });
  }
  
  // build the path, move to the first top oint, then line through all the top points, then
  // back through all the bottom points, and close it.
  let path = `M${topPath[0].x},${topPath[0].y}`;
  
  // draw the top wave.
  for (let i = 1; i < topPath.length; i++) {
    path += ` L${topPath[i].x},${topPath[i].y}`;
  }
  
  // draw the bottom wave.
  for (let i = 0; i < bottomPath.length; i++) {
    path += ` L${bottomPath[i].x},${bottomPath[i].y}`;
  }
  
  // explicitly close the path to prevent rendering artifacts.
  path += ` Z`;
  
  return path;
}

// actual component.
const Aurora = React.memo(() => {
  // Performance optimization state
  const [isInViewport, setIsInViewport] = useState(false);
  const [isSlowDevice, setIsSlowDevice] = useState(false);
  const [pathsReady, setPathsReady] = useState(false);
  const sectionRef = useRef(null);
  const lastInView = useRef(false); // prevent state thrash
  const rafIdRef = useRef(null); // track pending RAF for cleanup

  // Detect device tier (slow/mid/fast) - more aggressive detection for laptops
  const tier = useMemo(() => {
    if (typeof window === 'undefined') return 'fast';
    const dpr = window.devicePixelRatio || 1;
    const isMobile = window.matchMedia('(max-width: 900px)').matches;
    const cores = navigator.hardwareConcurrency || 4;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // More aggressive detection: laptops often have 4+ cores but are still slower
    // Check for lower-end devices more aggressively
    const isSlow = cores < 4 || prefersReducedMotion;
    // Mid tier: 4-6 cores OR lower DPR OR mobile OR smaller screen
    const isMid = cores <= 6 || dpr < 1.5 || isMobile || window.innerWidth < 1400;
    
    let detectedTier;
    if (isSlow) {
      detectedTier = 'slow';
    } else if (isMid) {
      detectedTier = 'mid';
    } else {
      detectedTier = 'fast';
    }
    
    // Log tier detection for debugging
    console.log('[Aurora] Tier Detection:', {
      tier: detectedTier,
      cores,
      dpr,
      isMobile,
      prefersReducedMotion,
      screenWidth: window.innerWidth,
      waveBudget: detectedTier === 'slow' ? 0 : detectedTier === 'mid' ? 2 : 4
    });
    
    return detectedTier;
  }, []);

  // Detect slower devices
  useEffect(() => {
    const cores = navigator.hardwareConcurrency || 4;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setIsSlowDevice(cores < 4 || prefersReducedMotion);
  }, []);

  // IntersectionObserver to detect when section is in viewport - optimized to prevent thrash
  // Use a more stable approach: observe parent Experience section via document query
  useEffect(() => {
    // Find the parent Experience section instead of observing Aurora itself
    const findExperienceSection = () => {
      const auroraElement = sectionRef.current;
      if (!auroraElement) return null;
      // Traverse up to find the Experience section
      let parent = auroraElement.parentElement;
      while (parent && parent.id !== 'experience') {
        parent = parent.parentElement;
      }
      return parent || document.getElementById('experience');
    };

    const section = findExperienceSection();
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // only update state if value actually changed - use requestAnimationFrame to batch updates
        const next = entry.isIntersecting && entry.intersectionRatio > 0.1;
        if (next !== lastInView.current) {
          lastInView.current = next;
          // Cancel any pending RAF to prevent multiple updates
          if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
          // Batch state update to prevent thrashing during transitions
          rafIdRef.current = requestAnimationFrame(() => {
            setIsInViewport(next);
            rafIdRef.current = null;
          });
        }
      },
      {
        threshold: [0, 0.1, 0.5, 1],
        rootMargin: '200px' // Start animations before entering viewport
      }
    );

    observer.observe(section);
    return () => {
      observer.disconnect();
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, []);

  // Memoize every wave path set. Recompute only when device tier changes.
  const {
    wave1Path, wave1Path2, wave1Path3,
    wave2Path, wave2Path2, wave2Path3,
    wave3Path, wave3Path2, wave3Path3,
    wave4Path, wave4Path2, wave4Path3
  } = useMemo(() => {
    const p = (a, f, ph, t) => ({
      a1: generateWavePath(3200, 120, a, f, ph, t),
      a2: generateWavePath(3200, 120, a + 2, f, ph + Math.PI / 8, t),
      a3: generateWavePath(3200, 120, a - 2, f, ph + Math.PI / 4, t),
    });

    const w1 = p(30, 4, 0, 42);
    const w2 = p(33, 4.5, Math.PI / 3, 46);
    const w3 = p(29, 5, Math.PI / 6, 48);
    const w4 = p(32, 3.8, Math.PI / 2, 44);

    return {
      wave1Path: w1.a1, wave1Path2: w1.a2, wave1Path3: w1.a3,
      wave2Path: w2.a1, wave2Path2: w2.a2, wave2Path3: w2.a3,
      wave3Path: w3.a1, wave3Path2: w3.a2, wave3Path3: w3.a3,
      wave4Path: w4.a1, wave4Path2: w4.a2, wave4Path3: w4.a3,
    };
  }, [tier]); // stable knob based on device tier

  // Memoize style objects to prevent unnecessary DOM updates
  const wave1Style = useMemo(() => ({
    ['--p1']: `path("${wave1Path}")`,
    ['--p2']: `path("${wave1Path2}")`,
    ['--p3']: `path("${wave1Path3}")`,
  }), [wave1Path, wave1Path2, wave1Path3]);

  const wave2Style = useMemo(() => ({
    ['--p1']: `path("${wave2Path}")`,
    ['--p2']: `path("${wave2Path2}")`,
    ['--p3']: `path("${wave2Path3}")`,
  }), [wave2Path, wave2Path2, wave2Path3]);

  const wave3Style = useMemo(() => ({
    ['--p1']: `path("${wave3Path}")`,
    ['--p2']: `path("${wave3Path2}")`,
    ['--p3']: `path("${wave3Path3}")`,
  }), [wave3Path, wave3Path2, wave3Path3]);

  const wave4Style = useMemo(() => ({
    ['--p1']: `path("${wave4Path}")`,
    ['--p2']: `path("${wave4Path2}")`,
    ['--p3']: `path("${wave4Path3}")`,
  }), [wave4Path, wave4Path2, wave4Path3]);

  const staticWaveStyle = useMemo(() => ({
    ['--p1']: `path("${wave1Path}")`,
  }), [wave1Path]);

  // Generate paths off the main thread when possible
  useEffect(() => {
    let canceled = false;
    const run = () => {
      if (!canceled) {
        setPathsReady(true);
      }
    };
    
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(run, { timeout: 200 });
      return () => {
        canceled = true;
        if (window.cancelIdleCallback) {
          window.cancelIdleCallback(id);
        }
      };
    } else {
      const t = setTimeout(run, 0);
      return () => {
        canceled = true;
        clearTimeout(t);
      };
    }
  }, []);

  // Wave budget based on tier
  const waveBudget = tier === 'slow' ? 0 : tier === 'mid' ? 2 : 4; // slow = 0, mid = 2, fast = 4

  // Render minimal placeholder when paths not ready
  if (!pathsReady) {
    return <AuroraLayer ref={sectionRef} $isInViewport={false} $isSlowDevice={true} $tier="slow" />;
  }

  return (
    <AuroraLayer ref={sectionRef} $isInViewport={isInViewport} $isSlowDevice={isSlowDevice} $tier={tier}>
      {/* breathing glow background - reduced to 1 on slow devices */}
      <AuroraGlow $isInViewport={isInViewport} $isSlowDevice={isSlowDevice} $tier={tier} />
      {tier === 'fast' && <AuroraGlow $isInViewport={isInViewport} $isSlowDevice={isSlowDevice} $tier={tier} />}
      
      {/* Conditional rendering: full waves when in viewport, minimal static when out */}
      {isInViewport && waveBudget > 0 ? (
        <>
          {/* first wave */}
          <AuroraWave 
            style={wave1Style}
            $top="16%"
            $opacity={0.55}
            $blur={50}
            $duration={60}
            $delay={0}
            $isInViewport={isInViewport}
            $isSlowDevice={isSlowDevice}
            $tier={tier}
          />
          
          {/* second wave */}
          {waveBudget >= 2 && (
            <AuroraWave 
              style={wave2Style}
              $top="26%"
              $opacity={0.525}
              $blur={60}
              $duration={65}
              $delay={8}
              $isInViewport={isInViewport}
              $isSlowDevice={isSlowDevice}
              $tier={tier}
            />
          )}
          
          {/* third wave */}
          {waveBudget >= 3 && (
            <AuroraWave 
              style={wave3Style}
              $top="36%"
              $opacity={0.5}
              $blur={70}
              $duration={70}
              $delay={15}
              $isInViewport={isInViewport}
              $isSlowDevice={isSlowDevice}
              $tier={tier}
            />
          )}
          
          {/* fourth wave */}
          {waveBudget >= 4 && (
            <AuroraWave 
              style={wave4Style}
              $top="46%"
              $opacity={0.575}
              $blur={80}
              $duration={75}
              $delay={22}
              $isInViewport={isInViewport}
              $isSlowDevice={isSlowDevice}
              $tier={tier}
            />
          )}
        </>
      ) : !isInViewport && waveBudget > 0 ? (
        /* Minimal static version when out of viewport (only for mid/fast devices) */
        <AuroraWave
          style={staticWaveStyle}
          $top="26%"
          $opacity={0.3}
          $blur={30}
          $duration={0}
          $delay={0}
          $isInViewport={false}
          $isSlowDevice={false}
          $tier={tier}
        />
      ) : null}
    </AuroraLayer>
  );
});

// aurora layer container.
const AuroraLayer = styled.div.attrs(props => ({
  $tier: props.$tier || 'fast'
}))`
    /* layout */
    inset: 0;
    z-index: 1;
    overflow: hidden;
    position: absolute;
    pointer-events: none;
    /* Aggressive containment for performance */
    contain: layout style paint;
    content-visibility: auto;

    /* styles */
    will-change: auto;
    transform: translateZ(0);
    /* Isolate compositing layer */
    isolation: isolate;
`;

// breathing glow background.
const AuroraGlow = styled.div.attrs(props => ({
  $tier: props.$tier || 'fast'
}))`
    /* layout */
    top: 35%;
    left: 0;
    right: 0;
    height: 40vh;
    position: absolute;

    /* styles */
    filter: blur(${props => {
      if (props.$tier === 'slow') return '100px';
      if (props.$tier === 'mid') return '110px';
      return '120px';
    }});
    mix-blend-mode: ${props => (props.$tier === 'slow' || !props.$isInViewport) ? 'normal' : 'screen'};
    /* Simplified gradient - reduced from 4 to 3 stops */
    background: radial-gradient(
        ellipse at 50% 50%,
        rgba(100, 255, 200, 0.008) 0%,
        rgba(150, 120, 255, 0.005) 50%,
        transparent 100%
    );
    /* Animation throttling: pause when not in viewport, slower on slow devices */
    ${props => props.$isInViewport 
      ? css`animation: breatheGlow ${props.$tier === 'slow' ? '16s' : props.$tier === 'mid' ? '14s' : '12s'} ease-in-out infinite;`
      : css`animation: none;`}
    animation-play-state: ${props => props.$isInViewport ? 'running' : 'paused'};
    will-change: ${props => props.$isInViewport ? 'opacity' : 'auto'};

    /* secondary radial glow */
    &:nth-child(2) {
        background: radial-gradient(
        ellipse at 30% 60%,
        rgba(150, 120, 255, 0.006) 0%,
        rgba(255, 150, 200, 0.004) 50%,
        transparent 100%
        );
        animation-delay: 4s;
        animation-duration: ${props => {
          if (props.$tier === 'slow') return '20s';
          if (props.$tier === 'mid') return '17s';
          return '15s';
        }};
        filter: blur(${props => {
          if (props.$tier === 'slow') return '120px';
          if (props.$tier === 'mid') return '130px';
          return '140px';
        }});
    }

    /* keyframes for breathing glow */
    @keyframes breatheGlow {
        0%, 100% {
        opacity: 0.05;
        }
        50% {
        opacity: 0.12;
        }
    }
`;

// aurora wave.
const AuroraWave = styled.div.attrs(props => ({
  $tier: props.$tier || 'fast'
}))`
    /* layout */
    position: absolute;
    left: -10%; /* Start 10% to the left to ensure full coverage */
    top: ${p => p.$top || '26.25%'};
    width: 120%; /* Extended width to cover full screen including the 10% offset */
    height: 40vh;
    isolation: isolate;

    /* styles */
    opacity: ${p => p.$opacity || 0.3};
    /* Use CSS variable for clip-path - fallback to static path if var not supported */
    clip-path: var(--p1, path("M0,60 L3200,60 L3200,102 L0,102 Z"));
    /* Disable expensive clip-path animation on slow devices - use static path */
    will-change: ${p => (p.$isInViewport && !p.$isSlowDevice && p.$tier === 'fast') ? 'clip-path, transform, opacity' : 'auto'};
    transform: translateZ(0);
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;

    /* Animation throttling: pause when not in viewport, disable clip-path animation on slow devices */
    ${p => {
      if (!p.$isInViewport) {
        return css`animation: none;`;
      }
      // On slow/mid devices, disable clip-path animation (very expensive) - keep static path
      if (p.$isSlowDevice || p.$tier !== 'fast') {
        return css`animation: none;`;
      }
      // Fast devices: full clip-path animation using CSS variables
      return css`animation: maskPath ${p.$duration || 60}s ease-in-out infinite;`;
    }}
    animation-delay: ${p => p.$delay || 0}s;
    animation-play-state: ${p => (p.$isInViewport && !p.$isSlowDevice && p.$tier === 'fast') ? 'running' : 'paused'};

    /* effect layer 1 - main glow, rim, curtain banding */
    &::before {
      /* layout */
      content: "";
      position: absolute;
      inset: -${p => (p.$blur || 50) * 2}px;

      /* styles */
      /* Simplified gradients - reduced complexity */
      background:
        linear-gradient(90deg,
          rgba(80, 255, 180, 0.55) 0%,
          rgba(150, 120, 255, 0.42) 50%,
          rgba(255, 150, 200, 0.45) 100%),
        radial-gradient(140% 60% at 50% 0%,
          rgba(255,255,255,0.25) 0%,
          rgba(255,255,255,0.10) 50%,
          transparent 100%),
        linear-gradient(180deg,
          rgba(0,0,0,0.0) 0%,
          rgba(0,0,0,0.10) 100%);
      background-size: 200% 100%, 100% 100%, 100% 100%;
      background-position: 0% 50%, 50% 0%, 50% 100%;
      /* Reduce blur based on tier - blur is very expensive */
      filter: blur(${p => {
        const base = p.$blur || 50;
        if (p.$tier === 'slow') return Math.max(20, base * 0.4) + 'px';
        if (p.$tier === 'mid') return Math.max(24, base * 0.7) + 'px';
        return base + 'px';
      }});
      mix-blend-mode: ${p => (p.$tier === 'slow' || !p.$isInViewport) ? 'normal' : 'screen'};

      /* Animation throttling: pause when not in viewport, disable expensive animations on slow/mid devices */
      ${p => {
        if (!p.$isInViewport) {
          return css`animation: none;`;
        }
        // On slow devices, only use simple colorFlow (disable expensive mask animations)
        if (p.$tier === 'slow' || p.$isSlowDevice) {
          return css`
            animation: colorFlow 30s linear infinite;
          `;
        }
        // Mid tier: colorFlow and waveDrift only
        if (p.$tier === 'mid') {
          return css`
            animation:
              colorFlow 20s linear infinite,
              waveDrift ${p.$duration || 60}s ease-in-out infinite;
          `;
        }
        // Fast devices: all animations
        return css`
          animation:
            colorFlow 18s linear infinite,
            waveDrift ${p.$duration || 60}s ease-in-out infinite,
            flicker 10s ease-in-out infinite,
            bandDrift 22s linear infinite;
        `;
      }}
      animation-delay: ${p => p.$delay || 0}s;
      animation-play-state: ${p => p.$isInViewport ? 'running' : 'paused'};
      will-change: ${p => {
        if (!p.$isInViewport) return 'auto';
        // On slow devices, only animate background-position (cheapest)
        if (p.$tier === 'slow' || p.$isSlowDevice) return 'background-position';
        // Mid tier: background-position and transform
        if (p.$tier === 'mid') return 'background-position, transform';
        // Fast devices: all properties
        return 'background-position, transform, opacity, -webkit-mask-position, mask-position';
      }};

      /* Curtain banding mask that drifts horizontally - disable on slow/mid devices */
      ${p => (p.$tier === 'fast' && !p.$isSlowDevice) ? css`
        -webkit-mask-image:
          linear-gradient(to bottom, transparent 0%, #000 16%, #000 84%, transparent 100%),
          repeating-linear-gradient(
            90deg,
            #000 0 16px,
            rgba(0,0,0,.7) 16px 26px,
            rgba(0,0,0,.35) 26px 40px,
            transparent 40px 64px
          );
        -webkit-mask-size: auto, 220% 100%;
        -webkit-mask-position: 0 0, 0% 0;
                mask-image:
          linear-gradient(to bottom, transparent 0%, #000 16%, #000 84%, transparent 100%),
          repeating-linear-gradient(
            90deg,
            #000 0 16px,
            rgba(0,0,0,.7) 16px 26px,
            rgba(0,0,0,.35) 26px 40px,
            transparent 40px 64px
          );
                mask-size: auto, 220% 100%;
                mask-position: 0 0, 0% 0;
      ` : css`
        /* Simplified mask on slow devices - no repeating pattern */
        -webkit-mask-image: linear-gradient(to bottom, transparent 0%, #000 16%, #000 84%, transparent 100%);
                mask-image: linear-gradient(to bottom, transparent 0%, #000 16%, #000 84%, transparent 100%);
      `}

      /* reduce overscan/blur on mid-width screens to avoid clipping */
      @media (max-width: 1600px) {
        inset: -${p => (p.$blur || 50) * 1.4}px;
        filter: blur(${p => (p.$blur || 50) * 0.85}px);
      }
    }

    /* effect layer 2 - faint secondary tint */
    &::after{
      /* layout */
      content: "";
      position: absolute;
      inset: -${p => (p.$blur || 50) * 2}px;

      /* styles */
      background: linear-gradient(90deg,
        rgba(120, 220, 255, 0.28) 0%,
        rgba(110, 255, 190, 0.22) 50%,
        rgba(170, 140, 255, 0.20) 100%);
      /* Disable secondary layer blur on slow devices - hide entire layer */
      ${p => {
        if (p.$tier === 'slow' || p.$isSlowDevice) {
          return css`display: none;`;
        }
        const base = p.$blur || 50;
        const blurValue = p.$tier === 'mid' ? base * 0.75 : base * 0.85;
        return css`filter: blur(${blurValue}px);`;
      }}
      mix-blend-mode: ${p => (p.$tier === 'slow' || !p.$isInViewport) ? 'normal' : 'screen'};
      opacity: 0.45;
      transform: translate3d(0, -2px, 0);
      /* Animation throttling: disable on slow/mid devices (secondary layer not critical) */
      ${p => {
        if (!p.$isInViewport || p.$tier === 'slow' || p.$isSlowDevice) {
          return css`animation: none;`;
        }
        return css`animation: colorFlow 26s linear infinite reverse;`;
      }}
      animation-delay: ${p => (Number(p.$delay) || 0) * 0.5}s;
      animation-play-state: ${p => (p.$isInViewport && p.$tier === 'fast' && !p.$isSlowDevice) ? 'running' : 'paused'};

      /* Simplified mask on slow/mid devices - disable complex repeating patterns */
      ${p => (p.$tier === 'fast' && !p.$isSlowDevice) ? css`
        -webkit-mask-image:
          linear-gradient(to bottom, transparent 0%, #000 16%, #000 84%, transparent 100%),
          repeating-linear-gradient(90deg,#000 0 16px,rgba(0,0,0,.7) 16px 26px,rgba(0,0,0,.35) 26px 40px,transparent 40px 64px);
        -webkit-mask-size: auto, 220% 100%;
        -webkit-mask-position: 0 0, 0% 0;
                mask-image:
          linear-gradient(to bottom, transparent 0%, #000 16%, #000 84%, transparent 100%),
          repeating-linear-gradient(90deg,#000 0 16px,rgba(0,0,0,.7) 16px 26px,rgba(0,0,0,.35) 26px 40px,transparent 40px 64px);
                mask-size: auto, 220% 100%;
                mask-position: 0 0, 0% 0;
      ` : css`
        -webkit-mask-image: linear-gradient(to bottom, transparent 0%, #000 16%, #000 84%, transparent 100%);
                mask-image: linear-gradient(to bottom, transparent 0%, #000 16%, #000 84%, transparent 100%);
      `}

      /* reduce overscan/blur on mid-width screens to avoid clipping */
      @media (max-width: 1600px) {
        inset: -${p => (p.$blur || 50) * 1.3}px;
        filter: blur(${p => (p.$blur || 50) * 0.75}px);
      }
    }

    /* keyframes - use CSS variables for static keyframes (no prop interpolation) */
    @keyframes maskPath {
      0%      { clip-path: var(--p1); }
      50%     { clip-path: var(--p2); }
      100%    { clip-path: var(--p3); }
    }

    @keyframes waveDrift {
      0%,100% { transform: translate3d(0px, 0px, 0); }
      50%     { transform: translate3d(-48px, -14px, 0); }
    }

    @keyframes bandDrift {
      0%   { -webkit-mask-position: 0 0, 0% 0; mask-position: 0 0, 0% 0; }
      100% { -webkit-mask-position: 0 0, 200% 0; mask-position: 0 0, 200% 0; }
    }

    @keyframes colorFlow {
      0%   { background-position: 0% 50%; }
      100% { background-position: 200% 50%; }
    }

    @keyframes flicker {
      0%,100% { opacity: .55 }
      45%     { opacity: .70 }
      60%     { opacity: .42 }
      75%     { opacity: .64 }
    }

    /* media */
    @media (max-width: 900px) {
      &::before, &::after {
        filter: blur(${p => (p.$blur || 50) * 0.7}px);
        opacity: 0.85;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      animation: none;
      &::before, &::after { animation: none; }
    }
`;


export default Aurora;
