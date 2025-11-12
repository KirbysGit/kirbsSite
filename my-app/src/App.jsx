// app.jsx

// bread and butter of the app, router and routes.
// where i handle all the main components and how they're connected.

// imports.
import React, { useState, useEffect, Suspense, lazy } from 'react';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

// Eager import - needed immediately (Hero is above the fold)
import Hero from './components/1hero/Hero';
import LoadingScreen from './components/7loading/LoadingScreen';
import Navbar from './components/0navbar/Navbar';

// Lazy imports - code splitting for below-the-fold components
const WhoIAm = lazy(() => import('./components/2whoiam/WhoIAm'));
const AExperience = lazy(() => import('./components/3experience/Experience'));
const Projects = lazy(() => import('./components/4projects/Projects'));
const Skills = lazy(() => import('./components/5skills/Skills.jsx'));
const About = lazy(() => import('./components/6about/About.jsx'));

import GlobalStyle from './styles/GlobalStyle';

// Image preloader utility
import { preloadImagesInChunks } from './components/utils/imagePreloader.js';
import { getCriticalImages, getImportantImages } from './components/utils/imageMap.js';


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

function usePageProgress(isLoading) {
  useEffect(() => {
    // Guard scroll handler behind !isLoading to avoid running during initial load
    if (isLoading) return;
    
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
  }, [isLoading]);
}

