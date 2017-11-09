import React from 'react';
import Container from './Container';

class Item extends React.Component {
  static displayName = 'Item';
  static defaultProps = {
    flex: false,
  };

  render() {
    return <Container {...this.props} />;
  }
}

export default Item;
