import { Children, isValidElement } from 'react';

/**
 * Recursively extracts plain text content from React children.
 *
 * Useful for converting JSX to plain text for accessibility purposes
 * like screenreader announcements or aria-labels.
 *
 * Also handles components that use a `text` prop instead of children
 * (e.g. the Markdown component).
 *
 * @param children - React children to extract text from
 * @returns Plain text string with all text content joined by spaces
 *
 * @example
 * ```tsx
 * const text = extractTextContent(
 *   <div>Hello <strong>world</strong>!</div>
 * );
 * // Returns: "Hello world !"
 *
 * ```
 */
export const extractTextContent = (children: React.ReactNode): string => {
  if (typeof children === 'string' || typeof children === 'number') {
    return String(children);
  }

  return Children.toArray(children)
    .map((child) => {
      if (typeof child === 'string' || typeof child === 'number') {
        return String(child);
      }
      if (typeof child === 'boolean' || child == null) {
        return '';
      }
      if (isValidElement(child)) {
        const textContent = child.props.children ?? child.props.text ?? '';
        return extractTextContent(textContent);
      }
      return '';
    })
    .filter(Boolean)
    .join(' ');
};
