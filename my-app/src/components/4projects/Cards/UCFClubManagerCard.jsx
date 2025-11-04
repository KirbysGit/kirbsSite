// ucfclubmanagercard.jsx

// card for the ucf club manager project,

// imports.
import React from 'react';
import styled from 'styled-components';

// shared components.
import CardBase, { 
  CardHeader, 
  HeaderTop, 
  ProjectInfo, 
  ProjectName, 
  ProjectDate, 
  ProjectLogoImage,
  ProjectDescription, 
  Divider, 
  CardBody, 
  SectionLabel,
  CardFooter
} from '../shared/CardBase';
import { themes } from '../shared/themes';
import TechStack from '../shared/TechStack';
import Highlights from '../shared/Highlights';

// import project assets.
import ucfLogo from '@/images/4projects/ucf_manager/ucflogo.png';
import presentationPreview from '@/images/4projects/ucf_manager/presentationpreview.png';
import figmaPreview from '@/images/4projects/ucf_manager/figmapreview.png';

// main ucf club manager card component.
const UCFClubManagerCard = ({ isFocused = false }) => {

  // techs, highlights, & theme.
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

  const highlights = [
    'User authentication with sign-up, login, password reset, and email verification',
    'Club management with create, search, join/leave, admin controls, and delete functionality',
    'Event system with RSVP, calendar view, and club-specific event browsing'
  ];

  const theme = themes.ucf;

  return (
    <CardBase theme={true} themeName="ucf" themeColors={theme.colors} isFocused={isFocused}>
		{/* card header */}
		<CardHeader>
			<HeaderTop>
				<ProjectInfo>
					<ProjectName $themeColors={theme.colors}>UCF Club & Event Manager</ProjectName>
					<ProjectDate>Jun 2024 – Jul 2024</ProjectDate>
				</ProjectInfo>
				<ProjectLogoImage src={ucfLogo} alt="UCF Logo" />
			</HeaderTop>

			<ProjectDescription>
				A full-stack MERN app for streamlined club management and event registration. Built with a team of 6 students, deployed to Heroku with REST API documented on SwaggerHub.
			</ProjectDescription>

			<Divider $themeColors={theme.colors} />
		</CardHeader>

		{/* card body */}
		<CardBody>
			<SectionLabel $themeColors={theme.colors}>Tech Stack</SectionLabel>
			<TechStack techs={techs} themeColors={theme.colors} />

			<SectionLabel style={{ marginTop: '0.75rem' }} $themeColors={theme.colors}>What It Does</SectionLabel>
			<Highlights highlights={highlights} themeColors={theme.colors} />
		</CardBody>

		{/* card footer */}
		<CardFooter>
			<Divider $themeColors={theme.colors} />
			
			{/* resources grid*/}
			<ResourcesGrid>
			{/* presentation pdf card */}
			<ResourceCard
				$themeColors={theme.colors}
				onClick={() => window.open('/projects/ucf_manager/ucfPres.pdf', '_blank')}
			>
				<ResourcePreview $type="presentation" $preview={presentationPreview}>
				<ResourceIcon>📊</ResourceIcon>
				</ResourcePreview>
				<ResourceCaption>Presentation</ResourceCaption>
			</ResourceCard>

			{/* figma wireframes card */}
			<ResourceCard
				$themeColors={theme.colors}
				onClick={() => window.open('https://www.figma.com/design/Hwzwi4uOEoVn6BrEA4815n/UCF-Club---Event-Manager-UI?m=auto&t=89iyNh5XCpEONUi7-6', '_blank')}
			>
				<ResourcePreview $type="figma" $preview={figmaPreview}>
				<ResourceIcon>🎨</ResourceIcon>
				</ResourcePreview>
				<ResourceCaption>Figma Wireframes</ResourceCaption>
			</ResourceCard>

			{/* github card */}
			<ResourceCard
				$themeColors={theme.colors}
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
    </CardBase>
  );
};

/* ================= ucf-specific resources grid styles ================= */