// app component.
function App() {
  // states for loading screen.
  const [isFading, setIsFading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  // States for staggered component mounting - incremental rendering
  const [showWhoIAm, setShowWhoIAm] = useState(false);
  const [showExperience, setShowExperience] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [heroSettled, setHeroSettled] = useState(false);
  const [componentsPreloaded, setComponentsPreloaded] = useState(false);
  
  // Track when loading actually completes (for dynamic timing)
  const loadingCompleteTimeRef = React.useRef(null);
  
  // Use page progress hook (must be after isLoading is declared)
  usePageProgress(isLoading);
  
  // Ref to prevent duplicate loading in React StrictMode (development)
  const hasLoadedRef = React.useRef(false);
  
  // Track loading completion time in state so we can use it in effects
  const [loadingCompleteTime, setLoadingCompleteTime] = useState(null);
  
  // When the hero entrance is fully done - timing is relative to loading completion
  // Arrow animation: 6.0s delay after loading + 1.0s duration = 7.0s total
  useEffect(() => {
    if (!loadingCompleteTime) return; // Wait for loading to complete
    
    const heroAnimationDuration = 7000; // 6s delay + 1s arrow animation
    const heroSettleTime = loadingCompleteTime + heroAnimationDuration;
    const now = performance.now();
    const delay = Math.max(0, heroSettleTime - now);
    
        // console.log(`[App] Loading completed at ${loadingCompleteTime.toFixed(2)}ms`);
        // console.log(`[App] Hero will settle at ${heroSettleTime.toFixed(2)}ms (in ${delay.toFixed(2)}ms)`);
        
        const t = setTimeout(() => {
          setHeroSettled(true);
          // console.log(`[App] Hero settled at ${performance.now().toFixed(2)}ms`);
        }, delay);
    
    return () => clearTimeout(t);
  }, [loadingCompleteTime]);
  
  // Incremental rendering - mount components one at a time during loading
  // This spreads render work across frames, allowing loading animation to run smoothly
  useEffect(() => {
    if (!componentsPreloaded) return;
    
    // console.log(`[App] Starting incremental component rendering...`);
    
    // Render components incrementally, spaced out to allow animation frames between renders
    // Each component gets ~200-300ms spacing to allow loading animation to run smoothly
    const renderDelays = {
      whoIAm: 0,        // Start immediately
      experience: 300,  // 300ms after WhoIAm
      projects: 600,    // 600ms after WhoIAm
      skills: 900,      // 900ms after WhoIAm
      about: 1200,      // 1200ms after WhoIAm (most complex, render last)
    };
    
    // Use requestAnimationFrame to ensure we're not blocking the main thread
    const scheduleRender = (setter, delay, name) => {
      if (delay === 0) {
        // Immediate render for first component
        requestAnimationFrame(() => {
          setter(true);
          // console.log(`[App] Rendered ${name} at ${performance.now().toFixed(2)}ms`);
        });
      } else {
        // Delayed renders - use setTimeout with requestAnimationFrame for smooth spacing
        setTimeout(() => {
          requestAnimationFrame(() => {
            setter(true);
            // console.log(`[App] Rendered ${name} at ${performance.now().toFixed(2)}ms`);
          });
        }, delay);
      }
    };
    
    scheduleRender(setShowWhoIAm, renderDelays.whoIAm, 'WhoIAm');
    scheduleRender(setShowExperience, renderDelays.experience, 'Experience');
    scheduleRender(setShowProjects, renderDelays.projects, 'Projects');
    scheduleRender(setShowSkills, renderDelays.skills, 'Skills');
    scheduleRender(setShowAbout, renderDelays.about, 'About');
    
    // All components should be rendered within 1.2s, well before navbar appears (7s after loading)
  }, [componentsPreloaded]);

  useEffect(() => {
    // mark document state so css can pause animations.
    document.documentElement.dataset.loading = isLoading ? "true" : "false";
  }, [isLoading]);

  useEffect(() => {
    // Mark when Hero animations are complete so CSS can show scrollbar
    document.documentElement.dataset.heroSettled = heroSettled ? "true" : "false";
  }, [heroSettled]);

  // Lock scrolling during Hero animations - timing relative to loading completion
  useEffect(() => {
    if (!loadingCompleteTime) return; // Wait for loading to complete
    
    // Lock scroll immediately on mount
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    
    // Prevent scroll on body/html - primary scroll lock method
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    
    // Store current scroll position to prevent jump when unlocking
    const scrollY = window.scrollY;
    
    // Additional scroll prevention for touch devices and edge cases (backup to overflow:hidden)
    const preventScroll = (e) => {
      // Prevent all scroll attempts during lock period
      e.preventDefault();
    };
    
    // Add event listeners as backup (overflow:hidden is primary method)
    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });
    
    // Unlock scroll after Hero animations complete - timing relative to loading completion
    // Hero animations: 6.0s delay + 1.0s arrow animation = 7.0s total after loading
    const heroAnimationDuration = 7000; // 6s delay + 1s arrow animation
    const unlockTime = loadingCompleteTime + heroAnimationDuration;
    const now = performance.now();
    const delay = Math.max(0, unlockTime - now);
    
        // console.log(`[App] Scroll will unlock at ${unlockTime.toFixed(2)}ms (in ${delay.toFixed(2)}ms)`);
        
        const unlockTimer = setTimeout(() => {
          // Restore original overflow values
          document.body.style.overflow = originalBodyOverflow;
          document.documentElement.style.overflow = originalHtmlOverflow;
          
          // Remove event listeners
          window.removeEventListener('wheel', preventScroll);
          window.removeEventListener('touchmove', preventScroll);
          
          // Restore scroll position (should be 0, but just in case)
          window.scrollTo(0, scrollY);
          
          // console.log(`[App] Scroll unlocked at ${performance.now().toFixed(2)}ms`);
        }, delay);
    
    return () => {
      clearTimeout(unlockTimer);
      
      // Cleanup: remove event listeners
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
      
      // Restore original overflow values
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, []); // Run once on mount

  // Component preloading - prefetch lazy component chunks and verify they load
  const preloadComponent = async (importFn, componentName) => {
    try {
      const startTime = performance.now();
      const component = await importFn();
      const loadTime = performance.now() - startTime;
      
      // Track component load time for performance analysis
      if (typeof window !== 'undefined' && window.performance && window.performance.mark) {
        window.performance.mark(`${componentName}-loaded`);
        // Only measure if start mark exists
        try {
          window.performance.measure(`${componentName}-load-time`, `${componentName}-start`, `${componentName}-loaded`);
        } catch (e) {
          // Start mark might not exist yet, that's okay
        }
      }
      
      // console.log(`✓ ${componentName} loaded in ${loadTime.toFixed(0)}ms`);
      return { success: true, loadTime, component };
    } catch (error) {
      console.warn(`✗ ${componentName} preload error:`, error);
      return { success: false, loadTime: 0, component: null };
    }
  };
  
  // Removed old performance monitoring - now using organized performance report

  // Verify images for a specific section are loaded - ensure ALL images decode
  const verifySectionImages = async (sectionName, images) => {
    if (!images || images.length === 0) return { success: true, stats: null };
    
    try {
      const startTime = performance.now();
      // Preload with optimized settings: larger chunks, no delays for faster loading
      const results = await preloadImagesInChunks(
        images, 
        5, // Load 5 images in parallel
        () => {},
        'auto', // Auto priority for section images
        0 // No delay between chunks
      );
      
      const loadTime = performance.now() - startTime;
      const stats = results.stats || {};
      
      return {
        success: true,
        stats: {
          count: images.length,
          loadTime,
          totalSize: stats.totalSize || 0,
          avgSize: stats.totalSize ? (stats.totalSize / images.length) : 0,
          largestImage: stats.largestImage || null,
          slowestImage: stats.slowestImage || null
        }
      };
    } catch (error) {
      console.warn(`✗ ${sectionName} images failed:`, error);
      return { success: false, stats: null };
    }
  };

  // Actual image and component preloading with progress tracking
  useEffect(() => {
    // Prevent duplicate execution in React StrictMode
    if (hasLoadedRef.current) return;
    hasLoadedRef.current = true;
    
    const startTime = performance.now();
    const MIN_LOADING_TIME = 2000; // Minimum 2 seconds for smooth loading screen
    
    // Preload critical images first, then important images, then components, then fonts
    const loadAssets = async () => {
      const timings = {};
      
      try {
        // Get critical images (Hero section - LCP)
        const criticalImages = getCriticalImages();
        const criticalStart = performance.now();
        
        // Start with critical images (chunk size 2 for faster initial load)
        const criticalResults = await preloadImagesInChunks(
          criticalImages,
          2, // Load 2 images in parallel
          (loaded, total) => {
            // Update progress: 0-25% for critical images
            const progress = Math.min(25, Math.floor((loaded / total) * 25));
            setLoadingProgress(progress);
          },
          'high', // High priority for critical images
          0 // No delay for critical images
        );
        timings.criticalImages = performance.now() - criticalStart;
        timings.criticalImageStats = criticalResults.stats || {};

        // Load important images (25-45%) - Optimized: larger chunks, high priority, no delays
        // Start component loading in parallel to avoid network competition
        const importantStart = performance.now();
        const importantImages = getImportantImages();
        const importantImagesPromise = preloadImagesInChunks(
          importantImages,
          6, // Load 6 images in parallel
          (loaded, total) => {
            // Update progress: 25-45% for important images
            const progress = 25 + Math.min(20, Math.floor((loaded / total) * 20));
            setLoadingProgress(progress);
          },
          'high', // High priority for important images
          0 // No delay between chunks for important images
        ).then(results => {
          timings.importantImageStats = results.stats || {};
          return results;
        });
        
        // Start component loading in parallel with important images
        // JavaScript chunks and images don't compete for the same connection slots
        setLoadingProgress(50);
        const componentStart = performance.now();
        
        // Mark performance timing for each component
        const componentNames = ['WhoIAm', 'Experience', 'Projects', 'Skills', 'About'];
        if (typeof window !== 'undefined' && window.performance && window.performance.mark) {
          componentNames.forEach(name => {
            window.performance.mark(`${name}-start`);
          });
        }
        
        const componentPromise = Promise.allSettled([
          preloadComponent(() => import('./components/2whoiam/WhoIAm'), 'WhoIAm'),
          preloadComponent(() => import('./components/3experience/Experience'), 'Experience'),
          preloadComponent(() => import('./components/4projects/Projects'), 'Projects'),
          preloadComponent(() => import('./components/5skills/Skills.jsx'), 'Skills'),
          preloadComponent(() => import('./components/6about/About.jsx'), 'About'),
        ]);
        
        // Wait for both to complete (they're loading in parallel, not competing)
        const [_, componentResults] = await Promise.all([importantImagesPromise, componentPromise]);
        timings.importantImages = performance.now() - importantStart;
        timings.components = performance.now() - componentStart;
        
        // Track component bundle sizes
        timings.componentBundles = [];
        componentResults.forEach((result, idx) => {
          if (result.status === 'fulfilled' && result.value?.loadTime) {
            const componentName = componentNames[idx];
            const loadTime = result.value.loadTime;
            let bundleSize = 0;
            
            // Get bundle size info if available
            if (result.value.component && typeof window !== 'undefined' && window.performance) {
              const resourceTimings = window.performance.getEntriesByType('resource');
              const componentResources = resourceTimings.filter(r => 
                r.name.includes(componentName.toLowerCase()) || 
                r.initiatorType === 'script'
              );
              
              if (componentResources.length > 0) {
                bundleSize = componentResources.reduce((sum, r) => sum + (r.transferSize || 0), 0);
              }
            }
            
            timings.componentBundles.push({
              name: componentName,
              loadTime,
              bundleSize
            });
          }
        });
        
        // Verify all components loaded successfully
        const allComponentsLoaded = componentResults.every(result => result.status === 'fulfilled');
        if (!allComponentsLoaded) {
          console.warn('⚠ Some components failed to preload, but continuing...');
        }
        setLoadingProgress(60);
        
        // Mark components as preloaded and start mounting them immediately
        // This allows components to render during loading screen/Hero animations
        setComponentsPreloaded(true);

        // Load important section-specific images (lazy images will load on-demand via Intersection Observer)
        const { getImagesBySection } = await import('./components/utils/imageMap.js');
        setLoadingProgress(65);
        
        const sectionImagesStart = performance.now();
        // Preload only important images for each section (lazy images load on-demand)
        const sectionResults = await Promise.allSettled([
          verifySectionImages('WhoIAm', getImagesBySection('whoIAm', 'important')),
          verifySectionImages('Experience', getImagesBySection('experience', 'important')),
          verifySectionImages('Projects', getImagesBySection('projects', 'important')),
          verifySectionImages('Skills', getImagesBySection('skills', 'important')),
          verifySectionImages('About', getImagesBySection('about', 'important')),
        ]);
        timings.sectionImages = performance.now() - sectionImagesStart;
        timings.sectionImageStats = sectionResults.map((result, idx) => {
          const sectionNames = ['WhoIAm', 'Experience', 'Projects', 'Skills', 'About'];
          if (result.status === 'fulfilled' && result.value?.stats) {
            return {
              section: sectionNames[idx],
              ...result.value.stats
            };
          }
          return { 
            section: sectionNames[idx], 
            count: 0,
            loadTime: 0,
            totalSize: 0,
            avgSize: 0,
            largestImage: null,
            slowestImage: null
          };
        });
        setLoadingProgress(80);

        // Fonts are now preloaded via <link rel="preload"> in index.html
        // No late JS font loading to prevent reflow during animations
        setLoadingProgress(88);
        timings.fonts = 0;

        // Additional wait for About component images to fully decode (88-92%)
        setLoadingProgress(90);
        // Small delay to ensure all images are fully decoded and ready
        await new Promise(resolve => setTimeout(resolve, 100));
        setLoadingProgress(92);

        // Finalize (92-100%)
        setLoadingProgress(95);
        
        // Ensure minimum loading time (2 seconds for smooth loading screen)
        const elapsedTime = performance.now() - startTime;
        const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime);
        timings.minimumWait = remainingTime;
        
        if (remainingTime > 0) {
          // Use remaining time to pre-render components in background for smooth first scroll
          // This prevents lag when user scrolls down for the first time
          const preRenderStart = performance.now();
          
          // Force a layout calculation to ensure components are ready
          // This triggers React to complete initial renders
          requestAnimationFrame(() => {
            // Force layout calculation by reading layout properties
            const sections = ['who-i-am', 'experience', 'projects', 'skills', 'about'];
            sections.forEach(sectionId => {
              const element = document.getElementById(sectionId);
              if (element) {
                // Trigger layout calculation (forces browser to calculate positions)
                void element.offsetHeight;
              }
            });
          });
          
          // Update progress smoothly during wait
          const waitSteps = 20; // More steps for smoother animation
          const stepDuration = remainingTime / waitSteps;
          const preRenderTime = performance.now() - preRenderStart;
          
          // Distribute remaining time across progress updates
          for (let i = 0; i < waitSteps; i++) {
            await new Promise(resolve => setTimeout(resolve, stepDuration));
            // Smooth progress from 92% to 98%
            const progress = 92 + (i + 1) * (6 / waitSteps);
            setLoadingProgress(Math.min(98, progress));
          }
        }
        
        setLoadingProgress(100);
        const totalTime = performance.now() - startTime;
        
        // Calculate actual load time (without minimum wait)
        const actualLoadTime = totalTime - (timings.minimumWait || 0);
        
        // ========== ORGANIZED PERFORMANCE REPORT ==========
        // Performance monitoring disabled - uncomment to re-enable
        // console.log('\n' + '='.repeat(60));
        // console.log('🚀 PERFORMANCE ANALYSIS REPORT');
        // console.log('='.repeat(60));
        
        // ========== ORGANIZED PERFORMANCE REPORT ==========
        // Performance monitoring disabled - uncomment below to re-enable
        // const timingEntries = [
        //   { label: 'Critical Images', time: timings.criticalImages || 0, threshold: 500 },
        //   { label: 'Important Images', time: timings.importantImages || 0, threshold: 800 },
        //   { label: 'Components (JS)', time: timings.components || 0, threshold: 500 },
        //   { label: 'Section Images', time: timings.sectionImages || 0, threshold: 1000 },
        //   { label: 'Fonts', time: timings.fonts || 0, threshold: 200 },
        // ];
        // ... (all performance report console.log statements commented out)
        
        // Fade out loading screen
        setIsFading(true);
        
        // Store the actual loading completion time for dynamic timing
        const loadingCompleteTime = performance.now();
        loadingCompleteTimeRef.current = loadingCompleteTime;
        setLoadingCompleteTime(loadingCompleteTime); // Also set in state for effects
        // console.log(`[App] Loading completed at ${loadingCompleteTime.toFixed(2)}ms (total: ${(loadingCompleteTime - startTime).toFixed(2)}ms)`);
        
        // Hide loading screen FIRST to prevent scrollbar recalculation affecting Hero
        // Component mounting is now handled by useIdle hooks above (mounts after hero settles)
        setTimeout(() => {
          setIsLoading(false); // Hide loading screen first
          // console.log(`[App] Loading screen hidden at ${performance.now().toFixed(2)}ms`);
        }, 800);
      } catch (error) {
        console.error('Error during asset loading:', error);
        // Still finish loading even if there's an error
        setLoadingProgress(100);
        
        // Ensure minimum loading time even on error
        const elapsedTime = performance.now() - startTime;
        const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime);
        if (remainingTime > 0) {
          await new Promise(resolve => setTimeout(resolve, remainingTime));
        }
        
            setIsFading(true);
        
        // Mount components even on error (fallback - useIdle handles normal case)
            setTimeout(() => {
          setHeroSettled(true); // Allow mounting even on error
              setIsLoading(false);
        }, 800);
      }
    };

    loadAssets();
  }, []);

  // Minimal fallback component for Suspense
  const ComponentFallback = () => null;

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
                {/* Hero always mounts - needed immediately for LCP */}
                <Hero isLoading={isLoading} loadingCompleteTime={loadingCompleteTime} />
                
                {/* Navbar - mounts after Hero animations complete */}
                <Navbar loadingCompleteTime={loadingCompleteTime} />
                
                {/* Incremental rendering - components mount one at a time during loading */}
                {/* This spreads render work across frames, allowing loading animation to run smoothly */}
                <Suspense fallback={<ComponentFallback />}>
                  {showWhoIAm && (
                    <ComponentWrapper $isVisible={showWhoIAm} $heroSettled={heroSettled}>
                <WhoIAm />
                    </ComponentWrapper>
                  )}
                  
                  {showExperience && (
                    <ComponentWrapper $isVisible={showExperience} $heroSettled={heroSettled}>
                <AExperience />
                    </ComponentWrapper>
                  )}
                  
                  {showProjects && (
                    <ComponentWrapper $isVisible={showProjects} $heroSettled={heroSettled}>
                <Projects />
                    </ComponentWrapper>
                  )}
                  
                  {showSkills && (
                    <ComponentWrapper $isVisible={showSkills} $heroSettled={heroSettled}>
                <Skills />
                    </ComponentWrapper>
                  )}
                  
                  {showAbout && (
                    <ComponentWrapper $isVisible={showAbout} $heroSettled={heroSettled}>
                <About />
                    </ComponentWrapper>
                  )}
                </Suspense>
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

