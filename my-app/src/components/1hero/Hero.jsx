// hero.jsx

// main hero component upon load.
// idea is to introduce me, create a smooth animation welcome, and an invitation to scroll down.
// starting off with the space theme and moving downwards.
// had idea of adding some more stuff in background, thinking ufo, astronaut, and maybe one more thing.

// imports.
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// hero component.
const Hero = () => {
    
    // smooth scroll function with media query-aware offset
    const scrollToSection = (sectionId, desktopOffset = 0, mobileOffset = 0) => {
        const element = document.getElementById(sectionId);
        if (element) {
            // get responsive offset based on screen width.
            const getOffset = () => {
                const width = window.innerWidth;
                if (width >= 2000) return desktopOffset;
                if (width >= 1600) return mobileOffset;
                return mobileOffset;
            };
            
            // get the offset.
            const offset = getOffset();
            
            // get the element position.
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            
            // scroll to the offset position.
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <HeroContainer>
            
            {/* stars in the background */}
            <ParticleField className="twinkles">
                {/* simplified starfield - reduced for performance */}
                <Star $top="8%" $left="12%" $animation="steady" $duration="0" $opacity="0.4" $size="1px" />
                <Star $top="22%" $left="88%" $animation="steady" $duration="0" $opacity="0.3" $size="1px" />
                <Star $top="38%" $left="28%" $animation="steady" $duration="0" $opacity="0.5" $size="1px" />
                <Star $top="58%" $left="72%" $animation="steady" $duration="0" $opacity="0.4" $size="1px" />
                <Star $top="78%" $left="18%" $animation="steady" $duration="0" $opacity="0.3" $size="1px" />
                <Star $top="12%" $left="58%" $animation="steady" $duration="0" $opacity="0.4" $size="1px" />
                <Star $top="32%" $left="42%" $animation="steady" $duration="0" $opacity="0.5" $size="1px" />
                <Star $top="68%" $left="92%" $animation="steady" $duration="0" $opacity="0.3" $size="1px" />
                <Star $top="48%" $left="8%" $animation="steady" $duration="0" $opacity="0.4" $size="1px" />
                <Star $top="82%" $left="52%" $animation="steady" $duration="0" $opacity="0.3" $size="1px" />
                <Star $top="18%" $left="78%" $animation="steady" $duration="0" $opacity="0.5" $size="1px" />
                <Star $top="42%" $left="92%" $animation="steady" $duration="0" $opacity="0.4" $size="1px" />
                <Star $top="62%" $left="32%" $animation="steady" $duration="0" $opacity="0.3" $size="1px" />
                <Star $top="28%" $left="3%" $animation="steady" $duration="0" $opacity="0.4" $size="1px" />
                <Star $top="72%" $left="85%" $animation="steady" $duration="0" $opacity="0.5" $size="1px" />
                
                {/* starts that occassionally twinkle (wanted to make them look more realistic and catch the user's eye) */}
                <Star $top="15%" $left="25%" $animation="twinkle1" $duration="23.7" $opacity="0.6" $size="2px" />
                <Star $top="45%" $left="65%" $animation="twinkle2" $duration="31.2" $opacity="0.7" $size="1px" />
                <Star $top="75%" $left="35%" $animation="twinkle3" $duration="18.9" $opacity="0.8" $size="2px" />
                <Star $top="25%" $left="75%" $animation="twinkle4" $duration="42.1" $opacity="0.5" $size="1px" />
                <Star $top="55%" $left="15%" $animation="twinkle5" $duration="27.4" $opacity="0.9" $size="2px" />
                <Star $top="85%" $left="85%" $animation="twinkle6" $duration="35.8" $opacity="0.6" $size="1px" />
                <Star $top="35%" $left="45%" $animation="twinkle1" $duration="19.6" $opacity="0.7" $size="2px" />
                <Star $top="65%" $left="95%" $animation="twinkle2" $duration="38.3" $opacity="0.4" $size="1px" />
                <Star $top="12%" $left="68%" $animation="twinkle3" $duration="25.1" $opacity="0.8" $size="1px" />
                <Star $top="88%" $left="22%" $animation="twinkle4" $duration="29.7" $opacity="0.5" $size="2px" />
                <Star $top="42%" $left="88%" $animation="twinkle5" $duration="33.4" $opacity="0.6" $size="1px" />
                <Star $top="68%" $left="12%" $animation="twinkle6" $duration="21.8" $opacity="0.7" $size="2px" />
                
                {/* moon (thinking bout adding some more to it, like a guy waving on it */}
                <Moon>
                    <Crater $top="15%" $left="55%" $size="6px" $depth="0.1" />
                    <Crater $top="60%" $left="25%" $size="10px" $depth="0.08" />
                    <Crater $top="35%" $left="15%" $size="4px" $depth="0.12" />
                    <Crater $top="70%" $left="70%" $size="7px" $depth="0.09" />
                    <Crater $top="25%" $left="35%" $size="8px" $depth="0.15" />
                    <Crater $top="45%" $left="60%" $size="12px" $depth="0.12" />
                    <Crater $top="80%" $left="40%" $size="5px" $depth="0.11" />
                </Moon>
                
            </ParticleField>

            {/* floating confused astronaut */}
            <Astronaut />
            
            {/* floating UFO */}
            <UFO />

            {/* original messages upon load - delayed slide in */}
                <MsgsWrapper
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                >
                    <Msgs>
                        {/* what's up! message */}
                        <SupMsg
                            initial={{ x: -500, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
                        >
                            What's up! 
                            <WavingHand>👋</WavingHand>
                        </SupMsg>

                        {/* my name's... message */}
                        <IntroNameMsg
                            initial={{ x: -500, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 1.8, duration: 1.2, ease: "easeOut" }}
                        >
                            My name's
                        </IntroNameMsg>

                        {/* my name */}
                        <NameRow
                            initial={{ x: -500, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 2.8, duration: 1.2, ease: "easeOut" }}
                        >
                            <Name className="nameGradient">Colin Kirby</Name>
                        </NameRow>

                        {/* sub name message*/}
                        <SubNameMsg
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 3.8, duration: 1.2, ease: "easeOut" }}
                        >
                            <b>* Most people just call me Kirby</b>
                        </SubNameMsg>

                        {/* scroll invitation message */}
                    {/* give the user options to navigate the site */}
                        <ScrollInvite
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 4.8, duration: 1.2, ease: "easeOut" }}
                    >
                        {/* cta */}
                        <ScrollText>What do you want to see?</ScrollText>
                        
                        {/* navigation pills */}
                        <NavPills
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 5.4, duration: 1.2, ease: "easeOut" }}
                        >
                            {/* strictly business thing (want to make it strickly biznus but might be a bit too jokey)*/}
                            {/* Adjust the first number for 2000px+, second for 1600-1999px */}
                            <NavPill $variant="projects" onClick={() => scrollToSection('experience', 20, -110)}>
                                <NavPillBackground $variant="projects" />
                                <NavPillText>Strictly business</NavPillText>
                                <NavPillIcon>✈️</NavPillIcon>
                            </NavPill>
                            {/* who even are you? (tim robinson type shi) */}
                            {/* Adjust the first number for 2000px+, second for 1600-1999px */}
                            <NavPill $variant="story" onClick={() => scrollToSection('who-i-am', -25, -35)}>
                                <NavPillBackground $variant="story" />
                                <NavPillText>Who even are you?</NavPillText>
                                <NavPillIcon>👨‍🚀</NavPillIcon>
                            </NavPill>
                        </NavPills>
                        
                        {/* constellation arrow */}
                        <SimpleArrow
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 6.0, duration: 1.0, ease: "easeOut" }}
                        >
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
}

