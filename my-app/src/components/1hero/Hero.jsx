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
const Hero = ({ hiddenWhileLoading = false }) => {
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
                
                {/* moon (want to add a guy on it, or like an alien) */}
                <Moon>
                    <Crater1 />
                    <Crater2 />
                    <Crater3 />
                    <Crater4 />
                </Moon>
                
                {/* floating astronaut */}
                
            </ParticleField>

            <Astronaut />
            
            {/* floating UFO */}
            <UFO />

            {/* original messages upon load - always rendered for stable layout */}
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
                        {/* might give the user options like "strictly business" or "learn about me" */}
                        <ScrollInvite
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 4.8, duration: 1.2, ease: "easeOut" }}
                        >
                            <ScrollText>What do you want to see?</ScrollText>
                            
                            {/* navigation pills */}
                            <NavPills
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 5.4, duration: 1.2, ease: "easeOut" }}
                            >
                                <NavPill $variant="projects">
                                    <NavPillBackground $variant="projects" />
                                    <NavPillText>Straight to biznus</NavPillText>
                                    <NavPillIcon>🚀</NavPillIcon>
                                </NavPill>
                                <NavPill $variant="story">
                                    <NavPillBackground $variant="story" />
                                    <NavPillText>Who even are you?</NavPillText>
                                    <NavPillIcon>👨‍🚀</NavPillIcon>
                                </NavPill>
                            </NavPills>
                            
                            {/* Simple space-themed scroll arrow */}
                            <SimpleArrow
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 6.0, duration: 1.0, ease: "easeOut" }}
                            >
                                <ArrowText>Scroll to explore</ArrowText>
                                <ArrowIcon>↓</ArrowIcon>
                            </SimpleArrow>
                        </ScrollInvite>
                    </Msgs>
            </MsgsWrapper>

            
        </HeroContainer>
    )
}

// entire container for the hero content.
const HeroContainer = styled.div`
    min-height: 100vh;
    display: flex;
    position: relative;
    overflow: hidden;
    background: radial-gradient(ellipse at center, 
        rgba(20, 5, 40, 0.8) 0%, 
        rgba(0, 0, 0, 0.9) 30%, 
        rgba(13, 7, 27, 1) 70%);
    
    
    /* Subtle starfield background */
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: 
            radial-gradient(1px 1px at 20px 30px, rgba(255,255,255,0.3), transparent),
            radial-gradient(1px 1px at 40px 70px, rgba(255,255,255,0.4), transparent),
            radial-gradient(1px 1px at 90px 40px, rgba(255,255,255,0.2), transparent),
            radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.5), transparent),
            radial-gradient(1px 1px at 160px 30px, rgba(255,255,255,0.3), transparent),
            radial-gradient(1px 1px at 200px 20px, rgba(255,255,255,0.4), transparent),
            radial-gradient(1px 1px at 50px 120px, rgba(255,255,255,0.2), transparent),
            radial-gradient(1px 1px at 180px 90px, rgba(255,255,255,0.3), transparent),
            radial-gradient(1px 1px at 30px 150px, rgba(255,255,255,0.4), transparent),
            radial-gradient(1px 1px at 120px 40px, rgba(255,255,255,0.2), transparent),
            radial-gradient(1px 1px at 80px 160px, rgba(255,255,255,0.5), transparent),
            radial-gradient(1px 1px at 150px 60px, rgba(255,255,255,0.3), transparent);
        background-repeat: repeat;
        background-size: 200px 200px;
        animation: twinkle 4s ease-in-out infinite;
        opacity: 0.8;
        
        /* fade OUT near the bottom */
        -webkit-mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
                mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
        pointer-events: none;
    }
    
    /* Breathing nebula effect */
    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
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
        animation: breathe 10s ease-in-out infinite;
        opacity: 0.7;
        
        /* fade OUT near the bottom */
        -webkit-mask-image: linear-gradient(to bottom, black 75%, transparent 100%);
                mask-image: linear-gradient(to bottom, black 75%, transparent 100%);
        pointer-events: none;
    }
    
    
    @keyframes twinkle {
        0%, 100% { 
            opacity: 0.3;
        }
        25% { 
            opacity: 0.8;
        }
        50% { 
            opacity: 0.4;
        }
        75% { 
            opacity: 0.9;
        }
    }
    
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

// wrapper for smooth fade-in of messages.
const MsgsWrapper = styled(motion.div)`
    width: 100%;
    height: 100%;
    will-change: transform, opacity;
    contain: layout;
    z-index: 15;
    opacity: 0.90;
