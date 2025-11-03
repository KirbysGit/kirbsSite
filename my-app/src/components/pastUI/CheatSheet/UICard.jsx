// Imports.
import React from 'react';
import { styled } from 'styled-components';
import  { motion, AnimatePresence } from 'framer-motion';
import { FaCheck, FaChevronUp, FaRegClipboard, FaSmileWink } from 'react-icons/fa'

// Local Imports.
import importantImg from '../../assets/important.png';
import getPreviewComponent from './Previews.jsx';

const UICard = ({ card, openId, setOpenId, copiedId, setCopiedId }) => {
    const isExpanded = openId === card.id;
      

    return (
        <VisualCard>
            <CardRow
                role="button"
                aria-expanded={isExpanded}
                $isExpanded={isExpanded}
                onClick={() =>
                    setOpenId(prev => (prev === card.id ? null : card.id))
                }
            >
                <CardTitle>{card.title}</CardTitle>
                <CardBrief $expanded={isExpanded}>{card.brief}</CardBrief>
                <MotionExpandArrow 
                    $isExpanded={isExpanded}
                    animate={{ rotate: isExpanded ? 180 : 0}}
                    transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1]}}
                >
                    <FaChevronUp />
                </MotionExpandArrow>
            </CardRow>
            <AnimatePresence initial={false} mode="wait">
                {isExpanded && (
                    <CardContent 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }} 
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.3, delay: 0.05 }}
                        >
                            <CardDescription>{card.description}</CardDescription>
                            <InputsAndExamples>
                                    {/* Left Column - Inputs */}
                                    <CardInputs>
                                        <CardInputHeader>Types of Inputs</CardInputHeader>
                                        <InputList>
                                            {card.inputs.map((inp, index) => (
                                                <InputRow key={inp.label}>
                                                    <InputTitles>
                                                        <li>{inp.label}</li>
                                                    </InputTitles>
                                                    <InputDescriptions>
                                                        <li>{inp.detail}</li>
                                                    </InputDescriptions>
                                                </InputRow>
                                            ))}
                                        </InputList>
                                        
                                    </CardInputs>
                                    <InputExampleBar />
                                    <CardExamples>
                                        <CardExampleHeader>Examples</CardExampleHeader>
                                        <ExampleList>
                                            {card.examples.map(ex => {
                                                const [prop, value] = ex.code.replace(';','').split(':').map(s => s.trim());
                                                const preview = getPreviewComponent(prop, value, ex.previewType);

                                                return (
                                                    <ExampleRow key={ex.label}>
                                                        <ExampleLabel>{ex.label}</ExampleLabel>
                                                        
                                                        <ExampleCode
                                                            onMouseLeave={() => copiedId && setCopiedId(null)}
                                                        >
                                                            <CopyBtn 
                                                                aria-label={copiedId === ex.label ? 'Copied!' : 'Copy to clipboard.'}
                                                                $copied={copiedId === ex.label}
                                                                onClick={() => {
                                                                    navigator.clipboard.writeText(ex.code)
                                                                    setCopiedId(ex.label);
                                                                    setTimeout(() => setCopiedId(null), 1500);
                                                                }}
                                                            >
                                                                {copiedId === ex.label
                                                                    ? <FaCheck size={13} />
                                                                    : <FaRegClipboard size={13} />
                                                                }
                                                            </CopyBtn>
                                                            <pre><code>{ex.code}</code></pre>
                                                        </ExampleCode>

                                                        {preview}
                                                    </ExampleRow>
                                                );
                                                }
                                            )}
                                        </ExampleList>
                                    </CardExamples>
                            </InputsAndExamples>
                        </motion.div>
                        
                    </CardContent>
                )}
            </AnimatePresence>
        </VisualCard>
    );
}

