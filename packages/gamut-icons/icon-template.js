const path = require('path');
const { startCase } = require('lodash');

function iconTemplate(api, opts, { jsx /* imports, props, exports */ }) {
  const template = api.template.smart({ plugins: ['typescript'] });
  const { componentName, filePath } = opts.state;
  const title = startCase(path.basename(filePath, '.svg'));
  const titleId = `gamut-icon-${Buffer.from(componentName).toString('base64')}`;
  const ComponentIdentifier = `${componentName}: React.FC<GamutIconProps>`;
  const componentNameWithRef = `${componentName}Ref`;
  const RefComponent = `<${componentName} svgRef={ref} {...props} />`;
  return template.ast`
    import * as React from 'react';
    import { GamutIconProps } from '../types';
    const ${ComponentIdentifier} = ({ title = "${title}", titleId = "${titleId}", svgRef, size, color, width, height, ...props}) => ${jsx};
    const ${componentNameWithRef} = React.forwardRef((props: GamutIconProps, ref?: React.Ref<SVGSVGElement>) => ${RefComponent});
    export default ${componentNameWithRef};
  `;
}
module.exports = iconTemplate;
