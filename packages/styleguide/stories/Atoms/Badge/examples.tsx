import { Badge } from '@codecademy/gamut';
import { Background } from '@codecademy/gamut-styles';

export const TertiaryFillExample = () => {
  return (
    <Background bg="background-primary">
      <Badge variant="tertiary">tertiary ex</Badge>
      <Badge variant="tertiaryFill">tertiaryFill ex</Badge>
    </Background>
  );
};

/**
 *In the example below that the background is set to `background-primary` (beige).
Notice that `tertiary` has a transparent background while `tertiaryFill` has a regular `background` color.

<Canvas>
  <Story name="tertiaryFillSeparate">{() => <TertiaryFillExample />}</Story>
</Canvas>
 */
