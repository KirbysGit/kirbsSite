import React from 'react';
import styled, { keyframes } from 'styled-components';
import HotAirBalloon from './HotAirBalloon';

const Skills = () => {
    return (
        <SkillsContainer>
            {/* Atmospheric Elements */}
            <AtmosphereLayer>
                {/* Sunset lighting effects */}
                <SunsetGlow />
                
                {/* Distant clouds */}
                <DistantCloud top="15%" left="10%" delay="0s" />
                <DistantCloud top="25%" left="70%" delay="5s" />
                <DistantCloud top="20%" left="85%" delay="3s" />
                
                {/* Hot Air Balloon Fleet */}
                <BalloonFleet>
                    {/* Frontend Balloons */}
                    <HotAirBalloon 
                        top="20%" 
                        left="15%" 
                        size="large" 
                        category="frontend" 
                        skill="React" 
                        proficiency="expert"
                        delay="0s"
                    />
                    <HotAirBalloon 
                        top="35%" 
                        left="25%" 
                        size="medium" 
                        category="frontend" 
                        skill="JavaScript" 
                        proficiency="advanced"
                        delay="2s"
                    />
                    <HotAirBalloon 
                        top="45%" 
                        left="35%" 
                        size="medium" 
                        category="frontend" 
                        skill="CSS" 
                        proficiency="advanced"
                        delay="4s"
                    />
                    
                    {/* Backend Balloons */}
                    <HotAirBalloon 
                        top="25%" 
                        left="55%" 
                        size="large" 
                        category="backend" 
                        skill="Python" 
                        proficiency="advanced"
                        delay="1s"
                    />
                    <HotAirBalloon 
                        top="40%" 
                        left="65%" 
                        size="medium" 
                        category="backend" 
                        skill="Django" 
                        proficiency="advanced"
                        delay="3s"
                    />
                    <HotAirBalloon 
                        top="50%" 
                        left="75%" 
                        size="small" 
                        category="backend" 
                        skill="PostgreSQL" 
                        proficiency="intermediate"
                        delay="5s"
                    />
                    
                    {/* DevOps Balloons */}
                    <HotAirBalloon 
                        top="30%" 
                        left="85%" 
                        size="medium" 
                        category="devops" 
                        skill="Docker" 
                        proficiency="intermediate"
                        delay="2.5s"
                    />
                    <HotAirBalloon 
                        top="55%" 
                        left="5%" 
                        size="small" 
                        category="devops" 
                        skill="AWS" 
                        proficiency="intermediate"
                        delay="4.5s"
                    />
                </BalloonFleet>
            </AtmosphereLayer>
            
            <ContentWrapper>
                <SectionTitle>Skills</SectionTitle>
                <SectionSubtitle>Technologies I work with</SectionSubtitle>
            </ContentWrapper>
        </SkillsContainer>
    );
};

export default Skills;

/* ================= Styles ================= */

// Main container - gradient transition from Projects to balloon sky
const SkillsContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    
    /* Transition from Projects' horizon blue to balloon sky */
    background: linear-gradient(to bottom,
        rgb(71, 160, 238) 0%,     /* Match Projects ending */
        rgb(70, 158, 236) 8%,
        rgb(68, 155, 233) 16%,
        rgb(65, 150, 228) 24%,
        rgb(60, 142, 220) 32%,
        rgb(55, 132, 210) 40%,
        rgb(48, 120, 198) 48%,
        rgb(40, 106, 184) 56%,
        rgb(32, 90, 168) 64%,
        rgb(24, 72, 150) 72%,
        rgb(18, 56, 130) 80%,
        rgb(14, 42, 110) 88%,
        rgb(12, 32, 90) 94%,
        rgb(10, 25, 75) 97%,
        rgb(8, 20, 60) 100%);     /* Deep balloon sky blue */
    
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

// Sunset glow effect
const SunsetGlow = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    width: 60%;
    height: 100%;
    background: radial-gradient(ellipse at top right,
        rgba(255, 140, 0, 0.15) 0%,
        rgba(255, 100, 0, 0.1) 30%,
        rgba(255, 60, 0, 0.05) 60%,
        transparent 100%);
    pointer-events: none;
`;

// Distant cloud animation
const cloudDrift = keyframes`
    0% { transform: translateX(0); }
    100% { transform: translateX(20px); }
`;

const DistantCloud = styled.div`
    position: absolute;
    top: ${props => props.top};
    left: ${props => props.left};
    width: 200px;
    height: 40px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    filter: blur(15px);
    animation: ${cloudDrift} 25s ease-in-out infinite alternate;
    animation-delay: ${props => props.delay};
    opacity: 0.6;
`;

// Balloon fleet container
const BalloonFleet = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
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
    
    @media (max-width: 1600px) {
        padding: 1.5rem;
    }
    
    @media (max-width: 1200px) {
        padding: 1rem;
    }
`;

// Section title
const SectionTitle = styled.h1`
    font-size: 6rem;
    font-weight: 900;
    background: linear-gradient(135deg, 
        rgba(255, 255, 255, 0.95) 0%,
        rgba(255, 200, 100, 0.9) 50%,
        rgba(255, 150, 50, 0.95) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-align: center;
    margin: 0;
    text-shadow: 0 4px 20px rgba(255, 150, 50, 0.3);
    
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
    margin-bottom: 3rem;
    text-shadow: 0 2px 10px rgba(255, 255, 255, 0.2);
    
    @media (max-width: 1600px) {
        font-size: 1.5rem;
        margin-bottom: 2.5rem;
    }
`;