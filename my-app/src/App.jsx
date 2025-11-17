// app.jsx

// bread and butter of the app, router and routes.
// where i handle all the main components and how they're connected.

// imports.
import styled from 'styled-components';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect, Suspense, lazy } from 'react';

// eager import - needed immediately (hero is above the fold).
import Hero from './components/1hero/Hero';
import LoadingScreen from './components/7loading/LoadingScreen';
import Navbar from './components/0navbar/Navbar';

// lazy imports - code splitting for below-the-fold components.
const WhoIAm = lazy(() => import('./components/2whoiam/WhoIAm'));
const AExperience = lazy(() => import('./components/3experience/Experience'));
const Projects = lazy(() => import('./components/4projects/Projects'));
const Skills = lazy(() => import('./components/5skills/Skills.jsx'));
const About = lazy(() => import('./components/6about/About.jsx'));

// global styles.
import GlobalStyle from './styles/GlobalStyle';

// image preloader utility.
import { preloadImagesInChunks } from './components/utils/imagePreloader.js';
import { getCriticalImages, getImportantImages } from './components/utils/imageMap.js';


// progress UI.
const Progress = styled.div`
  position: fixed; 
  inset: 0 0 auto 0; 
  height: 4px; 
  z-index: 1000; 
  pointer-events: none;
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(2px);
  
  &::before {
    content: ""; 
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      rgba(153, 204, 255, 0.3),
      rgba(187, 170, 255, 0.5),
      rgba(200, 255, 255, 0.3)
    );
    transform-origin: left; 
    transform: scaleX(var(--p, 0));
    transition: transform 60ms linear;
    filter: blur(3px);
    opacity: 0.6;
  }
  
  &::after {
    content: ""; 
    position: absolute;
    top: 0;
    left: 0;
    display: block; 
    height: 100%;
    width: 100%;
    transform-origin: left; 
    transform: scaleX(var(--p, 0));
    transition: transform 60ms linear;
    background: linear-gradient(
      90deg,
      #9cf 0%,
      #baf 50%,
      #c8f 100%,
      #9cf 100%
    );
    background-size: 200% 100%;
    animation: shimmer 3s linear infinite;
    box-shadow: 
      0 0 10px rgba(153, 204, 255, 0.6),
      0 0 20px rgba(187, 170, 255, 0.4),
      0 0 30px rgba(200, 255, 255, 0.2),
      0 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  @keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
  
  @supports (animation-timeline: scroll(root)) {
    &::before,
    &::after {
      transition: none;
      animation: grow linear both, shimmer 3s linear infinite;
      animation-timeline: scroll(root);
      animation-duration: 1s, 3s;
    }
    @keyframes grow { 
      from { transform: scaleX(0) } 
      to { transform: scaleX(1) } 
    }
  }
`;

// tracks progress of page as you scroll.
function usePageProgress(isLoading) {
  useEffect(() => {
    // guard scroll handler behind !isLoading to avoid running during initial load.
    if (isLoading) return;
    
	// if browser supports animation-timeline, return.
    if (CSS.supports?.('animation-timeline: scroll(root)')) return;
    const onScroll = () => {
		const max = document.documentElement.scrollHeight - window.innerHeight;
		const p = max > 0 ? window.scrollY / max : 0;
		document.documentElement.style.setProperty('--p', String(p));
    };
	// run on scroll.
    onScroll();
	// add event listeners.
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
	// cleanup.
    return () => {
		window.removeEventListener('scroll', onScroll);
		window.removeEventListener('resize', onScroll);
    };
  }, [isLoading]);
}

/* ================== main component ================== */

