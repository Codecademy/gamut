import { client } from '@figma/code-connect';
import fs from 'fs';

async function generateIcons() {
  // fetch components from a figma file. If the `node-id` query parameter is used,
  // only components within those frames will be included. This is useful if your
  // file is very large, as this will speed up the query by a lot
  let components = await client.getComponents(
    'https://www.figma.com/design/ReGfRNillGABAj5SlITalN/%F0%9F%93%90-Gamut?node-id=38228-2739'
  );

  // Converts icon names from e.g `icon-32-list` to `Icon32List`
  components = components
    .filter(({ name }) => {
      return name.includes('icon');
    })
    .map((component) => ({
      ...component,
      name: component.name
        .split(/[.-]/g)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(''),
    }));

  const uniqueNames = new Set([...components.map((c) => c.name)]);

  fs.writeFileSync(
    'icons.figma.tsx',
    `\
  import figma from '@figma/code-connect'

  import {
  ${Array.from(uniqueNames)
    .map((iconName) => `  ${iconName},`)
    .join('\n')}
  } from './packages/gamut-icons/icons/regular'

  const props = {
  height: figma.string('Height'),
  width: figma.string('Width'),
  color

}

  ${components
    .map((c) => `figma.connect(${c.name}, '${c.figmaUrl}')`)
    .join('\n')}
  `
  );
}

generateIcons();
