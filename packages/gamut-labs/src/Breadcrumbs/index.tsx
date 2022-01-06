import { Anchor, Box, FlexBox, Text } from '@codecademy/gamut';
import styled from '@emotion/styled';
import React from 'react';

const BreadcrumbAnchor = styled(Anchor)`
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
  display: inline;
  margin: 0 4px;
`;

const BreadcrumbPart = styled(Box)`
  list-style-type: none;
  white-space: nowrap;
  // skip overflow and ellipsis on first element so doesnt start truncating at same time as the others
  &:not(*:first-of-type) {
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &:first-of-type ${BreadcrumbAnchor} {
    margin: 0;
  }
  // need to append this '/' inside the child element of the breadcrumb (which contains the text) rather than breadcrumb itself
  // otherwise, slash appears below and text above
  &:not(:last-child) > :last-child::after {
    content: '/';
    margin: 0 4px;
  }
  &:last-child {
    flex: 1;
  }
`;

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
};

export const Breadcrumbs = <T,>({ crumbs, onClick }: BreadcrumbsProps<T>) => (
  <nav aria-label="breadcrumbs">
    <FlexBox as="ol" m={0} p={0}>
      {crumbs.map((crumb) => (
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
              aria-current="location"
            >
              {crumb.title}
            </Text>
          )}
        </BreadcrumbPart>
      ))}
    </FlexBox>
  </nav>
);
