import styled from '@emotion/styled';

import {
  type BoxStyleProps,
  type ButtonStyleProps,
  bodyStyles,
  buttonBase,
  buttonStates,
  buttonVariants,
  cardStyles,
  headingStyles,
  rowStyles,
  spacingDigit,
  styledOptions,
  systemProps,
} from './styles';

/* ARM A — today's approach: real `@emotion/styled` consuming the real Gamut
 * style helpers, with `styledOptions` filtering system props off the DOM exactly
 * as production does. */

const Box = styled('div', styledOptions)<BoxStyleProps>(systemProps);
const Card = styled('div', styledOptions)(cardStyles);
const Heading = styled('h2', styledOptions)(headingStyles);
const Body = styled('p', styledOptions)(bodyStyles);
const Row = styled('div', styledOptions)(rowStyles);
const Button = styled(
  'button',
  styledOptions<'button', 'variant' | 'fullWidth' | 'compact'>([
    'variant',
    'fullWidth',
    'compact',
  ])
)<ButtonStyleProps>(buttonBase, buttonVariants, buttonStates);

export const EmotionPage = ({
  count,
  unique = false,
}: {
  count: number;
  unique?: boolean;
}) => (
  <Box p={24} bg="background">
    {Array.from({ length: count }, (_, index) => (
      <Card key={index}>
        <Heading>Card {index}</Heading>
        <Body>
          Body copy for card {index}, long enough to be representative of real
          content rather than a single word.
        </Body>
        <Row>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary" compact>
            Secondary
          </Button>
          <Button variant="danger" fullWidth={index % 3 === 0}>
            Danger
          </Button>
        </Row>
        {unique ? (
          // distinct style object per node — worst case for a hashing injector
          <Box
            p={spacingDigit(index, 0)}
            mt={spacingDigit(index, 1)}
            px={spacingDigit(index, 2)}
            width="100%"
          />
        ) : (
          <Box mt={16} px={index % 2 ? 16 : 8} width="100%" />
        )}
      </Card>
    ))}
  </Box>
);
