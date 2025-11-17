// loadingScreen.jsx

// component with our silly lil astronaut spinning for progress.

// imports.
import React, { useMemo, useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';

// images.
import astronautImg from '@/images/1hero/astronaut.png';

/* ================== main component ================== */

const LoadingScreen = ({ progress = 0, isFading = false }) => {
  
  const [animatedProgress, setAnimatedProgress] = useState(0);  // state for animated progress.
  const [hasCompleted, setHasCompleted] = useState(false);      // state for if loading has completed.

  const animationRef = useRef(null);                         // ref for animation.
  const lastFrameTimeRef = useRef(null);                     // ref for last frame time.
  
  // estimate load time based on early progress.
  const mountTimeRef = useRef(performance.now());             // ref for mount time.
  const estimatedDurationRef = useRef(null);                  // ref for estimated duration.
  const actualProgressRef = useRef(0);                        // ref for actual progress.
  const progressHistoryRef = useRef([]);                      // ref for progress history.
  const completionTimeRef = useRef(null);                     // ref for completion time.
  
  // update actual progress and estimate duration.
  useEffect(() => {
    const now = performance.now();
    const elapsed = now - mountTimeRef.current;
    
    actualProgressRef.current = progress;
    
    // track progress updates for debugging.
    progressHistoryRef.current.push({
      time: elapsed,
      progress: progress,
      timestamp: now
    });
    
    // estimate total duration based on early progress.
    // after we hit 50% or 2 seconds, estimate total time.
    if (!estimatedDurationRef.current && (progress >= 50 || elapsed > 2000)) {
      if (progress > 0) {
        // estimate: if we're at X% in Y ms, total will be approximately Y * (100/X).
        const estimated = elapsed * (100 / progress);
        // add buffer and cap between 3-10 seconds for smooth animation.
        estimatedDurationRef.current = Math.max(3000, Math.min(10000, estimated * 1.2));
      } else {
        // fallback: use default estimate.
        estimatedDurationRef.current = 6000; // 6 seconds default
      }
    }
  }, [progress]);
  
  // track mount time for progress estimation.
  useEffect(() => {
    const mountTime = performance.now();
    mountTimeRef.current = mountTime;
  }, []);
  
  // smooth fill animation - fills to 95% based on estimated time, then waits for actual completion.
  useEffect(() => {
    const animate = (currentTime) => {
      if (lastFrameTimeRef.current === null) {
        lastFrameTimeRef.current = currentTime;
      }
      
      const deltaTime = Math.min(currentTime - lastFrameTimeRef.current, 33); // cap at 33ms for stability.
      const elapsed = currentTime - mountTimeRef.current;                     // elapsed time.
      const actualProgress = actualProgressRef.current;                       // actual progress.
      
      setAnimatedProgress(prev => {
        let targetProgress;
        
        // if we have an estimated duration, fill smoothly to 95%.
        if (estimatedDurationRef.current) {
          // calculate smooth fill progress (0-95% over estimated duration).
          const fillProgress = Math.min(95, (elapsed / estimatedDurationRef.current) * 95);
          
          // if actual loading is complete (100%), smoothly animate from current to 100%.
          if (actualProgress >= 100) {
            // smoothly interpolate from current progress to 100%.
            const difference = 100 - prev;
            if (Math.abs(difference) < 0.1) {
              // mark as completed when we reach 100%.
              if (!completionTimeRef.current) {
                completionTimeRef.current = currentTime;
                setHasCompleted(true);
              }
              return 100;
            }
            // slower for final 5% to make completion more visible.
            const speed = 0.12;
            const increment = difference * speed * (deltaTime / 16);
            return Math.min(100, prev + increment);
          } else {
            // use the smooth fill progress (capped at 95%).
            targetProgress = fillProgress;
          }
        } else {
          // before we have an estimate, use actual progress (but smooth it).
          // this handles the initial period before estimation kicks in.
          const difference = actualProgress - prev;
          if (Math.abs(difference) < 0.1) {
            return Math.min(95, actualProgress); // cap at 95% until estimate.
          }
          // smooth interpolation for initial period.
          const speed = 0.3;
          const increment = difference * speed * (deltaTime / 16);
          return Math.max(0, Math.min(95, prev + increment)); // Cap at 95% until estimate
        }
        
        // smooth interpolation to target (only if target is higher than current).
        if (targetProgress !== undefined) {
          // only animate upward, never downward (prevents going below 95% when waiting).
          if (targetProgress > prev) {
            const difference = targetProgress - prev;
            if (Math.abs(difference) < 0.1) {
              return targetProgress;
            }
            const speed = 0.2;
            const increment = difference * speed * (deltaTime / 16);
            return Math.max(prev, Math.min(95, prev + increment));
          } else {
            // if target is lower (shouldn't happen), maintain current progress.
            return prev;
          }
        }
        
        return prev;
      });
      
      // update last frame time.
      lastFrameTimeRef.current = currentTime;
      // request next animation frame.
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // start continuous animation loop.
    lastFrameTimeRef.current = null;
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, []); // run once on mount - loop continues until unmount.
  
  // loading messages based on animated progress.
  const loadingMessage = useMemo(() => {
    const currentProgress = animatedProgress;
    if (currentProgress < 50) return 'Getting ready...';
    if (currentProgress < 95) return 'Almost there...';
    if (currentProgress >= 100) return 'All set!';
    return 'Finishing up...';
  }, [animatedProgress]);

  // internal fade state - only fade after progress completes and brief delay.
  const [internalFading, setInternalFading] = useState(false);
  
  // delay fade until progress completes and shows completion briefly.
  useEffect(() => {
    if (hasCompleted && isFading) {
      // wait 400ms after completion before starting fade (shows completion state).
      const fadeTimer = setTimeout(() => {
        setInternalFading(true);
      }, 400);
      return () => clearTimeout(fadeTimer);
    } else if (!hasCompleted) {
      setInternalFading(false);
    }
  }, [hasCompleted, isFading]);

  // calculate circle radius for SVG (accounting for stroke width).
  const radius = 90; // Inner radius, accounting for 6px stroke

  return (
    <LoadingContainer $isFading={internalFading}>
      {/* starfield background - matching our hero which is will fade into */}
      <StarfieldBackground />
      
      <LoadingContent>
        {/* circular progress ring with rotating astronaut */}
        <ProgressRingContainer $isFading={internalFading}>
			{/* svg progress ring */}
			<ProgressRingSVG viewBox="0 0 200 200">
				{/* background circle (unfilled) */}
				<BackgroundCircle
					cx="100"
					cy="100"
					r={radius}
				/>
				{/* progress circle (filled) - draws as loading progresses */}
				<ProgressCircle
					cx="100"
					cy="100"
					r={radius}
					$radius={radius}
					$progress={animatedProgress}
				/>
			</ProgressRingSVG>
          
          {/* rotating astronaut in center */}
          <AstronautImage $progress={animatedProgress} />
        </ProgressRingContainer>
        
        {/* loading message - below the ring */}
        <LoadingMessage $isFading={internalFading}>
          	{loadingMessage}
        </LoadingMessage>
        
        {/* progress percentage - below the message */}
        {animatedProgress > 0 && (
			<ProgressText $isFading={internalFading}>
				{Math.round(animatedProgress)}%
			</ProgressText>
        )}
      </LoadingContent>
    </LoadingContainer>
  );
};

export default LoadingScreen;

/* ====================== styled ====================== */

// simple fade in animation.
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const LoadingContainer = styled.div.attrs({
    'data-loading-screen': true
})`
    /* layout */
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    
    /* spacing */
    width: 100%;
    height: 100%;
    
    /* styles */
    z-index: 9999;
    opacity: ${props => props.$isFading ? 0 : 1};
    pointer-events: ${props => props.$isFading ? 'none' : 'auto'};
    background: radial-gradient(ellipse at center, 
        rgba(20, 5, 40, 0.8) 0%, 
        rgba(0, 0, 0, 0.9) 30%, 
        rgba(13, 7, 27, 1) 70%);
    
    /* animations */
    animation: ${fadeIn} 0.3s ease-in;
    transition: opacity 0.8s ease-out;
    
    /* pseudo-elements */
    &::after {
        /* layout */
        content: '';
        position: absolute;
        inset: 0;
        pointer-events: none;
        
        /* styles */
        z-index: 0;
        opacity: 0.7;
        transform: translateZ(0);
        will-change: opacity, transform;
        animation: breathe 10s ease-in-out infinite;
        background: 
            radial-gradient(ellipse at 20% 20%, rgba(120, 50, 200, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, rgba(50, 100, 200, 0.2) 0%, transparent 50%),
            linear-gradient(135deg, 
                rgba(0, 0, 0, 0.8) 0%, 
                rgba(20, 5, 40, 0.6) 50%,
                rgba(0, 0, 0, 0.8) 100%);
        mask-image: linear-gradient(to bottom, black 75%, transparent 100%);
        -webkit-mask-image: linear-gradient(to bottom, black 75%, transparent 100%);
        
        /* media queries */
        @media (prefers-reduced-motion: reduce) {
            animation: none;
            opacity: 0.7;
        }
    }
    
    /* keyframes */
    @keyframes breathe {
        0%, 100% { 
            opacity: 0.5;
            transform: translateZ(0) scale(1);
        }
        50% { 
            opacity: 0.8;
            transform: translateZ(0) scale(1.05);
        }
    }
`;

const StarfieldBackground = styled.div`
    /* layout */
    position: absolute;
    inset: 0;
    pointer-events: none;
    
    /* styles */
    z-index: 1;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image:
        radial-gradient(circle at 8% 12%, rgba(255,255,255,0.4) 0.5px, transparent 1px),
        radial-gradient(circle at 22% 88%, rgba(255,255,255,0.3) 0.5px, transparent 1px),
        radial-gradient(circle at 38% 28%, rgba(255,255,255,0.5) 0.5px, transparent 1px),
        radial-gradient(circle at 58% 72%, rgba(255,255,255,0.4) 0.5px, transparent 1px),
        radial-gradient(circle at 78% 18%, rgba(255,255,255,0.3) 0.5px, transparent 1px),
        radial-gradient(circle at 12% 58%, rgba(255,255,255,0.4) 0.5px, transparent 1px),
        radial-gradient(circle at 32% 42%, rgba(255,255,255,0.5) 0.5px, transparent 1px),
        radial-gradient(circle at 68% 92%, rgba(255,255,255,0.3) 0.5px, transparent 1px),
        radial-gradient(circle at 48% 8%, rgba(255,255,255,0.4) 0.5px, transparent 1px),
        radial-gradient(circle at 82% 52%, rgba(255,255,255,0.3) 0.5px, transparent 1px),
        radial-gradient(circle at 18% 78%, rgba(255,255,255,0.5) 0.5px, transparent 1px),
        radial-gradient(circle at 42% 92%, rgba(255,255,255,0.4) 0.5px, transparent 1px),
        radial-gradient(circle at 62% 32%, rgba(255,255,255,0.3) 0.5px, transparent 1px),
        radial-gradient(circle at 28% 3%, rgba(255,255,255,0.4) 0.5px, transparent 1px),
        radial-gradient(circle at 72% 85%, rgba(255,255,255,0.5) 0.5px, transparent 1px);
    
    /* GPU acceleration */
    contain: layout style paint;
    transform: translateZ(0);
    backface-visibility: hidden;
`;

const LoadingContent = styled.div`
    /* layout */
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    /* spacing */
    gap: 1.5rem;
    
    /* styles */
    z-index: 2;
    
    /* media queries */
    @media (max-width: 600px) {
        gap: 1.25rem;
    }
`;

// loading message text - below the ring.
const LoadingMessage = styled.div`
    /* layout */
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    min-height: 32px;
    
    /* spacing */
    font-size: 24px;
    letter-spacing: 1px;
    
    /* styles */
    opacity: ${props => props.$isFading ? 0 : 1};
    font-family: system-ui, -apple-system, sans-serif;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.95);
    text-shadow: 0 0 20px rgba(150, 200, 255, 0.5);
    transition: opacity 0.5s ease-out;
`;

// circular progress ring container
const ProgressRingContainer = styled.div`
    /* layout */
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: visible;
    
    /* spacing */
    width: 320px;
    height: 320px;
    
    /* styles */
    opacity: ${props => props.$isFading ? 0 : 1};
    transition: opacity 0.5s ease-out;
    
    /* GPU acceleration */
    transform: translateZ(0);
    will-change: transform, opacity;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
`;

// svg for circular progress ring
const ProgressRingSVG = styled.svg`
    /* spacing */
    width: 300px;
    height: 300px;
    
    /* styles */
    transform-origin: center;
    transform: rotate(-90deg) translateZ(0);
    will-change: transform;
`;

// background circle (unfilled part)
const BackgroundCircle = styled.circle`
    /* styles */
    fill: none;
    stroke: rgba(100, 70, 150, 0.2);
    stroke-width: 6;
`;

// progress circle (filled part)
const ProgressCircle = styled.circle`
    /* styles */
    fill: none;
    stroke: rgb(100, 70, 150);
    stroke-width: 6;
    stroke-linecap: round;
    stroke-dasharray: ${props => 2 * Math.PI * props.$radius};
    stroke-dashoffset: ${props => 2 * Math.PI * props.$radius * (1 - props.$progress / 100)};
    filter: drop-shadow(0 0 4px rgba(100, 70, 150, 0.6));
    transform: translateZ(0);
    will-change: stroke-dashoffset;
    transition: stroke-dashoffset 0.1s linear;
`;

// astronaut image - rotates based on progress
const AstronautImage = styled.div`
    /* layout */
    position: absolute;
    
    /* spacing */
    width: 80px;
    height: 80px;
    
    /* styles */
    transform-origin: center;
    transform: rotate(${props => (props.$progress / 100) * 360}deg) translateZ(0);
    will-change: transform;
    background-image: url(${astronautImg});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    filter: drop-shadow(0 0 10px rgba(150, 200, 255, 0.4));
    transition: transform 0.1s linear;
`;

// progress percentage text - below the ring
const ProgressText = styled.div`
    /* spacing */
    font-size: 14px;
    letter-spacing: 1px;
    margin-top: 0.5rem;
    
    /* styles */
    opacity: ${props => props.$isFading ? 0 : 1};
    font-family: system-ui, -apple-system, sans-serif;
    font-weight: 300;
    color: rgba(255, 255, 255, 0.7);
    transition: opacity 0.5s ease-out;
`;