const ResourcesGrid = styled.div`
    /* layout */
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    
    /* spacing */
    width: 100%;
    gap: 0.75rem;
    
    /* media queries */
    @media (max-width: 2000px) {
        gap: 0.65rem;
    }

    @media (max-width: 1600px) {
        gap: 0.55rem;
    }
    
    @media (max-width: 600px) {
        grid-template-columns: 1fr;
    }
`;

const ResourceCard = styled.div`
    /* layout */
    display: flex;
    flex-direction: column;
    overflow: hidden;
    
    /* styles */
    border-radius: 10px;
    cursor: pointer;
    border: 1.5px solid ${({ $themeColors }) => $themeColors?.resourceBorder || 'rgba(255,180,100,0.3)'};
    transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
    background: ${({ $themeColors }) => $themeColors?.resourceBackground || 'rgba(255,180,100,0.1)'};
    
    /* hover effects */
    &:hover {
        transform: translateY(-4px);
        border-color: ${({ $themeColors }) => $themeColors?.resourceHoverBorder || 'rgba(255,180,100,0.5)'};
        background: ${({ $themeColors }) => $themeColors?.resourceHoverBackground || 'rgba(255,180,100,0.15)'};
        box-shadow: ${({ $themeColors }) => $themeColors?.resourceHoverShadow || '0 6px 20px rgba(255,180,100,0.25)'};
    }
`;

const ResourcePreview = styled.div`
    /* layout */
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    
    /* spacing */
    width: 100%;
    height: 80px;
    
    /* styles */
    background: ${({ $type, $preview }) => {
        if ($preview) {
            return `url(${$preview}) center/cover no-repeat`;
        }
        if ($type === 'presentation') return 'linear-gradient(135deg, rgba(255, 201, 4, 0.2), rgba(255, 217, 102, 0.15))';
        if ($type === 'figma') return 'linear-gradient(135deg, rgba(255, 201, 4, 0.2), rgba(255, 217, 102, 0.15))';
        if ($type === 'github') return 'linear-gradient(135deg, rgba(50, 50, 50, 0.3), rgba(30, 30, 30, 0.2))';
        return 'rgba(255,255,255,0.05)';
    }};
    
    /* overlay gradient */
    &::before {
        /* layout */
        content: '';
        position: absolute;
        inset: 0;
        
        /* styles */
        background: ${({ $preview }) => 
            $preview 
                ? 'linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 100%)'
                : 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.05) 100%)'
        };
    }
    
    /* media queries */
    @media (max-width: 2000px) {
        height: 75px;
    }

    @media (max-width: 1600px) {
        height: 70px;
    }
`;

const ResourceIcon = styled.div`
    /* layout */
    z-index: 1;
    
    /* styles */
    font-size: 2rem;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
    transition: transform 0.3s ease;
    
    /* hover effects */
    ${ResourceCard}:hover & {
        transform: scale(1.15);
    }
    
    /* media queries */
    @media (max-width: 1600px) {
        font-size: 1.75rem;
    }
`;

const GitHubLogoIcon = styled.div`
    /* layout */
    z-index: 1;
    
    /* spacing */
    width: 60px;
    height: 60px;
    
    /* styles */
    color: rgba(255, 255, 255, 0.95);
    filter: drop-shadow(0 3px 8px rgba(0,0,0,0.4));
    transition: all 0.3s ease;
    
    /* svg sizing */
    svg {
        width: 100%;
        height: 100%;
    }
    
    /* hover effects */
    ${ResourceCard}:hover & {
        transform: scale(1.1);
        color: rgba(255, 201, 4, 1);
    }
    
    /* media queries */
    @media (max-width: 2000px) {
        width: 55px;
        height: 55px;
    }

    @media (max-width: 1600px) {
        width: 50px;
        height: 50px;
    }
`;

const ResourceCaption = styled.div`
    /* layout */
    text-align: center;
    
    /* spacing */
    padding: 0.5rem;
    
    /* styles */
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.3px;
    color: rgba(255,255,255,0.95);
    background: rgba(0,0,0,0.15);
    
    /* media queries */
    @media (max-width: 2000px) {
        padding: 0.45rem;
        font-size: 0.75rem;
    }

    @media (max-width: 1600px) {
        padding: 0.4rem;
        font-size: 0.7rem;
    }
`;

// export component.
export default UCFClubManagerCard;
