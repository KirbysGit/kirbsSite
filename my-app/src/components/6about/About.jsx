// about.jsx

// just some small stuff about me.

// imports.

import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';

// cards images.
import meImage from '@/images/5about/me.jpg';
import shpeLogo from '@/images/5about/shpe.png';
import knightHacksLogo from '@/images/5about/knightshacks.png';
import aiUcfLogo from '@/images/5about/aiucf.png';
import acmLogo from '@/images/5about/acm.png';
import ReactionBubble from './ReactionBubble';

// footer components.
import MessageInBottle from './MessageInBottle';
import ShellPhone from './ShellPhone';

// footer images.
import rocket from '@/images/5about/footer/rocket.png';
import seaweed from '@/images/5about/footer/seaweed.png';
import flatrock from '@/images/5about/footer/flatrock.png';
import tallrock from '@/images/5about/footer/tallrock.png';
import seaweed2 from '@/images/5about/footer/seaweed2.png';
import seaweed3 from '@/images/5about/footer/seaweed3.png';
import bluecoral from '@/images/5about/footer/bluecoral.png';
import pinkcoral from '@/images/5about/footer/pinkcoral.png';
import rockpileImage from '@/images/5about/footer/rockpile.png';
import yellowcoral from '@/images/5about/footer/yellowcoral.png';
import orangecoral from '@/images/5about/footer/orangecoral.png';
import purplecoral from '@/images/5about/footer/purplecoral.png';
import rockwithseaweed from '@/images/5about/footer/rockwithseaweed.png';

// logos.
import cursorLogo from '@/images/logos/cursor.png';


/* ================== main component ================== */

