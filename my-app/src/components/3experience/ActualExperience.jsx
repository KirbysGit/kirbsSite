// Shared seam color for smooth gradient transition (slightly darker)
export const SEAM_RGB = '78, 58, 128'; // rgb(78, 58, 128)

// Imports.
import React, { useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import Cloud from './Cloud';
import Aurora from '../2story/Aurora';

// Import company logos
import bitgoLogo from '@/images/3experience/bitgoSmall.jpg';
import barLouieLogo from '@/images/3experience/blSmall.png';
import hawkersLogo from '@/images/3experience/hawkersSmall.png';

// Import skill logos
import reactLogo from '@/images/logos/react.png';
import javascriptLogo from '@/images/logos/javascript.png';
import websocketsLogo from '@/images/logos/websockets.png';
import pythonLogo from '@/images/logos/python.png';
import djangoLogo from '@/images/logos/django.png';
import celeryLogo from '@/images/logos/celery.png';
import postgresqlLogo from '@/images/logos/postgresql.png';
import dockerLogo from '@/images/logos/docker.png';
import nginxLogo from '@/images/logos/nginx.png';
import gunicornLogo from '@/images/logos/gunicorn.png';
import awsLogo from '@/images/logos/aws.png';
import googleOAuthLogo from '@/images/logos/googleoauth.png';
import curiousImg from '@/images/3experience/curious.jpg';

// Helper function to get logo for a skill name
const getLogo = (name) => {
    const logoMap = {
        'React': reactLogo,
        'JavaScript': javascriptLogo,
        'WebSockets': websocketsLogo,
        'Python': pythonLogo,
        'Django': djangoLogo,
        'Celery': celeryLogo,
        'PostgreSQL': postgresqlLogo,
        'Docker': dockerLogo,
        'Nginx': nginxLogo,
        'Gunicorn': gunicornLogo,
        'AWS EC2': awsLogo,
        'OAuth SSO': googleOAuthLogo
    };
    return logoMap[name] || null;
};

// Helper function to get brand colors for each skill
const getBrandColors = (name) => {
    const colorMap = {
        'React': {
            gradient: 'linear-gradient(135deg, rgba(97, 218, 251, 0.35) 0%, rgba(97, 218, 251, 0.22) 50%, rgba(97, 218, 251, 0.18) 100%)',
            border: 'rgba(97, 218, 251, 0.5)',
            shadow: 'rgba(97, 218, 251, 0.15)',
            hoverShadow: 'rgba(97, 218, 251, 0.28)',
            hoverGlow: 'rgba(97, 218, 251, 0.15)',
            hoverBorder: 'rgba(97, 218, 251, 0.75)'
        },
        'JavaScript': {
            gradient: 'linear-gradient(135deg, rgba(247, 223, 30, 0.35) 0%, rgba(247, 223, 30, 0.22) 50%, rgba(247, 223, 30, 0.18) 100%)',
            border: 'rgba(247, 223, 30, 0.5)',
            shadow: 'rgba(247, 223, 30, 0.15)',
            hoverShadow: 'rgba(247, 223, 30, 0.28)',
            hoverGlow: 'rgba(247, 223, 30, 0.15)',
            hoverBorder: 'rgba(247, 223, 30, 0.75)'
        },
        'WebSockets': {
            gradient: 'linear-gradient(135deg, rgba(138, 43, 226, 0.35) 0%, rgba(138, 43, 226, 0.22) 50%, rgba(138, 43, 226, 0.18) 100%)',
            border: 'rgba(138, 43, 226, 0.5)',
            shadow: 'rgba(138, 43, 226, 0.15)',
            hoverShadow: 'rgba(138, 43, 226, 0.28)',
            hoverGlow: 'rgba(138, 43, 226, 0.15)',
            hoverBorder: 'rgba(138, 43, 226, 0.75)'
        },
        'Python': {
            gradient: 'linear-gradient(135deg, rgba(67, 120, 200, 0.35) 0%, rgba(67, 120, 200, 0.22) 50%, rgba(67, 120, 200, 0.18) 100%)',
            border: 'rgba(67, 120, 200, 0.5)',
            shadow: 'rgba(67, 120, 200, 0.15)',
            hoverShadow: 'rgba(67, 120, 200, 0.28)',
            hoverGlow: 'rgba(67, 120, 200, 0.15)',
            hoverBorder: 'rgba(67, 120, 200, 0.75)'
        },
        'Django': {
            gradient: 'linear-gradient(135deg, rgba(9, 45, 32, 0.35) 0%, rgba(9, 45, 32, 0.22) 50%, rgba(9, 45, 32, 0.18) 100%)',
            border: 'rgba(9, 45, 32, 0.5)',
            shadow: 'rgba(9, 45, 32, 0.15)',
            hoverShadow: 'rgba(9, 45, 32, 0.28)',
            hoverGlow: 'rgba(9, 45, 32, 0.15)',
            hoverBorder: 'rgba(9, 45, 32, 0.75)'
        },
        'Celery': {
            gradient: 'linear-gradient(135deg, rgba(169, 209, 142, 0.35) 0%, rgba(169, 209, 142, 0.22) 50%, rgba(169, 209, 142, 0.18) 100%)',
            border: 'rgba(169, 209, 142, 0.5)',
            shadow: 'rgba(169, 209, 142, 0.15)',
            hoverShadow: 'rgba(169, 209, 142, 0.28)',
            hoverGlow: 'rgba(169, 209, 142, 0.15)',
            hoverBorder: 'rgba(169, 209, 142, 0.75)'
        },
        'PostgreSQL': {
            gradient: 'linear-gradient(135deg, rgba(68, 137, 217, 0.35) 0%, rgba(68, 137, 217, 0.22) 50%, rgba(68, 137, 217, 0.18) 100%)',
            border: 'rgba(68, 137, 217, 0.5)',
            shadow: 'rgba(68, 137, 217, 0.15)',
            hoverShadow: 'rgba(68, 137, 217, 0.28)',
            hoverGlow: 'rgba(68, 137, 217, 0.15)',
            hoverBorder: 'rgba(68, 137, 217, 0.75)'
        },
        'Docker': {
            gradient: 'linear-gradient(135deg, rgba(13, 110, 253, 0.35) 0%, rgba(13, 110, 253, 0.22) 50%, rgba(13, 110, 253, 0.18) 100%)',
            border: 'rgba(13, 110, 253, 0.5)',
            shadow: 'rgba(13, 110, 253, 0.15)',
            hoverShadow: 'rgba(13, 110, 253, 0.28)',
            hoverGlow: 'rgba(13, 110, 253, 0.15)',
            hoverBorder: 'rgba(13, 110, 253, 0.75)'
        },
        'Nginx': {
            gradient: 'linear-gradient(135deg, rgba(46, 125, 50, 0.35) 0%, rgba(46, 125, 50, 0.22) 50%, rgba(46, 125, 50, 0.18) 100%)',
            border: 'rgba(46, 125, 50, 0.5)',
            shadow: 'rgba(46, 125, 50, 0.15)',
            hoverShadow: 'rgba(46, 125, 50, 0.28)',
            hoverGlow: 'rgba(46, 125, 50, 0.15)',
            hoverBorder: 'rgba(46, 125, 50, 0.75)'
        },
        'Gunicorn': {
            gradient: 'linear-gradient(135deg, rgba(19, 78, 74, 0.35) 0%, rgba(19, 78, 74, 0.22) 50%, rgba(19, 78, 74, 0.18) 100%)',
            border: 'rgba(19, 78, 74, 0.5)',
            shadow: 'rgba(19, 78, 74, 0.15)',
            hoverShadow: 'rgba(19, 78, 74, 0.28)',
            hoverGlow: 'rgba(19, 78, 74, 0.15)',
            hoverBorder: 'rgba(19, 78, 74, 0.75)'
        },
        'AWS EC2': {
            gradient: 'linear-gradient(135deg, rgba(255, 153, 0, 0.35) 0%, rgba(255, 153, 0, 0.22) 50%, rgba(255, 153, 0, 0.18) 100%)',
            border: 'rgba(255, 153, 0, 0.5)',
            shadow: 'rgba(255, 153, 0, 0.15)',
            hoverShadow: 'rgba(255, 153, 0, 0.28)',
            hoverGlow: 'rgba(255, 153, 0, 0.15)',
            hoverBorder: 'rgba(255, 153, 0, 0.75)'
        },
        'OAuth SSO': {
            gradient: 'linear-gradient(135deg, rgba(255, 82, 82, 0.35) 0%, rgba(255, 82, 82, 0.22) 50%, rgba(255, 82, 82, 0.18) 100%)',
            border: 'rgba(255, 82, 82, 0.5)',
            shadow: 'rgba(255, 82, 82, 0.15)',
            hoverShadow: 'rgba(255, 82, 82, 0.28)',
            hoverGlow: 'rgba(255, 82, 82, 0.15)',
            hoverBorder: 'rgba(255, 82, 82, 0.75)'
        }
    };
    return colorMap[name] || colorMap['React'];
};

// ActualExperience Component.
const ActualExperience = () => {
    const [index, setIndex] = useState(1);
    const [paused, setPaused] = useState(false);
    const drag = useRef({ x: 0, active: false });
    
    const experiences = [
        { id: 'hire', name: "What's Next?", type: 'hire' },
        { id: 'bitgo', name: 'BitGo', type: 'tech' },
        { id: 'barlouie', name: 'Bar Louie', type: 'service' },
        { id: 'hawkers', name: 'Hawkers', type: 'service' }
    ];
    
    const n = experiences.length;
    const next = () => setIndex((i) => (i + 1) % n);
    const prev = () => setIndex((i) => (i - 1 + n) % n);
    
    const onPointerDown = (e) => {
        drag.current = { x: e.clientX ?? e.touches?.[0]?.clientX ?? 0, active: true };
        setPaused(true);
    };
    
    const onPointerUp = (e) => {
        if (!drag.current.active) return;
        const upX = e.clientX ?? e.changedTouches?.[0]?.clientX ?? 0;
        const dx = upX - drag.current.x;
        drag.current.active = false;
        if (Math.abs(dx) > 50) (dx < 0 ? next() : prev());
        setPaused(false);
    };
    
    const getCardStyle = (cardIndex) => {
        const distance = Math.abs(cardIndex - index);
        if (distance > 1) return null;
        return {
            position: cardIndex - index,
            isFocused: cardIndex === index,
            distance: distance
        };
    };
    
    return (
        <ExperienceContainer id="experience">
            {/* Aurora effects at the top */}
            <AuroraWrapper >
                <Aurora />
            </AuroraWrapper>
            
            {/* Parallax Cloud Layers - Far, Mid, Near */}
            <CloudLayer>
                {/* FAR LAYER - 6 clouds: positioned in bottom 30% */}
                <Cloud top="70%" delay="0" duration="180" layer="far" type={1} direction="left" />
                <Cloud top="73%" delay="10" duration="200" layer="far" type={3} direction="right" />
                <Cloud top="76%" delay="20" duration="190" layer="far" type={2} direction="left" />
                <Cloud top="80%" delay="30" duration="195" layer="far" type={5} direction="right" />
                <Cloud top="85%" delay="40" duration="185" layer="far" type={4} direction="left" />
                <Cloud top="90%" delay="50" duration="192" layer="far" type={1} direction="right" />
                
                {/* MID LAYER - 7 clouds: positioned in bottom 30% */}
                <Cloud top="71%" delay="3" duration="145" layer="mid" type={4} direction="left" />
                <Cloud top="74%" delay="13" duration="140" layer="mid" type={2} direction="right" />
                <Cloud top="77%" delay="23" duration="150" layer="mid" type={5} direction="left" />
                <Cloud top="82%" delay="33" duration="155" layer="mid" type={1} direction="right" />
                <Cloud top="87%" delay="43" duration="142" layer="mid" type={3} direction="left" />
                <Cloud top="75%" delay="53" duration="148" layer="mid" type={4} direction="right" />
                <Cloud top="92%" delay="57" duration="143" layer="mid" type={2} direction="left" />
                
                {/* NEAR LAYER - 7 clouds: positioned in bottom 30% */}
                <Cloud top="72%" delay="6" duration="115" layer="near" type={3} direction="left" />
                <Cloud top="75%" delay="17" duration="125" layer="near" type={1} direction="right" />
                <Cloud top="83%" delay="27" duration="120" layer="near" type={4} direction="left" />
                <Cloud top="88%" delay="37" duration="118" layer="near" type={5} direction="right" />
                <Cloud top="79%" delay="47" duration="116" layer="near" type={2} direction="left" />
                <Cloud top="91%" delay="54" duration="122" layer="near" type={3} direction="right" />
                <Cloud top="94%" delay="60" duration="119" layer="near" type={1} direction="left" />
            </CloudLayer>
            
            <ContentWrapper>
                <SectionTitle>Experience</SectionTitle>
                
                <SectionSubtitle>Where I've built, learned, and grown</SectionSubtitle>
                
                {/* Experience Carousel */}
                <Stage
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                    onPointerDown={onPointerDown}
                    onPointerUp={onPointerUp}
                    onTouchStart={onPointerDown}
                    onTouchEnd={onPointerUp}
                    role="region"
                    aria-label="Experience carousel"
                >
                    <Track>
                        {/* Hire Me Intro Card */}
                        {(() => {
                            const cardStyle = getCardStyle(0);
                            if (!cardStyle) return null;
                            return (
                                <Slide $position={cardStyle.position} $isFocused={cardStyle.isFocused} $distance={cardStyle.distance}>
                                    <HireCard>
                                        <HireHeader>
                                            <HireTitle>What’s Next?</HireTitle>
                                            <HireSubtitle>Honestly, I'm not 100% sure yet. I’m keeping an open mind and exploring where I can make the biggest impact.</HireSubtitle>
                                        </HireHeader>
                                        <HireBody>
                                            <HireAvatar src={curiousImg} alt="Curious" />
                                            <HireBlurb>
                                                If you’re a recruiter or company interested in working together, I’d love to chat about potential roles or projects. Let’s build something great!                                           </HireBlurb>
                                            <HireActions>
                                                <Divider $themeColor="rgb(200, 180, 255)" />
                                                <HireReach>Reach out to me at:</HireReach>
                                                <HireButton as="div" role="button" aria-label="Email">
                                                    kirbycolin26@gmail.com
                                                </HireButton>
                                            </HireActions>
                                        </HireBody>
                                    </HireCard>
                                </Slide>
                            );
                        })()}
                        {/* BitGo Card */}
                        {(() => {
                            const cardStyle = getCardStyle(1);
                            if (!cardStyle) return null;
                            return (
                                <Slide $position={cardStyle.position} $isFocused={cardStyle.isFocused} $distance={cardStyle.distance}>
                    <ExperienceCard>
                        <CardHeader>
                            <HeaderTop>
                                <CompanyInfo>
                                    <CompanyName>BitGo</CompanyName>
                                    <DateRange>May 2024 - June 2025</DateRange>
                                </CompanyInfo>
                                                <CompanyLogo src={bitgoLogo} alt="BitGo logo" $themeColor="rgba(13, 173, 220, 0.5)" />
                            </HeaderTop>
                            
                            <HeaderOverview>
                                <JobTitle>Software Engineering Intern</JobTitle>
                                <ProjectDescription>
                                    Built an automation portal to make BitGo's IT team's life easier, turning manual work into one-click operations.
                                </ProjectDescription>
                            </HeaderOverview>
                            <Divider $themeColor="rgb(13, 173, 220)" />
                        </CardHeader>
                        
                        <CardBody>
                            <AchievementsList>
                                <Achievement>
                                                    <AchievementIcon $themeColor="13, 173, 220" />
                                    <AchievementText>Automated 20+ IT workflows with OAuth SSO and role-based access</AchievementText>
                                </Achievement>
                                
                                <Achievement>
                                                    <AchievementIcon $themeColor="13, 173, 220" />
                                    <AchievementText>Saved ~150 staff hours annually with real-time monitoring dashboards</AchievementText>
                                </Achievement>
                                
                                <Achievement>
                                                    <AchievementIcon $themeColor="13, 173, 220" />
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
                                                    { name: "React", cat: "frontend" },
                                                    { name: "JavaScript", cat: "frontend" },
                                                    { name: "WebSockets", cat: "frontend" },
                                                ].map(s => (
                                                    <SkillPill key={`fe-${s.name}`} $skillName={s.name} title={s.name}>
                                                        <SkillPillIcon src={getLogo(s.name)} alt={s.name} />
                                                        <SkillPillName>{s.name}</SkillPillName>
                                                    </SkillPill>
                                                ))}
                                            </Sequence>
                                            <Sequence aria-hidden>
                                                {[
                                                    { name: "React", cat: "frontend" },
                                                    { name: "JavaScript", cat: "frontend" },
                                                    { name: "WebSockets", cat: "frontend" },
                                                ].map(s => (
                                                    <SkillPill key={`fe2-${s.name}`} $skillName={s.name}>
                                                        <SkillPillIcon src={getLogo(s.name)} alt={s.name} />
                                                        <SkillPillName>{s.name}</SkillPillName>
                                                    </SkillPill>
                                                ))}
                                            </Sequence>
                                            <Sequence aria-hidden>
                                                {[
                                                    { name: "React", cat: "frontend" },
                                                    { name: "JavaScript", cat: "frontend" },
                                                    { name: "WebSockets", cat: "frontend" },
                                                ].map(s => (
                                                    <SkillPill key={`fe3-${s.name}`} $skillName={s.name}>
                                                        <SkillPillIcon src={getLogo(s.name)} alt={s.name} />
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
                                                    { name: "Python", cat: "backend" },
                                                    { name: "Django", cat: "backend" },
                                                    { name: "Celery", cat: "backend" },
                                                    { name: "PostgreSQL", cat: "backend" },
                                                ].map(s => (
                                                    <SkillPill key={`be-${s.name}`} $skillName={s.name} title={s.name}>
                                                        <SkillPillIcon src={getLogo(s.name)} alt={s.name} />
                                                        <SkillPillName>{s.name}</SkillPillName>
                                                    </SkillPill>
                                                ))}
                                            </Sequence>
                                            <Sequence aria-hidden>
                                                {[
                                                    { name: "Python", cat: "backend" },
                                                    { name: "Django", cat: "backend" },
                                                    { name: "Celery", cat: "backend" },
                                                    { name: "PostgreSQL", cat: "backend" },
                                                ].map(s => (
                                                    <SkillPill key={`be2-${s.name}`} $skillName={s.name}>
                                                        <SkillPillIcon src={getLogo(s.name)} alt={s.name} />
                                                        <SkillPillName>{s.name}</SkillPillName>
                                                    </SkillPill>
                                                ))}
                                            </Sequence>
                                            <Sequence aria-hidden>
                                                {[
                                                    { name: "Python", cat: "backend" },
                                                    { name: "Django", cat: "backend" },
                                                    { name: "Celery", cat: "backend" },
                                                    { name: "PostgreSQL", cat: "backend" },
                                                ].map(s => (
                                                    <SkillPill key={`be3-${s.name}`} $skillName={s.name}>
                                                        <SkillPillIcon src={getLogo(s.name)} alt={s.name} />
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
                                                    { name: "Docker", cat: "devops" },
                                                    { name: "Nginx", cat: "devops" },
                                                    { name: "Gunicorn", cat: "devops" },
                                                ].map(s => (
                                                    <SkillPill key={`do-${s.name}`} $skillName={s.name} title={s.name}>
                                                        <SkillPillIcon src={getLogo(s.name)} alt={s.name} />
                                                        <SkillPillName>{s.name}</SkillPillName>
                                                    </SkillPill>
                                                ))}
                                            </Sequence>
                                            <Sequence aria-hidden>
                                                {[
                                                    { name: "Docker", cat: "devops" },
                                                    { name: "Nginx", cat: "devops" },
                                                    { name: "Gunicorn", cat: "devops" },
                                                ].map(s => (
                                                    <SkillPill key={`do2-${s.name}`} $skillName={s.name}>
                                                        <SkillPillIcon src={getLogo(s.name)} alt={s.name} />
                                                        <SkillPillName>{s.name}</SkillPillName>
                                                    </SkillPill>
                                                ))}
                                            </Sequence>
                                            <Sequence aria-hidden>
                                                {[
                                                    { name: "Docker", cat: "devops" },
                                                    { name: "Nginx", cat: "devops" },
                                                    { name: "Gunicorn", cat: "devops" },
                                                ].map(s => (
                                                    <SkillPill key={`do3-${s.name}`} $skillName={s.name}>
                                                        <SkillPillIcon src={getLogo(s.name)} alt={s.name} />
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
                                                    { name: "AWS EC2", cat: "cloud" },
                                                    { name: "OAuth SSO", cat: "cloud" },
                                                ].map(s => (
                                                    <SkillPill key={`cl-${s.name}`} $skillName={s.name} title={s.name}>
                                                        <SkillPillIcon src={getLogo(s.name)} alt={s.name} />
                                                        <SkillPillName>{s.name}</SkillPillName>
                                                    </SkillPill>
                                                ))}
                                            </Sequence>
                                            <Sequence aria-hidden>
                                                {[
                                                    { name: "AWS EC2", cat: "cloud" },
                                                    { name: "OAuth SSO", cat: "cloud" },
                                                ].map(s => (
                                                    <SkillPill key={`cl2-${s.name}`} $skillName={s.name}>
                                                        <SkillPillIcon src={getLogo(s.name)} alt={s.name} />
                                                        <SkillPillName>{s.name}</SkillPillName>
                                                    </SkillPill>
                                                ))}
                                            </Sequence>
                                            <Sequence aria-hidden>
                                                {[
                                                    { name: "AWS EC2", cat: "cloud" },
                                                    { name: "OAuth SSO", cat: "cloud" },
                                                ].map(s => (
                                                    <SkillPill key={`cl3-${s.name}`} $skillName={s.name}>
                                                        <SkillPillIcon src={getLogo(s.name)} alt={s.name} />
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
                                </Slide>
                            );
                        })()}
                        
                        {/* Bar Louie Card */}
                        {(() => {
                            const cardStyle = getCardStyle(2);
                            if (!cardStyle) return null;
                            return (
                                <Slide $position={cardStyle.position} $isFocused={cardStyle.isFocused} $distance={cardStyle.distance}>
                                        <ServiceExperienceCard $theme="barlouie">
                                        <CardHeader>
                                            <HeaderTop>
                                                <CompanyInfo>
                                                    <CompanyName>Bar Louie</CompanyName>
                                                    <DateRange>Oct 2022 - Present</DateRange>
                                                </CompanyInfo>
                                                <CompanyLogo src={barLouieLogo} alt="Bar Louie logo" $themeColor="rgba(203, 192, 196, 0.6)" />
                                            </HeaderTop>
                                            
                                            <HeaderOverview>
                                                <JobTitle $theme="barlouie">Server</JobTitle>
                                                <ProjectDescription>
                                                    Progressed from barback to server in a high-volume environment, consistently delivering exceptional service while managing $1250+ in sales per shift.
                                                </ProjectDescription>
                                            </HeaderOverview>
                                            <Divider $themeColor="rgb(203, 192, 196)" />
                                        </CardHeader>
                                        
                                        <CardBody>
                                            <AchievementsList>
                                                <Achievement $themeColor="203, 192, 196">
                                                    <AchievementIcon $themeColor="203, 192, 196" />
                                                    <AchievementText>Adapting to high-pressure situations and thriving under stress</AchievementText>
                                                </Achievement>
                                                
                                                <Achievement $themeColor="203, 192, 196">
                                                    <AchievementIcon $themeColor="203, 192, 196" />
                                                    <AchievementText>Effective communication with guests, kitchen, and bar teams</AchievementText>
                                                </Achievement>
                                                
                                                <Achievement $themeColor="203, 192, 196">
                                                    <AchievementIcon $themeColor="203, 192, 196" />
                                                    <AchievementText>Working seamlessly in fast-paced collaborative environments</AchievementText>
                                                </Achievement>
                                            </AchievementsList>
                                        </CardBody>
                                        
                                        <CardFooter>
                                            <Divider $themeColor="rgb(203, 192, 196)" />
                                            <TechConnection>
                                                <TechConnectionTitle>How This Maps To Software</TechConnectionTitle>
                                                <TechConnectionItem $themeColor="203, 192, 196">
                                                    <TechConnectionDot $themeColor="203, 192, 196" />
                                                    <TechConnectionText>
                                                        Code reviews are stressful, but no sort of stress can ever top someone who's hungry and asking where their food is.
                                                    </TechConnectionText>
                                                </TechConnectionItem>
                                            </TechConnection>
                                        </CardFooter>
                                    </ServiceExperienceCard>
                                </Slide>
                            );
                        })()}
                        
                        {/* Hawkers Card */}
                        {(() => {
                            const cardStyle = getCardStyle(3);
                            if (!cardStyle) return null;
                            return (
                                <Slide $position={cardStyle.position} $isFocused={cardStyle.isFocused} $distance={cardStyle.distance}>
                                    <ServiceExperienceCard $theme="hawkers">
                                        <CardHeader>
                                            <HeaderTop>
                                                <CompanyInfo>
                                                    <CompanyName>Hawkers</CompanyName>
                                                    <DateRange>May 2022 - Aug 2022</DateRange>
                                                </CompanyInfo>
                                                <CompanyLogo src={hawkersLogo} alt="Hawkers logo" $themeColor="rgba(245, 148, 40, 0.6)" />
                                            </HeaderTop>
                                            
                                            <HeaderOverview>
                                                <JobTitle $theme="hawkers">Host / HTO</JobTitle>
                                                <ProjectDescription>
                                                    Managed guest relations and takeout operations that contributed to ~35% of the store's total sales.
                                                </ProjectDescription>
                                            </HeaderOverview>
                                            <Divider $themeColor="rgb(245, 148, 40)" />
                                        </CardHeader>
                                        
                                        <CardBody>
                                            <AchievementsList>
                                                <Achievement $themeColor="245, 148, 40">
                                                    <AchievementIcon $themeColor="245, 148, 40" />
                                                    <AchievementText>Attention to detail in every order for consistent quality</AchievementText>
                                                </Achievement>
                                                
                                                <Achievement $themeColor="245, 148, 40">
                                                    <AchievementIcon $themeColor="245, 148, 40" />
                                                    <AchievementText>Clear communication with customers, kitchen, and delivery teams</AchievementText>
                                                </Achievement>
                                                
                                                <Achievement $themeColor="245, 148, 40">
                                                    <AchievementIcon $themeColor="245, 148, 40" />
                                                    <AchievementText>Direct impact on business revenue - managing ~35% of store sales</AchievementText>
                                                </Achievement>
                                            </AchievementsList>
                                        </CardBody>
                                        
                                        <CardFooter>
                                            <Divider $themeColor="rgb(245, 148, 40)" />
                                            <TechConnection>
                                                <TechConnectionTitle>Why This Helps With Tech</TechConnectionTitle>
                                                <TechConnectionItem $themeColor="245, 148, 40">
                                                    <TechConnectionDot $themeColor="245, 148, 40" />
                                                    <TechConnectionText>
                                                        I don't think explaining a missed Q1 target tops telling a family with a reservation that their table still isn't ready.
                                                    </TechConnectionText>
                                                </TechConnectionItem>
                                            </TechConnection>
                                        </CardFooter>
                                    </ServiceExperienceCard>
                                </Slide>
                            );
                        })()}
                    </Track>
                    
                    {/* Navigation Arrows */}
                    {index > 0 && <ArrowLeft aria-label="Previous experience" onClick={prev}>‹</ArrowLeft>}
                    {index < n - 1 && <ArrowRight aria-label="Next experience" onClick={next}>›</ArrowRight>}
                </Stage>
            </ContentWrapper>
        </ExperienceContainer>
    );
}

// Main container - darker gradient transitioning to sky
const ExperienceContainer = styled.div`
    --seam-rgb: ${SEAM_RGB};
    --seam: rgb(var(--seam-rgb));
    display: flex;
    flex-direction: column;
    min-height: 100vh;

    /* Fallback (RGB) */
    background: linear-gradient(
        to bottom,
        var(--seam) 0%,
        /* hold the seam a bit, then progressively lighten without hue jumps */
        var(--seam) 10%,
        rgb(92 74 155) 32%,
        rgb(112 95 182) 54%,
        rgb(132 127 210) 78%,
        rgb(148 180 243) 100%
    );

    /* Perceptual blend - keeps hue stable while lightening */
    @supports (background: linear-gradient(in oklch, red, blue)) {
        background: linear-gradient(
            to bottom in oklch,
            /* single perceptual ramp from the seam to the sky */
            var(--seam) 0%,
            #a8c2f6 100%
        );
    }
    width: 100%;
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
    padding: 2rem;
    max-width: 1400px;
    margin: 0 auto;
    width: 100%;
    
    @media (max-width: 1600px) {
        max-width: 1200px;
        padding: 1.5rem;
    }
`;

// Section title
const SectionTitle = styled.h1`
    font-size: 5.5rem;
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
    margin-top: 2rem;
    
    @media (max-width: 1600px) {
        font-size: 3.6rem;
        margin-bottom: 0.25rem;
    }
`;

// Section subtitle
const SectionSubtitle = styled.div`
    font-size: 1.75rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.7);
    text-align: center;
    font-style: italic;
    margin: 0;
    margin-top: 1rem;
    position: relative;
    z-index: 3;
    text-shadow: 
        0 2px 8px rgba(0, 0, 0, 0.3),
        0 1px 4px rgba(0, 0, 0, 0.2);
    
    @media (max-width: 1600px) {
        font-size: 1.25rem;
        margin-top: 0.5rem;
        margin-bottom: 1.25rem;
    }
`;

// Carousel Stage - container for the carousel
const Stage = styled.div`
    display: grid;
    place-items: center;
    min-height: 80vh;
    padding: 40px 0;
    position: relative;
    overflow: hidden;
    width: 100%;
    max-width: 1600px;
    margin: 0 auto;
    
    @media (min-width: 2000px) {
        overflow: visible;
        padding-bottom: 2rem;
    }
    
    @media (max-width: 2000px) {
    max-width: 1400px;
    }
    
    @media (max-width: 1600px) {
        min-height: 64vh;
        padding: 0;
        max-width: 100%;
        overflow: visible;
    }
    
    @media (max-width: 1200px) {
        min-height: 60vh;
        padding: 20px 0;
    }
`;

// Track - holds the slides
const Track = styled.div`
    position: relative;
    width: 90%;
    max-width: 1400px;
    height: clamp(600px, 70vh, 800px);
    perspective: 1200px;
    overflow: visible;
    margin: 0 auto;
    
    @media (max-width: 2000px) {
        width: 85%;
        max-width: 1200px;
    }
    
    @media (max-width: 1600px) {
        width: 88%;
        max-width: 980px;
        height: clamp(560px, 60vh, 680px);
    }
    
    @media (max-width: 1200px) {
        width: 75vw;
        height: clamp(500px, 60vh, 700px);
    }
`;

// Slide - individual carousel item
const Slide = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    transition: transform 320ms cubic-bezier(0.22, 0.61, 0.36, 1),
                opacity 220ms ease,
                filter 220ms ease;
    will-change: transform, opacity, filter;
    pointer-events: none;
    
    /* Focused card (center) */
    ${({ $isFocused }) => $isFocused && `
        transform: translateX(0) translateZ(0) scale(1);
        opacity: 1;
        z-index: 10;
        pointer-events: auto;
    `}
    
    /* Adjacent card */
    ${({ $distance, $position }) => $distance === 1 && `
        transform: translateX(${$position > 0 ? '28%' : '-28%'}) scale(0.8) translateZ(-30px);
        opacity: 0.5;
        z-index: 5;
        filter: blur(1.5px) saturate(0.75);
    `}
    
    @media (min-width: 2000px) {
        ${({ $distance, $position }) => $distance === 1 && `
            transform: translateX(${$position > 0 ? '25%' : '-25%'}) scale(0.85) translateZ(-30px);
            opacity: 0.6;
        `}
    }
    
    @media (max-width: 1600px) {
        ${({ $distance, $position }) => $distance === 1 && `
            transform: translateX(${$position > 0 ? '30%' : '-30%'}) scale(0.75) translateZ(-30px);
            opacity: 0.4;
        `}
    }
    
    @media (max-width: 1200px) {
        ${({ $distance, $position }) => $distance === 1 && `
            transform: translateX(${$position > 0 ? '30%' : '-30%'}) scale(0.8) translateZ(-30px);
        `}
    }
`;

// Company Logo - must be defined before ExperienceCard and ServiceExperienceCard
const CompanyLogo = styled.img`
    position: absolute;
    right: 5%;
    top: 5%;
    width: 100px;
    height: 100px;
    border-radius: 12px;
    object-fit: cover;
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    cursor: pointer;
    
    @media (max-width: 1600px) {
        width: 84px;
        height: 84px;
        right: 4%;
        top: 4%;
    }
    
    &:hover {
        transform: scale(1.15) translateY(-8px) rotate(5deg);
        filter: drop-shadow(0 8px 24px ${({ $themeColor }) => $themeColor || 'rgba(13, 173, 220, 0.5)'});
    }
`;

// Individual experience card - phone screen style with frosted glass
const ExperienceCard = styled.div`
    --theme-rgb: 13, 173, 220; /* BitGo */
    
    /* Phone screen dimensions */
    width: 500px;
    height: fit-content;
    
    @media (min-width: 2000px) {
        width: 500px;
    }
    
    @media (max-width: 1600px) {
        width: 450px;
        padding: 1.5rem 1.25rem 0 1.25rem;
    }
    
    /* Solid phone screen background with BitGo gradient */
    background: linear-gradient(135deg,
        rgba(17, 21, 75, 1.0) 0%,
        rgba(44, 49, 81, 0.98) 30%,
        rgba(68, 75, 182, 0.98) 60%,
        rgba(132, 159, 241, 0.97) 100%
    );
    backdrop-filter: blur(20px) saturate(110%);
    -webkit-backdrop-filter: blur(20px) saturate(110%);
    
    /* Glass morphism border with BitGo glow */
    border: 1px solid rgba(13, 173, 220, 0.4);
    border-radius: 24px;
    box-shadow: 
        0 8px 16px rgba(0, 0, 0, 0.3),
        inset 0 1px 2px rgba(13, 173, 220, 0.3),
        inset 0 -1px 2px rgba(0, 0, 0, 0.2),
        0 0 20px rgba(13, 173, 220, 0.2);
    
    /* Layout */
    padding: 1.5rem 1.5rem 0.5rem 1.5rem;
    display: flex;
    flex-direction: column;
    
    /* Smooth transitions */
    transition: all 0.4s ease;
    
    @media (min-width: 2000px) {
        padding-bottom: 2.5rem;
        box-shadow: 
            0 4px 16px rgba(0, 0, 0, 0.2),
            0 8px 32px rgba(0, 0, 0, 0.15),
            0 16px 48px rgba(0, 0, 0, 0.1),
            0 24px 64px rgba(0, 0, 0, 0.05),
            inset 0 1px 2px rgba(13, 173, 220, 0.3),
            inset 0 -1px 2px rgba(0, 0, 0, 0.2),
            0 0 40px rgba(13, 173, 220, 0.2);
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
    
    @media (max-width: 1600px) {
        font-size: 2.2rem;
    }
`;

const DateRange = styled.span`
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.7);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    
    @media (max-width: 1600px) {
        font-size: 0.9rem;
    }
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
    
    @media (max-width: 1600px) {
        margin-top: 0.4rem;
        margin-bottom: 0.4rem;
    }
`;

const CardBody = styled.div`
    display: flex;
    flex-direction: column;
`;

const JobTitle = styled.div`
    font-size: 1.3rem;
    font-weight: 700;
    letter-spacing: 0.5px;
    
    /* Theme-based gradient */
    background: ${({ $theme }) => {
        if ($theme === 'barlouie') {
            return `linear-gradient(
                135deg,
                rgb(175, 96, 108) 0%,
                rgb(203, 192, 196) 25%,
                rgb(232, 70, 90) 50%,
                rgb(203, 192, 196) 75%,
                rgb(175, 96, 108) 100%
            )`;
        } else if ($theme === 'hawkers') {
            return `linear-gradient(
                135deg,
                rgb(245, 148, 40) 0%,
                rgb(255, 163, 97) 25%,
                rgb(255, 107, 58) 50%,
                rgb(255, 163, 97) 75%,
                rgb(245, 148, 40) 100%
            )`;
        } else {
            // Default BitGo gradient
            return `linear-gradient(
        135deg,
        rgb(180, 200, 230) 0%,
        rgb(220, 230, 245) 15%,
        rgb(140, 180, 230) 30%,
        rgb(100, 160, 220) 45%,
        rgb(180, 200, 230) 60%,
        rgb(220, 235, 250) 75%,
        rgb(160, 190, 230) 90%,
        rgb(120, 170, 225) 100%
            )`;
        }
    }};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    background-size: 200% 100%;
    
    /* Subtle depth with shadows */
    filter: ${({ $theme }) => {
        if ($theme === 'barlouie') {
            return `drop-shadow(0 2px 4px rgba(232, 70, 90, 0.3))
                    drop-shadow(0 1px 2px rgba(203, 192, 196, 0.2))`;
        } else if ($theme === 'hawkers') {
            return `drop-shadow(0 2px 4px rgba(255, 107, 58, 0.3))
                    drop-shadow(0 1px 2px rgba(255, 163, 97, 0.2))`;
        } else {
            return `drop-shadow(0 2px 4px rgba(100, 160, 220, 0.3))
                    drop-shadow(0 1px 2px rgba(180, 200, 230, 0.2))`;
        }
    }};
    
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
    
    @media (max-width: 1600px) {
        font-size: 1.1rem;
    }
`;

// Achievements list - Icon + One-Liner style
const AchievementsList = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0;
    gap: 1rem;
    
    @media (max-width: 1600px) {
        gap: 0.6rem;
    }
`;

const Achievement = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid ${({ $themeColor }) => $themeColor ? `rgba(${$themeColor}, 0.2)` : 'rgba(13, 173, 220, 0.2)'};
    transition: all 0.3s ease;
    
    @media (max-width: 1600px) {
        padding: 0.65rem;
    }
    
    &:hover {
        background: ${({ $themeColor }) => $themeColor ? `rgba(${$themeColor}, 0.1)` : 'rgba(13, 173, 220, 0.1)'};
        border-color: ${({ $themeColor }) => $themeColor ? `rgba(${$themeColor}, 0.4)` : 'rgba(13, 173, 220, 0.4)'};
        transform: translateX(4px);
        box-shadow: 0 4px 12px ${({ $themeColor }) => $themeColor ? `rgba(${$themeColor}, 0.2)` : 'rgba(13, 173, 220, 0.2)'};
    }
`;

const AchievementIcon = styled.div`
    flex-shrink: 0;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${({ $themeColor }) => {
        if ($themeColor) {
            return `linear-gradient(135deg, 
                rgba(${$themeColor}, 1) 0%,
                rgba(${$themeColor}, 0.85) 50%,
                rgba(${$themeColor}, 0.7) 100%
            )`;
        }
        return `linear-gradient(135deg, 
            rgba(13, 173, 220, 1) 0%,
            rgba(13, 173, 220, 0.85) 50%,
            rgba(13, 173, 220, 0.7) 100%
        )`;
    }};
    box-shadow: 
        0 0 10px ${({ $themeColor }) => $themeColor ? `rgba(${$themeColor}, 0.5)` : 'rgba(13, 173, 220, 0.5)'},
        inset 0 1px 2px rgba(255, 255, 255, 0.25);
    position: relative;
    margin-top: 2px;
    
    &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);
    }
    
    transition: all 0.3s ease;
    
    ${Achievement}:hover & {
        transform: scale(1.25);
        box-shadow: 
            0 0 16px ${({ $themeColor }) => $themeColor ? `rgba(${$themeColor}, 0.7)` : 'rgba(13, 173, 220, 0.7)'},
            inset 0 1px 2px rgba(255, 255, 255, 0.35);
    }
`;

const AchievementText = styled.p`
    font-size: 0.9rem;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.9);
    margin: 0;
    flex: 1;
    font-weight: 400;
    
    @media (max-width: 1600px) {
        font-size: 0.85rem;
        line-height: 1.45;
    }
`;

const CardFooter = styled.div`
    margin-top: auto;
    padding-top: 0.75rem;
    padding-bottom: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;

// Tech Connection Section
const TechConnection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;

const TechConnectionTitle = styled.h4`
    margin: 0;
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.75);

    @media (max-width: 1600px) {
        font-size: 0.8rem;
        letter-spacing: 0.7px;
    }
`;

const TechConnectionItem = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid ${({ $themeColor }) => $themeColor ? `rgba(${$themeColor}, 0.2)` : 'rgba(13, 173, 220, 0.2)'};
    transition: all 0.3s ease;
    
    @media (max-width: 1600px) {
        padding: 0.65rem;
    }
    
    &:hover {
        background: ${({ $themeColor }) => $themeColor ? `rgba(${$themeColor}, 0.1)` : 'rgba(13, 173, 220, 0.1)'};
        border-color: ${({ $themeColor }) => $themeColor ? `rgba(${$themeColor}, 0.4)` : 'rgba(13, 173, 220, 0.4)'};
        transform: translateX(4px);
        box-shadow: 0 4px 12px ${({ $themeColor }) => $themeColor ? `rgba(${$themeColor}, 0.2)` : 'rgba(13, 173, 220, 0.2)'};
    }
`;

const TechConnectionDot = styled.div`
    flex-shrink: 0;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${({ $themeColor }) => {
        if ($themeColor) {
            return `linear-gradient(135deg, 
                rgba(${$themeColor}, 1) 0%,
                rgba(${$themeColor}, 0.85) 50%,
                rgba(${$themeColor}, 0.7) 100%
            )`;
        }
        return `linear-gradient(135deg, 
            rgba(13, 173, 220, 1) 0%,
            rgba(13, 173, 220, 0.85) 50%,
            rgba(13, 173, 220, 0.7) 100%
        )`;
    }};
    box-shadow: 
        0 0 10px ${({ $themeColor }) => $themeColor ? `rgba(${$themeColor}, 0.5)` : 'rgba(13, 173, 220, 0.5)'},
        inset 0 1px 2px rgba(255, 255, 255, 0.25);
    position: relative;
    
    &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);
    }
