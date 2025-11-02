// skills.jsx

// where i show off the skills i think are relevant to me. 
// decided to make it a building skyline style to make it more interesting.

// imports.
import React from 'react';
import styled, { keyframes } from 'styled-components';

// local imports.
import SkillTower from './SkillTower';
import { getLogo } from '../Utils/logoMap';
import HotAirBalloon from './HotAirBalloon';
import { buildingPalettes, buildingMaterialMap, buildings } from './skylineConfig';

// cloud component from experience.
import Cloud from '../3experience/Cloud';

// import balloon logos.
import gitLogo from '@/images/logos/git.png';
import canvaLogo from '@/images/logos/canva.png';
import figmaLogo from '@/images/logos/figma.png';
import msofficeLogo from '@/images/logos/msoffice.png';

// utility to create layered skyline config
const makeLayeredSkyline = () => {
  return buildings.map((building) => {
    const logoSrc = getLogo(building.name);
    const material = buildingMaterialMap[building.name] || "steel";
    const palette = buildingPalettes[material];
    
    return {
      ...building,
      logoSrc,
      palette
    };
  });
};

const Skills = () => {
    // make layered skyline.
    const skyline = makeLayeredSkyline();

    return (
        <SkillsContainer>
            {/* atmospheric elements */}
            <AtmosphereLayer>
                {/* seam softener between projects and skills */}
                <TopSeamFade />
                
                {/* horizontal moving clouds at the top - left to right */}
                <CloudLayer>
                    {/* far layer clouds */}
                    <Cloud top="8%" delay="0" duration="200" layer="far" type={1} direction="left" />
                    <Cloud top="12%" delay="40" duration="220" layer="far" type={3} direction="left" />
                    <Cloud top="5%" delay="80" duration="190" layer="far" type={2} direction="left" />
                    
                    {/* mid layer clouds */}
                    <Cloud top="10%" delay="15" duration="160" layer="mid" type={4} direction="left" />
                    <Cloud top="6%" delay="60" duration="175" layer="mid" type={2} direction="left" />
                    
                    {/* near layer clouds */}
                    <Cloud top="9%" delay="50" duration="140" layer="near" type={5} direction="left" />
                    
                    {/* additional clouds that come in later */}
                    {/* far layer */}
                    <Cloud top="7%" delay="80" duration="205" layer="far" type={4} direction="left" />
                    <Cloud top="11%" delay="90" duration="195" layer="far" type={5} direction="left" />
                    
                    {/* mid layer */}
                    <Cloud top="9%" delay="120" duration="170" layer="mid" type={1} direction="left" />
                    <Cloud top="4%" delay="85" duration="165" layer="mid" type={3} direction="left" />
                    
                    {/* near layer */}
                    <Cloud top="8%" delay="110" duration="145" layer="near" type={3} direction="left" />
                </CloudLayer>
                
            </AtmosphereLayer>
            
            {/* content wrapper */}
            <ContentWrapper>
                <SectionTitle>Skills</SectionTitle>
                <SectionSubtitle>Technologies I work with</SectionSubtitle>
            </ContentWrapper>

            {/* skyline row */}
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

            {/* building foundation base */}
            <BuildingFoundation />

            {/* upper sidewalk (above road) */}
            <UpperSidewalk />
            
            {/* road leading to buildings */}
            <Road />
            
            {/* harbor water - behind the bridge rail */}
            <HarborWater>
                <RippleLayer />
            </HarborWater>
            
            {/* hot air balloons above the water - distant, over the harbor */}
            {/* git - orange and white */}
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
            
            {/* canva - teal and white/purple */}
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
            
            {/* figma - multicolor with white */}
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
            
            {/* ms office - red, orange, blue, green */}
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
            
            {/* floating text section */}
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
            {/* right-side bridge group (unified) */}
            
            {/* lower sidewalk (below road) */}
            <LowerSidewalk />
            
            {/* grassy base layer - left side only */}
            <GrassyBase />
            
            {/* ocean rail at bottom of grass */}
            <OceanRail />
            
            {/* ocean wall below rail - water starts in background section */}
            <OceanWall />
            
        </SkillsContainer>
    );
};

