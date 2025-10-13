import React from 'react';
import styled, { keyframes } from 'styled-components';
import HotAirBalloon from './HotAirBalloon';
import SkillTower from './SkillTower';
import { getLogo } from '../Utils/logoMap';
import { 
  buildingPalettes, 
  buildingMaterialMap, 
  buildings
} from './skylineConfig';

// Import balloon logos
import gitLogo from '@/images/logos/git.png';
import canvaLogo from '@/images/logos/canva.png';
import figmaLogo from '@/images/logos/figma.png';
import msofficeLogo from '@/images/logos/msoffice.png';

// Import top skill logos
import pythonLogo from '@/images/logos/python.png';
import javascriptLogo from '@/images/logos/javascript.png';
import reactLogo from '@/images/logos/react.png';

// utility to create layered skyline config
const makeLayeredSkyline = () => {
  return buildings.map((building) => {
    const logoSrc = getLogo(building.name);
    const material = buildingMaterialMap[building.name] || "steel"; // default to steel if not mapped
    const palette = buildingPalettes[material];
    
    return {
      ...building,
      logoSrc,
      palette
    };
  });
};

const Skills = () => {
    const skyline = makeLayeredSkyline();

    return (
        <SkillsContainer>
            {/* Atmospheric Elements */}
            <AtmosphereLayer>
                
                {/* Distant clouds */}
                <DistantCloud top="15%" left="10%" delay="0s" />
                <DistantCloud top="25%" left="70%" delay="5s" />
                <DistantCloud top="20%" left="85%" delay="3s" />
                
            </AtmosphereLayer>
            
            <ContentWrapper>
                <SectionTitle>Skills</SectionTitle>
                <SectionSubtitle>Technologies I work with</SectionSubtitle>
            </ContentWrapper>

            <SkylineRow>
                {skyline.map((b) => (
                    <SkillTower
                        key={b.name}
                        name={b.name}
                        logoSrc={b.logoSrc}
                        level={b.level}
                        palette={b.palette}
                        w={b.w}
                        depth={b.depth}
                        cap={b.cap}
                        leftPos={b.leftPos}
                    />
                ))}
            </SkylineRow>

            {/* Building Foundation Base */}
            <BuildingFoundation />

            {/* Upper Sidewalk (above road) */}
            <UpperSidewalk />
            
            {/* Road leading to buildings */}
            <Road />
            
            {/* Harbor water - behind the bridge rail */}
            <HarborWater>
                <RippleLayer />
            </HarborWater>
            
            {/* Hot air balloons above the water - distant, over the harbor */}
            {/* Git - Orange and white */}
            <HotAirBalloon
                top="12%"
                left="81%"
                size={95}
                palette={["#F05032", "#FFFFFF", "#F05032", "#FFFFFF", "#F05032", "#FFFFFF"]}
                floatMs={9000}
                delay="0s"
                logo={gitLogo}
                name="Git"
                tooltipColor="#F05032"
            />
            
            {/* Canva - Teal and white/purple */}
            <HotAirBalloon
                top="5%"
                left="90%"
                size={75}
                palette={["#00C4CC", "#FFFFFF", "#7D2AE8", "#FFFFFF", "#00C4CC", "#7D2AE8"]}
                floatMs={10500}
                delay="2s"
                logo={canvaLogo}
                name="Canva"
                tooltipColor="#00C4CC"
            />
            
            {/* Figma - Multicolor with white */}
            <HotAirBalloon
                top="8%"
                left="70%"
                size={105}
                palette={["#F24E1E", "#FFFFFF", "#A259FF", "#FFFFFF", "#1ABCFE", "#FFFFFF"]}
                floatMs={8500}
                delay="4s"
                logo={figmaLogo}
                name="Figma"
                tooltipColor="#A259FF"
            />
            
            {/* MS Office - Red, orange, blue, green */}
            <HotAirBalloon
                top="15%"
                left="60%"
                size={85}
                palette={["#D83B01", "#FFFFFF", "#0078D4", "#FFFFFF", "#7FBA00", "#FFFFFF"]}
                floatMs={9800}
                delay="6s"
                logo={msofficeLogo}
                name="Microsoft Office"
                tooltipColor="#0078D4"
            />
            
            {/* Floating text section */}
            <FloatingTextContainer>
                <FloatingText>
                    Across most portfolio sites I've seen, I never saw a skills section that wasn't 
                    basically just a list of random technologies, so I decided to make mine a bit more 
                    <em> confusing</em> because why not? 
                </FloatingText>
                <FloatingText>
                    In reality, I feel like listing most of these skills doesn't really tell a story, you're 
                    gonna get that from my projects. But I wanted to show some of my experiences thus far 
                    in my career.
                </FloatingText>
            </FloatingTextContainer>
            
            <PSNote>
                P.S. — All the objects here are custom SVGs that took <em>way</em> too long to build/optimize. 
                Don't recommend it to others.
            </PSNote>
            
            <BridgeRail />
            {/* Right-side bridge group (unified) */}
            
            {/* Lower Sidewalk (below road) */}
            <LowerSidewalk />
            
            {/* Grassy Base Layer - left side only */}
            <GrassyBase />
            
            {/* Ocean rail at bottom of grass */}
            <OceanRail />
            
            {/* Ocean wall below rail - water starts in Background section */}
            <OceanWall />
            
        </SkillsContainer>
    );
};

