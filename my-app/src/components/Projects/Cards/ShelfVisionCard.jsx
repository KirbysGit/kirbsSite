import React, { useState } from 'react';
import styled from 'styled-components';

// Logo map
import { getLogo } from '@/components/Utils/logoMap';


import shelfBanner from '@/images/projects/shelf_vision/shelfvision.png';
import paperPreview from '@/images/projects/shelf_vision/paperpreview.png';
import presentationPreview from '@/images/projects/shelf_vision/presentationpreview.png';

const ShelfVisionCard = () => {
  const [hoveredTech, setHoveredTech] = useState(null);

  const techs = [
    'Python', 'PyTorch', 'OpenCV',
    'NumPy', 'Pandas', 'Matplotlib', 'scikit-learn'
  ];

    return (
    <ProjectCard $shelfTheme>
      <CardHeader>
        <HeaderTop>
          <ProjectInfo>
            <ProjectName $shelfTheme>ShelfVision</ProjectName>
            <ProjectSubtitle>Dense Shelf Object Detection</ProjectSubtitle>
            <ProjectDate>Jan 2025 – May 2025</ProjectDate>
          </ProjectInfo>
          <ProjectLogoImage src={shelfBanner} alt="ShelfVision Logo" />
        </HeaderTop>

        <ProjectDescription>
          Custom anchor-based detector (PyTorch) tuned for the SKU-110K retail-shelf dataset.
          ResNet-50 + FPN backbone, dynamic IoU/center matching, and visualization-driven debugging
          to improve detection in tightly packed scenes.
        </ProjectDescription>

        <Divider $shelfTheme />
      </CardHeader>

      <CardBody>
        <SectionLabel $shelfTheme>Tech Stack</SectionLabel>
        <TechStack>
          {techs.map((tech) => (
            <TechPillWrapper
              key={tech}
              onMouseEnter={() => setHoveredTech(tech)}
              onMouseLeave={() => setHoveredTech(null)}
            >
              <TechPill $shelfTheme>
                <TechLogo src={getLogo(tech)} alt={tech} />
              </TechPill>
              <Tooltip $visible={hoveredTech === tech} $shelfTheme>
                {tech}
              </Tooltip>
            </TechPillWrapper>
          ))}
        </TechStack>

        <SectionLabel style={{ marginTop: '0.75rem' }} $shelfTheme>What It Does</SectionLabel>
        <HighlightsList>
          <Highlight $shelfTheme>
            <HighlightIcon $shelfTheme>🧠</HighlightIcon>
            <HighlightText>
              Multi-scale detection pipeline: ResNet-50 + FPN features feed a lightweight
              head for dense shelf layouts with lots of small, overlapping items.
            </HighlightText>
          </Highlight>

          <Highlight $shelfTheme>
            <HighlightIcon $shelfTheme>📐</HighlightIcon>
            <HighlightText>
              Smart anchors & matching: tuned scales/ratios, IoU + center-inside fallback to avoid
              missed boxes in crowded scenes.
            </HighlightText>
          </Highlight>

          <Highlight $shelfTheme>
            <HighlightIcon $shelfTheme>🧪</HighlightIcon>
            <HighlightText>
              Test-driven training: unit tests for IoU, anchors, and inference + rich overlays to
              visualize predictions vs. ground truth during training.
            </HighlightText>
          </Highlight>

          <Highlight $shelfTheme>
            <HighlightIcon $shelfTheme>📊</HighlightIcon>
            <HighlightText>
              Benchmarks & metrics on SKU-110K; includes PR curves, IoU histograms,
              comparison runs vs. YOLOv5 baselines.
            </HighlightText>
          </Highlight>
        </HighlightsList>

        <SectionLabel style={{ marginTop: '0.75rem' }} $shelfTheme>Results</SectionLabel>
        <HighlightsList>
          <Highlight $shelfTheme>
            <HighlightIcon $shelfTheme>✅</HighlightIcon>
            <HighlightText>
              Early-stage learning established on SKU-110K (non-zero mAP and stable IoU after anchor/matching fixes).
            </HighlightText>
          </Highlight>
          <Highlight $shelfTheme>
            <HighlightIcon $shelfTheme>🛠️</HighlightIcon>
            <HighlightText>
              Modular YAML configs for repeatable training/eval; checkpoints, visualizations, and logs are saved per run.
            </HighlightText>
          </Highlight>
        </HighlightsList>
      </CardBody>

      <CardFooter>
        <Divider $shelfTheme />
        
        {/* Resources Grid - LinkedIn style preview cards */}
        <ResourcesGrid>
          {/* Paper PDF Card */}
          <ResourceCard
            $shelfTheme
            onClick={() => window.open('/projects/shelf_vision/paper.pdf', '_blank')}
          >
            <ResourcePreview $type="paper" $preview={paperPreview}>
              <ResourceIcon>📄</ResourceIcon>
            </ResourcePreview>
            <ResourceCaption>Project Paper</ResourceCaption>
          </ResourceCard>

          {/* Presentation PDF Card */}
          <ResourceCard
            $shelfTheme
            onClick={() => window.open('/projects/shelf_vision/presentation.pdf', '_blank')}
          >
            <ResourcePreview $type="presentation" $preview={presentationPreview}>
              <ResourceIcon>📊</ResourceIcon>
            </ResourcePreview>
            <ResourceCaption>Presentation</ResourceCaption>
          </ResourceCard>

          {/* GitHub Card */}
          <ResourceCard
            $shelfTheme
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
    </ProjectCard>
  );
};

