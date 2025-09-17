// Imports.
import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaChevronUp, FaSearch } from 'react-icons/fa'

// Local Imports.
import './CheatSheet.css';
import data from './CheatSheet.js';
import UICard from './UICard.jsx';

const CheatSheet = () => {
    // States.
    const [openId, setOpenId] = useState(null);                         // State 4 Which Card Is Open.
    const [copiedId, setCopiedId] = useState(null);                     // State 4 Copying Examples.
    const [expandedSections, setExpandedSections] = useState({});       // State 4 Setting Which Section Is Expanded.
    const [searchTerm, setSearchTerm] = useState('');                   // State 4 Setting The Search.

    // Toggle Expanded Sections.
    const toggleSection = (key) => {
        setExpandedSections((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    // Search Filter.
    const filteredData = React.useMemo(() => {
        // If No Search Term, Exit.
        if (!searchTerm.trim()) return data;
        
        // Initialize Empty Dict.
        const filtered = {};

        // For Each Section, Check in 'title', 'brief', and 'description' If Search Term Is Contained.
        // If So, Set Filtered Cards Under Corresponding Section In The 'filtered' Obj.
        Object.entries(data).forEach(([sectionKey, sectionCards]) => {
            const filteredCards = sectionCards.filter(card => 
                card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                card.brief.toLowerCase().includes(searchTerm.toLowerCase()) ||
                card.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
            if (filteredCards.length > 0) {
                filtered[sectionKey] = filteredCards;
            }
        });
        return filtered;
    }, [searchTerm]);

    // Auto-Expand Sections While Searching Using 'filteredData'.
    React.useEffect(() => {
        if (searchTerm.trim()) {
            const newExpandedSections = {};
            Object.keys(filteredData).forEach(key => {
                newExpandedSections[key] = true;
            });
            setExpandedSections(newExpandedSections);
        }
    }, [searchTerm, filteredData]);

    // Section Titles For Proper Formatting Of Headers.
    const sectionTitles = {
        text: 'Text',
        visuals: 'Visuals',
        boxModel: 'Box Model',
        layout: 'Layout',
        animation: 'Animation & Transitions',
        other: 'Other'
    };      

    return (
        <CheatPage>
            <Nav>
                <Back2Porfolio to="/">←&nbsp;Back&nbsp;2&nbsp;Portfolio</Back2Porfolio>

                {Object.keys(data).map((sectionKey) => (
                    <NavLink 
                        key={sectionKey} href={`#${sectionKey}`}
                        onClick={() => {
                            const section = document.getElementById(sectionKey);
                            section?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        {sectionTitles[sectionKey] || (sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1))}
                    </NavLink>
                ))}
            </Nav>
            
            <UIPage>
                <PageHeader>
                    🎨 UI Cheat-Sheet
                </PageHeader>
                <PageIntro>
                    Welcome to my CSS Cheat Sheet! I created this interactive reference while building my personal website, 
                    when I realized that my biggest obstacle wasn't coding logic, it was simply not knowing what CSS properties 
                    were available to achieve the designs I had in mind. This tool serves as both a comprehensive reference 
                    and a visual playground where you can see exactly how each property behaves. Whether you're a beginner 
                    learning the fundamentals or an experienced developer looking for a quick reminder, this cheat sheet 
                    covers essential CSS styling properties with live previews and practical examples.
                </PageIntro>
                <SearchContainer>
                    <SearchInput
                        type="text"
                        placeholder="Search CSS properties..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <SearchIcon>
                        <FaSearch />
                    </SearchIcon>
                </SearchContainer>
                <Accordion>
                    {Object.entries(filteredData).map(([sectionKey, sectionCards]) => {
                        const isOpen = expandedSections[sectionKey];
                        
                        return (
                            <Section key={sectionKey} id={sectionKey}>
                                <SectionHeader onClick={() => toggleSection(sectionKey)}>
                                    {sectionTitles[sectionKey] || (sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1))}
                                    <SeparatorBar />
                                    <MotionExpandArrow 
                                        animate={{ rotate: isOpen ? 180 : 0}}
                                        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1]}}
                                    >
                                        <FaChevronUp />
                                    </MotionExpandArrow>
                                </SectionHeader>
                                
                                {isOpen && (
                                    <SectionBody
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.5 }} 
                                    >
                                        {sectionCards.map(card => (
                                            <UICard
                                                key={card.id}
                                                card={card}
                                                openId={openId}
                                                setOpenId={setOpenId}
                                                copiedId={copiedId}
                                                setCopiedId={setCopiedId}
                                            />
                                        ))}
                                    </SectionBody>
                                )}
                            </Section>
                        );
                        
                    })}
                    
                </Accordion>
            </UIPage>
            
                
        </CheatPage>
    );
};

