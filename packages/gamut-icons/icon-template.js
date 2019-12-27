function iconTemplate(
  { template },
  opts,
  { componentName, jsx /* imports, props, exports */ }
) {
  const typeScriptTpl = template.smart({ plugins: ['typescript'] });
  console.log(componentName);
  return typeScriptTpl.ast`
    import * as React from 'react';
    export type ${componentName}Props = React.SVGProps<SVGSVGElement> & {
      size?: number;
      title?: string;
      color?: string;
    }
    const ${componentName} = ({title, size, color, width, height, ...props}: GamutIconProps) => ${jsx};
    export default ${componentName};
  `;
}

module.exports = iconTemplate;
