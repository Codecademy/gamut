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
}) => {
  return (
    <BodyPortal>
      <ColorMode mode={colorMode}>
        <Box right={16} bottom={88} position="fixed" aria-live="polite">
          <AnimatePresence>
            {toasts.map((toast) => (
              <FadeInSlideOut key={toast.id}>
                <Toast
                  onClose={() => onClose(toast.id)}
                  title={toast.title}
                  icon={toast.icon}
                >
                  {toast.children}
                </Toast>
              </FadeInSlideOut>
            ))}
          </AnimatePresence>
        </Box>
      </ColorMode>
    </BodyPortal>
  );
};
