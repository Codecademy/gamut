import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { Button } from '@codecademy/gamut';
import { Checkbox, Radio, Input, TextArea, Select, FormGroup, FormGroupLabel, FormGroupDescription, Form } from '@codecademy/gamut/Form';

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
      inline: true
    }
  )
  .addWithInfo(
    'FormGroupLabel',
    () => (
      <FormGroupLabel>Password</FormGroupLabel>
    ), {
      inline: true
    }
  )
  .addWithInfo(
    'FormGroupDescription',
    () => (
      <FormGroupDescription>Write about your self in Haiku form.</FormGroupDescription>
    ), {
      inline: true
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
      inline: true
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
      inline: true
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
      inline: true
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
      inline: true
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
      inline: true
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
      inline: true
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
      inline: true
    }
  );
