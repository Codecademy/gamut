import { GamutCanvas } from './GamutCanvas';

/**
 * Default-export adapter so `astro-live-code`'s `wrapper` option (which
 * requires a default export) can use GamutCanvas to provide theme/color-mode
 * context around `live` code block examples.
 */
export default GamutCanvas;
