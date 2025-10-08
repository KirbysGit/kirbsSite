import React, { useState } from 'react';
import styled from 'styled-components';

// 🔁 Replace with your actual assets
import securescapeLogo from '@/images/projects/secure_scape/securescape.png';
import securescapePreview from '@/images/projects/secure_scape/securescape_preview.png';

// Your existing logo map
import { getLogo } from '@/components/Utils/logoMap';

const SecureScapeCard = () => {
  const [hoveredTech, setHoveredTech] = useState(null);

  const techs = [
    'ESP32-CAM',
    'Arduino',
    'Edge Impulse',
    'Flutter',
    'Dart',
    'React',
    'WebSockets'
  ];

    return (
    <ProjectCard $secureTheme>
            <CardHeader>
                <HeaderTop>
                    <ProjectInfo>
            <ProjectName $secureTheme>SecureScape</ProjectName>
            <ProjectSubtitle>Portable Smart Security System</ProjectSubtitle>
            <ProjectDate>Aug 2024 – May 2025</ProjectDate>
                    </ProjectInfo>
          <ProjectLogoImage src={securescapeLogo} alt="SecureScape Logo" />
                </HeaderTop>

        <ProjectDescription>
          Portable security camera posts that detect people and alert your phone. Works completely offline, perfect for campsites and remote spots with no internet.
        </ProjectDescription>

        <Divider $secureTheme $themeColor="#00A86B" />
            </CardHeader>

      <CardBody>
        <SectionLabel $secureTheme>Tech Stack</SectionLabel>
        <TechStack>
          {techs.map((tech) => (
            <TechPillWrapper
              key={tech}
              onMouseEnter={() => setHoveredTech(tech)}
              onMouseLeave={() => setHoveredTech(null)}
            >
              <TechPill $secureTheme>
                <TechLogo src={getLogo(tech)} alt={tech} />
              </TechPill>
              <Tooltip $visible={hoveredTech === tech} $secureTheme>
                {tech}
              </Tooltip>
            </TechPillWrapper>
          ))}
        </TechStack>

        <SectionLabel style={{ marginTop: '0.75rem' }} $secureTheme>What It Does</SectionLabel>
        <HighlightsList>
          <Highlight $secureTheme>
            <HighlightText>On-device person detection via Edge Impulse machine learning, completely offline operation</HighlightText>
          </Highlight>
          <Highlight $secureTheme>
            <HighlightText>Instant local alarms with image capture and real-time relay to mobile app</HighlightText>
          </Highlight>
          <Highlight $secureTheme>
            <HighlightText>Multi-node wireless coverage with lightweight messaging for comprehensive perimeter security</HighlightText>
          </Highlight>
        </HighlightsList>
      </CardBody>

      <CardFooter>
        <Divider $secureTheme $themeColor="#00A86B" />
        
        {/* Primary CTA: Full Demo Site */}
        <LivePreviewContainer
          $secureTheme
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
        </ProjectCard>
  );
};

/* ========================= THEME: SecureScape (forest/infra) ========================= */

const ProjectCard = styled.div`
  width: 500px;
  min-height: 600px;

  /* Deep forest → pine gradient */
  background: ${({ $secureTheme }) => $secureTheme ? `
    linear-gradient(135deg,
      rgba(10, 26, 20, 0.96) 0%,
      rgba(16, 43, 33, 0.94) 28%,
      rgba(23, 67, 49, 0.92) 56%,
      rgba(33, 98, 71, 0.90) 100%
    )` : `linear-gradient(135deg,
      rgba(34,34,34,0.15) 0%,
      rgba(30,30,30,0.12) 50%,
      rgba(25,25,25,0.10) 100%
    )`
  };
  backdrop-filter: blur(20px) saturate(110%);
  -webkit-backdrop-filter: blur(20px) saturate(110%);

  border: 1px solid ${({ $secureTheme }) => $secureTheme ? 'rgba(0, 168, 107, 0.5)' : 'rgba(255,180,100,0.4)'};
  border-radius: 24px;
  box-shadow: ${({ $secureTheme }) => $secureTheme ? `
      0 8px 32px rgba(0, 0, 0, 0.35),
      inset 0 1px 2px rgba(64, 145, 108, 0.28),
      inset 0 -1px 2px rgba(0, 0, 0, 0.2),
      0 0 44px rgba(0, 168, 107, 0.25)
    ` : `
      0 8px 32px rgba(0,0,0,0.3)
    `
  };

  padding: 2rem 1.5rem;
  display: flex; 
  flex-direction: column;
  transition: all 0.4s ease;

  &:hover {
    transform: translateY(-8px);
    background: ${({ $secureTheme }) => $secureTheme ? `
      linear-gradient(135deg,
        rgba(10, 26, 20, 0.98) 0%,
        rgba(16, 43, 33, 0.96) 28%,
        rgba(23, 67, 49, 0.94) 56%,
        rgba(33, 98, 71, 0.92) 100%
      )` : undefined
    };
    box-shadow: ${({ $secureTheme }) => $secureTheme ? `
      0 12px 48px rgba(0, 0, 0, 0.45),
      inset 0 2px 3px rgba(64, 145, 108, 0.36),
      inset 0 -1px 2px rgba(0, 0, 0, 0.2),
      0 0 64px rgba(0, 168, 107, 0.45)
    ` : undefined};
    border-color: ${({ $secureTheme }) => $secureTheme ? 'rgba(0, 168, 107, 0.65)' : undefined};
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
  gap: 0.5rem; 
  flex: 1;
`;

