// MeteorShower.jsx — Correct layering: fire trail behind meteor
import React from 'react';
import styled, { keyframes } from 'styled-components';

// Diagonal fall
const meteorFall = keyframes`
    0% { transform: translate(0,0) rotate(-135deg) scale(1); opacity: 0; }
    10% { opacity: 1; transform: translate(0,0) rotate(-135deg) scale(0.7); }
    70% { opacity: 1; transform: translate(-60vw, 60vh) rotate(-135deg) scale(0.55); }
    100% { transform: translate(-100vw, 100vh) rotate(-135deg) scale(0.4); opacity: 0; }
`;

const flicker = keyframes`
    0%,100% { opacity: 0.6; transform: scaleY(1); }
    25% { opacity: 0.8; transform: scaleY(1.2); }
    50% { opacity: 0.5; transform: scaleY(0.9); }
    75% { opacity: 0.7; transform: scaleY(1.1); }
`;

const MeteorLayer = styled.div`
    position: absolute;
    inset: 0;
    top: 60%;
    overflow: hidden;
    pointer-events: none;
    z-index: 0;
    mix-blend-mode: screen;
    /* you can safely apply opacity here later */
`;

const MeteorWrapper = styled.div`
    position: absolute;
    top: ${props => props.$top}%;
    right: ${props => props.$right}%;
    animation: ${meteorFall} ${props => props.$duration}s linear infinite;
    animation-delay: ${props => props.$delay}s;
    transform-origin: center;
    will-change: transform;
`;

const Trail = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    width: ${props => Math.max(props.$size * 0.12, 2)}px;
    height: ${props => props.$size * 3.2}px;
    transform: translate(-50%, -50%) rotate(135deg);
    transform-origin: top center;
    background: linear-gradient(
        to bottom,
        rgba(255,255,255,0.9) 0%,
        rgba(255,220,180,0.7) 20%,
        rgba(255,180,120,0.5) 45%,
        rgba(255,120,60,0.3) 70%,
        transparent 100%
    );
    border-radius: 50%;
    filter: blur(2px);
    opacity: 0.8;
    animation: ${flicker} ${props => 0.6 + Math.random() * 0.8}s ease-in-out infinite;
    z-index: 1; /* behind meteor */
`;

const MeteorBody = styled.div`
    position: relative;
    width: ${props => props.$size}px;
    height: ${props => props.$size}px;
    background: url(${props => props.$image}) center/contain no-repeat;
    transform: rotate(90deg);
    filter: drop-shadow(0 0 10px rgba(255,200,150,0.6));
    opacity: 1;
    z-index: 2;
`;

const MeteorShower = ({ images }) => {
    const meteors = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        image: images[i % images.length],
        top: Math.random() * 25,
        right: Math.random() * 80 - 5,
        size: 20 + Math.random() * 40,
        duration: 10 + Math.random() * 8,
        delay: Math.random() * 10,
    }));

    return (
        <MeteorLayer>
            {meteors.map(meteor => (
                <MeteorWrapper
                    key={meteor.id}
                    $top={meteor.top}
                    $right={meteor.right}
                    $duration={meteor.duration}
                    $delay={meteor.delay}
                >
                    <Trail $size={meteor.size} />
                    <MeteorBody $size={meteor.size} $image={meteor.image} />
                </MeteorWrapper>
            ))}
        </MeteorLayer>
    );
};

export default MeteorShower;