import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

import { Text } from '../../Typography';

export const ScreenreaderNavigableText = styled(Text)(
  css({ display: 'absolute', position: 'relative' })
);
