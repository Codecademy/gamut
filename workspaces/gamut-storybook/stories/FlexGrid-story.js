import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Item } from '@codecademy/gamut/FlexBox';
import { Grid, Row, Col } from '@codecademy/gamut/FlexGrid';
import gamut from '@codecademy/gamut-styles/utils/variables';
import { addonInfoOptions as options } from './options';

const Box = () => (
  <Item
    style={{
      height: 30,
      marginBottom: '0.5rem',
      backgroundColor: gamut.colors.swatches.ccBlue[500],
    }}
  />
);

const defaultGridProps = {
  style: {
    padding: '1rem',
    backgroundColor: gamut.colors.swatches.ccBlue[100],
  },
};

storiesOf('Layout/Grid System', module)
  .add(
    'Fixed Grid (Default)',
    withInfo({
      text: `
      The grid layout is composed of rows of columns.

      A row is 12 units wide. A column specifies its width in units at various breakpoints via props: xs 480px+, sm 768px+, md 1024px+, lg 1200px+
      `,
      ...options,
    })(() => (
      <Grid {...defaultGridProps}>
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
      </Grid>
    ))
  )
  .add(
    'Fluid',
    withInfo({
      text: `
      Adding the fluid prop allows the grid to grow and shrink freely inside its container.
      `,
      ...options,
    })(() => (
      <Grid {...defaultGridProps} fluid>
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
      </Grid>
    ))
  )
  .add(
    'Offsets',
    withInfo({
      text: `
      A column can be offset with the <code>xs</code> property
      `,
      ...options,
    })(() => (
      <Grid fluid {...defaultGridProps}>
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
      </Grid>
    ))
  )
  .add(
    'Center',
    withInfo({
      text: `
      Centered component
      `,
      ...options,
    })(() => (
      <Grid fluid {...defaultGridProps}>
        <Row>
          <Col xs={12}>
            <Row center="xs">
              <Col xs={6}>
                <Box />
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    ))
  );
