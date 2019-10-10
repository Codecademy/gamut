import React from 'react';
import { defaultIconProps } from '../defaultIconProps';
const VideoIcon = props => {
  return React.createElement(
    'svg',
    Object.assign({}, props),
    React.createElement('title', null, 'Video Icon'),
    React.createElement('path', {
      d: 'M18 12L6 20V4z',
      fill: 'currentColor',
      fillRule: 'evenodd',
    })
  );
};
VideoIcon.defaultProps = defaultIconProps;
export default VideoIcon;
//# sourceMappingURL=VideoIcon.js.map
