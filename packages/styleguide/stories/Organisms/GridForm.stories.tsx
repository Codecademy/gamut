import { GridForm, Input, LayoutGrid, Column } from '@codecademy/gamut/src';
import { useState } from '@storybook/addons';
import { action } from '@storybook/addon-actions';
import React from 'react';

import {
  decoratedStories,
  decoratedStory,
  StoryDescription,
  StoryStatus,
  StoryTemplate,
} from '../Templating';

export default decoratedStories('Organisms', GridForm);

export const gridForm = decoratedStory(() => (
  <StoryTemplate status={StoryStatus.Ready}>
    <StoryDescription>
      This organism takes in plain JSON-like props and uses them to string
      together a validated form composed of:
      <ul>
        <li>
          <a href="https://react-hook-form.com">
            <code>react-hook-form</code>
          </a>
        </li>
        <li>
          <a href="/?path=/story/layout-grid-system--fixed-grid-default">
            Our existing <code>Grid</code> layout system
          </a>
        </li>
        <li>
          <a href="/?path=/story/component-form--form">
            Our existing <code>Form</code> primitives
          </a>
        </li>
      </ul>
      You should only ever directly use <code>GridForm</code> to create your
      form. <code>Form</code> atoms compose the structure of these forms but
      should not be used directly.
      <br />
      `GridForm`s are laid out with `LayoutGrid`, so you can override its{' '}
      <code>columnGap</code> and <code>rowGap</code> with the normal string or
      responsive layouts.
    </StoryDescription>
    <GridForm
      fields={[
        {
          label: 'Simple text',
          name: 'simple-text',
          size: 3,
          type: 'text',
        },
        {
          defaultValue: 'yeet',
          label: 'Text with default value',
          name: 'text-with-default',
          size: 4,
          type: 'text',
        },
        {
          label: 'Simple select (required)',
          name: 'simple-select',
          options: ['', 'One fish', 'Two fish', 'Red fish', 'Blue fish'],
          size: 5,
          type: 'select',
          validation: {
            required: 'Please select an option',
          },
        },
        {
          label: 'Upload a cat image (we support pdf, jpeg, or png files)',
          name: 'file-input',
          size: 6,
          type: 'file',
          validation: {
            required: true,
            validate: files => {
              const { type } = files.item(0);
              const allowedTypes = [
                'application/pdf',
                'image/jpeg',
                'image/png',
              ];
              if (!allowedTypes.includes(type))
                return 'Please upload a pdf, jpeg, or png file.';

              return true;
            },
          },
        },
        {
          label: 'Write a paragraph about penguins',
          name: 'textarea-input',
          size: 12,
          type: 'textarea',
          validation: {
            required: 'Please write something about penguins!',
          },
        },
        {
          label:
            "Validated, required text that must contain the word 'swag' twice",
          name: 'validated-required-text',
          size: 5,
          type: 'text',
          validation: {
            required: true,
            pattern: {
              value: /swag(.*)swag/,
              message: 'Not enough swag',
            },
          },
        },
        {
          description: 'I have swag',
          label: 'Swag levels',
          name: 'enough-swag',
          size: 3,
          type: 'checkbox',
        },
        {
          label: 'Preferred Modern Artist',
          name: 'artist',
          options: [
            {
              label: 'Cardi B',
              value: 'cardi',
            },
            {
              label: 'Nicki Minaj',
              value: 'nicki',
            },
          ],
          size: 4,
          type: 'radio-group',
        },
        {
          label: 'End User License Agreement',
          description:
            'I accept the terms and conditions (required or else!!!)',
          name: 'eula-checkbox-required',
          size: 12,
          type: 'checkbox',
          validation: {
            required: 'Please check the box to agree to the terms.',
          },
        },
      ]}
      onSubmit={async values => {
        action('Form Submitted')(values);
      }}
      submit={{
        contents: 'Submit Me!?',
        size: 12,
      }}
    />
  </StoryTemplate>
));

export const gridFormWithSubmitButtonPosition = decoratedStory(() => (
  <StoryTemplate status={StoryStatus.Ready}>
    <StoryDescription>
      We can position the submit button by passing the position prop with a
      value of left, center, right, or stretch.
    </StoryDescription>
    <LayoutGrid>
      <Column size={6}>
        {' '}
        <GridForm
          fields={[
            {
              label: 'Simple text',
              name: 'simple-text',
              size: 12,
              type: 'text',
            },
          ]}
          onSubmit={async values => {
            action('Form Submitted')(values);
          }}
          submit={{
            contents: 'Right Submit!?',
            position: 'right',
            size: 12,
          }}
        />
      </Column>
      <Column size={6}>
        <GridForm
          fields={[
            {
              label: 'Simple text',
              name: 'simple-text',
              size: 12,
              type: 'text',
            },
          ]}
          onSubmit={async values => {
            action('Form Submitted')(values);
          }}
          submit={{
            contents: 'Center Submit!?',
            position: 'center',
            size: 12,
          }}
        />
      </Column>
      <Column size={6}>
        <GridForm
          fields={[
            {
              label: 'Simple text',
              name: 'simple-text',
              size: 12,
              type: 'text',
            },
          ]}
          onSubmit={async values => {
            action('Form Submitted')(values);
          }}
          submit={{
            contents: 'Left Submit!?',
            position: 'left',
            size: 12,
          }}
        />
      </Column>
      <Column size={6}>
        <GridForm
          fields={[
            {
              label: 'Simple text',
              name: 'simple-text',
              size: 12,
              type: 'text',
            },
          ]}
          onSubmit={async values => {
            action('Form Submitted')(values);
          }}
          submit={{
            contents: 'Stretch Submit!?',
            position: 'stretch',
            size: 12,
          }}
        />
      </Column>
    </LayoutGrid>
  </StoryTemplate>
));

