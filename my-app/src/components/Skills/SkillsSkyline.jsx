import React, { useId, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

/* ---------- Component ---------- */
const SkillsSkyline = ({
  skills,
  autoParallax = true,
  className
}) => {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    if (!autoParallax) return;
    
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [autoParallax]);

  return (
    <Section className={className}>
      <ParallaxBackground $scrollY={scrollY}>
        <DistantSilhouette />
      </ParallaxBackground>
      
      <ContentWrapper>
        <Row>
          {skills.map((skill, index) => (
            <Building
              key={skill.name}
              skill={skill}
              variant={skill.variant || ['slab', 'setback', 'round', 'glass'][index % 4]}
              palette={palettes[skill.category || 'other']}
            />
          ))}
        </Row>
        
        <GroundHaze />
      </ContentWrapper>
    </Section>
  );
};

export default SkillsSkyline;

/* ---------- Building Component ---------- */
const Building = ({ skill, variant, palette }) => {
  const id = useId();
  const height = Math.round(18 + skill.level * 42);
  const width = variant === 'round' ? 88 : variant === 'glass' ? 84 : 76;
  
  const BuildingComponent = {
    slab: SlabBuilding,
    setback: SetbackBuilding,
    round: RoundBuilding,
    glass: GlassBuilding
  }[variant];

  return (
    <BuildingWrapper>
      <BuildingComponent
        id={id}
        width={width}
        height={height}
        palette={palette}
        logoSrc={skill.logoSrc}
        label={skill.name}
        skill={skill}
      />
      <Label>{skill.name}</Label>
      <Shadow />
    </BuildingWrapper>
  );
};

