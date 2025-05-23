import React from 'react';
import styled from 'styled-components';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

const SkillSet = ({ item }) => {
    
    const featured = item.skills.featured;
    const extra = item.skills.extra;
    const soft = item.skills.soft;

    const radarData = featured.map(({ name, level }) => ({
        skill: name,
        level
    }));

    return (
        <SkillGrid>
            <Column>
                <RadarWrap>
                    <h2>Core Stack Snapshot</h2>
                    <ResponsiveContainer width="100%" height={320}>
                        <RadarChart data={radarData}>
                            <PolarGrid stroke={item.theme.soft} strokeDasharray="3 3" />
                            <PolarAngleAxis
                                dataKey="skill"
                                tick={{ fill: item.theme.text, fontSize: 15 }}
                            />
                            <Radar
                                dataKey="level"
                                stroke={item.theme.highlight}
                                fill={item.theme.highlight}
                                fillOpacity={0.35}
                                animationDuration={900}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                </RadarWrap>
            </Column>

            <Column>
                <ExtraSkillsWrap>
                    <h3>Extra Technical Skills</h3>
                    <PillList>
                        {extra.map(skill => (
                            <Pill key={skill} theme={item.theme} $variant="soft">{skill}</Pill>    
                        ))}
                    </PillList>

                    <h3>Soft Skills</h3>
                    <PillList>
                        {soft.map(skill => (
                            <Pill key={skill} theme={item.theme} $variant="extra">{skill}</Pill>
                        ))}
                    </PillList>
                </ExtraSkillsWrap>
                
            </Column>
        </SkillGrid>
    );
};

const SkillGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 2.5rem;
`

// ------------ Technical Skills  ------------

const RadarWrap = styled.div`
    align-self: center;
    text-align: center;
`

const ExtraSkillsWrap = styled.div`
    display: flex;
    flex-direction: column;
`
const Column = styled.div``;

const PillList = styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    padding: 0;
    margin: 0.5rem 0 0;
    list-style: none;
`

const Pill = styled.li`
    border-radius: 24px;
    padding: 0.45em 0.9em;
    ${({ $variant, theme }) => {
        const color = 
            $variant === 'soft' ? theme.accent : 
            $variant === 'extra' ? theme.primary :
            theme.primary;
        return `
            border: 2px solid ${color};
            transition: transform .25s, background-color .25s;
            &:hover {
                transform: scale(1.05);
                background-color: ${color}22;
            }
        `
    }};
    white-space: nowrap;
    transition: transform 0.25s;

    &:hover { transform: scale(1.05); }
`
export default SkillSet;