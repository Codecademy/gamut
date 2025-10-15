import { css, Global, Theme } from '@emotion/react';
import * as React from 'react';

export const Reboot: React.FC<{ theme: Theme }> = ({ theme }) => {
  const rebootStyles = css`
    /**
  * https://raw.githubusercontent.com/twbs/bootstrap/v4-dev/scss/_reboot.scss
  * Reboot
  * Normalization of HTML elements, manually forked from Normalize.css to remove
  * styles targeting irrelevant browsers while applying new styles.
  * Normalize is licensed MIT. https://github.com/necolas/normalize.css
  * Document
  * 1 Change from 'box-sizing: content-box' so that 'width' is affected by 'padding' and 'border'.
  * 2 Change the default font family in all browsers.
  * 3 Correct the line height in all browsers.
  * 4 Prevent adjustments of font size after orientation changes in IE on Windows Phone and in iOS.
  * 5 Setting @viewport causes scrollbars to overlap content in IE11 and Edge, so
  *    we force a non-overlapping, non-auto-hiding scrollbar to counteract.
  * 6 Change the default tap highlight to be completely transparent in iOS.
*/

    *,
    *::before,
    *::after {
      /* This is changed from content-box to border-box as all of our css relies on it */
      box-sizing: border-box; /** 1 */
    }

    html {
      font-family: sans-serif; /** 2 */
      line-height: 1.15; /** 3 */
      -webkit-text-size-adjust: 100%; /** 4 */
      -ms-text-size-adjust: 100%; /** 4 */
      -ms-overflow-style: scrollbar; /** 5 */
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0); /** 6 */
    }

    /**Shim for "new" HTML5 structural elements to display correctly (IE10, older browsers) */

    article,
    aside,
    dialog,
    figcaption,
    figure,
    footer,
    header,
    hgroup,
    main,
    nav,
    section {
      display: block;
    }
    /** Body
   1. Remove the margin in all browsers.
   2. As a best practice, apply a default \`background-color\`.
   3. Set an explicit initial text-align value so that we can later use the
      the \`inherit\` value on things like \`<th>\` elements.
   */

    body {
      margin: 0;
      font-family: ${theme.fontFamily.base};
      font-weight: ${theme.fontWeight.base};
      line-height: ${theme.lineHeight.base};
      color: ${theme.colors.text};
      text-align: left;
      background-color: ${theme.colors.background};
    }

    /* Suppress the focus outline on elements that cannot be accessed via keyboard.
  This prevents an unwanted focus outline from appearing around elements that
  might still respond to pointer events.
 Credit: https://github.com/suitcss/base */

    [tabindex='-1']:focus {
      outline: 0 !important;
    }

    /*
  Content grouping
 1. Add the correct box sizing in Firefox.
  2. Show the overflow in Edge and IE.
*/

    hr {
      box-sizing: content-box;
      /* 1 */
      height: 0;
      /* 2 */
      overflow: visible;
    }
    /* Typography */
    /*
  Remove top margins from headings
   By default, \`<h1>\`-\`<h6>\` all receive top and bottom margins. We nuke the top
  margin for easier control within type scales as it avoids margin collapsing.
*/

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin-top: 0;
    }

    /*
  Reset margins on paragraphs
  Similarly, the top margin on \`<p>\`s get reset. However, we also reset the
  bottom margin to use \`rem\` units instead of \`em\`.
  */

    p {
      margin-top: 0;
      margin-bottom: ${theme.spacing[16]};
    }

    /*
  Abbreviations
  1. Remove the bottom border in Firefox 39-.
  2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
  3. Add explicit cursor to indicate changed behavior.
  4. Duplicate behavior to the data-* attribute for our tooltip plugin
  */

    abbr[title],
    abbr[data-original-title] {
      /* 4 */
      text-decoration: underline;
      text-decoration: underline dotted;
      cursor: help;
      border-bottom: 0;
    }

    address {
      margin-bottom: 1rem;
      font-style: normal;
      line-height: inherit;
    }

    ol,
    ul,
    dl {
      margin-top: 0;
      margin-bottom: 1rem;
    }

    ol ol,
    ul ul,
    ol ul,
    ul ol {
      margin-bottom: 0;
    }

    dt {
      font-weight: ${theme.fontWeight.title};
    }

    dd {
      /* Undo browser default */
      margin-bottom: 0.5rem;
      margin-left: 0;
    }

    blockquote {
      margin: 0 0 1rem;
    }

    dfn {
      /* Add the correct font style in Android 4.3- */
      font-style: italic;
    }

    b,
    strong {
      /* Add the correct font weight in Chrome, Edge, and Safari */
      font-weight: ${theme.fontWeight.title};
    }

    small {
      /* Add the correct font size in all browsers */
      font-size: ${theme.fontSize[14]};
    }

    /*
 Prevent \`sub\` and \`sup\` elements from affecting the line height in
  all browsers.
*/
    sub,
    sup {
      position: relative;
      font-size: 75%;
      line-height: 0;
      vertical-align: baseline;
    }

    sub {
      bottom: -0.25em;
    }
    sup {
      top: -0.5em;
    }

    /*
 Links
  Remove the gray background on active links in IE 10.
  Remove gaps in links underline in iOS 8+ and Safari 8+.
*/

    a {
      color: ${theme.colors.primary};
      text-decoration: none;

      background-color: transparent;
      -webkit-text-decoration-skip: objects;

      &:hover {
        text-decoration: underline;
      }
    }

    /*
  And undo these styles for placeholder links/named anchors (without href)
  which have not been made explicitly keyboard-focusable (without tabindex).
  It would be more straightforward to just use a[href] in previous block, but that
  causes specificity issues in many other styles that are too complex to fix.
  */

    a:not([href]):not([tabindex]) {
      color: inherit;
      text-decoration: none;

      &:hover,
      &:focus {
        color: inherit;
        text-decoration: none;
      }

      &:focus {
        outline: 0;
      }
    }

    /* Code */

    pre,
    code,
    kbd,
    samp {
      /* Correct the inheritance and scaling of font size in all browsers. */
      font-family: monospace, monospace;
      /* Correct the odd \`em\` font sizing in all browsers.*/
      font-size: 1em;
    }
    /* stylelint-enable font-family-no-duplicate-names */

    pre {
      /* Remove browser default top margin */
      margin-top: 0;
      /* Reset browser default of \`1em\` to use \`rem\`s */
      margin-bottom: 1rem;
      /* Don't allow content to break outside */
      overflow: auto;
      /* We have @viewport set which causes scrollbars to overlap content in IE11 and Edge, so */
      /* we force a non-overlapping, non-auto-hiding scrollbar to counteract. */
      -ms-overflow-style: scrollbar;
    }

    /*
Figures
*/
    figure {
      /* Apply a consistent margin strategy (matches our type styles). */
      margin: 0 0 1rem;
    }

    /* Images and content */
    img {
      vertical-align: middle;
      /* Remove the border on images inside links in IE 10-. */
      border-style: none;
    }

    svg:not(:root) {
      /* Hide the overflow in IE */
      overflow: hidden;
    }

    /* Tables  */
    table {
      /* *  Prevent double borders */
      border-collapse: collapse;
    }

    caption {
      padding-top: ${theme.spacing[16]};
      padding-bottom: ${theme.spacing[16]};
      color: ${theme.spacing[16]};
      text-align: left;
      caption-side: bottom;
    }

    th {
      /*  Matches default \`<td>\` alignment by inheriting from the \`<body>\`, or the
  closest parent with a set \`text-align\`. */
      text-align: inherit;
    }

    /* Forms */

    label {
      /* Allow labels to use \`margin\` for spacing. */
      display: inline-block;
      margin-bottom: 0;
    }

    /* Remove the default \`border-radius\` that macOS Chrome adds.
 Details at https://github.com/twbs/bootstrap/issues/24093     */

    button {
      border-radius: 0;
    }

    /*
  Work around a Firefox/IE bug where the transparent \`button\` background
  results in a loss of the default \`button\` focus styles.
  Credit: https://github.com/suitcss/base/
  */

    button:focus-visible {
      outline: 1px dotted;
      outline: 5px auto -webkit-focus-ring-color;
    }

    input,
    button,
    select,
    optgroup,
    textarea {
      /* Remove the margin in Firefox and Safari */
      margin: 0;
      font-family: inherit;
      font-size: inherit;
      line-height: inherit;
    }

    button,
    input {
      /* Show the overflow in Edge */
      overflow: visible;
    }

    button,
    select {
      /* Remove the inheritance of text transform in Firefox */
      text-transform: none;
    }

    /*
  1. Prevent a WebKit bug where (2) destroys native \`audio\` and \`video\`
    controls in Android 4.
  2. Correct the inability to style clickable types in iOS and Safari.
  */
    button,
    html [type='button'],
    [type='reset'],
    [type='submit'] {
      /* 2 */
      -webkit-appearance: button;
    }

    input[type='radio'],
    input[type='checkbox'] {
      /*  1. Add the correct box sizing in IE 10- */
      box-sizing: border-box;
      /* 2. Remove the padding in IE 10- */
      padding: 0;
    }

    input[type='date'],
    input[type='time'],
    input[type='datetime-local'],
    input[type='month'] {
      /* Remove the default appearance of temporal inputs to avoid a Mobile Safari
    bug where setting a custom line-height prevents text from being vertically
    centered within the input.
    See https://bugs.webkit.org/show_bug.cgi?id=139848
    and https://github.com/twbs/bootstrap/issues/11266 */
      -webkit-appearance: listbox;
    }

    textarea {
      /* Remove the default vertical scrollbar in IE. */
      overflow: auto;
      /* Textareas should really only resize vertically so they don't break their (horizontal) containers. */
      resize: vertical;
    }

    fieldset {
      /* Browsers set a default \`min-width: min-content;\` on fieldsets,
  unlike e.g. \`<div>\`s, which have \`min-width: 0;\` by default.
  So we reset that to ensure fieldsets behave more like a standard block element.
  See https://github.com/twbs/bootstrap/issues/12359
  and https://html.spec.whatwg.org/multipage/#the-fieldset-and-legend-elements */
      min-width: 0;
      /* Reset the default outline behavior of fieldsets so they don't affect page layout.*/
      padding: 0;
      margin: 0;
      border: 0;
    }

    /* 1. Correct the text wrapping in Edge and IE. */
    /* 2. Correct the color inheritance from \`fieldset\` elements in IE. */
    legend {
      display: block;
      width: 100%;
      /* 1 */
      max-width: 100%;
      padding: 0;
      margin-bottom: 0.5rem;
      font-size: 1.5rem;
      line-height: inherit;
      /* 2 */
      color: inherit;
      /* 1 */
      white-space: normal;
    }

    progress {
      /* Add the correct vertical alignment in Chrome, Firefox, and Opera. */
      vertical-align: baseline;
    }

    /* Correct the cursor style of increment and decrement buttons in Chrome. */
    [type='number']::-webkit-inner-spin-button,
    [type='number']::-webkit-outer-spin-button {
      height: auto;
    }

    [type='search'] {
      /*
    This overrides the extra rounded corners on search inputs in iOS so that our
    \`.form-control\` class can properly style them. Note that this cannot simply
    be added to \`.form-control\` as it's not specific enough. For details, see
    https://github.com/twbs/bootstrap/issues/11586.
    */
      /* 2. Correct the outline style in Safari. */
      outline-offset: -2px;
      -webkit-appearance: none;
    }

    /* Remove the inner padding and cancel buttons in Chrome and Safari on macOS. */

    [type='search']::-webkit-search-cancel-button,
    [type='search']::-webkit-search-decoration {
      -webkit-appearance: none;
    }

    /*
  1. Correct the inability to style clickable types in iOS and Safari.
  2. Change font properties to \`inherit\` in Safari.
  */
    ::-webkit-file-upload-button {
      /* 2 */
      font: inherit;
      /* 1 */
      -webkit-appearance: button;
    }

    /* Correct element displays */

    output {
      display: inline-block;
    }

    summary {
      /* Add the correct display in all browsers */
      display: list-item;
      cursor: pointer;
    }

    template {
      /* Add the correct display in IE */
      display: none;
    }

    /*
  Always hide an element with the \`hidden\` HTML attribute (from PureCSS).
  Needed for proper display in IE 10-.
  */
    [hidden] {
      display: none !important;
    }
  `;

  return <Global styles={rebootStyles} />;
};
