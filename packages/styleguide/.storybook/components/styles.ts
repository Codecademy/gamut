import { compose, system } from '@codecademy/gamut-system';
import { values } from 'lodash';

export const { css, properties, variant, ...groups } = system.create({});

export const allProps = compose(...values(groups));

export const { color, typography, spacing, layout } = groups;
