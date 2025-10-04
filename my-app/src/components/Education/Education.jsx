// Imports.
import React from 'react';
import styled, { keyframes } from 'styled-components';

const Education = () => { 
    return (
        <EducationContainer>
            {/* Lower Sky Atmospheric Elements */}
            <AtmosphereLayer>
                {/* Sun - positioned like it's at the horizon */}
                <Sun>
                    <SunGlow />
                </Sun>
                
                {/* Flying birds - scattered across the sky */}
                <Bird top="20%" left="15%" delay="0s" duration="25s" />
                <Bird top="35%" left="65%" delay="5s" duration="30s" />
                <Bird top="50%" left="25%" delay="10s" duration="28s" />
                <Bird top="28%" left="85%" delay="3s" duration="32s" />
                <Bird top="45%" left="50%" delay="8s" duration="27s" />
                
                {/* Wispy horizon clouds - lighter and more transparent */}
                <HorizonCloud top="60%" left="-10%" delay="0s" />
                <HorizonCloud top="65%" left="30%" delay="15s" />
                <HorizonCloud top="70%" left="60%" delay="8s" />
                <HorizonCloud top="75%" left="85%" delay="20s" />
            </AtmosphereLayer>
            
            <ContentWrapper>
                <SectionTitle>Education</SectionTitle>
                <SectionSubtitle>Where knowledge became foundation</SectionSubtitle>
                
                {/* Content will go here */}
                <Placeholder>
                    🎓 Education content coming soon...
                </Placeholder>
            </ContentWrapper>
        </EducationContainer>
    );
}

// Main container - brighter lower sky gradient
const EducationContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    
    /* Transition from Experience's ending blue to vibrant horizon */
    background: linear-gradient(to bottom,
        rgb(150, 200, 246) 0%,     /* Match Experience ending */
        rgb(145, 198, 246) 6%,
        rgb(138, 194, 246) 12%,
        rgb(130, 190, 246) 18%,
        rgb(122, 186, 245) 24%,
        rgb(114, 182, 244) 32%,
        rgb(106, 178, 243) 40%,
        rgb(98, 174, 242) 48%,
        rgb(92, 171, 241) 56%,
        rgb(86, 168, 240) 64%,
        rgb(82, 166, 239) 72%,
        rgb(78, 164, 239) 80%,
        rgb(75, 162, 238) 88%,
        rgb(73, 161, 238) 94%,
        rgb(72, 160, 238) 97%,
        rgb(71, 160, 238) 100%);  /* Vibrant horizon blue */
    
    width: 100vw;
    padding: 4rem 2rem;
    padding-top: 0;
    position: relative;
    overflow: hidden;
`;

// Atmosphere layer for visual elements
const AtmosphereLayer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    pointer-events: none;
    overflow: hidden;
`;

// Content wrapper
const ContentWrapper = styled.div`
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    max-width: 1400px;
    margin: 0 auto;
    width: 100%;
`;

// Section title
const SectionTitle = styled.h1`
    font-size: 6rem;
    font-weight: 900;
    background: linear-gradient(135deg, 
        rgba(255, 255, 255, 0.95) 0%,
        rgba(255, 240, 200, 0.9) 50%,
        rgba(255, 220, 150, 0.95) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-align: center;
    margin: 0;
    text-shadow: 0 4px 20px rgba(255, 220, 100, 0.3);
    
    @media (max-width: 1600px) {
        font-size: 4rem;
    }
`;

// Section subtitle
const SectionSubtitle = styled.h2`
    font-size: 2rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.85);
    text-align: center;
    font-style: italic;
    margin: 0;
    margin-top: 1rem;
    margin-bottom: 2rem;
    text-shadow: 0 2px 10px rgba(255, 255, 255, 0.2);
    
    @media (max-width: 1600px) {
        font-size: 1.5rem;
    }
`;

// Placeholder for content
const Placeholder = styled.div`
    font-size: 2rem;
    color: rgba(255, 255, 255, 0.7);
    padding: 4rem;
    text-align: center;
`;

// Sun with glow effect
const Sun = styled.div`
    position: absolute;
    bottom: 10%;
    right: 15%;
    width: 150px;
    height: 150px;
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

// Sun glow layer
const SunGlow = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200%;
    height: 200%;
    border-radius: 50%;
    background: radial-gradient(circle at center,
        rgba(255, 240, 150, 0.3) 0%,
        rgba(255, 230, 120, 0.15) 30%,
        rgba(255, 220, 100, 0.05) 60%,
        transparent 100%);
    animation: glowPulse 6s ease-in-out infinite;
    
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

// Bird animation path
const fly = keyframes`
    0% {
        transform: translateX(-50px) translateY(0) scale(0.8);
        opacity: 0;
    }
    10% {
        opacity: 1;
    }
    90% {
        opacity: 1;
    }
    100% {
        transform: translateX(calc(100vw + 50px)) translateY(-20px) scale(1);
        opacity: 0;
    }
`;

// Flying bird silhouette
const Bird = styled.div`
    position: absolute;
    top: ${props => props.top};
    left: ${props => props.left};
    width: 20px;
    height: 8px;
    animation: ${fly} ${props => props.duration} linear infinite;
    animation-delay: ${props => props.delay};
    opacity: 0;
    
    /* Bird shape using pseudo-elements (simple V shape) */
    &::before,
    &::after {
        content: '';
        position: absolute;
        width: 10px;
        height: 2px;
        background: rgba(0, 0, 0, 0.3);
        border-radius: 1px;
    }
    
    &::before {
        left: 0;
        transform: rotate(-25deg);
        transform-origin: right center;
    }
    
    &::after {
        right: 0;
        transform: rotate(25deg);
        transform-origin: left center;
    }
`;

// Horizon cloud animation
const drift = keyframes`
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(30px);
    }
`;

// Wispy horizon clouds
const HorizonCloud = styled.div`
    position: absolute;
    top: ${props => props.top};
    left: ${props => props.left};
    width: 300px;
    height: 60px;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 50%;
    filter: blur(25px);
    animation: ${drift} 20s ease-in-out infinite alternate;
    animation-delay: ${props => props.delay};
    opacity: 0.6;
    
    /* Create layered cloud effect with pseudo-elements */
    &::before {
        content: '';
        position: absolute;
        top: -15px;
        left: 40px;
        width: 200px;
        height: 50px;
        background: rgba(255, 255, 255, 0.12);
        border-radius: 50%;
        filter: blur(20px);
    }
    
    &::after {
        content: '';
        position: absolute;
        top: 10px;
        right: 30px;
        width: 180px;
        height: 45px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 50%;
        filter: blur(22px);
    }
`;

// Export.
export default Education;
