// imports.
import React, { useState, useEffect } from 'react';
import {BrowserRouter, Routes, Route } from 'react-router-dom';



// local imports.
import Hero from './components/1hero/Hero';
//import Story from './components/1story/Story';
import GlobalStyle from './styles/GlobalStyle';
//import Projects from './components/Projects/Projects';
//import AExperience from './components/Experience/ActualExperience';
import CheatSheet from './components/CheatSheet/CheatSheet.jsx';
//import Skills from './components/Skills/Skills.jsx';
//import Background from './components/Background/Background.jsx';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';

// App Component.
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Mark document state so CSS can pause animations
    document.documentElement.dataset.loading = isLoading ? "true" : "false";
  }, [isLoading]);

  useEffect(() => {
    // Simple loading simulation - no heavy image preloading
    const loadingSteps = [
      { progress: 30, delay: 200 },
      { progress: 60, delay: 300 },
      { progress: 90, delay: 200 },
      { progress: 100, delay: 100 }
    ];

    let currentStep = 0;
    const updateProgress = () => {
      if (currentStep < loadingSteps.length) {
        const step = loadingSteps[currentStep];
        setTimeout(() => {
          setLoadingProgress(step.progress);
          currentStep++;
          updateProgress();
        }, step.delay);
      } else {
        // Start fade out
        setTimeout(() => {
          setIsFading(true);
          
          // Hide loading screen after fade completes
          setTimeout(() => {
            setIsLoading(false);
          }, 1200);
        }, 200);
      }
    };

    updateProgress();
  }, []);

  return (
    <>
      <GlobalStyle />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route 
            path="/"
            element={
              <>
                {/* Always mounted and visible - loading screen overlays on top */}
                <Hero />
                {/* <Story /> */}
                {/* <AExperience /> */}
                {/* <Projects /> */}
                {/* <Skills /> */}
                {/* <Background /> */}
              </>
            }
          />
          <Route path="/ui-cheatsheet" element={<CheatSheet />} />
        </Routes>
      </BrowserRouter>
      
      {/* Loading screen overlays on top */}
      {isLoading && <LoadingScreen progress={loadingProgress} isFading={isFading} />}
    </>
  );
}

// Export.
export default App; 