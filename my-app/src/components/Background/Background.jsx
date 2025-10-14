import React from 'react';
import styled, { keyframes } from 'styled-components';
import meImage from '../../images/about/me.jpg';
import shpeLogo from '../../images/about/shpe.png';
import knightHacksLogo from '../../images/about/knightshacks.png';
import aiUcfLogo from '../../images/about/aiucf.png';
import ieeeLogo from '../../images/about/ieee.png';
import acmLogo from '../../images/about/acm.png';
import ReactionBubble from './ReactionBubble';

const Background = () => {
    return (
        <BackgroundContainer>
            {/* Surface water layer - connects to Skills ocean wall */}
            <SurfaceWater>
                <SurfaceRippleLayer />
            </SurfaceWater>
            
            {/* Unified underwater section - continuous gradient from shallow to deep */}
            <UnderwaterSection>
                {/* Underwater header */}
                <UnderwaterHeader>
                    <HeaderTitle>About Me</HeaderTitle>
                    <HeaderSubtitle>Dive into my background</HeaderSubtitle>
                </UnderwaterHeader>
                
                {/* Profile section with image and info cards */}
                <ProfileSection>
                    {/* Left side - Circular profile image */}
                    <ImageSection>
                        <ProfileImageFrame>
                            <ProfileImage src={meImage} alt="Colin Kirby" />
                        </ProfileImageFrame>
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
                                <CardText style={{ padding: '0rem 1.5rem', fontSize: '1.05rem' }}>
                                    Grew up playing basketball, football, baseball, and lacrosse. Rowed competitively in high school. Started lifting in college to manage stress and stay grounded. Now I rotate between the gym, skateboarding, and golf.
                                </CardText>
                                
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
                                <CardText style={{ padding: '0rem 1.5rem', fontSize: '1.05rem' }}>
                                  I grew up drawing. Lately I'm learning music, mostly guitar and piano, with production next. Design is my favorite part of projects, if you couldn't tell by the "unique" theming of this site. Art is as much a part of my life as staying active.
                                </CardText>
 
                                
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
                                <CardText style={{ padding: '0rem 1.5rem', fontSize: '1.05rem' }}>
                                  I want to work for myself and blend technical work with creativity. I like fast paced startup environments where I can grow. My sweet spot is collaboration, creativity, and hard technical problems. Most of all I just want to keep improving and enjoy the process.
                                </CardText>

                                
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
                                    <CardText>
                                        I feel you can tell a lot about a person by their music. Here's my top 10 from the last 6 months:
                                    </CardText>
                                    
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
  0%, 100% { opacity: 0.5; transform: translateY(0); }
  50% { opacity: 0.8; transform: translateY(-8px); }
`;

const BackgroundContainer = styled.section`
  position: relative;
  width: 100%;
  min-height: 100dvh;         /* at least full screen */
  overflow-x: clip;            /* prevent sideways jiggle */
  overflow-y: visible;         /* allow vertical growth */
  --surface-h: 5vh;          /* same as your SurfaceWater height */
  --section-pad: clamp(24px, 4vw, 56px);
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

  /* grow with content but still cover a full screen if short */
  min-height: calc(100dvh - var(--surface-h));
  padding: var(--section-pad) 0 calc(var(--section-pad) * 1.5);
  
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
  
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
  font-size: 5rem;
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
  
  /* Subtle floating animation */
  animation: floatTitle 4s ease-in-out infinite;
  
  @keyframes floatTitle {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
  }
  
  @media (max-width: 1600px) {
    font-size: 3.5rem;
  }
`;

const HeaderSubtitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 400;
  font-style: italic;
  margin: 0;
  
  /* Softer cyan color */
  color: rgba(180, 230, 245, 0.9);
  
  /* Subtle glow */
  text-shadow: 
    0 2px 8px rgba(120, 200, 220, 0.5),
    0 4px 16px rgba(80, 160, 190, 0.3);
  
  /* Slightly offset floating animation */
  animation: floatSubtitle 4s ease-in-out infinite;
  animation-delay: 0.5s;
  
  @keyframes floatSubtitle {
    0%, 100% { transform: translateY(0px); opacity: 0.9; }
    50% { transform: translateY(-6px); opacity: 1; }
  }
  
  @media (max-width: 1600px) {
    font-size: 1.3rem;
  }
`;

// Float animation for cards
const floatCard = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
`;

// Profile section - flex container
const ProfileSection = styled.div`
  width: 90%;
  margin: 2rem auto 0;
  display: flex;
  gap: clamp(1rem, 2vw, 2rem);
  align-items: flex-start;
  z-index: 10;
  
  @media (max-width: 1400px) {
    width: 90%;
  }
  
  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
    margin-top: 2rem;
  }
`;

// Left section - 1/3 width for image
const ImageSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  min-width: 0; /* Allow flex item to shrink below content size */
  
  @media (max-width: 1200px) {
    flex: 0 0 auto;
    width: 100%;
    max-width: 400px;
  }
`;

const ProfileImageFrame = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  border-radius: 50%;
  padding: 8px;
  
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
    max-width: 300px;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  display: block;
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
  grid-auto-rows: 1fr;     /* Make all rows equal height */
  gap: 1.5rem;
  align-items: stretch;    /* Stretch cards to fill grid cells */
  
  @media (max-width: 1400px) {
    gap: 1.25rem;
  }
  
  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.5rem;
  }
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

