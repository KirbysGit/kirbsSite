// Imports.
import React from 'react';
import { useState } from 'react';
import { darken } from 'polished';
import styled from 'styled-components';
import { motion, AnimatePresence} from 'framer-motion';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';

// Gets Actual Numeric Date Array.
const getDateRangeArray = (start, end) => {
    const startDate = new Date(start);                                                  // Get Start Date in Date Format.
    const endDate = end.toLowerCase() === "present" ? new Date() : new Date(end);       // Get End Date in Date Format ( Handle "Present" Input).
    const dates = [];                                                                   // Save Dates in Array.

    let current = new Date(startDate);                                                  // Set Current Val to Start Date.

    while (current <= endDate) {                                                        // While Current Date is Not End Date.
        dates.push(new Date(current));                                                  // Add Current Date.
        current.setDate(current.getDate() + 1);                                         // Increment Date.
    }

    return dates;                                                                       // Return Date Array.
}

// Groups Dates Array By Month W/ Reduce.
const groupDatesByMonth = (dates) => {
    return dates.reduce((acc, date) => {                            // Reduce Method To Process Each Item In An Array.
        const monthKey = `${date.getFullYear()}-${date.getMonth()}` // Creates Month Key From 4-Digit Year & Zero-Based Month.
        if(!acc[monthKey]) acc[monthKey] = [];                      // If Bucket Doesn't Exist, Create Bucket.
        acc[monthKey].push(date);                                   // Push Date Into Bucket By Month Key.
        return acc;                                                 // Return Grouped Result, For Next Iteration.
    }, {});
};

// Checks If Working Dates Was A Full Year.
const isFullYear = (dates,  year) => {
    const start = new Date(`${year}-01-01`);                                                   // Sets Start Date Of Year.
    const end = new Date(`${year}-12-31`);                                                     // Sets End Date of Year.
    const daysInYear = (end - start) / (1000 * 60 * 60 * 24) + 1;                              // Calculates All Days In A Calendar Year.
    const daysInDates = dates.filter(date => date.getFullYear() === parseInt(year)).length;    // Counts How Many Dates In List Fall Within This Year.
    return daysInDates >= daysInYear - 2;                                                      // Return If # Of Working Days Is Close Enough To A Full Year.
}

// CalendarHeatMap Component. Takes In Item.
const CalendarHeatMap = ({ item }) => {

    const start = item.duration.start;                              // Sets 'start' To Start Date of Company (Item).
    const end = item.duration.end;                                  // Sets 'end' To End Date of Company (Item).
    const dates = getDateRangeArray(start, end);                    // References 'getDateRangeArray' Func & Sets Date Array of Company.
    const months = groupDatesByMonth(dates);                        // Further Breaks Down Dates Array Into Month Sections.

    const years = Object.keys(months).reduce((acc, key) => {        // Reduce Using Months.
        const [year] = key.split('-');                              // Gets Year Key From 'YYYY-MM' Formatted String.
        if(!acc.includes(year)) acc.push(year);                     // If Bucket Doesn't Exist, Add Year To Final Result.
        return acc;                                                 // Return Array Of Unique Years.
    }, []);                                                         // Start W/ An Empty Array.

    const [expandedYears, setExpandedYears] = useState(() => {      // UseState To Update Years That Should Be Expanded.
        const currentYear = new Date().getFullYear().toString();    // On Load Get Current Year.
        return [currentYear];                                       // On Load Current Year Is Only Current Year.
    })
    
    const toggleYear = (year) => {                                  // Toggle Year Func For 'onClick' Of Expand Icon.
        setExpandedYears(prev =>                                    // Use setExpandedYears' State.
            prev.includes(year)                                     // Return Boolean For State Including Input Year (T or F).
            ? prev.filter(y => y !== year)                          // If So, Remove From Expanded Years.
            : [...prev, year]                                       // Else, Add To Expanded Years.
        );
    };

    const getAllDaysInMonth = (year, month) => {                    // Func To Get All Days In Actual Date Month.
        const date = new Date(year, month, 1);                      // Create Date At First Date of Month.
        const result = [];                                          // Initialize Empty Result.

        while (date.getMonth() === month) {                         // Keep Looping While In Same Month.
            result.push(new Date(date));                            // Add Current Date To Month.
            date.setDate(date.getDate() + 1);                       // Increment Day Up One.
        }

        return result;                                              // Return Days In Month Array.
    }

    return (
        <HeatMapContainer>
            {years.map((year) => {  { /* Creates Map From Years. */ }
            return (
              <YearGroup key={year}>    { /* Sets Up Each Year */ }
                { /* Year Bar. E.g. Bar Containing 2024 & Arrow Icon */ }
                <YearRow
                    onClick={() => toggleYear(year)}
                    $bg={item.theme.soft}
                >
                    { /* Sets Year Label. E.g. 2024 */ }
                    <YearLabel>{year}</YearLabel>
                    { /* Sets Arrow Icon W/ Expanding Logic. */ }
                    <Arrow>{expandedYears.includes(year) ? <FaChevronUp /> : <FaChevronDown />}</Arrow>
                </YearRow>
                { /* Animates Expaneded Month Grid. */ }
                <AnimatePresence initial={false}>
                    { /* Only Show Expanded Years W/ Proper Animated Expansion. */ }
                    {expandedYears.includes(year) && (
                        <MotionMonthGridWrap
                            key={year}
                            initial={{ scaleY: 0, opacity: 0 }}
                            animate={{ scaleY: 1, opacity: 1}}
                            exit={{ scaleY: 0, opacity: 0 }}
                            transition={{duration: 0.2, ease: "easeInOut"}}
                        >
                            { /* Looping Through Months Per Year & Extracts Month Index & Sets Up To Render Each Month */ }
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
                                    <MonthTitle>{monthName} {year}</MonthTitle> { /* Displays Short Month Name & Year. E.g. Jan 2024. */ }
                                    <MonthGrid>
                                    { /* Displays Day Blocks & Sets Block To Clear Or Not Depending On If It Was Worked */ }
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
    
`;
// Month Titles. E.g. Jan, Feb, Mar.
const MonthTitle = styled.h4`
    margin: 0 0 0.3rem 0;
    font-size: 0.8rem;
    color: white;
`;
// Whole Grid for Day Blocks.
const MonthGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 10px);
    grid-auto-rows: 10px;
    gap: 2px;
`;
// Individual Day Blocks.
const Block = styled(motion.div)`
    width: 10px;
    height: 10px;
    background-color: ${( { $color }) => $color };
    opacity: 0.85;
    border-radius: 2px;
    border: ${({ $outline }) => ($outline ? '1px solid rgba(255, 255, 255, 0.5)' : 'none')};
`;

// Export CalendarHeatMap Component.
export default CalendarHeatMap;