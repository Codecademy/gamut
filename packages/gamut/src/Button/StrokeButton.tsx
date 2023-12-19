import { Box } from '../Box';
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
      <Box tabIndex={-1}>Hey</Box>
      <CTAButton tabIndex={-1} mb={4}>
        hey
      </CTAButton>
      <CTAButton anything="seventeen" mb={4}>
        hey
      </CTAButton>
      <StrokeButton variant="primary" anything="seventeen" mb={54}>
        hey
      </StrokeButton>
      <StrokeButton href="/primary" anything="seventeen" mb={4}>
        hey
      </StrokeButton>
      {/* <IconButton
        variant="primary"
        tabIndex={-1}
        mb={4}
        href="https://www.google.com"
      />
      <IconButton
        variant="no"
        anything="seventeen"
        tabIndex="seventeen"
        mb={4}
      /> */}
    </>
  );
};
