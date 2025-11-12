// useTypewriter.js

// custom hook for typewriter effect with precise control.

// imports.
import { useEffect, useRef, useState } from 'react';

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

    // remember the target text.
    useEffect(() => {
        textRef.current = text;
    }, [text]);

    // update phaseRef and initialize when entering a phase.
    useEffect(() => {
        phaseRef.current = phase;

        // if the phase is type, initialize the current char index to 0.
        if (phase === 'type') {
            iRef.current = 0;
            setOut('');
            // if the phase is delete, initialize the current char index to the length of the text.
        } else if (phase === 'delete') {
            iRef.current = out.length || textRef.current.length;
            // if the output length is 0, set the output to the text.
            if (out.length === 0) setOut(textRef.current);
        }
    }, [phase]); // intentionally not including `out` to avoid double-executions.

    // clear timers on unmount.
    useEffect(() => () => { if (tRef.current) clearTimeout(tRef.current); }, []);

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
                        setOut(target);
                        iRef.current = target.length;
                        onDone?.('type');
                    } else {
                        const next = target.slice(0, iRef.current + 1);
                        iRef.current += 1;
                        setOut(next);
                        tRef.current = window.setTimeout(step, typeMs);
                    }
                } else {
                    onDone?.('type');
                }
            }

            if (phase === 'delete') {
                if (iRef.current > 0) {
                    if (prefersReducedMotion) {
                        // clear instantly for reduced motion.
                        setOut('');
                        iRef.current = 0;
                        onDone?.('delete');
                    } else {
                        const next = out.slice(0, iRef.current - 1);
                        iRef.current -= 1;
                        setOut(next);
                        tRef.current = window.setTimeout(step, deleteMs);
                    }
                } else {
                    onDone?.('delete');
                }
            }
        };

        // kill any previous timer before starting a new cycle.
        if (tRef.current) clearTimeout(tRef.current);
        tRef.current = window.setTimeout(step, phase === 'type' ? typeMs : deleteMs);

        // also clear if deps change.
        return () => { if (tRef.current) clearTimeout(tRef.current); };
    }, [start, phase, typeMs, deleteMs, onDone, out]);

    // reset to function.
    const resetTo = (s) => {
        iRef.current = s.length;
        setOut(s);
    };

    // return the output, phase, setPhase, and resetTo functions.
    return { out, phase, setPhase, resetTo };
}