`;

// my messages container.
const Msgs = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0;
    padding: 6rem 4rem;
    width: 100%;
    z-index: 15;
`;

// my first message floating in "What's up!"
const SupMsg = styled(motion.div)`
    margin: 0;
    font-size: 4.5rem;
    z-index: 10;
    position: relative;
`;

const IntroNameMsg = styled(motion.div)`
    margin-top: 0.5rem;
    font-size: 2.5rem;
    z-index: 10;
`;
// my message floating in saying my name.
// my message floating in saying my name.
const NameRow = styled(motion.div)`
    margin-top: -2rem;
    margin-bottom: -1rem;
    text-align: center;
    font-size: 20rem;

    /* full-bleed so it centers against the viewport, not the padded column */
    position: relative;
    left: 1.5vw;

    @media (max-width: 1900px) { 
        font-size: 18rem; 
    }
    @media (max-width: 1599px) { 
        font-size: 14rem; 
    }
`;

const Name = styled.span`
    font-weight: 900;
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
    background-size: 200% 100%;
    animation: gradientShift 10s linear infinite;
    will-change: transform, opacity;
    font-kerning: normal;
    text-rendering: optimizeLegibility;
    word-spacing: -0.15ch; /* tiny pull so the visual center sits on 50% */
    
    @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        100% { background-position: 200% 50%; }
    }

    z-index: 15;
`;

// my fourth message floating in saying most people just call me Kirby.
const SubNameMsg = styled(motion.div)`
    margin-top: -2rem;
    text-align: center;
    font-style: italic;
    font-size: 2.25rem;
    z-index: 10;
    color: rgba(255, 255, 255, 0.7);
`;

// Scroll invitation message
const ScrollInvite = styled(motion.div)`
    margin-top: 1.5rem;
    text-align: center;
    z-index: 15;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const ScrollText = styled.div`
    font-size: 1.5rem;
    color: rgba(255, 255, 255, 0.6);
    font-style: italic;
    text-align: center;
    width: 100%;
`;

// waving hand emoji.
const WavingHand = styled.span`
    display: inline-block;
    animation: wave 2.5s infinite;
    transform-origin: 70% 70%;
    
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

// Individual particle field for natural twinkling
const ParticleField = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
`;

// Individual star particles
const Star = styled.div`
    position: absolute;
    top: ${props => props.$top};
    left: ${props => props.$left};
    width: ${props => props.$size || '1px'};
    height: ${props => props.$size || '1px'};
    background: white;
    border-radius: 50%;
    box-shadow: 
        0 0 3px rgba(255, 255, 255, 0.9),
        0 0 6px rgba(255, 255, 255, 0.6),
        0 0 9px rgba(255, 255, 255, 0.3);
    animation: ${props => props.$animation} ${props => props.$duration}s ease-in-out infinite;
    opacity: ${props => props.$opacity};
    
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

