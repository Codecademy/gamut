/* The lookup layer Gamut's `Box` would ship in place of a runtime style pass.
 *
 * Props in, class names out — plus whatever it could NOT resolve, which is what
 * gets handed to the runtime injector. This is the whole mechanism: for the closed
 * set it is an object lookup, for the open set it delegates.
 *
 * Note what is NOT here: any Panda runtime. Panda's own `css()` derives class
 * names by string-concatenating prop and value, which silently produces classes
 * with no matching rule for values its extractor never saw
 * (see panda-via-gamut-option-b.md). This resolver only ever returns a class it
 * has confirmed exists in the manifest, and routes everything else to the
 * injector — so an unknown value degrades to "styled at runtime", never to
 * "silently unstyled".
 */

/** Gamut's responsive shape is `{ _: 8, md: 16 }` — `_` is the base key, and
 *  Panda's `base` never surfaces because the manifest is keyed on Gamut's. */
const isResponsive = (value) =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

/* ── The zero-byte variant ───────────────────────────────────────────────────
 * The manifest above is 244kB raw / 26kB gzip — which would MORE than double the
 * cost of the base atomics it exists to serve (11.6kB gzip). It doesn't need to
 * ship at all.
 *
 * A class name is just `${prop}_${value}` (and `${breakpoint}:${prop}_${value}`),
 * so the only thing the resolver actually needs is *whether that pair is valid* —
 * and that is `value in theme[scaleOf(prop)]`. Gamut already ships both the prop
 * config and the theme to the client. So the lookup table is derivable, and the
 * runtime cost of the atomics layer is the CSS plus roughly nothing.
 *
 * Guarded by the same all-or-nothing rule as above. `verify.mjs` asserts this
 * resolver agrees with the manifest one on every case. */
export const createThemeResolver = ({ baseKey, theme, props, breakpointKeys }) => {
  const scaleOf = new Map(
    Object.entries(props)
      .filter(([, config]) => config && config.scale)
      .map(([prop, config]) => [prop, config.scale])
  );
  const validBreakpoint = new Set([baseKey, ...breakpointKeys]);

  const classFor = (prop, value, breakpoint) => {
    const scale = scaleOf.get(prop);
    if (!scale) return undefined;
    const scaleValues = theme[scale];
    if (!scaleValues || !(String(value) in scaleValues)) return undefined;
    if (!validBreakpoint.has(breakpoint)) return undefined;
    const base = `${prop}_${value}`;
    return breakpoint === baseKey ? base : `${breakpoint}:${base}`;
  };

  return (props_) => {
    const classNames = [];
    const runtime = {};

    for (const [prop, value] of Object.entries(props_)) {
      if (value === undefined || value === null) continue;

      if (!scaleOf.has(prop)) {
        runtime[prop] = value;
        continue;
      }

      if (isResponsive(value)) {
        const resolved = [];
        let complete = true;
        for (const [breakpoint, breakpointValue] of Object.entries(value)) {
          const className = classFor(prop, breakpointValue, breakpoint);
          if (!className) {
            complete = false;
            break;
          }
          resolved.push(className);
        }
        if (complete) classNames.push(...resolved);
        else runtime[prop] = value;
        continue;
      }

      const className = classFor(prop, value, baseKey);
      if (className) classNames.push(className);
      else runtime[prop] = value;
    }

    return { classNames, runtime };
  };
};

export const createResolver = ({ baseKey, manifest }) => {
  const resolve = (props) => {
    const classNames = [];
    /** props the injector must handle: open props, or open values on closed props */
    const runtime = {};

    for (const [prop, value] of Object.entries(props)) {
      if (value === undefined || value === null) continue;

      const byValue = manifest[prop];
      // open-space prop (width, gridTemplateColumns, …) — never prebuilt
      if (!byValue) {
        runtime[prop] = value;
        continue;
      }

      if (isResponsive(value)) {
        /* All-or-nothing per prop. If even one breakpoint's value is open, the
         * whole prop goes to the injector rather than mixing an atomic class with
         * an injected rule — mixing would make the winner depend on stylesheet
         * order rather than on the breakpoint, which is a specificity bug waiting
         * to happen. */
        const resolved = [];
        let complete = true;

        for (const [breakpoint, breakpointValue] of Object.entries(value)) {
          const className = byValue[String(breakpointValue)]?.[breakpoint];
          if (!className) {
            complete = false;
            break;
          }
          resolved.push(className);
        }

        if (complete) classNames.push(...resolved);
        else runtime[prop] = value;
        continue;
      }

      const className = byValue[String(value)]?.[baseKey];
      if (className) classNames.push(className);
      else runtime[prop] = value;
    }

    return { classNames, runtime };
  };

  return resolve;
};
