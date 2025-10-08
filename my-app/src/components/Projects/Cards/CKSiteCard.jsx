import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

// Utils
import { getLogo } from '@/components/Utils/logoMap';

const CKSiteCard = () => {
  const [hoveredTech, setHoveredTech] = useState(null);

  const techs = ['React', 'JavaScript', 'Vercel'];

    return (
    <ProjectCard $cosmicTheme>
      <WIPBadge $cosmicTheme>
        <WIPIcon>🚧</WIPIcon>
        <WIPText>In Progress</WIPText>
      </WIPBadge>
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
        <HeaderTop>
          <ProjectInfo>
            <ProjectName $cosmicTheme>CK's Site</ProjectName>
            <ProjectSubtitle>This Portfolio · My Digital Journey</ProjectSubtitle>
            <ProjectDate>2024 – Present</ProjectDate>
          </ProjectInfo>
        </HeaderTop>

        <ProjectDescription>
          This site! It's a constant work in progress, but I'm using it to showcase my projects and skills. It serves as a living document of my path through my career.
        </ProjectDescription>

        <Divider $cosmicTheme />
      </CardHeader>

      <CardBody>
        <SectionLabel $cosmicTheme>Tech Stack</SectionLabel>
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

        <SectionLabel style={{ marginTop: '0.75rem' }} $cosmicTheme>What It Shows</SectionLabel>
        <HighlightsList>
          <Highlight $cosmicTheme>
            <HighlightText>Real projects I've built including full-stack web applications and machine learning experiments</HighlightText>
          </Highlight>

          <Highlight $cosmicTheme>
            <HighlightText>Complete education journey at UCF and all the technical skills I've picked up along the way</HighlightText>
          </Highlight>

          <Highlight $cosmicTheme>
            <HighlightText>Work experience from internships to leadership roles showing what I learned and shipped to production</HighlightText>
          </Highlight>
        </HighlightsList>
      </CardBody>
    </ProjectCard>
  );
};

/* ===== Cosmic Theme Styles ===== */

const twinkle = keyframes`
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
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

const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
`;

const ProjectInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
`;

const ProjectName = styled.h3`
  font-size: 2.4rem;
  font-weight: 800;
  margin: 0;
  letter-spacing: -0.4px;
  line-height: 1.2;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.35);
  
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
`;

const ProjectDescription = styled.p`
  font-size: 0.96rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.95);
  margin: 0.25rem 0 0;
  font-weight: 400;
  text-align: justify;
`;

const Divider = styled.div`
  width: 100%;
  height: 2px;
  margin: 0.6rem 0 0.8rem;
  border-radius: 2px;
  background: ${({ $cosmicTheme }) =>
    $cosmicTheme
      ? 'linear-gradient(90deg, rgba(150, 100, 255, 1), rgba(100, 50, 200, 1))'
      : 'rgba(255,255,255,0.2)'};
  box-shadow: 0 0 10px rgba(150, 100, 255, 0.45);
  opacity: 0.9;
`;

const SectionLabel = styled.div`
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0.25rem 0 0.35rem;
  
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
  gap: 0.7rem;
  align-items: center;
`;

const TechPillWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const TechPill = styled.div`
  width: 45px;
  height: 45px;
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
    0 2px 8px rgba(150, 100, 255, 0.27),
    inset 0 1px 2px rgba(255,255,255,0.95);

  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;

  ${TechPillWrapper}:hover & {
    transform: translateY(-4px) scale(1.08);
    box-shadow:
      0 8px 20px rgba(150, 100, 255, 0.45),
      inset 0 1px 3px rgba(255,255,255,1);
    border-color: rgba(150, 100, 255, 0.9);
  }
`;

const TechLogo = styled.img`
  width: 28px;
  height: 28px;
  object-fit: contain;
  filter: drop-shadow(0 1px 2px rgba(0,0,0,0.12));
  transition: filter 0.3s ease;

  ${TechPillWrapper}:hover & {
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.18));
  }
`;

const Tooltip = styled.div`
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%) ${({ $visible }) => $visible ? 'translateY(0)' : 'translateY(4px)'};
  padding: 0.5rem 0.7rem;
  border-radius: 8px;
  
  background: ${({ $cosmicTheme }) =>
    $cosmicTheme
      ? 'linear-gradient(135deg, rgba(100, 50, 200, 0.98), rgba(80, 30, 150, 0.98))'
      : 'rgba(0,0,0,0.85)'};
  color: white;
  font-size: 0.74rem;
  font-weight: 700;
  white-space: nowrap;

  box-shadow: 0 4px 12px rgba(100, 50, 200, 0.35), 0 0 0 1px rgba(150, 100, 255, 0.4);

  opacity: ${({ $visible }) => $visible ? 1 : 0};
  pointer-events: none;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
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
  gap: 0.7rem;
