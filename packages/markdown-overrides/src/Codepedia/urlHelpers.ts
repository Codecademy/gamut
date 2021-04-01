export const VIEW_ROOT = 'https://codecademy.github.io/codepedia/entries';
export const RAW_ROOT =
  'https://raw.githubusercontent.com/codecademy/codepedia/main/codepedia/entries';

export const getLoadUrl = (concept: string, language?: string) => {
  return `${RAW_ROOT}/${language || 'concept'}/${concept}.md`;
};

export const getViewUrl = (concept: string, language?: string) => {
  return `${VIEW_ROOT}/${concept}/${language ? language : ''}`;
};
