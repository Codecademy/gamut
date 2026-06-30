import { AriaOnFocus } from 'react-select';

import { ExtendedOption } from '../types';

export const onFocus: AriaOnFocus<ExtendedOption> = ({
  focused: { label, subtitle, rightLabel, disabled },
}) => {
  const formattedSubtitle = `, ${subtitle}`;
  const formattedRightLabel = `, ${rightLabel}`;

  return `You are currently focused on option ${label}${
    subtitle ? formattedSubtitle : ''
  } ${rightLabel ? formattedRightLabel : ''}${disabled ? ', disabled' : ''}`;
};
