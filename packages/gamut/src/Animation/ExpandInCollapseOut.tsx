import { motion } from 'framer-motion';

import { WithChildrenProp } from '../utils';

export const ExpandInCollapseOut: React.FC<WithChildrenProp> = ({
  children,
}) => {
  return (
    <motion.div
      initial="collapsed"
      exit="collapsed"
      animate="expanded"
      style={{ overflow: 'hidden' }}
      variants={{
        expanded: { height: 'auto' },
        collapsed: { height: 0 },
      }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
};
