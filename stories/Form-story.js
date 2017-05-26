import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { Checkbox, Radio, Input, TextArea, Select, FormGroupLabel, FormGroupDescription, Form, FormButton } from 'src/Form';

storiesOf('Form', module)
  .addWithInfo(
    'Form',
    () => (
      <Form>
        <FormGroupLabel htmlFor="name">Name</FormGroupLabel>
        <Input
          htmlFor="name"
          placeholder="First Name"
        />
        <FormGroupLabel htmlFor="about">About</FormGroupLabel>
        <FormGroupDescription>Write about your self in Haiku form.</FormGroupDescription>
        <TextArea
          htmlFor="about"
          placeholder="About you"
          rows="8"
        />
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
        <FormGroupLabel>Select an option</FormGroupLabel>
        <Select
          htmlFor="select"
          options={['one', 'two', 'three', 'option four', 'five']}
        />
        <FormGroupLabel>Terms of Service</FormGroupLabel>
        <Checkbox
          htmlFor="tos"
          label="I agree"
        />
        <FormButton>Submit</FormButton>
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
    'FormButton',
    () => (
      <FormButton>Submit</FormButton>
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
