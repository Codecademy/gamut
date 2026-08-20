<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

import {
  buttonVariantNames,
  type ButtonComponentName,
} from './examples/button-meta';

const props = withDefaults(
  defineProps<{
    component: ButtonComponentName;
    size?: 'small' | 'normal' | 'large';
  }>(),
  { component: 'FillButton', size: 'normal' }
);

const mountEl = ref<HTMLDivElement | null>(null);
let cleanup: (() => void) | undefined;

onMounted(async () => {
  const [
    { createElement: h },
    { buttonComponents },
    { renderReact, unmountReact },
  ] = await Promise.all([
    import('react'),
    import('./examples/buttons'),
    import('./react-root'),
  ]);

  const Button = buttonComponents[props.component];
  if (!mountEl.value) return;

  renderReact(
    mountEl.value,
    h(
      'div',
      { style: { display: 'flex', flexWrap: 'wrap', gap: 24 } },
      ...buttonVariantNames.map((name) =>
        h(
          'div',
          {
            key: name,
            style: {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: 8,
            },
          },
          h(Button, { variant: name, size: props.size }, name),
          h(
            'code',
            { style: { fontSize: 12, opacity: 0.7 } },
            `variant="${name}"`
          )
        )
      )
    )
  );

  cleanup = () => mountEl.value && unmountReact(mountEl.value);
});

onBeforeUnmount(() => cleanup?.());
</script>

<template>
  <div ref="mountEl" class="variant-grid" />
</template>

<style scoped>
.variant-grid {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  margin: 16px 0;
  padding: 24px;
}
</style>
