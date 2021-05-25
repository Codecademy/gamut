const path = require('path');
const { startCase } = require('lodash/fp');

function iconTemplate(api, opts, { jsx /* imports, props, exports */ }) {
  const template = api.template.smart({ plugins: ['jsx', 'typescript'] });
  const { componentName, filePath } = opts.state;
  const exportName = componentName.replace('Svg', '');
  const title = startCase(path.basename(filePath, '.svg'));

  return template.ast`
    import * as React from 'react';
    import { ClassNames, useTheme } from '@emotion/react';
    import { GamutIconProps } from '../../types';
    import { getAttrValue, IconStyleProps, iconStyles } from '../../props';
    const LocalIcon = React.forwardRef<SVGSVGElement, GamutIconProps>(({
      title = "${title}",
      titleId,
      size,
      color,
      width,
      height,
      className: cn,
      ...rest
    },
      svgRef
    ) => {
      const theme = useTheme();
      const props = rest as Omit<GamutIconProps, keyof IconStyleProps>;
      return <ClassNames>{({ css, cx }) => {
        const classNames = cx(cn, css(iconStyles({ ...props, width, height, theme })));
        return ${jsx}
      }}</ClassNames>;
    });
    export const ${exportName} = LocalIcon;
  `;
}
module.exports = iconTemplate;
