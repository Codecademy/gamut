import { theme } from '@codecademy/gamut-styles';

interface Variables {
  [key: string]: string;
}

/**
 * Variables for the Vidstack Player
 * list of variables can be found here:
 * https://vidstack.io/docs/player/components/layouts/default-layout/?styling=default-theme#css-variables
 */
export const vdsVariables: Variables = {
  // Video Variables
  '--video-font-family': theme.fontFamily.base,
  '--video-brand': theme.colors['gray-100'],
  '--video-controls-color': theme.colors['gray-100'],
  '--video-focus-ring-color': theme.colors.primary,
  '--video-bg': theme.colors.black,
  '--video-border-radius': theme.borderRadii.md,
  // Media/Control Variables
  '--media-button-border-radius': theme.borderRadii.md,
  '--media-button-padding': `0px ${theme.spacing[8]}`,
  '--media-tooltip-bg-color': theme.colors['background-contrast'],
  '--media-tooltip-border-radius': theme.borderRadii.sm,
  '--media-tooltip-border': `1px solid ${theme.colors['border-primary']}`,
  '--media-tooltip-color': theme.colors.text,
  '--media-tooltip-font-size': theme.fontSize[14],
  '--media-tooltip-padding': theme.spacing[4],
  '--media-menu-checkbox-bg-active': theme.colors.primary,
  '--media-menu-checkbox-bg': theme.colors['text-disabled'],
  '--media-menu-checkbox-width': '36px',
  '--media-menu-checkbox-height': '18px',
  '--media-menu-checkbox-handle-border': `1px solid ${theme.colors.background}`,
  '--media-slider-preview-border-radius': theme.borderRadii.sm,
  '--media-slider-value-bg': theme.colors['background-contrast'],
  '--media-slider-value-border-radius': theme.borderRadii.sm,
  '--media-slider-value-border': `1px solid ${theme.colors['border-primary']}`,
  '--media-slider-value-color': theme.colors.text,
  '--media-slider-value-padding': theme.spacing[4],
  '--media-tooltip-exit-animation': 'vds-tooltip-exit 0s',
  '--media-tooltip-enter-animation': 'vds-tooltip-enter 0s',
  '--media-menu-bg': theme.colors.background,
  '--media-menu-top-bar-bg': theme.colors.background,
  '--media-menu-section-bg': theme.colors['background-selected'],
  '--media-menu-border': `1px solid ${theme.colors['border-primary']}`,
  '--media-menu-border-radius': theme.borderRadii.sm,
};
