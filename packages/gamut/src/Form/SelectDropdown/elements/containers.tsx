import {
  createContext,
  FocusEvent,
  MouseEvent,
  ReactNode,
  useContext,
  useEffect,
  useLayoutEffect,
} from 'react';
import ReactSelect, {
  components as SelectDropdownElements,
  GroupBase,
  Props,
} from 'react-select';
import CreatableSelect from 'react-select/creatable';

import { DEFAULT_SELECT_DROPDOWN_TRANSLATIONS } from '../core/translations';
import {
  CustomSelectComponentProps,
  SelectDropdownContextValueTypes,
  TypedReactSelectProps,
} from '../types';

/**
 * React context for sharing state between SelectDropdown components.
 * Provides access to focus state, refs for keyboard navigation, and translations.
 */
export const SelectDropdownContext =
  createContext<SelectDropdownContextValueTypes>({
    currentFocusedValue: undefined,
    setCurrentFocusedValue: undefined,
    selectInputRef: undefined,
    removeAllButtonRef: undefined,
    translations: DEFAULT_SELECT_DROPDOWN_TRANSLATIONS,
  });

/**
 * Wraps react-select's `NoOptionsMessage` to report its text via
 * `onAnnouncementChange` for screen-reader announcement (see
 * `useNoOptionsAnnouncement`). react-select controls this component's
 * mount/unmount, so a mount/unmount effect is the only way to detect the
 * "no options" state - there's no prop or event exposed for it.
 */
export const createNoOptionsMessage = (
  onAnnouncementChange: (announcement: ReactNode) => void
) =>
  function NoOptionsMessage(
    props: CustomSelectComponentProps<
      typeof SelectDropdownElements.NoOptionsMessage
    >
  ) {
    useEffect(() => {
      onAnnouncementChange(props.children);
      return () => onAnnouncementChange('');
    }, [props.children]);

    return <SelectDropdownElements.NoOptionsMessage {...props} />;
  };

/**
 * Custom container component that adds a hidden input for form submission.
 * Renders the selected values as a comma-separated string in the hidden input.
 */
export const CustomContainer = ({
  children,
  innerProps,
  ...rest
}: CustomSelectComponentProps<
  typeof SelectDropdownElements.SelectContainer
>) => {
  const { selectInputRef } = useContext(SelectDropdownContext);
  const {
    inputProps,
    isSearchable,
    menuIsOpen,
    name,
    onBlur,
    onFocus,
    openMenuOnFocus,
  } = rest.selectProps;
  const hiddenProps = inputProps?.hidden || {};
  const hasHiddenProps =
    inputProps?.hidden && Object.keys(inputProps.hidden).length > 0;

  const value = rest.hasValue
    ? rest
        .getValue()
        .map(({ value }) => value)
        .join(', ')
    : '';

  /*
   * Non-searchable: react-select only sees focus and blur on its hidden input, which
   * can't take focus. Handle them on the whole select, so every internal control counts
   * (value, clear button, chevron). Our handling runs first and the consumer's callbacks
   * run after it, so a consumer's callback can't stop the menu from opening or closing.
   */
  const handleFocus = (event: FocusEvent<HTMLDivElement>) => {
    const nextFocus = event.relatedTarget as Node | null;
    if (nextFocus && event.currentTarget.contains(nextFocus)) return;
    if (openMenuOnFocus) {
      (selectInputRef?.current as unknown as SelectInstance | null)?.openMenu(
        'first'
      );
    }
    onFocus?.(event as unknown as FocusEvent<HTMLInputElement>);
  };

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    const nextFocus = event.relatedTarget as Node | null;
    if (nextFocus && event.currentTarget.contains(nextFocus)) return;
    if (menuIsOpen) {
      (
        selectInputRef?.current as unknown as SelectInstance | null
      )?.onMenuClose();
    }
    onBlur?.(event as unknown as FocusEvent<HTMLInputElement>);
  };

  const selectOnlyHandlers =
    isSearchable === false ? { onBlur: handleBlur, onFocus: handleFocus } : {};

  return (
    <SelectDropdownElements.SelectContainer
      {...rest}
      innerProps={{ ...innerProps, ...selectOnlyHandlers }}
    >
      {children}
      {hasHiddenProps && (
        <input name={name} type="hidden" value={value} {...hiddenProps} />
      )}
    </SelectDropdownElements.SelectContainer>
  );
};

