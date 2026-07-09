# Video

**Never build custom media players.** Gamut exports a `Video` component (built on `@vidstack/react`) with built-in controls, poster/placeholder support, text tracks, and accessibility.

## Rule

Before constructing any custom `<video>`, `<img>` + play-button overlay, or third-party embed wrapper, check for the `Video` component and use it.

## Common props

- `videoUrl` — the video source
- `placeholderImage` — a poster thumbnail
- `videoTitle` — for accessibility
- `controls` — show the standard player UI

```tsx
import { Video } from '@codecademy/gamut';

<Video
  videoUrl="https://example.com/video.mp4"
  placeholderImage="https://example.com/poster.jpg"
  videoTitle="Course introduction"
  controls
/>;
```
