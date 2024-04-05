import { useId } from '@reach/auto-id';
import { ComponentProps, forwardRef } from 'react';

import { ButtonBaseElements } from '../ButtonBase/ButtonBase';
import { ToolTip, ToolTipProps } from '../Tip';
import {
  createButtonComponent,
  IconComponentType,
  iconSizeVariants,
  textButtonVariants,
} from './shared';

const IconButtonBase = createButtonComponent(
  iconSizeVariants,
  textButtonVariants
);

export type IconButtonProps = ComponentProps<typeof IconButtonBase> &
  IconComponentType & {
    'aria-label'?: string;
    tip: string;
    tipProps?: Omit<ToolTipProps, 'info' | 'id' | 'children' | 'hasLabel'>;
  };

export const IconButton = forwardRef<ButtonBaseElements, IconButtonProps>(
  (
    {
      'aria-label': ariaLabel,
      icon: Icon,
      tip,
      tipProps,
      variant = 'secondary',
      ...props
    },
    ref
  ) => {
    const tipId = useId();

    const firstWord = tip?.split(' ')[0] ?? tip;

    const hasRepetitiveLabel =
      ariaLabel?.toLowerCase() === firstWord?.toLowerCase() || !ariaLabel;

    const trueAriaLabel = ariaLabel ?? firstWord;

    return (
      <ToolTip
        info={tip}
        id={tipId}
        hasRepetitiveLabel={hasRepetitiveLabel}
        {...(tipProps as any)}
        l
      >
        <IconButtonBase
          {...props}
          variant={variant}
          ref={ref}
          aria-describedby={tipId}
          aria-label={trueAriaLabel}
        >
          <Icon
            width="calc(100% - 14px)"
            height="calc(100% - 14px)"
            aria-hidden
          />
        </IconButtonBase>
      </ToolTip>
    );
  }
);
