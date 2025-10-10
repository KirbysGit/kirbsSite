import React from 'react';
import styled from 'styled-components';

// Shared components
import CardBase, { 
  CardHeader, 
  HeaderTop, 
  ProjectInfo, 
  ProjectName, 
  ProjectSubtitle,
  ProjectDate, 
  ProjectLogoImage,
  ProjectDescription, 
  Divider, 
  CardBody, 
  SectionLabel,
  CardFooter
} from '../shared/CardBase';
import TechStack from '../shared/TechStack';
import Highlights from '../shared/Highlights';
import { themes } from '../shared/themes';

// Assets
import oceanlifeLogo from '@/images/projects/ocean_life/oceanlife.png';
import oceanlifePreview from '@/images/projects/ocean_life/presentationpreview.png';

const OceanLifeCard = () => {
  const techs = [
    'HTML5','CSS3','PHP','MySQL','Apache','Linux','Bootstrap','Postman'
  ];

  const highlights = [
    'User login/registration with cookie-based sessions and form validation',
    'Complete contact CRUD with inline editing and instant feedback',
    'Search across name, email, and phone with user-scoped API'
  ];

  const theme = themes.ocean;

  return (
    <CardBase theme={true} themeName="ocean" themeColors={theme.colors}>
      <CardHeader>
        <HeaderTop>
          <ProjectInfo>
            <ProjectName $themeColors={theme.colors}>Ocean-Life Contact Manager</ProjectName>
            <ProjectDate>Jun 2024 – Jul 2024</ProjectDate>
          </ProjectInfo>
          <ProjectLogoImage src={oceanlifeLogo} alt="Ocean-Life Logo" />
        </HeaderTop>

        <ProjectDescription>
          A simple ocean-themed contact manager. Contains user login/registration, full CRUD, and search functionality. Built with the LAMP stack.
        </ProjectDescription>

        <Divider $themeColors={theme.colors} />
      </CardHeader>

      <CardBody>
        <SectionLabel $themeColors={theme.colors}>Tech Stack</SectionLabel>
        <TechStack techs={techs} themeColors={theme.colors} />

        <SectionLabel $themeColors={theme.colors}>What It Does</SectionLabel>
        <Highlights highlights={highlights} themeColors={theme.colors} />
      </CardBody>

      <CardFooter>
        <Divider $themeColors={theme.colors} />
        
        {/* Resources Grid - LinkedIn style preview cards */}
        <ResourcesGrid>
          {/* GitHub Card */}
          <ResourceCard
            $themeColors={theme.colors}
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
            $themeColors={theme.colors}
            onClick={() => window.open('/projects/ocean_life/presentation.pdf', '_blank')}
          >
            <ResourcePreview $type="presentation" $preview={oceanlifePreview}>
              <ResourceIcon>📊</ResourceIcon>
            </ResourcePreview>
            <ResourceCaption>Presentation</ResourceCaption>
          </ResourceCard>
        </ResourcesGrid>
      </CardFooter>
    </CardBase>
  );
};

/* ================= Ocean-specific Resources Grid ================= */

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
  background: ${({ $themeColors }) => $themeColors?.resourceBackground || 'rgba(255,180,100,0.1)'};
  border: 1.5px solid ${({ $themeColors }) => $themeColors?.resourceBorder || 'rgba(255,180,100,0.3)'};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
  
  &:hover {
    transform: translateY(-4px);
    border-color: ${({ $themeColors }) => $themeColors?.resourceHoverBorder || 'rgba(255,180,100,0.5)'};
    box-shadow: ${({ $themeColors }) => $themeColors?.resourceHoverShadow || '0 6px 20px rgba(255,180,100,0.25)'};
    background: ${({ $themeColors }) => $themeColors?.resourceHoverBackground || 'rgba(255,180,100,0.15)'};
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

