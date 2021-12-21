const path = require('path');
const { startCase } = require('lodash');

function iconTemplate({ componentName, jsx }, { options, tpl }) {
  const title = startCase(path.basename(options.state.filePath, '.svg'));

  return tpl`
    import * as React from 'react';
    import { Svg, GamutIconProps } from '../../props';

    export const ${componentName}: React.ForwardRefExoticComponent<
      GamutIconProps & React.RefAttributes<SVGSVGElement>
    > = React.forwardRef(({
        title = "${title}",
        titleId,
        size = 16,
        height = size,
        width = size,
        ...props
      },
        ref
      ) => {
        return ${jsx};
      });
  `;
}

module.exports = iconTemplate;
