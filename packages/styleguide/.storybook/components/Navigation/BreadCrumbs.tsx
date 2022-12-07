import * as React from 'react';

import { Link } from '../Markdown/Elements';
import { useNavigation } from '.';
import { GridBox, Text } from '@codecademy/gamut/src';

export const BreadCrumbs: React.FC = () => {
  const { breadcrumbs } = useNavigation();

  return (
    <GridBox
      gridAutoFlow="column"
      gridAutoColumns="max-content"
      columnGap={8}
      mb={16}
    >
      {breadcrumbs.map(({ title, id }, i) => {
        const key = `breadcrumb-${title}-${id}`;
        const current = i === breadcrumbs.length - 1;

        if (current) {
          return (
            <Text fontWeight={700} key={key}>
              {title}
            </Text>
          );
        }

        return (
          <React.Fragment key={key}>
            <Link
              fontWeight={700}
              variant="standard"
              disabled={current}
              id={id}
            >
              {title}
            </Link>
            <Text fontWeight={700}>&gt;</Text>
          </React.Fragment>
        );
      })}
    </GridBox>
  );
};
