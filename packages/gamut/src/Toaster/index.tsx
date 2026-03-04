import { ColorMode, ColorModes } from '@codecademy/gamut-styles';
import { AnimatePresence } from 'motion/react';
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
        <Box aria-live="polite" bottom={88} position="fixed" right={16}>
          <AnimatePresence>
            {toasts.map((toast) => (
              <FadeInSlideOut key={toast.id}>
                <Toast
                  icon={toast.icon}
                  title={toast.title}
                  onClose={() => onClose(toast.id)}
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