const VisualCard = styled.div`
    margin: 0; /* space on outside from left and right */
    border: 1px solid var(--border); /* light border around card */
    border-radius: 12px; /* rounded border */
    color: var(--text); /* black text */
    width: 90%; /* 85% of the section div */
    background: var(--surface);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    transition: all 0.3s; /* smooth transition on hover */

    &:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        transform: translateY(-2px);
    }
`
// ------------------------------------------- Per UI Card
const CardRow = styled.div`
    padding: 1rem 1.25rem; /* spacing on insides of expandable card */
    display: flex; /* set flex for entire row */
    align-items: center; /* center all items vertically */
    gap: 1.5rem; /* small gap between each item */
    width: 100%; /* row takes up entirety of visual card container */
    font-size: 1em; /* sets main font-size for text in cards */
    cursor: pointer;
    user-select: none;

    ${({ $isExpanded }) => !$isExpanded && `
        &:hover { background: rgba(0, 0, 0, 0.05); } /* darken on hover */
    `}
`
const CardTitle = styled.div`
    width:  220px;
    display: flex; /* set flex display */
    justify-content: flex-start; /* set text to left side of card */
    color: var(--text);
`
const CardBrief = styled.div`
    display: flex; /* set flex display */
    flex: 1; /* makes middle content stretch while title and arrow hug content */
    justify-content: center; /* center text in middle of column */
    align-items: center; /* center text vertically */
    transition: opacity 0.5s ease; /* slowly transition text out after expansion */
    opacity: ${({  $expanded }) => ($expanded ? 0 : 1 )}; /* if expanded, cannot see text */
    pointer-events: ${({ $expanded }) => ($expanded ? 'none' : 'auto')}; /* if expanded, element becomes invisible to pointer */
    font-size: 0.85em; /* slightly smaller text */
`
const MotionExpandArrow = styled(motion.div)`
    width: 24px;
    font-size: 0.75em; /* slightly smaller arrow */
    display: flex; /* sets flex display */
    justify-content: flex-end; /* sets arrow to right side of column */
    align-items: center;
`
// ------------------------------------------- Per Expanded UI Card
const CardContent = styled(motion.div)`
    overflow: hidden;
    font-size: 0.7em;
    padding: 1rem 0;
    margin: 0.75rem 0;
    border-top: 1px solid var(--border);
`
const CardDescription = styled.div`
    margin: 0 2rem 1rem;
    line-height: 1.6;
`
// ------------------------------------------- Inputs & Examples Grid
const InputsAndExamples = styled.div`
    display: grid; 
    grid-template-columns: 1fr 2px 1fr;
    margin-top: 0.75rem; /* sets a slight space above the content */
    padding: 1rem 2rem;
    border-top: 1px solid var(--border); /* sets a slight separator border between card and expanded content */
    gap: 2rem;
    background: var(--surface);
`
// ------------------------------------------- Inputs
const CardInputs = styled.div`
    padding: 1rem;
`
const CardInputHeader = styled.div`
    display: flex;
    justify-content: center;
    font-size: 1.5em;
    margin-bottom: 1rem;
`
const InputList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`
const InputRow = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr;
    padding: 0.45rem 0.75rem;
    border-radius: 10px;
    border: 2px solid var(--border);
    transition: all 0.3s ease;
    &:hover {
        transform: translateY(-3px);
        border: 2px solid var(--accent);
    }
`
const InputTitles = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0;
    margin: 0;
    list-style: none;

    li {
        font-weight: 600;
        text-align: center;
        color: var(--text);
        padding: 0.5rem 0;
        background: transparent;
        border-radius: 6px;
        transition: background 0.2s ease, color 0.2s ease;
        transition: all 0.2s ease;
    }
`
const InputDescriptions = styled.div`
    display: flex;
    font-weight: 400;
    flex-direction: column;
    justify-content: space-between;
    list-style: none;
    padding: 0;
    margin: 0;

    li {
        color: var(--text);
        text-align: justify;
        transition: all 0.2s ease;
        line-height: 1.5;
        padding: 0.5rem;
        border-radius: 6px;
    }
`
// ------------------------------------------- Input & Example Separator Bar
const InputExampleBar = styled.span`
    margin: 0;
    width: 2px;
    height: 100%;
    background: var(--border);
    border-radius: 6px;
`
// ------------------------------------------- Examples
const CardExamples = styled.div`
    padding: 1rem; /* padding on all sides of examples container */
`
const CardExampleHeader = styled.div`
    display: flex;
    justify-content: center;
    font-size: 1.5em;
    margin-bottom: 1rem;
    color: var(--text);
`
const ExampleList = styled.div`
    display: grid; /* sets up examples as a grid */
    grid-template-columns: max-content minmax(100px, 1fr) max-content; /* sets up to max size of content, whatevers left, and max size of content */
    align-items: center; /* center aligned objects */
    gap: 1.25rem;
`
const ExampleRow = styled.div`
    display: contents;
`
const ExampleLabel = styled.span`
    font-size: 0.85em;
`
const ExampleCode = styled.div`
    position: relative;
    width: 100%;
    max-width: 100%;

    pre {
        margin: 0;
        background: var(--surface);
        padding: 0.6rem 0.9rem;
        border: 1px solid var(--border);
        border-radius: 4px;
        overflow-x: auto;
        font-size: 0.8em;
        transition: all 0.3s ease;
        white-space: pre-wrap;
        word-break: break-word;

        &:hover {
            border-color: var(--accent);
        }
    }

    &:hover > button,
    &:focus-within > button {
        opacity: 1;
        transform: translateY(0);
    }   
`
const CopyBtn = styled.button`
    --size: 21px;

    position: absolute;
    top: 6px;
    right: 6px;
    width: var(--size);
    height: var(--size);

    display: flex;
    align-items: center;
    justify-content: center;

    border: none;
    border-radius: 6px;
    background: ${({ $copied }) => ($copied ? 'var(--accent)' : 'var(--border)')};
    color: ${({ $copied }) => ($copied ? '#fff' : 'var(--text-muted)')};
    cursor: pointer;

    opacity: 0;
    transform: translateY(-4px);
    transition: all 0.2s ease;

    &:hover {
        background: ${({ $copied }) => ($copied ? 'var(--accent)' : 'var(--border)')}
    }

    &:active { transform: scale(0.95) }

    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`

export default UICard;