import { Box } from '@codecademy/gamut';
import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

// A plain flex/spacing wrapper -- every property here has a direct system-prop
// equivalent on Box/FlexBox.
export const CardShell = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

// A decorative glow -- the gradient isn't expressible as a prop, but the
// padding alongside it is.
export const GlowShell = styled(Box)(
  css({
    background: 'radial-gradient(circle, #3A10E5 0%, transparent 100%)',
    padding: 24,
  })
);
