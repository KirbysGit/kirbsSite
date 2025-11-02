// aurora.jsx

// i tried to get this to look like the northern lights, but right now its just colorful
// waves. i put too much time into it to not keep it so its STAYING!

// imports.
import React from 'react';
import styled from 'styled-components';

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
  // generate different wave patterns for each layer with increased thickness.
  const wave1Path = generateWavePath(2400, 120, 30, 4, 0, 40);
  const wave1Path2 = generateWavePath(2400, 120, 32, 4, Math.PI/8, 40);
  const wave1Path3 = generateWavePath(2400, 120, 28, 4, Math.PI/4, 40);
  const wave1Path4 = generateWavePath(2400, 120, 31, 4, 3*Math.PI/8, 40);

  const wave2Path = generateWavePath(2400, 120, 35, 5, Math.PI/3, 44);
  const wave2Path2 = generateWavePath(2400, 120, 37, 5, Math.PI/3 + Math.PI/8, 44);
  const wave2Path3 = generateWavePath(2400, 120, 33, 5, Math.PI/3 + Math.PI/4, 44);
  const wave2Path4 = generateWavePath(2400, 120, 36, 5, Math.PI/3 + 3*Math.PI/8, 44);

  const wave3Path = generateWavePath(2400, 120, 26, 6, Math.PI/6, 48);
  const wave3Path2 = generateWavePath(2400, 120, 28, 6, Math.PI/6 + Math.PI/8, 48);
  const wave3Path3 = generateWavePath(2400, 120, 24, 6, Math.PI/6 + Math.PI/4, 48);
  const wave3Path4 = generateWavePath(2400, 120, 27, 6, Math.PI/6 + 3*Math.PI/8, 48);

  const wave4Path = generateWavePath(2400, 120, 40, 3, Math.PI/2, 38);
  const wave4Path2 = generateWavePath(2400, 120, 42, 3, Math.PI/2 + Math.PI/8, 38);
  const wave4Path3 = generateWavePath(2400, 120, 38, 3, Math.PI/2 + Math.PI/4, 38);
  const wave4Path4 = generateWavePath(2400, 120, 41, 3, Math.PI/2 + 3*Math.PI/8, 38);

  return (
    <AuroraLayer>
      {/* breathing glow background - only center two waves */}
      <AuroraGlow />
      <AuroraGlow />
      
      {/* first wave */}
      <AuroraWave 
        $top="16%"
        $opacity={0.55}
        $blur={50}
        $duration={60}
        $delay={0}
        $wavePath={wave1Path}
        $wavePath2={wave1Path2}
        $wavePath3={wave1Path3}
        $wavePath4={wave1Path4}
      />
      
      {/* second wave */}
      <AuroraWave 
        $top="26%"
        $opacity={0.525}
        $blur={60}
        $duration={65}
        $delay={8}
        $wavePath={wave2Path}
        $wavePath2={wave2Path2}
        $wavePath3={wave2Path3}
        $wavePath4={wave2Path4}
      />
      
      {/* third wave */}
      <AuroraWave 
        $top="36%"
        $opacity={0.5}
        $blur={70}
        $duration={70}
        $delay={15}
        $wavePath={wave3Path}
        $wavePath2={wave3Path2}
        $wavePath3={wave3Path3}
        $wavePath4={wave3Path4}
      />
      
      {/* fourth wave */}
      <AuroraWave 
        $top="46%"
        $opacity={0.575}
        $blur={80}
        $duration={75}
        $delay={22}
        $wavePath={wave4Path}
        $wavePath2={wave4Path2}
        $wavePath3={wave4Path3}
        $wavePath4={wave4Path4}
      />
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
    filter: blur(120px);
    mix-blend-mode: screen;
    background: radial-gradient(
        ellipse at 50% 50%,
        rgba(100, 255, 200, 0.008) 0%,
        rgba(150, 120, 255, 0.005) 30%,
        rgba(255, 150, 200, 0.003) 60%,
        transparent 100%
    );
    animation: breatheGlow 12s ease-in-out infinite;

    /* secondary radial glow */
    &:nth-child(2) {
        background: radial-gradient(
        ellipse at 30% 60%,
        rgba(150, 120, 255, 0.006) 0%,
        rgba(255, 150, 200, 0.004) 25%,
        rgba(100, 255, 200, 0.002) 50%,
        transparent 80%
        );
        animation-delay: 4s;
        animation-duration: 15s;
        filter: blur(140px);
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
    inset-inline-start: 0;
    top: ${p => p.$top || '26.25%'};
    width: 100%;
    height: 40vh;
    isolation: isolate;

    /* styles */
    opacity: ${p => p.$opacity || 0.3};
    clip-path: path("${p => p.$wavePath}");              /* ribbon silhouette */
    will-change: clip-path;                               /* we morph clip-path */
    transform: translateZ(0);
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;

    animation: maskPath ${p => p.$duration || 60}s ease-in-out infinite;
    animation-delay: ${p => p.$delay || 0}s;

    /* effect layer 1 - main glow, rim, curtain banding */
    &::before {
      /* layout */
      content: "";
      position: absolute;
      inset: -${p => (p.$blur || 50) * 2}px;

      /* styles */
      background:
        linear-gradient(90deg,
          rgba(80, 255, 180, 0.55) 0%,
          rgba(150, 120, 255, 0.42) 50%,
          rgba(255, 150, 200, 0.45) 100%),
        radial-gradient(140% 60% at 50% 0%,
          rgba(255,255,255,0.25) 0%,
          rgba(255,255,255,0.10) 35%,
          rgba(255,255,255,0.00) 60%),
        linear-gradient(180deg,
          rgba(0,0,0,0.0) 0%,
          rgba(0,0,0,0.08) 80%,
          rgba(0,0,0,0.12) 100%);
      background-size: 200% 100%, 100% 100%, 100% 100%;
      background-position: 0% 50%, 50% 0%, 50% 100%;
      filter: blur(${p => p.$blur || 50}px);
      mix-blend-mode: screen;

      animation:
        colorFlow 18s linear infinite,
        waveDrift ${p => p.$duration || 60}s ease-in-out infinite,
        flicker 10s ease-in-out infinite,
        bandDrift 22s linear infinite;
      animation-delay: ${p => p.$delay || 0}s;

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
      animation: colorFlow 26s linear infinite reverse;
      animation-delay: ${p => (Number(p.$delay) || 0) * 0.5}s;

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

    /* keyframes */
    @keyframes maskPath {
      0%,100% { clip-path: path("${p => p.$wavePath}"); }
      25%     { clip-path: path("${p => p.$wavePath2}"); }
      50%     { clip-path: path("${p => p.$wavePath3}"); }
      75%     { clip-path: path("${p => p.$wavePath4}"); }
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
