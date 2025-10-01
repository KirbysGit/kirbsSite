// Imports.
import React from 'react';
import styled, { keyframes } from 'styled-components';
import Cloud from './Cloud';

// Import company logo
import bitgoLogo from '@/images/bitgoSmall.jpg';

// ActualExperience Component.
const ActualExperience = () => {
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
                
                {/* Experience Cards Grid */}
                <ExperienceGrid>
                    <ExperienceCard>
                        <CardHeader>
                            <HeaderTop>
                                <CompanyInfo>
                                    <CompanyName>BitGo</CompanyName>
                                    <DateRange>May 2024 - Present</DateRange>
                                </CompanyInfo>
                                <CompanyLogo src={bitgoLogo} alt="BitGo logo" />
                            </HeaderTop>
                        </CardHeader>
                        
                        <CardBody>
                            <Divider $themeColor="rgb(13, 173, 220)" />
                            <JobTitle>Software Engineering Intern</JobTitle>
                            <Divider $themeColor="rgb(13, 173, 220)" />
                            <AchievementsList>
                                <Achievement>
                                    <AchievementIcon>⚡</AchievementIcon>
                                    <AchievementText>Built full-stack Django + React system with Google OAuth</AchievementText>
                                </Achievement>
                                
                                <Achievement>
                                    <AchievementIcon>🚀</AchievementIcon>
                                    <AchievementText>Optimized performance with Celery async task processing</AchievementText>
                                </Achievement>
                                
                                <Achievement>
                                    <AchievementIcon>🔐</AchievementIcon>
                                    <AchievementText>Secured connections with PostgreSQL, SSL & WhiteNoise</AchievementText>
                                </Achievement>
                                
                                <Achievement>
                                    <AchievementIcon>☁️</AchievementIcon>
                                    <AchievementText>Deployed to AWS EC2 using Docker, Gunicorn & Nginx</AchievementText>
                                </Achievement>
                            </AchievementsList>
                        </CardBody>
                        
                        <CardFooter>
                            <Divider $themeColor="rgb(13, 173, 220)" />
                            <SkillsTitle>
                                <ForecastLabel>Skills Forecast:</ForecastLabel>
                            </SkillsTitle>
                            <WeatherForecastWrapper>
                                <WeatherForecast>
                                    <WeatherCard>
                                        <WeatherLabel>Python</WeatherLabel>
                                        <WeatherIcon>🐍</WeatherIcon>
                                        <WeatherTemp>90%</WeatherTemp>
                                    </WeatherCard>
                                    
                                    <WeatherCard>
                                        <WeatherLabel>JavaScript</WeatherLabel>
                                        <WeatherIcon>⚡</WeatherIcon>
                                        <WeatherTemp>85%</WeatherTemp>
                                    </WeatherCard>
                                    
                                    <WeatherCard>
                                        <WeatherLabel>Django</WeatherLabel>
                                        <WeatherIcon>🎸</WeatherIcon>
                                        <WeatherTemp>80%</WeatherTemp>
                                    </WeatherCard>
                                    
                                    <WeatherCard>
                                        <WeatherLabel>React</WeatherLabel>
                                        <WeatherIcon>⚛️</WeatherIcon>
                                        <WeatherTemp>90%</WeatherTemp>
                                    </WeatherCard>
                                    
                                    <WeatherCard>
                                        <WeatherLabel>PostgreSQL</WeatherLabel>
                                        <WeatherIcon>🐘</WeatherIcon>
                                        <WeatherTemp>50%</WeatherTemp>
                                    </WeatherCard>
                                    
                                    <WeatherCard>
                                        <WeatherLabel>Docker</WeatherLabel>
                                        <WeatherIcon>🐳</WeatherIcon>
                                        <WeatherTemp>20%</WeatherTemp>
                                    </WeatherCard>
                                    
                                    <WeatherCard>
                                        <WeatherLabel>AWS EC2</WeatherLabel>
                                        <WeatherIcon>☁️</WeatherIcon>
                                        <WeatherTemp>30%</WeatherTemp>
                                    </WeatherCard>
                                    
                                    <WeatherCard>
                                        <WeatherLabel>OAuth</WeatherLabel>
                                        <WeatherIcon>🔐</WeatherIcon>
                                        <WeatherTemp>60%</WeatherTemp>
                                    </WeatherCard>
                                </WeatherForecast>
                            </WeatherForecastWrapper>
                        </CardFooter>
                    </ExperienceCard>
                </ExperienceGrid>
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

// Experience cards grid - phone screens layout
const ExperienceGrid = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 2.5rem;
    width: 100%;
    max-width: 1400px;
    
    @media (max-width: 1200px) {
        flex-direction: column;
        align-items: center;
        gap: 2rem;
    }
`;

// Individual experience card - phone screen style with frosted glass
const ExperienceCard = styled.div`
    /* Phone screen dimensions */
    width: 450px;
    min-height: 600px;
    
    /* Solid phone screen background with BitGo gradient */
    background: linear-gradient(135deg,
        rgba(17, 21, 75, 0.95) 0%,
        rgba(44, 49, 81, 0.93) 30%,
        rgba(68, 75, 182, 0.90) 60%,
        rgba(132, 159, 241, 0.88) 100%
    );
    backdrop-filter: blur(20px) saturate(110%);
    -webkit-backdrop-filter: blur(20px) saturate(110%);
    
    /* Glass morphism border with BitGo glow */
    border: 1px solid rgba(13, 173, 220, 0.4);
    border-radius: 24px;
    box-shadow: 
        0 8px 32px rgba(0, 0, 0, 0.3),
        inset 0 1px 2px rgba(13, 173, 220, 0.3),
        inset 0 -1px 2px rgba(0, 0, 0, 0.2),
        0 0 40px rgba(13, 173, 220, 0.2);
    
    /* Layout */
    padding: 2rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    
    /* Smooth transitions */
    transition: all 0.4s ease;
    
    /* Hover effect - enhanced glow */
    &:hover {
        transform: translateY(-8px);
        background: linear-gradient(135deg,
            rgba(17, 21, 75, 0.97) 0%,
            rgba(44, 49, 81, 0.95) 30%,
            rgba(68, 75, 182, 0.93) 60%,
            rgba(132, 159, 241, 0.90) 100%
        );
        box-shadow: 
            0 12px 48px rgba(0, 0, 0, 0.4),
            inset 0 2px 3px rgba(13, 173, 220, 0.4),
            inset 0 -1px 2px rgba(0, 0, 0, 0.2),
            0 0 60px rgba(13, 173, 220, 0.4);
        border-color: rgba(13, 173, 220, 0.6);
    }
    
    @media (max-width: 1200px) {
        width: 100%;
        max-width: 400px;
    }
`;

// Card sections
const CardHeader = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const HeaderTop = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
`;

const CompanyInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex: 1;
`;

const CompanyName = styled.h3`
    font-size: 3rem;
    font-weight: 700;
    color: rgba(255, 255, 255, 1);
    margin: 0;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    letter-spacing: -0.5px;
    line-height: 1.2;
`;

const DateRange = styled.span`
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.7);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
`;

const CompanyLogo = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 12px;
    object-fit: cover;
`;

