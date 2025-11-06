import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useComponentPerformance } from '../../hooks/useComponentPerformance';
import meImage from '../../images/5about/me.jpg';
import shpeLogo from '../../images/5about/shpe.png';
import knightHacksLogo from '../../images/5about/knightshacks.png';
import aiUcfLogo from '../../images/5about/aiucf.png';
import ieeeLogo from '../../images/5about/ieee.png';
import acmLogo from '../../images/5about/acm.png';
import ReactionBubble from './ReactionBubble';

// Footer images
import rockpileImage from '../../images/5about/footer/rockpile.png';
import bluecoral from '../../images/5about/footer/bluecoral.png';
import flatrock from '../../images/5about/footer/flatrock.png';
import orangecoral from '../../images/5about/footer/orangecoral.png';
import pinkcoral from '../../images/5about/footer/pinkcoral.png';
import rockwithseaweed from '../../images/5about/footer/rockwithseaweed.png';
import seaweed from '../../images/5about/footer/seaweed.png';
import seaweed2 from '../../images/5about/footer/seaweed2.png';
import seaweed3 from '../../images/5about/footer/seaweed3.png';
import tallrock from '../../images/5about/footer/tallrock.png';
import yellowcoral from '../../images/5about/footer/yellowcoral.png';
import purplecoral from '../../images/5about/footer/purplecoral.png';
import rocket from '../../images/5about/footer/rocket.png';

// Interactive footer components
import ShellPhoneWithTooltip from './footer/ShellPhone';
import MessageInBottleWithTooltip from './footer/MessageInBottle';