export default Skills;

/* ================= Styles ================= */

// Main container - bright blue sky with grassy base and ocean
const SkillsContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    overflow-x: hidden;
    
    /* Smooth transition from Projects ending to bright sky with grassy base */
    background: linear-gradient(to bottom,
        rgb(71, 160, 238) 0%,      /* Match Projects ending exactly */
        rgb(75, 165, 240) 5%,      /* Slight brightening */
        rgb(80, 170, 242) 10%,     /* Continue brightening */
        rgb(85, 175, 244) 15%,     /* Getting lighter */
        rgb(90, 180, 246) 20%,     /* Light sky blue */
        rgb(95, 185, 248) 25%,     /* Brighter */
        rgb(100, 190, 250) 30%,    /* Even brighter */
        rgb(105, 195, 252) 35%,    /* Very bright */
        rgb(110, 200, 254) 40%,    /* Brightest */
        rgb(115, 205, 255) 45%,    /* Peak brightness */
        rgb(120, 210, 255) 50%,    /* Maintain peak */
        rgb(125, 215, 255) 55%,    /* Still bright */
        rgb(130, 220, 255) 60%,    /* Keep bright */
        rgb(135, 225, 255) 65%,    /* Very light */
        rgb(140, 230, 255) 70%,    /* Start transition */
        rgb(135, 225, 250) 75%,    /* Slight shift */
        rgb(130, 220, 245) 80%,    /* Transition begins */
        rgb(125, 215, 240) 85%,    /* Getting deeper */
        rgb(120, 210, 235) 90%,    /* Transition to base */
        rgb(115, 205, 230) 95%,    /* Near base */
        rgb(110, 200, 225) 100%);  /* Base blue */
    
    width: 100vw;
    padding: 4rem 2rem;
    padding-top: 0;
    position: relative;
    overflow: hidden;
`;

// atmosphere layer for visual elements
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

// Distant cloud animation
const cloudDrift = keyframes`
    0% { transform: translateX(0); }
    100% { transform: translateX(20px); }
`;

const DistantCloud = styled.div`
    position: absolute;
    top: ${props => props.top};
    left: ${props => props.left};
    width: 200px;
    height: 40px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    filter: blur(15px);
    animation: ${cloudDrift} 25s ease-in-out infinite alternate;
    animation-delay: ${props => props.delay};
    opacity: 0.6;
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
        rgba(255, 200, 100, 0.9) 50%,
        rgba(255, 150, 50, 0.95) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-align: center;
    margin: 0;
    text-shadow: 0 4px 20px rgba(255, 150, 50, 0.3);
    
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
    margin-bottom: 3rem;
    text-shadow: 0 2px 10px rgba(255, 255, 255, 0.2);
    
    @media (max-width: 1600px) {
        font-size: 1.5rem;
        margin-bottom: 2.5rem;
    }
