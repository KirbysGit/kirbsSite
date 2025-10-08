import React, { useState } from 'react';
import styled from 'styled-components';

// Import project assets
import ucfLogo from '@/images/projects/ucf_manager/ucflogo.png';
import presentationPreview from '@/images/projects/ucf_manager/presentationpreview.png';
import figmaPreview from '@/images/projects/ucf_manager/figmapreview.png';

// Import logo utility
import { getLogo } from '@/components/Utils/logoMap';

const UCFClubManagerCard = () => {
  const [hoveredTech, setHoveredTech] = useState(null);

  const techs = [
    'MongoDB',
    'Express.js',
    'React',
    'Node.js',
    'Tailwind CSS',
    'Heroku',
    'SwaggerHub',
    'Jest'
  ];

    return (
    <ProjectCard $ucfTheme>
      <CardHeader>
        <HeaderTop>
          <ProjectInfo>
            <ProjectName $ucfTheme>UCF Club & Event Manager</ProjectName>
            <ProjectDate>Jun 2024 – Jul 2024</ProjectDate>
          </ProjectInfo>
          <ProjectLogoImage src={ucfLogo} alt="UCF Logo" />
        </HeaderTop>

        <ProjectDescription>
          A full-stack MERN app for streamlined club management and event registration. Built with a team of 6 students, deployed to Heroku with REST API documented on SwaggerHub.
        </ProjectDescription>

        <Divider $ucfTheme />
      </CardHeader>

      <CardBody>
        <SectionLabel $ucfTheme>Tech Stack</SectionLabel>
        <TechStack>
          {techs.map((tech) => (
            <TechPillWrapper
              key={tech}
              onMouseEnter={() => setHoveredTech(tech)}
              onMouseLeave={() => setHoveredTech(null)}
            >
              <TechPill $ucfTheme>
                <TechLogo src={getLogo(tech)} alt={tech} />
              </TechPill>
              <Tooltip $visible={hoveredTech === tech} $ucfTheme>
                {tech}
              </Tooltip>
            </TechPillWrapper>
          ))}
        </TechStack>

        <SectionLabel style={{ marginTop: '0.75rem' }} $ucfTheme>What It Does</SectionLabel>
        <HighlightsList>
          <Highlight $ucfTheme>
            <HighlightText>User authentication with sign-up, login, password reset, and email verification</HighlightText>
          </Highlight>
          <Highlight $ucfTheme>
            <HighlightText>Club management with create, search, join/leave, admin controls, and delete functionality</HighlightText>
          </Highlight>
          <Highlight $ucfTheme>
            <HighlightText>Event system with RSVP, calendar view, and club-specific event browsing</HighlightText>
          </Highlight>
        </HighlightsList>
      </CardBody>

      <CardFooter>
        <Divider $ucfTheme />
        
        {/* Resources Grid - LinkedIn style preview cards */}
        <ResourcesGrid>
          {/* Presentation PDF Card */}
          <ResourceCard
            $ucfTheme
            onClick={() => window.open('/projects/ucf_manager/ucfPres.pdf', '_blank')}
          >
            <ResourcePreview $type="presentation" $preview={presentationPreview}>
              <ResourceIcon>📊</ResourceIcon>
            </ResourcePreview>
            <ResourceCaption>Presentation</ResourceCaption>
          </ResourceCard>

          {/* Figma Wireframes Card */}
          <ResourceCard
            $ucfTheme
            onClick={() => window.open('https://www.figma.com/design/Hwzwi4uOEoVn6BrEA4815n/UCF-Club---Event-Manager-UI?m=auto&t=89iyNh5XCpEONUi7-6', '_blank')}
          >
            <ResourcePreview $type="figma" $preview={figmaPreview}>
              <ResourceIcon>🎨</ResourceIcon>
            </ResourcePreview>
            <ResourceCaption>Figma Wireframes</ResourceCaption>
          </ResourceCard>

          {/* GitHub Card */}
          <ResourceCard
            $ucfTheme
            onClick={() => window.open('https://github.com/juwelB/Large-Project', '_blank')}
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
        </ResourcesGrid>
      </CardFooter>
    </ProjectCard>
  );
};

