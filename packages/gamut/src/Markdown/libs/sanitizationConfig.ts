import sanitizeMarkdown from 'sanitize-markdown';

export const defaultSanitizationConfig = {
  allowedAttributes: {
    ...sanitizeMarkdown.defaults.allowedAttributes,
    h1: ['class', 'id'],
    h2: ['class', 'id'],
    h3: ['class', 'id'],
    h4: ['class', 'id'],
    h5: ['class', 'id'],
    h6: ['class', 'id'],
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
    ...sanitizeMarkdown.defaults.allowedTags,
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
