declare module 'insane' {
  function Insane(html: string, options?: any, strict?: boolean): string;
  namespace Insane {
    export const defaults: any;
  }
  export default Insane;
}
