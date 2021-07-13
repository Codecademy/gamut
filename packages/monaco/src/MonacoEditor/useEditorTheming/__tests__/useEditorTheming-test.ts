import { act, renderHook } from '@testing-library/react-hooks';

import { darkTheme } from '../../../libs/theme';
import { EditorTheme } from '../../../libs/theme/editorTheme';
import {
  createMockMonaco,
  mockUserInterfaceSettings,
} from '../../__fixtures__/mockMonaco';
import { useEditorTheming } from '..';

describe('useEditorTheming', () => {
  it('does not crash when monaco and the editor do not exist', () => {
    renderHook(() =>
      useEditorTheming(
        mockUserInterfaceSettings,
        undefined,
        undefined,
        undefined
      )
    );
  });

  it('sets the theme to high contrast when high contrast is enabled', () => {
    mockUserInterfaceSettings.highContrast = true;
    const { monaco } = createMockMonaco();
    renderHook(() =>
      useEditorTheming(mockUserInterfaceSettings, undefined, undefined, monaco)
    );

    expect(monaco.editor.setTheme).toHaveBeenCalledWith(
      EditorTheme.highContrast
    );
  });

  it('sets the dark theme when high contrast is disabled', () => {
    mockUserInterfaceSettings.highContrast = false;
    const { monaco } = createMockMonaco();
    renderHook(() =>
      useEditorTheming(mockUserInterfaceSettings, undefined, undefined, monaco)
    );

    expect(monaco.editor.setTheme).toHaveBeenCalledWith(EditorTheme.dark);
  });

  it('loads the dark theme when high contrast is first disabled', () => {
    const { monaco } = createMockMonaco();
    renderHook(() =>
      useEditorTheming(mockUserInterfaceSettings, undefined, undefined, monaco)
    );

    expect(monaco.editor.defineTheme).toHaveBeenCalledWith(
      EditorTheme.dark,
      darkTheme
    );
  });

  it('does not load the dark theme when high contrast is disabled again', () => {
    mockUserInterfaceSettings.highContrast = true;

    const { monaco } = createMockMonaco();
    const hook = renderHook(() =>
      useEditorTheming(mockUserInterfaceSettings, undefined, undefined, monaco)
    );
    mockUserInterfaceSettings.highContrast = false;
    act(hook.rerender);

    expect(monaco.editor.defineTheme).toHaveBeenCalledTimes(1);
  });

  it('toggleInterfaceSetting is called with with highContrast when its action is fired', () => {
    const toggleInterfaceSetting = jest.fn();

    const { actions, editor, monaco } = createMockMonaco();
    renderHook(() =>
      useEditorTheming(
        mockUserInterfaceSettings,
        toggleInterfaceSetting,
        editor,
        monaco
      )
    );

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    actions['editor.action.toggleHighContrast'].run(editor);

    expect(toggleInterfaceSetting).toHaveBeenCalledWith('highContrast');
  });
});
