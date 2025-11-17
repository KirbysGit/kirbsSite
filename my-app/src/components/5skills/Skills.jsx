// skills.jsx

// where i show off the skills i think are relevant to me. 
// decided to make it a building skyline style to make it more interesting.

// imports.
import React, { memo, useMemo } from 'react';
import styled, { keyframes } from 'styled-components';

// local imports.
import SkillTower from './SkillTower';
import { getLogo } from '../utils/logoMap';
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

/* ================== main component ================== */

const Skills = memo(() => {

    
    // memoize the skyline calculation.
    const skyline = useMemo(() => makeLayeredSkyline(), []);

    return (
        <SkillsContainer id="skills" data-section-snap>
            {/* atmospheric elements */}
            <AtmosphereLayer>
                {/* seam softener between projects and skills */}
                <TopSeamFade />
                
                {/* horizontal moving clouds at the top - left to right */}
                <CloudLayer>
                    {/* far layer clouds */}
                    <Cloud top="8%" delay="0" duration="200" layer="far" type={1} direction="left" />
                    <Cloud top="12%" delay="40" duration="220" layer="far" type={3} direction="left" />
                    
                    {/* mid layer clouds */}
                    <Cloud top="10%" delay="15" duration="160" layer="mid" type={4} direction="left" />
                    <Cloud top="6%" delay="60" duration="175" layer="mid" type={2} direction="left" />
                    <Cloud top="9%" delay="120" duration="170" layer="mid" type={1} direction="left" />
                    
                    {/* near layer clouds */}
                    <Cloud top="9%" delay="50" duration="140" layer="near" type={5} direction="left" />
                    <Cloud top="8%" delay="110" duration="145" layer="near" type={3} direction="left" />
                </CloudLayer>
                
            </AtmosphereLayer>
            
            {/* content wrapper */}
            <ContentWrapper>
                <SectionTitle data-snap-title>Skills</SectionTitle>
                <SectionSubtitle>Technologies I work with</SectionSubtitle>
            </ContentWrapper>

            {/* floating text section - right below title on mobile */}
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
            
            {/* hot air balloons - shrunk below text on mobile */}
            <BalloonsWrapper>
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
            </BalloonsWrapper>
            
            {/* harbor water - behind buildings on mobile */}
            <HarborWater>
                <RippleLayer />
            </HarborWater>
            
            {/* skyline row - below balloons on mobile */}
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
});

Skills.displayName = 'Skills';

// export component.
export default Skills;

/* ================= animated frames ================= */

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


/* ================= styles ================= */

// main container - bright blue sky with grassy base and ocean.
const SkillsContainer = styled.div`
    /* layout */
    display: flex;
    overflow: hidden;
    overflow-x: hidden;
    position: relative;
    flex-direction: column;
    
    /* gpu faster! */
    transform: translateZ(0);
    contain: layout style paint;
    
    /* spacing */
    width: 100%;
    min-height: 100vh;
    padding-top: 0;
    padding: 4rem 2rem;
    
    /* styles */
    background: linear-gradient(to bottom,
        rgb(71, 160, 238) 0%,
        rgb(90, 180, 246) 25%,
        rgb(115, 205, 255) 50%,
        rgb(135, 225, 255) 75%,
        rgb(110, 200, 225) 100%);
    
    /* media queries */
    @media (max-width: 1600px) {
        min-height: 95vh;
        padding-top: 4rem;
    }
    
    @media (max-width: 768px) {
        min-height: auto;
        overflow: visible;
        display: flex;
        flex-direction: column;
        padding-top: 2rem;
        padding: 2rem 1rem 0rem 1rem;
    }
`;

// atmosphere layer for visual elements.
const AtmosphereLayer = styled.div`
    /* layout */
    inset: 0;
    z-index: 1;
    overflow: hidden;
    position: absolute;
    pointer-events: none;
`;

// cloud layer container for horizontal moving clouds.
const CloudLayer = styled.div`
    /* layout */
    inset: 0;
    z-index: 1;
    overflow: hidden;
    position: absolute;
    pointer-events: none;
    
    /* gpu faster! */
    contain: layout style;
    will-change: transform;
    transform: translateZ(0);
    
    /* Pause animations during loading */
    [data-loading="true"] & {
        animation-play-state: paused;
    }
    
    /* Prevent selection */
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
`;

// soft gradient at the top to blend the seam from projects into skills.
const TopSeamFade = styled.div`
    /* layout */
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
    position: absolute;
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
        margin-top: -0.5rem;
    }
    
    @media (max-width: 1200px) {
        padding: 1rem;
    }
    
    @media (max-width: 768px) {
        padding: 1rem 0.5rem;
        margin-top: 0;
    }
`;

// section title.
const SectionTitle = styled.h1`
    /* layout */
    margin: 0;
    text-align: center;
    
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
    
    @media (max-width: 768px) {
        font-size: clamp(2.5rem, 8vw, 3.5rem);
    }
`;

// section subtitle.
const SectionSubtitle = styled.h2`
    /* layout */
    margin: 0;
    text-align: center;
    margin-top: 0.5rem;
    margin-bottom: 3rem;
    
    /* styles */
    font-size: 2rem;
    font-weight: 400;
    font-style: italic;
    color: rgba(255, 255, 255, 0.85);
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.7);
    
    /* media queries */
    @media (max-width: 1600px) {
        font-size: 1.5rem;
        margin-bottom: 2.5rem;
    }
    
    @media (max-width: 768px) {
        font-size: clamp(0.95rem, 3vw, 1.15rem);
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
    }
`;

// road below sidewalk with perspective.
const Road = styled.div`
    /* layout */
    left: 0;
    z-index: 2;
    bottom: 11.5%;
    position: absolute;
    transform: translateX(-7.5%);
    
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
    
    @media (max-width: 768px) {
        position: relative;
        bottom: auto;
        left: auto;
        transform: none;
        width: 200%;
        left: -50%;
        height: 1.5rem;
        margin: -0.1rem 0 0 0; /* No gaps - directly connected */
        z-index: 2;
    }
`;

// skyline row.
const SkylineRow = styled.div`
    /* layout */
    position: absolute;
    bottom: 17%;
    left: 4%;
    z-index: 3;
    
    /* gpu faster! */
    contain: layout style;
    transform: translateZ(0);
    
    /* spacing */
    width: 60%;
    height: auto;
    
    @media (max-width: 1900px) {
        left: 0%;
        width: 55%;
        transform: scale(0.92) translateZ(0);
        transform-origin: bottom center;
    }
    
    /* media queries */
    @media (max-width: 1600px) {
        left: -3.5%;
        bottom: 18.5%;
        transform: scale(0.82) translateZ(0);
        transform-origin: bottom center;
        z-index: 3;
    }
    
    @media (max-width: 768px) {
        position: relative;
        width: 200%;
        max-width: 200%;
        left: 50%;
        transform: translateX(-50%) scale(0.5) translateZ(0);
        transform-origin: center top;
        margin: 20rem 0 0 0;
        z-index: 3;
        contain: none;
        height: auto;
    }
`;

// building foundation - base for buildings to sit on.
const BuildingFoundation = styled.div`
    /* layout */
    left: 0;
    z-index: 2;
    bottom: 16%;
    position: absolute;
    transform: translateX(-10.5%);
    
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
        bottom: 17.5%;
        width: 40%;
    }
    
    @media (max-width: 768px) {
        position: relative;
        left: -50%;
        bottom: auto;
        transform: none;
        width: 200%;
        height: 1rem;
        margin: -0.5rem 0 0 0;
        z-index: 2;
    }
`;

// grassy base layer for buildings (shrunk for ocean).
const GrassyBase = styled.div`
    /* layout */
    left: 0;
    z-index: 4;
    bottom: 7%;
    position: absolute;
    transform: translateX(-7.5%);
    
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
            repeating-linear-gradient(
                90deg,
                transparent 0px,
                transparent 3px,
                rgba(0, 80, 0, 0.15) 3px,
                rgba(0, 80, 0, 0.15) 4px
            ),
            repeating-linear-gradient(
                90deg,
                transparent 0px,
                transparent 8px,
                rgba(0, 100, 0, 0.25) 8px,
                rgba(0, 100, 0, 0.25) 12px,
                transparent 12px,
                transparent 24px
            ),
            repeating-linear-gradient(
                75deg,
                transparent 0px,
                transparent 12px,
                rgba(20, 100, 20, 0.12) 12px,
                rgba(20, 100, 20, 0.12) 14px
            ),
            repeating-linear-gradient(
                105deg,
                transparent 0px,
                transparent 10px,
                rgba(15, 90, 15, 0.10) 10px,
                rgba(15, 90, 15, 0.10) 12px
            ),
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
        bottom: 8%;
        height: 1.75rem;
    }
    
    @media (max-width: 768px) {
        position: relative;
        bottom: auto;
        left: -50%;
        transform: none;
        width: 200%;
        height: 1rem;
        margin: -0.05rem 0 0 0;
        z-index: 2;
    }
`;

// upper sidewalk. (above road)
const UpperSidewalk = styled.div`
    /* layout */
    left: 0;
    z-index: 2;
    bottom: 15.5%;
    position: absolute;
    transform: translateX(-10.5%);
    
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
        bottom: 16.5%;
        height: 1.1rem;
    }
    
    @media (max-width: 768px) {
        position: relative;
        bottom: auto;
        left: -50%;
        transform: none;
        width: 200%;
        height: 0.75rem;
        margin: -0.5rem 0 0 0;
        z-index: 2;
    }
`;

// lower sidewalk. (below road)
const LowerSidewalk = styled.div`
    /* layout */
    left: 0;
    z-index: 2;
    bottom: 10%;
    position: absolute;
    transform: translateX(-5.5%);
    
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
        bottom: 11%;
        height: 1.1rem;
    }
    
    @media (max-width: 768px) {
        position: relative;
        bottom: auto;
        transform: none;
        width: 200%;
        left: -50%;
        height: 0.75rem;
        margin: -0.25rem 0 0 0;
        z-index: 2;
    }
`;

// unified harbor water.
const HarborWater = styled.div`
    /* layout */
    right: -50%;
    bottom: 0;
    z-index: 0.5;
    overflow: hidden;
    position: absolute;
    transform: perspective(220px) rotateX(12deg) translateZ(0);
    transform-origin: bottom right;
    
    /* gpu faster! */
    contain: layout style paint;
    will-change: transform;
    
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
        
        [data-loading="true"] & {
            animation-play-state: paused;
        }
    }
    
    /* media queries */
    @media (max-width: 1600px) {
        height: 26rem; /* Slightly smaller */
    }
    
    @media (max-width: 768px) {
        position: absolute;
        right: 0;
        bottom: 3rem;
        left: 0;
        transform: none;
        width: 100%;
        height: auto;
        min-height: 200px;
        max-height: 300px;
        z-index: 1;
        transform-origin: bottom;
    }
`;

// ripple layer. (sits inside the rotated plane)
const RippleLayer = styled.div`
    /* layout */
    inset: 0;
    z-index: 0.5;
    position: absolute;
    pointer-events: none;
    
    /* gpu faster! */
    will-change: opacity;
    transform: translateZ(0);
    
    /* styles */
    mix-blend-mode: screen;
    mask-image: linear-gradient(to top, black 60%, transparent 95%); /* fade near horizon */
    animation: ${ripplePulse} 5s ease-in-out infinite alternate;
    background:
        radial-gradient(40px 20px at 20% 65%, rgba(255, 255, 255, 0.18) 0, rgba(255, 255, 255, 0.08) 45%, transparent 70%),
        radial-gradient(55px 25px at 48% 50%, rgba(255, 255, 255, 0.14) 0, rgba(255, 255, 255, 0.07) 40%, transparent 70%),
        radial-gradient(34px 18px at 70% 60%, rgba(255, 255, 255, 0.12) 0, rgba(255, 255, 255, 0.06) 30%, transparent 70%);
    
    [data-loading="true"] & {
        animation-play-state: paused;
    }
`;

// compact guardrail with posts, sharing the same slant.
const BridgeRail = styled.div`
    /* layout */
    right: 0%;
    bottom: 17%;
    z-index: 1;
    position: absolute;
    
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
        bottom: 18.5%;
        width: 59%;
    }
    
    /* mobile */
    @media (max-width: 768px) {
        display: none;
    }
`;

// floating text container.
const FloatingTextContainer = styled.div`
    /* layout */
    top: 34%;
    right: 5%;
    z-index: 5;
    position: absolute;
    
    /* spacing */
    width: 33%;
    max-width: 45%;
    
    /* media queries */
    @media (max-width: 1600px) {
        top: 34%;
        width: 36%;
    }
    
    /* mobile */
    @media (max-width: 768px) {
        position: relative;
        top: auto;
        right: auto;
        width: 100%;
        max-width: 100%;
        padding: 0 1rem;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
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
        font-size: 1.1rem;
        line-height: 1.6;
        margin: 0 0 14px 0;
    }
    
    /* mobile */
    @media (max-width: 768px) {
        text-align: left;
        font-size: clamp(0.85rem, 2.5vw, 1rem);
        line-height: 1.5;
        margin: 0 0 12px 0;
    }
`;

// little ps note at bottom.
const PSNote = styled.p`
    /* layout */
    top: 60%;
    right: 5%;
    margin: 0;
    z-index: 5;
    text-align: right;
    position: absolute;
    
    /* spacing */
    width: 30%;
    max-width: 45%;
    
    /* styles */
    font-size: 1rem;
    font-style: italic;
    line-height: 1.7;
    color: rgb(255, 255, 255);
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
        top: 62%;
        width: 28%;
        font-size: 0.9rem;
        line-height: 1.6;
    }
    
    /* mobile */
    @media (max-width: 768px) {
        position: relative;
        top: auto;
        right: auto;
        width: 100%;
        max-width: 100%;
        text-align: left;
        padding: 0 1rem;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
        font-size: clamp(0.8rem, 2.5vw, 0.9rem);
        line-height: 1.5;
    }
`;

// balloons wrapper for mobile scaling
const BalloonsWrapper = styled.div`
    /* desktop - no wrapper needed, balloons positioned absolutely */
    @media (min-width: 769px) {
        inset: 0;
        z-index: 4;
        position: absolute;
        pointer-events: none;
    }
    
    /* mobile */
    @media (max-width: 768px) {
        position: relative;
        width: 100%;
        height: max-content;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
        margin: 0.5rem 0;
        pointer-events: none;
        z-index: 4;
        
        /* scale down balloons on mobile */
        & > * {
            transform: scale(0.4) !important;
            position: relative !important;
            top: auto !important;
            left: auto !important;
        }
    }
`;

// ocean rail at bottom of grassy area.
const OceanRail = styled.div`
    /* layout */
    left: 0;
    bottom: 7%;
    z-index: 4;
    position: absolute;
    
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
        bottom: 8%;
        height: 1.3rem;
    }
    
    /* mobile */
    @media (max-width: 768px) {
        position: relative;
        bottom: auto;
        left: -50%;
        width: 200%;
        height: 1rem;
        margin: -1rem 0 0 0;
        z-index: 4;
    }
`;

// stone/concrete ocean wall below rail.
const OceanWall = styled.div`
    /* layout */
    left: 0;
    z-index: 3;
    bottom: 0%;
    position: absolute;
    
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
    
    /* mobile */
    @media (max-width: 768px) {
        position: relative;
        bottom: auto;
        left: -50%;
        width: 200%;
        height: 3rem;
        margin: 0rem 0 0 0; /* No gaps - directly connected */
        z-index: 2;
    }
`;