const Background = () => {

    // animation throttling state.
    const [isInViewport, setIsInViewport] = useState(false);
    const [isSlowDevice, setIsSlowDevice] = useState(false);
    const sectionRef = useRef(null);

    // detect slower devices.
    useEffect(() => {
        // check hardware concurrency (CPU cores).
        const cores = navigator.hardwareConcurrency || 4;
        // check for reduced motion preference.
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        // consider devices with < 4 cores or reduced motion as slower.
        setIsSlowDevice(cores < 4 || prefersReducedMotion);
    }, []);

    // intersection observer to detect when section is in viewport.
    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    // section is in viewport if at least 10% is visible.
                    setIsInViewport(entry.isIntersecting && entry.intersectionRatio > 0.1);
                });
            },
            {
                threshold: [0, 0.1, 0.5, 1],
                rootMargin: '100px' // start loading animations slightly before entering viewport.
            }
        );

		// observe the section.
        observer.observe(section);

        return () => {
			// disconnect the observer on unmount.
            observer.disconnect();
        };
    }, []);

	// scroll to top function.
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <BackgroundContainer 
            id="about" 
            data-section-snap
            ref={sectionRef}
            $isInViewport={isInViewport}
            $isSlowDevice={isSlowDevice}
        >
            {/* surface water layer - connects to skills' ocean wall */}
            <SurfaceWater $isInViewport={isInViewport} $isSlowDevice={isSlowDevice}>
                <SurfaceRippleLayer />
            </SurfaceWater>
            
            {/* unified underwater section - continuous gradient from shallow to deep */}
            <UnderwaterSection $isInViewport={isInViewport} $isSlowDevice={isSlowDevice}>
                {/* underwater header */}
                <UnderwaterHeader>
                    <HeaderTitle 
                        data-snap-title
                        $isInViewport={isInViewport}
                        $isSlowDevice={isSlowDevice}
                    >
                        About Me
                    </HeaderTitle>
                    <HeaderSubtitle 
                        $isInViewport={isInViewport}
                        $isSlowDevice={isSlowDevice}
                    >
                        Dive into my background
                    </HeaderSubtitle>
                </UnderwaterHeader>
                
                {/* profile section with image and info cards */}
                <ProfileSection>
                    {/* left side - circular profile image */}
                    <ImageSection>
                        <ProfileImageFrame>
                            <ProfileImage src={meImage} alt="Colin Kirby" />
                        </ProfileImageFrame>
                        
                        {/* social bubbles below image */}
                        <SocialBubblesContainer>
                            <SocialBubble 
                                href="https://www.linkedin.com/in/colinwkirby/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                $delay={0}
                                $isInViewport={isInViewport}
                                $isSlowDevice={isSlowDevice}
                                aria-label="LinkedIn Profile"
                            >
                                <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                            </SocialBubble>
                            
                            <SocialBubble 
                                href="https://github.com/KirbysGit" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                $delay={0.5}
                                $isInViewport={isInViewport}
                                $isSlowDevice={isSlowDevice}
                                aria-label="GitHub Profile"
                            >
                                <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                            </SocialBubble>
                            
                            <SocialBubble 
                                href="https://www.instagram.com/colin.kirby03/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                $delay={1}
                                $isInViewport={isInViewport}
                                $isSlowDevice={isSlowDevice}
                                aria-label="Instagram Profile"
                            >
                                <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                                </svg>
                            </SocialBubble>
                            
                            <SocialBubble 
                                href="/my_resume.pdf" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                $delay={1.5}
                                $isInViewport={isInViewport}
                                $isSlowDevice={isSlowDevice}
                                aria-label="Download Resume"
                            >
                                <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                                    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                                </svg>
                            </SocialBubble>
                        </SocialBubblesContainer>
                    </ImageSection>
                    
                    {/* right side - 3x2 grid of glassmorphism cards */}
                    <InfoGridSection>
                        <InfoGrid>
                            {/* education card */}
                            <GlassCard>
                                <ReactionBubble 
                                    emoji="🎓" 
                                    side="left" 
                                    size={64}
                                    color="#0A84FF"
                                    top="-1.5rem"
                                    horizontalOffset="-0.5rem"
                                />
                                
                                <CardTitle>My Education</CardTitle>
                                
                                <EducationContent>
                                    <DegreeSection>
                                        <DegreeName>B.S. in Computer Engineering</DegreeName>
                                        <UniversityName>University of Central Florida</UniversityName>
                                    </DegreeSection>
                                    
                                    <InfoRow>
                                        <InfoItem>
                                            <InfoLabel>Duration</InfoLabel>
                                            <CardDate>May 2021 - May 2025</CardDate>
                                        </InfoItem>
                                        <InfoDivider />
                                        <InfoItem>
                                            <InfoLabel>GPA</InfoLabel>
                                            <GPAText>3.8</GPAText>
                                        </InfoItem>
                                    </InfoRow>
                                    
                                    <ClubsSection>
                                        <ClubsLabel>Clubs & Organizations</ClubsLabel>
                                        <ClubsList>
                                            <ClubItem>
                                                <ClubLogo src={shpeLogo} alt="SHPE" />
                                                <ClubName>SHPE</ClubName>
                                            </ClubItem>
                                            <ClubItem>
                                                <ClubLogo src={knightHacksLogo} alt="Knight Hacks" />
                                                <ClubName>Knight Hacks</ClubName>
                                            </ClubItem>
                                            <ClubItem>
                                                <ClubLogo src={aiUcfLogo} alt="AI @ UCF" />
                                                <ClubName>AI @ UCF</ClubName>
                                            </ClubItem>
                                            <ClubItem>
                                                <ClubLogo src={acmLogo} alt="ACM" />
                                                <ClubName>ACM</ClubName>
                                            </ClubItem>
                                        </ClubsList>
                                    </ClubsSection>
                                </EducationContent>
                            </GlassCard>
                            
                            {/* fitness + sports card */}
                            <GlassCard>
                                <ReactionBubble 
                                    emoji="🏋️" 
                                    side="left" 
                                    size={64}
                                    color="#0A84FF"
                                    top="-1.5rem"
                                    horizontalOffset="-0.5rem"
                                />
                                
                                <CardTitle>Always Active</CardTitle>
                                <CardTextLarge>
                                    Grew up playing basketball, football, baseball, and lacrosse. Rowed competitively in high school. Started lifting in college to manage stress and stay grounded. Now I rotate between the gym, skateboarding, and golf.
                                </CardTextLarge>
                                
                                <EmojiRow aria-hidden="true">
                                    <Emoji >🏀</Emoji>
                                    <Emoji >🏈</Emoji>
                                    <Emoji >⚾</Emoji>
                                    <Emoji >🥍</Emoji>
                                    <Emoji >🚣</Emoji>
                                    <Emoji >🏋️</Emoji>
                                    <Emoji >🛹</Emoji>
                                    <Emoji >⛳</Emoji>
                                </EmojiRow>
                            </GlassCard>
                            
                            {/* being creative card */}
                            <GlassCard>
                                <ReactionBubble 
                                    emoji="🎨" 
                                    side="left" 
                                    size={68}
                                    color="#0A84FF"
                                    top="-1.5rem"
                                    horizontalOffset="-0.5rem"
                                />
                                
                                <CardTitle>Being Creative</CardTitle>
                                <CardTextLarge>
                                  I grew up drawing. Lately I'm learning music, mostly guitar and piano, with production next. Design is my favorite part of projects, if you couldn't tell by the "unique" theming of this site. Art is as much a part of my life as staying active.
                                </CardTextLarge>
 
                                
                                <EmojiRow aria-hidden="true">
                                    <Emoji >🎨</Emoji>
                                    <Emoji >✏️</Emoji>
                                    <Emoji >🖌️</Emoji>
                                    <Emoji >🎵</Emoji>
                                    <Emoji >🎸</Emoji>
                                    <Emoji >🎹</Emoji>
                                    <Emoji >🎧</Emoji>
                                </EmojiRow>
                            </GlassCard>
                            
                            {/* my goals card */}
                            <GlassCard>
                                <ReactionBubble 
                                    emoji="🎯" 
                                    side="left" 
                                    size={64}
                                    color="#0A84FF"
                                    top="-1.5rem"
                                    horizontalOffset="-0.5rem"
                                />
                                
                                <CardTitle>Goals</CardTitle>
                                <GoalsList>
                                    <GoalItem>Protect time for music and visuals so work stays creative, not just technical</GoalItem>
                                    <GoalItem>Keep leveling up with better routines, balance, and intentional work choices</GoalItem>
                                    <GoalItem>Land a job at an earlier-stage company where I can make a meaningful impact with my skills</GoalItem>
                                    <GoalItem>Use my service background and love of talking with people to guide work that genuinely helps others</GoalItem>
                                </GoalsList>

                                
                                <EmojiRow aria-hidden="true">
                                    <Emoji >🎯</Emoji>
                                    <Emoji >🚀</Emoji>
                                    <Emoji >🔥</Emoji>
                                    <Emoji >🧠</Emoji>
                                    <Emoji >👥</Emoji>
                                    <Emoji >⚡</Emoji>
                                </EmojiRow>
                            </GlassCard>
                            
                            {/* my mantras card */}
                            <GlassCard>
                                <ReactionBubble 
                                    emoji="💭" 
                                    side="left" 
                                    size={64}
                                    color="#0A84FF"
                                    top="-1.5rem"
                                    horizontalOffset="-0.5rem"
                                />
                                
                                <CardTitle>My Mantras</CardTitle>
                                
                                <MantrasWrapper>
                                <MantraText>
                                    <MantraHighlight>Amor Fati</MantraHighlight>
                                    “Love of fate.” Trying to treat whatever happens as material to grow from, even when it is not exactly fun in the moment.
                                </MantraText>
                                <MantraText>
                                    <MantraHighlight>Nothing changes if nothing changes.</MantraHighlight>
                                    If I keep doing the same things, I will keep getting the same results. Simple, obvious, and weirdly easy to forget. Heard it on a Theo Von podcast btw.
                                </MantraText>
                                </MantrasWrapper>
                                
                                <EmojiRow aria-hidden="true">
                                    <Emoji >💭</Emoji>
                                    <Emoji >🧭</Emoji>
                                    <Emoji >🌱</Emoji>
                                    <Emoji >⚖️</Emoji>
                                    <Emoji >🔄</Emoji>
                                    <Emoji >💪</Emoji>
                                </EmojiRow>
                            </GlassCard>
                            
                            {/* what i listen to card */}
                            <GlassCard>
                                <ReactionBubble 
                                    emoji="🎧" 
                                    side="left" 
                                    size={64}
                                    color="#0A84FF"
                                    top="-1.5rem"
                                    horizontalOffset="-0.5rem"
                                />
                                
                                <CardTitle>What I Listen To</CardTitle>
                                
                                <MusicWrapper>
                                    <MusicIntroText>
                                        I feel you can tell a lot about a person by their music. Here's my top 10 from the last 6 months:
                                    </MusicIntroText>
                                    
                                    <ArtistGrid>
                                        <ArtistName>Frank Ocean</ArtistName>
                                        <ArtistName>The Backseat Lovers</ArtistName>
                                        <ArtistName>Malcom Todd</ArtistName>
                                        <ArtistName>Daniel Caesar</ArtistName>
                                        <ArtistName>Rex Orange County</ArtistName>
                                        <ArtistName>Bad Bunny</ArtistName>
                                        <ArtistName>Dom Dolla</ArtistName>
                                        <ArtistName>$uicideboy$</ArtistName>
                                        <ArtistName>Olivia Rodrigo</ArtistName>
                                        <ArtistName>Zach Bryan</ArtistName>
                                    </ArtistGrid>
                                </MusicWrapper>
                                
                                <EmojiRow aria-hidden="true">
                                    <Emoji >🎧</Emoji>
                                    <Emoji >🎵</Emoji>
                                    <Emoji >💿</Emoji>
                                    <Emoji >🎤</Emoji>
                                    <Emoji >🔊</Emoji>
                                    <Emoji>🎶</Emoji>
                                </EmojiRow>
                            </GlassCard>
                        </InfoGrid>
                    </InfoGridSection>
                </ProfileSection>
            </UnderwaterSection>
            
            {/* footer - ocean floor with underwater objects - natural content flow component */}
            <SandPlane>
                {/* top wave - adds ruggedness to the transition from ocean to sand */}
                <TopWave viewBox="0 0 1440 120" preserveAspectRatio="none">
                    <path d="M0,85 C120,65 240,95 360,75 C480,55 600,85 720,65 C840,45 960,75 1080,55 C1200,35 1320,65 1440,85 L1440,120 L0,120 Z" fill="url(#sandWaveGradient)" />
                    <defs>
                        <linearGradient id="sandWaveGradient" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#7b654d" />
                            <stop offset="50%" stopColor="#8a7157" />
                            <stop offset="100%" stopColor="#7b654d" />
                        </linearGradient>
                    </defs>
                </TopWave>
                
                {/* made with love - positioned within sand plane */}
                <MadeWithLoveContainer>
                    <MadeWithText>Made with</MadeWithText>
                    <HeartEmoji>❤️</HeartEmoji>
                    <MadeWithText>&</MadeWithText>
                    <CursorLogo src={cursorLogo} alt="Cursor" />
                    <MadeWithText>by me (CK)</MadeWithText>
                </MadeWithLoveContainer>

                {/* copyright - positioned within sand plane */}
                <CopyrightContainer>© 2025 Colin Kirby. All rights reserved.</CopyrightContainer>
                
                {/* simple mobile footer - because images were too annoying to deal with on mobile */}
                <MobileFooterContainer>
                    <MobileScrollButton onClick={scrollToTop}>
                        <MobileScrollIcon>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 15l-6-6-6 6" />
                            </svg>
                        </MobileScrollIcon>
                        <MobileScrollText>Back to Top</MobileScrollText>
                    </MobileScrollButton>
                    
                    <MobileContactRow>
                        <MobileContactItem>
                            <MobileContactIcon>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M3 6h18v12H3zM3 6l9 6 9-6" />
                                </svg>
                            </MobileContactIcon>
                            <MobileContactText href="mailto:kirbycolin26@gmail.com">kirbycolin26@gmail.com</MobileContactText>
                        </MobileContactItem>
                        
                        <MobileContactItem>
                            <MobileContactIcon>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M6.6 10.8c1.5 2.9 3.8 5.1 6.7 6.6l2.2-2.2c.3-.3.7-.4 1.1-.2a13 13 0 003.6.6c.6 0 1 .5 1 1V20a1 1 0 01-1 1c-9.4 0-17-7.6-17-17a1 1 0 011-1H7a1 1 0 011 1c0 1.2.2 2.4.6 3.6.1.3 0 .7-.3 1l-1.7 1.7z"/>
                                </svg>
                            </MobileContactIcon>
                            <MobileContactText href="tel:407-876-8172">407-876-8172</MobileContactText>
                        </MobileContactItem>
                    </MobileContactRow>
                </MobileFooterContainer>
                
                {/* sand text layer - for the text and icons on the sand plane */}
                <SandTextLayer>
                    <SandText
                        style={{ left: '50%', transform: 'translateX(-50%)', top: '65%', fontSize: '2.5rem', fontWeight: 700 }}
                        data-text="Contact Me!"
                        className="contact-text"
                    >
                        Contact Me!
                    </SandText>

                    <SandText
                        style={{ left: '50%', transform: 'translateX(-50%)', top: '42.5%', fontSize: '1.8rem', fontWeight: 600 }}
                        data-text="To The Moon!"
                        className="moon-text"
                    >
                        To The Moon!
                    </SandText>

                    <SandIconWrap style={{ left: '37.5%', top: '57.5%' }}>
                        <SandIcon width="45" height="45" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M3 6h18v12H3zM3 6l9 6 9-6" />
                        </SandIcon>
                    </SandIconWrap>

                    <SandIconWrap style={{ left: '62.5%', top: '57.5%' }}>
                        <SandIcon width="45" height="45" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M6.6 10.8c1.5 2.9 3.8 5.1 6.7 6.6l2.2-2.2c.3-.3.7-.4 1.1-.2a13 13 0 003.6.6c.6 0 1 .5 1 1V20a1 1 0 01-1 1c-9.4 0-17-7.6-17-17a1 1 0 011-1H7a1 1 0 011 1c0 1.2.2 2.4.6 3.6.1.3 0 .7-.3 1l-1.7 1.7z"/>
                        </SandIcon>
                    </SandIconWrap>
                </SandTextLayer>

                {/* rock with seaweed - left of center */}
                <UnderwaterObject style={{ bottom: '57%', left: '1%' }}>
                    <img 
                        src={rockwithseaweed} 
                        alt="Rock with Seaweed" 
                        loading="lazy"
                        decoding="async"
                        sizes="(max-width: 768px) 0px, clamp(180px, 12vw, 360px)"
                    />
                </UnderwaterObject>

                {/* tall rock - left of center */}
                <UnderwaterObject style={{ bottom: '43%', left: '5%' }}>
                    <img 
                        src={tallrock} 
                        alt="Tall Rock" 
                        loading="lazy"
                        decoding="async"
                        sizes="(max-width: 768px) 0px, clamp(180px, 12vw, 360px)"
                    />
                </UnderwaterObject>

                {/* rockpile - left of center */}
                <UnderwaterObject style={{ bottom: '29%', left: '-8%' }}>
                    <img 
                        className="rockpile-image" 
                        style={{ transform: 'scaleX(-1)' }} 
                        src={rockpileImage} 
                        alt="Rockpile" 
                        loading="lazy"
                        decoding="async"
                        sizes="(max-width: 768px) 0px, clamp(280px, 18vw, 360px)"
                    />
                </UnderwaterObject>
                
                {/* seaweed - left of center */}
                <UnderwaterObject style={{ bottom: '25%', left: '-2%' }}>
                    <img 
                        src={seaweed} 
                        alt="Seaweed" 
                        loading="lazy"
                        decoding="async"
                        sizes="(max-width: 768px) 0px, clamp(180px, 12vw, 360px)"
                    />
                </UnderwaterObject>

                {/* seaweed 2 - left of center */}
                <UnderwaterObject style={{ bottom: '31%', left: '3%' }}>
                    <img 
                        src={seaweed2} 
                        alt="Seaweed" 
                        loading="lazy"
                        decoding="async"
                        sizes="(max-width: 768px) 0px, clamp(180px, 12vw, 360px)"
                    />
                </UnderwaterObject>

                {/* seaweed 3 - left of center */}
                <UnderwaterObject style={{ bottom: '34%', left: '7%' }}>
                    <img 
                        src={seaweed3} 
                        alt="Seaweed" 
                        loading="lazy"
                        decoding="async"
                        sizes="(max-width: 768px) 0px, clamp(180px, 12vw, 360px)"
                    />
                </UnderwaterObject>

                {/* yellow coral - left of center */}
                <UnderwaterObject style={{ bottom: '42%', left: '16%' }}>
                    <img 
                        src={yellowcoral} 
                        alt="Yellow Coral" 
                        loading="lazy"
                        decoding="async"
                        sizes="(max-width: 768px) 0px, clamp(180px, 12vw, 360px)"
                    />
                </UnderwaterObject>

                {/* pink coral - left of center */}
                <UnderwaterObject style={{ bottom: '30%', left: '12%' }}>
                    <img 
                        src={pinkcoral} 
                        alt="Pink Coral" 
                        loading="lazy"
                        decoding="async"
                        sizes="(max-width: 768px) 0px, clamp(180px, 12vw, 360px)"
                    />
                </UnderwaterObject>

                {/* purple coral - left of center */}
                <UnderwaterObject style={{ bottom: '33%', left: '20%' }}>
                    <img 
                        src={purplecoral} 
                        alt="Purple Coral" 
                        loading="lazy"
                        decoding="async"
                        sizes="(max-width: 768px) 0px, clamp(180px, 12vw, 360px)"
                    />
                </UnderwaterObject>

                {/* orange coral - left of center */}
                <UnderwaterObject style={{ bottom: '19%', left: '14%' }}>
                    <img 
                        src={orangecoral} 
                        alt="Orange Coral" 
                        loading="lazy"
                        decoding="async"
                        sizes="(max-width: 768px) 0px, clamp(180px, 12vw, 360px)"
                    />
                </UnderwaterObject>
                
                {/* blue coral - left of center */}
                <UnderwaterObject style={{ bottom: '13%', left: '17%' }}>
                    <img 
                        src={bluecoral} 
                        alt="Blue Coral" 
                        loading="lazy"
                        decoding="async"
                        sizes="(max-width: 768px) 0px, clamp(180px, 12vw, 360px)"
                    />
                </UnderwaterObject>

                {/* message in bottle - centered at 37.5% */}
                <UnderwaterObject className="keep-on-mobile message-bottle" style={{ bottom: '35%', left: '37.5%', transform: 'translateX(-50%)'}}>
                    <MessageInBottle />
                </UnderwaterObject>
                
                {/* rocket - centered at 49.75% */}
                <RocketContainer className="keep-on-mobile rocket-mobile" style={{ bottom: '45%', left: '49.75%', transform: 'translateX(-50%)'}} onClick={scrollToTop}>
                    <img 
                        src={rocket} 
                        alt="Rocket - Back to top" 
                        loading="lazy"
                        decoding="async"
                        sizes="(max-width: 768px) 0px, 250px"
                    />
                </RocketContainer>
                
                {/* interactive shell phone with phone tooltip - right of center (centered at 65%) */}
                <UnderwaterObject className="keep-on-mobile shell-phone" style={{ bottom: '35%', left: '62.5%', transform: 'translateX(-50%)'}}>
                    <ShellPhone />
                </UnderwaterObject>

                {/* blue coral - right of center */}
                <UnderwaterObject style={{ bottom: '42%', right: '16%' }}>
                    <img 
                        src={bluecoral} 
                        alt="Blue Coral" 
                        loading="lazy"
                        decoding="async"
                        sizes="(max-width: 768px) 0px, clamp(180px, 12vw, 360px)"
                    />
                </UnderwaterObject>

                {/* yellow coral - right of center */}
                <UnderwaterObject style={{ bottom: '30%', right: '12%' }}>
                    <img 
                        src={yellowcoral} 
                        alt="Yellow Coral" 
                        loading="lazy"
                        decoding="async"
                        sizes="(max-width: 768px) 0px, clamp(180px, 12vw, 360px)"
                    />
                </UnderwaterObject>

                {/* orange coral - right of center */}
                <UnderwaterObject style={{ bottom: '33%', right: '20%' }}>
                    <img 
                        src={orangecoral} 
                        alt="Orange Coral" 
                        loading="lazy"
                        decoding="async"
                        sizes="(max-width: 768px) 0px, clamp(180px, 12vw, 360px)"
                    />
                </UnderwaterObject>

                {/* purple coral - right of center */}
                <UnderwaterObject style={{ bottom: '19%', right: '14%' }}>
                    <img 
                        src={purplecoral} 
                        alt="Purple Coral" 
                        loading="lazy"
                        decoding="async"
                        sizes="(max-width: 768px) 0px, clamp(180px, 12vw, 360px)"
                    />
                </UnderwaterObject>
                
                {/* pink coral - right of center */}
                <UnderwaterObject style={{ bottom: '13%', right: '17%' }}>
                    <img 
                        src={pinkcoral} 
                        alt="Pink Coral" 
                        loading="lazy"
                        decoding="async"
                        sizes="(max-width: 768px) 0px, clamp(180px, 12vw, 360px)"
                    />
                </UnderwaterObject>

                {/* rock with seaweed - right of center */}
                <UnderwaterObject style={{ bottom: '57%', right: '1%' }}>
                    <img 
                        src={rockwithseaweed} 
                        alt="Rock with Seaweed" 
                        loading="lazy"
                        decoding="async"
                        sizes="(max-width: 768px) 0px, clamp(180px, 12vw, 360px)"
                    />
                </UnderwaterObject>

                {/* flat rock - right of center */}
                <UnderwaterObject style={{ bottom: '44%', right: '5%' }}>
                    <img 
                        src={flatrock} 
                        alt="Flat Rock" 
                        loading="lazy"
                        decoding="async"
                        sizes="(max-width: 768px) 0px, clamp(180px, 12vw, 360px)"
                    />
                </UnderwaterObject>

                {/* rockpile - right of center */}
                <UnderwaterObject style={{ bottom: '29%', right: '-8%' }}>
                    <img 
                        className="rockpile-image" 
                        src={rockpileImage} 
                        alt="Rockpile" 
                        loading="lazy"
                        decoding="async"
                        sizes="(max-width: 768px) 0px, clamp(280px, 18vw, 360px)"
                    />
                </UnderwaterObject>

                {/* seaweed - right of center */}
                <UnderwaterObject style={{ bottom: '25%', right: '-2%' }}>
                    <img 
                        src={seaweed} 
                        alt="Seaweed" 
                        loading="lazy"
                        decoding="async"
                        sizes="(max-width: 768px) 0px, clamp(180px, 12vw, 360px)"
                    />
                </UnderwaterObject>

                {/* seaweed 2 - right of center */}
                <UnderwaterObject style={{ bottom: '31%', right: '3%' }}>
                    <img 
                        src={seaweed2} 
                        alt="Seaweed" 
                        loading="lazy"
                        decoding="async"
                        sizes="(max-width: 768px) 0px, clamp(180px, 12vw, 360px)"
                    />
                </UnderwaterObject>
                
                {/* seaweed 3 - right of center */}
                <UnderwaterObject style={{ bottom: '34%', right: '7%' }}>
                    <img 
                        style={{ transform: 'scaleX(-1)' }} 
                        src={seaweed3} 
                        alt="Seaweed" 
                        loading="lazy"
                        decoding="async"
                        sizes="(max-width: 768px) 0px, clamp(180px, 12vw, 360px)"
                    />
                </UnderwaterObject>
            </SandPlane>
        </BackgroundContainer>
    );
};

