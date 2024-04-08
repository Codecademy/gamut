import { MiniChevronDownIcon } from '@codecademy/gamut-icons';
import * as React from 'react';

import { Rotation } from '../../Animation';
import { FlexBox } from '../../Box/FlexBox';
import { TextButton } from '../../Button/TextButton';
import { RowChange } from '..';

export interface ExpandColProps {
  expanded?: boolean;
  onExpand?: RowChange<any>;
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
  <FlexBox mt={{ _: 8, xs: 0 }} pl={{ _: 0, xs: 16 }} width={1} center>
    <TextButton
      disabled={disabled}
      variant="secondary"
      width={{ _: 1, xs: 32 }}
      size="small"
      onClick={() => {
        onExpand?.({ rowId: id, toggle: expanded });
      }}
      aria-label={`Expand ${id} Row`}
      aria-expanded={expanded}
    >
      <Rotation rotated={expanded}>
        <MiniChevronDownIcon aria-hidden color="text-disabled" />
      </Rotation>
    </TextButton>
  </FlexBox>
);
