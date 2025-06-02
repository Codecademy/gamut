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
    <Column aria-hidden size={12}>
      <SectionBreak
        border={1}
        borderColorBottom="border-primary"
        borderTop="none"
        borderX="none"
        data-testid="form-section-break"
        width="100%"
      />
    </Column>
  );
};
