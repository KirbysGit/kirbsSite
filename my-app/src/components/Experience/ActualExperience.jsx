// Imports.
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Cloud from './Cloud';
import experienceData from '../../data/experience';

// ActualExperience Component.
const ActualExperience = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    // Auto-scroll carousel
    useEffect(() => {
        if (isPaused || isExpanded) return;
        
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % experienceData.length);
        }, 6000); // Change every 6 seconds

        return () => clearInterval(interval);
    }, [isPaused, isExpanded]);

    const handleCardClick = (index) => {
        setActiveIndex(index);
        setIsExpanded(!isExpanded || activeIndex !== index);
    };

    const handleDotClick = (index) => {
        setActiveIndex(index);
        setIsExpanded(false);
    };

    return (
        <ExperienceContainer>
            {/* Parallax Cloud Layers - Far, Mid, Near */}
            <CloudLayer>
                {/* FAR LAYER - slowest, smallest, higher in sky */}
                <Cloud top="5%" delay="0" duration="180" layer="far" type={1} />
                <Cloud top="18%" delay="60" duration="200" layer="far" type={3} />
                <Cloud top="32%" delay="120" duration="190" layer="far" type={2} />
                <Cloud top="48%" delay="35" duration="195" layer="far" type={5} />
                <Cloud top="62%" delay="90" duration="185" layer="far" type={4} />
                <Cloud top="76%" delay="150" duration="192" layer="far" type={1} />
                <Cloud top="88%" delay="75" duration="188" layer="far" type={3} />
                <Cloud top="95%" delay="110" duration="182" layer="far" type={2} />
                
                {/* MID LAYER - medium speed, medium size */}
                <Cloud top="10%" delay="30" duration="145" layer="mid" type={4} />
                <Cloud top="24%" delay="80" duration="140" layer="mid" type={2} />
                <Cloud top="40%" delay="15" duration="150" layer="mid" type={5} />
                <Cloud top="55%" delay="100" duration="155" layer="mid" type={1} />
                <Cloud top="68%" delay="50" duration="142" layer="mid" type={3} />
                <Cloud top="82%" delay="120" duration="148" layer="mid" type={4} />
                <Cloud top="92%" delay="65" duration="152" layer="mid" type={2} />
                
                {/* NEAR LAYER - fastest, largest, most prominent */}
                <Cloud top="15%" delay="10" duration="115" layer="near" type={3} />
                <Cloud top="35%" delay="55" duration="125" layer="near" type={1} />
                <Cloud top="52%" delay="90" duration="120" layer="near" type={4} />
                <Cloud top="72%" delay="25" duration="118" layer="near" type={5} />
                <Cloud top="88%" delay="70" duration="122" layer="near" type={2} />
            </CloudLayer>
            
            <ContentWrapper>
                <SectionTitle>Experience</SectionTitle>
                
                <SectionSubtitle>Where I've built, learned, and grown</SectionSubtitle>
                
                {/* Floating Timeline Carousel */}
                <CarouselContainer
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <CarouselTrack>
                        {experienceData.map((exp, index) => {
                            const isActive = index === activeIndex;
                            const position = index - activeIndex;
                            
                            return (
                                <ExperienceCard
                                    key={index}
                                    $isActive={isActive}
                                    $position={position}
                                    $isExpanded={isExpanded && isActive}
                                    $themeColor={exp.theme.primary}
                                    onClick={() => handleCardClick(index)}
                                >
                                    <CardHeader>
                                        <CompanyName>{exp.company}</CompanyName>
                                        <JobTitle $themeColor={exp.theme.primary}>
                                            {exp.heading}
                                        </JobTitle>
                                        <DateRange>
                                            {new Date(exp.duration.start).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                            {' - '}
                                            {exp.duration.end === 'Present' ? 'Present' : new Date(exp.duration.end).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                        </DateRange>
                                    </CardHeader>
                                    
                                    <CardBody>
                                        <Description>{exp.summary}</Description>
                                        
                                        {/* Expanded Content */}
                                        {isExpanded && isActive && (
                                            <ExpandedContent>
                                                <ResponsibilitiesSection>
                                                    <SectionLabel>Key Responsibilities</SectionLabel>
                                                    {exp.responsibilities.map((resp, idx) => (
                                                        <ResponsibilityItem key={idx}>
                                                            <RespTitle>{resp.title}</RespTitle>
                                                            <RespDescription>{resp.description}</RespDescription>
                                                        </ResponsibilityItem>
                                                    ))}
                                                </ResponsibilitiesSection>
                                            </ExpandedContent>
                                        )}
                                    </CardBody>
                                    
                                    <CardFooter>
                                        <Skills>
                                            {exp.skills.featured ? 
                                                exp.skills.featured.slice(0, 4).map((skill, idx) => (
                                                    <Skill key={idx} $themeColor={exp.theme.primary}>
                                                        {skill.name}
                                                    </Skill>
                                                ))
                                                :
                                                exp.skills.technical?.slice(0, 3).map((skill, idx) => (
                                                    <Skill key={idx} $themeColor={exp.theme.primary}>
                                                        {skill}
                                                    </Skill>
                                                ))
                                            }
                                        </Skills>
                                        {isActive && (
                                            <ExpandHint>
                                                {isExpanded ? '▲ Click to collapse' : '▼ Click to expand'}
                                            </ExpandHint>
                                        )}
                                    </CardFooter>
                                </ExperienceCard>
                            );
                        })}
                    </CarouselTrack>
                    
                    {/* Timeline Dots */}
                    <TimelineDots>
                        {experienceData.map((exp, index) => (
                            <Dot
                                key={index}
                                $isActive={index === activeIndex}
                                $themeColor={exp.theme.primary}
                                onClick={() => handleDotClick(index)}
                            />
                        ))}
                    </TimelineDots>
                </CarouselContainer>
            </ContentWrapper>
        </ExperienceContainer>
    );
}

// Main container - beautiful sky gradient
const ExperienceContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: linear-gradient(to bottom,
        rgb(100, 70, 150) 0%,
        rgb(110, 85, 165) 8%,
        rgb(120, 105, 180) 15%,
        rgb(135, 130, 195) 22%,
        rgb(145, 150, 210) 30%,
        rgb(160, 175, 225) 40%,
        rgb(170, 195, 235) 50%,
        rgb(150, 185, 230) 60%,
        rgb(120, 170, 225) 70%,
        rgb(90, 150, 215) 80%,
        rgb(70, 135, 205) 90%,
        rgb(50, 120, 200) 100%);
    width: 100vw;
    padding: 4rem 2rem;
    position: relative;
    overflow: hidden;
`;

// Cloud layer container
const CloudLayer = styled.div`
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
    gap: 2rem;
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
        rgba(200, 180, 255, 0.9) 50%,
        rgba(150, 200, 255, 0.95) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-align: center;
    margin: 0;
    
    @media (max-width: 1600px) {
        font-size: 4rem;
    }
`;

// Section subtitle
const SectionSubtitle = styled.h2`
    font-size: 2rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.7);
    text-align: center;
    font-style: italic;
    margin: 0;
    margin-bottom: 4rem;
    
    @media (max-width: 1600px) {
        font-size: 1.5rem;
        margin-bottom: 3rem;
    }
