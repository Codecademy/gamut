import {
  MiniInfoCircleIcon,
  MiniInfoOutlineIcon,
} from '@codecademy/gamut-icons';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import { ComponentProps, forwardRef } from 'react';

import type { ButtonBaseProps, ButtonElementProps } from '../../Button/shared';
import { createButtonComponent } from '../../Button/shared';
import { ButtonBaseElements as ButtonBaseElementsValue } from '../../ButtonBase/ButtonBase';
import type { InfoTipProps } from '.';
import {
  infoButtonStates,
  InfoButtonStatesProps,
  infoButtonStyles,
} from './styles';

const InfoTipButtonBase = createButtonComponent<InfoButtonStatesProps>(
  infoButtonStyles,
  infoButtonStates
);

/** Props for InfoTipButton. Use when wrapping or composing InfoTipButton. */
export interface InfoTipButtonProps
  extends ButtonBaseProps,
    ButtonElementProps,
    Pick<InfoTipProps, 'emphasis'> {
  active?: boolean;
}

const InfoTipButtonComponent = forwardRef<
  ButtonBaseElementsValue,
  ComponentProps<typeof InfoTipButtonBase> & Pick<InfoTipProps, 'emphasis'>
>(
  (
    {
      active,
      children,
      emphasis,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledby,
      ...props
    },
    ref
  ) => {
    const Icon = emphasis === 'high' ? MiniInfoCircleIcon : MiniInfoOutlineIcon;

    return (
      <InfoTipButtonBase
        {...props}
        active={active}
        aria-expanded={active}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        ref={ref}
      >
        {Icon && (
          <Icon
            aria-hidden
            height="calc(100% - 4px)"
            width="calc(100% - 4px)"
          />
        )}
        {children}
      </InfoTipButtonBase>
    );
  }
);

export const InfoTipButton =
  InfoTipButtonComponent as unknown as ForwardRefExoticComponent<
    InfoTipButtonProps & RefAttributes<ButtonBaseElementsValue>
  >;
