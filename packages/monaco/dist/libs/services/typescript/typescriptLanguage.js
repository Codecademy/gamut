/* eslint-disable no-useless-escape */
/*
This code was copied and modified per the Monaco team's suggestion from:
https://github.com/microsoft/monaco-languages/blob/master/src/typescript/typescript.ts

We did this because the built-in Monarch TS tokenizer is not rich enough to match our highlighting needs.
See also this file for how to use a language:
https://github.com/microsoft/monaco-languages/blob/master/src/_.contribution.ts
*/

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export var createConfiguration = function createConfiguration(monaco) {
  return {
    wordPattern: /(-?\d*\.\d\w*)|([^\`\~\!\@\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
    comments: {
      lineComment: '//',
      blockComment: ['/*', '*/']
    },
    brackets: [['{', '}'], ['[', ']'], ['(', ')']],
    onEnterRules: [{
      // e.g. /** | */
      beforeText: /^\s*\/\*\*(?!\/)([^\*]|\*(?!\/))*$/,
      afterText: /^\s*\*\/$/,
      action: {
        indentAction: monaco.languages.IndentAction.IndentOutdent,
        appendText: ' * '
      }
    }, {
      // e.g. /** ...|
      beforeText: /^\s*\/\*\*(?!\/)([^\*]|\*(?!\/))*$/,
      action: {
        indentAction: monaco.languages.IndentAction.None,
        appendText: ' * '
      }
    }, {
      // e.g.  * ...|
      beforeText: /^(\t|(\ \ ))*\ \*(\ ([^\*]|\*(?!\/))*)?$/,
      action: {
        indentAction: monaco.languages.IndentAction.None,
        appendText: '* '
      }
    }, {
      // e.g.  */|
      beforeText: /^(\t|(\ \ ))*\ \*\/\s*$/,
      action: {
        indentAction: monaco.languages.IndentAction.None,
        removeText: 1
      }
    }],
    autoClosingPairs: [{
      open: '{',
      close: '}'
    }, {
      open: '[',
      close: ']'
    }, {
      open: '(',
      close: ')'
    }, {
      open: '"',
      close: '"',
      notIn: ['string']
    }, {
      open: "'",
      close: "'",
      notIn: ['string', 'comment']
    }, {
      open: '`',
      close: '`',
      notIn: ['string', 'comment']
    }, {
      open: '/**',
      close: ' */',
      notIn: ['string']
    }],
    folding: {
      markers: {
        start: new RegExp('^\\s*//\\s*#?region\\b'),
        end: new RegExp('^\\s*//\\s*#?endregion\\b')
      }
    }
  };
};
export var primitives = ['true', 'false', 'undefined', 'null', 'Infinity', 'NaN'];
export var definition = {
  // Set defaultToken to invalid to see what you do not tokenize yet
  defaultToken: 'default',
  tokenPostfix: '.codecademy-ts',
  keywords: ['abstract', 'as', 'async', 'await', 'break', 'case', 'catch', 'class', 'continue', 'const', 'constructor', 'debugger', 'declare', 'default', 'delete', 'do', 'else', 'enum', 'export', 'extends', 'finally', 'for', 'from', 'function', 'get', 'if', 'implements', 'import', 'in', 'infer', 'instanceof', 'interface', 'is', 'keyof', 'let', 'module', 'namespace', 'never', 'new', 'package', 'private', 'protected', 'public', 'readonly', 'require', 'global', 'return', 'set', 'static', 'super', 'switch', 'symbol', 'this', 'throw', 'try', 'type', 'typeof', 'unique', 'var', 'void', 'while', 'with', 'yield', 'of'],
  primitives: primitives,
  typeKeywords: ['any', 'boolean', 'number', 'object', 'string', 'undefined'],
  operators: ['<=', '>=', '==', '!=', '===', '!==', '=>', '+', '-', '**', '*', '/', '%', '++', '--', '<<', '</', '>>', '>>>', '&', '|', '^', '!', '~', '&&', '||', '??', '?', ':', '=', '+=', '-=', '*=', '**=', '/=', '%=', '<<=', '>>=', '>>>=', '&=', '|=', '^=', '@'],
  // we include these common regular expressions
  symbols: /[=><!~?:&|+\-*\/\^%]+/,
  escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
  digits: /\d+(_+\d+)*/,
  octaldigits: /[0-7]+(_+[0-7]+)*/,
  binarydigits: /[0-1]+(_+[0-1]+)*/,
  hexdigits: /[[0-9a-fA-F]+(_+[0-9a-fA-F]+)*/,
  regexpctl: /[(){}\[\]\$\^|\-*+?\.]/,
  regexpesc: /\\(?:[bBdDfnrsStvwWn0\\\/]|@regexpctl|c[A-Z]|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4})/,
  whitespace: /[ \t\r\n]+/,
  validName: /[A-Za-z_$][\w$]*/,
  // The main tokenizer for our languages
  tokenizer: {
    root: [{
      include: 'common'
    }],
    common: [{
      include: '@whitespace'
    }, {
      include: '@definitions'
    },
    // JSX tags
    [/\<\w+/, {
      token: 'delimiter.tag',
      next: '@tag'
    }],
    // returned objects
    {
      regex: /(return)(\s*)(\{)/,
      action: [{
        token: 'keyword'
      }, {
        token: 'white'
      }, {
        token: 'delimiter',
        next: '@bracketCountingProperty'
      }]
    },
    // identifiers and keywords
    [/([A-Za-z_$][\w$]*)(:)/, ['property', 'delimiter']], [/[A-Za-z_$][\w$]*/, {
      cases: {
        '@typeKeywords': 'keyword',
        '@keywords': 'keyword',
        '@primitives': 'primitive',
        '@default': 'identifier'
      }
    }],
    // brackets
    [/[{]/, 'delimiter.bracket', '@bracketCounting'], [/[\[]/, 'delimiter.bracket', '@arrayBracketCounting'],
    // regular expression: ensure it is terminated before beginning (otherwise it is an operator)
    [/\/(?=([^\\\/]|\\.)+\/([gimsuy]*)(\s*)(\.|;|,|\)|\]|\}|$))/, {
      token: 'regexp',
      bracket: '@open',
      next: '@regexp'
    }],
    // delimiters and operators
    [/[()\[\]]/, '@brackets'], [/[<>](?!@symbols)/, '@brackets'], [/!(?=([^=]|$))/, 'delimiter'], [/@symbols/, {
      cases: {
        '@operators': 'delimiter',
        '@default': ''
      }
    }],
    // numbers
    {
      include: '@numbers'
    },
    // delimiter: after number because of .\d floats
    [/[;,]/, 'delimiter'], [/[.]/, 'delimiter', '@attribute'],
    // strings
    {
      include: '@strings'
    }],
    tag: [[/\<\/\w+\>/, {
      token: 'delimiter.tag',
      next: '@pop'
    }], [/\>/, {
      token: 'delimiter.tag',
      next: '@innerTag'
    }], [/\/\>/, {
      token: 'delimiter.tag',
      next: '@pop'
    }], [/\w+/, 'prop.definition'], [/\=/, 'operator'], [/\{/, {
      token: 'operator',
      next: '@propValue'
    }], {
      include: '@strings'
    }],
    propValue: [{
      include: '@common'
    }, [/\}/, {
      token: 'operator.lol',
      next: '@pop'
    }]],
    innerTag: [[/{/, 'delimiter.bracket', '@bracketCounting'], [/\w+/, 'text'], [/\<\/\w+\>/, {
      token: '@rematch',
      next: '@pop'
    }], [/\<\w+/, {
      token: 'delimiter.tag',
      next: '@tag'
    }]],
    whitespace: [[/[ \t\r\n]+/, 'whitespace'], [/\/\*\*(?!\/)/, 'comment.doc', '@jsdoc'], [/\/\*/, 'comment', '@comment'], [/\/\/.*$/, 'comment']],
    comment: [[/[^\/*]+/, 'comment'], [/\*\//, 'comment', '@pop'], [/[\/*]/, 'comment']],
    jsdoc: [[/[^\/*]+/, 'comment.doc'], [/\*\//, 'comment.doc', '@pop'], [/[\/*]/, 'comment.doc']],
    numbers: [[/(@digits)[eE]([\-+]?(@digits))?/, 'number.float'], [/(@digits)\.(@digits)([eE][\-+]?(@digits))?/, 'number.float'], [/0[xX](@hexdigits)n?/, 'number.hex'], [/0[oO]?(@octaldigits)n?/, 'number.octal'], [/0[bB](@binarydigits)n?/, 'number.binary'], [/(@digits)n?/, 'number']],
    strings: [[/"([^"\\]|\\.)*$/, 'string.invalid'],
    // non-teminated string
    [/'([^'\\]|\\.)*$/, 'string.invalid'],
    // non-teminated string
    [/"/, 'string', '@string_double'], [/'/, 'string', '@string_single'], [/`/, 'string', '@string_backtick']],
    regexp: [[/(\{)(\d+(?:,\d*)?)(\})/, ['regexp.escape.control', 'regexp.escape.control', 'regexp.escape.control']], [/(\[)(\^?)(?=(?:[^\]\\\/]|\\.)+)/, ['regexp.escape.control', {
      token: 'regexp.escape.control',
      next: '@regexrange'
    }]], [/(\()(\?:|\?=|\?!)/, ['regexp.escape.control', 'regexp.escape.control']], [/[()]/, 'regexp.escape.control'], [/@regexpctl/, 'regexp.escape.control'], [/[^\\\/]/, 'regexp'], [/@regexpesc/, 'regexp.escape'], [/\\\./, 'regexp.invalid'], [/(\/)([gimsuy]*)/, [{
      token: 'regexp',
      bracket: '@close',
      next: '@pop'
    }, 'keyword.other']]],
    regexrange: [[/-/, 'regexp.escape.control'], [/\^/, 'regexp.invalid'], [/@regexpesc/, 'regexp.escape'], [/[^\]]/, 'regexp'], [/\]/, {
      token: 'regexp.escape.control',
      next: '@pop',
      bracket: '@close'
    }]],
    string_double: [[/[^\\"]+/, 'string'], [/@escapes/, 'string.escape'], [/\\./, 'string.escape.invalid'], [/"/, 'string', '@pop']],
    string_single: [[/[^\\']+/, 'string'], [/@escapes/, 'string.escape'], [/\\./, 'string.escape.invalid'], [/'/, 'string', '@pop']],
    string_backtick: [[/\$\{/, 'delimiter', '@bracketCounting'], [/[^\\`$]+/, 'string'], [/@escapes/, 'string.escape'], [/\\./, 'string.escape.invalid'], [/`/, 'string', '@pop']],
    definitions: [[/(var|let|const) /, 'keyword', '@varDefinition'], [/(for|while) /, 'keyword', '@loopDefinition'], {
      include: 'functionDefinitions'
    }, [/(for|while)\(/, {
      token: 'keyword',
      goBack: 1,
      next: '@loopDefinition'
    }], {
      regex: /(class @validName\s*)(\{)/,
      action: [{
        token: 'keyword'
      }, {
        token: 'delimiter',
        next: '@classDefinition'
      }]
    }],
    functionDefinitions: [['function ', 'keyword', '@functionDefinition'], [/(get|set) \w+/, 'keyword', '@functionDefinition']],
    varDefinition: [{
      include: 'whitespace'
    }, [/@validName/, 'definition'], [/[,{}]/, 'delimiter'], [/[;]/, 'delimiter', '@pop'], [/[=]/, {
      token: 'delimiter',
      switchTo: '@varValue'
    }], [/[^a-zA-Z_$0-9]/, {
      token: 'delimiter',
      goBack: 1,
      next: '@pop'
    }]],
    varValue: [{
      include: 'whitespace'
    },
    // handle functions as values
    [/function/, {
      token: 'keyword',
      switchTo: '@functionDefinition'
    }], [/\((?=.*\=\>)/, {
      token: 'delimiter',
      switchTo: '@functionDefinition'
    }],
    // handle object as value
    [/[{]/, 'delimiter', '@bracketCountingProperty'],
    // other values
    [/[,]/, {
      token: 'delimiter',
      switchTo: '@varDefinition'
    }], [/;/, {
      token: 'delimiter',
      next: '@pop'
    }], [/\b/, {
      token: 'whitespace',
      next: '@pop'
    }],
    // handles exiting var context for primitives, booleans, and numbers
    [/}/, {
      token: '',
      goBack: 1,
      next: '@pop'
    }],
    // handle exiting var context for strings and objects

    {
      include: 'common'
    }],
    functionDefinition: [{
      include: 'whitespace'
    }, [/@validName/, 'definition'], [/[(),]/, 'delimiter'],
    // matches an equals sign but NOT => in the case of an arrow function
    [/=(?=[^>])/, 'delimiter', '@functionValue'], [/[{]/, {
      token: 'delimiter',
      switchTo: '@bracketCounting'
    }], [/[^a-zA-Z_$0-9]/, 'delimiter', '@pop']],
    functionValue: [[/[,)]/, 'delimiter', '@pop'], {
      include: 'bracketCounting'
    }],
    loopDefinition: [{
      include: 'whitespace'
    }, [/</, 'delimiter'], [/\)/, 'delimiter', '@pop'], {
      include: 'common'
    }],
    classDefinition: [{
      include: 'whitespace'
    }, {
      include: 'functionDefinitions'
    }, {
      include: 'property'
    }, {
      include: 'bracketCounting'
    }],
    arrayBracketCounting: [[/\[/, '@brackets', '@arrayBracketCounting'], [/\]/, '@brackets', '@pop'], {
      include: 'common'
    }],
    bracketCounting: [[/\{/, 'delimiter.bracket', '@bracketCounting'], [/\}/, 'delimiter.bracket', '@pop'], {
      include: 'common'
    }],
    bracketCountingProperty: [[/\{/, 'delimiter.bracket', '@bracketCountingProperty'], [/\}/, 'delimiter.bracket', '@pop'], {
      include: 'property'
    }, {
      include: 'common'
    }],
    property: [{
      include: 'whitespace'
    }, [/@validName/, 'property'], [/[,]/, 'delimiter'], [/[:]/, 'delimiter', '@propertyValue'], [/\(/, 'delimiter', '@propertyFuncValue'], [/\}/, 'delimiter', '@pop'], {
      include: 'bracketCounting'
    }, [/[^A-Za-z_$0-9]/, 'delimiter', '@pop']],
    propertyValue: [[/[,]/, 'delimiter', '@pop'], [/[}]/, {
      token: 'delimiter',
      goBack: 1,
      next: '@pop'
    }], {
      include: 'common'
    }],
    propertyFuncValue: [[/[,]/, 'delimiter'], [/[{]/, {
      token: 'delimiter',
      switchTo: '@bracketCounting'
    }], {
      include: 'common'
    }],
    attribute: [[/@validName/, 'property'], [/[}]/, {
      token: '',
      goBack: 1,
      next: '@pop'
    }],
    // handle attribute in string interpolation
    [/[\]]/, {
      token: '',
      goBack: 1,
      next: '@pop'
    }],
    // handle attribute in array brackets
    [/\)/, {
      token: '',
      goBack: 1,
      next: '@pop'
    }],
    // handle attribute in loop brackets
    [/[.]/, 'delimiter'], [/;/, '@rematch', '@pop'], [/[^A-Za-z_$0-9]/, 'delimiter', '@pop']]
  }
};