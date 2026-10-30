import {
  ComponentType,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { createNoOptionsMessage } from '../elements';

const ANNOUNCEMENT_DEBOUNCE_MS = 400;

interface UseNoOptionsAnnouncementReturn {
  /** `NoOptionsMessage` override for react-select's `components` prop */
  noOptionsMessageComponent: ComponentType<any>;
  /** Current text for the standalone accessibility live region */
  announcement: ReactNode;
  /**
   * Clears the announcement immediately - pass to react-select's
   * `onMenuClose` so the region empties whenever the menu closes for any
   * reason (blur, Escape, selecting an option), not just when
   * `NoOptionsMessage` happens to unmount.
   */
  clearAnnouncement: () => void;
}

/*
  Announces react-select's "no options" menu text (its default "No options",
  or a custom `validationMessage`) to screen readers via a standalone live
  region. react-select's own live region only fires when its `options` prop
  is non-empty, so it never speaks the "no options" state - this fills that
  gap, including while a consumer is mid-fetch with an empty `options` array.

  The caller must render `announcement` inside a live-region element that
  stays mounted for the component's lifetime (no key-based remounting).
  VoiceOver/Safari only tracks a live region it discovered on first mount -
  swapping in a new DOM node for every announcement makes it stop hearing
  updates after the first one. Repeat (even identical) announcements are
  instead produced by clearing to '' immediately, then setting the real text
  after a debounce, so the same node gets a genuine, detectable mutation.
*/
export const useNoOptionsAnnouncement = (): UseNoOptionsAnnouncementReturn => {
  const [rawAnnouncement, setRawAnnouncement] = useState<ReactNode>('');
  const [announcement, setAnnouncement] = useState<ReactNode>('');

  useEffect(() => {
    if (!rawAnnouncement) {
      setAnnouncement('');
      return;
    }

    const timeoutId = setTimeout(() => {
      setAnnouncement(rawAnnouncement);
    }, ANNOUNCEMENT_DEBOUNCE_MS);
    return () => clearTimeout(timeoutId);
  }, [rawAnnouncement]);

  const noOptionsMessageComponent = useMemo(
    () => createNoOptionsMessage(setRawAnnouncement),
    []
  );

  const clearAnnouncement = useCallback(() => setRawAnnouncement(''), []);

  return { noOptionsMessageComponent, announcement, clearAnnouncement };
};
