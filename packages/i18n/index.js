import I18n from 'i18n-js';

// Simple alteration to the base I18n-js to allow for importing the `t` function
// import { t } from 'I18n-js'
I18n.translations = {};
I18n.t = I18n.translate = I18n.translate.bind(I18n);
I18n.localize = I18n.localize.bind(I18n);
I18n.pluralize = I18n.pluralize.bind(I18n);

export default I18n;
