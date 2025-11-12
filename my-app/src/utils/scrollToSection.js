/**
 * Shared utility for smooth scrolling to sections with responsive offsets
 * Uses custom easing for smoother, slower scroll animation
 * @param {string} sectionId - The ID of the section to scroll to
 * @param {number} desktopOffset - Offset for screens >= 2000px
 * @param {number} mobileOffset - Offset for screens < 2000px
 */
export const scrollToSection = (sectionId, desktopOffset = 0, mobileOffset = 0) => {
  const clickTime = performance.now();
  console.log(`[scrollToSection] Click detected at ${clickTime.toFixed(2)}ms for section: ${sectionId}`);
  
  const element = document.getElementById(sectionId);
  if (!element) {
    console.warn(`[scrollToSection] Element with id "${sectionId}" not found`);
    return;
  }
  
  const afterGetElement = performance.now();
  console.log(`[scrollToSection] Element found in ${(afterGetElement - clickTime).toFixed(2)}ms`);
  
  // Cache values to avoid repeated calls
  const width = window.innerWidth;
  const offset = width >= 2000 ? desktopOffset : mobileOffset;
  
  // Calculate target position immediately (synchronous is fine - we want immediate response)
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;
  const startPosition = window.pageYOffset;
  const distance = offsetPosition - startPosition;
  
  const afterCalculation = performance.now();
  console.log(`[scrollToSection] Position calculated in ${(afterCalculation - afterGetElement).toFixed(2)}ms`);
  console.log(`[scrollToSection] Distance: ${distance.toFixed(0)}px, Start: ${startPosition.toFixed(0)}px, Target: ${offsetPosition.toFixed(0)}px`);
  
  // If distance is small, use native smooth scroll
  if (Math.abs(distance) < 100) {
    console.log(`[scrollToSection] Using native smooth scroll (distance < 100px)`);
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
    return;
  }
  
  // Simple linear scroll - constant speed throughout for immediate, predictable movement
  const duration = 1000; // 1 second as requested
  
  // Make an immediate jump (5% of distance) so movement is visible instantly
  const immediateJump = distance * 0.05;
  const immediatePosition = startPosition + immediateJump;
  window.scrollTo(0, immediatePosition);
  
  const jumpTime = performance.now();
  console.log(`[scrollToSection] Immediate jump to ${immediatePosition.toFixed(0)}px (${immediateJump.toFixed(0)}px, ${(Math.abs(immediateJump / distance) * 100).toFixed(1)}% of distance) at ${jumpTime.toFixed(2)}ms`);
  
  const startTime = performance.now(); // Start timing after immediate jump
  const remainingDistance = distance - immediateJump;
  
  const beforeRAF = performance.now();
  console.log(`[scrollToSection] Starting animation at ${startTime.toFixed(2)}ms (${(beforeRAF - jumpTime).toFixed(2)}ms after jump)`);
  
  let frameCount = 0;
  const animateScroll = () => {
    frameCount++;
    const currentTime = performance.now();
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1); // Simple linear: 0 to 1
    
    // Log first few frames to see timing
    if (frameCount <= 3) {
      console.log(`[scrollToSection] Frame ${frameCount}: elapsed=${timeElapsed.toFixed(2)}ms, progress=${(progress * 100).toFixed(1)}%`);
    }
    
    // Calculate current position (linear interpolation for remaining distance)
    const currentPosition = immediatePosition + (remainingDistance * progress);
    
    // Scroll to position immediately
    window.scrollTo(0, currentPosition);
    
    // Continue animation if not complete
    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    } else {
      console.log(`[scrollToSection] Animation complete after ${frameCount} frames, ${timeElapsed.toFixed(2)}ms`);
    }
  };
  
  // Start animation immediately - first frame will scroll right away
  const rafTime = performance.now();
  console.log(`[scrollToSection] Calling requestAnimationFrame at ${rafTime.toFixed(2)}ms (${(rafTime - beforeRAF).toFixed(2)}ms delay)`);
  requestAnimationFrame(animateScroll);
};

