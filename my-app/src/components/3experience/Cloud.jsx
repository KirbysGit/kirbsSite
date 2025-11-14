// cloud.jsx

// chatgpt generated cloud cartoon images, just floating across the screen because why not.

// imports.
import React, { memo } from 'react';
import styled, { keyframes, css } from 'styled-components';

// import cloud images.
import cloud1 from '@/images/3experience/clouds/cloud1.png';
import cloud2 from '@/images/3experience/clouds/cloud2.png';
import cloud3 from '@/images/3experience/clouds/cloud3.png';
import cloud4 from '@/images/3experience/clouds/cloud4.png';
import cloud5 from '@/images/3experience/clouds/cloud5.png';

// cloud images.
const cloudImages = {
    1: cloud1,
    2: cloud2,
    3: cloud3,
    4: cloud4,
    5: cloud5
};

// main cloud component with parallax layers.
const Cloud = memo(({ top, delay, duration, layer = 'mid', type = 1, direction = 'left', isInViewport = true, isSlowDevice = false }) => {
    return (
        <CloudContainer 
            $top={top} 
            $delay={delay} 
            $duration={duration}
            $layer={layer}
            $direction={direction}
            $isInViewport={isInViewport}
            $isSlowDevice={isSlowDevice}
        >
            <CloudImage 
                src={cloudImages[type]} 
                alt="cloud"
                $layer={layer}
                $delay={delay}
                $isInViewport={isInViewport}
                $isSlowDevice={isSlowDevice}
                loading="lazy"
                decoding="async"
            />
        </CloudContainer>
    );
});

Cloud.displayName = 'Cloud';

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
    /* Animation throttling: pause when not in viewport, slower on slow devices */
    ${props => props.$isInViewport 
      ? css`
          animation: 
            ${props.$direction === 'left' ? horizontalDriftLeft : horizontalDriftRight} ${props.$duration * (props.$isSlowDevice ? 1.3 : 1)}s linear ${props.$delay}s infinite,
            ${fadeInOut} ${props.$duration * (props.$isSlowDevice ? 1.3 : 1)}s linear ${props.$delay}s infinite;
        `
      : css`animation: none;`}
    animation-play-state: ${props => props.$isInViewport ? 'running' : 'paused'};
    will-change: ${props => props.$isInViewport ? 'transform' : 'auto'};
    transform: translateZ(0);
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
    
    /* Prevent image selection and dragging */
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;
    
    /* add subtle blur for more realism - reduced on slow devices */
    filter: blur(${props => {
        const baseBlur = {
            'far': props.$isSlowDevice ? '1px' : '1.5px',
            'mid': props.$isSlowDevice ? '0.5px' : '0.8px',
            'near': props.$isSlowDevice ? '0.3px' : '0.5px',
            'default': props.$isSlowDevice ? '0.5px' : '0.8px'
        };
        return baseBlur[props.$layer] || baseBlur.default;
    }});
    
    /* GPU acceleration */
    transform: translateZ(0);
    
    /* apply secondary animations - heavily reduced on slow devices */
    ${props => {
        if (!props.$isInViewport) {
            return css`animation: none;`;
        }
        
        // On slow devices, disable ALL secondary animations (only horizontal drift remains)
        if (props.$isSlowDevice) {
            return css`animation: none;`;
        }
        
        // Fast devices: all animations
        const floatDuration = {
            'far': '8s',
            'mid': '7s',
            'near': '6s',
            'default': '7s'
        };
        const duration = floatDuration[props.$layer] || floatDuration.default;
        
        const scaleDuration = {
            'far': '12s',
            'mid': '10s',
            'near': '9s',
            'default': '10s'
        };
        const opacityDuration = {
            'far': '25s',
            'mid': '22s',
            'near': '20s',
            'default': '22s'
        };
        
        return css`
            animation: 
                ${verticalFloat} ${duration} ease-in-out ${props.$delay * 0.3}s infinite,
                ${scaleBreathing} ${scaleDuration[props.$layer] || scaleDuration.default} ease-in-out ${props.$delay * 0.5}s infinite,
                ${opacityDrift} ${opacityDuration[props.$layer] || opacityDuration.default} ease-in-out ${props.$delay * 0.7}s infinite;
        `;
    }}
    animation-play-state: ${props => props.$isInViewport ? 'running' : 'paused'};
    will-change: ${props => {
        if (!props.$isInViewport) return 'auto';
        // On slow devices, only will-change for horizontal drift (handled by container)
        if (props.$isSlowDevice) return 'auto';
        return 'transform, opacity';
    }};
`;

// export component.
export default Cloud;