/* ========================= THEME: ShelfVision (Cyan CV Theme) ========================= */

const ProjectCard = styled.div`
  width: 500px;
  min-height: 640px;
  position: relative;

  background: ${p => p.$shelfTheme ? `
    radial-gradient(120% 120% at 100% 0%, rgba(18,24,38,0.92) 0%, rgba(10,13,22,0.95) 40%, rgba(6,10,18,0.98) 100%),
    linear-gradient(135deg, rgba(34,211,238,0.08), rgba(167,243,208,0.04))
  ` : `rgba(20,20,20,0.9)`};
  backdrop-filter: blur(18px) saturate(110%);
  -webkit-backdrop-filter: blur(18px) saturate(110%);

  border: 1px solid ${p => p.$shelfTheme ? 'rgba(34,211,238,0.35)' : 'rgba(255,255,255,0.08)'};
  border-radius: 24px;
  box-shadow:
    0 10px 30px rgba(0,0,0,0.45),
    inset 0 1px 2px rgba(255,255,255,0.06),
    0 0 48px ${p => p.$shelfTheme ? 'rgba(34,211,238,0.18)' : 'rgba(0,0,0,0.2)'};

  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  transition: transform .35s ease, box-shadow .35s ease, border-color .35s ease;

  /* subtle grid overlay */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
      linear-gradient(rgba(34,211,238,0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(34,211,238,0.06) 1px, transparent 1px);
    background-size: 22px 22px, 22px 22px;
    border-radius: inherit;
    mask-image: radial-gradient(80% 80% at 50% 50%, black 60%, transparent 100%);
  }

  /* faint scanlines on hover */
  &:hover::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: repeating-linear-gradient(
      180deg,
      rgba(34,211,238,0.05) 0px,
      rgba(34,211,238,0.05) 1px,
      transparent 2px,
      transparent 3px
    );
    border-radius: inherit;
    animation: scan 2.4s linear infinite;
  }

  @keyframes scan {
    from { background-position-y: 0px; }
    to { background-position-y: 24px; }
  }

  &:hover {
    transform: translateY(-8px);
    border-color: rgba(34,211,238,0.55);
    box-shadow:
      0 16px 48px rgba(0,0,0,0.55),
      0 0 72px rgba(34,211,238,0.28);
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
  gap: .5rem;
  flex: 1;
`;