// Moon component
const Moon = styled.div`
    position: absolute;
    top: 15%;
    right: 20%;
    width: 80px;
    height: 80px;
    border-radius: 50%;
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
    z-index: 2;
    animation: moonFloat 15s ease-in-out infinite;
    
    /* Multiple craters using pseudo-elements and additional divs */
    &::before {
        content: '';
        position: absolute;
        top: 25%;
        left: 35%;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: radial-gradient(circle, 
            rgba(0, 0, 0, 0.15) 0%,
            rgba(0, 0, 0, 0.08) 50%,
            transparent 100%);
        box-shadow: 
            0 0 3px rgba(0, 0, 0, 0.1);
    }
    
    &::after {
        content: '';
        position: absolute;
        top: 45%;
        left: 60%;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: radial-gradient(circle, 
            rgba(0, 0, 0, 0.12) 0%,
            rgba(0, 0, 0, 0.06) 50%,
            transparent 100%);
        box-shadow: 
            0 0 4px rgba(0, 0, 0, 0.08);
    }
    
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

// Additional crater components
const Crater1 = styled.div`
    position: absolute;
    top: 15%;
    left: 55%;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: radial-gradient(circle, 
        rgba(0, 0, 0, 0.1) 0%,
        rgba(0, 0, 0, 0.05) 50%,
        transparent 100%);
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.08);
`;

const Crater2 = styled.div`
    position: absolute;
    top: 60%;
    left: 25%;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: radial-gradient(circle, 
        rgba(0, 0, 0, 0.08) 0%,
        rgba(0, 0, 0, 0.04) 50%,
        transparent 100%);
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.06);
`;

const Crater3 = styled.div`
    position: absolute;
    top: 35%;
    left: 15%;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: radial-gradient(circle, 
        rgba(0, 0, 0, 0.12) 0%,
        rgba(0, 0, 0, 0.06) 50%,
        transparent 100%);
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.08);
`;

const Crater4 = styled.div`
    position: absolute;
    top: 70%;
    left: 70%;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: radial-gradient(circle, 
        rgba(0, 0, 0, 0.09) 0%,
        rgba(0, 0, 0, 0.04) 50%,
        transparent 100%);
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.06);
`;

// Floating astronaut component
const Astronaut = styled.div`
    position: absolute;
    top: 60%; /* 25% from bottom */
    left: -120px; /* Start off-screen to the left */
    width: 90px; /* Bigger astronaut */
    height: 90px;
    background-image: url('src/images/1hero/astronaut.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    z-index: 0;
    
    /* Subtle glow effect */
    filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.15));
    
    /* Smooth floating animation - slower movement, faster rotation with delay */
    animation: astronautFloat 35s linear infinite;
    animation-delay: 6s; /* Start after text animations complete */
    
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
    
    /* Pause animation during loading to prevent jitter */
    :root[data-loading="true"] & {
        animation-play-state: paused;
    }
