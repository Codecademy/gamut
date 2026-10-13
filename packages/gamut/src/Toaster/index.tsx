import { ColorMode, ColorModes } from '@codecademy/gamut-styles';
import { AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';
import * as React from 'react';

import { ToastProps } from '..';
import { FadeInSlideOut } from '../Animation/FadeInSlideOut';
import { BodyPortal } from '../BodyPortal';
import { Box } from '../Box';
import { Toast } from '../Toast/Toast';

interface ToasterItem extends Omit<ToastProps, 'onClose'> {
  id: string;
  children?: ReactNode;
}

export type ToasterProps = {
  toasts: ToasterItem[];
  onClose: (id: string) => void;
  colorMode?: ColorModes;
};

export const Toaster: React.FC<ToasterProps> = ({
  toasts = [],
  onClose,
  colorMode = 'light',
  ...rest
}) => {
  return (
    // TEMPORARY: zIndex override to stay above Overlay's default of 3 until GM-624 lands a shared z-index scale
    <BodyPortal zIndex={4}>
      <ColorMode mode={colorMode}>
        <Box
          aria-live="polite"
          bottom={88}
          position="fixed"
          right={16}
          {...rest}
        >
          <AnimatePresence>
            {toasts.map(({ id, children, ...toast }) => (
              <FadeInSlideOut key={id}>
                <Toast {...toast} onClose={() => onClose(id)}>
                  {children}
                </Toast>
              </FadeInSlideOut>
            ))}
          </AnimatePresence>
        </Box>
      </ColorMode>
    </BodyPortal>
  );
};