`;

// Road below sidewalk with perspective
const Road = styled.div`
    position: absolute;
    bottom: 12%;
    left: 0;
    width: 120%;
    height: 3rem;
    z-index: 2;

    transform: translateX(-7.5%);
    
    /* Road surface with perspective */
    &::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 100%;
        background: linear-gradient(to top,
            rgb(60, 60, 60) 0%,      /* Dark asphalt */
            rgb(80, 80, 80) 30%,    /* Medium gray */
            rgb(100, 100, 100) 60%, /* Lighter gray */
            rgb(120, 120, 120) 100% /* Light gray */
        );
        transform: perspective(150px) rotateX(15deg);
        transform-origin: bottom;
    }
    
    /* Center line markings with perspective */
    &::after {
        content: '';
        position: absolute;
        bottom: 45%;
        left: 0;
        right: 0;
        height: 2px; 
        background: repeating-linear-gradient(
            90deg,
            transparent 0px,
            transparent 20px,
            rgb(255, 255, 255) 20px,
            rgb(255, 255, 255) 40px
        );
        transform: translateX(-2.5%) perspective(150px) rotateX(15deg);
        transform-origin: bottom;
        opacity: 0.8;
    }
`;

const SkylineRow = styled.div`
  position: absolute;
  bottom: 17%;
  left: 0;
  width: 60%;  /* Match sidewalk width */
  height: px;  /* Tall enough for scaled-up buildings */
  
  /* Buildings position themselves absolutely within this container */
  z-index: 1.5;
`;

// Building Foundation - base for buildings to sit on
const BuildingFoundation = styled.div`
  position: absolute;
  bottom: 16%;
  left: 0;
  width: 59.25%;
  height: 1.5rem;
  z-index: 2;
  
  transform: translateX(-10.5%);
  
  /* Foundation surface with depth */
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    background: linear-gradient(to top,
      rgb(80, 80, 85) 0%,      /* Dark concrete base */
      rgb(95, 95, 100) 25%,    /* Medium dark */
      rgb(110, 110, 115) 50%,  /* Medium */
      rgb(125, 125, 130) 75%,  /* Medium light */
      rgb(140, 140, 145) 100%  /* Light concrete top */
    );
    transform: perspective(150px) rotateX(15deg);
    transform-origin: bottom;
    box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.2);
  }
  
  /* Foundation edge detail - brick/block pattern */
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    background: repeating-linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.08) 0px,
      rgba(0, 0, 0, 0.08) 2px,
      transparent 2px,
      transparent 30px
    );
    transform: perspective(150px) rotateX(15deg);
    transform-origin: bottom;
  }
