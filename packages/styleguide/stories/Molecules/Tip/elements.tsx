import {
  Alert,
  Badge,
  FlexBox,
  IconButton,
  InfoTip,
  List,
  ListCol,
  ListRow,
  Text,
} from '@codecademy/gamut';
import { MiniStarIcon } from '@codecademy/gamut-icons';
import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

const components = {
  ToolTip: {
    component: (
      <IconButton
        placement="floating"
        size="small"
        icon={MiniStarIcon}
        tip="ToolTip"
        tipProps={{
          placement: 'floating',
        }}
      />
    ),
    status: 'New',
    useCase: 'Clarify function of a UI element',
    contents: 'Icon labels, shortcuts, quick tips',
    triggers: 'On hover and focus',
  },
  InfoTip: {
    component: <InfoTip placement="floating" info="I am an infotip." />,
    status: 'New',
    useCase: 'Provide context and clarify terms',
    contents: 'Additional details, explanations, definitions',
    triggers: 'On click (info button)',
  },
  PreviewTip: {
    component: <></>,
    status: 'Coming soon',
    useCase: 'Preview linked content without leaving page',
    contents: 'Page snippets, textual insights, summaries, etc.',
    triggers: 'On hover and focus',
  },
};

const colTitles = Object.keys(components) as (keyof typeof components)[];

const BorderRow = styled(ListCol)(
  css({
    borderBottom: 2,
    borderBottomColor: 'navy',
    borderBottomStyle: 'solid',
  })
);

const ComponentRow = ({ array }: { array: typeof colTitles }) => {
  return (
    <ListRow>
      <ListCol size="sm" />
      {array.map((title) => {
        const { component, status } = components[title];
        const badgeVariant = status === 'New' ? 'accent' : 'tertiary';

        return (
          <BorderRow size="xl">
            <FlexBox alignItems="center" flexWrap="wrap">
              <Text variant="title-sm" mr={8}>
                {title} {component}
              </Text>
              <Badge variant={badgeVariant} size="sm">
                {status}
              </Badge>
            </FlexBox>
          </BorderRow>
        );
      })}
    </ListRow>
  );
};

const DetailRow = styled(ListCol)(css({ whiteSpace: 'pre-line' }));

const FeatureRow = ({
  title,
  features,
}: {
  title: string;
  features: string[];
}) => {
  return (
    <ListRow>
      <ListCol size="sm">
        <Text fontWeight="bold">{title}</Text>
      </ListCol>
      {features.map((details) => (
        <DetailRow size="xl">
          <Text>{details}</Text>
        </DetailRow>
      ))}
    </ListRow>
  );
};

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

export const DeprecatedWarning = () => (
  <Alert type="error">
    This component is deprecated and should not be used in new designs.
  </Alert>
);
