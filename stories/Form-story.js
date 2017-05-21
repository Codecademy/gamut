import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { Checkbox, Radio, Input, TextArea, Select, FormGroupHeader, Form, FormButton } from 'src/Form';

storiesOf('Form', module)
  .add(
    'Form',
    () => (
      <Form>
        <FormGroupHeader>Name</FormGroupHeader>
        <Input
          htmlFor="name"
          label="firstName"
          placeholder="First Name"
        />
        <FormGroupHeader>About</FormGroupHeader>
        <TextArea
          htmlFor="about"
          label="aboutYou"
          placeholder="About you"
          rows="8"
        />
        <FormGroupHeader>Development Goal</FormGroupHeader>
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
        <FormGroupHeader>Select an option</FormGroupHeader>
        <Select
          htmlFor="select"
          label="Select"
          options={['one', 'two', 'three', 'option four', 'five']}
        />
        <FormGroupHeader>Terms of Service</FormGroupHeader>
        <Checkbox
          htmlFor="tos"
          label="I agree"
        />
        <FormButton>Submit</FormButton>
      </Form>
    )
  )
  .addWithInfo(
    'Form',
    () => (
      <Form>
        <FormGroupHeader>Name</FormGroupHeader>
        <Input
          htmlFor="name"
          label="firstName"
          placeholder="First Name"
        />
        <FormGroupHeader>About</FormGroupHeader>
        <TextArea
          htmlFor="about"
          label="aboutYou"
          placeholder="About you"
          rows="8"
        />
        <FormGroupHeader>Development Goal</FormGroupHeader>
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
        <FormGroupHeader>Select an option</FormGroupHeader>
        <Select
          htmlFor="select"
          label="Select"
          options={['one', 'two', 'three', 'option four', 'five']}
        />
        <FormGroupHeader>Terms of Service</FormGroupHeader>
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
  .add(
    'Checkbox',
    () => (
      <Checkbox
        htmlFor="checkbox1"
        label="HTML & CSS"
      />
    )
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
  .add(
    'Radio',
    () => (
      <Radio
        htmlFor="radioOne"
        label="Skills to communicate with developers and other technical people"
        name="radios"
      />
    )
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
  .add(
    'Input',
    () => (
      <Input
        htmlFor="name"
        label="firstName"
        placeholder="First Name"
      />
    )
  )
  .addWithInfo(
    'Input',
    () => (
      <Input
        htmlFor="name"
        label="firstName"
        placeholder="First Name"
      />
    ), {
      inline: true,
      propTables: false
    }
  )
  .add(
    'TextArea',
    () => (
      <TextArea
        htmlFor="about"
        label="aboutYou"
        placeholder="About you"
        rows="8"
      />
    )
  )
  .addWithInfo(
    'TextArea',
    () => (
      <TextArea
        htmlFor="about"
        label="aboutYou"
        placeholder="About you"
        rows="8"
      />
    ), {
      inline: true,
      propTables: false
    }
  )
  .add(
    'Select',
    () => (
      <Select
        htmlFor="select"
        label="Select"
        options={['one', 'two', 'three', 'option four', 'five']}
      />
    )
  )
  .addWithInfo(
    'Select',
    () => (
      <Select
        htmlFor="select"
        label="Select"
        options={['one', 'two', 'three', 'option four', 'five']}
      />
    ), {
      inline: true,
      propTables: false
    }
  )
  .add(
    'FormGroupHeader',
    () => (
      <FormGroupHeader>Password</FormGroupHeader>
    )
  )
  .addWithInfo(
    'FormGroupHeader',
    () => (
      <FormGroupHeader>Password</FormGroupHeader>
    ), {
      inline: true,
      propTables: false
    }
  );
