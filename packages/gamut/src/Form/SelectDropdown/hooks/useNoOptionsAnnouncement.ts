import { ComponentType, ReactNode, useEffect, useMemo, useState } from 'react';

import { createNoOptionsMessage } from '../elements';

const ANNOUNCEMENT_DEBOUNCE_MS = 400;

interface UseNoOptionsAnnouncementReturn {
  /** `NoOptionsMessage` override for react-select's `components` prop */
  noOptionsMessageComponent: ComponentType<any>;
  /** Current text for the standalone accessibility live region */
  announcement: ReactNode;
  /** Changes whenever `announcement` has a new value to announce */
  announcementKey: number;
}

/**
 * Announces react-select's "no options" menu text (its default "No options",
 * or a custom `validationMessage`) to screen readers via a standalone live
 * region. react-select's own live region only fires when its `options` prop
 * is non-empty, so it never speaks the "no options" state - this fills that
 * gap, including while a consumer is mid-fetch with an empty `options` array.
 */
export const useNoOptionsAnnouncement = (): UseNoOptionsAnnouncementReturn => {
  const [rawAnnouncement, setRawAnnouncement] = useState<ReactNode>('');
  const [announcement, setAnnouncement] = useState<ReactNode>('');
  const [announcementKey, setAnnouncementKey] = useState(0);

  useEffect(() => {
    // Applying '' immediately (rather than debounced) guarantees a real DOM
    // mutation happens before an identical message can be shown again -
    // aria-live announcements depend on an actual content change to fire.
    if (!rawAnnouncement) {
      setAnnouncement('');
      return;
    }

    const timeoutId = setTimeout(() => {
      setAnnouncement(rawAnnouncement);
    }, ANNOUNCEMENT_DEBOUNCE_MS);
    return () => clearTimeout(timeoutId);
  }, [rawAnnouncement]);

  useEffect(() => {
    // Safari/VoiceOver can silently drop a live region's second announcement
    // when it's only a text mutation on an already-mounted node. Incrementing
    // this key (used by the caller to key the live region element) forces
    // React to unmount and recreate the DOM node for every new announcement,
    // so each one is a genuinely fresh node.
    if (announcement) {
      setAnnouncementKey((key) => key + 1);
    }
  }, [announcement]);

  const noOptionsMessageComponent = useMemo(
    () => createNoOptionsMessage(setRawAnnouncement),
    []
  );

  return { noOptionsMessageComponent, announcement, announcementKey };
};
