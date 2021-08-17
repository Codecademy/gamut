import { Editor, EditorInterfaceSettings, Monaco } from '../types';

export const createMockMonaco = () => {
  const actions: Record<string, Editor.IActionDescriptor> = {};
  const commands: Record<number, Editor.ICommandHandler> = {};

  const editor = ({
    addAction: jest.fn((descriptor: Editor.IActionDescriptor) => {
      actions[descriptor.id] = descriptor;
    }),
    addCommand: jest.fn((keys: number, handler: Editor.ICommandHandler) => {
      commands[keys] = handler;
    }),
    onKeyDown: jest.fn(),
    onKeyUp: jest.fn(),
    trigger: jest.fn(),
    updateOptions: jest.fn(),
  } as unknown) as Editor.IStandaloneCodeEditor;

  const monaco = {
    editor: {
      defineTheme: jest.fn(),
      setTheme: jest.fn(),
    },
    KeyCode: {
      KEY_P: 40,
    },
    KeyMod: {
      CtrlCmd: 0,
      Shift: 1,
    },
    languages: {
      typescript: {
        ModuleKind: {
          CommonJS: 1,
        },
        ScriptTarget: {
          ES2017: 4,
        },
        javascriptDefaults: {
          setDiagnosticsOptions: jest.fn(),
        },
        typescriptDefaults: {
          setCompilerOptions: jest.fn(),
          setDiagnosticsOptions: jest.fn(),
        },
      },
    },
  };

  return {
    actions,
    commands,
    editor,
    monaco: monaco as typeof monaco & Monaco,
  };
};

export const mockUserInterfaceSettings: EditorInterfaceSettings = {
  autoCloseTokens: true,
  editorFontSize: 'reg',
  highContrast: false,
  renderWhitespace: false,
  screenReader: false,
};
