import { css, states } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

import { TableHeader } from '../../../List';

export interface StyledHeaderRowProps {
  invisible?: boolean;
}

export const StyledHeaderRow = styled(TableHeader)<StyledHeaderRowProps>(
  css({ border: 1, borderColor: 'transparent' }),
  states({ invisible: { visibility: 'hidden', height: 0, overflow: 'hidden' } })
);
