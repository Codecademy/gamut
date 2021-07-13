import { resolveMonacoKeyboardEvent } from '../resolveMonacoKeyboardEvent';
import {
  createMockEditor,
  createMockEditorEvent,
  keyCodes,
} from './__fixtures__/mockEditor';

describe('resolveMonacoKeyboardEvent', () => {
  it('calls into monaco to deterine if the key event is bound', () => {
    const mockEditor = createMockEditor();
    const eventType = 'keydown';
    const mockEvent = createMockEditorEvent(eventType, {
      keyCode: keyCodes.Enter,
    });
    resolveMonacoKeyboardEvent(mockEditor, mockEvent);

    expect(
      mockEditor._standaloneKeybindingService.softDispatch
    ).toHaveBeenCalledWith(mockEvent, mockEvent.target);
  });
});
