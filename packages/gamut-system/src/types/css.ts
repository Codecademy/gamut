type PseudoSelectors =
  | 'hover'
  | 'active'
  | 'focus'
  | 'focus-visible'
  | 'focus-within'
  | 'visited';

type PseudoElements = 'before' | 'after';

export type ComplexCss<Props extends unknown> = Props &
  {
    [key in
      | PseudoSelectors
      | PseudoElements as `&:${key}`]?: key extends PseudoElements
      ? { content: string } & Props
      : Props;
  };

export type CSSObject = Record<string, string | number>;
