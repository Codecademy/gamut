import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent } from '@testing-library/react';
import { encode } from 'js-base64';
import React from 'react';

import { trackUserImpression } from '~/libs/eventTracking';

import { CodeByteEditor } from '..';
import { helloWorld, validLanguages } from '../consts';
import { trackClick } from '../helpers';

const mockEditorTestId = 'mock-editor-test-id';

jest.mock('react-resize-observer');
// This is a super simplified mock capable of render value and trigger onChange.
jest.mock('../MonacoEditor', () => ({
  SimpleMonacoEditor: ({
    value,
    onChange,
  }: {
    value: string;
    onChange?: (value: string) => void;
  }) => (
    <>
      {value}
      <input
        data-testid={mockEditorTestId}
        type="text"
        onChange={(e) => {
          onChange && onChange(e.target.value);
        }}
        value={value}
      />
    </>
  ),
}));
jest.mock('~/libs/eventTracking');
jest.mock('../helpers', () => ({
  ...jest.requireActual('../helpers'),
  trackClick: jest.fn(),
}));

const renderWrapper = setupRtl(CodeByteEditor);

type RenderWrapperWithProps = { text?: string; lang?: string; mode?: string };
const renderWrapperWith = ({ text, lang, mode }: RenderWrapperWithProps) => {
  const url = new URL(window.location.href);
  if (text) {
    url.searchParams.set('text', encode(text));
  }
  if (lang) {
    url.searchParams.set('lang', lang);
  }
  url.searchParams.set('client-name', 'forum');
  url.searchParams.set(
    'page',
    'https://discuss.codecademy.com/some-interesting/post'
  );
  if (mode) {
    url.searchParams.set('mode', mode);
  }
  window.history.replaceState({}, '', url.toString());

  return renderWrapper();
};

describe('CodeBytes', () => {
  const initialUrl = window.location.href;

  afterEach(() => {
    window.history.replaceState(null, '', initialUrl);
    (trackClick as any).mockReset();
    (trackUserImpression as any).mockReset();
  });

  it('has a language-specific "hello world" program defined for each language', () => {
    validLanguages.forEach((language) => {
      expect(helloWorld[language]).toBeDefined();
    });
  });

  it('initializes with a language-specific "hello world" program when there are no query params', () => {
    const { view } = renderWrapper();
    const languageSelect = view.getByLabelText('Select your language');

    fireEvent.change(languageSelect, {
      target: { value: 'javascript' },
    });

    view.getByText(helloWorld.javascript!);
  });

  it('initializes with a language-specific "hello world" program when there is a lang query param but no text query param', () => {
    const { view } = renderWrapperWith({ lang: 'javascript' });
    view.getByText(helloWorld.javascript!);
  });

  it('initializes with deserialized text when there is a text query param but no lang query param', () => {
    const testString = 'yes hello';
    const { view } = renderWrapperWith({ text: testString });
    const languageSelect = view.getByLabelText('Select your language');

    fireEvent.change(languageSelect, {
      target: { value: 'javascript' },
    });

    view.getByText(testString);
  });

  it('initializes with deserialized text when there is both a lang query param and a text query param', () => {
    const testString = 'yes hello';
    const { view } = renderWrapperWith({
      text: testString,
      lang: 'javascript',
    });
    view.getByText(testString);
  });

  describe('tracking', () => {
    it('triggers trackClick on clicking the logo', () => {
      const { view } = renderWrapper();

      const logo = view.getByLabelText('visit codecademy.com');
      fireEvent.click(logo);

      expect(trackClick).toHaveBeenCalledWith('logo');
    });

    it('triggers trackClick on language selection', () => {
      const { view } = renderWrapper();

      const languageSelect = view.getByLabelText('Select your language');
      fireEvent.change(languageSelect, { target: { value: 'javascript' } });

      expect(trackClick).toHaveBeenCalledWith('lang_select');
    });

    it('triggers trackClick for the first edit in view mode', () => {
      const testString = 'original-value';
      const { view } = renderWrapperWith({
        text: testString,
        lang: 'javascript',
      });

      const editor = view.getByTestId(mockEditorTestId);
      fireEvent.change(editor, { target: { value: 'another-value' } });

      expect(trackClick).toHaveBeenCalledWith('edit');
    });

    it('triggers trackUserImpression for view mode', () => {
      renderWrapperWith({
        text: 'some-value',
        lang: 'javascript',
      });

      expect(trackUserImpression).toHaveBeenCalledWith({
        page_name: 'forum',
        context: 'https://discuss.codecademy.com/some-interesting/post',
        target: 'codebyte',
      });
    });

    it('triggers trackUserImpression for compose mode', () => {
      renderWrapperWith({
        text: 'some-value',
        lang: 'javascript',
        mode: 'compose',
      });

      expect(trackUserImpression).toHaveBeenCalledWith({
        page_name: 'forum_compose',
        context: 'https://discuss.codecademy.com/some-interesting/post',
        target: 'codebyte',
      });
    });
  });
});
