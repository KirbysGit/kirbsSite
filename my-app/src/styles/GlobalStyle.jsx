import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'Cal Sans';
        src: url('/fonts/CalSans-Regular.ttf') format('truetype');
    }

    @font-face {
        font-family: 'Red Hat Display';
        src: url('/fonts/RedHatDisplay-Black.ttf') format('truetype');
    }

    * {
        box-sizing: border-box;
    } 

    body, html {
        margin: 0;
        padding: 0;
        background-color: #000;
        font-family: 'Red Hat Display', sans-serif;
        color: white;
    }
`

export default GlobalStyle;