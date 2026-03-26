import { Box, TextArea } from '@codecademy/gamut';
import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import type { Meta, StoryObj } from '@storybook/react';
import {
  type ChangeEvent,
  type ComponentProps,
  useCallback,
  useLayoutEffect,
  useRef,
} from 'react';

/**
 * `field-sizing: content` lets the textarea grow with its value in Chromium and Safari.
 * Firefox does not support it yet; we mirror that behavior by syncing height to scrollHeight.
 *
 * Note: A single-line `<input>` cannot expand vertically—use `<textarea>` for multi-line text.
 */
const fieldSizingContentSupported =
  typeof CSS !== 'undefined' && CSS.supports('field-sizing', 'content');

const AutoGrowTextAreaBase = styled(TextArea)(
  css({
    resize: 'none',
    overflow: 'hidden',
    // Static CSS — not a Gamut system prop; merged by variance `css()` as passthrough.
    fieldSizing: 'content',
  })
);

const AutoGrowTextArea = (props: ComponentProps<typeof TextArea>) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const { onChange, value, ...rest } = props;

  const syncHeight = useCallback(() => {
    if (fieldSizingContentSupported) return;
    const el = ref.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, []);

  useLayoutEffect(() => {
    syncHeight();
  }, [syncHeight, value]);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(event);
    requestAnimationFrame(syncHeight);
  };

  return (
    <Box height="1000px">
      <AutoGrowTextAreaBase
        {...rest}
        ref={ref}
        rows={rest.rows ?? 1}
        {...(value !== undefined ? { value } : {})}
        onChange={handleChange}
      />
    </Box>
  );
};

const meta: Meta<typeof TextArea> = {
  component: TextArea,
  args: {
    htmlFor: 'example-input',
    name: 'example-input',
    defaultValue: 'Some text',
    rows: 4,
  },
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
  args: {},
};

export const Disabled: Story = {
  args: {
    defaultValue: 'Disabled',
    disabled: true,
  },
};

export const Error: Story = {
  args: {
    defaultValue: 'Error',
    error: true,
  },
};

export const Placeholder: Story = {
  args: {
    placeholder: 'Placeholder',
    defaultValue: undefined,
  },
};

export const AutoGrow: Story = {
  args: {
    htmlFor: 'example-autogrow',
    name: 'example-autogrow',
    placeholder: 'Type multiple lines — the field grows vertically',
    defaultValue:
      'Line one\nLine two\nLine three\n\nFirefox uses scrollHeight; Chromium/Safari use field-sizing: content.',
    rows: 1,
  },
  render: (args) => <AutoGrowTextArea {...args} />,
};