const ProjectName = styled.h3`
  font-size: 2.4rem;
  font-weight: 800;
  margin: 0;
  letter-spacing: -0.5px;
  line-height: 1.2;
  text-shadow: 0 2px 8px rgba(0,0,0,.35);
  ${p => p.$shelfTheme ? `
    background: linear-gradient(90deg, rgb(186,230,253), rgb(34,211,238), rgb(167,243,208));
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  ` : `color: white;`}
`;

const ProjectSubtitle = styled.div`
  font-size: 1.05rem;
  color: rgba(224, 247, 250, 0.95);
  font-weight: 600;
  font-style: italic;
  margin: 0;
`;

const ProjectDate = styled.span`
  font-size: .9rem;
  color: rgba(203, 213, 225, 0.9);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .5px;
`;

const ProjectLogoImage = styled.img`
  width: 130px;
  height: auto;
  border-radius: 12px;
  object-fit: contain;
`;

const ProjectDescription = styled.p`
  font-size: .95rem;
  line-height: 1.6;
  color: rgba(241,245,249,0.95);
  margin: 0;
  font-weight: 400;
  text-align: justify;
`;

const Divider = styled.div`
  width: 100%;
  height: 2px;
  border-radius: 2px;
  background: ${p => p.$shelfTheme
    ? 'linear-gradient(90deg, rgba(34,211,238,1), rgba(167,243,208,1))'
    : 'rgba(255,255,255,0.2)'};
  box-shadow: ${p => p.$shelfTheme
    ? '0 0 12px rgba(34,211,238,0.45)'
    : '0 0 10px rgba(255,255,255,0.18)'};
  opacity: .85;
  margin: .5rem 0 .75rem 0;
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: .5rem;
  position: relative;
  z-index: 1;
`;

const SectionLabel = styled.div`
  font-size: .85rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  ${p => p.$shelfTheme ? `
    background: linear-gradient(90deg, rgb(186,230,253), rgb(34,211,238), rgb(167,243,208));
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  ` : `color: rgba(255,255,255,0.92);`}
`;

const HighlightsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: .7rem;
`;

const Highlight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: .75rem;
  border-radius: 12px;
  background: ${p => p.$shelfTheme
    ? 'linear-gradient(90deg, rgba(34,211,238,0.10), rgba(167,243,208,0.10))'
    : 'rgba(255,255,255,0.06)'};
  border: 1px solid ${p => p.$shelfTheme ? 'rgba(34,211,238,0.35)' : 'rgba(255,255,255,0.1)'};
  transition: all .3s ease;

  &:hover {
    transform: translateX(4px);
    border-color: ${p => p.$shelfTheme ? 'rgba(34,211,238,0.6)' : 'rgba(255,255,255,0.2)'};
    box-shadow: ${p => p.$shelfTheme ? '0 6px 16px rgba(34,211,238,0.25)' : '0 6px 16px rgba(0,0,0,0.25)'};
    background: ${p => p.$shelfTheme
      ? 'linear-gradient(90deg, rgba(34,211,238,0.16), rgba(167,243,208,0.16))'
      : 'rgba(255,255,255,0.1)'};
  }
`;

const HighlightIcon = styled.div`
  font-size: 1.7rem;
  flex-shrink: 0;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: ${p => p.$shelfTheme ? 'rgba(34,211,238,0.16)' : 'rgba(255,255,255,0.1)'};
  box-shadow: ${p => p.$shelfTheme ? '0 2px 10px rgba(34,211,238,0.25)' : '0 2px 10px rgba(0,0,0,0.2)'};
  transition: all .3s ease;

  ${Highlight}:hover & {
    transform: scale(1.1);
    box-shadow: ${p => p.$shelfTheme ? '0 4px 14px rgba(34,211,238,0.4)' : '0 4px 14px rgba(0,0,0,0.3)'};
  }
`;

