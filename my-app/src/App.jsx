// Imports.
import React from 'react';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
// Local Imports.
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import GlobalStyle from './styles/GlobalStyle';
import Education from './components/Education/Education';
import Experience from './components/Experience/Experience';
import CheatSheet from './components/CheatSheet/CheatSheet.jsx';

// App Component.
function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route 
            path="/"
            element={
              <>
                <Hero />
                <About />
                <Experience />
                <Education />
              </>
            }
          />
          <Route path="/ui-cheatsheet" element={<CheatSheet />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

// Export.
export default App; 