/*
 * With isSearchable={false}, react-select renders a hidden <input role="combobox">.
 * Screen readers announce it as editable ("type text", "auto complete"), which is
 * wrong for a control that takes no typing. Instead, the ValueContainer is the
 * combobox (ARIA APG select-only pattern) and takes focus. react-select's keydown
 * handling still applies because keydown bubbles up to its container.
 */
const SELECT_ONLY_ARIA_PROPS = [
  'aria-describedby',
  'aria-errormessage',
  'aria-invalid',
  'aria-label',
  'aria-labelledby',
  'aria-required',
];

/* Methods on react-select's Select instance, reached through the selectRef. */
type SelectInstance = {
  onMenuClose: () => void;
  openMenu: (focusOption: 'first' | 'last') => void;
};

const useSelectOnlyInput = (
  inputId: string | undefined,
  isSearchable: boolean | undefined
) => {
  useLayoutEffect(() => {
    if (isSearchable !== false || !inputId) return;

    const input = document.getElementById(inputId);
    const trigger =
      input?.parentElement?.closest<HTMLElement>('[role="combobox"]');
    if (!input || !trigger) return;

    /*
     * A disabled input can't take focus, so react-select's focusInput() calls
     * become no-ops and focus stays on the trigger.
     */
    input.setAttribute('disabled', '');
    input.setAttribute('aria-hidden', 'true');
    input.removeAttribute('role');

    /*
     * The label targets the (disabled) input, which can't receive focus or a label click.
     * Name the trigger from that label instead, and focus the trigger when the label is clicked.
     */
    const label = Array.from(document.querySelectorAll('label')).find(
      (element) => element.htmlFor === inputId
    );
    const focusTrigger = () => trigger.focus();
    if (label) {
      if (!label.id) label.id = `${inputId}-label`;
      if (!trigger.hasAttribute('aria-labelledby')) {
        trigger.setAttribute('aria-labelledby', label.id);
      }
      label.addEventListener('click', focusTrigger);
    }

    /*
     * react-select only sets aria-activedescendant on the hidden input off Apple devices
     * (its isAppleDevice check), so VoiceOver on macOS gets nothing from it. Derive the
     * active option from the rendered menu instead: Gamut sets aria-selected on the
     * focused option. The container is SelectContainer > Control > ValueContainer.
     */
    const container = trigger.parentElement?.parentElement ?? trigger;
    const syncActiveOption = () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      const listbox = container.querySelector('[role="listbox"]');
      const activeOption = container.querySelector(
        '[role="option"][aria-selected="true"]'
      );

      if (listbox?.id && isExpanded) {
        trigger.setAttribute('aria-controls', listbox.id);
      } else {
        trigger.removeAttribute('aria-controls');
      }

      if (activeOption?.id && isExpanded) {
        trigger.setAttribute('aria-activedescendant', activeOption.id);
      } else {
        trigger.removeAttribute('aria-activedescendant');
      }
    };

    /*
     * aria-expanded is set on the trigger in a later React commit than the listbox
     * mounts, so it has to be observed too, or the sync can run while it's still "false".
     */
    const observer = new MutationObserver(syncActiveOption);
    observer.observe(container, {
      attributeFilter: ['aria-expanded', 'aria-selected'],
      attributes: true,
      childList: true,
      subtree: true,
    });
    syncActiveOption();

    return () => {
      observer.disconnect();
      label?.removeEventListener('click', focusTrigger);
    };
  }, [inputId, isSearchable]);
};

/**
 * Non-searchable: react-select opens the menu on mousedown only once its input has
 * focus, and the hidden input can't take focus. Open from the control instead, so a
 * click on the padding works. Child handlers (the chevron, the clear button) call
 * preventDefault first, so they keep their behaviour.
 */
export const CustomControl = ({
  innerProps,
  ...rest
}: CustomSelectComponentProps<typeof SelectDropdownElements.Control>) => {
  const { selectInputRef } = useContext(SelectDropdownContext);
  const { isDisabled, isSearchable, menuIsOpen } = rest.selectProps;

  if (isSearchable !== false) {
    return <SelectDropdownElements.Control {...rest} innerProps={innerProps} />;
  }

  const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    if (event.defaultPrevented || event.button !== 0 || isDisabled) return;

    event.preventDefault();
    event.currentTarget
      .querySelector<HTMLElement>('[role="combobox"]')
      ?.focus();

    const instance = selectInputRef?.current as unknown as
      | SelectInstance
      | null
      | undefined;
    if (menuIsOpen) instance?.onMenuClose();
    else instance?.openMenu('first');
  };

  return (
    <SelectDropdownElements.Control
      {...rest}
      innerProps={{ ...innerProps, onMouseDown: handleMouseDown }}
    />
  );
};

