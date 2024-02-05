import { MiniKebabMenuIcon } from '@codecademy/gamut-icons';
import { useRef } from 'react';

import { Box } from '../Box';
import { CTAButton } from './CTAButton';
import { FillButton } from './FillButton';
import { IconButton } from './IconButton';
import { createButtonComponent } from './shared';
import { sizeVariants, strokeButtonVariants } from './variants';

export const StrokeButton = createButtonComponent(
  sizeVariants,
  strokeButtonVariants
);

// TEST : uncomment below

const HeyThisIsATest = () => {
  const myRef = useRef(null);
  return (
    <>
      <Box tabIndex={-1}>Hey</Box>
      <FillButton tabIndex="-1" mb={4} variant="secondary">
        hey
      </FillButton>
      <CTAButton anything="seventeen" mb={4}>
        hey
      </CTAButton>
      <StrokeButton variant="no" anything="seventeen" mb={54}>
        hey
      </StrokeButton>
      <StrokeButton href="/primary" anything="seventeen" mb={4}>
        hey
      </StrokeButton>
      <IconButton
        aria-label="icon menu"
        icon={MiniKebabMenuIcon}
        size="small"
        tabIndex={-1}
        ref={myRef}
        variant="primary"
        mb={4}
      />

      <IconButton
        aria-label={7}
        icon={MiniKebabMenuIcon}
        size="never"
        tabIndex={-1}
        variant="65"
        mb={4}
      />
    </>
  );
};
