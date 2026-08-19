import { useMDXComponents as getDocsMDXComponents } from 'nextra-theme-docs';

const docsComponents = getDocsMDXComponents();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useMDXComponents(components?: Record<string, any>) {
  return {
    ...docsComponents,
    ...components,
  };
}
