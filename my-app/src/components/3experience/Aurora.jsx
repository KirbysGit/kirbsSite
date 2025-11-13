// aurora.jsx

// i tried to get this to look like the northern lights, but right now its just colorful
// waves. i put too much time into it to not keep it so its STAYING!

// imports.
import React, { useState, useEffect, useRef } from 'react';
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
const Aurora = () => {
  // Performance optimization state
  const [isInViewport, setIsInViewport] = useState(false);
  const [isSlowDevice, setIsSlowDevice] = useState(false);
  const sectionRef = useRef(null);

  // Detect slower devices
  useEffect(() => {
    const cores = navigator.hardwareConcurrency || 4;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setIsSlowDevice(cores < 4 || prefersReducedMotion);
  }, []);

  // IntersectionObserver to detect when section is in viewport
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInViewport(entry.isIntersecting && entry.intersectionRatio > 0.1);
        });
      },
      {
        threshold: [0, 0.1, 0.5, 1],
        rootMargin: '200px' // Start animations before entering viewport
      }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Generate wave paths - wider to stretch across entire screen
  // Increased width from 2400 to 3200 to ensure full coverage, starting at 10% from left
  // Amplitude range: 27-34 (moderate variation), Frequency range: 3.5-5.5 (some variation)
  // Increased thickness for better overlap between waves
  const wave1Path = generateWavePath(3200, 120, 30, 4, 0, 42);
  const wave1Path2 = generateWavePath(3200, 120, 32, 4, Math.PI/8, 42);
  const wave1Path3 = generateWavePath(3200, 120, 28, 4, Math.PI/4, 42);

  const wave2Path = generateWavePath(3200, 120, 33, 4.5, Math.PI/3, 46);
  const wave2Path2 = generateWavePath(3200, 120, 34, 4.5, Math.PI/3 + Math.PI/8, 46);
  const wave2Path3 = generateWavePath(3200, 120, 31, 4.5, Math.PI/3 + Math.PI/4, 46);

  const wave3Path = generateWavePath(3200, 120, 29, 5, Math.PI/6, 48);
  const wave3Path2 = generateWavePath(3200, 120, 31, 5, Math.PI/6 + Math.PI/8, 48);
  const wave3Path3 = generateWavePath(3200, 120, 27, 5, Math.PI/6 + Math.PI/4, 48);

  const wave4Path = generateWavePath(3200, 120, 32, 3.8, Math.PI/2, 44);
  const wave4Path2 = generateWavePath(3200, 120, 33, 3.8, Math.PI/2 + Math.PI/8, 44);
  const wave4Path3 = generateWavePath(3200, 120, 30, 3.8, Math.PI/2 + Math.PI/4, 44);

  // On slow devices, show only 2 waves instead of 4
  const showAllWaves = !isSlowDevice;

  return (
    <AuroraLayer ref={sectionRef} $isInViewport={isInViewport} $isSlowDevice={isSlowDevice}>
      {/* breathing glow background - reduced to 1 on slow devices */}
      <AuroraGlow $isInViewport={isInViewport} $isSlowDevice={isSlowDevice} />
      {!isSlowDevice && <AuroraGlow $isInViewport={isInViewport} $isSlowDevice={isSlowDevice} />}
      
      {/* first wave - always show */}
      <AuroraWave 
        $top="16%"
        $opacity={0.55}
        $blur={isSlowDevice ? 40 : 50}
        $duration={isSlowDevice ? 80 : 60}
        $delay={0}
        $isInViewport={isInViewport}
        $isSlowDevice={isSlowDevice}
        $wavePath={wave1Path}
        $wavePath2={wave1Path2}
        $wavePath3={wave1Path3}
      />
      
      {/* second wave - always show */}
      <AuroraWave 
        $top="26%"
        $opacity={0.525}
        $blur={isSlowDevice ? 50 : 60}
        $duration={isSlowDevice ? 85 : 65}
        $delay={8}
        $isInViewport={isInViewport}
        $isSlowDevice={isSlowDevice}
        $wavePath={wave2Path}
        $wavePath2={wave2Path2}
        $wavePath3={wave2Path3}
      />
      
      {/* third wave - hide on slow devices */}
      {showAllWaves && (
        <AuroraWave 
          $top="36%"
          $opacity={0.5}
          $blur={isSlowDevice ? 60 : 70}
          $duration={isSlowDevice ? 90 : 70}
          $delay={15}
          $isInViewport={isInViewport}
          $isSlowDevice={isSlowDevice}
          $wavePath={wave3Path}
          $wavePath2={wave3Path2}
          $wavePath3={wave3Path3}
        />
      )}
      
      {/* fourth wave - hide on slow devices */}
      {showAllWaves && (
        <AuroraWave 
          $top="46%"
          $opacity={0.575}
          $blur={isSlowDevice ? 70 : 80}
          $duration={isSlowDevice ? 95 : 75}
          $delay={22}
          $isInViewport={isInViewport}
          $isSlowDevice={isSlowDevice}
          $wavePath={wave4Path}
          $wavePath2={wave4Path2}
          $wavePath3={wave4Path3}
        />
      )}
    </AuroraLayer>
  );
};