/* ========== styled ========== */

// entire container for the hero content.
const HeroContainer = styled.div`
    /* layout */
    display: flex;
    overflow: hidden;
    min-height: 100vh;
    position: relative;

    /* styles */ 
    background: radial-gradient(ellipse at center, 
        rgba(20, 5, 40, 0.8) 0%, 
        rgba(0, 0, 0, 0.9) 30%, 
        rgba(13, 7, 27, 1) 70%);
    
    /* breathing nebula effect (looks so cool) */
    &::after {
        /* layout */
        inset: 0;
        content: '';
        position: absolute;

        /* styles */
        opacity: 0.7;
        will-change: opacity, transform;
        animation: breathe 10s ease-in-out infinite;
        background: 
            radial-gradient(ellipse at 20% 20%, rgba(120, 50, 200, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, rgba(50, 100, 200, 0.2) 0%, transparent 50%),
            radial-gradient(ellipse at 40% 60%, rgba(200, 50, 150, 0.15) 0%, transparent 50%),
            linear-gradient(135deg, 
                rgba(0, 0, 0, 0.8) 0%, 
                rgba(20, 5, 40, 0.6) 25%,
                rgba(40, 10, 80, 0.4) 50%,
                rgba(20, 5, 40, 0.6) 75%,
                rgba(0, 0, 0, 0.8) 100%);

        
        /* fade out near bottom */
        -webkit-mask-image: linear-gradient(to bottom, black 75%, transparent 100%);
                mask-image: linear-gradient(to bottom, black 75%, transparent 100%);
        pointer-events: none;
    }
    
    /* keyframes for nebula breathing*/
    @keyframes breathe {
        0%, 100% { 
            opacity: 0.5;
            transform: scale(1);
        }
        50% { 
            opacity: 0.8;
            transform: scale(1.05);
        }
    }
`;

