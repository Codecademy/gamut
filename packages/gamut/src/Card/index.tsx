import * as React from 'react';

import { AnchorWrapper, CardWrapper } from './elements';
import { CardProps } from './types';

// export interface CardProps {
//   variant?: 'navy' | 'white' | 'hyper' | 'yellow' | 'beige';
// }

export const Card: React.FC<CardProps> = ({
  href = '',
  onClick,
  children,
  variant = 'default',
  shadow = 'none',
  pattern,
  ...rest
}) => {
  const isInteractive = Boolean(href);

  const cardWrapper = (
    <CardWrapper
      variant={variant}
      shadow={shadow}
      isInteractive={isInteractive}
      pattern={pattern}
      {...rest}
    >
      {children}
    </CardWrapper>
  );

  if (isInteractive) {
    return (
      <AnchorWrapper
        variant="interface"
        href={href}
        onClick={onClick}
        hoverState={shadow === 'patternRight' ? 'hoverRight' : 'default'}
      >
        {cardWrapper}
      </AnchorWrapper>
    );
  }
  return <>{cardWrapper}</>;
};