function App() {
	// states for loading screen.
	const [isFading, setIsFading] = useState(false);				// state for if loading screen is fading.
	const [isLoading, setIsLoading] = useState(true);				// state for if app is loading.
	const [loadingProgress, setLoadingProgress] = useState(0);	// state for loading progress.
	
	// states for component mounting.
	const [showAbout, setShowAbout] = useState(false);						// state for if about component is shown.
	const [showWhoIAm, setShowWhoIAm] = useState(false);						// state for if who i am component is shown.
	const [showSkills, setShowSkills] = useState(false);						// state for if skills component is shown.
	const [heroSettled, setHeroSettled] = useState(false);					// state for if hero is settled.
	const [showProjects, setShowProjects] = useState(false);					// state for if projects component is shown.
	const [showExperience, setShowExperience] = useState(false);				// state for if experience component is shown.
	const [componentsPreloaded, setComponentsPreloaded] = useState(false);	// state for if components are preloaded.
	
	// track when loading actually completes (for dynamic timing).
	const loadingCompleteTimeRef = React.useRef(null);
	
	// use page progress hook (must be after isLoading is declared).
	usePageProgress(isLoading);
	
	// ref to prevent duplicate loading in React StrictMode (development).
	const hasLoadedRef = React.useRef(false);
	
	// track loading completion time in state so we can use it in effects.
	const [loadingCompleteTime, setLoadingCompleteTime] = useState(null);
	
	// when the hero entrance is fully done - timing is relative to loading completion.
	// arrow animation: 6.0s delay after loading + 1.0s duration = 7.0s total.
	useEffect(() => {
		// if loading is not complete, return.
		if (!loadingCompleteTime) return;
		
		const heroAnimationDuration = 7000; 									// 6s delay + 1s arrow animation.
		const heroSettleTime = loadingCompleteTime + heroAnimationDuration;		// loading completion time + hero animation duration.
		const now = performance.now();											// now.
		const delay = Math.max(0, heroSettleTime - now);						// maximum of 0 and hero settle time - now.
		
		// set hero settled after the delay.
		const t = setTimeout(() => {
			setHeroSettled(true);
		}, delay);
		
		return () => clearTimeout(t);
	}, [loadingCompleteTime]);
	
	// incremental rendering - mount components one at a time during loading.
	useEffect(() => {
		if (!componentsPreloaded) return;
		
		// render components incrementally, spaced out to allow animation frames between renders.
		// each component gets ~200-300ms spacing to allow loading animation to run smoothly.
		const renderDelays = {
		whoIAm: 0,        // start immediately.
		experience: 300,  // 300ms after who i am.
		projects: 600,    // 600ms after experience.
		skills: 900,      // 900ms after projects.
		about: 1200,      // 1200ms after skills (most complex, render last).
		};
		
		// schedule render for each component.
		const scheduleRender = (setter, delay, name) => {
		if (delay === 0) {
			// immediate render for first component.
			requestAnimationFrame(() => {
			setter(true);
			});
		} else {
			// delayed renders - use setTimeout with requestAnimationFrame for smooth spacing.
			setTimeout(() => {
			requestAnimationFrame(() => {
				setter(true);
			});
			}, delay);
		}
		};
		
		// schedule renders for each component.
		scheduleRender(setShowWhoIAm, renderDelays.whoIAm, 'WhoIAm');
		scheduleRender(setShowExperience, renderDelays.experience, 'Experience');
		scheduleRender(setShowProjects, renderDelays.projects, 'Projects');
		scheduleRender(setShowSkills, renderDelays.skills, 'Skills');
		scheduleRender(setShowAbout, renderDelays.about, 'About');
		
		// all components should be rendered within 1.2s, well before navbar appears (7s after loading).
	}, [componentsPreloaded]);

	// mark document state so css can pause animations.
	useEffect(() => {
		document.documentElement.dataset.loading = isLoading ? "true" : "false";
	}, [isLoading]);

	// mark when hero animations are done.
	useEffect(() => {
		document.documentElement.dataset.heroSettled = heroSettled ? "true" : "false";
	}, [heroSettled]);
	
	// lock scrolling during hero animations.
	useEffect(() => {
		if (!loadingCompleteTime) return;
		
		// lock scroll immediately on mount.
		const originalBodyOverflow = document.body.style.overflow;
		const originalHtmlOverflow = document.documentElement.style.overflow;
		
		document.body.style.overflow = 'hidden';
		document.documentElement.style.overflow = 'hidden';
		
		// store current scroll position.
		const scrollY = window.scrollY;
		
		// prevent scroll on body/html.
		const preventScroll = (e) => {
		e.preventDefault();
		};
		
		window.addEventListener('wheel', preventScroll, { passive: false });
		window.addEventListener('touchmove', preventScroll, { passive: false });
		
		// unlock scroll after hero animations complete - timing relative to loading completion.
		const heroAnimationDuration = 7000; // 6s delay + 1s arrow animation
		const unlockTime = loadingCompleteTime + heroAnimationDuration;
		const now = performance.now();
		const delay = Math.max(0, unlockTime - now);
			const unlockTimer = setTimeout(() => {
			
			// restore original overflow values.
			document.body.style.overflow = originalBodyOverflow;
			document.documentElement.style.overflow = originalHtmlOverflow;
			
			// remove event listeners.
			window.removeEventListener('wheel', preventScroll);
			window.removeEventListener('touchmove', preventScroll);
			
			// restore scroll position (should be 0, but just in case).
			window.scrollTo(0, scrollY);
			}, delay);
		
		return () => {
		clearTimeout(unlockTimer);
		
		// cleanup: remove event listeners.
		window.removeEventListener('wheel', preventScroll);
		window.removeEventListener('touchmove', preventScroll);
		
		// restore original overflow values.
		document.body.style.overflow = originalBodyOverflow;
		document.documentElement.style.overflow = originalHtmlOverflow;
		};
	}, []); // run once on mount.

	// component preloading.
	const preloadComponent = async (importFn) => {
		try {
			const component = await importFn();
			return { success: true, component };
		} catch (error) {
			return { success: false, component: null };
		}
	};

	// verify images for a specific section are loaded.
	const verifySectionImages = async (sectionName, images) => {
		if (!images || images.length === 0) return { success: true };
		
		try {
			await preloadImagesInChunks(
				images, 
				5,
				() => {},
				'auto',
				0
			);
			
			return { success: true };
		} catch (error) {
			return { success: false };
		}
	};

	// actual image and component preloading.
	useEffect(() => {
		// prevent duplicate execution in react strict mode.
		if (hasLoadedRef.current) return;
		hasLoadedRef.current = true;
		
		const MIN_LOADING_TIME = 2000;
		
		// preload critical images first, then important images, then components, then fonts.
		const loadAssets = async () => {
		const startTime = Date.now();
		
		try {
			// get critical images (hero section - lcp)
			const criticalImages = getCriticalImages();
			
			// start with critical images.
			await preloadImagesInChunks(
				criticalImages,
				2,
				(loaded, total) => {
					const progress = Math.min(25, Math.floor((loaded / total) * 25));
					setLoadingProgress(progress);
				},
				'high',
				0
			);

			// load important images.
			const importantImages = getImportantImages();
			const importantImagesPromise = preloadImagesInChunks(
				importantImages,
				6,
				(loaded, total) => {
					const progress = 25 + Math.min(20, Math.floor((loaded / total) * 20));
					setLoadingProgress(progress);
				},
				'high',
				0
			);
			
			// start component loading in parallel with important images.
			setLoadingProgress(50);
			
			const componentPromise = Promise.allSettled([
				preloadComponent(() => import('./components/2whoiam/WhoIAm')),
				preloadComponent(() => import('./components/3experience/Experience')),
				preloadComponent(() => import('./components/4projects/Projects')),
				preloadComponent(() => import('./components/5skills/Skills.jsx')),
				preloadComponent(() => import('./components/6about/About.jsx')),
			]);
			
			// wait for both to complete.
			await Promise.all([importantImagesPromise, componentPromise]);
			
			setLoadingProgress(60);
			
			// mark components as preloaded and start mounting them immediately.
			setComponentsPreloaded(true);

			// load important section-specific images.
			const { getImagesBySection } = await import('./components/utils/imageMap.js');
			setLoadingProgress(65);
			
			// preload only important images for each section.
			await Promise.allSettled([
				verifySectionImages('WhoIAm', getImagesBySection('whoIAm', 'important')),
				verifySectionImages('Experience', getImagesBySection('experience', 'important')),
				verifySectionImages('Projects', getImagesBySection('projects', 'important')),
				verifySectionImages('Skills', getImagesBySection('skills', 'important')),
				verifySectionImages('About', getImagesBySection('about', 'important')),
			]);
			
			setLoadingProgress(80);

			setLoadingProgress(88);

			setLoadingProgress(90);

			await new Promise(resolve => setTimeout(resolve, 100));

			setLoadingProgress(92);

			setLoadingProgress(95);
			
			// ensure minimum loading time.
			const elapsedTime = Date.now() - startTime;
			const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime);
			
			// pre-render components in background for smooth first scroll.
			if (remainingTime > 0) {
				requestAnimationFrame(() => {
					const sections = ['who-i-am', 'experience', 'projects', 'skills', 'about'];
					sections.forEach(sectionId => {
					const element = document.getElementById(sectionId);
					if (element) {
						void element.offsetHeight;
						}
					});
				});
			
				// update progress smoothly during wait
				const waitSteps = 20;
				const stepDuration = remainingTime / waitSteps;
				
				// distribute remaining time across progress updates
				for (let i = 0; i < waitSteps; i++) {
					await new Promise(resolve => setTimeout(resolve, stepDuration));
					// smooth progress from 92% to 98%
					const progress = 92 + (i + 1) * (6 / waitSteps);
					setLoadingProgress(Math.min(98, progress));
				}
			}
			
			setLoadingProgress(100);
			
			// fade out loading screen
			setIsFading(true);
			
			// store the actual loading completion time.
			const loadingCompleteTime = performance.now();
			loadingCompleteTimeRef.current = loadingCompleteTime;
			setLoadingCompleteTime(loadingCompleteTime);
			
			// hide loading screen first to prevent scrollbar recalculation affecting hero.
			setTimeout(() => {
			setIsLoading(false);
			}, 800);
		} catch (error) {
			// still finish loading even if there's an error.
			setLoadingProgress(100);
			
			// ensure minimum loading time even on error.
			const elapsedTime = Date.now() - startTime;
			const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime);
			if (remainingTime > 0) {
				await new Promise(resolve => setTimeout(resolve, remainingTime));
			}
			
			setIsFading(true);
			
			// mount components even on error.
			setTimeout(() => {
			setHeroSettled(true);
			setIsLoading(false);
			}, 800);
		}
		};

		loadAssets();
	}, []);

	// minimal fallback component.
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
					{/* hero always mounts */}
					<Hero isLoading={isLoading} loadingCompleteTime={loadingCompleteTime} />
					
					{/* navbar - mounts after hero */}
					<Navbar loadingCompleteTime={loadingCompleteTime} />
					
					{/* incremental rendering - components mount one at a time during loading */}
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
		
		{/* loading screen overlays on top */}
		{isLoading && <LoadingScreen progress={loadingProgress} isFading={isFading} />}
		</>
	);
}

// export.
export default App; 

/* ================== component wrapper ================== */

// wrapper to prevent layout shifts during component mounting.
const ComponentWrapper = styled.div`
    /* layout */
    position: relative;
    
    /* GPU acceleration */
    transform: translateZ(0);
    contain: layout style paint;
    
    /* nested selectors */
    :root[data-loading="true"] & {
        /* styles */
        opacity: 0;
        pointer-events: none;
        visibility: visible;
    }
    
    ${props => !props.$heroSettled ? `
        /* styles */
        opacity: 0;
        pointer-events: none;
        visibility: visible;
    ` : ''}
    
    :root[data-loading="false"] & {
        /* styles */
        opacity: ${props => props.$heroSettled ? '1' : '0'};
        pointer-events: ${props => props.$heroSettled ? 'auto' : 'none'};
        visibility: visible;
        transition: opacity 0.3s ease-in;
    }
`;