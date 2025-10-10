// Projects.jsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';

// Your cards
import CKSiteCard from './Cards/CKSiteCard';
import CentiCard from './Cards/CentiCard';
import SecureScapeCard from './Cards/SecureScapeCard';
import SentimentTraderCard from './Cards/SentimentTraderCard';
import ShelfVisionCard from './Cards/ShelfVisionCard';
import UCFClubManagerCard from './Cards/UCFClubManagerCard';
import OceanLifeCard from './Cards/OceanLifeCard';

// Import themes for dot styling
import { themes } from './shared/themes';

// Import Cloud component from Experience
import Cloud from '../Experience/Cloud';

// Import Sun component
import Sun from './Sun';

const Projects = () => { 
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

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = cards.length;

  const next = () => setIndex((i) => (i + 1) % n);
  const prev = () => setIndex((i) => (i - 1 + n) % n);

  // Autoplay (15s), respect reduced motion
  useEffect(() => {
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (paused || reduced) return;
    const t = setInterval(next, 30000);
    return () => clearInterval(t);
  }, [paused, n]);

  // Keyboard nav
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Simple drag / swipe
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

  // Index-based positioning system
  const getCardStyle = (cardIndex) => {
    const distance = Math.abs(cardIndex - index);
    
    // Only show cards within 2 positions of current index
    if (distance > 2) return null;
    
    return {
      position: cardIndex - index, // -2, -1, 0, 1, 2
      isFocused: cardIndex === index,
      distance: distance
    };
  };

    return (
        <ProjectsContainer>
            {/* Lower Sky Atmospheric Elements */}
            <AtmosphereLayer>
                {/* Parallax Cloud Layers - Decreasing frequency from top to bottom */}
                <CloudLayer>
                    {/* TOP LAYER - Dense clouds (continuing from Experience) */}
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
                    
                    {/* MID LAYER - Medium density clouds */}
                    <Cloud top="32%" delay="45" duration="175" layer="far" type={1} />
                    <Cloud top="38%" delay="105" duration="185" layer="far" type={3} />
                    <Cloud top="45%" delay="25" duration="180" layer="far" type={2} />
                    
                    <Cloud top="35%" delay="70" duration="135" layer="mid" type={4} />
                    <Cloud top="42%" delay="20" duration="145" layer="mid" type={2} />
                    
                    <Cloud top="30%" delay="40" duration="110" layer="near" type={5} />
                    <Cloud top="40%" delay="85" duration="115" layer="near" type={1} />
                    
                    {/* LOWER LAYER - Sparse clouds */}
                    <Cloud top="52%" delay="15" duration="160" layer="far" type={4} />
                    <Cloud top="58%" delay="75" duration="170" layer="far" type={1} />
                    
                    <Cloud top="50%" delay="50" duration="125" layer="mid" type={3} />
                    
                    {/* VERY LOWER LAYER - Minimal clouds (transition to horizon) */}
                    <Cloud top="65%" delay="30" duration="140" layer="far" type={2} />
                    <Cloud top="72%" delay="90" duration="150" layer="far" type={5} />
                </CloudLayer>
                
                {/* Sun - positioned like it's at the horizon */}
                <Sun />
                
                {/* Flying birds - scattered across the sky */}
                <Bird top="20%" left="15%" delay="0s" duration="25s" />
                <Bird top="35%" left="65%" delay="5s" duration="30s" />
                <Bird top="50%" left="25%" delay="10s" duration="28s" />
                <Bird top="28%" left="85%" delay="3s" duration="32s" />
                <Bird top="45%" left="50%" delay="8s" duration="27s" />
                
                {/* Wispy horizon clouds - lighter and more transparent */}
                <HorizonCloud top="60%" left="-10%" delay="0s" />
                <HorizonCloud top="65%" left="30%" delay="15s" />
                <HorizonCloud top="70%" left="60%" delay="8s" />
                <HorizonCloud top="75%" left="85%" delay="20s" />
            </AtmosphereLayer>
            
            <ContentWrapper>
                <SectionTitle>Projects</SectionTitle>
                <SectionSubtitle>What I've built and shipped</SectionSubtitle>
                
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

          {index > 0 && <ArrowLeft aria-label="Previous project" onClick={prev}>‹</ArrowLeft>}
          {index < n - 1 && <ArrowRight aria-label="Next project" onClick={next}>›</ArrowRight>}

          <Dots>
            {cards.map((card, i) => (
              <Dot
                key={i}
                $theme={card.theme}
                $isActive={i === index}
                aria-label={`Go to project ${i + 1}`}
                aria-selected={i === index}
                onClick={() => setIndex(i)}
              />
            ))}
          </Dots>
        </Stage>
            </ContentWrapper>
        </ProjectsContainer>
    );
};