// export component.
export default Skills;

/* ================= styles ================= */

// main container - bright blue sky with grassy base and ocean.
const SkillsContainer = styled.div`
    /* layout */
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    overflow-x: hidden;
    
    /* spacing */
    width: 100%;
    min-height: 100vh;
    padding: 4rem 2rem;
    padding-top: 0;
    
    /* styles */
    background: linear-gradient(to bottom,
        rgb(71, 160, 238) 0%,
        rgb(75, 165, 240) 5%,
        rgb(80, 170, 242) 10%,
        rgb(85, 175, 244) 15%,
        rgb(90, 180, 246) 20%,
        rgb(95, 185, 248) 25%,
        rgb(100, 190, 250) 30%,
        rgb(105, 195, 252) 35%,
        rgb(110, 200, 254) 40%,
        rgb(115, 205, 255) 45%,
        rgb(120, 210, 255) 50%,
        rgb(125, 215, 255) 55%,
        rgb(130, 220, 255) 60%,
        rgb(135, 225, 255) 65%,
        rgb(140, 230, 255) 70%,
        rgb(135, 225, 250) 75%,
        rgb(130, 220, 245) 80%,
        rgb(125, 215, 240) 85%,
        rgb(120, 210, 235) 90%,
        rgb(115, 205, 230) 95%,
        rgb(110, 200, 225) 100%);
    
    /* media queries */
    @media (max-width: 1600px) {
        padding-top: 4rem; /* More top padding to prevent title/subtitle cutoffs */
        min-height: 95vh; /* Slightly reduce height */
    }
`;

// atmosphere layer for visual elements.
const AtmosphereLayer = styled.div`
    /* layout */
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    pointer-events: none;
    overflow: hidden;
`;

// cloud layer container for horizontal moving clouds.
const CloudLayer = styled.div`
    /* layout */
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    pointer-events: none;
    overflow: hidden;
`;

// soft gradient at the top to blend the seam from projects into skills.
const TopSeamFade = styled.div`
    /* layout */
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
    pointer-events: none;
    
    /* spacing */
    height: 16vh;
    
    /* styles */
    background: linear-gradient(
        to bottom,
        rgba(71, 160, 238, 1) 0%,
        rgba(71, 160, 238, 0.5) 50%,
        rgba(71, 160, 238, 0) 100%
    );
    @supports (background: linear-gradient(in oklch, red, blue)) {
        background: linear-gradient(
            to bottom in oklch,
            #6eb0f2 0%,
            color-mix(in oklch, #6eb0f2 50%, transparent) 50%,
            transparent 100%
        );
    }
`;

// content wrapper.
const ContentWrapper = styled.div`
    /* layout */
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 2;
    
    /* spacing */
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
    
    /* media queries */
    @media (max-width: 1600px) {
        padding: 1.5rem;
        margin-top: -0.5rem;
    }
    
    @media (max-width: 1200px) {
        padding: 1rem;
    }
`;

// section title.
const SectionTitle = styled.h1`
    /* layout */
    text-align: center;
    margin: 0;
    
    /* styles */
    font-size: 6rem;
    font-weight: 900;
    text-shadow: 0 4px 20px rgba(255, 150, 50, 0.3);
    background: linear-gradient(135deg, 
        rgba(255, 255, 255, 0.95) 0%,
        rgba(255, 200, 100, 0.9) 50%,
        rgba(255, 150, 50, 0.95) 100%);
	background-clip: text;
	-webkit-text-fill-color: transparent;
	-webkit-background-clip: text;
    
    /* media queries */
    @media (max-width: 1600px) {
        font-size: 4rem;
    }
`;

// section subtitle.
const SectionSubtitle = styled.h2`
    /* layout */
    text-align: center;
    margin: 0;
    margin-top: 0.5rem;
    margin-bottom: 3rem;
    
    /* styles */
    font-size: 2rem;
    font-weight: 400;
    font-style: italic;
    color: rgba(255, 255, 255, 0.85);
    text-shadow: 0 2px 10px rgba(255, 255, 255, 0.2);
    
    /* media queries */
    @media (max-width: 1600px) {
        font-size: 1.5rem;
        margin-bottom: 2.5rem;
    }
`;