`;

const TechConnectionText = styled.p`
    margin: 0;
    text-align: justify;
    font-size: 0.9rem;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.88);
    font-weight: 400;
    font-style: italic;
    flex: 1;

    @media (max-width: 1600px) {
        font-size: 0.85rem;
        line-height: 1.45;
    }
`;

// Project Description
const ProjectDescription = styled.p`
    font-size: 0.95rem;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.8);
    margin: 0;
    font-weight: 400;
    font-style: italic;

    @media (max-width: 1600px) {
    font-size: 0.9rem;
        line-height: 1.45;
    }
`;

// Carousel Container
const SkillsCarousel = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    
    @media (max-width: 1600px) {
        gap: 0.45rem;
    }
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
    
    @media (max-width: 1600px) {
        min-width: 62px;
        font-size: 0.7rem;
        letter-spacing: 0.4px;
    }
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
    
    @media (max-width: 1600px) {
        height: 30px;
    }
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
    
    @media (max-width: 1600px) {
        gap: 0.32rem;
    }

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
    
    @media (max-width: 1600px) {
        gap: 0.32rem;
    }
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
    
    /* Brand-specific styling with enhanced gradients */
    background: ${({ $skillName }) => {
        const colors = getBrandColors($skillName);
        return colors.gradient;
    }};
    
    border: 1.5px solid ${({ $skillName }) => {
        const colors = getBrandColors($skillName);
        return colors.border;
    }};
    
    box-shadow: 
        0 2px 8px ${({ $skillName }) => {
            const colors = getBrandColors($skillName);
            return colors.shadow;
        }},
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
            0 6px 16px ${({ $skillName }) => {
                const colors = getBrandColors($skillName);
                return colors.hoverShadow;
            }},
            inset 0 1px 0 rgba(255, 255, 255, 0.15),
            0 0 20px ${({ $skillName }) => {
                const colors = getBrandColors($skillName);
                return colors.hoverGlow;
            }};
        border-color: ${({ $skillName }) => {
            const colors = getBrandColors($skillName);
            return colors.hoverBorder;
        }};
        
        &::before {
            left: 100%;
        }
    }
    
    &:active {
        transform: translateY(-1px) scale(1);
    }
    
    @media (max-width: 1600px) {
        padding: 0.35rem 0.7rem;
        font-size: 0.75rem;
    }
`;

