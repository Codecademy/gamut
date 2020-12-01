import React from 'react';

import { Heading } from '@codecademy/gamut';

export type TitleProps = {
  isPageHeading?: boolean;
  className?: string;
  testId?: string;
};

export const Title: React.FC<TitleProps> = ({
  isPageHeading,
  className,
  testId,
  children,
}) => (
  <Heading
    as={isPageHeading ? 'h1' : 'h2'}
    fontSize={
      isPageHeading
        ? {
            lg: 'xxl',
            sm: 'xl',
            xs: 'lg',
          }
        : {
            lg: 'lg',
            xs: 'md',
          }
    }
    className={className}
    testId={testId}
    hideMargin
  >
    {children}
  </Heading>
);
