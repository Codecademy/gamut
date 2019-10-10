import { HTMLToReactNode } from './overrides';
declare type StylesObject = {
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
export declare const createPreprocessingInstructions: (styles: StylesObject) => {
    shouldPreprocessNode: (node: HTMLToReactNode) => boolean;
    preprocessNode: (node: HTMLToReactNode) => void;
}[];
export {};
