import { styled } from 'styled-system/jsx';

/* The Gamut `Box` primitive — a styled `div` that accepts type-safe system-style
 * props (`padding`, `bg`, `color`, `borderColor`…) AND a `css` prop, directly.
 * This is the analog of `<Box padding={4} bg="primary" />` today — no className. */
export const Box = styled('div');