export default Background;

/* ============ animated keyframes ============ */

// water animation keyframes
const waterFlow = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(20px); }
`;

// wave scroll keyframes
const waveScroll = keyframes`
  0%   { background-position: 0 0, 0 0; }
  100% { background-position: -140px 0, -80px 0; }
`;

// float particles keyframes
const floatParticles = keyframes`
  0%, 100% { opacity: 0.5; transform: translateY(0) translateZ(0); }
  50% { opacity: 0.8; transform: translateY(-8px) translateZ(0); }
`;

// float bubble animation - smooth rising motion, GPU accelerated
const floatBubble = keyframes`
  0%, 100% { 
    transform: translateY(0px) translateX(0px) scale(1) translateZ(0);
  }
  33% { 
    transform: translateY(-10px) translateX(3px) scale(1.01) translateZ(0);
  }
  66% { 
    transform: translateY(-12px) translateX(-2px) scale(1.02) translateZ(0);
  }
`;

/* ================= styled ================= */

// background container
const BackgroundContainer = styled.section`
    /* layout */
    position: relative;
    
    /* spacing */
    width: 100%;
    height: auto;
    
    /* styles */
    border: 2px solid rgba(255, 255, 255, 0.3);
    --surface-h: 5vh;
    --section-pad: clamp(24px, 4vw, 56px);
    --sand-base: #b39873;
    --sand-dark: #6e5843;
    --sand-light: #efe2cc;
`;

/* ================= surface water ================== */

// surface water - connects to ocean wall in skills section (same animation as harbor water)
const SurfaceWater = styled.div`
    /* layout */
	z-index: 2;
    overflow: hidden;
	position: absolute;
    inset: 0 auto auto 0;
    
    /* spacing */
    width: 100%;
    height: var(--surface-h);
    
    /* styles */
    transform-origin: top center;
    transform: perspective(90px) rotateX(12deg) translateZ(0);
    background: linear-gradient(to bottom,
        rgba(35, 95, 145, 0.75) 0%,
        rgba(45, 115, 160, 0.85) 25%,
        rgba(55, 135, 175, 0.92) 50%,
        rgba(68, 155, 188, 0.96) 75%,
        rgba(78, 170, 198, 0.98) 90%,
        rgba(85, 185, 205, 1) 100%
    );
    
    /* pseudo-elements */
    &::before {
        /* layout */
        inset: 0;
        position: absolute;
        
        /* styles */
        content: '';
        pointer-events: none;
        background: linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 0%, transparent 40%);
    }
    
    &::after {
        /* layout */
        inset: 0;
        position: absolute;
        
        /* styles */
        content: '';
        opacity: 0.35;
        mix-blend-mode: screen;
        background:
            repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.08) 0 3px, transparent 3px 42px),
            repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.05) 0 2px, transparent 2px 66px);
        ${props => props.$isInViewport 
            ? css`animation: ${waveScroll} ${props.$isSlowDevice ? '18s' : '12s'} linear infinite;`
            : css`animation: none;`}
        animation-play-state: ${props => props.$isInViewport ? 'running' : 'paused'};
        will-change: ${props => props.$isInViewport ? 'background-position' : 'auto'};
    }
`;

// ripple layer for surface water (same as harbor water)
const SurfaceRippleLayer = styled.div`
    /* layout */
    inset: 0;
    position: absolute;
    pointer-events: none;
    
    /* styles */
    mix-blend-mode: screen;
    mask-image: linear-gradient(to bottom, black 40%, transparent 95%);
    background:
        radial-gradient(40px 20px at 20% 35%, rgba(255, 255, 255, 0.18) 0, rgba(255, 255, 255, 0.08) 45%, transparent 70%),
        radial-gradient(55px 25px at 48% 60%, rgba(255, 255, 255, 0.14) 0, rgba(255, 255, 255, 0.07) 40%, transparent 70%),
        radial-gradient(34px 18px at 70% 45%, rgba(255, 255, 255, 0.12) 0, rgba(255, 255, 255, 0.06) 30%, transparent 70%),
        radial-gradient(45px 22px at 15% 75%, rgba(255, 255, 255, 0.16) 0, rgba(255, 255, 255, 0.07) 35%, transparent 70%),
        radial-gradient(38px 19px at 85% 65%, rgba(255, 255, 255, 0.13) 0, rgba(255, 255, 255, 0.06) 40%, transparent 70%);
`;

/* ================= underwater section ================== */

// unified underwater section - spans from waterline to deep ocean with continuous gradient
const UnderwaterSection = styled.div`
    /* layout */
    display: flex;
    position: relative;
    overflow: visible;
    overflow-x: visible;
    overflow-y: visible;
    flex-direction: column;
    align-items: center;
    z-index: 1;
    
    /* spacing */
    width: 100%;
    min-height: auto;
    margin-top: var(--surface-h);
    padding: 2rem 2rem 6rem 2rem;
    
    /* styles */
    box-shadow: 
        inset 0 8px 16px rgba(100, 180, 200, 0.15),
        inset 0 -4px 12px rgba(0, 40, 80, 0.2);
    background: linear-gradient(to bottom,
        rgba(85, 185, 205, 1) 0%,
        rgba(72, 170, 192, 1) 8%,
        rgba(60, 154, 180, 1) 15%,
        rgba(49, 138, 168, 1) 22%,
        rgba(40, 122, 156, 1) 30%,
        rgba(32, 106, 144, 1) 38%,
        rgba(23, 82, 126, 1) 48%,
        rgba(18, 66, 114, 1) 58%,
        rgba(14, 50, 102, 1) 68%,
        rgba(10, 36, 84, 1) 78%,
        rgba(8, 30, 72, 1) 90%,
        rgba(6, 24, 56, 1) 100%
    );
    
    /* pseudo-elements */
    &::before {
        /* layout */
        inset: 0;
        position: absolute;
        
        /* styles */
        content: '';
        background: 
            linear-gradient(to bottom, 
                rgba(150, 220, 240, 0.15) 0%, 
                rgba(120, 200, 220, 0.10) 10%,
                rgba(100, 180, 200, 0.06) 20%,
                rgba(80, 160, 180, 0.04) 35%,
                rgba(60, 140, 160, 0.02) 50%,
                transparent 70%
            ),
            repeating-linear-gradient(
                90deg,
                transparent 0%,
                rgba(255, 255, 255, 0.02) 10%,
                transparent 20%
            );
        ${props => props.$isInViewport 
            ? css`animation: ${waterFlow} ${props.$isSlowDevice ? '22s' : '15s'} linear infinite reverse;`
            : css`animation: none;`}
        animation-play-state: ${props => props.$isInViewport ? 'running' : 'paused'};
    }
    
    &::after {
        /* layout */
        inset: 0;
        position: absolute;
        
        /* styles */
        content: '';
        transform: translateZ(0);
        background-image:
            radial-gradient(circle at 12% 8%, rgba(255,255,255,0.2) 0%, transparent 2px),
            radial-gradient(circle at 38% 15%, rgba(255,255,255,0.15) 0%, transparent 2.5px),
            radial-gradient(circle at 65% 12%, rgba(255,255,255,0.18) 0%, transparent 2px),
            radial-gradient(circle at 85% 20%, rgba(255,255,255,0.12) 0%, transparent 1.5px),
            radial-gradient(circle at 55% 35%, rgba(255,255,255,0.14) 0%, transparent 1.8px),
            radial-gradient(circle at 78% 40%, rgba(255,255,255,0.13) 0%, transparent 2.2px),
            radial-gradient(circle at 30% 65%, rgba(255,255,255,0.10) 0%, transparent 2.5px),
            radial-gradient(circle at 75% 85%, rgba(255,255,255,0.06) 0%, transparent 1.5px);
        ${props => props.$isInViewport 
            ? css`animation: ${floatParticles} ${props.$isSlowDevice ? '22s' : '15s'} ease-in-out infinite;`
            : css`animation: none;`}
        animation-play-state: ${props => props.$isInViewport ? 'running' : 'paused'};
        will-change: ${props => props.$isInViewport ? 'transform, opacity' : 'auto'};
    }
    
    /* nested selectors */
    [data-loading="true"] &::after {
        animation-play-state: paused;
    }
    
    /* media queries */
    @media (max-width: 768px) {
        margin-top: var(--surface-h);
        padding: 1.5rem 1rem 3rem 1rem;
    }
