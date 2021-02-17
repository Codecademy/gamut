import {
  Box,
  FillButton,
  IconButton,
  StrokeButton,
  TextButton,
} from '@codecademy/gamut/src';
import { MiniDeleteIcon, SearchIcon } from '@codecademy/gamut-icons';
import React, { ReactNode } from 'react';

export const buttons = [FillButton, IconButton, StrokeButton, TextButton];
const modes = {
  light: ['light', 'light-alt'],
  dark: ['dark', 'dark-alt'],
} as const;
export const sizes = ['normal', 'small'] as const;

export const ButtonScale = ({ mode }: { mode: 'dark' | 'light' }) => {
  const grid = [
    <Box />,
    ...buttons.map(({ name }) => (
      <Box key={`${name}-key`} fontSize={14} fontWeight="title">
        {name}
      </Box>
    )),
  ] as ReactNode[];
  modes[mode].forEach((mode: string) => {
    sizes.forEach((size) => {
      grid.push(
        <Box key={`${size}-${mode}-key`} fontSize={14}>
          {mode} <Box>{size}</Box>
        </Box>
      );

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
      gridTemplateColumns="repeat(5, minmax(50px, max-content))"
      gridAutoRows="3rem"
      columnGap={32}
      rowGap={16}
      padding={16}
      backgroundColor={mode === 'dark' ? 'navy' : 'white'}
      textColor={mode === 'dark' ? 'white' : 'navy'}
      zIndex={0}
    >
      {grid}
    </Box>
  );
};
