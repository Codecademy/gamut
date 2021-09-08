import { ColorMode } from '@codecademy/gamut-styles';
import { AnimatePresence } from 'framer-motion';
import React, { ReactNode } from 'react';

import { BodyPortal } from '../BodyPortal';
import { Box } from '../Box';
import { FadeInSlideOut } from '../Motion/FadeInSlideOut';
import { Toast } from '../Toast/Toast';

export type ToastProps = {
  id: string;
  name?: string;
  description: string;
  icon?: ReactNode;
  children?: React.ReactChild;
};

export type ToasterProps = {
  toasts: ToastProps[];
  onClose: (id: string) => void;
};

export const Toaster: React.FC<ToasterProps> = ({ toasts = [], onClose }) => {
  const closeToast = (id: string) => onClose(id);

  return (
    <BodyPortal>
      <ColorMode mode="light">
        <Box right={16} bottom={88} position="fixed" aria-live="polite">
          <AnimatePresence>
            {toasts.map((toast) => (
              <FadeInSlideOut key={toast.id}>
                <Toast
                  onClose={() => closeToast(toast.id)}
                  title={toast.name}
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
