import React from 'react';
import styled, { keyframes, css } from 'styled-components';

// Space-themed loading animations

// Orbiting particles animation
const orbit = keyframes`
  0% {
    transform: rotate(0deg) translateX(60px) rotate(0deg);
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: rotate(360deg) translateX(60px) rotate(-360deg);
    opacity: 0.3;
  }
`;

// Pulse animation for loading text
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

// Progress bar fill animation
const progressFill = keyframes`
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
`;

// Rotating ring animation
const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Fade in animation
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const LoadingContainer = styled.div`
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
  gap: 2rem;
  position: relative;
  z-index: 1;
`;

// Orbiting particles container
const OrbitContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Central rotating ring
const RotatingRing = styled.div`
  position: absolute;
  width: 120px;
  height: 120px;
  border: 2px solid rgba(100, 150, 255, 0.3);
  border-radius: 50%;
  border-top-color: rgba(100, 150, 255, 0.8);
  border-right-color: rgba(100, 150, 255, 0.6);
  animation: ${rotate} 2s linear infinite;
  transform: translateZ(0);
`;

// Orbiting particles
const Particle = styled.div`
  position: absolute;
  width: 8px;
  height: 8px;
  background: radial-gradient(circle, rgba(150, 200, 255, 0.9), rgba(100, 150, 255, 0.5));
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(150, 200, 255, 0.6);
  animation: ${orbit} ${props => props.$duration || 3}s linear infinite;
  animation-delay: ${props => props.$delay || 0}s;
  transform: translateZ(0);
  will-change: transform;
`;

// Loading text with pulse
const LoadingText = styled.div`
  color: rgba(255, 255, 255, 0.95);
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 28px;
  font-weight: 500;
  opacity: ${props => props.$isFading ? 0 : 1};
  transition: opacity 0.5s ease-out;
  animation: ${pulse} 2s ease-in-out infinite;
  text-shadow: 0 0 20px rgba(150, 200, 255, 0.5);
  letter-spacing: 2px;
`;

// Progress bar container
const ProgressContainer = styled.div`
  width: 300px;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
  position: relative;
  opacity: ${props => props.$isFading ? 0 : 1};
  transition: opacity 0.5s ease-out;
`;

const ProgressBar = styled.div`
  height: 100%;
  background: linear-gradient(90deg, 
    rgba(100, 150, 255, 0.8) 0%,
    rgba(150, 200, 255, 1) 50%,
    rgba(100, 150, 255, 0.8) 100%);
  border-radius: 2px;
  box-shadow: 0 0 10px rgba(150, 200, 255, 0.6);
  width: ${props => props.$progress || 0}%;
  transition: width 0.3s ease-out;
  animation: ${progressFill} 2.5s ease-out forwards;
  transform: translateZ(0);
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
  return (
    <LoadingContainer $isFading={isFading}>
      <StarField />
      <LoadingContent>
        <OrbitContainer>
          <RotatingRing />
          <Particle $duration={3} $delay={0} />
          <Particle $duration={3.5} $delay={0.5} />
          <Particle $duration={4} $delay={1} />
          <Particle $duration={3.2} $delay={1.5} />
        </OrbitContainer>
        
        <LoadingText $isFading={isFading}>
          Loading...
        </LoadingText>
        
        <ProgressContainer $isFading={isFading}>
          <ProgressBar $progress={progress} />
        </ProgressContainer>
        
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
