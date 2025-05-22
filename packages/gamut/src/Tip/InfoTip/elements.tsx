import { css, states } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

import { Text } from '../../Typography';

const infoTipSRState = states({
  inlineScreenreader: {
    display: 'inline-block',
    height: '1px',
    width: '1px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    position: 'absolute',
    color: 'transparent',
    left: -9999,
    p: 0,
    m: 0,
    border: 'none',
  },
})

export const ScreenreaderNavigableText = styled(Text)(
  css({ position: 'absolute' }),
  infoTipSRState
);
