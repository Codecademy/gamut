import React from 'react';
import marked from 'marked';
import { storiesOf } from '@kadira/storybook';
import { Item } from '@codecademy/gamut/FlexBox';
import { Grid, Row, Col } from '@codecademy/gamut/FlexGrid';
import { swatches } from '@codecademy/identity';

let Box = () => {
  return (
    <Item style={{height: 30, border: '1px solid #fff', marginBottom: '0.5rem', backgroundColor: swatches.mint[500]}} />
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

let BasicGridExample = props => (
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

const basicDescription = `
  The grid layout is composed of rows of columns.

   row is 12 units wide. A column specifies its width in units at various breakpoints via props: xs 480px+, sm 768px+, md 1024px+, lg 1200px+

   ~~~js
   <Grid>
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
   ~~~
`;

const fluidDescription = `
Adding the fluid prop allows the grid to grow and shrink freely inside it's container

~~~js
<Grid fluid>
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
~~~
`;

const offsetsDescription = `
A column can be offset with the <code>xs</code> property

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
`;

const centerDescription = `
~~~js
<Col xs={12}>
  <Row center="xs">
    <Col xs={6}>
      <Box />
    </Col>
  </Row>
</Col>
~~~
`;

export default {
  title: 'Flex Grid',
  story: () => (
    <div>
      <h3>Basic</h3>
      <BasicGridExample />
      <div dangerouslySetInnerHTML={{__html: marked(basicDescription)}} />

      <h3>Fluid</h3>
      <BasicGridExample fluid />
      <div dangerouslySetInnerHTML={{__html: marked(fluidDescription)}} />

      <h3>Offsets</h3>
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
      <div dangerouslySetInnerHTML={{__html: marked(offsetsDescription)}} />

      <h3>Center</h3>
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
      <div dangerouslySetInnerHTML={{__html: marked(centerDescription)}} />
    </div>
    ),
  options: infoOptions
};
