import { Button } from '../ui/gamut';

/* Exposed via Module Federation. Uses variant="danger" — a variant the HOST
 * never renders itself. It stays styled because the host imports Gamut's
 * COMPLETE static stylesheet (staticCss emits every variant). */
export default function Widget() {
  return (
    <Button variant="danger">Remote widget — variant=&quot;danger&quot;</Button>
  );
}