// Wrapper to prevent layout shifts during component mounting
const ComponentWrapper = styled.div`
  /* Prevent layout shifts - isolate Hero from layout changes below */
  position: relative;
  
  /* GPU acceleration */
  transform: translateZ(0);
  contain: layout style paint;
  
  /* Don't use content-visibility: auto here - it prevents sections from rendering
     until scrolled into view, which breaks Navbar navigation. React.lazy already
     handles code splitting, so we don't need this optimization. */
  
  /* Hide components during loading AND Hero animations */
  /* They render in the background and contribute to layout, but are visually hidden */
  :root[data-loading="true"] & {
    opacity: 0;
    pointer-events: none;
    /* Keep visibility: visible so layout is calculated for scrollbar */
    visibility: visible;
  }
  
  /* Hide during Hero animations even after loading completes */
  /* Keep visibility: visible for layout calculation */
  ${props => !props.$heroSettled ? `
    opacity: 0;
    pointer-events: none;
    visibility: visible;
  ` : ''}
  
  /* Show components after loading AND Hero animations complete */
  :root[data-loading="false"] & {
    opacity: ${props => props.$heroSettled ? '1' : '0'};
    pointer-events: ${props => props.$heroSettled ? 'auto' : 'none'};
    visibility: visible;
    transition: opacity 0.3s ease-in;
  }
`;

// export.
export default App; 