`;

// Floating UFO component with sinusoidal wave motion
const UFO = styled.div`
    position: absolute;
    top: 10%; /* Near the top of the screen */
    right: -80px; /* Start off-screen to the right */
    width: 70px;
    height: 70px;
    background-image: url('src/images/1hero/ufo.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    z-index: 0;
    
    /* Subtle glow effect */
    filter: drop-shadow(0 0 6px rgba(100, 255, 100, 0.2)) 
            drop-shadow(0 0 12px rgba(150, 255, 150, 0.1));
    
    /* Combined smooth movement and bobbing animation with delay */
    animation: ufoMove 20s linear infinite;
    animation-delay: 8s; /* Start after astronaut begins */
    
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
    
    /* Pause animation during loading to prevent jitter */
    :root[data-loading="true"] & {
        animation-play-state: paused;
    }
`;

// Navigation pills container
const NavPills = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr)); /* equal columns */
    gap: 1.5rem;
    width: min(80vw, 680px);     /* set a nice max width */
    margin: 1rem auto 0;         /* center the block */
    z-index: 10;
    text-align: center;
    border-radius: 9999px;       /* optional */
    padding: .5rem;              /* optional */
`;

// Individual navigation pill
const NavPill = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    position: relative;
    overflow: hidden;
    width: 100%;          /* take the full column width */
    min-width: 0;         /* allow shrinking inside grid */
    
    /* Gradient backgrounds based on variant */
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
        box-shadow: 0 0 20px rgba(150, 200, 246, 0.4);
    `}
    
    ${props => props.$variant === 'story' && `
        background: linear-gradient(to bottom,
            rgb(13, 7, 27) 0%,
            rgb(13, 7, 27) 25%,
            rgb(30, 20, 55) 50%,
            rgb(45, 30, 80) 65%,
            rgb(65, 45, 110) 80%,
            rgb(85, 60, 135) 90%,
            rgb(100, 70, 150) 100%);
        box-shadow: 0 0 20px rgba(100, 70, 150, 0.4);
    `}
    
    &:hover {
        transform: translateY(-3px) scale(1.08);
        box-shadow: 0 0 25px rgba(255, 255, 255, 0.3);
        border-color: rgba(255, 255, 255, 0.3);
        
        /* Subtle enhanced glow on hover */
        ${props => props.$variant === 'projects' && `
            box-shadow: 0 0 25px rgba(150, 200, 246, 0.4), 0 0 35px rgba(255, 255, 255, 0.2);
        `}
        
        ${props => props.$variant === 'story' && `
            box-shadow: 0 0 25px rgba(100, 70, 150, 0.4), 0 0 35px rgba(255, 255, 255, 0.2);
        `}
    }
    
    &:active {
        transform: translateY(-1px) scale(1.05);
        transition: all 0.1s ease;
    }
`;

// Background effects for pills
const NavPillBackground = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50px;
    pointer-events: none;
    opacity: 0.4;
    
    /* Cloud effects for projects */
    ${props => props.$variant === 'projects' && `
        background-image: 
            url('src/images/clouds/cloud1.png'),
            url('src/images/clouds/cloud2.png'),
            url('src/images/clouds/cloud3.png');
        background-size: 25px 15px, 20px 12px, 18px 10px;
        background-position: 15% 20%, 70% 60%, 40% 80%;
        background-repeat: no-repeat;
        opacity: 0.25;
        animation: cloudDrift 12s ease-in-out infinite;
        
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
    
    /* Star effects for story */
    ${props => props.$variant === 'story' && `
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
        
        /* Additional star using background */
        background-image: 
            radial-gradient(circle at 30% 50%, rgba(255, 255, 255, 0.9) 1px, transparent 1px),
            radial-gradient(circle at 80% 30%, rgba(255, 255, 255, 0.7) 1px, transparent 1px),
            radial-gradient(circle at 60% 80%, rgba(255, 255, 255, 0.8) 1px, transparent 1px);
        background-size: 100% 100%, 100% 100%, 100% 100%;
        animation: starField 8s ease-in-out infinite;
        
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

// Pill text
const NavPillText = styled.span`
    color: white;
    font-weight: 500;
    font-size: 1rem;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    position: relative;
    z-index: 2;
`;

// Pill icon
const NavPillIcon = styled.span`
    font-size: 1.2rem;
    filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.3));
    position: relative;
    z-index: 2;
`;

// Arrow text
const ArrowText = styled.div`
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.6);
    font-style: italic;
    margin-bottom: 0.5rem;
    transition: opacity 0.3s ease;
    opacity: 0.7;
`;

// Arrow icon with space gradient
const ArrowIcon = styled.div`
    font-size: 2rem;
    background: linear-gradient(135deg, 
        rgba(100, 200, 255, 0.9) 0%,
        rgba(150, 220, 255, 0.8) 50%,
        rgba(200, 240, 255, 0.9) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: bounce 2s ease-in-out infinite;
    transition: transform 0.3s ease;
    
    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-8px);
        }
        60% {
            transform: translateY(-4px);
        }
    }
`;

// Simple space-themed scroll arrow (defined after other arrow components)
const SimpleArrow = styled(motion.div)`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 0.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
        transform: translateY(-3px);
        
        ${ArrowText} {
            opacity: 1;
        }
        
        ${ArrowIcon} {
            transform: scale(1.2);
        }
    }
`;

export default Hero;