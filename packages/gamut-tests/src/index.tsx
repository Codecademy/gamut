import { GamutProvider, theme } from '@codecademy/gamut-styles';
import {
  FullProps,
  RemainingPropsAndTestOverrides,
  RenderRtl,
  SetupComponentType,
  setupRtl as setupRtlBase,
} from 'component-test-setup';
import overArgs from 'lodash/overArgs';
import * as React from 'react';

// See https://skillsoftdev.atlassian.net/wiki/spaces/779a16d9c7ea452eab11b39cbbe771ce/pages/4441315387/Frontend+Unit+Tests for more info

export const MockGamutProvider: React.FC<{
  children?: React.ReactNode;
  useLogicalProperties?: boolean;
}> = ({ children, useLogicalProperties }) => {
  return (
    <GamutProvider
      theme={theme}
      useCache={false}
      useGlobals={false}
      useLogicalProperties={useLogicalProperties}
    >
      {children}
    </GamutProvider>
  );
};

function withMockGamutProvider<Props extends React.JSX.IntrinsicAttributes>(
  WrappedComponent: React.ComponentType<Props>
) {
  const WithBoundaryComponent: React.FC<Props> = (props) => (
    <MockGamutProvider>
      <WrappedComponent {...props} />
    </MockGamutProvider>
  );

  return WithBoundaryComponent;
}

/*
 * component-test-setup decides whether `renderView`'s argument is required by
 * asking, for each key of the props type, whether an arbitrary object would
 * satisfy it. A `data-*` index signature (`DataAttributes` in
 * @codecademy/gamut) answers no, since `unknown` isn't assignable to its value
 * type, so the key gets treated as required and `renderView()` with no
 * arguments stops compiling. Index signatures are never genuinely required, so
 * drop them before that decision is made. Types only; no runtime effect.
 */
type StripDataAttrs<T> = {
  [K in keyof T as K extends `data-${string}` ? never : K]: T[K];
};

// mirrors component-test-setup's internal RequiredKeys, which it doesn't export
type RequiredKeys<T> = {
  [K in keyof T]-?: Record<string, unknown> extends { [P in K]: T[K] }
    ? never
    : K;
}[keyof T];

type TestProps<
  Component extends SetupComponentType,
  BaseProps extends Partial<FullProps<Component>>
> = RequiredKeys<
  StripDataAttrs<Omit<FullProps<Component>, keyof BaseProps>>
> extends never
  ? [RemainingPropsAndTestOverrides<Component, BaseProps>?]
  : [RemainingPropsAndTestOverrides<Component, BaseProps>];

/*
 * component-test-setup doesn't export the type of what a render returns, so
 * alias it here. Without an exported name, anything that re-exports a
 * `renderView` fails declaration emit with TS4023.
 */
export type GamutRenderRtlReturn<
  Component extends SetupComponentType,
  BaseProps extends Partial<FullProps<Component>>
> = ReturnType<RenderRtl<Component, BaseProps>>;

export type GamutRenderRtl<
  Component extends SetupComponentType,
  BaseProps extends Partial<FullProps<Component>>
> = {
  (...testProps: TestProps<Component, BaseProps>): GamutRenderRtlReturn<
    Component,
    BaseProps
  >;
  options: (
    options: Parameters<RenderRtl<Component, BaseProps>['options']>[0]
  ) => GamutRenderRtl<Component, BaseProps>;
};

// overArgs isn't fully typed yet for lack of curried generics, so we have to cast it...

export const setupRtl = overArgs(setupRtlBase, withMockGamutProvider) as <
  Component extends SetupComponentType,
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type -- mirrors component-test-setup's own default
  BaseProps extends Partial<FullProps<Component>> = {}
>(
  Component: Component,
  baseProps?: BaseProps
) => GamutRenderRtl<Component, BaseProps>;
