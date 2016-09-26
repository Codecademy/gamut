import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { Item } from 'components/FlexBox';
import { Grid, Row, Col } from 'components/Grid';
import { swatches } from 'identity';

let Box = () => {
  return (
    <Item style={{height: 30, border: '1px solid #fff', backgroundColor: swatches.mint[500]}} />
  );
};

let infoOptions = {
  inline: true,
  source: false,
  propTables: false
};

let defaultGridProps = {
  style: {
    marginBottom: '1rem',
    backgroundColor: swatches.mint[100]
  }
};

let BasicGridExample = (props) => (
  <Grid {...props} {...defaultGridProps} >
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

storiesOf('Grid', module)
  .addWithInfo(
    'Details',
    `
      Flexbox-based grid system

      ~~~js
      <Grid fluid>
        <Row>
          <Col xs={12} sm={3} md={2} lg={1} />
          <Col xs={6} sm={6} md={8} lg={10} />
          <Col xs={6} sm={3} md={2} lg={1} />
        </Row>
      </Grid>
      ~~~
    `,
    () => <BasicGridExample fluid />,
    infoOptions
  )
  .addWithInfo(
    'Fixed',
    `
    The default grid has a fixed width, and jumps to fixed widths at the various breakpoints.

    ~~~js
    <Grid>
      <Row>
        <Col xs={12} sm={3} md={2} lg={1} />
        <Col xs={6} sm={6} md={8} lg={10} />
        <Col xs={6} sm={3} md={2} lg={1} />
      </Row>
    </Grid>
    ~~~
    `,
    () => <BasicGridExample />,
    infoOptions
  )
  .addWithInfo(
    'Fluid',
    `
    Adding the fluid prop allows the grid to grow and shrink freely inside it's container

    ~~~js
    <Grid fluid>
      <Row>
        <Col xs={12} sm={3} md={2} lg={1} />
        <Col xs={6} sm={6} md={8} lg={10} />
        <Col xs={6} sm={3} md={2} lg={1} />
      </Row>
    </Grid>
    ~~~
    `,
    () => <BasicGridExample fluid />,
    infoOptions
  )
  .addWithInfo(
    'Offsets',
    `
    ~~~js
    <Col xsOffset={11} xs={1} />
    <Col xsOffset={10} xs={2} />
    <Col xsOffset={9} xs={3} />
    <Col xsOffset={8} xs={4} />
    <Col xsOffset={7} xs={5} />
    <Col xsOffset={6} xs={6} />
    <Col xsOffset={5} xs={7} />
    <Col xsOffset={4} xs={8} />
    <Col xsOffset={3} xs={9} />
    <Col xsOffset={2} xs={10} />
    <Col xsOffset={1} xs={11} />
    ~~~
    `,
    () => (
      <Grid fluid {...defaultGridProps}>
        <Row>
          <Col xsOffset={11} xs={1}><Box /></Col>
          <Col xsOffset={10} xs={2}><Box /></Col>
          <Col xsOffset={9} xs={3}><Box /></Col>
          <Col xsOffset={8} xs={4}><Box /></Col>
          <Col xsOffset={7} xs={5}><Box /></Col>
          <Col xsOffset={6} xs={6}><Box /></Col>
          <Col xsOffset={5} xs={7}><Box /></Col>
          <Col xsOffset={4} xs={8}><Box /></Col>
          <Col xsOffset={3} xs={9}><Box /></Col>
          <Col xsOffset={2} xs={10}><Box /></Col>
          <Col xsOffset={1} xs={11}><Box /></Col>
        </Row>
      </Grid>
    ),
    infoOptions
  )
  .addWithInfo(
    'Center',
    `
    ~~~js
    <Col xs={12}>
      <Row center="xs">
        <Col xs={6}>
          <Box />
        </Col>
      </Row>
    </Col>
    ~~~
    `,
    () => (
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
    ),
    infoOptions
  );
