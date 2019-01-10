export const matchHtml = tagName =>
  new RegExp(`<${tagName}\b[^>]*>(.*?)<\/${tagName}>`, 'mig');
