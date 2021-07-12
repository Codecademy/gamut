import { merge } from 'lodash';

import { variance } from '../core';
import { Parser, Prop, SystemProps, TransformerMap } from '../types/config';
import {
  AbstractProps,
  CSSPropMap,
  CSSProps,
  ThemeProps,
} from '../types/props';
import { createProps } from './createProps';
import * as props from './props';
import { Arg, PropConfig } from './types';

class FervorWithVariants<
  C extends PropConfig,
  P extends Parser<TransformerMap<C['props']>>,
  G extends (keyof C['groups'])[] | never[],
  Base extends CSSProps<AbstractProps, SystemProps<P>>,
  States extends CSSPropMap<AbstractProps, SystemProps<P>>,
  Variants extends Record<
    string,
    {
      prop?: any;
      defaultVariant?: any;
      base?: CSSProps<AbstractProps, SystemProps<P>>;
      variants: CSSPropMap<AbstractProps, SystemProps<P>>;
    }
  >
> {
  props = {} as C;
  parser = {} as P;
  groups = [] as G;
  base = {} as Base;
  states = {} as States;
  variants = {} as Variants;

  constructor(
    props: C,
    parser: P,
    groups: G,
    base: Base,
    states: States,
    variants: Variants
  ) {
    this.props = props;
    this.parser = parser;
    this.groups = groups;
    this.base = base;
    this.states = states;
    this.variants = variants;
  }

  withVariants<
    Keys extends keyof Props,
    Base extends AbstractProps,
    Props extends Record<Keys, AbstractProps>,
    PropKey extends Readonly<string> = 'variant'
  >(options: {
    prop?: PropKey;
    defaultVariant?: keyof Props;
    base?: CSSProps<Base, SystemProps<P>>;
    variants: CSSPropMap<Props, SystemProps<P>>;
  }) {
    type NextVariants = Variants & Record<PropKey, typeof options>;
    const prop = options.prop || 'variant';

    return new FervorWithVariants(
      this.props,
      this.parser,
      this.groups,
      this.base,
      this.states,
      merge(this.variants, { [prop]: options }) as NextVariants
    );
  }

  build() {
    const handler = (
      props: ThemeProps<
        {
          [K in keyof Arg<P> as `${K extends C['groups'][G[number]][number]
            ? K
            : never}`]?: Arg<P>[K];
        } &
          { [K in keyof Variants]?: keyof Variants[K]['variants'] } &
          {
            [K in keyof States]?: boolean;
          }
      >
    ) => ({});

    return handler;
  }
}

class FervorWithStates<
  C extends PropConfig,
  P extends Parser<TransformerMap<C['props']>>,
  G extends (keyof C['groups'])[] | never[],
  Base extends CSSProps<AbstractProps, SystemProps<P>>,
  States extends CSSPropMap<AbstractProps, SystemProps<P>>
> extends FervorWithVariants<C, P, G, Base, States, {}> {
  constructor(props: C, parser: P, groups: G, base: Base, states: States) {
    super(props, parser, groups, base, states, {});
  }
}

class FervorWithBase<
  C extends PropConfig,
  P extends Parser<TransformerMap<C['props']>>,
  G extends (keyof C['groups'])[] | never[],
  Base extends CSSProps<AbstractProps, SystemProps<P>>
> extends FervorWithVariants<C, P, G, Base, {}, {}> {
  constructor(props: C, parser: P, groups: G, base: Base) {
    super(props, parser, groups, base, {}, {});
  }

  withStates<Props extends AbstractProps>(
    config: CSSPropMap<Props, SystemProps<P>>
  ) {
    return new FervorWithStates(
      this.props,
      this.parser,
      this.groups,
      this.base,
      config
    );
  }
}

class FervorWithProps<
  C extends PropConfig,
  P extends Parser<TransformerMap<C['props']>>,
  G extends (keyof C['groups'])[] | never[]
> extends FervorWithBase<C, P, G, {}> {
  constructor(props: C, parser: P, groups: G) {
    super(props, parser, groups, {});
  }
  withBase<Props extends AbstractProps>(
    config: CSSProps<Props, SystemProps<P>>
  ) {
    return new FervorWithBase(this.props, this.parser, this.groups, config);
  }
}

class FervorWithSystemProps<
  C extends PropConfig,
  P extends Parser<TransformerMap<C['props']>>,
  G extends (keyof C['groups'])[] | never[]
> extends FervorWithProps<C, P, G> {
  constructor(props: C, parser: P, groups: G) {
    super(props, parser, groups);
  }
  withProps<ExtraProps extends Record<string, Prop>>(config: ExtraProps) {
    const newProps = { ...this.props.props, ...config } as C['props'] &
      ExtraProps;
    const parser = variance.create(newProps);
    return new FervorWithProps(
      { ...this.props, props: newProps },
      parser,
      this.groups
    );
  }
}

class Fervor<
  C extends PropConfig,
  P extends Parser<TransformerMap<C['props']>>
> extends FervorWithSystemProps<C, P, []> {
  constructor(config: C) {
    super(config, variance.create(config.props) as P, []);
  }
  withSystemProps<PickedGroups extends keyof C['groups']>(
    config: Record<PickedGroups, true>
  ) {
    return new FervorWithSystemProps(
      this.props,
      this.parser,
      Object.keys(config) as PickedGroups[]
    );
  }
}

const config = createProps()
  .addGroup('layout', props.layout)
  .addGroup('background', props.background)
  .addGroup('position', props.positioning)
  .addGroup('shadow', props.shadows)
  .build();

export const varia = new Fervor(config);

export const styles = varia
  .withSystemProps({
    layout: true,
    background: true,
  })
  .withProps({ dude: { property: 'all', scale: { lol: 'idk' } } })
  .withBase({ display: 'inline', dude: 'initial' })
  .withStates({ fit: { width: '100%', height: '100%' } })
  .withVariants({
    prop: 'testTown',
    variants: { cool: { display: 'none', dude: 'lol' } },
  })
  .withVariants({
    prop: 'story',
    variants: { bro: { display: 'block' }, hansel: { content: '""' } },
  })
  .build();

styles({ width: '100%', story: 'bro', testTown: 'cool', fit: true });
