import React, { useState } from 'react';
import styled from 'styled-components';

// Assets
import oceanlifeLogo from '@/images/projects/ocean_life/oceanlife.png';
import oceanlifePreview from '@/images/projects/ocean_life/presentationpreview.png';

// Utils
import { getLogo } from '@/components/Utils/logoMap';

const OceanLifeCard = () => {
  const [hoveredTech, setHoveredTech] = useState(null);

  const techs = [
    'HTML5','CSS3','PHP','MySQL','Apache','Linux','Bootstrap','Postman'
  ];

  return (
    <ProjectCard $oceanTheme>
      <CardHeader>
        <HeaderTop>
          <ProjectInfo>
            <ProjectName $oceanTheme>Ocean-Life Contact Manager</ProjectName>
            <ProjectSubtitle>Full-stack LAMP app for personal contacts</ProjectSubtitle>
            <ProjectDate>Jun 2024 – Jul 2024</ProjectDate>
          </ProjectInfo>
          <ProjectLogoImage src={oceanlifeLogo} alt="Ocean-Life Logo" />
        </HeaderTop>

        <ProjectDescription>
          A simple ocean-themed contact manager. Contains user login/registration, full CRUD, and search functionality. Built with the LAMP stack.
        </ProjectDescription>

        <Divider $oceanTheme />
      </CardHeader>

      <CardBody>
        <SectionLabel $oceanTheme>Tech Stack</SectionLabel>
        <TechStack>
          {techs.map((tech) => (
            <TechPillWrapper
              key={tech}
              onMouseEnter={() => setHoveredTech(tech)}
              onMouseLeave={() => setHoveredTech(null)}
            >
              <TechPill $oceanTheme>
                <TechLogo src={getLogo(tech)} alt={tech} />
              </TechPill>
              <Tooltip $visible={hoveredTech === tech} $oceanTheme>
                {tech}
              </Tooltip>
            </TechPillWrapper>
          ))}
        </TechStack>

        <SectionLabel $oceanTheme>What It Does</SectionLabel>
        <HighlightsList>
          <Highlight $oceanTheme>
            <HighlightText>User login/registration with cookie-based sessions and form validation</HighlightText>
          </Highlight>

          <Highlight $oceanTheme>
            <HighlightText>Complete contact CRUD with inline editing and instant feedback</HighlightText>
          </Highlight>

          <Highlight $oceanTheme>
            <HighlightText>Search across name, email, and phone with user-scoped API</HighlightText>
          </Highlight>
        </HighlightsList>
      </CardBody>

      <CardFooter>
        <Divider $oceanTheme />
        
        {/* Resources Grid - LinkedIn style preview cards */}
        <ResourcesGrid>
          {/* GitHub Card */}
          <ResourceCard
            $oceanTheme
            onClick={() => window.open('https://github.com/juwelB/Small_Contact_App', '_blank')}
          >
            <ResourcePreview $type="github">
              <GitHubLogoIcon>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </GitHubLogoIcon>
            </ResourcePreview>
            <ResourceCaption>View Code</ResourceCaption>
          </ResourceCard>

          {/* Presentation PDF Card */}
          <ResourceCard
            $oceanTheme
            onClick={() => window.open('/projects/ocean_life/presentation.pdf', '_blank')}
          >
            <ResourcePreview $type="presentation" $preview={oceanlifePreview}>
              <ResourceIcon>📊</ResourceIcon>
            </ResourcePreview>
            <ResourceCaption>Presentation</ResourceCaption>
          </ResourceCard>
        </ResourcesGrid>
      </CardFooter>
    </ProjectCard>
  );
};

/* ===== Styles ===== */

