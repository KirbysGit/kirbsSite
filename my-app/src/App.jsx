// app.jsx

// bread and butter of the app, router and routes.
// where i handle all the main components and how they're connected.

// imports.
import React, { useState, useEffect } from 'react';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

// local imports.
import Hero from './components/1hero/Hero';
import WhoIAm from './components/2whoiam/WhoIAm';
import AExperience from './components/3experience/Experience';
import Projects from './components/4projects/Projects';
import Skills from './components/5skills/Skills.jsx';
import About from './components/6about/About.jsx';
import LoadingScreen from './components/7loading/LoadingScreen';

import GlobalStyle from './styles/GlobalStyle';


// Progress UI
const Progress = styled.div`
  position: fixed; 
  inset: 0 0 auto 0; 
  height: 3px; 
  z-index: 1000; 
  pointer-events: none;
  
  &::after {
    content: ""; 
    display: block; 
    height: 100%;
    transform-origin: left; 
    transform: scaleX(var(--p, 0));
    transition: transform 60ms linear;
    background: linear-gradient(90deg, #9cf, #baf, #c8f);
  }
  
  @supports (animation-timeline: scroll(root)) {
    &::after {
      transition: none;
      animation: grow linear both;
      animation-timeline: scroll(root);
      animation-duration: 1s;
    }
    @keyframes grow { 
      from { transform: scaleX(0) } 
      to { transform: scaleX(1) } 
    }
  }
`;

function usePageProgress() {
  useEffect(() => {
    if (CSS.supports?.('animation-timeline: scroll(root)')) return;
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      document.documentElement.style.setProperty('--p', String(p));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
}

// app component.
function App() {
  usePageProgress();

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
        // once steps are complete, warm fonts before fading out
        const finish = async () => {
          try {
            // Kick off specific faces you need (family + weight)
            const loads = [
              document.fonts?.load('400 16px "Red Hat Display"'),
              document.fonts?.load('700 16px "Red Hat Display"'),
            ];
            // cap the wait so you never hang if offline
            await Promise.race([Promise.all(loads), new Promise(r => setTimeout(r, 800))]);
          } finally {
            setIsFading(true);
            setTimeout(() => {
              setIsLoading(false);
            }, 1200);
          }
        };
        setTimeout(finish, 200);
      }
    };

    updateProgress();
  }, []);

  return (
    <>
      <GlobalStyle />
      <Progress />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route 
            path="/"
            element={
              <>
                {/* Always mounted and visible - loading screen overlays on top */}
                <Hero />
                <WhoIAm />
                <AExperience />
                <Projects />
                <Skills />
                <About />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
      
      {/* Loading screen overlays on top */}
      {isLoading && <LoadingScreen progress={loadingProgress} isFading={isFading} />}
    </>
  );
}

// export.
export default App; 