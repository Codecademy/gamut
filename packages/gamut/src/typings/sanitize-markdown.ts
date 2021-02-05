declare module 'sanitize-markdown' {
  function sanitizeMarkdown(
    html: string,
    options?: any,
    strict?: boolean
  ): string;
  namespace sanitizeMarkdown {
    export const defaults: any;
  }
  export default sanitizeMarkdown;
}
