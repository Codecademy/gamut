import { matchDisabledDates } from '../../Calendar/utils/dateGrid';
import {
  applyRangeOrNewStart,
  handleDateSelectRange,
  handleDateSelectSingle,
  rangeContainsDisabled,
} from '../dateSelect';

const createDate = (y: number, month: number, day: number) =>
  new Date(y, month, day);

const mockOnSelection = jest.fn();
const mockOnRangeSelection = jest.fn();
describe('rangeContainsDisabled', () => {
  const startDate = createDate(2024, 0, 10);
  const endDate = createDate(2024, 0, 20);

  it('returns true when a disabled date is the start date', () => {
    expect(
      rangeContainsDisabled({
        startDate,
        endDate,
        shouldDisableDate: matchDisabledDates([createDate(2024, 0, 10)]),
      })
    ).toBe(true);
  });

  it('returns true when a disabled date is the end date', () => {
    expect(
      rangeContainsDisabled({
        startDate,
        endDate,
        shouldDisableDate: matchDisabledDates([createDate(2024, 0, 20)]),
      })
    ).toBe(true);
  });

  it('returns true when a disabled date is strictly between startDate and endDate', () => {
    expect(
      rangeContainsDisabled({
        startDate,
        endDate,
        shouldDisableDate: matchDisabledDates([createDate(2024, 0, 15)]),
      })
    ).toBe(true);
  });

  it('returns false when no disabled date touches the inclusive range', () => {
    expect(
      rangeContainsDisabled({
        startDate,
        endDate,
        shouldDisableDate: matchDisabledDates([
          createDate(2024, 0, 5),
          createDate(2024, 0, 25),
        ]),
      })
    ).toBe(false);
  });

  it('returns true when shouldDisableDate marks a day inside the inclusive range', () => {
    expect(
      rangeContainsDisabled({
        startDate,
        endDate,
        shouldDisableDate: (d) => d.getDate() === 15,
      })
    ).toBe(true);
  });
});

describe('handleDateSelectSingle', () => {
  it('clears selection when the same date is clicked again', () => {
    const selected = createDate(2024, 5, 15);
    handleDateSelectSingle({
      date: selected,
      selectedDate: selected,
      onSelection: mockOnSelection,
    });
    expect(mockOnSelection).toHaveBeenCalledWith(null);
  });

  it('sets selection when no date was previously selected', () => {
    const newSelected = createDate(2024, 5, 10);
    handleDateSelectSingle({
      date: newSelected,
      selectedDate: null,
      onSelection: mockOnSelection,
    });
    expect(mockOnSelection).toHaveBeenCalledWith(newSelected);
  });

  it('sets selection to a new day when a date was previously selected', () => {
    const newSelected = createDate(2024, 5, 20);
    handleDateSelectSingle({
      date: newSelected,
      selectedDate: createDate(2024, 5, 15),
      onSelection: mockOnSelection,
    });
    expect(mockOnSelection).toHaveBeenCalledWith(newSelected);
  });
});

describe('applyRangeOrNewStart', () => {
  it('sets selection to the start and end date when the range does not contain a disabled date', () => {
    const startDate = createDate(2024, 5, 10);
    const endDate = createDate(2024, 5, 20);
    const clicked = createDate(2024, 5, 10);
    expect(
      applyRangeOrNewStart({
        startDate,
        endDate,
        clickedDate: clicked,
        shouldDisableDate: matchDisabledDates([createDate(2024, 5, 30)]),
        onRangeSelection: mockOnRangeSelection,
      })
    ).toBe(true);
    expect(mockOnRangeSelection).toHaveBeenCalledWith(startDate, endDate);
  });

  it('sets selection to the clicked date as start and null as end when the range contains a disabled date', () => {
    const startDate = createDate(2024, 5, 10);
    const endDate = createDate(2024, 5, 20);
    const clicked = createDate(2024, 5, 10);
    expect(
      applyRangeOrNewStart({
        startDate,
        endDate,
        clickedDate: clicked,
        shouldDisableDate: matchDisabledDates([createDate(2024, 5, 12)]),
        onRangeSelection: mockOnRangeSelection,
      })
    ).toBe(false);
    expect(mockOnRangeSelection).toHaveBeenCalledWith(clicked, null);
  });
});

