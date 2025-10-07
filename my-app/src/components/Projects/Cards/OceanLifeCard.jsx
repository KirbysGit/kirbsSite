import React, { useState } from 'react';
import styled from 'styled-components';

// Assets
import oceanlifeLogo from '@/images/projects/ocean_life/oceanlife.png';
import oceanlifePreview from '@/images/projects/ocean_life/presentationpreview.png';

// Utils
import { getLogo } from '@/components/Utils/logoMap';

const OceanLifeCard = () => {
  const [hoveredTech, setHoveredTech] = useState(null);

  const techs = [
    'HTML5','CSS3','JavaScript','PHP','MySQL','Apache','Linux','Bootstrap','Postman','SwaggerHub'
  ];

  return (
    <ProjectCard $oceanTheme>
      <CardHeader>
        <HeaderTop>
          <ProjectInfo>
            <ProjectName $oceanTheme>Ocean-Life Contact Manager</ProjectName>
            <ProjectSubtitle>Full-stack LAMP app for personal contacts</ProjectSubtitle>
            <ProjectDate>Jun 2024 – Jul 2024</ProjectDate>
          </ProjectInfo>
          <ProjectLogoImage src={oceanlifeLogo} alt="Ocean-Life Logo" />
        </HeaderTop>

        <ProjectDescription>
          A responsive, ocean-themed contact manager with user auth, full CRUD, and fast search.
          Built on a classic LAMP stack with a lightweight vanilla JS front-end and a JSON REST API (PHP + MySQL).
        </ProjectDescription>

        <Divider $oceanTheme />
      </CardHeader>

      <CardBody>
        <SectionLabel $oceanTheme>Tech Stack</SectionLabel>
        <TechStack>
          {techs.map((tech) => (
            <TechPillWrapper
              key={tech}
              onMouseEnter={() => setHoveredTech(tech)}
              onMouseLeave={() => setHoveredTech(null)}
            >
              <TechPill $oceanTheme>
                <TechLogo src={getLogo(tech)} alt={tech} />
              </TechPill>
              <Tooltip $visible={hoveredTech === tech} $oceanTheme>
                {tech}
              </Tooltip>
            </TechPillWrapper>
          ))}
        </TechStack>

        <SectionLabel style={{ marginTop: '0.75rem' }} $oceanTheme>What It Does</SectionLabel>
        <HighlightsList>
          <Highlight $oceanTheme>
            <HighlightIcon $oceanTheme>🔐</HighlightIcon>
            <HighlightText>User login/registration with cookie-based sessions and form validation.</HighlightText>
          </Highlight>

          <Highlight $oceanTheme>
            <HighlightIcon $oceanTheme>📇</HighlightIcon>
            <HighlightText>Complete contact CRUD with inline editing, email/phone regex, and instant feedback.</HighlightText>
          </Highlight>

          <Highlight $oceanTheme>
            <HighlightIcon $oceanTheme>🔎</HighlightIcon>
            <HighlightText>Search across name, email, and phone—returns just your contacts (user-scoped API).</HighlightText>
          </Highlight>

          <Highlight $oceanTheme>
            <HighlightIcon $oceanTheme>🌊</HighlightIcon>
            <HighlightText>Clean, ocean-inspired UI (Bootstrap-assisted) and responsive layout.</HighlightText>
          </Highlight>
        </HighlightsList>
      </CardBody>

      <CardFooter>
        <Divider $oceanTheme />

        {/* Link tiles: GitHub + Presentation */}
        <LinksRow>
          <LinkTile
            $oceanTheme
            onClick={() => window.open('https://github.com/your-org/ocean-life', '_blank')}
          >
            <PreviewImageWrapper>
              <PreviewImage src={oceanlifeLogo} alt="Ocean-Life GitHub" />
            </PreviewImageWrapper>
            <PreviewTextContent>
              <PreviewTitle>GitHub Repository</PreviewTitle>
              <PreviewSubtext>Browse the code</PreviewSubtext>
              <PreviewArrow>→</PreviewArrow>
            </PreviewTextContent>
          </LinkTile>

          <LinkTile
            $oceanTheme
            onClick={() => window.open('/projects/ocean_life/presentation.pdf', '_blank')}
          >
            <PreviewImageWrapper>
              <PreviewImage src={oceanlifePreview} alt="Ocean-Life Presentation" />
            </PreviewImageWrapper>
            <PreviewTextContent>
              <PreviewTitle>Project Presentation</PreviewTitle>
              <PreviewSubtext>View the slides (PDF)</PreviewSubtext>
              <PreviewArrow>→</PreviewArrow>
            </PreviewTextContent>
          </LinkTile>
        </LinksRow>
      </CardFooter>
    </ProjectCard>
  );
};