const SkillPillIcon = styled.img`
    width: 1.05rem;
    height: 1.05rem;
    object-fit: contain;
    display: flex;
    align-items: center;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
    transition: transform 0.3s ease;
    
    @media (max-width: 1600px) {
        width: 0.95rem;
        height: 0.95rem;
    }
    
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
    
    @media (max-width: 1600px) {
        font-size: 0.75rem;
        letter-spacing: 0.25px;
    }
`;

/* ========== Service Experience Cards ========== */

const ServiceExperienceCard = styled.div`
    --theme-rgb: ${({ $theme }) =>
        $theme === 'barlouie' ? '203, 192, 196'
        : $theme === 'hawkers' ? '245, 148, 40'
        : '255,255,255'};
    
    width: 500px;
    height: fit-content;
    background: ${({ $theme }) => {
        if ($theme === 'barlouie') {
            return `linear-gradient(135deg,
                rgba(17, 0, 8, 1.0) 0%,
                rgba(30, 10, 15, 0.98) 30%,
                rgba(80, 20, 35, 0.98) 60%,
                rgba(134, 33, 49, 0.97) 100%
            )`;
        } else if ($theme === 'hawkers') {
            return `linear-gradient(135deg,
                rgba(40, 30, 15, 1.0) 0%,
                rgba(40, 60, 35, 0.98) 30%,
                rgba(30, 80, 45, 0.98) 60%,
                rgba(40, 118, 97, 0.97) 100%
            )`;
        }
    }};
    backdrop-filter: blur(20px) saturate(110%);
    border: 1px solid ${({ $theme }) => {
        if ($theme === 'barlouie') return 'rgba(203, 192, 196, 0.4)';
        if ($theme === 'hawkers') return 'rgba(245, 148, 40, 0.4)';
        return 'rgba(255, 255, 255, 0.3)';
    }};
    border-radius: 24px;
    padding: 2rem 1.5rem 0rem 1.5rem;
    display: flex;
    flex-direction: column;
    transition: all 0.4s ease;
    box-shadow: 
        0 8px 32px rgba(0, 0, 0, 0.3),
        inset 0 1px 2px rgba(255, 255, 255, 0.1);
    
    @media (min-width: 2000px) {
        width: 500px;
    }
    
    @media (max-width: 1600px) {
        width: 450px;
        padding: 1.5rem 1.25rem;
    }
    
    @media (max-width: 1200px) {
        width: 100%;
        max-width: 400px;
    }
`;