`;

// Grassy base layer for buildings with perspective (shrunk for ocean)
const GrassyBase = styled.div`
    position: absolute;
    bottom: 7%;
    left: 0;
    width: 120%;
    height: 2rem;
    z-index: 4;

    transform: translateX(-7.5%);
    
    /* Grass surface with perspective and multi-layer texture */
    &::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 100%;
        background: 
            /* Base color gradient */
            linear-gradient(to top,
                rgb(34, 139, 34) 0%,      /* Forest green base */
                rgb(50, 150, 50) 20%,    /* Medium green */
                rgb(60, 160, 60) 40%,    /* Lighter green */
                rgb(70, 170, 70) 60%,    /* Even lighter */
                rgb(80, 180, 80) 80%,    /* Light green */
                rgb(90, 190, 90) 100%   /* Very light green */
            );
        transform: perspective(150px) rotateX(15deg);
        transform-origin: bottom;
    }
    
    /* Multi-layered grass texture with perspective */
    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 100%;
        background: 
            /* Fine vertical grass blades */
            repeating-linear-gradient(
                90deg,
                transparent 0px,
                transparent 3px,
                rgba(0, 80, 0, 0.15) 3px,
                rgba(0, 80, 0, 0.15) 4px
            ),
            /* Medium grass clumps */
            repeating-linear-gradient(
                90deg,
                transparent 0px,
                transparent 8px,
                rgba(0, 100, 0, 0.25) 8px,
                rgba(0, 100, 0, 0.25) 12px,
                transparent 12px,
                transparent 24px
            ),
            /* Diagonal grass pattern (left) */
            repeating-linear-gradient(
                75deg,
                transparent 0px,
                transparent 12px,
                rgba(20, 100, 20, 0.12) 12px,
                rgba(20, 100, 20, 0.12) 14px
            ),
            /* Diagonal grass pattern (right) */
            repeating-linear-gradient(
                105deg,
                transparent 0px,
                transparent 10px,
                rgba(15, 90, 15, 0.10) 10px,
                rgba(15, 90, 15, 0.10) 12px
            ),
            /* Shadow patches - creates depth variation */
            radial-gradient(
                ellipse 120px 40px at 15% 45%,
                rgba(0, 60, 0, 0.25) 0%,
                transparent 70%
            ),
            radial-gradient(
                ellipse 100px 35px at 35% 65%,
                rgba(0, 60, 0, 0.20) 0%,
                transparent 70%
            ),
            radial-gradient(
                ellipse 90px 30px at 60% 50%,
                rgba(0, 60, 0, 0.18) 0%,
                transparent 70%
            ),
            radial-gradient(
                ellipse 110px 38px at 80% 60%,
                rgba(0, 60, 0, 0.22) 0%,
                transparent 70%
            ),
            /* Light highlights - sun-touched areas */
            radial-gradient(
                ellipse 80px 25px at 25% 55%,
                rgba(140, 200, 100, 0.15) 0%,
                transparent 60%
            ),
            radial-gradient(
                ellipse 70px 22px at 72% 48%,
                rgba(140, 200, 100, 0.12) 0%,
                transparent 60%
            );
        transform: perspective(150px) rotateX(15deg);
        transform-origin: bottom;
        mix-blend-mode: multiply;
        opacity: 0.85;
    }
`;

// Upper Sidewalk (above road) with perspective
const UpperSidewalk = styled.div`
    position: absolute;
    bottom: 15.5%;
    left: 0;
    width: 120%;
    height: 1.25rem;
    z-index: 2;

    transform: translateX(-10.5%);
    
    /* Sidewalk surface with perspective */
    &::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 100%;
        background: linear-gradient(to top,
            rgb(180, 180, 180) 0%,    /* Light grey sidewalk */
            rgb(200, 200, 200) 30%,  /* Medium light grey */
            rgb(220, 220, 220) 60%,  /* Lighter grey */
            rgb(240, 240, 240) 100%  /* Very light grey */
        );
        transform: perspective(150px) rotateX(15deg);
        transform-origin: bottom;
    }
    
    /* Sidewalk texture - subtle concrete pattern */
    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 100%;
        background: repeating-linear-gradient(
            90deg,
            transparent 0px,
            transparent 12px,
            rgba(0, 0, 0, 0.05) 12px,
            rgba(0, 0, 0, 0.05) 24px
        );
        transform: perspective(150px) rotateX(15deg);
        transform-origin: bottom;
    }
