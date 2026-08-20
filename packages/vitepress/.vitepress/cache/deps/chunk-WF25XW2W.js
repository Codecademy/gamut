// ../../node_modules/stylis/src/Enum.js
var MS = '-ms-';
var MOZ = '-moz-';
var WEBKIT = '-webkit-';
var COMMENT = 'comm';
var RULESET = 'rule';
var DECLARATION = 'decl';
var PAGE = '@page';
var MEDIA = '@media';
var IMPORT = '@import';
var CHARSET = '@charset';
var VIEWPORT = '@viewport';
var SUPPORTS = '@supports';
var DOCUMENT = '@document';
var NAMESPACE = '@namespace';
var KEYFRAMES = '@keyframes';
var FONT_FACE = '@font-face';
var COUNTER_STYLE = '@counter-style';
var FONT_FEATURE_VALUES = '@font-feature-values';
var LAYER = '@layer';

// ../../node_modules/stylis/src/Utility.js
var abs = Math.abs;
var from = String.fromCharCode;
var assign = Object.assign;
function hash(value, length2) {
  return charat(value, 0) ^ 45
    ? (((((((length2 << 2) ^ charat(value, 0)) << 2) ^ charat(value, 1)) << 2) ^
        charat(value, 2)) <<
        2) ^
        charat(value, 3)
    : 0;
}
function trim(value) {
  return value.trim();
}
function match(value, pattern) {
  return (value = pattern.exec(value)) ? value[0] : value;
}
function replace(value, pattern, replacement) {
  return value.replace(pattern, replacement);
}
function indexof(value, search) {
  return value.indexOf(search);
}
function charat(value, index) {
  return value.charCodeAt(index) | 0;
}
function substr(value, begin, end) {
  return value.slice(begin, end);
}
function strlen(value) {
  return value.length;
}
function sizeof(value) {
  return value.length;
}
function append(value, array) {
  return array.push(value), value;
}
function combine(array, callback) {
  return array.map(callback).join('');
}

// ../../node_modules/stylis/src/Tokenizer.js
var line = 1;
var column = 1;
var length = 0;
var position = 0;
var character = 0;
var characters = '';
function node(value, root, parent, type, props, children, length2) {
  return {
    value,
    root,
    parent,
    type,
    props,
    children,
    line,
    column,
    length: length2,
    return: '',
  };
}
function copy(root, props) {
  return assign(
    node('', null, null, '', null, null, 0),
    root,
    { length: -root.length },
    props
  );
}
function char() {
  return character;
}
function prev() {
  character = position > 0 ? charat(characters, --position) : 0;
  if ((column--, character === 10)) (column = 1), line--;
  return character;
}
function next() {
  character = position < length ? charat(characters, position++) : 0;
  if ((column++, character === 10)) (column = 1), line++;
  return character;
}
function peek() {
  return charat(characters, position);
}
function caret() {
  return position;
}
function slice(begin, end) {
  return substr(characters, begin, end);
}
function token(type) {
  switch (type) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4;
    case 58:
      return 3;
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function alloc(value) {
  return (
    (line = column = 1),
    (length = strlen((characters = value))),
    (position = 0),
    []
  );
}
function dealloc(value) {
  return (characters = ''), value;
}
function delimit(type) {
  return trim(
    slice(
      position - 1,
      delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)
    )
  );
}
function tokenize(value) {
  return dealloc(tokenizer(alloc(value)));
}
function whitespace(type) {
  while ((character = peek()))
    if (character < 33) next();
    else break;
  return token(type) > 2 || token(character) > 3 ? '' : ' ';
}
function tokenizer(children) {
  while (next())
    switch (token(character)) {
      case 0:
        append(identifier(position - 1), children);
        break;
      case 2:
        append(delimit(character), children);
        break;
      default:
        append(from(character), children);
    }
  return children;
}
function escaping(index, count) {
  while (--count && next())
    if (
      character < 48 ||
      character > 102 ||
      (character > 57 && character < 65) ||
      (character > 70 && character < 97)
    )
      break;
  return slice(index, caret() + (count < 6 && peek() == 32 && next() == 32));
}
function delimiter(type) {
  while (next())
    switch (character) {
      case type:
        return position;
      case 34:
      case 39:
        if (type !== 34 && type !== 39) delimiter(character);
        break;
      case 40:
        if (type === 41) delimiter(type);
        break;
      case 92:
        next();
        break;
    }
  return position;
}
function commenter(type, index) {
  while (next())
    if (type + character === 47 + 10) break;
    else if (type + character === 42 + 42 && peek() === 47) break;
  return (
    '/*' + slice(index, position - 1) + '*' + from(type === 47 ? type : next())
  );
}
function identifier(index) {
  while (!token(peek())) next();
  return slice(index, position);
}

