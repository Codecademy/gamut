import DefaultTheme from 'vitepress/theme';
import type { Theme } from 'vitepress';

import ButtonPlayground from './ButtonPlayground.vue';
import ButtonVariantGrid from './ButtonVariantGrid.vue';
import ReactDemo from './ReactDemo.vue';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ButtonPlayground', ButtonPlayground);
    app.component('ButtonVariantGrid', ButtonVariantGrid);
    app.component('ReactDemo', ReactDemo);
  },
} satisfies Theme;
