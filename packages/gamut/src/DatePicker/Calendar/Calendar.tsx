import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

/**
 * Outer wrapper for the calendar (header + body + footer).
 * Used by DatePickerCalendar to group the calendar content.
 */
export const Calendar = styled.div(
  css({
    backgroundColor: 'background',
    borderRadius: 'lg',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
    width: 'max-content',
    p: 24,
  })
);
