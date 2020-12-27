import { compose, system } from '@codecademy/gamut-system';
import { values } from 'lodash';

export const { properties, variant, ...groups } = system.create({});

export const allProps = compose(...values(groups));
