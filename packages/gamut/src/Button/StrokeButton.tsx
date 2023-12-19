import { Box, Box } from 'framer-motion';

import { CTAButton } from './CTAButton';
import { IconButton } from './IconButton';
import { createButtonComponent } from './shared';
import { sizeVariants, strokeButtonVariants } from './variants';

export const StrokeButton = createButtonComponent(
  sizeVariants,
  strokeButtonVariants
);

const Hey = () => {
  return (
    <>
      <Box anything="seventeen">Hey</Box>
      <CTAButton anything="seventeen" mb={4}>
        hey
      </CTAButton>
      <StrokeButton variant="no" anything="seventeen" mb={54}>
        hey
      </StrokeButton>
      <IconButton
        variant="primary"
        anything="seventeen"
        tabIndex="seventeen"
        mb={4}
      />
    </>
  );
};
