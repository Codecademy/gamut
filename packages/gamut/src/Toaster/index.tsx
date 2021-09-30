import { ColorMode } from '@codecademy/gamut-styles';
import { AnimatePresence } from 'framer-motion';
import React, { ReactNode, useEffect, useRef } from 'react';

import { ToastProps } from '..';
import { BodyPortal } from '../BodyPortal';
import { Box } from '../Box';
import { FadeInSlideOut } from '../Motion/FadeInSlideOut';
import { Toast } from '../Toast/Toast';

interface ToasterItem extends Omit<ToastProps, 'onClose'> {
  id: string;
  children?: ReactNode;
}

export type ToasterProps = {
  toasts: ToasterItem[];
  onClose: (id: string) => void;
};

export const Toaster: React.FC<ToasterProps> = ({ toasts = [], onClose }) => {
  return (
    <BodyPortal>
      <ColorMode mode="light">
        <Box
          right={16}
          bottom={88}
          position="fixed"
          role="status"
          aria-live="polite"
          aria-atomic="true"
          data-delay="10000"
        >
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
