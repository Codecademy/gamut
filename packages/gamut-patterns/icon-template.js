const path = require('path');
const { startCase } = require('lodash');

function iconTemplate(api, opts, { jsx }) {
  const template = api.template.smart({ plugins: ['jsx', 'typescript'] });
  const { componentName, filePath } = opts.state;
  const exportName = componentName.replace('Svg', '');
  const title = startCase(path.basename(filePath, '.svg'));

  return template.ast`
    import * as React from 'react';
    \n
    import { Svg, PatternProps } from '../props';
    \n
    export const ${exportName} = React.forwardRef<SVGSVGElement, PatternProps>(({
      title = "${title}",
      titleId,
      ...props
    },
      svgRef
    ) => {
      return ${jsx};
    });
  `;
}
module.exports = iconTemplate;