const Background = () => {
    // Performance monitoring
    useComponentPerformance('About', process.env.NODE_ENV === 'development');
    
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <BackgroundContainer id="about" data-section-snap>
            {/* Surface water layer - connects to Skills ocean wall */}
            <SurfaceWater>
                <SurfaceRippleLayer />
            </SurfaceWater>
            
            {/* Unified underwater section - continuous gradient from shallow to deep */}
            <UnderwaterSection>
                {/* Underwater header */}
                <UnderwaterHeader>
                    <HeaderTitle data-snap-title>About Me</HeaderTitle>
                    <HeaderSubtitle>Dive into my background</HeaderSubtitle>
                </UnderwaterHeader>
                
                {/* Profile section with image and info cards */}
                <ProfileSection>
                    {/* Left side - Circular profile image */}
                    <ImageSection>
                        <ProfileImageFrame>
                            <ProfileImage src={meImage} alt="Colin Kirby" />
                        </ProfileImageFrame>
                        
                        {/* Social bubbles below image */}
                        <SocialBubblesContainer>
                            <SocialBubble 
                                href="https://www.linkedin.com/in/colinwkirby/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                delay={0}
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
                                delay={0.5}
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
                                delay={1}
                                aria-label="Instagram Profile"
                            >
                                <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                                </svg>
                            </SocialBubble>
                            
                            <SocialBubble 
                                href="/resume.pdf" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                delay={1.5}
                                aria-label="Download Resume"
                            >
                                <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                                    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                                </svg>
                            </SocialBubble>
                        </SocialBubblesContainer>
                    </ImageSection>
                    
                    {/* Right side - 3x2 Grid of glassmorphism cards */}
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
                                    <Emoji title="Basketball">🏀</Emoji>
                                    <Emoji title="Football">🏈</Emoji>
                                    <Emoji title="Baseball">⚾</Emoji>
                                    <Emoji title="Lacrosse">🥍</Emoji>
                                    <Emoji title="Rowing">🚣</Emoji>
                                    <Emoji title="Lifting">🏋️</Emoji>
                                    <Emoji title="Skateboarding">🛹</Emoji>
                                    <Emoji title="Golf">⛳</Emoji>
                                </EmojiRow>
                            </GlassCard>
                            
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
                                    <Emoji title="Art">🎨</Emoji>
                                    <Emoji title="Sketching">✏️</Emoji>
                                    <Emoji title="Design">🖌️</Emoji>
                                    <Emoji title="Music">🎵</Emoji>
                                    <Emoji title="Guitar">🎸</Emoji>
                                    <Emoji title="Piano">🎹</Emoji>
                                    <Emoji title="Production">🎧</Emoji>
                                </EmojiRow>
                            </GlassCard>
                            
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
                                <CardTextLarge>
                                  I want to work for myself and blend technical work with creativity. I like fast paced startup environments where I can grow. My sweet spot is collaboration, creativity, and hard technical problems. Most of all I just want to keep improving and enjoy the process.
                                </CardTextLarge>

                                
                                <EmojiRow aria-hidden="true">
                                    <Emoji title="Target">🎯</Emoji>
                                    <Emoji title="Rocket">🚀</Emoji>
                                    <Emoji title="Fire">🔥</Emoji>
                                    <Emoji title="Brain">🧠</Emoji>
                                    <Emoji title="People">👥</Emoji>
                                    <Emoji title="Lightning">⚡</Emoji>
                                </EmojiRow>
                            </GlassCard>
                            
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
                                        Love Of Fate. Trying to appreciate everything that happens, good or bad. Just experiencing it.
                                    </MantraText>
                                    <MantraText>
                                        <MantraHighlight>Nothing changes if nothing changes.</MantraHighlight>
                                        My life is in my hands. It's up to me to determine what it looks like (from a Theo Von podcast btw).
                                    </MantraText>
                                </MantrasWrapper>
                                
                                <EmojiRow aria-hidden="true">
                                    <Emoji title="Mindset">💭</Emoji>
                                    <Emoji title="Compass">🧭</Emoji>
                                    <Emoji title="Growth">🌱</Emoji>
                                    <Emoji title="Balance">⚖️</Emoji>
                                    <Emoji title="Change">🔄</Emoji>
                                    <Emoji title="Action">💪</Emoji>
                                </EmojiRow>
                            </GlassCard>
                            
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
                                        <ArtistName>Kanye</ArtistName>
                                        <ArtistName>The Backseat Lovers</ArtistName>
                                        <ArtistName>Malcom Todd</ArtistName>
                                        <ArtistName>Daniel Caesar</ArtistName>
                                        <ArtistName>Rex Orange County</ArtistName>
                                        <ArtistName>Bad Bunny</ArtistName>
                                        <ArtistName>Bruno Mars</ArtistName>
                                        <ArtistName>$uicideboy$</ArtistName>
                                        <ArtistName>Olivia Rodrigo</ArtistName>
                                        <ArtistName>Zach Bryan</ArtistName>
                                    </ArtistGrid>
                                </MusicWrapper>
                                
                                <EmojiRow aria-hidden="true">
                                    <Emoji title="Headphones">🎧</Emoji>
                                    <Emoji title="Music">🎵</Emoji>
                                    <Emoji title="Vinyl">💿</Emoji>
                                    <Emoji title="Microphone">🎤</Emoji>
                                    <Emoji title="Speakers">🔊</Emoji>
                                    <Emoji title="Notes">🎶</Emoji>
                                </EmojiRow>
                            </GlassCard>
                        </InfoGrid>
                    </InfoGridSection>
                </ProfileSection>
            </UnderwaterSection>
            
            {/* Footer - ocean floor with underwater objects - natural content flow component */}
            <SandPlane>
                {/* Made with Love - positioned within SandPlane */}
                <MadeWithLoveContainer>
                    Made with<HeartEmoji>❤️</HeartEmoji>by me (CK)
                </MadeWithLoveContainer>

                {/* Copyright - positioned within SandPlane */}
                <CopyrightContainer>© 2025 Colin Kirby. All rights reserved.</CopyrightContainer>
                
                <SandTextLayer>
                <SandText
                    style={{ left: '50%', transform: 'translateX(-50%)', top: '65%', fontSize: '2.5rem', fontWeight: 700 }}
                    data-text="Contact Me!"
                >
                    Contact Me!
                </SandText>

                <SandText
                    style={{ left: '50%', transform: 'translateX(-50%)', top: '42.5%', fontSize: '1.8rem', fontWeight: 600 }}
                    data-text="To The Moon!"
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

                <UnderwaterObject style={{ bottom: '57%', left: '1%' }}>
                    <img style={{ width: '245px', height: '245px' }} src={rockwithseaweed} alt="Rock with Seaweed" loading="lazy" />
                </UnderwaterObject>

                <UnderwaterObject style={{ bottom: '43%', left: '5%' }}>
                    <img style={{ width: '210px', height: '210px' }} src={tallrock} alt="Tall Rock" loading="lazy" />
                </UnderwaterObject>

                <UnderwaterObject style={{ bottom: '29%', left: '-8%' }}>
                    <img style={{ width: '360px', height: '360px', transform: 'scaleX(-1)' }} src={rockpileImage} alt="Rockpile" loading="lazy" />
                </UnderwaterObject>
                
                <UnderwaterObject style={{ bottom: '25%', left: '-2%' }}>
                    <img style={{ width: '220px', height: '220px' }} src={seaweed} alt="Seaweed" loading="lazy" />
                </UnderwaterObject>
                
                <UnderwaterObject style={{ bottom: '31%', left: '3%' }}>
                    <img style={{ width: '200px', height: '200px' }} src={seaweed2} alt="Seaweed" loading="lazy" />
                </UnderwaterObject>

                <UnderwaterObject style={{ bottom: '34%', left: '7%' }}>
                    <img style={{ width: '220px', height: '220px' }} src={seaweed3} alt="Seaweed" loading="lazy" />
                </UnderwaterObject>

                <UnderwaterObject style={{ bottom: '42%', left: '16%' }}>
                    <img style={{ width: '225px', height: '225px' }} src={yellowcoral} alt="Yellow Coral" loading="lazy" />
                </UnderwaterObject>

                <UnderwaterObject style={{ bottom: '30%', left: '12%' }}>
                    <img style={{ width: '245px', height: '245px' }} src={pinkcoral} alt="Pink Coral" loading="lazy" />
                </UnderwaterObject>

                <UnderwaterObject style={{ bottom: '33%', left: '20%' }}>
                    <img style={{ width: '230px', height: '230px' }} src={purplecoral} alt="Purple Coral" loading="lazy" />
                </UnderwaterObject>

                <UnderwaterObject style={{ bottom: '19%', left: '14%' }}>
                    <img style={{ width: '235px', height: '235px' }} src={orangecoral} alt="Orange Coral" loading="lazy" />
                </UnderwaterObject>
                
                <UnderwaterObject style={{ bottom: '13%', left: '17%' }}>
                    <img style={{ width: '260px', height: '260px' }} src={bluecoral} alt="Blue Coral" loading="lazy" />
                </UnderwaterObject>

                <UnderwaterObject style={{ bottom: '35%', left: '37.5%', transform: 'translateX(-50%)'}}>
                    <MessageInBottleWithTooltip />
                </UnderwaterObject>
                
                {/* Rocket - CENTERED at 50% */}
                <RocketContainer style={{ bottom: '45%', left: '49.75%', transform: 'translateX(-50%)'}} onClick={scrollToTop}>
                    <RocketImage style={{ width: '250px', height: '250px' }} src={rocket} alt="Rocket - Back to top" />
                </RocketContainer>
                
                {/* Interactive Shell Phone with phone tooltip - RIGHT of center (centered at 65%) */}
                <UnderwaterObject style={{ bottom: '35%', left: '62.5%', transform: 'translateX(-50%)'}}>
                    <ShellPhoneWithTooltip />
                </UnderwaterObject>

                <UnderwaterObject style={{ bottom: '42%', right: '16%' }}>
                    <img style={{ width: '235px', height: '235px' }} src={bluecoral} alt="Blue Coral" loading="lazy" />
                </UnderwaterObject>

                <UnderwaterObject style={{ bottom: '30%', right: '12%' }}>
                    <img style={{ width: '240px', height: '240px' }} src={yellowcoral} alt="Yellow Coral" loading="lazy" />
                </UnderwaterObject>

                <UnderwaterObject style={{ bottom: '33%', right: '20%' }}>
                    <img style={{ width: '230px', height: '230px' }} src={orangecoral} alt="Orange Coral" loading="lazy" />
                </UnderwaterObject>

                <UnderwaterObject style={{ bottom: '19%', right: '14%' }}>
                    <img style={{ width: '245px', height: '245px' }} src={purplecoral} alt="Purple Coral" loading="lazy" />
                </UnderwaterObject>
                
                <UnderwaterObject style={{ bottom: '13%', right: '17%' }}>
                    <img style={{ width: '265px', height: '265px' }} src={pinkcoral} alt="Pink Coral" loading="lazy" />
                </UnderwaterObject>

                <UnderwaterObject style={{ bottom: '57%', right: '1%' }}>
                    <img style={{ width: '240px', height: '240px' }} src={rockwithseaweed} alt="Rock with Seaweed" loading="lazy" />
                </UnderwaterObject>

                <UnderwaterObject style={{ bottom: '44%', right: '5%' }}>
                    <img style={{ width: '210px', height: '210px' }} src={flatrock} alt="Flat Rock" loading="lazy" />
                </UnderwaterObject>

                <UnderwaterObject style={{ bottom: '29%', right: '-8%' }}>
                    <img style={{ width: '360px', height: '360px' }} src={rockpileImage} alt="Rockpile" loading="lazy" />
                </UnderwaterObject>

                <UnderwaterObject style={{ bottom: '25%', right: '-2%' }}>
                    <img style={{ width: '215px', height: '215px' }} src={seaweed} alt="Seaweed" loading="lazy" />
                </UnderwaterObject>

                <UnderwaterObject style={{ bottom: '31%', right: '3%' }}>
                    <img style={{ width: '195px', height: '195px' }} src={seaweed2} alt="Seaweed" loading="lazy" />
                </UnderwaterObject>
                
                <UnderwaterObject style={{ bottom: '34%', right: '7%' }}>
                    <img style={{ width: '220px', height: '220px', transform: 'scaleX(-1)' }} src={seaweed3} alt="Seaweed" loading="lazy" />
                </UnderwaterObject>
            </SandPlane>

        </BackgroundContainer>
    );
};

export default Background;

/* ================= Styles ================= */

// Water animation keyframes
const waterFlow = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(20px); }
`;

const waveScroll = keyframes`
  0%   { background-position: 0 0, 0 0; }
  100% { background-position: -140px 0, -80px 0; }
