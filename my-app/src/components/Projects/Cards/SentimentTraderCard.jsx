import React, { useState } from 'react';
import styled from 'styled-components';

// Import logo map and project logo
import { getLogo } from '@/components/Utils/logoMap';
import sentimentTraderLogo from '@/images/projects/sentiment_trader/sentimenttrader.png';

// Import resource preview images
import lightningTalkPreview from '@/images/projects/sentiment_trader/lightningtalkpreview.png';
import paperPreview from '@/images/projects/sentiment_trader/paperpreview.png';

// Import WIPBubble component
import WIPBubble from './WIPBubble';

const SentimentTraderCard = () => {
    const [hoveredTech, setHoveredTech] = useState(null);

    const techs = [
        'Python',
        'PyTorch',
        'scikit-learn',
        'XGBoost',
        'pandas',
        'NumPy'
    ];

    return (
        <ProjectCard $sentimentTheme>
            <WIPBubble theme="sentiment" />
            <CardHeader>
                <HeaderTop>
                    <ProjectInfo>
                        <ProjectName $sentimentTheme>SentimentTrader</ProjectName>
                        <ProjectSubtitle>Real-Time Stock Analysis Pipeline</ProjectSubtitle>
                        <ProjectDate>Jan 2025 – May 2025</ProjectDate>
                    </ProjectInfo>
                    <ProjectLogoImage src={sentimentTraderLogo} alt="SentimentTrader Logo" />
                </HeaderTop>

                <ProjectDescription>
                    A data pipeline that takes messy Reddit finance posts and turns them into actual trading signals. 
                    Basically reads stock chatter, tags bullish/bearish, gives buy/sell picks.
                </ProjectDescription>

                <Divider $sentimentTheme />
            </CardHeader>

            <CardBody>
                <SectionLabel $sentimentTheme>Tech Stack</SectionLabel>
                <TechStack>
                    {techs.map((tech) => (
                        <TechPillWrapper
                            key={tech}
                            onMouseEnter={() => setHoveredTech(tech)}
                            onMouseLeave={() => setHoveredTech(null)}
                        >
                            <TechPill $sentimentTheme>
                                <TechLogo src={getLogo(tech)} alt={tech} />
                            </TechPill>
                            <Tooltip $visible={hoveredTech === tech} $sentimentTheme>
                                {tech}
                            </Tooltip>
                        </TechPillWrapper>
                    ))}
                </TechStack>

                <SectionLabel style={{ marginTop: '0.75rem' }} $sentimentTheme>What It Does</SectionLabel>
                <HighlightsList>
                    <Highlight $sentimentTheme>
                        <HighlightText>Streams Reddit finance posts and filters relevant stock ticker mentions with confidence</HighlightText>
                    </Highlight>
                    <Highlight $sentimentTheme>
                        <HighlightText>Analyzes sentiment using FinBERT NLP and merges with real-time Yahoo Finance data</HighlightText>
                    </Highlight>
                    <Highlight $sentimentTheme>
                        <HighlightText>Generates next-day buy/sell signals per ticker using trained XGBoost machine learning models</HighlightText>
                    </Highlight>
                </HighlightsList>
            </CardBody>

            <CardFooter>
                <Divider $sentimentTheme />
                
                {/* Resources Grid - LinkedIn style preview cards */}
                <ResourcesGrid>
                    {/* YouTube Video Card */}
                    <ResourceCard
                        $sentimentTheme
                        onClick={() => window.open('https://www.youtube.com/watch?v=lhisabRnFw0', '_blank')}
                    >
                        <ResourcePreview $type="youtube" $preview={lightningTalkPreview}>
                            <ResourceIcon>▶️</ResourceIcon>
                        </ResourcePreview>
                        <ResourceCaption>Lightning Talk</ResourceCaption>
                    </ResourceCard>

                    {/* Paper/PDF Card */}
                    <ResourceCard
                        $sentimentTheme
                        onClick={() => window.open('/projects/sentiment_trader/sentimenttrader_paper.pdf', '_blank')}
                    >
                        <ResourcePreview $type="paper" $preview={paperPreview}>
                            <ResourceIcon>📄</ResourceIcon>
                        </ResourcePreview>
                        <ResourceCaption>IEEE Paper</ResourceCaption>
                    </ResourceCard>

                    {/* GitHub Card */}
                    <ResourceCard
                        $sentimentTheme
                        onClick={() => window.open('https://github.com/KirbysGit/sentimentTrader', '_blank')}
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

/* ========================= THEME: SentimentTrader (Finance/Purple-Orange) ========================= */

const ProjectCard = styled.div`
    width: 500px;
    min-height: 600px;

    /* Yahoo purple → Reddit orange gradient */
    background: ${({ $sentimentTheme }) => $sentimentTheme ? `
        linear-gradient(135deg,
            rgba(96, 1, 210, 0.90) 0%,
            rgba(126, 87, 194, 0.88) 25%,
            rgba(156, 39, 176, 0.86) 50%,
            rgba(255, 109, 0, 0.88) 75%,
            rgba(255, 69, 0, 0.90) 100%
        )` : `linear-gradient(135deg,
            rgba(34,34,34,0.15) 0%,
            rgba(30,30,30,0.12) 50%,
            rgba(25,25,25,0.10) 100%
        )`
    };
    backdrop-filter: blur(20px) saturate(110%);
    -webkit-backdrop-filter: blur(20px) saturate(110%);

    border: 1px solid ${({ $sentimentTheme }) => $sentimentTheme ? 'rgba(156, 39, 176, 0.5)' : 'rgba(255,180,100,0.4)'};
    border-radius: 24px;
    box-shadow: ${({ $sentimentTheme }) => $sentimentTheme ? `
        0 8px 32px rgba(0, 0, 0, 0.35),
        inset 0 1px 2px rgba(186, 104, 200, 0.28),
        inset 0 -1px 2px rgba(0, 0, 0, 0.2),
        0 0 44px rgba(156, 39, 176, 0.25)
    ` : `
        0 8px 32px rgba(0,0,0,0.3)
    `};

    padding: 2rem 1.5rem;
    display: flex;
    flex-direction: column;
    transition: all 0.4s ease;
    position: relative;
    overflow: hidden;

    /* Subtle grid texture overlay */
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: 
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
        background-size: 20px 20px;
        pointer-events: none;
        opacity: 0.3;
    }

    &:hover {
        transform: translateY(-8px);
        background: ${({ $sentimentTheme }) => $sentimentTheme ? `
            linear-gradient(135deg,
                rgba(96, 1, 210, 0.95) 0%,
                rgba(126, 87, 194, 0.93) 25%,
                rgba(156, 39, 176, 0.91) 50%,
                rgba(255, 109, 0, 0.93) 75%,
                rgba(255, 69, 0, 0.95) 100%
            )` : undefined
        };
        box-shadow: ${({ $sentimentTheme }) => $sentimentTheme ? `
            0 12px 48px rgba(0, 0, 0, 0.45),
            inset 0 2px 3px rgba(186, 104, 200, 0.36),
            inset 0 -1px 2px rgba(0, 0, 0, 0.2),
            0 0 64px rgba(156, 39, 176, 0.4),
            0 0 32px rgba(255, 109, 0, 0.3)
        ` : undefined};
        border-color: ${({ $sentimentTheme }) => $sentimentTheme ? 'rgba(186, 104, 200, 0.7)' : undefined};
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
    ${({ $sentimentTheme }) => $sentimentTheme ? `
        background: linear-gradient(90deg, #E1BEE7, #FFAB91);
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
    background: ${({ $sentimentTheme }) =>
        $sentimentTheme ? 'linear-gradient(90deg, #BA68C8, #FF6D00)' : 'rgba(255,255,255,0.2)'};
    opacity: 0.75;
    border-radius: 2px;
    box-shadow: ${({ $sentimentTheme }) =>
        $sentimentTheme ? '0 0 10px rgba(156, 39, 176, 0.45)' : '0 0 10px rgba(255,255,255,0.2)'};
    margin-top: 0.25rem;
    margin-bottom: 0.75rem;
`;

const CardBody = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 0.5rem;
    position: relative;
    z-index: 1;
`;

const SectionLabel = styled.div`
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    ${({ $sentimentTheme }) => $sentimentTheme ? `
        background: linear-gradient(90deg, #E1BEE7, #FFAB91);
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
    
    background: ${({ $sentimentTheme }) =>
        $sentimentTheme ? 'linear-gradient(90deg, rgba(156, 39, 176, 0.08) 0%, rgba(255, 109, 0, 0.06) 100%)'
                       : 'rgba(255,180,100,0.08)'};
    
    /* Gradient left border */
    border-left: 4px solid transparent;
    border-image: ${({ $sentimentTheme }) =>
        $sentimentTheme
            ? 'linear-gradient(180deg, rgb(156, 39, 176) 0%, rgb(255, 109, 0) 100%)'
            : 'linear-gradient(180deg, rgb(255, 140, 60) 0%, rgb(255, 180, 100) 100%)'
    };
    border-image-slice: 1;
    
    transition: all 0.3s ease;

    &:hover {
        background: ${({ $sentimentTheme }) =>
            $sentimentTheme ? 'linear-gradient(90deg, rgba(156, 39, 176, 0.15) 0%, rgba(255, 109, 0, 0.12) 100%)'
                           : 'rgba(255,180,100,0.15)'};
        transform: translateX(6px);
        box-shadow: ${({ $sentimentTheme }) => $sentimentTheme ? '0 4px 16px rgba(156, 39, 176, 0.25)' : '0 4px 12px rgba(255,180,100,0.2)'};
        
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
    background: ${({ $sentimentTheme }) =>
        $sentimentTheme ? 'linear-gradient(90deg, rgba(156, 39, 176, 0.25), rgba(255, 109, 0, 0.25))'
                       : 'rgba(255,180,100,0.15)'};
    border-radius: 10px;
    box-shadow: ${({ $sentimentTheme }) =>
        $sentimentTheme ? '0 2px 8px rgba(156, 39, 176, 0.3)' : '0 2px 8px rgba(255,180,100,0.2)'};
    transition: all 0.3s ease;

    ${Highlight}:hover & {
        transform: scale(1.1);
        box-shadow: ${({ $sentimentTheme }) =>
            $sentimentTheme ? '0 4px 12px rgba(156, 39, 176, 0.5)' : '0 4px 12px rgba(255,180,100,0.3)'};
    }
`;

const HighlightText = styled.p`
    font-size: 0.92rem;
    line-height: 1.6;
    color: rgba(255,255,255,0.92);
    margin: 0;
    flex: 1;
    font-weight: 400;
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
    padding: 0.6rem;
    background: ${({ $sentimentTheme }) =>
        $sentimentTheme
            ? 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(243, 229, 245, 0.98) 50%, rgba(255, 243, 224, 0.96) 100%)'
            : 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(255,250,245,0.98) 50%, rgba(255,245,235,0.95) 100%)'};
    border: 2px solid ${({ $sentimentTheme }) => $sentimentTheme ? 'rgba(156, 39, 176, 0.6)' : 'rgba(255,180,100,0.5)'};
    box-shadow: ${({ $sentimentTheme }) =>
        $sentimentTheme
            ? '0 2px 8px rgba(156, 39, 176, 0.28), inset 0 1px 2px rgba(255,255,255,0.9)'
            : '0 2px 8px rgba(255,180,100,0.2), inset 0 1px 2px rgba(255,255,255,0.9)'};
    transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
    cursor: pointer;

    ${TechPillWrapper}:hover & {
        transform: translateY(-4px) scale(1.08);
        box-shadow: ${({ $sentimentTheme }) =>
            $sentimentTheme
                ? '0 8px 20px rgba(156, 39, 176, 0.5), inset 0 1px 3px rgba(255,255,255,1)'
                : '0 8px 20px rgba(255,180,100,0.4), inset 0 1px 3px rgba(255,255,255,1)'};
        border-color: ${({ $sentimentTheme }) => $sentimentTheme ? 'rgba(186, 104, 200, 0.9)' : 'rgba(255,180,100,0.8)'};
    }
`;

const TechLogo = styled.img`
    width: 150%;
    height: 150%;
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
    background: ${({ $sentimentTheme }) =>
        $sentimentTheme
            ? 'linear-gradient(135deg, rgba(156, 39, 176, 0.95), rgba(255, 109, 0, 0.95))'
            : 'linear-gradient(135deg, rgba(255,140,60,0.95), rgba(255,160,100,0.95))'};
    box-shadow: ${({ $sentimentTheme }) =>
        $sentimentTheme ? '0 4px 12px rgba(156, 39, 176, 0.4), 0 0 0 1px rgba(225, 190, 231, 0.4)'
                       : '0 4px 12px rgba(255,140,60,0.4), 0 0 0 1px rgba(255,180,100,0.5)'};
    opacity: ${({ $visible }) => $visible ? 1 : 0};
    pointer-events: none;
    transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
    z-index: 1000;

    &::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border: 5px solid transparent;
        border-top-color: ${({ $sentimentTheme }) => $sentimentTheme ? 'rgba(156, 39, 176, 0.95)' : 'rgba(255,140,60,0.95)'};
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
    background: ${({ $sentimentTheme }) =>
        $sentimentTheme ? 'rgba(156, 39, 176, 0.12)' : 'rgba(255,180,100,0.1)'};
    border: 1.5px solid ${({ $sentimentTheme }) => 
        $sentimentTheme ? 'rgba(156, 39, 176, 0.35)' : 'rgba(255,180,100,0.3)'};
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
    
    &:hover {
        transform: translateY(-4px);
        border-color: ${({ $sentimentTheme }) => 
            $sentimentTheme ? 'rgba(186, 104, 200, 0.6)' : 'rgba(255,180,100,0.5)'};
        box-shadow: ${({ $sentimentTheme }) => 
            $sentimentTheme ? '0 6px 20px rgba(156, 39, 176, 0.3)' : '0 6px 20px rgba(255,180,100,0.25)'};
        background: ${({ $sentimentTheme }) =>
            $sentimentTheme ? 'rgba(156, 39, 176, 0.18)' : 'rgba(255,180,100,0.15)'};
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
        if ($type === 'youtube') return 'linear-gradient(135deg, rgba(255, 0, 0, 0.2), rgba(200, 0, 0, 0.15))';
        if ($type === 'paper') return 'linear-gradient(135deg, rgba(100, 100, 255, 0.2), rgba(70, 70, 200, 0.15))';
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


export default SentimentTraderCard;


