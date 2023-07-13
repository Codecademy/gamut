import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import * as React from 'react';

import { Anchor } from '../Anchor';
import { Box, FlexBox } from '../Box';
import { Text } from '../Typography';

const BreadcrumbAnchor = styled(Anchor)(
  css({
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: '100%',
    display: 'inline',
  })
);

const BreadcrumbPart = styled(Box)(
  css({
    listStyleType: 'none',
    whiteSpace: 'nowrap',

    // skip overflow and ellipsis on first element so doesnt start truncating at same time as the others
    '&:not(*:first-of-type)': {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    '&:first-of-type a': {
      m: 0,
    },
    '&:last-child': {
      flex: 1,
    },
  })
);

export type Crumb = { title: string };

export type ClickableCrumb<T extends string | Object> = Crumb & {
  href: string;
  payload: T;
};

export type Breadcrumb<T> = Crumb | ClickableCrumb<T>;

export const isClickableCrumb = <T,>(
  crumb: Breadcrumb<T>
): crumb is ClickableCrumb<T> => !!(crumb as ClickableCrumb<T>).href;

export type BreadcrumbsProps<T> = {
  crumbs: Breadcrumb<T>[];
  onClick?: (event: React.MouseEvent, crumb: ClickableCrumb<T>) => void;
  className?: string;
};

export const Breadcrumbs = <T,>({
  crumbs,
  onClick,
  className,
}: BreadcrumbsProps<T>) => (
  <nav aria-label="breadcrumbs" className={className}>
    <FlexBox as="ol" m={0} p={0}>
      {crumbs.map((crumb, index) => (
        <BreadcrumbPart key={crumb.title} as="li">
          {isClickableCrumb(crumb) ? (
            <BreadcrumbAnchor
              data-testid={`breadcrumb-${crumb.title}`}
              href={crumb.href}
              variant="interface"
              onClick={(e) => onClick?.(e, crumb)}
            >
              {crumb.title}
            </BreadcrumbAnchor>
          ) : (
            <Text
              as="div"
              display="block"
              fontWeight="bold"
              truncate="ellipsis"
              truncateLines={1}
              aria-current="location"
            >
              {crumb.title}
            </Text>
          )}
          {index !== crumbs.length - 1 && (
            <Text aria-hidden mx={4}>
              /
            </Text>
          )}
        </BreadcrumbPart>
      ))}
    </FlexBox>
  </nav>
);
