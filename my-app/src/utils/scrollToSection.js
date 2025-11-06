/**
 * Shared utility for smooth scrolling to sections with responsive offsets
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
  
  // Use requestAnimationFrame for smoother scrolling
  requestAnimationFrame(() => {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  });
};

