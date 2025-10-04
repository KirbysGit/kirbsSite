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
                <Cloud top="75%" delay="150" duration="192" layer="far" type={1} />
                
                {/* MID LAYER - medium speed, medium size */}
                <Cloud top="10%" delay="30" duration="145" layer="mid" type={4} />
                <Cloud top="24%" delay="80" duration="140" layer="mid" type={2} />
                <Cloud top="40%" delay="15" duration="150" layer="mid" type={5} />
                <Cloud top="55%" delay="100" duration="155" layer="mid" type={1} />
                <Cloud top="68%" delay="50" duration="142" layer="mid" type={3} />
                
                {/* NEAR LAYER - fastest, largest, most prominent */}
                <Cloud top="15%" delay="10" duration="115" layer="near" type={3} />
                <Cloud top="35%" delay="55" duration="125" layer="near" type={1} />
                <Cloud top="52%" delay="90" duration="120" layer="near" type={4} />
                <Cloud top="70%" delay="25" duration="118" layer="near" type={5} />
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
                            
                            <HeaderOverview>
                                <JobTitle>Software Engineering Intern</JobTitle>
                                <ProjectDescription>
                                    Built an automation portal to make BitGo's IT team's life easier — turning manual work into one-click operations.
                                </ProjectDescription>
                            </HeaderOverview>
                            <Divider $themeColor="rgb(13, 173, 220)" />
                        </CardHeader>
                        
                        <CardBody>
                            <AchievementsList>
                                <Achievement>
                                    <AchievementIcon>🔧</AchievementIcon>
                                    <AchievementText>Automated 20+ IT workflows with OAuth SSO and role-based access</AchievementText>
                                </Achievement>
                                
                                <Achievement>
                                    <AchievementIcon>⏱️</AchievementIcon>
                                    <AchievementText>Saved ~150 staff hours annually with real-time monitoring dashboards</AchievementText>
                                </Achievement>
                                
                                <Achievement>
                                    <AchievementIcon>✂️</AchievementIcon>
                                    <AchievementText>Cut script debugging time from hours to minutes with real-time WebSocket dashboards</AchievementText>
                                </Achievement>
                            </AchievementsList>
                        </CardBody>
                        
                        <CardFooter>
                            <Divider $themeColor="rgb(13, 173, 220)" />
                            
                            <SkillsCarousel>
                                {/* FRONTEND */}
                                <CarouselRow>
                                    <RowLabel>Frontend</RowLabel>
                                    <RowViewport>
                                        <RowTrack style={{'--dur':'18s','--delay':'-3s'}} $reverse>
                                            <Sequence>
                                                {[
                                                    { name: "React", icon: "⚛️", cat: "frontend" },
                                                    { name: "JavaScript", icon: "⚡", cat: "frontend" },
                                                    { name: "WebSockets", icon: "🔌", cat: "frontend" },
                                                ].map(s => (
                                                    <SkillPill key={`fe-${s.name}`} $category={s.cat} title={s.name}>
                                                        <SkillPillIcon>{s.icon}</SkillPillIcon>
                                                        <SkillPillName>{s.name}</SkillPillName>
                                                    </SkillPill>
                                                ))}
                                            </Sequence>
                                            <Sequence aria-hidden>
                                                {[
                                                    { name: "React", icon: "⚛️", cat: "frontend" },
                                                    { name: "JavaScript", icon: "⚡", cat: "frontend" },
                                                    { name: "WebSockets", icon: "🔌", cat: "frontend" },
                                                ].map(s => (
                                                    <SkillPill key={`fe2-${s.name}`} $category={s.cat}>
                                                        <SkillPillIcon>{s.icon}</SkillPillIcon>
                                                        <SkillPillName>{s.name}</SkillPillName>
                                                    </SkillPill>
                                                ))}
                                            </Sequence>
                                            <Sequence aria-hidden>
                                                {[
                                                    { name: "React", icon: "⚛️", cat: "frontend" },
                                                    { name: "JavaScript", icon: "⚡", cat: "frontend" },
                                                    { name: "WebSockets", icon: "🔌", cat: "frontend" },
                                                ].map(s => (
                                                    <SkillPill key={`fe3-${s.name}`} $category={s.cat}>
                                                        <SkillPillIcon>{s.icon}</SkillPillIcon>
                                                        <SkillPillName>{s.name}</SkillPillName>
                                                    </SkillPill>
                                                ))}
                                            </Sequence>
                                        </RowTrack>
                                    </RowViewport>
                                </CarouselRow>

                                {/* BACKEND */}
                                <CarouselRow>
                                    <RowLabel>Backend</RowLabel>
                                    <RowViewport>
                                        <RowTrack style={{'--dur':'20s','--delay':'-6s'}}>
                                            <Sequence>
                                                {[
                                                    { name: "Python", icon: "🐍", cat: "backend" },
                                                    { name: "Django", icon: "🎸", cat: "backend" },
                                                    { name: "Celery", icon: "⚙️", cat: "backend" },
                                                    { name: "PostgreSQL", icon: "🐘", cat: "backend" },
                                                ].map(s => (
                                                    <SkillPill key={`be-${s.name}`} $category={s.cat} title={s.name}>
                                                        <SkillPillIcon>{s.icon}</SkillPillIcon>
                                                        <SkillPillName>{s.name}</SkillPillName>
                                                    </SkillPill>
                                                ))}
                                            </Sequence>
                                            <Sequence aria-hidden>
                                                {[
                                                    { name: "Python", icon: "🐍", cat: "backend" },
                                                    { name: "Django", icon: "🎸", cat: "backend" },
                                                    { name: "Celery", icon: "⚙️", cat: "backend" },
                                                    { name: "PostgreSQL", icon: "🐘", cat: "backend" },
                                                ].map(s => (
                                                    <SkillPill key={`be2-${s.name}`} $category={s.cat}>
                                                        <SkillPillIcon>{s.icon}</SkillPillIcon>
                                                        <SkillPillName>{s.name}</SkillPillName>
                                                    </SkillPill>
                                                ))}
                                            </Sequence>
                                            <Sequence aria-hidden>
                                                {[
                                                    { name: "Python", icon: "🐍", cat: "backend" },
                                                    { name: "Django", icon: "🎸", cat: "backend" },
                                                    { name: "Celery", icon: "⚙️", cat: "backend" },
                                                    { name: "PostgreSQL", icon: "🐘", cat: "backend" },
                                                ].map(s => (
                                                    <SkillPill key={`be3-${s.name}`} $category={s.cat}>
                                                        <SkillPillIcon>{s.icon}</SkillPillIcon>
                                                        <SkillPillName>{s.name}</SkillPillName>
                                                    </SkillPill>
                                                ))}
                                            </Sequence>
                                        </RowTrack>
                                    </RowViewport>
                                </CarouselRow>

                                {/* DEVOPS */}
                                <CarouselRow>
                                    <RowLabel>DevOps</RowLabel>
                                    <RowViewport>
                                        <RowTrack style={{'--dur':'22s','--delay':'-2s'}} $reverse>
                                            <Sequence>
                                                {[
                                                    { name: "Docker", icon: "🐳", cat: "devops" },
                                                    { name: "Nginx", icon: "🧭", cat: "devops" },
                                                    { name: "Gunicorn", icon: "🦄", cat: "devops" },
                                                ].map(s => (
                                                    <SkillPill key={`do-${s.name}`} $category={s.cat} title={s.name}>
                                                        <SkillPillIcon>{s.icon}</SkillPillIcon>
                                                        <SkillPillName>{s.name}</SkillPillName>
                                                    </SkillPill>
                                                ))}
                                            </Sequence>
                                            <Sequence aria-hidden>
                                                {[
                                                    { name: "Docker", icon: "🐳", cat: "devops" },
                                                    { name: "Nginx", icon: "🧭", cat: "devops" },
                                                    { name: "Gunicorn", icon: "🦄", cat: "devops" },
                                                ].map(s => (
                                                    <SkillPill key={`do2-${s.name}`} $category={s.cat}>
                                                        <SkillPillIcon>{s.icon}</SkillPillIcon>
                                                        <SkillPillName>{s.name}</SkillPillName>
                                                    </SkillPill>
                                                ))}
                                            </Sequence>
                                            <Sequence aria-hidden>
                                                {[
                                                    { name: "Docker", icon: "🐳", cat: "devops" },
                                                    { name: "Nginx", icon: "🧭", cat: "devops" },
                                                    { name: "Gunicorn", icon: "🦄", cat: "devops" },
                                                ].map(s => (
                                                    <SkillPill key={`do3-${s.name}`} $category={s.cat}>
                                                        <SkillPillIcon>{s.icon}</SkillPillIcon>
                                                        <SkillPillName>{s.name}</SkillPillName>
                                                    </SkillPill>
                                                ))}
                                            </Sequence>
                                        </RowTrack>
                                    </RowViewport>
                                </CarouselRow>

                                {/* CLOUD / AUTH */}
                                <CarouselRow>
                                    <RowLabel>Cloud & Auth</RowLabel>
                                    <RowViewport>
                                        <RowTrack style={{'--dur':'24s','--delay':'-5s'}}>
                                            <Sequence>
                                                {[
                                                    { name: "AWS EC2", icon: "☁️", cat: "cloud" },
                                                    { name: "OAuth SSO", icon: "🔐", cat: "cloud" },
                                                ].map(s => (
                                                    <SkillPill key={`cl-${s.name}`} $category={s.cat} title={s.name}>
                                                        <SkillPillIcon>{s.icon}</SkillPillIcon>
                                                        <SkillPillName>{s.name}</SkillPillName>
                                                    </SkillPill>
                                                ))}
                                            </Sequence>
                                            <Sequence aria-hidden>
                                                {[
                                                    { name: "AWS EC2", icon: "☁️", cat: "cloud" },
                                                    { name: "OAuth SSO", icon: "🔐", cat: "cloud" },
                                                ].map(s => (
                                                    <SkillPill key={`cl2-${s.name}`} $category={s.cat}>
                                                        <SkillPillIcon>{s.icon}</SkillPillIcon>
                                                        <SkillPillName>{s.name}</SkillPillName>
                                                    </SkillPill>
                                                ))}
                                            </Sequence>
                                            <Sequence aria-hidden>
                                                {[
                                                    { name: "AWS EC2", icon: "☁️", cat: "cloud" },
                                                    { name: "OAuth SSO", icon: "🔐", cat: "cloud" },
                                                ].map(s => (
                                                    <SkillPill key={`cl3-${s.name}`} $category={s.cat}>
                                                        <SkillPillIcon>{s.icon}</SkillPillIcon>
                                                        <SkillPillName>{s.name}</SkillPillName>
                                                    </SkillPill>
                                                ))}
                                            </Sequence>
                                        </RowTrack>
                                    </RowViewport>
                                </CarouselRow>
                            </SkillsCarousel>
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
        rgb(105, 80, 160) 8%,
        rgb(110, 90, 170) 15%,
        rgb(115, 100, 180) 22%,
        rgb(118, 110, 190) 30%,
        rgb(122, 120, 200) 40%,
        rgb(126, 135, 210) 50%,
        rgb(130, 148, 218) 60%,
        rgb(134, 160, 225) 70%,
        rgb(138, 172, 232) 80%,
        rgb(142, 184, 238) 88%,
        rgb(146, 192, 242) 94%,
        rgb(148, 196, 244) 97%,
        rgb(150, 200, 246) 100%);
    width: 100vw;
    padding: 4rem 2rem;
    padding-bottom: 0;
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
    margin-top: 1rem;
    margin-bottom: 2rem;
    
    @media (max-width: 1600px) {
        font-size: 1.5rem;
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
    width: 500px;
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
`;

const HeaderTop = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 0.5rem;
`;

const HeaderOverview = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
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
    position: absolute;
    right: 5%;
    top: 5%;
    width: 100px;
    height: 100px;
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
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
`;

const CardBody = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

const JobTitle = styled.div`
    font-size: 1.3rem;
    font-weight: 700;
    letter-spacing: 0.5px;
    
    /* Metallic blue-silver gradient with depth */
    background: linear-gradient(
        135deg,
        rgb(180, 200, 230) 0%,
        rgb(220, 230, 245) 15%,
        rgb(140, 180, 230) 30%,
        rgb(100, 160, 220) 45%,
        rgb(180, 200, 230) 60%,
        rgb(220, 235, 250) 75%,
        rgb(160, 190, 230) 90%,
        rgb(120, 170, 225) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    background-size: 200% 100%;
    
    /* Subtle depth with shadows */
    filter: drop-shadow(0 2px 4px rgba(100, 160, 220, 0.3))
            drop-shadow(0 1px 2px rgba(180, 200, 230, 0.2));
    
    /* Smooth animation */
    animation: shimmer 8s ease-in-out infinite;
    
    @keyframes shimmer {
        0%, 100% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
    }
`;

// Achievements list - Icon + One-Liner style
const AchievementsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
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
    font-size: 0.9rem;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.9);
    margin: 0;
    flex: 1;
    font-weight: 400;
`;

const CardFooter = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 0.25rem;
    margin-top: auto;
    gap: 0.5rem;
`;

// Project Description
const ProjectDescription = styled.p`
    font-size: 0.95rem;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.8);
    margin: 0;
    font-weight: 400;
    font-style: italic;
`;

// Forecast Label for Skills Section
const ForecastLabel = styled.div`
    font-size: 0.9rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 0.5rem;
`;

// Carousel Container
const SkillsCarousel = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
`;

// A single row = label + viewport
const CarouselRow = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

// Row label (category name)
const RowLabel = styled.div`
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: rgba(255, 255, 255, 0.65);
    min-width: 70px;
    flex-shrink: 0;
`;

// Viewport with soft edge fade (smooth in/out of frame)
const RowViewport = styled.div`
    position: relative;
    overflow: hidden;
    flex: 1;
    height: 34px;
    /* Fade edges for smooth entry/exit */
    -webkit-mask-image: linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%);
    mask-image: linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%);
`;

// Animation for scrolling
const scroll = keyframes`
    from { transform: translateX(0); }
    to   { transform: translateX(-33.333%); } /* one-third of track width = one sequence */
`;

// The moving track (three identical sequences inside for seamless loop)
const RowTrack = styled.div`
    display: flex;
    align-items: center;
    gap: 0.4rem;
    width: max-content; /* shrink to content */
    will-change: transform;
    animation: ${scroll} var(--dur, 20s) linear infinite;
    animation-delay: var(--delay, 0s);
    animation-direction: ${({ $reverse }) => ($reverse ? 'reverse' : 'normal')};

    /* Pause on hover for readability */
    ${RowViewport}:hover & { animation-play-state: paused; }

    @media (prefers-reduced-motion: reduce) {
        animation: none !important;
        transform: none !important;
    }
`;

// One sequence of pills (duplicated for seamless loop)
const Sequence = styled.div`
    display: flex;
    align-items: center;
    gap: 0.4rem;
    flex: 0 0 auto;
    white-space: nowrap;
`;

const SkillPill = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.45rem 0.85rem;
    border-radius: 999px;
    font-size: 0.8rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.95);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: default;
    position: relative;
    overflow: hidden;
    backdrop-filter: blur(8px);
    
    /* Category-specific styling with enhanced gradients */
    background: ${({ $category }) =>
        $category === "frontend" ? `
            linear-gradient(135deg, 
                rgba(142, 197, 255, 0.35) 0%, 
                rgba(191, 227, 255, 0.22) 50%,
                rgba(142, 197, 255, 0.18) 100%)`
        : $category === "backend" ? `
            linear-gradient(135deg, 
                rgba(122, 78, 230, 0.35) 0%, 
                rgba(147, 112, 219, 0.22) 50%,
                rgba(122, 78, 230, 0.18) 100%)`
        : $category === "devops" ? `
            linear-gradient(135deg, 
                rgba(63, 108, 220, 0.35) 0%, 
                rgba(111, 163, 255, 0.22) 50%,
                rgba(63, 108, 220, 0.18) 100%)`
        : `
            linear-gradient(135deg, 
                rgba(100, 200, 200, 0.35) 0%, 
                rgba(150, 220, 220, 0.22) 50%,
                rgba(100, 200, 200, 0.18) 100%)`
    };
    
    border: 1.5px solid ${({ $category }) =>
        $category === "frontend" ? "rgba(142, 197, 255, 0.5)"
        : $category === "backend" ? "rgba(122, 78, 230, 0.5)"
        : $category === "devops" ? "rgba(63, 108, 220, 0.5)"
        : "rgba(100, 200, 200, 0.5)"
    };
    
    box-shadow: 
        0 2px 8px ${({ $category }) =>
            $category === "frontend" ? "rgba(142, 197, 255, 0.15)"
            : $category === "backend" ? "rgba(122, 78, 230, 0.15)"
            : $category === "devops" ? "rgba(63, 108, 220, 0.15)"
            : "rgba(100, 200, 200, 0.15)"},
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
    
    /* Subtle shine effect */
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
        );
        transition: left 0.5s ease;
    }
    
    &:hover {
        box-shadow: 
            0 6px 16px ${({ $category }) =>
                $category === "frontend" ? "rgba(142, 197, 255, 0.28)"
                : $category === "backend" ? "rgba(122, 78, 230, 0.28)"
                : $category === "devops" ? "rgba(63, 108, 220, 0.28)"
                : "rgba(100, 200, 200, 0.28)"},
            inset 0 1px 0 rgba(255, 255, 255, 0.15),
            0 0 20px ${({ $category }) =>
                $category === "frontend" ? "rgba(142, 197, 255, 0.15)"
                : $category === "backend" ? "rgba(122, 78, 230, 0.15)"
                : $category === "devops" ? "rgba(63, 108, 220, 0.15)"
                : "rgba(100, 200, 200, 0.15)"};
        border-color: ${({ $category }) =>
            $category === "frontend" ? "rgba(142, 197, 255, 0.75)"
            : $category === "backend" ? "rgba(122, 78, 230, 0.75)"
            : $category === "devops" ? "rgba(63, 108, 220, 0.75)"
            : "rgba(100, 200, 200, 0.75)"
        };
        
        &::before {
            left: 100%;
        }
    }
    
    &:active {
        transform: translateY(-1px) scale(1);
    }
`;

const SkillPillIcon = styled.span`
    font-size: 1.05rem;
    line-height: 1;
    display: flex;
    align-items: center;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
    transition: transform 0.3s ease;
    
    ${SkillPill}:hover & {
        transform: scale(1.1) rotate(5deg);
    }
`;

const SkillPillName = styled.span`
    line-height: 1;
    white-space: nowrap;
    font-size: 0.8rem;
    letter-spacing: 0.3px;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
    font-weight: 600;
`;

// Export.
export default ActualExperience;