`;

// Lower Sidewalk (below road) with perspective
const LowerSidewalk = styled.div`
    position: absolute;
    bottom: 10%;
    left: 0;
    width: 110%;
    height: 1.25rem;
    z-index: 2;

    transform: translateX(-5.5%);
    
    /* Sidewalk surface with perspective */
    &::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 100%;
        background: linear-gradient(to top,
            rgb(180, 180, 180) 0%,    /* Light grey sidewalk */
            rgb(200, 200, 200) 30%,  /* Medium light grey */
            rgb(220, 220, 220) 60%,  /* Lighter grey */
            rgb(240, 240, 240) 100%  /* Very light grey */
        );
        transform: perspective(150px) rotateX(15deg);
        transform-origin: bottom;
    }
    
    /* Sidewalk texture - subtle concrete pattern */
    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 100%;
        background: repeating-linear-gradient(
            90deg,
            transparent 0px,
            transparent 12px,
            rgba(0, 0, 0, 0.05) 12px,
            rgba(0, 0, 0, 0.05) 24px
        );
        transform: perspective(150px) rotateX(15deg);
        transform-origin: bottom;
    }
`;

// Keyframes for water animations
const waveScroll = keyframes`
  0%   { background-position: 0 0, 0 0; }
  100% { background-position: -140px 0, -80px 0; }
`;

const ripplePulse = keyframes`
  0%   { opacity: 0.30; }
  100% { opacity: 0.55; }
`;

// Unified harbor water - all layers in same rotated plane
const HarborWater = styled.div`
  position: absolute;
  right: -50%;
  bottom: 0;
  width: 150%;
  height: 30rem;
  z-index: 1;
  overflow: hidden;

  /* Rotate the whole plane once */
  transform: perspective(220px) rotateX(12deg) translateZ(0);
  transform-origin: bottom right;

  /* Base water fill */
  background: linear-gradient(to top,
    #1b517a 0%,
    #2b6a96 35%,
    #3b82b1 65%,
    #61b9e0 100%
  );

  /* Horizon bloom (soft fade at the top of water) */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, transparent 70%, rgba(255, 255, 255, 0.25));
    pointer-events: none;
  }

  /* Shimmer stripes that move via background-position */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
      repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.08) 0 3px, transparent 3px 42px),
      repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.05) 0 2px, transparent 2px 66px);
    mix-blend-mode: screen;
    opacity: 0.35;
    animation: ${waveScroll} 12s linear infinite;
    will-change: background-position;
  }
`;

// Ripple layer - sits inside the rotated plane
const RippleLayer = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  /* Soft oval ripples at various positions */
  background:
    radial-gradient(40px 20px at 20% 65%, rgba(255, 255, 255, 0.18) 0, rgba(255, 255, 255, 0.08) 45%, transparent 70%),
    radial-gradient(55px 25px at 48% 50%, rgba(255, 255, 255, 0.14) 0, rgba(255, 255, 255, 0.07) 40%, transparent 70%),
    radial-gradient(34px 18px at 70% 60%, rgba(255, 255, 255, 0.12) 0, rgba(255, 255, 255, 0.06) 30%, transparent 70%);
  mix-blend-mode: screen;
  mask-image: linear-gradient(to top, black 60%, transparent 95%); /* fade near horizon */
  animation: ${ripplePulse} 5s ease-in-out infinite alternate;
`;

/* Compact guardrail with posts, sharing the same slant */
const BridgeRail = styled.div`
  position: absolute;
  right: 0%;
  bottom: 17%;
  width: 50%;
  height: 1.5rem;
  z-index: 1;

  /* posts */
  background:
    repeating-linear-gradient(
      90deg, 
      transparent 0 16px,
      rgba(85,85,90,.95) 16px 20px
    );

  /* two rails */
  &::after {
    content:'';
    position: absolute;
    left: 0; right: 0;
    top: 3px;
    height: 3px;
    background: #6b6b70;
    box-shadow: 0 9px 0 #6b6b70; /* lower rail */
    clip-path: inherit;
  }
`;

// Floating Text Container (no card background)
const FloatingTextContainer = styled.div`
  position: absolute;
  top: 34%;
  right: 5%;
  width: 33%;
  max-width: 45%;
  z-index: 5;
`;