// particle field for natural twinkling.
const ParticleField = styled.div`
    /* layout */
    inset: 0;
    z-index: 1;
    position: absolute;
`;

// star particles.
const Star = styled.div`
    /* layout */
    position: absolute;
    top: ${props => props.$top};
    left: ${props => props.$left};

    /* spacing */
    width: ${props => props.$size || '1px'};
    height: ${props => props.$size || '1px'};

    /* styles */
    background: white;
    border-radius: 50%;
    opacity: ${props => props.$opacity};
    box-shadow: 
        0 0 3px rgba(255, 255, 255, 0.9),
        0 0 6px rgba(255, 255, 255, 0.6),
        0 0 9px rgba(255, 255, 255, 0.3);
    animation: ${props => props.$animation} ${props => props.$duration}s ease-in-out infinite;
    
    /* keyframes, twinkle animations, diff types of twinkling so it doesn't look uniform */
    @keyframes twinkle1 {
        0%, 92% { opacity: 0.4; }
        93% { opacity: 1; }
        94% { opacity: 0.2; }
        95% { opacity: 1; }
        96% { opacity: 0.3; }
        97% { opacity: 0.9; }
        98% { opacity: 0.1; }
        99% { opacity: 1; }
        100% { opacity: 0.4; }
    }
    
    @keyframes twinkle2 {
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
    }
    
    @keyframes twinkle3 {
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
    }
    
    @keyframes twinkle4 {
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
    }
    
    @keyframes twinkle5 {
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
    }
    
    @keyframes twinkle6 {
        0%, 90% { opacity: 0.3; }
        91% { opacity: 1; }
        92% { opacity: 0.1; }
        93% { opacity: 0.9; }
        94% { opacity: 0.2; }
        95% { opacity: 1; }
        96% { opacity: 0.4; }
        97% { opacity: 0.8; }
        100% { opacity: 0.3; }
    }
    
    @keyframes steady {
        0%, 100% { opacity: 0.4; }
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

// flexible crater component for moon.
const Crater = styled.div`
    /* layout */
    position: absolute;
    top: ${props => props.$top};
    left: ${props => props.$left};

    /* spacing */
    width: ${props => props.$size};
    height: ${props => props.$size};

    /* styles */
    border-radius: 50%;
    background: radial-gradient(circle, 
        rgba(0, 0, 0, ${props => props.$depth}) 0%,
        rgba(0, 0, 0, ${props => props.$depth * 0.5}) 50%,
        transparent 100%);
    box-shadow: 0 0 ${props => parseFloat(props.$size) * 0.3}px rgba(0, 0, 0, ${props => props.$depth * 0.8});
`;

// astronaut.
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
    animation: astronautFloat 35s linear infinite;
    background-image: url('src/images/1hero/astronaut.png');
    filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.15));
    
    /* keyframes, rotating and floating */
    @keyframes astronautFloat {
        0% {
            transform: translateX(0) rotate(0deg);
        }
        50% {
            transform: translateX(calc(100vw + 120px)) rotate(720deg); /* 2 full rotations */
        }
        100% {
            transform: translateX(calc(100vw + 240px)) rotate(1440deg); /* 4 full rotations */
        }
    }
    
    /* pause animation during loading */
    :root[data-loading="true"] & {
        animation-play-state: paused;
    }
`;

