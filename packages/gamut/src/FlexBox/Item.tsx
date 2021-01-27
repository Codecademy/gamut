import React from 'react';

import { Container, ContainerProps } from './Container';

export const Item: React.FC<ContainerProps> = (props) => {
  return <Container {...props} />;
};

Item.displayName = 'Item';

Item.defaultProps = {
  flex: false,
};