`;

// underwater header section.
const UnderwaterHeader = styled.div`
    /* layout */
    position: relative;
    text-align: center;
    z-index: 10;
    flex-shrink: 0;
    
    /* spacing */
    width: 100%;
    margin-top: 3rem;
    
    /* styles */
    filter: drop-shadow(0 4px 12px rgba(120, 200, 220, 0.3));
    
    /* media queries */
    @media (max-width: 768px) {
        margin-top: 1.5rem;
    }
`;

const HeaderTitle = styled.h1`
    /* layout */
    margin: 0;
    
    /* spacing */
    font-size: clamp(2.5rem, 5vw, 5rem);
    
    /* styles */
    font-weight: 900;
    background: linear-gradient(135deg, 
        rgba(150, 220, 240, 1) 0%,
        rgba(100, 200, 230, 1) 30%,
        rgba(120, 210, 235, 1) 60%,
        rgba(160, 230, 245, 1) 100%
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 
        0 0 20px rgba(120, 200, 220, 0.6),
        0 0 40px rgba(100, 180, 210, 0.4),
        0 4px 8px rgba(0, 60, 100, 0.3);
    transform: translateZ(0);
    ${props => props.$isInViewport 
        ? css`animation: floatTitle ${props.$isSlowDevice ? '6s' : '4s'} ease-in-out infinite;`
        : css`animation: none;`}
    animation-play-state: ${props => props.$isInViewport ? 'running' : 'paused'};
    will-change: ${props => props.$isInViewport ? 'transform' : 'auto'};
    
    /* keyframes */
    @keyframes floatTitle {
        0%, 100% { transform: translateY(0px) translateZ(0); }
        50% { transform: translateY(-8px) translateZ(0); }
    }
    
    /* nested selectors */
    [data-loading="true"] & {
        animation-play-state: paused;
    }
    
    /* media queries */
    @media (max-width: 1800px) {
        font-size: clamp(2.2rem, 4.5vw, 4.2rem);
    }
    
    @media (max-width: 1600px) {
        font-size: clamp(2rem, 4vw, 3.5rem);
    }
    
    @media (max-width: 1200px) {
        font-size: clamp(1.8rem, 3.5vw, 2.8rem);
    }
    
    @media (max-width: 768px) {
        margin-bottom: 0.5rem;
        font-size: clamp(2rem, 8vw, 2.5rem);
    }
`;

const HeaderSubtitle = styled.h2`
    /* layout */
    margin: 0;
    
    /* spacing */
    font-size: clamp(1.1rem, 2vw, 1.8rem);
    
    /* styles */
    font-weight: 400;
    font-style: italic;
    color: rgba(180, 230, 245, 0.9);
    text-shadow: 
        0 2px 8px rgba(120, 200, 220, 0.5),
        0 4px 16px rgba(80, 160, 190, 0.3);
    animation-delay: 0.5s;
    transform: translateZ(0);
    ${props => props.$isInViewport 
        ? css`animation: floatSubtitle ${props.$isSlowDevice ? '6s' : '4s'} ease-in-out infinite;`
        : css`animation: none;`}
    animation-play-state: ${props => props.$isInViewport ? 'running' : 'paused'};
    will-change: ${props => props.$isInViewport ? 'transform, opacity' : 'auto'};
    
    /* keyframes */
    @keyframes floatSubtitle {
        0%, 100% { transform: translateY(0px) translateZ(0); opacity: 0.9; }
        50% { transform: translateY(-6px) translateZ(0); opacity: 1; }
    }
    
    /* nested selectors */
    [data-loading="true"] & {
        animation-play-state: paused;
    }
    
    /* media queries */
    @media (max-width: 1600px) {
        font-size: clamp(1rem, 1.8vw, 1.3rem);
    }
    
    @media (max-width: 768px) {
        margin-top: 0.25rem;
        font-size: clamp(0.9rem, 3vw, 1.1rem);
    }
`;

/* ================= profile section - left side of grid ================== */

const ProfileSection = styled.div`
    /* layout */
    display: flex;
    align-items: flex-start;
    z-index: 10;
    
    /* spacing */
    width: clamp(85%, 90vw, 90%);
    gap: clamp(1rem, 2vw, 2rem);
    margin: clamp(1.5rem, 2vw, 2rem) auto 0;
    
    /* media queries */
    @media (max-width: 1800px) {
        width: clamp(88%, 92vw, 92%);
    }
    
    @media (max-width: 1600px) {
        width: clamp(90%, 94vw, 94%);
        gap: clamp(0.8rem, 1.5vw, 1.5rem);
    }
    
    @media (max-width: 1400px) {
        width: 92%;
        gap: clamp(0.75rem, 1.2vw, 1.2rem);
    }
    
    @media (max-width: 1200px) {
        width: 95%;
        flex-direction: column;
        align-items: center;
        margin-top: clamp(1.5rem, 2vw, 2rem);
    }
    
    @media (max-width: 900px) {
        width: 98%;
    }
    
    @media (max-width: 768px) {
        width: 100%;
        margin-top: 1rem;
        gap: 1rem;
        padding: 0 0.5rem;
    }
`;

const ImageSection = styled.div`
    /* layout */
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    
    /* spacing */
    flex: 1;
    gap: 0;
    padding: 1rem;
    min-width: 0;
    
    /* media queries */
    @media (max-width: 1200px) {
        width: 100%;
        flex: 0 0 auto;
        max-width: 400px;
    }
    
    @media (max-width: 768px) {
        max-width: 100%;
        padding: 0.5rem;
    }
`;

/* ========= profile image ========== */

const ProfileImageFrame = styled.div`
    /* layout */
    position: relative;
    flex-shrink: 0;
    
    /* spacing */
    width: 90%;
    max-width: 450px;
    aspect-ratio: 1;
    padding: 8px;
    
    /* styles */
    border-radius: 50%;
    backdrop-filter: blur(10px);
    background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.2) 0%,
        rgba(255, 255, 255, 0.05) 50%,
        rgba(100, 180, 200, 0.15) 100%
    );
    box-shadow: 
        0 8px 32px rgba(31, 38, 135, 0.37),
        inset 0 2px 8px rgba(255, 255, 255, 0.15),
        0 0 40px rgba(100, 200, 220, 0.2);
    animation: ${floatBubble} 6s ease-in-out infinite;
    
    /* pseudo-elements */
    &::before {
        /* layout */
        inset: -4px;
        position: absolute;
        z-index: -1;
        
        /* styles */
        content: '';
        opacity: 0.6;
        border-radius: 50%;
        filter: blur(12px);
        background: linear-gradient(
            135deg,
            rgba(150, 220, 240, 0.3) 0%,
            rgba(100, 200, 230, 0.2) 50%,
            rgba(80, 180, 210, 0.3) 100%
        );
    }
    
    /* media queries */
    @media (max-width: 1200px) {
        width: 80%;
        max-width: 280px;
    }
    
    @media (max-width: 600px) {
        width: 65%;
        max-width: 250px;
    }
    
    @media (max-width: 768px) {
        width: 70%;
        max-width: 220px;
        padding: 6px;
    }
`;

const ProfileImage = styled.img`
    /* layout */
    display: block;
    
    /* spacing */
    width: 100%;
    height: 100%;
    
    /* styles */
    border-radius: 50%;
    object-fit: cover;
`;

/* ========= social bubbles ========== */

const SocialBubblesContainer = styled.div`
    /* layout */
    position: relative;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    
    /* spacing */
    width: 100%;
    flex: 1;
    min-height: 350px;
    margin-top: 1rem;
    padding-bottom: 2rem;
    
    /* media queries */
    @media (max-width: 1200px) {
        min-height: 300px;
        margin-top: 1.5rem;
    }
    
    @media (max-width: 600px) {
        min-height: 280px;
        margin-top: 1rem;
    }
    
    @media (max-width: 768px) {
        min-height: 200px;
        margin-top: 0.75rem;
        padding-bottom: 1rem;
    }