/* ========== Navigation Arrows ========== */

// Arrow bounce animations
const leftBounce = keyframes`
    0%, 100% { transform: translateY(-50%) translateX(0); }
    25% { transform: translateY(-50%) translateX(-3px); }
    75% { transform: translateY(-50%) translateX(3px); }
`;

const rightBounce = keyframes`
    0%, 100% { transform: translateY(-50%) translateX(0); }
    25% { transform: translateY(-50%) translateX(3px); }
    75% { transform: translateY(-50%) translateX(-3px); }
`;

const ArrowBase = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    border: 0;
    width: 56px;
    height: 56px;
    border-radius: 16px;
    background: linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.15));
    color: #fff;
    font-size: 32px;
    font-weight: bold;
    line-height: 1;
    display: grid;
    place-items: center;
    cursor: pointer;
    backdrop-filter: blur(12px);
    border: 2px solid rgba(255,255,255,0.3);
    box-shadow: 
        0 4px 16px rgba(0,0,0,0.15),
        0 0 20px rgba(255,255,255,0.1),
        inset 0 1px 2px rgba(255,255,255,0.2);
    transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 0.95;
    z-index: 20;
    
    &:hover { 
        transform: translateY(-50%) scale(1.1); 
        background: linear-gradient(135deg, rgba(255,255,255,0.35), rgba(255,255,255,0.25));
        border-color: rgba(255,255,255,0.5);
        box-shadow: 
            0 6px 24px rgba(0,0,0,0.2),
            0 0 30px rgba(255,255,255,0.2),
            inset 0 1px 3px rgba(255,255,255,0.3);
    }
    
    &:active {
        transform: translateY(-50%) scale(0.95);
    }
