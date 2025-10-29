import React from 'react';
import styled from 'styled-components';

// Generate smooth sinusoidal wave paths with consistent thickness
function generateWavePath(width = 2400, height = 100, amplitude = 20, frequency = 4, phase = 0, thickness = 40) {
  const step = width / (frequency * 20);
  let topPath = [];
  let bottomPath = [];
  
  // Generate top wave from left to right
  for (let x = 0; x <= width; x += step) {
    const y = height/2 + Math.sin((x / width) * frequency * 2 * Math.PI + phase) * amplitude;
    topPath.push({ x, y });
  }
  
  // Generate bottom wave from right to left (same pattern but offset by thickness)
  for (let x = width; x >= 0; x -= step) {
    const y = height/2 + Math.sin((x / width) * frequency * 2 * Math.PI + phase) * amplitude + thickness;
    bottomPath.push({ x, y });
  }
  
  // Build the path: move to first top point, line through top points, 
  // then go back through bottom points, and explicitly close
  let path = `M${topPath[0].x},${topPath[0].y}`;
  
  // Draw top wave
  for (let i = 1; i < topPath.length; i++) {
    path += ` L${topPath[i].x},${topPath[i].y}`;
  }
  
  // Draw bottom wave
  for (let i = 0; i < bottomPath.length; i++) {
    path += ` L${bottomPath[i].x},${bottomPath[i].y}`;
  }
  
  // Explicitly close the path to prevent rendering artifacts
  path += ` Z`;
  
  return path;
}

// Aurora layer container
const AuroraLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
  contain: layout style paint;
  will-change: auto;
  transform: translateZ(0); /* force GPU layer */
`;

// Breathing glow background - positioned behind "My College Years" section
const AuroraGlow = styled.div`
  position: absolute;
  top: 35%;
  left: 0;
  right: 0;
  height: 40vh;
  background: radial-gradient(
    ellipse at 50% 50%,
    rgba(100, 255, 200, 0.008) 0%,
    rgba(150, 120, 255, 0.005) 30%,
    rgba(255, 150, 200, 0.003) 60%,
    transparent 100%
  );
  animation: breatheGlow 12s ease-in-out infinite;
  filter: blur(120px);
  mix-blend-mode: screen;

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

  @keyframes breatheGlow {
    0%, 100% {
      opacity: 0.05;
    }
    50% {
      opacity: 0.12;
    }
  }
`;

// Individual aurora wave
const AuroraWave = styled.div`
  position: absolute;
  width: 100%;
  height: 60vh;
  top: ${props => props.$top || '36.25%'};
  left: 0;
  opacity: ${props => props.$opacity || 0.3};
  clip-path: path("${props => props.$wavePath}");
  isolation: isolate;             /* avoid blend seams across siblings */
  will-change: clip-path;         /* keep transforms off this layer */
  
  contain: layout style paint;
  transform: translateZ(0); /* force GPU layer */
  backface-visibility: hidden; /* prevent rendering artifacts */
  -webkit-backface-visibility: hidden; /* Safari support */
  -webkit-transform: translate3d(0, 0, 0); /* Force hardware acceleration */

  /* animate only the mask shape on the parent */
  animation: maskPath ${props => props.$duration || 60}s ease-in-out infinite;
  animation-delay: ${props => props.$delay || 0}s;

  /* the blurred, blended pixels live on a larger pseudo-element */
  &::before {
    content: "";
    position: absolute;
    inset: -${props => (props.$blur || 50) * 2}px;  /* overscan = 2x blur radius */
    background: linear-gradient(
      90deg,
      rgba(80, 255, 180, 0.5) 0%,
      rgba(150, 120, 255, 0.4) 50%,
      rgba(255, 150, 200, 0.4) 100%
    );
    background-size: 200% 100%;
    background-position: 0% 50%;
    filter: blur(${props => props.$blur || 50}px);
    mix-blend-mode: screen;
    will-change: transform, background-position;
    animation: colorFlow 15s linear infinite, waveDrift ${props => props.$duration || 60}s ease-in-out infinite;
    animation-delay: ${props => props.$delay || 0}s;
  }

  @keyframes maskPath {
    0%, 100% { clip-path: path("${props => props.$wavePath}"); }
    25%      { clip-path: path("${props => props.$wavePath2}"); }
    50%      { clip-path: path("${props => props.$wavePath3}"); }
    75%      { clip-path: path("${props => props.$wavePath4}"); }
  }
  
  /* Use whole-pixel drift values to avoid sub-pixel shimmer */
  @keyframes waveDrift {
    0%, 100% { transform: translate3d(0px, 0px, 0); }
    25%      { transform: translate3d(-24px, -8px, 0); }
    50%      { transform: translate3d(-48px, -16px, 0); }
    75%      { transform: translate3d(-24px, -8px, 0); }
  }
  
  @keyframes colorFlow { 
    0% { background-position: 0% 50%; } 
    100% { background-position: 200% 50%; } 
  }
