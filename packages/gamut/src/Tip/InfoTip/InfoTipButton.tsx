import {
  MiniInfoCircleIcon,
  MiniInfoOutlineIcon,
} from '@codecademy/gamut-icons';
import { ComponentProps, forwardRef } from 'react';

import { createButtonComponent } from '../../Button/shared';
import { ButtonBaseElements } from '../../ButtonBase/ButtonBase';
import { InfoTipProps } from '.';
import {
  infoButtonStates,
  InfoButtonStatesProps,
  infoButtonStyles,
} from './styles';

const InfoTipButtonBase = createButtonComponent<InfoButtonStatesProps>(
  infoButtonStyles,
  infoButtonStates
);

export type InfoTipButtonProps = ComponentProps<typeof InfoTipButtonBase> &
  Pick<InfoTipProps, 'emphasis'>;

export const InfoTipButton = forwardRef<ButtonBaseElements, InfoTipButtonProps>(
  ({ active, children, emphasis, ...props }, ref) => {
    const Icon = emphasis === 'high' ? MiniInfoCircleIcon : MiniInfoOutlineIcon;

    return (
      <InfoTipButtonBase
        active={active}
        aria-label="Information"
        {...props}
        ref={ref}
      >
        {Icon && (
          <Icon
            width="calc(100% - 4px)"
            height="calc(100% - 4px)"
            aria-hidden
          />
        )}
        {children}
      </InfoTipButtonBase>
    );
  }
);
