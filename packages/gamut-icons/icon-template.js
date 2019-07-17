function template(
  { template },
  opts,
  { imports, componentName, props, jsx, exports }
) {
  const typeScriptTpl = template.smart({ plugins: ['typescript'] });
  return typeScriptTpl.ast`
    import * as React from 'react';
    export interface GamutIconProps extends React.SVGProps<SVGSVGElement> {
      size: number;
    }
    const ${componentName} = (props: GamutIconProps) => ${jsx};
    export default ${componentName};
  `;
}
module.exports = template;
