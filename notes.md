# STYLED NOTES - My Notes to Reference for UI Design 

## Random Notes I Forget :
Padding Interior, Margin Exterior.


# - VISUALS -
| Property | What You Choose | Example |
| --- | --- | --- |
| color | Any CSS color. | color: #ffffff; |
| background-color | Fills an element's background. | background-color: rgb(44, 49, 81); |
| ↳ Named | Readable presets. | background-color: black; |
| ↳ Hex | Precise brand shades. | background-color: #1a1a1a; |
| ↳ RGB | Easy channel tweaks. | background-color: rgb(255, 0, 0); |
| ↳ Transparent | Overlays / Modals | background-color: rgb(0, 0, 0, 0.5); |
| background-image | Gradients, textures, photos. | background-image: linear-gradient(135deg, #0cf, #09f); |
| border | Adds an outline. | border: 2px solid #ffffff; |
| border-radius | Creates depth/elevation. | box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); |




    - color                 (Text Color)
    - background-color      (Background Fill)
        - Named Colors : Black, White, Red.
        - HEX : #ff0000, #1a1a1a
        - RGB : rgb(255,0, 0)
        - Transparent : rgba(0, 0, 0, 0.5) or transparent

    - background-image      (Add Gradient Or Texture)
    - border                (Add Outline)
    - border-radius         (Rounding Corners)
    - box-shadow            (Add Depth / Elevation)

- LAYOUT -
    - padding               (Inner Spacing)
    - margin                (Space Around Card)
    - max-*                 (Restrict Card Size)
    - min-*                 (Ensure Visual Balance)
    - gap                   (Add Spacing Between Children)
    - z-index               (Stacking Order)
        - Needs position: relative/absolute/fixed
        - -1 - 999

- TYPOGRAPHY -
    - font-size             (Controls Text Size)
    - font-weight           (Boldness Of Text)
    - line-height           (Spacing Between Lines)
    - letter-spacing        (Spacing Between Letters)
    - text-transform        (Uppercase, Lowercase, etc.)

- INTERACTIVTY -
    - transition            (Smooth Changes on Hover)
    - cursor                (Change Pointer Type)
    - :hover                (Add Effects On Mouse Hover)
    - transform             (Move Or Scale Element)

- STRUCTURE ENHANCEMENTS -
    - display               (Change Layout Type)
        - grid : CSS Grid Container.
        - flex : Vertical or Horizontal Alignment.
        - block : Default List Item Behavior.
        - inline-grid : Grid Behaves like Inline Element.

    - align-items           (Control Child Alignment)
    - gap                   (Add Spacing Between Items)
    - align-self            (Change Alignment of Item)
        - flex-start : Beginning of Container.
        - center : Center of Container.
        - flex-end : End of Container.
        - stretch : Stretches to Fill Parent Container.
        - baseline : Aligns Text Baselines.

- GRIDS -
    - grid-template-column  (Defines Column Structure of Grid)
        - fr : Remaining Content Space.
        - px : Pixels. 
        - min-content max-content : Tightly Fit Items.
        - repeat(2, 1fr) : Evenly Split Layout.
        - clamp(24px, 4vw, 48px) 1 fr : Responsive Bullet Columns. (Min Val, Fluid Val, Max Val).

- BORDERS -
    - border                (Adds Border Around Element)
        - EX : 1px solid black
        - Set Up Is Thickness, Style, Color.

    - border-radius         (Rounds the Corners of Element)
        - 0 : Sharp Corners.
        - 10px : Moderate Curver.
        - 50% : Perfect Circle.
        - 10px 0 0 10 px : Top-left & Bottom-left rounded only.