`;

// social bubble - glossy underwater bubble effect
const SocialBubble = styled.a`
    /* layout */
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    text-decoration: none;
    
    /* spacing */
    width: 70px;
    height: 70px;
    
    /* styles */
    border-radius: 50%;
    color: rgba(220, 240, 255, 0.95);
    backdrop-filter: blur(12px);
    background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.25) 0%,
        rgba(255, 255, 255, 0.12) 50%,
        rgba(150, 220, 240, 0.18) 100%
    );
    box-shadow: 
        inset -4px -4px 12px rgba(255, 255, 255, 0.4),
        inset 4px 4px 12px rgba(100, 180, 200, 0.2),
        0 8px 32px rgba(100, 200, 220, 0.3),
        0 4px 16px rgba(31, 38, 135, 0.4);
    transform: translateZ(0);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s ease, box-shadow 0.3s ease;
    will-change: ${props => props.$isInViewport ? 'transform' : 'auto'};
    
    /* pseudo-elements */
    &::before {
        /* layout */
        top: 8%;
        left: 15%;
        position: absolute;
        
        /* spacing */
        width: 45%;
        height: 45%;
        
        /* styles */
        content: '';
        pointer-events: none;
        border-radius: 50%;
        filter: blur(3px);
        background: radial-gradient(
            circle at 30% 30%,
            rgba(255, 255, 255, 0.6) 0%,
            rgba(255, 255, 255, 0.3) 40%,
            transparent 70%
        );
    }
    
    &::after {
        /* layout */
        bottom: 12%;
        left: 20%;
        position: absolute;
        
        /* spacing */
        width: 60%;
        height: 30%;
        
        /* styles */
        content: '';
        pointer-events: none;
        border-radius: 50%;
        filter: blur(4px);
        background: radial-gradient(
            ellipse at center,
            rgba(0, 40, 80, 0.2) 0%,
            transparent 70%
        );
    }
    
    /* nested selectors */
    &:nth-child(1) {
        left: 45%;
        bottom: 5%;
        width: 70px;
        height: 70px;
        ${props => props.$isInViewport 
            ? css`animation: ${floatBubble} ${props.$isSlowDevice ? '10s' : '7s'} ease-in-out infinite;`
            : css`animation: none;`}
        animation-delay: ${props => props.$delay}s;
        animation-play-state: ${props => props.$isInViewport ? 'running' : 'paused'};
    }
    
    &:nth-child(2) {
        left: 55%;
        bottom: 28%;
        width: 80px;
        height: 80px;
        ${props => props.$isInViewport 
            ? css`animation: ${floatBubble} ${props.$isSlowDevice ? '11s' : '7.5s'} ease-in-out infinite;`
            : css`animation: none;`}
        animation-delay: ${props => props.$delay}s;
        animation-play-state: ${props => props.$isInViewport ? 'running' : 'paused'};
    }
    
    &:nth-child(3) {
        left: 40%;
        bottom: 52%;
        width: 88px;
        height: 88px;
        ${props => props.$isInViewport 
            ? css`animation: ${floatBubble} ${props.$isSlowDevice ? '10.5s' : '7.2s'} ease-in-out infinite;`
            : css`animation: none;`}
        animation-delay: ${props => props.$delay}s;
        animation-play-state: ${props => props.$isInViewport ? 'running' : 'paused'};
    }
    
    &:nth-child(4) {
        left: 48%;
        bottom: 78%;
        width: 96px;
        height: 96px;
        ${props => props.$isInViewport 
            ? css`animation: ${floatBubble} ${props.$isSlowDevice ? '12s' : '8s'} ease-in-out infinite;`
            : css`animation: none;`}
        animation-delay: ${props => props.$delay}s;
        animation-play-state: ${props => props.$isInViewport ? 'running' : 'paused'};
    }
    
    [data-loading="true"] & {
        animation-play-state: paused;
    }
    
    /* hover effects */
    &:hover {
        color: rgba(255, 255, 255, 1);
        border-color: rgba(255, 255, 255, 0.5);
        transform: translateY(-10px) scale(1.15) translateZ(0);
        background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.35) 0%,
            rgba(255, 255, 255, 0.2) 50%,
            rgba(150, 220, 240, 0.28) 100%
        );
        box-shadow: 
            inset -4px -4px 16px rgba(255, 255, 255, 0.5),
            inset 4px 4px 16px rgba(100, 180, 200, 0.3),
            0 12px 48px rgba(120, 220, 240, 0.5),
            0 6px 24px rgba(31, 38, 135, 0.5);
    }
    
    /* nested selectors */
    svg {
        position: relative;
        z-index: 1;
        filter: drop-shadow(0 2px 4px rgba(0, 40, 80, 0.3));
        transition: transform 0.3s ease;
    }
    
    &:nth-child(1) svg {
        width: 26px;
        height: 26px;
    }
    
    &:nth-child(2) svg {
        width: 28px;
        height: 28px;
    }
    
    &:nth-child(3) svg {
        width: 30px;
        height: 30px;
    }
    
    &:nth-child(4) svg {
        width: 32px;
        height: 32px;
    }
    
    &:hover svg {
        transform: scale(1.1);
    }
    
    /* media queries */
    @media (max-width: 1200px) {
        &:nth-child(1) {
            width: 60px;
            height: 60px;
        }
        
        &:nth-child(2) {
            width: 68px;
            height: 68px;
        }
        
        &:nth-child(3) {
            width: 76px;
            height: 76px;
        }
        
        &:nth-child(4) {
            width: 84px;
            height: 84px;
        }
        
        svg {
            width: 22px;
            height: 22px;
        }
    }
    
    @media (max-width: 600px) {
        &:nth-child(1) {
            width: 52px;
            height: 52px;
        }
        
        &:nth-child(2) {
            width: 60px;
            height: 60px;
        }
        
        &:nth-child(3) {
            width: 66px;
            height: 66px;
        }
        
        &:nth-child(4) {
            width: 72px;
            height: 72px;
        }
        
        svg {
            width: 20px;
            height: 20px;
        }
    }
    
    @media (max-width: 768px) {
        &:nth-child(1) {
            left: 45%;
            bottom: 8%;
            width: 48px;
            height: 48px;
        }
        
        &:nth-child(2) {
            left: 55%;
            bottom: 30%;
            width: 54px;
            height: 54px;
        }
        
        &:nth-child(3) {
            left: 40%;
            bottom: 54%;
            width: 60px;
            height: 60px;
        }
        
        &:nth-child(4) {
            left: 48%;
            bottom: 80%;
            width: 66px;
            height: 66px;
        }
        
        svg {
            width: 18px;
            height: 18px;
        }
    }
`;

/* ================= info grid section - right side of grid ================== */

const InfoGridSection = styled.div`
    /* spacing */
    flex: 3;
    min-width: 0;
    padding-bottom: var(--section-pad);
    
    /* media queries */
    @media (max-width: 1200px) {
        width: 100%;
        flex: 0 0 auto;
    }
    
    @media (max-width: 768px) {
        padding-bottom: 1rem;
    }
`;

// 3x2 grid of cards
const InfoGrid = styled.div`
    /* layout */
    display: grid;
    align-items: stretch;
    
    /* spacing */
    gap: clamp(1rem, 1.5vw, 1.5rem);
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-auto-rows: minmax(300px, auto);
    
    /* media queries */
    @media (max-width: 1800px) {
        gap: clamp(0.9rem, 1.3vw, 1.25rem);
        grid-auto-rows: minmax(280px, auto);
    }
    
    @media (max-width: 1600px) {
        gap: clamp(0.7rem, 1vw, 0.95rem);
        grid-auto-rows: minmax(240px, auto);
    }
    
    @media (max-width: 1400px) {
        gap: clamp(0.65rem, 0.9vw, 0.85rem);
        grid-auto-rows: minmax(220px, auto);
    }
    
    @media (max-width: 1100px) {
        gap: clamp(1rem, 1.5vw, 1.5rem);
        grid-template-columns: repeat(2, minmax(0, 1fr));
        grid-auto-rows: minmax(280px, auto);
    }
    
    @media (max-width: 900px) {
        grid-auto-rows: minmax(260px, auto);
    }
    
    @media (max-width: 600px) {
        gap: 1.5rem;
        grid-template-columns: 1fr;
        grid-auto-rows: minmax(240px, auto);
    }
    
    @media (max-width: 768px) {
        gap: 1.25rem;
        grid-auto-rows: minmax(220px, auto);
    }
`;

// individual glassmorphism card
const GlassCard = styled.article`
    /* layout */
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: visible;
    align-self: stretch;
    
    /* spacing */
    min-width: 0;
    min-height: 100%;
    padding: clamp(0.9rem, 1.2vw, 1.25rem);
    border-radius: clamp(16px, 2vw, 20px);
    
    /* styles */
    border: 1px solid rgba(255, 255, 255, 0.18);
    backdrop-filter: blur(10px);
    background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.1) 0%,
        rgba(255, 255, 255, 0.05) 100%
    );
    box-shadow: 
        0 8px 32px rgba(31, 38, 135, 0.37),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
    transform: translateZ(0);
    transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
    
    /* hover effects */
    &:hover {
        transform: translateY(-5px) translateZ(0);
        background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.15) 0%,
            rgba(255, 255, 255, 0.08) 100%
        );
        box-shadow: 
            0 12px 40px rgba(31, 38, 135, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.3),
            0 0 30px rgba(100, 200, 220, 0.3);
    }
    
    /* media queries */
    @media (max-width: 1600px) {
        padding: clamp(0.65rem, 0.85vw, 0.85rem);
        border-radius: clamp(14px, 1.8vw, 18px);
    }
    
    @media (max-width: 1200px) {
        padding: clamp(0.6rem, 0.8vw, 0.75rem);
        border-radius: clamp(12px, 1.6vw, 16px);
    }
    
    @media (max-width: 768px) {
        padding: 0.9rem;
        border-radius: 14px;
    }
`;

// card title
const CardTitle = styled.h3`
    /* layout */
    margin: 0 0 clamp(0.3rem, 0.5vw, 0.5rem) 0;
    text-align: center;
    word-wrap: break-word;
    overflow-wrap: break-word;
    
    /* spacing */
    font-size: clamp(1.2rem, 1.8vw, 1.75rem);
    
    /* styles */
    font-weight: 700;
    background: linear-gradient(135deg, 
        rgba(200, 230, 245, 1) 0%,
        rgba(150, 210, 230, 1) 100%
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 2px 8px rgba(120, 200, 220, 0.3);
    
    /* media queries */
    @media (max-width: 1600px) {
        font-size: clamp(0.95rem, 1.3vw, 1.2rem);
        margin: 0 0 clamp(0.25rem, 0.4vw, 0.4rem) 0;
    }
    
    @media (max-width: 1200px) {
        font-size: clamp(0.9rem, 1.2vw, 1.1rem);
        margin: 0 0 clamp(0.2rem, 0.35vw, 0.35rem) 0;
    }
    
    @media (max-width: 768px) {
        margin-bottom: 0.4rem;
        font-size: clamp(1rem, 4vw, 1.2rem);
    }
`;

// card text.
const CardTextLarge = styled.p`
    /* layout */
    margin: 0;
    display: flex;
    align-items: center;
    text-align: justify;
    word-wrap: break-word;
    overflow-wrap: break-word;
    
    /* spacing */
    flex: 1;
    font-size: clamp(0.9rem, 1.15vw, 1.05rem);
    line-height: 1.65;
    padding: 0 0.75rem;
    
    /* styles */
    color: rgba(220, 240, 250, 0.85);
    text-shadow: 0 1px 3px rgba(0, 40, 80, 0.3);
    
    /* media queries */
    @media (max-width: 1600px) {
        margin: 0;
        font-size: clamp(0.8rem, 1vw, 0.95rem);
        line-height: 1.55;
        padding: 0 clamp(0.6rem, 1vw, 1.1rem);
    }
    
    @media (max-width: 1200px) {
        font-size: clamp(0.75rem, 0.9vw, 0.85rem);
        line-height: 1.5;
        padding: 0 clamp(0.5rem, 0.85vw, 1rem);
    }
    
    @media (max-width: 768px) {
        font-size: clamp(0.8rem, 2.8vw, 0.95rem);
        line-height: 1.55;
        padding: 0 0.5rem;
    }
`;

/* =========  goals ========== */

const GoalsList = styled.ul`
    /* layout */
    display: flex;
    flex-direction: column;
    justify-content: start;
    
    /* spacing */
    flex: 1;
    gap: 0.5rem;
    margin: 0;
    padding: 0 clamp(0.75rem, 1.2vw, 1.5rem);
    
    /* styles */
    list-style: none;
    
    /* media queries */
    @media (max-width: 1600px) {
        gap: clamp(0.6rem, 0.8vw, 0.7rem);
        padding: 0 clamp(0.6rem, 1vw, 1.1rem);
    }
    
    @media (max-width: 1200px) {
        gap: clamp(0.5rem, 0.7vw, 0.65rem);
        padding: 0 clamp(0.5rem, 0.85vw, 1rem);
    }
    
    @media (max-width: 768px) {
        gap: 0.5rem;
        padding: 0 0.5rem;
    }
`;

// individual goal item with custom bullet - matching experience.jsx style
const GoalItem = styled.li`
    /* layout */
    position: relative;
    text-align: justify;
    word-wrap: break-word;
    overflow-wrap: break-word;
    
    /* spacing */
    font-size: clamp(0.8rem, 1vw, 0.95rem);
    line-height: 1.65;
    padding-left: 1.75rem;
    
    /* styles */
    color: rgba(220, 240, 250, 0.85);
    text-shadow: 0 1px 3px rgba(0, 40, 80, 0.3);
    
    /* pseudo-elements */
    &::before {
        /* layout */
        left: 0;
        top: 1em;
        position: absolute;
        
        /* spacing */
        width: 12px;
        height: 12px;
        
        /* styles */
        content: '';
        flex-shrink: 0;
        border-radius: 50%;
        transform: translateY(-50%);
        background: linear-gradient(135deg, 
            rgba(100, 200, 230, 1) 0%,
            rgba(100, 200, 230, 0.85) 50%,
            rgba(100, 200, 230, 0.7) 100%
        );
        box-shadow: 
            0 0 10px rgba(100, 200, 230, 0.5),
            inset 0 1px 2px rgba(255, 255, 255, 0.25);
    }
    
    &::after {
        /* layout */
        left: 6px;
        top: 1em;
        position: absolute;
        
        /* spacing */
        width: 5px;
        height: 5px;
        
        /* styles */
        content: '';
        pointer-events: none;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255, 255, 255, 0.4);
    }
    
    /* media queries */
    @media (max-width: 1600px) {
        font-size: clamp(0.7rem, 0.9vw, 0.8rem);
        line-height: 1.55;
        padding-left: clamp(1.5rem, 1.7vw, 1.6rem);
        
        &::before {
            width: 10px;
            height: 10px;
        }
        
        &::after {
            left: 5px;
            width: 4px;
            height: 4px;
        }
    }
    
    @media (max-width: 1200px) {
        font-size: clamp(0.65rem, 0.85vw, 0.75rem);
        line-height: 1.5;
        padding-left: clamp(1.4rem, 1.6vw, 1.5rem);
        
        &::before {
            width: 9px;
            height: 9px;
        }
        
        &::after {
            left: 4.5px;
            width: 3.5px;
            height: 3.5px;
        }
    }
    
    @media (max-width: 768px) {
        font-size: clamp(0.7rem, 2.5vw, 0.8rem);
        line-height: 1.5;
        padding-left: 1.5rem;
        
        &::before {
            width: 10px;
            height: 10px;
        }
        
        &::after {
            left: 5px;
            width: 4px;
            height: 4px;
        }
    }