`;

const ripplePulse = keyframes`
  0%   { opacity: 0.30; }
  100% { opacity: 0.55; }
`;

const floatParticles = keyframes`
  0%, 100% { opacity: 0.5; transform: translateY(0) translateZ(0); }
  50% { opacity: 0.8; transform: translateY(-8px) translateZ(0); }
`;

const BackgroundContainer = styled.section`
	border: 2px solid rgba(255, 255, 255, 0.3);
  position: relative;
  width: 100%;
  height: auto;
  /* Natural content flow - no padding needed */
  --surface-h: 5vh;          /* same as your SurfaceWater height */
  --section-pad: clamp(24px, 4vw, 56px);
  
  /* CSS Variables for sand styling */
  --sand-base: #b39873;
  --sand-dark: #6e5843;
  --sand-light: #efe2cc;
`;

// Surface water - connects to ocean wall in Skills section (same animation as HarborWater)
const SurfaceWater = styled.div`
  position: absolute;
  inset: 0 auto auto 0;
  width: 100%;
  height: var(--surface-h);
  z-index: 2;
  overflow: hidden;
  
  /* Perspective transform - same as HarborWater to make it look flat/diagonal */
  transform: perspective(90px) rotateX(12deg) translateZ(0);
  transform-origin: top center;
  
  /* Water gradient - transitions from Skills ocean wall to bright underwater cyan */
  background: linear-gradient(to bottom,
    rgba(35, 95, 145, 0.75) 0%,
    rgba(45, 115, 160, 0.85) 25%,
    rgba(55, 135, 175, 0.92) 50%,
    rgba(68, 155, 188, 0.96) 75%,
    rgba(78, 170, 198, 0.98) 90%,
    rgba(85, 185, 205, 1) 100%
  );
  
  /* Horizon bloom (soft fade at the top) */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 0%, transparent 40%);
    pointer-events: none;
  }
  
  /* Shimmer stripes that move via background-position (same as HarborWater) */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
      repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.08) 0 3px, transparent 3px 42px),
      repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.05) 0 2px, transparent 2px 66px);
    mix-blend-mode: screen;
    opacity: 0.35;
    animation: ${waveScroll} 12s linear infinite;
    will-change: background-position;
  }
`;

// Ripple layer for surface water (same as HarborWater)
const SurfaceRippleLayer = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  /* Soft oval ripples at various positions */
  background:
    radial-gradient(40px 20px at 20% 35%, rgba(255, 255, 255, 0.18) 0, rgba(255, 255, 255, 0.08) 45%, transparent 70%),
    radial-gradient(55px 25px at 48% 60%, rgba(255, 255, 255, 0.14) 0, rgba(255, 255, 255, 0.07) 40%, transparent 70%),
    radial-gradient(34px 18px at 70% 45%, rgba(255, 255, 255, 0.12) 0, rgba(255, 255, 255, 0.06) 30%, transparent 70%),
    radial-gradient(45px 22px at 15% 75%, rgba(255, 255, 255, 0.16) 0, rgba(255, 255, 255, 0.07) 35%, transparent 70%),
    radial-gradient(38px 19px at 85% 65%, rgba(255, 255, 255, 0.13) 0, rgba(255, 255, 255, 0.06) 40%, transparent 70%);
  mix-blend-mode: screen;
  mask-image: linear-gradient(to bottom, black 40%, transparent 95%);
  animation: ${ripplePulse} 5s ease-in-out infinite alternate;
`;

// Unified underwater section - spans from waterline to deep ocean with continuous gradient
const UnderwaterSection = styled.div`
  position: relative;                /* was absolute */
  margin-top: var(--surface-h);      /* keep clear of the surface overlay */
  width: 100%;

  /* Let content determine height naturally - don't force min-height that creates scroll */
  min-height: auto;
  padding: 2rem 2rem 6rem 2rem;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
  /* Prevent this section from creating its own scroll context */
  overflow: visible;
  overflow-x: visible;
  overflow-y: visible;
  
  /* Subtle waterline effect at the top */
  box-shadow: 
    inset 0 8px 16px rgba(100, 180, 200, 0.15),
    inset 0 -4px 12px rgba(0, 40, 80, 0.2);
  
  /* Continuous gradient - bright cyan at surface gradually darkening to deep ocean */
  background: linear-gradient(to bottom,
    /* Shallow water - bright cyan */
    rgba(85, 185, 205, 1) 0%,
    rgba(78, 178, 198, 1) 3%,
    rgba(72, 170, 192, 1) 6%,
    rgba(66, 162, 186, 1) 9%,
    rgba(60, 154, 180, 1) 12%,
    rgba(54, 146, 174, 1) 15%,
    rgba(49, 138, 168, 1) 18%,
    rgba(44, 130, 162, 1) 21%,
    rgba(40, 122, 156, 1) 24%,
    rgba(36, 114, 150, 1) 28%,
    rgba(32, 106, 144, 1) 32%,
    rgba(29, 98, 138, 1) 36%,
    rgba(26, 90, 132, 1) 40%,
    /* Transition to deeper water */
    rgba(23, 82, 126, 1) 44%,
    rgba(20, 74, 120, 1) 48%,
    rgba(18, 66, 114, 1) 52%,
    rgba(16, 58, 108, 1) 56%,
    rgba(14, 50, 102, 1) 60%,
    rgba(12, 42, 96, 1) 64%,
    rgba(11, 40, 92, 1) 68%,
    rgba(10, 38, 88, 1) 72%,
    /* Deep ocean - sunlit blues (kept brighter) */
    rgba(10, 36, 84, 1) 75%,
    rgba(10, 35, 82, 1) 78%,
    rgba(9, 34, 80, 1) 81%,
    rgba(9, 33, 78, 1) 84%,
    rgba(9, 32, 76, 1) 86%,
    rgba(8, 31, 74, 1) 88%,
    rgba(8, 30, 72, 1) 90%,
    rgba(8, 29, 70, 1) 92%,
    rgba(8, 28, 68, 1) 93%,
    rgba(7, 28, 66, 1) 94%,
    rgba(7, 27, 64, 1) 95%,
    rgba(7, 26, 62, 1) 96%,
    rgba(7, 26, 60, 1) 97%,
    rgba(6, 25, 58, 1) 98%,
    rgba(6, 24, 56, 1) 98.5%,
    rgba(6, 24, 54, 1) 99%,
    rgba(6, 23, 52, 1) 99.3%,
    rgba(6, 22, 50, 1) 99.6%,
    rgba(5, 22, 48, 1) 99.8%,
    rgba(5, 21, 46, 1) 100%
  );
  
  /* Caustic light rays from surface - now extends smoothly down the entire section */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: 
      /* Bright light rays near surface, gradually fading */
      linear-gradient(to bottom, 
        rgba(150, 220, 240, 0.15) 0%, 
        rgba(120, 200, 220, 0.10) 10%,
        rgba(100, 180, 200, 0.06) 20%,
        rgba(80, 160, 180, 0.04) 35%,
        rgba(60, 140, 160, 0.02) 50%,
        transparent 70%
      ),
      /* Underwater ripple effect throughout */
      repeating-linear-gradient(
        90deg,
        transparent 0%,
        rgba(255, 255, 255, 0.02) 10%,
        transparent 20%
      );
    animation: ${waterFlow} 15s linear infinite reverse;
  }
  
  /* Underwater particles/bubbles - distributed across full depth */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      /* Upper zone particles */
      radial-gradient(circle at 12% 8%, rgba(255,255,255,0.2) 0%, transparent 2px),
      radial-gradient(circle at 38% 15%, rgba(255,255,255,0.15) 0%, transparent 2.5px),
      radial-gradient(circle at 65% 12%, rgba(255,255,255,0.18) 0%, transparent 2px),
      radial-gradient(circle at 85% 20%, rgba(255,255,255,0.12) 0%, transparent 1.5px),
      radial-gradient(circle at 22% 25%, rgba(255,255,255,0.16) 0%, transparent 2px),
      /* Mid zone particles */
      radial-gradient(circle at 55% 35%, rgba(255,255,255,0.14) 0%, transparent 1.8px),
      radial-gradient(circle at 78% 40%, rgba(255,255,255,0.13) 0%, transparent 2.2px),
      radial-gradient(circle at 42% 48%, rgba(255,255,255,0.17) 0%, transparent 2px),
      radial-gradient(circle at 8% 52%, rgba(255,255,255,0.11) 0%, transparent 1.5px),
      radial-gradient(circle at 68% 58%, rgba(255,255,255,0.13) 0%, transparent 2px),
      /* Lower zone particles (fewer and dimmer) */
      radial-gradient(circle at 30% 65%, rgba(255,255,255,0.10) 0%, transparent 2.5px),
      radial-gradient(circle at 90% 72%, rgba(255,255,255,0.08) 0%, transparent 2px),
      radial-gradient(circle at 15% 80%, rgba(255,255,255,0.07) 0%, transparent 1.8px),
      radial-gradient(circle at 75% 85%, rgba(255,255,255,0.06) 0%, transparent 1.5px),
      radial-gradient(circle at 45% 92%, rgba(255,255,255,0.05) 0%, transparent 1.5px);
    animation: ${floatParticles} 15s ease-in-out infinite;
    transform: translateZ(0);
    will-change: transform, opacity;
  }
  
  /* Pause animations during loading */
  [data-loading="true"] &::after {
    animation-play-state: paused;
  }
`;


