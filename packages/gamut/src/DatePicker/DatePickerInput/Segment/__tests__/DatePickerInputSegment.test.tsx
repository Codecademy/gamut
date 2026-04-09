/* eslint-disable simple-import-sort/imports -- import sort vs consistent-type-imports for relative paths */

import { useCallback, useState, type FC } from 'react';

import { setupRtl } from '@codecademy/gamut-tests';
import userEvent from '@testing-library/user-event';

import { DatePickerInputSegment } from '../DatePickerInputSegment';
import type { DatePartKind } from '../../utils';
import type { AssignSegmentRef } from '../DatePickerInputSegment';
import type { SegmentValues } from '../segmentUtils';

const noop = () => undefined;

const noopAssignSegmentRef: AssignSegmentRef = () => undefined;

const noopFocusSegmentField = () => undefined;

type HarnessProps = {
  field?: DatePartKind;
  segment?: SegmentValues;
  disabled?: boolean;
  error?: boolean;
  focusOrOpenCalendarGrid?: () => void;
};

/**
 * Real `useState` + `setSegments` so functional updaters from ArrowUp / typing run and re-render.
 */
const SegmentHarness: FC<HarnessProps> = ({
  field = 'month',
  segment = { month: '', day: '', year: '' },
  disabled = false,
  error = false,
  focusOrOpenCalendarGrid = noop,
}) => {
  const [segments, setSegments] = useState<SegmentValues>(segment);
  const applySegments = useCallback(() => {
    // Parent would commit parsed date; segment tests only need state updates via setSegments.
  }, []);

  return (
    <DatePickerInputSegment
      applySegments={applySegments}
      assignSegmentRef={noopAssignSegmentRef}
      disabled={disabled}
      error={error}
      field={field}
      focusOrOpenCalendarGrid={focusOrOpenCalendarGrid}
      focusSegmentField={noopFocusSegmentField}
      handleOnFocus={noop}
      nextField={null}
      prevField={null}
      segments={segments}
      setSegments={setSegments}
    />
  );
};

const renderView = setupRtl(SegmentHarness, {});

describe('DatePickerInputSegment', () => {
  it.each([
    ['month', 'MM'],
    ['day', 'DD'],
    ['year', 'YYYY'],
  ] as const)('shows placeholder for %s', (field, expected) => {
    const { view } = renderView({ field });

    expect(view.getByRole('spinbutton', { name: field })).toHaveAttribute(
      'aria-valuetext',
      expected
    );
  });

  it('sets aria-invalid when error is true', () => {
    const { view } = renderView({ error: true });

    expect(view.getByRole('spinbutton', { name: 'month' })).toHaveAttribute(
      'aria-invalid',
      'true'
    );
  });

  it('sets aria-disabled and tabIndex -1 when disabled', () => {
    const { view } = renderView({ disabled: true });

    const month = view.getByRole('spinbutton', { name: 'month' });
    expect(month).toHaveAttribute('aria-disabled', 'true');
    expect(month).toHaveAttribute('tabIndex', '-1');
  });

  it('increments month with ArrowUp from empty', async () => {
    const user = userEvent.setup();
    const { view } = renderView({});

    const month = view.getByRole('spinbutton', { name: 'month' });
    await user.click(month);
    await user.keyboard('{ArrowUp}');

    expect(month).toHaveAttribute('aria-valuetext', '01');
  });

  it('increments month with ArrowUp from 01', async () => {
    const user = userEvent.setup();
    const { view } = renderView({
      segment: { month: '01', day: '', year: '' },
    });

    const month = view.getByRole('spinbutton', { name: 'month' });
    await user.click(month);
    await user.keyboard('{ArrowUp}');

    expect(month).toHaveAttribute('aria-valuetext', '02');
  });

  it('decrements month with ArrowDown from empty', async () => {
    const user = userEvent.setup();
    const { view } = renderView({});

    const month = view.getByRole('spinbutton', { name: 'month' });
    await user.click(month);
    await user.keyboard('{ArrowDown}');

    expect(month).toHaveAttribute('aria-valuetext', '12');
  });

  it('decrements month with ArrowDown from 02', async () => {
    const user = userEvent.setup();
    const { view } = renderView({
      segment: { month: '02', day: '', year: '' },
    });

    const month = view.getByRole('spinbutton', { name: 'month' });
    await user.click(month);
    await user.keyboard('{ArrowDown}');

    expect(month).toHaveAttribute('aria-valuetext', '01');
  });

  it('calls focusOrOpenCalendarGrid on Alt+ArrowDown', async () => {
    const user = userEvent.setup();
    const focusOrOpenCalendarGrid = jest.fn();
    const { view } = renderView({ focusOrOpenCalendarGrid });

    const month = view.getByRole('spinbutton', { name: 'month' });
    await user.click(month);
    await user.keyboard('{Alt>}{ArrowDown}{/Alt}');

    expect(focusOrOpenCalendarGrid).toHaveBeenCalledTimes(1);
  });

  it('appends typed digits until the segment is full', async () => {
    const user = userEvent.setup();
    const { view } = renderView({});

    const month = view.getByRole('spinbutton', { name: 'month' });
    await user.click(month);
    await user.keyboard('03');

    expect(month).toHaveAttribute('aria-valuetext', '03');
  });

  it('removes the last digit with Backspace', async () => {
    const user = userEvent.setup();
    const { view } = renderView({
      segment: { month: '03', day: '', year: '' },
    });

    const month = view.getByRole('spinbutton', { name: 'month' });
    await user.click(month);
    await user.keyboard('{Backspace}');

    expect(month).toHaveAttribute('aria-valuetext', '0');
  });
});
