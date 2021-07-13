import type { IKeyboardEvent } from 'monaco-editor';
import type { StandaloneKeybindingService } from 'monaco-editor/esm/vs/editor/standalone/browser/simpleServices';

import { Editor } from '../types';

export type TransmitEditor = Editor.IStandaloneCodeEditor & {
  onKeyDown(listener: (event: IKeyboardEvent) => void): void;
  onKeyUp(listener: (event: IKeyboardEvent) => void): void;
  _standaloneKeybindingService: StandaloneKeybindingService;
};

// Partially borrowed from https://github.com/microsoft/vscode/blob/e952b9cf9c1f82821dbbb491d37b5f64cc9c5890/src/vs/platform/keybinding/common/keybindingResolver.ts
// because it's not publicly exported from Monaco.
export type IResolveResult = {
  // Indicates whether or not Monaco will bubble the resolved event up
  // to parent elements in the dom.
  bubble: boolean;
};

/*
  The editor._standaloneKeybindingService handles mapping keybindings to editor actions,
  and if the keyboard event is bound by monaco, softDispatch will look up the binding,
  including whether event bubbling is prevented by monaco. Eventually Monaco may allow
  more configuration of default keybinding behavior, but for now, we need to use this
  hack to determine whether or not monaco binds the keystroke(s) in the event.

  See https://github.com/microsoft/vscode/blob/e952b9cf9c1f82821dbbb491d37b5f64cc9c5890/src/vs/platform/keybinding/common/abstractKeybindingService.ts
  and https://github.com/microsoft/monaco-editor/issues/102.
*/
export const resolveMonacoKeyboardEvent = (
  editor: TransmitEditor,
  rawEvent: IKeyboardEvent
): IResolveResult | null => {
  const keybindingService = editor._standaloneKeybindingService;
  return keybindingService.softDispatch(rawEvent, rawEvent.target);
};
