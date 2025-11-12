// hero.jsx

// main hero component upon load.
// idea is to introduce me, create a smooth animation welcome, and an invitation to scroll down.
// starting off with the space theme and moving downwards.
// had idea of adding some more stuff in background, thinking ufo, astronaut, and maybe one more thing.

// imports.
import React, { memo, useCallback, useMemo } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { useComponentPerformance } from '../../hooks/useComponentPerformance';
import { scrollToSection } from '../../utils/scrollToSection';

// Image imports
import astronautImg from '@/images/1hero/astronaut.png';
import ufoImg from '@/images/1hero/ufo.png';
import cloud1Img from '@/images/3experience/clouds/cloud1.png';
import cloud2Img from '@/images/3experience/clouds/cloud2.png';
import cloud3Img from '@/images/3experience/clouds/cloud3.png';

// hero component.
const Hero = memo(({ isLoading = true, loadingCompleteTime = null }) => {
    // Performance monitoring
    useComponentPerformance('Hero', process.env.NODE_ENV === 'development');
    
    // Track when loading is complete and animations can start
    const [loadingComplete, setLoadingComplete] = React.useState(false);
    
    // When loading screen finishes, allow animations to start
    React.useEffect(() => {
        if (!isLoading && !loadingComplete) {
            setLoadingComplete(true);
            const now = performance.now();
            console.log(`[Hero] Loading screen finished, animations starting at ${now.toFixed(2)}ms`);
        }
    }, [isLoading, loadingComplete]);
            
    // Memoized smooth scroll function using shared utility
    const handleScrollToSection = useCallback((sectionId, desktopOffset = 0, mobileOffset = 0) => {
        scrollToSection(sectionId, desktopOffset, mobileOffset);
    }, []);
    
    // Memoize animation configs - only animate after loading completes
    // Use false to prevent animation until loadingComplete is true
    const msgWrapperConfig = useMemo(() => ({
        initial: { opacity: 0 },
        animate: loadingComplete ? { opacity: 1 } : false,
        transition: { delay: 0.5, duration: 0.8, ease: "easeOut" }
    }), [loadingComplete]);
    
    const supMsgConfig = useMemo(() => ({
        initial: { x: -500, opacity: 0 },
        animate: loadingComplete ? { x: 0, opacity: 1 } : false,
        transition: { delay: 0.8, duration: 1.2, ease: "easeOut" }
    }), [loadingComplete]);
    
    const introNameConfig = useMemo(() => ({
        initial: { x: -500, opacity: 0 },
        animate: loadingComplete ? { x: 0, opacity: 1 } : false,
        transition: { delay: 1.8, duration: 1.2, ease: "easeOut" }
    }), [loadingComplete]);
    
    const nameRowConfig = useMemo(() => ({
        initial: { x: -500, opacity: 0 },
        animate: loadingComplete ? { x: 0, opacity: 1 } : false,
        transition: { delay: 2.8, duration: 1.2, ease: "easeOut" }
    }), [loadingComplete]);
    
    const subNameConfig = useMemo(() => ({
        initial: { y: -50, opacity: 0 },
        animate: loadingComplete ? { y: 0, opacity: 1 } : false,
        transition: { delay: 3.8, duration: 1.2, ease: "easeOut" }
    }), [loadingComplete]);
    
    const scrollInviteConfig = useMemo(() => ({
        initial: { y: 50, opacity: 0 },
        animate: loadingComplete ? { y: 0, opacity: 1 } : false,
        transition: { delay: 4.8, duration: 1.2, ease: "easeOut" }
    }), [loadingComplete]);
    
    const navPillsConfig = useMemo(() => ({
        initial: { y: 50, opacity: 0 },
        animate: loadingComplete ? { y: 0, opacity: 1 } : false,
        transition: { delay: 5.4, duration: 1.2, ease: "easeOut" }
    }), [loadingComplete]);
    
    const arrowConfig = useMemo(() => ({
        initial: { y: 30, opacity: 0 },
        animate: loadingComplete ? { y: 0, opacity: 1 } : false,
        transition: { delay: 6.0, duration: 1.0, ease: "easeOut" }
    }), [loadingComplete]);

    return (
        <HeroContainer id="hero" data-section-snap $isLoading={isLoading}>
            
            {/* Optimized starfield - CSS background approach for better performance */}
            <ParticleField className="twinkles">
                {/* Reduced to 3 most visible stars for better render performance (target: <16ms) */}
                <Star style={{ '--top': '15%', '--left': '25%', '--size': '2px', '--opacity': '0.6', '--duration': '23.7' }} className="twinkle1" />
                <Star style={{ '--top': '45%', '--left': '65%', '--size': '1px', '--opacity': '0.7', '--duration': '31.2' }} className="twinkle2" />
                <Star style={{ '--top': '75%', '--left': '35%', '--size': '2px', '--opacity': '0.8', '--duration': '18.9' }} className="twinkle3" />
                
                {/* moon (thinking bout adding some more to it, like a guy waving on it */}
                <Moon>
                    <Crater style={{ '--top': '15%', '--left': '55%', '--size': '6px', '--depth': '0.1', '--depth-half': '0.05', '--shadow-size': '1.8px', '--shadow-opacity': '0.08' }} />
                    <Crater style={{ '--top': '60%', '--left': '25%', '--size': '10px', '--depth': '0.08', '--depth-half': '0.04', '--shadow-size': '3px', '--shadow-opacity': '0.064' }} />
                    <Crater style={{ '--top': '35%', '--left': '15%', '--size': '4px', '--depth': '0.12', '--depth-half': '0.06', '--shadow-size': '1.2px', '--shadow-opacity': '0.096' }} />
                    <Crater style={{ '--top': '70%', '--left': '70%', '--size': '7px', '--depth': '0.09', '--depth-half': '0.045', '--shadow-size': '2.1px', '--shadow-opacity': '0.072' }} />
                    <Crater style={{ '--top': '25%', '--left': '35%', '--size': '8px', '--depth': '0.15', '--depth-half': '0.075', '--shadow-size': '2.4px', '--shadow-opacity': '0.12' }} />
                    <Crater style={{ '--top': '45%', '--left': '60%', '--size': '12px', '--depth': '0.12', '--depth-half': '0.06', '--shadow-size': '3.6px', '--shadow-opacity': '0.096' }} />
                    <Crater style={{ '--top': '80%', '--left': '40%', '--size': '5px', '--depth': '0.11', '--depth-half': '0.055', '--shadow-size': '1.5px', '--shadow-opacity': '0.088' }} />
                </Moon>
                
            </ParticleField>

            {/* floating confused astronaut */}
            <Astronaut />
            
            {/* floating UFO */}
            <UFO />

            {/* original messages upon load - delayed slide in */}
            <MsgsWrapper {...msgWrapperConfig}>
                    <Msgs>
                        {/* what's up! message */}
                    <SupMsg {...supMsgConfig}>
                            What's up! 
                            <WavingHand>👋</WavingHand>
                        </SupMsg>

                        {/* my name's... message */}
                    <IntroNameMsg {...introNameConfig}>
                            My name's
                        </IntroNameMsg>

                        {/* my name */}
                    <NameRow {...nameRowConfig}>
                            <Name className="nameGradient">Colin Kirby</Name>
                        </NameRow>

                        {/* sub name message*/}
                    <SubNameMsg {...subNameConfig}>
                            <b>* Most people just call me Kirby</b>
                        </SubNameMsg>

                        {/* scroll invitation message */}
                    {/* give the user options to navigate the site */}
                    <ScrollInvite {...scrollInviteConfig}>
                        {/* cta */}
                        <ScrollText>What do you want to see?</ScrollText>
                        
                        {/* navigation pills */}
                        <NavPills {...navPillsConfig}>
                            {/* strictly business thing (want to make it strickly biznus but might be a bit too jokey)*/}
                            {/* Adjust the first number for 2000px+, second for 1600-1999px */}
                            <NavPillProjects onClick={() => handleScrollToSection('experience', 20, -110)}>
                                <NavPillBackgroundProjects />
                                <NavPillText>Strictly business</NavPillText>
                                <NavPillIcon>✈️</NavPillIcon>
                            </NavPillProjects>
                            {/* who even are you? (tim robinson type shi) */}
                            {/* Adjust the first number for 2000px+, second for 1600-1999px */}
                            <NavPillStory onClick={() => handleScrollToSection('who-i-am', -25, -35)}>
                                <NavPillBackgroundStory />
                                <NavPillText>Who even are you?</NavPillText>
                                <NavPillIcon>👨‍🚀</NavPillIcon>
                            </NavPillStory>
                        </NavPills>
                        
                        {/* constellation arrow */}
                        <SimpleArrow {...arrowConfig}>
                            <ArrowText>Scroll to explore</ArrowText>
                            <ArrowIcon>
                                <ConstellationArrowDown />
                            </ArrowIcon>
                        </SimpleArrow>
                        </ScrollInvite>
                    </Msgs>
                </MsgsWrapper>
            
        </HeroContainer>
    )
});