`;

/* =========  emojis at bottom of cards ========== */

const EmojiRow = styled.div`
    /* layout */
    display: flex;
    justify-content: center;
    
    /* spacing */
    gap: 0.5rem;
    margin-top: auto;
    padding-top: 0.75rem;
    
    /* styles */
    opacity: 0.95;
    filter: drop-shadow(0 2px 8px rgba(120, 200, 220, 0.35));
    
    /* media queries */
    @media (max-width: 1600px) {
        gap: clamp(0.35rem, 0.5vw, 0.45rem);
        padding-top: clamp(0.5rem, 0.7vw, 0.65rem);
    }
    
    @media (max-width: 1200px) {
        gap: clamp(0.3rem, 0.45vw, 0.4rem);
        padding-top: clamp(0.45rem, 0.6vw, 0.6rem);
    }
    
    @media (max-width: 768px) {
        gap: 0.35rem;
        padding-top: 0.5rem;
    }
`;

// individual emoji bubble
const Emoji = styled.span`
    /* layout */
    display: inline-grid;
    place-items: center;
    cursor: pointer;
    
    /* spacing */
    width: 1.9rem;
    height: 1.9rem;
    font-size: 1.1rem;
    
    /* styles */
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    background: rgba(255, 255, 255, 0.08);
    transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
    
    /* hover effects */
    &:hover {
        transform: translateY(-2px) scale(1.06);
        background: rgba(255, 255, 255, 0.14);
        border-color: rgba(255, 255, 255, 0.28);
    }
    
    /* media queries */
    @media (max-width: 1600px) {
        width: clamp(1.5rem, 1.8vw, 1.7rem);
        height: clamp(1.5rem, 1.8vw, 1.7rem);
        font-size: clamp(0.9rem, 1.1vw, 1rem);
    }
    
    @media (max-width: 1200px) {
        width: clamp(1.4rem, 1.7vw, 1.6rem);
        height: clamp(1.4rem, 1.7vw, 1.6rem);
        font-size: clamp(0.85rem, 1vw, 0.95rem);
    }
    
    @media (max-width: 768px) {
        width: 1.5rem;
        height: 1.5rem;
        font-size: 0.9rem;
    }
`;

/* =========  mantras ========== */

const MantrasWrapper = styled.div`
    /* layout */
    display: flex;
    flex-direction: column;
    justify-content: start;
    
    /* spacing */
    flex: 1;
    gap: 0.25rem;
    
    /* media queries */
    @media (max-width: 1600px) {
        gap: clamp(0.35rem, 0.45vw, 0.4rem);
    }
    
    @media (max-width: 1200px) {
        gap: clamp(0.3rem, 0.4vw, 0.35rem);
    }
    
    @media (max-width: 768px) {
        gap: 0.25rem;
    }
`;

const MantraText = styled.div`
    /* layout */
    text-align: justify;
    word-wrap: break-word;
    overflow-wrap: break-word;
    
    /* spacing */
    font-size: 0.95rem;
    line-height: 1.65;
    padding: 0 clamp(0.75rem, 1.2vw, 1.5rem);
    
    /* styles */
    color: rgba(220, 240, 250, 0.85);
    text-shadow: 0 1px 3px rgba(0, 40, 80, 0.3);
    
    /* media queries */
    @media (max-width: 1600px) {
        font-size: clamp(0.8rem, 1vw, 0.9rem);
        line-height: 1.55;
    }
    
    @media (max-width: 1200px) {
        font-size: clamp(0.75rem, 0.9vw, 0.85rem);
        line-height: 1.5;
    }
    
    @media (max-width: 768px) {
        font-size: clamp(0.7rem, 2.5vw, 0.8rem);
        line-height: 1.5;
        padding: 0 0.5rem;
    }
`;

const MantraHighlight = styled.div`
    /* layout */
    display: block;
    margin-bottom: clamp(0.2rem, 0.3vw, 0.25rem);
    text-align: center;
    
    /* spacing */
    font-size: 1rem;
    
    /* styles */
    font-weight: 800;
    letter-spacing: 0.3px;
    background: linear-gradient(135deg, 
        rgba(255, 235, 120, 1) 0%,
        rgba(255, 200, 100, 1) 50%,
        rgba(255, 180, 90, 1) 100%
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 2px 8px rgba(255, 200, 100, 0.4);
    
    /* media queries */
    @media (max-width: 1600px) {
        font-size: clamp(0.8rem, 0.95vw, 0.9rem);
    }
    
    @media (max-width: 1200px) {
        font-size: clamp(0.75rem, 0.9vw, 0.85rem);
    }
    
    @media (max-width: 768px) {
        font-size: clamp(0.65rem, 2.2vw, 0.75rem);
    }
`;

/* =========  music card content ========== */

const MusicWrapper = styled.div`
    /* layout */
    display: flex;
    flex-direction: column;
    justify-content: start;
    
    /* spacing */
    flex: 1;
`;

const MusicIntroText = styled.p`
    /* layout */
    margin: 0 0 clamp(0.4rem, 0.6vw, 0.5rem) 0;
    text-align: justify;
    word-wrap: break-word;
    overflow-wrap: break-word;
    
    /* spacing */
    font-size: clamp(0.75rem, 0.95vw, 0.9rem);
    line-height: 1.6;
    padding: 0 clamp(0.75rem, 1.2vw, 1.5rem);
    
    /* styles */
    color: rgba(220, 240, 250, 0.85);
    text-shadow: 0 1px 3px rgba(0, 40, 80, 0.3);
    
    /* media queries */
    @media (max-width: 1600px) {
        margin: 0 0 clamp(0.3rem, 0.45vw, 0.4rem) 0;
        font-size: clamp(0.65rem, 0.8vw, 0.75rem);
        line-height: 1.45;
        padding: 0 clamp(0.5rem, 0.85vw, 1rem);
    }
    
    @media (max-width: 1200px) {
        margin: 0 0 clamp(0.25rem, 0.4vw, 0.35rem) 0;
        font-size: clamp(0.6rem, 0.75vw, 0.7rem);
        line-height: 1.4;
        padding: 0 clamp(0.4rem, 0.75vw, 0.85rem);
    }
    
    @media (max-width: 768px) {
        margin-bottom: 0.4rem;
        font-size: clamp(0.65rem, 2.2vw, 0.75rem);
        line-height: 1.45;
        padding: 0 0.5rem;
    }
`;

const ArtistGrid = styled.div`
    /* layout */
    display: grid;
    
    /* spacing */
    gap: clamp(0.4rem, 0.6vw, 0.5rem);
    margin-top: clamp(0.4rem, 0.6vw, 0.5rem);
    grid-template-columns: repeat(2, minmax(0, 1fr));
    
    /* media queries */
    @media (max-width: 1600px) {
        gap: clamp(0.3rem, 0.45vw, 0.4rem);
        margin-top: clamp(0.3rem, 0.45vw, 0.4rem);
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    }
    
    @media (max-width: 1200px) {
        gap: clamp(0.25rem, 0.4vw, 0.35rem);
        margin-top: clamp(0.25rem, 0.4vw, 0.35rem);
    }
    
    @media (max-width: 900px) {
        grid-template-columns: 1fr;
    }
    
    @media (max-width: 768px) {
        gap: 0.4rem;
        margin-top: 0.4rem;
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
`;

const ArtistName = styled.div`
    /* layout */
    text-align: center;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    min-width: 0;
    
    /* spacing */
    font-size: clamp(0.7rem, 0.9vw, 0.875rem);
    padding: clamp(0.1rem, 0.2vw, 0.15rem) clamp(0.4rem, 0.6vw, 0.5rem);
    border-radius: clamp(10px, 1.2vw, 12px);
    
    /* styles */
    color: rgba(200, 230, 245, 0.9);
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.06);
    text-overflow: ellipsis;
    transition: all 0.2s ease;
    
    /* hover effects */
    &:hover {
        transform: translateY(-2px);
        background: rgba(255, 255, 255, 0.12);
        border-color: rgba(255, 255, 255, 0.25);
        white-space: normal;
        overflow: visible;
        box-shadow: 0 4px 12px rgba(100, 200, 220, 0.2);
    }
    
    /* media queries */
    @media (max-width: 1600px) {
        font-size: clamp(0.65rem, 0.8vw, 0.8rem);
    }
    
    @media (max-width: 1200px) {
        font-size: clamp(0.6rem, 0.75vw, 0.75rem);
    }
    
    @media (max-width: 768px) {
        font-size: clamp(0.6rem, 2vw, 0.7rem);
        padding: 0.1rem 0.4rem;
    }
`;

const CardDate = styled.span`
    /* layout */
    display: inline-block;
    margin: 0;
    
    /* spacing */
    font-size: clamp(0.75rem, 0.9vw, 0.85rem);
    line-height: 1.1;
    
    /* styles */
    font-style: italic;
    color: rgba(180, 220, 240, 0.85);
    
    /* media queries */
    @media (max-width: 1600px) {
        font-size: clamp(0.65rem, 0.75vw, 0.7rem);
    }
    
    @media (max-width: 1200px) {
        font-size: clamp(0.6rem, 0.7vw, 0.65rem);
    }
    
    @media (max-width: 768px) {
        font-size: clamp(0.55rem, 1.8vw, 0.65rem);
    }
`;

/* =========  education card content ========== */

const EducationContent = styled.div`
    /* layout */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
    /* spacing */
    flex: 1;
    gap: 0.75rem;
    margin-top: 0;
    
    /* media queries */
    @media (max-width: 1600px) {
        gap: clamp(0.5rem, 0.7vw, 0.6rem);
    }
    
    @media (max-width: 1200px) {
        gap: clamp(0.45rem, 0.6vw, 0.55rem);
    }
`;

const DegreeSection = styled.div`
    /* layout */
    display: flex;
    flex-direction: column;
    
    /* spacing */
    gap: 0.25rem;
    padding-bottom: 0.5rem;
    
    /* styles */
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
    
    /* media queries */
    @media (max-width: 1600px) {
        gap: clamp(0.15rem, 0.2vw, 0.2rem);
        padding-bottom: clamp(0.35rem, 0.45vw, 0.4rem);
    }
    
    @media (max-width: 1200px) {
        gap: clamp(0.1rem, 0.15vw, 0.15rem);
        padding-bottom: clamp(0.3rem, 0.4vw, 0.35rem);
    }
`;

const DegreeName = styled.h4`
    /* layout */
    margin: 0;
    text-align: center;
    
    /* spacing */
    font-size: clamp(1rem, 1.3vw, 1.2rem);
    line-height: 1.2;
    
    /* styles */
    font-weight: 700;
    background: linear-gradient(135deg, 
        rgba(230, 245, 255, 1) 0%,
        rgba(180, 220, 240, 1) 100%
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    
    /* media queries */
    @media (max-width: 1600px) {
        font-size: clamp(0.85rem, 1vw, 0.95rem);
    }
    
    @media (max-width: 1200px) {
        font-size: clamp(0.8rem, 0.95vw, 0.9rem);
    }
`;

const UniversityName = styled.p`
    /* layout */
    margin: 0;
    text-align: center;
    
    /* spacing */
    font-size: clamp(0.85rem, 1vw, 1rem);
    line-height: 1.2;
    
    /* styles */
    color: rgba(200, 230, 245, 0.85);
    
    /* media queries */
    @media (max-width: 1600px) {
        font-size: clamp(0.7rem, 0.85vw, 0.8rem);
    }
    
    @media (max-width: 1200px) {
        font-size: clamp(0.65rem, 0.8vw, 0.75rem);
    }
    
    @media (max-width: 768px) {
        font-size: clamp(0.6rem, 2vw, 0.7rem);
    }
`;

const InfoRow = styled.div`
    /* layout */
    display: flex;
    align-items: center;
    justify-content: center;
    
    /* spacing */
    gap: 1.25rem;
    
    /* media queries */
    @media (max-width: 1600px) {
        gap: clamp(0.9rem, 1.1vw, 1rem);
    }
    
    @media (max-width: 1200px) {
        gap: clamp(0.8rem, 1vw, 0.9rem);
    }
`;

const InfoItem = styled.div`
    /* layout */
    display: flex;
    flex-direction: column;
    align-items: center;
    
    /* spacing */
    gap: 0.15rem;
    
    /* media queries */
    @media (max-width: 1600px) {
        gap: clamp(0.1rem, 0.12vw, 0.12rem);
    }
    
    @media (max-width: 1200px) {
        gap: clamp(0.08rem, 0.1vw, 0.1rem);
    }
`;

const InfoLabel = styled.span`
    /* spacing */
    font-size: clamp(0.65rem, 0.8vw, 0.75rem);
    
    /* styles */
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    color: rgba(150, 200, 220, 0.7);
    
    /* media queries */
    @media (max-width: 1600px) {
        font-size: clamp(0.6rem, 0.7vw, 0.65rem);
    }
    
    @media (max-width: 1200px) {
        font-size: clamp(0.55rem, 0.65vw, 0.6rem);
    }
`;

const InfoDivider = styled.div`
    /* spacing */
    width: 1px;
    height: 22px;
    
    /* styles */
    background: linear-gradient(to bottom, 
        transparent 0%,
        rgba(255, 255, 255, 0.3) 50%,
        transparent 100%
    );
`;

const GPAText = styled.span`
    /* spacing */
    font-size: clamp(0.95rem, 1.2vw, 1.1rem);
    
    /* styles */
    font-weight: 700;
    color: rgba(150, 220, 240, 1);
    text-shadow: 0 2px 8px rgba(120, 200, 220, 0.4);
    
    /* media queries */
    @media (max-width: 1600px) {
        font-size: clamp(0.9rem, 1.1vw, 1rem);
    }
    
    @media (max-width: 1200px) {
        font-size: clamp(0.85rem, 1vw, 0.95rem);
    }
    
    @media (max-width: 768px) {
        font-size: clamp(0.75rem, 2.5vw, 0.9rem);
    }
`;

/* =========  clubs ========== */

const ClubsSection = styled.div`
    /* layout */
    display: flex;
    flex-direction: column;
    
    /* spacing */
    gap: 0.5rem;
    
    /* media queries */
    @media (max-width: 1600px) {
        gap: clamp(0.35rem, 0.45vw, 0.4rem);
    }
    
    @media (max-width: 1200px) {
        gap: clamp(0.3rem, 0.4vw, 0.35rem);
    }
`;

const ClubsLabel = styled.span`
    /* layout */
    margin-bottom: 0.125rem;
    text-align: center;
    
    /* spacing */
    font-size: clamp(0.7rem, 0.85vw, 0.8rem);
    
    /* styles */
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    color: rgba(150, 200, 220, 0.8);
    
    /* media queries */
    @media (max-width: 1600px) {
        font-size: clamp(0.6rem, 0.7vw, 0.65rem);
    }
    
    @media (max-width: 1200px) {
        font-size: clamp(0.55rem, 0.65vw, 0.6rem);
    }
`;

const ClubsList = styled.div`
    /* layout */
    display: grid;
    
    /* spacing */
    gap: 0.5rem;
    grid-template-columns: repeat(2, 1fr);
    
    /* media queries */
    @media (max-width: 1600px) {
        gap: clamp(0.35rem, 0.45vw, 0.4rem);
    }
    
    @media (max-width: 1200px) {
        gap: clamp(0.3rem, 0.4vw, 0.35rem);
    }
`;

const ClubItem = styled.div`
    /* layout */
    display: flex;
    align-items: center;
    cursor: pointer;
    
    /* spacing */
    gap: 0.6rem;
    padding: 0.4rem 0.5rem;
    border-radius: 12px;
    
    /* styles */
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.05);
    transition: all 0.3s ease;
    
    /* hover effects */
    &:hover {
        transform: translateY(-2px);
        background: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.2);
        box-shadow: 0 4px 12px rgba(100, 200, 220, 0.2);
    }
    
    /* media queries */
    @media (max-width: 1600px) {
        gap: clamp(0.45rem, 0.55vw, 0.5rem);
        padding: clamp(0.3rem, 0.4vw, 0.35rem) clamp(0.35rem, 0.45vw, 0.4rem);
        border-radius: clamp(10px, 1.2vw, 11px);
    }
    
    @media (max-width: 1200px) {
        gap: clamp(0.4rem, 0.5vw, 0.45rem);
        padding: clamp(0.25rem, 0.35vw, 0.3rem) clamp(0.3rem, 0.4vw, 0.35rem);
        border-radius: clamp(9px, 1.1vw, 10px);
    }
