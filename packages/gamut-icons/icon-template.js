const path = require('path');
const { startCase } = require('lodash');

function iconTemplate(api, opts, { jsx /* imports, props, exports */ }) {
  const template = api.template.smart({ plugins: ['typescript'] });
  const { componentName, filePath } = opts.state;
  const title = startCase(path.basename(filePath, '.svg'));
  const titleId = `gamut-icon-${Buffer.from(componentName).toString('base64')}`;
  return template.ast`
    import * as React from 'react';
    import { GamutIconProps } from '../types';
    const ${componentName} = React.forwardRef<SVGSVGElement, GamutIconProps>(({
      title = "${title}",
      titleId = "${titleId}",
      size,
      color,
      width,
      height,
      ...props
    },
      svgRef
    ) => ${jsx});
    export default ${componentName};
  `;
}
module.exports = iconTemplate;