`;

const ArrowLeft = styled(ArrowBase)`
    left: max(12px, 4vw);
    animation: ${leftBounce} 2s ease-in-out infinite;
    animation-delay: 0.5s;
`;

const ArrowRight = styled(ArrowBase)`
    right: max(12px, 4vw);
    animation: ${rightBounce} 2s ease-in-out infinite;
    animation-delay: 1s;
`;

// Aurora wrapper - positions aurora at the top of the section
const AuroraWrapper = styled.div`
    /* layout */
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 35vh; /* smaller, hugs the visible wave spread */
    z-index: 1;
    pointer-events: none;
    overflow: hidden;
    
    /* media queries */
    @media (max-width: 1600px) {
        height: 22vh;
    }
`;

/* ========== Hire Me Intro Card ========== */

const HireCard = styled.div`
    width: 380px;
    max-width: 90vw;
    padding: 1.25rem 1.1rem 1rem 1.1rem;
    border-radius: 20px;
    background: linear-gradient(135deg,
        rgba(76, 54, 134, 0.98) 0%,
        rgba(108, 85, 181, 0.96) 50%,
        rgba(170, 150, 235, 0.95) 100%
    );
    border: 1.5px solid rgba(200, 180, 255, 0.45);
    box-shadow:
        0 8px 18px rgba(0, 0, 0, 0.25),
        0 0 24px rgba(180, 160, 255, 0.25),
        inset 0 1px 2px rgba(255, 255, 255, 0.08);
    display: flex;
    flex-direction: column;
    gap: 0.65rem;
    align-items: stretch;
    text-align: left;

    @media (max-width: 1600px) {
        width: 340px;
        padding: 1rem 1rem 0.9rem 1rem;
    }
