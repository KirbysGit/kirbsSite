// useTypewriter.js

// custom hook for typewriter effect with precise control.

// imports.
import { useEffect, useRef, useState, useCallback } from 'react';

// useTypewriter hook.
export function useTypewriter(
    text,
    {
        typeMs = 100,
        deleteMs = 40,
        start = true,
        mode = 'type',
        onDone,
    } = {}
) {
    // state variables.
    const [out, setOut] = useState('');
    const [phase, setPhase] = useState(mode);

    // refs.
    const iRef = useRef(0);                 // current char index.
    const tRef = useRef(null);              // timer reference.
    const phaseRef = useRef(phase);         // prevent stale timers.
    const textRef = useRef(text);           // text reference.
    const outRef = useRef('');              // current output ref to avoid frequent state updates.
    const updateTimerRef = useRef(null);    // timer for throttled state updates.

    // remember the target text.
    useEffect(() => {
        textRef.current = text;
    }, [text]);

    // Throttled state update function - only updates state every 100ms to reduce re-renders
    // Wrapped in useCallback to keep it stable across renders
    const throttledSetOut = useCallback((newOut, immediate = false) => {
        outRef.current = newOut;
        
        // If immediate flag is set, update state right away (for phase changes, final states, etc.)
        if (immediate) {
            if (updateTimerRef.current) {
                clearTimeout(updateTimerRef.current);
                updateTimerRef.current = null;
            }
            setOut(newOut);
            return;
        }
        
        // If typing speed is very fast (< 50ms), update more frequently to avoid lag
        // Otherwise throttle to 100ms for performance
        const throttleMs = typeMs < 50 ? Math.max(50, typeMs * 2) : 100;
        
        // Clear any pending update
        if (updateTimerRef.current) {
            clearTimeout(updateTimerRef.current);
        }
        
        // Schedule state update (throttled)
        updateTimerRef.current = setTimeout(() => {
            setOut(outRef.current);
            updateTimerRef.current = null;
        }, throttleMs);
    }, [typeMs]); // Include typeMs to recalculate throttle when speed changes

    // update phaseRef and initialize when entering a phase.
    useEffect(() => {
        phaseRef.current = phase;

        // Clear any pending updates when phase changes
        if (updateTimerRef.current) {
            clearTimeout(updateTimerRef.current);
            updateTimerRef.current = null;
        }

        // if the phase is type, initialize the current char index to 0.
        if (phase === 'type') {
            iRef.current = 0;
            outRef.current = '';
            setOut(''); // Immediate update for phase change
            // if the phase is delete, initialize the current char index to the length of the text.
        } else if (phase === 'delete') {
            iRef.current = outRef.current.length || textRef.current.length;
            // if the output length is 0, set the output to the text.
            if (outRef.current.length === 0) {
                outRef.current = textRef.current;
                setOut(textRef.current); // Immediate update for phase change
            }
        }
    }, [phase]); // intentionally not including `out` to avoid double-executions.

    // clear timers on unmount.
    useEffect(() => () => { 
        if (tRef.current) clearTimeout(tRef.current);
        if (updateTimerRef.current) clearTimeout(updateTimerRef.current);
    }, []);

    useEffect(() => {
        // check for reduced motion preference.
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!start || phase === 'idle') {
            // if the phase is idle, set the output to the text.
            if (prefersReducedMotion && phase === 'type' && !out) {
                setOut(text);
                onDone?.('type');
            } else {
                return;
            }
        }

        // step function.
        const step = () => {
            if (phaseRef.current !== phase) return; // phase changed; abort this cycle.

            if (phase === 'type') {
                const target = textRef.current;
                if (iRef.current < target.length) {
                    if (prefersReducedMotion) {
                        // show all at once for reduced motion.
                        outRef.current = target;
                        iRef.current = target.length;
                        setOut(target); // Immediate update for reduced motion
                        onDone?.('type');
                    } else {
                        const next = target.slice(0, iRef.current + 1);
                        iRef.current += 1;
                        outRef.current = next;
                        // First character should be immediate, then throttle subsequent updates
                        const isFirstChar = iRef.current === 1;
                        throttledSetOut(next, isFirstChar);
                        tRef.current = window.setTimeout(step, typeMs);
                    }
                } else {
                    // Ensure final state is set immediately when done
                    throttledSetOut(outRef.current, true);
                    onDone?.('type');
                }
            }

            if (phase === 'delete') {
                if (iRef.current > 0) {
                    if (prefersReducedMotion) {
                        // clear instantly for reduced motion.
                        outRef.current = '';
                        iRef.current = 0;
                        setOut(''); // Immediate update for reduced motion
                        onDone?.('delete');
                    } else {
                        const next = outRef.current.slice(0, iRef.current - 1);
                        iRef.current -= 1;
                        outRef.current = next;
                        // Use throttled update to reduce re-renders
                        throttledSetOut(next);
                        tRef.current = window.setTimeout(step, deleteMs);
                    }
                } else {
                    // Ensure final state is set immediately when done
                    throttledSetOut(outRef.current, true);
                    onDone?.('delete');
                }
            }
        };

        // kill any previous timer before starting a new cycle.
        if (tRef.current) clearTimeout(tRef.current);
        tRef.current = window.setTimeout(step, phase === 'type' ? typeMs : deleteMs);

        // also clear if deps change.
        return () => { 
            if (tRef.current) clearTimeout(tRef.current);
            if (updateTimerRef.current) {
                clearTimeout(updateTimerRef.current);
                updateTimerRef.current = null;
            }
        };
    }, [start, phase, typeMs, deleteMs, onDone, throttledSetOut]); // Include throttledSetOut to ensure it's captured

    // reset to function.
    const resetTo = (s) => {
        iRef.current = s.length;
        outRef.current = s;
        // Clear any pending updates and set immediately
        if (updateTimerRef.current) {
            clearTimeout(updateTimerRef.current);
            updateTimerRef.current = null;
        }
        setOut(s);
    };

    // return the output, phase, setPhase, and resetTo functions.
    return { out, phase, setPhase, resetTo };
}

