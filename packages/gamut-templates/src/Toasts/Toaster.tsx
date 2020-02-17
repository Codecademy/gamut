import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Toast from './Toast';

import s from './styles/Toaster.module.scss';

type ToastShape = {
  id: string;
  icon: any;
  onClose: () => void;
  onClick: () => void;
  message: any;
};

type ToasterProps = {
  toasts: ToastShape[];
};

const Toaster: React.FC<ToasterProps> = ({ toasts }) => {
  return (
    <div className={s.container}>
      <AnimatePresence>
        {toasts.map(({ id, icon, onClose, onClick, message }, i) => {
          return (
            <motion.div
              key={id}
              style={{ zIndex: toasts.length - i }}
              className={s.animate}
              animate={{
                y: (toasts.length - (i + 1)) * -110,
                opacity: 1,
              }}
              exit={{
                x: '115%',
                y: (toasts.length - (i + 1)) * -110,
              }}
              positionTransition
            >
              <Toast icon={icon} onClose={onClose} onClick={onClick}>
                {message}
              </Toast>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default Toaster;
