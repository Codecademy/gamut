import { timingValues } from '@codecademy/gamut-styles';
import { motion } from 'framer-motion';

import { WithChildrenProp } from '../utils';

export const ExpandInCollapseOut: React.FC<WithChildrenProp> = ({
  children,
}) => {
  return (
    <motion.div
      animate="expanded"
      exit="collapsed"
      initial="collapsed"
      style={{ overflow: 'hidden' }}
      transition={{ duration: timingValues.medium / 1000, ease: 'easeInOut' }}
      variants={{
        expanded: { height: 'auto' },
        collapsed: { height: 0 },
      }}
    >
      {children}
    </motion.div>
  );
};
