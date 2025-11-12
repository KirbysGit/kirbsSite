import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    } 

    /* Smooth scrolling optimizations with scroll snap */
    html {
        /* Use 'auto' instead of 'scroll' - only show scrollbar when content overflows */
        overflow-y: auto;
        scroll-behavior: smooth;
        overscroll-behavior: contain;
        font-family: "Red Hat Display", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        font-synthesis: none;
        -webkit-font-smoothing: antialiased;
        text-rendering: optimizeLegibility;
        
        /* Scroll snap for smooth section locking */
        scroll-snap-type: y proximity;
        -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
    }

    body {
        margin: 0;
        overflow-x: hidden;
        /* Prevent body from creating its own scroll context - let html handle all scrolling */
        overflow-y: visible;
        scroll-behavior: smooth;
        padding: 0;
        background-color: #000;
        color: white;
        overscroll-behavior-y: contain;
        /* Ensure body doesn't create unnecessary height */
    }
    
    /* Prevent layout shifts during initial load - reserve space for components */
    /* Keep scrollbar hidden during loading AND Hero animations */
    :root[data-loading="true"],
    :root[data-hero-settled="false"] {
        /* Prevent scrollbar recalculation during loading and Hero animations */
        overflow-y: hidden;
    }
    
    /* Only show scrollbar after loading AND Hero animations complete */
    :root[data-loading="false"][data-hero-settled="true"] {
        overflow-y: auto;
    }
    
    /* Scroll blur overlay - motion blur effect on scrolling content */
    /* Only blurs the content area, keeps navbar and fixed elements clear */
    .scroll-blur-overlay {
        position: fixed;
        inset: 0;
        z-index: 9998; /* Below navbar (z-index 100) but above content */
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.1s ease-out;
        /* Exclude navbar areas from blur */
        clip-path: polygon(
            0% 0%,
            100% 0%,
            100% 100%,
            0% 100%
        );
        /* Motion blur effect using backdrop-filter - very subtle */
        backdrop-filter: blur(1px);
        -webkit-backdrop-filter: blur(1px);
        /* Subtle darkening to enhance motion blur effect */
        background: rgba(0, 0, 0, 0.05);
        /* GPU acceleration */
        transform: translateZ(0);
        will-change: opacity;
    }
    
    .scroll-blur-overlay.active {
        opacity: 1;
    }
    
    /* Ensure navbar stays above blur overlay and remains clear */
    nav,
    [class*="Navbar"],
    [class*="navbar"] {
        position: relative;
        z-index: 9999; /* Above blur overlay */
        filter: none !important; /* Never blur navbar */
    }
    
    /* Prevent image selection/highlighting */
    img {
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        pointer-events: auto; /* Allow pointer events but prevent selection */
        -webkit-user-drag: none;
        -khtml-user-drag: none;
        -moz-user-drag: none;
        -o-user-drag: none;
        user-drag: none;
    }
    
    /* Prevent selection on background images and decorative elements */
    [style*="background-image"],
    [class*="cloud"],
    [class*="Cloud"] {
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
    }
    
    /* Section snap points - soft lock to section boundaries */
    section[id],
    [data-section-snap] {
        scroll-snap-align: start;
        scroll-snap-stop: always;
        scroll-margin-top: 80px; /* Account for fixed navbar height */
    }
    
    /* Custom snap points - center on specific elements */
    [data-snap-center] {
        scroll-snap-align: center;
        scroll-snap-stop: always;
        /* Center the element vertically in viewport */
        scroll-margin-top: calc(50vh - 50%);
    }
    
    /* Custom snap points - start alignment with offset */
    [data-snap-start] {
        scroll-snap-align: start;
        scroll-snap-stop: always;
    }
    
    /* Custom snap points - end alignment */
    [data-snap-end] {
        scroll-snap-align: end;
        scroll-snap-stop: always;
    }
    
    /* Custom snap points with specific margin offset */
    [data-snap-margin] {
        scroll-snap-align: start;
        scroll-snap-stop: always;
    }
    
    /* Example: Center section titles in viewport when snapping */
    [data-snap-title] {
        scroll-snap-align: center;
        scroll-snap-stop: always;
        /* Center element in viewport - adjusts for element height */
        scroll-margin-top: max(calc(50vh - 100px), 20vh);
        scroll-margin-bottom: max(calc(50vh - 100px), 20vh);
    }
    
    /* Optional: Softer snap on mobile for better UX */
    @media (max-width: 900px) {
        html {
            scroll-snap-type: y proximity;
        }
        
        section[id],
        [data-section-snap] {
            scroll-snap-stop: normal; /* Allow scrolling past on mobile */
        }
    }
    
    /* Disable scroll snap for users who prefer reduced motion */
    @media (prefers-reduced-motion: reduce) {
        html {
            scroll-snap-type: none;
            scroll-behavior: auto;
        }
        
        section[id],
        [data-section-snap] {
            scroll-snap-align: none;
        }
    }
    
    /* Prevent scroll-induced re-renders - only on animated elements */
    .twinkles,
    .nameGradient,
    .aurora,
    .meteor,
    .satellite,
    .spaceStation {
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
    }
    
    /* Optimize scroll performance */
    .story-section {
        contain: layout style paint;
        will-change: auto;
        transform: translateZ(0);
    }

    /* Pause animations during loading to prevent jitter */
    /* Only pause specific animations, not LoadingScreen animations */
    :root[data-loading="true"] .twinkles,
    :root[data-loading="true"] .nameGradient {
        animation-play-state: paused !important;
    }
    
    /* Explicitly allow LoadingScreen animations to play */
    [data-loading-screen],
    [data-loading-screen] * {
        animation-play-state: running !important;
    }
    
    /* Pause gradient text until text finishes sliding in */
    [data-anim-ready="false"] .nameGradient {
        animation-play-state: paused !important;
    }
`

export default GlobalStyle;