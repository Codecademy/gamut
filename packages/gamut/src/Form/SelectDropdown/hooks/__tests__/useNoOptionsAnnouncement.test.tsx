import { act, render, renderHook } from '@testing-library/react';
import { ReactNode } from 'react';

import { useNoOptionsAnnouncement } from '../useNoOptionsAnnouncement';

/**
 * react-select's own `NoOptionsMessage` (rendered by `noOptionsMessageComponent`)
 * needs these style-related props to render without crashing. The values
 * themselves are irrelevant here - only the mount/unmount timing of
 * `children` matters for this hook.
 */
const stubStyleProps = {
  cx: () => '',
  getStyles: () => ({}),
  getClassNames: () => '',
  innerProps: {},
};

describe('useNoOptionsAnnouncement', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it('starts with an empty announcement', () => {
    const { result } = renderHook(() => useNoOptionsAnnouncement());

    expect(result.current.announcement).toBe('');
  });

  it('announces NoOptionsMessage text after the debounce', () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useNoOptionsAnnouncement());
    const NoOptionsMessage = result.current.noOptionsMessageComponent;

    render(
      <NoOptionsMessage {...stubStyleProps}>
        Enter at least 3 characters.
      </NoOptionsMessage>
    );

    expect(result.current.announcement).toBe('');

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current.announcement).toBe('Enter at least 3 characters.');
  });

  it('clears the announcement when NoOptionsMessage unmounts', () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useNoOptionsAnnouncement());
    const NoOptionsMessage = result.current.noOptionsMessageComponent;

    const { unmount } = render(
      <NoOptionsMessage {...stubStyleProps}>
        No fruits available
      </NoOptionsMessage>
    );
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(result.current.announcement).toBe('No fruits available');

    act(() => {
      unmount();
    });

    expect(result.current.announcement).toBe('');
  });

  it('clears the announcement immediately via clearAnnouncement, without waiting for the debounce', () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useNoOptionsAnnouncement());
    const NoOptionsMessage = result.current.noOptionsMessageComponent;

    render(
      <NoOptionsMessage {...stubStyleProps}>
        No fruits available
      </NoOptionsMessage>
    );
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(result.current.announcement).toBe('No fruits available');

    act(() => {
      result.current.clearAnnouncement();
    });

    // Clearing is synchronous, not debounced - the region must empty right
    // away so a later identical announcement is a genuine DOM mutation.
    expect(result.current.announcement).toBe('');
  });

  it('re-announces the same text after being cleared', () => {
    jest.useFakeTimers();
    const { result, rerender } = renderHook(() => useNoOptionsAnnouncement());
    const renderMessage = (children: ReactNode) =>
      render(
        <result.current.noOptionsMessageComponent {...stubStyleProps}>
          {children}
        </result.current.noOptionsMessageComponent>
      );

    const first = renderMessage('Enter at least 3 characters.');
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(result.current.announcement).toBe('Enter at least 3 characters.');

    act(() => {
      first.unmount();
    });
    expect(result.current.announcement).toBe('');

    rerender();
    renderMessage('Enter at least 3 characters.');
    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current.announcement).toBe('Enter at least 3 characters.');
  });

  it('returns a stable noOptionsMessageComponent reference across re-renders', () => {
    const { result, rerender } = renderHook(() => useNoOptionsAnnouncement());
    const first = result.current.noOptionsMessageComponent;

    rerender();

    expect(result.current.noOptionsMessageComponent).toBe(first);
  });

  it('returns a stable clearAnnouncement reference across re-renders', () => {
    const { result, rerender } = renderHook(() => useNoOptionsAnnouncement());
    const first = result.current.clearAnnouncement;

    rerender();

    expect(result.current.clearAnnouncement).toBe(first);
  });
});