/* ========================= THEME: UCF (Black & Gold) ========================= */

const ProjectCard = styled.div`
  width: 500px;
  min-height: 640px;
  position: relative;

  /* UCF Dark with Silver highlights gradient background */
  background: ${p => p.$ucfTheme ? `
    radial-gradient(ellipse at top, rgba(20, 20, 25, 0.95) 0%, rgba(35, 35, 45, 0.92) 30%, rgba(25, 25, 35, 0.95) 70%, rgba(15, 15, 20, 0.98) 100%),
    linear-gradient(135deg, rgba(200, 200, 210, 0.15) 0%, rgba(150, 150, 160, 0.08) 25%, rgba(100, 100, 110, 0.05) 50%, rgba(50, 50, 60, 0.03) 75%, rgba(20, 20, 25, 0.02) 100%),
    linear-gradient(45deg, rgba(255, 201, 4, 0.12) 0%, rgba(200, 200, 210, 0.06) 50%, rgba(255, 201, 4, 0.08) 100%)
  ` : `rgba(20,20,20,0.9)`};
  backdrop-filter: blur(18px) saturate(105%);
  -webkit-backdrop-filter: blur(18px) saturate(105%);

  border: 1px solid ${p => p.$ucfTheme ? 'rgba(255, 201, 4, 0.4)' : 'rgba(255,255,255,0.08)'};
  border-radius: 20px;
  box-shadow:
    0 10px 30px rgba(0,0,0,0.5),
    inset 0 1px 2px rgba(255, 201, 4, 0.1),
    0 0 48px ${p => p.$ucfTheme ? 'rgba(255, 201, 4, 0.2)' : 'rgba(0,0,0,0.2)'};

  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  transition: transform .35s ease, box-shadow .35s ease, border-color .35s ease;

  &:hover {
    transform: translateY(-8px);
    border-color: rgba(255, 201, 4, 0.65);
    box-shadow:
      0 16px 48px rgba(0,0,0,0.6),
      0 0 72px rgba(255, 201, 4, 0.35);
  }

  @media (max-width: 1200px) {
    width: 100%;
    max-width: 500px;
  }
`;

const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: .5rem;
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
  gap: .4rem;
  flex: 1;
`;

const ProjectName = styled.h3`
  font-size: 2.2rem;
  font-weight: 800;
  margin: 0;
  line-height: 1.2;
  letter-spacing: -0.5px;
  ${({ $ucfTheme }) => $ucfTheme ? `
    background: linear-gradient(100deg, #FFC904 0%, #FFD966 50%, #FFC904 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 2px 8px rgba(255, 201, 4, 0.3);
  ` : `color: #fff;`}
`;

const ProjectSubtitle = styled.div`
  font-size: 1rem;
  color: rgba(255,255,255,0.92);
  font-weight: 500;
  font-style: italic;
  margin: 0;
`;

const ProjectRole = styled.span`
  font-size: 0.88rem;
  color: rgba(255, 201, 4, 0.9);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.8px;
`;

const ProjectDate = styled.span`
  font-size: 0.88rem;
  color: rgba(255,255,255,0.85);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ProjectLogoImage = styled.img`
  width: 90px;
  height: auto;
  border-radius: 12px;
  object-fit: contain;
  filter: drop-shadow(0 4px 12px rgba(255, 201, 4, 0.3));
`;

const ProjectDescription = styled.p`
  font-size: 0.95rem;
  line-height: 1.65;
  color: rgba(255,255,255,0.92);
  margin: 0;
  font-weight: 400;
`;

