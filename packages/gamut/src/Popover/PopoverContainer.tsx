import { system } from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';
import styled from '@emotion/styled';

export const getTransform = (
  xAlign: 'left' | 'right',
  yAlign: 'top' | 'bottom',
  inset: boolean
) => {
  const y = yAlign === 'top' ? '-100%' : '0%';
  let x: string;
  if (inset) {
    x = xAlign === 'left' ? '0%' : '-100%';
  } else {
    x = xAlign === 'left' ? '-100%' : '0%';
  }

  return `translate(${x} , ${y})`;
};

const popoverProps = variance.compose(
  system.positioning,
  variance.create({
    transform: {
      property: 'transform',
    },
  })
);

export const PopoverContainer = styled.div<StyleProps<typeof popoverProps>>(
  popoverProps
);