// aurora layer container.
const AuroraLayer = styled.div`
    /* layout */
    inset: 0;
    z-index: 1;
    overflow: hidden;
    position: absolute;
    pointer-events: none;
    contain: layout style paint;

    /* styles */
    will-change: auto;
    transform: translateZ(0);
`;

// breathing glow background.
const AuroraGlow = styled.div`
    /* layout */
    top: 35%;
    left: 0;
    right: 0;
    height: 40vh;
    position: absolute;

    /* styles */
    filter: blur(${props => props.$isSlowDevice ? '100px' : '120px'});
    mix-blend-mode: screen;
    /* Simplified gradient - reduced from 4 to 3 stops */
    background: radial-gradient(
        ellipse at 50% 50%,
        rgba(100, 255, 200, 0.008) 0%,
        rgba(150, 120, 255, 0.005) 50%,
        transparent 100%
    );
    /* Animation throttling: pause when not in viewport, slower on slow devices */
    ${props => props.$isInViewport 
      ? css`animation: breatheGlow ${props.$isSlowDevice ? '16s' : '12s'} ease-in-out infinite;`
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
        animation-duration: ${props => props.$isSlowDevice ? '20s' : '15s'};
        filter: blur(${props => props.$isSlowDevice ? '120px' : '140px'});
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
const AuroraWave = styled.div`
    /* layout */
    position: absolute;
    left: -10%; /* Start 10% to the left to ensure full coverage */
    top: ${p => p.$top || '26.25%'};
    width: 120%; /* Extended width to cover full screen including the 10% offset */
    height: 40vh;
    isolation: isolate;

    /* styles */
    opacity: ${p => p.$opacity || 0.3};
    clip-path: path("${p => p.$wavePath}");              /* ribbon silhouette */
    will-change: ${p => p.$isInViewport ? 'clip-path' : 'auto'};
    transform: translateZ(0);
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;

    /* Animation throttling: pause when not in viewport, slower on slow devices */
    ${p => p.$isInViewport 
      ? css`animation: maskPath ${p.$duration || 60}s ease-in-out infinite;`
      : css`animation: none;`}
    animation-delay: ${p => p.$delay || 0}s;
    animation-play-state: ${p => p.$isInViewport ? 'running' : 'paused'};

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
      filter: blur(${p => p.$blur || 50}px);
      mix-blend-mode: screen;

      /* Animation throttling: pause when not in viewport, slower on slow devices, reduce animation count */
      ${p => p.$isInViewport 
        ? css`
          animation:
            colorFlow ${p.$isSlowDevice ? '24s' : '18s'} linear infinite,
            waveDrift ${p.$duration || 60}s ease-in-out infinite,
            ${!p.$isSlowDevice ? css`flicker 10s ease-in-out infinite,` : ''}
            bandDrift ${p.$isSlowDevice ? '30s' : '22s'} linear infinite;
        `
        : css`animation: none;`}
      animation-delay: ${p => p.$delay || 0}s;
      animation-play-state: ${p => p.$isInViewport ? 'running' : 'paused'};
      will-change: ${p => p.$isInViewport ? 'background-position, transform, opacity, -webkit-mask-position, mask-position' : 'auto'};

      /* Curtain banding mask that drifts horizontally */
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
      filter: blur(${p => (p.$blur || 50) * 0.85}px);
      mix-blend-mode: screen;
      opacity: 0.45;
      transform: translate3d(0, -2px, 0);
      /* Animation throttling: pause when not in viewport, slower on slow devices */
      ${p => p.$isInViewport 
        ? css`animation: colorFlow ${p.$isSlowDevice ? '35s' : '26s'} linear infinite reverse;`
        : css`animation: none;`}
      animation-delay: ${p => (Number(p.$delay) || 0) * 0.5}s;
      animation-play-state: ${p => p.$isInViewport ? 'running' : 'paused'};

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

      /* reduce overscan/blur on mid-width screens to avoid clipping */
      @media (max-width: 1600px) {
        inset: -${p => (p.$blur || 50) * 1.3}px;
        filter: blur(${p => (p.$blur || 50) * 0.75}px);
      }
    }

    /* keyframes - reduced from 4 to 3 path variations */
    @keyframes maskPath {
      0%      { clip-path: path("${p => p.$wavePath}"); }
      50%     { clip-path: path("${p => p.$wavePath2}"); }
      100%    { clip-path: path("${p => p.$wavePath3}"); }
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
