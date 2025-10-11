import React from 'react';
import styled, { keyframes } from 'styled-components';
import HotAirBalloon from './HotAirBalloon';
import SkillTower from './SkillTower';
import { getLogo } from '../Utils/logoMap';

// Realistic building material palettes
const palettes = {
  // Modern glass tower (blue-tinted glass)
  glass_blue: { base:"#8BA5B8", mid:"#6B8599", dark:"#4A5F6E", accent:"#B5C9D8" },
  // Sleek steel/aluminum (cool grays)
  steel: { base:"#A0A8B0", mid:"#7E868E", dark:"#5C646C", accent:"#C8D0D8" },
  // Concrete high-rise (warm grays)
  concrete: { base:"#B8B0A8", mid:"#968E86", dark:"#746C64", accent:"#D8D0C8" },
  // Modern glass tower (greenish tint)
  glass_green: { base:"#9BB5A8", mid:"#7B9588", dark:"#5B7568", accent:"#BBD5C8" },
  // Sandstone/beige building
  sandstone: { base:"#C8B8A0", mid:"#A89880", dark:"#887860", accent:"#E8D8C0" },
  // Brick building (reddish-brown)
  brick: { base:"#B89888", mid:"#987868", dark:"#785848", accent:"#D8B8A8" },
  // Dark modern tower (charcoal)
  charcoal: { base:"#888890", mid:"#686870", dark:"#484850", accent:"#A8A8B0" },
  // Limestone/tan building
  limestone: { base:"#C0B0A0", mid:"#A09080", dark:"#807060", accent:"#E0D0C0" },
};

// Map buildings to realistic material types for variety
const buildingMaterialMap = {
  "AWS": "charcoal",
  "PostgreSQL": "glass_blue",
  "React": "steel",
  "Django": "concrete",
  "Python": "glass_green",
  "FastAPI": "limestone",
  "Docker": "glass_blue",
  "JavaScript": "sandstone",
  "Bootstrap": "brick",
  "Figma": "steel",
  "UI / UX Design": "concrete",
  "Tailwind CSS": "glass_green",
  "Postman": "sandstone",
  "Vercel": "charcoal",
};

// Your requested skills (mix of specific + general). Add/remove freely.
const SKILLS_INPUT = [
  "Python", "JavaScript", "React",
  "PostgreSQL", "AWS", "FastAPI",
  "Flutter", "Postman", "Tailwind CSS",
  "Bootstrap", "Vercel", "Django",
  // optional "general" ones (no logo needed, still look good):
  "UI / UX Design", "Data Modeling", "Machine Learning"
];

// utility to create layered skyline config
const makeLayeredSkyline = (names) => {
  const logoSrc = getLogo;

  // BACK layer (tall skyscrapers in the distance - spread across horizon)
  const backLayer = [
    { name: "AWS", level: 0.98, depth: 0.35, leftPos: 5, overlap: 0, w: 95, cap: "crown" },
    { name: "PostgreSQL", level: 0.75, depth: 0.4, leftPos: 18, overlap: 0, w: 155, cap: "flat" },
    { name: "React", level: 0.92, depth: 0.45, leftPos: 35, overlap: 0, w: 105, cap: "peak" },
    { name: "Django", level: 0.65, depth: 0.38, leftPos: 52, overlap: 0, w: 135, cap: "billboard" },
    { name: "Python", level: 0.88, depth: 0.42, leftPos: 72, overlap: 0, w: 115, cap: "crown" }
  ];

  // MID layer (medium height, moderate depth - interspersed positions)
  const midLayer = [
    { name: "FastAPI", level: 0.82, depth: 0.65, leftPos: 12, overlap: 0, w: 100, cap: "peak" },
    { name: "Docker", level: 0.58, depth: 0.68, leftPos: 28, overlap: 0, w: 120, cap: "flat" },
    { name: "JavaScript", level: 0.76, depth: 0.62, leftPos: 45, overlap: 0, w: 92, cap: "billboard" },
    { name: "Bootstrap", level: 0.48, depth: 0.7, leftPos: 64, overlap: 0, w: 135, cap: "flat" }
  ];

  // FRONT layer (foreground buildings - strategically placed in front)
  const frontLayer = [
    { name: "Figma", level: 0.62, depth: 0.92, leftPos: 8, overlap: 0, w: 85, cap: "crown" },
    { name: "UI / UX Design", level: 0.35, depth: 0.95, leftPos: 22, overlap: 0, w: 105, cap: "flat" },
    { name: "Tailwind CSS", level: 0.55, depth: 0.98, leftPos: 38, overlap: 0, w: 90, cap: "peak" },
    { name: "Postman", level: 0.42, depth: 0.88, leftPos: 55, overlap: 0, w: 100, cap: "flat" },
    { name: "Vercel", level: 0.68, depth: 0.9, leftPos: 75, overlap: 0, w: 80, cap: "billboard" }
  ];

  // Combine all layers
  const allBuildings = [...backLayer, ...midLayer, ...frontLayer];
  
  return allBuildings.map((building) => {
    const logoSrc = getLogo(building.name);
    const material = buildingMaterialMap[building.name] || "steel"; // default to steel if not mapped
    const palette = palettes[material];
    
    return {
      ...building,
      logoSrc,
      palette
    };
  });
};

const Skills = () => {
    const skyline = makeLayeredSkyline(SKILLS_INPUT);

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
                        overlap={b.overlap}
                        depth={b.depth}
                        cap={b.cap}
                        leftPos={b.leftPos}
                    />
                ))}
            </SkylineRow>

            {/* Upper Sidewalk (above road) */}
            <UpperSidewalk />
            
            {/* Road leading to buildings */}
            <Road />
            
            {/* Lower Sidewalk (below road) */}
            <LowerSidewalk />
            
            {/* Grassy Base Layer */}
            <GrassyBase />
            
            
            
        </SkillsContainer>
    );
};

export default Skills;

/* ================= Styles ================= */

// Main container - bright blue sky with grassy base
const SkillsContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    
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
    bottom: 16%;
    left: 0;
    width: 50%;
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
  bottom: 22%;
  left: 0;
  width: 50%;  /* Match sidewalk width */
  height: 850px;  /* Tall enough for scaled-up buildings */
  
  /* Buildings position themselves absolutely within this container */
  z-index: 3;
`;

// Grassy base layer for buildings with perspective
const GrassyBase = styled.div`
    border: 2px solid blue;
    position: absolute;
    bottom: 8%;
    left: 0;
    width: 55%;
    height: 4rem;
    z-index: 1;

    transform: translateX(-7.5%);
    
    /* Grass surface with perspective */
    &::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 100%;
        background: linear-gradient(to top,
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
    
    /* Grass texture effect with perspective */
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
            transparent 8px,
            rgba(0, 100, 0, 0.3) 8px,
            rgba(0, 100, 0, 0.3) 16px
        );
        transform: perspective(150px) rotateX(15deg);
        transform-origin: bottom;
    }
`;

// Upper Sidewalk (above road) with perspective
const UpperSidewalk = styled.div`
    position: absolute;
    bottom: 20%;
    left: 0;
    width: 50%;
    height: 1.25rem;
    z-index: 4;

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
    bottom: 13.5%;
    left: 0;
    width: 50%;
    height: 1.75rem;
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