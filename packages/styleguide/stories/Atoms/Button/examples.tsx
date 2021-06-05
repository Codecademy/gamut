import {
  Box,
  CTAButton,
  FillButton,
  GridBox,
  IconButton,
  StrokeButton,
  TextButton,
} from '@codecademy/gamut';
import { MiniDeleteIcon, SearchIcon } from '@codecademy/gamut-icons';
import { ColorMode } from '@codecademy/gamut-styles';
import React from 'react';

const buttons = [FillButton, IconButton, StrokeButton, TextButton];
const variants = ['primary', 'secondary', 'danger'] as const;
const sizes = ['normal', 'small'] as const;
const states = ['', 'disabled', 'active', 'hover', 'focus-visible'];

export const ButtonScale = ({ mode }: { mode: 'dark' | 'light' }) => {
  const grid: any[] = [];
  variants.forEach((variant) => {
    let variantButtons = buttons;
    if (variant === 'primary') {
      variantButtons = [CTAButton, ...variantButtons];
    }
    variantButtons.forEach((Button) => {
      const buttonSizes = Button === CTAButton ? (['normal'] as const) : sizes;
      buttonSizes.forEach((size) => {
        states.forEach((state) => {
          grid.push(
            <Box
              className={state}
              key={`${Button.displayName}-${state}-${size}-${variant}`}
            >
              <Button
                disabled={state === 'disabled'}
                variant={variant}
                size={size}
                icon={size === 'small' ? MiniDeleteIcon : SearchIcon}
              >
                {state || 'Normal'}
              </Button>
            </Box>
          );
        });
      });
    });
  });

  return (
    <ColorMode mode={mode}>
      <GridBox
        alignItems="center"
        justifyItems="start"
        gridTemplateColumns="repeat(5, minmax(0, 1fr))"
        gap={16}
        p={64}
        bg={mode === 'dark' ? 'navy' : 'white'}
        textColor={mode === 'dark' ? 'white' : 'navy'}
      >
        {grid}
      </GridBox>
    </ColorMode>
  );
};