Hero.displayName = 'Hero';

export default Hero;

/* ========== styled ========== */

// entire container for the hero content.
const HeroContainer = styled.div`
    /* layout */
    display: flex;
    overflow: hidden;
    min-height: 100vh;
    position: relative;
    padding-top: 1rem;
    
    /* Performance optimizations - isolate Hero from layout shifts below */
    contain: layout style paint;
    transform: translateZ(0); /* Force GPU layer */
    will-change: auto; /* Only set when actively animating */
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    
    /* Prevent layout shifts from affecting Hero */
    isolation: isolate; /* Create new stacking context */
    z-index: 1; /* Ensure Hero stays above other content during loading */
    
    /* Prevent scrollbar changes from affecting Hero rendering */
    :root[data-loading="true"] & {
        position: relative;
        /* Maintain fixed height during loading to prevent scrollbar recalculation */
        height: 100vh;
        max-height: 100vh;
        /* Hide Hero content during loading - only show loading screen */
        opacity: 0;
        pointer-events: none;
    }
    
    /* Show Hero content after loading */
    :root[data-loading="false"] & {
        opacity: 1;
        pointer-events: auto;
        transition: opacity 0.5s ease-in;
    }

    /* styles */ 
    background: radial-gradient(ellipse at center, 
        rgba(20, 5, 40, 0.8) 0%, 
        rgba(0, 0, 0, 0.9) 30%, 
        rgba(13, 7, 27, 1) 70%);
    
    /* breathing nebula effect (optimized - reduced gradient complexity) */
    &::after {
        /* layout */
        inset: 0;
        content: '';
        position: absolute;
        z-index: 0;

        /* styles */
        opacity: 0.7;
        /* GPU-accelerated animation */
        animation: breathe 10s ease-in-out infinite;
        transform: translateZ(0); /* Force GPU acceleration */
        will-change: opacity, transform; /* Only properties that actually animate */
        
        /* Simplified gradients - fewer layers for better performance */
        background: 
            radial-gradient(ellipse at 20% 20%, rgba(120, 50, 200, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, rgba(50, 100, 200, 0.2) 0%, transparent 50%),
            linear-gradient(135deg, 
                rgba(0, 0, 0, 0.8) 0%, 
                rgba(20, 5, 40, 0.6) 50%,
                rgba(0, 0, 0, 0.8) 100%);

        
        /* fade out near bottom */
        -webkit-mask-image: linear-gradient(to bottom, black 75%, transparent 100%);
                mask-image: linear-gradient(to bottom, black 75%, transparent 100%);
        pointer-events: none;
        
        
        /* Respect reduced motion preference */
        @media (prefers-reduced-motion: reduce) {
            animation: none;
            opacity: 0.7;
        }
    }
    
    /* keyframes for nebula breathing - optimized */
    @keyframes breathe {
        0%, 100% { 
            opacity: 0.5;
            transform: translateZ(0) scale(1);
        }
        50% { 
            opacity: 0.8;
            transform: translateZ(0) scale(1.05);
        }
    }
`;

