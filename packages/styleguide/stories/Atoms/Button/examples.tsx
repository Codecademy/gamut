import {
  Box,
  FillButton,
  GridBox,
  IconButton,
  StrokeButton,
  TextButton,
} from '@codecademy/gamut';
import { MiniDeleteIcon, SearchIcon } from '@codecademy/gamut-icons';
import React from 'react';

const buttons = [FillButton, IconButton, StrokeButton, TextButton];
const variants = ['primary', 'secondary'] as const;
const sizes = ['normal', 'small'] as const;

export const ButtonScale = ({ mode }: { mode: 'dark' | 'light' }) => {
  const grid = buttons.map(({ displayName }) => (
    <Box key={`${displayName}-key`}>{displayName}</Box>
  ));
  variants.forEach((variant: typeof variants[number]) => {
    sizes.forEach((size) => {
      buttons.forEach((Component) => {
        const props = {
          key: `${Component.displayName}-${mode}-${variant}-${size}`,
          mode,
          variant,
          size,
        };
        if (Component.displayName === 'IconButton') {
          return grid.push(
            <IconButton
              {...props}
              icon={size === 'small' ? MiniDeleteIcon : SearchIcon}
            />
          );
        }
        grid.push(<Component {...props}>{mode}</Component>);
      });
    });
  });

  return (
    <GridBox
      alignItems="center"
      justifyItems="start"
      gridTemplateColumns="repeat(4, minmax(50px, max-content))"
      gridAutoRows="3rem"
      columnGap={32}
      rowGap={16}
      p={32}
      bg={mode === 'dark' ? 'navy' : 'white'}
      textColor={mode === 'dark' ? 'white' : 'navy'}
    >
      {grid}
    </GridBox>
  );
};