// road below sidewalk with perspective.
const Road = styled.div`
    /* layout */
    position: absolute;
    bottom: 11.5%;
    left: 0;
    transform: translateX(-7.5%);
    z-index: 2;
    
    /* spacing */
    width: 120%;
    height: 3rem;
    
    /* road surface */
    &::before {
        /* layout */
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        
        /* spacing */
        height: 100%;
        
        /* styles */
        transform: perspective(150px) rotateX(15deg);
        transform-origin: bottom;
        background: linear-gradient(to top,
            rgb(60, 60, 60) 0%,      /* Dark asphalt */
            rgb(80, 80, 80) 30%,    /* Medium gray */
            rgb(100, 100, 100) 60%, /* Lighter gray */
            rgb(120, 120, 120) 100% /* Light gray */
        );
    }
    
    /* center line markings */
    &::after {
        /* layout */
        content: '';
        position: absolute;
        bottom: 45%;
        left: 0;
        right: 0;
        
        /* spacing */
        height: 2px;
        
        /* styles */
        opacity: 0.8;
        transform: translateX(-2.5%) perspective(150px) rotateX(15deg);
        transform-origin: bottom;
        background: repeating-linear-gradient(
            90deg,
            transparent 0px,
            transparent 20px,
            rgb(255, 255, 255) 20px,
            rgb(255, 255, 255) 40px
        );
    }
    
    /* media queries */
    @media (max-width: 1600px) {
        bottom: 12.5%; /* Move down to maintain spacing */
        height: 2.5rem; /* Slightly smaller */
    }
`;

// skyline row.
const SkylineRow = styled.div`
    /* layout */
    position: absolute;
    bottom: 17%;
    left: 0;
    z-index: 1.5;
    
    /* spacing */
    width: 60%;  /* Match sidewalk width */
    height: px;  /* Tall enough for scaled-up buildings */
    
    /* media queries */
    @media (max-width: 1600px) {
        left: -5%;
        bottom: 18.5%; /* Move down slightly to prevent cutoffs */
        transform: scale(0.82); /* Scale both width and height proportionally to maintain aspect ratio */
        transform-origin: bottom center; /* Scale from bottom center */
        z-index: 3; /* Higher z-index to ensure buildings stay above foundation and water with transform stacking context */
    }
`;

// building foundation - base for buildings to sit on.
const BuildingFoundation = styled.div`
    /* layout */
    position: absolute;
    bottom: 16%;
    left: 0;
    transform: translateX(-10.5%);
    z-index: 2;
    
    /* spacing */
    width: 59.25%;
    height: 1.5rem;
    
    /* foundation surface */
    &::before {
        /* layout */
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        
        /* spacing */
        height: 100%;
        
        /* styles */
        transform: perspective(150px) rotateX(15deg);
        transform-origin: bottom;
        box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.2);
        background: linear-gradient(to top,
            rgb(80, 80, 85) 0%,      /* Dark concrete base */
            rgb(95, 95, 100) 25%,    /* Medium dark */
            rgb(110, 110, 115) 50%,  /* Medium */
            rgb(125, 125, 130) 75%,  /* Medium light */
            rgb(140, 140, 145) 100%  /* Light concrete top */
        );
    }
    
    /* foundation edge detail */
    &::after {
        /* layout */
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        
        /* spacing */
        height: 100%;
        
        /* styles */
        transform: perspective(150px) rotateX(15deg);
        transform-origin: bottom;
        background: repeating-linear-gradient(
            90deg,
            rgba(0, 0, 0, 0.08) 0px,
            rgba(0, 0, 0, 0.08) 2px,
            transparent 2px,
            transparent 30px
        );
    }
    
    /* media queries */
    @media (max-width: 1600px) {
        bottom: 17.5%; /* Move down proportionally with skyline */
        width: 40%; /* Slightly narrower */
    }
`;

