// highlights.jsx

// how we set up the highlights list for each project card.

// imports.
import React from 'react';
import styled from 'styled-components';

/* ================== main component ================== */

const Highlights = ({ highlights, themeColors }) => {
  return (
    <HighlightsList>
      {highlights.map((highlight, index) => (
        <Highlight key={index} $themeColors={themeColors}>
          <HighlightText>{highlight}</HighlightText>
        </Highlight>
      ))}
    </HighlightsList>
  );
};

export default Highlights;

/* ================= styles ================= */

const HighlightsList = styled.div`
    /* layout */
    display: flex;
    flex-direction: column;
    
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

const Highlight = styled.div`
    /* layout */
    display: flex;
    overflow: hidden;
    position: relative;
    align-items: center;
    
    /* spacing */
    padding: 0.625rem 1rem 0.625rem 1.25rem;
    
    /* styles */
    border-radius: 8px;
    border-left: 4px solid transparent;
    border-image: ${({ $themeColors }) => 
        $themeColors?.highlightBorderImage || 'linear-gradient(180deg, rgb(255, 140, 60) 0%, rgb(255, 180, 100) 100%)'};
    border-image-slice: 1;
    transition: all 0.3s ease;
    background: ${({ $themeColors }) => 
        $themeColors?.highlightBackground || 'rgba(255,180,100,0.08)'};
    
    /* hover effects */
    &:hover {
        transform: translateX(6px);
        background: ${({ $themeColors }) => 
            $themeColors?.highlightHoverBackground || 'rgba(255,180,100,0.15)'};
        box-shadow: ${({ $themeColors }) => 
            $themeColors?.highlightHoverShadow || '0 4px 12px rgba(255,180,100,0.2)'};
        border-left-width: 5px;
    }
    
    /* media queries */
    @media (max-width: 2000px) {
        padding: 0.55rem 0.9rem 0.55rem 1.1rem;
    }

    @media (max-width: 1600px) {
        padding: 0.5rem 0.85rem 0.5rem 1rem;
        border-left-width: 3px;
    }
`;

const HighlightText = styled.p`
    /* layout */
    flex: 1;
    
    /* spacing */
    margin: 0;
    
    /* styles */
    font-weight: 400;
    line-height: 1.6;
    font-size: 0.92rem;
    text-align: justify;
    color: rgba(255,255,255,0.92);
    
    /* media queries */
    @media (max-width: 2000px) {
        font-size: 0.88rem;
        line-height: 1.55;
    }

    @media (max-width: 1600px) {
        font-size: 0.83rem;
        line-height: 1.5;
    }
`;