// particle field for natural twinkling - optimized with CSS background stars
const ParticleField = styled.div`
    /* layout */
    inset: 0;
    z-index: 1;
    position: absolute;
    
    /* Performance optimizations */
    contain: layout style paint;
    transform: translateZ(0);
    backface-visibility: hidden;
    
    /* CSS-based starfield background - much more performant than individual divs */
    background-image:
        /* Static stars - rendered via CSS, no DOM overhead */
        radial-gradient(circle at 8% 12%, rgba(255,255,255,0.4) 0.5px, transparent 1px),
        radial-gradient(circle at 22% 88%, rgba(255,255,255,0.3) 0.5px, transparent 1px),
        radial-gradient(circle at 38% 28%, rgba(255,255,255,0.5) 0.5px, transparent 1px),
        radial-gradient(circle at 58% 72%, rgba(255,255,255,0.4) 0.5px, transparent 1px),
        radial-gradient(circle at 78% 18%, rgba(255,255,255,0.3) 0.5px, transparent 1px),
        radial-gradient(circle at 12% 58%, rgba(255,255,255,0.4) 0.5px, transparent 1px),
        radial-gradient(circle at 32% 42%, rgba(255,255,255,0.5) 0.5px, transparent 1px),
        radial-gradient(circle at 68% 92%, rgba(255,255,255,0.3) 0.5px, transparent 1px),
        radial-gradient(circle at 48% 8%, rgba(255,255,255,0.4) 0.5px, transparent 1px),
        radial-gradient(circle at 82% 52%, rgba(255,255,255,0.3) 0.5px, transparent 1px),
        radial-gradient(circle at 18% 78%, rgba(255,255,255,0.5) 0.5px, transparent 1px),
        radial-gradient(circle at 42% 92%, rgba(255,255,255,0.4) 0.5px, transparent 1px),
        radial-gradient(circle at 62% 32%, rgba(255,255,255,0.3) 0.5px, transparent 1px),
        radial-gradient(circle at 28% 3%, rgba(255,255,255,0.4) 0.5px, transparent 1px),
        radial-gradient(circle at 72% 85%, rgba(255,255,255,0.5) 0.5px, transparent 1px);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    pointer-events: none;
    
`;

