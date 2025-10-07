import React, { useState } from 'react';
import styled from 'styled-components';

// Import project logos and previews
import centiBanner from '@/images/projects/centi/centi_banner.png';
import centiPreview from '@/images/projects/centi/centiPreview.png';

// Import logo map
import { getLogo } from '@/components/Utils/logoMap';

const CentiCard = () => {
    const [hoveredTech, setHoveredTech] = useState(null);
    return (
        <ProjectCard $centiTheme>
            <CardHeader>
                <HeaderTop>
                    <ProjectInfo>
                        <ProjectName $centiTheme>Centi</ProjectName>
                        <ProjectSubtitle>Personal Finance Organizer</ProjectSubtitle>
                        <ProjectDate>Jun 2025 - Present</ProjectDate>
                    </ProjectInfo>
                    <ProjectLogoImage src={centiBanner} alt="Centi Logo" />
                </HeaderTop>
                
                <ProjectDescription>
                    A friendly dashboard that actually helps you understand where your money's going. No spreadsheets, no confusion, just clear insights that make sense.
                </ProjectDescription>
                <Divider $themeColor="rgb(13, 110, 253)" $centiTheme />
            </CardHeader>
            
            <CardBody>
                <SectionLabel $centiTheme>Tech Stack</SectionLabel>
                <TechStack>
                    {['React', 'FastAPI', 'PostgreSQL', 'Plaid API', 'Google OAuth', 'JWT', 'Vercel', 'Railway'].map((tech) => (
                        <TechPillWrapper 
                            key={tech}
                            onMouseEnter={() => setHoveredTech(tech)}
                            onMouseLeave={() => setHoveredTech(null)}
                        >
                            <TechPill $centiTheme>
                                <TechLogo src={getLogo(tech)} alt={tech} />
                            </TechPill>
                            <Tooltip $visible={hoveredTech === tech} $centiTheme>
                                {tech}
                            </Tooltip>
                        </TechPillWrapper>
                    ))}
                </TechStack>
                <SectionLabel $centiTheme>What It Does</SectionLabel>
                <HighlightsList>
                    <Highlight $centiTheme>
                        <HighlightIcon $centiTheme>🔗</HighlightIcon>
                        <HighlightText>Automatically syncs with your bank accounts so you don't have to manually track every purchase</HighlightText>
                    </Highlight>
                    
                    <Highlight $centiTheme>
                        <HighlightIcon $centiTheme>📊</HighlightIcon>
                        <HighlightText>Gives you a personalized "Centi Score" that shows your financial health at a glance</HighlightText>
                    </Highlight>
                    
                    <Highlight $centiTheme>
                        <HighlightIcon $centiTheme>📈</HighlightIcon>
                        <HighlightText>Breaks down your spending into easy-to-read charts—see exactly where your money goes each month</HighlightText>
                    </Highlight>
                </HighlightsList>
            </CardBody>
            
            <CardFooter>
                <Divider $themeColor="rgb(13, 110, 253)" $centiTheme />
                <LivePreviewContainer 
                    $centiTheme 
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
        </ProjectCard>
    );
};