`;

// Carousel container
const CarouselContainer = styled.div`
    width: 100%;
    max-width: 1400px;
    position: relative;
    padding: 2rem 0 4rem 0;
`;

// Carousel track
const CarouselTrack = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 400px;
    perspective: 1000px;
`;

// Individual experience card with floating effect
const ExperienceCard = styled.div`
    position: absolute;
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 2.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 500px;
    cursor: pointer;
    
    /* Subtle border with theme color */
    border: 1px solid ${props => props.$isActive ? 
        `${props.$themeColor}40` : 'rgba(255, 255, 255, 0.1)'};
    
    /* Floating shadow effect */
    box-shadow: ${props => props.$isActive ?
        `0 20px 60px rgba(0, 0, 0, 0.3), 
         0 0 40px ${props.$themeColor}15` :
        '0 10px 30px rgba(0, 0, 0, 0.2)'};
    
    /* Positioning based on carousel position */
    transform: ${props => {
        if (props.$position === 0) {
            // Active card - centered and larger
            return `translateX(0) scale(${props.$isExpanded ? 1.05 : 1}) translateZ(0)`;
        } else if (props.$position === -1 || props.$position === experienceData.length - 1) {
            // Left card
            return 'translateX(-550px) scale(0.85) translateZ(-100px)';
        } else if (props.$position === 1 || props.$position === -(experienceData.length - 1)) {
            // Right card
            return 'translateX(550px) scale(0.85) translateZ(-100px)';
        } else {
            // Hidden cards
            return props.$position < 0 ?
                'translateX(-800px) scale(0.7) translateZ(-200px)' :
                'translateX(800px) scale(0.7) translateZ(-200px)';
        }
    }};
    
    opacity: ${props => {
        if (props.$position === 0) return 1;
        if (Math.abs(props.$position) === 1) return 0.5;
        return 0;
    }};
    
    /* Smooth transitions */
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    
    /* Floating animation for active card */
    ${props => props.$isActive && !props.$isExpanded && `
        animation: cardFloat 4s ease-in-out infinite;
    `}
    
    /* Hover effect on active card */
    ${props => props.$isActive && `
        &:hover {
            transform: translateX(0) scale(1.02) translateY(-5px);
            box-shadow: 
                0 25px 70px rgba(0, 0, 0, 0.35),
                0 0 50px ${props.$themeColor}20;
            animation: none;
        }
    `}
    
    /* Height transition for expand/collapse */
    height: ${props => props.$isExpanded ? 'auto' : 'auto'};
    
    @keyframes cardFloat {
        0%, 100% {
            transform: translateX(0) translateY(0) scale(1);
        }
        50% {
            transform: translateX(0) translateY(-10px) scale(1);
        }
    }
    
    @media (max-width: 768px) {
        width: 90vw;
        padding: 1.5rem;
        
        /* Adjust positioning for mobile */
        transform: ${props => {
            if (props.$position === 0) {
                return `translateX(0) scale(${props.$isExpanded ? 1.02 : 1}) translateZ(0)`;
            } else {
                return 'translateX(0) scale(0) translateZ(-200px)';
            }
        }};
    }
`;

