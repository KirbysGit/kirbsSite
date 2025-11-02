// techstack.jsx

// how we're formatting the tech stack for each project card.

// imports.
import React, { useState } from 'react';
import styled from 'styled-components';
import { getLogo } from '@/components/Utils/logoMap';

// main techstack component.
const TechStack = ({ techs, themeColors }) => {
  const [hoveredTech, setHoveredTech] = useState(null);

  return (
    <TechStackContainer>
      {techs.map((tech) => (
        <TechPillWrapper
          key={tech}
          onMouseEnter={() => setHoveredTech(tech)}
          onMouseLeave={() => setHoveredTech(null)}
        >
          <TechPill $themeColors={themeColors}>
            <TechLogo src={getLogo(tech)} alt={tech} />
          </TechPill>
          <Tooltip $visible={hoveredTech === tech} $themeColors={themeColors}>
            {tech}
          </Tooltip>
        </TechPillWrapper>
      ))}
    </TechStackContainer>
  );
};

// export component.
export default TechStack;

/* ================= styles ================= */

const TechStackContainer = styled.div`
    /* layout */
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    
    /* spacing */
    gap: 0.75rem;
    
    /* media queries */
    @media (max-width: 2000px) {
        gap: 0.65rem;
    }

    @media (max-width: 1600px) {
        gap: 0.6rem;
    }
`;

const TechPillWrapper = styled.div`
    /* layout */
    position: relative;
    display: inline-block;
`;

const TechPill = styled.div`
    /* layout */
    display: flex;
    align-items: center;
    justify-content: center;
    
    /* spacing */
    width: 45px;
    height: 45px;
    
    /* styles */
    border-radius: 50%;
    cursor: pointer;
    border: 2px solid ${({ $themeColors }) => $themeColors?.pillBorder || 'rgba(255,180,100,0.5)'};
    transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
    box-shadow: ${({ $themeColors }) => 
        $themeColors?.pillShadow || '0 2px 8px rgba(255,180,100,0.2), inset 0 1px 2px rgba(255,255,255,0.9)'};
    background: ${({ $themeColors }) => 
        $themeColors?.pillBackground || 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(255,250,245,0.98) 50%, rgba(255,245,235,0.95) 100%)'};
    
    /* hover effects */
    ${TechPillWrapper}:hover & {
        transform: translateY(-4px) scale(1.08);
        border-color: ${({ $themeColors }) => $themeColors?.pillHoverBorder || 'rgba(255,180,100,0.8)'};
        box-shadow: ${({ $themeColors }) => 
            $themeColors?.pillHoverShadow || '0 8px 20px rgba(255,180,100,0.4), inset 0 1px 3px rgba(255,255,255,1)'};
    }
    
    /* media queries */
    @media (max-width: 2000px) {
        width: 42px;
        height: 42px;
    }

    @media (max-width: 1600px) {
        width: 40px;
        height: 40px;
        border-width: 1.5px;
    }
`;

const TechLogo = styled.img`
    /* spacing */
    width: 28px;
    height: 28px;
    
    /* styles */
    object-fit: contain;
    filter: drop-shadow(0 1px 2px rgba(0,0,0,0.1));
    transition: filter 0.3s ease;
    
    /* hover effects */
    ${TechPillWrapper}:hover & {
        filter: drop-shadow(0 2px 4px rgba(0,0,0,0.15));
    }
    
    /* media queries */
    @media (max-width: 2000px) {
        width: 26px;
        height: 26px;
    }

    @media (max-width: 1600px) {
        width: 24px;
        height: 24px;
    }
`;

const Tooltip = styled.div`
    /* layout */
    position: absolute;
    bottom: calc(100% + 8px);
    left: 50%;
    z-index: 1000;
    pointer-events: none;
    transform: translateX(-50%) ${({ $visible }) => $visible ? 'translateY(0)' : 'translateY(4px)'};
    
    /* spacing */
    padding: 0.5rem 0.75rem;
    
    /* styles */
    opacity: ${({ $visible }) => $visible ? 1 : 0};
    border-radius: 8px;
    color: #fff;
    font-size: 0.75rem;
    font-weight: 700;
    white-space: nowrap;
    transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
    background: ${({ $themeColors }) => 
        $themeColors?.tooltipBackground || 'linear-gradient(135deg, rgba(255,140,60,0.95), rgba(255,160,100,0.95))'};
    box-shadow: ${({ $themeColors }) => 
        $themeColors?.tooltipShadow || '0 4px 12px rgba(255,140,60,0.4), 0 0 0 1px rgba(255,180,100,0.5)'};
    
    /* tooltip arrow */
    &::after {
        /* layout */
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        
        /* styles */
        border: 5px solid transparent;
        border-top-color: ${({ $themeColors }) => $themeColors?.tooltipArrow || 'rgba(255,140,60,0.95)'};
    }
`;
