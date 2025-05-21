import { MiniChevronDownIcon } from '@codecademy/gamut-icons';
import * as React from 'react';

import { Rotation } from '../../Animation';
import { FlexBox } from '../../Box/FlexBox';
import { TextButton } from '../../Button/TextButton';
import { RowChange } from '../types';

export interface ExpandColProps {
  expanded?: boolean;
  onExpand?: RowChange<any>;
  // eslint-disable-next-line react/no-unused-prop-types
  ghost?: boolean;
  disabled?: boolean;
  id?: any;
}

export const ExpandControl: React.FC<ExpandColProps> = ({
  id,
  disabled,
  expanded,
  onExpand,
}) => (
  <FlexBox center mt={{ _: 8, xs: 0 }} pl={{ _: 0, xs: 16 }} width={1}>
    <TextButton
      aria-expanded={expanded}
      aria-label={`Expand ${id} Row`}
      disabled={disabled}
      size="small"
      variant="secondary"
      width={{ _: 1, xs: 32 }}
      onClick={() => {
        onExpand?.({ rowId: id, toggle: expanded });
      }}
    >
      <Rotation rotated={expanded}>
        <MiniChevronDownIcon color="secondary" />
      </Rotation>
    </TextButton>
  </FlexBox>
);
