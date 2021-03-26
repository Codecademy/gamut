import React from 'react';

import { Container, ContainerProps } from './Container';

/**
 * @deprecated
 */

export const Item: React.FC<ContainerProps> = (props) => {
  return <Container {...props} />;
};

Item.defaultProps = {
  flex: false,
};
