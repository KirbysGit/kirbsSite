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

// Import project images
import shelfBanner from '@/images/projects/shelf_vision/shelfvision.png';
import paperPreview from '@/images/projects/shelf_vision/paperpreview.png';
import presentationPreview from '@/images/projects/shelf_vision/presentationpreview.png';

const ShelfVisionCard = ({ isFocused = false }) => {
  const techs = [
    'Python', 'PyTorch', 'OpenCV',
    'NumPy', 'Pandas', 'Matplotlib', 'scikit-learn'
  ];

  const highlights = [
    'Detects products in crowded retail shelf photos using ResNet-50 and FPN features',
    'Handles overlapping items with smart anchor matching and IoU-based detection algorithms',
    'Benchmarked on SKU-110K dataset with comprehensive metrics and YOLOv5 comparisons'
  ];

  const theme = themes.shelf;

  return (
    <CardBase theme={true} themeName="shelf" themeColors={theme.colors} isFocused={isFocused}>
      <CardHeader>
        <HeaderTop>
          <ProjectInfo>
            <ProjectName $themeColors={theme.colors}>ShelfVision</ProjectName>
            <ProjectSubtitle>Dense Shelf Object Detection</ProjectSubtitle>
            <ProjectDate>Jan 2025 – May 2025</ProjectDate>
          </ProjectInfo>
          <ProjectLogoImage src={shelfBanner} alt="ShelfVision Logo" />
        </HeaderTop>

        <ProjectDescription>
          A vision model that finds products in crowded retail-shelf photos. Basically scans shelf images, draws boxes for each item, and stays reliable even when things overlap.
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
        
        {/* Resources Grid - LinkedIn style preview cards */}
        <ResourcesGrid>
          {/* Paper PDF Card */}
          <ResourceCard
            $themeColors={theme.colors}
            onClick={() => window.open('/projects/shelf_vision/paper.pdf', '_blank')}
          >
            <ResourcePreview $type="paper" $preview={paperPreview}>
              <ResourceIcon>📄</ResourceIcon>
            </ResourcePreview>
            <ResourceCaption>Project Paper</ResourceCaption>
          </ResourceCard>

          {/* Presentation PDF Card */}
          <ResourceCard
            $themeColors={theme.colors}
            onClick={() => window.open('/projects/shelf_vision/presentation.pdf', '_blank')}
          >
            <ResourcePreview $type="presentation" $preview={presentationPreview}>
              <ResourceIcon>📊</ResourceIcon>
            </ResourcePreview>
            <ResourceCaption>Presentation</ResourceCaption>
          </ResourceCard>

          {/* GitHub Card */}
          <ResourceCard
            $themeColors={theme.colors}
            onClick={() => window.open('https://github.com/KirbysGit/shelfVision', '_blank')}
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

/* ================= ShelfVision-specific Resources Grid ================= */

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
    if ($type === 'paper') return 'linear-gradient(135deg, rgba(34,211,238,0.2), rgba(8,145,178,0.15))';
    if ($type === 'presentation') return 'linear-gradient(135deg, rgba(167,243,208,0.2), rgba(34,211,238,0.15))';
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
    color: rgba(255, 255, 255, 1);
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

export default ShelfVisionCard;
