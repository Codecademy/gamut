import { IDisposable, IKeyboardEvent } from 'monaco-editor';
import { StandaloneKeybindingService } from 'monaco-editor/esm/vs/editor/standalone/browser/simpleServices';

import { Editor, Monaco } from '../../../types';

export type MockEditor = BasicMockEditor & Editor.IStandaloneCodeEditor;

class MockStandaloneKeybindingService {
  softDispatch: jest.Mock = jest.fn();
}

class MockDisposable implements IDisposable {
  dispose = jest.fn();
}

export class BasicMockEditor {
  onKeyDownListeners: jest.Mock[] = [];

  onKeyUpListeners: jest.Mock[] = [];

  _standaloneKeybindingService = new MockStandaloneKeybindingService() as StandaloneKeybindingService;

  onKeyDown(listener: jest.Mock) {
    this.onKeyDownListeners.push(listener);
    return new MockDisposable();
  }

  onKeyUp(listener: jest.Mock) {
    this.onKeyUpListeners.push(listener);
    return new MockDisposable();
  }

  trigger(
    listeners: 'onKeyDownListeners' | 'onKeyUpListeners',
    event: unknown
  ) {
    this[listeners].forEach((listener) => listener(event));
  }
}

export const createMockEditor = () => new BasicMockEditor() as MockEditor;

export const createMockEditorEvent = (
  type: string,
  overrides: Partial<IKeyboardEvent>
): IKeyboardEvent => ({
  _standardKeyboardEventBrand: true,
  altKey: false,
  browserEvent: new KeyboardEvent(type),
  code: '',
  ctrlKey: false,
  equals: jest.fn(),
  keyCode: 0,
  metaKey: false,
  preventDefault: jest.fn(),
  shiftKey: false,
  stopPropagation: jest.fn(),
  target: {} as any,
  ...overrides,
});

export const keyCodes = {
  Tab: 2,
  Enter: 3,
  Escape: 9,
} as Monaco['KeyCode'];

export const createMockDocument = (overrides: Partial<Document> = {}) => ({
  activeElement: null,
  body: {} as HTMLBodyElement,
  dispatchEvent: jest.fn(),
  ...overrides,
});

export const createMockResolvedEvent = (bubble = false) => ({
  bubble,
});
