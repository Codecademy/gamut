/* eslint-disable gamut/import-paths */

import { Anchor } from '@codecademy/gamut/src';
import * as ALL_PROPS from '@codecademy/gamut-styles/src/variance/config';
import kebabCase from 'lodash/kebabCase';

import { Code, LinkTo } from '~styleguide/blocks';

const PROP_COLUMN = {
  key: 'id',
  name: 'Prop',
  size: 'lg',
};

const PROPERTIES_COLUMN = {
  key: 'properties',
  name: 'Properties',
  size: 'xl',
  render: ({
    property,
    properties = [property],
  }: {
    property: string;
    properties: string[];
  }) =>
    properties.map((property) => (
      <Anchor
        href={`https://developer.mozilla.org/en-US/docs/Web/CSS/${property}`}
        target="_blank"
        rel=""
      >
        <Code key={property}>{kebabCase(property)}</Code>
      </Anchor>
    )),
};

const SCALE_COLUMN = {
  key: 'scale',
  name: 'Scale',
  size: 'lg',
  render: ({ scale }: { scale: string }) => (
    <LinkTo id={`foundations-theme--${kebabCase(scale)}`}>{scale}</LinkTo>
  ),
};

const TRANSFORM_COLUMN = {
  key: 'transform',
  name: 'Transform',
  size: 'fill',
  render: ({ transform }: any) => transform && <Code>{transform?.name}</Code>,
};

export const defaultColumns = [
  PROP_COLUMN,
  PROPERTIES_COLUMN,
  SCALE_COLUMN,
  TRANSFORM_COLUMN,
];

export const getPropRows = (key: keyof typeof ALL_PROPS) =>
  Object.entries(ALL_PROPS[key]).map(([prop, config]) => ({
    id: prop,
    ...config,
  }));
