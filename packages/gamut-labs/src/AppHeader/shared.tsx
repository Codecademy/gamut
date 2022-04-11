import { Anchor, Text } from '@codecademy/gamut';
import { ArrowChevronDownFilledIcon } from '@codecademy/gamut-icons';
import { css, pxRem, states } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import React from 'react';

export const appHeaderMobileBreakpoint = 'lg' as const;

export type AnimatedHeaderZoneProps = {
  visible?: boolean;
};

const animatedPopoverVariants: Variants = {
  enter: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export const AnimatedHeaderZone: React.FC<AnimatedHeaderZoneProps> = ({
  children,
  visible,
}) => {
  return visible ? (
    <AnimatePresence>
      <motion.div
        animate="enter"
        exit="exit"
        initial="exit"
        variants={animatedPopoverVariants}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  ) : null;
};

export const DropdownAnchor = styled(Anchor)(
  css({
    alignItems: `center`,
    display: `flex`,
    padding: `0.5rem 0`,
    textAlign: `center`,
    whiteSpace: `nowrap`,

    '&:focus::before': {
      opacity: 1,
    },
  })
);

export const DropdownIcon = styled(ArrowChevronDownFilledIcon)(
  css({
    marginLeft: pxRem(5),
    transition: `transform 0.35s ease-out`,
    transformOrigin: `center ${pxRem(5)}`,
  }),
  states({
    open: {
      transform: `rotate(-180deg)`,
    },
  })
);

export const StyledText = styled(Text)(
  css({
    '&::after': {
      display: `block`,
      content: `attr(title)`,
      fontWeight: `bold`,
      height: `1px`,
      color: `transparent`,
      overflow: `hidden`,
      visibility: `hidden`,
    },
  })
);

export const StyledDropdown = styled(motion.div)(
  css({
    bg: `background`,
    borderColor: `secondary`,
    borderStyle: `solid`,
    overflow: `hidden`,
    position: `absolute`,
  })
);
