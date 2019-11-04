import React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from 'gamut';
import {
  Checkbox,
  RadioGroup,
  Radio,
  Input,
  TextArea,
  Select,
  FormGroup,
  FormGroupLabel,
  FormGroupDescription,
  Form,
} from 'gamut/Form';

storiesOf('Component/Form', module)
  .addParameters({
    info: {
      inline: true,
    },
  })
  .add('Form', () => (
    <Form>
      <FormGroup
        htmlFor="firstName"
        label="First Name"
        description="Type your first name"
      >
        <Input htmlFor="firstName" placeholder="First Name" />
      </FormGroup>

      <FormGroup>
        <FormGroupLabel htmlFor="lastName">Last Name</FormGroupLabel>
        <Input htmlFor="lastName" placeholder="Last Name" />
      </FormGroup>

      <FormGroup
        htmlFor="about"
        label="About"
        description="Write about your self in Haiku form."
      >
        <TextArea htmlFor="about" placeholder="About you" rows="8" />
      </FormGroup>

      <FormGroup>
        <FormGroupLabel>Development Goal</FormGroupLabel>
        <FormGroupDescription>
          Which goal do you identify with?
        </FormGroupDescription>
        <RadioGroup
          htmlForPrefix="why-are-you-learning"
          name="why-are-you-learning"
        >
          <Radio
            label="Skills to communicate with developers and other technical people"
            value="skills"
          />
          <Radio
            label="A better understanding of web development in general"
            value="understanding"
          />
        </RadioGroup>
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
        <Checkbox htmlFor="tos" label="I agree" />
      </FormGroup>
      <Button href="/" type="submit" caps>
        Submit
      </Button>
    </Form>
  ))
  .add('FormGroupLabel', () => <FormGroupLabel>Password</FormGroupLabel>)
  .add('FormGroupDescription', () => (
    <FormGroupDescription>
      Write about your self in Haiku form.
    </FormGroupDescription>
  ))
  .add('Checkbox', () => (
    <div>
      <Checkbox htmlFor="html-css" label="HTML & CSS" />
      <Checkbox htmlFor="javascript" label="JavaScript" />
      <Checkbox htmlFor="ruby" label="Ruby" />
    </div>
  ))
  .add('RadioGroup', () => (
    <RadioGroup
      htmlForPrefix="why-are-you-learning"
      name="why-are-you-learning"
    >
      <Radio
        label="Skills to communicate with developers and other technical people"
        value="skills"
      />
      <Radio
        label="A better understanding of web development in general"
        value="understanding"
      />
    </RadioGroup>
  ))
  .add('Input', () => <Input htmlFor="name" placeholder="First Name" />)
  .add('Input error state', () => (
    <Input htmlFor="name" placeholder="First Name" error />
  ))
  .add('TextArea', () => (
    <TextArea htmlFor="about" placeholder="About you" rows="8" />
  ))
  .add('TextArea error state', () => (
    <TextArea htmlFor="about" placeholder="About you" rows="8" error />
  ))
  .add('Select', () => (
    <Select
      htmlFor="select"
      options={['one', 'two', 'three', 'option four', 'five']}
    />
  ));
