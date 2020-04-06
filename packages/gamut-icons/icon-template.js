const path = require('path');
const { startCase } = require('lodash');

function iconTemplate(api, opts, { jsx /* imports, props, exports */ }) {
  const template = api.template.smart({ plugins: ['typescript'] });
  const { componentName, filePath } = opts.state;
  const exportName = componentName.replace('Svg', '');
  const title = startCase(path.basename(filePath, '.svg'));
  const baseTitleId = `gamut-icon-${Buffer.from(componentName).toString(
    'base64'
  )}`;

  return template.ast`
    import * as React from 'react';
    import { GamutIconProps } from '../types';
    export const ${exportName} = React.forwardRef<SVGSVGElement, GamutIconProps>(({
      title = "${title}",
      titleId = '',
      size,
      color,
      width,
      height,
      ...props
    },
      svgRef
    ) => {
      titleId = "${baseTitleId}" + titleId;
      return ${jsx};
    });

    export default ${exportName};
  `;
}
module.exports = iconTemplate;
