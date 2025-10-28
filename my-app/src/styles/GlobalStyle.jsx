import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    } 

    /* Smooth scrolling optimizations */
    html {
        overflow-y: scroll;
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
        scroll-behavior: smooth;
        padding: 0;
        background-color: #000;
        color: white;
        overscroll-behavior-y: contain;
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