import { Anchor, Box, Text } from '@codecademy/gamut';
import * as React from 'react';

export type ErrorContentsProps = {
  /**
   * Any debug info to display, such as ["User ID", <user-id>].
   */
  supportInformation?: [string, string][];
};

export const ErrorContents: React.FC<ErrorContentsProps> = ({
  supportInformation,
}) => (
  <Box maxWidth="40rem" my={96} mx="auto" as="main">
    <Text as="h1" fontSize={44}>
      Something has gone wrong
    </Text>
    <Text as="p" my={16}>
      We&apos;re sorry, and our best are working to fix this. In the meantime,
      have you tried the following?
    </Text>
    <Box as="ul">
      <li>Refreshing this page.</li>
      <li>Clearing your browser cache.</li>
    </Box>
    <Text as="p">
      If that doesn&apos;t help, please let us know on our{' '}
      <Anchor href="https://help.codecademy.com/hc/en-us">Help Center</Anchor>!
    </Text>

    {supportInformation && (
      <Box as="details" fontSize={16} textColor="gray-900">
        <Box as="summary" mt={48} mb={8}>
          Support information
        </Box>
        {supportInformation.map(([key, value]) => (
          <Text as="code" display="block" fontSize="small" key={key}>
            {key}: {value}
          </Text>
        ))}
      </Box>
    )}
  </Box>
);
