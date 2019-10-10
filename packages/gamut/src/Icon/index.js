import React from 'react';
import iconMap from './iconMap';
/**
 * @deprecated Directly import icons from @codecademy/gamut instead.
 */
function Icon({ name, size, ...props }) {
  const MappedIcon = iconMap[name];
  const { label, ...iconProps } = props;
  if (label) {
    iconProps['aria-label'] = label;
  }
  if (size) {
    iconProps.width = size;
    iconProps.height = size;
  }
  return React.createElement(MappedIcon, Object.assign({}, iconProps));
}
export default Icon;
//# sourceMappingURL=index.js.map
