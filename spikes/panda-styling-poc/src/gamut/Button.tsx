import { styled } from 'styled-system/jsx';
import { button } from 'styled-system/recipes';

/* `styled(tag, recipe)` — Panda's styled factory. This is the direct analog of
 * gamut `createButtonComponent = styled(ButtonBase)(sizeVariants, fillButtonVariants)`.
 * The factory itself is re-exported FROM Gamut (see ./index.ts), so consumers
 * never import `@emotion/styled`. */
export const Button = styled('button', button);
