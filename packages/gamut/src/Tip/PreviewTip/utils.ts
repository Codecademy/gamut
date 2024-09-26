import { PreviewTipProps } from '.';

export const getPreviewDescription = ({
  linkDescription,
  overline,
  username,
}: Pick<PreviewTipProps, 'linkDescription' | 'overline' | 'username'>) => {
  return `Preview: ${overline ? `${overline} ` : ''} ${
    username ? `${username} ` : ''
  }${linkDescription}`;
};
