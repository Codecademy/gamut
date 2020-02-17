import React, { HTMLAttributes } from 'react';

export type AvatarProps = HTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
  size?: number;
  width?: number;
  height?: number;
};

export function Avatar({ size = 70, ...props }: AvatarProps) {
  const { ...imageProps } = props;

  imageProps['aria-label'] = imageProps.alt;
  imageProps.width = size;
  imageProps.height = size;

  return <div {...imageProps} />;
}

export default Avatar;
