<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

// Dynamic imports so React/Gamut (and their CJS deps, e.g. react-use) are
// never evaluated during VitePress's Node-based SSR prerender — only once
// this component actually mounts in the browser.
const props = defineProps<{ name: string }>();
const mountEl = ref<HTMLDivElement | null>(null);
let cleanup: (() => void) | undefined;

onMounted(async () => {
  const [
    { createElement: h },
    { buttonPatternDemos },
    { renderReact, unmountReact },
  ] = await Promise.all([
    import('react'),
    import('./examples/buttons'),
    import('./react-root'),
  ]);

  const Demo = buttonPatternDemos[props.name];
  if (mountEl.value && Demo) {
    renderReact(mountEl.value, h(Demo));
    cleanup = () => mountEl.value && unmountReact(mountEl.value);
  }
});

onBeforeUnmount(() => cleanup?.());
</script>

<template>
  <div ref="mountEl" class="live-example" />
</template>

<style scoped>
.live-example {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  margin: 16px 0;
  overflow: hidden;
}
</style>
