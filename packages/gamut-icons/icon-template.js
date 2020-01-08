function iconTemplate(api, opts, { jsx /* imports, props, exports */ }) {
  const template = api.template.smart({ plugins: ['typescript'] });
  const { componentName } = opts.state;
  return template.ast`
    import * as React from 'react';
    import { GamutIconProps } from '../types';
    const ${componentName} = React.forwardRef<SVGSVGElement, GamutIconProps>(({
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
