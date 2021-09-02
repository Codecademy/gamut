import { ColorMode } from '@codecademy/gamut-styles';
import { AnimatePresence } from 'framer-motion';
import React, { ComponentProps } from 'react';

import { BodyPortal } from '../BodyPortal';
import { Box } from '../Box';
import { FadeInSlideOut } from '../Motion/FadeInSlideOut';
import { Toast } from './Toast';

export interface ToasterProps {
  inline?: boolean;
  /** Children may only be `<Toast />` elements */
  children:
    | React.ReactElement<ComponentProps<typeof Toast>>[]
    | React.ReactElement<ComponentProps<typeof Toast>>;
}

export const Toaster: React.FC<ToasterProps> = ({
  children,
  inline = false,
}) => {
  return (
    <BodyPortal>
      <ColorMode mode="light">
        <Box
          right={16}
          bottom={88}
          position={inline ? 'absolute' : 'fixed'}
          fit={inline}
          aria-live="polite"
        >
          <AnimatePresence>
            {React.Children.map(children, (toast) => (
              <FadeInSlideOut>{toast}</FadeInSlideOut>
            ))}
          </AnimatePresence>
        </Box>
      </ColorMode>
    </BodyPortal>
  );
};
