import React from 'react';
import { FlexGrid, Row, Col } from '@codecademy/gamut/src';

import {
  decoratedStories,
  decoratedStory,
  StoryTemplate,
  StoryStatus,
  StoryDescription,
} from '../../../Templating';
import { Box, Container } from '../Elements';

export default decoratedStories('Foundations', 'Layouts', 'Flex', FlexGrid);

export const fixedGridDefault = decoratedStory('Fixed Grid (Default)', () => (
  <StoryTemplate status={StoryStatus.InProgress} wide>
    <StoryDescription>
      The grid layout is composed of rows of columns. A row is 12 units wide. A
      column specifies its width in units at various breakpoints via props: xs
      480px+, sm 768px+, md 1024px+, lg 1200px+.
      <br />
      This grid is <em>"fixed"</em> meaning that its width is constant: it will
      not shrink to the size of its container.
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
        <Row>
          <Col xs={12} sm={2}>
            <Box />
          </Col>
          <Col xs={12} sm={2}>
            <Box />
          </Col>
          <Col xs={12} sm={2}>
            <Box />
          </Col>
          <Col xs={12} sm={2}>
            <Box />
          </Col>
          <Col xs={12} sm={2}>
            <Box />
          </Col>
          <Col xs={12} sm={2}>
            <Box />
          </Col>
        </Row>
      </FlexGrid>
    </Container>
  </StoryTemplate>
));

export const fluid = decoratedStory(() => (
  <StoryTemplate status={StoryStatus.InProgress}>
    <StoryDescription>
      Adding the fluid prop allows the grid to grow and shrink freely inside its
      container.
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
        <Row>
          <Col xs={12} sm={2}>
            <Box />
          </Col>
          <Col xs={12} sm={2}>
            <Box />
          </Col>
          <Col xs={12} sm={2}>
            <Box />
          </Col>
          <Col xs={12} sm={2}>
            <Box />
          </Col>
          <Col xs={12} sm={2}>
            <Box />
          </Col>
          <Col xs={12} sm={2}>
            <Box />
          </Col>
        </Row>
      </FlexGrid>
    </Container>
  </StoryTemplate>
));
