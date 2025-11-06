// projects.jsx

// component to display all the projects i've done / at least want to show off.

// imports.
import styled, { keyframes } from 'styled-components';
import React, { useEffect, useMemo, useRef, useState, useCallback, memo } from 'react';
import { useComponentPerformance } from '../../hooks/useComponentPerformance';

// my project cards.
import CentiCard from './Cards/CentiCard';
import CKSiteCard from './Cards/CKSiteCard';
import OceanLifeCard from './Cards/OceanLifeCard';
import SecureScapeCard from './Cards/SecureScapeCard';
import ShelfVisionCard from './Cards/ShelfVisionCard';
import UCFClubManagerCard from './Cards/UCFClubManagerCard';
import SentimentTraderCard from './Cards/SentimentTraderCard';

// cloud component from experience.
import Cloud from '../3experience/Cloud';

// sun component from experience.
import Sun from './Sun';

// main projects component.
const Projects = memo(() => { 
	// Performance monitoring
	useComponentPerformance('Projects', process.env.NODE_ENV === 'development');

	// memo for cards.
	const cards = useMemo(
		() => [
		{ id: 'ck', node: <CKSiteCard />, theme: 'cosmic' },
		{ id: 'centi', node: <CentiCard />, theme: 'centi' },
		{ id: 'sent', node: <SentimentTraderCard />, theme: 'sentiment' },
		{ id: 'sec', node: <SecureScapeCard />, theme: 'secure' },
		{ id: 'shelf', node: <ShelfVisionCard />, theme: 'shelf' },
		{ id: 'ucf', node: <UCFClubManagerCard />, theme: 'ucf' },
		{ id: 'ocean', node: <OceanLifeCard />, theme: 'ocean' },
		],
		[]
	);

	// state variables.
	const n = useMemo(() => cards.length, [cards.length]);
	const [index, setIndex] = useState(0);
	const [paused, setPaused] = useState(false);

	// Memoized navigation functions
	const next = useCallback(() => setIndex((i) => (i + 1) % n), [n]);
	const prev = useCallback(() => setIndex((i) => (i - 1 + n) % n), [n]);
	
	// Memoized pause handlers
	const handleMouseEnter = useCallback(() => setPaused(true), []);
	const handleMouseLeave = useCallback(() => setPaused(false), []);

	// keyboard navigation. (right & left arrows)
	useEffect(() => {
		const onKey = (e) => {
		if (e.key === 'ArrowRight') next();
		if (e.key === 'ArrowLeft') prev();
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [next, prev]);

	// simple drag / swipe.
	const drag = useRef({ x: 0, active: false });
	const onPointerDown = useCallback((e) => {
		drag.current = { x: e.clientX ?? e.touches?.[0]?.clientX ?? 0, active: true };
		setPaused(true);
	}, []);
	const onPointerUp = useCallback((e) => {
		if (!drag.current.active) return;
		const upX = e.clientX ?? e.changedTouches?.[0]?.clientX ?? 0;
		const dx = upX - drag.current.x;
		drag.current.active = false;
		if (Math.abs(dx) > 50) (dx < 0 ? next() : prev());
		setPaused(false);
	}, [next, prev]);

	// Memoized card style calculation
	const getCardStyle = useCallback((cardIndex) => {
		const distance = Math.abs(cardIndex - index);
		
		// only show cards within 2 positions of current index.
		if (distance > 2) return null;
		
		return {
			position: cardIndex - index, // -2, -1, 0, 1, 2
			isFocused: cardIndex === index,
			distance: distance
		};
	}, [index]);

    return (
        <ProjectsContainer id="projects" data-section-snap>
            {/* lower sky atmospheric elements */}
            <AtmosphereLayer>
                {/* seam softener between experience and projects */}
                <TopSeamFade />
                {/* seam softener at bottom to blend into skills. */}
                <BottomSeamFade />
                {/* parallax cloud layers - reduced from 22 to 10 clouds for better performance */}
                <CloudLayer>
                    {/* top layer - dense clouds (continuing from experience). */}
                    <Cloud top="2%" delay="0" duration="180" layer="far" type={1} />
                    <Cloud top="8%" delay="60" duration="200" layer="far" type={3} />
                    <Cloud top="15%" delay="120" duration="190" layer="far" type={2} />
                    
                    <Cloud top="5%" delay="30" duration="145" layer="mid" type={4} />
                    <Cloud top="12%" delay="80" duration="140" layer="mid" type={2} />
                    <Cloud top="18%" delay="15" duration="150" layer="mid" type={5} />
                
                    <Cloud top="3%" delay="10" duration="115" layer="near" type={3} />
                    <Cloud top="10%" delay="55" duration="125" layer="near" type={1} />
                    
                    {/* mid layer - medium density clouds. */}
                    <Cloud top="35%" delay="70" duration="135" layer="mid" type={4} />
                    
                    {/* lower layer - sparse clouds. */}
                    <Cloud top="65%" delay="30" duration="140" layer="far" type={2} />
                </CloudLayer>
                
                {/* sun - positioned like it's at the horizon. */}
                <Sun />
                
            </AtmosphereLayer>
            
			{/* content wrapper - container for actual card carousel. */}
            <ContentWrapper>
				{/* title and subtitle */}
                <SectionTitle data-snap-title>Projects</SectionTitle>
                <SectionSubtitle>What I've built and shipped</SectionSubtitle>
				
				{/* stage - where the cards are displayed. */}
				<Stage
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
					onPointerDown={onPointerDown}
					onPointerUp={onPointerUp}
					onTouchStart={onPointerDown}
					onTouchEnd={onPointerUp}
					role="region"
					aria-label="Projects carousel"
				>
					{/* track - the container for the cards. */}
					<Track>
						{cards.map((c, i) => {
						const cardStyle = getCardStyle(i);
						if (!cardStyle) return null;
						
						return (
							<Slide 
								key={c.id} 
								$position={cardStyle.position}
								$isFocused={cardStyle.isFocused}
								$distance={cardStyle.distance}
							>
								{React.cloneElement(c.node, { isFocused: cardStyle.isFocused })}
							</Slide>
						);
						})}
					</Track>

					{/* arrows - previous and next project. */}
					{index > 0 && <ArrowLeft aria-label="Previous project" onClick={prev}>‹</ArrowLeft>}
					{index < n - 1 && <ArrowRight aria-label="Next project" onClick={next}>›</ArrowRight>}
				</Stage>
			</ContentWrapper>
        </ProjectsContainer>
    );
});

Projects.displayName = 'Projects';
export default Projects;

/* ------------------ styles ------------------ */

// main container for viewport.
const ProjectsContainer = styled.div`
    /* layout */
    display: flex;
    overflow: hidden;
    min-height: 100vh;
	position: relative;
	flex-direction: column;
    
    /* GPU acceleration */
    transform: translateZ(0);
    contain: layout style;
    
    /* spacing */
    width: 100%;
    padding-top: 0;
	padding: 4rem 2rem;
    padding-bottom: 6rem;
    
    /* styles */
    /* Simplified gradient - reduced from 11 to 3 color stops for better performance */
    background: linear-gradient(to bottom,
        rgb(148, 180, 243) 0%,   /* Match Experience ending */
        rgb(120, 165, 234) 50%,  /* Mid transition */
        rgb(71, 160, 238) 100%); /* Exact match Skills start */

    /* media queries */
    @supports (background: linear-gradient(in oklch, red, blue)) {
        background: linear-gradient(
            to bottom in oklch,
            #a8c2f6 0%,  /* exact match of Experience end */
            #9fbaf3 25%,
            #8db2f0 50%,
            #7db5f3 75%,
            #6eb0f2 100%  /* darker blue matching Skills start rgb(71, 160, 238) */
        );
    }
`;

// atmosphere layer for the visual elements. (sun & clouds)
const AtmosphereLayer = styled.div`
    /* layout */
    inset: 0;
    z-index: 1;
	overflow: hidden;
	position: absolute;
    
    /* styles */
    pointer-events: none;
`;

// cloud layer container (for all the cool clouds!)
const CloudLayer = styled.div`
    /* layout */
    inset: 0;
    z-index: 1;
    overflow: hidden;
	position: absolute;
    
    /* GPU acceleration and containment */
    transform: translateZ(0);
    contain: layout style paint;
    will-change: transform;
    
    /* Pause animations during loading */
    [data-loading="true"] & {
        animation-play-state: paused;
    }
    
    /* styles */
    pointer-events: none;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
`;

// the soft gradient at the top to blend the seam better between sections.
const TopSeamFade = styled.div`
    /* layout */
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
	position: absolute;
    
    /* spacing */
    height: 14vh;
    
    /* styles */
    pointer-events: none;
    background: linear-gradient(
        to bottom,
        rgba(148, 180, 243, 1) 0%,
        rgba(148, 180, 243, 0.6) 40%,
        rgba(148, 180, 243, 0) 100%
    );
    
    /* media queries */
    @supports (background: linear-gradient(in oklch, red, blue)) {
        background: linear-gradient(
            to bottom in oklch,
            #a8c2f6 0%,
            color-mix(in oklch, #a8c2f6 60%, transparent) 60%,
            transparent 100%
        );
    }
`;

// soft gradient at bottom to blen into skills.
const BottomSeamFade = styled.div`
    /* layout */
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;
	position: absolute;
    
    /* spacing */
    height: 16vh;
    
    /* styles */
    pointer-events: none;
    background: linear-gradient(
        to bottom,
        rgba(71, 160, 238, 0) 0%,
        rgba(71, 160, 238, 0.5) 50%,
        rgba(71, 160, 238, 1) 100%
    );
    
    /* media queries */
    @supports (background: linear-gradient(in oklch, red, blue)) {
        background: linear-gradient(
            to bottom in oklch,
            transparent 0%,
            color-mix(in oklch, #6eb0f2 50%, transparent) 50%,
            #6eb0f2 100%
        );
    }
`;

// main content wrapper for text and carousel.
const ContentWrapper = styled.div`
    /* layout */
	z-index: 2;
    display: flex;
    position: relative;
    align-items: center;
	flex-direction: column;
    
    /* spacing */
    width: 100%;
	padding: 2rem;
    margin: 0 auto;
    max-width: 1400px;
    
    /* media queries */
    @media (max-width: 1600px) {
        padding: 1.5rem;
    }
    
    @media (max-width: 1200px) {
        padding: 1rem;
    }
`;

// section title w/ the gradient text.
const SectionTitle = styled.div`
    /* layout */
    text-align: center;
    
    /* spacing */
    margin: 0;
    
    /* styles */
    font-size: 5.2rem;
    font-weight: 900;
    background: linear-gradient(135deg, 
        rgba(255, 255, 255, 0.95) 0%,
        rgba(255, 240, 200, 0.9) 50%,
        rgba(255, 220, 150, 0.95) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 4px 20px rgba(255, 220, 100, 0.3);
    
    /* media queries */
    @media (max-width: 1600px) {
        font-size: 3.6rem;
    }
`;

// section subtitle.
const SectionSubtitle = styled.h2`
    /* layout */
    text-align: center;
    
    /* spacing */
    margin: 0;
    margin-top: 0.25rem;
    margin-bottom: 2rem;
    
    /* styles */
    font-size: 2rem;
    font-weight: 400;
    font-style: italic;
    color: rgba(255, 255, 255, 0.85);
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.7);
    
    /* media queries */
    @media (max-width: 1600px) {
        font-size: 1.35rem;
        margin-bottom: 1.75rem;
    }
    
    @media (max-width: 1200px) {
        font-size: 1.3rem;
        margin-bottom: 3rem;
    }
    
    @media (max-width: 900px) {
        font-size: 1.1rem;
        margin-bottom: 3.5rem;
    }
`;

// stage for the cards to be displayed.
const Stage = styled.div`
    /* layout */
    display: grid;
	overflow: visible;
    position: relative;
    place-items: center;
    
    /* GPU acceleration */
    transform: translateZ(0);
    contain: layout style; /* Removed paint containment to allow overflow */
    
    /* spacing */
    width: 100%;
    min-height: 72vh;
    padding: 40px 0 60px 0; /* Extra bottom padding for card overflow */
    
    /* media queries */
    @media (min-width: 2000px) {
        min-height: 70vh;
        padding: 32px 0;
    }
    
    @media (max-width: 1600px) {
        min-height: 60vh;
        padding: 24px 0;
    }
    
    @media (max-width: 1200px) {
        min-height: 56vh;
        padding: 20px 0;
    }
`;

// track on which cards are contained.
const Track = styled.div`
    /* layout */
    overflow: visible;
	position: relative;
    perspective: 1200px;
    
    /* GPU acceleration */
    transform: translateZ(0);
    will-change: transform;
    contain: layout style; /* Keep layout/style containment */
    
    /* spacing */
    width: 50vw;
    height: clamp(520px, 60vh, 720px);
    
    /* media queries */
    @media (min-width: 2000px) {
        height: clamp(560px, 58vh, 780px);
    }
    
    @media (max-width: 1600px) {
        width: 60vw;
        height: clamp(480px, 55vh, 660px);
    }
    
    @media (max-width: 1200px) {
        width: 70vw;
        height: clamp(440px, 52vh, 620px);
    }
    
    @media (max-width: 900px) {
        width: 85vw;
        height: clamp(400px, 50vh, 580px);
    }
`;

// slide - individual carousel item.
const Slide = styled.div`
    /* layout */
    top: 0;
    left: 0;
	z-index: 1;
    display: grid;
    place-items: center;
	position: absolute;
    
    /* spacing */
    width: 100%;
    height: 100%;
    
    /* GPU acceleration */
    transform: translateZ(0);
    will-change: transform, opacity;
    contain: layout style; /* Removed paint containment for better overflow handling */
    
    /* styles */
    pointer-events: none;
    transition:
        transform 280ms cubic-bezier(0.22, 0.61, 0.36, 1),
        opacity 200ms ease;
    
    /* Focused card (index 0) */
    ${({ $isFocused }) => $isFocused && `
        transform: translateX(0) translateZ(0) scale(1);
        opacity: 1;
        z-index: 100; /* Highest z-index for focused card */
        pointer-events: auto;
        will-change: transform;
    `}

    /* Adjacent cards (distance 1) */
    ${({ $distance, $position }) => $distance === 1 && `
        transform: translateX(${$position > 0 ? '35%' : '-35%'}) scale(0.75) translateZ(-30px);
        opacity: 0.4;
        z-index: 5;
        filter: blur(2px) saturate(0.7);
        will-change: transform, opacity;
    `}

    /* Far cards (distance 2) */
    ${({ $distance, $position }) => $distance === 2 && `
        transform: translateX(${$position > 0 ? '65%' : '-65%'}) scale(0.6) translateZ(-60px);
        opacity: 0.2;
        z-index: 1;
        filter: blur(4px) saturate(0.5);
        will-change: transform, opacity;
    `}
    
    /* media queries */
    @media (max-width: 1200px) {
        ${({ $distance, $position }) => $distance === 1 && `
            transform: translateX(${$position > 0 ? '30%' : '-30%'}) scale(0.8) translateZ(-30px);
        `}
        ${({ $distance }) => $distance === 2 && `
            display: none;
        `}
    }

    @media (max-width: 820px) {
        ${({ $distance, $position }) => $distance === 1 && `
            transform: translateX(${$position > 0 ? '25%' : '-25%'}) scale(0.85) translateZ(-30px);
        `}
    }
`;

/* ========== arrows ========== */

// bounce animations for arrows - GPU accelerated
const leftBounce = keyframes`
  0%, 100% {
    transform: translateY(-50%) translateX(0) translateZ(0);
  }
  25% {
    transform: translateY(-50%) translateX(-3px) translateZ(0);
  }
  75% {
    transform: translateY(-50%) translateX(3px) translateZ(0);
  }
`;

const rightBounce = keyframes`
  0%, 100% {
    transform: translateY(-50%) translateX(0) translateZ(0);
  }
  25% {
    transform: translateY(-50%) translateX(3px) translateZ(0);
  }
  75% {
    transform: translateY(-50%) translateX(-3px) translateZ(0);
  }
`;

// base arrow button style.
const ArrowBase = styled.button`
    /* layout */
    top: 50%;
	z-index: 20;
    display: grid;
    place-items: center;
	position: absolute;
    
    /* spacing */
    width: 56px;
    height: 56px;
    
    /* GPU acceleration */
    transform: translateY(-50%) translateZ(0);
    will-change: transform;
    contain: layout style paint;
    
    /* styles */
    cursor: pointer;
    border: 0;
    border-radius: 16px;
    opacity: 0.95;
    background: linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.15));
    backdrop-filter: blur(12px);
    border: 2px solid rgba(255,255,255,0.3);
    box-shadow: 
        0 4px 16px rgba(0,0,0,0.15),
        0 0 20px rgba(255,255,255,0.1),
        inset 0 1px 2px rgba(255,255,255,0.2);
    color: #fff;
    font-size: 32px;
    font-weight: bold;
    line-height: 1;
    transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1),
                box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1);
    
    /* hover effects */
    &:hover { 
        transform: translateY(-50%) scale(1.1) translateZ(0); 
        background: linear-gradient(135deg, rgba(255,255,255,0.35), rgba(255,255,255,0.25));
        border-color: rgba(255,255,255,0.5);
        box-shadow: 
            0 6px 24px rgba(0,0,0,0.2),
            0 0 30px rgba(255,255,255,0.2),
            inset 0 1px 3px rgba(255,255,255,0.3);
    }
    
    /* active state */
    &:active {
        transform: translateY(-50%) scale(0.95) translateZ(0);
    }
`;

// left arrow button.
const ArrowLeft = styled(ArrowBase)`
    /* layout */
    left: max(12px, 4vw);
    
    /* styles */
    animation: ${leftBounce} 2s ease-in-out infinite;
    animation-delay: 0.5s;
`;

// right arrow button.
const ArrowRight = styled(ArrowBase)`
    /* layout */
    right: max(12px, 4vw);
    
    /* styles */
    animation: ${rightBounce} 2s ease-in-out infinite;
    animation-delay: 1s;
`;