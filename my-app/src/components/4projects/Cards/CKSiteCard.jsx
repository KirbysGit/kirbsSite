import React from 'react';
import styled, { keyframes } from 'styled-components';

// Shared components
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
  SectionLabel 
} from '../shared/CardBase';
import TechStack from '../shared/TechStack';
import Highlights from '../shared/Highlights';
import { themes } from '../shared/themes';
import WIPRibbon from '../WIPRibbon';

const CKSiteCard = ({ isFocused = false }) => {
  const techs = ['React', 'JavaScript', 'Vercel'];

  const highlights = [
    'Real projects I\'ve built including full-stack web applications and machine learning experiments',
    'Complete education journey at UCF and all the technical skills I\'ve picked up along the way',
    'Work experience from internships to leadership roles showing what I learned and shipped to production'
  ];

  const theme = themes.cosmic;

  return (
    <CardBase theme={true} themeName="cosmic" themeColors={theme.colors} isFocused={isFocused}>
      <WIPRibbon text="IN PROGRESS" />
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
            <ProjectName $themeColors={theme.colors}>CK's Site</ProjectName>
            <ProjectSubtitle>This Portfolio · My Digital Journey</ProjectSubtitle>
            <ProjectDate>2024 – Present</ProjectDate>
          </ProjectInfo>
        </HeaderTop>

        <ProjectDescription>
          This site! It's a constant work in progress, but I'm using it to showcase my projects and skills. It serves as a living document of my path through my career.
        </ProjectDescription>

        <Divider $themeColors={theme.colors} />
      </CardHeader>

      <CardBody>
        <SectionLabel $themeColors={theme.colors}>Tech Stack</SectionLabel>
        <TechStack techs={techs} themeColors={theme.colors} />

        <SectionLabel style={{ marginTop: '0.75rem' }} $themeColors={theme.colors}>What It Shows</SectionLabel>
        <Highlights highlights={highlights} themeColors={theme.colors} />
      </CardBody>
    </CardBase>
  );
};

/* ================= CKSite-specific Starfield Animation ================= */

const twinkle = keyframes`
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
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

export default CKSiteCard;
