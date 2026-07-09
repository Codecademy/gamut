# RadialProgress

## Labels must be passed as `children` by default

Gamut's `RadialProgress` renders children in a centered overlay inside the ring. Always place the label (e.g., percentage text) as a child element rather than as a separate sibling below the component.

Only place the label outside the ring if explicitly specified.
