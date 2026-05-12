import { corePalette, platformPalette } from '@codecademy/gamut-styles';

/**
 * Resolved hex values for palette keys (same source as `platformTheme._tokens.colors`).
 * `platformTheme.colors` is only `var(--color-*)` references after `addColorModes`, so it
 * cannot be used for numeric distance matching.
 */
export const platformResolvedPalette: Record<string, string> = {
  ...corePalette,
  ...platformPalette,
};

const SOLID_HEX = /^#[0-9a-f]{6}$/i;

const isEditorChromeKey = (key: string) =>
  /^(comment-|indent-|line-number-)/.test(key);

/** sRGB channel 0–1 → linear light (same as CSS Color 4). */
function srgbChannelToLinear(u: number): number {
  return u <= 0.04045 ? u / 12.92 : ((u + 0.055) / 1.055) ** 2.4;
}

/** Solid `#RRGGBB` → linear sRGB components in 0–1. */
function hexToLinearSrgb(hex: string): [number, number, number] | null {
  const m = SOLID_HEX.exec(hex.trim());
  if (!m) return null;
  const n = parseInt(m[0].slice(1), 16);
  const r = srgbChannelToLinear(((n >> 16) & 255) / 255);
  const g = srgbChannelToLinear(((n >> 8) & 255) / 255);
  const b = srgbChannelToLinear((n & 255) / 255);
  return [r, g, b];
}

/**
 * Linear sRGB → OKLab (Björn Ottosson / CSS Color 4).
 * @see https://www.w3.org/TR/css-color-4/#color-conversion-code
 */
function linearSrgbToOklab(
  r: number,
  g: number,
  b: number
): { L: number; a: number; b: number } {
  const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
  const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
  const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;

  const l_ = Math.cbrt(l);
  const m_ = Math.cbrt(m);
  const s_ = Math.cbrt(s);

  return {
    L: 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_,
    a: 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_,
    b: 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_,
  };
}

/** OKLab → OKLCH (`h` in degrees, 0–360). */
function oklabToOklch(lab: { L: number; a: number; b: number }): {
  L: number;
  C: number;
  h: number;
} {
  const C = Math.hypot(lab.a, lab.b);
  let h = (Math.atan2(lab.b, lab.a) * 180) / Math.PI;
  if (h < 0) h += 360;
  return { L: lab.L, C, h };
}

function hexToOklch(hex: string): { L: number; C: number; h: number } | null {
  const rgb = hexToLinearSrgb(hex);
  if (!rgb) return null;
  return oklabToOklch(linearSrgbToOklab(rgb[0], rgb[1], rgb[2]));
}

/**
 * Perceptual distance in OK color space via OKLCH:
 * map L,C,h → OKLab (a,b) = (C cos h, C sin h), then Euclidean ΔE_OK.
 */
function oklchDistance(
  p: { L: number; C: number; h: number },
  q: { L: number; C: number; h: number }
): number {
  const hRadP = (p.h * Math.PI) / 180;
  const hRadQ = (q.h * Math.PI) / 180;
  const ap = p.C * Math.cos(hRadP);
  const bp = p.C * Math.sin(hRadP);
  const aq = q.C * Math.cos(hRadQ);
  const bq = q.C * Math.sin(hRadQ);
  return Math.hypot(p.L - q.L, ap - aq, bp - bq);
}

export function closestThemeColor(
  targetHex: string,
  colors: Record<string, string> = platformResolvedPalette
): { key: string; hex: string; distance: number } {
  const target = hexToOklch(targetHex);
  if (!target) {
    return { key: '', hex: '', distance: Infinity };
  }

  let best = { key: '', hex: '', distance: Infinity };

  for (const [key, value] of Object.entries(colors)) {
    if (isEditorChromeKey(key)) continue;
    if (!SOLID_HEX.test(value)) continue;
    const candidate = hexToOklch(value);
    if (!candidate) continue;
    const d = oklchDistance(target, candidate);
    if (d < best.distance) {
      best = { key, hex: value, distance: d };
    }
  }

  return best;
}