// ../../node_modules/stylis/src/Parser.js
function compile(value) {
  return dealloc(
    parse('', null, null, null, [''], (value = alloc(value)), 0, [0], value)
  );
}
function parse(
  value,
  root,
  parent,
  rule,
  rules,
  rulesets,
  pseudo,
  points,
  declarations
) {
  var index = 0;
  var offset = 0;
  var length2 = pseudo;
  var atrule = 0;
  var property = 0;
  var previous = 0;
  var variable = 1;
  var scanning = 1;
  var ampersand = 1;
  var character2 = 0;
  var type = '';
  var props = rules;
  var children = rulesets;
  var reference = rule;
  var characters2 = type;
  while (scanning)
    switch (((previous = character2), (character2 = next()))) {
      case 40:
        if (previous != 108 && charat(characters2, length2 - 1) == 58) {
          if (
            indexof(
              (characters2 += replace(delimit(character2), '&', '&\f')),
              '&\f'
            ) != -1
          )
            ampersand = -1;
          break;
        }
      case 34:
      case 39:
      case 91:
        characters2 += delimit(character2);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        characters2 += whitespace(previous);
        break;
      case 92:
        characters2 += escaping(caret() - 1, 7);
        continue;
      case 47:
        switch (peek()) {
          case 42:
          case 47:
            append(
              comment(commenter(next(), caret()), root, parent),
              declarations
            );
            break;
          default:
            characters2 += '/';
        }
        break;
      case 123 * variable:
        points[index++] = strlen(characters2) * ampersand;
      case 125 * variable:
      case 59:
      case 0:
        switch (character2) {
          case 0:
          case 125:
            scanning = 0;
          case 59 + offset:
            if (ampersand == -1) characters2 = replace(characters2, /\f/g, '');
            if (property > 0 && strlen(characters2) - length2)
              append(
                property > 32
                  ? declaration(characters2 + ';', rule, parent, length2 - 1)
                  : declaration(
                      replace(characters2, ' ', '') + ';',
                      rule,
                      parent,
                      length2 - 2
                    ),
                declarations
              );
            break;
          case 59:
            characters2 += ';';
          default:
            append(
              (reference = ruleset(
                characters2,
                root,
                parent,
                index,
                offset,
                rules,
                points,
                type,
                (props = []),
                (children = []),
                length2
              )),
              rulesets
            );
            if (character2 === 123)
              if (offset === 0)
                parse(
                  characters2,
                  root,
                  reference,
                  reference,
                  props,
                  rulesets,
                  length2,
                  points,
                  children
                );
              else
                switch (
                  atrule === 99 && charat(characters2, 3) === 110 ? 100 : atrule
                ) {
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    parse(
                      value,
                      reference,
                      reference,
                      rule &&
                        append(
                          ruleset(
                            value,
                            reference,
                            reference,
                            0,
                            0,
                            rules,
                            points,
                            type,
                            rules,
                            (props = []),
                            length2
                          ),
                          children
                        ),
                      rules,
                      children,
                      length2,
                      points,
                      rule ? props : children
                    );
                    break;
                  default:
                    parse(
                      characters2,
                      reference,
                      reference,
                      reference,
                      [''],
                      children,
                      0,
                      points,
                      children
                    );
                }
        }
        (index = offset = property = 0),
          (variable = ampersand = 1),
          (type = characters2 = ''),
          (length2 = pseudo);
        break;
      case 58:
        (length2 = 1 + strlen(characters2)), (property = previous);
      default:
        if (variable < 1) {
          if (character2 == 123) --variable;
          else if (character2 == 125 && variable++ == 0 && prev() == 125)
            continue;
        }
        switch (((characters2 += from(character2)), character2 * variable)) {
          case 38:
            ampersand = offset > 0 ? 1 : ((characters2 += '\f'), -1);
            break;
          case 44:
            (points[index++] = (strlen(characters2) - 1) * ampersand),
              (ampersand = 1);
            break;
          case 64:
            if (peek() === 45) characters2 += delimit(next());
            (atrule = peek()),
              (offset = length2 =
                strlen((type = characters2 += identifier(caret())))),
              character2++;
            break;
          case 45:
            if (previous === 45 && strlen(characters2) == 2) variable = 0;
        }
    }
  return rulesets;
}
function ruleset(
  value,
  root,
  parent,
  index,
  offset,
  rules,
  points,
  type,
  props,
  children,
  length2
) {
  var post = offset - 1;
  var rule = offset === 0 ? rules : [''];
  var size = sizeof(rule);
  for (var i = 0, j = 0, k = 0; i < index; ++i)
    for (
      var x = 0,
        y = substr(value, post + 1, (post = abs((j = points[i])))),
        z = value;
      x < size;
      ++x
    )
      if ((z = trim(j > 0 ? rule[x] + ' ' + y : replace(y, /&\f/g, rule[x]))))
        props[k++] = z;
  return node(
    value,
    root,
    parent,
    offset === 0 ? RULESET : type,
    props,
    children,
    length2
  );
}
function comment(value, root, parent) {
  return node(
    value,
    root,
    parent,
    COMMENT,
    from(char()),
    substr(value, 2, -2),
    0
  );
}
function declaration(value, root, parent, length2) {
  return node(
    value,
    root,
    parent,
    DECLARATION,
    substr(value, 0, length2),
    substr(value, length2 + 1, -1),
    length2
  );
}

