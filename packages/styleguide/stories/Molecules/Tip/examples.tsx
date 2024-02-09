import { List, ListCol, ListRow, Text } from '@codecademy/gamut';
import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

const components = {
  ToolTip: {
    useCase: 'Clarify function of a UI element',
    contents: 'Icon labels, shortcuts, quick tips',
    triggers: 'On hover and focus',
  },
  InfoTip: {
    useCase: 'Provide context and clarify terms',
    contents: 'Additional details, explanations, definitions',
    triggers: 'On click (info button)',
  },
  PreviewTip: {
    useCase: 'Preview linked content without leaving page',
    contents: 'Page snippets, textual insights, summaries, etc.',
    triggers: 'On hover and focus',
  },
};

const colTitles = Object.keys(components);

const BorderRow = styled(ListCol)(
  css({
    borderBottom: 2,
    borderBottomColor: 'navy',
    borderBottomStyle: 'solid',
  })
);

const ComponentRow = ({ array }: { array: string[] }) => (
  <ListRow>
    <ListCol size="sm" />
    {array.map((title) => (
      <BorderRow size="lg">
        <Text variant="title-sm">{title}</Text>
      </BorderRow>
    ))}
  </ListRow>
);

const DetailRow = styled(ListCol)(css({ whiteSpace: 'pre-line' }));

const FeatureRow = ({
  title,
  features,
}: {
  title: string;
  features: string[];
}) => (
  <ListRow>
    <ListCol size="sm">
      <Text fontWeight="bold">{title}</Text>
    </ListCol>
    {features.map((details) => (
      <DetailRow size="lg">
        <Text>{details}</Text>
      </DetailRow>
    ))}
  </ListRow>
);
export const TipTable = () => {
  return (
    <List variant="table" spacing="condensed">
      <ComponentRow array={colTitles} />
      <FeatureRow
        title="Use Case"
        features={Object.values(components).map(
          (component) => component.useCase
        )}
      />
      <FeatureRow
        title="Contents"
        features={Object.values(components).map(
          (component) => component.contents
        )}
      />
      <FeatureRow
        title="Triggers"
        features={Object.values(components).map(
          (component) => component.triggers
        )}
      />
    </List>
  );
};
