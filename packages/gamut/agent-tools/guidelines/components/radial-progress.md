# RadialProgress

**Storybook:** [Molecules / RadialProgress](https://gamut.codecademy.com/?path=/docs-molecules-radialprogress--docs)

## Labels as `children` by default

`RadialProgress` renders children in a centered overlay inside the ring. Place the label (e.g. percentage text) as a child, not as a sibling below the component, unless the design explicitly places it outside the ring.

```tsx
<RadialProgress percent={75}>
  <Text>75%</Text>
</RadialProgress>
```
