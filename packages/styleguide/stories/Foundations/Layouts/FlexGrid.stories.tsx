import { Item, FlexGrid, Row, Col } from '@codecademy/gamut/src';
import gamut from '@codecademy/gamut-styles/utils/variables';
import React from 'react';

import {
  decoratedStory,
  StoryTemplate,
  StoryStatus,
  StoryDescription,
} from '../../Templating';
import { withKnobs } from '@storybook/addon-knobs';

export default {
  title: 'Core|Foundations/Layouts/FlexGrid',
  component: FlexGrid,
  decorators: [withKnobs],
};

const Box = () => (
  <Item
    style={{
      height: 30,
      marginBottom: '0.5rem',
      backgroundColor: gamut.colors.blue[500],
    }}
  />
);

const defaultGridProps = {
  style: {
    padding: '1rem',
    backgroundColor: gamut.colors.blue[100],
  },
};

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
    <FlexGrid {...defaultGridProps}>
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
  </StoryTemplate>
));

export const fluid = decoratedStory(() => (
  <StoryTemplate status={StoryStatus.InProgress}>
    <StoryDescription>
      Adding the fluid prop allows the grid to grow and shrink freely inside its
      container.
    </StoryDescription>
    <FlexGrid {...defaultGridProps} fluid>
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
  </StoryTemplate>
));

export const offsets = decoratedStory(() => (
  <StoryTemplate status={StoryStatus.InProgress}>
    <StoryDescription>
      A column can be offset with the <code>xs</code> property.
    </StoryDescription>
    <FlexGrid fluid {...defaultGridProps}>
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

export const centered = decoratedStory(() => (
  <StoryTemplate status={StoryStatus.InProgress}>
    <StoryDescription>
      You can center the content of a row by passing it <code>center</code>.
    </StoryDescription>
    <FlexGrid fluid {...defaultGridProps}>
      <Row>
        <Col xs={12}>
          <Row center="xs">
            <Col xs={6}>
              <Box />
            </Col>
          </Row>
        </Col>
      </Row>
    </FlexGrid>
  </StoryTemplate>
));
