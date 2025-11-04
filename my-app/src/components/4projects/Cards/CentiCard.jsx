// centicard.jsx

// the centi card for the projects page.

// imports.
import React from 'react';
import styled from 'styled-components';

// shared components.
import CardBase, { 
  CardHeader, 
  HeaderTop, 
  ProjectInfo, 
  ProjectName, 
  ProjectSubtitle, 
  ProjectDate, 
  ProjectDescription, 
  Divider, 
  CardBody, 
  SectionLabel,
  CardFooter
} from '../shared/CardBase';
import TechStack from '../shared/TechStack';
import Highlights from '../shared/Highlights';
import { themes } from '../shared/themes';
import WIPRibbon from '../WIPRibbon';

// import project logos and previews.
import centiBanner from '@/images/4projects/centi/centi_banner.png';
import centiPreview from '@/images/4projects/centi/centiPreview.png';

// main centi card component.
const CentiCard = ({ isFocused = false }) => {
  
  // the tech stack for the centi card.
  const techs = ['React', 'FastAPI', 'PostgreSQL', 'Plaid API', 'Google OAuth', 'JWT', 'Vercel', 'Railway'];

  // the highlights for the centi card.
  const highlights = [
    'Automatically syncs with your bank accounts so you don\'t have to manually track every purchase',
    'Gives you a personalized "Centi Score" that shows your financial health at a glance',
    'Breaks down your spending into easy-to-read charts so you can see where your money goes each month'
  ];

  // the theme for the centi card.
  const theme = themes.centi;

  return (
    <CardBase theme={true} themeName="centi" themeColors={theme.colors} isFocused={isFocused}>
      {/* wip ribbon */}
      <WIPRibbon text="IN PROGRESS" />
      
      {/* card header */}
      <CardHeader>
        <HeaderTop>
          <ProjectInfo>
            <ProjectName $themeColors={theme.colors}>Centi</ProjectName>
            <ProjectSubtitle>Personal Finance Organizer</ProjectSubtitle>
            <ProjectDate>Jun 2025 - Present</ProjectDate>
          </ProjectInfo>
          <CentiLogoImage src={centiBanner} alt="Centi Logo" />
        </HeaderTop>
        
        <ProjectDescription>
          A friendly dashboard that actually helps you understand where your money's going. No spreadsheets, no confusion, just clear insights that make sense.
        </ProjectDescription>
        <Divider $themeColors={theme.colors} />
      </CardHeader>
      
      {/* card body */}
      <CardBody>
        <SectionLabel $themeColors={theme.colors}>Tech Stack</SectionLabel>
        <TechStack techs={techs} themeColors={theme.colors} />
        
        <SectionLabel $themeColors={theme.colors}>What It Does</SectionLabel>
        <Highlights highlights={highlights} themeColors={theme.colors} />
      </CardBody>
      
      {/* card footer */}
      <CardFooter>
        <Divider $themeColors={theme.colors} />
        
        {/* live preview container */}
        <LivePreviewContainer 
          $themeColors={theme.colors}
          onClick={() => window.open('https://centi.dev', '_blank')}
        >
          <PreviewImageWrapper>
            <PreviewImage src={centiPreview} alt="Centi Preview" />
          </PreviewImageWrapper>
          <PreviewTextContent>
            <PreviewTitle>Check it out for yourself!</PreviewTitle>
            <PreviewSubtext>Visit centi.dev</PreviewSubtext>
            <PreviewArrow>→</PreviewArrow>
          </PreviewTextContent>
        </LivePreviewContainer>
      </CardFooter>
    </CardBase>
  );
};

/* ================= centi-specific components ================= */

const CentiLogoImage = styled.img`
    /* spacing */
    width: 200px;
    height: auto;
    
    /* styles */
    border-radius: 12px;
    object-fit: contain;
`;

/* ================= centi-specific preview components ================= */

const LivePreviewContainer = styled.div`
    /* layout */
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    
    /* spacing */
    gap: 1rem;
    padding: 0.85rem;
    
    /* styles */
    border-radius: 12px;
    cursor: pointer;
    border: 2px solid ${({ $themeColors }) => $themeColors?.previewBorder || 'rgba(255, 180, 100, 0.3)'};
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    background: ${({ $themeColors }) => $themeColors?.previewBackground || 'rgba(255, 180, 100, 0.1)'};
    
    /* shimmer effect */
    &::before {
        /* layout */
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        
        /* spacing */
        width: 100%;
        height: 100%;
        
        /* styles */
        background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
        );
        transition: left 0.6s ease;
    }
    
    /* hover effects */
    &:hover {
        transform: translateY(-4px);
        background: ${({ $themeColors }) => $themeColors?.previewHoverBackground || 'rgba(255, 180, 100, 0.15)'};
        border-color: ${({ $themeColors }) => $themeColors?.previewHoverBorder || 'rgba(255, 180, 100, 0.5)'};
        box-shadow: ${({ $themeColors }) => $themeColors?.previewHoverShadow || '0 8px 24px rgba(255, 180, 100, 0.3)'};
        
        &::before {
            left: 100%;
        }
    }
    
    /* media queries */
    @media (max-width: 600px) {
        flex-direction: column;
        text-align: center;
    }
`;

const PreviewImageWrapper = styled.div`
    /* layout */
    flex-shrink: 0;
    overflow: hidden;
    
    /* spacing */
    width: 100px;
    height: auto;
    
    /* styles */
    border-radius: 10px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
    transition: transform 0.4s ease;
    
    /* hover effects */
    ${LivePreviewContainer}:hover & {
        transform: scale(1.05);
    }
`;

const PreviewImage = styled.img`
    /* spacing */
    width: 100%;
    height: 100%;
    
    /* styles */
    object-fit: cover;
`;

const PreviewTextContent = styled.div`
    /* layout */
    display: flex;
    flex-direction: column;
    position: relative;
    flex: 1;
    
    /* spacing */
    gap: 0.3rem;
`;

const PreviewTitle = styled.div`
    /* styles */
    font-size: 1.1rem;
    font-weight: 700;
    color: rgba(255, 255, 255, 1);
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const PreviewSubtext = styled.div`
    /* styles */
    font-size: 0.85rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.85);
`;

const PreviewArrow = styled.div`
    /* layout */
    position: absolute;
    right: 2.5%;
    top: 50%;
    transform: translateY(-50%);
    
    /* styles */
    font-size: 1.6rem;
    color: rgba(255, 255, 255, 0.7);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    
    /* hover effects */
    ${LivePreviewContainer}:hover & {
        transform: translateY(-50%) translateX(8px);
        color: rgba(255, 255, 255, 1);
    }
    
    /* media queries */
    @media (max-width: 600px) {
        position: static;
        transform: none;
        
        ${LivePreviewContainer}:hover & {
            transform: translateX(8px);
        }
    }
`;

// export component.
export default CentiCard;