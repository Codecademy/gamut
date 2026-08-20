<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';

import {
  buttonVariantNames,
  type ButtonComponentName,
  type ButtonVariantName,
} from './examples/button-meta';

const props = withDefaults(defineProps<{ component: ButtonComponentName }>(), {
  component: 'FillButton',
});

const mountEl = ref<HTMLDivElement | null>(null);
const variant = ref<ButtonVariantName>('primary');
const size = ref<'small' | 'normal' | 'large'>('normal');
const disabled = ref(false);
const label = ref('Button label');

let render: () => void = () => {};
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

  render = () => {
    const Button = buttonComponents[props.component];
    if (!mountEl.value) return;
    renderReact(
      mountEl.value,
      h(
        Button,
        { variant: variant.value, size: size.value, disabled: disabled.value },
        label.value
      )
    );
  };
  cleanup = () => mountEl.value && unmountReact(mountEl.value);

  render();
  watch([variant, size, disabled, label], render);
});

onBeforeUnmount(() => cleanup?.());
</script>

<template>
  <div class="playground">
    <div class="playground-controls">
      <label>
        Variant
        <select v-model="variant">
          <option v-for="name in buttonVariantNames" :key="name" :value="name">
            {{ name }}
          </option>
        </select>
      </label>
      <label>
        Size
        <select v-model="size">
          <option value="small">small</option>
          <option value="normal">normal</option>
          <option value="large">large</option>
        </select>
      </label>
      <label>
        Label
        <input v-model="label" type="text" />
      </label>
      <label class="playground-checkbox">
        <input v-model="disabled" type="checkbox" />
        Disabled
      </label>
    </div>
    <div ref="mountEl" class="playground-stage" />
  </div>
</template>

<style scoped>
.playground {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  margin: 16px 0;
  overflow: hidden;
}

.playground-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  padding: 12px 16px;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 13px;
}

.playground-controls label {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.playground-checkbox {
  flex-direction: row !important;
  align-items: center;
  gap: 6px !important;
}

.playground-stage {
  padding: 24px;
}
</style>
