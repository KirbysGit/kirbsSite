import React from 'react';
import styled, { keyframes } from 'styled-components';

const Background = () => {
    return (
        <BackgroundContainer>
            {/* Surface water layer - connects to Skills ocean wall */}
            <SurfaceWater>
                <SurfaceRippleLayer />
            </SurfaceWater>
            
            {/* Underwater transition */}
            <UnderwaterSection>
                {/* Underwater header */}
                <UnderwaterHeader>
                    <HeaderTitle>About Me</HeaderTitle>
                    <HeaderSubtitle>Dive into my background</HeaderSubtitle>
                </UnderwaterHeader>
            </UnderwaterSection>
            
            {/* Deep ocean - placeholder for future content */}
            <DeepOcean>
                {/* Future background content goes here */}
            </DeepOcean>
        </BackgroundContainer>
    );
};

export default Background;

/* ================= Styles ================= */

// Water animation keyframes
const waterFlow = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(20px); }
`;

const waveScroll = keyframes`
  0%   { background-position: 0 0, 0 0; }
  100% { background-position: -140px 0, -80px 0; }
`;

const ripplePulse = keyframes`
  0%   { opacity: 0.30; }
  100% { opacity: 0.55; }
`;

const floatParticles = keyframes`
  0%, 100% { opacity: 0.5; transform: translateY(0); }
  50% { opacity: 0.8; transform: translateY(-8px); }
`;

const BackgroundContainer = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

// Surface water - connects to ocean wall in Skills section (same animation as HarborWater)
const SurfaceWater = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 10vh;
  z-index: 2;
  overflow: hidden;
  
  /* Perspective transform - same as HarborWater to make it look flat/diagonal */
  transform: perspective(90px) rotateX(12deg) translateZ(0);
  transform-origin: top center;
  
  /* Water gradient - transitions from Skills ocean wall to bright underwater cyan */
  background: linear-gradient(to bottom,
    rgba(35, 95, 145, 0.75) 0%,
    rgba(45, 115, 160, 0.85) 25%,
    rgba(55, 135, 175, 0.92) 50%,
    rgba(68, 155, 188, 0.96) 75%,
    rgba(78, 170, 198, 0.98) 90%,
    rgba(85, 185, 205, 1) 100%
  );
  
  /* Horizon bloom (soft fade at the top) */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 0%, transparent 40%);
    pointer-events: none;
  }
  
  /* Shimmer stripes that move via background-position (same as HarborWater) */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
      repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.08) 0 3px, transparent 3px 42px),
      repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.05) 0 2px, transparent 2px 66px);
    mix-blend-mode: screen;
    opacity: 0.35;
    animation: ${waveScroll} 12s linear infinite;
    will-change: background-position;
  }
`;

// Ripple layer for surface water (same as HarborWater)
const SurfaceRippleLayer = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  /* Soft oval ripples at various positions */
  background:
    radial-gradient(40px 20px at 20% 35%, rgba(255, 255, 255, 0.18) 0, rgba(255, 255, 255, 0.08) 45%, transparent 70%),
    radial-gradient(55px 25px at 48% 60%, rgba(255, 255, 255, 0.14) 0, rgba(255, 255, 255, 0.07) 40%, transparent 70%),
    radial-gradient(34px 18px at 70% 45%, rgba(255, 255, 255, 0.12) 0, rgba(255, 255, 255, 0.06) 30%, transparent 70%),
    radial-gradient(45px 22px at 15% 75%, rgba(255, 255, 255, 0.16) 0, rgba(255, 255, 255, 0.07) 35%, transparent 70%),
    radial-gradient(38px 19px at 85% 65%, rgba(255, 255, 255, 0.13) 0, rgba(255, 255, 255, 0.06) 40%, transparent 70%);
  mix-blend-mode: screen;
  mask-image: linear-gradient(to bottom, black 40%, transparent 95%);
  animation: ${ripplePulse} 5s ease-in-out infinite alternate;
