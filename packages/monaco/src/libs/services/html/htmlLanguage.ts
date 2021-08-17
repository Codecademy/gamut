/*
This code was copied and modified per the Monaco team's suggestion from:
https://github.com/microsoft/monaco-languages/blob/master/src/html/html.ts

We did this because the built-in Monarch HTML tokenizer is not rich enough to match our highlighting needs.
See also this file for how to use a language:
https://github.com/microsoft/monaco-languages/blob/master/src/_.contribution.ts
*/

import type { languages } from 'monaco-editor';

/*-----------------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the Monaco project root for license information.
 *----------------------------------------------------------------------------------------------------*/

const EMPTY_ELEMENTS: string[] = [
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'keygen',
  'link',
  'menuitem',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
];

export const createConfiguration = (
  monaco: typeof import('monaco-editor')
): languages.LanguageConfiguration => ({
  wordPattern: /(-?\d*\.\d\w*)|([^\`\~\!\@\$\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\s]+)/g,

  comments: {
    blockComment: ['<!--', '-->'],
  },

  brackets: [
    ['<!--', '-->'],
    ['<', '>'],
    ['{', '}'],
    ['(', ')'],
  ],

  autoClosingPairs: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
    { open: '"', close: '"' },
    { open: "'", close: "'" },
  ],

  surroundingPairs: [
    { open: '"', close: '"' },
    { open: "'", close: "'" },
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
    { open: '<', close: '>' },
  ],

  onEnterRules: [
    {
      beforeText: new RegExp(
        `<(?!(?:${EMPTY_ELEMENTS.join(
          '|'
        )}))([_:\\w][_:\\w-.\\d]*)([^/>]*(?!/)>)[^<]*$`,
        'i'
      ),
      afterText: /^<\/([_:\w][_:\w-.\d]*)\s*>$/i,
      action: { indentAction: monaco.languages.IndentAction.IndentOutdent },
    },
    {
      beforeText: new RegExp(
        `<(?!(?:${EMPTY_ELEMENTS.join(
          '|'
        )}))(\\w[\\w\\d]*)([^/>]*(?!/)>)[^<]*$`,
        'i'
      ),
      action: { indentAction: monaco.languages.IndentAction.Indent },
    },
  ],

  folding: {
    markers: {
      start: new RegExp('^\\s*<!--\\s*#region\\b.*-->'),
      end: new RegExp('^\\s*<!--\\s*#endregion\\b.*-->'),
    },
  },
});

export const definition = {
  defaultToken: 'default',

  tokenizer: {
    root: [
      [/<!DOCTYPE/, 'metatag', '@doctype'],
      [/<!--/, 'comment', '@comment'],
      [
        /(<)((?:[\w\-]+:)?[\w\-]+)(\s*)(\/>)/,
        ['delimiter', 'tag', 'default', 'delimiter'],
      ],
      [/(<)(script)/, ['delimiter', { token: 'tag', next: '@script' }]],
      [/(<)(style)/, ['delimiter', { token: 'tag', next: '@style' }]],
      [
        /(<)((?:[\w\-]+:)?[\w\-]+)/,
        ['delimiter', { token: 'tag', next: '@otherTag' }],
      ],
      [
        /(<\/)((?:[\w\-]+:)?[\w\-]+)/,
        ['delimiter', { token: 'tag', next: '@otherTag' }],
      ],
      [/</, 'delimiter'],
      [/[^<]+/, 'default'], // text,
    ],

    doctype: [
      [/[^>]+/, 'metatag.content'],
      [/>/, 'metatag', '@pop'],
    ],

    comment: [
      [/-->/, 'comment', '@pop'],
      [/[^-]+/, 'comment.content'],
      [/./, 'comment.content'],
    ],

    otherTag: [
      [/\/?>/, 'delimiter', '@pop'],
      [/"([^"]*)"/, 'attribute.value'],
      [/'([^']*)'/, 'attribute.value'],
      [/[\d\-]+/, 'attribute.name-numeric'],
      [/[\w\-]+/, 'attribute.name'],
      [/=/, 'equals'],
      [/[ \t\r\n]+/], // whitespace
    ],

    // -- BEGIN <script> tags handling

    // After <script
    script: [
      [/type/, 'attribute.name', '@scriptAfterType'],
      [/"([^"]*)"/, 'attribute.value'],
      [/'([^']*)'/, 'attribute.value'],
      [/[\d\-]+/, 'attribute.name-numeric'],
      [/[\w\-]+/, 'attribute.name'],
      [/=/, 'equals'],
      [
        />/,
        {
          token: 'delimiter',
          next: '@scriptEmbedded',
          nextEmbedded: 'text/javascript',
        },
      ],
      [/[ \t\r\n]+/], // whitespace
      [
        /(<\/)(script\s*)(>)/,
        ['delimiter', 'tag', { token: 'delimiter', next: '@pop' }],
      ],
    ],

    // After <script ... type
    scriptAfterType: [
      [/=/, 'equals', '@scriptAfterTypeEquals'],
      [
        />/,
        {
          token: 'delimiter',
          next: '@scriptEmbedded',
          nextEmbedded: 'text/javascript',
        },
      ], // cover invalid e.g. <script type>
      [/[ \t\r\n]+/], // whitespace
      [/<\/script\s*>/, { token: '@rematch', next: '@pop' }],
    ],

    // After <script ... type =
    scriptAfterTypeEquals: [
      [
        /"([^"]*)"/,
        { token: 'attribute.value', switchTo: '@scriptWithCustomType.$1' },
      ],
      [
        /'([^']*)'/,
        { token: 'attribute.value', switchTo: '@scriptWithCustomType.$1' },
      ],
      [
        />/,
        {
          token: 'delimiter',
          next: '@scriptEmbedded',
          nextEmbedded: 'text/javascript',
        },
      ], // cover invalid e.g. <script type=>
      [/[ \t\r\n]+/], // whitespace
      [/<\/script\s*>/, { token: '@rematch', next: '@pop' }],
    ],

    // After <script ... type = $S2
    scriptWithCustomType: [
      [
        />/,
        {
          token: 'delimiter',
          next: '@scriptEmbedded.$S2',
          nextEmbedded: '$S2',
        },
      ],
      [/"([^"]*)"/, 'attribute.value'],
      [/'([^']*)'/, 'attribute.value'],
      [/[\d\-]+/, 'attribute.name-numeric'],
      [/[\w\-]+/, 'attribute.name'],
      [/=/, 'equals'],
      [/[ \t\r\n]+/], // whitespace
      [/<\/script\s*>/, { token: '@rematch', next: '@pop' }],
    ],

    scriptEmbedded: [
      [/<\/script/, { token: '@rematch', next: '@pop', nextEmbedded: '@pop' }],
      [/[^<]+/, ''],
    ],

    // -- END <script> tags handling

    // -- BEGIN <style> tags handling

    // After <style
    style: [
      [/type/, 'attribute.name', '@styleAfterType'],
      [/"([^"]*)"/, 'attribute.value'],
      [/'([^']*)'/, 'attribute.value'],
      [/[\d\-]+/, 'attribute.name-numeric'],
      [/[\w\-]+/, 'attribute.name'],
      [/=/, 'equals'],
      [
        />/,
        {
          token: 'delimiter',
          next: '@styleEmbedded',
          nextEmbedded: 'text/css',
        },
      ],
      [/[ \t\r\n]+/], // whitespace
      [
        /(<\/)(style\s*)(>)/,
        ['delimiter', 'tag', { token: 'delimiter', next: '@pop' }],
      ],
    ],

    // After <style ... type
    styleAfterType: [
      [/=/, 'equals', '@styleAfterTypeEquals'],
      [
        />/,
        {
          token: 'delimiter',
          next: '@styleEmbedded',
          nextEmbedded: 'text/css',
        },
      ], // cover invalid e.g. <style type>
      [/[ \t\r\n]+/], // whitespace
      [/<\/style\s*>/, { token: '@rematch', next: '@pop' }],
    ],

    // After <style ... type =
    styleAfterTypeEquals: [
      [
        /"([^"]*)"/,
        { token: 'attribute.value', switchTo: '@styleWithCustomType.$1' },
      ],
      [
        /'([^']*)'/,
        { token: 'attribute.value', switchTo: '@styleWithCustomType.$1' },
      ],
      [
        />/,
        {
          token: 'delimiter',
          next: '@styleEmbedded',
          nextEmbedded: 'text/css',
        },
      ], // cover invalid e.g. <style type=>
      [/[ \t\r\n]+/], // whitespace
      [/<\/style\s*>/, { token: '@rematch', next: '@pop' }],
    ],

    // After <style ... type = $S2
    styleWithCustomType: [
      [
        />/,
        {
          token: 'delimiter',
          next: '@styleEmbedded.$S2',
          nextEmbedded: '$S2',
        },
      ],
      [/"([^"]*)"/, 'attribute.value'],
      [/'([^']*)'/, 'attribute.value'],
      [/[\d\-]+/, 'attribute.name-numeric'],
      [/[\w\-]+/, 'attribute.name'],
      [/=/, 'equals'],
      [/[ \t\r\n]+/], // whitespace
      [/<\/style\s*>/, { token: '@rematch', next: '@pop' }],
    ],

    styleEmbedded: [
      [/<\/style/, { token: '@rematch', next: '@pop', nextEmbedded: '@pop' }],
      [/[^<]+/, ''],
    ],

    // -- END <style> tags handling
  },
} as languages.IMonarchLanguage;