// Twinkle keyframes - extracted outside component to avoid re-creation
const twinkle1 = keyframes`
        0%, 92% { opacity: 0.4; }
        93% { opacity: 1; }
        94% { opacity: 0.2; }
        95% { opacity: 1; }
        96% { opacity: 0.3; }
        97% { opacity: 0.9; }
        98% { opacity: 0.1; }
        99% { opacity: 1; }
        100% { opacity: 0.4; }
`;
    
const twinkle2 = keyframes`
        0%, 89% { opacity: 0.3; }
        90% { opacity: 0.8; }
        91% { opacity: 0.1; }
        92% { opacity: 1; }
        93% { opacity: 0.4; }
        94% { opacity: 0.9; }
        95% { opacity: 0.2; }
        96% { opacity: 1; }
        97% { opacity: 0.5; }
        100% { opacity: 0.3; }
`;
    
const twinkle3 = keyframes`
        0%, 87% { opacity: 0.5; }
        88% { opacity: 1; }
        89% { opacity: 0.2; }
        90% { opacity: 0.8; }
        91% { opacity: 0.1; }
        92% { opacity: 1; }
        93% { opacity: 0.3; }
        94% { opacity: 0.9; }
        95% { opacity: 0.1; }
        96% { opacity: 1; }
        100% { opacity: 0.5; }
`;
    
const twinkle4 = keyframes`
        0%, 91% { opacity: 0.2; }
        92% { opacity: 1; }
        93% { opacity: 0.3; }
        94% { opacity: 0.8; }
        95% { opacity: 0.1; }
        96% { opacity: 1; }
        97% { opacity: 0.4; }
        98% { opacity: 0.9; }
        99% { opacity: 0.2; }
        100% { opacity: 0.2; }
`;
    
const twinkle5 = keyframes`
        0%, 88% { opacity: 0.4; }
        89% { opacity: 0.9; }
        90% { opacity: 0.1; }
        91% { opacity: 1; }
        92% { opacity: 0.2; }
        93% { opacity: 0.8; }
        94% { opacity: 0.1; }
        95% { opacity: 1; }
        96% { opacity: 0.3; }
        100% { opacity: 0.4; }
`;
    
const twinkle6 = keyframes`
        0%, 90% { opacity: 0.3; }
        91% { opacity: 1; }
        92% { opacity: 0.1; }
        93% { opacity: 0.9; }
        94% { opacity: 0.2; }
        95% { opacity: 1; }
        96% { opacity: 0.4; }
        97% { opacity: 0.8; }
        100% { opacity: 0.3; }
`;

// star particles - optimized for performance (using CSS variables instead of props)
const Star = styled.div`
    /* layout */
    position: absolute;
    top: var(--top, 50%);
    left: var(--left, 50%);

    /* spacing */
    width: var(--size, 1px);
    height: var(--size, 1px);

    /* styles */
    background: white;
    border-radius: 50%;
    opacity: var(--opacity, 0.5);
    
    /* Simplified box-shadow - fewer layers for better performance */
    box-shadow: 0 0 4px rgba(255, 255, 255, 0.8);
    
    /* GPU-accelerated animation - using CSS classes for animation selection */
    transform: translateZ(0);
    will-change: opacity; /* Only animate opacity */
    
    /* Animation selection via CSS classes - duration passed via CSS variable */
    &.twinkle1 {
        animation: ${twinkle1} calc(var(--duration, 23.7) * 1s) ease-in-out infinite;
    }
    &.twinkle2 {
        animation: ${twinkle2} calc(var(--duration, 31.2) * 1s) ease-in-out infinite;
    }
    &.twinkle3 {
        animation: ${twinkle3} calc(var(--duration, 18.9) * 1s) ease-in-out infinite;
    }
    &.twinkle4 {
        animation: ${twinkle4} calc(var(--duration, 42.1) * 1s) ease-in-out infinite;
    }
    &.twinkle5 {
        animation: ${twinkle5} calc(var(--duration, 27.4) * 1s) ease-in-out infinite;
    }
    &.twinkle6 {
        animation: ${twinkle6} calc(var(--duration, 35.8) * 1s) ease-in-out infinite;
    }
    
    /* Pause until text animations finish */
    
    /* Respect reduced motion */
    @media (prefers-reduced-motion: reduce) {
        animation: none !important;
    }
`;