// ufo.
const UFO = styled.div`
    /* layout */
    top: 10%;
    z-index: 0;
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
    background-image: url('src/images/1hero/ufo.png');
    
    /* bobbing up and down animation */
    @keyframes ufoMove {
        0% {
            transform: translateX(0) translateY(0);
        }
        25% {
            transform: translateX(calc(-25vw - 40px)) translateY(-50px);
        }
        50% {
            transform: translateX(calc(-50vw - 80px)) translateY(0);
        }
        75% {
            transform: translateX(calc(-75vw - 120px)) translateY(50px);
        }
        100% {
            transform: translateX(calc(-100vw - 160px)) translateY(0);
        }
    }
    
    /* pause animation during loading */
    :root[data-loading="true"] & {
        animation-play-state: paused;
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
    will-change: transform, opacity;
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

    /* keyframes, gradient shift animation */
    @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        100% { background-position: 200% 50%; }
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

// navigation pill.
const NavPill = styled.button`
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
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.05);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    background: transparent;
    
    /* gradient background based on variant */

    /* projects variant, sky style for background of Projects.jsx. */
    ${props => props.$variant === 'projects' && `
        background: linear-gradient(to bottom,
            rgb(150, 200, 246) 0%,
            rgb(145, 198, 246) 6%,
            rgb(138, 194, 246) 12%,
            rgb(130, 190, 246) 18%,
            rgb(122, 186, 245) 24%,
            rgb(114, 182, 244) 32%,
            rgb(106, 178, 243) 40%,
            rgb(98, 174, 242) 48%,
            rgb(92, 171, 241) 56%,
            rgb(86, 168, 240) 64%,
            rgb(82, 166, 239) 72%,
            rgb(78, 164, 239) 80%,
            rgb(75, 162, 238) 88%,
            rgb(73, 161, 238) 94%,
            rgb(72, 160, 238) 97%,
            rgb(71, 160, 238) 100%);
        box-shadow: 0 0 20px rgba(150, 200, 246, 0.1);
    `}
    
    /* story variant, spacey style for background of Story.jsx. */
    ${props => props.$variant === 'story' && `
        background: linear-gradient(to bottom,
            rgb(13, 7, 27) 0%,
            rgb(13, 7, 27) 25%,
            rgb(30, 20, 55) 50%,
            rgb(45, 30, 80) 65%,
            rgb(65, 45, 110) 80%,
            rgb(85, 60, 135) 90%,
            rgb(100, 70, 150) 100%);
        box-shadow: 0 0 20px rgba(100, 70, 150, 0.1);
    `}
    
    /* hover effect */
    &:hover {
        transform: translateY(-3px) scale(1.08);
        box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
        border-color: rgba(255, 255, 255, 0.3);
    }
    
    &:active {
        transform: translateY(-1px) scale(1.05);
        transition: all 0.1s ease;
    }
`;

// background effects for the pills. (clouds for projects, stars for story)
const NavPillBackground = styled.div`
    /* layout */
    inset: 0;
    position: absolute;

    /* styles */
    opacity: 0.4;
    border-radius: 50px;
    pointer-events: none;
    
    /* cloud effects for projects */
    ${props => props.$variant === 'projects' && `
        /* styles */
        opacity: 0.25;
        background-repeat: no-repeat;
        background-image: 
            url('src/images/clouds/cloud1.png'),
            url('src/images/clouds/cloud2.png'),
            url('src/images/clouds/cloud3.png');
        animation: cloudDrift 12s ease-in-out infinite;
        background-position: 15% 20%, 70% 60%, 40% 80%;
        background-size: 25px 15px, 20px 12px, 18px 10px;
        
        /* keyframes, small cloud drifting (might get rid of honestly) */
        @keyframes cloudDrift {
            0%, 100% { 
                background-position: 15% 20%, 70% 60%, 40% 80%;
                opacity: 0.25;
            }
            25% { 
                background-position: 20% 15%, 75% 55%, 45% 75%;
                opacity: 0.35;
            }
            50% { 
                background-position: 10% 25%, 65% 65%, 35% 85%;
                opacity: 0.3;
            }
            75% { 
                background-position: 18% 18%, 72% 58%, 42% 78%;
                opacity: 0.28;
            }
        }
    `}
    
    /* star effects for story */
    ${props => props.$variant === 'story' && `

        /* various stars in the background, twinkling and such. */
        &::before,
        &::after {
            content: '';
            position: absolute;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 50%;
            animation: starTwinkle 4s ease-in-out infinite;
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
        animation: starField 8s ease-in-out infinite;
        
        /* keyframes, star twinkling animation */
        @keyframes starTwinkle {
            0%, 100% { 
                opacity: 0.6; 
                transform: scale(1); 
            }
            25% { 
                opacity: 1; 
                transform: scale(1.3); 
            }
            50% { 
                opacity: 0.8; 
                transform: scale(0.9); 
            }
            75% { 
                opacity: 1; 
                transform: scale(1.1); 
            }
        }
        
        @keyframes starField {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.6; }
        }
    `}
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
    margin-top: 1rem;
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

// export component.
export default Hero;