import React from 'react';
import { Item, Grid, Row, Col } from '../../gamut/src';
import gamut from '../../gamut-styles/utils/variables';

const Box = () => (
  <Item
    style={{
      height: 30,
      marginBottom: '0.5rem',
      backgroundColor: gamut.deprecatedColors.swatches.ccBlue[500],
    }}
  />
);

const defaultGridProps = {
  style: {
    padding: '1rem',
    backgroundColor: gamut.deprecatedColors.swatches.ccBlue[100],
  },
};

export default {
  component: Grid,
  title: 'Layout/Grid System',
};

export const fixedGridDefault = () => (
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
);

fixedGridDefault.story = {
  name: 'Fixed Grid (Default)',

  description: `
  The grid layout is composed of rows of columns.

  A row is 12 units wide. A column specifies its width in units at various breakpoints via props: xs 480px+, sm 768px+, md 1024px+, lg 1200px+
  `,
};

export const fluid = () => (
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
);

fluid.story = {
  name: 'Fluid',

  description: `
  Adding the fluid prop allows the grid to grow and shrink freely inside its container.
  `,
};

export const offsets = () => (
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
);

offsets.story = {
  name: 'Offsets',

  description: `A column can be offset with the <code>xs</code> property`,
};

export const center = () => (
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
);

center.story = {
  name: 'Center',
};
