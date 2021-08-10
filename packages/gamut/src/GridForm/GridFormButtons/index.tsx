import React, { ComponentProps } from 'react';
import { Mode, useFormContext } from 'react-hook-form';

import { Box } from '../../Box';
import { CTAButton, FillButton, TextButton } from '../../Button';
import { ButtonProps } from '../../Button/shared';
import { Column } from '../../Layout';
import { VisualTheme } from '../../theming/VisualTheme';

export type GridFormButtonsPosition = keyof typeof positions;

export type SubmitButtonType = 'cta' | 'fill';

export type GridFormSubmitProps = {
  contents: React.ReactNode;
  position?: GridFormButtonsPosition;
  size: ComponentProps<typeof Column>['size'];
  disabled?: ButtonProps['disabled'];
  mode?: VisualTheme;
  type?: SubmitButtonType;
  validation?: Mode;
};

export type GridFormCancelButtonProps = {
  children: React.ReactNode;
  href?: 'string';
  onClick?: () => void;
};

type CancelButtonProps = {
  cancel?: ButtonProps;
};

const positions = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
  stretch: 'stretch',
};

export const GridFormButtons: React.FC<
  GridFormSubmitProps & CancelButtonProps
> = ({
  validation,
  type,
  mode,
  disabled,
  contents,
  size,
  position,
  cancel,
}) => {
  const { formState } = useFormContext();
  const isDisabled =
    (validation === 'onChange' && !formState.isValid) || disabled;

  const getButton = () => {
    switch (type) {
      case 'cta':
        return (
          <CTAButton type="submit" mode={mode} disabled={isDisabled}>
            {contents}
          </CTAButton>
        );

      default:
        return (
          <FillButton type="submit" mode={mode} disabled={isDisabled}>
            {contents}
          </FillButton>
        );
    }
  };

  return (
    <Column size={size}>
      <Box
        mb={8}
        alignSelf="center"
        justifySelf={positions[position || 'left']}
      >
        {cancel && (
          <TextButton {...cancel} mr={32} data-testid="cancel-button" />
        )}
        {getButton()}
      </Box>
    </Column>
  );
};
