import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent } from '@testing-library/dom';
import { act } from '@testing-library/react';
import React from 'react';

import { Editor } from '../editor';
import { trackClick } from '../helpers';

jest.mock('../MonacoEditor', () => ({
  SimpleMonacoEditor: ({ value }: { value: string }) => <>{value}</>,
}));
jest.mock('react-resize-observer');
jest.mock('../helpers', () => ({
  ...jest.requireActual('../helpers'),
  trackClick: jest.fn(),
}));

const renderWrapper = setupRtl(Editor);

Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: jest.fn(),
  },
});

describe('Editor', () => {
  (global as any).fetch = jest.fn();
  afterEach(() => {
    (global as any).fetch.mockClear();
    (trackClick as any).mockClear();
  });

  it('shows a prompt tooltip when the CodeByte has __not__ been copied via the button', () => {
    const { view } = renderWrapper({
      onChange: jest.fn(),
      text: 'test',
      language: 'javascript',
    });

    expect(view.queryByTestId('copy-confirmation-tooltip')).toBeFalsy();
    view.getByTestId('copy-prompt-tooltip');
  });

  it('shows a confirmation tooltip when the CodeByte has been copied via the button', () => {
    const { view } = renderWrapper({
      onChange: jest.fn(),
      text: 'test',
      language: 'javascript',
    });
    view.getByTestId('copy-codebyte-btn').click();

    expect(view.queryByTestId('copy-prompt-tooltip')).toBeFalsy();
    view.getByTestId('copy-confirmation-tooltip');
  });

  it('hide copy codebyte button if copyButtonMode prop is "hide"', () => {
    const { view } = renderWrapper({
      copyButtonMode: 'hide',
      onChange: jest.fn(),
      text: 'test',
      language: 'javascript',
    });
    expect(view.queryByTestId('copy-codebyte-btn')).toBeNull();
  });

  it('show copy codebyte button if copyButtonMode prop is not set', () => {
    const { view } = renderWrapper({
      onChange: jest.fn(),
      text: 'test',
      language: 'javascript',
    });

    view.getByTestId('copy-codebyte-btn');
  });

  it('track clicks on copy codebyte button', () => {
    const { view } = renderWrapper({
      onChange: jest.fn(),
      text: 'test',
      language: 'javascript',
    });

    const copyButton = view.getByTestId('copy-codebyte-btn');
    fireEvent.click(copyButton);

    expect(trackClick).toHaveBeenCalledWith('copy');
  });

  it('track clicks on Run button', async () => {
    (global as any).fetch.mockResolvedValue({
      json: () =>
        Promise.resolve({
          stderr: [],
          exit_code: 0,
          stdout: '',
        }),
    });
    const { view } = renderWrapper({
      onChange: jest.fn(),
      text: 'test',
      language: 'javascript',
    });

    const runButton = view.getByText('Run');
    await act(async () => {
      fireEvent.click(runButton);
    });

    expect(trackClick).toHaveBeenCalledWith('run');
  });
});
