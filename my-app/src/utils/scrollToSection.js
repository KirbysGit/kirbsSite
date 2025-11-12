/**
 * Shared utility for smooth scrolling to sections with responsive offsets
 * Uses native smooth scroll with blur effect during animation for smoother appearance
 * @param {string} sectionId - The ID of the section to scroll to
 * @param {number} desktopOffset - Offset for screens >= 2000px
 * @param {number} mobileOffset - Offset for screens < 2000px
 */
export const scrollToSection = (sectionId, desktopOffset = 0, mobileOffset = 0) => {
  const element = document.getElementById(sectionId);
  if (!element) {
    console.warn(`[scrollToSection] Element with id "${sectionId}" not found`);
    return;
  }
  
  // Cache values to avoid repeated calls
  const width = window.innerWidth;
  const offset = width >= 2000 ? desktopOffset : mobileOffset;
  
  // Calculate target position immediately
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;
  const startPosition = window.pageYOffset;
  const distance = Math.abs(offsetPosition - startPosition);
  
  // If user is already at the section (very small distance), just scroll without blur
  if (distance < 50) {
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
    return;
  }
  
  // Create blur overlay that only affects scrolling content (not navbar)
  // This creates a motion blur effect on content being scrolled past
  let blurOverlay = document.getElementById('scroll-blur-overlay');
  
  if (!blurOverlay) {
    // Create blur overlay element if it doesn't exist
    blurOverlay = document.createElement('div');
    blurOverlay.id = 'scroll-blur-overlay';
    blurOverlay.className = 'scroll-blur-overlay';
    document.body.appendChild(blurOverlay);
  }
  
  // Show blur overlay immediately (instant on)
  blurOverlay.classList.add('active');
  
  // Use native smooth scroll
  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
  
  // Estimate scroll duration based on distance (native smooth scroll is typically ~500-1000ms)
  // Remove blur earlier (with padding) so it's gone before arrival
  const estimatedDuration = Math.min(Math.max(distance / 2, 500), 1200);
  const blurRemovalTime = estimatedDuration - 150; // Remove 150ms before arrival to avoid seeing blur at destination
  
  // Remove blur before scroll completes (padding on edges)
  setTimeout(() => {
    blurOverlay.classList.remove('active');
  }, Math.max(blurRemovalTime, 200)); // Ensure minimum 200ms blur for very short scrolls
};

