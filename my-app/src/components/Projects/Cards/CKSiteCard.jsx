import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

// Utils
import { getLogo } from '@/components/Utils/logoMap';

const CKSiteCard = () => {
  const [hoveredTech, setHoveredTech] = useState(null);

  const techs = ['React', 'JavaScript', 'Vercel'];

    return (
    <ProjectCard $cosmicTheme>
      <StarField>
        <Star top="15%" left="10%" size="2px" delay="0s" />
        <Star top="25%" left="80%" size="1.5px" delay="1s" />
        <Star top="45%" left="20%" size="1px" delay="2s" />
        <Star top="60%" left="90%" size="2px" delay="0.5s" />
        <Star top="75%" left="15%" size="1.5px" delay="1.5s" />
        <Star top="35%" left="60%" size="1px" delay="0.8s" />
        <Star top="80%" left="70%" size="2px" delay="1.2s" />
        <Star top="20%" left="45%" size="1.5px" delay="2.5s" />
      </StarField>

      <CardHeader>
        <ProjectInfo>
          <ProjectName $cosmicTheme>CK's Site</ProjectName>
          <ProjectSubtitle>This Portfolio · My Digital Journey</ProjectSubtitle>
          <ProjectDate>2024 – Present</ProjectDate>
        </ProjectInfo>
      </CardHeader>

      <CardBody>
        <ProjectDescription>
          Welcome! This site is more than a portfolio—it's a living document of my path through software engineering.
          Every project, skill, and experience here represents a chapter in my journey from curious beginner to confident builder.
          I'm constantly updating it as I grow, learn, and ship new things.
        </ProjectDescription>

        <Divider $cosmicTheme />

        <SectionLabel $cosmicTheme>Built With</SectionLabel>
        <TechStack>
          {techs.map((tech) => (
            <TechPillWrapper
              key={tech}
              onMouseEnter={() => setHoveredTech(tech)}
              onMouseLeave={() => setHoveredTech(null)}
            >
              <TechPill $cosmicTheme>
                <TechLogo src={getLogo(tech)} alt={tech} />
              </TechPill>
              <Tooltip $visible={hoveredTech === tech} $cosmicTheme>
                {tech}
              </Tooltip>
            </TechPillWrapper>
          ))}
        </TechStack>

        <SectionLabel style={{ marginTop: '0.75rem' }} $cosmicTheme>What's Here</SectionLabel>
        <HighlightsList>
          <Highlight $cosmicTheme>
            <HighlightIcon $cosmicTheme>🚀</HighlightIcon>
            <HighlightText>Real projects I've built—full-stack apps, ML experiments, and hardware hacks</HighlightText>
          </Highlight>

          <Highlight $cosmicTheme>
            <HighlightIcon $cosmicTheme>🎓</HighlightIcon>
            <HighlightText>My education journey at UCF and the skills I've picked up along the way</HighlightText>
          </Highlight>

          <Highlight $cosmicTheme>
            <HighlightIcon $cosmicTheme>💼</HighlightIcon>
            <HighlightText>Work experience from internships to leadership roles—what I learned and shipped</HighlightText>
          </Highlight>

          <Highlight $cosmicTheme>
            <HighlightIcon $cosmicTheme>✨</HighlightIcon>
            <HighlightText>A bit of personality—because engineering is creative, not just technical</HighlightText>
          </Highlight>
        </HighlightsList>
      </CardBody>

      <CardFooter>
        <Divider $cosmicTheme />
        <FooterMessage>
          Thanks for stopping by. Feel free to explore, reach out, or check out the code behind this site below. 🌟
        </FooterMessage>
        
        <GitHubButton
          $cosmicTheme
          onClick={() => window.open('https://github.com/KirbysGit/colinKirby', '_blank')}
        >
          <ButtonIcon>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </ButtonIcon>
          <ButtonTextContent>
            <ButtonTitle>View Source Code</ButtonTitle>
            <ButtonSubtext>Check out how this site was built</ButtonSubtext>
          </ButtonTextContent>
          <ButtonArrow>→</ButtonArrow>
        </GitHubButton>
      </CardFooter>
    </ProjectCard>
  );
};

/* ===== Cosmic Theme Styles ===== */