`;

const ClubLogo = styled.img`
    /* layout */
    flex-shrink: 0;
    
    /* spacing */
    width: 28px;
    height: 28px;
    padding: 3px;
    border-radius: 6px;
    
    /* styles */
    object-fit: contain;
    border: 1px solid rgba(255, 255, 255, 0.15);
    background: rgba(255, 255, 255, 0.08);
`;

const ClubName = styled.span`
    /* layout */
    white-space: nowrap;
    overflow: hidden;
    
    /* spacing */
    font-size: clamp(0.75rem, 0.9vw, 0.85rem);
    
    /* styles */
    font-weight: 500;
    letter-spacing: 0.3px;
    text-overflow: ellipsis;
    color: rgba(200, 230, 245, 0.9);
    
    /* media queries */
    @media (max-width: 1600px) {
        font-size: clamp(0.65rem, 0.75vw, 0.7rem);
    }
    
    @media (max-width: 1200px) {
        font-size: clamp(0.6rem, 0.7vw, 0.65rem);
    }
    
    @media (max-width: 768px) {
        font-size: clamp(0.55rem, 1.8vw, 0.65rem);
    }
`;

/* ==================== footer ==================== */

// top wave - smooth wave pattern at the top of sand plane for rugged transition
const TopWave = styled.svg`
    /* layout */
    position: absolute;
    top: -10.5vh;
    left: 0;
    display: block;
    overflow: visible;
    pointer-events: none;
    
    /* spacing */
    width: 100%;
    height: 120px;
    
    /* styles */
    z-index: 2;
    opacity: 0.95;
    mask-image: linear-gradient(to bottom, black 0%, black 85%, transparent 100%);
    -webkit-mask-image: linear-gradient(to bottom, black 0%, black 85%, transparent 100%);
    
    /* media queries */
    @media (max-width: 1200px) {
        top: -100px;
        height: 100px;
    }
    
    @media (max-width: 900px) {
        top: -80px;
        height: 80px;
    }
    
    @media (max-width: 768px) {
        top: -40px;
        height: 50px;
    }
`;

// sand plane background - natural content flow component
const SandPlane = styled.div`
    /* layout */
    position: relative;
    overflow: visible;
    
    /* spacing */
    width: 100%;
    height: 30vh;
    
    /* styles */
    z-index: 2;
    background: linear-gradient(
        to bottom,
        #5d4a3a 0%,
        #6a5644 20%,
        #74604d 40%,
        #8a7358 70%,
        #958066 100%
    );
    
    /* pseudo-elements */
    &::before {
        /* layout */
        content: "";
        position: absolute;
        inset: 0;
        pointer-events: none;
        
        /* styles */
        filter: blur(9px);
        mix-blend-mode: overlay;
        background:
            linear-gradient(
                to bottom,
                rgba(0,0,0,0) 0%,
                rgba(0,0,0,0.06) 35%,
                rgba(0,0,0,0.14) 65%,
                rgba(0,0,0,0.22) 100%
            ),
            radial-gradient(ellipse 450px 200px at 18% 22%, 
                rgba(255,255,255,0.7) 0%, 
                rgba(255,255,255,0.4) 32%, 
                rgba(255,255,255,0.15) 52%, 
                transparent 68%),
            radial-gradient(ellipse 380px 180px at 78% 28%, 
                rgba(255,255,255,0.66) 0%, 
                rgba(255,255,255,0.38) 30%, 
                rgba(255,255,255,0.12) 50%, 
                transparent 65%),
            radial-gradient(ellipse 500px 220px at 42% 55%, 
                rgba(255,255,255,0.68) 0%, 
                rgba(255,255,255,0.42) 34%, 
                rgba(255,255,255,0.16) 54%, 
                transparent 70%),
            radial-gradient(ellipse 320px 160px at 12% 78%, 
                rgba(255,255,255,0.64) 0%, 
                rgba(255,255,255,0.36) 28%, 
                rgba(255,255,255,0.1) 48%, 
                transparent 62%),
            radial-gradient(ellipse 420px 190px at 85% 70%, 
                rgba(255,255,255,0.65) 0%, 
                rgba(255,255,255,0.39) 32%, 
                rgba(255,255,255,0.13) 52%, 
                transparent 66%),
            radial-gradient(ellipse 360px 170px at 35% 38%, 
                rgba(0,0,0,0.55) 0%, 
                rgba(0,0,0,0.32) 36%, 
                rgba(0,0,0,0.12) 54%, 
                transparent 66%),
            radial-gradient(ellipse 310px 150px at 68% 50%, 
                rgba(0,0,0,0.52) 0%, 
                rgba(0,0,0,0.3) 34%, 
                rgba(0,0,0,0.1) 52%, 
                transparent 64%),
            radial-gradient(ellipse 380px 180px at 8% 58%, 
                rgba(0,0,0,0.58) 0%, 
                rgba(0,0,0,0.35) 38%, 
                rgba(0,0,0,0.14) 56%, 
                transparent 68%),
            radial-gradient(ellipse 330px 160px at 90% 42%, 
                rgba(0,0,0,0.5) 0%, 
                rgba(0,0,0,0.28) 32%, 
                rgba(0,0,0,0.09) 50%, 
                transparent 62%),
            radial-gradient(ellipse 400px 185px at 52% 85%, 
                rgba(0,0,0,0.54) 0%, 
                rgba(0,0,0,0.31) 36%, 
                rgba(0,0,0,0.11) 54%, 
                transparent 66%),
            radial-gradient(ellipse 250px 120px at 28% 45%, 
                rgba(255,255,255,0.45) 0%, 
                rgba(255,255,255,0.15) 48%, 
                transparent 70%),
            radial-gradient(ellipse 220px 110px at 72% 68%, 
                rgba(0,0,0,0.42) 0%, 
                rgba(0,0,0,0.14) 46%, 
                transparent 66%),
            radial-gradient(ellipse 270px 130px at 48% 32%, 
                rgba(255,255,255,0.4) 0%, 
                rgba(255,255,255,0.12) 46%, 
                transparent 68%);
    }
    
    &::after {
        /* layout */
        content: "";
        position: absolute;
        inset: 0;
        pointer-events: none;
        
        /* spacing */
        background-size: 2px 2px, 2.5px 2.5px;
        background-position: 0 0, 1px 1px;
        
        /* styles */
        opacity: 0.35;
        filter: blur(0.3px);
        mix-blend-mode: soft-light;
        background-image:
            radial-gradient(circle, rgba(255, 255, 255, 0.08) 25%, transparent 60%),
            radial-gradient(circle, rgba(0, 0, 0, 0.06) 25%, transparent 60%);
    }
    
    /* media queries */
    @media (max-width: 768px) {
        height: 10vh;
        min-height: 100px;
    }
