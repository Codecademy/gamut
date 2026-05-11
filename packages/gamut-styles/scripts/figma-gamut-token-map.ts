/**
 * Maps Figma variable paths (collection/name or path-like names from Dev Mode)
 * to Gamut theme keys used in code and DESIGN snapshots.
 */

/** Border-radius labels in Figma docs → `borderRadii` keys in gamut-styles */
export const FIGMA_BORDER_RADIUS_TO_GAMUT: Record<string, string> = {
  none: 'none',
  small: 'sm',
  medium: 'md',
  large: 'lg',
  'x-large': 'xl',
  full: 'full',
};

/** Resolved semantic paths (lowercase, slash-separated) → flattened light semantic keys */
export const FIGMA_SEMANTIC_PATH_TO_GAMUT: Record<string, string> = {
  'text/primary': 'text',
  'text/accent': 'text-accent',
  'text/secondary': 'text-secondary',
  'text/disabled': 'text-disabled',
  'background/default': 'background',
  'background/primary': 'background-primary',
  'background/contrast': 'background-contrast',
  'background/selected': 'background-selected',
  'background/disabled': 'background-disabled',
  'background/hover': 'background-hover',
  'background/success': 'background-success',
  'background/warning': 'background-warning',
  'background/error': 'background-error',
  'primary/default': 'primary',
  'primary/hover': 'primary-hover',
  'primary/inverse': 'primary-inverse',
  'secondary/default': 'secondary',
  'secondary/hover': 'secondary-hover',
  'danger/default': 'danger',
  'danger/hover': 'danger-hover',
  'interface/default': 'interface',
  'interface/hover': 'interface-hover',
  'feedback/error': 'feedback-error',
  'feedback/success': 'feedback-success',
  'feedback/warning': 'feedback-warning',
  'border/primary': 'border-primary',
  'border/secondary': 'border-secondary',
  'border/tertiary': 'border-tertiary',
  'border/disabled': 'border-disabled',
  'shadow/primary': 'shadow-primary',
  'shadow/secondary': 'shadow-secondary',
};

const COLLECTION_PREFIXES_TO_STRIP = [
  /^primitive\s*colors\//i,
  /^semantic\s*colors\//i,
  /^semantic\s*color\s*tokens\//i,
  /^colors\//i,
];

/**
 * Build lookup keys for a variable. Figma may store either `Collection/var` or path-like `a/b/c` names.
 */
export function figmaVariableLookupKeys(
  collectionName: string,
  variableName: string
): string[] {
  const trimmedVar = variableName.trim();
  const trimmedCol = collectionName.trim();
  const keys = new Set<string>();

  const push = (s: string) => {
    const k = s
      .replace(/\s*\/\s*/g, '/')
      .replace(/\/+/g, '/')
      .toLowerCase();
    if (k) keys.add(k);
  };

  if (trimmedVar.includes('/')) {
    push(trimmedVar);
    for (const re of COLLECTION_PREFIXES_TO_STRIP) {
      const stripped = trimmedVar.replace(re, '');
      if (stripped !== trimmedVar) push(stripped);
    }
    const seg = trimmedVar.split('/');
    if (seg.length >= 2) {
      push(seg.slice(-2).join('/'));
      if (seg.length >= 3) push(seg.slice(-3).join('/'));
    }
  } else {
    push(`${trimmedCol}/${trimmedVar}`);
    const colSlug = trimmedCol.toLowerCase().replace(/\s+/g, '-');
    push(`${colSlug}/${trimmedVar.toLowerCase()}`);
  }

  return [...keys];
}

export function gamutSemanticForFigmaPath(pathKey: string): string | undefined {
  const normalized = pathKey
    .replace(/\s*\/\s*/g, '/')
    .replace(/\/+/g, '/')
    .toLowerCase();
  if (FIGMA_SEMANTIC_PATH_TO_GAMUT[normalized]) {
    return FIGMA_SEMANTIC_PATH_TO_GAMUT[normalized];
  }
  for (const re of COLLECTION_PREFIXES_TO_STRIP) {
    const stripped = normalized.replace(re, '');
    if (FIGMA_SEMANTIC_PATH_TO_GAMUT[stripped]) {
      return FIGMA_SEMANTIC_PATH_TO_GAMUT[stripped];
    }
  }
  const seg = normalized.split('/');
  if (seg.length >= 2) {
    const tail2 = seg.slice(-2).join('/');
    if (FIGMA_SEMANTIC_PATH_TO_GAMUT[tail2]) {
      return FIGMA_SEMANTIC_PATH_TO_GAMUT[tail2];
    }
  }
  return undefined;
}
