// TEXT
//  - COLOR
//  - DIRECTION
//  - FONT FAMILY
//  - FONT SIZE
//  - FONT STYLE
//  - FONT WEIGHT
//  - LETTER SPACING
//  - LINE HEIGHT 
//  - TEXT ALIGN
//  - TEXT INDENT
//  - TEXT TRANSFORM
//  - TEXT SHADOW
//  - TEXT DECORATION
//  - TEXT TRANSFORM
//  - VERTICAL SPACE
//  - WHITE SPACE
//  - WORD SPACING

// VISUALS
//  - BACKGROUND COLOR
//  - BACKGROUND IMAGE
//  - BACKGROUND SIZE
//  - BACKGROUND REPEAT
//  - BORDER
//  - BORDER-RADIUS
//  - BOX-SHADOW
//  - FILTER
//  - OPACITY
//  - MIX-BLEND-MODE

// BOX MODEL
//  - HEIGHT
//  - MAX-HEIGHT
//  - MAX-WIDTH
//  - MIN-WIDTH
//  - MIN-HEIGHT
//  - WIDTH
//  - BOX-SIZING
//  - OVERFLOW
//  - ASPECT-RATIO

// LAYOUT
//  - DISPLAY
//  - POSITION
//  - TRBL
//  - Z-INDEX
//  - ALIGN-ITEMS
//  - ALIGN-SELF
//  - JUSTIFY-CONTENT
//  - JUSTIFY-SELF
//  - GAP
//  - JUSTIFY-ITEMS
//  - FLEX DIRECTION
//  - FLEX WRAP
//  - ALIGN-CONTENT
//  - GRID-AREA
//  - ORDER
//  - GRID-TEMPLATE-AREAS
//  - GRID-TEMPLATE-COLUMNS
//  - GRID-TEMPLATE-ROWS

// ANIMATION
//  -   TRANSITION
//  -   TRANSITION-DURATION
//  -   TRANSITION-TIMING-FUNCTION
//  -   ANIMATION
//  -   ANIMATION-DIRECTION
//  -   ANIMATION-DURATION
//  -   ANIMATION-ITERATION-COUNT
//  -   ANIMATION-NAME
//  -   ANIMATION-TIMING-FUNCTION
/*
Animation and Transitions
    transition
    transition-duration
    transition-timing-function
    animation
    animation-name
    animation-duration
    animation-timing-function
    Other Useful Attributes
    cursor
    visibility
    clip-path
    filter */

// GRID SET UP
// FLEX SET UP
// BLOCK SET UP

import importantImg from '../../assets/important.png';
import moreImportantImg from '../../assets/moreImportant.png';

