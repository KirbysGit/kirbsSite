// Performance monitoring utility
// Helps identify which components are slowing down the site

/**
 * Start measuring a component's render time
 * @param {string} componentName - Name of the component being measured
 */
export const startMeasure = (componentName) => {
  if (typeof window !== 'undefined' && window.performance && window.performance.mark) {
    window.performance.mark(`${componentName}-render-start`);
  }
};

/**
 * End measuring a component's render time and log if slow
 * @param {string} componentName - Name of the component being measured
 * @param {number} threshold - Threshold in ms to consider slow (default: 16ms for 60fps)
 */
export const endMeasure = (componentName, threshold = 16) => {
  if (typeof window !== 'undefined' && window.performance && window.performance.mark) {
    window.performance.mark(`${componentName}-render-end`);
    try {
      window.performance.measure(
        `${componentName}-render-time`,
        `${componentName}-render-start`,
        `${componentName}-render-end`
      );
      
      const measure = window.performance.getEntriesByName(`${componentName}-render-time`)[0];
    } catch (e) {
      // Performance API might not be fully supported
    }
  }
};

/**
 * Get performance report for all measured components
 * @returns {Array} Array of performance measurements sorted by duration
 */
export const getPerformanceReport = () => {
  if (typeof window === 'undefined' || !window.performance || !window.performance.getEntriesByType) {
    return [];
  }
  
  try {
    const measures = window.performance.getEntriesByType('measure');
    return measures
      .filter(m => m.name.includes('-render-time') || m.name.includes('-load-time'))
      .sort((a, b) => b.duration - a.duration)
      .map(measure => ({
        name: measure.name.replace('-render-time', '').replace('-load-time', ''),
        duration: measure.duration,
        type: measure.name.includes('-load-time') ? 'load' : 'render'
      }));
  } catch (e) {
    return [];
  }
};

/**
 * Log a performance report to console
 */
export const logPerformanceReport = () => {
  // Performance reporting disabled - no console output
  return;
};

/**
 * Clear all performance marks and measures
 */
export const clearPerformanceData = () => {
  if (typeof window !== 'undefined' && window.performance) {
    try {
      // Clear all marks
      const marks = window.performance.getEntriesByType('mark');
      marks.forEach(mark => window.performance.clearMarks(mark.name));
      
      // Clear all measures
      const measures = window.performance.getEntriesByType('measure');
      measures.forEach(measure => window.performance.clearMeasures(measure.name));
    } catch (e) {
      // Performance API might not be fully supported
    }
  }
};

/**
 * Measure a function's execution time
 * @param {string} label - Label for the measurement
 * @param {Function} fn - Function to measure
 * @returns {*} Return value of the function
 */
export const measureFunction = (label, fn) => {
  if (typeof window !== 'undefined' && window.performance && window.performance.now) {
    const start = window.performance.now();
    const result = fn();
    const end = window.performance.now();
    const duration = end - start;
    
    return result;
  }
  return fn();
};

