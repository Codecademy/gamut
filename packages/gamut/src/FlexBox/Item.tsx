import React from 'react';
import { Container, ContainerProps } from './Container';

export class Item extends React.Component<ContainerProps> {
  static displayName = 'Item';
  static defaultProps = {
    flex: false,
  };

  render() {
    return <Container {...this.props} />;
  }
}
