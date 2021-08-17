declare module 'htmlhint/lib/htmlhint' {
  export interface HtmlValidationComplaint {
    col: number;
    line: number;
    message: string;
  }

  const HTMLHint: {
    verify: (
      text: string,
      defaultHtmlHintRules: Record<string, boolean>
    ) => HtmlValidationComplaint[];
  };
}