export const gridFormWithSubmitButtonColor = decoratedStory(() => (
  <StoryTemplate status={StoryStatus.Ready}>
    <StoryDescription>
      We can specify the color of our button by passing the theme prop with a
      button atom theme prop value. i.e. 'brand-blue', 'brand-purple'. The
      default value is 'brand-purple'.
    </StoryDescription>
    <GridForm
      fields={[
        {
          label: 'Simple text',
          name: 'simple-text',
          size: 12,
          type: 'text',
        },
      ]}
      onSubmit={async values => {
        action('Form Submitted')(values);
      }}
      submit={{
        contents: 'Default Purple Submit!?',
        size: 12,
      }}
    />
    <GridForm
      fields={[
        {
          label: 'Simple text',
          name: 'simple-text',
          size: 12,
          type: 'text',
        },
      ]}
      onSubmit={async values => {
        action('Form Submitted')(values);
      }}
      submit={{
        contents: 'Blue Submit!?',
        size: 12,
        theme: 'brand-blue',
      }}
    />
  </StoryTemplate>
));

export const gridFormWithInlineSubmitButton = decoratedStory(() => (
  <StoryTemplate status={StoryStatus.NotReady}>
    <StoryDescription>
      We can make the Submit button inline with an input by setting the column
      sizes so they fit on the same row. e.g size 8 for an input and size 4 for
      the submit.
      <br />
      Caveats: We need to adjust params to allow us to properly align elements
      for the following use cases.
    </StoryDescription>
    <h4>
      Submit with no label text (but label still rendered) does not align
      properly with the checkbox
    </h4>
    <GridForm
      fields={[
        {
          description: 'I approve of inline swag',
          name: 'enough-swag',
          size: 8,
          type: 'checkbox',
        },
      ]}
      onSubmit={async values => {
        action('Form Submitted')(values);
      }}
      submit={{
        contents: 'Inline Submit!?',
        size: 4,
        position: 'right',
      }}
    />
    <hr />
    <h4>
      Submit even when the lable has visible text, is still not aligned right
    </h4>
    <GridForm
      fields={[
        {
          label: 'Label',
          name: 'email',
          size: 8,
          type: 'text',
        },
      ]}
      onSubmit={async values => {
        action('Form Submitted')(values);
      }}
      submit={{
        contents: 'Inline Submit!?',
        size: 4,
        position: 'right',
      }}
    />
  </StoryTemplate>
));

export const gridFormWithCustomInput = decoratedStory(() => (
  <StoryTemplate status={StoryStatus.Ready}>
    <StoryDescription>
      Some forms, such as the checkout flows that use Recurly, need to define
      their own inputs. We can specify a 'custom' field type to with a{' '}
      <a
        href="https://reactjs.org/docs/render-props.html"
        target="_blank"
        rel="noopener noreferrer"
      >
        render prop
      </a>
      .
    </StoryDescription>

    <GridForm
      fields={[
        {
          render: ({ className, error, setValue }) => (
            <div className={className}>
              <Input
                error={!!error}
                id="custom-text-input"
                type="text"
                onChange={event => setValue(event.target.value)}
              />
              <span aria-label="Dancing person" role="img">
                🕺
              </span>
            </div>
          ),
          label: 'Gimme two more swags',
          name: 'custom-input',
          validation: {
            required: true,
            pattern: {
              value: /swag(.*)swag/,
              message: 'Still not enough swag, what are you doing... 💢',
            },
          },
          size: 12,
          type: 'custom',
        },
      ]}
      onSubmit={async values => {
        action('Form Submitted')(values);
      }}
      submit={{
        contents: 'Submit Me!?',
      }}
    />
  </StoryTemplate>
));

export const gridFormWithPlaceholderText = decoratedStory(() => (
  <StoryTemplate status={StoryStatus.Ready}>
    <StoryDescription>
      Text inputs are allowed to have traditional <code>placeholder</code> text.
      This is a somewhat dangerous behavior for accessibility, as browsers
      generally don't render placeholder text with high enough color contrast
      for AA standards. If you do need to use placeholder text, such as on
      landing page forms that have been shown to have higher completion rates
      with the text, please make sure the placeholder text doesn't add any new
      information to the form -- it should really only rephrase the text label.
      <br />
      See{' '}
      <a href="https://www.nngroup.com/articles/form-design-placeholders/">
        this article
      </a>{' '}
      for more details on why using placeholders is often bad.
    </StoryDescription>

    <GridForm
      fields={[
        {
          label: 'Email',
          placeholder: 'Your email',
          name: 'custom-input',
          size: 12,
          type: 'email',
        },
      ]}
      onSubmit={async values => {
        action('Form Submitted')(values);
      }}
      submit={{
        contents: 'Submit Me!?',
      }}
    />
  </StoryTemplate>
));

export const gridFormWithFieldWithOnUpdate = decoratedStory(() => {
  const [text, setText] = useState('');

  return (
    <StoryTemplate status={StoryStatus.Ready}>
      <StoryDescription>
        A field can take an onUpdate callback. This callback will fire when the
        field's value changes. This could be useful if you need to use the
        field's value in a parent component before onSubmit gets triggered.
      </StoryDescription>

      <p>The text value is: {text}</p>
      <GridForm
        fields={[
          {
            label: 'Text with onUpdate',
            name: 'simple-text',
            size: 3,
            type: 'text',
            onUpdate: setText,
          },
        ]}
        onSubmit={async values => {
          action('Form Submitted')(values);
        }}
        submit={{
          contents: 'Submit Me!?',
        }}
      />
    </StoryTemplate>
  );
});