// grassy base layer for buildings (shrunk for ocean).
const GrassyBase = styled.div`
    /* layout */
    position: absolute;
    bottom: 7%;
    left: 0;
    transform: translateX(-7.5%);
    z-index: 4;
    
    /* spacing */
    width: 120%;
    height: 2rem;
    
    /* grass surface */
    &::before {
        /* layout */
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        
        /* spacing */
        height: 100%;
        
        /* styles */
        transform: perspective(150px) rotateX(15deg);
        transform-origin: bottom;
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
    }
    
    /* multi-layered grass texture */
    &::after {
        /* layout */
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        
        /* spacing */
        height: 100%;
        
        /* styles */
        opacity: 0.85;
        transform: perspective(150px) rotateX(15deg);
        transform-origin: bottom;
        mix-blend-mode: multiply;
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
    }
    
    /* media queries */
    @media (max-width: 1600px) {
        bottom: 8%; /* Move down proportionally */
        height: 1.75rem; /* Slightly smaller */
    }
`;

// upper sidewalk. (above road)
const UpperSidewalk = styled.div`
    /* layout */
    position: absolute;
    bottom: 15.5%;
    left: 0;
    transform: translateX(-10.5%);
    z-index: 2;
    
    /* spacing */
    width: 120%;
    height: 1.25rem;
    
    /* sidewalk surface */
    &::before {
        /* layout */
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        
        /* spacing */
        height: 100%;
        
        /* styles */
        transform: perspective(150px) rotateX(15deg);
        transform-origin: bottom;
        background: linear-gradient(to top,
            rgb(180, 180, 180) 0%,    /* Light grey sidewalk */
            rgb(200, 200, 200) 30%,  /* Medium light grey */
            rgb(220, 220, 220) 60%,  /* Lighter grey */
            rgb(240, 240, 240) 100%  /* Very light grey */
        );
    }
    
    /* sidewalk texture */
    &::after {
        /* layout */
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        
        /* spacing */
        height: 100%;
        
        /* styles */
        transform: perspective(150px) rotateX(15deg);
        transform-origin: bottom;
        background: repeating-linear-gradient(
            90deg,
            transparent 0px,
            transparent 12px,
            rgba(0, 0, 0, 0.05) 12px,
            rgba(0, 0, 0, 0.05) 24px
        );
    }
    
    /* media queries */
    @media (max-width: 1600px) {
        bottom: 16.5%; /* Move down proportionally */
        height: 1.1rem; /* Slightly smaller */
    }
`;

// lower sidewalk. (below road)
const LowerSidewalk = styled.div`
    /* layout */
    position: absolute;
    bottom: 10%;
    left: 0;
    transform: translateX(-5.5%);
    z-index: 2;
    
    /* spacing */
    width: 110%;
    height: 1.25rem;
    
    /* sidewalk surface */
    &::before {
        /* layout */
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        
        /* spacing */
        height: 100%;
        
        /* styles */
        transform: perspective(150px) rotateX(15deg);
        transform-origin: bottom;
        background: linear-gradient(to top,
            rgb(180, 180, 180) 0%,    /* Light grey sidewalk */
            rgb(200, 200, 200) 30%,  /* Medium light grey */
            rgb(220, 220, 220) 60%,  /* Lighter grey */
            rgb(240, 240, 240) 100%  /* Very light grey */
        );
    }
    
    /* sidewalk texture */
    &::after {
        /* layout */
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        
        /* spacing */
        height: 100%;
        
        /* styles */
        transform: perspective(150px) rotateX(15deg);
        transform-origin: bottom;
        background: repeating-linear-gradient(
            90deg,
            transparent 0px,
            transparent 12px,
            rgba(0, 0, 0, 0.05) 12px,
            rgba(0, 0, 0, 0.05) 24px
        );
    }
    
    /* media queries */
    @media (max-width: 1600px) {
        bottom: 11%; /* Move down proportionally */
        height: 1.1rem; /* Slightly smaller */
    }
`;

// keyframes for water animations.
const waveScroll = keyframes`
  0%   { background-position: 0 0, 0 0; }
  100% { background-position: -140px 0, -80px 0; }
`;

// ripple pulse.
const ripplePulse = keyframes`
  0%   { opacity: 0.30; }
  100% { opacity: 0.55; }
`;