// Individual glassmorphism card
const GlassCard = styled.article`
  align-self: stretch;     /* Stretch to fill grid cell height */
  height: 100%;
  position: relative;
  padding: 1.25rem 1.25rem;
  border-radius: 20px;
  overflow: visible; /* Allow bubble to overflow */
  min-width: 0; /* Allow flex/grid items to shrink */
  display: flex;
  flex-direction: column;
  
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
  
  /* Subtle glow on hover */
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
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
  
  /* Staggered floating animation */
  &:nth-child(1) { animation: ${floatCard} 6s ease-in-out infinite; }
  &:nth-child(2) { animation: ${floatCard} 6s ease-in-out 0.5s infinite; }
  &:nth-child(3) { animation: ${floatCard} 6s ease-in-out 1s infinite; }
  &:nth-child(4) { animation: ${floatCard} 6s ease-in-out 1.5s infinite; }
  &:nth-child(5) { animation: ${floatCard} 6s ease-in-out 2s infinite; }
  &:nth-child(6) { animation: ${floatCard} 6s ease-in-out 2.5s infinite; }
`;

// Card title
const CardTitle = styled.h3`
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
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
`;

// Card text
const CardText = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;
  text-align: justify;
  color: rgba(220, 240, 250, 0.85);
  word-wrap: break-word;
  overflow-wrap: break-word;
  flex: 1;
  display: flex;
  align-items: center;
  
  /* Subtle text shadow for readability */
  text-shadow: 0 1px 3px rgba(0, 40, 80, 0.3);
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
`;

// Wrapper for all mantras to center them
const MantrasWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 0.5rem;
`;

// Mantra text container with reduced spacing
const MantraText = styled.div`
  font-size: 1rem;
  line-height: 1.5;
  text-align: justify;
  color: rgba(220, 240, 250, 0.85);
  word-wrap: break-word;
  overflow-wrap: break-word;
  text-shadow: 0 1px 3px rgba(0, 40, 80, 0.3);
`;

// Highlighted mantra titles
const MantraHighlight = styled.div`
  display: block;
  font-weight: 800;
  font-size: 1.2rem;
  margin-bottom: 0.25rem;
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
`;

// Wrapper for music content to center it
const MusicWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: start;
  
  /* Override CardText styling inside wrapper */
  p {
    flex: 0;
    display: block;
  }
`;

// Artist grid for music card
const ArtistGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

// Individual artist name
const ArtistName = styled.div`
  font-size: 0.875rem;
  padding: 0.1rem 0.5rem;
  text-align: center;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(200, 230, 245, 0.9);
  transition: all 0.2s ease;
  cursor: pointer;
  
  &:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(255, 255, 255, 0.25);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(100, 200, 220, 0.2);
  }
`;

// Date text (slightly muted)
const CardDate = styled.span`
  display: inline-block;
  font-size: 0.85rem;
  font-style: italic;
  line-height: 1.1;
  color: rgba(180, 220, 240, 0.85);
  margin: 0;
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
`;

// Degree section
const DegreeSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
`;

const DegreeName = styled.h4`
  font-size: 1.2rem;
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
`;

const UniversityName = styled.p`
  font-size: 1rem;
  margin: 0;
  line-height: 1.2;
  color: rgba(200, 230, 245, 0.85);
  text-align: center;
`;

// Info row with duration and GPA
const InfoRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.15rem;
`;

const InfoLabel = styled.span`
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: rgba(150, 200, 220, 0.7);
  font-weight: 600;
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
  font-size: 1.1rem;
  font-weight: 700;
  color: rgba(150, 220, 240, 1);
  text-shadow: 0 2px 8px rgba(120, 200, 220, 0.4);
`;

// Clubs section
const ClubsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ClubsLabel = styled.span`
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: rgba(150, 200, 220, 0.8);
  font-weight: 600;
  text-align: center;
  margin-bottom: 0.125rem;
`;

const ClubsList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
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
  font-size: 0.85rem;
  font-weight: 500;
  color: rgba(200, 230, 245, 0.9);
  letter-spacing: 0.3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;