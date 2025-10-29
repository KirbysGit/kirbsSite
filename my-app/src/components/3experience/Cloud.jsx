// Imports.
import React from 'react';
import styled, { keyframes } from 'styled-components';

// Import cloud images
import cloud1 from '@/images/clouds/cloud1.png';
import cloud2 from '@/images/clouds/cloud2.png';
import cloud3 from '@/images/clouds/cloud3.png';
import cloud4 from '@/images/clouds/cloud4.png';
import cloud5 from '@/images/clouds/cloud5.png';

const cloudImages = {
    1: cloud1,
    2: cloud2,
    3: cloud3,
    4: cloud4,
    5: cloud5
};

// Main Cloud Component with parallax layers
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

// Animation 1: Horizontal drift left to right
const horizontalDriftLeft = keyframes`
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(120vw);
    }
`;

// Animation 2: Horizontal drift right to left
const horizontalDriftRight = keyframes`
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-120vw);
    }
`;

// Animation 3: Vertical float (breathing motion)
const verticalFloat = keyframes`
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-12px);
    }
`;

// Animation 4: Scale breathing (subtle expansion)
const scaleBreathing = keyframes`
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.02);
    }
`;

// Animation 5: Opacity drift (atmosphere shimmer)
const opacityDrift = keyframes`
    0%, 100% {
        opacity: 0.95;
    }
    50% {
        opacity: 1;
    }
`;

// Fade in/out at edges
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

// Main container - handles horizontal drift (main motion)
const CloudContainer = styled.div`
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
    
    /* Main horizontal drift animation - depends on direction */
    animation: 
        ${props => props.$direction === 'left' ? horizontalDriftLeft : horizontalDriftRight} ${props => props.$duration}s linear ${props => props.$delay}s infinite,
        ${fadeInOut} ${props => props.$duration}s linear ${props => props.$delay}s infinite;
`;

// Cloud image - handles vertical float, scale breathing, and opacity drift
const CloudImage = styled.img`
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
    
    /* Add subtle blur for realistic atmosphere */
    filter: blur(${props => {
        switch(props.$layer) {
            case 'far': return '1.5px';
            case 'mid': return '0.8px';
            case 'near': return '0.5px';
            default: return '0.8px';
        }
    }});
    
    /* Apply all secondary animations */
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

export default Cloud;