`;

const Highlight = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 1rem 1rem 1.25rem;
  border-radius: 8px;
  position: relative;
  overflow: hidden;

  background: ${({ $cosmicTheme }) =>
    $cosmicTheme
      ? 'linear-gradient(90deg, rgba(150, 100, 255, 0.08), rgba(100, 50, 200, 0.06))'
      : 'rgba(255,255,255,0.08)'};

  /* Gradient left border */
  border-left: 4px solid transparent;
  border-image: ${({ $cosmicTheme }) =>
    $cosmicTheme
      ? 'linear-gradient(180deg, rgb(150, 100, 255) 0%, rgb(180, 130, 255) 100%)'
      : 'linear-gradient(180deg, rgb(255, 140, 60) 0%, rgb(255, 180, 100) 100%)'
  };
  border-image-slice: 1;

  transition: all 0.3s ease;

  &:hover {
    transform: translateX(6px);
    background: ${({ $cosmicTheme }) =>
      $cosmicTheme
        ? 'linear-gradient(90deg, rgba(150, 100, 255, 0.15), rgba(100, 50, 200, 0.12))'
        : 'rgba(255,255,255,0.15)'};
    box-shadow: 0 4px 16px rgba(100, 50, 200, 0.3);
    
    /* Thicker border on hover */
    border-left-width: 5px;
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
  color: rgba(255, 255, 255, 0.92);
  margin: 0;
  flex: 1;
  font-weight: 400;
  text-align: justify;
`;

const CardFooter = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: auto;
  position: relative;
  z-index: 1;
`;

/* ========================= Social Media Links ========================= */

const SocialSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 0;
  width: 100%;
`;

const SocialSectionTitle = styled.div`
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  margin-bottom: 0.25rem;
  
  ${({ $cosmicTheme }) => $cosmicTheme ? `
    background: linear-gradient(90deg, #d4b3ff, #9d6fff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  ` : `color: rgba(255,255,255,0.9);`}
`;

const SocialLinksContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
`;

const SocialLinkWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const SocialLink = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${({ $cosmicTheme }) =>
    $cosmicTheme ? 'rgba(150, 100, 255, 0.12)' : 'rgba(255,180,100,0.1)'};
  border: 2px solid ${({ $cosmicTheme }) => 
    $cosmicTheme ? 'rgba(150, 100, 255, 0.35)' : 'rgba(255,180,100,0.3)'};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${({ $cosmicTheme }) =>
      $cosmicTheme 
        ? 'linear-gradient(135deg, rgba(150, 100, 255, 0.2), rgba(100, 50, 200, 0.15))'
        : 'linear-gradient(135deg, rgba(255, 180, 100, 0.2), rgba(255, 140, 60, 0.15))'
    };
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-3px) scale(1.08);
    border-color: ${({ $cosmicTheme }) => 
      $cosmicTheme ? 'rgba(150, 100, 255, 0.6)' : 'rgba(255,180,100,0.5)'};
    box-shadow: ${({ $cosmicTheme }) => 
      $cosmicTheme ? '0 6px 16px rgba(150, 100, 255, 0.4)' : '0 6px 16px rgba(255,180,100,0.3)'};
    background: ${({ $cosmicTheme }) =>
      $cosmicTheme ? 'rgba(150, 100, 255, 0.18)' : 'rgba(255,180,100,0.15)'};
    
    &::before {
      opacity: 1;
    }
  }
`;

const SocialIcon = styled.img`
  width: 28px;
  height: 28px;
  object-fit: contain;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
  transition: all 0.3s ease;
  z-index: 1;
  
  ${SocialLink}:hover & {
    transform: scale(1.1);
    filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
  }
`;

const SocialTooltip = styled.div`
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%) ${({ $visible }) => $visible ? 'translateY(0)' : 'translateY(4px)'};
  padding: 0.4rem 0.6rem;
  border-radius: 6px;
  
  background: ${({ $cosmicTheme }) =>
    $cosmicTheme
      ? 'linear-gradient(135deg, rgba(100, 50, 200, 0.98), rgba(80, 30, 150, 0.98))'
      : 'rgba(0,0,0,0.85)'};
  color: white;
  font-size: 0.7rem;
  font-weight: 600;
  white-space: nowrap;

  box-shadow: 0 3px 8px rgba(100, 50, 200, 0.3), 0 0 0 1px rgba(150, 100, 255, 0.4);

  opacity: ${({ $visible }) => $visible ? 1 : 0};
  pointer-events: none;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 4px solid transparent;
    border-top-color: rgba(100, 50, 200, 0.98);
  }
`;

// WIP Badge Components
const WIPBadge = styled.div`
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 0.8rem;
  border-radius: 20px;
  z-index: 10;
  
  background: ${props => props.$cosmicTheme ? 
    'linear-gradient(135deg, rgba(255, 193, 7, 0.95) 0%, rgba(255, 152, 0, 0.95) 100%)' : 
    'linear-gradient(135deg, rgba(255, 193, 7, 0.95) 0%, rgba(255, 152, 0, 0.95) 100%)'
  };
  
  border: 2px solid ${props => props.$cosmicTheme ? 
    'rgba(255, 235, 59, 0.8)' : 
    'rgba(255, 235, 59, 0.8)'
  };
  
  box-shadow: 
    0 4px 12px rgba(255, 152, 0, 0.4),
    inset 0 1px 2px rgba(255, 255, 255, 0.3);
  
  transition: all 0.3s ease;
  animation: wiggle 3s ease-in-out infinite;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 
      0 6px 16px rgba(255, 152, 0, 0.5),
      inset 0 1px 3px rgba(255, 255, 255, 0.4);
  }
  
  @keyframes wiggle {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(-3deg); }
    75% { transform: rotate(3deg); }
  }
`;

const WIPIcon = styled.span`
  font-size: 1rem;
  line-height: 1;
  animation: bounce 2s ease-in-out infinite;
  
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-3px); }
  }
`;

const WIPText = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.85);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.3);
`;

export default CKSiteCard;
