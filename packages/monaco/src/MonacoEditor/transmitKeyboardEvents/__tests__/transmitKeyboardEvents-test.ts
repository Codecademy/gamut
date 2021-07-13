import { transmitKeyboardEvents } from '..';
import {
  createMockDocument,
  createMockEditor,
  createMockEditorEvent,
  createMockResolvedEvent,
  keyCodes,
  MockEditor,
} from './__fixtures__/mockEditor';

let mockTabbableElements: unknown[] = [];
jest.mock('tabbable', () => ({ tabbable: () => mockTabbableElements }));

describe('transmitKeybardEvents', () => {
  let mockEditor: MockEditor;
  let mockDocument: ReturnType<typeof createMockDocument>;

  describe('events captured by Monaco', () => {
    beforeEach(() => {
      mockEditor = createMockEditor();
      mockDocument = createMockDocument();
      const mockResolvedEvent = createMockResolvedEvent();
      mockEditor._standaloneKeybindingService.softDispatch.mockReturnValue(
        mockResolvedEvent
      );
    });

    it('does not re-dispatch a fired event when it is a tab', () => {
      transmitKeyboardEvents(mockEditor, keyCodes, mockDocument);

      const eventType = 'keydown';
      const mockEvent = createMockEditorEvent(eventType, {
        keyCode: keyCodes.Tab,
      });
      mockEditor.trigger('onKeyDownListeners', mockEvent);

      expect(mockDocument.dispatchEvent).not.toHaveBeenCalled();
    });

    it('re-dispatches a fired event when it is not a tab', () => {
      transmitKeyboardEvents(mockEditor, keyCodes, mockDocument);

      const eventType = 'keydown';
      const mockEvent = createMockEditorEvent(eventType, {
        keyCode: keyCodes.Enter,
      });
      mockEditor.trigger('onKeyDownListeners', mockEvent);

      expect(mockDocument.dispatchEvent).toHaveBeenLastCalledWith(
        expect.objectContaining({
          type: eventType,
        })
      );
    });

    it('does not prevent default on an unmodified enter event', () => {
      transmitKeyboardEvents(mockEditor, keyCodes, mockDocument);

      const eventType = 'keydown';
      const mockEvent = createMockEditorEvent(eventType, {
        keyCode: keyCodes.Enter,
      });
      mockEditor.trigger('onKeyDownListeners', mockEvent);

      expect(mockEvent.preventDefault).not.toHaveBeenCalled();
      expect(mockEvent.stopPropagation).not.toHaveBeenCalled();
    });

    it('prevents default on a ctrl+enter event', () => {
      transmitKeyboardEvents(mockEditor, keyCodes, mockDocument);

      const eventType = 'keydown';
      const mockEvent = createMockEditorEvent(eventType, {
        ctrlKey: true,
        keyCode: keyCodes.Enter,
      });
      mockEditor.trigger('onKeyDownListeners', mockEvent);

      expect(mockEvent.preventDefault).toHaveBeenCalledTimes(1);
      expect(mockEvent.stopPropagation).toHaveBeenCalledTimes(1);
    });

    it('does not attempt to tab to a next element on a non-escape key event', () => {
      mockTabbableElements = [];

      transmitKeyboardEvents(mockEditor, keyCodes, mockDocument);

      const eventType = 'keydown';
      const mockEvent = createMockEditorEvent(eventType, {
        ctrlKey: true,
        keyCode: keyCodes.Enter,
      });

      expect(() =>
        mockEditor.trigger('onKeyDownListeners', mockEvent)
      ).not.toThrow();
    });

    it('tabs to a next element on an escape key event', () => {
      const currentActiveElement = {} as Element;
      const nextActiveElement = {
        focus: jest.fn(),
      };
      // Override the mockDocument from beforeEach
      mockDocument = createMockDocument({
        activeElement: currentActiveElement,
      });

      mockTabbableElements = [currentActiveElement, nextActiveElement];

      transmitKeyboardEvents(mockEditor, keyCodes, mockDocument);

      const eventType = 'keydown';
      const mockEvent = createMockEditorEvent(eventType, {
        ctrlKey: true,
        keyCode: keyCodes.Escape,
      });
      mockEditor.trigger('onKeyDownListeners', mockEvent);

      expect(nextActiveElement.focus).toHaveBeenCalledTimes(1);
    });
  });

  describe('Events not captured by monaco', () => {
    beforeEach(() => {
      mockEditor = createMockEditor();
      mockDocument = createMockDocument();
      mockEditor._standaloneKeybindingService.softDispatch.mockReturnValue(
        null
      );
    });

    it('does not retrigger the event', () => {
      transmitKeyboardEvents(mockEditor, keyCodes, mockDocument);

      const eventType = 'keydown';
      const mockEvent = createMockEditorEvent(eventType, {
        ctrlKey: true,
        keyCode: keyCodes.US_DOT, // ctrl + .
      });
      mockEditor.trigger('onKeyDownListeners', mockEvent);

      expect(mockDocument.dispatchEvent).not.toHaveBeenCalled();
    });
  });
});