/* ===== Styles ===== */

const ProjectCard = styled.div`
  width: 500px;
  min-height: 620px;

  background: ${({ $oceanTheme }) => $oceanTheme ? `
    radial-gradient(120% 120% at 10% 0%,
      rgba(224, 247, 250, 0.22) 0%,
      rgba(2, 136, 209, 0.28) 30%,
      rgba(2, 119, 189, 0.36) 60%,
      rgba(1, 79, 121, 0.48) 100%
    )
  ` : 'rgba(20,20,20,0.2)'};

  backdrop-filter: blur(20px) saturate(110%);
  -webkit-backdrop-filter: blur(20px) saturate(110%);

  border: 1px solid rgba(2, 136, 209, 0.45);
  border-radius: 24px;

  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.35),
    inset 0 1px 2px rgba(224, 247, 250, 0.25),
    0 0 40px rgba(2, 119, 189, 0.35);

  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  transition: all 0.35s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow:
      0 12px 48px rgba(0, 0, 0, 0.45),
      inset 0 2px 3px rgba(224, 247, 250, 0.35),
      0 0 60px rgba(2, 119, 189, 0.55);
    border-color: rgba(224, 247, 250, 0.65);
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
  font-size: 2.4rem;
  font-weight: 800;
  margin: 0;
  letter-spacing: -0.4px;
  line-height: 1.2;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.35);

  ${({ $oceanTheme }) => $oceanTheme ? `
    background: linear-gradient(90deg, #e0f7fa, #a5e9ff 50%, #9be7f7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  ` : `color: #fff;`}
`;

const ProjectSubtitle = styled.div`
  font-size: 1.05rem;
  color: rgba(255, 255, 255, 0.95);
  font-weight: 500;
  font-style: italic;
  margin: 0;
`;

const ProjectDate = styled.span`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.88);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ProjectLogoImage = styled.img`
  width: 180px;
  height: auto;
  border-radius: 12px;
  object-fit: contain;
  filter: drop-shadow(0 6px 20px rgba(2, 136, 209, 0.35));
`;

const ProjectDescription = styled.p`
  font-size: 0.96rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.95);
  margin: 0.25rem 0 0;
  font-weight: 400;
`;

const Divider = styled.div`
  width: 100%;
  height: 2px;
  margin: 0.6rem 0 0.8rem;
  border-radius: 2px;
  background: ${({ $oceanTheme }) =>
    $oceanTheme
      ? 'linear-gradient(90deg, #e0f7fa, #6ec6ff, #0288d1)'
      : 'rgba(255,255,255,0.2)'};
  box-shadow: 0 0 10px rgba(110, 198, 255, 0.45);
  opacity: 0.9;
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 0.5rem;
`;

const SectionLabel = styled.div`
  font-size: 0.82rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1.1px;
  margin: 0.25rem 0 0.35rem;

  ${({ $oceanTheme }) => $oceanTheme ? `
    background: linear-gradient(90deg, #e0f7fa, #9ae0ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  ` : `color: rgba(255,255,255,0.9);`}
`;

const HighlightsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`;

const Highlight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  border-radius: 12px;

  background: ${({ $oceanTheme }) =>
    $oceanTheme
      ? 'linear-gradient(90deg, rgba(224,247,250,0.12), rgba(110,198,255,0.12))'
      : 'rgba(255,255,255,0.08)'};

  border: 1px solid ${({ $oceanTheme }) =>
    $oceanTheme ? 'rgba(224,247,250,0.35)' : 'rgba(255,255,255,0.2)'};

  transition: all 0.25s ease;

  &:hover {
    transform: translateX(4px);
    background: ${({ $oceanTheme }) =>
      $oceanTheme
        ? 'linear-gradient(90deg, rgba(224,247,250,0.18), rgba(110,198,255,0.18))'
        : 'rgba(255,255,255,0.15)'};
    border-color: ${({ $oceanTheme }) =>
      $oceanTheme ? 'rgba(224,247,250,0.55)' : 'rgba(255,255,255,0.4)'};
    box-shadow: 0 4px 12px rgba(2, 119, 189, 0.25);
  }
`;

const HighlightIcon = styled.div`
  font-size: 1.6rem;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  border-radius: 10px;

  background: ${({ $oceanTheme }) =>
    $oceanTheme
      ? 'linear-gradient(90deg, rgba(224,247,250,0.25), rgba(110,198,255,0.25))'
      : 'rgba(255,255,255,0.15)'};

  box-shadow: 0 2px 8px rgba(2, 119, 189, 0.25);
  transition: transform 0.25s ease;

  ${Highlight}:hover & {
    transform: scale(1.08);
  }
`;

const HighlightText = styled.p`
  font-size: 0.9rem;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.92);
  margin: 0;
  flex: 1;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  align-items: center;