`;

const HireHeader = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    align-items: center;
    text-align: center;
`;

const HireTitle = styled.h3`
    margin: 0;
    font-weight: 900;
    font-size: 1.9rem;
    background: linear-gradient(135deg, #fff, rgba(210,190,255,.95));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;

    @media (max-width: 1600px) {
        font-size: 1.5rem;
    }
`;

const HireSubtitle = styled.div`
    color: rgba(255,255,255,0.78);
    font-size: 0.95rem;
`;

const HireBody = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
`;

const HireBlurb = styled.p`
    margin: 0;
    color: rgba(255,255,255,0.9);
    font-size: 0.9rem;
    line-height: 1.6;
    text-align: center;
`;

const HireActions = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    flex-direction: column;
`;

const HireAvatar = styled.img`
    width: 50%;
    height: 50%;
    border-radius: 50%;
    object-fit: cover;
    align-self: center;
    border: 2px solid rgba(230,210,255,0.7);
    box-shadow: 0 4px 14px rgba(180,160,255,0.25);
`;

const HireButton = styled.button`
    padding: 0.65rem 1rem;
    border-radius: 12px;
    border: 1.5px solid rgba(200, 180, 255, 0.65);
    color: rgba(255,255,255,0.98);
    background: linear-gradient(135deg, rgba(200,180,255,0.38), rgba(150,120,255,0.25));
    box-shadow: 0 6px 16px rgba(180, 160, 255, 0.3);
    font-weight: 700;
    cursor: pointer;
    text-decoration: none;
    transition: all 200ms ease;

    &:hover {
        transform: translateY(-1px);
        border-color: rgba(200, 180, 255, 0.9);
        background: linear-gradient(135deg, rgba(210,190,255,0.5), rgba(160,130,255,0.35));
        box-shadow: 0 10px 24px rgba(180, 160, 255, 0.4);
    }
`;

/* Removed secondary link per request */

const HireReach = styled.div`
    color: rgba(230, 220, 255, 0.9);
    font-size: 0.85rem;
    letter-spacing: 0.3px;
`;

// Export.
export default ActualExperience;
