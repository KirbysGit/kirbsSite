import React from 'react';
import styled, { keyframes } from 'styled-components';

/**
 * iMessage-style reaction bubble component
 * 
 * @param {string} emoji - The emoji to display (default: "🎓")
 * @param {string} side - Which side to place the tail: "left" or "right" (default: "left")
 * @param {number} size - Diameter of main bubble in px (default: 68)
 * @param {string} color - Bubble color, hex or CSS color (default: "#0A84FF" iOS blue)
 * @param {string} top - CSS top position (default: "-1rem")
 * @param {string} horizontalOffset - CSS left/right position (default: "1rem")
 */
const ReactionBubble = ({ 
  emoji = "🎓", 
  side = "left", 
  size = 68,
  color = "#0A84FF",
  top = "-1rem",
  horizontalOffset = "1rem"
}) => {
  const tail1Size = Math.round(size * 0.44);
  const tail2Size = Math.round(size * 0.26);
  
  return (
    <BubbleWrap $side={side} $top={top} $horizontalOffset={horizontalOffset}>
      <MainBubble $size={size} $color={color}>
        <BubbleEmoji>{emoji}</BubbleEmoji>
      </MainBubble>
      
      {/* Partly occluded circle (placed behind the main bubble) */}
      <TailCircle1
        $size={tail1Size}
        $color={color}
        $side={side}
        $offsetX={Math.round(size * 0.01)}
        $offsetY={Math.round(size * -0.12)}
      />
      
      {/* Small trailing dot - separated from the main bubble cluster */}
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

/* =================== Styled Components =================== */

const BubbleWrap = styled.div`
  position: absolute;
  top: ${({ $top }) => $top};
  ${({ $side, $horizontalOffset }) => 
    $side === "right" ? `right: ${$horizontalOffset};` : `left: ${$horizontalOffset};`}
  z-index: 10;
  pointer-events: none;
  
  /* Inherits parent card's transform, so it moves with the card animation */
  /* No additional animation - keeps it static relative to the card */
  
  /* Responsive positioning - scale down slightly on smaller screens */
  @media (max-width: 1600px) {
    transform: scale(0.9);
    transform-origin: ${({ $side }) => $side === "right" ? "top right" : "top left"};
  }
  
  @media (max-width: 1200px) {
    transform: scale(0.8);
    transform-origin: ${({ $side }) => $side === "right" ? "top right" : "top left"};
  }
`;

const MainBubble = styled.div`
  position: relative;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 9999px;
  background:
    radial-gradient(140% 120% at 30% 25%, rgba(255,255,255,.55) 0%,
      rgba(255,255,255,.25) 35%, rgba(255,255,255,0) 60%),
    ${({ $color }) => $color};
  box-shadow:
    0 8px 20px rgba(0,0,0,.25),
    inset 0 1px 2px rgba(255,255,255,.45),
    0 0 0 1px rgba(255,255,255,.18);
  display: grid;
  place-items: center;
  z-index: 2;
  transform: translateZ(0);
  
  /* Responsive sizing */
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
  font-size: 2.25rem;
  line-height: 1;
  filter: drop-shadow(0 1px 1px rgba(0,0,0,.2));
  
  /* Responsive emoji sizing */
  @media (max-width: 1600px) {
    font-size: clamp(1.7rem, 2vw, 1.9rem);
  }
  
  @media (max-width: 1200px) {
    font-size: clamp(1.5rem, 1.8vw, 1.7rem);
  }
`;

const TailCircle1 = styled.div`
  position: absolute;
  ${({ $side, $offsetX }) =>
    $side === "right" ? `right: ${-$offsetX}px;` : `left: ${-$offsetX}px;`}
  bottom: ${({ $offsetY }) => `${$offsetY}px`};
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 9999px;
  background:
    radial-gradient(140% 120% at 30% 25%, rgba(255,255,255,.45) 0%,
      rgba(255,255,255,.2) 35%, rgba(255,255,255,0) 60%),
    ${({ $color }) => $color};
  box-shadow:
    0 6px 14px rgba(0,0,0,.18),
    0 0 0 1px rgba(255,255,255,.14);
  z-index: 1;
  
  /* Responsive sizing */
  @media (max-width: 1600px) {
    width: ${({ $size }) => Math.round($size * 0.85)}px;
    height: ${({ $size }) => Math.round($size * 0.85)}px;
  }
  
  @media (max-width: 1200px) {
    width: ${({ $size }) => Math.round($size * 0.75)}px;
    height: ${({ $size }) => Math.round($size * 0.75)}px;
  }
`;

const TailCircle2 = styled(TailCircle1)`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  ${({ $side, $offsetX }) =>
    $side === "right" ? `right: ${-$offsetX}px;` : `left: ${-$offsetX}px;`}
  bottom: ${({ $offsetY }) => `${$offsetY}px`};
  z-index: 0;
  box-shadow:
    0 4px 10px rgba(0,0,0,.16),
    0 0 0 1px rgba(255,255,255,.12);
  
  /* Responsive sizing inherited from TailCircle1, but override height if needed */
  @media (max-width: 1600px) {
    height: ${({ $size }) => Math.round($size * 0.85)}px;
  }
  
  @media (max-width: 1200px) {
    height: ${({ $size }) => Math.round($size * 0.75)}px;
  }
`;