/**
 * Custom ValueContainer component. When isSearchable is false, it becomes the
 * select-only combobox trigger (see `useSelectOnlyInput`). Otherwise it renders
 * react-select's default ValueContainer.
 */
export const CustomValueContainer = ({
  innerProps,
  ...rest
}: CustomSelectComponentProps<
  typeof SelectDropdownElements.ValueContainer
>) => {
  const { selectInputRef } = useContext(SelectDropdownContext);
  const {
    inputId,
    inputProps,
    isDisabled,
    isSearchable,
    menuIsOpen,
    required,
  } = rest.selectProps;
  const comboboxProps = inputProps?.combobox || {};

  useSelectOnlyInput(inputId, isSearchable);

  if (isSearchable !== false || !inputId) {
    return <SelectDropdownElements.ValueContainer {...rest} />;
  }

  const ariaProps = Object.fromEntries(
    Object.entries(rest.selectProps).filter(
      ([key, value]) =>
        SELECT_ONLY_ARIA_PROPS.includes(key) && value !== undefined
    )
  );

  /* Read the ref inside handlers: it is still null during render on the first pass. */
  const getInstance = () =>
    selectInputRef?.current as unknown as SelectInstance | null | undefined;

  const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    if (event.button !== 0 || isDisabled) return;

    // Stops react-select from focusing its hidden input on mousedown.
    event.preventDefault();
    event.currentTarget.focus();
    if (menuIsOpen) getInstance()?.onMenuClose();
    else getInstance()?.openMenu('first');
  };

  return (
    <SelectDropdownElements.ValueContainer
      {...rest}
      innerProps={{
        ...innerProps,
        ...ariaProps,
        'aria-disabled': isDisabled || undefined,
        /* react-select puts aria-required on its input; the trigger replaces that input, so set it here. */
        'aria-required': required || undefined,
        'aria-expanded': Boolean(menuIsOpen),
        'aria-haspopup': 'listbox',
        onMouseDown: handleMouseDown,
        role: 'combobox',
        tabIndex: isDisabled ? -1 : 0,
        /* Last, so consumer data- and aria- props can override the defaults above, as before this change. */
        ...comboboxProps,
      }}
    />
  );
};

/**
 * Custom Input component that passes combobox props to the react-select input.
 * This allows data-* attributes and other props to be applied to the visible input element.
 * Works for both searchable and non-searchable modes by using the react-select Input component.
 */
export const CustomInput = ({
  ...rest
}: CustomSelectComponentProps<typeof SelectDropdownElements.Input>) => {
  const { inputProps } = rest.selectProps;
  const comboboxProps = inputProps?.combobox || {};

  const mergedProps = { ...rest, ...comboboxProps };

  return <SelectDropdownElements.Input {...mergedProps} />;
};

/**
 * Typed wrapper around react-select component.
 * Renders CreatableSelect when isCreatable is true, ReactSelect otherwise.
 * Creatable-only props (formatCreateLabel, isValidNewOption, createOptionPosition)
 * are stripped from the non-creatable path so they don't reach ReactSelect.
 * `onCreateOption` is handled in SelectDropdown's changeHandler — do not pass it
 * to CreatableSelect or react-select will skip onChange on create.
 */
export function TypedReactSelect<
  OptionType,
  IsMulti extends boolean = false,
  GroupType extends GroupBase<OptionType> = GroupBase<OptionType>
>({
  selectRef,
  isCreatable,
  formatCreateLabel,
  isValidNewOption,
  createOptionPosition,
  ...props
}: Props<OptionType, IsMulti, GroupType> & TypedReactSelectProps) {
  if (isCreatable) {
    return (
      <CreatableSelect
        {...(props as any)}
        createOptionPosition={createOptionPosition}
        formatCreateLabel={formatCreateLabel}
        isValidNewOption={isValidNewOption}
        ref={selectRef}
      />
    );
  }
  return <ReactSelect {...props} ref={selectRef} />;
}