// unified harbor water.
const HarborWater = styled.div`
    /* layout */
    position: absolute;
    right: -50%;
    bottom: 0;
    transform: perspective(220px) rotateX(12deg) translateZ(0);
    transform-origin: bottom right;
    overflow: hidden;
    z-index: 0.5; /* Lower than buildings (z-index: 1.5) and foundation (z-index: 2) */
    
    /* spacing */
    width: 150%;
    height: 30rem;
    
    /* styles */
    background: linear-gradient(to top,
        #1b517a 0%,
        #2b6a96 35%,
        #3b82b1 65%,
        #61b9e0 100%
    );
    
    /* horizon bloom */
    &::before {
        /* layout */
        content: '';
        position: absolute;
        inset: 0;
        pointer-events: none;
        
        /* styles */
        background: linear-gradient(to top, transparent 70%, rgba(255, 255, 255, 0.25));
    }

    /* shimmer stripes */
    &::after {
        /* layout */
        content: '';
        position: absolute;
        inset: 0;
        
        /* styles */
        opacity: 0.35;
        will-change: background-position;
        mix-blend-mode: screen;
        animation: ${waveScroll} 12s linear infinite;
        background:
            repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.08) 0 3px, transparent 3px 42px),
            repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.05) 0 2px, transparent 2px 66px);
    }
    
    /* media queries */
    @media (max-width: 1600px) {
        height: 26rem; /* Slightly smaller */
    }
`;

// ripple layer. (sits inside the rotated plane)
const RippleLayer = styled.div`
    /* layout */
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0.5; /* Inherit from parent container context */
    
    /* styles */
    mix-blend-mode: screen;
    mask-image: linear-gradient(to top, black 60%, transparent 95%); /* fade near horizon */
    animation: ${ripplePulse} 5s ease-in-out infinite alternate;
    background:
        radial-gradient(40px 20px at 20% 65%, rgba(255, 255, 255, 0.18) 0, rgba(255, 255, 255, 0.08) 45%, transparent 70%),
        radial-gradient(55px 25px at 48% 50%, rgba(255, 255, 255, 0.14) 0, rgba(255, 255, 255, 0.07) 40%, transparent 70%),
        radial-gradient(34px 18px at 70% 60%, rgba(255, 255, 255, 0.12) 0, rgba(255, 255, 255, 0.06) 30%, transparent 70%);
`;

// compact guardrail with posts, sharing the same slant.
const BridgeRail = styled.div`
    /* layout */
    position: absolute;
    right: 0%;
    bottom: 17%;
    z-index: 1;
    
    /* spacing */
    width: 50%;
    height: 1.5rem;
    
    /* styles */
    background:
        repeating-linear-gradient(
            90deg, 
            transparent 0 16px,
            rgba(85,85,90,.95) 16px 20px
        );
    
    /* two rails */
    &::after {
        /* layout */
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        top: 3px;
        
        /* spacing */
        height: 3px;
        
        /* styles */
        clip-path: inherit;
        background: #6b6b70;
        box-shadow: 0 9px 0 #6b6b70; /* lower rail */
    }
    
    /* media queries */
    @media (max-width: 1600px) {
        bottom: 18.5%; /* Move down proportionally */
        width: 59%;
    }
`;

// floating text container.
const FloatingTextContainer = styled.div`
    /* layout */
    position: absolute;
    top: 34%;
    right: 5%;
    z-index: 5;
    
    /* spacing */
    width: 33%;
    max-width: 45%;
    
    /* media queries */
    @media (max-width: 1600px) {
        top: 34%; /* Move up slightly to prevent overlap */
        width: 36%; /* Slightly narrower */
    }
`;

// floating text for explaining skills.
const FloatingText = styled.p`
    /* layout */
    text-align: right;
    margin: 0 0 18px 0;
    
    /* styles */
    font-size: 1.25rem;
    line-height: 1.7;
    color: rgb(255, 255, 255);
    filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.3));
    text-shadow: 
        0 2px 4px rgba(0, 0, 0, 0.6),
        0 4px 8px rgba(0, 0, 0, 0.4);
    
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
    
    /* media queries */
    @media (max-width: 1600px) {
        font-size: 1.1rem; /* Reduced font size */
        line-height: 1.6; /* Tighter line height */
        margin: 0 0 14px 0; /* Reduced spacing */
    }
`;

