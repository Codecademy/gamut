function iconTemplate(
  { template },
  opts,
  { componentName, jsx /* imports, props, exports */ }
) {
  const typeScriptTpl = template.smart({ plugins: ['typescript'] });

  return typeScriptTpl.ast`
    import * as React from 'react';
    export interface GamutIconProps extends React.SVGProps<SVGSVGElement> {
      size?: number | string;
      title?: string;
      color?: string;
    }
    const ${componentName} = ({title, size, color, width, height, ...props}: GamutIconProps) => ${jsx};
    export default ${componentName};
  `;
}

module.exports = iconTemplate;