// Underwater header section
const UnderwaterHeader = styled.div`
  position: relative;
  width: 100%;
  margin-top: 3rem;
  text-align: center;
  z-index: 10;
  flex-shrink: 0;
  
  /* Subtle glow effect */
  filter: drop-shadow(0 4px 12px rgba(120, 200, 220, 0.3));
`;

const HeaderTitle = styled.h1`
  font-size: clamp(2.5rem, 5vw, 5rem);
  font-weight: 900;
  margin: 0;
  
  /* Underwater text effect - bright cyan with glow */
  background: linear-gradient(135deg, 
    rgba(150, 220, 240, 1) 0%,
    rgba(100, 200, 230, 1) 30%,
    rgba(120, 210, 235, 1) 60%,
    rgba(160, 230, 245, 1) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  /* Bright glow like light through water */
  text-shadow: 
    0 0 20px rgba(120, 200, 220, 0.6),
    0 0 40px rgba(100, 180, 210, 0.4),
    0 4px 8px rgba(0, 60, 100, 0.3);
  
  /* Subtle floating animation - GPU accelerated */
  animation: floatTitle 4s ease-in-out infinite;
  transform: translateZ(0);
  will-change: transform;
  
  @keyframes floatTitle {
    0%, 100% { transform: translateY(0px) translateZ(0); }
    50% { transform: translateY(-8px) translateZ(0); }
  }
  
  /* Pause animations during loading */
  [data-loading="true"] & {
    animation-play-state: paused;
  }
  
  @media (max-width: 1800px) {
    font-size: clamp(2.2rem, 4.5vw, 4.2rem);
  }
  
  @media (max-width: 1600px) {
    font-size: clamp(2rem, 4vw, 3.5rem);
  }
  
  @media (max-width: 1200px) {
    font-size: clamp(1.8rem, 3.5vw, 2.8rem);
  }
`;

const HeaderSubtitle = styled.h2`
  font-size: clamp(1.1rem, 2vw, 1.8rem);
  font-weight: 400;
  font-style: italic;
  margin: 0;
  
  /* Softer cyan color */
  color: rgba(180, 230, 245, 0.9);
  
  /* Subtle glow */
  text-shadow: 
    0 2px 8px rgba(120, 200, 220, 0.5),
    0 4px 16px rgba(80, 160, 190, 0.3);
  
  /* Slightly offset floating animation - GPU accelerated */
  animation: floatSubtitle 4s ease-in-out infinite;
  animation-delay: 0.5s;
  transform: translateZ(0);
  will-change: transform, opacity;
  
  @keyframes floatSubtitle {
    0%, 100% { transform: translateY(0px) translateZ(0); opacity: 0.9; }
    50% { transform: translateY(-6px) translateZ(0); opacity: 1; }
  }
  
  /* Pause animations during loading */
  [data-loading="true"] & {
    animation-play-state: paused;
  }
  
  @media (max-width: 1600px) {
    font-size: clamp(1rem, 1.8vw, 1.3rem);
  }
`;

// Float animation for cards - GPU accelerated
const floatCard = keyframes`
  0%, 100% { transform: translateY(0px) translateZ(0); }
  50% { transform: translateY(-5px) translateZ(0); }
`;

// Profile section - flex container
const ProfileSection = styled.div`
  width: clamp(85%, 90vw, 90%);
  margin: clamp(1.5rem, 2vw, 2rem) auto 0;
  display: flex;
  gap: clamp(1rem, 2vw, 2rem);
  align-items: flex-start;
  z-index: 10;
  
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
    flex-direction: column;
    align-items: center;
    margin-top: clamp(1.5rem, 2vw, 2rem);
    width: 95%;
  }
  
  @media (max-width: 900px) {
    width: 98%;
  }
`;

// Left section - 1/3 width for image and bubbles
const ImageSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 1rem;
  min-width: 0; /* Allow flex item to shrink below content size */
  gap: 0;
  
  @media (max-width: 1200px) {
    flex: 0 0 auto;
    width: 100%;
    max-width: 400px;
  }