const Divider = styled.div`
  width: 100%;
  height: 2px;
  background: ${({ $ucfTheme }) =>
    $ucfTheme ? 'linear-gradient(100deg, #FFC904 0%, #1F2937 100%)' : 'rgba(255,255,255,0.2)'};
  opacity: 0.85;
  border-radius: 2px;
  box-shadow: ${({ $ucfTheme }) =>
    $ucfTheme ? '0 0 12px rgba(255, 201, 4, 0.4)' : '0 0 10px rgba(255,255,255,0.2)'};
  margin-top: 0.35rem;
  margin-bottom: 0.75rem;
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
  ${({ $ucfTheme }) => $ucfTheme ? `
    background: linear-gradient(100deg, #FFC904 0%, #FFD966 50%, #FFC904 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  ` : `color: rgba(255,255,255,0.9);`}
`;

const HighlightsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
`;

const Highlight = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 1rem 1rem 1.25rem;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  
  background: ${({ $ucfTheme }) =>
    $ucfTheme ? 'linear-gradient(90deg, rgba(255, 201, 4, 0.08) 0%, rgba(31, 41, 55, 0.06) 100%)'
              : 'rgba(255,180,100,0.08)'};
  
  /* Gradient left border */
  border-left: 4px solid transparent;
  border-image: ${({ $ucfTheme }) =>
    $ucfTheme
      ? 'linear-gradient(180deg, rgb(255, 201, 4) 0%, rgb(255, 217, 102) 100%)'
      : 'linear-gradient(180deg, rgb(255, 140, 60) 0%, rgb(255, 180, 100) 100%)'
  };
  border-image-slice: 1;
  
  transition: all 0.3s ease;

  &:hover {
    background: ${({ $ucfTheme }) =>
      $ucfTheme ? 'linear-gradient(90deg, rgba(255, 201, 4, 0.15) 0%, rgba(31, 41, 55, 0.12) 100%)'
                : 'rgba(255,180,100,0.15)'};
    transform: translateX(6px);
    box-shadow: ${({ $ucfTheme }) => $ucfTheme ? '0 4px 16px rgba(255, 201, 4, 0.25)' : '0 4px 12px rgba(255,180,100,0.2)'};
    
    /* Thicker border on hover */
    border-left-width: 5px;
  }
`;

const HighlightIcon = styled.div`
  font-size: 1.7rem;
  flex-shrink: 0;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ $ucfTheme }) =>
    $ucfTheme ? 'linear-gradient(135deg, rgba(255, 201, 4, 0.22), rgba(31, 41, 55, 0.25))'
              : 'rgba(255,180,100,0.15)'};
  border-radius: 10px;
  box-shadow: ${({ $ucfTheme }) =>
    $ucfTheme ? '0 2px 8px rgba(255, 201, 4, 0.25)' : '0 2px 8px rgba(255,180,100,0.2)'};
  transition: all 0.3s ease;

  ${Highlight}:hover & {
    transform: scale(1.1);
    box-shadow: ${({ $ucfTheme }) =>
      $ucfTheme ? '0 4px 12px rgba(255, 201, 4, 0.4)' : '0 4px 12px rgba(255,180,100,0.3)'};
  }