export default {
    text: [
        { //    COLOR.
            id:             'color',
            title:          'color',
            brief:          'Sets the text color of an element.',
            description:    'Accepts any valid CSS color value. The chosen color is inherited ' +
                            'by child elements unless they override it.',
            inputs: [
                {
                    label: 'Named Colors',
                    detail: 'Standard names like "red", "blue", or "orange".'
                },
                {
                    label: 'Hex',
                    detail: 'Six-digit code (#RRGGBB) for red, green, and blue.'
                },
                {
                    label: 'RGB / RGBA',
                    detail: 'Red, green, blue (0–255). RGBA adds transparency (0–1).'
                },
                {
                    label: 'HSL / HSLA',
                    detail: 'Hue (0–360), saturation and lightness (%). HSLA adds alpha.'
                },
                {
                    label: 'currentColor',
                    detail: 'Uses the parent element text color.'
                }
            ],
            examples: [
                { label: 'Named',         code: 'color: red;',                        previewType: 'textColor' },
                { label: 'Hex',           code: 'color: #ffa500;',                  previewType: 'textColor' },
                { label: 'RGB',           code: 'color: rgb(223, 223, 21);',         previewType: 'textColor' },
                { label: 'RGBA',          code: 'color: rgba(20, 161, 74, 0.6);',   previewType: 'textColor' },
                { label: 'HSL',           code: 'color: hsl(239, 60.00%, 50.00%);', previewType: 'textColor' },
                { label: 'currentColor',  code: 'color: currentColor;',               previewType: 'textColor' }
              ]              
        },
        { //    DIRECTION.
            id: 'direction',
            title: 'direction',
            brief: 'Defines the base text direction for block-level content.',
            description:
              'The direction property sets the direction in which text and other content flows. This is especially important for supporting languages written right-to-left (RTL), like Arabic or Hebrew.',
            inputs: [
              {
                label: 'ltr',
                detail: 'Left-to-right text direction (default for most Western languages).'
              },
              {
                label: 'rtl',
                detail: 'Right-to-left text direction (used for Arabic, Hebrew, etc).'
              },
              {
                label: 'inherit',
                detail: 'Inherits the direction value from the parent element.'
              }
            ],
            examples: [
              {
                label: 'Left-to-Right',
                code: 'direction: ltr;',
                previewType: 'direction'
              },
              {
                label: 'Right-to-Left',
                code: 'direction: rtl;',
                previewType: 'direction'
              },
              {
                label: 'Inherited',
                code: 'direction: inherit;',
                previewType: 'direction'
              }
            ]
        },          
        { //    FONT FAMILY.
            id: 'font-family',
            title: 'font-family',
            brief: 'Sets the typeface used to display text.',
            description:
              'Defines the prioritized list of font names used to display text. If the first font is not available, the browser tries the next one.',
            inputs: [
              {
                label: 'Generic Families',
                detail: '"serif", "sans-serif", "monospace", "cursive", "fantasy", "system-ui"'
              },
              {
                label: 'Font Stacks',
                detail: 'Comma-separated list of specific fonts and a fallback: "Roboto, sans-serif"'
              },
              {
                label: 'Web-Safe Fonts',
                detail: 'Standard fonts like "Arial", "Georgia", or "Courier New" available on most systems.'
              },
              {
                label: 'Custom Fonts',
                detail: 'Fonts imported via @font-face or services like Google Fonts.'
              }
            ],
            examples: [
              { label: 'Serif', code: 'font-family: Georgia, serif;', previewType: 'fontFamily' },
              { label: 'Sans-Serif', code: 'font-family: Arial, sans-serif;', previewType: 'fontFamily' },
              { label: 'Monospace', code: 'font-family: "Courier New", monospace;', previewType: 'fontFamily' },
              { label: 'System UI', code: 'font-family: system-ui, sans-serif;', previewType: 'fontFamily' },
              { label: 'Google Font', code: 'font-family: "Roboto", sans-serif;', previewType: 'fontFamily' }
            ]
        },
        { //    FONT SIZE.
            id: 'font-size',
            title: 'font-size',
            brief: 'Sets the size of the text content.',
            description:
              'Specifies the size of the font. Can be set using keywords, fixed units (px, pt), or relative units (em, rem, %, vw).',
            inputs: [
              {
                label: 'Named Sizes',
                detail: 'Keywords like "small", "medium", "large", "x-large"'
              },
              {
                label: 'Pixels',
                detail: 'Fixed size like "16px", "24px", "32px" — not responsive'
              },
              {
                label: 'Relative Units (em/rem)',
                detail: '"1em" = size of parent; "1rem" = size of root element'
              },
              {
                label: 'Percentages',
                detail: 'Relative to parent: "150%" = 1.5× parent font size'
              },
              {
                label: 'Viewport Units',
                detail: '"2vw" = 2% of viewport width; useful for responsive type'
              }
            ],
            examples: [
              { label: 'Named', code: 'font-size: large;', previewType: 'fontSize' },
              { label: 'Pixels', code: 'font-size: 24px;', previewType: 'fontSize' },
              { label: 'Rem', code: 'font-size: 1.5rem;', previewType: 'fontSize' },
              { label: 'Percent', code: 'font-size: 125%;', previewType: 'fontSize' },
              { label: 'Viewport', code: 'font-size: 1.5vw;', previewType: 'fontSize' }
            ]
        },
        { //    FONT STYLE.
            id: 'font-style',
            title: 'font-style',
            brief: 'Specifies the style of the font — normal, italic, or oblique.',
            description:
              'Controls the appearance of the font posture. Commonly used for emphasizing text or setting a slanted style. Most fonts support normal and italic, while oblique is a skewed version of the font.',
            inputs: [
              {
                label: 'Normal',
                detail: 'Default font style: upright and unmodified.'
              },
              {
                label: 'Italic',
                detail: 'Designed italic version of the font (when available).'
              },
              {
                label: 'Oblique',
                detail: 'Artificially slanted version of the font if italic is not available.'
              },
              {
                label: 'Initial / Inherit',
                detail: '"initial" resets to default. "inherit" takes style from parent.'
              }
            ],
            examples: [
              { label: 'Normal', code: 'font-style: normal;', previewType: 'fontStyle' },
              { label: 'Italic', code: 'font-style: italic;', previewType: 'fontStyle' },
              { label: 'Oblique', code: 'font-style: oblique;', previewType: 'fontStyle' },
              { label: 'Inherit', code: 'font-style: inherit;', previewType: 'fontStyle' }
            ]
        },
        { //    FONT WEIGHT.
            id: 'font-weight',
            title: 'font-weight',
            brief: 'Defines the thickness or boldness of the font.',
            description:
              'Specifies how thick or thin characters should appear. Can be set using keywords or numeric values from 100 to 900 (in increments of 100). Not all fonts support all weights.',
            inputs: [
              {
                label: 'Keyword Values',
                detail: '"normal", "bold", "lighter", "bolder" — relative or preset values'
              },
              {
                label: 'Numeric Weights',
                detail: '100 (thin) to 900 (extra bold); 400 is "normal", 700 is "bold"'
              },
              {
                label: 'Font-Specific Ranges',
                detail: 'Some variable fonts support fine-grained weights like 250 or 615'
              },
              {
                label: 'Inherited Values',
                detail: 'Can inherit weight from parent using "inherit"'
              }
            ],
            examples: [
              { label: 'Normal', code: 'font-weight: normal;', previewType: 'fontWeight' },
              { label: 'Bold', code: 'font-weight: bold;', previewType: 'fontWeight' },
              { label: 'Thin (100)', code: 'font-weight: 100;', previewType: 'fontWeight' },
              { label: 'Medium (500)', code: 'font-weight: 500;', previewType: 'fontWeight' },
              { label: 'Extra Bold (800)', code: 'font-weight: 800;', previewType: 'fontWeight' }
            ]
        },
        { //    LETTER SPACING.
            id: 'letter-spacing',
            title: 'letter-spacing',
            brief: 'Controls the spacing between characters in text.',
            description:
              'Adjusts the horizontal space between letters. Can be used for stylistic effects, to improve legibility, or to fine-tune typography. Accepts values in fixed or relative units.',
            inputs: [
              {
                label: 'Normal',
                detail: 'Default spacing defined by the font.'
              },
              {
                label: 'Pixels / Em Units',
                detail: 'e.g., "1px", "0.1em", "-0.05em" for tighter or wider spacing'
              },
              {
                label: 'Negative Spacing',
                detail: 'Reduces space between characters: "letter-spacing: -1px;"'
              },
              {
                label: 'Inherit / Initial',
                detail: '"inherit" takes from parent, "initial" resets to default'
              }
            ],
            examples: [
              { label: 'Normal', code: 'letter-spacing: normal;', previewType: 'letterSpacing' },
              { label: 'Wide', code: 'letter-spacing: 2px;', previewType: 'letterSpacing' },
              { label: 'Tighter', code: 'letter-spacing: -0.5px;', previewType: 'letterSpacing' },
              { label: 'Em Units', code: 'letter-spacing: 0.15em;', previewType: 'letterSpacing' }
            ]
        },
        { //    LINE HEIGHT.
            id: 'line-height',
            title: 'line-height',
            brief: 'Controls the vertical spacing between lines of text.',
            description:
                'The line-height property sets the amount of space between lines of text. It can be a number, length, or percentage. A larger value increases spacing, improving readability.',
            inputs: [
                {
                    label: 'Unitless Number',
                    detail: 'Relative multiplier of the element font size (e.g., 1.5 means 150% of the font size).'
                },
                {
                    label: 'Length',
                    detail: 'Explicit value in px, em, rem, etc. (e.g., 24px).'
                },
                {
                    label: 'Percentage',
                    detail: 'Percentage of the font size (e.g., 150%).'
                },
                {
                    label: 'Normal',
                    detail: 'Browser default value, typically around 1.2.'
                }
            ],
            examples: [
                {
                    label: 'Unitless',
                    code: 'line-height: 1.6;',
                    previewType: 'lineHeight'
                },
                {
                    label: 'Pixels',
                    code: 'line-height: 24px;',
                    previewType: 'lineHeight'
                },
                {
                    label: 'Percentage',
                    code: 'line-height: 150%;',
                    previewType: 'lineHeight'
                },
                {
                    label: 'Normal',
                    code: 'line-height: normal;',
                    previewType: 'lineHeight'
                }
            ]
        },
        { //    TEXT ALIGN.
            id: 'text-align',
            title: 'text-align',
            brief: 'Sets the horizontal alignment of inline content within a block element.',
            description:
              'The text-align property determines how text is aligned within its container. Common values include left, right, center, and justify. It is most often used for paragraphs, headings, and other block-level elements.',
            inputs: [
              {
                label: 'Left',
                detail: 'Aligns text to the left edge of the container (default in LTR languages).'
              },
              {
                label: 'Center',
                detail: 'Centers the text horizontally within its container.'
              },
              {
                label: 'Right',
                detail: 'Aligns text to the right edge of the container.'
              },
              {
                label: 'Justify',
                detail: 'Stretches text so that each line has equal width, adjusting spacing between words.'
              },
              {
                label: 'Start / End',
                detail: 'Aligns text to the logical start/end of the text (useful for RTL languages).'
              }
            ],
            examples: [
              {
                label: 'Left',
                code: 'text-align: left;',
                previewType: 'textAlign'
              },
              {
                label: 'Center',
                code: 'text-align: center;',
                previewType: 'textAlign'
              },
              {
                label: 'Right',
                code: 'text-align: right;',
                previewType: 'textAlign'
              },
              {
                label: 'Justify',
                code: 'text-align: justify;',
                previewType: 'textAlign'
              }
            ]
        },
        { //    TEXT DECORATION.
            id: 'text-decoration',
            title: 'text-decoration',
            brief: 'Applies decorative styles to text such as underlines or strikethroughs.',
            description:
              'The text-decoration property allows you to underline, overline, strikethrough, or remove decoration from text. It is commonly used for links and emphasized content.',
            inputs: [
              {
                label: 'Underline',
                detail: 'Adds a line beneath the text.'
              },
              {
                label: 'Overline',
                detail: 'Adds a line above the text.'
              },
              {
                label: 'Line-through',
                detail: 'Draws a line through the middle of the text.'
              },
              {
                label: 'None',
                detail: 'Removes all text decorations (often used to remove default link styling).'
              },
              {
                label: 'Multiple Values',
                detail: 'Can combine styles, like "underline overline".'
              }
            ],
            examples: [
              {
                label: 'Underline',
                code: 'text-decoration: underline;',
                previewType: 'textDecoration'
              },
              {
                label: 'Overline',
                code: 'text-decoration: overline;',
                previewType: 'textDecoration'
              },
              {
                label: 'Line-through',
                code: 'text-decoration: line-through;',
                previewType: 'textDecoration'
              },
              {
                label: 'None',
                code: 'text-decoration: none;',
                previewType: 'textDecoration'
              },
              {
                label: 'Multiple',
                code: 'text-decoration: underline overline;',
                previewType: 'textDecoration'
              }
            ]
        },
        { //    TEXT INDENT.
            id: 'text-indent',
            title: 'text-indent',
            brief: 'Indents the first line of a block of text.',
            description:
              'The text-indent property sets the amount of horizontal space before the first line of text in a block element. It is commonly used in articles, essays, and editorial layouts.',
            inputs: [
              {
                label: 'Length',
                detail: 'Defines the indent size using units like px, em, %, etc. (e.g., 2em, 20px).'
              },
              {
                label: 'Negative Value',
                detail: 'Pulls the first line to the left of the container (e.g., -2em).'
              },
              {
                label: 'Percent',
                detail: 'Indents based on the element width (e.g., 10%).'
              },
              {
                label: 'Zero',
                detail: 'No indentation. Resets the value.'
              }
            ],
            examples: [
              {
                label: '2em',
                code: 'text-indent: 2em;',
                previewType: 'textIndent'
              },
              {
                label: '20px',
                code: 'text-indent: 20px;',
                previewType: 'textIndent'
              },
              {
                label: '-2em',
                code: 'text-indent: -2em;',
                previewType: 'textIndent'
              },
              {
                label: '10%',
                code: 'text-indent: 10%;',
                previewType: 'textIndent'
              },
              {
                label: '0',
                code: 'text-indent: 0;',
                previewType: 'textIndent'
              }
            ]
        },          
        { //    TEXT TRANSFORM.
            id: 'text-transform',
            title: 'text-transform',
            brief: 'Controls the capitalization style of text.',
            description:
              'The text-transform property changes the casing of text content. It can convert text to all uppercase, lowercase, or capitalize the first letter of each word.',
            inputs: [
              {
                label: 'None',
                detail: 'Leaves the text unchanged.'
              },
              {
                label: 'Uppercase',
                detail: 'Converts all characters to uppercase.'
              },
              {
                label: 'Lowercase',
                detail: 'Converts all characters to lowercase.'
              },
              {
                label: 'Capitalize',
                detail: 'Capitalizes the first letter of each word.'
              },
              {
                label: 'Full-width',
                detail: '(Rare) Converts characters to their full-width forms (mostly used in East Asian typography).'
              }
            ],
            examples: [
              {
                label: 'None',
                code: 'text-transform: none;',
                previewType: 'textTransform'
              },
              {
                label: 'Uppercase',
                code: 'text-transform: uppercase;',
                previewType: 'textTransform'
              },
              {
                label: 'Lowercase',
                code: 'text-transform: lowercase;',
                previewType: 'textTransform'
              },
              {
                label: 'Capitalize',
                code: 'text-transform: capitalize;',
                previewType: 'textTransform'
              }
            ]
        },
        { //    TEXT SHADOW.
            id: 'text-shadow',
            title: 'text-shadow',
            brief: 'Adds shadow effects to text.',
            description:
              'The text-shadow property applies one or more shadow effects to text. It can be used for subtle contrast, glowing effects, or dramatic UI styling. It accepts values for horizontal offset, vertical offset, blur radius, and color.',
            inputs: [
              {
                label: 'Offset & Blur',
                detail: 'Format: `horizontal vertical blur color`. Example: `2px 2px 4px rgba(0,0,0,0.3)`.'
              },
              {
                label: 'Multiple Shadows',
                detail: 'You can apply multiple shadows separated by commas.'
              },
              {
                label: 'Color-Only Glow',
                detail: 'Set blur only (e.g., `0 0 8px red`) to create glow effects.'
              }
            ],
            examples: [
              {
                label: 'Subtle Shadow',
                code: 'text-shadow: 2px 2px 4px rgba(0,0,0,0.3);',
                previewType: 'textShadow'
              },
              {
                label: 'Glow',
                code: 'text-shadow: 0 0 8px #00f;',
                previewType: 'textShadow'
              },
              {
                label: 'Hard Shadow',
                code: 'text-shadow: 3px 3px 0 #333;',
                previewType: 'textShadow'
              },
              {
                label: 'Multiple Shadows',
                code: 'text-shadow: 1px 1px 2px black, 0 0 1em red;',
                previewType: 'textShadow'
              }
            ]
        },  
        { //    VERTICAL ALIGN.
            id: 'vertical-align',
            title: 'vertical-align',
            brief: 'Controls the vertical positioning of inline elements.',
            description:
              'The vertical-align property adjusts the position of inline or inline-block elements relative to the baseline of the parent element. It is commonly used to align text with icons, images, superscripts, and subscripts.',
            inputs: [
              {
                label: 'baseline',
                detail: 'Aligns the element with the baseline of the parent (default).'
              },
              {
                label: 'middle',
                detail: 'Aligns the middle of the element with the middle of the parent line height.'
              },
              {
                label: 'top / bottom',
                detail: 'Aligns the top or bottom of the element with the line box.'
              },
              {
                label: 'text-top / text-bottom',
                detail: 'Aligns the element with the top/bottom of the parent text.'
              },
              {
                label: 'length / percentage',
                detail: 'Moves the element up or down by a fixed length or percentage.'
              }
            ],
            examples: [
              {
                label: 'baseline',
                code: 'vertical-align: baseline;',
                previewType: 'verticalAlign'
              },
              {
                label: 'middle',
                code: 'vertical-align: middle;',
                previewType: 'verticalAlign'
              },
              {
                label: 'top',
                code: 'vertical-align: top;',
                previewType: 'verticalAlign'
              },
              {
                label: 'bottom',
                code: 'vertical-align: bottom;',
                previewType: 'verticalAlign'
              },
              {
                label: 'text-top',
                code: 'vertical-align: text-top;',
                previewType: 'verticalAlign'
              },
              {
                label: 'text-bottom',
                code: 'vertical-align: text-bottom;',
                previewType: 'verticalAlign'
              }
            ]
        },
        { //    WHITE SPACE.
            id: 'white-space',
            title: 'white-space',
            brief: 'Controls how white space inside an element is handled.',
            description:
              'The white-space property controls whether and how spaces, tabs, and line breaks are rendered. It is useful for preserving formatting or controlling wrapping behavior.',
            inputs: [
              {
                label: 'normal',
                detail: 'Collapses whitespace and wraps lines as needed.'
              },
              {
                label: 'nowrap',
                detail: 'Collapses whitespace but prevents line wrapping.'
              },
              {
                label: 'pre',
                detail: 'Preserves whitespace and line breaks; behaves like <pre>.'
              },
              {
                label: 'pre-wrap',
                detail: 'Preserves whitespace and wraps lines as needed.'
              },
              {
                label: 'pre-line',
                detail: 'Collapses whitespace but preserves line breaks.'
              }
            ],
            examples: [
              {
                label: 'normal',
                code: 'white-space: normal;',
                previewType: 'whiteSpace'
              },
              {
                label: 'nowrap',
                code: 'white-space: nowrap;',
                previewType: 'whiteSpace'
              },
              {
                label: 'pre',
                code: 'white-space: pre;',
                previewType: 'whiteSpace'
              },
              {
                label: 'pre-wrap',
                code: 'white-space: pre-wrap;',
                previewType: 'whiteSpace'
              },
              {
                label: 'pre-line',
                code: 'white-space: pre-line;',
                previewType: 'whiteSpace'
              }
            ]
        },
        { //    WORD SPACING.
            id: 'word-spacing',
            title: 'word-spacing',
            brief: 'Adjusts the spacing between words in text.',
            description:
              'The word-spacing property sets the horizontal space between words. It can help improve legibility or create visual rhythm. Values can be in px, em, rem, or other length units.',
            inputs: [
              {
                label: 'Normal',
                detail: 'Default spacing defined by the browser or font.'
              },
              {
                label: 'Length',
                detail: 'Explicit space added between words (e.g., 8px, 0.5em).'
              },
              {
                label: 'Negative Values',
                detail: 'Decreases the space between words (e.g., -4px). Use with caution.'
              }
            ],
            examples: [
              {
                label: 'Normal',
                code: 'word-spacing: normal;',
                previewType: 'wordSpacing'
              },
              {
                label: 'Wide (8px)',
                code: 'word-spacing: 8px;',
                previewType: 'wordSpacing'
              },
              {
                label: 'Tight (-4px)',
                code: 'word-spacing: -4px;',
                previewType: 'wordSpacing'
              },
              {
                label: 'Loose (1em)',
                code: 'word-spacing: 1em;',
                previewType: 'wordSpacing'
              }
            ]
        }       
    ],
    visuals: [
        { //    BACKGROUND COLOR.
            id:             'background-color',
            title:          'background-color',
            brief:          'Sets the background color of an element.',
            description:    'Accepts any valid CSS color value. It applies color behind the content, padding, and border of the element.',
            inputs: [
                {
                    label: 'Named Colors',
                    detail: 'Standard names like "red", "blue", or "orange".'
                },
                {
                    label: 'Hex',
                    detail: 'Six-digit code (#RRGGBB) for red, green, and blue.'
                },
                {
                    label: 'RGB / RGBA',
                    detail: 'Red, green, blue (0–255). RGBA adds transparency (0–1).'
                },
                {
                    label: 'HSL / HSLA',
                    detail: 'Hue (0–360), saturation and lightness (%). HSLA adds alpha.'
                },
                {
                    label: 'Transparent',
                    detail: 'Background is completely see through.'
                }
            ],
            examples: [
                { label: 'Named',        code: 'background-color: pink;',                            previewType: 'background' },
                { label: 'Hex',          code: 'background-color:rgb(176, 62, 241);',              previewType: 'background' },
                { label: 'RGB',          code: 'background-color: rgb(114, 191, 216);',            previewType: 'background' },
                { label: 'RGBA',         code: 'background-color: rgba(83, 221, 152, 0.15);',      previewType: 'background' },
                { label: 'HSL',          code: 'background-color: hsl(66, 54.30%, 63.10%);',       previewType: 'background' },
                { label: 'Transparent',  code: 'background-color: transparent;',                     previewType: 'background' }
              ]
        },
        { //    BACKGROUND IMAGE.
            id: 'background-image',
            title: 'background-image',
            brief: 'Sets an image, gradient, or pattern as the background of an element.',
            description:
              'Accepts a URL, gradient, or even multiple layers to set the background of an element. Useful for adding images, visual depth, or stylistic gradients behind content.',
            inputs: [
              { label: 'Image URL', detail: 'Sets a background image using a file path or external link' },
              { label: 'None', detail: 'Removes any background image from the element' },
              { label: 'Linear Gradient', detail: 'Applies a smooth directional color transition (top → bottom, left → right, etc.)' },
              { label: 'Radial Gradient', detail: 'Creates circular or elliptical color gradients from a center point' },
              { label: 'Multiple Layers', detail: 'Allows stacking multiple images or gradients on top of each other' }
            ],
            examples: [
              {
                label: 'Image',
                code: `background-image: url("${importantImg}");`,
                previewType: 'backgroundImage'
              },
              {
                label: 'None',
                code: 'background-image: none;',
                previewType: 'background'
              },
              {
                label: 'Linear Gradient',
                code: 'background-image: linear-gradient(to right, #ff8a00, #e52e71);',
                previewType: 'backgroundImageGrad'
              },
              {
                label: 'Radial Gradient',
                code: 'background-image: radial-gradient(circle, #00f260, #0575e6);',
                previewType: 'backgroundImageGrad'
              },
              {
                label: 'Multiple Images',
                code: `background-image: url("${importantImg}"), url("${moreImportantImg}");`,
                previewType: 'backgroundImageMulti'
              },
            ]
        },  
        { //    BACKGROUND REPEAT.
          id: 'background-repeat',
          title: 'background-repeat',
          brief: 'Controls if/how a background image is repeated.',
          description: 'Allows repeating a background image along the x-axis, y-axis, both, or not at all. Useful for creating patterns or preventing image tiling.',
          inputs: [
              { label: 'repeat', detail: 'Repeats the image both horizontally and vertically.' },
              { label: 'repeat-x', detail: 'Repeats the image horizontally only.' },
              { label: 'repeat-y', detail: 'Repeats the image vertically only.' },
              { label: 'no-repeat', detail: 'Shows the image once, no repeating.' },
              { label: 'space / round', detail: 'Distributes or scales images to fit.' }
          ],
          examples: [
              {
                  label: 'Repeat',
                  code: 'background-repeat: repeat;',
                  previewType: 'backgroundRepeat'
              },
              {
                  label: 'Repeat-X',
                  code: 'background-repeat: repeat-x;',
                  previewType: 'backgroundRepeat'
              },
              {
                  label: 'Repeat-Y',
                  code: 'background-repeat: repeat-y;',
                  previewType: 'backgroundRepeat'
              },
              {
                  label: 'No Repeat',
                  code: 'background-repeat: no-repeat;',
                  previewType: 'backgroundRepeat'
              },
              {
                  label: 'Round',
                  code: 'background-repeat: round;',
                  previewType: 'backgroundRepeat'
              },
              {
                  label: 'Space',
                  code: 'background-repeat: space;',
                  previewType: 'backgroundRepeat'
              }
          ]
        },
        { //    BACKGROUND SIZE.
          id: 'background-size',
          title: 'background-size',
          brief: 'Defines the size of the background image.',
          description: 'Controls how a background image is scaled within an element. Useful for making backgrounds fit, cover, or repeat in specific ways.',
          inputs: [
              { label: 'Cover', detail: 'Scales image to cover the element entirely. May crop.' },
              { label: 'Contain', detail: 'Scales image to fit within the element. No cropping.' },
              { label: 'Auto', detail: 'Keeps image at its original size.' },
              { label: 'Exact Pixels', detail: 'E.g. background-size: 100px 50px;' },
              { label: 'Percentages', detail: 'E.g. background-size: 50% 100%;' }
          ],
          examples: [
              {
                  label: 'Cover',
                  code: 'background-size: cover;',
                  previewType: 'backgroundSize'
              },
              {
                  label: 'Contain',
                  code: 'background-size: contain;',
                  previewType: 'backgroundSize'
              },
              {
                  label: 'Auto',
                  code: 'background-size: auto;',
                  previewType: 'backgroundSize'
              },
              {
                  label: 'Fixed Pixels',
                  code: 'background-size: 120px 80px;',
                  previewType: 'backgroundSize'
              },
              {
                  label: 'Percentages',
                  code: 'background-size: 50% 100%;',
                  previewType: 'backgroundSize'
              }
          ]
        },
        { //    BORDER.
          id: 'border',
          title: 'border',
          brief: 'Adds a border around an element.',
          description: 'Defines the width, style, and color of an element border. Useful for visual boundaries, button outlines, cards, or highlighting elements.',
          inputs: [
            { label: 'Full Syntax', detail: 'Specifies width, style, and color — e.g. `2px solid black`' },
            { label: 'No Border', detail: 'Removes any border from the element' },
            { label: 'Dotted / Dashed', detail: 'Displays a dotted or dashed border style' },
            { label: 'Double', detail: 'Applies a double-line border effect' },
            { label: 'Individual Sides', detail: 'Can target each side — e.g. `border-top`, `border-left`' }
          ],
          examples: [
            { label: 'Solid', code: 'border: 2px solid black;', previewType: 'border' },
            { label: 'Dashed', code: 'border: 2px dashed crimson;', previewType: 'border' },
            { label: 'Double', code: 'border: 4px double dodgerblue;', previewType: 'border' },
            { label: 'None', code: 'border: none;', previewType: 'border' }
          ]
        },
        { //    BORDER RADIUS.
          id: 'border-radius',
          title: 'border-radius',
          brief: 'Rounds the corners of an element outer border edge.',
          description: 'Controls how much rounding is applied to the corners of an element. You can specify a single value for all corners or use up to four values to target each corner individually.',
          inputs: [
            { label: 'Pixels', detail: 'Defines curve size using fixed units like px (e.g. 8px, 20px).' },
            { label: 'Percentages', detail: 'Creates round or elliptical shapes based on element size (e.g. 50%).' },
            { label: 'Multiple Values', detail: 'Set individual corner radii (top-left → bottom-left).' },
            { label: 'Shorthand', detail: 'One value applies to all four corners equally.' },
            { label: 'Elliptical', detail: 'Combines horizontal and vertical radii (e.g. 50% / 25%) for ovals.' }
          ],          
          examples: [
            {
              label: 'Rounded Box',
              code: 'border-radius: 12px;',
              previewType: 'borderRadius'
            },
            {
              label: 'Circle',
              code: 'border-radius: 50%;',
              previewType: 'borderRadius'
            },
            {
              label: 'Different Corners',
              code: 'border-radius: 8px 16px 0 4px;',
              previewType: 'borderRadius'
            },
            {
              label: 'Elliptical',
              code: 'border-radius: 50% / 25%;',
              previewType: 'borderRadius'
            }
          ]
        },
        { //    BOX-SHADOW.
          id: 'box-shadow',
          title: 'box-shadow',
          brief: 'Adds shadow effects around an element frame.',
          description: 'Defines horizontal and vertical offsets, blur radius, spread, and shadow color. Can be used to simulate depth, elevation, or highlight focus states.',
          inputs: [
            { label: 'Offset + Blur', detail: 'Adds shadow with horizontal/vertical offset and soft blur (x, y, blur, color).' },
            { label: 'Spread Radius', detail: 'Expands the size of the shadow beyond its blur.' },
            { label: 'Inset', detail: 'Applies the shadow inside the element, giving a pressed look.' },
            { label: 'Multiple Shadows', detail: 'Allows stacking of multiple shadows for depth or glow effects.' },
            { label: 'None', detail: 'Removes any applied shadows.' }
          ],
          examples: [
            {
              label: 'Soft Shadow',
              code: 'box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2);',
              previewType: 'boxShadow'
            },
            {
              label: 'Spread Shadow',
              code: 'box-shadow: 0 0 10px 4px rgba(255, 0, 255, 0.5);',
              previewType: 'boxShadow'
            },
            {
              label: 'Inset Shadow',
              code: 'box-shadow: inset 2px 2px 4px rgba(0,0,0,0.3);',
              previewType: 'boxShadow'
            },
            {
              label: 'Multiple Shadows',
              code: 'box-shadow: 2px 2px 6px black, -2px -2px 6px lightgray;',
              previewType: 'boxShadow'
            },
            {
              label: 'None',
              code: 'box-shadow: none;',
              previewType: 'boxShadow'
            }
          ]
        },
        { //    FILTER.
          id: 'filter',
          title: 'filter',
          brief: 'Applies graphical effects like blur, brightness, contrast, and more to an element.',
          description: 'The `filter` property lets you apply visual effects to elements, including images, text, or containers. You can chain multiple filters together.',
          inputs: [
            { label: 'Blur', detail: 'Softens the element with a visual blur.' },
            { label: 'Brightness', detail: 'Makes the element lighter or darker.' },
            { label: 'Contrast', detail: 'Increases or decreases visual contrast.' },
            { label: 'Grayscale', detail: 'Removes color, turning it black & white.' },
            { label: 'Saturate', detail: 'Boosts or fades the intensity of colors.' },
            { label: 'Drop Shadow', detail: 'Adds a shadow behind the element.' },
            { label: 'Multiple Filters', detail: 'Combines multiple visual effects.' },
            { label: 'None', detail: 'Removes all applied filters.' }
          ],      
          examples: [
            {
              label: 'Blur',
              code: 'filter: blur(4px);',
              previewType: 'filter'
            },
            {
              label: 'Brightness',
              code: 'filter: brightness(1.5);',
              previewType: 'filter'
            },
            {
              label: 'Contrast',
              code: 'filter: contrast(200%);',
              previewType: 'filter'
            },
            {
              label: 'Grayscale',
              code: 'filter: grayscale(100%);',
              previewType: 'filter'
            },
            {
              label: 'Drop Shadow',
              code: 'filter: drop-shadow(4px 4px 6px black);',
              previewType: 'filter'
            },
            {
              label: 'Combined',
              code: 'filter: grayscale(60%) brightness(1.2);',
              previewType: 'filter'
            }
          ]
        },        
        { //    OPACITY.
          id: 'opacity',
          title: 'opacity',
          brief: 'Controls the transparency level of an element.',
          description: 'A value between 0 and 1 where 0 is fully transparent and 1 is fully opaque. Useful for layering effects, hover fades, and visual hierarchy.',
          inputs: [
              { label: '0 (Transparent)', detail: 'Element is fully invisible.' },
              { label: '0.5 (Semi)', detail: 'Element is 50% transparent.' },
              { label: '1 (Opaque)', detail: 'Element is fully visible.' },
              { label: 'Custom', detail: 'Any decimal value between 0 and 1.' }
          ],
          examples: [
              { label: 'Transparent', code: 'opacity: 0;', previewType: 'opacity' },
              { label: 'Semi Transparent', code: 'opacity: 0.5;', previewType: 'opacity' },
              { label: 'Opaque', code: 'opacity: 1;', previewType: 'opacity' },
              { label: 'Custom (0.25)', code: 'opacity: 0.25;', previewType: 'opacity' },
          ]
        },
        { //    MIX-BLEND-MODE.
          id: 'mix-blend-mode',
          title: 'mix-blend-mode',
          brief: 'Sets how an element content blends with the content beneath it.',
          description: 'The `mix-blend-mode` property determines how an element content blends with the background or other overlapping elements using blend modes like multiply, screen, overlay, and more.',
          inputs: [
            { label: 'Normal', detail: 'Displays the element as is, no blending with background.' },
            { label: 'Multiply', detail: 'Combines colors to make overlapping areas darker.' },
            { label: 'Screen', detail: 'Lightens overlapping colors for a soft glow effect.' },
            { label: 'Overlay', detail: 'Blends multiply and screen — preserves highlights and shadows.' },
            { label: 'Difference', detail: 'Subtracts colors to create a high-contrast inverted look.' },
            { label: 'Exclusion', detail: 'Similar to difference but with lower contrast.' },
            { label: 'Lighten', detail: 'Shows the lighter color at each overlapping pixel.' },
            { label: 'Darken', detail: 'Shows the darker color at each overlapping pixel.' }
          ],          
          examples: [
            { label: 'Normal', code: 'mix-blend-mode: normal;', previewType: 'blendMode' },
            { label: 'Multiply', code: 'mix-blend-mode: multiply;', previewType: 'blendMode' },
            { label: 'Screen', code: 'mix-blend-mode: screen;', previewType: 'blendMode' },
            { label: 'Overlay', code: 'mix-blend-mode: overlay;', previewType: 'blendMode' },
            { label: 'Difference', code: 'mix-blend-mode: difference;', previewType: 'blendMode' },
            { label: 'Exclusion', code: 'mix-blend-mode: exclusion;', previewType: 'blendMode' }
          ]
        }
        
      
    ],
    boxModel: [
        { //    ASPECT-RATIO.
          id: 'aspect-ratio',
          title: 'aspect-ratio',
          brief: 'Maintains a consistent width-to-height ratio for an element.',
          description: 'Sets the preferred aspect ratio for an element, which is used in the calculation of auto sizes. Useful for responsive images, videos, and maintaining proportional layouts.',
          inputs: [
            { label: 'Ratio Values', detail: 'Width-to-height ratio like 16/9, 4/3, or 1/1 for common aspect ratios.' },
            { label: 'Decimal Values', detail: 'Single number like 1.5 (equivalent to 3/2) for custom ratios.' },
            { label: 'Auto', detail: 'Uses the natural aspect ratio of the content (default).' },
            { label: 'Square Ratios', detail: 'Use 1 or 1/1 for perfect squares.' }
          ],
          examples: [
            { label: 'Widescreen', code: 'aspect-ratio: 16/9;', previewType: 'aspectRatio' },
            { label: 'Square', code: 'aspect-ratio: 1;', previewType: 'aspectRatio' },
            { label: 'Portrait', code: 'aspect-ratio: 3/4;', previewType: 'aspectRatio' },
            { label: 'Auto', code: 'aspect-ratio: auto;', previewType: 'aspectRatio' }
          ]
        },
        { //    BOX-SIZING.
          id: 'box-sizing',
          title: 'box-sizing',
          brief: 'Defines how the width and height of an element are calculated.',
          description: 'Controls whether padding and border are included in the element total width and height. Border-box includes them, content-box excludes them. Essential for predictable layouts.',
          inputs: [
            { label: 'Content-box', detail: 'Width and height only apply to content. Padding and border add to total size (default).' },
            { label: 'Border-box', detail: 'Width and height include content, padding, and border. Total size stays fixed.' },
            { label: 'Initial', detail: 'Resets to the default value (content-box).' },
            { label: 'Inherit', detail: 'Takes the value from the parent element.' }
          ],
          examples: [
            { label: 'Content-box', code: 'box-sizing: content-box;', previewType: 'boxSizing' },
            { label: 'Border-box', code: 'box-sizing: border-box;', previewType: 'boxSizing' },
            { label: 'Initial', code: 'box-sizing: initial;', previewType: 'boxSizing' },
            { label: 'Inherit', code: 'box-sizing: inherit;', previewType: 'boxSizing' }
          ]
        },
        { //    HEIGHT.
          id: 'height',
          title: 'height',
          brief: 'Sets the vertical size of an element.',
          description: 'Controls how tall an element appears. It can be fixed, relative, or adapt to content or viewport height. Useful for layout structure, visual balance, or scrollable containers.',
          inputs: [
            { label: 'Pixels', detail: 'Fixed height — e.g. `height: 100px`' },
            { label: 'Percentages', detail: 'Relative to parent — e.g. `height: 75%`' },
            { label: 'Viewport Units', detail: '`vh` for screen-based sizing — e.g. `height: 100vh`' },
            { label: 'Auto', detail: 'Adjusts based on the element content.' },
            { label: 'Max-content / Min-content', detail: 'Grows or shrinks based on content size.' }
          ],
          examples: [
            { label: 'Pixels', code: 'height: 100px;', previewType: 'height' },
            { label: 'Percent', code: 'height: 75%;', previewType: 'height' },
            { label: 'Viewport Height', code: 'height: 20vh;', previewType: 'height' },
            { label: 'Auto', code: 'height: auto;', previewType: 'height' },
            { label: 'Min Content', code: 'height: min-content;', previewType: 'height' }
          ]
        },
        { //    MAX HEIGHT.
          id: 'max-height',
          title: 'max-height',
          brief: 'Limits how tall an element can grow.',
          description: 'Sets the maximum height an element is allowed to reach. Prevents overflowing or stretching too tall, especially when content is dynamic or wrapped.',
          inputs: [
            { label: 'Pixels', detail: 'Fixed maximum height using absolute units like px, pt, or cm.' },
            { label: 'Percentages', detail: 'Maximum height relative to the parent element\'s height.' },
            { label: 'Viewport Units', detail: 'Maximum height based on viewport dimensions (vh, vmax, vmin).' },
            { label: 'None', detail: 'Removes any height constraint, allowing unlimited growth.' }
          ],
          examples: [
            { label: '120px Limit', code: 'max-height: 120px;', previewType: 'maxHeight' },
            { label: '50% of Parent', code: 'max-height: 50%;', previewType: 'maxHeight' },
            { label: '60vh Screen Limit', code: 'max-height: 60vh;', previewType: 'maxHeight' },
            { label: 'None', code: 'max-height: none;', previewType: 'maxHeight' }
          ]
        },
        { //    MAX WIDTH.
          id: 'max-width',
          title: 'max-width',
          brief: 'Sets the maximum width an element can grow to.',
          description: 'Prevents elements from exceeding a certain width, even when the content or container grows. Commonly used to constrain layouts, cards, or text blocks for readability.',
          inputs: [
            { label: 'Pixels', detail: 'Fixed maximum width using absolute units like px, pt, or cm.' },
            { label: 'Percentages', detail: 'Maximum width relative to the parent element width.' },
            { label: 'None', detail: 'Removes width constraints, allowing unlimited horizontal growth.' },
            { label: 'Viewport Width', detail: 'Maximum width based on viewport dimensions (vw, vmax, vmin).' },
            { label: 'Content Fit', detail: 'Intrinsic sizing keywords like max-content, min-content, or fit-content.' },
          ],
          examples: [
            { label: '300px', code: 'max-width: 300px;', previewType: 'maxWidth' },
            { label: '80%', code: 'max-width: 80%;', previewType: 'maxWidth' },
            { label: 'None', code: 'max-width: none;', previewType: 'maxWidth' },
            { label: '90vw', code: 'max-width: 90vw;', previewType: 'maxWidth' },
            { label: 'max-content', code: 'max-width: max-content;', previewType: 'maxWidth' },
          ]
        },
        { //    MARGIN.
          id: 'margin',
          title: 'margin',
          brief: 'Sets the outer spacing around an element.',
          description: 'Controls the space outside an element border, pushing other elements away. Can be set for all sides at once or individually for top, right, bottom, and left.',
          inputs: [
            { label: 'Single Value', detail: 'Applies the same margin to all four sides (e.g., margin: 20px).' },
            { label: 'Two Values', detail: 'First for top/bottom, second for left/right (e.g., margin: 10px 20px).' },
            { label: 'Four Values', detail: 'Top, right, bottom, left in clockwise order (e.g., margin: 10px 15px 20px 5px).' },
            { label: 'Individual Sides', detail: 'Use margin-top, margin-right, margin-bottom, margin-left for specific sides.' },
            { label: 'Auto Centering', detail: 'Use "auto" for horizontal centering of block elements.' },
            { label: 'Negative Values', detail: 'Negative margins pull elements closer or create overlaps.' }
          ],
          examples: [
            { label: 'All Sides', code: 'margin: 20px;', previewType: 'margin' },
            { label: 'Vertical/Horizontal', code: 'margin: 10px 30px;', previewType: 'margin' },
            { label: 'Individual Sides', code: 'margin: 5px 10px 15px 20px;', previewType: 'margin' },
            { label: 'Auto Center', code: 'margin: 0 auto;', previewType: 'margin' },
            { label: 'Negative', code: 'margin: -10px;', previewType: 'margin' }
          ]
        },
        { //    MIN HEIGHT.
          id: 'min-height',
          title: 'min-height',
          brief: 'Sets the minimum height an element can shrink to.',
          description: 'Ensures an element does not shrink shorter than a set height, even when content or container size changes. Useful for maintaining layout structure and preventing elements from collapsing.',
          inputs: [
            { label: 'Pixels', detail: 'Fixed minimum height using absolute units like px, pt, or cm.' },
            { label: 'Percentages', detail: 'Minimum height relative to the parent element height.' },
            { label: 'Auto/None', detail: 'Allows natural shrinking based on content or removes constraints.' },
            { label: 'Content Sizing', detail: 'Intrinsic sizing keywords like min-content, max-content, or fit-content.' }
          ],
          examples: [
            { label: '100px', code: 'min-height: 100px;', previewType: 'minHeight' },
            { label: '50%', code: 'min-height: 50%;', previewType: 'minHeight' },
            { label: 'None', code: 'min-height: 0;', previewType: 'minHeight' }
          ]
        },
        { //    MIN WIDTH.
          id: 'min-width',
          title: 'min-width',
          brief: 'Sets the minimum width an element can shrink to.',
          description: 'Ensures an element does not shrink smaller than a set width, even when content or container size changes. Useful in responsive layouts to maintain readability or prevent squishing.',
          inputs: [
            { label: 'Pixels', detail: 'Fixed minimum width using absolute units like px, pt, or cm.' },
            { label: 'Percentages', detail: 'Minimum width relative to the parent element width.' },
            { label: 'Auto/None', detail: 'Allows natural shrinking based on content or removes constraints.' },
            { label: 'Content Sizing', detail: 'Intrinsic sizing keywords like min-content, max-content, or fit-content.' }
          ],
          examples: [
            { label: '150px', code: 'min-width: 150px;', previewType: 'minWidth' },
            { label: '60%', code: 'min-width: 60%;', previewType: 'minWidth' },
            { label: 'None', code: 'min-width: 0;', previewType: 'minWidth' }
          ]
        },
        { //    OVERFLOW.
          id: 'overflow',
          title: 'overflow',
          brief: 'Controls what happens when content exceeds the element boundaries.',
          description: 'Determines how content that overflows an element container is handled. Can clip content, add scrollbars, or let it overflow visibly.',
          inputs: [
            { label: 'Visible', detail: 'Content overflows and remains visible outside the container (default).' },
            { label: 'Hidden', detail: 'Content that overflows is clipped and hidden from view.' },
            { label: 'Scroll', detail: 'Adds scrollbars to allow viewing overflowing content.' },
            { label: 'Auto', detail: 'Adds scrollbars only when content actually overflows.' },
            { label: 'Clip', detail: 'Similar to hidden but forbids scrolling programmatically.' }
          ],
          examples: [
            { label: 'Visible', code: 'overflow: visible;', previewType: 'overflow' },
            { label: 'Hidden', code: 'overflow: hidden;', previewType: 'overflow' },
            { label: 'Scroll', code: 'overflow: scroll;', previewType: 'overflow' },
            { label: 'Auto', code: 'overflow: auto;', previewType: 'overflow' }
          ]
        },
        { //    PADDING.
          id: 'padding',
          title: 'padding',
          brief: 'Sets the inner spacing inside an element.',
          description: 'Controls the space inside an element border, between the border and the content. Can be set for all sides at once or individually for top, right, bottom, and left.',
          inputs: [
            { label: 'Single Value', detail: 'Applies the same padding to all four sides (e.g., padding: 20px).' },
            { label: 'Two Values', detail: 'First for top/bottom, second for left/right (e.g., padding: 10px 20px).' },
            { label: 'Four Values', detail: 'Top, right, bottom, left in clockwise order (e.g., padding: 10px 15px 20px 5px).' },
            { label: 'Individual Sides', detail: 'Use padding-top, padding-right, padding-bottom, padding-left for specific sides.' },
            { label: 'Percentages', detail: 'Relative to parent width (e.g., padding: 5%).' },
            { label: 'Zero Padding', detail: 'Removes all inner spacing (padding: 0).' }
          ],
          examples: [
            { label: 'All Sides', code: 'padding: 20px;', previewType: 'padding' },
            { label: 'Vertical/Horizontal', code: 'padding: 10px 30px;', previewType: 'padding' },
            { label: 'Individual Sides', code: 'padding: 5px 10px 15px 20px;', previewType: 'padding' },
            { label: 'None', code: 'padding: 0;', previewType: 'padding' },
            { label: 'Percentage', code: 'padding: 5%;', previewType: 'padding' }
          ]
        },
        { //    WIDTH.
          id: 'width',
          title: 'width',
          brief: 'Sets the horizontal size of an element.',
          description: 'Specifies how wide an element should be. Useful for layout control, responsive design, and constraining or expanding content horizontally.',
          inputs: [
            { label: 'Pixels', detail: 'Fixed size — e.g. `width: 200px`' },
            { label: 'Percentages', detail: 'Relative to parent — e.g. `width: 80%`' },
            { label: 'Viewport Units', detail: '`vw` for responsive scaling — e.g. `width: 50vw`' },
            { label: 'Auto', detail: 'Adjusts based on content or container rules.' },
            { label: 'Max-content / Min-content', detail: 'Sizes based on content limits.' }
          ],
          examples: [
            { label: 'Pixels', code: 'width: 200px;', previewType: 'width' },
            { label: 'Percent', code: 'width: 80%;', previewType: 'width' },
            { label: 'Viewport Width', code: 'width: 15vw;', previewType: 'width' },
            { label: 'Auto', code: 'width: auto;', previewType: 'width' },
            { label: 'Max Content', code: 'width: max-content;', previewType: 'width' }
          ]
        }
    ],
    layout: [
        { //    ALIGN-CONTENT.
          id: 'align-content',
          title: 'align-content',
          brief: 'Aligns wrapped flex lines or grid tracks along the cross-axis.',
          description: 'Controls how multiple lines of flex items or grid tracks are distributed along the cross-axis when there is extra space. Only has effect when items wrap to multiple lines or when grid has multiple rows/columns.',
          inputs: [
              {
                  label: 'Stretch',
                  detail: 'Lines stretch to fill the available space (default).'
              },
              {
                  label: 'Flex-start',
                  detail: 'Lines are packed toward the start of the cross-axis.'
              },
              {
                  label: 'Flex-end',
                  detail: 'Lines are packed toward the end of the cross-axis.'
              },
              {
                  label: 'Center',
                  detail: 'Lines are centered along the cross-axis.'
              },
              {
                  label: 'Space-between',
                  detail: 'Lines are evenly distributed with first/last lines at edges.'
              },
              {
                  label: 'Space-around',
                  detail: 'Lines are evenly distributed with equal space around each line.'
              }
          ],
          examples: [
              { label: 'Stretch', code: 'align-content: stretch;', previewType: 'alignContent' },
              { label: 'Flex-start', code: 'align-content: flex-start;', previewType: 'alignContent' },
              { label: 'Center', code: 'align-content: center;', previewType: 'alignContent' },
              { label: 'Flex-end', code: 'align-content: flex-end;', previewType: 'alignContent' },
              { label: 'Space-between', code: 'align-content: space-between;', previewType: 'alignContent' },
              { label: 'Space-around', code: 'align-content: space-around;', previewType: 'alignContent' }
          ]
        },
        { //    ALIGN-ITEMS.
            id: 'align-items',
            title: 'align-items',
            brief: 'Sets the default cross-axis alignment for all flex/grid items in a container.',
            description: 'Controls how flex or grid items are aligned along the cross-axis (perpendicular to the main axis). This property is set on the container and affects all child items unless overridden by align-self.',
            inputs: [
                {
                    label: 'Stretch',
                    detail: 'Items stretch to fill the container cross-axis (default for flexbox).'
                },
                {
                    label: 'Flex-start',
                    detail: 'Items align to the start of the cross-axis.'
                },
                {
                    label: 'Flex-end',
                    detail: 'Items align to the end of the cross-axis.'
                },
                {
                    label: 'Center',
                    detail: 'Items are centered along the cross-axis.'
                },
                {
                    label: 'Baseline',
                    detail: 'Items align along their text baseline.'
                }
            ],
            examples: [
                { label: 'Stretch', code: 'align-items: stretch;', previewType: 'alignItems' },
                { label: 'Flex-start', code: 'align-items: flex-start;', previewType: 'alignItems' },
                { label: 'Center', code: 'align-items: center;', previewType: 'alignItems' },
                { label: 'Flex-end', code: 'align-items: flex-end;', previewType: 'alignItems' },
                { label: 'Baseline', code: 'align-items: baseline;', previewType: 'alignItems' }
            ]
        },
        { //    ALIGN-SELF.
            id: 'align-self',
            title: 'align-self',
            brief: 'Overrides the container align-items for an individual flex/grid item.',
            description: 'Controls the alignment of an individual flex or grid item along the cross-axis, overriding the align-items value set on the container. This property is set on the item itself.',
            inputs: [
                {
                    label: 'Auto',
                    detail: 'Uses the parent container align-items value (default).'
                },
                {
                    label: 'Flex-start',
                    detail: 'Aligns this item to the start of the cross-axis.'
                },
                {
                    label: 'Flex-end',
                    detail: 'Aligns this item to the end of the cross-axis.'
                },
                {
                    label: 'Center',
                    detail: 'Centers this item along the cross-axis.'
                },
                {
                    label: 'Baseline',
                    detail: 'Aligns this item along its text baseline.'
                },
                {
                    label: 'Stretch',
                    detail: 'Stretches this item to fill the container cross-axis.'
                }
            ],
            examples: [
                { label: 'Auto', code: 'align-self: auto;', previewType: 'alignSelf' },
                { label: 'Flex-start', code: 'align-self: flex-start;', previewType: 'alignSelf' },
                { label: 'Center', code: 'align-self: center;', previewType: 'alignSelf' },
                { label: 'Flex-end', code: 'align-self: flex-end;', previewType: 'alignSelf' },
                { label: 'Stretch', code: 'align-self: stretch;', previewType: 'alignSelf' }
            ]
        },
        { //    DISPLAY.
            id: 'display',
            title: 'display',
            brief: 'Sets the display behavior of an element.',
            description: 'Controls how an element is displayed and how it participates in layout flow. Determines if an element is block-level, inline, or uses special layout models like flex or grid.',
            inputs: [
                {
                    label: 'Block',
                    detail: 'Takes full width, stacks vertically. Default for div, p, h1, etc.'
                },
                {
                    label: 'Inline',
                    detail: 'Flows with text, only takes needed width. Default for span, a, strong.'
                },
                {
                    label: 'Inline-block',
                    detail: 'Flows inline but accepts width/height like block elements.'
                },
                {
                    label: 'Flex',
                    detail: 'Creates a flex container for flexible box layout.'
                },
                {
                    label: 'Grid',
                    detail: 'Creates a grid container for two-dimensional layout.'
                },
                {
                    label: 'None',
                    detail: 'Completely removes element from layout (invisible and no space).'
                }
            ],
            examples: [
                { label: 'Block', code: 'display: block;', previewType: 'display' },
                { label: 'Inline', code: 'display: inline;', previewType: 'display' },
                { label: 'Inline-block', code: 'display: inline-block;', previewType: 'display' },
                { label: 'Flex', code: 'display: flex;', previewType: 'display' },
                { label: 'None', code: 'display: none;', previewType: 'display' }
            ]
        },
        { //    FLEX.
          id: 'flex',
          title: 'flex',
          brief: 'Shorthand for flex-grow, flex-shrink, and flex-basis.',
          description: 'Defines how a flex item grows, shrinks, and its initial size within a flex container. Commonly used values include flex: 1 (equal distribution) and flex: none (no flexibility).',
          inputs: [
              {
                  label: 'Single Number',
                  detail: 'flex: 1, flex: 2 - just sets flex-grow, allows equal or proportional growth.'
              },
              {
                  label: 'None',
                  detail: 'flex: none - item does not grow or shrink, keeps original size.'
              },
              {
                  label: 'Auto',
                  detail: 'flex: auto - item can grow and shrink based on content.'
              },
              {
                  label: 'Three Values',
                  detail: 'flex: grow shrink basis (e.g., flex: 1 0 200px).'
              }
          ],
          examples: [
              { label: 'Flex 1', code: 'flex: 1;', previewType: 'flex' },
              { label: 'Flex 2', code: 'flex: 2;', previewType: 'flex' },
              { label: 'None', code: 'flex: none;', previewType: 'flex' },
              { label: 'Auto', code: 'flex: auto;', previewType: 'flex' }
          ]
        },
        { //    FLEX-BASIS.
          id: 'flex-basis',
          title: 'flex-basis',
          brief: 'Sets the initial main size of a flex item before free space is distributed.',
          description: 'Defines the initial size of a flex item along the main axis before any remaining space is distributed. It can be set to a length, percentage, auto, or content.',
          inputs: [
              {
                  label: 'Length Values',
                  detail: 'flex-basis: 200px, 10em - sets a fixed initial size.'
              },
              {
                  label: 'Percentages',
                  detail: 'flex-basis: 50% - sets initial size relative to flex container.'
              },
              {
                  label: 'Auto',
                  detail: 'flex-basis: auto - uses the item width/height property or content size.'
              },
              {
                  label: 'Content',
                  detail: 'flex-basis: content - sizes based on the item content.'
              }
          ],
          examples: [
              { label: 'Auto', code: 'flex-basis: auto;', previewType: 'flexBasis' },
              { label: '100px', code: 'flex-basis: 100px;', previewType: 'flexBasis' },
              { label: '50%', code: 'flex-basis: 50%;', previewType: 'flexBasis' },
              { label: 'Content', code: 'flex-basis: content;', previewType: 'flexBasis' }
          ]
        },
        { //    FLEX-DIRECTION.
          id: 'flex-direction',
          title: 'flex-direction',
          brief: 'Sets the direction of flex items in a flex container.',
          description: 'Defines the main axis direction for flex items. This determines whether items flow horizontally or vertically, and in which direction. Only works on elements with display: flex.',
          inputs: [
              {
                  label: 'Row',
                  detail: 'Items flow horizontally from left to right (default).'
              },
              {
                  label: 'Row-reverse',
                  detail: 'Items flow horizontally from right to left.'
              },
              {
                  label: 'Column',
                  detail: 'Items flow vertically from top to bottom.'
              },
              {
                  label: 'Column-reverse',
                  detail: 'Items flow vertically from bottom to top.'
              }
          ],
          examples: [
              { label: 'Row', code: 'flex-direction: row;', previewType: 'flexDirection' },
              { label: 'Row Reverse', code: 'flex-direction: row-reverse;', previewType: 'flexDirection' },
              { label: 'Column', code: 'flex-direction: column;', previewType: 'flexDirection' },
              { label: 'Column Reverse', code: 'flex-direction: column-reverse;', previewType: 'flexDirection' }
          ]
        },
        { //    FLEX-GROW.
            id: 'flex-grow',
            title: 'flex-grow',
            brief: 'Controls how much a flex item grows relative to other items.',
            description: 'Defines the ability for a flex item to grow if necessary. It accepts a unitless value that serves as a proportion. Higher values mean the item will take up more of the available space.',
            inputs: [
                {
                    label: 'Zero',
                    detail: 'flex-grow: 0 - item will not grow, keeps its natural size.'
                },
                {
                    label: 'Equal Growth',
                    detail: 'flex-grow: 1 - all items with this value grow equally.'
                },
                {
                    label: 'Proportional Growth',
                    detail: 'flex-grow: 2, 3, etc. - item grows 2x, 3x faster than flex-grow: 1 items.'
                },
                {
                    label: 'Decimal Values',
                    detail: 'flex-grow: 0.5 - item grows at half the rate of flex-grow: 1 items.'
                }
            ],
            examples: [
                { label: 'No Growth', code: 'flex-grow: 0;', previewType: 'flexGrow' },
                { label: 'Grow 1', code: 'flex-grow: 1;', previewType: 'flexGrow' },
                { label: 'Grow 2', code: 'flex-grow: 2;', previewType: 'flexGrow' },
                { label: 'Grow 3', code: 'flex-grow: 3;', previewType: 'flexGrow' }
            ]
        },
        { //    FLEX-SHRINK.
          id: 'flex-shrink',
          title: 'flex-shrink',
          brief: 'Controls how much a flex item shrinks when there is not enough space.',
          description: 'Defines the ability for a flex item to shrink if necessary. It accepts a unitless value that serves as a proportion. Higher values mean the item will shrink more relative to other items.',
          inputs: [
              {
                  label: 'Zero',
                  detail: 'flex-shrink: 0 - item will not shrink, maintains its size.'
              },
              {
                  label: 'Equal Shrinking',
                  detail: 'flex-shrink: 1 - all items with this value shrink equally (default).'
              },
              {
                  label: 'Proportional Shrinking',
                  detail: 'flex-shrink: 2, 3, etc. - item shrinks 2x, 3x faster than flex-shrink: 1 items.'
              },
              {
                  label: 'Decimal Values',
                  detail: 'flex-shrink: 0.5 - item shrinks at half the rate of flex-shrink: 1 items.'
              }
          ],
          examples: [
              { label: 'No Shrink', code: 'flex-shrink: 0;', previewType: 'flexShrink' },
              { label: 'Shrink 1', code: 'flex-shrink: 1;', previewType: 'flexShrink' },
              { label: 'Shrink 2', code: 'flex-shrink: 2;', previewType: 'flexShrink' },
              { label: 'Shrink 3', code: 'flex-shrink: 3;', previewType: 'flexShrink' }
          ]
        },
        { //    FLEX-WRAP.
          id: 'flex-wrap',
          title: 'flex-wrap',
          brief: 'Controls whether flex items wrap to new lines when they overflow.',
          description: 'Determines if flex items are forced onto a single line or can wrap onto multiple lines. This is essential for responsive flex layouts where items need to flow to new rows or columns.',
          inputs: [
              {
                  label: 'Nowrap',
                  detail: 'All items stay on one line, may overflow container (default).'
              },
              {
                  label: 'Wrap',
                  detail: 'Items wrap to new lines as needed, from top to bottom.'
              },
              {
                  label: 'Wrap-reverse',
                  detail: 'Items wrap to new lines in reverse order, from bottom to top.'
              }
          ],
          examples: [
              { label: 'No Wrap', code: 'flex-wrap: nowrap;', previewType: 'flexWrap' },
              { label: 'Wrap', code: 'flex-wrap: wrap;', previewType: 'flexWrap' },
              { label: 'Wrap Reverse', code: 'flex-wrap: wrap-reverse;', previewType: 'flexWrap' }
          ]
        },
        { //    GAP.
          id: 'gap',
          title: 'gap',
          brief: 'Sets the spacing between flex or grid items.',
          description: 'Controls the space between items in flex and grid containers. Can be set as a single value for both row and column gaps, or two values for row-gap and column-gap separately.',
          inputs: [
              {
                  label: 'Single Value',
                  detail: 'Applies the same gap to both rows and columns (e.g., gap: 20px).'
              },
              {
                  label: 'Two Values',
                  detail: 'First value for row-gap, second for column-gap (e.g., gap: 10px 20px).'
              },
              {
                  label: 'Pixels',
                  detail: 'Fixed spacing using absolute units like px, pt, or em.'
              },
              {
                  label: 'Percentages',
                  detail: 'Relative spacing based on container size (e.g., gap: 5%).'
              },
              {
                  label: 'Zero Gap',
                  detail: 'Removes all spacing between items (gap: 0).'
              }
          ],
          examples: [
              { label: 'Small Gap', code: 'gap: 10px;', previewType: 'gap' },
              { label: 'Medium Gap', code: 'gap: 20px;', previewType: 'gap' },
              { label: 'Large Gap', code: 'gap: 40px;', previewType: 'gap' },
              { label: 'Row/Column Gap', code: 'gap: 10px 30px;', previewType: 'gap' },
              { label: 'No Gap', code: 'gap: 0;', previewType: 'gap' }
          ]
        },
        { //    GRID-AREA.
          id: 'grid-area',
          title: 'grid-area',
          brief: 'Specifies a grid item size and location within the grid.',
          description: 'Shorthand property that defines which grid lines a grid item starts and ends at. Can use line numbers, named lines, or the span keyword. Combines grid-row-start, grid-column-start, grid-row-end, and grid-column-end.',
          inputs: [
              {
                  label: 'Line Numbers',
                  detail: 'Use grid line numbers: grid-area: 1 / 2 / 3 / 4 (row-start / col-start / row-end / col-end).'
              },
              {
                  label: 'Named Areas',
                  detail: 'Reference named grid areas defined in grid-template-areas: grid-area: header.'
              },
              {
                  label: 'Span Keyword',
                  detail: 'Span multiple cells: grid-area: 1 / 1 / span 2 / span 3 (spans 2 rows, 3 columns).'
              },
              {
                  label: 'Auto Placement',
                  detail: 'Use auto for automatic placement: grid-area: auto / auto / auto / auto.'
              }
          ],
          examples: [
              { label: 'Line Numbers', code: 'grid-area: 1 / 1 / 3 / 3;', previewType: 'gridArea' },
              { label: 'Named Area', code: 'grid-area: header;', previewType: 'gridArea' },
              { label: 'Span Cells', code: 'grid-area: 1 / 1 / span 2 / span 2;', previewType: 'gridArea' },
              { label: 'Auto', code: 'grid-area: auto;', previewType: 'gridArea' }
          ]
        },
        { //    GRID-TEMPLATE-AREAS.
          id: 'grid-template-areas',
          title: 'grid-template-areas',
          brief: 'Defines named grid areas for easy item placement.',
          description: 'Creates named grid areas that can be referenced by grid-area. Each string represents a row, and each word in the string represents a column. Use dots (.) for empty cells.',
          inputs: [
              {
                  label: 'Named Areas',
                  detail: 'Use quoted strings with area names: "header header" "sidebar content".'
              },
              {
                  label: 'Empty Cells',
                  detail: 'Use dots (.) for cells that should remain empty: "header . sidebar".'
              },
              {
                  label: 'Spanning Areas',
                  detail: 'Repeat area names to span multiple cells: "header header header".'
              },
              {
                  label: 'Layout Patterns',
                  detail: 'Create common layouts like header/sidebar/content/footer arrangements.'
              }
          ],
          examples: [
              { label: 'Header Layout', code: 'grid-template-areas: "header header" "sidebar content";', previewType: 'gridTemplateAreas' },
              { label: 'Full Layout', code: 'grid-template-areas: "header header header" "sidebar content content" "footer footer footer";', previewType: 'gridTemplateAreas' },
              { label: 'With Empty Cells', code: 'grid-template-areas: "header . header" "sidebar content content";', previewType: 'gridTemplateAreas' },
              { label: 'Simple Two Column', code: 'grid-template-areas: "left right" "left right";', previewType: 'gridTemplateAreas' }
          ]
        },
        { //    GRID-TEMPLATE-COLUMNS.
          id: 'grid-template-columns',
          title: 'grid-template-columns',
          brief: 'Defines the size of columns in a CSS Grid container.',
          description: 'Sets the width of each column in a grid layout. You can use fixed sizes, flexible units, or auto-sizing. This property only works on elements with display: grid.',
          inputs: [
              {
                  label: 'Fixed Sizes',
                  detail: 'Use px, em, rem for exact column widths (e.g., 200px 150px).'
              },
              {
                  label: 'Flexible Units (fr)',
                  detail: 'Use fr units for proportional sizing (e.g., 1fr 2fr means 1:2 ratio).'
              },
              {
                  label: 'Auto',
                  detail: 'Columns size based on their content width.'
              },
              {
                  label: 'Percentages',
                  detail: 'Relative to container width (e.g., 50% 25% 25%).'
              },
              {
                  label: 'Repeat Function',
                  detail: 'repeat(3, 1fr) creates 3 equal columns, repeat(2, 100px) creates 2 100px columns.'
              },
              {
                  label: 'Minmax Function',
                  detail: 'minmax(200px, 1fr) sets minimum 200px, maximum 1fr.'
              }
          ],
          examples: [
              { label: 'Equal Columns', code: 'grid-template-columns: 1fr 1fr 1fr;', previewType: 'gridTemplateColumns' },
              { label: 'Fixed Widths', code: 'grid-template-columns: 100px 150px 100px;', previewType: 'gridTemplateColumns' },
              { label: 'Auto Size', code: 'grid-template-columns: auto auto auto;', previewType: 'gridTemplateColumns' },
              { label: 'Mixed Units', code: 'grid-template-columns: 100px 1fr auto;', previewType: 'gridTemplateColumns' },
              { label: 'Repeat', code: 'grid-template-columns: repeat(3, 1fr);', previewType: 'gridTemplateColumns' }
          ]
        },
        { //    GRID-TEMPLATE-ROWS.
          id: 'grid-template-rows',
          title: 'grid-template-rows',
          brief: 'Defines the size of rows in a CSS Grid container.',
          description: 'Sets the height of each row in a grid layout. You can use fixed sizes, flexible units, or auto-sizing. This property only works on elements with display: grid.',
          inputs: [
              {
                  label: 'Fixed Sizes',
                  detail: 'Use px, em, rem for exact row heights (e.g., 100px 200px).'
              },
              {
                  label: 'Flexible Units (fr)',
                  detail: 'Use fr units for proportional sizing (e.g., 1fr 2fr means 1:2 ratio).'
              },
              {
                  label: 'Auto',
                  detail: 'Rows size based on their content height.'
              },
              {
                  label: 'Percentages',
                  detail: 'Relative to container height (e.g., 50% 25% 25%).'
              },
              {
                  label: 'Repeat Function',
                  detail: 'repeat(3, 1fr) creates 3 equal rows, repeat(2, 100px) creates 2 100px rows.'
              },
              {
                  label: 'Minmax Function',
                  detail: 'minmax(100px, 1fr) sets minimum 100px, maximum 1fr.'
              }
          ],
          examples: [
              { label: 'Equal Rows', code: 'grid-template-rows: 1fr 1fr 1fr;', previewType: 'gridTemplateRows' },
              { label: 'Fixed Heights', code: 'grid-template-rows: 50px 100px 50px;', previewType: 'gridTemplateRows' },
              { label: 'Auto Size', code: 'grid-template-rows: auto auto auto;', previewType: 'gridTemplateRows' },
              { label: 'Mixed Units', code: 'grid-template-rows: 100px 1fr auto;', previewType: 'gridTemplateRows' },
              { label: 'Repeat', code: 'grid-template-rows: repeat(3, 1fr);', previewType: 'gridTemplateRows' }
          ]
        },
        { //    JUSTIFY-CONTENT.
            id: 'justify-content',
            title: 'justify-content',
            brief: 'Sets the alignment of flex/grid items along the main axis within a container.',
            description: 'Controls how flex or grid items are distributed along the main axis (horizontal in row flex, vertical in column flex). This property is set on the container and affects the spacing and alignment of all child items.',
            inputs: [
                {
                    label: 'Flex-start',
                    detail: 'Items are packed toward the start of the main axis (default).'
                },
                {
                    label: 'Flex-end',
                    detail: 'Items are packed toward the end of the main axis.'
                },
                {
                    label: 'Center',
                    detail: 'Items are centered along the main axis.'
                },
                {
                    label: 'Space-between',
                    detail: 'Items are evenly distributed with first/last items at edges.'
                },
                {
                    label: 'Space-around',
                    detail: 'Items are evenly distributed with equal space around each item.'
                },
                {
                    label: 'Space-evenly',
                    detail: 'Items are evenly distributed with equal space between all items.'
                }
            ],
            examples: [
                { label: 'Flex-start', code: 'justify-content: flex-start;', previewType: 'justifyContent' },
                { label: 'Center', code: 'justify-content: center;', previewType: 'justifyContent' },
                { label: 'Flex-end', code: 'justify-content: flex-end;', previewType: 'justifyContent' },
                { label: 'Space-between', code: 'justify-content: space-between;', previewType: 'justifyContent' },
                { label: 'Space-around', code: 'justify-content: space-around;', previewType: 'justifyContent' },
                { label: 'Space-evenly', code: 'justify-content: space-evenly;', previewType: 'justifyContent' }
            ]
        },
        { //    JUSTIFY-ITEMS.
            id: 'justify-items',
            title: 'justify-items',
            brief: 'Sets the default justify-self alignment for all grid items in a container.',
            description: 'Controls how grid items are aligned along the inline (row) axis within their grid cells. This property is set on the grid container and affects all child items unless overridden by justify-self.',
            inputs: [
                {
                    label: 'Start',
                    detail: 'Items align to the start of their grid cells (default).'
                },
                {
                    label: 'End',
                    detail: 'Items align to the end of their grid cells.'
                },
                {
                    label: 'Center',
                    detail: 'Items are centered within their grid cells.'
                },
                {
                    label: 'Stretch',
                    detail: 'Items stretch to fill the width of their grid cells.'
                }
            ],
            examples: [
                { label: 'Start', code: 'justify-items: start;', previewType: 'justifyItems' },
                { label: 'Center', code: 'justify-items: center;', previewType: 'justifyItems' },
                { label: 'End', code: 'justify-items: end;', previewType: 'justifyItems' },
                { label: 'Stretch', code: 'justify-items: stretch;', previewType: 'justifyItems' }
            ]
        },
        { //    JUSTIFY-SELF.
            id: 'justify-self',
            title: 'justify-self',
            brief: 'Overrides the container justify-content for an individual flex/grid item.',
            description: 'Controls the alignment of an individual grid item along the main axis within its grid cell. This property is primarily used in CSS Grid layouts and has limited effect in flexbox. It allows individual items to override the container alignment settings.',
            inputs: [
                {
                    label: 'Auto',
                    detail: 'Uses the grid container justify-items value (default).'
                },
                {
                    label: 'Start',
                    detail: 'Aligns this item to the start of its grid cell.'
                },
                {
                    label: 'End',
                    detail: 'Aligns this item to the end of its grid cell.'
                },
                {
                    label: 'Center',
                    detail: 'Centers this item within its grid cell.'
                },
                {
                    label: 'Stretch',
                    detail: 'Stretches this item to fill its grid cell width.'
                }
            ],
            examples: [
                { label: 'Auto', code: 'justify-self: auto;', previewType: 'justifySelf' },
                { label: 'Start', code: 'justify-self: start;', previewType: 'justifySelf' },
                { label: 'Center', code: 'justify-self: center;', previewType: 'justifySelf' },
                { label: 'End', code: 'justify-self: end;', previewType: 'justifySelf' },
                { label: 'Stretch', code: 'justify-self: stretch;', previewType: 'justifySelf' }
            ]
        },
        { //    POSITION.
            id: 'position',
            title: 'position',
            brief: 'Sets how an element is positioned in the document.',
            description: 'Controls the positioning method used for an element. Different values change how the element is placed and how it affects the layout of other elements around it.',
            inputs: [
                {
                    label: 'Static',
                    detail: 'Default positioning. Element follows normal document flow.'
                },
                {
                    label: 'Relative',
                    detail: 'Positioned relative to its normal position. Can use top, right, bottom, left offsets.'
                },
                {
                    label: 'Absolute',
                    detail: 'Positioned relative to the nearest positioned ancestor. Removed from normal flow.'
                },
                {
                    label: 'Fixed',
                    detail: 'Positioned relative to the viewport. Stays in place when scrolling.'
                },
                {
                    label: 'Sticky',
                    detail: 'Switches between relative and fixed based on scroll position.'
                }
            ],
            examples: [
                { label: 'Static', code: 'position: static;', previewType: 'position' },
                { label: 'Relative', code: 'position: relative;', previewType: 'position' },
                { label: 'Absolute', code: 'position: absolute;', previewType: 'position' },
                { label: 'Fixed', code: 'position: fixed;', previewType: 'position' },
                { label: 'Sticky', code: 'position: sticky;', previewType: 'position' }
            ]
        },
        { //    TOP, RIGHT, BOTTOM, LEFT.
            id: 'top-right-bottom-left',
            title: 'top, right, bottom, left',
            brief: 'Sets the position offset for positioned elements.',
            description: 'These properties specify the distance of a positioned element from the edges of its containing block. Only works with elements that have a position value other than static.',
            inputs: [
                {
                    label: 'Length Values',
                    detail: 'Fixed distances like px, em, rem (e.g., top: 20px, left: 2em).'
                },
                {
                    label: 'Percentages',
                    detail: 'Relative to containing block size (e.g., top: 50%, right: 25%).'
                },
                {
                    label: 'Auto',
                    detail: 'Browser calculates the position automatically (default).'
                },
                {
                    label: 'Negative Values',
                    detail: 'Moves element in opposite direction (e.g., top: -10px moves up).'
                }
            ],
            examples: [
                { label: 'Top', code: 'top: 20px;', previewType: 'positioning' },
                { label: 'Right', code: 'right: 10%;', previewType: 'positioning' },
                { label: 'Bottom', code: 'bottom: 0;', previewType: 'positioning' },
                { label: 'Left', code: 'left: -5px;', previewType: 'positioning' },
                { label: 'Auto', code: 'top: auto;', previewType: 'positioning' }
            ]
        },
        { //    Z-INDEX.
            id: 'z-index',
            title: 'z-index',
            brief: 'Controls the stacking order of positioned elements.',
            description: 'Sets the stack level of a positioned element. Elements with higher z-index values appear in front of elements with lower values. Only works on positioned elements (not static).',
            inputs: [
                {
                    label: 'Integer Values',
                    detail: 'Positive or negative whole numbers (e.g., 1, 100, -5).'
                },
                {
                    label: 'Auto',
                    detail: 'Default stacking order based on document flow and position.'
                },
                {
                    label: 'Negative Values',
                    detail: 'Places element behind other elements in the stacking context.'
                },
                {
                    label: 'Large Values',
                    detail: 'Common patterns like 999, 9999 to ensure element appears on top.'
                }
            ],
            examples: [
                { label: 'Auto', code: 'z-index: auto;', previewType: 'zIndex' },
                { label: 'Low', code: 'z-index: 1;', previewType: 'zIndex' },
                { label: 'High', code: 'z-index: 10;', previewType: 'zIndex' },
                { label: 'Negative', code: 'z-index: -1;', previewType: 'zIndex' },
                { label: 'Very High', code: 'z-index: 999;', previewType: 'zIndex' }
            ]
        },

    ],
    animation: [
        { //    ANIMATION.
          id: 'animation',
          title: 'animation',
          brief: 'Shorthand for all animation properties to create keyframe animations.',
          description: 'Combines animation-name, animation-duration, animation-timing-function, animation-delay, animation-iteration-count, animation-direction, animation-fill-mode, and animation-play-state into one declaration.',
          inputs: [
              {
                  label: 'Animation Name',
                  detail: 'References a @keyframes rule that defines the animation sequence.'
              },
              {
                  label: 'Duration',
                  detail: 'How long one cycle of the animation takes (e.g., "2s", "500ms").'
              },
              {
                  label: 'Timing Function',
                  detail: 'Animation curve: "ease", "linear", "ease-in-out", or custom cubic-bezier.'
              },
              {
                  label: 'Delay',
                  detail: 'Time to wait before starting the animation (e.g., "0s", "1s").'
              },
              {
                  label: 'Iteration Count',
                  detail: 'Number of times to repeat: number, "infinite", or "initial".'
              },
              {
                  label: 'Direction',
                  detail: '"normal", "reverse", "alternate", or "alternate-reverse".'
              },
              {
                  label: 'Fill Mode',
                  detail: '"none", "forwards", "backwards", or "both" - how styles apply before/after.'
              }
          ],
          examples: [
              { label: 'Simple', code: 'animation: fadeIn 1s ease;', previewType: 'animation' },
              { label: 'Infinite Loop', code: 'animation: spin 2s linear infinite;', previewType: 'animation' },
              { label: 'With Delay', code: 'animation: slideIn 0.5s ease 0.2s;', previewType: 'animation' },
              { label: 'Alternate Direction', code: 'animation: pulse 1s ease-in-out infinite alternate;', previewType: 'animation' },
              { label: 'Fill Mode', code: 'animation: slideUp 0.8s ease forwards;', previewType: 'animation' },
              { label: 'Multiple Animations', code: 'animation: fadeIn 1s ease, slideIn 0.5s ease 0.5s;', previewType: 'animation' }
          ]
      },
      { //    ANIMATION-DIRECTION.
          id: 'animation-direction',
          title: 'animation-direction',
          brief: 'Sets whether the animation plays forward, backward, or alternates.',
          description: 'Controls the direction of the animation sequence. This affects how the keyframes are played and can create different visual effects like bouncing or reversing motions.',
          inputs: [
              {
                  label: 'Normal',
                  detail: 'Animation plays forward from 0% to 100% (default).'
              },
              {
                  label: 'Reverse',
                  detail: 'Animation plays backward from 100% to 0%.'
              },
              {
                  label: 'Alternate',
                  detail: 'Animation alternates between forward and backward on each cycle.'
              },
              {
                  label: 'Alternate-reverse',
                  detail: 'Animation alternates, starting with backward direction.'
              },
              {
                  label: 'Multiple Directions',
                  detail: 'Different directions for multiple simultaneous animations.'
              }
          ],
          examples: [
              { label: 'Normal', code: 'animation-direction: normal;', previewType: 'animationDirection' },
              { label: 'Reverse', code: 'animation-direction: reverse;', previewType: 'animationDirection' },
              { label: 'Alternate', code: 'animation-direction: alternate;', previewType: 'animationDirection' },
              { label: 'Alternate-reverse', code: 'animation-direction: alternate-reverse;', previewType: 'animationDirection' },
              { label: 'Multiple', code: 'animation-direction: normal, reverse;', previewType: 'animationDirection' }
          ]
      },
      { //    ANIMATION-DURATION.
          id: 'animation-duration',
          title: 'animation-duration',
          brief: 'Sets how long one cycle of the animation takes to complete.',
          description: 'Specifies the duration of one animation cycle. This controls the speed of the keyframe animation from 0% to 100%. Can be set in seconds or milliseconds.',
          inputs: [
              {
                  label: 'Seconds',
                  detail: 'Time in seconds using "s" unit (e.g., "1s", "2.5s", "0.3s").'
              },
              {
                  label: 'Milliseconds',
                  detail: 'Time in milliseconds using "ms" unit (e.g., "1000ms", "500ms").'
              },
              {
                  label: 'Zero Duration',
                  detail: '"0s" creates no animation, styles jump instantly to final state.'
              },
              {
                  label: 'Multiple Durations',
                  detail: 'Comma-separated values for multiple animations running simultaneously.'
              }
          ],
          examples: [
              { label: 'Fast', code: 'animation-duration: 0.3s;', previewType: 'animationDuration' },
              { label: 'Medium', code: 'animation-duration: 1s;', previewType: 'animationDuration' },
              { label: 'Slow', code: 'animation-duration: 3s;', previewType: 'animationDuration' },
              { label: 'Milliseconds', code: 'animation-duration: 750ms;', previewType: 'animationDuration' },
              { label: 'Multiple', code: 'animation-duration: 1s, 2s;', previewType: 'animationDuration' },
              { label: 'Instant', code: 'animation-duration: 0s;', previewType: 'animationDuration' }
          ]
      },
      { //    ANIMATION-ITERATION-COUNT.
          id: 'animation-iteration-count',
          title: 'animation-iteration-count',
          brief: 'Sets how many times the animation cycle repeats.',
          description: 'Specifies the number of times an animation should run. Can be a specific number, infinite for continuous looping, or multiple values for different animations.',
          inputs: [
              {
                  label: 'Number',
                  detail: 'Specific count like 1, 2, 3, or decimal values like 1.5 for partial cycles.'
              },
              {
                  label: 'Infinite',
                  detail: 'Animation repeats continuously without stopping.'
              },
              {
                  label: 'Initial',
                  detail: 'Resets to the default value (1).'
              },
              {
                  label: 'Multiple Counts',
                  detail: 'Different iteration counts for multiple simultaneous animations.'
              }
          ],
          examples: [
              { label: 'Once', code: 'animation-iteration-count: 1;', previewType: 'animationIterationCount' },
              { label: 'Three Times', code: 'animation-iteration-count: 3;', previewType: 'animationIterationCount' },
              { label: 'Infinite', code: 'animation-iteration-count: infinite;', previewType: 'animationIterationCount' },
              { label: 'Partial Cycle', code: 'animation-iteration-count: 1.5;', previewType: 'animationIterationCount' },
              { label: 'Multiple', code: 'animation-iteration-count: 2, infinite;', previewType: 'animationIterationCount' }
          ]
      },
      { //    ANIMATION-NAME.
          id: 'animation-name',
          title: 'animation-name',
          brief: 'Specifies the name of the @keyframes rule to use for animation.',
          description: 'References one or more @keyframes rules that define the animation sequence. The keyframes rule specifies the CSS styles at various points during the animation.',
          inputs: [
              {
                  label: 'Keyframe Name',
                  detail: 'Name of a @keyframes rule (e.g., "fadeIn", "slideUp", "bounce").'
              },
              {
                  label: 'None',
                  detail: 'No animation is applied to the element.'
              },
              {
                  label: 'Multiple Names',
                  detail: 'Comma-separated list for multiple simultaneous animations.'
              },
              {
                  label: 'Custom Names',
                  detail: 'Use descriptive names that match your @keyframes definitions.'
              }
          ],
          examples: [
              { label: 'Fade In', code: 'animation-name: fadeIn;', previewType: 'animationName' },
              { label: 'Slide Up', code: 'animation-name: slideUp;', previewType: 'animationName' },
              { label: 'Bounce', code: 'animation-name: bounce;', previewType: 'animationName' },
              { label: 'Spin', code: 'animation-name: spin;', previewType: 'animationName' },
              { label: 'Multiple', code: 'animation-name: fadeIn, slideIn;', previewType: 'animationName' },
              { label: 'None', code: 'animation-name: none;', previewType: 'animationName' }
          ]
      },
      { //    ANIMATION-TIMING-FUNCTION.
          id: 'animation-timing-function',
          title: 'animation-timing-function',
          brief: 'Sets the acceleration curve for keyframe animations.',
          description: 'Controls the speed curve of the animation, determining how intermediate keyframe values are calculated. This affects the pacing and feel of the animation throughout its duration.',
          inputs: [
              {
                  label: 'Ease Keywords',
                  detail: '"ease", "ease-in", "ease-out", "ease-in-out" for common animation curves.'
              },
              {
                  label: 'Linear',
                  detail: 'Constant speed throughout the entire animation duration.'
              },
              {
                  label: 'Cubic-Bezier',
                  detail: 'Custom curves using cubic-bezier(x1, y1, x2, y2) for precise timing control.'
              },
              {
                  label: 'Step Functions',
                  detail: 'steps(n, start/end) for discrete, frame-by-frame animations.'
              },
              {
                  label: 'Multiple Functions',
                  detail: 'Different timing functions for multiple simultaneous animations.'
              }
          ],
          examples: [
              { label: 'Ease', code: 'animation-timing-function: ease;', previewType: 'animationTimingFunction' },
              { label: 'Ease-in-out', code: 'animation-timing-function: ease-in-out;', previewType: 'animationTimingFunction' },
              { label: 'Linear', code: 'animation-timing-function: linear;', previewType: 'animationTimingFunction' },
              { label: 'Bounce', code: 'animation-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);', previewType: 'animationTimingFunction' },
              { label: 'Steps', code: 'animation-timing-function: steps(8, end);', previewType: 'animationTimingFunction' },
              { label: 'Custom', code: 'animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);', previewType: 'animationTimingFunction' }
          ]
      },
        { //    TRANSITION.
            id: 'transition',
            title: 'transition',
            brief: 'Creates smooth animations between property value changes.',
            description: 'Shorthand property that defines how CSS properties should transition when their values change. Combines transition-property, transition-duration, transition-timing-function, and transition-delay into one declaration.',
            inputs: [
                {
                    label: 'Property',
                    detail: 'Which CSS property to animate (e.g., "all", "opacity", "transform", "background-color").'
                },
                {
                    label: 'Duration',
                    detail: 'How long the transition takes (e.g., "0.3s", "500ms", "1s").'
                },
                {
                    label: 'Timing Function',
                    detail: 'Animation curve: "ease", "linear", "ease-in", "ease-out", "ease-in-out", or custom cubic-bezier.'
                },
                {
                    label: 'Delay',
                    detail: 'Time to wait before starting transition (e.g., "0s", "0.1s", "200ms").'
                },
                {
                    label: 'Multiple Properties',
                    detail: 'Comma-separated list for different properties with different settings.'
                }
            ],
            examples: [
                { label: 'Simple', code: 'transition: all 0.3s ease;', previewType: 'transition' },
                { label: 'Opacity Only', code: 'transition: opacity 0.5s ease-in-out;', previewType: 'transition' },
                { label: 'With Delay', code: 'transition: transform 0.3s ease 0.1s;', previewType: 'transition' },
                { label: 'Multiple Properties', code: 'transition: opacity 0.3s ease, transform 0.5s ease-out;', previewType: 'transition' },
                { label: 'Linear', code: 'transition: background-color 0.4s linear;', previewType: 'transition' },
                { label: 'Custom Curve', code: 'transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);', previewType: 'transition' }
            ]
        },
        { //    TRANSITION-DURATION.
            id: 'transition-duration',
            title: 'transition-duration',
            brief: 'Sets how long a transition animation takes to complete.',
            description: 'Specifies the duration over which transitions occur. This property controls the speed of the animation when CSS property values change. Can be set for individual properties or multiple properties with different durations.',
            inputs: [
                {
                    label: 'Seconds',
                    detail: 'Time in seconds using "s" unit (e.g., "0.3s", "1s", "2.5s").'
                },
                {
                    label: 'Milliseconds',
                    detail: 'Time in milliseconds using "ms" unit (e.g., "300ms", "1000ms", "150ms").'
                },
                {
                    label: 'Zero Duration',
                    detail: '"0s" or "0ms" creates instant changes with no animation.'
                },
                {
                    label: 'Multiple Durations',
                    detail: 'Comma-separated values for different properties (e.g., "0.3s, 0.5s, 0.2s").'
                },
                {
                    label: 'Initial/Inherit',
                    detail: '"initial" resets to default. "inherit" takes duration from parent element.'
                }
            ],
            examples: [
                { label: 'Fast', code: 'transition-duration: 0.15s;', previewType: 'transitionDuration' },
                { label: 'Medium', code: 'transition-duration: 0.3s;', previewType: 'transitionDuration' },
                { label: 'Slow', code: 'transition-duration: 0.8s;', previewType: 'transitionDuration' },
                { label: 'Milliseconds', code: 'transition-duration: 250ms;', previewType: 'transitionDuration' },
                { label: 'Multiple', code: 'transition-duration: 0.2s, 0.5s;', previewType: 'transitionDuration' },
                { label: 'Instant', code: 'transition-duration: 0s;', previewType: 'transitionDuration' }
            ]
        },
        { //    TRANSITION-TIMING-FUNCTION.
            id: 'transition-timing-function',
            title: 'transition-timing-function',
            brief: 'Sets the acceleration curve for transition animations.',
            description: 'Controls how intermediate values are calculated during a transition. Defines the speed curve of the animation, determining whether it starts slow and speeds up, starts fast and slows down, or maintains constant speed.',
            inputs: [
                {
                    label: 'Ease Keywords',
                    detail: '"ease", "ease-in", "ease-out", "ease-in-out" for common animation curves.'
                },
                {
                    label: 'Linear',
                    detail: 'Constant speed throughout the animation with no acceleration or deceleration.'
                },
                {
                    label: 'Cubic-Bezier',
                    detail: 'Custom curves using cubic-bezier(x1, y1, x2, y2) for precise control.'
                },
                {
                    label: 'Step Functions',
                    detail: 'steps(n, start/end) for discrete, stepped animations instead of smooth transitions.'
                },
                {
                    label: 'Multiple Functions',
                    detail: 'Comma-separated values for different properties with different timing curves.'
                }
            ],
            examples: [
                { label: 'Ease', code: 'transition-timing-function: ease;', previewType: 'transitionTimingFunction' },
                { label: 'Ease-in', code: 'transition-timing-function: ease-in;', previewType: 'transitionTimingFunction' },
                { label: 'Ease-out', code: 'transition-timing-function: ease-out;', previewType: 'transitionTimingFunction' },
                { label: 'Linear', code: 'transition-timing-function: linear;', previewType: 'transitionTimingFunction' },
                { label: 'Custom Curve', code: 'transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);', previewType: 'transitionTimingFunction' },
                { label: 'Steps', code: 'transition-timing-function: steps(4, end);', previewType: 'transitionTimingFunction' }
            ]
        },
    ]
};