// moon component. (looks great!)
const Moon = styled.div`
    /* layout */
    position: absolute;
    top: 15%;
    right: 20%;
    z-index: 2;

    /* spacing */
    width: 80px;
    height: 80px;

    /* styles */
    border-radius: 50%;
    animation: moonFloat 15s ease-in-out infinite;
    background: radial-gradient(circle at 30% 30%, 
        rgba(255, 255, 255, 0.9) 0%,
        rgba(240, 240, 240, 0.8) 20%,
        rgba(220, 220, 220, 0.7) 40%,
        rgba(200, 200, 200, 0.6) 60%,
        rgba(180, 180, 180, 0.5) 80%,
        rgba(160, 160, 160, 0.4) 100%);
    box-shadow: 
        0 0 8px rgba(255, 255, 255, 0.2),
        0 0 16px rgba(255, 255, 255, 0.1),
        inset -8px -8px 15px rgba(0, 0, 0, 0.15);
    
    
    /* Pause until text animations finish */
    
    /* keyframes, moon float animation */
    @keyframes moonFloat {
        0%, 100% { 
            transform: translateY(0px) scale(1);
            opacity: 0.8;
        }
        50% { 
            transform: translateY(-8px) scale(1.02);
            opacity: 0.9;
        }
    }
`;

// flexible crater component for moon - optimized with CSS variables
const Crater = styled.div`
    /* layout */
    position: absolute;
    top: var(--top, 50%);
    left: var(--left, 50%);

    /* spacing */
    width: var(--size, 6px);
    height: var(--size, 6px);

    /* styles */
    border-radius: 50%;
    background: radial-gradient(circle, 
        rgba(0, 0, 0, var(--depth, 0.1)) 0%,
        rgba(0, 0, 0, var(--depth-half, 0.05)) 50%,
        transparent 100%);
    box-shadow: 0 0 var(--shadow-size, 1.8px) rgba(0, 0, 0, var(--shadow-opacity, 0.08));
`;

// astronaut - optimized animation
const Astronaut = styled.div`
    /* layout */
    top: 60%; 
    left: -10%;
    z-index: 0;
    position: absolute;

    /* spacing */
    width: 90px;
    height: 90px;

    /* styles */
    animation-delay: 6s;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    animation: astronautFloat 30s linear infinite;
    background-image: url(${astronautImg});
    
    /* GPU acceleration */
    transform: translateZ(0);
    will-change: transform;
    
    /* Simplified filter - drop-shadow is expensive, use box-shadow instead */
    filter: none;
    
    /* keyframes, rotating and floating - simplified for performance */
    @keyframes astronautFloat {
        0% {
            transform: translateZ(0) translateX(0) rotate(0deg);
        }
        50% {
            transform: translateZ(0) translateX(calc(100vw + 120px)) rotate(720deg);
        }
        100% {
            transform: translateZ(0) translateX(calc(100vw + 240px)) rotate(1440deg);
        }
    }
    
    /* pause animation during loading and until text animations finish */
    :root[data-loading="true"] & {
        animation-play-state: paused;
    }
    
    
    /* Respect reduced motion */
    @media (prefers-reduced-motion: reduce) {
        animation: none;
        transform: translateZ(0) translateX(0);
    }
`;