const FloatingText = styled.p`
  margin: 0 0 18px 0;
  font-size: 1.25rem;
  line-height: 1.7;
  color: rgb(255, 255, 255);
  text-align: right;
  text-shadow: 
    0 2px 4px rgba(0, 0, 0, 0.6),
    0 4px 8px rgba(0, 0, 0, 0.4);
  filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.3));
  
  em {
    font-style: italic;
    font-weight: 700;
    color: #ffffff;
    text-shadow: 
      0 2px 4px rgba(0, 0, 0, 0.7),
      0 4px 8px rgba(0, 0, 0, 0.5),
      0 0 20px rgba(0, 0, 0, 0.4);
  }
  
  strong {
    font-weight: 700;
  }
`;

const PSNote = styled.p`
  position: absolute;
  top: 60%;
  right: 5%;
  width: 30%;
  max-width: 45%;
  margin: 0;
  font-size: 1rem;
  line-height: 1.7;
  color: rgb(255, 255, 255);
  text-align: right;
  font-style: italic;
  z-index: 5;
  text-shadow: 
    0 2px 4px rgba(0, 0, 0, 0.6),
    0 4px 8px rgba(0, 0, 0, 0.4);
  filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.3));
  
  em {
    font-weight: 700;
    font-style: italic;
    color: #ffffff;
    text-shadow: 
      0 2px 4px rgba(0, 0, 0, 0.7),
      0 4px 8px rgba(0, 0, 0, 0.5),
      0 0 20px rgba(0, 0, 0, 0.4);
  }
`;

// Ocean rail at bottom of grassy area
const OceanRail = styled.div`
  position: absolute;
  left: 0;
  bottom: 7%;
  width: 100%;
  height: 1.5rem;
  z-index: 4;

  /* posts - same style as bridge rail */
  background:
    repeating-linear-gradient(
      90deg, 
      transparent 0 16px,
      rgba(85,85,90,.95) 16px 20px
    );

  /* two rails */
  &::after {
    content:'';
    position: absolute;
    left: 0; right: 0;
    top: 3px;
    height: 3px;
    background: #6b6b70;
    box-shadow: 0 9px 0 #6b6b70; /* lower rail */
  }
`;

// Stone/concrete ocean wall below rail
const OceanWall = styled.div`
  position: absolute;
  left: 0;
  bottom: 0%;
  width: 100%;
  height: 10%;
  z-index: 3;
  
  /* Stone texture base with gradient - fully opaque */
  background: 
    linear-gradient(to bottom,
      rgb(80, 90, 95) 0%,
      rgb(70, 80, 85) 20%,
      rgb(60, 70, 75) 40%,
      rgb(50, 60, 70) 60%,
      rgb(40, 55, 65) 80%,
      rgb(35, 50, 60) 100%
    );
  
  /* Stone block pattern */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      /* Horizontal mortar lines */
      repeating-linear-gradient(
        0deg,
        transparent 0px,
        transparent 40px,
        rgba(30, 30, 35, 0.5) 40px,
        rgba(30, 30, 35, 0.5) 43px
      ),
      /* Vertical mortar lines */
      repeating-linear-gradient(
        90deg,
        transparent 0px,
        transparent 90px,
        rgba(30, 30, 35, 0.4) 90px,
        rgba(30, 30, 35, 0.4) 93px
      );
    opacity: 1;
    mask-image: linear-gradient(to bottom, black 0%, black 60%, transparent 100%);
  }
  
  /* Stone texture detail */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      radial-gradient(circle at 15% 20%, rgba(255,255,255,0.12) 0%, transparent 4%),
      radial-gradient(circle at 45% 35%, rgba(255,255,255,0.08) 0%, transparent 3%),
      radial-gradient(circle at 70% 55%, rgba(255,255,255,0.1) 0%, transparent 3.5%),
      radial-gradient(circle at 30% 70%, rgba(0,0,0,0.15) 0%, transparent 4%),
      radial-gradient(circle at 85% 25%, rgba(0,0,0,0.12) 0%, transparent 3%),
      radial-gradient(circle at 60% 85%, rgba(255,255,255,0.09) 0%, transparent 3%);
    opacity: 0.7;
  }
`;
