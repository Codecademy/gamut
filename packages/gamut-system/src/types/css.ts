type PseudoSelectors =
  | 'hover'
  | 'active'
  | 'focus'
  | 'focus-visible'
  | 'focus-within'
  | 'visited';

type PseudoElements = 'before' | 'after';

export type ComplexCSS<Props extends unknown> = Props &
  {
    [key in
      | PseudoSelectors
      | PseudoElements as `&:${key}`]?: key extends PseudoElements
      ? { content: string } & Props
      : Props;
  };

export interface CSSObject {
  [key: string]: string | number | undefined;
}