const HighlightText = styled.p`
  font-size: .9rem;
  line-height: 1.5;
  color: rgba(241,245,249,0.95);
  margin: 0;
  flex: 1;
  font-weight: 400;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: .75rem;
  align-items: center;
`;

const TechPillWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const TechPill = styled.div`
  width: 46px;
  height: 46px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: .55rem;
  background: ${p => p.$shelfTheme
    ? 'linear-gradient(135deg, rgba(250,250,255,1), rgba(236,254,255,0.98))'
    : 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(255,250,245,0.98) 50%, rgba(255,245,235,0.95) 100%)'};
  border: 2px solid ${p => p.$shelfTheme ? 'rgba(34,211,238,0.55)' : 'rgba(255,180,100,0.5)'};
  box-shadow: ${p => p.$shelfTheme
    ? '0 2px 8px rgba(34,211,238,0.22), inset 0 1px 2px rgba(255,255,255,.9)'
    : '0 2px 8px rgba(255,180,100,0.2), inset 0 1px 2px rgba(255,255,255,0.9)'};
  transition: all .3s cubic-bezier(.4,0,.2,1);
  cursor: pointer;

  ${TechPillWrapper}:hover & {
    transform: translateY(-4px) scale(1.08);
    box-shadow: ${p => p.$shelfTheme
      ? '0 10px 22px rgba(34,211,238,0.4), inset 0 1px 3px rgba(255,255,255,1)'
      : '0 8px 20px rgba(255,180,100,0.4), inset 0 1px 3px rgba(255,255,255,1)'};
    border-color: ${p => p.$shelfTheme ? 'rgba(34,211,238,0.85)' : 'rgba(255,180,100,0.8)'};
    background: ${p => p.$shelfTheme
      ? 'linear-gradient(135deg, rgba(255,255,255,1), rgba(236,254,255,1))'
      : 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(255,250,245,0.98) 50%, rgba(255,245,235,0.95) 100%)'};
  }
`;

const TechLogo = styled.img`
  width: 150%;
  height: 150%;
  object-fit: contain;
  filter: drop-shadow(0 1px 2px rgba(0,0,0,0.12));
  transition: filter .3s ease;

  ${TechPillWrapper}:hover & {
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.18));
  }
`;

const Tooltip = styled.div`
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%) ${p => p.$visible ? 'translateY(0)' : 'translateY(4px)'};
  padding: .45rem .7rem;
  border-radius: 8px;
  background: linear-gradient(135deg, rgba(34,211,238,0.95), rgba(8,145,178,0.95));
  color: white;
  font-size: .75rem;
  font-weight: 700;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(34,211,238,0.4), 0 0 0 1px rgba(186,230,253,0.5);
  opacity: ${p => p.$visible ? 1 : 0};
  pointer-events: none;
  transition: all .25s cubic-bezier(.4,0,.2,1);
  z-index: 1000;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 5px solid transparent;
    border-top-color: rgba(34,211,238,0.95);
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
  background: ${({ $shelfTheme }) =>
    $shelfTheme ? 'rgba(34,211,238,0.12)' : 'rgba(255,180,100,0.1)'};
  border: 1.5px solid ${({ $shelfTheme }) => 
    $shelfTheme ? 'rgba(34,211,238,0.35)' : 'rgba(255,180,100,0.3)'};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
  
  &:hover {
    transform: translateY(-4px);
    border-color: ${({ $shelfTheme }) => 
      $shelfTheme ? 'rgba(34,211,238,0.6)' : 'rgba(255,180,100,0.5)'};
    box-shadow: ${({ $shelfTheme }) => 
      $shelfTheme ? '0 6px 20px rgba(34,211,238,0.3)' : '0 6px 20px rgba(255,180,100,0.25)'};
    background: ${({ $shelfTheme }) =>
      $shelfTheme ? 'rgba(34,211,238,0.18)' : 'rgba(255,180,100,0.15)'};
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
