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
      useEditorTheming(mockUserInterfaceSettings, undefined, undefined)
    );
  });

  it('sets the theme to high contrast when high contrast is enabled', () => {
    mockUserInterfaceSettings.highContrast = true;
    const { monaco } = createMockMonaco();
    renderHook(() =>
      useEditorTheming(mockUserInterfaceSettings, undefined, monaco)
    );

    expect(monaco.editor.setTheme).toHaveBeenCalledWith(
      EditorTheme.highContrast
    );
  });

  it('sets the dark theme when high contrast is disabled', () => {
    mockUserInterfaceSettings.highContrast = false;
    const { monaco } = createMockMonaco();
    renderHook(() =>
      useEditorTheming(mockUserInterfaceSettings, undefined, monaco)
    );

    expect(monaco.editor.setTheme).toHaveBeenCalledWith(EditorTheme.dark);
  });

  it('loads the dark theme when high contrast is first disabled', () => {
    const { monaco } = createMockMonaco();
    renderHook(() =>
      useEditorTheming(mockUserInterfaceSettings, undefined, monaco)
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
      useEditorTheming(mockUserInterfaceSettings, undefined, monaco)
    );
    mockUserInterfaceSettings.highContrast = false;
    act(hook.rerender);

    expect(monaco.editor.defineTheme).toHaveBeenCalledTimes(1);
  });

  // TODO add test for dispatcher that toggles highContrast
});
