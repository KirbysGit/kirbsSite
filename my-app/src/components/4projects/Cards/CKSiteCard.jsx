// cksitecard.jsx

// card for my site!

// imports.
import React from 'react';
import styled, { keyframes } from 'styled-components';

// shared components.
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
import { themes } from '../shared/themes';
import TechStack from '../shared/TechStack';
import Highlights from '../shared/Highlights';

// images.
import fullLogo from '@/images/0navbar/navLogo.png';
import ckPreview from '@/images/4projects/cksite/ckpreview.png';

/* ================== main component ================== */

const CKSiteCard = ({ isFocused = false }) => {

  // the tech stack for the cksite card.
  const techs = ['React', 'JavaScript', 'Vercel'];

  // the highlights for the cksite card.
  const highlights = [
    'Real projects I\'ve built including full-stack web applications and machine learning experiments',
    'Work experience from internships to leadership roles showing what I learned and shipped to production',
    'Who I am, what I do, and the skills I bring with me to every project'
  ];

  // the theme for the cksite card.
  const theme = themes.cosmic;

  // return the cksite card.
  return (
    <CardBase theme={true} themeName="cosmic" themeColors={theme.colors} isFocused={isFocused}>
		{/* star field */}
		<StarField>
			<Star $top="15%" $left="10%" $size="2px" $delay="0s" />
			<Star $top="25%" $left="80%" $size="1.5px" $delay="1s" />
			<Star $top="45%" $left="20%" $size="1px" $delay="2s" />
			<Star $top="60%" $left="90%" $size="2px" $delay="0.5s" />
			<Star $top="75%" $left="15%" $size="1.5px" $delay="1.5s" />
			<Star $top="35%" $left="60%" $size="1px" $delay="0.8s" />
			<Star $top="80%" $left="70%" $size="2px" $delay="1.2s" />
			<Star $top="20%" $left="45%" $size="1.5px" $delay="2.5s" />
		</StarField>

		{/* card header */}
		<CardHeader>
			<HeaderTop>
			<ProjectInfo>
				<ProjectName $themeColors={theme.colors}>CK's Site</ProjectName>
				<ProjectSubtitle>This Portfolio · My Digital Journey</ProjectSubtitle>
				<ProjectDate>2024 – Present</ProjectDate>
			</ProjectInfo>
			<LargerProjectLogo src={fullLogo} alt="CK's Site Logo" />
			</HeaderTop>

			<ProjectDescription>
			  	This site! It's a constant work in progress, but I'm using it to showcase my projects and skills. It serves as a living document of my path through my career.
			</ProjectDescription>

			<Divider $themeColors={theme.colors} />
		</CardHeader>

		{/* card body */}
		<CardBody>
			<SectionLabel $themeColors={theme.colors}>Tech Stack</SectionLabel>
			<TechStack techs={techs} themeColors={theme.colors} />

			<SectionLabel style={{ marginTop: '0.75rem' }} $themeColors={theme.colors}>What It Shows</SectionLabel>
			<Highlights highlights={highlights} themeColors={theme.colors} />
		</CardBody>

		{/* card footer */}
		<CardFooter>
			<Divider $themeColors={theme.colors} />
			
			<SiteCard
				$themeColors={theme.colors}
				onClick={() => window.open('https://colinkirby.dev', '_blank')}
			>
				<SitePreview $preview={ckPreview} />
				<SiteCaption>Here, but in a new tab.</SiteCaption>
			</SiteCard>
		</CardFooter>
    </CardBase>
  );
};

export default CKSiteCard;

/* ================= cksite-specific styles ================= */

const twinkle = keyframes`
    0%, 100% { 
        opacity: 0.3; 
        transform: scale(1); 
    }
    50% { 
        opacity: 1; 
        transform: scale(1.2); 
    }
`;

const StarField = styled.div`
    /* layout */
    inset: 0;
    z-index: 0;
    position: absolute;
    
    /* styles */
    pointer-events: none;
`;

const Star = styled.div`
    /* layout */
    position: absolute;
    top: ${props => props.$top};
    left: ${props => props.$left};
    
    /* spacing */
    width: ${props => props.$size};
    height: ${props => props.$size};
    
    /* styles */
    background: white;
    border-radius: 50%;
    box-shadow: 0 0 3px rgba(255, 255, 255, 0.8);
    animation: ${twinkle} 3s ease-in-out infinite;
    animation-delay: ${props => props.$delay};
`;

const LargerProjectLogo = styled(ProjectLogoImage)`
    /* spacing */
    width: 150px;
    
    /* media queries */
    @media (max-width: 2000px) {
        width: 140px;
    }

    @media (max-width: 1600px) {
        width: 130px;
    }
`;

const SiteCard = styled.div`
    /* layout */
    display: flex;
    overflow: hidden;
    flex-direction: column;
    
    /* styles */
    cursor: pointer;
    border-radius: 10px;
    border: 1.5px solid ${({ $themeColors }) => $themeColors?.resourceBorder || 'rgba(153,204,255,0.3)'};
    transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
    background: ${({ $themeColors }) => $themeColors?.resourceBackground || 'rgba(153,204,255,0.1)'};
    
    /* hover effects */
    &:hover {
        transform: translateY(-4px);
        border-color: ${({ $themeColors }) => $themeColors?.resourceHoverBorder || 'rgba(153,204,255,0.5)'};
        background: ${({ $themeColors }) => $themeColors?.resourceHoverBackground || 'rgba(153,204,255,0.15)'};
        box-shadow: ${({ $themeColors }) => $themeColors?.resourceHoverShadow || '0 6px 20px rgba(153,204,255,0.25)'};
    }
`;

const SitePreview = styled.div`
    /* layout */
    display: flex;
    overflow: hidden;
    position: relative;
    align-items: center;
    justify-content: center;
    
    /* spacing */
    width: 100%;
    height: 80px;
    
    /* styles */
    background: ${({ $preview }) => 
        $preview 
            ? `url(${$preview}) center/cover no-repeat`
            : 'linear-gradient(135deg, rgba(153,204,255,0.2), rgba(187,170,255,0.15))'
    };
    
    /* pseudo-elements */
    &::before {
        /* layout */
        inset: 0;
        position: absolute;
        
        /* styles */
        content: '';
        background: ${({ $preview }) => 
            $preview 
                ? 'linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 100%)'
                : 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.05) 100%)'
        };
    }
`;

const SiteCaption = styled.div`
    /* layout */
    text-align: center;
    
    /* spacing */
    padding: 0.5rem;
    
    /* styles */
    font-weight: 600;
    font-size: 0.8rem;
    letter-spacing: 0.3px;
    color: rgba(255,255,255,0.95);
    background: rgba(0,0,0,0.15);
`;