// Card sections
const CardHeader = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const CompanyName = styled.h3`
    font-size: 1.5rem;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.95);
    margin: 0;
`;

const DateRange = styled.span`
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.6);
    font-style: italic;
`;

const CardBody = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex: 1;
`;

const JobTitle = styled.h4`
    font-size: 1.1rem;
    font-weight: 600;
    color: ${props => props.$themeColor || 'rgba(255, 255, 255, 0.85)'};
    margin: 0;
    text-shadow: ${props => `0 0 20px ${props.$themeColor}30`};
`;

const Description = styled.p`
    font-size: 1rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.75);
    margin: 0;
`;

const CardFooter = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding-top: 0.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const Skills = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
`;

const Skill = styled.span`
    padding: 0.4rem 0.8rem;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid ${props => `${props.$themeColor}30`};
    border-radius: 8px;
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.85);
    transition: all 0.3s ease;
    
    &:hover {
        background: ${props => `${props.$themeColor}20`};
        border-color: ${props => `${props.$themeColor}50`};
    }
`;

// Expand hint
const ExpandHint = styled.div`
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.5);
    text-align: center;
    margin-top: 0.5rem;
    font-style: italic;
`;

// Expanded content
const ExpandedContent = styled.div`
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.15);
    animation: fadeInExpand 0.5s ease;
    
    @keyframes fadeInExpand {
        from {
            opacity: 0;
            max-height: 0;
        }
        to {
            opacity: 1;
            max-height: 1000px;
        }
    }
`;

const ResponsibilitiesSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const SectionLabel = styled.h5`
    font-size: 0.9rem;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.9);
    text-transform: uppercase;
    letter-spacing: 1px;
    margin: 0 0 0.5rem 0;
`;

const ResponsibilityItem = styled.div`
    padding-left: 1rem;
    border-left: 2px solid rgba(255, 255, 255, 0.2);
    margin-bottom: 0.75rem;
`;

const RespTitle = styled.div`
    font-size: 0.95rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.85);
    margin-bottom: 0.3rem;
`;

const RespDescription = styled.div`
    font-size: 0.9rem;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.65);
`;

// Timeline dots navigation
const TimelineDots = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-top: 3rem;
`;

const Dot = styled.button`
    width: ${props => props.$isActive ? '40px' : '12px'};
    height: 12px;
    border-radius: 6px;
    border: none;
    background: ${props => props.$isActive ? 
        props.$themeColor : 
        'rgba(255, 255, 255, 0.3)'};
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: ${props => props.$isActive ? 
        `0 0 20px ${props.$themeColor}60` : 
        'none'};
    
    &:hover {
        background: ${props => props.$isActive ? 
            props.$themeColor : 
            'rgba(255, 255, 255, 0.5)'};
        transform: scale(1.2);
    }
`;

// Export.
export default ActualExperience;