`;

// Underwater transition zone - starts right at the waterline
const UnderwaterSection = styled.div`
  position: absolute;
  left: 0;
  top: 10vh;
  width: 100%;
  height: 40vh;
  z-index: 1;
  
  /* Subtle waterline effect - much softer */
  box-shadow: 
    inset 0 8px 16px rgba(100, 180, 200, 0.15),
    inset 0 -4px 12px rgba(0, 40, 80, 0.2);
  
  /* Underwater gradient - bright cyan at surface, very gradual darkening */
  background: linear-gradient(to bottom,
    rgba(85, 185, 205, 1) 0%,
    rgba(78, 178, 198, 1) 5%,
    rgba(72, 170, 192, 1) 10%,
    rgba(66, 162, 186, 1) 15%,
    rgba(60, 154, 180, 1) 20%,
    rgba(54, 146, 174, 1) 25%,
    rgba(49, 138, 168, 1) 30%,
    rgba(44, 130, 162, 1) 35%,
    rgba(40, 122, 156, 1) 40%,
    rgba(36, 114, 150, 1) 45%,
    rgba(32, 106, 144, 1) 50%,
    rgba(29, 98, 138, 1) 55%,
    rgba(26, 90, 132, 1) 60%,
    rgba(23, 82, 126, 1) 65%,
    rgba(20, 74, 120, 1) 70%,
    rgba(18, 66, 114, 1) 75%,
    rgba(16, 58, 108, 1) 80%,
    rgba(14, 50, 102, 1) 85%,
    rgba(12, 42, 96, 1) 90%,
    rgba(10, 36, 88, 1) 95%,
    rgba(8, 32, 82, 1) 100%
  );
  
  /* Caustic light rays from surface (like sunlight through water) */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: 
      /* Bright light rays near surface */
      linear-gradient(to bottom, 
        rgba(150, 220, 240, 0.15) 0%, 
        rgba(100, 180, 200, 0.08) 15%,
        transparent 40%
      ),
      /* Underwater ripple effect */
      repeating-linear-gradient(
        90deg,
        transparent 0%,
        rgba(255, 255, 255, 0.02) 10%,
        transparent 20%
      );
    animation: ${waterFlow} 15s linear infinite reverse;
  }
  
  /* Underwater particles/bubbles */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      radial-gradient(circle at 12% 15%, rgba(255,255,255,0.2) 0%, transparent 2px),
      radial-gradient(circle at 38% 35%, rgba(255,255,255,0.15) 0%, transparent 2.5px),
      radial-gradient(circle at 65% 20%, rgba(255,255,255,0.18) 0%, transparent 2px),
      radial-gradient(circle at 85% 50%, rgba(255,255,255,0.12) 0%, transparent 1.5px),
      radial-gradient(circle at 22% 60%, rgba(255,255,255,0.16) 0%, transparent 2px),
      radial-gradient(circle at 55% 75%, rgba(255,255,255,0.14) 0%, transparent 1.8px),
      radial-gradient(circle at 78% 25%, rgba(255,255,255,0.13) 0%, transparent 2.2px),
      radial-gradient(circle at 42% 80%, rgba(255,255,255,0.17) 0%, transparent 2px),
      radial-gradient(circle at 8% 88%, rgba(255,255,255,0.11) 0%, transparent 1.5px),
      radial-gradient(circle at 68% 92%, rgba(255,255,255,0.13) 0%, transparent 2px),
      radial-gradient(circle at 30% 45%, rgba(255,255,255,0.19) 0%, transparent 2.5px),
      radial-gradient(circle at 90% 78%, rgba(255,255,255,0.15) 0%, transparent 2px);
    animation: ${floatParticles} 15s ease-in-out infinite;
  }
`;

// Deep ocean section - for future background content
const DeepOcean = styled.div`
  position: absolute;
  left: 0;
  top: 50vh;
  width: 100%;
  min-height: 50vh;
  z-index: 0;
  
  /* Very deep water gradient - starts lighter, ultra-smooth darkening */
  background: linear-gradient(to bottom,
    rgba(8, 32, 82, 1) 0%,
    rgba(7, 30, 78, 1) 5%,
    rgba(7, 28, 74, 1) 10%,
    rgba(6, 26, 70, 1) 15%,
    rgba(6, 24, 66, 1) 20%,
    rgba(5, 23, 62, 1) 25%,
    rgba(5, 21, 58, 1) 30%,
    rgba(5, 20, 54, 1) 35%,
    rgba(4, 19, 50, 1) 40%,
    rgba(4, 18, 46, 1) 45%,
    rgba(4, 17, 42, 1) 50%,
    rgba(3, 16, 38, 1) 55%,
    rgba(3, 15, 34, 1) 60%,
    rgba(3, 14, 30, 1) 65%,
    rgba(2, 13, 28, 1) 70%,
    rgba(2, 12, 26, 1) 75%,
    rgba(2, 11, 24, 1) 80%,
    rgba(2, 10, 22, 1) 85%,
    rgba(1, 9, 20, 1) 90%,
    rgba(1, 8, 18, 1) 95%,
    rgba(1, 7, 16, 1) 100%
  );
  
  /* Subtle underwater atmosphere */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: 
      repeating-linear-gradient(
        90deg,
        transparent 0%,
        rgba(255, 255, 255, 0.01) 15%,
        transparent 30%
      );
    animation: ${waterFlow} 20s linear infinite reverse;
    opacity: 0.5;
  }
`;

// Underwater header section
const UnderwaterHeader = styled.div`
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  z-index: 10;
  
  /* Subtle glow effect */
  filter: drop-shadow(0 4px 12px rgba(120, 200, 220, 0.3));
`;

const HeaderTitle = styled.h1`
  font-size: 5rem;
  font-weight: 900;
  margin: 0;
  
  /* Underwater text effect - bright cyan with glow */
  background: linear-gradient(135deg, 
    rgba(150, 220, 240, 1) 0%,
    rgba(100, 200, 230, 1) 30%,
    rgba(120, 210, 235, 1) 60%,
    rgba(160, 230, 245, 1) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  /* Bright glow like light through water */
  text-shadow: 
    0 0 20px rgba(120, 200, 220, 0.6),
    0 0 40px rgba(100, 180, 210, 0.4),
    0 4px 8px rgba(0, 60, 100, 0.3);
  
  /* Subtle floating animation */
  animation: floatTitle 4s ease-in-out infinite;
  
  @keyframes floatTitle {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
  }
  
  @media (max-width: 1600px) {
    font-size: 3.5rem;
  }
`;

const HeaderSubtitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 400;
  font-style: italic;
  margin: 1rem 0 0 0;
  
  /* Softer cyan color */
  color: rgba(180, 230, 245, 0.9);
  
  /* Subtle glow */
  text-shadow: 
    0 2px 8px rgba(120, 200, 220, 0.5),
    0 4px 16px rgba(80, 160, 190, 0.3);
  
  /* Slightly offset floating animation */
  animation: floatSubtitle 4s ease-in-out infinite;
  animation-delay: 0.5s;
  
  @keyframes floatSubtitle {
    0%, 100% { transform: translateY(0px); opacity: 0.9; }
    50% { transform: translateY(-6px); opacity: 1; }
  }
  
  @media (max-width: 1600px) {
    font-size: 1.3rem;
  }
`;