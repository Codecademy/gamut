import React from 'react';

import { Link } from '../Markdown/Elements';
import { useNavigation } from '.';
import { Box, Text } from '@codecademy/gamut/src';

export const BreadCrumbs: React.FC = () => {
  const { breadcrumbs } = useNavigation();

  return (
    <Box
      display="flex"
      columnGap={8}
      marginBottom={8}
      fontWeight="title"
      fontSize={16}
    >
      {breadcrumbs.map(({ title, id }, i) => {
        const key = `breadcrumb-${title}-${id}`;
        const current = i === breadcrumbs.length - 1;

        if (current) {
          return (
            <Text as="strong" key={key}>
              {title}
            </Text>
          );
        }

        return (
          <React.Fragment key={key}>
            <Link
              fontWeight="title"
              variant="standard"
              disabled={current}
              id={id}
            >
              {title}
            </Link>
            <Text as="strong">&gt;</Text>
          </React.Fragment>
        );
      })}
    </Box>
  );
};