const ProjectName = styled.h3`
  font-size: 2.5rem; 
  font-weight: 700; 
  margin: 0;
  text-shadow: 0 2px 8px rgba(0,0,0,0.35);
  letter-spacing: -0.5px; 
  line-height: 1.2;
  ${({ $secureTheme }) => $secureTheme ? `
    background: linear-gradient(90deg, #C9FFE8, #86F3C1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  ` : `color: #fff;`}
`;

const ProjectSubtitle = styled.div`
  font-size: 1.1rem; 
  color: rgba(255,255,255,0.95); 
  font-weight: 500; 
  font-style: italic; 
  margin: 0;
`;

const ProjectDate = styled.span`
  font-size: 0.9rem; 
  color: rgba(255,255,255,0.9);
  font-weight: 500; 
  text-transform: uppercase; 
  letter-spacing: 0.5px;
`;

const ProjectLogoImage = styled.img`
    width: 110px; 
    height: auto; 
    border-radius: 12px; 
    object-fit: contain;
`;

const ProjectDescription = styled.p`
    font-size: 0.95rem; 
    line-height: 1.6; 
    color: rgba(255,255,255,0.95); 
    margin: 0; 
    font-weight: 400;
    text-align: justify;
`;

const Divider = styled.div`
    width: 100%; 
    height: 2px;
    background: ${({ $secureTheme, $themeColor }) =>
      $secureTheme ? 'linear-gradient(90deg, #C9FFE8, #86F3C1)' : ($themeColor || 'rgba(255,255,255,0.2)')};
    opacity: 0.75; 
    border-radius: 2px;
    box-shadow: ${({ $secureTheme, $themeColor }) =>
      $secureTheme ? '0 0 10px rgba(0,168,107,0.45)' : `0 0 10px ${$themeColor || 'rgba(255,255,255,0.2)'}`};
    margin-top: 0.25rem; 
    margin-bottom: 0.75rem;
`;

const CardBody = styled.div`
  display: flex; 
  flex-direction: column; 
  flex: 1; 
  gap: 0.5rem;
`;

const SectionLabel = styled.div`
  font-size: 0.85rem; 
  font-weight: 700; 
  text-transform: uppercase; 
  letter-spacing: 1px;
  ${({ $secureTheme }) => $secureTheme ? `
    background: linear-gradient(90deg, #C9FFE8, #86F3C1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  ` : `color: rgba(255,255,255,0.9);`}
`;

const HighlightsList = styled.div`
  display: flex; 
  flex-direction: column; 
  gap: 0.75rem;
`;

const Highlight = styled.div`
  display: flex; 
  align-items: center; 
  padding: 1rem 1rem 1rem 1.25rem;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  
  background: ${({ $secureTheme }) =>
    $secureTheme ? 'linear-gradient(90deg, rgba(0,168,107,0.08) 0%, rgba(64,145,108,0.06) 100%)'
                 : 'rgba(255,180,100,0.08)'};
  
  /* Gradient left border */
  border-left: 4px solid transparent;
  border-image: ${({ $secureTheme }) =>
    $secureTheme
      ? 'linear-gradient(180deg, rgb(0, 168, 107) 0%, rgb(64, 255, 210) 100%)'
      : 'linear-gradient(180deg, rgb(255, 140, 60) 0%, rgb(255, 180, 100) 100%)'
  };
  border-image-slice: 1;
  
  transition: all 0.3s ease;

  &:hover {
    background: ${({ $secureTheme }) =>
      $secureTheme ? 'linear-gradient(90deg, rgba(0,168,107,0.15) 0%, rgba(64,145,108,0.12) 100%)'
                   : 'rgba(255,180,100,0.15)'};
    transform: translateX(6px);
    box-shadow: ${({ $secureTheme }) => $secureTheme ? '0 4px 16px rgba(0,168,107,0.25)' : '0 4px 12px rgba(255,180,100,0.2)'};
    
    /* Thicker border on hover */
    border-left-width: 5px;
  }
`;

const HighlightIcon = styled.div`
  font-size: 1.8rem; 
  flex-shrink: 0; 
  width: 40px; 
  height: 40px;
  display: flex; 
  align-items: center; 
  justify-content: center;
  background: ${({ $secureTheme }) =>
    $secureTheme ? 'linear-gradient(90deg, rgba(0,168,107,0.25), rgba(64,145,108,0.25))'
                 : 'rgba(255,180,100,0.15)'};
  border-radius: 10px;
  box-shadow: ${({ $secureTheme }) =>
    $secureTheme ? '0 2px 8px rgba(0,168,107,0.3)' : '0 2px 8px rgba(255,180,100,0.2)'};
  transition: all 0.3s ease;

  ${Highlight}:hover & {
    transform: scale(1.1);
    box-shadow: ${({ $secureTheme }) =>
      $secureTheme ? '0 4px 12px rgba(0,168,107,0.5)' : '0 4px 12px rgba(255,180,100,0.3)'};
  }
`;

const HighlightText = styled.p`
  font-size: 0.92rem; 
  line-height: 1.6; 
  color: rgba(255,255,255,0.92); 
  margin: 0; 
  flex: 1; 
  font-weight: 400;
  text-align: justify;
  padding-right: 0.5rem;
`;

const TechStack = styled.div`
  display: flex; 
  flex-wrap: wrap; 
  gap: 0.75rem; 
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
  background: ${({ $secureTheme }) =>
    $secureTheme
      ? 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(235, 255, 246, 0.98) 50%, rgba(225, 250, 242, 0.96) 100%)'
      : 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(255,250,245,0.98) 50%, rgba(255,245,235,0.95) 100%)'};
  border: 2px solid ${({ $secureTheme }) => $secureTheme ? 'rgba(0,168,107,0.6)' : 'rgba(255,180,100,0.5)'};
  box-shadow: ${({ $secureTheme }) =>
    $secureTheme
      ? '0 2px 8px rgba(0,168,107,0.28), inset 0 1px 2px rgba(255,255,255,0.9)'
      : '0 2px 8px rgba(255,180,100,0.2), inset 0 1px 2px rgba(255,255,255,0.9)'};
  transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
  cursor: pointer;

  ${TechPillWrapper}:hover & {
    transform: translateY(-4px) scale(1.08);
    box-shadow: ${({ $secureTheme }) =>
      $secureTheme
        ? '0 8px 20px rgba(0,168,107,0.5), inset 0 1px 3px rgba(255,255,255,1)'
        : '0 8px 20px rgba(255,180,100,0.4), inset 0 1px 3px rgba(255,255,255,1)'};
    border-color: ${({ $secureTheme }) => $secureTheme ? 'rgba(0,168,107,0.9)' : 'rgba(255,180,100,0.8)'};
  }
