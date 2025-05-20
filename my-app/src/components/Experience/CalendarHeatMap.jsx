import React from 'react';
import { useState } from 'react';
import { darken } from 'polished';
import styled from 'styled-components';
import { motion, AnimatePresence} from 'framer-motion';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';

const getDateRangeArray = (start, end) => {
    const startDate = new Date(start);
    const endDate = end.toLowerCase() === "present" ? new Date() : new Date(end);
    const dates = [];

    let current = new Date(startDate);

    while (current <= endDate) {
        dates.push(new Date(current));
        current.setDate(current.getDate() + 1);
    }

    return dates;
}

const groupDatesByMonth = (dates) => {
    return dates.reduce((acc, date) => {
        const monthKey = `${date.getFullYear()}-${date.getMonth()}`
        if(!acc[monthKey]) acc[monthKey] = [];
        acc[monthKey].push(date);
        return acc;
    }, {});
};

const isFullYear = (dates,  year) => {
    const start = new Date(`${year}-01-01`);
    const end = new Date(`${year}-12-31`);
    const daysInYear = (end - start) / (1000 * 60 * 60 * 24) + 1;
    const daysInDates = dates.filter(date => date.getFullYear() === parseInt(year)).length;
    return daysInDates >= daysInYear - 2;
}

const CalendarHeatMap = ({ item }) => {

    const start = item.duration.start;
    const end = item.duration.end;
    const dates = getDateRangeArray(start, end);
    const months = groupDatesByMonth(dates);

    const years = Object.keys(months).reduce((acc, key) => {
        const [year] = key.split('-');
        if(!acc.includes(year)) acc.push(year);
        return acc;
    }, []);

    const [expandedYears, setExpandedYears] = useState(() => {
        const currentYear = new Date().getFullYear().toString();
        return [currentYear];
    })
    
    const toggleYear = (year) => {
        setExpandedYears(prev =>
            prev.includes(year)
            ? prev.filter(y => y !== year)
            : [...prev, year]
        );
    };

    const getAllDaysInMonth = (year, month) => {
        const date = new Date(year, month, 1);
        const result = [];

        while (date.getMonth() === month) {
            result.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }

        return result;
    }

    return (
        <HeatMapContainer>
          {years.map((year) => {
            const yearDates = dates.filter((d) => d.getFullYear() === parseInt(year));
      
            return (
              <YearGroup key={year}>
                <YearRow 
                    onClick={() => toggleYear(year)}
                    $bg={item.theme.soft}
                >
                  <YearLabel>{year}</YearLabel>
                  {isFullYear(dates, year)}
                  <Arrow>{expandedYears.includes(year) ? <FaChevronUp /> : <FaChevronDown />}</Arrow>
                </YearRow>
                <AnimatePresence initial={false}>
                    {expandedYears.includes(year) && (
                        <MotionMonthGridWrap
                            key={year}
                            initial={{ scaleY: 0, opacity: 0 }}
                            animate={{ scaleY: 1, opacity: 1}}
                            exit={{ scaleY: 0, opacity: 0 }}
                            transition={{duration: 0.2, ease: "easeInOut"}}
                        >
                            {Object.entries(months)
                            .filter(([key]) => key.startsWith(year))
                            .map(([key, days]) => {
                                const [_, monthIndex] = key.split('-');
                                const monthName = new Date(year, monthIndex).toLocaleString('default', {
                                month: 'short',
                                });

                                return (
                                <MonthBlock 
                                    key={key}
                                    $bg={item.theme.mutedBackground}    
                                >
                                    <MonthTitle>{monthName} {year}</MonthTitle>
                                    <MonthGrid>
                                    {getAllDaysInMonth(parseInt(year), parseInt(monthIndex)).map((date, j) => {
                                        const isWorked = date >= new Date(item.duration.start) &&
                                            date >= new Date(item.duration.start) &&
                                            (item.duration.end.toLowerCase?.() === 'present'
                                                ? date <= new Date()
                                                : date <= new Date(item.duration.end));

                                            return(
                                                <Block
                                                    key={j}
                                                    variants={{
                                                        hidden: { opacity: 0, scale: 0.8 },
                                                        visible: { opacity: 1, scale: 1 }
                                                    }}
                                                    initial="hidden"
                                                    animate="visible"
                                                    transition={{ delay: 0.025 * j }}
                                                    $color={isWorked ? item.theme.primary: 'transparent'}
                                                    $outline={!isWorked}
                                                />
                                            );
                                })}
                                    </MonthGrid>
                                </MonthBlock>
                                );
                            })}
                        </MotionMonthGridWrap>
                    )}
                </AnimatePresence>
              </YearGroup>
            );
          })}
        </HeatMapContainer>
    );      

}

// ------------ Entire Container. ------------
const HeatMapContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
`;

// ------------ Individual Year & Month Containers ------------
const YearGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

// ------------ Year Bars ------------
const YearRow = styled.div`
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    gap: 0.5rem;
    background: ${(props) => props.$bg};
    border-radius: 12px;
    border: 1px solid white;
    padding: 0.5rem 1rem;
    transition: background 0.2s ease;

    &:hover {
        background: ${( { $bg }) => darken(0.07, $bg)};
    }
`;

// Year Label. E.g. 2025.
const YearLabel = styled.div`
    font-weight: bold;
    color: white;
    text-align: center;
    justify-self: center;
`;

// ------------ Month Grid ------------
const MotionMonthGridWrap = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    justify-content: flex-start;
    max-width: 90%;
    width: fit-content;
    gap: 0.5rem;
    margin: 0.5rem auto 0 auto;
    transition: 0.5s ease;
    transform-origin: top;
`;

// Each Individual Month Block.
const MonthBlock = styled.div`
    background: ${ (props) => props.$bg };
    min-width: 100px;
    border: 1px solid white;
    padding: 0.3rem 0.5rem 0.5rem 0.5rem;
    border-radius: 12px;
    transition: transform 0.5s ease, box-shadow 0.5s ease, background 0.2s ease;

    &:hover {
        background: ${({ $bg }) => darken(0.05, $bg)};
        transform: translateY(-3px);
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
    }
    
`
// Month Titles. E.g. Jan, Feb, Mar.
const MonthTitle = styled.h4`
    margin: 0 0 0.3rem 0;
    font-size: 0.8rem;
    color: white;
`
// Whole Grid for Day Blocks.
const MonthGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 10px);
    grid-auto-rows: 10px;
    gap: 2px;
`
// Individual Day Blocks.
const Block = styled(motion.div)`
    width: 10px;
    height: 10px;
    background-color: ${( { $color }) => $color };
    opacity: 0.85;
    border-radius: 2px;
    border: ${({ $outline }) => ($outline ? '1px solid rgba(255, 255, 255, 0.5)' : 'none')};
`
// Expanding Arrows.
const Arrow = styled.div`
    display: flex;
    font-size: 0.8rem;
    color: white;
    margin-left: auto;
    margin-right: 0.2em;

    &:hover {
        opacity: 0.5;
        cursor: pointer;
    }
`;

export default CalendarHeatMap;