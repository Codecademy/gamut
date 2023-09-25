/*
This code was copied and modified per the Monaco team's suggestion from:
https://github.com/microsoft/monaco-languages/blob/master/src/javascript/javascript.ts

We did this because the built-in Monarch JS tokenizer is not rich enough to match our highlighting needs.
See also this file for how to use a language:
https://github.com/microsoft/monaco-languages/blob/master/src/_.contribution.ts
*/

import * as typescriptLanguage from '../typescript/typescriptLanguage';

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export { createConfiguration } from '../typescript/typescriptLanguage';
export var definition = {
  defaultToken: 'default',
  tokenPostfix: '.codecademy-js',
  keywords: ['async', 'await', 'break', 'case', 'catch', 'class', 'continue', 'const', 'debugger', 'default', 'delete', 'do', 'else', 'export', 'extends', 'finally', 'for', 'function', 'if', 'import', 'in', 'instanceof', 'let', 'new', 'return', 'super', 'switch', 'this', 'throw', 'try', 'typeof', 'var', 'void', 'while', 'with', 'yield'],
  primitives: typescriptLanguage.primitives,
  typeKeywords: [],
  operators: typescriptLanguage.definition.operators,
  symbols: typescriptLanguage.definition.symbols,
  escapes: typescriptLanguage.definition.escapes,
  digits: typescriptLanguage.definition.digits,
  octaldigits: typescriptLanguage.definition.octaldigits,
  binarydigits: typescriptLanguage.definition.binarydigits,
  hexdigits: typescriptLanguage.definition.hexdigits,
  regexpctl: typescriptLanguage.definition.regexpctl,
  regexpesc: typescriptLanguage.definition.regexpesc,
  tokenizer: typescriptLanguage.definition.tokenizer,
  whitespace: typescriptLanguage.definition.whitespace,
  validName: typescriptLanguage.definition.validName
};