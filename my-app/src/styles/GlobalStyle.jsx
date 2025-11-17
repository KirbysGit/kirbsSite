// global styles.
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    } 

    html {
        overflow-y: auto;
        scroll-behavior: smooth;
        overscroll-behavior: contain;
        font-family: "Red Hat Display", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        font-synthesis: none;
        -webkit-font-smoothing: antialiased;
        text-rendering: optimizeLegibility;
        scroll-snap-type: y proximity;
        -webkit-overflow-scrolling: touch;
    }

    body {
        margin: 0;
        overflow-x: hidden;
        overflow-y: visible;
        scroll-behavior: smooth;
        padding: 0;
        background-color: #000;
        color: white;
        overscroll-behavior-y: contain;
    }
    
    :root[data-loading="true"],
    :root[data-hero-settled="false"] {
        overflow-y: hidden;
    }
    
    :root[data-loading="false"][data-hero-settled="true"] {
        overflow-y: auto;
    }
    
    .scroll-blur-overlay {
        position: fixed;
        inset: 0;
        z-index: 9998;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.1s ease-out;
        clip-path: polygon(
            0% 0%,
            100% 0%,
            100% 100%,
            0% 100%
        );
        backdrop-filter: blur(1px);
        -webkit-backdrop-filter: blur(1px);
        background: rgba(0, 0, 0, 0.05);
        transform: translateZ(0);
        will-change: opacity;
    }
    
    .scroll-blur-overlay.active {
        opacity: 1;
    }
    
    nav,
    [class*="Navbar"],
    [class*="navbar"] {
        position: relative;
        z-index: 9999;
        filter: none !important;
    }
    
    img {
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        pointer-events: auto;
        -webkit-user-drag: none;
        -khtml-user-drag: none;
        -moz-user-drag: none;
        -o-user-drag: none;
        user-drag: none;
    }
    
    [style*="background-image"],
    [class*="cloud"],
    [class*="Cloud"] {
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
    }
    
    section[id],
    [data-section-snap] {
        scroll-snap-align: start;
        scroll-snap-stop: always;
        scroll-margin-top: 80px;
    }
    
    [data-snap-center] {
        scroll-snap-align: center;
        scroll-snap-stop: always;
        scroll-margin-top: calc(50vh - 50%);
    }
    
    [data-snap-start] {
        scroll-snap-align: start;
        scroll-snap-stop: always;
    }
    
    [data-snap-end] {
        scroll-snap-align: end;
        scroll-snap-stop: always;
    }
    
    [data-snap-margin] {
        scroll-snap-align: start;
        scroll-snap-stop: always;
    }
    
    [data-snap-title] {
        scroll-snap-align: center;
        scroll-snap-stop: always;
        scroll-margin-top: max(calc(50vh - 100px), 20vh);
        scroll-margin-bottom: max(calc(50vh - 100px), 20vh);
    }
    
    @media (max-width: 900px) {
        html {
            scroll-snap-type: y proximity;
        }
        
        section[id],
        [data-section-snap] {
            scroll-snap-stop: normal;
        }
    }
    
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
    
    .twinkles,
    .nameGradient,
    .aurora,
    .meteor,
    .satellite,
    .spaceStation {
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
    }
    
    .story-section {
        contain: layout style paint;
        will-change: auto;
        transform: translateZ(0);
    }

    :root[data-loading="true"] .twinkles,
    :root[data-loading="true"] .nameGradient {
        animation-play-state: paused !important;
    }
    
    [data-loading-screen],
    [data-loading-screen] * {
        animation-play-state: running !important;
    }
    
    [data-anim-ready="false"] .nameGradient {
        animation-play-state: paused !important;
    }
`

export default GlobalStyle;