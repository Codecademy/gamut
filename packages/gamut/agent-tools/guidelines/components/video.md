# Video

Never build custom media players. Gamut exports `Video` (built on `@vidstack/react`) with controls, poster support, text tracks, and accessibility.

Storybook: [Molecules / Video](https://gamut.codecademy.com/?path=/docs-molecules-video--docs)

## Rule

Before constructing `<video>`, image + play-button overlays, or third-party embed wrappers, use `Video`.

## Common props

| Prop               | Purpose             |
| ------------------ | ------------------- |
| `videoUrl`         | Video source        |
| `placeholderImage` | Poster thumbnail    |
| `videoTitle`       | Accessibility title |
| `controls`         | Standard player UI  |

```tsx
import { Video } from '@codecademy/gamut';

<Video
  videoUrl="https://example.com/video.mp4"
  placeholderImage="https://example.com/poster.jpg"
  videoTitle="Course introduction"
  controls
/>;
```
