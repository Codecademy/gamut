/* eslint-disable local-rules/gamut-import-paths */
import * as ALL_PROPS from '@codecademy/gamut-styles/src/variance/config';
import { kebabCase } from 'lodash';
import React from 'react';

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
      <Code key={property}>{kebabCase(property)}</Code>
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