// Individual project card - similar to experience card
const ProjectCard = styled.div`
    width: 500px;
    min-height: 600px;
    
    /* Theme-based gradient with depth - more green throughout */
    background: ${props => props.$centiTheme ? `linear-gradient(135deg,
        rgba(8, 70, 160, 0.95) 0%,
        rgba(10, 90, 140, 0.93) 20%,
        rgba(13, 110, 130, 0.91) 35%,
        rgba(15, 120, 115, 0.89) 50%,
        rgba(18, 128, 100, 0.87) 65%,
        rgba(22, 132, 90, 0.86) 80%,
        rgba(25, 135, 84, 0.85) 100%
    )` : `linear-gradient(135deg,
        rgba(255, 140, 60, 0.15) 0%,
        rgba(255, 160, 100, 0.12) 30%,
        rgba(255, 180, 140, 0.10) 60%,
        rgba(255, 200, 180, 0.08) 100%
    )`};
    backdrop-filter: blur(20px) saturate(110%);
    -webkit-backdrop-filter: blur(20px) saturate(110%);
    
    /* Theme-based border */
    border: 1px solid ${props => props.$centiTheme ? 'rgba(13, 110, 253, 0.5)' : 'rgba(255, 180, 100, 0.4)'};
    border-radius: 24px;
    box-shadow: ${props => props.$centiTheme ? `
        0 8px 32px rgba(0, 0, 0, 0.3),
        inset 0 1px 2px rgba(182, 224, 254, 0.3),
        inset 0 -1px 2px rgba(0, 0, 0, 0.2),
        0 0 40px rgba(13, 110, 253, 0.3)
    ` : `
        0 8px 32px rgba(0, 0, 0, 0.3),
        inset 0 1px 2px rgba(255, 180, 100, 0.3),
        inset 0 -1px 2px rgba(0, 0, 0, 0.2),
        0 0 40px rgba(255, 180, 100, 0.2)
    `};
    
    padding: 2rem 1.5rem;
    display: flex;
    flex-direction: column;
    transition: all 0.4s ease;
    
    &:hover {
        transform: translateY(-8px);
        background: ${props => props.$centiTheme ? `linear-gradient(135deg,
            rgba(8, 70, 160, 0.97) 0%,
            rgba(10, 90, 140, 0.95) 20%,
            rgba(13, 110, 130, 0.93) 35%,
            rgba(15, 120, 115, 0.91) 50%,
            rgba(18, 128, 100, 0.89) 65%,
            rgba(22, 132, 90, 0.88) 80%,
            rgba(25, 135, 84, 0.87) 100%
        )` : `linear-gradient(135deg,
            rgba(255, 140, 60, 0.18) 0%,
            rgba(255, 160, 100, 0.15) 30%,
            rgba(255, 180, 140, 0.12) 60%,
            rgba(255, 200, 180, 0.10) 100%
        )`};
        box-shadow: ${props => props.$centiTheme ? `
            0 12px 48px rgba(0, 0, 0, 0.4),
            inset 0 2px 3px rgba(182, 224, 254, 0.4),
            inset 0 -1px 2px rgba(0, 0, 0, 0.2),
            0 0 60px rgba(13, 110, 253, 0.5)
        ` : `
            0 12px 48px rgba(0, 0, 0, 0.4),
            inset 0 2px 3px rgba(255, 180, 100, 0.4),
            inset 0 -1px 2px rgba(0, 0, 0, 0.2),
            0 0 60px rgba(255, 180, 100, 0.4)
        `};
        border-color: ${props => props.$centiTheme ? 'rgba(182, 224, 254, 0.6)' : 'rgba(255, 180, 100, 0.6)'};
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
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    letter-spacing: -0.5px;
    line-height: 1.2;
    
    /* Theme-based gradient text - using lighter gradient for visibility */
    ${props => props.$centiTheme ? `
        background: linear-gradient(90deg, rgb(182, 224, 254), rgb(167, 255, 235));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    ` : `
        color: rgba(255, 255, 255, 1);
    `}
`;

const ProjectSubtitle = styled.div`
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.95);
    font-weight: 500;
    font-style: italic;
    margin: 0;
`;

const ProjectDate = styled.span`
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.9);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
`;

const ProjectLogoImage = styled.img`
    width: 200px;
    height: auto;
    border-radius: 12px;
    object-fit: contain;
`;

const ProjectDescription = styled.p`
    font-size: 0.95rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.95);
    margin: 0;
    font-weight: 400;
`;

const Divider = styled.div`
    width: 100%;
    height: 2px;
    background: ${props => props.$centiTheme ? 
        'linear-gradient(90deg, rgb(182, 224, 254), rgb(167, 255, 235))' : 
        (props.$themeColor || 'rgba(255, 255, 255, 0.2)')
    };
    opacity: 0.7;
    border-radius: 2px;
    box-shadow: ${props => props.$centiTheme ? 
        '0 0 10px rgba(182, 224, 254, 0.5)' : 
        `0 0 10px ${props.$themeColor || 'rgba(255, 255, 255, 0.2)'}`
    };
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
    
    ${props => props.$centiTheme ? `
        background: linear-gradient(90deg, rgb(182, 224, 254), rgb(167, 255, 235));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    ` : `
        color: rgba(255, 255, 255, 0.9);
    `}
`;

const HighlightsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;

const Highlight = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem;
    border-radius: 12px;
    background: ${props => props.$centiTheme ? 
        'linear-gradient(90deg, rgba(182, 224, 254, 0.12) 0%, rgba(167, 255, 235, 0.12) 100%)' : 
        'rgba(255, 180, 100, 0.08)'
    };
    border: 1px solid ${props => props.$centiTheme ? 
        'rgba(182, 224, 254, 0.3)' : 
        'rgba(255, 180, 100, 0.2)'
    };
    transition: all 0.3s ease;
    
    &:hover {
        background: ${props => props.$centiTheme ? 
            'linear-gradient(90deg, rgba(182, 224, 254, 0.20) 0%, rgba(167, 255, 235, 0.20) 100%)' : 
            'rgba(255, 180, 100, 0.15)'
        };
        border-color: ${props => props.$centiTheme ? 
            'rgba(182, 224, 254, 0.5)' : 
            'rgba(255, 180, 100, 0.4)'
        };
        transform: translateX(4px);
        box-shadow: ${props => props.$centiTheme ? 
            '0 4px 12px rgba(182, 224, 254, 0.3)' : 
            '0 4px 12px rgba(255, 180, 100, 0.2)'
        };
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
    background: ${props => props.$centiTheme ? 
        'linear-gradient(90deg, rgba(182, 224, 254, 0.25) 0%, rgba(167, 255, 235, 0.25) 100%)' : 
        'rgba(255, 180, 100, 0.15)'
    };
    border-radius: 10px;
    box-shadow: ${props => props.$centiTheme ? 
        '0 2px 8px rgba(182, 224, 254, 0.3)' : 
        '0 2px 8px rgba(255, 180, 100, 0.2)'
    };
    transition: all 0.3s ease;
    
    ${Highlight}:hover & {
        transform: scale(1.1);
        box-shadow: ${props => props.$centiTheme ? 
            '0 4px 12px rgba(182, 224, 254, 0.5)' : 
            '0 4px 12px rgba(255, 180, 100, 0.3)'
        };
    }
`;

const HighlightText = styled.p`
    font-size: 0.9rem;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.9);
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
    
    /* Light gradient background */
    background: ${props => props.$centiTheme ? 
        'linear-gradient(90deg, rgb(182, 224, 254), rgb(167, 255, 235))' : 
        'linear-gradient(90deg, rgb(182, 224, 254), rgb(167, 255, 235))'
    };
    
    border: 2px solid ${props => props.$centiTheme ? 
        'rgba(182, 224, 254, 0.6)' : 
        'rgba(255, 180, 100, 0.5)'
    };
    box-shadow: ${props => props.$centiTheme ? 
        '0 2px 8px rgba(182, 224, 254, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.9)' : 
        '0 2px 8px rgba(255, 180, 100, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.9)'
    };
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    
    ${TechPillWrapper}:hover & {
        transform: translateY(-4px) scale(1.08);
        box-shadow: ${props => props.$centiTheme ? 
            '0 8px 20px rgba(182, 224, 254, 0.5), inset 0 1px 3px rgba(255, 255, 255, 1)' : 
            '0 8px 20px rgba(255, 180, 100, 0.4), inset 0 1px 3px rgba(255, 255, 255, 1)'
        };
        border-color: ${props => props.$centiTheme ? 
            'rgba(182, 224, 254, 0.9)' : 
            'rgba(255, 180, 100, 0.8)'
        };
        background: ${props => props.$centiTheme ? 
            'linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(245, 252, 255, 1) 50%, rgba(235, 248, 255, 1) 100%)' : 
            'linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(255, 252, 248, 1) 50%, rgba(255, 248, 240, 1) 100%)'
        };
    }
