import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { Button } from '@codecademy/gamut';
import { Checkbox, Radio, Input, TextArea, Select, FormGroup, FormGroupLabel, FormGroupDescription, Form, DataList } from '@codecademy/gamut/Form';

storiesOf('Form', module)
  .addWithInfo(
    'Form',
    () => (
      <Form>
        <FormGroup
          htmlFor="firstName"
          label="First Name"
          description="Type your first name"
        >
          <Input
            htmlFor="firstName"
            placeholder="First Name"
          />
        </FormGroup>

        <FormGroup>
          <FormGroupLabel htmlFor="lastName">Last Name</FormGroupLabel>
          <Input
            htmlFor="lastName"
            placeholder="Last Name"
          />
        </FormGroup>

        <FormGroup
          htmlFor="advisors"
          label="Advisors"
        >
          <DataList options={['Farish Kashefinejad', 'Aubrey Wullschleger', 'Sarah Edkins', 'Jeremiah Crowley', 'Jerica Huang']} htmlFor="advisors" />
        </FormGroup>

        <FormGroup
          htmlFor="about"
          label="About"
          description="Write about your self in Haiku form."
        >
          <TextArea
            htmlFor="about"
            placeholder="About you"
            rows="8"
          />
        </FormGroup>

        <FormGroup>
          <FormGroupLabel>Development Goal</FormGroupLabel>
          <FormGroupDescription>Which goal do you identify with?</FormGroupDescription>
          <Radio
            htmlFor="radioOne"
            label="Skills to communicate with developers and other technical people"
            name="radios"
          />
          <Radio
            htmlFor="radioTwo"
            label="A better understanding of web development in general"
            name="radios"
          />
        </FormGroup>

        <FormGroup>
          <FormGroupLabel>Select an option</FormGroupLabel>
          <Select
            htmlFor="select"
            options={['one', 'two', 'three', 'option four', 'five']}
          />
        </FormGroup>

        <FormGroup>
          <FormGroupLabel>Terms of Service</FormGroupLabel>
          <Checkbox
            htmlFor="tos"
            label="I agree"
          />
        </FormGroup>
        <Button href="/" type="submit" caps>Submit</Button>
      </Form>
    ), {
      inline: true,
      propTables: false
    }
  )
  .addWithInfo(
    'FormGroupLabel',
    () => (
      <FormGroupLabel>Password</FormGroupLabel>
    ), {
      inline: true,
      propTables: false
    }
  )
  .addWithInfo(
    'FormGroupDescription',
    () => (
      <FormGroupDescription>Write about your self in Haiku form.</FormGroupDescription>
    ), {
      inline: true,
      propTables: false
    }
  )
  .addWithInfo(
    'Checkbox',
    () => (
      <Checkbox
        htmlFor="checkbox1"
        label="HTML & CSS"
      />
    ), {
      inline: true,
      propTables: false
    }
  )
  .addWithInfo(
    'Radio',
    () => (
      <Radio
        htmlFor="radioOne"
        label="Skills to communicate with developers and other technical people"
        name="radios"
      />
    ), {
      inline: true,
      propTables: false
    }
  )
  .addWithInfo(
    'Input',
    () => (
      <Input
        htmlFor="name"
        placeholder="First Name"
      />
    ), {
      inline: true,
      propTables: false
    }
  )
  .addWithInfo(
    'Input error state',
    () => (
      <Input
        htmlFor="name"
        placeholder="First Name"
        error
      />
    ), {
      inline: true,
      propTables: false
    }
  )
  .addWithInfo(
    'TextArea',
    () => (
      <TextArea
        htmlFor="about"
        placeholder="About you"
        rows="8"
      />
    ), {
      inline: true,
      propTables: false
    }
  )
  .addWithInfo(
    'TextArea error state',
    () => (
      <TextArea
        htmlFor="about"
        placeholder="About you"
        rows="8"
        error
      />
    ), {
      inline: true,
      propTables: false
    }
  )
  .addWithInfo(
    'DataList',
    () => (
      <DataList options={['Farish Kashefinejad', 'Aubrey Wullschleger', 'Sarah Edkins', 'Jeremiah Crowley', 'Jerica Huang']} htmlFor="advisors" />
    ), {
      inline: true,
      propTables: false
    }
  )
  .addWithInfo(
    'Select',
    () => (
      <Select
        htmlFor="select"
        options={['one', 'two', 'three', 'option four', 'five']}
      />
    ), {
      inline: true,
      propTables: false
    }
  );
