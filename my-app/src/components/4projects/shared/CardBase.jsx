import React from 'react';
import styled from 'styled-components';

// Shared base card component with common styling patterns
const CardBase = ({ 
  children, 
  theme, 
  themeName, 
  themeColors = {},
  isFocused = false,
  className 
}) => {
  return (
    <ProjectCard $theme={theme} $themeName={themeName} $themeColors={themeColors} $isFocused={isFocused} className={className}>
      {children}
    </ProjectCard>
  );
};

export default CardBase;

/* ================= Shared Card Styling ================= */

const ProjectCard = styled.div`
  width: 500px;
  min-height: 600px;
  position: relative;
  overflow: hidden;

  /* Dynamic theme-based background - fully opaque when focused */
  background: ${({ $theme, $themeColors, $isFocused }) => {
    if (!$theme) return 'rgba(20,20,20,0.9)';
    
    if ($isFocused) {
      // When focused, make background fully opaque by replacing rgba alpha values with 1.0
      return $themeColors.background?.replace(/rgba\(([^,]+),([^,]+),([^,]+),([^)]+)\)/g, 'rgba($1,$2,$3,1.0)') || $themeColors.background;
    }
    
    return $themeColors.background;
  }};
  
  backdrop-filter: blur(20px) saturate(110%);
  -webkit-backdrop-filter: blur(20px) saturate(110%);

  border: 1px solid ${({ $theme, $themeColors }) => $theme ? $themeColors.border : 'rgba(255,180,100,0.4)'};
  border-radius: 24px;
  
  /* Light, barely noticeable shadow */
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);

  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  transition: all 0.4s ease;

  &:hover {
    background: ${({ $theme, $themeColors, $isFocused }) => {
      if (!$theme) return undefined;
      
      if ($isFocused) {
        // When focused, make hover background fully opaque too
        return $themeColors.hoverBackground?.replace(/rgba\(([^,]+),([^,]+),([^,]+),([^)]+)\)/g, 'rgba($1,$2,$3,1.0)') || $themeColors.hoverBackground;
      }
      
      return $themeColors.hoverBackground;
    }};
    /* Light hover shadow - barely noticeable */
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    border-color: ${({ $theme, $themeColors }) => $theme ? $themeColors.hoverBorder : undefined};
  }

  /* Responsive breakpoints */
  @media (max-width: 2000px) {
    padding: 1.85rem 1.4rem;
  }

  @media (max-width: 1600px) {
    width: 100%;
    max-width: 500px;
    min-height: 540px;
    padding: 1.6rem 1.2rem;
  }
  
  @media (max-width: 1200px) {
    width: 100%;
    max-width: 450px;
    min-height: 500px;
    padding: 1.6rem 1.2rem;
  }
  
  @media (max-width: 900px) {
    width: 100%;
    max-width: 400px;
    min-height: 450px;
    padding: 1.4rem 1rem;
  }
`;

/* ================= Common Card Components ================= */

export const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
  z-index: 1;

  @media (max-width: 1600px) {
    gap: 0.4rem;
  }
`;

export const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
`;

export const ProjectInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;

  @media (max-width: 1600px) {
    gap: 0.4rem;
  }
`;

export const ProjectName = styled.h3`
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
  text-shadow: 0 2px 8px rgba(0,0,0,0.35);
  letter-spacing: -0.5px;
  line-height: 1.2;
  
  ${({ $themeColors }) => $themeColors?.nameGradient ? `
    background: ${$themeColors.nameGradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  ` : `color: #fff;`}

  @media (max-width: 2000px) {
    font-size: 2.35rem;
  }

  @media (max-width: 1600px) {
    font-size: 2.1rem;
    line-height: 1.15;
  }
`;

export const ProjectSubtitle = styled.div`
  font-size: 1.1rem;
  color: rgba(255,255,255,0.95);
  font-weight: 500;
  font-style: italic;
  margin: 0;
`;

export const ProjectDate = styled.span`
  font-size: 0.9rem;
  color: rgba(255,255,255,0.9);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  @media (max-width: 1600px) {
    font-size: 0.85rem;
  }
`;

export const ProjectLogoImage = styled.img`
  width: 110px;
  height: auto;
  border-radius: 12px;
  object-fit: contain;

  @media (max-width: 2000px) {
    width: 100px;
  }

  @media (max-width: 1600px) {
    width: 95px;
  }
`;

export const ProjectDescription = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: rgba(255,255,255,0.95);
  margin: 0;
  font-weight: 400;
  text-align: justify;

  @media (max-width: 2000px) {
    font-size: 0.9rem;
    line-height: 1.55;
  }

  @media (max-width: 1600px) {
    font-size: 0.85rem;
    line-height: 1.5;
  }
`;

export const Divider = styled.div`
  width: 100%;
  height: 2px;
  background: ${({ $themeColors }) => $themeColors?.dividerGradient || 'rgba(255,255,255,0.2)'};
  opacity: 0.75;
  border-radius: 2px;
  box-shadow: ${({ $themeColors }) => $themeColors?.dividerShadow || '0 0 10px rgba(255,255,255,0.2)'};
  margin-top: 0.25rem;
  margin-bottom: 0.75rem;

  @media (max-width: 1600px) {
    margin-top: 0.2rem;
    margin-bottom: 0.65rem;
  }
`;

export const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 0.25rem;
  position: relative;
  z-index: 1;

  @media (max-width: 1600px) {
    gap: 0.2rem;
  }
`;

export const SectionLabel = styled.div`
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  
  ${({ $themeColors }) => $themeColors?.labelGradient ? `
    background: ${$themeColors.labelGradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  ` : `color: rgba(255,255,255,0.9);`}

  @media (max-width: 1600px) {
    font-size: 0.8rem;
    letter-spacing: 0.9px;
  }
`;

export const CardFooter = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 0.5rem;
  margin-top: auto;
  position: relative;
  z-index: 1;

  @media (max-width: 1600px) {
    padding-top: 0.4rem;
  }
`;
