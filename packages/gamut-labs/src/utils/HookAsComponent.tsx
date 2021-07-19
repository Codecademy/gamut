export type VoidHook = (...args: any[]) => void;

export type HookAsComponentProps<Hook extends VoidHook> = {
  args: Parameters<Hook>;
  hook: Hook;
};

export function HookAsComponent<Hook extends VoidHook>({
  args,
  hook,
}: HookAsComponentProps<Hook>) {
  hook(...args);
  return null;
}
