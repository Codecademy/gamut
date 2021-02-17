import {
  Box,
  FillButton,
  IconButton,
  StrokeButton,
  TextButton,
} from '@codecademy/gamut/src';
import { MiniDeleteIcon, SearchIcon } from '@codecademy/gamut-icons';
import React from 'react';

export const buttons = [FillButton, IconButton, StrokeButton, TextButton];

export const sizes = ['normal', 'small'] as const;

export const ButtonScale = ({ mode }: { mode: 'dark' | 'light' }) => {
  const modes = [mode, `${mode}-alt`] as const;
  const grid = buttons.map(({ name }) => <Box key={`${name}-key`}>{name}</Box>);
  modes.forEach((mode: string) => {
    sizes.forEach((size) => {
      buttons.forEach((Component) => {
        const props = {
          key: `${Component.name}-${mode}-${size}`,
          mode: mode as 'dark' | 'light',
          size,
        };
        if (Component.name === 'IconButton') {
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
    <Box
      display="grid"
      alignItems="center"
      justifyItems="start"
      gridTemplateColumns="repeat(4, minmax(50px, max-content))"
      gridAutoRows="3rem"
      columnGap={32}
      rowGap={16}
      padding={32}
      backgroundColor={mode === 'dark' ? 'navy' : 'white'}
      textColor={mode === 'dark' ? 'white' : 'navy'}
    >
      {grid}
    </Box>
  );
};
