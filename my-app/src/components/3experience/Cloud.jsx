// cloud.jsx

// chatgpt generated cloud cartoon images, just floating across the screen because why not.

// imports.
import React from 'react';
import styled, { keyframes } from 'styled-components';

// import cloud images.
import cloud1 from '@/images/clouds/cloud1.png';
import cloud2 from '@/images/clouds/cloud2.png';
import cloud3 from '@/images/clouds/cloud3.png';
import cloud4 from '@/images/clouds/cloud4.png';
import cloud5 from '@/images/clouds/cloud5.png';

// cloud images.
const cloudImages = {
    1: cloud1,
    2: cloud2,
    3: cloud3,
    4: cloud4,
    5: cloud5
};

// main cloud component with parallax layers.
const Cloud = ({ top, delay, duration, layer = 'mid', type = 1, direction = 'left' }) => {
    return (
        <CloudContainer 
            $top={top} 
            $delay={delay} 
            $duration={duration}
            $layer={layer}
            $direction={direction}
        >
            <CloudImage 
                src={cloudImages[type]} 
                alt="cloud"
                $layer={layer}
                $delay={delay}
            />
        </CloudContainer>
    );
};

// animation 1: horizontal drift left to right.
const horizontalDriftLeft = keyframes`
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(120vw);
    }
`;

// animation 2: horizontal drift right to left.
const horizontalDriftRight = keyframes`
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-120vw);
    }
`;

// animation 3: vertical float (breathing motion).
const verticalFloat = keyframes`
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-12px);
    }
`;

// animation 4: scale breathing (subtle expansion).
const scaleBreathing = keyframes`
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.02);
    }
`;

// animation 5: opacity drift (atmosphere shimmer).
const opacityDrift = keyframes`
    0%, 100% {
        opacity: 0.95;
    }
    50% {
        opacity: 1;
    }
`;

// fade in/out at edges.
const fadeInOut = keyframes`
    0% {
        opacity: 0;
    }
    5% {
        opacity: 1;
    }
    95% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
`;

// main container - handles horizontal drift (main motion).
const CloudContainer = styled.div`
    /* layout */
    position: absolute;
    top: ${props => props.$top};
    ${props => props.$direction === 'left' ? 'left: -20%;' : 'right: -20%;'}
    z-index: ${props => {
        switch(props.$layer) {
            case 'far': return 1;
            case 'mid': return 2;
            case 'near': return 3;
            default: return 2;
        }
    }};
    
    /* main horizontal drift animation - depends on direction */
    animation: 
        ${props => props.$direction === 'left' ? horizontalDriftLeft : horizontalDriftRight} ${props => props.$duration}s linear ${props => props.$delay}s infinite,
        ${fadeInOut} ${props => props.$duration}s linear ${props => props.$delay}s infinite;
`;

// cloud image - handles our vertical float, scale breathing, and opacity drift.
const CloudImage = styled.img`
    /* layout */
    display: block;
    width: auto;
    height: ${props => {
        switch(props.$layer) {
            case 'far': return '120px';
            case 'mid': return '180px';
            case 'near': return '240px';
            default: return '180px';
        }
    }};
    object-fit: contain;
    pointer-events: none;
    
    /* add subtle blur for more realism */
    filter: blur(${props => {
        switch(props.$layer) {
            case 'far': return '1.5px';
            case 'mid': return '0.8px';
            case 'near': return '0.5px';
            default: return '0.8px';
        }
    }});
    
    /* apply all secondary animations. */
    animation: 
        ${verticalFloat} ${props => {
            switch(props.$layer) {
                case 'far': return '8s';
                case 'mid': return '7s';
                case 'near': return '6s';
                default: return '7s';
            }
        }} ease-in-out ${props => props.$delay * 0.3}s infinite,
        ${scaleBreathing} ${props => {
            switch(props.$layer) {
                case 'far': return '12s';
                case 'mid': return '10s';
                case 'near': return '9s';
                default: return '10s';
            }
        }} ease-in-out ${props => props.$delay * 0.5}s infinite,
        ${opacityDrift} ${props => {
            switch(props.$layer) {
                case 'far': return '25s';
                case 'mid': return '22s';
                case 'near': return '20s';
                default: return '22s';
            }
        }} ease-in-out ${props => props.$delay * 0.7}s infinite;
`;

// export component.
export default Cloud;