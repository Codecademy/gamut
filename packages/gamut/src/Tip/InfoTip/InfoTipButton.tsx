import {
  MiniInfoCircleIcon,
  MiniInfoOutlineIcon,
} from '@codecademy/gamut-icons';
import { ComponentProps, forwardRef } from 'react';

import { createButtonComponent } from '../../Button/shared';
import { ButtonBaseElements } from '../../ButtonBase/ButtonBase';
import { InfoTipProps } from '.';
import {
  InfoButtonStatesProps,
  infoButtonStyles,
  infoVisibilityStates,
} from './styles';

const InfoTipButtonBase = createButtonComponent<InfoButtonStatesProps>(
  infoButtonStyles,
  infoVisibilityStates
);

export type InfoTipsButtonProps = ComponentProps<typeof InfoTipButtonBase> &
  Pick<InfoTipProps, 'emphasis'>;

export const InfoTipButton = forwardRef<
  ButtonBaseElements,
  InfoTipsButtonProps
>(({ active, children, emphasis, ...props }, ref) => {
  const Icon = emphasis === 'high' ? MiniInfoCircleIcon : MiniInfoOutlineIcon;

  return (
    <InfoTipButtonBase
      active={active}
      aria-label="Information"
      {...props}
      ref={ref}
    >
      {Icon && (
        <Icon width="calc(100% - 4px)" height="calc(100% - 4px)" aria-hidden />
      )}
      {children}
    </InfoTipButtonBase>
  );
});