const ProjectCard = styled.div`
  width: 500px;
  min-height: 640px;

  background: ${({ $oceanTheme }) => $oceanTheme ? `
    linear-gradient(180deg,
      rgba(0, 30, 60, 0.95) 0%,
      rgba(0, 50, 100, 0.92) 15%,
      rgba(0, 80, 140, 0.88) 35%,
      rgba(0, 100, 160, 0.85) 55%,
      rgba(0, 120, 180, 0.82) 75%,
      rgba(0, 140, 200, 0.80) 100%
    ),
    radial-gradient(ellipse at center,
      rgba(0, 150, 220, 0.15) 0%,
      rgba(0, 100, 160, 0.08) 50%,
      rgba(0, 50, 100, 0.05) 100%
    )
  ` : 'rgba(20,20,20,0.2)'};

  backdrop-filter: blur(20px) saturate(110%);
  -webkit-backdrop-filter: blur(20px) saturate(110%);

  border: 1px solid rgba(2, 136, 209, 0.45);
  border-radius: 24px;

  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.35),
    inset 0 1px 2px rgba(224, 247, 250, 0.25),
    0 0 40px rgba(2, 119, 189, 0.35);

  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  transition: all 0.35s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow:
      0 12px 48px rgba(0, 0, 0, 0.45),
      inset 0 2px 3px rgba(224, 247, 250, 0.35),
      0 0 60px rgba(2, 119, 189, 0.55);
    border-color: rgba(224, 247, 250, 0.65);
  }

  @media (max-width: 1200px) {
    width: 100%;
    max-width: 500px;
  }
`;

const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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
  gap: 0.4rem;
  flex: 1;
`;

const ProjectName = styled.h3`
  font-size: 2.2rem;
  font-weight: 800;
  margin: 0;
  line-height: 1.2;
  letter-spacing: -0.5px;
  ${({ $oceanTheme }) => $oceanTheme ? `
    background: linear-gradient(100deg, #e0f7fa 0%, #a5e9ff 50%, #9be7f7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.35);
  ` : `color: #fff;`}
`;

const ProjectSubtitle = styled.div`
  font-size: 1.05rem;
  color: rgba(255, 255, 255, 0.95);
  font-weight: 500;
  font-style: italic;
  margin: 0;
`;

const ProjectDate = styled.span`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.88);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ProjectLogoImage = styled.img`
  width: 90px;
  height: auto;
  border-radius: 12px;
  object-fit: contain;
  filter: drop-shadow(0 4px 12px rgba(2, 136, 209, 0.3));
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
  background: ${({ $oceanTheme }) =>
    $oceanTheme
      ? 'linear-gradient(90deg, #e0f7fa, #6ec6ff, #0288d1)'
      : 'rgba(255,255,255,0.2)'};
  box-shadow: 0 0 10px rgba(110, 198, 255, 0.45);
  opacity: 0.9;
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 0.5rem;
  position: relative;
  z-index: 1;
`;

