import {
  Alert,
  Badge,
  FlexBox,
  IconButton,
  InfoTip,
  List,
  ListCol,
  ListRow,
  PreviewTip,
  Text,
} from '@codecademy/gamut';
import { MiniStarIcon } from '@codecademy/gamut-icons';
import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

const components = {
  ToolTip: {
    component: (
      <IconButton
        size="small"
        icon={MiniStarIcon}
        tip="ToolTip"
        tipProps={{
          placement: 'floating',
        }}
      />
    ),
    status: 'None',
    useCase: 'Clarify function of a UI element',
    contents: 'Icon labels, shortcuts, quick tips',
    triggers: 'On hover and focus',
    skipTitle: false,
  },
  InfoTip: {
    component: <InfoTip placement="floating" info="I am an infotip." />,
    status: 'None',
    useCase: 'Provide context and clarify terms',
    contents: 'Additional details, explanations, definitions',
    triggers: 'On click (info button)',
    skipTitle: false,
  },
  PreviewTip: {
    component: (
      <PreviewTip
        alignment="top-left"
        linkDescription="I am a bite-sized summary of the linked content, isn't that neat?  "
        href="https://giphy.com/gifs/yugioh-konami-yugi-4WDKiUenkve2ZvLoTp"
        placement="floating"
      >
        PreviewTip
      </PreviewTip>
    ),
    status: 'New',
    useCase: 'Preview linked content without leaving page',
    contents: 'Page snippets, textual insights, summaries, etc.',
    triggers: 'On hover and focus',
    skipTitle: true,
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
        const { component, status, skipTitle } = components[title];
        const badgeVariant = status === 'New' ? 'accent' : 'tertiary';

        return (
          <BorderRow size="xl">
            <FlexBox alignItems="center" flexWrap="wrap" pl={8}>
              <Text variant="title-sm" mr={8}>
                {!skipTitle && title} {component}
              </Text>
              {status !== 'None' && (
                <Badge variant={badgeVariant} size="sm">
                  {status}
                </Badge>
              )}
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
