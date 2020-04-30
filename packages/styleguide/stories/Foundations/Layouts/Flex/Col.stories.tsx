import React from 'react';
import { select, boolean } from '@storybook/addon-knobs';
import { FlexGrid, Row, Col } from '@codecademy/gamut/src';

import {
  decoratedStories,
  decoratedStory,
  StoryTemplate,
  StoryStatus,
  StoryDescription,
} from '../../../Templating';
import { Box, Container } from '../Elements';

export default decoratedStories('Foundations', 'Layouts', 'Flex', Col);

export const Column = decoratedStory('Fixed Grid (Default)', () => (
  <StoryTemplate status={StoryStatus.InProgress} wide>
    <StoryDescription>
      Column is a flex column that can be responsively configured.
    </StoryDescription>
    <Container>
      <FlexGrid fluid>
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
  const sizes = new Array(12).fill('').map((x, i) => i + 1);

  const xs = select('xs', sizes, 12);
  const xsOffset = select('xsOffset', sizes, undefined);
  const reverse = boolean('reverse', undefined);

  return (
    <StoryTemplate status={StoryStatus.InProgress}>
      <StoryDescription>
        A column can be offset with the <code>xs</code> property.
      </StoryDescription>
      <FlexGrid fluid>
        <Row>
          <Col xs={xs} xsOffset={xsOffset} reverse={reverse}>
            <Box>Edited</Box>
          </Col>
        </Row>
      </FlexGrid>
    </StoryTemplate>
  );
});

export const combiningOffsets = decoratedStory(() => (
  <StoryTemplate status={StoryStatus.InProgress}>
    <StoryDescription>Combining offsets</StoryDescription>
    <FlexGrid fluid>
      <Row>
        <Col xsOffset={11} xs={1}>
          <Box />
        </Col>
        <Col xsOffset={10} xs={2}>
          <Box />
        </Col>
        <Col xsOffset={9} xs={3}>
          <Box />
        </Col>
        <Col xsOffset={8} xs={4}>
          <Box />
        </Col>
        <Col xsOffset={7} xs={5}>
          <Box />
        </Col>
        <Col xsOffset={6} xs={6}>
          <Box />
        </Col>
        <Col xsOffset={5} xs={7}>
          <Box />
        </Col>
        <Col xsOffset={4} xs={8}>
          <Box />
        </Col>
        <Col xsOffset={3} xs={9}>
          <Box />
        </Col>
        <Col xsOffset={2} xs={10}>
          <Box />
        </Col>
        <Col xsOffset={1} xs={11}>
          <Box />
        </Col>
      </Row>
    </FlexGrid>
  </StoryTemplate>
));
