// app.jsx

// bread and butter of the app, router and routes.
// where i handle all the main components and how they're connected.

// imports.
import React, { useState, useEffect } from 'react';
import {BrowserRouter, Routes, Route } from 'react-router-dom';

// local imports.
import Hero from './components/1hero/Hero';
import Story from './components/2story/Story';
import GlobalStyle from './styles/GlobalStyle';
//import Projects from './components/Projects/Projects';
//import AExperience from './components/Experience/ActualExperience';
import CheatSheet from './components/CheatSheet/CheatSheet.jsx';
//import Skills from './components/Skills/Skills.jsx';
//import Background from './components/Background/Background.jsx';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';

// app component.
function App() {

  // states for loading screen.
  const [isFading, setIsFading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // mark document state so css can pause animations.
    document.documentElement.dataset.loading = isLoading ? "true" : "false";
  }, [isLoading]);

  // this is just used as a base loading animation, not actual loading going on.
  useEffect(() => {
    // simple loading simulation - no heavy image preloading.
    const loadingSteps = [
      { progress: 30, delay: 200 },
      { progress: 60, delay: 300 },
      { progress: 90, delay: 200 },
      { progress: 100, delay: 100 }
    ];

    // initialize step.
    let currentStep = 0;

    // update the progress, update the step, update the progress, and wait for the delay.
    const updateProgress = () => {
      if (currentStep < loadingSteps.length) {
        const step = loadingSteps[currentStep];
        setTimeout(() => {
          setLoadingProgress(step.progress);
          currentStep++;
          updateProgress();
        }, step.delay);
      } else {
        // once steps are complete, fade out of the loading screen.
        setTimeout(() => {
          setIsFading(true);
          
          // hide the loading screen after fade completes.
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
                <Story />
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

// export.
export default App; 