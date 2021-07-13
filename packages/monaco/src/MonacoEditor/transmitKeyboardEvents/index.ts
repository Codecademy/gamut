import type { IKeyboardEvent } from 'monaco-editor';
import { tabbable } from 'tabbable';

import { Monaco } from '../types';
import type {
  IResolveResult,
  TransmitEditor,
} from './resolveMonacoKeyboardEvent';
import { resolveMonacoKeyboardEvent } from './resolveMonacoKeyboardEvent';

// True if Monaco has a binding for a keyboard event and doesn't
// bubble it up the dom, or if the event is cause by a tab keypress.
// We don't want to transmit tabs because Safari treats them as page
// navigation events.
const retriggerNeeded = (
  rawEvent: IKeyboardEvent,
  resolvedEvent: IResolveResult | null,
  keyCodes: Monaco['KeyCode']
) => {
  return (
    rawEvent.keyCode !== keyCodes.Tab && resolvedEvent && !resolvedEvent.bubble
  );
};

// True if it's a CMD+Enter or CTRL+Enter keypress.
const isCmdOrCtrlEnterKeyPress = (
  rawEvent: IKeyboardEvent,
  keyCodes: Monaco['KeyCode']
) => {
  return (
    rawEvent.keyCode === keyCodes.Enter &&
    (rawEvent.metaKey || rawEvent.ctrlKey)
  );
};

export const transmitKeyboardEvents = (
  editor: TransmitEditor,
  keyCodes: Monaco['KeyCode'],
  document: Pick<Document, 'activeElement' | 'body' | 'dispatchEvent'>
) => {
  for (const listener of ['onKeyDown', 'onKeyUp'] as const) {
    editor[listener]((rawEvent) => {
      const resolvedEvent = resolveMonacoKeyboardEvent(editor, rawEvent);

      // Retrigger the event on document if Monaco has a binding for it and normally does not
      // bubble it up the dom. This allows react-hotkeys (via hotkeys-js) to receive our events.
      if (retriggerNeeded(rawEvent, resolvedEvent, keyCodes)) {
        const newEvent = new KeyboardEvent(
          rawEvent.browserEvent.type,
          rawEvent.browserEvent
        );
        try {
          document.dispatchEvent(newEvent);
        } catch (err) {
          // TODO import logSameOriginError function
          // logSameOriginError(err);
        }
      }

      // Regardless, our site generally treats Ctrl/Cmd + Enter as a "Run"/"Submit" action.
      // We don't want users to use that to create new lines -- even in editors where that's not the case.
      if (isCmdOrCtrlEnterKeyPress(rawEvent, keyCodes)) {
        rawEvent.preventDefault();
        rawEvent.stopPropagation();
      }
    });
  }

  // Monaco doesn't un-focus by default with the escape key like other editors.
  // We add onto the escape key behavior by manually focusing the next tabbable element.
  // This intentionally works really well in the LE by dropping them onto the Run button.
  editor.onKeyDown((rawEvent) => {
    if (rawEvent.keyCode !== keyCodes.Escape) {
      return;
    }

    const currentInput = document.activeElement as HTMLElement;
    const tabbableElements = tabbable(document.body);

    tabbableElements[tabbableElements.indexOf(currentInput) + 1].focus();
  });
};