export default Projects;

/* ------------------ styles ------------------ */

// Main container - brighter lower sky gradient
const ProjectsContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    
    /* Transition from Experience's ending blue to vibrant horizon */
    background: linear-gradient(to bottom,
        rgb(150, 200, 246) 0%,     /* Match Experience ending */
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
        rgb(71, 160, 238) 100%);  /* Vibrant horizon blue */
    
    width: 100vw;
    padding: 4rem 2rem;
    padding-top: 0;
    position: relative;
    overflow: hidden;
`;

// Atmosphere layer for visual elements
const AtmosphereLayer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    pointer-events: none;
    overflow: hidden;
`;

// Cloud layer container
const CloudLayer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    pointer-events: none;
    overflow: hidden;
`;

// Content wrapper
const ContentWrapper = styled.div`
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    max-width: 1400px;
    margin: 0 auto;
    width: 100%;
    
    @media (max-width: 1600px) {
        padding: 1.5rem;
    }
    
    @media (max-width: 1200px) {
        padding: 1rem;
    }
`;

// Section title
const SectionTitle = styled.h1`
    font-size: 6rem;
    font-weight: 900;
    background: linear-gradient(135deg, 
        rgba(255, 255, 255, 0.95) 0%,
        rgba(255, 240, 200, 0.9) 50%,
        rgba(255, 220, 150, 0.95) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-align: center;
    margin: 0;
    text-shadow: 0 4px 20px rgba(255, 220, 100, 0.3);
    
    @media (max-width: 1600px) {
        font-size: 4rem;
    }
`;

// Section subtitle
const SectionSubtitle = styled.h2`
    font-size: 2rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.85);
    text-align: center;
    font-style: italic;
    margin: 0;
    margin-top: 1rem;
    margin-bottom: 2rem;
    text-shadow: 0 2px 10px rgba(255, 255, 255, 0.2);
    
    @media (max-width: 1600px) {
        font-size: 1.5rem;
        margin-bottom: 2.5rem;
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

const Stage = styled.div`
  display: grid;
  place-items: center;
  min-height: 80vh;
  padding: 40px 0;
  position: relative;
  overflow: visible;
  width: 100%;
  
  @media (max-width: 1600px) {
    min-height: 70vh;
    padding: 30px 0;
  }
  
  @media (max-width: 1200px) {
    min-height: 60vh;
    padding: 20px 0;
  }
`;

const Track = styled.div`
    position: relative;
  width: 50vw;
  height: clamp(560px, 70vh, 760px);
  perspective: 1200px;
  overflow: visible;
  
  @media (max-width: 1600px) {
    width: 60vw;
    height: clamp(500px, 65vh, 700px);
  }
  
  @media (max-width: 1200px) {
    width: 70vw;
    height: clamp(450px, 60vh, 650px);
  }
  
  @media (max-width: 900px) {
    width: 85vw;
    height: clamp(400px, 55vh, 600px);
  }
`;

const Slide = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  transition:
    transform 320ms cubic-bezier(0.22, 0.61, 0.36, 1),
    opacity 220ms ease,
    filter 220ms ease;
  will-change: transform, opacity, filter;
  pointer-events: none;

  /* Focused card (index 0) */
  ${({ $isFocused }) => $isFocused && `
    transform: translateX(0) translateZ(0) scale(1);
    opacity: 1;
    z-index: 10;
    filter: drop-shadow(0 12px 32px rgba(0, 0, 0, 0.25));
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


// Bird animation path
const fly = keyframes`
    0% {
        transform: translateX(-50px) translateY(0) scale(0.8);
        opacity: 0;
    }
    10% {
        opacity: 1;
    }
    90% {
        opacity: 1;
    }
    100% {
        transform: translateX(calc(100vw + 50px)) translateY(-20px) scale(1);
        opacity: 0;
    }
`;

// Flying bird silhouette
const Bird = styled.div`
    position: absolute;
    top: ${props => props.top};
    left: ${props => props.left};
    width: 20px;
    height: 8px;
    animation: ${fly} ${props => props.duration} linear infinite;
    animation-delay: ${props => props.delay};
    opacity: 0;
    
    /* Bird shape using pseudo-elements (simple V shape) */
    &::before,
    &::after {
        content: '';
        position: absolute;
        width: 10px;
        height: 2px;
        background: rgba(0, 0, 0, 0.3);
        border-radius: 1px;
    }
    
    &::before {
        left: 0;
        transform: rotate(-25deg);
        transform-origin: right center;
    }
    
    &::after {
        right: 0;
        transform: rotate(25deg);
        transform-origin: left center;
    }
`;

// Horizon cloud animation
const drift = keyframes`
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(30px);
    }
`;

// Wispy horizon clouds
const HorizonCloud = styled.div`
    position: absolute;
    top: ${props => props.top};
    left: ${props => props.left};
    width: 300px;
    height: 60px;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 50%;
    filter: blur(25px);
    animation: ${drift} 20s ease-in-out infinite alternate;
    animation-delay: ${props => props.delay};
    opacity: 0.6;
    
    /* Create layered cloud effect with pseudo-elements */
    &::before {
        content: '';
        position: absolute;
        top: -15px;
        left: 40px;
        width: 200px;
        height: 50px;
        background: rgba(255, 255, 255, 0.12);
        border-radius: 50%;
        filter: blur(20px);
    }
    
    &::after {
        content: '';
        position: absolute;
        top: 10px;
        right: 30px;
        width: 180px;
        height: 45px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 50%;
        filter: blur(22px);
    }
`;

// Bounce animations for arrows
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

const ArrowBase = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border: 0;
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.15));
  color: #fff;
  font-size: 32px;
  font-weight: bold;
  line-height: 1;
  display: grid;
  place-items: center;
  cursor: pointer;
  backdrop-filter: blur(12px);
  border: 2px solid rgba(255,255,255,0.3);
  box-shadow: 
    0 4px 16px rgba(0,0,0,0.15),
    0 0 20px rgba(255,255,255,0.1),
    inset 0 1px 2px rgba(255,255,255,0.2);
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0.95;
  z-index: 20;
  
  &:hover { 
    transform: translateY(-50%) scale(1.1); 
    background: linear-gradient(135deg, rgba(255,255,255,0.35), rgba(255,255,255,0.25));
    border-color: rgba(255,255,255,0.5);
    box-shadow: 
      0 6px 24px rgba(0,0,0,0.2),
      0 0 30px rgba(255,255,255,0.2),
      inset 0 1px 3px rgba(255,255,255,0.3);
  }
  
  &:active {
    transform: translateY(-50%) scale(0.95);
  }
`;

const ArrowLeft = styled(ArrowBase)`
  left: max(12px, 4vw);
  animation: ${leftBounce} 2s ease-in-out infinite;
  animation-delay: 0.5s;
`;

const ArrowRight = styled(ArrowBase)`
  right: max(12px, 4vw);
  animation: ${rightBounce} 2s ease-in-out infinite;
  animation-delay: 1s;
`;

const Dots = styled.div`
  position: absolute;
  bottom: 18px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  
  @media (max-width: 1600px) {
    bottom: 12px;
  }
  
  @media (max-width: 1200px) {
    bottom: 8px;
  }
  
  @media (max-width: 900px) {
    bottom: 4px;
  }
`;

const Dot = styled.button`
  width: 8px; 
  height: 8px; 
  border-radius: 999px; 
  border: 0;
  background: ${({ $theme }) => {
    const theme = themes[$theme];
    return theme?.colors?.pillBackground || 'rgba(255,255,255,0.45)';
  }};
  border: 1px solid ${({ $theme }) => {
    const theme = themes[$theme];
    return theme?.colors?.pillBorder || 'rgba(255,255,255,0.3)';
  }};
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  box-shadow: ${({ $theme }) => {
    const theme = themes[$theme];
    return theme?.colors?.pillShadow || '0 2px 8px rgba(255,255,255,0.2)';
  }};
  
  &:hover {
    transform: scale(1.2);
    background: ${({ $theme }) => {
      const theme = themes[$theme];
      return theme?.colors?.pillHoverBackground || 'rgba(255,255,255,0.7)';
    }};
    border-color: ${({ $theme }) => {
      const theme = themes[$theme];
      return theme?.colors?.pillHoverBorder || 'rgba(255,255,255,0.6)';
    }};
    box-shadow: ${({ $theme }) => {
      const theme = themes[$theme];
      return theme?.colors?.pillHoverShadow || '0 4px 12px rgba(255,255,255,0.4)';
    }};
  }
  
  &[aria-selected="true"] {
    width: 24px;
    background: ${({ $theme }) => {
      const theme = themes[$theme];
      return theme?.colors?.pillHoverBackground || '#fff';
    }};
    border-color: ${({ $theme }) => {
      const theme = themes[$theme];
      return theme?.colors?.pillHoverBorder || 'rgba(255,255,255,0.8)';
    }};
    box-shadow: ${({ $theme }) => {
      const theme = themes[$theme];
      return theme?.colors?.pillHoverShadow || '0 4px 16px rgba(255,255,255,0.5)';
    }};
  }
`;