// ../../node_modules/stylis/src/Prefixer.js
function prefix(value, length2, children) {
  switch (hash(value, length2)) {
    case 5103:
      return WEBKIT + 'print-' + value + value;
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return WEBKIT + value + value;
    case 4789:
      return MOZ + value + value;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return WEBKIT + value + MOZ + value + MS + value + value;
    case 5936:
      switch (charat(value, length2 + 11)) {
        case 114:
          return (
            WEBKIT +
            value +
            MS +
            replace(value, /[svh]\w+-[tblr]{2}/, 'tb') +
            value
          );
        case 108:
          return (
            WEBKIT +
            value +
            MS +
            replace(value, /[svh]\w+-[tblr]{2}/, 'tb-rl') +
            value
          );
        case 45:
          return (
            WEBKIT +
            value +
            MS +
            replace(value, /[svh]\w+-[tblr]{2}/, 'lr') +
            value
          );
      }
    case 6828:
    case 4268:
    case 2903:
      return WEBKIT + value + MS + value + value;
    case 6165:
      return WEBKIT + value + MS + 'flex-' + value + value;
    case 5187:
      return (
        WEBKIT +
        value +
        replace(
          value,
          /(\w+).+(:[^]+)/,
          WEBKIT + 'box-$1$2' + MS + 'flex-$1$2'
        ) +
        value
      );
    case 5443:
      return (
        WEBKIT +
        value +
        MS +
        'flex-item-' +
        replace(value, /flex-|-self/g, '') +
        (!match(value, /flex-|baseline/)
          ? MS + 'grid-row-' + replace(value, /flex-|-self/g, '')
          : '') +
        value
      );
    case 4675:
      return (
        WEBKIT +
        value +
        MS +
        'flex-line-pack' +
        replace(value, /align-content|flex-|-self/g, '') +
        value
      );
    case 5548:
      return WEBKIT + value + MS + replace(value, 'shrink', 'negative') + value;
    case 5292:
      return (
        WEBKIT + value + MS + replace(value, 'basis', 'preferred-size') + value
      );
    case 6060:
      return (
        WEBKIT +
        'box-' +
        replace(value, '-grow', '') +
        WEBKIT +
        value +
        MS +
        replace(value, 'grow', 'positive') +
        value
      );
    case 4554:
      return (
        WEBKIT +
        replace(value, /([^-])(transform)/g, '$1' + WEBKIT + '$2') +
        value
      );
    case 6187:
      return (
        replace(
          replace(
            replace(value, /(zoom-|grab)/, WEBKIT + '$1'),
            /(image-set)/,
            WEBKIT + '$1'
          ),
          value,
          ''
        ) + value
      );
    case 5495:
    case 3959:
      return replace(value, /(image-set\([^]*)/, WEBKIT + '$1$`$1');
    case 4968:
      return (
        replace(
          replace(
            value,
            /(.+:)(flex-)?(.*)/,
            WEBKIT + 'box-pack:$3' + MS + 'flex-pack:$3'
          ),
          /s.+-b[^;]+/,
          'justify'
        ) +
        WEBKIT +
        value +
        value
      );
    case 4200:
      if (!match(value, /flex-|baseline/))
        return MS + 'grid-column-align' + substr(value, length2) + value;
      break;
    case 2592:
    case 3360:
      return MS + replace(value, 'template-', '') + value;
    case 4384:
    case 3616:
      if (
        children &&
        children.some(function (element, index) {
          return (length2 = index), match(element.props, /grid-\w+-end/);
        })
      ) {
        return ~indexof(value + (children = children[length2].value), 'span')
          ? value
          : MS +
              replace(value, '-start', '') +
              value +
              MS +
              'grid-row-span:' +
              (~indexof(children, 'span')
                ? match(children, /\d+/)
                : +match(children, /\d+/) - +match(value, /\d+/)) +
              ';';
      }
      return MS + replace(value, '-start', '') + value;
    case 4896:
    case 4128:
      return children &&
        children.some(function (element) {
          return match(element.props, /grid-\w+-start/);
        })
        ? value
        : MS + replace(replace(value, '-end', '-span'), 'span ', '') + value;
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return replace(value, /(.+)-inline(.+)/, WEBKIT + '$1$2') + value;
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (strlen(value) - 1 - length2 > 6)
        switch (charat(value, length2 + 1)) {
          case 109:
            if (charat(value, length2 + 4) !== 45) break;
          case 102:
            return (
              replace(
                value,
                /(.+:)(.+)-([^]+)/,
                '$1' +
                  WEBKIT +
                  '$2-$3$1' +
                  MOZ +
                  (charat(value, length2 + 3) == 108 ? '$3' : '$2-$3')
              ) + value
            );
          case 115:
            return ~indexof(value, 'stretch')
              ? prefix(
                  replace(value, 'stretch', 'fill-available'),
                  length2,
                  children
                ) + value
              : value;
        }
      break;
    case 5152:
    case 5920:
      return replace(
        value,
        /(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,
        function (_, a, b, c, d, e, f) {
          return (
            MS +
            a +
            ':' +
            b +
            f +
            (c ? MS + a + '-span:' + (d ? e : +e - +b) + f : '') +
            value
          );
        }
      );
    case 4949:
      if (charat(value, length2 + 6) === 121)
        return replace(value, ':', ':' + WEBKIT) + value;
      break;
    case 6444:
      switch (charat(value, charat(value, 14) === 45 ? 18 : 11)) {
        case 120:
          return (
            replace(
              value,
              /(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,
              '$1' +
                WEBKIT +
                (charat(value, 14) === 45 ? 'inline-' : '') +
                'box$3$1' +
                WEBKIT +
                '$2$3$1' +
                MS +
                '$2box$3'
            ) + value
          );
        case 100:
          return replace(value, ':', ':' + MS) + value;
      }
      break;
    case 5719:
    case 2647:
    case 2135:
    case 3927:
    case 2391:
      return replace(value, 'scroll-', 'scroll-snap-') + value;
  }
  return value;
}

// ../../node_modules/stylis/src/Serializer.js
function serialize(children, callback) {
  var output = '';
  var length2 = sizeof(children);
  for (var i = 0; i < length2; i++)
    output += callback(children[i], i, children, callback) || '';
  return output;
}
function stringify(element, index, children, callback) {
  switch (element.type) {
    case LAYER:
      if (element.children.length) break;
    case IMPORT:
    case DECLARATION:
      return (element.return = element.return || element.value);
    case COMMENT:
      return '';
    case KEYFRAMES:
      return (element.return =
        element.value + '{' + serialize(element.children, callback) + '}');
    case RULESET:
      element.value = element.props.join(',');
  }
  return strlen((children = serialize(element.children, callback)))
    ? (element.return = element.value + '{' + children + '}')
    : '';
}

// ../../node_modules/stylis/src/Middleware.js
function middleware(collection) {
  var length2 = sizeof(collection);
  return function (element, index, children, callback) {
    var output = '';
    for (var i = 0; i < length2; i++)
      output += collection[i](element, index, children, callback) || '';
    return output;
  };
}
function rulesheet(callback) {
  return function (element) {
    if (!element.root) {
      if ((element = element.return)) callback(element);
    }
  };
}
function prefixer(element, index, children, callback) {
  if (element.length > -1) {
    if (!element.return)
      switch (element.type) {
        case DECLARATION:
          element.return = prefix(element.value, element.length, children);
          return;
        case KEYFRAMES:
          return serialize(
            [
              copy(element, {
                value: replace(element.value, '@', '@' + WEBKIT),
              }),
            ],
            callback
          );
        case RULESET:
          if (element.length)
            return combine(element.props, function (value) {
              switch (match(value, /(::plac\w+|:read-\w+)/)) {
                case ':read-only':
                case ':read-write':
                  return serialize(
                    [
                      copy(element, {
                        props: [
                          replace(value, /:(read-\w+)/, ':' + MOZ + '$1'),
                        ],
                      }),
                    ],
                    callback
                  );
                case '::placeholder':
                  return serialize(
                    [
                      copy(element, {
                        props: [
                          replace(
                            value,
                            /:(plac\w+)/,
                            ':' + WEBKIT + 'input-$1'
                          ),
                        ],
                      }),
                      copy(element, {
                        props: [replace(value, /:(plac\w+)/, ':' + MOZ + '$1')],
                      }),
                      copy(element, {
                        props: [replace(value, /:(plac\w+)/, MS + 'input-$1')],
                      }),
                    ],
                    callback
                  );
              }
              return '';
            });
      }
  }
}
function namespace(element) {
  switch (element.type) {
    case RULESET:
      element.props = element.props.map(function (value) {
        return combine(tokenize(value), function (value2, index, children) {
          switch (charat(value2, 0)) {
            case 12:
              return substr(value2, 1, strlen(value2));
            case 0:
            case 40:
            case 43:
            case 62:
            case 126:
              return value2;
            case 58:
              if (children[++index] === 'global')
                (children[index] = ''),
                  (children[++index] =
                    '\f' + substr(children[index], (index = 1), -1));
            case 32:
              return index === 1 ? '' : value2;
            default:
              switch (index) {
                case 0:
                  element = value2;
                  return sizeof(children) > 1 ? '' : value2;
                case (index = sizeof(children) - 1):
                case 2:
                  return index === 2
                    ? value2 + element + element
                    : value2 + element;
                default:
                  return value2;
              }
          }
        });
      });
  }
}

export {
  MS,
  MOZ,
  WEBKIT,
  COMMENT,
  RULESET,
  DECLARATION,
  PAGE,
  MEDIA,
  IMPORT,
  CHARSET,
  VIEWPORT,
  SUPPORTS,
  DOCUMENT,
  NAMESPACE,
  KEYFRAMES,
  FONT_FACE,
  COUNTER_STYLE,
  FONT_FEATURE_VALUES,
  LAYER,
  abs,
  from,
  assign,
  hash,
  trim,
  match,
  replace,
  indexof,
  charat,
  substr,
  strlen,
  sizeof,
  append,
  combine,
  line,
  column,
  length,
  position,
  character,
  characters,
  node,
  copy,
  char,
  prev,
  next,
  peek,
  caret,
  slice,
  token,
  alloc,
  dealloc,
  delimit,
  tokenize,
  whitespace,
  tokenizer,
  escaping,
  delimiter,
  commenter,
  identifier,
  compile,
  parse,
  ruleset,
  comment,
  declaration,
  prefix,
  serialize,
  stringify,
  middleware,
  rulesheet,
  prefixer,
  namespace,
};
//# sourceMappingURL=chunk-WF25XW2W.js.map
