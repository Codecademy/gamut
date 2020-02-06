import cx from 'classnames';
import { HTMLToReactNode } from './overrides';

type StylesObject = {
  [className: string]: string;
};

/**
 * Preprocessing Instructions:
 *
 * Runs through each named tag in the html and adds a class name
 * to it based on the tag name. This means all `<pre>` tags will
 * actually output `<pre class="pre" />`
 * The class name will only be applied if it exists in the stylesheet for this component.
 *
 * @remarks
 * This is done instead of styling the elements directly to prevent styles from interfering
 * with component overrides
 */
export const createPreprocessingInstructions = (styles: StylesObject) => {
  return [
    {
      shouldPreprocessNode: function(node: HTMLToReactNode) {
        return Boolean(node.name);
      },
      preprocessNode: function(node: HTMLToReactNode) {
        const classname = cx(
          {
            [`${styles[node.name]}`]: Boolean(styles[node.name]),
          },
          node.attribs && node.attribs.class
        );

        const attrs = { ...node.attribs };
        if (classname) attrs.class = classname;
        node.attribs = attrs;
      },
    },
  ];
};