`;

// Aurora component
const Aurora = () => {
  // Generate different wave patterns for each layer with increased thickness
  const wave1Path = generateWavePath(2400, 100, 25, 3, 0, 60);
  const wave1Path2 = generateWavePath(2400, 100, 27, 3, Math.PI/8, 60);
  const wave1Path3 = generateWavePath(2400, 100, 23, 3, Math.PI/4, 60);
  const wave1Path4 = generateWavePath(2400, 100, 26, 3, 3*Math.PI/8, 60);

  const wave2Path = generateWavePath(2400, 100, 30, 4, Math.PI/3, 65);
  const wave2Path2 = generateWavePath(2400, 100, 32, 4, Math.PI/3 + Math.PI/8, 65);
  const wave2Path3 = generateWavePath(2400, 100, 28, 4, Math.PI/3 + Math.PI/4, 65);
  const wave2Path4 = generateWavePath(2400, 100, 31, 4, Math.PI/3 + 3*Math.PI/8, 65);

  const wave3Path = generateWavePath(2400, 100, 20, 5, Math.PI/6, 70);
  const wave3Path2 = generateWavePath(2400, 100, 22, 5, Math.PI/6 + Math.PI/8, 70);
  const wave3Path3 = generateWavePath(2400, 100, 18, 5, Math.PI/6 + Math.PI/4, 70);
  const wave3Path4 = generateWavePath(2400, 100, 21, 5, Math.PI/6 + 3*Math.PI/8, 70);

  const wave4Path = generateWavePath(2400, 100, 35, 2, Math.PI/2, 55);
  const wave4Path2 = generateWavePath(2400, 100, 37, 2, Math.PI/2 + Math.PI/8, 55);
  const wave4Path3 = generateWavePath(2400, 100, 33, 2, Math.PI/2 + Math.PI/4, 55);
  const wave4Path4 = generateWavePath(2400, 100, 36, 2, Math.PI/2 + 3*Math.PI/8, 55);

  return (
    <AuroraLayer>
      {/* Breathing glow background - only center two waves */}
      <AuroraGlow />
      <AuroraGlow />
      
      <AuroraWave 
        $top="39.25%"
        $opacity={0.55}
        $blur={50}
        $duration={60}
        $delay={0}
        $wavePath={wave1Path}
        $wavePath2={wave1Path2}
        $wavePath3={wave1Path3}
        $wavePath4={wave1Path4}
      />
      
      <AuroraWave 
        $top="48%"
        $opacity={0.525}
        $blur={60}
        $duration={65}
        $delay={8}
        $wavePath={wave2Path}
        $wavePath2={wave2Path2}
        $wavePath3={wave2Path3}
        $wavePath4={wave2Path4}
      />
      
      <AuroraWave 
        $top="56.75%"
        $opacity={0.5}
        $blur={70}
        $duration={70}
        $delay={15}
        $wavePath={wave3Path}
        $wavePath2={wave3Path2}
        $wavePath3={wave3Path3}
        $wavePath4={wave3Path4}
      />
      
      <AuroraWave 
        $top="63%"
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

export default Aurora;