`;

// rock pile component - positioned relative to sand plane
const UnderwaterObject = styled.div`
    /* layout */
    position: absolute;
    bottom: 0;
    overflow: visible;
    pointer-events: none;
    
    /* styles */
    z-index: 25;
    filter: drop-shadow(0 4px 12px rgba(0, 40, 80, 0.3));
    
    /* nested selectors */
    img {
        /* layout */
        display: block;
        
        /* spacing */
        width: auto;
        height: auto;
        
        /* styles */
        pointer-events: auto;
    }
    
    /* media queries */
    @media (min-width: 769px) {
        img {
            width: clamp(180px, 12vw, 360px);
            height: clamp(180px, 12vw, 360px);
            max-width: 360px;
            max-height: 360px;
        }
        
        img.rockpile-image {
            width: clamp(280px, 18vw, 360px);
            height: clamp(280px, 18vw, 360px);
            max-width: 360px;
            max-height: 360px;
        }
    }
    
    @media (max-width: 768px) {
        display: none;
    }
`;

/* =========  text in sand ========== */

// sand text/icon overlay - positioned relative to sand plane
const SandTextLayer = styled.div`
    /* layout */
    position: absolute;
    bottom: 0;
    left: 0;
    pointer-events: none;
    
    /* spacing */
    width: 100%;
    height: 30vh;
    
    /* styles */
    z-index: 15;
    
    /* media queries */
    @media (max-width: 768px) {
        display: none;
    }
`;

// reusable engraved sand text
const SandText = styled.div`
    /* layout */
    position: absolute;
    white-space: nowrap;
    
    /* spacing */
    letter-spacing: 0.04em;
    
    /* styles */
    color: var(--sand-dark);
    text-shadow: 
        -1px -1px 0 rgba(255, 255, 255, 0.5),
        -2px -2px 0 rgba(255, 255, 255, 0.3),
        1px 1px 2px rgba(0, 0, 0, 0.2);
    
    /* media queries */
    @media (max-width: 768px) {
        &.contact-text {
            top: 70% !important;
            font-size: clamp(1.2rem, 5.5vw, 1.6rem) !important;
        }
        
        &.moon-text {
            top: 45% !important;
            font-size: clamp(0.9rem, 4vw, 1.2rem) !important;
        }
    }
`;

// "drawn in sand" icons
const SandIconWrap = styled.div`
    /* layout */
    position: absolute;
    transform: translateX(-50%);
    pointer-events: none;
    
    /* media queries */
    @media (max-width: 768px) {
        svg {
            width: clamp(24px, 6vw, 30px) !important;
            height: clamp(24px, 6vw, 30px) !important;
        }
        
        &:nth-of-type(1) {
            left: 20% !important;
            top: 75% !important;
        }
        
        &:nth-of-type(2) {
            left: 80% !important;
            top: 75% !important;
        }
    }
`;

const SandIcon = styled.svg`
    /* layout */
    display: block;
    
    /* styles */
    fill: none;
    stroke: var(--sand-dark);
    stroke-width: 2.25;
    stroke-linecap: round;
    stroke-linejoin: round;
    filter:
        drop-shadow(-1px -1px 0 var(--sand-light))
        drop-shadow( 1px  1px 0 rgba(0,0,0,0.28));
    
    /* media queries */
    @media (max-width: 700px) {
        stroke-width: 2.6;
    }
`;

// rocket container (back to top button)
const RocketContainer = styled.div`
    /* layout */
    position: absolute;
    bottom: 0;
    overflow: visible;
    cursor: pointer;
    pointer-events: auto;
    transform: translateX(-50%);
    
    /* styles */
    z-index: 25;
    transition: transform 0.3s ease;
    
    /* nested selectors */
    img {
        /* layout */
        display: block;
        
        /* spacing */
        width: 250px;
        height: 250px;
    }
    
    /* hover effects */
    &:hover {
        transform: translateX(-50%) translateY(-15px);
    }
    
    /* media queries */
    @media (max-width: 768px) {
        display: none;
    }
`;

// made with love container
const MadeWithLoveContainer = styled.div`
    /* layout */
    position: absolute;
    bottom: 1rem;
    left: 2.5%;
    display: flex;
    align-items: center;
    pointer-events: none;
    
    /* spacing */
    gap: 0.5rem;
    
    /* styles */
    z-index: 30;
    
    /* media queries */
    @media (max-width: 1200px) {
        gap: 0.4rem;
    }
    
    @media (max-width: 768px) {
        bottom: 0.5rem;
        left: 1rem;
        right: auto;
        gap: 0.3rem;
    }
`;

// made with text with gradient
const MadeWithText = styled.span`
    /* spacing */
    font-size: 2rem;
    
    /* styles */
    font-weight: 600;
    background: linear-gradient(135deg, 
        rgba(255, 255, 255, 0.95) 0%,
        rgba(220, 220, 220, 0.9) 50%,
        rgba(255, 255, 255, 0.95) 100%
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    
    /* media queries */
    @media (max-width: 1200px) {
        font-size: 1.5rem;
    }
    
    @media (max-width: 768px) {
        font-size: clamp(0.7rem, 2.5vw, 0.9rem);
    }
`;

// heart emoji
const HeartEmoji = styled.span`
    /* layout */
    display: inline-block;
    
    /* spacing */
    font-size: 2rem;
    
    /* styles */
    animation: heartbeat 2s ease-in-out infinite;
    
    /* keyframes */
    @keyframes heartbeat {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
    
    /* media queries */
    @media (max-width: 1200px) {
        font-size: 1.5rem;
    }
    
    @media (max-width: 768px) {
        font-size: clamp(0.7rem, 2.5vw, 0.9rem);
    }
`;

// cursor logo
const CursorLogo = styled.img`
    /* layout */
    display: block;
    flex-shrink: 0;
    
    /* spacing */
    width: 2rem;
    height: 2rem;
    
    /* styles */
    object-fit: contain;
    filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.3));
    transition: transform 0.3s ease;
    
    /* hover effects */
    ${MadeWithLoveContainer}:hover & {
        transform: scale(1.1);
    }
    
    /* media queries */
    @media (max-width: 1200px) {
        width: 1.5rem;
        height: 1.5rem;
    }
    
    @media (max-width: 768px) {
        width: clamp(0.7rem, 2.5vw, 0.9rem);
        height: clamp(0.7rem, 2.5vw, 0.9rem);
    }
`;

// copyright container
const CopyrightContainer = styled.div`
    /* layout */
    position: absolute;
    bottom: 1rem;
    right: 2.5%;
    display: flex;
    align-items: center;
    pointer-events: none;
    
    /* spacing */
    gap: 0.3rem;
    font-size: 1.2rem;
    
    /* styles */
    z-index: 30;
    color: rgba(255, 255, 255, 0.7);
    
    /* media queries */
    @media (max-width: 1200px) {
        font-size: 1rem;
    }
    
    @media (max-width: 768px) {
        bottom: 0.5rem;
        right: 1rem;
        left: auto;
        font-size: clamp(0.65rem, 2.2vw, 0.8rem);
    }
`;

/* =================== mobile footer ==================== */

const MobileFooterContainer = styled.div`
    /* layout */
    display: none;
    
    /* media queries */
    @media (max-width: 768px) {
        /* layout */
        position: absolute;
        bottom: 1rem;
        left: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        pointer-events: auto;
        transform: translateX(-50%);
        
        /* spacing */
        gap: 0.5rem;
        width: 90%;
        max-width: 320px;
        margin-bottom: 1.25rem;
        
        /* styles */
        z-index: 40;
    }
`;

const MobileContactRow = styled.div`
    /* layout */
    display: none;
    
    /* media queries */
    @media (max-width: 768px) {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        
        /* spacing */
        gap: 0.5rem;
        width: 100%;
    }
`;

const MobileContactItem = styled.div`
    /* layout */
    display: flex;
    align-items: center;
    min-width: 0;
    
    /* spacing */
    flex: 1;
    gap: 0.4rem;
    padding: 0.5rem 1rem;
    border-radius: 10px;
    
    /* styles */
    border: 1px solid rgba(255, 255, 255, 0.25);
    background: rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(8px);
    transition: all 0.3s ease;
    box-shadow: 0 3px 12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.4);
    
    /* hover effects */
    &:hover {
        transform: translateY(-2px);
        background: rgba(255, 255, 255, 0.18);
        border-color: rgba(255, 255, 255, 0.35);
        box-shadow: 0 5px 18px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.5);
    }
    
    /* active state */
    &:active {
        transform: translateY(0);
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3);
    }
`;

const MobileContactIcon = styled.div`
    /* layout */
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    
    /* styles */
    color: rgba(255, 255, 255, 0.98);
    
    /* nested selectors */
    svg {
        width: 18px;
        height: 18px;
    }
`;

const MobileContactText = styled.a`
    /* layout */
    flex: 1;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    
    /* spacing */
    font-size: clamp(0.75rem, 3vw, 0.9rem);
    letter-spacing: 0.15px;
    
    /* styles */
    color: rgba(255, 255, 255, 0.98);
    font-weight: 700;
    text-decoration: none;
    text-overflow: ellipsis;
    
    /* hover effects */
    &:hover {
        color: rgba(255, 255, 255, 1);
        text-decoration: none;
    }
    
    /* active state */
    &:active {
        opacity: 0.8;
    }
`;

const MobileScrollButton = styled.button`
    /* layout */
    font: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    
    /* spacing */
    gap: 0.4rem;
    width: auto;
    min-width: 120px;
    padding: 0.5rem 1rem;
    margin-bottom: 0.25rem;
    border-radius: 10px;
    font-size: clamp(0.75rem, 3vw, 0.9rem);
    
    /* styles */
    border: 1px solid rgba(255, 255, 255, 0.25);
    background: rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(8px);
    color: rgba(255, 255, 255, 0.98);
    font-weight: 700;
    transition: all 0.3s ease;
    box-shadow: 0 3px 12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.4);
    
    /* hover effects */
    &:hover {
        transform: translateY(-2px);
        background: rgba(255, 255, 255, 0.18);
        border-color: rgba(255, 255, 255, 0.35);
        box-shadow: 0 5px 18px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.5);
    }
    
    /* active state */
    &:active {
        transform: translateY(0);
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3);
    }
`;

const MobileScrollIcon = styled.div`
    /* layout */
    display: flex;
    align-items: center;
    justify-content: center;
    
    /* styles */
    color: rgba(255, 255, 255, 0.98);
    
    /* nested selectors */
    svg {
        width: 18px;
        height: 18px;
    }
`;

const MobileScrollText = styled.span`
    /* styles */
    color: rgba(255, 255, 255, 0.98);
    font-weight: 700;
`;
