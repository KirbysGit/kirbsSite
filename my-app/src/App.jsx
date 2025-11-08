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
import Navbar from './components/0navbar/Navbar';

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
  const [componentsPreloaded, setComponentsPreloaded] = useState(false);
  
  // Use page progress hook (must be after isLoading is declared)
  usePageProgress(isLoading);
  
  // Ref to prevent duplicate loading in React StrictMode (development)
  const hasLoadedRef = React.useRef(false);
  
  // When the hero entrance is fully done (arrow animation completes ~9.5s)
  // Arrow starts at 8.5s (2.5s loading + 6.0s delay) and takes 1.0s to complete
  useEffect(() => {
    const t = setTimeout(() => setHeroSettled(true), 9500); // Wait for arrow animation to complete
    return () => clearTimeout(t);
  }, []);
  
  // Mount components as soon as they're preloaded (during loading screen)
  // This allows them to render in the background while Hero animations play
  useEffect(() => {
    if (componentsPreloaded) {
      // Mount above-fold components immediately after preload
      setShowAboveFold(true);
      // Mount below-fold components with a small delay to stagger initial render
      // This prevents layout thrashing while still ensuring all sections render
      const belowFoldTimer = setTimeout(() => {
        setShowBelowFold(true);
      }, 100); // Small delay to prevent layout thrashing
      return () => clearTimeout(belowFoldTimer);
    }
  }, [componentsPreloaded]);

  useEffect(() => {
    // mark document state so css can pause animations.
    document.documentElement.dataset.loading = isLoading ? "true" : "false";
  }, [isLoading]);

  // Lock scrolling during Hero animations (until ~9.5s when arrow completes)
  useEffect(() => {
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
    
    // Unlock scroll after Hero animations complete (~9.5s)
    // Arrow starts at 8.5s (2.5s loading + 6.0s delay) and takes 1.0s to complete
    const unlockTimer = setTimeout(() => {
      // Restore original overflow values
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      
      // Remove event listeners
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
      
      // Restore scroll position (should be 0, but just in case)
      window.scrollTo(0, scrollY);
    }, 9500);
    
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
      
      console.log(`✓ ${componentName} loaded in ${loadTime.toFixed(0)}ms`);
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
    const MIN_LOADING_TIME = 2500; // Minimum 2.5 seconds for loading screen with animations
    
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

        // Load ALL section-specific images (including lazy ones for About)
        const { getImagesBySection } = await import('./components/utils/imageMap');
        setLoadingProgress(65);
        
        const sectionImagesStart = performance.now();
        // Preload ALL images for each section (including lazy images)
        const sectionResults = await Promise.allSettled([
          verifySectionImages('WhoIAm', getImagesBySection('whoIAm', 'all')),
          verifySectionImages('Experience', getImagesBySection('experience', 'all')),
          verifySectionImages('Projects', getImagesBySection('projects', 'all')),
          verifySectionImages('Skills', getImagesBySection('skills', 'all')),
          verifySectionImages('About', getImagesBySection('about', 'all')),
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
        
        // ========== ORGANIZED PERFORMANCE REPORT ==========
        console.log('\n' + '='.repeat(60));
        console.log('🚀 PERFORMANCE ANALYSIS REPORT');
        console.log('='.repeat(60));
        
        // 1. TIMING BREAKDOWN
        console.log('\n⏱️  TIMING BREAKDOWN:');
        console.log('─'.repeat(60));
        const timingEntries = [
          { label: 'Critical Images', time: timings.criticalImages || 0, threshold: 500 },
          { label: 'Important Images', time: timings.importantImages || 0, threshold: 800 },
          { label: 'Components (JS)', time: timings.components || 0, threshold: 500 },
          { label: 'Section Images', time: timings.sectionImages || 0, threshold: 1000 },
          { label: 'Fonts', time: timings.fonts || 0, threshold: 200 },
        ];
        
        timingEntries.forEach(({ label, time, threshold }) => {
          const emoji = time > threshold ? '⚠️' : time > threshold * 0.7 ? '⚡' : '✓';
          const percentage = actualLoadTime > 0 ? ((time / actualLoadTime) * 100).toFixed(1) : '0.0';
          const labelPadded = label + ' '.repeat(Math.max(0, 20 - label.length));
          const timePadded = ' '.repeat(Math.max(0, 6 - time.toFixed(0).length)) + time.toFixed(0);
          console.log(`  ${emoji} ${labelPadded} ${timePadded}ms (${percentage}%)`);
        });
        
        console.log('─'.repeat(60));
        console.log(`  ⚡ Actual Load Time: ${actualLoadTime.toFixed(0)}ms`);
        console.log(`  ✓ Total Time: ${totalTime.toFixed(0)}ms`);
        if (timings.minimumWait > 0) {
          console.log(`  ⏸️  Artificial Wait: ${timings.minimumWait.toFixed(0)}ms`);
        }
        
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
        console.log(`  ${emoji} Rating: ${rating} (Industry avg: ~2500ms)`);
        
        // 2. IMAGE ANALYSIS
        console.log('\n🖼️  IMAGE ANALYSIS:');
        console.log('─'.repeat(60));
        
        // Critical images
        if (timings.criticalImageStats?.totalSize) {
          const stats = timings.criticalImageStats;
          const totalKB = (stats.totalSize / 1024).toFixed(1);
          const avgKB = stats.totalSize && criticalImages.length ? (stats.totalSize / criticalImages.length / 1024).toFixed(1) : '0';
          console.log(`  Critical Images: ${criticalImages.length} images, ${totalKB}KB total, ${avgKB}KB avg`);
          if (stats.largestImage?.size) {
            const largestKB = (stats.largestImage.size / 1024).toFixed(1);
            const largestName = stats.largestImage.url.split('/').pop() || 'unknown';
            console.log(`    ⚠️  Largest: ${largestName} (${largestKB}KB)`);
            if (stats.largestImage.size > 500 * 1024) {
              console.log(`       💡 Consider compressing this image (target: <500KB)`);
            }
          }
        }
        
        // Important images
        if (timings.importantImageStats?.totalSize) {
          const stats = timings.importantImageStats;
          const totalKB = (stats.totalSize / 1024).toFixed(1);
          const avgKB = stats.totalSize && importantImages.length ? (stats.totalSize / importantImages.length / 1024).toFixed(1) : '0';
          console.log(`  Important Images: ${importantImages.length} images, ${totalKB}KB total, ${avgKB}KB avg`);
        }
        
        // Section images
        if (timings.sectionImageStats) {
          let totalSectionSize = 0;
          let totalSectionCount = 0;
          timings.sectionImageStats.forEach(section => {
            if (section.totalSize !== undefined) {
              totalSectionSize += section.totalSize || 0;
              totalSectionCount += section.count || 0;
              const sectionKB = ((section.totalSize || 0) / 1024).toFixed(1);
              const sectionAvgKB = section.avgSize ? (section.avgSize / 1024).toFixed(1) : '0';
              const emoji = (section.totalSize || 0) > 1000 * 1024 ? '⚠️' : '✓';
              const sectionNamePadded = section.section + ' '.repeat(Math.max(0, 12 - section.section.length));
              console.log(`  ${emoji} ${sectionNamePadded} ${section.count || 0} images, ${sectionKB}KB total, ${sectionAvgKB}KB avg`);
              
              if (section.largestImage?.size) {
                const largestKB = (section.largestImage.size / 1024).toFixed(1);
                if (section.largestImage.size > 500 * 1024) {
                  const largestName = section.largestImage.url.split('/').pop() || 'unknown';
                  console.log(`       ⚠️  Largest: ${largestName} (${largestKB}KB) - consider compression`);
                }
              }
            }
          });
          const totalSectionKB = (totalSectionSize / 1024).toFixed(1);
          console.log(`  Total Section Images: ${totalSectionCount} images, ${totalSectionKB}KB total`);
        }
        
        // Total image size
        const totalImageSize = 
          (timings.criticalImageStats?.totalSize || 0) +
          (timings.importantImageStats?.totalSize || 0) +
          (timings.sectionImageStats?.reduce((sum, s) => sum + (s.totalSize || 0), 0) || 0);
        const totalImageKB = (totalImageSize / 1024).toFixed(1);
        const totalImageMB = (totalImageSize / (1024 * 1024)).toFixed(2);
        console.log(`\n  📦 Total Images: ${totalImageKB}KB (${totalImageMB}MB)`);
        if (totalImageSize > 5 * 1024 * 1024) {
          console.log(`  ⚠️  Total image size is large (>5MB). Consider:`);
          console.log(`     • Compressing images (WebP, AVIF, or optimized PNG/JPG)`);
          console.log(`     • Using responsive images (srcset)`);
          console.log(`     • Lazy loading non-critical images`);
        }
        
        // 3. COMPONENT BUNDLE ANALYSIS
        console.log('\n📦 COMPONENT BUNDLE ANALYSIS:');
        console.log('─'.repeat(60));
        if (timings.componentBundles && timings.componentBundles.length > 0) {
          let totalBundleSize = 0;
          timings.componentBundles.forEach(comp => {
            const sizeKB = (comp.bundleSize / 1024).toFixed(1);
            totalBundleSize += comp.bundleSize;
            const emoji = comp.loadTime > 300 ? '⚠️' : comp.bundleSize > 200 * 1024 ? '⚡' : '✓';
            const namePadded = comp.name + ' '.repeat(Math.max(0, 12 - comp.name.length));
            const loadTimePadded = ' '.repeat(Math.max(0, 4 - comp.loadTime.toFixed(0).length)) + comp.loadTime.toFixed(0);
            const sizePadded = ' '.repeat(Math.max(0, 6 - sizeKB.length)) + sizeKB;
            console.log(`  ${emoji} ${namePadded} ${loadTimePadded}ms load, ${sizePadded}KB bundle`);
            if (comp.bundleSize > 200 * 1024) {
              console.log(`       💡 Consider code splitting for ${comp.name}`);
            }
          });
          const totalBundleKB = (totalBundleSize / 1024).toFixed(1);
          console.log(`  Total Bundle Size: ${totalBundleKB}KB`);
        }
        

        // 5. BOTTLENECK IDENTIFICATION
        console.log('\n🔍 BOTTLENECK IDENTIFICATION:');
        console.log('─'.repeat(60));
        const bottlenecks = [];
        
        // Find slowest operations
        const slowest = timingEntries
          .filter(e => e.time > 0)
          .sort((a, b) => b.time - a.time)[0];
        if (slowest && slowest.time > slowest.threshold * 0.7) {
          bottlenecks.push({
            type: 'Timing',
            issue: `${slowest.label} is taking ${slowest.time.toFixed(0)}ms`,
            recommendation: slowest.label.includes('Image') 
              ? 'Consider compressing images or reducing image count'
              : slowest.label.includes('Component')
              ? 'Consider code splitting or lazy loading'
              : 'Review and optimize this step'
          });
        }
        
        // Check for large images
        if (totalImageSize > 5 * 1024 * 1024) {
          bottlenecks.push({
            type: 'Images',
            issue: `Total image size is ${totalImageMB}MB`,
            recommendation: 'Compress images (WebP/AVIF), use responsive images, lazy load non-critical'
          });
        }
        
        // Check for large bundles
        const largeBundles = timings.componentBundles?.filter(c => c.bundleSize > 200 * 1024) || [];
        if (largeBundles.length > 0) {
          bottlenecks.push({
            type: 'Bundles',
            issue: `${largeBundles.length} component(s) >200KB`,
            recommendation: 'Implement code splitting or lazy load heavy components'
          });
        }
        
        if (bottlenecks.length === 0) {
          console.log('  ✓ No major bottlenecks detected!');
        } else {
          bottlenecks.forEach((b, idx) => {
            console.log(`  ${idx + 1}. [${b.type}] ${b.issue}`);
            console.log(`     💡 ${b.recommendation}`);
          });
        }
        
        console.log('\n' + '='.repeat(60) + '\n');
        
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
                
                {/* Navbar - mounts after Hero animations complete */}
                <Navbar />
                
                {/* Staggered mounting for smooth performance */}
                {/* Components mount during loading screen and render in background */}
                {showAboveFold && (
                  <Suspense fallback={<ComponentFallback />}>
                    {/* Mount WhoIAm and Experience - render during loading/Hero animations */}
                    <ComponentWrapper $isVisible={showAboveFold} $heroSettled={heroSettled}>
                      <WhoIAm />
                      <AExperience />
                    </ComponentWrapper>
                  </Suspense>
                )}
                
                {showBelowFold && (
                  <Suspense fallback={<ComponentFallback />}>
                    {/* Mount Projects, Skills, About - render during loading/Hero animations */}
                    <ComponentWrapper $isVisible={showBelowFold} $heroSettled={heroSettled}>
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