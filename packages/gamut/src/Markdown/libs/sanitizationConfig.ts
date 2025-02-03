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
    track: ['src', 'label', 'kind', 'srclang', 'default', 'type'],
    img: ['src', 'alt', 'height', 'width', 'title', 'aria-label', 'style'],
    input: ['checked', 'type'],
    video: [
      'align',
      'autoPlay',
      'controls',
      'height',
      'loop',
      'muted',
      'src',
      'width',
      'showplayerembed'
    ],
    iframe: [
      'src',
      'width',
      'height',
      'frameborder',
      'gesture',
      'allow',
      'allowfullscreen',
      'showplayerembed'
    ],
  },
  allowedClasses: {
    div: 'narrative-table-container',
  },
  allowedTags: [
    ...sanitizeMarkdown.defaults.allowedTags,
    'video',
    'track',
    'source',
    'font',
    'pre',
    'code',
    'kbd',
    'br',
    'iframe',
    'codeblock',
    'input',
  ],
};
