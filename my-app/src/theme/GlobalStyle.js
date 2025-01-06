import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    font-family: 'Inter', sans-serif;
    transition: all 0.3s ease;
  }

  section {
    background: ${({ theme }) => theme.surface};
    transition: all 0.3s ease;
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.text};
    transition: color 0.3s ease;
  }

  p {
    color: ${({ theme }) => theme.textSecondary};
    transition: color 0.3s ease;
  }

  // Add any other global styles and transitions here
`;

export default GlobalStyle; 