describe('handleDateSelectRange', () => {
  describe('close calendar return value', () => {
    it('returns false when only a start date is chosen (calendar mode)', () => {
      expect(
        handleDateSelectRange({
          date: createDate(2024, 5, 10),
          activeRangePart: null,
          startDate: null,
          endDate: null,
          onRangeSelection: mockOnRangeSelection,
        })
      ).toBe(false);
      expect(mockOnRangeSelection).toHaveBeenCalledWith(
        createDate(2024, 5, 10),
        null
      );
    });

    it('returns true when end date is chosen after start (calendar mode)', () => {
      expect(
        handleDateSelectRange({
          date: createDate(2024, 5, 20),
          activeRangePart: null,
          startDate: createDate(2024, 5, 10),
          endDate: null,
          onRangeSelection: mockOnRangeSelection,
        })
      ).toBe(true);
      expect(mockOnRangeSelection).toHaveBeenCalledWith(
        createDate(2024, 5, 10),
        createDate(2024, 5, 20)
      );
    });
  });

  describe('activeRangePart === start', () => {
    describe('start date is set', () => {
      it('clears start when the start date is clicked again', () => {
        const startDate = createDate(2024, 2, 10);
        const endDate = createDate(2024, 2, 20);
        handleDateSelectRange({
          date: startDate,
          activeRangePart: 'start',
          startDate,
          endDate,
          onRangeSelection: mockOnRangeSelection,
        });
        expect(mockOnRangeSelection).toHaveBeenCalledWith(null, endDate);
      });

      it('sets start date when no end date is set', () => {
        const startDate = createDate(2024, 2, 10);
        const clicked = createDate(2024, 2, 15);
        handleDateSelectRange({
          date: clicked,
          activeRangePart: 'start',
          startDate,
          endDate: null,
          onRangeSelection: mockOnRangeSelection,
        });
        expect(mockOnRangeSelection).toHaveBeenCalledWith(clicked, null);
      });

      it('sets start date and clears end date when new start is after end', () => {
        const startDate = createDate(2024, 2, 2);
        const endDate = createDate(2024, 2, 12);
        const clicked = createDate(2024, 2, 20);
        handleDateSelectRange({
          date: clicked,
          activeRangePart: 'start',
          startDate,
          endDate,
          onRangeSelection: mockOnRangeSelection,
        });
        expect(mockOnRangeSelection).toHaveBeenCalledWith(clicked, null);
      });

      it('sets start date and keeps end date when new start is before end', () => {
        const startDate = createDate(2024, 2, 10);
        const endDate = createDate(2024, 2, 25);
        const clicked = createDate(2024, 2, 15);
        handleDateSelectRange({
          date: clicked,
          activeRangePart: 'start',
          startDate,
          endDate,
          onRangeSelection: mockOnRangeSelection,
        });
        expect(mockOnRangeSelection).toHaveBeenCalledWith(clicked, endDate);
      });

      it('sets start date and keeps end date when new start is the same as end', () => {
        const startDate = createDate(2024, 2, 10);
        const endDate = createDate(2024, 2, 25);
        const clicked = createDate(2024, 2, 25);
        handleDateSelectRange({
          date: clicked,
          activeRangePart: 'start',
          startDate,
          endDate,
          onRangeSelection: mockOnRangeSelection,
        });
        expect(mockOnRangeSelection).toHaveBeenCalledWith(clicked, endDate);
      });

      it('sets start date to the clicked date when the range would contain a disabled date', () => {
        const startDate = createDate(2024, 2, 2);
        const endDate = createDate(2024, 2, 20);
        const clicked = createDate(2024, 2, 10);
        handleDateSelectRange({
          date: clicked,
          activeRangePart: 'start',
          startDate,
          endDate,
          onRangeSelection: mockOnRangeSelection,
          shouldDisableDate: matchDisabledDates([createDate(2024, 2, 12)]),
        });
        expect(mockOnRangeSelection).toHaveBeenCalledWith(clicked, null);
      });
    });
    describe('start date is not set', () => {
      it('sets start date when no end date is set', () => {
        const clicked = createDate(2024, 2, 15);
        handleDateSelectRange({
          date: clicked,
          activeRangePart: 'start',
          startDate: null,
          endDate: null,
          onRangeSelection: mockOnRangeSelection,
        });
        expect(mockOnRangeSelection).toHaveBeenCalledWith(clicked, null);
      });

      it('sets start date and clears end date when new start is after end', () => {
        const endDate = createDate(2024, 2, 12);
        const clicked = createDate(2024, 2, 20);
        handleDateSelectRange({
          date: clicked,
          activeRangePart: 'start',
          startDate: null,
          endDate,
          onRangeSelection: mockOnRangeSelection,
        });
        expect(mockOnRangeSelection).toHaveBeenCalledWith(clicked, null);
      });

      it('sets start date and keeps end date when new start is before end', () => {
        const endDate = createDate(2024, 2, 25);
        const clicked = createDate(2024, 2, 15);
        handleDateSelectRange({
          date: clicked,
          activeRangePart: 'start',
          startDate: null,
          endDate,
          onRangeSelection: mockOnRangeSelection,
        });
        expect(mockOnRangeSelection).toHaveBeenCalledWith(clicked, endDate);
      });

      it('sets start date and keeps end date when new start is the same as end', () => {
        const endDate = createDate(2024, 2, 25);
        const clicked = createDate(2024, 2, 25);
        handleDateSelectRange({
          date: clicked,
          activeRangePart: 'start',
          startDate: null,
          endDate,
          onRangeSelection: mockOnRangeSelection,
        });
        expect(mockOnRangeSelection).toHaveBeenCalledWith(clicked, endDate);
      });

      it('sets start date to the clicked date when the range would contain a disabled date', () => {
        const endDate = createDate(2024, 2, 20);
        const clicked = createDate(2024, 2, 10);
        handleDateSelectRange({
          date: clicked,
          activeRangePart: 'start',
          startDate: null,
          endDate,
          onRangeSelection: mockOnRangeSelection,
          shouldDisableDate: matchDisabledDates([createDate(2024, 2, 12)]),
        });
        expect(mockOnRangeSelection).toHaveBeenCalledWith(clicked, null);
      });
    });
  });

  describe('activeRangePart === end', () => {
    describe('end date is set', () => {
      it('clears end date when the end date is clicked again', () => {
        const startDate = createDate(2024, 2, 5);
        const endDate = createDate(2024, 2, 18);
        handleDateSelectRange({
          date: endDate,
          activeRangePart: 'end',
          startDate,
          endDate,
          onRangeSelection: mockOnRangeSelection,
        });
        expect(mockOnRangeSelection).toHaveBeenCalledWith(startDate, null);
      });

      it('sets end date when no start date is set', () => {
        const endDate = createDate(2024, 2, 18);
        const clicked = createDate(2024, 2, 19);
        handleDateSelectRange({
          date: clicked,
          activeRangePart: 'end',
          startDate: null,
          endDate,
          onRangeSelection: mockOnRangeSelection,
        });
        expect(mockOnRangeSelection).toHaveBeenCalledWith(null, clicked);
      });

      it('sets end date and clears start date when new end is before start', () => {
        const startDate = createDate(2024, 2, 20);
        const endDate = createDate(2024, 2, 12);
        const clicked = createDate(2024, 2, 18);
        handleDateSelectRange({
          date: clicked,
          activeRangePart: 'end',
          startDate,
          endDate,
          onRangeSelection: mockOnRangeSelection,
        });
        expect(mockOnRangeSelection).toHaveBeenCalledWith(null, clicked);
      });

      it('sets end date and keeps start date when new end is after start', () => {
        const startDate = createDate(2024, 2, 10);
        const endDate = createDate(2024, 2, 25);
        const clicked = createDate(2024, 2, 15);
        handleDateSelectRange({
          date: clicked,
          activeRangePart: 'end',
          startDate,
          endDate,
          onRangeSelection: mockOnRangeSelection,
        });
        expect(mockOnRangeSelection).toHaveBeenCalledWith(startDate, clicked);
      });

      it('sets end date and keeps start date when new end is the same as start', () => {
        const startDate = createDate(2024, 2, 10);
        const endDate = createDate(2024, 2, 25);
        const clicked = createDate(2024, 2, 10);
        handleDateSelectRange({
          date: clicked,
          activeRangePart: 'end',
          startDate,
          endDate,
          onRangeSelection: mockOnRangeSelection,
        });
        expect(mockOnRangeSelection).toHaveBeenCalledWith(startDate, clicked);
      });

      it('sets start date to the clicked date when the range would contain a disabled date', () => {
        const startDate = createDate(2024, 2, 10);
        const endDate = createDate(2024, 2, 20);
        const clicked = createDate(2024, 2, 15);
        handleDateSelectRange({
          date: clicked,
          activeRangePart: 'end',
          startDate,
          endDate,
          onRangeSelection: mockOnRangeSelection,
          shouldDisableDate: matchDisabledDates([createDate(2024, 2, 12)]),
        });
        expect(mockOnRangeSelection).toHaveBeenCalledWith(clicked, null);
      });
    });
    describe('end date is not set', () => {
      it('sets end date when no start date is set', () => {
        const clicked = createDate(2024, 2, 19);
        handleDateSelectRange({
          date: clicked,
          activeRangePart: 'end',
          startDate: null,
          endDate: null,
          onRangeSelection: mockOnRangeSelection,
        });
        expect(mockOnRangeSelection).toHaveBeenCalledWith(null, clicked);
      });

      it('sets end date and clears start date when new end is before start', () => {
        const startDate = createDate(2024, 2, 20);
        const clicked = createDate(2024, 2, 18);
        handleDateSelectRange({
          date: clicked,
          activeRangePart: 'end',
          startDate,
          endDate: null,
          onRangeSelection: mockOnRangeSelection,
        });
        expect(mockOnRangeSelection).toHaveBeenCalledWith(null, clicked);
      });

      it('sets end date and keeps start date when new end is after start', () => {
        const startDate = createDate(2024, 2, 10);
        const clicked = createDate(2024, 2, 15);
        handleDateSelectRange({
          date: clicked,
          activeRangePart: 'end',
          startDate,
          endDate: null,
          onRangeSelection: mockOnRangeSelection,
        });
        expect(mockOnRangeSelection).toHaveBeenCalledWith(startDate, clicked);
      });

      it('sets end date and keeps start date when new end is the same as start', () => {
        const startDate = createDate(2024, 2, 10);
        const clicked = createDate(2024, 2, 10);
        handleDateSelectRange({
          date: clicked,
          activeRangePart: 'end',
          startDate,
          endDate: null,
          onRangeSelection: mockOnRangeSelection,
        });
        expect(mockOnRangeSelection).toHaveBeenCalledWith(startDate, clicked);
      });

      it('sets start date to the clicked date when the range would contain a disabled date', () => {
        const startDate = createDate(2024, 2, 10);
        const clicked = createDate(2024, 2, 15);
        handleDateSelectRange({
          date: clicked,
          activeRangePart: 'end',
          startDate,
          endDate: null,
          onRangeSelection: mockOnRangeSelection,
          shouldDisableDate: matchDisabledDates([createDate(2024, 2, 12)]),
        });
        expect(mockOnRangeSelection).toHaveBeenCalledWith(clicked, null);
      });
    });
  });

  describe('selection mode (activeRangePart null) with start date and end date set', () => {
    it('clears when a single-day range is clicked again', () => {
      const day = createDate(2024, 2, 14);
      handleDateSelectRange({
        date: day,
        activeRangePart: null,
        startDate: day,
        endDate: day,
        onRangeSelection: mockOnRangeSelection,
      });
      expect(mockOnRangeSelection).toHaveBeenCalledWith(null, null);
    });

    it('end date becomes start date when start date is clicked', () => {
      const startDate = createDate(2024, 2, 5);
      const endDate = createDate(2024, 2, 28);
      handleDateSelectRange({
        date: startDate,
        activeRangePart: null,
        startDate,
        endDate,
        onRangeSelection: mockOnRangeSelection,
      });
      expect(mockOnRangeSelection).toHaveBeenCalledWith(endDate, null);
    });

    it('clears end date when end date is clicked', () => {
      const startDate = createDate(2024, 2, 5);
      const endDate = createDate(2024, 2, 28);
      handleDateSelectRange({
        date: endDate,
        activeRangePart: null,
        startDate,
        endDate,
        onRangeSelection: mockOnRangeSelection,
      });
      expect(mockOnRangeSelection).toHaveBeenCalledWith(startDate, null);
    });

    it('updates end date when a date after start date is clicked', () => {
      const startDate = createDate(2024, 2, 5);
      const endDate = createDate(2024, 2, 10);
      const clicked = createDate(2024, 2, 18);
      handleDateSelectRange({
        date: clicked,
        activeRangePart: null,
        startDate,
        endDate,
        onRangeSelection: mockOnRangeSelection,
      });
      expect(mockOnRangeSelection).toHaveBeenCalledWith(startDate, clicked);
    });

    it('updates start date to the clicked date and clears end date when the range extending to right would contain a disabled date', () => {
      const startDate = createDate(2024, 2, 5);
      const endDate = createDate(2024, 2, 10);
      const clicked = createDate(2024, 2, 18);
      handleDateSelectRange({
        date: clicked,
        activeRangePart: null,
        startDate,
        endDate,
        onRangeSelection: mockOnRangeSelection,
        shouldDisableDate: matchDisabledDates([createDate(2024, 2, 12)]),
      });
      expect(mockOnRangeSelection).toHaveBeenCalledWith(clicked, null);
    });

    it('updates start date when a date before start date is clicked', () => {
      const startDate = createDate(2024, 2, 15);
      const endDate = createDate(2024, 2, 25);
      const clicked = createDate(2024, 2, 8);
      handleDateSelectRange({
        date: clicked,
        activeRangePart: null,
        startDate,
        endDate,
        onRangeSelection: mockOnRangeSelection,
      });
      expect(mockOnRangeSelection).toHaveBeenCalledWith(clicked, endDate);
    });

    it('updates start date to the clicked date and clears end date when the range extending to left would contain a disabled date', () => {
      const startDate = createDate(2024, 2, 15);
      const endDate = createDate(2024, 2, 25);
      const clicked = createDate(2024, 2, 8);
      handleDateSelectRange({
        date: clicked,
        activeRangePart: null,
        startDate,
        endDate,
        onRangeSelection: mockOnRangeSelection,
        shouldDisableDate: matchDisabledDates([createDate(2024, 2, 12)]),
      });
      expect(mockOnRangeSelection).toHaveBeenCalledWith(clicked, null);
    });
  });

  describe('start date set, end date empty, selection mode', () => {
    it('updates start date when clicked date is before start date', () => {
      const startDate = createDate(2024, 2, 15);
      const clicked = createDate(2024, 2, 8);
      handleDateSelectRange({
        date: clicked,
        activeRangePart: null,
        startDate,
        endDate: null,
        onRangeSelection: mockOnRangeSelection,
      });
      expect(mockOnRangeSelection).toHaveBeenCalledWith(clicked, null);
    });

    it('sets end date when clicked date is on or after start date', () => {
      const startDate = createDate(2024, 2, 15);
      const clicked = createDate(2024, 2, 22);
      handleDateSelectRange({
        date: clicked,
        activeRangePart: null,
        startDate,
        endDate: null,
        onRangeSelection: mockOnRangeSelection,
      });
      expect(mockOnRangeSelection).toHaveBeenCalledWith(startDate, clicked);
    });

    it('updates start date to the clicked date and does not set end date when the range would contain a disabled date', () => {
      const startDate = createDate(2024, 2, 15);
      const clicked = createDate(2024, 2, 8);
      handleDateSelectRange({
        date: clicked,
        activeRangePart: null,
        startDate,
        endDate: null,
        onRangeSelection: mockOnRangeSelection,
        shouldDisableDate: matchDisabledDates([createDate(2024, 2, 12)]),
      });
      expect(mockOnRangeSelection).toHaveBeenCalledWith(clicked, null);
    });
  });

  describe('start date empty, end date set, selection mode', () => {
    it('sets start date and clears end datewhen clicked date is before end date', () => {
      const endDate = createDate(2024, 2, 15);
      const clicked = createDate(2024, 2, 8);
      handleDateSelectRange({
        date: clicked,
        activeRangePart: null,
        startDate: null,
        endDate,
        onRangeSelection: mockOnRangeSelection,
      });
      expect(mockOnRangeSelection).toHaveBeenCalledWith(clicked, null);
    });

    it('sets start date and clears end date when clicked date is after end date', () => {
      const endDate = createDate(2024, 2, 15);
      const clicked = createDate(2024, 2, 22);
      handleDateSelectRange({
        date: clicked,
        activeRangePart: null,
        startDate: null,
        endDate,
        onRangeSelection: mockOnRangeSelection,
      });
      expect(mockOnRangeSelection).toHaveBeenCalledWith(clicked, null);
    });

    it('updates start date to the clicked date and clears end date when the range would contain a disabled date', () => {
      const endDate = createDate(2024, 2, 15);
      const clicked = createDate(2024, 2, 8);
      handleDateSelectRange({
        date: clicked,
        activeRangePart: null,
        startDate: null,
        endDate,
        onRangeSelection: mockOnRangeSelection,
        shouldDisableDate: matchDisabledDates([createDate(2024, 2, 12)]),
      });
      expect(mockOnRangeSelection).toHaveBeenCalledWith(clicked, null);
    });
  });
});
