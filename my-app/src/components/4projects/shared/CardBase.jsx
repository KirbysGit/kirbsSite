// cardbase.jsx

// wanted to modularize the overall style for cards so this is the base card.

// imports.
import React from 'react';
import styled from 'styled-components';

/* ================== main component ================== */

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

/* ================= styles ================= */

// entire project card.
const ProjectCard = styled.div`
    /* layout */
    display: flex;
    overflow: hidden;
    position: relative;
    flex-direction: column;
    
    /* spacing */
    width: 500px;
    min-height: 600px;
    padding: 2rem 1.5rem;
    
    /* styles */
    border-radius: 24px;
    transition: all 0.4s ease;
    box-shadow: 0 1px 4px rgba(0,0,0,0.06);
    backdrop-filter: blur(20px) saturate(110%);
    -webkit-backdrop-filter: blur(20px) saturate(110%);
    border: 1px solid ${({ $theme, $themeColors }) => $theme ? $themeColors.border : 'rgba(255,180,100,0.4)'};
    background: ${({ $theme, $themeColors, $isFocused }) => {
        if (!$theme) return 'rgba(20,20,20,0.9)';
        
        if ($isFocused) {
            return $themeColors.background?.replace(/rgba\(([^,]+),([^,]+),([^,]+),([^)]+)\)/g, 'rgba($1,$2,$3,1.0)') || $themeColors.background;
        }
        
        return $themeColors.background;
    }};
    
    /* hover effects */
    &:hover {
        box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        border-color: ${({ $theme, $themeColors }) => $theme ? $themeColors.hoverBorder : undefined};
        background: ${({ $theme, $themeColors, $isFocused }) => {
            if (!$theme) return undefined;
            
            if ($isFocused) {
                // When focused, make hover background fully opaque too
                return $themeColors.hoverBackground?.replace(/rgba\(([^,]+),([^,]+),([^,]+),([^)]+)\)/g, 'rgba($1,$2,$3,1.0)') || $themeColors.hoverBackground;
            }
            
            return $themeColors.hoverBackground;
        }};
    }
    
    /* media queries */
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
    
    @media (max-width: 768px) {
        width: 90%;
        max-width: 340px;
        min-height: auto;
        margin: 0 auto;
        padding: 1.25rem 1.25rem 0.5rem 1.25rem;
    }
`;

/* ================= header area ================= */

export const CardHeader = styled.div`
    /* layout */
    z-index: 1;
    display: flex;
    position: relative;
    flex-direction: column;
    
    /* spacing */
    gap: 0.5rem;
    
    /* media queries */
    @media (max-width: 1600px) {
        gap: 0.4rem;
    }
`;

export const HeaderTop = styled.div`
    /* layout */
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    
    /* spacing */
    gap: 1rem;
`;

export const ProjectInfo = styled.div`
    /* layout */
    flex: 1;
    display: flex;
    flex-direction: column;
    
    /* spacing */
    gap: 0.5rem;
    
    /* media queries */
    @media (max-width: 1600px) {
        gap: 0.4rem;
    }
`;

export const ProjectName = styled.h3`
    /* spacing */
    margin: 0;
    
    /* styles */
    font-weight: 700;
    line-height: 1.2;
    font-size: 2.5rem;
    letter-spacing: -0.5px;
    text-shadow: 0 2px 8px rgba(0,0,0,0.35);
    
    ${({ $themeColors }) => $themeColors?.nameGradient ? `
        background: ${$themeColors.nameGradient};
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    ` : `color: #fff;`}
    
    /* media queries */
    @media (max-width: 2000px) {
        font-size: 2.35rem;
    }

    @media (max-width: 1600px) {
        font-size: 2.1rem;
        line-height: 1.15;
    }
`;

export const ProjectSubtitle = styled.div`
    /* spacing */
    margin: 0;
    
    /* styles */
    font-weight: 500;
    font-size: 1.1rem;
    font-style: italic;
    color: rgba(255,255,255,0.95);
`;

export const ProjectDate = styled.span`
    /* styles */
    font-weight: 500;
    font-size: 0.9rem;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.9);
    
    /* media queries */
    @media (max-width: 1600px) {
        font-size: 0.85rem;
    }
`;

export const ProjectLogoImage = styled.img`
    /* spacing */
    width: 110px;
    height: auto;
    
    /* styles */
    border-radius: 12px;
    object-fit: contain;
    
    /* media queries */
    @media (max-width: 2000px) {
        width: 100px;
    }

    @media (max-width: 1600px) {
        width: 95px;
    }
`;

export const ProjectDescription = styled.p`
    /* spacing */
    margin: 0;
    
    /* styles */
    line-height: 1.6;
    font-weight: 400;
    font-size: 0.95rem;
    text-align: justify;
    color: rgba(255,255,255,0.95);
    
    /* media queries */
    @media (max-width: 2000px) {
        font-size: 0.9rem;
        line-height: 1.55;
    }

    @media (max-width: 1600px) {
        font-size: 0.85rem;
        line-height: 1.5;
    }
`;

/* ================= card body ================= */

export const CardBody = styled.div`
    /* layout */
    flex: 1;
    z-index: 1;
    display: flex;
    position: relative;
    flex-direction: column;
    
    /* spacing */
    gap: 0.25rem;
    
    /* media queries */
    @media (max-width: 1600px) {
        gap: 0.2rem;
    }
`;

export const SectionLabel = styled.div`
    /* styles */
    font-weight: 700;
    font-size: 0.85rem;
    letter-spacing: 1px;
    text-transform: uppercase;
    
    ${({ $themeColors }) => $themeColors?.labelGradient ? `
        background: ${$themeColors.labelGradient};
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    ` : `color: rgba(255,255,255,0.9);`}
    
    /* media queries */
    @media (max-width: 1600px) {
        font-size: 0.8rem;
        letter-spacing: 0.9px;
    }
`;

/* ================= card footer ================= */

export const CardFooter = styled.div`
    /* layout */
    z-index: 1;
    display: flex;
    position: relative;
    flex-direction: column;
    
    /* spacing */
    margin-top: auto;
    padding-top: 0.5rem;
    
    /* media queries */
    @media (max-width: 1600px) {
        padding-top: 0.4rem;
    }
`;

/* ================= divider ================= */

export const Divider = styled.div`
    /* spacing */
    width: 100%;
    height: 2px;
    margin-top: 0.25rem;
    margin-bottom: 0.75rem;
    
    /* styles */
    opacity: 0.75;
    border-radius: 2px;
    background: ${({ $themeColors }) => $themeColors?.dividerGradient || 'rgba(255,255,255,0.2)'};
    box-shadow: ${({ $themeColors }) => $themeColors?.dividerShadow || '0 0 10px rgba(255,255,255,0.2)'};
    
    /* media queries */
    @media (max-width: 1600px) {
        margin-top: 0.2rem;
        margin-bottom: 0.65rem;
    }
`;