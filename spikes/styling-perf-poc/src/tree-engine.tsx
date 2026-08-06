import { styled } from '../../panda-styling-poc/src/gamut/engine';
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
  systemProps,
} from './styles';

/* ARM B — the proposed approach: the Emotion-free engine from
 * spikes/panda-styling-poc/src/gamut/engine, consuming the SAME style helpers.
 *
 * Imported across spikes deliberately rather than copied — a duplicate would
 * drift and quietly invalidate the comparison.
 *
 * No `styledOptions` needed: the engine reads `propNames` off the style functions
 * and filters consumed props automatically. */

const Box = styled('div')<BoxStyleProps>(systemProps);
const Card = styled('div')(cardStyles);
const Heading = styled('h2')(headingStyles);
const Body = styled('p')(bodyStyles);
const Row = styled('div')(rowStyles);
const Button = styled('button')<ButtonStyleProps>(
  buttonBase,
  buttonVariants,
  buttonStates
);

export const EnginePage = ({
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
