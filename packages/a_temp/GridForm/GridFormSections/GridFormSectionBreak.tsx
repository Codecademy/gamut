import { system } from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';
import styled from '@emotion/styled';
import * as React from 'react';

import { Column } from '../../Layout/Column';

const hrProps = variance.compose(system.border, system.color, system.layout);

export interface HrProps extends StyleProps<typeof hrProps> {}

export const SectionBreak = styled('hr')<HrProps>(hrProps);

export const GridFormSectionBreak: React.FC = () => {
  return (
    <Column size={12} aria-hidden>
      <SectionBreak
        borderTop="none"
        borderX="none"
        border={1}
        borderColorBottom="text"
        data-testid="form-section-break"
        width="100%"
      />
    </Column>
  );
};
