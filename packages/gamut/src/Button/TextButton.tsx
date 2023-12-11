import { createButtonComponent, createButtonComponent2 } from './shared';
import { sizeVariants, textButtonVariants } from './variants';

export const TextButton = createButtonComponent(
  'Text',
  textButtonVariants,
  sizeVariants
);
export const TextButtonAgain = createButtonComponent2(
  textButtonVariants,
  sizeVariants
);

const Test = () => (
  <>
    <TextButton variant="no" onClick={() => void} />
    <TextButtonAgain />
  </>
);
