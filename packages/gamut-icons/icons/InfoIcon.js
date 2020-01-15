import * as React from 'react';
const SvgInfo = ({ title, size, color, width, height, ...props }) =>
  React.createElement(
    'svg',
    Object.assign(
      {
        fill: color || 'currentColor',
        viewBox: '0 0 24 24',
        width: size || width || '1em',
        height: size || height || '1em',
        role: 'img',
      },
      props
    ),
    React.createElement('title', null, title),
    React.createElement('path', {
      d:
        'M12.176 4a1.412 1.412 0 100 2.824 1.412 1.412 0 000-2.824zm-.338 4.49c-1.12.094-4.18 2.531-4.18 2.531-.187.141-.13.132.02.395.15.255.131.273.31.151.188-.122.5-.32 1.017-.64 1.995-1.28.32 1.675-.537 6.654-.339 2.466 1.883 1.195 2.457.819.564-.367 2.08-1.412 2.23-1.515.207-.141.057-.254-.103-.49-.113-.16-.226-.047-.226-.047-.612.405-1.732 1.252-1.882.716-.18-.537.969-4.217 1.6-6.749.103-.602.385-1.92-.706-1.826z',
    })
  );
export default SvgInfo;
//# sourceMappingURL=InfoIcon.js.map
