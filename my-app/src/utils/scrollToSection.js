// smooth scrolling utility with responsive offsets and blur effect.
export const scrollToSection = (sectionId, desktopOffset = 0, mobileOffset = 0) => {
	// get the element by the section id.
    const element = document.getElementById(sectionId);
    if (!element) {
      return;
    }
    
	// get width of window and offset.
    const width = window.innerWidth;
    const offset = width >= 2000 ? desktopOffset : mobileOffset;
    
	// get the position of the element and the offset.
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    const startPosition = window.pageYOffset; // get the start position.
    const distance = Math.abs(offsetPosition - startPosition); // get the distance.
    
    // if the distance is less than 50, scroll to the offset position.
    if (distance < 50) {
		window.scrollTo({
			top: offsetPosition,
			behavior: 'smooth'
		});
		return;
    }
    
	// get the blur overlay element.
    let blurOverlay = document.getElementById('scroll-blur-overlay');
    
    // if the blur overlay element is not found, create it.
    if (!blurOverlay) {
      blurOverlay = document.createElement('div');
      blurOverlay.id = 'scroll-blur-overlay';
      blurOverlay.className = 'scroll-blur-overlay';
      document.body.appendChild(blurOverlay);
    }
    
    blurOverlay.classList.add('active');
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
    
	// get the estimated duration and the blur removal time.
    const estimatedDuration = Math.min(Math.max(distance / 2, 500), 1200);
    const blurRemovalTime = estimatedDuration - 150;
    
    setTimeout(() => {
      blurOverlay.classList.remove('active');
    }, Math.max(blurRemovalTime, 200));
};