`;

const ProfileImageFrame = styled.div`
  position: relative;
  width: 90%;
  max-width: 450px;
  aspect-ratio: 1;
  border-radius: 50%;
  padding: 8px;
  flex-shrink: 0;
  
  /* Glassmorphism border effect */
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.2) 0%,
    rgba(255, 255, 255, 0.05) 50%,
    rgba(100, 180, 200, 0.15) 100%
  );
  backdrop-filter: blur(10px);
  box-shadow: 
    0 8px 32px rgba(31, 38, 135, 0.37),
    inset 0 2px 8px rgba(255, 255, 255, 0.15),
    0 0 40px rgba(100, 200, 220, 0.2);
  
  /* Subtle glow effect */
  &::before {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    background: linear-gradient(
      135deg,
      rgba(150, 220, 240, 0.3) 0%,
      rgba(100, 200, 230, 0.2) 50%,
      rgba(80, 180, 210, 0.3) 100%
    );
    z-index: -1;
    filter: blur(12px);
    opacity: 0.6;
  }
  
  /* Floating animation */
  animation: ${floatCard} 6s ease-in-out infinite;
  
  @media (max-width: 1200px) {
    width: 80%;
    max-width: 280px;
  }
  
  @media (max-width: 600px) {
    width: 65%;
    max-width: 250px;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  display: block;
`;

// Social bubbles container - fills bottom half of left column
const SocialBubblesContainer = styled.div`
  position: relative;
  width: 100%;
  flex: 1;
  min-height: 350px;
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 2rem;
  
  @media (max-width: 1200px) {
    min-height: 300px;
    margin-top: 1.5rem;
  }
  
  @media (max-width: 600px) {
    min-height: 280px;
    margin-top: 1rem;
  }
`;

// Floating bubble animation - smooth rising motion, GPU accelerated
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

// Individual social bubble - glossy underwater bubble effect
const SocialBubble = styled.a`
  position: absolute;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  text-decoration: none;
  
  /* Glossy glassmorphic bubble effect */
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.25) 0%,
    rgba(255, 255, 255, 0.12) 50%,
    rgba(150, 220, 240, 0.18) 100%
  );
  backdrop-filter: blur(12px);
  
  /* Multiple layered shadows for depth */
  box-shadow: 
    /* Inner highlight - glossy shine */
    inset -4px -4px 12px rgba(255, 255, 255, 0.4),
    inset 4px 4px 12px rgba(100, 180, 200, 0.2),
    /* Outer glow */
    0 8px 32px rgba(100, 200, 220, 0.3),
    /* Depth shadow */
    0 4px 16px rgba(31, 38, 135, 0.4);
  
  /* Icon color */
  color: rgba(220, 240, 255, 0.95);
  
  /* Glossy highlight overlay */
  &::before {
    content: '';
    position: absolute;
    top: 8%;
    left: 15%;
    width: 45%;
    height: 45%;
    border-radius: 50%;
    background: radial-gradient(
      circle at 30% 30%,
      rgba(255, 255, 255, 0.6) 0%,
      rgba(255, 255, 255, 0.3) 40%,
      transparent 70%
    );
    filter: blur(3px);
    pointer-events: none;
  }
  
  /* Bottom shadow inside bubble */
  &::after {
    content: '';
    position: absolute;
    bottom: 12%;
    left: 20%;
    width: 60%;
    height: 30%;
    border-radius: 50%;
    background: radial-gradient(
      ellipse at center,
      rgba(0, 40, 80, 0.2) 0%,
      transparent 70%
    );
    filter: blur(4px);
    pointer-events: none;
  }
  
  /* GPU acceleration - applied to all bubbles */
  transform: translateZ(0);
  will-change: transform;
  
  /* Vertical positioning - bubbles rising from bottom to top */
  /* Smallest bubble at bottom (LinkedIn) */
  &:nth-child(1) {
    left: 45%;
    bottom: 5%;
    width: 70px;
    height: 70px;
    animation: ${floatBubble} 7s ease-in-out infinite;
    animation-delay: ${props => props.delay}s;
  }
  
  /* Second bubble (GitHub) */
  &:nth-child(2) {
    left: 55%;
    bottom: 28%;
    width: 80px;
    height: 80px;
    animation: ${floatBubble} 7.5s ease-in-out infinite;
    animation-delay: ${props => props.delay}s;
  }
  
  /* Third bubble (Instagram) */
  &:nth-child(3) {
    left: 40%;
    bottom: 52%;
    width: 88px;
    height: 88px;
    animation: ${floatBubble} 7.2s ease-in-out infinite;
    animation-delay: ${props => props.delay}s;
  }
  
  /* Largest bubble at top (Resume) */
  &:nth-child(4) {
    left: 48%;
    bottom: 78%;
    width: 96px;
    height: 96px;
    animation: ${floatBubble} 8s ease-in-out infinite;
    animation-delay: ${props => props.delay}s;
  }
  
  /* Pause animations during loading */
  [data-loading="true"] & {
    animation-play-state: paused;
  }
  
  /* Hover effects */
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-10px) scale(1.15) translateZ(0);
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.35) 0%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(150, 220, 240, 0.28) 100%
    );
    border-color: rgba(255, 255, 255, 0.5);
    box-shadow: 
      inset -4px -4px 16px rgba(255, 255, 255, 0.5),
      inset 4px 4px 16px rgba(100, 180, 200, 0.3),
      0 12px 48px rgba(120, 220, 240, 0.5),
      0 6px 24px rgba(31, 38, 135, 0.5);
    color: rgba(255, 255, 255, 1);
  }
  
  /* Icon sizing - scales with bubble size */
  svg {
    position: relative;
    z-index: 1;
    filter: drop-shadow(0 2px 4px rgba(0, 40, 80, 0.3));
    transition: transform 0.3s ease;
  }
  
  /* Scale icons proportionally to bubble size */
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
  
  @media (max-width: 1200px) {
    /* Proportionally scale down all bubbles */
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
    /* Further scale down for mobile */
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
`;

const InfoGridSection = styled.div`
  flex: 3;
  min-width: 0; /* Allow flex items to shrink */
  padding-bottom: var(--section-pad);   /* bottom breathing room */
  
  @media (max-width: 1200px) {
    flex: 0 0 auto;
    width: 100%;
  }
`;

// 3x2 Grid of cards
const InfoGrid = styled.div`

  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-auto-rows: minmax(300px, auto);     /* Allow cards to grow based on content */
  gap: clamp(1rem, 1.5vw, 1.5rem);
  align-items: stretch;    /* Stretch cards to fill grid cells */
  
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
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: clamp(1rem, 1.5vw, 1.5rem);
    grid-auto-rows: minmax(280px, auto);
  }
  
  @media (max-width: 900px) {
    grid-auto-rows: minmax(260px, auto);
  }
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    grid-auto-rows: minmax(240px, auto);
  }
