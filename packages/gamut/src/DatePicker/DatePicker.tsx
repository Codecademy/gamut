import { MiniArrowRightIcon } from '@codecademy/gamut-icons';
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Box, FlexBox } from '../Box';
import { PopoverContainer } from '../PopoverContainer';
import { DatePickerCalendar } from './DatePickerCalendar';
import {
  getDefaultRangeQuickActions,
  getDefaultSingleQuickActions,
} from './DatePickerCalendar/utils/quickActions';
import { DatePickerProvider } from './DatePickerContext';
import type {
  DatePickerContextValue,
  DatePickerRangeContextValue,
} from './DatePickerContext/types';
import { DatePickerInput } from './DatePickerInput';
import type { DatePickerProps } from './types';
import { useResolvedLocale } from './utils/locale';
import { DEFAULT_DATE_PICKER_TRANSLATIONS } from './utils/translations';

export const DatePicker: React.FC<DatePickerProps> = (props) => {
  const {
    locale,
    disableDate,
    children,
    mode,
    translations: translationsProp,
    inputSize,
    quickActions,
  } = props;
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [focusGridSignal, setFocusGridSignal] = useState(false);
  const [gridFocusRequested, setGridFocusRequested] = useState(false);
  const [activeRangePart, setActiveRangePart] =
    useState<DatePickerRangeContextValue['activeRangePart']>(null);
  const inputRef = useRef<HTMLDivElement | null>(null);
  const dialogId = useId();
  const calendarDialogId = `datepicker-dialog-${dialogId.replace(/:/g, '')}`;

  const clearGridFocusRequest = useCallback(() => {
    setGridFocusRequested(false);
  }, []);

  const resolvedLocale = useResolvedLocale(locale);

  const openCalendar = useCallback(() => {
    setIsCalendarOpen(true);
  }, []);

  const focusCalendar = useCallback(() => {
    setGridFocusRequested(true);
    setFocusGridSignal((signal) => !signal);
  }, []);

  const closeCalendar = useCallback(() => {
    setIsCalendarOpen(false);
    setActiveRangePart(null);
    setGridFocusRequested(false);
    const shell = inputRef.current;
    const toFocus =
      shell?.querySelector<HTMLElement>('[role="spinbutton"]') ?? shell;
    toFocus?.focus();
  }, []);

  useEffect(() => {
    if (!isCalendarOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      e.preventDefault();
      e.stopPropagation();
      closeCalendar();
    };
    document.addEventListener('keydown', onKeyDown, true);
    return () => document.removeEventListener('keydown', onKeyDown, true);
  }, [isCalendarOpen, closeCalendar]);

  const contextValue = useMemo<DatePickerContextValue>(() => {
    const translations = {
      ...DEFAULT_DATE_PICKER_TRANSLATIONS,
      ...translationsProp,
    };
    const resolvedQuickActions =
      quickActions ??
      (mode === 'range'
        ? getDefaultRangeQuickActions(translations)
        : getDefaultSingleQuickActions(resolvedLocale));
    const base = {
      isCalendarOpen,
      openCalendar,
      focusCalendar,
      focusGridSignal,
      gridFocusRequested,
      clearGridFocusRequest,
      closeCalendar,
      locale: resolvedLocale,
      disableDate,
      translations,
      quickActions: quickActions === null ? [] : resolvedQuickActions,
    };
    return mode === 'range'
      ? {
          ...base,
          mode: 'range',
          startDate: props.startDate,
          endDate: props.endDate,
          activeRangePart,
          setActiveRangePart,
          onRangeSelection: (startDate: Date | null, endDate: Date | null) => {
            props.onStartSelected(startDate);
            props.onEndSelected(endDate);
          },
        }
      : {
          ...base,
          mode: 'single',
          selectedDate: props.selectedDate,
          onSelection: props.onSelected,
        };
  }, [
    translationsProp,
    quickActions,
    mode,
    resolvedLocale,
    isCalendarOpen,
    openCalendar,
    focusCalendar,
    focusGridSignal,
    gridFocusRequested,
    clearGridFocusRequest,
    closeCalendar,
    disableDate,
    props,
    activeRangePart,
  ]);

  const content =
    children !== undefined ? (
      children
    ) : (
      <>
        <FlexBox
          gap={inputSize === 'small' ? 4 : 8}
          ref={inputRef}
          width="fit-content"
        >
          {mode === 'range' ? (
            <>
              <DatePickerInput rangePart="start" size={inputSize} />
              <Box alignSelf="center" mt={32}>
                {/* TODO: Adjust for RTL */}
                <MiniArrowRightIcon />
              </Box>
              <DatePickerInput rangePart="end" size={inputSize} />
            </>
          ) : (
            <DatePickerInput size={inputSize} />
          )}
        </FlexBox>
        <PopoverContainer
          alignment="bottom-left"
          allowPageInteraction
          focusOnProps={{ autoFocus: false, focusLock: false }}
          invertAxis="x"
          isOpen={isCalendarOpen}
          targetRef={inputRef}
          x={-20}
          y={-16}
          onRequestClose={closeCalendar}
        >
          <div
            aria-label={contextValue.translations.calendarDialogAriaLabel}
            id={calendarDialogId}
            role="dialog"
          >
            <DatePickerCalendar dialogId={calendarDialogId} />
          </div>
        </PopoverContainer>
      </>
    );

  return (
    <DatePickerProvider value={contextValue}>{content}</DatePickerProvider>
  );
};
