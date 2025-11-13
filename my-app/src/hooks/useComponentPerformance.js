// React hook for measuring component performance
import { useEffect, useRef } from 'react';
import { startMeasure, endMeasure } from '../utils/performanceMonitor';

/**
 * Hook to measure component mount and render performance
 * @param {string} componentName - Name of the component
 * @param {boolean} enabled - Whether to enable measurement (default: true)
 */
export const useComponentPerformance = (componentName, enabled = true) => {
  const mountStartRef = useRef(null);
  const renderCountRef = useRef(0);
  
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;
    
    // Measure mount time
    mountStartRef.current = performance.now();
    startMeasure(`${componentName}-mount`);
    
    return () => {
      if (mountStartRef.current) {
        const mountTime = performance.now() - mountStartRef.current;
        endMeasure(`${componentName}-mount`, 100); // 100ms threshold for mount
      }
    };
  }, [componentName, enabled]);
  
  // Measure render time
  useEffect(() => {
    if (!enabled) return;
    
    renderCountRef.current += 1;
    const renderNum = renderCountRef.current;
    const renderStart = performance.now();
    
    startMeasure(`${componentName}-render-${renderNum}`);
    
    // Use requestAnimationFrame to measure after paint
    requestAnimationFrame(() => {
      const renderTime = performance.now() - renderStart;
      endMeasure(`${componentName}-render-${renderNum}`, 16);
      
    });
  });
};

/**
 * Hook to measure expensive operations
 * @param {string} operationName - Name of the operation
 * @returns {Function} Function to call when operation completes
 */
export const useOperationPerformance = (operationName) => {
  const startTimeRef = useRef(null);
  
  return {
    start: () => {
      if (typeof window !== 'undefined' && window.performance) {
        startTimeRef.current = performance.now();
        startMeasure(`${operationName}-operation`);
      }
    },
    end: () => {
      if (startTimeRef.current && typeof window !== 'undefined' && window.performance) {
        const duration = performance.now() - startTimeRef.current;
        endMeasure(`${operationName}-operation`, 16);
        
        return duration;
      }
      return 0;
    }
  };
};

