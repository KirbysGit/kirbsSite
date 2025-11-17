// sun.jsx

// cool radial sun with a glow effect. looks dope!

// imports.
import React from 'react';
import styled from 'styled-components';

/* ================== main component ================== */
const Sun = () => {
    return (
        <SunContainer>
            <SunGlow />
        </SunContainer>
    );
};

export default Sun;

/* ================== styles ================== */

// main sun container.
const SunContainer = styled.div`
    /* layout */
    right: 15%;
    bottom: 10%;
    position: absolute;
    
    /* spacing */
    width: 150px;
    height: 150px;
    
    /* styles */
    border-radius: 50%;
    background: radial-gradient(circle at center,
        rgba(255, 250, 200, 1) 0%,
        rgba(255, 240, 150, 0.95) 20%,
        rgba(255, 230, 120, 0.9) 40%,
        rgba(255, 220, 100, 0.7) 60%,
        rgba(255, 210, 80, 0.4) 80%,
        transparent 100%);
    box-shadow: 
        0 0 40px rgba(255, 230, 120, 0.6),
        0 0 80px rgba(255, 220, 100, 0.4),
        0 0 120px rgba(255, 210, 80, 0.2);
    animation: sunPulse 8s ease-in-out infinite;
    
    /* keyframes */
    @keyframes sunPulse {
        0%, 100% {
            transform: scale(1);
            opacity: 0.9;
        }
        50% {
            transform: scale(1.05);
            opacity: 1;
        }
    }
`;

// sun glow layer.
const SunGlow = styled.div`
    /* layout */
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
    
    /* spacing */
    width: 200%;
    height: 200%;
    
    /* styles */
    border-radius: 50%;
    background: radial-gradient(circle at center,
        rgba(255, 240, 150, 0.3) 0%,
        rgba(255, 230, 120, 0.15) 30%,
        rgba(255, 220, 100, 0.05) 60%,
        transparent 100%);
    animation: glowPulse 6s ease-in-out infinite;
    
    /* keyframes */
    @keyframes glowPulse {
        0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.5;
        }
        50% {
            transform: translate(-50%, -50%) scale(1.1);
            opacity: 0.8;
        }
    }
`;

