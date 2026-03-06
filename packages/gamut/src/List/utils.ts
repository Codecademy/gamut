import { Children, cloneElement, isValidElement, ReactNode } from 'react';

/**
 * Marks the first and last columns with `data-first-col` / `data-last-col`
 * for use as attribute selectors. Avoids `:first-of-type` / `:last-of-type`
 * (broken when `<th>` and `<td>` mix in a row) and `:first-child` / `:last-child`
 * (triggers Emotion's SSR warning).
 */
export const markEdgeCols = (children: ReactNode): ReactNode => {
  const arr = Children.toArray(children).filter(isValidElement);
  const lastIdx = arr.length - 1;
  return arr.map((child, i) => {
    const props: Record<string, boolean> = {};
    if (i === 0) props['data-first-col'] = true;
    if (i === lastIdx) props['data-last-col'] = true;
    return Object.keys(props).length ? cloneElement(child, props as object) : child;
  });
};