// ufo - optimized animation
const UFO = styled.div`
    /* layout */
    top: 20%;
    z-index: 1;
    right: -10%;
    position: absolute;

    /* spacing */
    width: 70px;
    height: 70px;

    /* styles */
    animation-delay: 8s;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    animation: ufoMove 20s linear infinite;
    background-image: url(${ufoImg});
    
    /* GPU acceleration */
    transform: translateZ(0);
    will-change: transform;
    
    /* bobbing up and down animation - GPU optimized */
    @keyframes ufoMove {
        0% {
            transform: translateZ(0) translateX(0) translateY(0);
        }
        25% {
            transform: translateZ(0) translateX(calc(-25vw - 40px)) translateY(-50px);
        }
        50% {
            transform: translateZ(0) translateX(calc(-50vw - 80px)) translateY(0);
        }
        75% {
            transform: translateZ(0) translateX(calc(-75vw - 120px)) translateY(50px);
        }
        100% {
            transform: translateZ(0) translateX(calc(-100vw - 160px)) translateY(0);
        }
    }
    
    /* pause animation during loading and until text animations finish */
    :root[data-loading="true"] & {
        animation-play-state: paused;
    }
    
    
    /* Respect reduced motion */
    @media (prefers-reduced-motion: reduce) {
        animation: none;
        transform: translateZ(0) translateX(0) translateY(0);
    }
`;

// wrapper for smooth fade-in of messages.
const MsgsWrapper = styled(motion.div)`
    /* layout */
    z-index: 15;
    width: 100%;
    height: 100%;
    contain: layout;

    /* styles */
    opacity: 0.9;
    /* will-change removed - only use when element is actively animating */
`;

// my messages container.
const Msgs = styled.div`
    /* layout */
    z-index: 15;
    width: 100%;
    display: flex;
    flex-direction: column;

    /* spacing */
    gap: 0;
    padding: 6rem 4rem;
`;

// my first message floating in "What's up!"
const SupMsg = styled(motion.div)`
    /* layout */
    z-index: 10;
    position: relative;

    /* spacing */
    margin: 0;

    /* styles */
    font-size: 5.5rem;

    /* media queries */

    @media (max-width: 1900px) { 
        font-size: 5.5rem; 
    }

    @media (max-width: 1600px) { 
        font-size: 3rem; 
    }
`;

// waving hand emoji.
const WavingHand = styled.span`
    /* layout */
    display: inline-block;
    transform-origin: 70% 70%;

    /* styles */
    animation: wave 2.5s infinite;
    
    /* keyframes, wave animation */
    @keyframes wave {
        0% { transform: rotate(0deg); }
        10% { transform: rotate(14deg); }
        20% { transform: rotate(-8deg); }
        30% { transform: rotate(14deg); }
        40% { transform: rotate(-4deg); }
        50% { transform: rotate(10deg); }
        60% { transform: rotate(0deg); }
        100% { transform: rotate(0deg); }
    }
`

// my second message floating in saying "My name's..."
const IntroNameMsg = styled(motion.div)`
    /* layout */
    z-index: 10;

    /* spacing */
    margin-top: 0.5rem;

    /* styles */
    font-size: 2.5rem;

    /* media queries */
    @media (max-width: 1900px) { 
        font-size: 2.5rem; 
    }

    @media (max-width: 1600px) { 
        font-size: 2rem; 
    }
`;

// my name!
const NameRow = styled(motion.div)`
    /* layout */
    left: 1.5vw;
    position: relative;

    /* spacing */
    margin-top: -2rem;
    margin-bottom: -1rem;

    /* styles */
    font-size: 20rem;
    text-align: center;

    /* media queries */

    @media (max-width: 1900px) { 
        font-size: 18rem; 
    }
    @media (max-width: 1599px) { 
        font-size: 16rem; 
    }
`;

const Name = styled.span`
    /* layout */
    z-index: 15;

    /* styles */
    font-weight: 900;
    background-size: 200% 100%;
    animation: gradientShift 10s linear infinite;
    background: linear-gradient(90deg, 
        rgb(0, 97, 241) 0%, 
        rgb(45, 50, 180) 15%,
        rgb(90, 0, 112) 30%, 
        rgb(120, 50, 150) 45%,
        rgb(69, 183, 209) 60%, 
        rgb(100, 200, 200) 75%,
        rgb(150, 206, 180) 90%,
        rgb(0, 97, 241) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    
    /* GPU acceleration - background-position is GPU accelerated */
    will-change: background-position;
    transform: translateZ(0);

    /* keyframes, gradient shift animation */
    @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        100% { background-position: 200% 50%; }
    }
    
    /* Pause gradient animation until text finishes sliding in */
    
    /* Respect reduced motion */
    @media (prefers-reduced-motion: reduce) {
        animation: none;
    }
`;

// lil sub msg for my name.
const SubNameMsg = styled(motion.div)`
    /* layout */
    z-index: 10;

    /* spacing */
    margin-top: -2rem;

    /* styles */
    text-align: center;
    font-style: italic;
    font-size: 2.75rem;
    color: rgba(255, 255, 255, 0.7);

    /* media queries */
    @media (max-width: 1900px) { 
        font-size: 2.75rem; 
    }
    @media (max-width: 1600px) { 
        font-size: 2.25rem; 
    }
`;

