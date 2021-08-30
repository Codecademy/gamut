import React from 'react';

import { useComponent } from '../ComponentProvider';
import { LinkProps } from '../ComponentProvider/components';

export const Link: React.FC<LinkProps> = ({
  variant = 'interface',
  ...rest
}) => {
  const Component = useComponent('link');

  return <Component variant={variant} {...rest} />;
};
