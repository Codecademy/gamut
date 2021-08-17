import type * as monaco from 'monaco-editor';

import { CodecademyColors } from './colorsCodecademyThemed';
import { darkColors } from './colorsDark';
import type { MonacoThemeColors } from './types';

const c = (color: string) => color.substr(1);

const theme = ({
  ui,
  syntax,
}: MonacoThemeColors): monaco.editor.IStandaloneThemeData => ({
  base: 'vs-dark',
  inherit: true,
  rules: [
    // Base
    { token: '', foreground: c(syntax.basic) },
    { token: 'regexp', foreground: c(syntax.regexp) },
    { token: 'annotation', foreground: c(syntax.annotation) },
    { token: 'type', foreground: c(syntax.annotation) },
    { token: 'doctype', foreground: c(syntax.comment) },
    { token: 'delimiter', foreground: c(syntax.decoration) },
    { token: 'invalid', foreground: c(syntax.invalid) },
    { token: 'emphasis', fontStyle: 'italic' },
    { token: 'strong', fontStyle: 'bold' },
    { token: 'variable', foreground: c(syntax.variable) },
    { token: 'variable.predefined', foreground: c(syntax.variable) },
    { token: 'constant', foreground: c(syntax.constant) },
    { token: 'comment', foreground: c(syntax.comment) },
    { token: 'number', foreground: c(syntax.number) },
    { token: 'number.hex', foreground: c(syntax.number) },
    { token: 'keyword.directive', foreground: c(syntax.comment) },
    { token: 'include', foreground: c(syntax.comment) },
    { token: 'key', foreground: c(syntax.property) },
    { token: 'attribute.name', foreground: c(syntax.attribute) },
    { token: 'attribute.name-numeric', foreground: c(syntax.string) },
    { token: 'attribute.value', foreground: c(syntax.property) },
    { token: 'attribute.value.number', foreground: c(syntax.number) },
    { token: 'string', foreground: c(syntax.string) },
    { token: 'string.yaml', foreground: c(syntax.string) },
    { token: 'tag', foreground: c(syntax.tag) },
    { token: 'tag.id.jade', foreground: c(syntax.tag) },
    { token: 'tag.class.jade', foreground: c(syntax.tag) },
    { token: 'metatag', foreground: c(syntax.comment) },
    { token: 'attribute.value.unit', foreground: c(syntax.string) },
    { token: 'keyword', foreground: c(syntax.keyword) },
    { token: 'keyword.flow', foreground: c(syntax.keyword) },

    // XML
    { token: 'attribute.value.xml', foreground: c(syntax.string) },
    { token: 'delimiter.xml', foreground: c(syntax.decoration) },
    { token: 'metatag.xml', foreground: c(syntax.comment) },

    // JSON
    { token: 'string.key.json', foreground: c(syntax.property) },
    { token: 'string.value.json', foreground: c(syntax.string) },
    { token: 'keyword.json', foreground: c(syntax.keyword) },

    // C++
    { token: 'cpp', foreground: c(syntax.constant) },
    { token: 'number.cpp', foreground: c(syntax.text) },
    { token: 'number.float.cpp', foreground: c(syntax.text) },
    { token: 'delimiter.cpp', foreground: c(syntax.predefined) },
    { token: 'delimiter.angle.cpp', foreground: c(syntax.predefined) },
    { token: 'delimiter.curly.cpp', foreground: c(syntax.predefined) },
    { token: 'delimiter.parenthesis.cpp', foreground: c(syntax.predefined) },
    { token: 'delimiter.square.cpp', foreground: c(syntax.predefined) },
    { token: 'keyword.cpp', foreground: c(syntax.comment) },
    { token: 'string.include.identifier.cpp', foreground: c(syntax.comment) },

    // C#
    { token: 'number.cs', foreground: c(syntax.text) },
    { token: 'number.float.cs', foreground: c(syntax.text) },
    { token: 'delimiter.cs', foreground: c(syntax.predefined) },
    { token: 'delimiter.angle.cs', foreground: c(syntax.predefined) },
    { token: 'delimiter.curly.cs', foreground: c(syntax.predefined) },
    { token: 'delimiter.parenthesis.cs', foreground: c(syntax.predefined) },
    { token: 'delimiter.square.cs', foreground: c(syntax.predefined) },

    // Java
    { token: 'default.codecademy-java', foreground: c(syntax.text) },
    { token: 'identifier.codecademy-java', foreground: c(syntax.text) },
    { token: 'number.codecademy-java', foreground: c(syntax.text) },
    { token: 'number.float.codecademy-java', foreground: c(syntax.text) },
    { token: 'delimiter.codecademy-java', foreground: c(syntax.predefined) },
    {
      token: 'delimiter.angle.codecademy-java',
      foreground: c(syntax.predefined),
    },
    {
      token: 'delimiter.curly.codecademy-java',
      foreground: c(syntax.predefined),
    },
    {
      token: 'delimiter.parenthesis.codecademy-java',
      foreground: c(syntax.predefined),
    },
    {
      token: 'delimiter.square.codecademy-java',
      foreground: c(syntax.predefined),
    },
    { token: 'keyword.codecademy-java', foreground: c(syntax.keyword) },
    { token: 'bool.codecademy-java', foreground: c(syntax.atom) },
    { token: 'class.codecademy-java', foreground: c(syntax.keyword) },
    { token: 'classname.codecademy-java', foreground: c(syntax.keyword) },
    { token: 'subkeyword.codecademy-java', foreground: c(syntax.text) },

    // Kotlin
    { token: 'number.codecademy-kt', foreground: c(syntax.text) },
    { token: 'number.float.codecademy-kt', foreground: c(syntax.text) },
    { token: 'bool.codecademy-kt', foreground: c(syntax.atom) },
    {
      token: 'identifier.classname.codecademy-kt',
      foreground: c(syntax.keyword),
    },
    {
      token: 'identifier.varname.codecademy-kt',
      foreground: c(syntax.keyword),
    },
    {
      token: 'identifier.valname.codecademy-kt',
      foreground: c(syntax.keyword),
    },
    {
      token: 'identifier.functionName.codecademy-kt',
      foreground: c(syntax.keyword),
    },
    { token: 'keyword.class.codecademy-kt', foreground: c(syntax.keyword) },
    { token: 'label.codecademy-kt', foreground: c(syntax.annotation) },
    { token: 'identifier.codecademy-kt', foreground: c(syntax.text) },
    {
      token: 'delimiter.parenthesis.codecademy-kt',
      foreground: c(syntax.predefined),
    },
    {
      token: 'delimiter.square.codecademy-kt',
      foreground: c(syntax.predefined),
    },
    { token: 'delimiter.codecademy-kt', foreground: c(syntax.predefined) },
    {
      token: 'delimiter.curly.codecademy-kt',
      foreground: c(syntax.predefined),
    },
    {
      token: 'delimiter.angle.codecademy-kt',
      foreground: c(syntax.predefined),
    },

    // Go
    { token: 'default.codecademy-go', foreground: c(syntax.basic) },
    { token: 'identifier.codecademy-go', foreground: c(syntax.text) },
    { token: 'primitive.codecademy-go', foreground: c(syntax.atom) },
    { token: 'delimiter.codecademy-go', foreground: c(syntax.predefined) },
    {
      token: 'delimiter.parenthesis.codecademy-go',
      foreground: c(syntax.predefined),
    },
    {
      token: 'delimiter.curly.codecademy-go',
      foreground: c(syntax.predefined),
    },
    {
      token: 'delimiter.angle.codecademy-go',
      foreground: c(syntax.predefined),
    },
    {
      token: 'delimiter.square.codecademy-go',
      foreground: c(syntax.predefined),
    },
    { token: 'number.codecademy-go', foreground: c(syntax.text) },
    { token: 'number.float.codecademy-go', foreground: c(syntax.text) },

    // HTML
    { token: 'default.codecademy-html', foreground: c(syntax.basic) },
    { token: 'delimiter.codecademy-html', foreground: c(syntax.decoration) },
    { token: 'equals.codecademy-html', foreground: c(syntax.predefined) },
    { token: 'metatag.content.codecademy-html', foreground: c(syntax.comment) },
    { token: 'metatag.codecademy-html', foreground: c(syntax.comment) },
    { token: 'attribute.value.codecademy-html', foreground: c(syntax.string) },
    { token: 'string.codecademy-html', foreground: c(syntax.string) },

    // CSS
    { token: 'default.codecademy-css', foreground: c(syntax.constant) },
    { token: 'number.codecademy-css', foreground: c(syntax.text) },
    { token: 'delimiter.codecademy-css', foreground: c(syntax.predefined) },
    {
      token: 'delimiter.bracket.codecademy-css',
      foreground: c(syntax.predefined),
    },
    {
      token: 'delimiter.curly.codecademy-css',
      foreground: c(syntax.predefined),
    },
    {
      token: 'delimiter.parenthesis.codecademy-css',
      foreground: c(syntax.predefined),
    },
    {
      token: 'delimiter.square.codecademy-css',
      foreground: c(syntax.predefined),
    },
    { token: 'delimiter.codecademy-css', foreground: c(syntax.predefined) },
    {
      token: 'keyword.media.type.value.codecademy-css',
      foreground: c(syntax.attribute),
    },
    {
      token: 'keyword.media.value.value.codecademy-css',
      foreground: c(syntax.keyword),
    },
    {
      token: 'keyword.property.value.codecademy-css',
      foreground: c(syntax.key),
    },
    { token: 'keyword.name.codecademy-css', foreground: c(syntax.key) },
    {
      token: 'selector-class.codecademy-css',
      foreground: c(syntax.attribute),
    },
    {
      token: 'selector-colon.codecademy-css',
      foreground: c(syntax.predefined),
    },
    { token: 'selector-id.codecademy-css', foreground: c(syntax.predefined) },
    { token: 'meta.codecademy-css', foreground: c(syntax.tag) },
    { token: 'meta-parens.codecademy-css', foreground: c(syntax.predefined) },
    { token: 'meta-url.codecademy-css', foreground: c(syntax.text) },
    {
      token: 'attribute.name.codecademy-css',
      foreground: c(syntax.predefined),
    },
    {
      token: 'attribute.value.codecademy-css',
      foreground: c(syntax.constant),
    },
    {
      token: 'attribute.value.number.codecademy-css',
      foreground: c(syntax.text),
    },
    {
      token: 'attribute.value.unit.codecademy-css',
      foreground: c(syntax.text),
    },
    { token: 'keyword.flow.codecademy-css', foreground: c(syntax.keyword) },
    { token: 'keyword.value.codecademy-css', foreground: c(syntax.atom) },
    { token: 'operator.codecademy-css', foreground: c(syntax.predefined) },
    { token: 'operator-word.codecademy-css', foreground: c(syntax.keyword) },

    // SCSS
    {
      token: 'delimiter.codecademy-scss',
      foreground: c(syntax.predefined),
    },
    {
      token: 'delimiter.bracket.codecademy-scss',
      foreground: c(syntax.predefined),
    },
    {
      token: 'delimiter.curly.codecademy-scss',
      foreground: c(syntax.predefined),
    },
    {
      token: 'delimiter.parenthesis.codecademy-scss',
      foreground: c(syntax.predefined),
    },
    {
      token: 'delimiter.square.codecademy-scss',
      foreground: c(syntax.predefined),
    },
    { token: 'number.codecademy-scss', foreground: c(syntax.text) },
    { token: 'operator.codecademy-scss', foreground: c(syntax.predefined) },
    { token: 'operator-word.codecademy-scss', foreground: c(syntax.keyword) },
    {
      token: 'selector-class.codecademy-scss',
      foreground: c(syntax.attribute),
    },
    { token: 'selector-id.codecademy-scss', foreground: c(syntax.predefined) },
    {
      token: 'selector-colon.codecademy-scss',
      foreground: c(syntax.predefined),
    },
    { token: 'variable.decl.codecademy-scss', foreground: c(syntax.constant) },
    { token: 'variable.ref.codecademy-scss', foreground: c(syntax.constant) },
    { token: 'keyword.name.codecademy-scss', foreground: c(syntax.key) },
    { token: 'keyword.flow.codecademy-scss', foreground: c(syntax.keyword) },
    { token: 'keyword.value.codecademy-scss', foreground: c(syntax.atom) },
    {
      token: 'keyword.control.codecademy-scss',
      foreground: c(syntax.operator),
    },
    {
      token: 'keyword.media.type.value.codecademy-scss',
      foreground: c(syntax.attribute),
    },
    {
      token: 'keyword.media.value.value.codecademy-scss',
      foreground: c(syntax.keyword),
    },
    {
      token: 'keyword.property.value.codecademy-scss',
      foreground: c(syntax.atom),
    },
    { token: 'meta.codecademy-scss', foreground: c(syntax.predefined) },
    { token: 'meta-parens.codecademy-scss', foreground: c(syntax.predefined) },
    { token: 'meta-url.codecademy-scss', foreground: c(syntax.text) },
    { token: 'attribute.name.codecademy-scss', foreground: c(syntax.key) },
    { token: 'attribute.value.codecademy-scss', foreground: c(syntax.keyword) },
    {
      token: 'function.invoke.codecademy-scss',
      foreground: c(syntax.constant),
    },

    // Swift
    {
      token: 'class.codecademy-swift',
      foreground: c(syntax.keyword),
    },
    {
      token: 'delimiter.codecademy-swift',
      foreground: c(syntax.basic),
    },
    {
      token: 'delimiter.curly.codecademy-swift',
      foreground: c(syntax.basic),
    },
    {
      token: 'delimiter.parenthesis.codecademy-swift',
      foreground: c(syntax.basic),
    },
    {
      token: 'delimiter.square.codecademy-swift',
      foreground: c(syntax.basic),
    },
    {
      token: 'forVariable.codecademy-swift',
      foreground: c(syntax.keyword),
    },
    {
      token: 'functionDeclaration.codecademy-swift',
      foreground: c(syntax.keyword),
    },
    {
      token: 'loopDeclaration.codecademy-swift',
      foreground: c(syntax.keyword),
    },
    { token: 'identifier.codecademy-swift', foreground: c(syntax.constant) },
    {
      token: 'identifier.unused.codecademy-swift',
      foreground: c(syntax.atom),
    },
    { token: 'init.codecademy-swift', foreground: c(syntax.keyword) },
    {
      token: 'invokedFunction.codecademy-swift',
      foreground: c(syntax.constant),
    },
    { token: 'keyword.self.codecademy-swift', foreground: c(syntax.atom) },
    { token: 'member.codecademy-swift', foreground: c(syntax.key) },
    { token: 'number.codecademy-swift', foreground: c(syntax.constant) },
    { token: 'operator.codecademy-swift', foreground: c(syntax.basic) },
    {
      token: 'operator.parenthesis.codecademy-swift',
      foreground: c(syntax.string),
    },
    {
      token: 'structDeclaration.codecademy-swift',
      foreground: c(syntax.keyword),
    },
    {
      token: 'type.identifier.codecademy-swift',
      foreground: c(syntax.constant),
    },
    {
      token: 'variableDeclaration.codecademy-swift',
      foreground: c(syntax.keyword),
    },

    // SQLite
    { token: 'default.codecademy-sql', foreground: c(syntax.constant) },
    { token: 'string.codecademy-sql', foreground: c(syntax.string) },
    { token: 'operator.codecademy-sql', foreground: c(syntax.basic) },
    { token: 'null.codecademy-sql', foreground: c(syntax.atom) },
    { token: 'predefined.codecademy-sql', foreground: c(syntax.keyword) },
    { token: 'identifier.codecademy-sql', foreground: c(syntax.basic) },
    { token: 'delimiter.codecademy-sql', foreground: c(syntax.basic) },
    { token: 'number.codecademy-sql', foreground: c(syntax.constant) },

    // Javascript
    { token: 'default.codecademy-js', foreground: c(syntax.invalid) },
    { token: 'identifier.codecademy-js', foreground: c(syntax.text) },
    { token: 'type.codecademy-js', foreground: c(syntax.keyword) },
    { token: 'definition.codecademy-js', foreground: c(syntax.keyword) },
    { token: 'keyword.codecademy-js', foreground: c(syntax.keyword) },
    { token: 'primitive.codecademy-js', foreground: c(syntax.atom) },
    { token: 'number.codecademy-js', foreground: c(syntax.text) },
    { token: 'property.codecademy-js', foreground: c(syntax.key) },

    { token: 'delimiter.codecademy-js', foreground: c(syntax.basic) },
    {
      token: 'delimiter.parenthesis.codecademy-js',
      foreground: c(syntax.basic),
    },
    {
      token: 'delimiter.square.codecademy-js',
      foreground: c(syntax.basic),
    },
    { token: 'delimiter.bracket.codecademy-js', foreground: c(syntax.basic) },
    { token: 'delimiter.curly.codecademy-js', foreground: c(syntax.basic) },
    { token: 'delimiter.angle.codecademy-js', foreground: c(syntax.basic) },
    { token: 'delimiter.tag.codecademy-js', foreground: c(syntax.tag) },
    { token: 'text.codecademy-js', foreground: c(syntax.basic) },
    { token: 'regexp.codecademy-js', foreground: c(syntax.basic) },
    {
      token: 'tag.definition.codecademy-js',
      foreground: c(syntax.tag),
    },
    {
      token: 'regexp.escape.control.codecademy-js',
      foreground: c(syntax.basic),
    },
    { token: 'regexp.escape.codecademy-js', foreground: c(syntax.basic) },
    { token: 'prop.definition.codecademy-js', foreground: c(syntax.attribute) },
    { token: 'keyword.other.codecademy-js', foreground: c(syntax.basic) },

    // PHP
    {
      token: 'attribute.name.codecademy-php',
      foreground: c(syntax.constant),
    },
    {
      token: 'attribute.value.codecademy-php',
      foreground: c(syntax.value),
    },
    { token: 'boolean.codecademy-php', foreground: c(syntax.atom) },
    { token: 'delimiter.codecademy-php', foreground: c(syntax.predefined) },
    { token: 'constant.compiled.codecademy-php', foreground: c(syntax.atom) },
    {
      token: 'delimiter.bracket.codecademy-php',
      foreground: c(syntax.predefined),
    },
    {
      token: 'delimiter.curly.codecademy-php',
      foreground: c(syntax.predefined),
    },
    {
      token: 'delimiter.parenthesis.codecademy-php',
      foreground: c(syntax.predefined),
    },
    {
      token: 'delimiter.square.codecademy-php',
      foreground: c(syntax.predefined),
    },
    {
      token: 'delimiter.html.codecademy-php',
      foreground: c(syntax.predefined),
    },
    { token: 'html.codecademy-php', foreground: c(syntax.constant) },
    {
      token: 'identifier.codecademy-php',
      foreground: c(syntax.keyword),
    },
    { token: 'member.codecademy-php', foreground: c(syntax.text) },
    { token: 'metatag.codecademy-php', foreground: c(syntax.keyword) },
    { token: 'phptag.codecademy-php', foreground: c(syntax.constant) },
    { token: 'tag.html.codecademy-php', foreground: c(syntax.constant) },
    { token: 'variable.codecademy-php', foreground: c(syntax.text) },
    { token: 'variable.predefined.codecademy-php', foreground: c(syntax.text) },

    // Python
    { token: 'default.codecademy-python', foreground: c(syntax.constant) },
    { token: 'subkeyword.codecademy-python', foreground: c(syntax.basic) },
    {
      token: 'delimiter.parenthesis.codecademy-python',
      foreground: c(syntax.basic),
    },
    {
      token: 'delimiter.bracket.codecademy-python',
      foreground: c(syntax.basic),
    },
    { token: 'delimiter.curly.codecademy-python', foreground: c(syntax.basic) },
    { token: 'delimiter.codecademy-python', foreground: c(syntax.basic) },
    { token: 'number.codecademy-python', foreground: c(syntax.constant) },
    { token: 'operator.codecademy-python', foreground: c(syntax.basic) },
    { token: 'definition.codecademy-python', foreground: c(syntax.keyword) },
    { token: 'classMember.codecademy-python', foreground: c(syntax.key) },
    { token: 'identifier.codecademy-python', foreground: c(syntax.text) },

    // R
    { token: 'atom.codecademy-r', foreground: c(syntax.atom) },
    { token: 'comment-markdown.codecademy-r', foreground: c(syntax.key) },
    { token: 'constant.codecademy-r', foreground: c(syntax.atom) },
    {
      token: 'delimiter.codecademy-r',
      foreground: c(syntax.predefined),
    },
    {
      token: 'delimiter.comma.codecademy-r',
      foreground: c(syntax.predefined),
    },
    {
      token: 'delimiter.curly.codecademy-r',
      foreground: c(syntax.predefined),
    },
    {
      token: 'delimiter.parenthesis.codecademy-r',
      foreground: c(syntax.predefined),
    },
    { token: 'identifier.codecademy-r', foreground: c(syntax.constant) },
    { token: 'newline.codecademy-r', foreground: c(syntax.constant) },
    { token: 'number.codecademy-r', foreground: c(syntax.constant) },

    // Ruby
    { token: 'keyword.codecademy-ruby', foreground: c(syntax.text) },
    { token: 'keywordop.codecademy-ruby', foreground: c(syntax.basic) },
    { token: 'subkeyword.codecademy-ruby', foreground: c(syntax.keyword) },
    { token: 'builtin.codecademy-ruby', foreground: c(syntax.keyword) },
    { token: 'methodname.codecademy-ruby', foreground: c(syntax.keyword) },
    { token: 'identifier.codecademy-ruby', foreground: c(syntax.text) },
    { token: 'invocation.codecademy-ruby', foreground: c(syntax.key) },
    { token: 'enumelement.codecademy-ruby', foreground: c(syntax.keyword) },
    {
      token: 'constructor.identifier.codecademy-ruby',
      foreground: c(syntax.operator),
    },
    {
      token: 'namespace.instance.identifier.codecademy-ruby',
      foreground: c(syntax.text),
    },
    {
      token: 'namespace.class.identifier.codecademy-ruby',
      foreground: c(syntax.text),
    },
    {
      token: 'delimiter.parenthesis.codecademy-ruby',
      foreground: c(syntax.basic),
    },
    { token: 'string.s.codecademy-ruby', foreground: c(syntax.atom) },
    { token: 'delimiter.curly.codecademy-ruby', foreground: c(syntax.basic) },
    { token: 'delimiter.square.codecademy-ruby', foreground: c(syntax.basic) },
    { token: 'number.codecademy-ruby', foreground: c(syntax.text) },
    { token: 'regexp.codecademy-ruby', foreground: c(syntax.basic) },
    { token: 'regexp.delim.codecademy-ruby', foreground: c(syntax.basic) },
    { token: 'regexp.escape.codecademy-ruby', foreground: c(syntax.basic) },
    {
      token: 'regexp.escape.control.codecademy-ruby',
      foreground: c(syntax.basic),
    },

    // C Sharp
    { token: 'default.codecademy-cs', foreground: c(syntax.text) },
    { token: 'namespace.codecademy-cs', foreground: c(syntax.keyword) },
    { token: 'className.codecademy-cs', foreground: c(syntax.keyword) },
    { token: 'inheritsDelimiter.codecademy-cs', foreground: c(syntax.keyword) },
    { token: 'identifier.codecademy-cs', foreground: c(syntax.text) },
    { token: 'delimiter.codecademy-cs', foreground: c(syntax.basic) },
    { token: 'delimiter.curly.codecademy-cs', foreground: c(syntax.basic) },
    { token: 'delimiter.square.codecademy-cs', foreground: c(syntax.basic) },
    {
      token: 'delimiter.parenthesis.codecademy-cs',
      foreground: c(syntax.basic),
    },
    { token: 'delimiter.angle.codecademy-cs', foreground: c(syntax.basic) },
    { token: 'number.codecademy-cs', foreground: c(syntax.text) },
    { token: 'booleanKeyword.codecademy-cs', foreground: c(syntax.atom) },
    { token: 'typeKeyword.codecademy-cs', foreground: c(syntax.text) },

    // Razor (ASP.NET)
    { token: 'default.codecademy-razor', foreground: c(syntax.text) },
    { token: 'namespace.codecademy-razor', foreground: c(syntax.keyword) },
    { token: 'className.codecademy-razor', foreground: c(syntax.keyword) },
    {
      token: 'inheritsDelimiter.codecademy-razor',
      foreground: c(syntax.keyword),
    },
    { token: 'metatag.codecademy-razor', foreground: c(syntax.text) },
    { token: 'metaKeyword.codecademy-razor', foreground: c(syntax.text) },
    {
      token: 'controlMetaKeyword.codecademy-razor',
      foreground: c(syntax.text),
    },
    { token: 'identifier.codecademy-razor', foreground: c(syntax.text) },
    { token: 'delimiter.codecademy-razor', foreground: c(syntax.basic) },
    { token: 'delimiter.curly.codecademy-razor', foreground: c(syntax.basic) },
    { token: 'delimiter.square.codecademy-razor', foreground: c(syntax.basic) },
    {
      token: 'delimiter.parenthesis.codecademy-razor',
      foreground: c(syntax.basic),
    },
    { token: 'delimiter.angle.codecademy-razor', foreground: c(syntax.basic) },
    { token: 'number.codecademy-razor', foreground: c(syntax.text) },
    { token: 'booleanKeyword.codecademy-razor', foreground: c(syntax.atom) },
    { token: 'typeKeyword.codecademy-razor', foreground: c(syntax.keyword) },

    // C++
    { token: 'default.codecademy-cpp', foreground: c(syntax.text) },
    { token: 'identifier.codecademy-cpp', foreground: c(syntax.text) },
    {
      token: 'string.include.identifier.codecademy-cpp',
      foreground: c(syntax.comment),
    },
    { token: 'number.codecademy-cpp', foreground: c(syntax.text) },
    { token: 'identifierKeyword.codecademy-cpp', foreground: c(syntax.text) },
    {
      token: 'unrecognizedKeyword.codecademy-cpp',
      foreground: c(syntax.basic),
    },
    { token: 'specialKeyword.codecademy-cpp', foreground: c(syntax.atom) },
    { token: 'className.codecademy-cpp', foreground: c(syntax.keyword) },
    { token: 'functionName.codecademy-cpp', foreground: c(syntax.keyword) },
    { token: 'inlineSetter.codecademy-cpp', foreground: c(syntax.text) },
    {
      token: 'functionName.classDefinition.codecademy-cpp',
      foreground: c(syntax.text),
    },
    { token: 'delimiter.codecademy-cpp', foreground: c(syntax.basic) },
    { token: 'delimiter.curly.codecademy-cpp', foreground: c(syntax.basic) },
    { token: 'delimiter.square.codecademy-cpp', foreground: c(syntax.basic) },
    {
      token: 'delimiter.parenthesis.codecademy-cpp',
      foreground: c(syntax.basic),
    },
  ],
  colors: {
    'editor.background': ui.background,
    'editor.foreground': ui.text,
    'editorIndentGuide.background': ui.indentInactive,
    'editorIndentGuide.activeBackground': ui.indentActive,
    'editorWhitespace.foreground': syntax.comment,
  },
});

export const darkTheme = theme(darkColors);
export const CodecademyTheme = theme(CodecademyColors);