const SectionLabel = styled.div`
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  ${({ $oceanTheme }) => $oceanTheme ? `
    background: linear-gradient(100deg, #e0f7fa 0%, #a5e9ff 50%, #9be7f7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  ` : `color: rgba(255,255,255,0.9);`}
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
  
  background: ${({ $oceanTheme }) =>
    $oceanTheme
      ? 'linear-gradient(90deg, rgba(224,247,250,0.08) 0%, rgba(110,198,255,0.06) 100%)'
      : 'rgba(255,255,255,0.08)'};
  
  /* Gradient left border */
  border-left: 4px solid transparent;
  border-image: ${({ $oceanTheme }) =>
    $oceanTheme
      ? 'linear-gradient(180deg, rgb(224, 247, 250) 0%, rgb(110, 198, 255) 100%)'
      : 'linear-gradient(180deg, rgb(255, 140, 60) 0%, rgb(255, 180, 100) 100%)'
  };
  border-image-slice: 1;
  
  transition: all 0.3s ease;

  &:hover {
    background: ${({ $oceanTheme }) =>
      $oceanTheme
        ? 'linear-gradient(90deg, rgba(224,247,250,0.15) 0%, rgba(110,198,255,0.12) 100%)'
        : 'rgba(255,255,255,0.15)'};
    transform: translateX(6px);
    box-shadow: ${({ $oceanTheme }) => $oceanTheme ? '0 4px 16px rgba(224,247,250,0.25)' : '0 4px 12px rgba(255,180,100,0.2)'};
    
    /* Thicker border on hover */
    border-left-width: 5px;
  }
`;

const HighlightIcon = styled.div`
  font-size: 1.6rem;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  border-radius: 10px;

  background: ${({ $oceanTheme }) =>
    $oceanTheme
      ? 'linear-gradient(90deg, rgba(224,247,250,0.25), rgba(110,198,255,0.25))'
      : 'rgba(255,255,255,0.15)'};

  box-shadow: 0 2px 8px rgba(2, 119, 189, 0.25);
  transition: transform 0.25s ease;

  ${Highlight}:hover & {
    transform: scale(1.08);
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
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;

  background: ${({ $oceanTheme }) =>
    $oceanTheme
      ? 'linear-gradient(135deg, #ffffff 0%, #f2fbff 50%, #e8f7ff 100%)'
      : 'linear-gradient(135deg, #fff, #fafafa)'};

  border: 2px solid ${({ $oceanTheme }) =>
    $oceanTheme ? 'rgba(110,198,255,0.6)' : 'rgba(255,180,100,0.5)'};

  box-shadow:
    0 2px 8px rgba(110,198,255,0.27),
    inset 0 1px 2px rgba(255,255,255,0.95);

  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;

  ${TechPillWrapper}:hover & {
    transform: translateY(-4px) scale(1.06);
    box-shadow:
      0 8px 20px rgba(110,198,255,0.45),
      inset 0 1px 3px rgba(255,255,255,1);
    border-color: rgba(224,247,250,0.9);
  }
`;

const TechLogo = styled.img`
  width: 28px;
  height: 28px;
  object-fit: contain;
  filter: drop-shadow(0 1px 2px rgba(0,0,0,0.12));
  transition: filter 0.25s ease;

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

  background: ${({ $oceanTheme }) =>
    $oceanTheme
      ? 'linear-gradient(135deg, rgba(2,136,209,0.96), rgba(1,79,121,0.96))'
      : 'rgba(0,0,0,0.85)'};
  color: white;
  font-size: 0.74rem;
  font-weight: 700;
  white-space: nowrap;

  box-shadow: 0 4px 12px rgba(2,136,209,0.35), 0 0 0 1px rgba(224,247,250,0.4);

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
    border-top-color: rgba(2,136,209,0.96);
  }
`;

const CardFooter = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 0.5rem;
  margin-top: auto;
  position: relative;
  z-index: 1;
`;

/* ========================= Resources Grid (LinkedIn-style) ========================= */

const ResourcesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  width: 100%;
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const ResourceCard = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  overflow: hidden;
  background: ${({ $oceanTheme }) =>
    $oceanTheme ? 'rgba(224,247,250,0.12)' : 'rgba(255,180,100,0.1)'};
  border: 1.5px solid ${({ $oceanTheme }) => 
    $oceanTheme ? 'rgba(224,247,250,0.35)' : 'rgba(255,180,100,0.3)'};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
  
  &:hover {
    transform: translateY(-4px);
    border-color: ${({ $oceanTheme }) => 
      $oceanTheme ? 'rgba(224,247,250,0.6)' : 'rgba(255,180,100,0.5)'};
    box-shadow: ${({ $oceanTheme }) => 
      $oceanTheme ? '0 6px 20px rgba(224,247,250,0.3)' : '0 6px 20px rgba(255,180,100,0.25)'};
    background: ${({ $oceanTheme }) =>
      $oceanTheme ? 'rgba(224,247,250,0.18)' : 'rgba(255,180,100,0.15)'};
  }
`;

const ResourcePreview = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ $type, $preview }) => {
    if ($preview) {
      return `url(${$preview}) center/cover no-repeat`;
    }
    if ($type === 'presentation') return 'linear-gradient(135deg, rgba(224,247,250,0.2), rgba(110,198,255,0.15))';
    if ($type === 'github') return 'linear-gradient(135deg, rgba(50, 50, 50, 0.3), rgba(30, 30, 30, 0.2))';
    return 'rgba(255,255,255,0.05)';
  }};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${({ $preview }) => 
      $preview 
        ? 'linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 100%)'
        : 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.05) 100%)'
    };
  }
`;

const ResourceIcon = styled.div`
  font-size: 2rem;
  z-index: 1;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
  transition: transform 0.3s ease;
  
  ${ResourceCard}:hover & {
    transform: scale(1.15);
  }
`;

const GitHubLogoIcon = styled.div`
  width: 60px;
  height: 60px;
  z-index: 1;
  color: rgba(255, 255, 255, 0.95);
  filter: drop-shadow(0 3px 8px rgba(0,0,0,0.4));
  transition: all 0.3s ease;
  
  svg {
    width: 100%;
    height: 100%;
  }
  
  ${ResourceCard}:hover & {
    transform: scale(1.1);
    color: rgba(224,247,250,1);
  }
`;

const ResourceCaption = styled.div`
  padding: 0.5rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: rgba(255,255,255,0.95);
  text-align: center;
  background: rgba(0,0,0,0.15);
  letter-spacing: 0.3px;
`;

export default OceanLifeCard;

