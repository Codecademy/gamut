import React from 'react';
import Container from './Container';
class Item extends React.Component {
  render() {
    return React.createElement(Container, Object.assign({}, this.props));
  }
}
Item.displayName = 'Item';
Item.defaultProps = {
  flex: false,
};
export default Item;
//# sourceMappingURL=Item.js.map
