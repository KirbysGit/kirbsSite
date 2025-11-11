import React, { useMemo, useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import astronautImg from '@/images/1hero/astronaut.png';

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
  /* Smooth transition - matches animation speed */
  transition: stroke-dashoffset 0.1s linear;
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
  /* Smooth rotation - matches animation speed */
  transition: transform 0.1s linear;
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
  // Smooth animated progress - fills smoothly based on estimated time
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const animationRef = useRef(null);
  const lastFrameTimeRef = useRef(null);
  
  // Estimate load time based on early progress
  const mountTimeRef = useRef(performance.now());
  const estimatedDurationRef = useRef(null);
  const actualProgressRef = useRef(0);
  const progressHistoryRef = useRef([]);
  
  // Update actual progress and estimate duration
  useEffect(() => {
    const now = performance.now();
    const elapsed = now - mountTimeRef.current;
    
    actualProgressRef.current = progress;
    
    // Track progress updates for debugging
    progressHistoryRef.current.push({
      time: elapsed,
      progress: progress,
      timestamp: now
    });
    
    // Estimate total duration based on early progress
    // After we hit 50% or 2 seconds, estimate total time
    if (!estimatedDurationRef.current && (progress >= 50 || elapsed > 2000)) {
      if (progress > 0) {
        // Estimate: if we're at X% in Y ms, total will be approximately Y * (100/X)
        const estimated = elapsed * (100 / progress);
        // Add buffer and cap between 3-10 seconds for smooth animation
        estimatedDurationRef.current = Math.max(3000, Math.min(10000, estimated * 1.2));
        console.log(`[LoadingScreen] Estimated load time: ${estimatedDurationRef.current.toFixed(0)}ms (based on ${progress.toFixed(1)}% at ${elapsed.toFixed(0)}ms)`);
      } else {
        // Fallback: use default estimate
        estimatedDurationRef.current = 6000; // 6 seconds default
        console.log(`[LoadingScreen] Using default estimated load time: ${estimatedDurationRef.current.toFixed(0)}ms`);
      }
    }
  }, [progress]);
  
  // Debug: Log when component mounts/unmounts
  useEffect(() => {
    const mountTime = performance.now();
    mountTimeRef.current = mountTime;
    console.log(`[LoadingScreen] Mounted at ${mountTime.toFixed(2)}ms`);
    
    return () => {
      const totalTime = performance.now() - mountTime;
      console.log(`[LoadingScreen] Unmounted after ${totalTime.toFixed(2)}ms`);
      console.log(`[LoadingScreen] Progress history:`, progressHistoryRef.current);
    };
  }, []);
  
  // Debug: Log when fading starts
  useEffect(() => {
    if (isFading) {
      const elapsed = performance.now() - mountTimeRef.current;
      console.log(`[LoadingScreen] Started fading at ${elapsed.toFixed(2)}ms (progress: ${progress.toFixed(1)}%)`);
    }
  }, [isFading, progress]);
  
  // Smooth fill animation - fills to 95% based on estimated time, then waits for actual completion
  useEffect(() => {
    const animate = (currentTime) => {
      if (lastFrameTimeRef.current === null) {
        lastFrameTimeRef.current = currentTime;
      }
      
      const deltaTime = Math.min(currentTime - lastFrameTimeRef.current, 33); // Cap at 33ms for stability
      const elapsed = currentTime - mountTimeRef.current;
      const actualProgress = actualProgressRef.current;
      
      setAnimatedProgress(prev => {
        let targetProgress;
        
        // If we have an estimated duration, fill smoothly to 95%
        if (estimatedDurationRef.current) {
          // Calculate smooth fill progress (0-95% over estimated duration)
          const fillProgress = Math.min(95, (elapsed / estimatedDurationRef.current) * 95);
          
          // If actual loading is complete (100%), smoothly animate from current to 100%
          if (actualProgress >= 100) {
            // Smoothly interpolate from current progress to 100%
            const difference = 100 - prev;
            if (Math.abs(difference) < 0.1) {
              return 100;
            }
            const speed = 0.15; // Slower for final 5% for smooth finish
            const increment = difference * speed * (deltaTime / 16);
            return Math.min(100, prev + increment);
          } else {
            // Use the smooth fill progress (capped at 95%)
            targetProgress = fillProgress;
          }
        } else {
          // Before we have an estimate, use actual progress (but smooth it)
          // This handles the initial period before estimation kicks in
          const difference = actualProgress - prev;
          if (Math.abs(difference) < 0.1) {
            return Math.min(95, actualProgress); // Cap at 95% until estimate
          }
          // Smooth interpolation for initial period
          const speed = 0.3;
          const increment = difference * speed * (deltaTime / 16);
          return Math.max(0, Math.min(95, prev + increment)); // Cap at 95% until estimate
        }
        
        // Smooth interpolation to target (only if target is higher than current)
        if (targetProgress !== undefined) {
          // Only animate upward, never downward (prevents going below 95% when waiting)
          if (targetProgress > prev) {
            const difference = targetProgress - prev;
            if (Math.abs(difference) < 0.1) {
              return targetProgress;
            }
            // Smooth interpolation
            const speed = 0.2;
            const increment = difference * speed * (deltaTime / 16);
            return Math.max(prev, Math.min(95, prev + increment)); // Never go down, cap at 95%
          } else {
            // If target is lower (shouldn't happen), maintain current progress
            return prev;
          }
        }
        
        return prev;
      });
      
      lastFrameTimeRef.current = currentTime;
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Start continuous animation loop
    lastFrameTimeRef.current = null;
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, []); // Run once on mount - loop continues until unmount
  
  // Loading messages based on animated progress
  const loadingMessage = useMemo(() => {
    const currentProgress = animatedProgress;
    if (currentProgress < 10) return 'Preparing launch...';
    if (currentProgress < 25) return 'Loading critical assets...';
    if (currentProgress < 45) return 'Fueling up images...';
    if (currentProgress < 60) return 'Initializing components...';
    if (currentProgress < 80) return 'Loading section content...';
    if (currentProgress < 95) return 'Almost there...';
    if (currentProgress < 100) return 'Finalizing...';
    return 'Ready for launch!';
  }, [animatedProgress]);

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
              $progress={animatedProgress}
            />
          </ProgressRingSVG>
          
          {/* Rotating astronaut in center */}
          <AstronautImage $progress={animatedProgress} />
        </ProgressRingContainer>
        
        {/* Loading message - below the ring */}
        <LoadingMessage $isFading={isFading}>
          {loadingMessage}
        </LoadingMessage>
        
        {/* Progress percentage - below the message */}
        {animatedProgress > 0 && (
          <ProgressText $isFading={isFading}>
            {Math.round(animatedProgress)}%
          </ProgressText>
        )}
      </LoadingContent>
    </LoadingContainer>
  );
};

export default LoadingScreen;
