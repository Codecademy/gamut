import { PreviewTipProps } from '.';

export const getPreviewDescription = ({
  linkDescription,
  overline,
  username,
}: Pick<PreviewTipProps, 'linkDescription' | 'overline' | 'username'>) => {
  return `${overline ? `${overline} ` : ''} ${
    username ? `${username} ` : ''
  }${linkDescription}`;
};

export const getPreviewLabel = ({
  avatar,
  children,
}: Pick<PreviewTipProps, 'avatar' | 'children'>) => {
  const textChildren = typeof children === 'string' ? `${children} ` : '';

  return avatar ? 'Profile Preview:' : `${textChildren}Link Preview:`;
};