`;

// Individual glassmorphism card
const GlassCard = styled.article`
  align-self: stretch;     /* Stretch to fill grid cell height */
  min-height: 100%;
  position: relative;
  padding: clamp(0.9rem, 1.2vw, 1.25rem);
  border-radius: clamp(16px, 2vw, 20px);
  overflow: visible; /* Allow bubble to overflow */
  min-width: 0; /* Allow flex/grid items to shrink */
  display: flex;
  flex-direction: column;
  
  @media (max-width: 1600px) {
    padding: clamp(0.65rem, 0.85vw, 0.85rem);
    border-radius: clamp(14px, 1.8vw, 18px);
  }
  
  @media (max-width: 1200px) {
    padding: clamp(0.6rem, 0.8vw, 0.75rem);
    border-radius: clamp(12px, 1.6vw, 16px);
  }
  
  /* Glassmorphism effect */
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.05) 100%
  );
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 
    0 8px 32px rgba(31, 38, 135, 0.37),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  
  /* GPU acceleration for smooth animations */
  transform: translateZ(0);
  will-change: transform;
  
  /* Subtle glow on hover */
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
  
  &:hover {
    transform: translateY(-5px) translateZ(0);
    box-shadow: 
      0 12px 40px rgba(31, 38, 135, 0.5),
      inset 0 1px 0 rgba(255, 255, 255, 0.3),
      0 0 30px rgba(100, 200, 220, 0.3);
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.15) 0%,
      rgba(255, 255, 255, 0.08) 100%
    );
  }
  
  /* Staggered floating animation - GPU accelerated */
  &:nth-child(1) { 
    animation: ${floatCard} 6s ease-in-out infinite;
    transform: translateZ(0);
    will-change: transform;
  }
  &:nth-child(2) { 
    animation: ${floatCard} 6s ease-in-out 0.5s infinite;
    transform: translateZ(0);
    will-change: transform;
  }
  &:nth-child(3) { 
    animation: ${floatCard} 6s ease-in-out 1s infinite;
    transform: translateZ(0);
    will-change: transform;
  }
  &:nth-child(4) { 
    animation: ${floatCard} 6s ease-in-out 1.5s infinite;
    transform: translateZ(0);
    will-change: transform;
  }
  &:nth-child(5) { 
    animation: ${floatCard} 6s ease-in-out 2s infinite;
    transform: translateZ(0);
    will-change: transform;
  }
  &:nth-child(6) { 
    animation: ${floatCard} 6s ease-in-out 2.5s infinite;
    transform: translateZ(0);
    will-change: transform;
  }
  
  /* Pause animations during loading */
  [data-loading="true"] & {
    animation-play-state: paused;
  }
