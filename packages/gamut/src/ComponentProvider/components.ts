import { StyledComponent } from '@emotion/styled';
import { ComponentProps, ComponentType } from 'react';

import { Anchor } from '../Anchor';

export interface LinkProps extends ComponentProps<typeof Anchor> {
  href: string;
}

export const componentRegistry = {
  link: {
    base: Anchor,
    replaceComponent: (
      base: StyledComponent<LinkProps>,
      override: ComponentType<LinkProps>
    ) => base.withComponent(override),
  },
};
