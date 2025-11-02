// wipribbon.jsx

// a cool ribbon to give that real caution work in progress vibe. 
// just wanted to modularize it for easy use.

// imports.
import React from "react";
import styled from "styled-components";

// main wipribbon component.
const WIPRibbon = ({ text = "WORK IN PROGRESS" }) => (
  <CornerRibbon aria-label={text}>
    <RibbonStrip />
    <RibbonText>🚧 {text}</RibbonText>
  </CornerRibbon>
);

// export component.
export default WIPRibbon;

/* ================= styles ================= */

// main corner ribbon.
const CornerRibbon = styled.div`
    /* layout */
    top: 0;
    right: 0;
    z-index: 30;
    isolation: isolate;
    position: absolute;
    pointer-events: none;
    
    /* spacing */
    width: 150px;
    height: 150px;
    
    /* styles */
    --stripe: 12px;
    --angle: 45deg;
    --black: #0a0a0a;
    --yellow: #ffd400;
    --text-offset: 26px;
    --ribbon-height: 28px;
`;

// ribbon strip.
const RibbonStrip = styled.i`
    /* layout */
    top: 24px;
    right: -64px;
    z-index: 0;
    content: "";
    position: absolute;
    transform: rotate(var(--angle));
    
    /* spacing */
    width: 260px;
    height: var(--ribbon-height);
    
    /* styles */
    border-radius: 4px;
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.25);
    background: repeating-linear-gradient(
        var(--angle),
        var(--yellow) 0 calc(var(--stripe) * 1),
        var(--yellow) calc(var(--stripe) * 1) calc(var(--stripe) * 1.4),
        var(--black)  calc(var(--stripe) * 1.4) calc(var(--stripe) * 2.4)
    );
`;

// tight pill only behind the text.
const RibbonText = styled.span`
    /* layout */
    top: 24px;        
    z-index: 2;
    right: -5px;          
    display: inline-flex;
    white-space: nowrap;
    align-items: center;
    position: absolute;
    transform-origin: center;
    transform: rotate(var(--angle)) translateX(var(--text-offset));
    
    /* spacing */
    gap: 6px;
    padding: 4px 10px;    
    
    /* styles */
    color: #1a1a1a;
    border-radius: 999px; 
    letter-spacing: 2.2px;
    text-transform: uppercase;
    border: 1px solid rgba(0, 0, 0, 0.18);
    font: 900 12px/1 system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
    background: linear-gradient(180deg, #ffea6a 0%, #ffd400 70%);
    box-shadow:
        0 2px 6px rgba(0, 0, 0, 0.28),
        inset 0 1px 2px rgba(255, 255, 255, 0.35);
`;


