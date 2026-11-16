import {
  createContext,
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
  ...rest
}: CustomSelectComponentProps<
  typeof SelectDropdownElements.SelectContainer
>) => {
  const { inputProps, name } = rest.selectProps;
  const hiddenProps = inputProps?.hidden || {};
  const hasHiddenProps =
    inputProps?.hidden && Object.keys(inputProps.hidden).length > 0;

  const value = rest.hasValue
    ? rest
        .getValue()
        .map(({ value }) => value)
        .join(', ')
    : '';

  return (
    <SelectDropdownElements.SelectContainer {...rest}>
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

    /* Look the trigger up from the hidden input: the public id is shared with other elements. */
    const input = document.getElementById(inputId);
    /* Start at the parent: closest() includes the input itself, which still has role="combobox" here. */
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

    return () => observer.disconnect();
  }, [inputId, isSearchable]);
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
  const { selectInputRef, triggerId } = useContext(SelectDropdownContext);
  const { inputId, inputProps, isDisabled, isSearchable, menuIsOpen } =
    rest.selectProps;
  const comboboxProps = inputProps?.combobox || {};

  useSelectOnlyInput(inputId, isSearchable);

  if (isSearchable !== false || !triggerId) {
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

  const handleBlur = () => {
    if (menuIsOpen) getInstance()?.onMenuClose();
  };

  return (
    <SelectDropdownElements.ValueContainer
      {...rest}
      innerProps={{
        ...innerProps,
        ...ariaProps,
        'aria-disabled': isDisabled || undefined,
        'aria-expanded': Boolean(menuIsOpen),
        'aria-haspopup': 'listbox',
        id: triggerId,
        onBlur: handleBlur,
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
