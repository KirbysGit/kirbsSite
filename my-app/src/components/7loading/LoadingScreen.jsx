import React, { useMemo, useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import astronautImg from '../../images/1hero/astronaut.png';

// Simple fade in animation
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
  /* Match Hero.jsx background - plain spacey background, no dark center */
  background: radial-gradient(ellipse at center, 
    rgba(20, 5, 40, 0.8) 0%, 
    rgba(13, 7, 27, 0.9) 50%, 
    rgba(13, 7, 27, 1) 100%);
  opacity: ${props => props.$isFading ? 0 : 1};
  transition: opacity 0.8s ease-out;
  pointer-events: ${props => props.$isFading ? 'none' : 'auto'};
  animation: ${fadeIn} 0.3s ease-in;
  overflow: hidden;
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

// Loading message text - simple, no animations
const LoadingMessage = styled.div`
  color: rgba(255, 255, 255, 0.95);
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 24px;
  font-weight: 500;
  opacity: ${props => props.$isFading ? 0 : 1};
  transition: opacity 0.5s ease-out;
  text-shadow: 0 0 20px rgba(150, 200, 255, 0.5);
  letter-spacing: 1px;
  text-align: center;
  min-height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Circular progress ring container
const ProgressRingContainer = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  opacity: ${props => props.$isFading ? 0 : 1};
  transition: opacity 0.5s ease-out;
  
  /* GPU acceleration */
  transform: translateZ(0);
  will-change: transform, opacity;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
`;

// SVG for circular progress ring
const ProgressRingSVG = styled.svg`
  width: 100%;
  height: 100%;
  transform: rotate(-90deg) translateZ(0); /* Start from top, GPU acceleration */
  transform-origin: center;
  will-change: transform;
`;

// Background circle (unfilled part)
const BackgroundCircle = styled.circle`
  fill: none;
  stroke: rgba(100, 70, 150, 0.2);
  stroke-width: 6;
`;

// Progress circle (filled part) - lavender color like navbar logo
const ProgressCircle = styled.circle`
  fill: none;
  stroke: rgb(100, 70, 150);
  stroke-width: 6;
  stroke-linecap: round;
  stroke-dasharray: ${props => 2 * Math.PI * props.$radius};
  stroke-dashoffset: ${props => 2 * Math.PI * props.$radius * (1 - props.$progress / 100)};
  /* Smoother transition - longer duration for less janky updates */
  transition: stroke-dashoffset 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  filter: drop-shadow(0 0 8px rgba(100, 70, 150, 0.6));
  transform: translateZ(0);
  will-change: stroke-dashoffset;
`;

// Astronaut image - rotates based on progress
const AstronautImage = styled.div`
  position: absolute;
  width: 80px;
  height: 80px;
  background-image: url(${astronautImg});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  transform: rotate(${props => (props.$progress / 100) * 360}deg) translateZ(0);
  transform-origin: center;
  /* Smoother rotation - longer duration for less janky updates */
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
  filter: drop-shadow(0 0 10px rgba(150, 200, 255, 0.4));
`;

// Progress percentage text - below the ring
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
  // Throttle progress updates to reduce animation lag during heavy loading
  const [throttledProgress, setThrottledProgress] = useState(0);
  const rafRef = useRef(null);
  const lastUpdateRef = useRef(0);
  
  useEffect(() => {
    // Use requestAnimationFrame to throttle updates to ~60fps max
    // This prevents janky animations when progress updates come in rapid succession
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    
    rafRef.current = requestAnimationFrame(() => {
      const now = performance.now();
      // Throttle to max 30fps (33ms between updates) for smoother animation
      if (now - lastUpdateRef.current >= 33) {
        setThrottledProgress(progress);
        lastUpdateRef.current = now;
      } else {
        // If we're throttling, schedule another update
        const delay = 33 - (now - lastUpdateRef.current);
        setTimeout(() => {
          setThrottledProgress(progress);
          lastUpdateRef.current = performance.now();
        }, delay);
      }
    });
    
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [progress]);
  
  // Loading messages based on throttled progress
  const loadingMessage = useMemo(() => {
    const currentProgress = throttledProgress;
    if (currentProgress < 10) return 'Preparing launch...';
    if (currentProgress < 25) return 'Loading critical assets...';
    if (currentProgress < 45) return 'Fueling up images...';
    if (currentProgress < 60) return 'Initializing components...';
    if (currentProgress < 80) return 'Loading section content...';
    if (currentProgress < 95) return 'Almost there...';
    if (currentProgress < 100) return 'Finalizing...';
    return 'Ready for launch!';
  }, [throttledProgress]);

  // Calculate circle radius for SVG (accounting for stroke width)
  const radius = 90; // Inner radius, accounting for 6px stroke

  return (
    <LoadingContainer $isFading={isFading}>
      <LoadingContent>
        {/* Circular progress ring with rotating astronaut */}
        <ProgressRingContainer $isFading={isFading}>
          {/* SVG Progress Ring */}
          <ProgressRingSVG viewBox="0 0 200 200">
            {/* Background circle (unfilled) */}
            <BackgroundCircle
              cx="100"
              cy="100"
              r={radius}
            />
            {/* Progress circle (filled) - draws as loading progresses */}
            <ProgressCircle
              cx="100"
              cy="100"
              r={radius}
              $radius={radius}
              $progress={throttledProgress}
            />
          </ProgressRingSVG>
          
          {/* Rotating astronaut in center */}
          <AstronautImage $progress={throttledProgress} />
        </ProgressRingContainer>
        
        {/* Loading message - below the ring */}
        <LoadingMessage $isFading={isFading}>
          {loadingMessage}
        </LoadingMessage>
        
        {/* Progress percentage - below the message */}
        {throttledProgress > 0 && (
          <ProgressText $isFading={isFading}>
            {Math.round(throttledProgress)}%
          </ProgressText>
        )}
      </LoadingContent>
    </LoadingContainer>
  );
};

export default LoadingScreen;