`;

const TechLogo = styled.img`
    width: 150%;
    height: 150%;
    object-fit: contain;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
    transition: filter 0.3s ease;
    
    ${TechPillWrapper}:hover & {
        filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.15));
    }
`;

const Tooltip = styled.div`
    position: absolute;
    bottom: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%) ${props => props.$visible ? 'translateY(0)' : 'translateY(4px)'};
    
    padding: 0.5rem 0.75rem;
    border-radius: 8px;
    
    /* Gradient background matching theme */
    background: ${props => props.$centiTheme ? 
        'linear-gradient(135deg, rgba(13, 110, 253, 0.95) 0%, rgba(25, 135, 200, 0.95) 100%)' : 
        'linear-gradient(135deg, rgba(255, 140, 60, 0.95) 0%, rgba(255, 160, 100, 0.95) 100%)'
    };
    
    color: white;
    font-size: 0.75rem;
    font-weight: 600;
    white-space: nowrap;
    
    box-shadow: ${props => props.$centiTheme ? 
        '0 4px 12px rgba(13, 110, 253, 0.4), 0 0 0 1px rgba(182, 224, 254, 0.5)' : 
        '0 4px 12px rgba(255, 140, 60, 0.4), 0 0 0 1px rgba(255, 180, 100, 0.5)'
    };
    
    opacity: ${props => props.$visible ? '1' : '0'};
    pointer-events: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1000;
    
    /* Tooltip arrow */
    &::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border: 5px solid transparent;
        border-top-color: ${props => props.$centiTheme ? 
            'rgba(13, 110, 253, 0.95)' : 
            'rgba(255, 140, 60, 0.95)'
        };
    }
`;

const CardFooter = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 0.5rem;
    margin-top: auto;
`;

// Live Preview Components
const LivePreviewContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.85rem;
    border-radius: 12px;
    background: ${props => props.$centiTheme ? 
        'linear-gradient(90deg, rgba(182, 224, 254, 0.15) 0%, rgba(167, 255, 235, 0.12) 100%)' : 
        'rgba(255, 180, 100, 0.1)'
    };
    border: 2px solid ${props => props.$centiTheme ? 
        'rgba(182, 224, 254, 0.4)' : 
        'rgba(255, 180, 100, 0.3)'
    };
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
        );
        transition: left 0.6s ease;
    }
    
    &:hover {
        background: ${props => props.$centiTheme ? 
            'linear-gradient(90deg, rgba(182, 224, 254, 0.25) 0%, rgba(167, 255, 235, 0.20) 100%)' : 
            'rgba(255, 180, 100, 0.15)'
        };
        border-color: ${props => props.$centiTheme ? 
            'rgba(182, 224, 254, 0.6)' : 
            'rgba(255, 180, 100, 0.5)'
        };
        transform: translateY(-4px);
        box-shadow: ${props => props.$centiTheme ? 
            '0 8px 24px rgba(182, 224, 254, 0.4)' : 
            '0 8px 24px rgba(255, 180, 100, 0.3)'
        };
        
        &::before {
            left: 100%;
        }
    }
    
    @media (max-width: 600px) {
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
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
    transition: transform 0.4s ease;
    
    ${LivePreviewContainer}:hover & {
        transform: scale(1.05);
    }
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
    color: rgba(255, 255, 255, 1);
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const PreviewSubtext = styled.div`
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.85);
    font-weight: 500;
`;

const PreviewArrow = styled.div`
    position: absolute;
    right: 2.5%;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.6rem;
    color: rgba(255, 255, 255, 0.7);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    
    ${LivePreviewContainer}:hover & {
        transform: translateY(-50%) translateX(8px);
        color: rgba(255, 255, 255, 1);
    }
    
    @media (max-width: 600px) {
        position: static;
        transform: none;
        
        ${LivePreviewContainer}:hover & {
            transform: translateX(8px);
        }
    }
`;

export default CentiCard;