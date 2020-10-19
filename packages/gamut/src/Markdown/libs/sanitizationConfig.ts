import insane from 'insane';

export const defaultSanitizationConfig = {
  allowedAttributes: {
    ...insane.defaults.allowedAttributes,
    span: ['class'],
    code: ['class'],
    pre: ['class'],
    source: ['src', 'type'],
    img: ['src', 'alt', 'height', 'width', 'title', 'aria-label', 'style'],
    video: ['width', 'height', 'align', 'style', 'controls'],
    iframe: [
      'src',
      'width',
      'height',
      'frameborder',
      'gesture',
      'allow',
      'allowfullscreen',
    ],
  },
  allowedClasses: {
    div: 'narrative-table-container',
  },
  allowedTags: [
    ...insane.defaults.allowedTags,
    'video',
    'source',
    'font',
    'pre',
    'code',
    'kbd',
    'br',
    'iframe',
    'codeblock',
  ],
};
