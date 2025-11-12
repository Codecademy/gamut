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
  <FlexBox
    center
    mt={{ _: 0, c_base: 8, c_sm: 0 }}
    pl={{ _: 16, c_base: 0, c_sm: 16 }}
    pr={8}
    width={1}
  >
    <TextButton
      aria-expanded={expanded}
      aria-label={`Expand ${id} Row`}
      disabled={disabled}
      size="small"
      variant="secondary"
      width={{ _: 32, c_base: 1, c_sm: 32 }}
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
