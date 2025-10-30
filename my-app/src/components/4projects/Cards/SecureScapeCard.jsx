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

// Project assets
import securescapeLogo from '@/images/projects/secure_scape/securescape.png';
import securescapePreview from '@/images/projects/secure_scape/securescape_preview.png';

const SecureScapeCard = ({ isFocused = false }) => {
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

      <CardBody>
        <SectionLabel $themeColors={theme.colors}>Tech Stack</SectionLabel>
        <TechStack techs={techs} themeColors={theme.colors} />

        <SectionLabel style={{ marginTop: '0.75rem' }} $themeColors={theme.colors}>What It Does</SectionLabel>
        <Highlights highlights={highlights} themeColors={theme.colors} />
      </CardBody>

      <CardFooter>
        <Divider $themeColors={theme.colors} />
        
        {/* Primary CTA: Full Demo Site */}
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

/* ================= SecureScape-specific Footer Components ================= */

const LivePreviewContainer = styled.div`
  display: flex; 
  align-items: center; 
  gap: 1rem; 
  padding: 0.85rem;
  border-radius: 12px;
  background: ${({ $themeColors }) =>
    $themeColors?.previewBackground || 'rgba(255,180,100,0.1)'};
  border: 2px solid ${({ $themeColors }) => $themeColors?.previewBorder || 'rgba(255,180,100,0.3)'};
  cursor: pointer; 
  transition: all 0.4s cubic-bezier(0.4,0,0.2,1);
  position: relative; 
  overflow: hidden;

  &::before{
    content:''; 
    position:absolute; 
    top:0; 
    left:-100%; 
    width:100%; 
    height:100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
    transition: left 0.6s ease;
  }

  &:hover{
    background: ${({ $themeColors }) =>
      $themeColors?.previewHoverBackground || 'rgba(255,180,100,0.15)'};
    border-color: ${({ $themeColors }) => $themeColors?.previewHoverBorder || 'rgba(255,180,100,0.5)'};
    transform: translateY(-4px);
    box-shadow: ${({ $themeColors }) => $themeColors?.previewHoverShadow || '0 8px 24px rgba(255,180,100,0.3)'};
    &::before{ left:100%; }
  }

  @media (max-width: 600px){ 
    flex-direction: column; 
    text-align: center; 
  }
`;

const PreviewImageWrapper = styled.div`
  flex-shrink: 0; 
  width: 100px; 
  height: auto; 
  border-radius: 10px; 
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0,0,0,0.3); 
  transition: transform 0.4s ease;
  ${LivePreviewContainer}:hover & { transform: scale(1.05); }
`;

const PreviewImage = styled.img`
  width: 100%; 
  height: 100%; 
  object-fit: cover;
`;

const PreviewTextContent = styled.div`
  display: flex; 
  flex-direction: column; 
  gap: 0.3rem; 
  flex: 1; 
  position: relative;
`;

const PreviewTitle = styled.div`
  font-size: 1.1rem; 
  font-weight: 700; 
  color: #fff; 
  text-shadow: 0 2px 4px rgba(0,0,0,0.2);
`;

const PreviewSubtext = styled.div`
  font-size: 0.85rem; 
  color: rgba(255,255,255,0.85); 
  font-weight: 500;
`;

const PreviewArrow = styled.div`
  position: absolute; 
  right: 2.5%; 
  top: 50%; 
  transform: translateY(-50%);
  font-size: 1.6rem; 
  color: rgba(255,255,255,0.7); 
  transition: all 0.4s cubic-bezier(0.4,0,0.2,1);
  ${LivePreviewContainer}:hover & {
    transform: translateY(-50%) translateX(8px); 
    color: rgba(255,255,255,1);
  }
  @media (max-width: 600px){
    position: static; 
    transform: none;
    ${LivePreviewContainer}:hover & { transform: translateX(8px); }
  }
`;

export default SecureScapeCard;