// ------------------------------------------- Entire Viewport Wrapper 
const CheatPage = styled.div`
    min-height: 100vh;
    grid-template-columns: 220px 1fr;
    background-color: var(--bg);
    font-weight: 500;
    display: flex;
`
// ------------------------------------------- Nav Bar
const Nav = styled.div`
    display: flex;
    flex-direction: column;
    background-color: var(--surface);
    border-right: 1px solid var(--border);
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
    align-self: flex-start;
    width: max-content;
    height: 100vh;
    position: relative;
    top: 0;
`
// ------------------------------------------- Nav Bar Buttons
const Back2Porfolio = styled(Link)`
    padding: 1.25em;
    color: var(--text);
    text-decoration: none;
    cursor: pointer;
    background-color: var(--surface);
    transition: all 0.2s ease;
    display: flex;
    margin-bottom: 4rem;
    align-items: center;

    &:hover {
        background-color: rgb(184, 184, 184);
    }
`
const NavLink = styled.a`
    display: flex;
    padding: 2em 1.25rem;
    color: var(--text);
    justify-content: center;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s;
    scroll-behavior: smooth;
    text-decoration: none;

    &:hover {
        font-size: 1.25em;
        background-color: rgb(184, 184, 184);
    }
`
// ------------------------------------------- Main Page
const UIPage = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 2rem;
    align-content: center;
    margin: 0 auto;
    font-size: 1.5em;
    scroll-behavior: smooth;
    scroll-padding-top: 1.5em;
`
// ------------------------------------------- Header Of Page
const PageHeader = styled.h1`
    display: flex;
    justify-content: center;
    color: var(--text);
    font-size: 4rem;
    letter-spacing: -0.02em;
    margin-bottom: 1rem;
`

const PageIntro = styled.p`
    width: 80%;
    font-size: 0.8em;
    align-self: center;
    text-align: justify;
    color: black;
    margin-bottom: 2em;
`
const SearchContainer = styled.div`
    width: 90%;
    display: flex;
    align-items: center;
    align-self: center;
    border: 2px solid var(--dark-border);
    background: var(--border);
    border-radius: 32px;
    position: relative;
    transition: all 0.3s ease;
    margin-bottom: 2rem;

    &:focus-within {
        border-color: var(--accent);
        box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
    }
`
const SearchInput = styled.input`
    flex: 1;
    padding: 1rem 1rem 1rem 1.5rem;
    border: none;
    outline: none;
    background: transparent;
    color: var(--text);
    font-size: 1.2em;
    font-weight: 500;
    font: inherit;

    &::placeholder {
        color: var(--text-muted);
        opacity: 0.7;
    }
`
const SearchIcon = styled.div`
    color: var(--text-muted);
    font-size: 1.2em;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: 1.5rem;
    pointer-events: none;
    transition: color 0.3s ease;

    ${SearchContainer}:focus-within & {
        color: var(--accent);
    }
`

const Accordion = styled.div`
    margin: 0;
    padding: 0;
`
// ------------------------------------------- Per UI Section (Visuals, )
const Section = styled.section`
    margin: 0;
    width: 100%;
    margin-bottom: 2rem;
`
// ------------------------------------------- Section Header
const SectionHeader = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding: 0 1em;
    margin-top: 0.5rem;
    color: var(--text);
    font-size: 1.5em;
`
const SeparatorBar = styled.div`
    flex: 1;
    margin: 0 1em;

    height: 4px;
    background: var(--border);
    border-radius: 36px;
`
// ------------------------------------------- Section Body
const SectionBody = styled(motion.div)`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: center;
    margin-top: 1em; /* space between top of card and bottom of header */
`
const MotionExpandArrow = styled(motion.div)`
    color: var(--text-muted);
    font-size: 0.8em; /* slightly smaller arrow */
    display: flex; /* sets flex display */
    justify-content: center; /* sets arrow to right side of column */
    align-items: center;
    cursor: pointer;
    padding: 0.5em;
    border-radius: 50%;
    border: 3px solid var(--border);
`

export default CheatSheet;