import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    } 

    /* Smooth scrolling optimizations */
    html {
        /* Use 'auto' instead of 'scroll' - only show scrollbar when content overflows */
        overflow-y: auto;
        scroll-behavior: smooth;
        overscroll-behavior: contain;
        font-family: "Red Hat Display", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        font-synthesis: none;
        -webkit-font-smoothing: antialiased;
        text-rendering: optimizeLegibility;
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
`

export default GlobalStyle;