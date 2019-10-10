import React from 'react';
import { defaultIconProps } from '../defaultIconProps';
const TerminalIcon = props => {
  return React.createElement(
    'svg',
    Object.assign({}, props),
    React.createElement('title', null, 'Terminal Icon'),
    React.createElement('path', {
      d: 'M2 4v16h20V4H2zm19 15H3V7h18v12zM3 6V5h18v.998L3 6z',
    }),
    React.createElement('path', { d: 'M4 8h1v2H4z' })
  );
};
TerminalIcon.defaultProps = defaultIconProps;
export default TerminalIcon;
//# sourceMappingURL=TerminalIcon.js.map
