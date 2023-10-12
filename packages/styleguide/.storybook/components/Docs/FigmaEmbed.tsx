import { GridBox } from '@codecademy/gamut/src';
import { Figma } from 'storybook-addon-designs/blocks';
import { useCollapseFigmaEmbed } from './useCollapseFigmaEmbed';

export interface FigmaEmbedProps {
  url: string;
}

export const FigmaEmbed: React.FC<FigmaEmbedProps> = ({ url }) => {
  const { defaultCollapsed /* , savePreference */ } = useCollapseFigmaEmbed();

  return (
    <GridBox
      onClick={(event) => {
        console.log("Without an onClick, is this where we'd save preference?");
        console.log('DOM event:', event);
      }}
      mb={32}
    >
      <Figma
        collapsable
        defaultCollapsed={defaultCollapsed}
        key={defaultCollapsed}
        height="56.25%"
        url={url}
      />
    </GridBox>
  );
};
