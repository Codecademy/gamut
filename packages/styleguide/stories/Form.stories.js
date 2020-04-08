import React from 'react';
import {
  Button,
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
} from '../../gamut/src';

export default {
  title: 'Component/Form',
  component: Form,
  subcomponents: {
    FormGroup,
    FormGroupLabel,
    FormGroupDescription,
    Checkbox,
    RadioGroup,
    Radio,
    Input,
    TextArea,
    Select,
  },
};

export const form = () => (
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
);

form.story = {
  name: 'Form',
};

export const formGroupLabel = () => <FormGroupLabel>Password</FormGroupLabel>;

formGroupLabel.story = {
  name: 'FormGroupLabel',
};

export const formGroupDescription = () => (
  <FormGroupDescription>
    Write about your self in Haiku form.
  </FormGroupDescription>
);

formGroupDescription.story = {
  name: 'FormGroupDescription',
};

export const checkbox = () => (
  <div>
    <Checkbox htmlFor="html-css" label="HTML & CSS" />
    <Checkbox htmlFor="javascript" label="JavaScript" />
    <Checkbox htmlFor="ruby" label="Ruby" />
  </div>
);

checkbox.story = {
  name: 'Checkbox',
};

export const radioGroup = () => (
  <RadioGroup htmlForPrefix="why-are-you-learning" name="why-are-you-learning">
    <Radio
      label="Skills to communicate with developers and other technical people"
      value="skills"
    />
    <Radio
      label="A better understanding of web development in general"
      value="understanding"
    />
  </RadioGroup>
);

radioGroup.story = {
  name: 'RadioGroup',
};

export const input = () => <Input htmlFor="name" placeholder="First Name" />;

input.story = {
  name: 'Input',
};

export const inputErrorState = () => (
  <Input htmlFor="name" placeholder="First Name" error />
);

inputErrorState.story = {
  name: 'Input error state',
};

export const textArea = () => (
  <TextArea htmlFor="about" placeholder="About you" rows="8" />
);

textArea.story = {
  name: 'TextArea',
};

export const textAreaErrorState = () => (
  <TextArea htmlFor="about" placeholder="About you" rows="8" error />
);

textAreaErrorState.story = {
  name: 'TextArea error state',
};

export const select = () => (
  <Select
    htmlFor="select"
    options={['one', 'two', 'three', 'option four', 'five']}
  />
);

select.story = {
  name: 'Select',
};
