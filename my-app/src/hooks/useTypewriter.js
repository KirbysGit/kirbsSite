import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for typewriter effect with precise control
 * @param {string} text - The text to type/delete
 * @param {object} options - Configuration options
 * @param {number} options.typeMs - Milliseconds per character when typing (default 70)
 * @param {number} options.deleteMs - Milliseconds per character when deleting (default 45)
 * @param {boolean} options.start - Whether to start the animation (default true)
 * @param {string} options.mode - Current phase: 'type' | 'delete' | 'idle' (default 'type')
 * @param {function} options.onDone - Callback when a phase completes
 * @returns {object} - { out: string, phase: string, setPhase: function, resetTo: function }
 */
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
    const [out, setOut] = useState('');
    const [phase, setPhase] = useState(mode);

    const iRef = useRef(0);                // current char index
    const tRef = useRef(null);
    const phaseRef = useRef(phase);        // prevent stale timers
    const textRef = useRef(text);

    // Remember the target text
    useEffect(() => {
        textRef.current = text;
    }, [text]);

    // Normalize indices when entering a phase
    useEffect(() => {
        phaseRef.current = phase;

        // Initialize counters when entering a phase
        if (phase === 'type') {
            iRef.current = 0;
            setOut('');                // start from empty -> incremental typing
        } else if (phase === 'delete') {
            // delete whatever is currently shown; if blank, delete the previous text
            iRef.current = out.length || textRef.current.length;
            if (out.length === 0) setOut(textRef.current);
        }
        // when idle, we don't touch `out`
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [phase]); // (intentionally not including `out`)

    // Clear timers on unmount
    useEffect(() => () => { if (tRef.current) clearTimeout(tRef.current); }, []);

    useEffect(() => {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!start || phase === 'idle') {
            if (prefersReducedMotion && phase === 'type' && !out) {
                setOut(text);
                onDone?.('type');
            }
            return;
        }

        const step = () => {
            if (phaseRef.current !== phase) return; // phase changed; abort this cycle

            if (phase === 'type') {
                const target = textRef.current;
                if (iRef.current < target.length) {
                    if (prefersReducedMotion) {
                        // Show all at once for reduced motion
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
                        // Clear instantly for reduced motion
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

        // Kill any previous timer before starting a new cycle
        if (tRef.current) clearTimeout(tRef.current);
        tRef.current = window.setTimeout(step, phase === 'type' ? typeMs : deleteMs);

        // Also clear if deps change
        return () => { if (tRef.current) clearTimeout(tRef.current); };
    }, [start, phase, typeMs, deleteMs, onDone, out]);

    const resetTo = (s) => {
        iRef.current = s.length;
        setOut(s);
    };

    return { out, phase, setPhase, resetTo };
}