`;

const HighlightText = styled.p`
  font-size: 0.92rem;
  line-height: 1.6;
  color: rgba(255,255,255,0.92);
  margin: 0;
  flex: 1;
  font-weight: 400;
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
  padding: 0.6rem;
  background: ${({ $ucfTheme }) =>
    $ucfTheme
      ? 'linear-gradient(135deg, rgba(248, 250, 252, 1) 0%, rgba(255, 255, 255, 0.95) 50%, rgba(248, 250, 252, 0.92) 100%)'
      : 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(255,250,245,0.98) 50%, rgba(255,245,235,0.95) 100%)'};
  border: 2px solid ${({ $ucfTheme }) => $ucfTheme ? 'rgba(255, 201, 4, 0.5)' : 'rgba(255,180,100,0.5)'};
  box-shadow: ${({ $ucfTheme }) =>
    $ucfTheme
      ? '0 2px 8px rgba(255, 201, 4, 0.25), inset 0 1px 2px rgba(255,255,255,0.9)'
      : '0 2px 8px rgba(255,180,100,0.2), inset 0 1px 2px rgba(255,255,255,0.9)'};
  transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
  cursor: pointer;

  ${TechPillWrapper}:hover & {
    transform: translateY(-4px) scale(1.08);
    box-shadow: ${({ $ucfTheme }) =>
      $ucfTheme
        ? '0 8px 20px rgba(255, 201, 4, 0.45), inset 0 1px 3px rgba(255,255,255,1)'
        : '0 8px 20px rgba(255,180,100,0.4), inset 0 1px 3px rgba(255,255,255,1)'};
    border-color: ${({ $ucfTheme }) => $ucfTheme ? 'rgba(255, 201, 4, 0.85)' : 'rgba(255,180,100,0.8)'};
  }
`;

const TechLogo = styled.img`
  width: 150%;
  height: 150%;
  object-fit: contain;
  filter: drop-shadow(0 1px 2px rgba(0,0,0,0.1));
  transition: filter 0.3s ease;

  ${TechPillWrapper}:hover & {
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.15));
  }
`;

const Tooltip = styled.div`
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%) ${({ $visible }) => $visible ? 'translateY(0)' : 'translateY(4px)'};
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  color: #000;
  font-size: 0.75rem;
  font-weight: 700;
  white-space: nowrap;
  background: ${({ $ucfTheme }) =>
    $ucfTheme
      ? 'linear-gradient(135deg, rgba(255, 201, 4, 0.98), rgba(255, 217, 102, 0.98))'
      : 'linear-gradient(135deg, rgba(255,140,60,0.95), rgba(255,160,100,0.95))'};
  box-shadow: ${({ $ucfTheme }) =>
    $ucfTheme ? '0 4px 12px rgba(255, 201, 4, 0.4), 0 0 0 1px rgba(0,0,0,0.1)'
              : '0 4px 12px rgba(255,140,60,0.4), 0 0 0 1px rgba(255,180,100,0.5)'};
  opacity: ${({ $visible }) => $visible ? 1 : 0};
  pointer-events: none;
  transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
  z-index: 1000;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 5px solid transparent;
    border-top-color: ${({ $ucfTheme }) => $ucfTheme ? 'rgba(255, 201, 4, 0.98)' : 'rgba(255,140,60,0.95)'};
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
  grid-template-columns: repeat(3, 1fr);
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
  background: ${({ $ucfTheme }) =>
    $ucfTheme ? 'rgba(255, 201, 4, 0.12)' : 'rgba(255,180,100,0.1)'};
  border: 1.5px solid ${({ $ucfTheme }) => 
    $ucfTheme ? 'rgba(255, 201, 4, 0.35)' : 'rgba(255,180,100,0.3)'};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
  
  &:hover {
    transform: translateY(-4px);
    border-color: ${({ $ucfTheme }) => 
      $ucfTheme ? 'rgba(255, 201, 4, 0.6)' : 'rgba(255,180,100,0.5)'};
    box-shadow: ${({ $ucfTheme }) => 
      $ucfTheme ? '0 6px 20px rgba(255, 201, 4, 0.3)' : '0 6px 20px rgba(255,180,100,0.25)'};
    background: ${({ $ucfTheme }) =>
      $ucfTheme ? 'rgba(255, 201, 4, 0.18)' : 'rgba(255,180,100,0.15)'};
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
    if ($type === 'presentation') return 'linear-gradient(135deg, rgba(255, 201, 4, 0.2), rgba(255, 217, 102, 0.15))';
    if ($type === 'figma') return 'linear-gradient(135deg, rgba(255, 201, 4, 0.2), rgba(255, 217, 102, 0.15))';
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
    color: rgba(255, 201, 4, 1);
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

export default UCFClubManagerCard;
