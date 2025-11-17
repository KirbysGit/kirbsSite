// hero.jsx

// main hero component upon load.
// idea is to introduce me, create a smooth animation welcome, and an invitation to scroll down.
// starting off with the space theme and moving downwards.
// had idea of adding some more stuff in background, thinking ufo, astronaut, and maybe one more thing.

// imports.
import { motion } from 'framer-motion';
import styled, { keyframes } from 'styled-components';
import React, { memo, useCallback, useMemo } from 'react';

// utils.
import { scrollToSection } from '../../utils/scrollToSection';

// config.
import { getHeroAnimationConfigs } from './HeroConfig';

// images.
import ufoImg from '@/images/1hero/ufo.png';
import astronautImg from '@/images/1hero/astronaut.png';
import cloud1Img from '@/images/3experience/clouds/cloud1.png';
import cloud2Img from '@/images/3experience/clouds/cloud2.png';

/* ================== main component ================== */

const Hero = memo(({ isLoading = true, loadingCompleteTime = null }) => {
    
    // track when loading is complete and animations can start.
    const [loadingComplete, setLoadingComplete] = React.useState(false);
    
    // when loading screen finishes, allow animations to start.
    React.useEffect(() => {
        if (!isLoading && !loadingComplete) {
            setLoadingComplete(true);
        }
    }, [isLoading, loadingComplete]);
            
    // memoized smooth scroll function using shared utility.
    const handleScrollToSection = useCallback((sectionId, desktopOffset = 0, mobileOffset = 0) => {
        scrollToSection(sectionId, desktopOffset, mobileOffset);
    }, []);
    
    // memoize animation configs, only animate after loading completes.
    const animationConfigs = useMemo(
        () => getHeroAnimationConfigs(loadingComplete),
        [loadingComplete]
    );
    
    // animation configs for cleanliness.
    const {
        msgWrapperConfig,
        supMsgConfig,
        introNameConfig,
        nameRowConfig,
        subNameConfig,
        scrollInviteConfig,
        navPillsConfig,
        arrowConfig
    } = animationConfigs;

    return (
        <HeroContainer id="hero" data-section-snap $isLoading={isLoading}>
            
            {/* starfield (optimized for performance aka got rid of all the individual stars) */}
            <ParticleField className="twinkles">
                {/* reduced down to 3 stars */}
                <Star style={{ '--top': '15%', '--left': '25%', '--size': '2px', '--opacity': '0.6', '--duration': '23.7' }} className="twinkle1" />
                <Star style={{ '--top': '45%', '--left': '65%', '--size': '1px', '--opacity': '0.7', '--duration': '31.2' }} className="twinkle2" />
                <Star style={{ '--top': '75%', '--left': '35%', '--size': '2px', '--opacity': '0.8', '--duration': '18.9' }} className="twinkle3" />
                
                {/* moon (thinking bout adding some more to it, like a guy waving on it) */}
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

                        {/* sub name message */}
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
                                <NavPillProjects onClick={() => handleScrollToSection('experience', 20, -110)}>
                                    <NavPillBackgroundProjects />
                                    <NavPillText>Strictly business</NavPillText>
                                    <NavPillIcon>✈️</NavPillIcon>
                                </NavPillProjects>
                                {/* who even are you? (tim robinson type shi) */}
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

/* ====================== styled ====================== */

// entire container for the hero content.
const HeroContainer = styled.div`
    /* layout */
    z-index: 1;
    display: flex;
    overflow: hidden;
    min-height: 100vh;
    will-change: auto;
    isolation: isolate;
    position: relative;
    transform: translateZ(0);
    backface-visibility: hidden;
    contain: layout style paint;
    -webkit-backface-visibility: hidden;
    
    /* spacing */
    padding-top: 1rem;
    
    /* styles */
    background: radial-gradient(ellipse at center, 
        rgba(20, 5, 40, 0.8) 0%, 
        rgba(0, 0, 0, 0.9) 30%, 
        rgba(13, 7, 27, 1) 70%);
    
    /* loading states */
    :root[data-loading="true"] & {
        position: relative;
        height: 100vh;
        max-height: 100vh;
        opacity: 0;
        pointer-events: none;
    }
    
    :root[data-loading="false"] & {
        opacity: 1;
        pointer-events: auto;
        transition: opacity 0.5s ease-in;
    }
    
    /* pseudo-elements */
    &::after {
        /* layout */
        inset: 0;
        content: '';
        position: absolute;
        z-index: 0;
        
        /* styles */
        opacity: 0.7;
        animation: breathe 10s ease-in-out infinite;
        transform: translateZ(0);
        will-change: opacity, transform;
        background: 
            radial-gradient(ellipse at 20% 20%, rgba(120, 50, 200, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, rgba(50, 100, 200, 0.2) 0%, transparent 50%),
            linear-gradient(135deg, 
                rgba(0, 0, 0, 0.8) 0%, 
                rgba(20, 5, 40, 0.6) 50%,
                rgba(0, 0, 0, 0.8) 100%);
        -webkit-mask-image: linear-gradient(to bottom, black 75%, transparent 100%);
        mask-image: linear-gradient(to bottom, black 75%, transparent 100%);
        pointer-events: none;
        
        /* media queries */
        @media (prefers-reduced-motion: reduce) {
            animation: none;
            opacity: 0.7;
        }
    }
    
    /* keyframes */
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
    
    /* media queries */
    @media (max-width: 768px) {
        padding-top: 0.5rem;
    }
    
    @media (max-width: 480px) {
        padding-top: 0.25rem;
    }
`;

// particle field for natural twinkling - optimized with CSS background stars.
const ParticleField = styled.div`
    /* layout */
    inset: 0;
    z-index: 1;
    position: absolute;
    transform: translateZ(0);
    backface-visibility: hidden;
    contain: layout style paint;
    
    /* styles */
    background-image:
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

/* ============ animated keyframes ============ */

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

/* ==== twinkles ==== */

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


/* ============ hero bg components ============ */

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
    will-change: opacity;
    transform: translateZ(0);
    opacity: var(--opacity, 0.5);
    box-shadow: 0 0 4px rgba(255, 255, 255, 0.8);
    
    /* animation classes */
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
    
    /* media queries */
    @media (prefers-reduced-motion: reduce) {
        animation: none !important;
    }
`;

const Moon = styled.div`
    /* layout */
    top: 15%;
    right: 20%;
    z-index: 2;
    position: absolute;
    
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
    
    /* keyframes */
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
    
    /* media queries */
    @media (max-width: 768px) {
        width: 60px;
        height: 60px;
        top: 12%;
        right: 15%;
    }
    
    @media (max-width: 480px) {
        width: 45px;
        height: 45px;
        top: 10%;
        right: 10%;
    }
`;

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
    filter: none;
    animation-delay: 6s;
    will-change: transform;
    background-size: contain;
    transform: translateZ(0);
    background-position: center;
    background-repeat: no-repeat;
    background-image: url(${astronautImg});
    animation: astronautFloat 30s linear infinite;
    
    /* loading states */
    :root[data-loading="true"] & {
        animation-play-state: paused;
    }
    
    /* keyframes */
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
    
    /* media queries */
    @media (max-width: 768px) {
        width: 70px;
        height: 70px;
    }
    
    @media (max-width: 480px) {
        width: 55px;
        height: 55px;
    }
    
    @media (prefers-reduced-motion: reduce) {
        animation: none;
        transform: translateZ(0) translateX(0);
    }
`;

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
    will-change: transform;
    transform: translateZ(0);
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url(${ufoImg});
    animation: ufoMove 20s linear infinite;
    
    /* loading states */
    :root[data-loading="true"] & {
        animation-play-state: paused;
    }
    
    /* keyframes */
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
    
    /* media queries */
    @media (max-width: 768px) {
        width: 55px;
        height: 55px;
    }
    
    @media (max-width: 480px) {
        width: 45px;
        height: 45px;
    }
    
    @media (prefers-reduced-motion: reduce) {
        animation: none;
        transform: translateZ(0) translateX(0) translateY(0);
    }
`;

/* ============ messages ============ */

const MsgsWrapper = styled(motion.div)`
    /* layout */
    z-index: 15;
    width: 100%;
    height: 100%;
    contain: layout;

    /* styles */
    opacity: 0.9;
`;

const Msgs = styled.div`
    /* layout */
    z-index: 15;
    width: 100%;
    display: flex;
    flex-direction: column;

    /* spacing */
    gap: 0;
    padding: 6rem 4rem;
    
    /* media queries */
    @media (max-width: 768px) {
        padding: 5rem 2rem 4rem 2rem;
    }
    
    @media (max-width: 480px) {
        padding: 4.5rem 1.5rem 3rem 1.5rem;
    }
`;

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
    
    @media (max-width: 768px) {
        font-size: 2.5rem;
    }
    
    @media (max-width: 480px) {
        font-size: 2rem;
    }
`;

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
`;

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
    
    @media (max-width: 768px) {
        font-size: 1.5rem;
    }
    
    @media (max-width: 480px) {
        font-size: 1.25rem;
    }
`;

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
    
    @media (max-width: 768px) {
        font-size: 10rem;
        left: 0;
        margin-top: -1rem;
        margin-bottom: -0.5rem;
    }
    
    @media (max-width: 480px) {
        font-size: 7rem;
        left: 0;
        margin-top: -0.5rem;
        margin-bottom: 0;
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
    transform: translateZ(0);
    will-change: background-position;
    
    /* keyframes */
    @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        100% { background-position: 200% 50%; }
    }
    
    /* media queries */
    @media (prefers-reduced-motion: reduce) {
        animation: none;
    }
`;

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
    
    @media (max-width: 768px) {
        font-size: 1.5rem;
        margin-top: -1rem;
    }
    
    @media (max-width: 480px) {
        font-size: 1.1rem;
        margin-top: -0.5rem;
    }
`;

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
    
    @media (max-width: 768px) {
        font-size: 1.1rem;
    }
    
    @media (max-width: 480px) {
        font-size: 0.95rem;
    }
`;

/* ============ prompt pills ============ */

const NavPills = styled(motion.div)`
    /* layout */
    z-index: 10;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));

    /* spacing */
    gap: 1.5rem;
    text-align: center;
    margin: 1rem auto 0;
    width: min(80vw, 680px);
    
    /* media queries */
    @media (max-width: 768px) {
        gap: 1rem;
        width: min(90vw, 500px);
        margin: 0.75rem auto 0;
    }
    
    @media (max-width: 480px) {
        /* stack pill vertically on mobile. */
        grid-template-columns: 1fr;
        gap: 0.75rem;
        width: 85vw;
        margin: 0.5rem auto 0;
    }
`;

// base navigation pill styles - shared between variants.
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
    will-change: transform;
    transform: translateZ(0);
    border: 1px solid rgba(255, 255, 255, 0.05);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), 
                opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    &:hover {
        transform: translateY(-3px) scale(1.08) translateZ(0);
        box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
        border-color: rgba(255, 255, 255, 0.3);
    }
    
    &:active {
        transform: translateY(-1px) scale(1.05) translateZ(0);
        transition: all 0.1s ease;
    }
    
    /* media queries */
    @media (max-width: 768px) {
        padding: 0.65rem 1.25rem;
        gap: 0.4rem;
    }
    
    @media (max-width: 480px) {
        padding: 0.6rem 1rem;
        gap: 0.35rem;
    }
`;

const NavPillProjects = styled(NavPillBase)`
    /* styles */
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
    
const NavPillStory = styled(NavPillBase)`
    /* styles */
    background: linear-gradient(to bottom,
        rgb(13, 7, 27) 0%,
        rgb(30, 20, 55) 40%,
        rgb(45, 30, 80) 70%,
        rgb(85, 60, 135) 95%,
        rgb(100, 70, 150) 100%);
    box-shadow: 0 0 20px rgba(100, 70, 150, 0.1);
`;

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
        
const NavPillBackgroundStory = styled.div`
    /* layout */
    inset: 0;
    position: absolute;
    
    /* styles */
    opacity: 0.4;
    border-radius: 50px;
    pointer-events: none;
    background-image: 
        radial-gradient(circle at 30% 50%, rgba(255, 255, 255, 0.9) 1px, transparent 1px),
        radial-gradient(circle at 80% 30%, rgba(255, 255, 255, 0.7) 1px, transparent 1px),
        radial-gradient(circle at 60% 80%, rgba(255, 255, 255, 0.8) 1px, transparent 1px);
    background-size: 100% 100%, 100% 100%, 100% 100%;
    animation: ${starField} 8s ease-in-out infinite;
    
    /* pseudo-elements */
    &::before,
    &::after {
        /* layout */
        content: '';
        position: absolute;
        
        /* styles */
        background: rgba(255, 255, 255, 0.8);
        border-radius: 50%;
        animation: ${starTwinkle} 4s ease-in-out infinite;
    }
    
    &::before {
        /* layout */
        top: 20%;
        left: 15%;
        
        /* spacing */
        width: 3px;
        height: 3px;
        
        /* styles */
        animation-delay: 0s;
        box-shadow: 
            0 0 6px rgba(255, 255, 255, 0.8),
            0 0 12px rgba(255, 255, 255, 0.4);
    }
    
    &::after {
        /* layout */
        top: 70%;
        right: 20%;
        
        /* spacing */
        width: 2.5px;
        height: 2.5px;
        
        /* styles */
        animation-delay: 2s;
        box-shadow: 
            0 0 5px rgba(255, 255, 255, 0.8),
            0 0 10px rgba(255, 255, 255, 0.4);
    }
`;

const NavPillText = styled.span`
    /* layout */
    z-index: 2;
    position: relative;

    /* styles */
    color: white;
    font-size: 1rem;
    font-weight: 500;
    font-family: inherit;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    
    /* media queries */
    @media (max-width: 768px) {
        font-size: 0.9rem;
    }
    
    @media (max-width: 480px) {
        font-size: 0.8rem;
    }
`;

const NavPillIcon = styled.span`
    /* layout */
    z-index: 2;
    position: relative;

    /* styles */
    font-size: 1.2rem;
    filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.3));
    
    /* media queries */
    @media (max-width: 768px) {
        font-size: 1.1rem;
    }
    
    @media (max-width: 480px) {
        font-size: 1rem;
    }
`;

/* ============ constellation arrow ============ */

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
    
    /* media queries */
    @media (max-width: 768px) {
        font-size: 0.8rem;
        margin-top: 0.4rem;
        margin-bottom: 0.4rem;
    }
    
    @media (max-width: 480px) {
        font-size: 0.75rem;
        margin-top: 0.3rem;
        margin-bottom: 0.3rem;
    }
`;

const ArrowIcon = styled.div`
    /* layout */
    position: relative;
    width: 40px;
    height: 60px;
    
    /* media queries */
    @media (max-width: 768px) {
        width: 35px;
        height: 50px;
    }
    
    @media (max-width: 480px) {
        width: 30px;
        height: 45px;
    }
`;

const SimpleArrowSvg = styled.svg`
    /* layout */
    width: 100%;
    height: 100%;
    display: block;
    animation: floatUpDown 3s ease-in-out infinite;
    
    /* pseudo-elements */
    .star {
        /* styles */
        fill: #fff;
        transform-origin: center;
        filter: drop-shadow(0 0 3px rgba(150,200,255,.4));
    }
    
    .line {
        /* styles */
        stroke: rgba(255, 255, 255, 0.3);
        stroke-width: 1;
        stroke-linecap: round;
    }
    
    /* keyframes */
    @keyframes floatUpDown {
        0%, 100% { 
            transform: translateY(0px); 
        }
        50% { 
            transform: translateY(-4px); 
        }
    }
`;

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
