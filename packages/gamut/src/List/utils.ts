import { Children, cloneElement, isValidElement, ReactNode } from 'react';

/**
 * Marks the first column with `data-first-col` for use as an attribute selector.
 * Avoids `:first-of-type` (broken when `<th>` and `<td>` mix in a row) and
 * `:first-child` (triggers Emotion's SSR warning).
 */
export const markFirstCol = (children: ReactNode): ReactNode => {
  let marked = false;
  return Children.map(children, (child) => {
    if (!marked && isValidElement(child)) {
      marked = true;
      return cloneElement(child, { 'data-first-col': true } as object);
    }
    return child;
  });
};
