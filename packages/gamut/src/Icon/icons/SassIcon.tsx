import React, { SVGProps } from 'react';

import { defaultIconProps } from '../defaultIconProps';

export const SassIcon: React.FC<SVGProps<SVGSVGElement>> = props => {
  return (
    <svg {...props}>
      <title>Sass Icon</title>
      <path d="M21.925 7.996v-.978l-3.798 2.291.406.734 2.175-1.312v2.752l-4.743 2.861v1.468l5.96-3.596V7.997zM9.897 15.42v-4.45l.63-.38.347.628v3.616l-.977.585zm1.604-5.61l-.218-.394-.108-.194-1.278.771-1.217.734V17.126l2.194-1.315v.494l1.216-.733V9.456l-.59.354z" />
      <path d="M6.544 17.45l-3.045 1.837v-4.453l3.045-1.836v4.452zm7.442-15.448h-.92L9.426 2 2.044 6.455l.001 1.516-.001 1.467 4.389 2.648L2.28 14.59V21l5.48-3.305v-5.431l.476-.287v-.98l-.588.355-4.387-2.647V7.189l6.493-3.918h3.015v1.553L8.68 7.291V8.76l5.309-3.202V4.089l-.003-2.087zM13.822 9.612V7.626l-1.216.736v1.582l1.805 3.263-.878.53-.522-.945v1.254h-.002v.971l2.856-1.722zM18.813 11.516l-2.042-3.69V5.849l-1.217.733v1.582l1.803 3.26-.878.53-.521-.943V13.238z" />
    </svg>
  );
};

SassIcon.defaultProps = defaultIconProps;

export default SassIcon;
