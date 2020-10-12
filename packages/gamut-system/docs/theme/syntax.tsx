import type { PrismTheme } from 'prism-react-renderer';
import { theme, swatches } from '.';

export const lightSyntax: PrismTheme = {
  plain: {
    backgroundColor: theme.color.palePink,
    color: theme.color.navy,
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata', 'punctuation'],
      style: {
        color: swatches.gray[600],
      },
    },
    {
      types: ['namespace'],
      style: {
        opacity: 0.7,
      },
    },
    {
      types: ['tag', 'operator', 'number'],
      style: {
        color: theme.color.blue,
      },
    },
    {
      types: ['property', 'function'],
      style: {
        color: theme.color.pink,
      },
    },
    {
      types: ['tag-id', 'selector', 'atrule-id'],
      style: {
        color: theme.color.pink,
      },
    },
    {
      types: ['attr-name'],
      style: {
        color: theme.color.pink,
      },
    },
    {
      types: ['keyword'],
      style: {
        color: theme.color.red,
      },
    },
    {
      types: [
        'boolean',
        'string',
        'entity',
        'url',
        'attr-value',
        'control',
        'directive',
        'unit',
        'statement',
        'regex',
        'at-rule',
        'placeholder',
        'variable',
      ],
      style: {
        color: theme.color.pink,
      },
    },
    {
      types: ['deleted'],
      style: {
        textDecorationLine: 'line-through',
      },
    },
    {
      types: ['inserted'],
      style: {
        textDecorationLine: 'underline',
      },
    },
    {
      types: ['italic'],
      style: {
        fontStyle: 'italic',
      },
    },
    {
      types: ['important', 'bold'],
      style: {
        fontWeight: 'bold',
      },
    },
    {
      types: ['important'],
      style: {
        color: theme.color.red,
      },
    },
  ],
};

export const darkSyntax: PrismTheme = {
  plain: {
    backgroundColor: theme.color.black,
    color: theme.color.white,
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata', 'punctuation'],
      style: {
        color: swatches.gray[300],
      },
    },
    {
      types: ['namespace'],
      style: {
        opacity: 0.7,
      },
    },
    {
      types: ['tag', 'operator', 'number'],
      style: {
        color: theme.color.lightBlue,
      },
    },
    {
      types: ['property', 'function'],
      style: {
        color: theme.color.paleBlue,
      },
    },
    {
      types: ['tag-id', 'selector', 'atrule-id'],
      style: {
        color: theme.color.paleBlue,
      },
    },
    {
      types: ['attr-name'],
      style: {
        color: theme.color.paleBlue,
      },
    },
    {
      types: ['keyword'],
      style: {
        color: theme.color.yellow,
      },
    },
    {
      types: [
        'boolean',
        'string',
        'entity',
        'url',
        'attr-value',
        'control',
        'directive',
        'unit',
        'statement',
        'regex',
        'at-rule',
        'placeholder',
        'variable',
      ],
      style: {
        color: theme.color.lightGreen,
      },
    },
    {
      types: ['deleted'],
      style: {
        textDecorationLine: 'line-through',
      },
    },
    {
      types: ['inserted'],
      style: {
        textDecorationLine: 'underline',
      },
    },
    {
      types: ['italic'],
      style: {
        fontStyle: 'italic',
      },
    },
    {
      types: ['important', 'bold'],
      style: {
        fontWeight: 'bold',
      },
    },
    {
      types: ['important'],
      style: {
        color: theme.color.red,
      },
    },
  ],
};

export const syntaxTheme = {
  light: lightSyntax,
  dark: darkSyntax,
};
