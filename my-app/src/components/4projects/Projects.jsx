// projects.jsx

// component to display all the projects i've done / at least want to show off.

// imports.
import styled, { keyframes } from 'styled-components';
import React, { useEffect, useMemo, useRef, useState } from 'react';

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
const Projects = () => { 

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
	const n = cards.length;
	const [index, setIndex] = useState(0);
	const [paused, setPaused] = useState(false);

	// next & previous functions.
	const next = () => setIndex((i) => (i + 1) % n);
	const prev = () => setIndex((i) => (i - 1 + n) % n);

	// autoplay (30s).
	useEffect(() => {
		const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
		if (paused || reduced) return;
		const t = setInterval(next, 30000);
		return () => clearInterval(t);
	}, [paused, n]);

	// keyboard navigation. (right & left arrows)
	useEffect(() => {
		const onKey = (e) => {
		if (e.key === 'ArrowRight') next();
		if (e.key === 'ArrowLeft') prev();
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, []);

	// simple drag / swipe.
	const drag = useRef({ x: 0, active: false });
	const onPointerDown = (e) => {
		drag.current = { x: e.clientX ?? e.touches?.[0]?.clientX ?? 0, active: true };
		setPaused(true);
	};
	const onPointerUp = (e) => {
		if (!drag.current.active) return;
		const upX = e.clientX ?? e.changedTouches?.[0]?.clientX ?? 0;
		const dx = upX - drag.current.x;
		drag.current.active = false;
		if (Math.abs(dx) > 50) (dx < 0 ? next() : prev());
		setPaused(false);
	};

	// index-based positioning system.
	const getCardStyle = (cardIndex) => {
		const distance = Math.abs(cardIndex - index);
		
		// only show cards within 2 positions of current index.
		if (distance > 2) return null;
		
		return {
			position: cardIndex - index, // -2, -1, 0, 1, 2
			isFocused: cardIndex === index,
			distance: distance
		};
	};

    return (
        <ProjectsContainer>
            {/* lower sky atmospheric elements */}
            <AtmosphereLayer>
                {/* seam softener between experience and projects */}
                <TopSeamFade />
                {/* seam softener at bottom to blend into skills. */}
                <BottomSeamFade />
                {/* parallax cloud layers - decreasing frequency from top to bottom. */}
                <CloudLayer>
                    {/* top layer - dense clouds (continuing from experience). */}
                    <Cloud top="2%" delay="0" duration="180" layer="far" type={1} />
                    <Cloud top="8%" delay="60" duration="200" layer="far" type={3} />
                    <Cloud top="15%" delay="120" duration="190" layer="far" type={2} />
                    <Cloud top="22%" delay="35" duration="195" layer="far" type={5} />
                    <Cloud top="28%" delay="90" duration="185" layer="far" type={4} />
                    
                    <Cloud top="5%" delay="30" duration="145" layer="mid" type={4} />
                    <Cloud top="12%" delay="80" duration="140" layer="mid" type={2} />
                    <Cloud top="18%" delay="15" duration="150" layer="mid" type={5} />
                    <Cloud top="25%" delay="100" duration="155" layer="mid" type={1} />
                
                    <Cloud top="3%" delay="10" duration="115" layer="near" type={3} />
                    <Cloud top="10%" delay="55" duration="125" layer="near" type={1} />
                    <Cloud top="16%" delay="90" duration="120" layer="near" type={4} />
                    
                    {/* mid layer - medium density clouds. */}
                    <Cloud top="32%" delay="45" duration="175" layer="far" type={1} />
                    <Cloud top="38%" delay="105" duration="185" layer="far" type={3} />
                    <Cloud top="45%" delay="25" duration="180" layer="far" type={2} />

                    <Cloud top="35%" delay="70" duration="135" layer="mid" type={4} />
                    <Cloud top="42%" delay="20" duration="145" layer="mid" type={2} />

                    <Cloud top="30%" delay="40" duration="110" layer="near" type={5} />
                    <Cloud top="40%" delay="85" duration="115" layer="near" type={1} />
                    
                    {/* lower layer - sparse clouds. */}
                    <Cloud top="52%" delay="15" duration="160" layer="far" type={4} />
                    <Cloud top="58%" delay="75" duration="170" layer="far" type={1} />

                    <Cloud top="50%" delay="50" duration="125" layer="mid" type={3} />
                    
                    {/* very lower layer - minimal clouds (transition to horizon). */}
                    <Cloud top="65%" delay="30" duration="140" layer="far" type={2} />
                    <Cloud top="72%" delay="90" duration="150" layer="far" type={5} />
                </CloudLayer>
                
                {/* sun - positioned like it's at the horizon. */}
                <Sun />
                
            </AtmosphereLayer>
            
			{/* content wrapper - container for actual card carousel. */}
            <ContentWrapper>
				{/* title and subtitle */}
                <SectionTitle>Projects</SectionTitle>
                <SectionSubtitle>What I've built and shipped</SectionSubtitle>
				
				{/* stage - where the cards are displayed. */}
				<Stage
					onMouseEnter={() => setPaused(true)}
					onMouseLeave={() => setPaused(false)}
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
};

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
    
    /* spacing */
    width: 100%;
    padding-top: 0;
	padding: 4rem 2rem;
    padding-bottom: 6rem;
    
    /* styles */
    /* transition from experience's ending blue to darker blue, ending to match skills start. */
    background: linear-gradient(to bottom,
        rgb(148, 180, 243) 0%,   /* Match Experience ending */
        rgb(140, 175, 240) 10%,
        rgb(130, 170, 237) 20%,
        rgb(120, 165, 234) 30%,
        rgb(110, 160, 232) 40%,
        rgb(100, 155, 230) 50%,
        rgb(90, 150, 228) 60%,    /* Darker blue transition */
        rgb(85, 155, 235) 70%,    /* Slightly brighter but still muted */
        rgb(80, 158, 237) 80%,    /* Approaching Skills color */
        rgb(75, 159, 238) 90%,    /* Close to Skills start */
        rgb(71, 160, 238) 100%);  /* Exact match Skills start */

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
    
    /* styles */
    pointer-events: none;
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
    text-shadow: 0 2px 10px rgba(255, 255, 255, 0.2);
    
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
    
    /* spacing */
    width: 100%;
    min-height: 72vh;
    padding: 40px 0;
    
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
    
    /* styles */
    pointer-events: none;
    will-change: transform, opacity, filter;
    transition:
        transform 320ms cubic-bezier(0.22, 0.61, 0.36, 1),
        opacity 220ms ease,
        filter 220ms ease;
    
    /* Focused card (index 0) */
    ${({ $isFocused }) => $isFocused && `
        transform: translateX(0) translateZ(0) scale(1);
        opacity: 1;
        z-index: 10;
        pointer-events: auto;
    `}

    /* Adjacent cards (distance 1) */
    ${({ $distance, $position }) => $distance === 1 && `
        transform: translateX(${$position > 0 ? '35%' : '-35%'}) scale(0.75) translateZ(-30px);
        opacity: 0.4;
        z-index: 5;
        filter: blur(2px) saturate(0.7);
    `}

    /* Far cards (distance 2) */
    ${({ $distance, $position }) => $distance === 2 && `
        transform: translateX(${$position > 0 ? '65%' : '-65%'}) scale(0.6) translateZ(-60px);
        opacity: 0.2;
        z-index: 1;
        filter: blur(4px) saturate(0.5);
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

// bounce animations for arrows
const leftBounce = keyframes`
  0%, 100% {
    transform: translateY(-50%) translateX(0);
  }
  25% {
    transform: translateY(-50%) translateX(-3px);
  }
  75% {
    transform: translateY(-50%) translateX(3px);
  }
`;

const rightBounce = keyframes`
  0%, 100% {
    transform: translateY(-50%) translateX(0);
  }
  25% {
    transform: translateY(-50%) translateX(3px);
  }
  75% {
    transform: translateY(-50%) translateX(-3px);
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
    
    /* styles */
    cursor: pointer;
    border: 0;
    border-radius: 16px;
    opacity: 0.95;
    transform: translateY(-50%);
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
    transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
    
    /* hover effects */
    &:hover { 
        transform: translateY(-50%) scale(1.1); 
        background: linear-gradient(135deg, rgba(255,255,255,0.35), rgba(255,255,255,0.25));
        border-color: rgba(255,255,255,0.5);
        box-shadow: 
            0 6px 24px rgba(0,0,0,0.2),
            0 0 30px rgba(255,255,255,0.2),
            inset 0 1px 3px rgba(255,255,255,0.3);
    }
    
    /* active state */
    &:active {
        transform: translateY(-50%) scale(0.95);
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