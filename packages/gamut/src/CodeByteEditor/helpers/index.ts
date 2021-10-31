import { decode } from 'js-base64';
import Uri from 'jsuri';

import { trackUserClick } from '~/libs/eventTracking';

import { languageOption, validLanguages } from '../consts';
import { CopyButtonMode } from '../editor';

type embdedLinkAttr = {
  language: string;
  text: string;
};

export type CodebyteOptions = {
  language: languageOption;
  text: string;
  copyMode: CopyButtonMode;
  clientName: string;
  parentPage: string;
  renderMode: string;
};

export enum CodebytesParams {
  Language = 'lang',
  Text = 'text',
  CopyMode = 'copy-mode',
  ClientName = 'client-name',
  Page = 'page',
  Mode = 'mode',
}

export const createBBCodeBlock = ({ language, text }: embdedLinkAttr) => {
  return `[codebyte language=${language}]\n` + text + '\n[/codebyte]\n';
};

export const getOptions = (): CodebyteOptions => {
  const currentUri = new Uri(window.location.href);

  return {
    language:
      validLanguages.find(
        (lang) =>
          currentUri.getQueryParamValue(CodebytesParams.Language) === lang
      ) ?? '',
    text: decode(currentUri.getQueryParamValue(CodebytesParams.Text) ?? ''),
    copyMode: currentUri
      .getQueryParamValue(CodebytesParams.CopyMode)
      ?.toLowerCase() as CopyButtonMode,
    clientName:
      currentUri.getQueryParamValue(CodebytesParams.ClientName) || 'Unknown',
    parentPage:
      currentUri.getQueryParamValue(CodebytesParams.Page) || document.referrer,
    renderMode: currentUri.getQueryParamValue(CodebytesParams.Mode) || '',
  };
};

export const trackClick = (target: string) => {
  const options = getOptions();
  const page_name = options.renderMode
    ? `${options.clientName}_${options.renderMode}`
    : options.clientName;

  trackUserClick({
    page_name,
    context: options.parentPage,
    target,
  });
};
