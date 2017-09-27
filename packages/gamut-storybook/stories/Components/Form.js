import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { Button } from '@codecademy/gamut';
import { Checkbox, RadioGroup, Radio, Input, TextArea, Select, FormGroup, FormGroupLabel, FormGroupDescription, Form } from '@codecademy/gamut/Form';

export default {
  title: 'Form',
  story: () => (
    <div>
      <h3>Form Elements</h3>
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
          <Checkbox
            htmlFor="tos"
            label="I agree"
          />
        </FormGroup>
        <Button href="/" type="submit" caps>Submit</Button>
      </Form>

      <h3>FormGroupLabel</h3>
      <FormGroupLabel>Password</FormGroupLabel>

      <h3>FormGroupDescription</h3>
      <FormGroupDescription>Write about your self in Haiku form.</FormGroupDescription>

      <h3>Checkbox</h3>
      <div>
        <Checkbox
          htmlFor="html-css"
          label="HTML & CSS"
        />
        <Checkbox
          htmlFor="javascript"
          label="JavaScript"
        />
        <Checkbox
          htmlFor="ruby"
          label="Ruby"
        />
      </div>

      <h3>RadioGroup</h3>
      <RadioGroup
        htmlForPrefix="why-are-you-learning-individual"
        name="why-are-you-learning-individual"
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

      <h3>Input</h3>
      <Input
        htmlFor="name"
        placeholder="First Name"
      />

      <h3>TextArea</h3>
      <TextArea
        htmlFor="about"
        placeholder="About you"
        rows="8"
      />

      <h3>Select</h3>
      <Select
        htmlFor="select"
        options={['one', 'two', 'three', 'option four', 'five']}
      />
    </div>
  ),
  options: {
    inline: true
  }
};