// scroll invitation message.
const ScrollInvite = styled(motion.div)`
    /* layout */
    z-index: 15;
    width: 100%;
    display: flex;
    position: relative;
    align-items: center;
    flex-direction: column;

    /* spacing */
    margin-top: 1rem;

    /* styles */
    text-align: center;
`;

// scroll text. what do you want to see?
const ScrollText = styled.div`
    /* spacing */
    width: 100%;

    /* styles */
    font-size: 2rem;
    font-style: italic;
    text-align: center;
    color: rgba(255, 255, 255, 0.6);

    /* media queries */
    @media (max-width: 1900px) { 
        font-size: 2rem; 
    }
    @media (max-width: 1600px) { 
        font-size: 1.5rem; 
    }
`;

// navigation pills container.
const NavPills = styled(motion.div)`
    /* layout */
    z-index: 10;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));

    /* spacing */
    gap: 1.5rem;
    margin: 1rem auto 0;
    width: min(80vw, 680px);
    text-align: center;
`;

// Base navigation pill styles - shared between variants
const NavPillBase = styled.button`
    /* layout */
    width: 100%;
    min-width: 0;
    display: flex;
    overflow: hidden;
    position: relative;
    align-items: center;
    justify-content: center;
    
    /* spacing */
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;

    /* styles */
    cursor: pointer;
    font: inherit;
    border-radius: 50px;
    border: 1px solid rgba(255, 255, 255, 0.05);
    /* Only transition transform and opacity for better performance */
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), 
                opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    /* GPU acceleration */
    transform: translateZ(0);
    will-change: transform;
    
    /* hover effect */
    &:hover {
        transform: translateY(-3px) scale(1.08) translateZ(0);
        box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
        border-color: rgba(255, 255, 255, 0.3);
    }
    
    &:active {
        transform: translateY(-1px) scale(1.05) translateZ(0);
        transition: all 0.1s ease;
    }
`;

// Projects variant - simplified gradient (reduced from 16 to 8 stops)
const NavPillProjects = styled(NavPillBase)`
        background: linear-gradient(to bottom,
            rgb(150, 200, 246) 0%,
        rgb(138, 194, 246) 20%,
        rgb(122, 186, 245) 40%,
        rgb(106, 178, 243) 60%,
        rgb(92, 171, 241) 80%,
        rgb(78, 164, 239) 95%,
            rgb(71, 160, 238) 100%);
        box-shadow: 0 0 20px rgba(150, 200, 246, 0.1);
`;
    
// Story variant - simplified gradient (reduced from 7 to 5 stops)
const NavPillStory = styled(NavPillBase)`
        background: linear-gradient(to bottom,
            rgb(13, 7, 27) 0%,
        rgb(30, 20, 55) 40%,
        rgb(45, 30, 80) 70%,
        rgb(85, 60, 135) 95%,
            rgb(100, 70, 150) 100%);
        box-shadow: 0 0 20px rgba(100, 70, 150, 0.1);
`;

// Cloud drift keyframe - extracted outside component
const cloudDrift = keyframes`
    0%, 100% { 
        background-position: 15% 20%, 70% 60%;
        opacity: 0.25;
    }
    50% { 
        background-position: 10% 25%, 65% 65%;
        opacity: 0.3;
    }
`;

// Star twinkle keyframes - extracted outside component
const starTwinkle = keyframes`
    0%, 100% { 
        opacity: 0.6; 
        transform: scale(1); 
    }
    50% { 
        opacity: 1; 
        transform: scale(1.2); 
    }
`;

const starField = keyframes`
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.6; }
`;

// Background effects for projects pill - separate component
const NavPillBackgroundProjects = styled.div`
    /* layout */
    inset: 0;
    position: absolute;

    /* styles */
    opacity: 0.25;
    border-radius: 50px;
    pointer-events: none;
        background-repeat: no-repeat;
        background-image: 
        url(${cloud1Img}),
        url(${cloud2Img});
    animation: ${cloudDrift} 12s ease-in-out infinite;
    background-position: 15% 20%, 70% 60%;
    background-size: 25px 15px, 20px 12px;
`;
        
