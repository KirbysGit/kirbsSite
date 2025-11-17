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

// precomputed wave paths so we don't regenerate them on every render.
// these are static for a given layout, so calculating them once at module
// load avoids a bunch of expensive math/string work in the render path.
const wave1Path  = generateWavePath(3200, 120, 30, 4, 0, 42);
const wave1Path2 = generateWavePath(3200, 120, 32, 4, Math.PI / 8, 42);
const wave1Path3 = generateWavePath(3200, 120, 28, 4, Math.PI / 4, 42);

const wave2Path  = generateWavePath(3200, 120, 33, 4.5, Math.PI / 3, 46);
const wave2Path2 = generateWavePath(3200, 120, 34, 4.5, Math.PI / 3 + Math.PI / 8, 46);
const wave2Path3 = generateWavePath(3200, 120, 31, 4.5, Math.PI / 3 + Math.PI / 4, 46);

const wave3Path  = generateWavePath(3200, 120, 29, 5, Math.PI / 6, 48);
const wave3Path2 = generateWavePath(3200, 120, 31, 5, Math.PI / 6 + Math.PI / 8, 48);
const wave3Path3 = generateWavePath(3200, 120, 27, 5, Math.PI / 6 + Math.PI / 4, 48);

const wave4Path  = generateWavePath(3200, 120, 32, 3.8, Math.PI / 2, 44);
const wave4Path2 = generateWavePath(3200, 120, 33, 3.8, Math.PI / 2 + Math.PI / 8, 44);
const wave4Path3 = generateWavePath(3200, 120, 30, 3.8, Math.PI / 2 + Math.PI / 4, 44);

// actual component.
const AuroraInner = () => {

  return (
    <AuroraLayer>
      {/* breathing glow background */}
      <AuroraGlow />
      <AuroraGlow />
      
      {/* first wave */}
      <AuroraWave 
        $top="16%"
        $opacity={0.55}
        $blur={36}
        $duration={60}
        $delay={0}
        $wavePath={wave1Path}
        $wavePath2={wave1Path2}
        $wavePath3={wave1Path3}
      />
      
      {/* second wave */}
      <AuroraWave 
        $top="26%"
        $opacity={0.525}
        $blur={42}
        $duration={65}
        $delay={8}
        $wavePath={wave2Path}
        $wavePath2={wave2Path2}
        $wavePath3={wave2Path3}
      />
      
      {/* third wave */}
      <AuroraWave 
        $top="36%"
        $opacity={0.5}
        $blur={48}
        $duration={70}
        $delay={15}
        $wavePath={wave3Path}
        $wavePath2={wave3Path2}
        $wavePath3={wave3Path3}
      />
      
      {/* fourth wave */}
      <AuroraWave 
        $top="46%"
        $opacity={0.575}
        $blur={54}
        $duration={75}
        $delay={22}
        $wavePath={wave4Path}
        $wavePath2={wave4Path2}
        $wavePath3={wave4Path3}
      />
    </AuroraLayer>
  );
};

// memoize the aurora so it only renders once (no re-renders when the parent
// experience carousel state changes). this keeps the expensive SVG path + CSS
// work out of the hot render loop.
const Aurora = React.memo(AuroraInner);
Aurora.displayName = 'Aurora';

// aurora layer container.
const AuroraLayer = styled.div`
    /* layout */
    inset: 0;
    z-index: 1;
    overflow: hidden;
    position: absolute;
    pointer-events: none;

    /* styles */
    will-change: auto;
    transform: translateZ(0);
    isolation: isolate;
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
    filter: blur(80px);
    mix-blend-mode: screen;
    background: radial-gradient(
        ellipse at 50% 50%,
        rgba(100, 255, 200, 0.008) 0%,
        rgba(150, 120, 255, 0.005) 50%,
        transparent 100%
    );
    animation: breatheGlow 12s ease-in-out infinite;
    animation-play-state: running;
    will-change: opacity;

    /* secondary radial glow */
    &:nth-child(2) {
        background: radial-gradient(
        ellipse at 30% 60%,
        rgba(150, 120, 255, 0.006) 0%,
        rgba(255, 150, 200, 0.004) 50%,
        transparent 100%
        );
        animation-delay: 4s;
        animation-duration: 15s;
        filter: blur(100px);
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
    left: -10%;
    top: ${p => p.$top || '26.25%'};
    width: 120%;
    height: 32vh;
    isolation: isolate;

    /* styles */
    opacity: ${p => p.$opacity || 0.3};
    /* static wave shape; we don't animate clip-path anymore */
    clip-path: path("${p => p.$wavePath}");
    transform: translateZ(0);
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;

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
          rgba(255,255,255,0.10) 50%,
          transparent 100%),
        linear-gradient(180deg,
          rgba(0,0,0,0.0) 0%,
          rgba(0,0,0,0.10) 100%);
      background-size: 200% 100%, 100% 100%, 100% 100%;
      background-position: 0% 50%, 50% 0%, 50% 100%;
      filter: blur(${p => p.$blur || 50}px);
      mix-blend-mode: screen;

      animation:
        colorFlow 18s linear infinite,
        waveDrift ${p => p.$duration || 60}s ease-in-out infinite;
      animation-delay: ${p => p.$delay || 0}s;
      animation-play-state: running;
      will-change: background-position, transform, opacity, -webkit-mask-position, mask-position;

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
        inset: -${p => (p.$blur || 50) * 1.2}px;
        filter: blur(${p => (p.$blur || 50) * 0.8}px);
      }
    }
    @keyframes waveDrift {
      0%,100% { transform: translate3d(0px, 0px, 0); }
      50%     { transform: translate3d(-48px, -14px, 0); }
    }

    @keyframes colorFlow {
      0%   { background-position: 0% 50%; }
      100% { background-position: 200% 50%; }
    }


    /* media */
    @media (max-width: 900px) {
      &::before {
        filter: blur(${p => (p.$blur || 50) * 0.6}px);
        opacity: 0.85;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      animation: none;
      &::before { animation: none; }
    }
`;

export default Aurora;
