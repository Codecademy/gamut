import { Box } from '../Box';
import { CTAButton } from './CTAButton';
import { IconButton } from './IconButton';
import { ButtonProps, createButtonComponent } from './shared';
import { sizeVariants, strokeButtonVariants } from './variants';

export const StrokeButton = createButtonComponent(
  sizeVariants,
  strokeButtonVariants
);

const Hey = () => {
  return (
    <>
      <Box anything="seventeen">Hey</Box>
      <CTAButton anything="seventeen" mb={54}>
        hey
      </CTAButton>
      <StrokeButton variant="no" anything="seventeen" mb={54}>
        hey
      </StrokeButton>
      <IconButton
        variant="no"
        anything="seventeen"
        tabIndex="seventeen"
        mb={54}
      />
    </>
  );
};
