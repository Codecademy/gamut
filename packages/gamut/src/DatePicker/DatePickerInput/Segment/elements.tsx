import { css, states } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';

import { DatePartKind } from '../utils';

const segmentStyles = states({
  default: {
    color: 'text-secondary',
  },
});

type SegmentStyleProps = StyleProps<typeof segmentStyles> & {
  field: DatePartKind;
};

export const Segment = styled.span<SegmentStyleProps>(
  ({ field }) =>
    css({
      display: 'inline-block',
      textAlign: 'center',
      minWidth: field === 'year' ? '4ch' : '2ch',
      padding: 0,
      margin: 0,
      color: 'text',
      cursor: 'text',
      '&:focus': {
        bg: 'primary',
        color: 'background',
        borderRadius: 'md',
      },
    }),
  segmentStyles
);

/** Locale separator (`/`, `.`, etc.) between segments. */
export const SegmentLiteral = styled.span(
  css({
    color: 'text-secondary',
    userSelect: 'none',
    px: 4,
  })
);
