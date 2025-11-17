// reactionBubble.jsx

// iMessage-style reaction bubble component.

// imports.
import React from 'react';
import styled from 'styled-components';

/* ================== main component ================== */

const ReactionBubble = ({ 
  emoji = "🎓", 
  side = "left", 
  size = 68,
  color = "#0A84FF",
  top = "-1rem",
  horizontalOffset = "1rem"
}) => {

  // calculate tail sizes.
  const tail1Size = Math.round(size * 0.44);
  const tail2Size = Math.round(size * 0.26);
  
  return (
    <BubbleWrap $side={side} $top={top} $horizontalOffset={horizontalOffset}>
      {/* main bubble */}
      <MainBubble $size={size} $color={color}>
        <BubbleEmoji>{emoji}</BubbleEmoji>
      </MainBubble>
      
      {/* partly cut off circle */}
      <TailCircle1
        $size={tail1Size}
        $color={color}
        $side={side}
        $offsetX={Math.round(size * 0.01)}
        $offsetY={Math.round(size * -0.12)}
      />
      
      {/* small trailing dot */}
      <TailCircle2
        $size={tail2Size}
        $color={color}
        $side={side}
        $offsetX={Math.round(size * 0.2)}
        $offsetY={Math.round(size * -0.35)}
      />
    </BubbleWrap>
  );
};

export default ReactionBubble;

/* ====================== styled ====================== */

const BubbleWrap = styled.div`
    /* layout */
    position: absolute;
    top: ${({ $top }) => $top};
    pointer-events: none;
    ${({ $side, $horizontalOffset }) => 
        $side === "right" ? `right: ${$horizontalOffset};` : `left: ${$horizontalOffset};`}
    
    /* styles */
    z-index: 10;
    
    /* media queries */
    @media (max-width: 1600px) {
        transform: scale(0.9);
        transform-origin: ${({ $side }) => $side === "right" ? "top right" : "top left"};
    }
    
    @media (max-width: 1200px) {
        transform: scale(0.8);
        transform-origin: ${({ $side }) => $side === "right" ? "top right" : "top left"};
    }
`;

// main bubble w/ the emoji in it.
const MainBubble = styled.div`
    /* layout */
    position: relative;
    display: grid;
    place-items: center;
    
    /* spacing */
    width: ${({ $size }) => $size}px;
    height: ${({ $size }) => $size}px;
    border-radius: 9999px;
    
    /* styles */
    z-index: 2;
    transform: translateZ(0);
    background:
        radial-gradient(140% 120% at 30% 25%, rgba(255,255,255,.55) 0%,
            rgba(255,255,255,.25) 35%, rgba(255,255,255,0) 60%),
        ${({ $color }) => $color};
    box-shadow:
        0 8px 20px rgba(0,0,0,.25),
        inset 0 1px 2px rgba(255,255,255,.45),
        0 0 0 1px rgba(255,255,255,.18);
    
    /* media queries */
    @media (max-width: 1600px) {
        width: ${({ $size }) => Math.round($size * 0.85)}px;
        height: ${({ $size }) => Math.round($size * 0.85)}px;
    }
    
    @media (max-width: 1200px) {
        width: ${({ $size }) => Math.round($size * 0.75)}px;
        height: ${({ $size }) => Math.round($size * 0.75)}px;
    }
`;

const BubbleEmoji = styled.span`
    /* spacing */
    font-size: 2.25rem;
    line-height: 1;
    
    /* styles */
    filter: drop-shadow(0 1px 1px rgba(0,0,0,.2));
    
    /* media queries */
    @media (max-width: 1600px) {
        font-size: clamp(1.7rem, 2vw, 1.9rem);
    }
    
    @media (max-width: 1200px) {
        font-size: clamp(1.5rem, 1.8vw, 1.7rem);
    }
`;

// circle attached to bubble slightly cut off.
const TailCircle1 = styled.div`
    /* layout */
    position: absolute;
    bottom: ${({ $offsetY }) => `${$offsetY}px`};
    ${({ $side, $offsetX }) =>
        $side === "right" ? `right: ${-$offsetX}px;` : `left: ${-$offsetX}px;`}
    
    /* spacing */
    width: ${({ $size }) => $size}px;
    height: ${({ $size }) => $size}px;
    border-radius: 9999px;
    
    /* styles */
    z-index: 1;
    background:
        radial-gradient(140% 120% at 30% 25%, rgba(255,255,255,.45) 0%,
            rgba(255,255,255,.2) 35%, rgba(255,255,255,0) 60%),
        ${({ $color }) => $color};
    box-shadow:
        0 6px 14px rgba(0,0,0,.18),
        0 0 0 1px rgba(255,255,255,.14);
    
    /* media queries */
    @media (max-width: 1600px) {
        width: ${({ $size }) => Math.round($size * 0.85)}px;
        height: ${({ $size }) => Math.round($size * 0.85)}px;
    }
    
    @media (max-width: 1200px) {
        width: ${({ $size }) => Math.round($size * 0.75)}px;
        height: ${({ $size }) => Math.round($size * 0.75)}px;
    }
`;

// small trailing dot.
const TailCircle2 = styled(TailCircle1)`
    /* layout */
    bottom: ${({ $offsetY }) => `${$offsetY}px`};
    ${({ $side, $offsetX }) =>
        $side === "right" ? `right: ${-$offsetX}px;` : `left: ${-$offsetX}px;`}
    
    /* spacing */
    width: ${({ $size }) => $size}px;
    height: ${({ $size }) => $size}px;
    
    /* styles */
    z-index: 0;
    box-shadow:
        0 4px 10px rgba(0,0,0,.16),
        0 0 0 1px rgba(255,255,255,.12);
    
    /* media queries */
    @media (max-width: 1600px) {
        height: ${({ $size }) => Math.round($size * 0.85)}px;
    }
    
    @media (max-width: 1200px) {
        height: ${({ $size }) => Math.round($size * 0.75)}px;
    }
`;

