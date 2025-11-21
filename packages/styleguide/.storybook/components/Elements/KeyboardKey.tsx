import styled from '@emotion/styled';
import { css } from '@codecademy/gamut-styles';

export const KeyboardKey = styled.kbd(
  css({
    mx: 2 as any,
    fontFamily: 'monospace',
    bg: 'background-selected',
    border: 1,
    borderColor: 'border-tertiary',
    borderRadius: 'sm',
    px: 4,
    py: 2 as any,
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
  })
);
