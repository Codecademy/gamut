import figma from '@figma/code-connect';

import { AddBoldIcon } from '../gamut/src/Atoms/Icons/AddBoldIcon';

figma.connect(
  AddBoldIcon,
  'https://www.figma.com/design/ReGfRNillGABAj5SlITalN/%F0%9F%93%90-Gamut?node-id=15801-19793&m=dev',
  {
    example: () => AddBoldIcon,
  }
);