`;

const TechLogo = styled.img`
  width: 28px; 
  height: 28px; 
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
  color: #fff;
  font-size: 0.75rem; 
  font-weight: 700; 
  white-space: nowrap;
  background: ${({ $secureTheme }) =>
    $secureTheme
      ? 'linear-gradient(135deg, rgba(0,168,107,0.95), rgba(64,145,108,0.95))'
      : 'linear-gradient(135deg, rgba(255,140,60,0.95), rgba(255,160,100,0.95))'};
  box-shadow: ${({ $secureTheme }) =>
    $secureTheme ? '0 4px 12px rgba(0,168,107,0.4), 0 0 0 1px rgba(201,255,232,0.4)'
                 : '0 4px 12px rgba(255,140,60,0.4), 0 0 0 1px rgba(255,180,100,0.5)'};
  opacity: ${({ $visible }) => $visible ? 1 : 0};
  pointer-events: none;
  transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
  z-index: 1000;

  &::after{
    content:''; 
    position:absolute; 
    top:100%; 
    left:50%; 
    transform:translateX(-50%);
    border:5px solid transparent;
    border-top-color: ${({ $secureTheme }) => $secureTheme ? 'rgba(0,168,107,0.95)' : 'rgba(255,140,60,0.95)'};
  }
`;

const CardFooter = styled.div`
  display: flex; 
  flex-direction: column; 
  padding-top: 0.5rem; 
  margin-top: auto;
`;

const LivePreviewContainer = styled.div`
  display: flex; 
  align-items: center; 
  gap: 1rem; 
  padding: 0.85rem;
  border-radius: 12px;
  background: ${({ $secureTheme }) =>
    $secureTheme ? 'linear-gradient(90deg, rgba(0,168,107,0.15) 0%, rgba(64,145,108,0.12) 100%)'
                 : 'rgba(255,180,100,0.1)'};
  border: 2px solid ${({ $secureTheme }) => $secureTheme ? 'rgba(0,168,107,0.4)' : 'rgba(255,180,100,0.3)'};
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
    background: ${({ $secureTheme }) =>
      $secureTheme ? 'linear-gradient(90deg, rgba(0,168,107,0.25) 0%, rgba(64,145,108,0.20) 100%)'
                   : 'rgba(255,180,100,0.15)'};
    border-color: ${({ $secureTheme }) => $secureTheme ? 'rgba(0,168,107,0.6)' : 'rgba(255,180,100,0.5)'};
    transform: translateY(-4px);
    box-shadow: ${({ $secureTheme }) => $secureTheme ? '0 8px 24px rgba(0,168,107,0.35)' : '0 8px 24px rgba(255,180,100,0.3)'};
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