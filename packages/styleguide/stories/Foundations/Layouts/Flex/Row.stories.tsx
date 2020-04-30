import React from 'react';
import { select, boolean } from '@storybook/addon-knobs';
import { FlexGrid, Row, Col, modificators } from '@codecademy/gamut/src';

import {
  decoratedStories,
  decoratedStory,
  StoryTemplate,
  StoryStatus,
  StoryDescription,
} from '../../../Templating';
import { Box, Container } from '../Elements';

export default decoratedStories('Foundations', 'Layouts', 'Flex', Row);

export const rowDefault = decoratedStory(() => (
  <StoryTemplate status={StoryStatus.InProgress}>
    <StoryDescription>
      Row is a flex row to contain and manage the flow of columns
    </StoryDescription>
    <Container>
      <FlexGrid>
        <Row>
          <Col xs={12} sm={3} md={2} lg={1}>
            <Box />
          </Col>
          <Col xs={6} sm={6} md={8} lg={10}>
            <Box />
          </Col>
          <Col xs={6} sm={3} md={2} lg={1}>
            <Box />
          </Col>
        </Row>
      </FlexGrid>
    </Container>
  </StoryTemplate>
));

export const editable = decoratedStory(() => {
  const around = select('around', modificators, undefined);
  const between = select('between', modificators, undefined);
  const bottom = select('bottom', modificators, undefined);
  const center = select('center', modificators, undefined);
  const end = select('end', modificators, undefined);
  const first = select('first', modificators, undefined);
  const last = select('last', modificators, undefined);
  const reverse = boolean('reverse', undefined);
  const start = select('start', modificators, undefined);
  const top = select('top', modificators, undefined);

  return (
    <StoryTemplate status={StoryStatus.InProgress}>
      <StoryDescription>
        You can center the content of a row by passing it <code>center</code>.
      </StoryDescription>
      <FlexGrid fluid>
        <Row
          around={around}
          between={between}
          bottom={bottom}
          center={center}
          end={end}
          first={first}
          last={last}
          reverse={reverse}
          top={top}
          start={start}
        >
          <Col xs={12}>
            <Box>Edited</Box>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Box>Unedited</Box>
          </Col>
        </Row>
      </FlexGrid>
    </StoryTemplate>
  );
});
