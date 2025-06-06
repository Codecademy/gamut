function iconTemplate(api, opts, { jsx }) {
  const template = api.template.smart({ plugins: ['jsx', 'typescript'] });
  const { componentName } = opts.state;
  const exportName = componentName.replace('Svg', '');

  return template.ast`
    import * as React from 'react';
    import { Svg, GamutIconProps } from '../../props';
    import { useIconId } from '../../useIconId';

    export const ${exportName} = React.forwardRef<SVGSVGElement, GamutIconProps>(({
      title,
      titleId,
      size = 16,
      strokeWidth= 1.5,
      height = size,
      width = size,
      ...props
    },
      svgRef
    ) => {
      const maskId = useIconId('${exportName}');

      return ${jsx};
    }) as React.ForwardRefExoticComponent<
    GamutIconProps & React.RefAttributes<SVGSVGElement>
  >;
  `;
}
module.exports = iconTemplate;
