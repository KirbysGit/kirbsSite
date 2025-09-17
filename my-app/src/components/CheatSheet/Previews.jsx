import React from 'react';
import styled from 'styled-components';

// Global keyframes for animation previews
const globalStyles = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    @keyframes slideIn {
        from { transform: translateX(-20px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-10px); }
        60% { transform: translateY(-5px); }
    }
`;

// Inject global styles
if (typeof document !== 'undefined') {
    const styleElement = document.createElement('style');
    styleElement.textContent = globalStyles;
    document.head.appendChild(styleElement);
}

const getPreviewComponent = (prop, value, previewType) => {
    switch (previewType) {
        case 'alignItems':
            return (
                <div style={{ 
                    display: 'flex', 
                    alignItems: value,
                    width: '180px', 
                    height: '80px', 
                    border: '2px dashed #ccc', 
                    borderRadius: '6px', 
                    background: '#f8f9fa', 
                    gap: '6px', 
                    padding: '6px' 
                }}>
                    <div style={{ 
                        background: '#e6f3ff', 
                        border: '1px solid #007acc',
                        fontSize: '0.6em',
                        padding: '4px',
                        textAlign: 'center',
                        borderRadius: '3px',
                        minWidth: '30px',
                        height: value === 'stretch' ? 'auto' : '20px'
                    }}>
                        Item 1
                    </div>
                    <div style={{ 
                        background: '#e0f2e7', 
                        border: '1px solid #51cf66',
                        fontSize: '0.6em',
                        padding: '4px',
                        textAlign: 'center',
                        borderRadius: '3px',
                        minWidth: '30px',
                        height: value === 'stretch' ? 'auto' : (value === 'baseline' ? '30px' : '25px')
                    }}>
                        Item 2
                    </div>
                    <div style={{ 
                        background: '#fff4e6', 
                        border: '1px solid #fd7e14',
                        fontSize: '0.6em',
                        padding: '4px',
                        textAlign: 'center',
                        borderRadius: '3px',
                        minWidth: '30px',
                        height: value === 'stretch' ? 'auto' : '15px'
                    }}>
                        Item 3
                    </div>
                </div>
            )

        case 'alignContent':
            return (
                <div style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap',
                    alignContent: value,
                    width: '180px', 
                    height: '100px', 
                    border: '2px dashed #ccc', 
                    borderRadius: '6px', 
                    background: '#f8f9fa', 
                    gap: '4px', 
                    padding: '6px' 
                }}>
                    <div style={{ 
                        background: '#e6f3ff', 
                        border: '1px solid #007acc',
                        fontSize: '0.6em',
                        padding: '4px',
                        textAlign: 'center',
                        borderRadius: '3px',
                        width: '35px',
                        height: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        1
                    </div>
                    <div style={{ 
                        background: '#e0f2e7', 
                        border: '1px solid #51cf66',
                        fontSize: '0.6em',
                        padding: '4px',
                        textAlign: 'center',
                        borderRadius: '3px',
                        width: '35px',
                        height: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        2
                    </div>
                    <div style={{ 
                        background: '#fff4e6', 
                        border: '1px solid #fd7e14',
                        fontSize: '0.6em',
                        padding: '4px',
                        textAlign: 'center',
                        borderRadius: '3px',
                        width: '35px',
                        height: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        3
                    </div>
                    <div style={{ 
                        background: '#f3e5f5', 
                        border: '1px solid #9c88ff',
                        fontSize: '0.6em',
                        padding: '4px',
                        textAlign: 'center',
                        borderRadius: '3px',
                        width: '35px',
                        height: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        4
                    </div>
                    <div style={{ 
                        background: '#ffe8e8', 
                        border: '1px solid #ff6b6b',
                        fontSize: '0.6em',
                        padding: '4px',
                        textAlign: 'center',
                        borderRadius: '3px',
                        width: '35px',
                        height: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        5
                    </div>
                    <div style={{ 
                        background: '#e8f4fd', 
                        border: '1px solid #339af0',
                        fontSize: '0.6em',
                        padding: '4px',
                        textAlign: 'center',
                        borderRadius: '3px',
                        width: '35px',
                        height: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        6
                    </div>
                </div>
            )

        case 'alignSelf':
            return (
                <div style={{ 
                    display: 'flex', 
                    alignItems: 'flex-start', // Default alignment for container
                    width: '180px', 
                    height: '80px', 
                    border: '2px dashed #ccc', 
                    borderRadius: '6px', 
                    background: '#f8f9fa', 
                    gap: '6px', 
                    padding: '6px' 
                }}>
                    <div style={{ 
                        background: '#f0f0f0', 
                        border: '1px solid #ccc',
                        fontSize: '0.6em',
                        padding: '4px',
                        textAlign: 'center',
                        borderRadius: '3px',
                        minWidth: '30px',
                        height: '20px'
                    }}>
                        Item 1
                    </div>
                    <div style={{ 
                        alignSelf: value,
                        background: '#e6f3ff', 
                        border: '2px solid #007acc',
                        fontSize: '0.6em',
                        padding: '4px',
                        textAlign: 'center',
                        borderRadius: '3px',
                        minWidth: '30px',
                        height: value === 'stretch' ? 'auto' : '25px'
                    }}>
                        {value}
                    </div>
                    <div style={{ 
                        background: '#f0f0f0', 
                        border: '1px solid #ccc',
                        fontSize: '0.6em',
                        padding: '4px',
                        textAlign: 'center',
                        borderRadius: '3px',
                        minWidth: '30px',
                        height: '20px'
                    }}>
                        Item 3
                    </div>
                </div>
            )

        case 'animation':
            const [isAnimationActive, setIsAnimationActive] = React.useState(false);
            
            // Parse animation value to understand what's being animated
            const animationName = value.match(/(\w+)/)?.[1] || 'unknown';
            const isAnimationInfinite = value.includes('infinite');
            const hasAnimationDelay = value.match(/(\d+(?:\.\d+)?)(s|ms).*?(\d+(?:\.\d+)?)(s|ms)/);
            const isAnimationAlternate = value.includes('alternate');
            const animationDuration = value.match(/(\d+(?:\.\d+)?)(s|ms)/)?.[0] || '1s';
            
            // Create keyframes based on animation name
            const getAnimationKeyframes = () => {
                if (animationName.includes('fade')) return 'fadeIn';
                if (animationName.includes('slide')) return 'slideIn';
                if (animationName.includes('spin')) return 'spin';
                if (animationName.includes('pulse')) return 'pulse';
                if (animationName.includes('bounce')) return 'bounce';
                return 'fadeIn'; // default
            };
            
            React.useEffect(() => {
                const timer = setTimeout(() => setIsAnimationActive(true), 100);
                return () => clearTimeout(timer);
            }, []);
            
            return (
                <div style={{ 
                    width: '180px', 
                    height: '120px', 
                    border: '2px dashed #ccc', 
                    borderRadius: '6px', 
                    background: '#f8f9fa',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '8px'
                }}>
                    <div
                        style={{
                            width: '60px',
                            height: '60px',
                            background: '#6c5ce7',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.2em',
                            color: 'white',
                            animation: isAnimationActive ? value : 'none',
                            cursor: 'pointer'
                        }}
                        onClick={() => setIsAnimationActive(!isAnimationActive)}
                    >
                        ✨
                    </div>
                    <div style={{
                        fontSize: '0.6em',
                        color: '#666',
                        textAlign: 'center',
                        lineHeight: '1.2'
                    }}>
                        <strong style={{ color: '#6c5ce7' }}>{animationName}</strong>
                        <div style={{ color: '#fd7e14' }}>Duration: {animationDuration}</div>
                        {isAnimationInfinite && <div style={{ color: '#51cf66' }}>Infinite loop</div>}
                        {isAnimationAlternate && <div style={{ color: '#339af0' }}>Alternating</div>}
                        {hasAnimationDelay && <div style={{ color: '#868e96' }}>With delay</div>}
                        <div style={{ color: '#495057', fontSize: '0.9em' }}>Click to toggle</div>
                    </div>
                    <style jsx>{`
                        @keyframes fadeIn {
                            from { opacity: 0; }
                            to { opacity: 1; }
                        }
                        @keyframes slideIn {
                            from { transform: translateX(-20px); opacity: 0; }
                            to { transform: translateX(0); opacity: 1; }
                        }
                        @keyframes spin {
                            from { transform: rotate(0deg); }
                            to { transform: rotate(360deg); }
                        }
                        @keyframes pulse {
                            0%, 100% { transform: scale(1); }
                            50% { transform: scale(1.1); }
                        }
                        @keyframes bounce {
                            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                            40% { transform: translateY(-10px); }
                            60% { transform: translateY(-5px); }
                        }
                    `}</style>
                </div>
            )

        case 'animationDirection':
            const [isDirectionAnimationActive, setIsDirectionAnimationActive] = React.useState(false);
            
            // Parse direction value and provide feedback
            const isNormalDirection = value === 'normal';
            const isReverseDirection = value === 'reverse';
            const isAlternateDirection = value === 'alternate';
            const isAlternateReverseDirection = value === 'alternate-reverse';
            const isMultipleDirections = value.includes(',');
            
            const getDirectionDescription = () => {
                if (isNormalDirection) return 'Forward (0% → 100%)';
                if (isReverseDirection) return 'Backward (100% → 0%)';
                if (isAlternateDirection) return 'Forward, then backward';
                if (isAlternateReverseDirection) return 'Backward, then forward';
                if (isMultipleDirections) return 'Multiple directions';
                return 'Custom direction';
            };
            
            const getDirectionColor = () => {
                if (isNormalDirection) return '#27ae60';
                if (isReverseDirection) return '#e74c3c';
                if (isAlternateDirection) return '#3498db';
                if (isAlternateReverseDirection) return '#9b59b6';
                return '#95a5a6';
            };
            
            const getDirectionIcon = () => {
                if (isNormalDirection) return '→';
                if (isReverseDirection) return '←';
                if (isAlternateDirection) return '↔';
                if (isAlternateReverseDirection) return '↕';
                return '↗';
            };
            
            React.useEffect(() => {
                const timer = setTimeout(() => setIsDirectionAnimationActive(true), 100);
                return () => clearTimeout(timer);
            }, []);
            
            return (
                <div style={{ 
                    width: '180px', 
                    height: '100px', 
                    border: '2px dashed #ccc', 
                    borderRadius: '6px', 
                    background: '#f8f9fa',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '8px'
                }}>
                    <div
                        style={{
                            width: '50px',
                            height: '50px',
                            background: getDirectionColor(),
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.3em',
                            color: 'white',
                            animationName: isDirectionAnimationActive ? 'slideIn' : 'none',
                            animationDuration: '2s',
                            animationIterationCount: 'infinite',
                            animationTimingFunction: 'ease-in-out',
                            animationDirection: value,
                            cursor: 'pointer'
                        }}
                        onClick={() => setIsDirectionAnimationActive(!isDirectionAnimationActive)}
                    >
                        {getDirectionIcon()}
                    </div>
                    <div style={{
                        fontSize: '0.6em',
                        color: '#666',
                        textAlign: 'center',
                        lineHeight: '1.2'
                    }}>
                        <strong style={{ color: getDirectionColor() }}>
                            {value}
                        </strong>
                        <div style={{ color: getDirectionColor() }}>
                            {getDirectionDescription()}
                        </div>
                        {isAlternateDirection && <div style={{ color: '#868e96' }}>Bounces back and forth</div>}
                        {isAlternateReverseDirection && <div style={{ color: '#868e96' }}>Starts in reverse</div>}
                        {isMultipleDirections && <div style={{ color: '#868e96' }}>Multiple animations</div>}
                    </div>
                </div>
            )

        case 'animationDuration':
                const [isDurationAnimationActive, setIsDurationAnimationActive] = React.useState(false);
                
                // Parse duration value and provide feedback
                const isDurationSeconds = value.includes('s') && !value.includes('ms');
                const isDurationMilliseconds = value.includes('ms');
                const isAnimationZeroDuration = value === '0s' || value === '0ms';
                const isAnimationMultipleDurations = value.includes(',');
                
                // Extract numeric value for speed classification
                let durationNumericValue = 0;
                if (isDurationMilliseconds) {
                    durationNumericValue = parseFloat(value.replace('ms', ''));
                } else if (isDurationSeconds) {
                    durationNumericValue = parseFloat(value.replace('s', '')) * 1000;
                }
                
                const getDurationSpeedLabel = () => {
                    if (isAnimationZeroDuration) return 'Instant';
                    if (durationNumericValue <= 300) return 'Very Fast';
                    if (durationNumericValue <= 800) return 'Fast';
                    if (durationNumericValue <= 1500) return 'Medium';
                    if (durationNumericValue <= 3000) return 'Slow';
                    return 'Very Slow';
                };
                
                const getDurationColor = () => {
                    if (isAnimationZeroDuration) return '#868e96';
                    if (durationNumericValue <= 300) return '#e74c3c';
                    if (durationNumericValue <= 800) return '#f39c12';
                    if (durationNumericValue <= 1500) return '#f1c40f';
                    if (durationNumericValue <= 3000) return '#27ae60';
                    return '#3498db';
                };
                
                React.useEffect(() => {
                    if (!isAnimationZeroDuration) {
                        const timer = setTimeout(() => setIsDurationAnimationActive(true), 100);
                        return () => clearTimeout(timer);
                    }
                }, [isAnimationZeroDuration]);
                
                return (
                    <div style={{ 
                        width: '180px', 
                        height: '100px', 
                        border: '2px dashed #ccc', 
                        borderRadius: '6px', 
                        background: '#f8f9fa',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        padding: '8px'
                    }}>
                        <div
                            style={{
                                width: '50px',
                                height: '50px',
                                background: getDurationColor(),
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.1em',
                                color: 'white',
                                animationName: isAnimationZeroDuration ? 'none' : (isDurationAnimationActive ? 'pulse' : 'none'),
                                animationDuration: value,
                                animationIterationCount: 'infinite',
                                animationTimingFunction: 'ease-in-out',
                                cursor: 'pointer',
                                opacity: isAnimationZeroDuration ? 0.5 : 1
                            }}
                            onClick={() => setIsDurationAnimationActive(!isDurationAnimationActive)}
                        >
                            ⏱️
                        </div>
                        <div style={{
                            fontSize: '0.6em',
                            color: '#666',
                            textAlign: 'center',
                            lineHeight: '1.2'
                        }}>
                            <strong style={{ color: getDurationColor() }}>Duration: {value}</strong>
                            <div style={{ color: getDurationColor() }}>
                                {getDurationSpeedLabel()}
                                {isAnimationMultipleDurations && ' (Multiple)'}
                            </div>
                            {isAnimationZeroDuration && <div style={{ color: '#868e96' }}>No animation</div>}
                            {isDurationSeconds && !isAnimationZeroDuration && <div style={{ color: '#339af0' }}>Seconds unit</div>}
                            {isDurationMilliseconds && <div style={{ color: '#51cf66' }}>Milliseconds unit</div>}
                            {!isAnimationZeroDuration && <div style={{ color: '#495057', fontSize: '0.9em' }}>Click to toggle</div>}
                        </div>
                    </div>
                )

        case 'animationIterationCount':
            const [isIterationAnimationActive, setIsIterationAnimationActive] = React.useState(false);
            
            // Parse iteration count value and provide feedback
            const isInfiniteIteration = value === 'infinite';
            const isInitialIteration = value === 'initial';
            const isMultipleIterations = value.includes(',');
            const iterationNumber = parseFloat(value);
            const isDecimalIteration = value.includes('.') && !isNaN(iterationNumber);
            const isWholeNumber = !isNaN(iterationNumber) && Number.isInteger(iterationNumber);
            
            const getIterationDescription = () => {
                if (isInfiniteIteration) return 'Loops forever';
                if (isInitialIteration) return 'Default (once)';
                if (isDecimalIteration) return `${iterationNumber} cycles (partial)`;
                if (isWholeNumber) return `${iterationNumber} time${iterationNumber !== 1 ? 's' : ''}`;
                if (isMultipleIterations) return 'Multiple counts';
                return 'Custom count';
            };
            
            const getIterationColor = () => {
                if (isInfiniteIteration) return '#e74c3c';
                if (isInitialIteration) return '#95a5a6';
                if (iterationNumber <= 1) return '#3498db';
                if (iterationNumber <= 3) return '#f39c12';
                if (iterationNumber <= 5) return '#e67e22';
                return '#9b59b6';
            };
            
            React.useEffect(() => {
                const timer = setTimeout(() => setIsIterationAnimationActive(true), 100);
                return () => clearTimeout(timer);
            }, []);
            
            return (
                <div style={{ 
                    width: '180px', 
                    height: '100px', 
                    border: '2px dashed #ccc', 
                    borderRadius: '6px', 
                    background: '#f8f9fa',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '8px'
                }}>
                    <div
                        style={{
                            width: '50px',
                            height: '50px',
                            background: getIterationColor(),
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.1em',
                            color: 'white',
                            animationName: isIterationAnimationActive ? 'bounce' : 'none',
                            animationDuration: '1s',
                            animationIterationCount: value,
                            animationTimingFunction: 'ease-in-out',
                            cursor: 'pointer'
                        }}
                        onClick={() => setIsIterationAnimationActive(!isIterationAnimationActive)}
                    >
                        🔄
                    </div>
                    <div style={{
                        fontSize: '0.6em',
                        color: '#666',
                        textAlign: 'center',
                        lineHeight: '1.2'
                    }}>
                        <strong style={{ color: getIterationColor() }}>Count: {value}</strong>
                        <div style={{ color: getIterationColor() }}>
                            {getIterationDescription()}
                        </div>
                        {isDecimalIteration && <div style={{ color: '#868e96' }}>Partial cycle</div>}
                        {isInfiniteIteration && <div style={{ color: '#868e96' }}>Never stops</div>}
                        {isMultipleIterations && <div style={{ color: '#868e96' }}>Multiple animations</div>}
                        <div style={{ color: '#495057', fontSize: '0.9em' }}>Click to toggle</div>
                    </div>
                </div>
            )

        case 'animationName':
            const [isNameAnimationActive, setIsNameAnimationActive] = React.useState(false);
            
            // Parse animation name and provide feedback
            const nameValue = value === 'none' ? 'none' : value.replace(/['"]/g, '');
            const isNameNone = nameValue === 'none';
            const isMultipleNames = nameValue.includes(',');
            const names = isMultipleNames ? nameValue.split(',').map(n => n.trim()) : [nameValue];
            
            const getAnimationType = (name) => {
                if (name.includes('fade')) return { type: 'Fade', color: '#6c5ce7' };
                if (name.includes('slide')) return { type: 'Slide', color: '#00b894' };
                if (name.includes('spin') || name.includes('rotate')) return { type: 'Rotate', color: '#fd79a8' };
                if (name.includes('bounce')) return { type: 'Bounce', color: '#fdcb6e' };
                if (name.includes('pulse') || name.includes('scale')) return { type: 'Scale', color: '#74b9ff' };
                if (name.includes('shake')) return { type: 'Shake', color: '#e17055' };
                return { type: 'Custom', color: '#636e72' };
            };
            
            const primaryAnimation = getAnimationType(names[0]);
            
            React.useEffect(() => {
                if (!isNameNone) {
                    const timer = setTimeout(() => setIsNameAnimationActive(true), 100);
                    return () => clearTimeout(timer);
                }
            }, [isNameNone]);
            
            return (
                <div style={{ 
                    width: '180px', 
                    height: '100px', 
                    border: '2px dashed #ccc', 
                    borderRadius: '6px', 
                    background: '#f8f9fa',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '8px'
                }}>
                    <div
                        style={{
                            width: '50px',
                            height: '50px',
                            background: isNameNone ? '#ddd' : primaryAnimation.color,
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.1em',
                            color: 'white',
                            animationName: isNameNone ? 'none' : (isNameAnimationActive ? nameValue : 'none'),
                            animationDuration: '1.5s',
                            animationIterationCount: 'infinite',
                            animationTimingFunction: 'ease-in-out',
                            cursor: 'pointer',
                            opacity: isNameNone ? 0.5 : 1
                        }}
                        onClick={() => setIsNameAnimationActive(!isNameAnimationActive)}
                    >
                        {isNameNone ? '⏸️' : '🎬'}
                    </div>
                    <div style={{
                        fontSize: '0.6em',
                        color: '#666',
                        textAlign: 'center',
                        lineHeight: '1.2'
                    }}>
                        <strong style={{ color: isNameNone ? '#868e96' : primaryAnimation.color }}>
                            {nameValue.length > 15 ? nameValue.substring(0, 15) + '...' : nameValue}
                        </strong>
                        {!isNameNone && (
                            <div style={{ color: primaryAnimation.color }}>
                                {primaryAnimation.type} Animation
                            </div>
                        )}
                        {isNameNone && <div style={{ color: '#868e96' }}>No animation</div>}
                        {isMultipleNames && <div style={{ color: '#fd7e14' }}>Multiple names</div>}
                        {!isNameNone && <div style={{ color: '#495057', fontSize: '0.9em' }}>Click to toggle</div>}
                    </div>
                </div>
            )
    
        case 'animationTimingFunction':
            const [isTimingAnimationActive, setIsTimingAnimationActive] = React.useState(false);
            
            // Parse timing function value and provide feedback
            const isAnimationEase = value === 'ease';
            const isAnimationEaseIn = value === 'ease-in';
            const isAnimationEaseOut = value === 'ease-out';
            const isAnimationEaseInOut = value === 'ease-in-out';
            const isAnimationLinear = value === 'linear';
            const isAnimationCubicBezier = value.includes('cubic-bezier');
            const isAnimationSteps = value.includes('steps');
            const isMultipleTimingFunctions = value.includes(',');
            
            const getAnimationTimingDescription = () => {
                if (isAnimationEase) return 'Slow start, fast middle, slow end';
                if (isAnimationEaseIn) return 'Slow start, accelerates';
                if (isAnimationEaseOut) return 'Fast start, decelerates';
                if (isAnimationEaseInOut) return 'Slow start and end';
                if (isAnimationLinear) return 'Constant speed';
                if (isAnimationCubicBezier) return 'Custom curve';
                if (isAnimationSteps) return 'Stepped animation';
                if (isMultipleTimingFunctions) return 'Multiple functions';
                return 'Custom timing';
            };
            
            const getAnimationTimingColor = () => {
                if (isAnimationEase) return '#51cf66';
                if (isAnimationEaseIn) return '#339af0';
                if (isAnimationEaseOut) return '#fd7e14';
                if (isAnimationEaseInOut) return '#9c88ff';
                if (isAnimationLinear) return '#868e96';
                if (isAnimationCubicBezier) return '#e64980';
                if (isAnimationSteps) return '#20c997';
                return '#495057';
            };
            
            React.useEffect(() => {
                const timer = setTimeout(() => setIsTimingAnimationActive(true), 100);
                return () => clearTimeout(timer);
            }, []);
            
            return (
                <div style={{ 
                    width: '180px', 
                    height: '100px', 
                    border: '2px dashed #ccc', 
                    borderRadius: '6px', 
                    background: '#f8f9fa',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '8px'
                }}>
                    <div
                        style={{
                            width: '50px',
                            height: '50px',
                            background: getAnimationTimingColor(),
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.1em',
                            color: 'white',
                            animationName: isTimingAnimationActive ? 'slideIn' : 'none',
                            animationDuration: '2s',
                            animationIterationCount: 'infinite',
                            animationTimingFunction: value,
                            animationDirection: 'alternate',
                            cursor: 'pointer'
                        }}
                        onClick={() => setIsTimingAnimationActive(!isTimingAnimationActive)}
                    >
                        📈
                    </div>
                    <div style={{
                        fontSize: '0.6em',
                        color: '#666',
                        textAlign: 'center',
                        lineHeight: '1.2'
                    }}>
                        <strong style={{ color: getAnimationTimingColor() }}>
                            {value.length > 20 ? value.substring(0, 20) + '...' : value}
                        </strong>
                        <div style={{ color: getAnimationTimingColor() }}>
                            {getAnimationTimingDescription()}
                        </div>
                        {isAnimationSteps && <div style={{ color: '#868e96' }}>Discrete steps</div>}
                        {isAnimationCubicBezier && <div style={{ color: '#868e96' }}>Custom bezier curve</div>}
                        {isMultipleTimingFunctions && <div style={{ color: '#868e96' }}>Multiple properties</div>}
                        <div style={{ color: '#495057', fontSize: '0.9em' }}>Click to toggle</div>
                    </div>
                </div>
            )

        case 'aspectRatio':
            return (
                <div style={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '8px',
                    background: '#f8f9fa',
                    borderRadius: '4px',
                    border: '2px dashed #ccc'
                }}>
                    <ExamplePreview style={{
                        aspectRatio: value,
                        width: '80px',
                        background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '0.7em'
                    }}>
                        Ratio
                    </ExamplePreview>
                    <div style={{ fontSize: '0.6em', textAlign: 'center', color: '#666' }}>
                        {value}
                    </div>
                </div>
            )

        case 'background':
            return <ExamplePreview style={{ backgroundColor: value }}>BG</ExamplePreview>

        case 'backgroundImage':
            return <ExamplePreview style={{
                backgroundImage: value.includes('url') ? value : undefined,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                height: '80px',
                width: '70px',
                color: 'white',
            }}
            >
                BG
            </ExamplePreview>

        case 'backgroundImageGrad':
            return <ExamplePreview style={{ backgroundImage: value }}>BG</ExamplePreview>

        case 'backgroundImageMulti':
            return <ExamplePreview
                        style={{
                            backgroundImage: value,
                            backgroundSize: 'contain, contain',
                            backgroundRepeat: 'no-repeat, no-repeat',
                            backgroundPosition: 'left center, right center',
                            color: 'white',
                            height: '80px',
                            width: '120px',
                        }}
                    >
                        BG
                    </ExamplePreview>

        case 'backgroundRepeat':
            return <ExamplePreview 
                style={{
                    backgroundImage: `url(${importantImg})`,
                    backgroundSize: '50px 50px',
                    height: '80px',
                    width: '120px',
                    backgroundPosition: 'center',
                    backgroundRepeat: value,
                    color: 'white',
                }}
                >
                    BG
                </ExamplePreview>

        case 'backgroundSize':
            return <ExamplePreview
                        style={{
                            backgroundImage: `url(${importantImg})`,
                            backgroundSize: value,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            height: '80px',
                            width: '120px',
                            color: 'white',
                        }}
                    >
                        BG
                    </ExamplePreview>

        case 'blendMode':
            return <ExamplePreview style={{
                position: 'relative',
                height: '80px',
                width: '120px',
                backgroundColor: 'rgb(216, 216, 216)',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div style={{
                    mixBlendMode: value,
                    backgroundColor: 'red',
                    width: '70px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                }}>
                    Blend
                </div>
            </ExamplePreview>

        case 'border':
            return <ExamplePreview style={{ 
                border: value, 
                padding: '1.25rem', 
                color: 'var(--text)',
            }}>
                Border
            </ExamplePreview>

        case 'borderRadius':
            return <ExamplePreview style={{
                borderRadius: value,
                padding: '1.25rem',
            }}>
                Radius
            </ExamplePreview>

        case 'boxShadow':
            return <ExamplePreview style={{
                boxShadow: value,
                padding: '1.25rem',
            }}>
                Shadow
            </ExamplePreview>

        case 'boxSizing':
            const isContentBox = value.includes('content-box');
            const isBorderBox = value.includes('border-box');
            
            return (
                <div style={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px',
                    background: '#f8f9fa',
                    borderRadius: '4px',
                    border: '2px dashed #ccc'
                }}>
                    <ExamplePreview style={{
                        boxSizing: value,
                        width: '80px',
                        height: '60px',
                        padding: '8px',
                        border: '4px solid #007acc',
                        background: '#e6f3ff',
                        fontSize: '0.7em',
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '4px'
                    }}>
                        {isContentBox && 'Content'}
                        {isBorderBox && 'Border'}
                        {!isContentBox && !isBorderBox && 'Box'}
                    </ExamplePreview>
                    <div style={{ fontSize: '0.6em', textAlign: 'center', color: '#666' }}>
                        {isContentBox && '+ padding & border'}
                        {isBorderBox && 'Fixed total size'}
                        {!isContentBox && !isBorderBox && 'Box sizing'}
                    </div>
                </div>
            )

        case 'display':
            return (
                <div style={{ width: '200px', padding: '8px', border: '2px dashed #ccc', borderRadius: '6px', background: '#f8f9fa' }}>
                    {value === 'block' && (
                        <ExamplePreview style={{ display: 'block', margin: '2px 0', padding: '4px', fontSize: '0.6em', background: '#e6f3ff', border: '1px solid #007acc' }}>
                            Block 1
                        </ExamplePreview>
                    )}
                    {value === 'inline' && (
                        <div>
                            <ExamplePreview style={{ display: 'inline', margin: '2px', padding: '4px', fontSize: '0.6em', background: '#e0f2e7', border: '1px solid #51cf66' }}>
                                Inline
                            </ExamplePreview>
                            <ExamplePreview style={{ display: 'inline', margin: '2px', padding: '4px', fontSize: '0.6em', background: '#e0f2e7', border: '1px solid #51cf66' }}>
                                Text
                            </ExamplePreview>
                        </div>
                    )}
                    {value === 'inline-block' && (
                        <div>
                            <ExamplePreview style={{ display: 'inline-block', margin: '2px', padding: '4px', fontSize: '0.6em', background: '#fff4e6', border: '1px solid #fd7e14', width: '50px', height: '25px' }}>
                                IB1
                            </ExamplePreview>
                            <ExamplePreview style={{ display: 'inline-block', margin: '2px', padding: '4px', fontSize: '0.6em', background: '#fff4e6', border: '1px solid #fd7e14', width: '50px', height: '25px' }}>
                                IB2
                            </ExamplePreview>
                        </div>
                    )}
                    {value === 'flex' && (
                        <div style={{ display: 'flex', gap: '4px' }}>
                            <ExamplePreview style={{ flex: 1, padding: '4px', fontSize: '0.6em', background: '#f3e5f5', border: '1px solid #9c88ff' }}>
                                Flex 1
                            </ExamplePreview>
                            <ExamplePreview style={{ flex: 1, padding: '4px', fontSize: '0.6em', background: '#f3e5f5', border: '1px solid #9c88ff' }}>
                                Flex 2
                            </ExamplePreview>
                        </div>
                    )}
                    {value === 'none' && (
                        <div style={{ textAlign: 'center', padding: '20px', fontSize: '0.7em', color: '#666', fontStyle: 'italic' }}>
                            Element hidden
                        </div>
                    )}
                </div>
            )

        case 'direction':
            return (
                <ExamplePreview style={{ direction: value }}>
                    → Start of sentence<br />
                    Middle of sentence<br />
                    End of sentence ←
                </ExamplePreview>
            )

        case 'filter':
            return <ExamplePreview style={{ filter: value, padding: '1.25rem' }}>Filter</ExamplePreview>
        
        case 'flex':
            return (
                <div style={{ display: 'flex', width: '180px', height: '60px', border: '2px dashed #ccc', borderRadius: '6px', background: '#f8f9fa', gap: '4px', padding: '4px' }}>
                    <ExamplePreview style={{ 
                        flex: value, 
                        background: '#e6f3ff', 
                        border: '1px solid #007acc',
                        fontSize: '0.6em',
                        padding: '4px',
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: '20px'
                    }}>
                        {value}
                    </ExamplePreview>
                    <div style={{ 
                        flexGrow: '1', 
                        background: '#f0f0f0', 
                        border: '1px solid #ccc',
                        fontSize: '0.6em',
                        padding: '4px',
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: '20px'
                    }}>
                        1
                    </div>
                    <div style={{ 
                        flexGrow: '1', 
                        background: '#f0f0f0', 
                        border: '1px solid #ccc',
                        fontSize: '0.6em',
                        padding: '4px',
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: '20px'
                    }}>
                        1
                    </div>
                </div>
            )

        case 'flexBasis':
            return (
                <div style={{ display: 'flex', width: '180px', height: '60px', border: '2px dashed #ccc', borderRadius: '6px', background: '#f8f9fa', gap: '4px', padding: '4px' }}>
                    <ExamplePreview style={{ 
                        flexBasis: value,
                        flexGrow: '0',
                        flexShrink: '1',
                        background: '#e6f3ff', 
                        border: '1px solid #007acc',
                        fontSize: '0.6em',
                        padding: '4px',
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: '20px'
                    }}>
                        {value}
                    </ExamplePreview>
                    <div style={{ 
                        flex: '1', 
                        background: '#f0f0f0', 
                        border: '1px solid #ccc',
                        fontSize: '0.6em',
                        padding: '4px',
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: '20px'
                    }}>
                        Other
                    </div>
                </div>
            )

        case 'flexDirection':
            const isColumn = value.includes('column');
            const isReverse = value.includes('reverse');
            
            return (
                <div style={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px',
                    background: '#f8f9fa',
                    borderRadius: '4px',
                    border: '2px dashed #ccc'
                }}>
                    <div style={{ 
                        display: 'flex', 
                        flexDirection: value,
                        gap: '4px',
                        padding: '8px',
                        background: '#fff',
                        borderRadius: '4px',
                        border: '1px solid #ddd',
                        width: isColumn ? '80px' : '160px',
                        height: isColumn ? '120px' : '60px'
                    }}>
                        <div style={{ 
                            background: '#e6f3ff', 
                            border: '1px solid #007acc',
                            fontSize: '0.6em',
                            padding: '6px',
                            textAlign: 'center',
                            borderRadius: '3px',
                            minWidth: isColumn ? '60px' : '30px',
                            minHeight: isColumn ? '25px' : '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            1
                        </div>
                        <div style={{ 
                            background: '#e0f2e7', 
                            border: '1px solid #51cf66',
                            fontSize: '0.6em',
                            padding: '6px',
                            textAlign: 'center',
                            borderRadius: '3px',
                            minWidth: isColumn ? '60px' : '30px',
                            minHeight: isColumn ? '25px' : '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            2
                        </div>
                        <div style={{ 
                            background: '#fff4e6', 
                            border: '1px solid #fd7e14',
                            fontSize: '0.6em',
                            padding: '6px',
                            textAlign: 'center',
                            borderRadius: '3px',
                            minWidth: isColumn ? '60px' : '30px',
                            minHeight: isColumn ? '25px' : '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            3
                        </div>
                    </div>
                    <div style={{ fontSize: '0.6em', textAlign: 'center', color: '#666' }}>
                        {isColumn && !isReverse && 'Top to bottom'}
                        {isColumn && isReverse && 'Bottom to top'}
                        {!isColumn && !isReverse && 'Left to right'}
                        {!isColumn && isReverse && 'Right to left'}
                    </div>
                </div>
            )

        case 'flexGrow':
            return (
                <div style={{ display: 'flex', width: '180px', height: '60px', border: '2px dashed #ccc', borderRadius: '6px', background: '#f8f9fa', gap: '4px', padding: '4px' }}>
                    <ExamplePreview style={{ 
                        flexGrow: value, 
                        background: '#e6f3ff', 
                        border: '1px solid #007acc',
                        fontSize: '0.6em',
                        padding: '4px',
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: '20px'
                    }}>
                        {value}
                    </ExamplePreview>
                    <div style={{ 
                        flexGrow: '1', 
                        background: '#f0f0f0', 
                        border: '1px solid #ccc',
                        fontSize: '0.6em',
                        padding: '4px',
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: '20px'
                    }}>
                        1
                    </div>
                    <div style={{ 
                        flexGrow: '1', 
                        background: '#f0f0f0', 
                        border: '1px solid #ccc',
                        fontSize: '0.6em',
                        padding: '4px',
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: '20px'
                    }}>
                        1
                    </div>
                </div>
            )

        case 'flexShrink':
            return (
                <div style={{ display: 'flex', width: '180px', height: '60px', border: '2px dashed #ccc', borderRadius: '6px', background: '#f8f9fa', gap: '4px', padding: '4px' }}>
                    <ExamplePreview style={{ 
                        flexShrink: value,
                        flexBasis: '100px', // Force shrinking by making basis larger than available space
                        background: '#e6f3ff', 
                        border: '1px solid #007acc',
                        fontSize: '0.6em',
                        padding: '4px',
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: '20px'
                    }}>
                        {value}
                    </ExamplePreview>
                    <div style={{ 
                        flexShrink: '1',
                        flexBasis: '100px', // Also large to force shrinking
                        background: '#f0f0f0', 
                        border: '1px solid #ccc',
                        fontSize: '0.6em',
                        padding: '4px',
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: '20px'
                    }}>
                        1
                    </div>
                </div>
            )

        case 'flexWrap':
            const isWrap = value.includes('wrap') && !value.includes('nowrap');
            const isWrapReverse = value.includes('reverse');
            const isNowrap = value.includes('nowrap');
            
            return (
                <div style={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px',
                    background: '#f8f9fa',
                    borderRadius: '4px',
                    border: '2px dashed #ccc'
                }}>
                    <div style={{ 
                        display: 'flex', 
                        flexWrap: value,
                        gap: '4px',
                        padding: '6px',
                        background: '#fff',
                        borderRadius: '4px',
                        border: '1px solid #ddd',
                        width: '140px',
                        height: isNowrap ? '50px' : '80px',
                        overflow: isNowrap ? 'hidden' : 'visible'
                    }}>
                        <div style={{ 
                            background: '#e6f3ff', 
                            border: '1px solid #007acc',
                            fontSize: '0.6em',
                            padding: '4px',
                            textAlign: 'center',
                            borderRadius: '3px',
                            minWidth: '35px',
                            height: '25px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: isNowrap ? '1' : '0'
                        }}>
                            Item 1
                        </div>
                        <div style={{ 
                            background: '#e0f2e7', 
                            border: '1px solid #51cf66',
                            fontSize: '0.6em',
                            padding: '4px',
                            textAlign: 'center',
                            borderRadius: '3px',
                            minWidth: '35px',
                            height: '25px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: isNowrap ? '1' : '0'
                        }}>
                            Item 2
                        </div>
                        <div style={{ 
                            background: '#fff4e6', 
                            border: '1px solid #fd7e14',
                            fontSize: '0.6em',
                            padding: '4px',
                            textAlign: 'center',
                            borderRadius: '3px',
                            minWidth: '35px',
                            height: '25px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: isNowrap ? '1' : '0'
                        }}>
                            Item 3
                        </div>
                        <div style={{ 
                            background: '#f3e5f5', 
                            border: '1px solid #9c88ff',
                            fontSize: '0.6em',
                            padding: '4px',
                            textAlign: 'center',
                            borderRadius: '3px',
                            minWidth: '35px',
                            height: '25px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: isNowrap ? '1' : '0'
                        }}>
                            Item 4
                        </div>
                    </div>
                    <div style={{ fontSize: '0.6em', textAlign: 'center', color: '#666' }}>
                        {isNowrap && 'Single line (may overflow)'}
                        {isWrap && !isWrapReverse && 'Wraps to new lines'}
                        {isWrap && isWrapReverse && 'Wraps in reverse order'}
                    </div>
                </div>
            )

        case 'gap':
            // Parse gap value to handle single or double values
            const gapValues = value.split(' ');
            const gapValue = gapValues[0];
            const isLargeGap = parseInt(gapValue) > 25;
            const isZeroGap = parseInt(gapValue) === 0;
            
            return (
                <div style={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px',
                    background: '#f8f9fa',
                    borderRadius: '4px',
                    border: '2px dashed #ccc'
                }}>
                    <div style={{ 
                        display: 'flex', 
                        gap: value,
                        padding: '4px',
                        background: '#fff',
                        borderRadius: '4px',
                        border: '1px solid #ddd'
                    }}>
                        <div style={{ 
                            background: '#e6f3ff', 
                            border: '1px solid #007acc',
                            fontSize: '0.6em',
                            padding: '8px',
                            textAlign: 'center',
                            borderRadius: '3px',
                            minWidth: '30px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            Item 1
                        </div>
                        <div style={{ 
                            background: '#e0f2e7', 
                            border: '1px solid #51cf66',
                            fontSize: '0.6em',
                            padding: '8px',
                            textAlign: 'center',
                            borderRadius: '3px',
                            minWidth: '30px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            Item 2
                        </div>
                        <div style={{ 
                            background: '#fff4e6', 
                            border: '1px solid #fd7e14',
                            fontSize: '0.6em',
                            padding: '8px',
                            textAlign: 'center',
                            borderRadius: '3px',
                            minWidth: '30px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            Item 3
                        </div>
                    </div>
                    <div style={{ fontSize: '0.6em', textAlign: 'center', color: '#666' }}>
                        {isZeroGap && 'No spacing'}
                        {!isZeroGap && !isLargeGap && 'Small spacing'}
                        {isLargeGap && 'Large spacing'}
                    </div>
                </div>
            )

        case 'gridArea':
            // Parse grid-area value to determine the type
            const isNamedArea = !value.includes('/') && !value.includes('span') && value !== 'auto';
            const isLineNumbers = value.includes('/');
            const isSpan = value.includes('span');
            const isAutoPlacement = value === 'auto';
            
            return (
                <div style={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px',
                    background: '#f8f9fa',
                    borderRadius: '4px',
                    border: '2px dashed #ccc'
                }}>
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: '1fr 1fr 1fr',
                        gridTemplateRows: '1fr 1fr 1fr',
                        gridTemplateAreas: isNamedArea ? '"header header header" "sidebar content content" "footer footer footer"' : 'none',
                        gap: '2px',
                        width: '120px',
                        height: '90px',
                        background: '#fff',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        padding: '4px'
                    }}>
                        {/* Background grid cells */}
                        <div style={{ background: '#f0f0f0', border: '1px solid #ddd', borderRadius: '2px' }}></div>
                        <div style={{ background: '#f0f0f0', border: '1px solid #ddd', borderRadius: '2px' }}></div>
                        <div style={{ background: '#f0f0f0', border: '1px solid #ddd', borderRadius: '2px' }}></div>
                        <div style={{ background: '#f0f0f0', border: '1px solid #ddd', borderRadius: '2px' }}></div>
                        <div style={{ background: '#f0f0f0', border: '1px solid #ddd', borderRadius: '2px' }}></div>
                        <div style={{ background: '#f0f0f0', border: '1px solid #ddd', borderRadius: '2px' }}></div>
                        <div style={{ background: '#f0f0f0', border: '1px solid #ddd', borderRadius: '2px' }}></div>
                        <div style={{ background: '#f0f0f0', border: '1px solid #ddd', borderRadius: '2px' }}></div>
                        <div style={{ background: '#f0f0f0', border: '1px solid #ddd', borderRadius: '2px' }}></div>
                        
                        {/* Highlighted grid item */}
                        <div style={{ 
                            gridArea: value,
                            background: '#e6f3ff', 
                            border: '2px solid #007acc',
                            fontSize: '0.5em',
                            padding: '2px',
                            textAlign: 'center',
                            borderRadius: '3px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            zIndex: 1
                        }}>
                            Item
                        </div>
                    </div>
                    <div style={{ fontSize: '0.6em', textAlign: 'center', color: '#666' }}>
                        {isNamedArea && 'Named grid area'}
                        {isLineNumbers && 'Line-based placement'}
                        {isSpan && 'Spans multiple cells'}
                        {isAutoPlacement && 'Auto placement'}
                    </div>
                </div>
            )

        case 'fontFamily':
            return <ExamplePreview style={{ fontFamily: value}}>Text</ExamplePreview>

        case 'fontSize':
            return <ExamplePreview style={{ fontSize: value }}>Text</ExamplePreview>
        
        case 'fontStyle':
            return <ExamplePreview style={{ fontStyle: value }}>Text</ExamplePreview>

        case 'fontWeight':
            return <ExamplePreview style={{ fontWeight: value }}>Text</ExamplePreview>

        case 'gridTemplateRows':
            return (
                <div style={{ 
                    display: 'grid', 
                    gridTemplateRows: value,
                    gridTemplateColumns: '1fr',
                    width: '120px', 
                    height: 'max-content', 
                    border: '2px dashed #ccc', 
                    borderRadius: '6px', 
                    background: '#f8f9fa', 
                    gap: '4px', 
                    padding: '4px' 
                }}>
                    <div style={{ 
                        background: '#e6f3ff', 
                        border: '1px solid #007acc',
                        fontSize: '0.6em',
                        padding: '2px',
                        textAlign: 'center',
                        borderRadius: '3px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '20px'
                    }}>
                        Row 1
                    </div>
                    <div style={{ 
                        background: '#e0f2e7', 
                        border: '1px solid #51cf66',
                        fontSize: '0.6em',
                        padding: '2px',
                        textAlign: 'center',
                        borderRadius: '3px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '20px'
                    }}>
                        Row 2
                    </div>
                    <div style={{ 
                        background: '#fff4e6', 
                        border: '1px solid #fd7e14',
                        fontSize: '0.6em',
                        padding: '2px',
                        textAlign: 'center',
                        borderRadius: '3px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '20px'
                    }}>
                        Row 3
                    </div>
                </div>
            )
            
        case 'gridTemplateColumns':
            return (
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: value,
                    gridTemplateRows: '1fr',
                    width: '240px', 
                    height: '60px', 
                    border: '2px dashed #ccc', 
                    borderRadius: '6px', 
                    background: '#f8f9fa', 
                    gap: '4px', 
                    padding: '4px' 
                }}>
                    <div style={{ 
                        background: '#e6f3ff', 
                        border: '1px solid #007acc',
                        fontSize: '0.6em',
                        padding: '2px',
                        textAlign: 'center',
                        borderRadius: '3px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: '20px'
                    }}>
                        Col 1
                    </div>
                    <div style={{ 
                        background: '#e0f2e7', 
                        border: '1px solid #51cf66',
                        fontSize: '0.6em',
                        padding: '2px',
                        textAlign: 'center',
                        borderRadius: '3px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: '20px'
                    }}>
                        Col 2
                    </div>
                    <div style={{ 
                        background: '#fff4e6', 
                        border: '1px solid #fd7e14',
                        fontSize: '0.6em',
                        padding: '2px',
                        textAlign: 'center',
                        borderRadius: '3px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: '20px'
                    }}>
                        Col 3
                    </div>
                </div>
            )

        case 'gridTemplateAreas':
            // Parse the grid-template-areas value to create a proper grid visualization
            const areaRows = value.match(/"[^"]*"/g) || [];
            const gridStructure = areaRows.map(row => 
                row.replace(/"/g, '').split(/\s+/).filter(cell => cell.length > 0)
            );
            
            const allAreas = gridStructure.flat();
            const uniqueAreas = [...new Set(allAreas.filter(area => area !== '.'))];
            
            // Color mapping for different areas
            const areaColors = {
                'header': { bg: '#e6f3ff', border: '#007acc' },
                'sidebar': { bg: '#e0f2e7', border: '#51cf66' },
                'content': { bg: '#fff4e6', border: '#fd7e14' },
                'footer': { bg: '#f3e5f5', border: '#9c88ff' },
                'left': { bg: '#ffe6e6', border: '#ff6b6b' },
                'right': { bg: '#e6ffe6', border: '#69db7c' }
            };
            
            // Default colors for other areas
            const defaultColors = [
                { bg: '#f0f8ff', border: '#4dabf7' },
                { bg: '#f0fff4', border: '#51cf66' },
                { bg: '#fffbf0', border: '#ffd43b' },
                { bg: '#fdf2f8', border: '#f783ac' }
            ];
            
            const getAreaColor = (area) => {
                if (area === '.') return { bg: '#f8f9fa', border: '#dee2e6' };
                if (areaColors[area]) return areaColors[area];
                const index = uniqueAreas.indexOf(area) % defaultColors.length;
                return defaultColors[index];
            };
            
            const rows = gridStructure.length;
            const cols = Math.max(...gridStructure.map(row => row.length));
            
            return (
                <div style={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px',
                    background: '#f8f9fa',
                    borderRadius: '4px',
                    border: '2px dashed #ccc'
                }}>
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: `repeat(${cols}, 1fr)`,
                        gridTemplateRows: `repeat(${rows}, 1fr)`,
                        width: '140px',
                        height: `${Math.max(60, rows * 25)}px`,
                        background: '#fff',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        gap: '2px',
                        padding: '4px'
                    }}>
                        {gridStructure.map((row, rowIndex) => 
                            row.map((cell, colIndex) => {
                                const color = getAreaColor(cell);
                                return (
                                    <div key={`${rowIndex}-${colIndex}`} style={{ 
                                        background: color.bg, 
                                        border: `1px solid ${color.border}`,
                                        fontSize: '0.5em',
                                        padding: '2px',
                                        textAlign: 'center',
                                        borderRadius: '2px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: cell === '.' ? 'normal' : 'bold',
                                        color: cell === '.' ? '#999' : 'inherit'
                                    }}>
                                        {cell === '.' ? '·' : cell}
                                    </div>
                                );
                            })
                        )}
                    </div>
                    <div style={{ fontSize: '0.6em', textAlign: 'center', color: '#666' }}>
                        {uniqueAreas.length > 0 ? `Areas: ${uniqueAreas.join(', ')}` : 'Grid template areas'}
                    </div>
                </div>
            )

        case 'height':
            return <ExamplePreview style={{ height: value, width: '100px' }}>Height</ExamplePreview>

        case 'justifyContent':
            return (
                <div style={{ 
                    display: 'flex', 
                    justifyContent: value,
                    alignItems: 'center',
                    width: '180px', 
                    height: '60px', 
                    border: '2px dashed #ccc', 
                    borderRadius: '6px', 
                    background: '#f8f9fa', 
                    padding: '6px' 
                }}>
                    <div style={{ 
                        background: '#e6f3ff', 
                        border: '1px solid #007acc',
                        fontSize: '0.6em',
                        padding: '4px',
                        textAlign: 'center',
                        borderRadius: '3px',
                        minWidth: '25px',
                        height: '30px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        1
                    </div>
                    <div style={{ 
                        background: '#e0f2e7', 
                        border: '1px solid #51cf66',
                        fontSize: '0.6em',
                        padding: '4px',
                        textAlign: 'center',
                        borderRadius: '3px',
                        minWidth: '25px',
                        height: '30px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        2
                    </div>
                    <div style={{ 
                        background: '#fff4e6', 
                        border: '1px solid #fd7e14',
                        fontSize: '0.6em',
                        padding: '4px',
                        textAlign: 'center',
                        borderRadius: '3px',
                        minWidth: '25px',
                        height: '30px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        3
                    </div>
                </div>
            )

        case 'justifyItems':
            return (
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1fr 1fr 1fr',
                    justifyItems: value,
                    alignItems: 'center',
                    width: '180px', 
                    height: '60px', 
                    border: '2px dashed #ccc', 
                    borderRadius: '6px', 
                    background: '#f8f9fa', 
                    gap: '6px', 
                    padding: '6px' 
                }}>
                    <div style={{ 
                        background: '#e6f3ff', 
                        border: '1px solid #007acc',
                        fontSize: '0.6em',
                        padding: '4px',
                        textAlign: 'center',
                        borderRadius: '3px',
                        minWidth: '25px',
                        height: '30px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        1
                    </div>
                    <div style={{ 
                        background: '#e0f2e7', 
                        border: '1px solid #51cf66',
                        fontSize: '0.6em',
                        padding: '4px',
                        textAlign: 'center',
                        borderRadius: '3px',
                        minWidth: '25px',
                        height: '30px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        2
                    </div>
                    <div style={{ 
                        background: '#fff4e6', 
                        border: '1px solid #fd7e14',
                        fontSize: '0.6em',
                        padding: '4px',
                        textAlign: 'center',
                        borderRadius: '3px',
                        minWidth: '25px',
                        height: '30px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        3
                    </div>
                </div>
            )

        case 'justifySelf':
            return (
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1fr 1fr 1fr',
                    justifyItems: 'start', // Default alignment for grid
                    alignItems: 'center',
                    width: '180px', 
                    height: '60px', 
                    border: '2px dashed #ccc', 
                    borderRadius: '6px', 
                    background: '#f8f9fa', 
                    gap: '6px', 
                    padding: '6px' 
                }}>
                    <div style={{ 
                        background: '#f0f0f0', 
                        border: '1px solid #ccc',
                        fontSize: '0.6em',
                        padding: '4px',
                        textAlign: 'center',
                        borderRadius: '3px',
                        minWidth: '25px',
                        height: '30px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        1
                    </div>
                    <div style={{ 
                        justifySelf: value,
                        background: '#e6f3ff', 
                        border: '1px solid #007acc',
                        fontSize: '0.6em',
                        padding: '4px',
                        textAlign: 'center',
                        borderRadius: '3px',
                        minWidth: '25px',
                        height: '30px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        Test
                    </div>
                    <div style={{ 
                        background: '#f0f0f0', 
                        border: '1px solid #ccc',
                        fontSize: '0.6em',
                        padding: '4px',
                        textAlign: 'center',
                        borderRadius: '3px',
                        minWidth: '25px',
                        height: '30px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        3
                    </div>
                </div>
            )

        case 'letterSpacing':
            return <ExamplePreview style={{ letterSpacing: value }}>Text</ExamplePreview>

        case 'lineHeight':
            return <ExamplePreview style={{ lineHeight: value }}>
                Line 1<br />
                Line 2<br />
                Line 3
            </ExamplePreview>

        case 'maxHeight':
            // Parse the value to determine if it's a constraint that would be visible
            const isConstraining = value.includes('px') && parseInt(value) < 150;
            const isPercentage = value.includes('%');
            const isViewport = value.includes('vh');
            const isNone = value === 'none';
            
            return (
                <ExamplePreview style={{ 
                    maxHeight: value, 
                    overflow: 'auto',
                    border: '2px dashed #ccc',
                    position: 'relative',
                    minHeight: isNone ? 'auto' : '60px',
                    width: '140px'
                }}>
                    <div style={{ 
                        padding: '8px',
                        fontSize: '0.75em',
                        lineHeight: '1.4'
                    }}>
                        <strong>Max Height: {value}</strong><br />
                        Content line 1<br />
                        Content line 2<br />
                        Content line 3<br />
                        Content line 4<br />
                        {isConstraining && <span style={{ color: '#ff6b6b' }}>↓ Scroll to see more</span>}
                        {isNone && <span style={{ color: '#51cf66' }}>✓ No height limit</span>}
                        {(isPercentage || isViewport) && <span style={{ color: '#339af0' }}>Relative constraint</span>}
                    </div>
                </ExamplePreview>
            )

        case 'maxWidth':
            // Parse the value to determine if it's a constraint that would be visible
            const isConstrainingWidth = value.includes('px') && parseInt(value) < 400;
            const isPercentageWidth = value.includes('%');
            const isViewportWidth = value.includes('vw');
            const isNoneWidth = value === 'none';
            const isMaxContent = value === 'max-content';
            
            return (
                <div style={{ 
                    width: '100%', 
                    border: '2px dashed #ccc', 
                    padding: '1rem 0rem',
                    background: '#f8f9fa'
                }}>
                    <ExamplePreview style={{ 
                        maxWidth: value, 
                        background: '#d4e0ff', 
                        overflow: 'hidden',
                        padding: '12px',
                        fontSize: '0.75em',
                        lineHeight: '1.4',
                        border: '2px solid #339af0',
                        borderRadius: '4px'
                    }}>
                        <div>
                            <strong>Max Width: {value}</strong><br />
                            This content box demonstrates max-width behavior. 
                            {isConstrainingWidth && <span style={{ color: '#ff6b6b' }}> ← Width is limited!</span>}
                            {isNoneWidth && <span style={{ color: '#51cf66' }}> ✓ No width limit</span>}
                            {isMaxContent && <span style={{ color: '#339af0' }}> Fits content size</span>}
                            {(isPercentageWidth || isViewportWidth) && <span style={{ color: '#339af0' }}> Relative constraint</span>}
                        </div>
                    </ExamplePreview>
                </div>
            )

        case 'margin':
            return (
                <div style={{ 
                    background: '#f8f9fa',
                    border: '2px dashed #ccc',
                    padding: '8px',
                    borderRadius: '4px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <ExamplePreview style={{ 
                        margin: value,
                        background: '#e6f3ff',
                        border: '2px solid #007acc',
                        borderRadius: '4px',
                        padding: '8px',
                        fontSize: '0.8em',
                        textAlign: 'center'
                    }}>
                        Margin
                    </ExamplePreview>
                </div>
            )

        case 'padding':
            return <ExamplePreview style={{ 
                padding: value,
                borderRadius: '4px',
                fontSize: '0.8em',
                textAlign: 'center'
            }}>
                Padding
            </ExamplePreview>

        case 'minHeight':
            // Parse the value to determine the type of constraint
            const isConstrainingMinHeight = value.includes('px') && parseInt(value) > 60;
            const isPercentageMinHeight = value.includes('%');
            const isViewportMinHeight = value.includes('vh');
            const isAutoMinHeight = value === 'auto' || value === '0';
            const isMinContentHeight = value === 'min-content';
            const isFitContentHeight = value === 'fit-content';
            
            return (
                <div style={{ 
                    width: '100%', 
                    border: '2px dashed #ccc', 
                    padding: '1rem',
                    background: '#f8f9fa',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <ExamplePreview style={{ 
                        minHeight: value,
                        height: 'auto', // Let it be naturally sized
                        width: '140px',
                        background: '#e0f2e7', 
                        padding: '12px',
                        fontSize: '0.75em',
                        lineHeight: '1.4',
                        border: '2px solid #51cf66',
                        borderRadius: '4px',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}>
                        <div>
                            <strong>Min Height: {value}</strong><br />
                            Small content
                            {isConstrainingMinHeight && <span style={{ color: '#ff6b6b' }}><br />↕ Maintains minimum height!</span>}
                            {isAutoMinHeight && <span style={{ color: '#51cf66' }}><br />✓ Natural sizing</span>}
                            {isMinContentHeight && <span style={{ color: '#339af0' }}><br />Fits minimal content</span>}
                            {isFitContentHeight && <span style={{ color: '#339af0' }}><br />Fits content size</span>}
                            {(isPercentageMinHeight || isViewportMinHeight) && <span style={{ color: '#339af0' }}><br />Relative constraint</span>}
                        </div>
                    </ExamplePreview>
                </div>
            )

        case 'minWidth':
            // Parse the value to determine the type of constraint
            const isConstrainingMinWidth = value.includes('px') && parseInt(value) > 80;
            const isPercentageMinWidth = value.includes('%');
            const isViewportMinWidth = value.includes('vw');
            const isAutoMinWidth = value === 'auto';
            const isMinContent = value === 'min-content';
            const isFitContent = value === 'fit-content';
            
            return (
                <div style={{ 
                    width: '100%', 
                    border: '2px dashed #ccc', 
                    padding: '1rem 0.5rem',
                    background: '#f8f9fa',
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <ExamplePreview style={{ 
                        minWidth: value,
                        width: 'auto', // Let it be naturally sized
                        background: '#ffe0e6', 
                        padding: '12px',
                        fontSize: '0.75em',
                        lineHeight: '1.4',
                        border: '2px solid #ff6b6b',
                        borderRadius: '4px',
                        textAlign: 'center'
                    }}>
                        <div>
                            <strong>Min Width: {value}</strong><br />
                            Short text
                            {isConstrainingMinWidth && <span style={{ color: '#ff6b6b' }}><br />→ Maintains minimum width!</span>}
                            {isAutoMinWidth && <span style={{ color: '#51cf66' }}><br />✓ Natural sizing</span>}
                            {isMinContent && <span style={{ color: '#339af0' }}><br />Fits minimal content</span>}
                            {isFitContent && <span style={{ color: '#339af0' }}><br />Fits content size</span>}
                            {(isPercentageMinWidth || isViewportMinWidth) && <span style={{ color: '#339af0' }}><br />Relative constraint</span>}
                        </div>
                    </ExamplePreview>
                </div>
            )

        case 'opacity':
            return <ExamplePreview style={{ backgroundColor: 'rgb(98, 132, 255)', color: 'white', opacity: parseFloat(value), height: '60px', width: '120px',}}>
                Opacity
            </ExamplePreview>

        case 'overflow':
            const isVisible = value.includes('visible');
            const isHidden = value.includes('hidden');
            const isScroll = value.includes('scroll');
            const isAuto = value.includes('auto');
            
            return (
                <div style={{ 
                    width: '150px',
                    height: '80px',
                    border: '2px solid #007acc',
                    background: '#e6f3ff',
                    borderRadius: '4px',
                    overflow: value,
                    position: 'relative'
                }}>
                    <div style={{
                        padding: '8px',
                        fontSize: '0.7em',
                        lineHeight: '1.3',
                        height: '120px', // Intentionally larger to cause overflow
                        background: 'linear-gradient(to bottom, #e6f3ff, #b3d9ff)',
                    }}>
                        <strong>Overflow: {value}</strong><br />
                        This content is longer than the container can display.
                        {isVisible && <span style={{ color: '#ff6b6b' }}> ← Overflows!</span>}
                        {isHidden && <span style={{ color: '#ff6b6b' }}> (Hidden)</span>}
                        {(isScroll || isAuto) && <span style={{ color: '#51cf66' }}> ↕ Scrollable</span>}
                        <br />More content here that exceeds the boundaries...
                    </div>
                </div>
            )

        case 'textAlign':
            return <ExamplePreview style={{ textAlign: value }}>Text</ExamplePreview>

        case 'position':
            return (
                <div style={{ position: 'relative', width: '150px', height: '150px', border: '2px dashed #ccc', borderRadius: '6px'}}>
                    <ExamplePreview style={{ 
                        position: value === 'fixed' ? 'relative' : value, 
                        top: value !== 'static' ? '20px' : undefined, 
                        left: value !== 'static' ? '20px' : undefined, 
                        padding: '0.5rem',
                    }}> 
                        {value} 
                    </ExamplePreview>
                </div>
            )

        case 'positioning':
            return (
                <div style={{ position: 'relative', width: '120px', height: '100px', border: '2px dashed #ccc', borderRadius: '6px', background: '#f8f9fa' }}>
                    <ExamplePreview style={{ 
                        position: 'absolute',
                        [prop]: value,
                        width: '40px',
                        height: '30px',
                        fontSize: '0.6em',
                        padding: '0.25rem',
                    }}>
                        {prop}
                    </ExamplePreview>
                </div>
            )

        case 'textDecoration':
            return <ExamplePreview style={{ textDecoration: value }}>Text</ExamplePreview>
        
        case 'textColor':
            return <ExamplePreview style={{ color: value }}>Text</ExamplePreview>

        case 'textIndent':
            return <ExamplePreview style={{ textIndent: value }}>Text</ExamplePreview>

        case 'textTransform':
            return <ExamplePreview style={{ textTransform: value }}>Text</ExamplePreview>
        
        case 'textShadow':
            return <ExamplePreview style={{ textShadow: value }}>Text</ExamplePreview>

        case 'verticalAlign':
            return <ExamplePreview style={{ verticalAlign: value, fontSize:'1.25em', display: 'inline-block' }}> Text <span style={{ verticalAlign: value, fontSize: '0.75em' }}><FaSmileWink /></span> here.</ExamplePreview>

        case 'whiteSpace':
            return <ExamplePreview style={{ whiteSpace: value}}>{'Line1 Line2\n Line3   Line4'}</ExamplePreview>

        case 'width':
            return <ExamplePreview style={{ width: value }}>Width</ExamplePreview>

        case 'wordSpacing':
            return <ExamplePreview style={{ wordSpacing: value }}>This is spaced text</ExamplePreview>

        case 'zIndex':
            return (
                <div style={{ position: 'relative', width: '120px', height: '100px', border: '2px dashed #ccc', borderRadius: '6px', background: '#f8f9fa' }}>
                    <ExamplePreview style={{ 
                        position: 'absolute',
                        top: '30px',
                        left: '30px',
                        width: '40px',
                        height: '30px',
                        fontSize: '0.6em',
                        padding: '0.25rem',
                        background: '#ffe0e6',
                        border: '2px solid #ff6b6b',
                        zIndex: 1
                    }}>
                        Back
                    </ExamplePreview>
                    <ExamplePreview style={{ 
                        position: 'absolute',
                        top: '15px',
                        left: '15px',
                        width: '40px',
                        height: '30px',
                        fontSize: '0.6em',
                        padding: '0.25rem',
                        background: '#e6f3ff',
                        border: '2px solid #007acc',
                        zIndex: value === 'auto' ? 'auto' : parseInt(value) || 0
                    }}>
                        {value}
                    </ExamplePreview>
                </div>
            )

        case 'transition':
            const [isHovered, setIsHovered] = React.useState(false);
            
            // Parse transition value to understand what's being animated
            const isOpacityTransition = value.includes('opacity');
            const isTransformTransition = value.includes('transform');
            const isBackgroundTransition = value.includes('background');
            const isAllTransition = value.includes('all') || (!isOpacityTransition && !isTransformTransition && !isBackgroundTransition);
            
            // Extract duration for feedback
            const durationMatch = value.match(/(\d+(?:\.\d+)?)(s|ms)/);
            const duration = durationMatch ? durationMatch[0] : '0.3s';
            
            return (
                <div style={{ 
                    width: '180px', 
                    height: '100px', 
                    border: '2px dashed #ccc', 
                    borderRadius: '6px', 
                    background: '#f8f9fa',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '8px'
                }}>
                    <div
                        style={{
                            width: '80px',
                            height: '40px',
                            background: isHovered ? '#007acc' : '#e6f3ff',
                            border: '2px solid #007acc',
                            borderRadius: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.7em',
                            color: isHovered ? 'white' : '#007acc',
                            cursor: 'pointer',
                            transition: value,
                            transform: isHovered && (isTransformTransition || isAllTransition) ? 'scale(1.1)' : 'scale(1)',
                            opacity: isHovered && (isOpacityTransition || isAllTransition) ? 0.7 : 1
                        }}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        Hover me
                    </div>
                    <div style={{
                        fontSize: '0.6em',
                        color: '#666',
                        textAlign: 'center',
                        lineHeight: '1.2'
                    }}>
                        <strong>Duration: {duration}</strong>
                        {isOpacityTransition && <div style={{ color: '#339af0' }}>Animates opacity</div>}
                        {isTransformTransition && <div style={{ color: '#51cf66' }}>Animates transform</div>}
                        {isBackgroundTransition && <div style={{ color: '#fd7e14' }}>Animates background</div>}
                        {isAllTransition && <div style={{ color: '#9c88ff' }}>Animates all properties</div>}
                    </div>
                </div>
            )

        case 'transitionDuration':
            const [isDurationHovered, setIsDurationHovered] = React.useState(false);
            
            // Parse duration value and provide feedback
            const isSeconds = value.includes('s') && !value.includes('ms');
            const isMilliseconds = value.includes('ms');
            const isZeroDuration = value === '0s' || value === '0ms';
            const isMultipleDurations = value.includes(',');
            
            // Extract numeric value for speed classification
            let numericValue = 0;
            if (isMilliseconds) {
                numericValue = parseFloat(value.replace('ms', ''));
            } else if (isSeconds) {
                numericValue = parseFloat(value.replace('s', '')) * 1000; // Convert to ms for comparison
            }
            
            const getSpeedLabel = () => {
                if (isZeroDuration) return 'Instant';
                if (numericValue <= 150) return 'Very Fast';
                if (numericValue <= 300) return 'Fast';
                if (numericValue <= 600) return 'Medium';
                if (numericValue <= 1000) return 'Slow';
                return 'Very Slow';
            };
            
            return (
                <div style={{ 
                    width: '180px', 
                    height: '100px', 
                    border: '2px dashed #ccc', 
                    borderRadius: '6px', 
                    background: '#f8f9fa',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '8px'
                }}>
                    <div
                        style={{
                            width: '80px',
                            height: '40px',
                            background: isDurationHovered ? '#ff6b6b' : '#ffe0e6',
                            border: '2px solid #ff6b6b',
                            borderRadius: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.7em',
                            color: isDurationHovered ? 'white' : '#ff6b6b',
                            cursor: 'pointer',
                            transitionDuration: value,
                            transitionProperty: 'all',
                            transitionTimingFunction: 'ease'
                        }}
                        onMouseEnter={() => setIsDurationHovered(true)}
                        onMouseLeave={() => setIsDurationHovered(false)}
                    >
                        Hover me
                    </div>
                    <div style={{
                        fontSize: '0.6em',
                        color: '#666',
                        textAlign: 'center',
                        lineHeight: '1.2'
                    }}>
                        <strong>Duration: {value}</strong>
                        <div style={{ color: '#ff6b6b' }}>
                            {getSpeedLabel()}
                            {isMultipleDurations && ' (Multiple)'}
                        </div>
                        {isZeroDuration && <div style={{ color: '#868e96' }}>No animation</div>}
                        {isSeconds && !isZeroDuration && <div style={{ color: '#339af0' }}>Seconds unit</div>}
                        {isMilliseconds && <div style={{ color: '#51cf66' }}>Milliseconds unit</div>}
                    </div>
                </div>
            )

        case 'transitionTimingFunction':
            const [isTimingHovered, setIsTimingHovered] = React.useState(false);
            
            // Parse timing function value and provide feedback
            const isEase = value === 'ease';
            const isEaseIn = value === 'ease-in';
            const isEaseOut = value === 'ease-out';
            const isEaseInOut = value === 'ease-in-out';
            const isLinear = value === 'linear';
            const isCubicBezier = value.includes('cubic-bezier');
            const isSteps = value.includes('steps');
            const isMultipleTimings = value.includes(',');
            
            const getTimingDescription = () => {
                if (isEase) return 'Slow start, fast middle, slow end';
                if (isEaseIn) return 'Slow start, accelerates';
                if (isEaseOut) return 'Fast start, decelerates';
                if (isEaseInOut) return 'Slow start and end';
                if (isLinear) return 'Constant speed';
                if (isCubicBezier) return 'Custom curve';
                if (isSteps) return 'Stepped animation';
                if (isMultipleTimings) return 'Multiple functions';
                return 'Custom timing';
            };
            
            const getTimingColor = () => {
                if (isEase) return '#51cf66';
                if (isEaseIn) return '#339af0';
                if (isEaseOut) return '#fd7e14';
                if (isEaseInOut) return '#9c88ff';
                if (isLinear) return '#868e96';
                if (isCubicBezier) return '#e64980';
                if (isSteps) return '#20c997';
                return '#495057';
            };
            
            return (
                <div style={{ 
                    width: '180px', 
                    height: '100px', 
                    border: '2px dashed #ccc', 
                    borderRadius: '6px', 
                    background: '#f8f9fa',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '8px'
                }}>
                    <div
                        style={{
                            width: '80px',
                            height: '40px',
                            background: getTimingColor(),
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.7em',
                            color: isTimingHovered ? 'white' : getTimingColor(),
                            cursor: 'pointer',
                            transitionDuration: '0.6s',
                            transitionProperty: 'all',
                            transitionTimingFunction: value
                        }}
                        onMouseEnter={() => setIsTimingHovered(true)}
                        onMouseLeave={() => setIsTimingHovered(false)}
                    >
                        Hover me
                    </div>
                    <div style={{
                        fontSize: '0.6em',
                        color: '#666',
                        textAlign: 'center',
                        lineHeight: '1.2'
                    }}>
                        <strong style={{ color: getTimingColor() }}>
                            {value.length > 20 ? value.substring(0, 20) + '...' : value}
                        </strong>
                        <div style={{ color: getTimingColor() }}>
                            {getTimingDescription()}
                        </div>
                        {isSteps && <div style={{ color: '#868e96' }}>Discrete steps</div>}
                        {isCubicBezier && <div style={{ color: '#868e96' }}>Custom bezier curve</div>}
                        {isMultipleTimings && <div style={{ color: '#868e96' }}>Multiple properties</div>}
                        <div style={{ color: '#495057', fontSize: '0.9em' }}>Click to toggle</div>
                    </div>
                </div>
            )

    }
};

const ExamplePreview = styled.div`
    min-width: 80px;
    padding: 0.65rem;
    border: 2px solid rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    background: #fff;
    align-content: center;
    justify-self: center;
    text-align: center;
    transition: all 0.3s ease;
    white-space: pre-wrap;

    display: flex;
    flex-direction: column;
    justify-content: center;

    &:hover {
        transform: scale(1.1);
        border-color: var(--accent);
    }
`

export default getPreviewComponent;