const Divider = styled.div`
    width: 100%;
    height: 2px;
    background: ${props => props.$themeColor || 'rgba(255, 255, 255, 0.2)'};
    opacity: 0.5;
    border-radius: 2px;
    box-shadow: 0 0 10px ${props => props.$themeColor || 'rgba(255, 255, 255, 0.2)'};
`;

const CardBody = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex: 1;
`;

const JobTitle = styled.div`
    font-style: italic;
    text-align: center;
    font-size: 1.6rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.95);
`;

// Achievements list - Icon + One-Liner style
const AchievementsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
`;

const Achievement = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(13, 173, 220, 0.2);
    transition: all 0.3s ease;
    
    &:hover {
        background: rgba(13, 173, 220, 0.1);
        border-color: rgba(13, 173, 220, 0.4);
        transform: translateX(4px);
        box-shadow: 0 4px 12px rgba(13, 173, 220, 0.2);
    }
`;

const AchievementIcon = styled.div`
    font-size: 1.8rem;
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(13, 173, 220, 0.15);
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(13, 173, 220, 0.2);
    transition: all 0.3s ease;
    
    ${Achievement}:hover & {
        transform: scale(1.1);
        box-shadow: 0 4px 12px rgba(13, 173, 220, 0.3);
    }
`;

const AchievementText = styled.p`
    font-size: 0.95rem;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.9);
    margin: 0;
    flex: 1;
    font-weight: 400;
`;

const CardFooter = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-top: 0.25rem;
    margin-top: auto;
`;

const SkillsTitle = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 0.75rem;
`;

const ForecastLabel = styled.span`
    font-size: 0.9rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.85);
    letter-spacing: 0.5px;
`;

// Wrapper for scrollable forecast
const WeatherForecastWrapper = styled.div`
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    padding: 0.25rem 0 1rem 0;
    
    /* Custom scrollbar */
    &::-webkit-scrollbar {
        height: 6px;
    }
    
    &::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        margin-top: 0.5rem;
    }
    
    &::-webkit-scrollbar-thumb {
        background: rgba(13, 173, 220, 0.5);
        border-radius: 10px;
        
        &:hover {
            background: rgba(13, 173, 220, 0.7);
        }
    }
`;

// Weather forecast style container
const WeatherForecast = styled.div`
    display: flex;
    gap: 0.5rem;
    min-width: min-content;
`;

// Individual weather card (like a day in forecast)
const WeatherCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    padding: 0.75rem 0.5rem;
    min-width: 70px;
    width: 70px;
    height: 100px;
    flex-shrink: 0;
    background: rgba(255, 255, 255, 0.12);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    transition: all 0.3s ease;
    
    &:hover {
        transform: translateY(-4px);
        background: rgba(255, 255, 255, 0.18);
        box-shadow: 0 4px 12px rgba(13, 173, 220, 0.3);
        border-color: rgba(13, 173, 220, 0.4);
    }
`;

// Weather label (skill name) - Now at top
const WeatherLabel = styled.div`
    font-size: 0.65rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.85);
    text-align: center;
    line-height: 1.1;
    width: 100%;
`;

// Weather icon (emoji for now) - Now in middle
const WeatherIcon = styled.div`
    font-size: 2rem;
    line-height: 1;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`;

// Weather temp (percentage) - Now at bottom
const WeatherTemp = styled.div`
    font-size: 1rem;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.95);
    font-variant-numeric: tabular-nums;
`;

// Export.
export default ActualExperience;
