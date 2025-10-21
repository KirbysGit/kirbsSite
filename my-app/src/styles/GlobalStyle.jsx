import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'Cal Sans';
        src: url('/fonts/CalSans-Regular.ttf') format('truetype');
    }

    /* Red Hat Display Regular */
    @font-face {
        font-family: 'Red Hat Display';
        src: url('/fonts/RedHatDisplay-Regular.ttf') format('truetype');
        font-weight: 400;
        font-style: normal;
    }

    @font-face {
        font-family: 'Red Hat Display';
        src: url('/fonts/RedHatDisplay-Italic.ttf') format('truetype');
        font-weight: 400;
        font-style: italic;
    }

    /* Red Hat Display Light */
    @font-face {
        font-family: 'Red Hat Display';
        src: url('/fonts/RedHatDisplay-Light.ttf') format('truetype');
        font-weight: 300;
        font-style: normal;
    }

    @font-face {
        font-family: 'Red Hat Display';
        src: url('/fonts/RedHatDisplay-LightItalic.ttf') format('truetype');
        font-weight: 300;
        font-style: italic;
    }

    /* Red Hat Display Medium */
    @font-face {
        font-family: 'Red Hat Display';
        src: url('/fonts/RedHatDisplay-Medium.ttf') format('truetype');
        font-weight: 500;
        font-style: normal;
    }

    @font-face {
        font-family: 'Red Hat Display';
        src: url('/fonts/RedHatDisplay-MediumItalic.ttf') format('truetype');
        font-weight: 500;
        font-style: italic;
    }

    /* Red Hat Display SemiBold */
    @font-face {
        font-family: 'Red Hat Display';
        src: url('/fonts/RedHatDisplay-SemiBold.ttf') format('truetype');
        font-weight: 600;
        font-style: normal;
    }

    @font-face {
        font-family: 'Red Hat Display';
        src: url('/fonts/RedHatDisplay-SemiBoldItalic.ttf') format('truetype');
        font-weight: 600;
        font-style: italic;
    }

    /* Red Hat Display Bold */
    @font-face {
        font-family: 'Red Hat Display';
        src: url('/fonts/RedHatDisplay-Bold.ttf') format('truetype');
        font-weight: 700;
        font-style: normal;
    }

    @font-face {
        font-family: 'Red Hat Display';
        src: url('/fonts/RedHatDisplay-BoldItalic.ttf') format('truetype');
        font-weight: 700;
        font-style: italic;
    }

    /* Red Hat Display ExtraBold */
    @font-face {
        font-family: 'Red Hat Display';
        src: url('/fonts/RedHatDisplay-ExtraBold.ttf') format('truetype');
        font-weight: 800;
        font-style: normal;
    }

    @font-face {
        font-family: 'Red Hat Display';
        src: url('/fonts/RedHatDisplay-ExtraBoldItalic.ttf') format('truetype');
        font-weight: 800;
        font-style: italic;
    }

    /* Red Hat Display Black */
    @font-face {
        font-family: 'Red Hat Display';
        src: url('/fonts/RedHatDisplay-Black.ttf') format('truetype');
        font-weight: 900;
        font-style: normal;
    }

    @font-face {
        font-family: 'Red Hat Display';
        src: url('/fonts/RedHatDisplay-BlackItalic.ttf') format('truetype');
        font-weight: 900;
        font-style: italic;
    }

    * {
        box-sizing: border-box;
    } 

    html {
        overflow-y: scroll;      /* Always reserve scrollbar width to prevent layout shift */
    }

    body {
        margin: 0;
        overflow-x: hidden;      /* Prevent horizontal scrolling */
        scroll-behavior: smooth;
        padding: 0;
        background-color: #000;
        font-family: 'Red Hat Display', sans-serif;
        color: white;
    }

    /* Pause animations during loading to prevent jitter */
    :root[data-loading="true"] .twinkles,
    :root[data-loading="true"] .nameGradient {
        animation-play-state: paused !important;
    }
`

export default GlobalStyle;