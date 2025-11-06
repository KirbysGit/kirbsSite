import React, { useMemo } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

// Space-themed loading animations

// Pulse animation for loading text and rocket glow
const pulse = keyframes`
  0%, 100% { 
    opacity: 0.6; 
    transform: scale(1);
  }
  50% { 
    opacity: 1; 
    transform: scale(1.05);
  }
`;

// Star twinkle animation
const twinkle = keyframes`
  0%, 100% { 
    opacity: 0.3; 
    transform: scale(1);
  }
  50% { 
    opacity: 1; 
    transform: scale(1.2);
  }
`;

// Fade in animation
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const LoadingContainer = styled.div.attrs({
  'data-loading-screen': true
})`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  background: radial-gradient(ellipse at center, 
    rgba(20, 5, 40, 0.95) 0%, 
    rgba(0, 0, 0, 0.98) 30%, 
    rgba(13, 7, 27, 1) 70%);
  opacity: ${props => props.$isFading ? 0 : 1};
  transition: opacity 0.8s ease-out;
  pointer-events: ${props => props.$isFading ? 'none' : 'auto'};
  animation: ${fadeIn} 0.3s ease-in;
  overflow: hidden;
`;

// Background stars
const StarField = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(circle at 20% 30%, rgba(255,255,255,0.4) 1px, transparent 1px),
    radial-gradient(circle at 60% 70%, rgba(255,255,255,0.3) 1px, transparent 1px),
    radial-gradient(circle at 80% 20%, rgba(255,255,255,0.5) 1px, transparent 1px),
    radial-gradient(circle at 40% 80%, rgba(255,255,255,0.4) 1px, transparent 1px),
    radial-gradient(circle at 10% 50%, rgba(255,255,255,0.3) 1px, transparent 1px),
    radial-gradient(circle at 90% 60%, rgba(255,255,255,0.4) 1px, transparent 1px);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  animation: ${twinkle} 3s ease-in-out infinite;
  pointer-events: none;
`;

const LoadingContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  position: relative;
  z-index: 1;
  
  @media (max-width: 600px) {
    gap: 1.25rem;
  }
`;

// Removed OrbitContainer, RotatingRing, and Particle components
// Replaced with Lottie rocket animation

// Loading message text with pulse
const LoadingMessage = styled.div`
  color: rgba(255, 255, 255, 0.95);
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 24px;
  font-weight: 500;
  opacity: ${props => props.$isFading ? 0 : 1};
  transition: opacity 0.5s ease-out;
  animation: ${pulse} 2s ease-in-out infinite;
  text-shadow: 0 0 20px rgba(150, 200, 255, 0.5);
  letter-spacing: 1px;
  text-align: center;
  min-height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Rocket animation container
const RocketContainer = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  opacity: ${props => props.$isFading ? 0 : 1};
  transition: opacity 0.5s ease-out;
  
  /* Subtle glow effect around rocket */
  &::before {
    content: '';
    position: absolute;
    inset: -20px;
    background: radial-gradient(circle, 
      rgba(100, 150, 255, 0.3) 0%,
      rgba(100, 150, 255, 0.1) 50%,
      transparent 100%);
    border-radius: 50%;
    animation: ${pulse} 3s ease-in-out infinite;
    pointer-events: none;
  }
`;

// Progress bar container - enhanced styling
const ProgressContainer = styled.div`
  width: 400px;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  opacity: ${props => props.$isFading ? 0 : 1};
  transition: opacity 0.5s ease-out;
  box-shadow: 
    inset 0 2px 4px rgba(0, 0, 0, 0.3),
    0 0 20px rgba(100, 150, 255, 0.2);
  
  @media (max-width: 600px) {
    width: 300px;
  }
`;

const ProgressBar = styled.div`
  height: 100%;
  background: linear-gradient(90deg, 
    rgba(100, 150, 255, 0.9) 0%,
    rgba(150, 200, 255, 1) 30%,
    rgba(100, 255, 255, 1) 50%,
    rgba(150, 200, 255, 1) 70%,
    rgba(100, 150, 255, 0.9) 100%);
  border-radius: 4px;
  box-shadow: 
    0 0 15px rgba(150, 200, 255, 0.8),
    0 0 30px rgba(100, 150, 255, 0.4),
    inset 0 0 10px rgba(255, 255, 255, 0.3);
  width: ${props => props.$progress || 0}%;
  transition: width 0.3s ease-out;
  transform: translateZ(0);
  position: relative;
  overflow: hidden;
  
  /* Animated shine effect */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.4) 50%,
      transparent 100%);
    animation: ${keyframes`
      0% { left: -100%; }
      100% { left: 100%; }
    `} 2s ease-in-out infinite;
  }
`;

// Progress percentage text
const ProgressText = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 14px;
  font-weight: 300;
  opacity: ${props => props.$isFading ? 0 : 1};
  transition: opacity 0.5s ease-out;
  margin-top: 0.5rem;
  letter-spacing: 1px;
`;

const LoadingScreen = ({ progress = 0, isFading = false }) => {
  // Loading messages based on progress
  const loadingMessage = useMemo(() => {
    if (progress < 10) return 'Preparing launch...';
    if (progress < 25) return 'Loading critical assets...';
    if (progress < 45) return 'Fueling up images...';
    if (progress < 60) return 'Initializing components...';
    if (progress < 80) return 'Loading section content...';
    if (progress < 95) return 'Almost there...';
    if (progress < 100) return 'Finalizing...';
    return 'Ready for launch!';
  }, [progress]);

  return (
    <LoadingContainer $isFading={isFading}>
      <StarField />
      <LoadingContent>
        {/* Rocket Lottie Animation */}
        <RocketContainer $isFading={isFading}>
          <DotLottieReact
            src="https://lottie.host/2320e3a2-2dce-44d0-9466-599303a7d4a0/it1ClYRJBz.lottie"
            loop
            autoplay
            style={{ width: '100%', height: '100%' }}
          />
        </RocketContainer>
        
        {/* Loading message */}
        <LoadingMessage $isFading={isFading}>
          {loadingMessage}
        </LoadingMessage>
        
        {/* Progress bar */}
        <ProgressContainer $isFading={isFading}>
          <ProgressBar $progress={progress} />
        </ProgressContainer>
        
        {/* Progress percentage */}
        {progress > 0 && (
          <ProgressText $isFading={isFading}>
            {Math.round(progress)}%
          </ProgressText>
        )}
      </LoadingContent>
    </LoadingContainer>
  );
};

export default LoadingScreen;