- TRANSITIONS -
    - transition            (Animates Property Changes Smoothly)
        - transition: all 0.3s ease : Affects all animatable proprs.
        - transition: transform 0.5s ease-in-out : Just for transform.
        - ease, linear, ease-in, ease-out, ease-in-out : Timing Functions.

    - transform             (Applies 2D/3D transformations to An Element)
        - translateX(20px) : Move right.
        - scale(1.2) : Grow.
        - rotate(45deg) : Rotate.
        - skew(10deg, 5deg) : Tilt.
        - Can be combined.

- FLEX -
    - flex-direction        (Controls Main Axis Direction in Flex Container)
        - row : Horizontal, Left to Right.
        - row-reverse : Horizontal, Right to Left.
        - column : Vertical, Top to Bottom.
        - column-reverse : Verttical, Bottom to Top.

- CURSOR -

    - cursor                (Changes Mouse Cursor When Hovering)
        - pointer - Hand, For Clickable Things.
        - Default - Normal Arrow.
        - Not-Allowed - Red Circle / Cross.
        - Text -> I-beam for typing.

- UNITS -

    - px : Pixels.
    - % : Relative to Parent Element. 
    - em, rem : Relative to Font Size.
    - vw, vh : Viewport Width / Height.


- FRAMER MOTION - 

    Import Statement : import { motion, AnimatePrescence } from 'framer-motion'

    Core Component : <motion.div>, Replace a regular <div> to animate.

    Animate on Mount / Unmount : <AnimatePrescence>, Wrap specific components to animate on enter/exit.

    Common Props :
        - initial : Starting values. e.g. : { opacity: 0 }
        - animate : End values after mount. e.g. : { opacity: 1 }
        - exit : Animate on unmount. e.g. { opacity: 0 }
        - transition : Timing. e.g .{ duration: 0.5, ease: "easeOut" }

    Popular Effects :
        - Slide in / out : y, x 
        - Fade : opacity
        - Scale Up : scale


- SCROLL BASED ANIMATIONS -

    * USE REF EXAMPLE *

    Note : useRef over useState helps w/ avoiding re-renders on scroll. 

    Import Statement : import { useRef } from 'react';

    EXAMPLE : 

        const elementRef = useRef(null);
        useEffect(() => {
            const handleScroll = () => {
                const rect = elementRef.current.getBoundingClientRect();
                const windowHeight = window.innerHeight;

                const visibleHeight = Math.min(Math.max(windowHeight - rect.top, 0), rect.height);
                const progress = Math.min(Math.max(visibleHeight / rect.height, 0), 1);

                elementRef.current.style.setProperty("--progress", progress);
            };

            window.addEventListener("scroll", handleScroll);
            handleScroll();
            return () => window.removeEventListener("scroll", handleScroll);
        }, []);


- VIEWPORT CALCULATIONS -

    EXAMPLES :

        const rect = row.getBoundingClientRect(); -> 
        -   Gets the Size & Position of the Row relative to the Viewport.
        -   rect.top : Tells you how far from the top of the screen the row is.
        
        const screenHeight = window.innerHeight; ->
        - Stores the height of the visible screen (viewport).

        const rowCenter = rect.top + rect.height / 2; ->
        - Calculates vertical center point of row. Remember PEMDAS too.

        const screenCenter = window.innerHeight / 2;
        - Gets Center of Screen in Pixels.

- EVENT LISTENER -

    EXAMPLES :

        window.addEventListener("scroll", handleScroll); ->
        -   Adds the scroll listener to the window, so every tiem you scroll, we re-run the logic above.
        

- SHADOWS -

    box-shadow: offset-x offset-y blue radius spread-radius color inset;


- JS FUNCTIONS -

- accumulator - A container that collects and builds up a result as you loop through something.

- .filter() - Creates a new array that incldues only the elements that pass a certain test.

- .reduce() - 
    - Starts as some initial value.
    - On each iteration, you add or update it based on the current item.
    - You return it to use again on the next item.
    - At end you get one final result.
    - Simple Example : "I'm carrying a bag (our accumulator), and on each step through the list, I decide what to drop into the bag."
    