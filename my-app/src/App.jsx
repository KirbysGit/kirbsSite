// Imports.
import React from 'react';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Education from './components/Education/Education';
import Experience from './components/Experience/Experience';
import GlobalStyle from './styles/GlobalStyle';
// App Component.
function App() {
  return (
    <>
      <GlobalStyle />
      <Hero />
      <Experience />
      <Education />
      <About />
    </>
  );
}

// Export.
export default App; 