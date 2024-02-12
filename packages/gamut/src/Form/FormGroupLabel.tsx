import { MiniInfoOutlineIcon } from '@codecademy/gamut-icons';
import { states, variant } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';
import { HTMLAttributes } from 'react';
import * as React from 'react';

import { Box, FlexBox } from '..';
import { DeprecatedToolTip, ToolTipProps } from '../Tip';
import { formBaseStyles, formFieldTextDisabledStyles } from './styles';

const labelSizeVariants = variant({
  defaultVariant: 'small',
  prop: 'size',
  base: { display: 'block', ...formBaseStyles },
  variants: {
    small: {
      lineHeight: 'title',
      mb: 4,
    },
    large: {
      fontSize: 22,
      lineHeight: 'base',
      fontWeight: 'title',
    },
  },
});

const labelPaddingVariants = variant({
  prop: 'tooltipPadding',
  variants: {
    'right-align': {
      mr: 16,
    },
    'left-align': {
      mr: 4,
    },
  },
});

const labelStates = states({
  disabled: formFieldTextDisabledStyles,
});

export interface LabelVariants
  extends StyleProps<typeof labelSizeVariants>,
    StyleProps<typeof labelPaddingVariants>,
    StyleProps<typeof labelStates> {}

export type FormToolTipProps = ToolTipProps & {
  position?: 'left-align' | 'right-align';
};
export type FormGroupLabelProps = HTMLAttributes<HTMLDivElement> &
  HTMLAttributes<HTMLLabelElement> &
  LabelVariants & {
    /**
     * [The for/id string of a label or labelable form-related element](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/htmlFor). The outer FormGroup or FormLabel should have an identical string as the inner FormElement for accessibility purposes.
     */
    htmlFor?: string;
    tooltip?: ToolTipProps;
    showRequired?: boolean;
    size?: 'small' | 'large';
  };

const Label = styled.label<FormGroupLabelProps>(
  labelSizeVariants,
  labelPaddingVariants,
  labelStates
);

const getToolTip = (tooltip: FormToolTipProps) => {
  const isToolTipRightAlign = tooltip.position !== 'left-align';

  const targetProps = isToolTipRightAlign
    ? ({ size: '0.8rem', 'aria-hidden': 'false', mb: 4 } as const)
    : ({ size: '1rem', 'aria-hidden': 'false' } as const);

  const ToolTipComponent = (
    <DeprecatedToolTip
      alignment="bottom-right"
      focusable
      target={<MiniInfoOutlineIcon {...targetProps} />}
      {...tooltip}
    />
  );

  if (isToolTipRightAlign) {
    return (
      <Box as="span" position="absolute" left="calc(100% - 1.1rem)">
        {ToolTipComponent}
      </Box>
    );
  }

  return <>{ToolTipComponent}</>;
};

const getToolTipPadding = (tooltip: FormToolTipProps) =>
  tooltip?.position || 'right-align';

export const FormGroupLabel: React.FC<FormGroupLabelProps> = ({
  children,
  className,
  disabled,
  htmlFor,
  tooltip,
  showRequired,
  size,
  ...rest
}) => {
  return (
    <FlexBox>
      <Label
        {...rest}
        htmlFor={htmlFor}
        disabled={disabled}
        tooltipPadding={tooltip ? getToolTipPadding(tooltip) : undefined}
        className={className}
        size={size}
        as={htmlFor ? 'label' : 'div'}
      >
        {children}
        {showRequired ? ' *' : ''}
      </Label>
      {tooltip && getToolTip(tooltip)}
    </FlexBox>
  );
};
