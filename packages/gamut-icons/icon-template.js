const path = require('path');
const { startCase } = require('lodash');

function iconTemplate(api, opts, { jsx /* imports, props, exports */ }) {
  const template = api.template.smart({ plugins: ['jsx', 'typescript'] });
  const { componentName, filePath } = opts.state;
  const exportName = componentName.replace('Svg', '');
  const title = startCase(path.basename(filePath, '.svg'));

  return template.ast`
    import * as React from 'react';
    import { ClassNames } from '@emotion/react';
    import { GamutIconProps } from '../../types';
    import { getForwardableProps, GamutIconProps, iconStyles } from '../../props';

    export const ${exportName} = React.forwardRef<SVGSVGElement, GamutIconProps>(({
      title = "${title}",
      titleId,
      size,
      className: cn,
      ...rest
    },
      svgRef
    ) => {
      const props = getForwardableProps(rest);
      return <ClassNames>{({ css, cx, theme }) => {
        const classNames = cx(cn, css(iconStyles({ ...rest, theme })));
        return ${jsx}
      }}</ClassNames>;
    });
  `;
}
module.exports = iconTemplate;
