import { ColorMode } from '@codecademy/gamut-styles';
import { AnimatePresence } from 'framer-motion';
import React, { ReactNode } from 'react';

import { BodyPortal } from '../BodyPortal';
import { Box } from '../Box';
import { Toast } from '../Toast/Toast';
import { Text } from '../Typography';
import { FadeInSlideOut } from './FadeInSlideOut';

export type NotificationEvent = {
  id: string;
  name?: string;
  description: string;
  icon?: ReactNode;
  children?: React.ReactChild;
};

export type ToasterProps = {
  toasts: NotificationEvent[];
  onClose: (ids: string) => void;
};

export const Toaster: React.FC<ToasterProps> = ({ toasts = [], onClose }) => {
  const renderToastByType = ({
    id,
    description,
    name,
    icon,
    children,
  }: NotificationEvent) => {
    const closeToast = () => onClose(id);

    return (
      <FadeInSlideOut key={id}>
        <Toast onClose={closeToast} title={name} icon={icon}>
          {children}
        </Toast>
      </FadeInSlideOut>
    );
  };

  return (
    <BodyPortal>
      <ColorMode mode="light">
        <Box right={16} bottom={88} position="fixed" aria-live="polite">
          <AnimatePresence>
            <Toast onClose={closeToast} title={name} icon={icon}>
              {toasts.map(renderToastByType)}
            </Toast>
          </AnimatePresence>
        </Box>
      </ColorMode>
    </BodyPortal>
  );
};
