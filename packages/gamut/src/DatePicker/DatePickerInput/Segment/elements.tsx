import { css, states } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';

const segmentStyles = states({
  isEmpty: {
    color: 'text-secondary',
  },
  isYear: {
    minWidth: '4ch',
  },
});

type SegmentStyleProps = StyleProps<typeof segmentStyles>;

export const Segment = styled.span<SegmentStyleProps>(
  css({
    display: 'inline-block',
    textAlign: 'center',
    minWidth: '2ch',
    padding: 0,
    margin: 0,
    color: 'text',
    cursor: 'text',
    '&:focus': {
      bg: 'primary',
      color: 'background',
      borderRadius: 'md',
    },
    '&:focus-visible': {
      outline: 'none',
    },
  }),
  segmentStyles
);

export const SegmentLiteral = styled.span(
  css({
    color: 'text-secondary',
    userSelect: 'none',
    px: 4,
  })
);
