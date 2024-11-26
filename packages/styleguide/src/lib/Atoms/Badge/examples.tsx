import { Badge, BadgeProps } from '@codecademy/gamut';
import { Background } from '@codecademy/gamut-styles';

export const BadgeTemplate: React.FC<BadgeProps> = (args) => (
  <Badge {...args}>{args.children ? args.children : args.variant}</Badge>
);
export const TertiaryFillExample = () => {
  return (
    <Background bg="background-primary">
      <Badge variant="tertiary">tertiary</Badge>
      <Badge variant="tertiaryFill">tertiaryFill</Badge>
    </Background>
  );
};