`;

const TechPillWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const TechPill = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;

  background: ${({ $oceanTheme }) =>
    $oceanTheme
      ? 'linear-gradient(135deg, #ffffff 0%, #f2fbff 50%, #e8f7ff 100%)'
      : 'linear-gradient(135deg, #fff, #fafafa)'};

  border: 2px solid ${({ $oceanTheme }) =>
    $oceanTheme ? 'rgba(110,198,255,0.6)' : 'rgba(255,180,100,0.5)'};

  box-shadow:
    0 2px 8px rgba(110,198,255,0.27),
    inset 0 1px 2px rgba(255,255,255,0.95);

  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;

  ${TechPillWrapper}:hover & {
    transform: translateY(-4px) scale(1.06);
    box-shadow:
      0 8px 20px rgba(110,198,255,0.45),
      inset 0 1px 3px rgba(255,255,255,1);
    border-color: rgba(224,247,250,0.9);
  }
`;

const TechLogo = styled.img`
  width: 28px;
  height: 28px;
  object-fit: contain;
  filter: drop-shadow(0 1px 2px rgba(0,0,0,0.12));
  transition: filter 0.25s ease;

  ${TechPillWrapper}:hover & {
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.18));
  }
`;

const Tooltip = styled.div`
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%) ${({ $visible }) => $visible ? 'translateY(0)' : 'translateY(4px)'};
  padding: 0.5rem 0.7rem;
  border-radius: 8px;

  background: ${({ $oceanTheme }) =>
    $oceanTheme
      ? 'linear-gradient(135deg, rgba(2,136,209,0.96), rgba(1,79,121,0.96))'
      : 'rgba(0,0,0,0.85)'};
  color: white;
  font-size: 0.74rem;
  font-weight: 700;
  white-space: nowrap;

  box-shadow: 0 4px 12px rgba(2,136,209,0.35), 0 0 0 1px rgba(224,247,250,0.4);

  opacity: ${({ $visible }) => $visible ? 1 : 0};
  pointer-events: none;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 5px solid transparent;
    border-top-color: rgba(2,136,209,0.96);
  }
`;

const CardFooter = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: auto;
`;

const LinksRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0,1fr));
  gap: 0.85rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const LinkTile = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.85rem;
  border-radius: 12px;

  background: ${({ $oceanTheme }) =>
    $oceanTheme
      ? 'linear-gradient(90deg, rgba(224,247,250,0.15), rgba(110,198,255,0.12))'
      : 'rgba(255,255,255,0.1)'};

  border: 2px solid rgba(224,247,250,0.4);
  cursor: pointer;
  transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
  position: relative;
  overflow: hidden;

  &::before{
    content:'';
    position:absolute;
    top:0; left:-100%;
    width:100%; height:100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
    transition: left 0.6s ease;
  }

  &:hover{
    transform: translateY(-3px);
    border-color: rgba(224,247,250,0.65);
    box-shadow: 0 10px 24px rgba(2,119,189,0.35);

    &::before{ left:100%; }
  }
`;

const PreviewImageWrapper = styled.div`
  flex-shrink: 0;
  width: 90px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0,0,0,0.3);
  transition: transform 0.35s ease;

  ${LinkTile}:hover & { transform: scale(1.05); }
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PreviewTextContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
  position: relative;
`;

const PreviewTitle = styled.div`
  font-size: 1.05rem;
  font-weight: 800;
  color: rgba(255,255,255,1);
  text-shadow: 0 2px 4px rgba(0,0,0,0.25);
`;

const PreviewSubtext = styled.div`
  font-size: 0.85rem;
  color: rgba(255,255,255,0.85);
  font-weight: 600;
`;

const PreviewArrow = styled.div`
  position: absolute;
  right: 2%;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.5rem;
  color: rgba(255,255,255,0.75);
  transition: all 0.35s cubic-bezier(0.4,0,0.2,1);

  ${LinkTile}:hover & {
    transform: translateY(-50%) translateX(8px);
    color: rgba(255,255,255,1);
  }
`;

export default OceanLifeCard;

