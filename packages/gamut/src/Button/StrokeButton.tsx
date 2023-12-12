import { createButtonComponent } from './shared';
import { sizeVariants, strokeButtonVariants } from './variants';

export const StrokeButton = createButtonComponent(
  sizeVariants,
  strokeButtonVariants
);

export const Test = () => {
  return (
    <>
      <StrokeButton mb={4} />
    </>
  );
};

const Hey = () => {
  return (
    <>
      <StrokeButton variant="ok" />
      <StrokeButton anything="ok" />
      <StrokeButton aria-label="hey" mb={30} href="/75">
        Click
      </StrokeButton>
      <StrokeButton aria-label="hey" mb={4}>
        Click
      </StrokeButton>
      <StrokeButton
        aria-label="hey"
        mb={4}
        tabIndex={-1}
        variant="primary"
        anything="quack"
      />
    </>
  );
};
