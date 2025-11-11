/**
 * Shared utility for smooth scrolling to sections with responsive offsets
 * Uses custom easing for smoother, slower scroll animation
 * @param {string} sectionId - The ID of the section to scroll to
 * @param {number} desktopOffset - Offset for screens >= 2000px
 * @param {number} mobileOffset - Offset for screens < 2000px
 */
export const scrollToSection = (sectionId, desktopOffset = 0, mobileOffset = 0) => {
  const element = document.getElementById(sectionId);
  if (!element) return;
  
  // Cache window width to avoid repeated calls
  const width = window.innerWidth;
  const offset = width >= 2000 ? desktopOffset : mobileOffset;
  
  // Calculate target position
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;
  const startPosition = window.pageYOffset;
  const distance = offsetPosition - startPosition;
  
  // If distance is small, use native smooth scroll
  if (Math.abs(distance) < 100) {
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
    return;
  }
  
  // Custom smooth scroll with easing - slower and smoother (takes ~1 second)
  const duration = 1000; // 1 second as requested
  let startTime = null;
  
  // Easing function for smooth acceleration and deceleration
  const easeInOutCubic = (t) => {
    return t < 0.5 
      ? 4 * t * t * t 
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };
  
  const animateScroll = (currentTime) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    
    // Apply easing
    const easedProgress = easeInOutCubic(progress);
    
    // Calculate current position
    const currentPosition = startPosition + (distance * easedProgress);
    
    // Scroll to position
    window.scrollTo(0, currentPosition);
    
    // Continue animation if not complete
    if (timeElapsed < duration) {
      requestAnimationFrame(animateScroll);
    }
  };
  
  // Start animation
  requestAnimationFrame(animateScroll);
};

