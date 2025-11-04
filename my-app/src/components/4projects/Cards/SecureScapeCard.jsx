// securescapecard.jsx

// card for the secure scape project, following styling of site that i built.

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
import securescapeLogo from '@/images/4projects/secure_scape/securescape.png';
import securescapePreview from '@/images/4projects/secure_scape/securescape_preview.png';

// main secure scape card component.
const SecureScapeCard = ({ isFocused = false }) => {

  // the tech, highlights, and theme for secure scape card.
  const techs = [
    'ESP32-CAM',
    'Arduino',
    'Edge Impulse',
    'Flutter',
    'Dart',
    'React',
    'WebSockets'
  ];

  const highlights = [
    'On-device person detection via Edge Impulse machine learning, completely offline operation',
    'Instant local alarms with image capture and real-time relay to mobile app',
    'Multi-node wireless coverage with lightweight messaging for comprehensive perimeter security'
  ];

  const theme = themes.secure;

  return (
    <CardBase theme={true} themeName="secure" themeColors={theme.colors} isFocused={isFocused}>
      {/* card header */}
      <CardHeader>
        <HeaderTop>
          <ProjectInfo>
            <ProjectName $themeColors={theme.colors}>SecureScape</ProjectName>
            <ProjectSubtitle>Portable Smart Security System</ProjectSubtitle>
            <ProjectDate>Aug 2024 – May 2025</ProjectDate>
          </ProjectInfo>
          <ProjectLogoImage src={securescapeLogo} alt="SecureScape Logo" />
        </HeaderTop>

        <ProjectDescription>
          Portable security camera posts that detect people and alert your phone. Works completely offline, perfect for campsites and remote spots with no internet.
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

      {/* card footer (demo site)*/}
      <CardFooter>
        <Divider $themeColors={theme.colors} />
        
        {/* primary cta: full demo site */}
        <LivePreviewContainer
          $themeColors={theme.colors}
          onClick={() => window.open('/demos/securescape.html', '_blank')}
        >
          <PreviewImageWrapper>
            <PreviewImage src={securescapePreview} alt="SecureScape Demo Site" />
          </PreviewImageWrapper>
          <PreviewTextContent>
            <PreviewTitle>View A Demo Of The Site</PreviewTitle>
            <PreviewSubtext>Our Documentation & Project Demos</PreviewSubtext>
            <PreviewArrow>→</PreviewArrow>
          </PreviewTextContent>
        </LivePreviewContainer>
      </CardFooter>
    </CardBase>
  );
};

/* ================= secure scape-specific footer components ================= */

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
    border: 2px solid ${({ $themeColors }) => $themeColors?.previewBorder || 'rgba(255,180,100,0.3)'};
    transition: all 0.4s cubic-bezier(0.4,0,0.2,1);
    background: ${({ $themeColors }) =>
        $themeColors?.previewBackground || 'rgba(255,180,100,0.1)'};
    
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
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
        transition: left 0.6s ease;
    }
    
    /* hover effects */
    &:hover {
        transform: translateY(-4px);
        background: ${({ $themeColors }) =>
            $themeColors?.previewHoverBackground || 'rgba(255,180,100,0.15)'};
        border-color: ${({ $themeColors }) => $themeColors?.previewHoverBorder || 'rgba(255,180,100,0.5)'};
        box-shadow: ${({ $themeColors }) => $themeColors?.previewHoverShadow || '0 8px 24px rgba(255,180,100,0.3)'};
        
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
    box-shadow: 0 3px 10px rgba(0,0,0,0.3);
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
    color: #fff;
    text-shadow: 0 2px 4px rgba(0,0,0,0.2);
`;

const PreviewSubtext = styled.div`
    /* styles */
    font-size: 0.85rem;
    font-weight: 500;
    color: rgba(255,255,255,0.85);
`;

const PreviewArrow = styled.div`
    /* layout */
    position: absolute;
    right: 2.5%;
    top: 50%;
    transform: translateY(-50%);
    
    /* styles */
    font-size: 1.6rem;
    color: rgba(255,255,255,0.7);
    transition: all 0.4s cubic-bezier(0.4,0,0.2,1);
    
    /* hover effects */
    ${LivePreviewContainer}:hover & {
        transform: translateY(-50%) translateX(8px);
        color: rgba(255,255,255,1);
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
export default SecureScapeCard;