const twinkle = keyframes`
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const ProjectCard = styled.div`
  width: 500px;
  min-height: 660px;
  position: relative;
  overflow: hidden;

  /* Deep space gradient - dark purples and blues */
  background: ${({ $cosmicTheme }) => $cosmicTheme ? `
    radial-gradient(ellipse at top, rgba(30, 20, 60, 0.95) 0%, rgba(15, 10, 35, 0.98) 50%, rgba(5, 5, 20, 1) 100%),
    linear-gradient(135deg, rgba(80, 50, 150, 0.15) 0%, rgba(40, 20, 80, 0.2) 100%)
  ` : 'rgba(20,20,20,0.9)'};

  backdrop-filter: blur(20px) saturate(120%);
  -webkit-backdrop-filter: blur(20px) saturate(120%);

  border: 2px solid ${({ $cosmicTheme }) => $cosmicTheme ? 'rgba(150, 100, 255, 0.4)' : 'rgba(255,255,255,0.2)'};
  border-radius: 24px;
  
  box-shadow:
    0 10px 40px rgba(0, 0, 0, 0.5),
    inset 0 1px 2px rgba(150, 100, 255, 0.15),
    0 0 60px rgba(100, 50, 200, 0.3);

  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  transition: all 0.4s ease;
  animation: ${float} 6s ease-in-out infinite;

  &:hover {
    transform: translateY(-12px);
    border-color: rgba(150, 100, 255, 0.7);
    box-shadow:
      0 20px 60px rgba(0, 0, 0, 0.6),
      0 0 100px rgba(100, 50, 200, 0.5);
  }

  @media (max-width: 1200px) {
    width: 100%;
    max-width: 500px;
  }
`;

const StarField = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
`;

const Star = styled.div`
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};
  width: ${props => props.size};
  height: ${props => props.size};
  background: white;
  border-radius: 50%;
  box-shadow: 0 0 3px rgba(255, 255, 255, 0.8);
  animation: ${twinkle} 3s ease-in-out infinite;
  animation-delay: ${props => props.delay};
`;

const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
  z-index: 1;
`;

const ProjectInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: center;
  align-items: center;
`;

const ProjectName = styled.h3`
  font-size: 3rem;
  font-weight: 900;
  margin: 0;
  letter-spacing: 2px;
  line-height: 1.1;
  text-transform: uppercase;
  
  ${({ $cosmicTheme }) => $cosmicTheme ? `
    background: linear-gradient(135deg, #ffffff 0%, #d4b3ff 30%, #9d6fff 60%, #7c3aed 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 0 40px rgba(150, 100, 255, 0.5);
    filter: drop-shadow(0 4px 12px rgba(100, 50, 200, 0.6));
  ` : `color: #fff;`}
`;

const ProjectSubtitle = styled.div`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.85);
  font-weight: 500;
  font-style: italic;
  margin: 0;
`;

const ProjectDate = styled.span`
  font-size: 0.9rem;
  color: rgba(212, 179, 255, 0.9);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 0.5rem;
  position: relative;
  z-index: 1;
  margin-top: 1rem;
`;

const ProjectDescription = styled.p`
  font-size: 0.98rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.92);
  margin: 0 0 0.5rem 0;
  font-weight: 400;
  text-align: center;
`;

const Divider = styled.div`
  width: 100%;
  height: 2px;
  margin: 0.8rem 0;
  border-radius: 2px;
  background: ${({ $cosmicTheme }) =>
    $cosmicTheme
      ? 'linear-gradient(90deg, transparent, rgba(150, 100, 255, 0.8), transparent)'
      : 'rgba(255,255,255,0.2)'};
  box-shadow: 0 0 15px rgba(150, 100, 255, 0.5);
`;

const SectionLabel = styled.div`
  font-size: 0.85rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  margin: 0.5rem 0 0.5rem;
  text-align: center;
  
  ${({ $cosmicTheme }) => $cosmicTheme ? `
    background: linear-gradient(90deg, #d4b3ff, #9d6fff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  ` : `color: rgba(255,255,255,0.9);`}
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
  justify-content: center;
  margin: 0.5rem 0;
`;

const TechPillWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const TechPill = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  background: ${({ $cosmicTheme }) =>
    $cosmicTheme
      ? 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(220, 200, 255, 0.9) 100%)'
      : 'linear-gradient(135deg, #fff, #fafafa)'};

  border: 2px solid ${({ $cosmicTheme }) =>
    $cosmicTheme ? 'rgba(150, 100, 255, 0.6)' : 'rgba(255,180,100,0.5)'};

  box-shadow:
    0 4px 12px rgba(150, 100, 255, 0.3),
    inset 0 1px 2px rgba(255,255,255,0.95);

  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;

  ${TechPillWrapper}:hover & {
    transform: translateY(-6px) scale(1.1);
    box-shadow:
      0 12px 24px rgba(150, 100, 255, 0.5),
      inset 0 1px 3px rgba(255,255,255,1);
    border-color: rgba(150, 100, 255, 0.9);
  }
`;

const TechLogo = styled.img`
  width: 32px;
  height: 32px;
  object-fit: contain;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.15));
  transition: filter 0.3s ease;

  ${TechPillWrapper}:hover & {
    filter: drop-shadow(0 3px 6px rgba(0,0,0,0.2));
  }
`;

