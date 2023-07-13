import {
  Box,
  Column,
  FillButton,
  FlexBox,
  LayoutGrid,
  Popover,
  PopoverProps,
} from '@codecademy/gamut';
import {
  CheckerDense,
  CheckerLoose,
  CheckerRegular,
  DiagonalADense,
  DiagonalALoose,
  DiagonalARegular,
} from '@codecademy/gamut-patterns';
import { useRef, useState } from 'react';

type PopoverExampleProps = PopoverProps & {
  p?: number;
};

export const PopoverExample = ({ p = 16, ...rest }: PopoverExampleProps) => {
  const [open, setOpen] = useState(false);
  const activeElRef = useRef<HTMLDivElement>(null);
  const toggleOpen = () => setOpen(!open);
  return (
    <>
      <Box ref={activeElRef}>
        <FillButton onClick={toggleOpen}>Open Popover</FillButton>
      </Box>
      <FlexBox>
        <Popover
          {...rest}
          isOpen={open}
          targetRef={activeElRef}
          onRequestClose={() => setOpen(false)}
        >
          <FlexBox flexDirection="column" p={p} alignItems="flex-start">
            <Box mb={8}>Hooray!</Box>
            <FillButton size="small" onClick={() => setOpen(false)}>
              Close Popover
            </FillButton>
          </FlexBox>
        </Popover>
      </FlexBox>
    </>
  );
};

export const PopoverWithoutFocus = (args: PopoverProps) => {
  const [open, setOpen] = useState(false);
  const activeElRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => setOpen(!open);

  return (
    <>
      <Box ref={activeElRef}>
        <FillButton onClick={toggleOpen}>Open Popover</FillButton>
      </Box>
      <FlexBox>
        <Popover
          {...args}
          isOpen={open}
          targetRef={activeElRef}
          onRequestClose={() => setOpen(false)}
        >
          <FlexBox flexDirection="column" p={16} alignItems="flex-start">
            Nothing clickable here but the container has fallback focus
          </FlexBox>
        </Popover>
      </FlexBox>
    </>
  );
};

export const PatternedPopoversGrid = (args: PopoverProps) => {
  return (
    <LayoutGrid columnGap={8} rowGap={48}>
      {([
        [CheckerDense, 'CheckerDense'],
        [CheckerLoose, 'CheckerLoose'],
        [CheckerRegular, 'CheckerRegular'],
        [DiagonalADense, 'DiagonalADense'],
        [DiagonalALoose, 'DiagonalALoose'],
        [DiagonalARegular, 'DiagonalARegular'],
      ] as const).map(([pattern, patternName]) => (
        <Column key={patternName} size={4}>
          <FlexBox justifyContent="center">
            <PopoverExample {...args} pattern={pattern} />
          </FlexBox>
        </Column>
      ))}
    </LayoutGrid>
  );
};
