import { styledOptions, system } from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';
import styled from '@emotion/styled';
import { ComponentProps, HTMLProps } from 'react';

import { ButtonBase } from '../ButtonBase';
import { AppendedIconProps } from '../helpers';
import { anchorVariants } from './styles';

export interface AnchorProps
  extends StyleProps<typeof anchorProps>,
    StyleProps<typeof anchorVariants> {
  onClick?: HTMLProps<HTMLAnchorElement>['onClick'];
}

const anchorProps = variance.compose(
  system.layout,
  system.space,
  system.typography
);

export const AnchorBase = styled('a', styledOptions<'a'>())<AnchorProps>(
  anchorVariants,
  anchorProps
);

type AnchorAsAnchor = ComponentProps<typeof AnchorBase> & {
  disabled?: never;
};

type AnchorAsButton = Exclude<ComponentProps<typeof AnchorBase>, 'ref'> &
  ComponentProps<typeof ButtonBase>

type AnchorBaseProps = AnchorAsAnchor | AnchorAsButton;

export type AnchorExtProps = Partial<AppendedIconProps> & AnchorBaseProps;