const Tooltip = styled.div`
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%) ${({ $visible }) => $visible ? 'translateY(0)' : 'translateY(4px)'};
  padding: 0.5rem 0.8rem;
  border-radius: 8px;
  
  background: ${({ $cosmicTheme }) =>
    $cosmicTheme
      ? 'linear-gradient(135deg, rgba(100, 50, 200, 0.98), rgba(80, 30, 150, 0.98))'
      : 'rgba(0,0,0,0.85)'};
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  white-space: nowrap;

  box-shadow: 0 4px 16px rgba(100, 50, 200, 0.4), 0 0 0 1px rgba(150, 100, 255, 0.3);

  opacity: ${({ $visible }) => $visible ? 1 : 0};
  pointer-events: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 5px solid transparent;
    border-top-color: rgba(100, 50, 200, 0.98);
  }
`;

const HighlightsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const Highlight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem;
  border-radius: 12px;

  background: ${({ $cosmicTheme }) =>
    $cosmicTheme
      ? 'linear-gradient(90deg, rgba(150, 100, 255, 0.12), rgba(100, 50, 200, 0.12))'
      : 'rgba(255,255,255,0.08)'};

  border: 1px solid ${({ $cosmicTheme }) =>
    $cosmicTheme ? 'rgba(150, 100, 255, 0.3)' : 'rgba(255,255,255,0.2)'};

  transition: all 0.3s ease;

  &:hover {
    transform: translateX(6px);
    background: ${({ $cosmicTheme }) =>
      $cosmicTheme
        ? 'linear-gradient(90deg, rgba(150, 100, 255, 0.2), rgba(100, 50, 200, 0.2))'
        : 'rgba(255,255,255,0.15)'};
    border-color: ${({ $cosmicTheme }) =>
      $cosmicTheme ? 'rgba(150, 100, 255, 0.6)' : 'rgba(255,255,255,0.4)'};
    box-shadow: 0 4px 16px rgba(100, 50, 200, 0.3);
  }
`;

const HighlightIcon = styled.div`
  font-size: 1.8rem;
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;

  background: ${({ $cosmicTheme }) =>
    $cosmicTheme
      ? 'linear-gradient(135deg, rgba(150, 100, 255, 0.25), rgba(100, 50, 200, 0.25))'
      : 'rgba(255,255,255,0.15)'};

  box-shadow: 0 2px 10px rgba(100, 50, 200, 0.3);
  transition: transform 0.3s ease;

  ${Highlight}:hover & {
    transform: scale(1.15);
  }
`;

const HighlightText = styled.p`
  font-size: 0.92rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  flex: 1;
`;

const CardFooter = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: auto;
  position: relative;
  z-index: 1;
  gap: 0.75rem;
`;

const FooterMessage = styled.p`
  font-size: 0.92rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.85);
  text-align: center;
  margin: 0;
  font-style: italic;
`;

const GitHubButton = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 14px;
  
  background: ${({ $cosmicTheme }) =>
    $cosmicTheme
      ? 'linear-gradient(90deg, rgba(150, 100, 255, 0.15), rgba(100, 50, 200, 0.15))'
      : 'rgba(255,255,255,0.1)'};
  
  border: 2px solid ${({ $cosmicTheme }) =>
    $cosmicTheme ? 'rgba(150, 100, 255, 0.4)' : 'rgba(255,255,255,0.3)'};
  
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4,0,0.2,1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
    transition: left 0.6s ease;
  }

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ $cosmicTheme }) =>
      $cosmicTheme ? 'rgba(150, 100, 255, 0.8)' : 'rgba(255,255,255,0.5)'};
    box-shadow: 0 12px 32px rgba(100, 50, 200, 0.4);
    
    &::before {
      left: 100%;
    }
  }
`;

const ButtonIcon = styled.div`
  width: 40px;
  height: 40px;
  color: rgba(212, 179, 255, 0.9);
  flex-shrink: 0;
  transition: all 0.4s ease;

  ${GitHubButton}:hover & {
    color: rgba(150, 100, 255, 1);
    transform: rotate(360deg) scale(1.1);
  }

  svg {
    width: 100%;
    height: 100%;
  }
`;

const ButtonTextContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
`;

const ButtonTitle = styled.div`
  font-size: 1.1rem;
  font-weight: 800;
  color: rgba(255, 255, 255, 1);
  text-shadow: 0 2px 6px rgba(0,0,0,0.3);
`;

const ButtonSubtext = styled.div`
  font-size: 0.88rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
`;

const ButtonArrow = styled.div`
  font-size: 1.8rem;
  color: rgba(212, 179, 255, 0.8);
  transition: all 0.4s cubic-bezier(0.4,0,0.2,1);

  ${GitHubButton}:hover & {
    transform: translateX(10px);
    color: rgba(150, 100, 255, 1);
  }
`;

export default CKSiteCard;
