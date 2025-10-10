import React from 'react';
import styled from 'styled-components';

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

/* ================= Highlights Styling ================= */

const HighlightsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const Highlight = styled.div`
  display: flex;
  align-items: center;
  padding: 0.625rem 1rem 0.625rem 1.25rem;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  
  background: ${({ $themeColors }) => 
    $themeColors?.highlightBackground || 'rgba(255,180,100,0.08)'};
  
  /* Gradient left border */
  border-left: 4px solid transparent;
  border-image: ${({ $themeColors }) => 
    $themeColors?.highlightBorderImage || 'linear-gradient(180deg, rgb(255, 140, 60) 0%, rgb(255, 180, 100) 100%)'};
  border-image-slice: 1;
  
  transition: all 0.3s ease;

  &:hover {
    background: ${({ $themeColors }) => 
      $themeColors?.highlightHoverBackground || 'rgba(255,180,100,0.15)'};
    transform: translateX(6px);
    box-shadow: ${({ $themeColors }) => 
      $themeColors?.highlightHoverShadow || '0 4px 12px rgba(255,180,100,0.2)'};
    
    /* Thicker border on hover */
    border-left-width: 5px;
  }
`;

const HighlightText = styled.p`
  font-size: 0.92rem;
  line-height: 1.6;
  color: rgba(255,255,255,0.92);
  margin: 0;
  flex: 1;
  font-weight: 400;
  text-align: justify;
`;
