// Imports.
import React from 'react';
import { useState } from 'react';
import Tilt from 'react-parallax-tilt';
import { styled } from 'styled-components';

// Component Declaration.
// Takes In 'item'.
const ResponsibilityGrid = ({ item }) => {

    const [flipped, setFlipped] = useState({});     // Use State For Checking If Card Is Flipped.

    // Toggle Flip Func.
    const toggleFlip = (index) => {                 // Take Idx Of Card To Flip.
        setFlipped((prev) => ({                     // Take Prev List.
            ...prev,                                // Keep Existing Flags.
            [index]: !prev[index]                   // Per Request Index Invert 'flipped' State.
        }));
    }

    return (
        <Responsibilities>
            <RespHeader>
                <RespTitle>
                    Responsibilities of My Role
                </RespTitle>
                <RespBar />
            </RespHeader>
            <GridContainer>
                {item.responsibilities.map((resp, r) => (
                    <Tilt glareEnable={false} tiltMaxAngleX={6} tiltMaxAngleY={6} scale={1.02}>
                        <FlipCard key={r} onClick={() => toggleFlip(r)}>
                            <CardInner $flipped={flipped[r]}>
                                <CardFront $bg={item.theme.card} $theme={item.theme}>
                                    <RespCaption>{resp.title}</RespCaption> 
                                </CardFront>
                                <CardBack $bg={item.theme.lightCard} $theme={item.theme}>
                                    <RespDescription>{resp.description}</RespDescription>
                                    <RespImpact>{resp.impact}</RespImpact>
                                </CardBack>
                            </CardInner>
                        </FlipCard>
                    </Tilt>
                ))}
            </GridContainer>
        </Responsibilities>
    );
};

const Responsibilities = styled.div`
    display: flex;
    flex-direction: column;
`

const RespHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const RespTitle = styled.h1`
    display: flex;
`

const RespBar = styled.span`
    display: flex;
    flex-grow: 1;
    background-color: white;
    height: 5px;
    color: white;
    margin-left: 1em;
    border-radius: 12px;
    opacity: 0.5;
`

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin-right: 0.5em;
`;

const FlipCard = styled.div`
    position: relative;
    background: transparent;
    width: 100%;
    height: 0;
    padding-bottom: 30%;
    perspective: 1000px;
    cursor: pointer;
    margin-bottom: 1em;
    transition: transform 0.6s ease;
`

const CardInner = styled.div`
    position: absolute;
    inset: 0;
    width: 90%;
    height: 100%;
    text-align: center;
    transition: transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1);
    transform-style: preserve-3d;
    border-radius: 12px;
    transform: ${({ $flipped }) => ($flipped ? 'rotateY(180deg)' : 'none')};
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    will-change: transform;
`

const CardFace = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1em;
    border: solid 2px rgb(255, 255, 255, 0.8);
    background: 
        linear-gradient(${({ $bg }) => $bg}, ${({ $bg }) => $bg}) padding-box,
        linear-gradient(
            135deg,
            ${({ theme }) => theme.highlight} 0%,
            ${({ theme }) => theme.soft} 100%,
        ) border-box;
    color: ${({ theme }) => theme.text};

`

const CardFront = styled(CardFace)`
    background: ${(props) => props.$bg};
`

const CardBack = styled(CardFace)`
    background: ${(props) => props.$bg};
    transform: rotateY(180deg);
    display: grid;
    grid-template-rows: auto 1fr auto;
`

const RespCaption = styled.h1`
    display: flex;
    font-size: 1.5rem;
    justify-content: center;
    margin: 0;
    margin-bottom: 0.5rem;

    @keyframes popIn {
        0% { transform: scale(0.95); opacity: 0; }
        100% { transform: scale(1); opacity: 1; }
    }
`

const RespDescription = styled.h2`
    text-align: justify;
    font-size: 0.8rem;
    line-height: 1.6;
    margin: 0;
    padding: 0 0.2em;
`

const RespImpact = styled.h2`
    justify-self: end;
    align-self: end;
    margin: 0;
    padding: 0.35em 0.9em;
    font-size: 0.75rem;
    border: none;
    border-radius: 9999px;

    background: ${({ theme }) => theme.background};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.highlight} inset;
`
export default ResponsibilityGrid;