/* ---------- Building Variants ---------- */
const SlabBuilding = ({ id, width, height, palette, logoSrc, label, skill }) => (
  <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
    <defs>
      <linearGradient id={`${id}-face`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor={palette.accent} />
        <stop offset="100%" stopColor={palette.base} />
      </linearGradient>
      <linearGradient id={`${id}-side`} x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor={palette.dark} />
        <stop offset="100%" stopColor={palette.base} />
      </linearGradient>
      <pattern id={`${id}-windows`} patternUnits="userSpaceOnUse" width="8" height="12">
        <rect width="6" height="8" fill="rgba(200,220,255,0.28)" rx="1" />
      </pattern>
      <pattern id={`${id}-windows-lit`} patternUnits="userSpaceOnUse" width="8" height="12">
        <rect width="6" height="8" fill="rgba(255,238,170,0.9)" rx="1" />
      </pattern>
    </defs>
    
    {/* Right side depth */}
    <polygon 
      points={`${width-12},0 ${width},8 ${width},${height-8} ${width-12},${height}`}
      fill={`url(#${id}-side)`}
    />
    
    {/* Main face */}
    <rect 
      x="0" y="0" width={width-12} height={height} 
      fill={`url(#${id}-face)`} 
      rx="4"
    />
    
    {/* Window patterns */}
    <rect x="8" y="12" width={width-28} height={height-24} fill={`url(#${id}-windows)`} rx="2" />
    <rect x="8" y="12" width={width-28} height="24" fill={`url(#${id}-windows-lit)`} rx="2" />
    
    {/* Rooftop accent */}
    <rect x={width/2-8} y="0" width="16" height="6" fill={palette.accent} rx="3" />
    
    {/* Logo plaque */}
    {logoSrc && (
      <g>
        <rect x={width/2-20} y="20" width="40" height="24" fill="rgba(255,255,255,0.9)" rx="6" />
        <image href={logoSrc} x={width/2-16} y="24" width="32" height="16" />
      </g>
    )}
    
    <title>{label} proficiency building</title>
    <desc>A {Math.round(skill.level * 100)}% proficiency building in the skills skyline</desc>
  </svg>
);

const SetbackBuilding = ({ id, width, height, palette, logoSrc, label, skill }) => {
  const tierHeight = height / 3;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <linearGradient id={`${id}-face`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={palette.accent} />
          <stop offset="100%" stopColor={palette.base} />
        </linearGradient>
        <linearGradient id={`${id}-side`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={palette.dark} />
          <stop offset="100%" stopColor={palette.base} />
        </linearGradient>
        <pattern id={`${id}-windows`} patternUnits="userSpaceOnUse" width="8" height="12">
          <rect width="6" height="8" fill="rgba(200,220,255,0.28)" rx="1" />
        </pattern>
        <pattern id={`${id}-windows-lit`} patternUnits="userSpaceOnUse" width="8" height="12">
          <rect width="6" height="8" fill="rgba(255,238,170,0.9)" rx="1" />
        </pattern>
      </defs>
      
      {/* Tier 3 (top) */}
      <polygon points={`${width-16},0 ${width},6 ${width},${tierHeight-6} ${width-16},${tierHeight}`} fill={`url(#${id}-side)`} />
      <rect x="0" y="0" width={width-16} height={tierHeight} fill={`url(#${id}-face)`} rx="4" />
      <rect x="6" y="8" width={width-28} height={tierHeight-16} fill={`url(#${id}-windows-lit)`} rx="2" />
      
      {/* Tier 2 (middle) */}
      <polygon points={`${width-12},${tierHeight} ${width},${tierHeight+6} ${width},${tierHeight*2-6} ${width-12},${tierHeight*2}`} fill={`url(#${id}-side)`} />
      <rect x="0" y={tierHeight} width={width-12} height={tierHeight} fill={`url(#${id}-face)`} rx="4" />
      <rect x="6" y={tierHeight+8} width={width-24} height={tierHeight-16} fill={`url(#${id}-windows)`} rx="2" />
      
      {/* Tier 1 (bottom) */}
      <polygon points={`${width-8},${tierHeight*2} ${width},${tierHeight*2+4} ${width},${height-4} ${width-8},${height}`} fill={`url(#${id}-side)`} />
      <rect x="0" y={tierHeight*2} width={width-8} height={tierHeight} fill={`url(#${id}-face)`} rx="4" />
      <rect x="6" y={tierHeight*2+8} width={width-20} height={tierHeight-16} fill={`url(#${id}-windows)`} rx="2" />
      
      {/* Rooftop antenna */}
      <rect x={width/2-1} y="0" width="2" height="8" fill={palette.accent} />
      <circle cx={width/2} cy="8" r="3" fill={palette.accent} />
      
      {/* Logo billboard */}
      {logoSrc && (
        <g>
          <rect x={width/2-18} y="12" width="36" height="20" fill="rgba(255,255,255,0.9)" rx="4" />
          <image href={logoSrc} x={width/2-14} y="16" width="28" height="12" />
        </g>
      )}
      
      <title>{label} proficiency building</title>
      <desc>A {Math.round(skill.level * 100)}% proficiency building in the skills skyline</desc>
    </svg>
  );
};

const RoundBuilding = ({ id, width, height, palette, logoSrc, label, skill }) => (
  <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
    <defs>
      <linearGradient id={`${id}-face`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor={palette.accent} />
        <stop offset="100%" stopColor={palette.base} />
      </linearGradient>
      <linearGradient id={`${id}-side`} x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor={palette.dark} />
        <stop offset="100%" stopColor={palette.base} />
      </linearGradient>
      <pattern id={`${id}-windows`} patternUnits="userSpaceOnUse" width="12" height="16">
        <rect width="8" height="12" fill="rgba(200,220,255,0.28)" rx="2" />
      </pattern>
      <pattern id={`${id}-windows-lit`} patternUnits="userSpaceOnUse" width="12" height="16">
        <rect width="8" height="12" fill="rgba(255,238,170,0.9)" rx="2" />
      </pattern>
    </defs>
    
    {/* Right side depth */}
    <ellipse cx={width-8} cy={height/2} rx="8" ry={height/2-4} fill={`url(#${id}-side)`} />
    
    {/* Main face */}
    <ellipse cx={width/2-4} cy={height/2} rx={width/2-4} ry={height/2-4} fill={`url(#${id}-face)`} />
    
    {/* Vertical window bands */}
    <rect x="12" y="16" width="8" height={height-32} fill={`url(#${id}-windows-lit)`} rx="4" />
    <rect x="24" y="16" width="8" height={height-32} fill={`url(#${id}-windows)`} rx="4" />
    <rect x="36" y="16" width="8" height={height-32} fill={`url(#${id}-windows)`} rx="4" />
    <rect x="48" y="16" width="8" height={height-32} fill={`url(#${id}-windows-lit)`} rx="4" />
    
    {/* Crown bar */}
    <rect x={width/2-12} y="0" width="24" height="8" fill={palette.accent} rx="4" />
    
    {/* Logo plaque */}
    {logoSrc && (
      <g>
        <ellipse cx={width/2-4} cy="24" rx="20" ry="12" fill="rgba(255,255,255,0.9)" />
        <image href={logoSrc} x={width/2-16} y="18" width="24" height="12" />
      </g>
    )}
    
    <title>{label} proficiency building</title>
    <desc>A {Math.round(skill.level * 100)}% proficiency building in the skills skyline</desc>
  </svg>
);

const GlassBuilding = ({ id, width, height, palette, logoSrc, label, skill }) => (
  <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
    <defs>
      <linearGradient id={`${id}-face`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor={palette.accent} />
        <stop offset="100%" stopColor={palette.base} />
      </linearGradient>
      <linearGradient id={`${id}-side`} x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor={palette.dark} />
        <stop offset="100%" stopColor={palette.base} />
      </linearGradient>
      <linearGradient id={`${id}-glass`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
        <stop offset="50%" stopColor="rgba(255,255,255,0.1)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0.2)" />
      </linearGradient>
    </defs>
    
    {/* Right side depth */}
    <polygon 
      points={`${width-10},0 ${width},5 ${width},${height-5} ${width-10},${height}`}
      fill={`url(#${id}-side)`}
    />
    
    {/* Main face */}
    <rect x="0" y="0" width={width-10} height={height} fill={`url(#${id}-face)`} rx="6" />
    
    {/* Glass mullions */}
    <rect x="8" y="0" width="2" height={height} fill="rgba(255,255,255,0.4)" />
    <rect x="16" y="0" width="2" height={height} fill="rgba(255,255,255,0.4)" />
    <rect x="24" y="0" width="2" height={height} fill="rgba(255,255,255,0.4)" />
    <rect x="32" y="0" width="2" height={height} fill="rgba(255,255,255,0.4)" />
    <rect x="40" y="0" width="2" height={height} fill="rgba(255,255,255,0.4)" />
    <rect x="48" y="0" width="2" height={height} fill="rgba(255,255,255,0.4)" />
    
    {/* Glass panels */}
    <rect x="10" y="8" width="6" height={height-16} fill="rgba(200,220,255,0.15)" rx="1" />
    <rect x="18" y="8" width="6" height={height-16} fill="rgba(255,238,170,0.2)" rx="1" />
    <rect x="26" y="8" width="6" height={height-16} fill="rgba(200,220,255,0.15)" rx="1" />
    <rect x="34" y="8" width="6" height={height-16} fill="rgba(255,238,170,0.2)" rx="1" />
    <rect x="42" y="8" width="6" height={height-16} fill="rgba(200,220,255,0.15)" rx="1" />
    
    {/* Glass sheen */}
    <rect x="0" y="0" width={width-10} height={height} fill={`url(#${id}-glass)`} rx="6" />
    
    {/* Rooftop beam */}
    <rect x={width/2-16} y="0" width="32" height="6" fill={palette.accent} rx="3" />
    
    {/* Logo billboard */}
    {logoSrc && (
      <g>
        <rect x={width/2-18} y="16" width="36" height="20" fill="rgba(255,255,255,0.9)" rx="6" />
        <image href={logoSrc} x={width/2-14} y="20" width="28" height="12" />
      </g>
    )}
    
    <title>{label} proficiency building</title>
    <desc>A {Math.round(skill.level * 100)}% proficiency building in the skills skyline</desc>
  </svg>
);

/* ---------- Styled Components ---------- */

const Section = styled.section`
  position: relative;
  min-height: 60vh;
  width: 100vw;
  overflow: hidden;
  background: linear-gradient(to bottom,
    rgb(100, 70, 150) 0%,     /* Match Projects ending */
    rgb(110, 80, 160) 20%,
    rgb(120, 90, 170) 40%,
    rgb(130, 100, 180) 60%,
    rgb(140, 110, 190) 80%,
    rgb(150, 120, 200) 100%   /* Warm dusk tones */
  );
`;

const ParallaxBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transform: translateY(${props => props.$scrollY * 0.3}px);
  z-index: 1;
`;

const DistantSilhouette = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 200px;
  background: linear-gradient(to top,
    rgba(0,0,0,0.1) 0%,
    rgba(0,0,0,0.05) 50%,
    transparent 100%
  );
  
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100px;
    background: repeating-linear-gradient(
      90deg,
      transparent 0px,
      transparent 20px,
      rgba(0,0,0,0.1) 20px,
      rgba(0,0,0,0.1) 40px
    );
    clip-path: polygon(0% 100%, 10% 80%, 20% 90%, 30% 70%, 40% 85%, 50% 75%, 60% 95%, 70% 80%, 80% 90%, 90% 70%, 100% 85%, 100% 100%);
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 2rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const Row = styled.div`
  display: flex;
  align-items: flex-end;
  gap: clamp(16px, 3vw, 36px);
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
    gap: clamp(12px, 2vw, 24px);
  }
`;

const BuildingWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: default;
  transition: transform 0.3s ease, filter 0.3s ease;
  
  @media (hover: hover) {
    &:hover {
      transform: translateY(-6px);
      filter: drop-shadow(0 8px 20px rgba(0,0,0,0.3));
    }
  }
`;

const Label = styled.div`
  margin-top: 8px;
  padding: 4px 8px;
  font-size: 0.8rem;
  font-weight: 600;
  color: rgba(255,255,255,0.9);
  background: rgba(0,0,0,0.3);
  border-radius: 8px;
  white-space: nowrap;
  text-shadow: 0 1px 2px rgba(0,0,0,0.5);
  backdrop-filter: blur(4px);
`;

const Shadow = styled.div`
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 12px;
  background: radial-gradient(ellipse, rgba(0,0,0,0.2) 0%, transparent 70%);
  border-radius: 50%;
`;

const GroundHaze = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: linear-gradient(to top,
    rgba(255,255,255,0.12) 0%,
    rgba(255,255,255,0.06) 50%,
    transparent 100%
  );
  pointer-events: none;
`;

/* ---------- Data & Palettes ---------- */
const palettes = {
  frontend: { base: "#6EC1FF", dark: "#2C6FB5", accent: "#B8E3FF" },
  backend: { base: "#FF8B6A", dark: "#C44D38", accent: "#FFD4C8" },
  devops: { base: "#6FD0A5", dark: "#2C8B6D", accent: "#BFEAD9" },
  data: { base: "#C4A3FF", dark: "#6B55B8", accent: "#E7DAFF" },
  design: { base: "#FFC371", dark: "#BD6A29", accent: "#FFE1B5" },
  other: { base: "#B9C6D2", dark: "#71808E", accent: "#E4EBF2" }
};
