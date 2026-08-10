import { flattenScale } from '@codecademy/variance';

import { coreTheme } from '../themes/core';
import { lxStudioTheme } from '../themes/lxStudio';
import { percipioTheme } from '../themes/percipio';

const coreElevationScale = {
  rest: {
    'box-shadow': `0 0 0 0 ${coreTheme.colors['shadow-primary']}`,
    transform: 'translate(4px, -4px)',
  },
  hover: {
    'box-shadow': `-8px 8px 0 0 ${coreTheme.colors['shadow-primary']}`,
    transform: 'translate(4px, -4px)',
  },
  'hover-mirrored': {
    'box-shadow': `-8px 8px 0 0 ${coreTheme.colors['shadow-primary']}`,
    transform: 'translate(4px, -4px)',
  },
};

export const coreElevation = flattenScale(coreElevationScale);

const lxStudioElevationScale = {
  rest: {
    'box-shadow': `0 0 0 0 ${lxStudioTheme.colors['shadow-primary']}`,
    transform: 'none',
  },
  hover: {
    'box-shadow': `-8px 8px 0 0 ${lxStudioTheme.colors['shadow-primary']}`,
    transform: 'translate(4px, -4px)',
  },
  'hover-mirrored': {
    'box-shadow': `-8px 8px 0 0 ${lxStudioTheme.colors['shadow-primary']}`,
    transform: 'translate(4px, -4px)',
  },
};

export const lxStudioElevation = flattenScale(lxStudioElevationScale);

const percipioElevationScale = {
  rest: {
    'box-shadow': `0 1px 4px 0 ${percipioTheme.colors['shadow-primary']},
    0 2px 7px 0 ${percipioTheme.colors['shadow-primary']}`,
  },
  hover: {
    'box-shadow': `0 1px 4px 0 ${percipioTheme.colors['shadow-primary']},
    0 2px 11px 0 ${percipioTheme.colors['shadow-primary']}`,
  },
  'hover-mirrored': {
    'box-shadow': `0 1px 4px 0 ${percipioTheme.colors['shadow-primary']},
    0 2px 11px 0 ${percipioTheme.colors['shadow-primary']}`,
  },
};

export const percipioElevation = flattenScale(percipioElevationScale);