// little ps note at bottom.
const PSNote = styled.p`
    /* layout */
    position: absolute;
    top: 60%;
    right: 5%;
    text-align: right;
    z-index: 5;
    margin: 0;
    
    /* spacing */
    width: 30%;
    max-width: 45%;
    
    /* styles */
    font-size: 1rem;
    font-style: italic;
    line-height: 1.7;
    color: rgb(255, 255, 255);
    filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.3));
    text-shadow: 
        0 2px 4px rgba(0, 0, 0, 0.6),
        0 4px 8px rgba(0, 0, 0, 0.4);
    
    em {
        font-weight: 700;
        font-style: italic;
        color: #ffffff;
        text-shadow: 
            0 2px 4px rgba(0, 0, 0, 0.7),
            0 4px 8px rgba(0, 0, 0, 0.5),
            0 0 20px rgba(0, 0, 0, 0.4);
    }
    
    /* media queries */
    @media (max-width: 1600px) {
        top: 62%; /* Move up to prevent overlap */
        width: 28%; /* Slightly narrower */
        font-size: 0.9rem; /* Reduced font size */
        line-height: 1.6; /* Tighter line height */
    }
`;

// ocean rail at bottom of grassy area.
const OceanRail = styled.div`
    /* layout */
    position: absolute;
    left: 0;
    bottom: 7%;
    z-index: 4;
    
    /* spacing */
    width: 100%;
    height: 1.5rem;
    
    /* styles */
    background:
        repeating-linear-gradient(
            90deg, 
            transparent 0 16px,
            rgba(85,85,90,.95) 16px 20px
        );
    
    /* two rails */
    &::after {
        /* layout */
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        top: 3px;
        
        /* spacing */
        height: 3px;
        
        /* styles */
        background: #6b6b70;
        box-shadow: 0 9px 0 #6b6b70; /* lower rail */
    }
    
    /* media queries */
    @media (max-width: 1600px) {
        bottom: 8%; /* Move down proportionally */
        height: 1.3rem; /* Slightly smaller */
    }
`;

// stone/concrete ocean wall below rail.
const OceanWall = styled.div`
    /* layout */
    position: absolute;
    left: 0;
    bottom: 0%;
    z-index: 3;
    
    /* spacing */
    width: 100%;
    height: 10%;
    
    /* styles */
    background: 
        linear-gradient(to bottom,
            rgb(80, 90, 95) 0%,
            rgb(70, 80, 85) 20%,
            rgb(60, 70, 75) 40%,
            rgb(50, 60, 70) 60%,
            rgb(40, 55, 65) 80%,
            rgb(35, 50, 60) 100%
        );
    
    /* stone block pattern */
    &::before {
        /* layout */
        content: '';
        position: absolute;
        inset: 0;
        
        /* styles */
        opacity: 1;
        mask-image: linear-gradient(to bottom, black 0%, black 60%, transparent 100%);
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
    }
    
    /* stone texture detail */
    &::after {
        /* layout */
        content: '';
        position: absolute;
        inset: 0;
        
        /* styles */
        opacity: 0.7;
        background-image:
            radial-gradient(circle at 15% 20%, rgba(255,255,255,0.12) 0%, transparent 4%),
            radial-gradient(circle at 45% 35%, rgba(255,255,255,0.08) 0%, transparent 3%),
            radial-gradient(circle at 70% 55%, rgba(255,255,255,0.1) 0%, transparent 3.5%),
            radial-gradient(circle at 30% 70%, rgba(0,0,0,0.15) 0%, transparent 4%),
            radial-gradient(circle at 85% 25%, rgba(0,0,0,0.12) 0%, transparent 3%),
            radial-gradient(circle at 60% 85%, rgba(255,255,255,0.09) 0%, transparent 3%);
    }
    
    /* media queries */
    @media (max-width: 1600px) {
        height: 9%; /* Slightly smaller */
    }
`;