`;

// Card title
const CardTitle = styled.h3`
  font-size: clamp(1.2rem, 1.8vw, 1.75rem);
  font-weight: 700;
  margin: 0 0 clamp(0.3rem, 0.5vw, 0.5rem) 0;
  text-align: center;
  word-wrap: break-word;
  overflow-wrap: break-word;
  
  /* Gradient text */
  background: linear-gradient(135deg, 
    rgba(200, 230, 245, 1) 0%,
    rgba(150, 210, 230, 1) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  /* Subtle glow */
  text-shadow: 0 2px 8px rgba(120, 200, 220, 0.3);
  
  @media (max-width: 1600px) {
    font-size: clamp(0.95rem, 1.3vw, 1.2rem);
    margin: 0 0 clamp(0.25rem, 0.4vw, 0.4rem) 0;
  }
  
  @media (max-width: 1200px) {
    font-size: clamp(0.9rem, 1.2vw, 1.1rem);
    margin: 0 0 clamp(0.2rem, 0.35vw, 0.35rem) 0;
  }
`;

// Card text - for cards with structured content (Education, Mantras, Music)
const CardText = styled.p`
  font-size: clamp(0.75rem, 0.95vw, 0.9rem);
  line-height: 1.6;
  margin: 0;
  padding: 0 clamp(0.75rem, 1.2vw, 1.5rem);
  text-align: justify;
  color: rgba(220, 240, 250, 0.85);
  word-wrap: break-word;
  overflow-wrap: break-word;
  flex: 1;
  display: flex;
  align-items: center;
  
  /* Subtle text shadow for readability */
  text-shadow: 0 1px 3px rgba(0, 40, 80, 0.3);
  
  @media (max-width: 1600px) {
    font-size: clamp(0.65rem, 0.8vw, 0.75rem);
    line-height: 1.45;
    padding: 0 clamp(0.5rem, 0.85vw, 1rem);
    margin: 0;
  }
  
  @media (max-width: 1200px) {
    font-size: clamp(0.6rem, 0.75vw, 0.7rem);
    line-height: 1.4;
    padding: 0 clamp(0.4rem, 0.75vw, 0.85rem);
  }
`;

// Card text large - for cards with just text content (Always Active, Being Creative, Goals)
// These cards need larger text to fill the space better
const CardTextLarge = styled.p`
  font-size: clamp(0.9rem, 1.15vw, 1.05rem);
  line-height: 1.65;
  margin: 0;
  padding: 0 0.75rem;
  text-align: justify;
  color: rgba(220, 240, 250, 0.85);
  word-wrap: break-word;
  overflow-wrap: break-word;
  flex: 1;
  display: flex;
  align-items: center;
  
  /* Subtle text shadow for readability */
  text-shadow: 0 1px 3px rgba(0, 40, 80, 0.3);
  
  @media (max-width: 1600px) {
    font-size: clamp(0.8rem, 1vw, 0.95rem);
    line-height: 1.55;
    padding: 0 clamp(0.6rem, 1vw, 1.1rem);
    margin: 0;
  }
  
  @media (max-width: 1200px) {
    font-size: clamp(0.75rem, 0.9vw, 0.85rem);
    line-height: 1.5;
    padding: 0 clamp(0.5rem, 0.85vw, 1rem);
  }
`;

// Emoji row container
const EmojiRow = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: auto;         /* Push to bottom of card */
  padding-top: 0.75rem;
  justify-content: center;
  opacity: 0.95;
  filter: drop-shadow(0 2px 8px rgba(120, 200, 220, 0.35));
  
  @media (max-width: 1600px) {
    gap: clamp(0.35rem, 0.5vw, 0.45rem);
    padding-top: clamp(0.5rem, 0.7vw, 0.65rem);
  }
  
  @media (max-width: 1200px) {
    gap: clamp(0.3rem, 0.45vw, 0.4rem);
    padding-top: clamp(0.45rem, 0.6vw, 0.6rem);
  }
`;

// Individual emoji bubble
const Emoji = styled.span`
  display: inline-grid;
  place-items: center;
  width: 1.9rem;
  height: 1.9rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.18);
  font-size: 1.1rem;
  transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px) scale(1.06);
    background: rgba(255, 255, 255, 0.14);
    border-color: rgba(255, 255, 255, 0.28);
  }
  
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
`;

// Wrapper for all mantras to center them
const MantrasWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 0.25rem;
  
  @media (max-width: 1600px) {
    gap: clamp(0.35rem, 0.45vw, 0.4rem);
  }
  
  @media (max-width: 1200px) {
    gap: clamp(0.3rem, 0.4vw, 0.35rem);
  }
`;

// Mantra text container with reduced spacing - uses larger text like CardTextLarge
const MantraText = styled.div`
  font-size: 0.95rem;
  line-height: 1.65;
  text-align: justify;
  padding: 0 clamp(0.75rem, 1.2vw, 1.5rem);
  color: rgba(220, 240, 250, 0.85);
  word-wrap: break-word;
  overflow-wrap: break-word;
  text-shadow: 0 1px 3px rgba(0, 40, 80, 0.3);
  
  @media (max-width: 1600px) {
    font-size: clamp(0.8rem, 1vw, 0.9rem);
    line-height: 1.55;
  }
  
  @media (max-width: 1200px) {
    font-size: clamp(0.75rem, 0.9vw, 0.85rem);
    line-height: 1.5;
  }
`;

// Highlighted mantra titles
const MantraHighlight = styled.div`
  display: block;
  font-weight: 800;
  font-size: 1rem;
  margin-bottom: clamp(0.2rem, 0.3vw, 0.25rem);
  text-align: center;
  background: linear-gradient(135deg, 
    rgba(255, 235, 120, 1) 0%,
    rgba(255, 200, 100, 1) 50%,
    rgba(255, 180, 90, 1) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 0.3px;
  text-shadow: 0 2px 8px rgba(255, 200, 100, 0.4);
  
  @media (max-width: 1600px) {
    font-size: clamp(0.8rem, 0.95vw, 0.9rem);
  }
  
  @media (max-width: 1200px) {
    font-size: clamp(0.75rem, 0.9vw, 0.85rem);
  }
`;

// Wrapper for music content to center it
const MusicWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: start;
`;

// Music intro text - matches CardText styling
const MusicIntroText = styled.p`
  font-size: clamp(0.75rem, 0.95vw, 0.9rem);
  line-height: 1.6;
  margin: 0 0 clamp(0.4rem, 0.6vw, 0.5rem) 0;
  padding: 0 clamp(0.75rem, 1.2vw, 1.5rem);
  text-align: justify;
  color: rgba(220, 240, 250, 0.85);
  word-wrap: break-word;
  overflow-wrap: break-word;
  
  /* Subtle text shadow for readability */
  text-shadow: 0 1px 3px rgba(0, 40, 80, 0.3);
  
  @media (max-width: 1600px) {
    font-size: clamp(0.65rem, 0.8vw, 0.75rem);
    line-height: 1.45;
    padding: 0 clamp(0.5rem, 0.85vw, 1rem);
    margin: 0 0 clamp(0.3rem, 0.45vw, 0.4rem) 0;
  }
  
  @media (max-width: 1200px) {
    font-size: clamp(0.6rem, 0.75vw, 0.7rem);
    line-height: 1.4;
    padding: 0 clamp(0.4rem, 0.75vw, 0.85rem);
    margin: 0 0 clamp(0.25rem, 0.4vw, 0.35rem) 0;
  }
`;

// Artist grid for music card
const ArtistGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(0.4rem, 0.6vw, 0.5rem);
  margin-top: clamp(0.4rem, 0.6vw, 0.5rem);
  
  @media (max-width: 1600px) {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: clamp(0.3rem, 0.45vw, 0.4rem);
    margin-top: clamp(0.3rem, 0.45vw, 0.4rem);
  }
  
  @media (max-width: 1200px) {
    gap: clamp(0.25rem, 0.4vw, 0.35rem);
    margin-top: clamp(0.25rem, 0.4vw, 0.35rem);
  }
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

// Individual artist name
const ArtistName = styled.div`
  font-size: clamp(0.7rem, 0.9vw, 0.875rem);
  padding: clamp(0.1rem, 0.2vw, 0.15rem) clamp(0.4rem, 0.6vw, 0.5rem);
  text-align: center;
  border-radius: clamp(10px, 1.2vw, 12px);
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(200, 230, 245, 0.9);
  transition: all 0.2s ease;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
  
  &:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(255, 255, 255, 0.25);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(100, 200, 220, 0.2);
    white-space: normal;
    overflow: visible;
  }
  
  @media (max-width: 1600px) {
    font-size: clamp(0.65rem, 0.8vw, 0.8rem);
  }
  
  @media (max-width: 1200px) {
    font-size: clamp(0.6rem, 0.75vw, 0.75rem);
  }
`;

// Date text (slightly muted)
const CardDate = styled.span`
  display: inline-block;
  font-size: clamp(0.75rem, 0.9vw, 0.85rem);
  font-style: italic;
  line-height: 1.1;
  color: rgba(180, 220, 240, 0.85);
  margin: 0;
  
  @media (max-width: 1600px) {
    font-size: clamp(0.65rem, 0.75vw, 0.7rem);
  }
  
  @media (max-width: 1200px) {
    font-size: clamp(0.6rem, 0.7vw, 0.65rem);
  }
`;

// Detail text (for additional info)
const CardDetail = styled.span`
  display: inline-block;
  font-size: 0.9rem;
  color: rgba(200, 230, 245, 0.8);
  margin: 0.25rem 0;
`;

/* ================= Education Card Specific Styles ================= */

// Container for education card content
const EducationContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0;
  flex: 1;                  /* Take remaining space */
  justify-content: space-between;
  
  @media (max-width: 1600px) {
    gap: clamp(0.5rem, 0.7vw, 0.6rem);
  }
  
  @media (max-width: 1200px) {
    gap: clamp(0.45rem, 0.6vw, 0.55rem);
  }
`;

// Degree section
const DegreeSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  
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
  font-size: clamp(1rem, 1.3vw, 1.2rem);
  font-weight: 700;
  margin: 0;
  line-height: 1.2;
  background: linear-gradient(135deg, 
    rgba(230, 245, 255, 1) 0%,
    rgba(180, 220, 240, 1) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
  
  @media (max-width: 1600px) {
    font-size: clamp(0.85rem, 1vw, 0.95rem);
  }
  
  @media (max-width: 1200px) {
    font-size: clamp(0.8rem, 0.95vw, 0.9rem);
  }
`;

const UniversityName = styled.p`
  font-size: clamp(0.85rem, 1vw, 1rem);
  margin: 0;
  line-height: 1.2;
  color: rgba(200, 230, 245, 0.85);
  text-align: center;
  
  @media (max-width: 1600px) {
    font-size: clamp(0.7rem, 0.85vw, 0.8rem);
  }
  
  @media (max-width: 1200px) {
    font-size: clamp(0.65rem, 0.8vw, 0.75rem);
  }
`;

// Info row with duration and GPA
const InfoRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
  
  @media (max-width: 1600px) {
    gap: clamp(0.9rem, 1.1vw, 1rem);
  }
  
  @media (max-width: 1200px) {
    gap: clamp(0.8rem, 1vw, 0.9rem);
  }
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.15rem;
  
  @media (max-width: 1600px) {
    gap: clamp(0.1rem, 0.12vw, 0.12rem);
  }
  
  @media (max-width: 1200px) {
    gap: clamp(0.08rem, 0.1vw, 0.1rem);
  }
`;

const InfoLabel = styled.span`
  font-size: clamp(0.65rem, 0.8vw, 0.75rem);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: rgba(150, 200, 220, 0.7);
  font-weight: 600;
  
  @media (max-width: 1600px) {
    font-size: clamp(0.6rem, 0.7vw, 0.65rem);
  }
  
  @media (max-width: 1200px) {
    font-size: clamp(0.55rem, 0.65vw, 0.6rem);
  }
`;

const InfoDivider = styled.div`
  width: 1px;
  height: 22px;
  background: linear-gradient(to bottom, 
    transparent 0%,
    rgba(255, 255, 255, 0.3) 50%,
    transparent 100%
  );
`;

const GPAText = styled.span`
  font-size: clamp(0.95rem, 1.2vw, 1.1rem);
  font-weight: 700;
  color: rgba(150, 220, 240, 1);
  text-shadow: 0 2px 8px rgba(120, 200, 220, 0.4);
  
  @media (max-width: 1600px) {
    font-size: clamp(0.9rem, 1.1vw, 1rem);
  }
  
  @media (max-width: 1200px) {
    font-size: clamp(0.85rem, 1vw, 0.95rem);
  }
`;

// Clubs section
const ClubsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  @media (max-width: 1600px) {
    gap: clamp(0.35rem, 0.45vw, 0.4rem);
  }
  
  @media (max-width: 1200px) {
    gap: clamp(0.3rem, 0.4vw, 0.35rem);
  }
`;

const ClubsLabel = styled.span`
  font-size: clamp(0.7rem, 0.85vw, 0.8rem);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: rgba(150, 200, 220, 0.8);
  font-weight: 600;
  text-align: center;
  margin-bottom: 0.125rem;
  
  @media (max-width: 1600px) {
    font-size: clamp(0.6rem, 0.7vw, 0.65rem);
  }
  
  @media (max-width: 1200px) {
    font-size: clamp(0.55rem, 0.65vw, 0.6rem);
  }
`;

const ClubsList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  
  @media (max-width: 1600px) {
    gap: clamp(0.35rem, 0.45vw, 0.4rem);
  }
  
  @media (max-width: 1200px) {
    gap: clamp(0.3rem, 0.4vw, 0.35rem);
  }
`;

const ClubItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.4rem 0.5rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(100, 200, 220, 0.2);
  }
  
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
  width: 28px;
  height: 28px;
  object-fit: contain;
  border-radius: 6px;
  padding: 3px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  flex-shrink: 0;
`;

const ClubName = styled.span`
  font-size: clamp(0.75rem, 0.9vw, 0.85rem);
  font-weight: 500;
  color: rgba(200, 230, 245, 0.9);
  letter-spacing: 0.3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  @media (max-width: 1600px) {
    font-size: clamp(0.65rem, 0.75vw, 0.7rem);
  }
  
  @media (max-width: 1200px) {
    font-size: clamp(0.6rem, 0.7vw, 0.65rem);
  }
`;

/* ================= Footer Styles (integrated into About) ================= */

// Sand plane - natural content flow component (like a paragraph block)
const SandPlane = styled.div`
    height: 30vh;             /* Simple flat height */
    width: 100%;
    position: relative;        /* Natural flow - sits below UnderwaterSection like normal content */
    z-index: 2;               /* Above UnderwaterSection (z-index: 1) */

    background: linear-gradient(
        to bottom,
        #7b654d 0%,
        #8a7157 20%,
        #9a7f61 40%,
        #b39873 70%,
        #c2a680 100%
    );

    &::before {
        content: "";
        position: absolute;
        inset: 0;
        /* DRAMATIC hills and valleys - MAXIMUM contrast for 3D terrain */
        background:
            /* Depth gradient - darker toward bottom (farther away) */
            linear-gradient(
                to bottom,
                rgba(0,0,0,0) 0%,
                rgba(0,0,0,0.06) 35%,
                rgba(0,0,0,0.14) 65%,
                rgba(0,0,0,0.22) 100%
            ),
            
            /* Large raised mounds (BRIGHT highlights) - MAXIMUM contrast */
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
            
            /* Deep valleys (DARK shadows) - DRAMATIC depth */
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
            
            /* Medium ridges for more detail */
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
        
        filter: blur(9px);
        mix-blend-mode: overlay;
        pointer-events: none;
    }

    &::after {
        content: "";
        position: absolute;
        inset: 0;
        /* Subtle sandy grain texture */
        background-image:
            radial-gradient(circle, rgba(255, 255, 255, 0.08) 25%, transparent 60%),
            radial-gradient(circle, rgba(0, 0, 0, 0.06) 25%, transparent 60%);
        background-size: 2px 2px, 2.5px 2.5px;
        background-position: 0 0, 1px 1px;
        opacity: 0.35;
        filter: blur(0.3px);
        mix-blend-mode: soft-light;
        pointer-events: none;
    }
`;

// Rock pile component - positioned relative to SandPlane
const UnderwaterObject = styled.div`
    position: absolute;
    bottom: 0;                /* Base positioning from bottom of SandPlane */
    z-index: 25;               /* Above sand plane and all other content */
    overflow: visible;         /* ensure no clipping of large images */
    pointer-events: none;      /* allow clicks to pass through */
    
    /* Subtle underwater glow effect */
    filter: drop-shadow(0 4px 12px rgba(0, 40, 80, 0.3));
    
    /* Allow images inside to receive pointer events */
    img {
        pointer-events: auto;
        display: block;
    }
`;

// Sand Text/Icon Overlay - positioned relative to SandPlane
const SandTextLayer = styled.div`
    position: absolute;
    bottom: 0;                 /* Base from bottom of SandPlane */
    left: 0;
    width: 100%;
    pointer-events: none;
	height: 30vh;
    z-index: 15;               /* above sand, below rocks */
    
`;

/* Reusable engraved sand text */
const SandText = styled.div`
    position: absolute;
    white-space: nowrap;
    letter-spacing: 0.04em;
    color: var(--sand-dark);
    text-shadow: -1px -1px 0 rgba(255, 255, 255, 0.2);
`;

/* "Drawn in sand" icons */
const SandIconWrap = styled.div`
    position: absolute;
    transform: translateX(-50%);
    pointer-events: none;
`;

const SandIcon = styled.svg`
    display: block;
    fill: none;
    stroke: var(--sand-dark);
    stroke-width: 2.25;
    stroke-linecap: round;
    stroke-linejoin: round;
    filter:
        drop-shadow(-1px -1px 0 var(--sand-light))
        drop-shadow( 1px  1px 0 rgba(0,0,0,0.28));
    
    @media (max-width: 700px) {
        stroke-width: 2.6;
    }
`;

// Rocket container (back to top button) - positioned relative to SandPlane
const RocketContainer = styled.div`
    position: absolute;
    bottom: 0;                 /* Base from bottom of SandPlane */
    z-index: 25;               /* Same as UnderwaterObject */
    overflow: visible;
    cursor: pointer;
    pointer-events: auto;
    transition: transform 0.3s ease;
    
    &:hover {
        transform: translateY(-15px);
    }
`;

// Rocket image with hover effects
const RocketImage = styled.img`
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    filter: drop-shadow(0 4px 12px rgba(0, 40, 80, 0.3));
`;

// Made with Love container - positioned relative to SandPlane
const MadeWithLoveContainer = styled.div`
    position: absolute;
    bottom: 1rem;                /* Position from bottom of SandPlane */
    left: 2.5%;
    display: flex;
    align-items: center;
    gap: 0.3rem;
    z-index: 30;                /* Above everything */
    pointer-events: none;
    color: rgba(255, 255, 255, 0.7);
    font-size: 2rem;
    
    @media (max-width: 1200px) {
        font-size: 1.5rem;
    }
`;

// Heart emoji - stands up straight without sand effect
const HeartEmoji = styled.span`
    font-size: 2rem;
    display: inline-block;
    animation: heartbeat 2s ease-in-out infinite;
    
    @keyframes heartbeat {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
`;

// Copyright container - positioned relative to SandPlane
const CopyrightContainer = styled.div`
    position: absolute;
    bottom: 1rem;                /* Position from bottom of SandPlane */
    right: 2.5%;
    display: flex;
    align-items: center;
    gap: 0.3rem;
    z-index: 30;                /* Above everything */
    pointer-events: none;
    font-size: 1.2rem;
    color: rgba(255, 255, 255, 0.7);
    
    @media (max-width: 1200px) {
        font-size: 1rem;
    }
`;
