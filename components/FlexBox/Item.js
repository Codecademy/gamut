
import React from 'react';
import Container from './index';

class Item extends React.Component {

  static defaultProps = {
    flex: false
  };

  render() {
    return (
      <Container {...this.props} />
    );
  }
}

export default Item;
