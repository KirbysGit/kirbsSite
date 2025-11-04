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
    :root[data-loading="true"] {
        /* Prevent scrollbar recalculation during loading */
        overflow-y: hidden;
    }
    
    :root[data-loading="false"] {
        overflow-y: auto;
    }
    
    /* Section snap points - soft lock to section boundaries */
    section[id],
    [data-section-snap] {
        scroll-snap-align: start;
        scroll-snap-stop: always;
        scroll-margin-top: 0; /* Adjust if you have a fixed header */
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
    :root[data-loading="true"] .twinkles,
    :root[data-loading="true"] .nameGradient,
    :root[data-loading="true"] * {
        animation-play-state: paused !important;
    }
    
    /* Pause gradient text until text finishes sliding in */
    [data-anim-ready="false"] .nameGradient {
        animation-play-state: paused !important;
    }
`

export default GlobalStyle;