import {
  modeColorProps,
  pxRem,
  styledOptions,
  system,
} from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';
import styled from '@emotion/styled';
import React, { ComponentProps } from 'react';

interface AvatarImageProps
  extends StyleProps<typeof avatarProps>,
    StyleProps<typeof system['layout']>,
    StyleProps<typeof modeColorProps> {}

const avatarProps = variance.create({
  size: {
    property: 'width',
    properties: ['width', 'height'],
    scale: { 32: 32, 48: 48, 64: 64, 98: 98, 118: 118 },
    transform: (value: number) => pxRem(value),
  },
});

const AvatarImage = styled('img', styledOptions<'img'>())<AvatarImageProps>(
  modeColorProps,
  system.css({
    position: 'relative',
    borderRadius: '50%',
    objectFit: 'cover',
  }),
  system.layout,
  avatarProps
);

interface InputAvatarProps extends ComponentProps<typeof AvatarImage> {
  alt: string;
  'aria-labelledby'?: never;
}

interface PresentationalAvatarProps extends ComponentProps<typeof AvatarImage> {
  alt?: never;
  'aria-labelledby': string;
}

export type AvatarProps = InputAvatarProps | PresentationalAvatarProps;

export const Avatar: React.FC<AvatarProps> = ({ size = 118, ...rest }) => (
  <AvatarImage size={size} {...rest} />
);
