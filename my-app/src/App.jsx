// app.jsx

// bread and butter of the app, router and routes.
// where i handle all the main components and how they're connected.

// imports.
import React, { useState, useEffect, Suspense, lazy } from 'react';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { useIdle } from './hooks/useIdle';

// Eager import - needed immediately (Hero is above the fold)
import Hero from './components/1hero/Hero';
import LoadingScreen from './components/7loading/LoadingScreen';

// Lazy imports - code splitting for below-the-fold components
const WhoIAm = lazy(() => import('./components/2whoiam/WhoIAm'));
const AExperience = lazy(() => import('./components/3experience/Experience'));
const Projects = lazy(() => import('./components/4projects/Projects'));
const Skills = lazy(() => import('./components/5skills/Skills.jsx'));
const About = lazy(() => import('./components/6about/About.jsx'));

import GlobalStyle from './styles/GlobalStyle';

// Image preloader utility
import { preloadImagesInChunks } from './components/utils/imagePreloader';
import { getCriticalImages, getImportantImages } from './components/utils/imageMap';


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
  
  // States for staggered component mounting
  const [showAboveFold, setShowAboveFold] = useState(false);
  const [showBelowFold, setShowBelowFold] = useState(false);
  const [heroSettled, setHeroSettled] = useState(false);
  
  // Use page progress hook (must be after isLoading is declared)
  usePageProgress(isLoading);
  
  // Ref to prevent duplicate loading in React StrictMode (development)
  const hasLoadedRef = React.useRef(false);
  
  // When the hero entrance is fully done (LOADING_SCREEN_DURATION + staggered text timing ~6s total)
  useEffect(() => {
    const t = setTimeout(() => setHeroSettled(true), 6400); // 2500ms loading + ~3900ms for last animation
    return () => clearTimeout(t);
  }, []);
  
  // After hero settles, mount above-the-fold during idle time
  useIdle(() => {
    if (heroSettled) setShowAboveFold(true);
  }, 300, [heroSettled]);
  
  // Below-the-fold a bit later, also idle
  useIdle(() => {
    if (heroSettled) setShowBelowFold(true);
  }, 1200, [heroSettled]);

  useEffect(() => {
    // mark document state so css can pause animations.
    document.documentElement.dataset.loading = isLoading ? "true" : "false";
  }, [isLoading]);

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
      
      console.log(`✓ ${componentName} loaded in ${loadTime.toFixed(0)}ms`);
      return { success: true, loadTime, component };
    } catch (error) {
      console.warn(`✗ ${componentName} preload error:`, error);
      return { success: false, loadTime: 0, component: null };
    }
  };
  
  // Performance monitoring utility
  const measureComponentRender = (componentName, renderFn) => {
    if (typeof window !== 'undefined' && window.performance) {
      const startMark = `${componentName}-render-start`;
      const endMark = `${componentName}-render-end`;
      const measureName = `${componentName}-render-time`;
      
      window.performance.mark(startMark);
      const result = renderFn();
      window.performance.mark(endMark);
      window.performance.measure(measureName, startMark, endMark);
      
      const measure = window.performance.getEntriesByName(measureName)[0];
      if (measure && measure.duration > 16) { // Log if render takes longer than 1 frame
        console.warn(`⚠ ${componentName} render took ${measure.duration.toFixed(2)}ms (target: <16ms)`);
      }
      
      return result;
    }
    return renderFn();
  };

  // Verify images for a specific section are loaded - ensure ALL images decode
  const verifySectionImages = async (sectionName, images) => {
    if (!images || images.length === 0) return true;
    
    try {
      // Preload with optimized settings: larger chunks, no delays for faster loading
      await preloadImagesInChunks(
        images, 
        5, // Load 5 images in parallel (increased from 3)
        () => {},
        'auto', // Auto priority for section images
        0 // No delay between chunks
      );
      
      console.log(`✓ ${sectionName} images verified (${images.length} images)`);
      return true;
    } catch (error) {
      console.warn(`✗ ${sectionName} images failed:`, error);
      return false;
    }
  };

  // Actual image and component preloading with progress tracking
  useEffect(() => {
    // Prevent duplicate execution in React StrictMode
    if (hasLoadedRef.current) return;
    hasLoadedRef.current = true;
    
    const startTime = performance.now();
    const MIN_LOADING_TIME = 2500; // Minimum 2.5 seconds for loading screen with animations
    
    // Preload critical images first, then important images, then components, then fonts
    const loadAssets = async () => {
      const timings = {};
      
      try {
        // Get critical images (Hero section - LCP)
        const criticalImages = getCriticalImages();
        const criticalStart = performance.now();
        
        // Start with critical images (chunk size 2 for faster initial load)
        await preloadImagesInChunks(
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

        // Load important images (25-45%) - Optimized: larger chunks, high priority, no delays
        // Start component loading in parallel to avoid network competition
        const importantStart = performance.now();
        const importantImages = getImportantImages();
        const importantImagesPromise = preloadImagesInChunks(
          importantImages,
          6, // Load 6 images in parallel (increased from 3 for faster loading)
          (loaded, total) => {
            // Update progress: 25-45% for important images
            const progress = 25 + Math.min(20, Math.floor((loaded / total) * 20));
            setLoadingProgress(progress);
          },
          'high', // High priority for important images
          0 // No delay between chunks for important images
        );
        
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
        
        // Log individual component load times and bundle sizes for performance analysis
        componentResults.forEach((result, idx) => {
          if (result.status === 'fulfilled' && result.value?.loadTime) {
            const componentName = componentNames[idx];
            const loadTime = result.value.loadTime;
            
            // Get bundle size info if available
            if (result.value.component && typeof window !== 'undefined' && window.performance) {
              const resourceTimings = window.performance.getEntriesByType('resource');
              const componentResources = resourceTimings.filter(r => 
                r.name.includes(componentName.toLowerCase()) || 
                r.initiatorType === 'script'
              );
              
              if (componentResources.length > 0) {
                const totalSize = componentResources.reduce((sum, r) => sum + (r.transferSize || 0), 0);
                const sizeKB = (totalSize / 1024).toFixed(1);
                
                if (loadTime > 300) {
                  console.warn(
                    `⚠ ${componentName}: ${loadTime.toFixed(0)}ms load, ~${sizeKB}KB bundle ` +
                    `(target: <300ms, consider code splitting or lazy loading sub-components)`
                  );
                } else {
                  console.log(`✓ ${componentName}: ${loadTime.toFixed(0)}ms load, ~${sizeKB}KB bundle`);
                }
              } else if (loadTime > 300) {
                console.warn(
                  `⚠ ${componentName} took ${loadTime.toFixed(0)}ms to load ` +
                  `(consider code splitting or lazy loading sub-components)`
                );
              }
            } else if (loadTime > 300) {
              console.warn(`⚠ ${componentName} took ${loadTime.toFixed(0)}ms to load (consider optimizing)`);
            }
          }
        });
        
        // Verify all components loaded successfully
        const allComponentsLoaded = componentResults.every(result => result.status === 'fulfilled');
        if (!allComponentsLoaded) {
          console.warn('Some components failed to preload, but continuing...');
        }
        setLoadingProgress(60);

        // Load ALL section-specific images (including lazy ones for About)
        const { getImagesBySection } = await import('./components/utils/imageMap');
        setLoadingProgress(65);
        
        const sectionImagesStart = performance.now();
        // Preload ALL images for each section (including lazy images)
        // About gets special treatment - preload ALL its images (including footer lazy images)
        await Promise.allSettled([
          verifySectionImages('WhoIAm', getImagesBySection('whoIAm', 'all')),
          verifySectionImages('Experience', getImagesBySection('experience', 'all')),
          verifySectionImages('Projects', getImagesBySection('projects', 'all')),
          verifySectionImages('Skills', getImagesBySection('skills', 'all')),
          // About: preload ALL images including lazy footer images for smooth animations
          verifySectionImages('About', getImagesBySection('about', 'all')),
        ]);
        timings.sectionImages = performance.now() - sectionImagesStart;
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
        
        // Ensure minimum loading time (2.5 seconds for smooth loading screen)
        const elapsedTime = performance.now() - startTime;
        const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime);
        timings.minimumWait = remainingTime;
        
        if (remainingTime > 0) {
          // Update progress during wait to keep animation smooth
          const waitSteps = 10;
          const stepDuration = remainingTime / waitSteps;
          for (let i = 0; i < waitSteps; i++) {
            await new Promise(resolve => setTimeout(resolve, stepDuration));
            setLoadingProgress(Math.min(98, 92 + (i + 1) * (8 / waitSteps)));
          }
        }
        
        setLoadingProgress(100);
        const totalTime = performance.now() - startTime;
        
        // Calculate actual load time (without minimum wait)
        const actualLoadTime = totalTime - (timings.minimumWait || 0);
        
        // Log detailed breakdown
        console.log(`\n📊 Load Time Breakdown:`);
        console.log(`  Critical Images: ${timings.criticalImages?.toFixed(0) || 0}ms`);
        console.log(`  Important Images: ${timings.importantImages?.toFixed(0) || 0}ms`);
        console.log(`  Components: ${timings.components?.toFixed(0) || 0}ms`);
        console.log(`  Section Images: ${timings.sectionImages?.toFixed(0) || 0}ms`);
        console.log(`  Fonts: ${timings.fonts?.toFixed(0) || 0}ms`);
        if (timings.minimumWait > 0) {
          console.log(`  Minimum Wait: ${timings.minimumWait?.toFixed(0) || 0}ms (artificial)`);
        }
        console.log(`  ─────────────────────`);
        console.log(`  ⚡ Actual Load: ${actualLoadTime.toFixed(0)}ms`);
        console.log(`  ✓ Total: ${totalTime.toFixed(0)}ms`);
        
        // Performance rating
        let rating = '';
        let emoji = '';
        if (actualLoadTime < 500) {
          rating = 'EXCELLENT';
          emoji = '🚀';
        } else if (actualLoadTime < 1000) {
          rating = 'GREAT';
          emoji = '✨';
        } else if (actualLoadTime < 2000) {
          rating = 'GOOD';
          emoji = '👍';
        } else {
          rating = 'NEEDS IMPROVEMENT';
          emoji = '⚠️';
        }
        console.log(`  ${emoji} Rating: ${rating} (Industry avg: ~2500ms)\n`);
        
        // Component performance breakdown
        if (typeof window !== 'undefined' && window.performance && window.performance.getEntriesByType) {
          try {
            const measures = window.performance.getEntriesByType('measure');
            // Filter for component performance measures (load-time, render-time, mount)
            const componentMeasures = measures.filter(m => 
              m.name.includes('-load-time') || 
              m.name.includes('-render-time') || 
              m.name.includes('-mount')
            );
            
            if (componentMeasures.length > 0) {
              console.log(`📊 Component Performance Breakdown:`);
              
              // Group measures by component name (taking first render for each component)
              const componentMap = new Map();
              componentMeasures.forEach(measure => {
                // Extract component name (handle different naming patterns like "Hero-render-1-render-time")
                let componentName = measure.name
                  .replace('-load-time', '')
                  .replace(/-render-\d+-render-time/, '')
                  .replace(/-render-\d+/, '')
                  .replace('-render-time', '')
                  .replace('-mount', '');
                
                // Only keep the longest duration for each component (usually the first render)
                if (!componentMap.has(componentName) || componentMap.get(componentName).duration < measure.duration) {
                  componentMap.set(componentName, measure);
                }
              });
              
              // Sort by duration and log
              Array.from(componentMap.values())
                .sort((a, b) => b.duration - a.duration)
                .forEach(measure => {
                  const componentName = measure.name
                    .replace('-load-time', '')
                    .replace(/-render-\d+-render-time/, '')
                    .replace(/-render-\d+/, '')
                    .replace('-render-time', '')
                    .replace('-mount', '');
                  const emoji = measure.duration > 500 ? '🐌' : measure.duration > 200 ? '⚠️' : measure.duration > 100 ? '⚡' : '✓';
                  const type = measure.name.includes('-load-time') ? '[LOAD]' : measure.name.includes('-mount') ? '[MOUNT]' : '[RENDER]';
                  console.log(`  ${emoji} ${componentName}${type}: ${measure.duration.toFixed(0)}ms`);
                });
              console.log('');
            }
          } catch (e) {
            // Performance API might not be fully supported
          }
        }
        
        // Fade out loading screen
        setIsFading(true);
        
        // Hide loading screen FIRST to prevent scrollbar recalculation affecting Hero
        // Component mounting is now handled by useIdle hooks above (mounts after hero settles)
        setTimeout(() => {
          setIsLoading(false); // Hide loading screen first
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
                <Hero />
                
                {/* Staggered mounting for smooth performance */}
                {/* Use content-visibility to prevent layout shifts during loading */}
                {showAboveFold && (
                  <Suspense fallback={<ComponentFallback />}>
                    {/* Mount WhoIAm and Experience shortly after Hero (above fold) */}
                    <ComponentWrapper $isVisible={showAboveFold}>
                      <WhoIAm />
                      <AExperience />
                    </ComponentWrapper>
                  </Suspense>
                )}
                
                {showBelowFold && (
                  <Suspense fallback={<ComponentFallback />}>
                    {/* Mount Projects, Skills, About after brief delay (below fold) */}
                    <ComponentWrapper $isVisible={showBelowFold}>
                      <Projects />
                      <Skills />
                      <About />
                    </ComponentWrapper>
                  </Suspense>
                )}
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
  
  /* Let the browser skip all work until scrolled near */
  content-visibility: auto;
  contain-intrinsic-size: 1000px 1px;
  
  /* Prevent scrollbar recalculation and layout shifts during loading */
  :root[data-loading="true"] & {
    /* Hide components during loading to prevent layout shifts */
    opacity: 0;
    pointer-events: none;
    /* Reserve space to prevent scrollbar recalculation */
    min-height: 0;
    visibility: hidden;
  }
  
  /* Smooth fade-in after loading */
  :root[data-loading="false"] & {
    opacity: 1;
    pointer-events: auto;
    visibility: visible;
    transition: opacity 0.3s ease-in, visibility 0.3s ease-in;
  }
`;

// export.
export default App; 