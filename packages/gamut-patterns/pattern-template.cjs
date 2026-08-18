const path = require('path');
const startCase = require('lodash/startCase');

function patternTemplate(api, opts, { jsx }) {
  const template = api.template.smart({ plugins: ['jsx', 'typescript'] });
  const { componentName, filePath } = opts.state;
  const exportName = componentName.replace('Svg', '');
  const title = startCase(path.basename(filePath, '.svg'));

  return template.ast`
    import * as React from 'react';
    import { Svg, PatternProps } from '../props';
    import { usePatternId } from '../usePatternId';

    export const ${exportName} = React.forwardRef<SVGSVGElement, PatternProps>(({
      title = "${title}",
      titleId,
      ...props
    },
      svgRef
    ) => {
      const patternId = usePatternId('${exportName}');

      return ${jsx};
    }) as React.ForwardRefExoticComponent<
      PatternProps & React.RefAttributes<SVGSVGElement>
    >;
  `;
}
module.exports = patternTemplate;