// Background effects for story pill - separate component
const NavPillBackgroundStory = styled.div`
    /* layout */
    inset: 0;
    position: absolute;

    /* styles */
    opacity: 0.4;
    border-radius: 50px;
    pointer-events: none;

        /* various stars in the background, twinkling and such. */
        &::before,
        &::after {
            content: '';
            position: absolute;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 50%;
        animation: ${starTwinkle} 4s ease-in-out infinite;
        }
        
        &::before {
            width: 3px;
            height: 3px;
            top: 20%;
            left: 15%;
            animation-delay: 0s;
            box-shadow: 
                0 0 6px rgba(255, 255, 255, 0.8),
                0 0 12px rgba(255, 255, 255, 0.4);
        }
        
        &::after {
            width: 2.5px;
            height: 2.5px;
    top: 70%;
            right: 20%;
            animation-delay: 2s;
            box-shadow: 
                0 0 5px rgba(255, 255, 255, 0.8),
                0 0 10px rgba(255, 255, 255, 0.4);
        }
        
        /* additional star using background */
        background-image: 
            radial-gradient(circle at 30% 50%, rgba(255, 255, 255, 0.9) 1px, transparent 1px),
            radial-gradient(circle at 80% 30%, rgba(255, 255, 255, 0.7) 1px, transparent 1px),
            radial-gradient(circle at 60% 80%, rgba(255, 255, 255, 0.8) 1px, transparent 1px);
        background-size: 100% 100%, 100% 100%, 100% 100%;
    animation: ${starField} 8s ease-in-out infinite;
`;

// pill text.
const NavPillText = styled.span`
    /* layout */
    z-index: 2;
    position: relative;

    /* styles */
    color: white;
    font-size: 1rem;
    font-family: inherit;
    font-weight: 500;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
`;

// pill icon.
const NavPillIcon = styled.span`
    /* layout */
    z-index: 2;
    position: relative;

    /* styles */
    font-size: 1.2rem;
    filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.3));
`;

// arrow text. ("scroll to explore")
const ArrowText = styled.div`
    /* spacing */
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;

    /* styles */
    opacity: 0.7;
    font-size: 0.9rem;
    font-style: italic;
    transition: opacity 0.3s ease;
    color: rgba(255, 255, 255, 0.6);
`;

// arrow container.
const ArrowIcon = styled.div`
    /* layout */
    position: relative;
    width: 40px;
    height: 60px;
`;

// svg for arrow, constellation style.
const SimpleArrowSvg = styled.svg`
    /* layout */
    width: 100%;
    height: 100%;
    display: block;
    animation: floatUpDown 3s ease-in-out infinite;

    /* styles */
    .star {
        fill: #fff;
        transform-origin: center;
        filter: drop-shadow(0 0 3px rgba(150,200,255,.4));
    }

    .line {
        stroke: rgba(255, 255, 255, 0.3);
        stroke-width: 1;
        stroke-linecap: round;
    }

    /* keyframes for floating up and down */
    @keyframes floatUpDown {
        0%, 100% { 
            transform: translateY(0px); 
        }
        50% { 
            transform: translateY(-4px); 
        }
    }
`;

// arrow svg.
const ConstellationArrowDown = () => (
    <SimpleArrowSvg viewBox="0 0 40 60" aria-hidden="true">
        {/* connecting lines */}
        <line className="line" x1="20" y1="10" x2="20" y2="20" />
        <line className="line" x1="20" y1="20" x2="20" y2="30" />
        <line className="line" x1="20" y1="30" x2="20" y2="40" />
        <line className="line" x1="20" y1="40" x2="20" y2="50" />
        <line className="line" x1="20" y1="50" x2="7.5" y2="37.5" />
        <line className="line" x1="20" y1="50" x2="32.5" y2="37.5" />
        
        {/* stars */}
        {/* tip (bottom) */}
        <circle className="star" cx="20" cy="50" r="2.0" />
        {/* arrowhead */}
        <circle className="star" cx="7.5" cy="37.5" r="1.8" />
        <circle className="star" cx="32.5" cy="37.5" r="1.8" />
        {/* shaft dots */}
        <circle className="star" cx="20" cy="40" r="1.7" />
        <circle className="star" cx="20" cy="30" r="1.7" />
        <circle className="star" cx="20" cy="20" r="1.6" />
        <circle className="star" cx="20" cy="10" r="1.8" />
    </SimpleArrowSvg>
);

// simple arrow container.
const SimpleArrow = styled(motion.div)`
    /* layout */
    display: flex;
    align-items: center;
    flex-direction: column;

    /* spacing */
    margin-top: 0.5rem;

    /* styles */
    transition: all 0.3s ease;
`;