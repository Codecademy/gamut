import { __commonJS } from './chunk-4B2QHNJT.js';

// ../../node_modules/sanitize-markdown/she.js
var require_she = __commonJS({
  '../../node_modules/sanitize-markdown/she.js'(exports, module) {
    'use strict';
    var escapes = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    var unescapes = {
      '&amp;': '&',
      '&lt;': '<',
      '&gt;': '>',
      '&quot;': '"',
      '&#39;': "'",
    };
    var rescaped = /(&amp;|&lt;|&gt;|&quot;|&#39;)/g;
    var runescaped = /[&<>"']/g;
    function escapeHtmlChar(match) {
      return escapes[match];
    }
    function unescapeHtmlChar(match) {
      return unescapes[match];
    }
    function escapeHtml(text) {
      return text == null
        ? ''
        : String(text).replace(runescaped, escapeHtmlChar);
    }
    function unescapeHtml(html) {
      return html == null
        ? ''
        : String(html).replace(rescaped, unescapeHtmlChar);
    }
    escapeHtml.options = unescapeHtml.options = {};
    module.exports = {
      encode: escapeHtml,
      escape: escapeHtml,
      decode: unescapeHtml,
      unescape: unescapeHtml,
      version: '1.0.0-browser',
    };
  },
});

// ../../node_modules/assignment/assignment.js
var require_assignment = __commonJS({
  '../../node_modules/assignment/assignment.js'(exports, module) {
    'use strict';
    function assignment(result) {
      var stack = Array.prototype.slice.call(arguments, 1);
      var item;
      var key;
      while (stack.length) {
        item = stack.shift();
        for (key in item) {
          if (item.hasOwnProperty(key)) {
            if (
              Object.prototype.toString.call(result[key]) === '[object Object]'
            ) {
              result[key] = assignment(result[key], item[key]);
            } else {
              result[key] = item[key];
            }
          }
        }
      }
      return result;
    }
    module.exports = assignment;
  },
});

// ../../node_modules/sanitize-markdown/lowercase.js
var require_lowercase = __commonJS({
  '../../node_modules/sanitize-markdown/lowercase.js'(exports, module) {
    'use strict';
    module.exports = function lowercase(string) {
      return typeof string === 'string' ? string.toLowerCase() : string;
    };
  },
});

// ../../node_modules/sanitize-markdown/toMap.js
var require_toMap = __commonJS({
  '../../node_modules/sanitize-markdown/toMap.js'(exports, module) {
    'use strict';
    function toMap(list) {
      return list.reduce(asKey, {});
    }
    function asKey(accumulator, item) {
      accumulator[item] = true;
      return accumulator;
    }
    module.exports = toMap;
  },
});

// ../../node_modules/sanitize-markdown/attributes.js
var require_attributes = __commonJS({
  '../../node_modules/sanitize-markdown/attributes.js'(exports, module) {
    'use strict';
    var toMap = require_toMap();
    var uris = [
      'background',
      'base',
      'cite',
      'href',
      'longdesc',
      'src',
      'usemap',
    ];
    module.exports = {
      uris: toMap(uris),
      // attributes that have an href and hence need to be sanitized
    };
  },
});

// ../../node_modules/sanitize-markdown/elements.js
var require_elements = __commonJS({
  '../../node_modules/sanitize-markdown/elements.js'(exports, module) {
    'use strict';
    var toMap = require_toMap();
    var voids = [
      'area',
      'br',
      'col',
      'hr',
      'img',
      'wbr',
      'input',
      'base',
      'basefont',
      'link',
      'meta',
    ];
    module.exports = {
      voids: toMap(voids),
    };
  },
});

// ../../node_modules/sanitize-markdown/parser.js
var require_parser = __commonJS({
  '../../node_modules/sanitize-markdown/parser.js'(exports, module) {
    'use strict';
    var she = require_she();
    var lowercase = require_lowercase();
    var attributes = require_attributes();
    var elements = require_elements();
    var rstart =
      /^<\s*([\w:-]+)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*>/;
    var rend = /^<\s*\/\s*([\w:-]+)[^>]*>/;
    var rattrs =
      /([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g;
    var rtag = /^</;
    var rtagend = /^<\s*\//;
    function createStack() {
      var stack = [];
      stack.lastItem = function lastItem() {
        return stack[stack.length - 1];
      };
      return stack;
    }
    function parser(html, handler) {
      var stack = createStack();
      var last = html;
      var chars;
      while (html) {
        parsePart();
      }
      parseEndTag();
      function parsePart() {
        chars = true;
        parseTag();
        var same = html === last;
        last = html;
        if (same) {
          html = '';
        }
      }
      function parseTag() {
        if (html.substr(0, 4) === '<!--') {
          parseComment();
        } else if (rtagend.test(html)) {
          parseEdge(rend, parseEndTag);
        } else if (rtag.test(html)) {
          parseEdge(rstart, parseStartTag);
        }
        parseTagDecode();
      }
      function parseEdge(regex, parser2) {
        var match = html.match(regex);
        if (match) {
          html = html.substring(match[0].length);
          match[0].replace(regex, parser2);
          chars = false;
        }
      }
      function parseComment() {
        var index = html.indexOf('-->');
        if (index >= 0) {
          if (handler.comment) {
            handler.comment(html.substring(4, index));
          }
          html = html.substring(index + 3);
          chars = false;
        }
      }
      function parseTagDecode() {
        if (!chars) {
          return;
        }
        var text;
        var index = html.indexOf('<');
        if (index >= 0) {
          text = html.substring(0, index);
          html = html.substring(index);
        } else {
          text = html;
          html = '';
        }
        if (handler.chars) {
          handler.chars(text);
        }
      }
      function parseStartTag(tag, tagName, rest, unary) {
        var attrs = {};
        var low = lowercase(tagName);
        var u = elements.voids[low] || !!unary;
        rest.replace(rattrs, attrReplacer);
        if (!u) {
          stack.push(low);
        }
        if (handler.start) {
          handler.start(low, attrs, u);
        }
        function attrReplacer(
          match,
          name,
          doubleQuotedValue,
          singleQuotedValue,
          unquotedValue
        ) {
          if (
            doubleQuotedValue === void 0 &&
            singleQuotedValue === void 0 &&
            unquotedValue === void 0
          ) {
            attrs[name] = void 0;
          } else {
            attrs[name] = she.decode(
              doubleQuotedValue || singleQuotedValue || unquotedValue || ''
            );
          }
        }
      }
      function parseEndTag(tag, tagName) {
        var i;
        var pos = 0;
        var low = lowercase(tagName);
        if (low) {
          for (pos = stack.length - 1; pos >= 0; pos--) {
            if (stack[pos] === low) {
              break;
            }
          }
        }
        if (pos >= 0) {
          for (i = stack.length - 1; i >= pos; i--) {
            if (handler.end) {
              handler.end(stack[i]);
            }
          }
          stack.length = pos;
        }
      }
    }
    module.exports = parser;
  },
});

// ../../node_modules/sanitize-markdown/sanitizer.js
var require_sanitizer = __commonJS({
  '../../node_modules/sanitize-markdown/sanitizer.js'(exports, module) {
    'use strict';
    var she = require_she();
    var lowercase = require_lowercase();
    var attributes = require_attributes();
    var elements = require_elements();
    function sanitizer(buffer, options) {
      var last;
      var context;
      var o = options || {};
      reset();
      return {
        start,
        end,
        chars,
      };
      function out(value) {
        buffer.push(value);
      }
      function start(tag, attrs, unary) {
        var low = lowercase(tag);
        if (context.ignoring) {
          ignore(low);
          return;
        }
        if ((o.allowedTags || []).indexOf(low) === -1) {
          ignore(low);
          return;
        }
        if (o.filter && !o.filter({ tag: low, attrs })) {
          ignore(low);
          return;
        }
        out('<');
        out(low);
        Object.keys(attrs).forEach(parse);
        out(unary ? '/>' : '>');
        function parse(key) {
          var value = attrs[key];
          var classesOk = (o.allowedClasses || {})[low] || [];
          var attrsOk = (o.allowedAttributes || {})[low] || [];
          attrsOk = attrsOk.concat((o.allowedAttributes || {})['*'] || []);
          var valid;
          var lkey = lowercase(key);
          if (lkey === 'class' && attrsOk.indexOf(lkey) === -1) {
            if (value) {
              value = value.split(' ').filter(isValidClass).join(' ').trim();
            }
            valid = value && value.length;
          } else {
            valid =
              attrsOk.indexOf(lkey) !== -1 &&
              (attributes.uris[lkey] !== true || testUrl(value));
          }
          if (valid) {
            out(' ');
            out(key);
            if (typeof value === 'string') {
              out('="');
              out(she.encode(value));
              out('"');
            }
          }
          function isValidClass(className) {
            return classesOk && classesOk.indexOf(className) !== -1;
          }
        }
      }
      function end(tag) {
        var low = lowercase(tag);
        var allowed = (o.allowedTags || []).indexOf(low) !== -1;
        if (allowed) {
          if (context.ignoring === false) {
            out('</');
            out(low);
            out('>');
          } else {
            unignore(low);
          }
        } else {
          unignore(low);
        }
      }
      function testUrl(text) {
        var start2 = text[0];
        if (start2 === '#' || start2 === '/') {
          return true;
        }
        var colon = text.indexOf(':');
        if (colon === -1) {
          return true;
        }
        var questionmark = text.indexOf('?');
        if (questionmark !== -1 && colon > questionmark) {
          return true;
        }
        var hash = text.indexOf('#');
        if (hash !== -1 && colon > hash) {
          return true;
        }
        return o.allowedSchemes.some(matches);
        function matches(scheme) {
          return text.indexOf(scheme + ':') === 0;
        }
      }
      function chars(text) {
        if (context.ignoring === false) {
          out(o.transformText ? o.transformText(text) : text);
        }
      }
      function ignore(tag) {
        if (elements.voids[tag]) {
          return;
        }
        if (context.ignoring === false) {
          context = { ignoring: tag, depth: 1 };
        } else if (context.ignoring === tag) {
          context.depth++;
        }
      }
      function unignore(tag) {
        if (context.ignoring === tag) {
          if (--context.depth <= 0) {
            reset();
          }
        }
      }
      function reset() {
        context = { ignoring: false, depth: 0 };
      }
    }
    module.exports = sanitizer;
  },
});

// ../../node_modules/sanitize-markdown/defaults.js
var require_defaults = __commonJS({
  '../../node_modules/sanitize-markdown/defaults.js'(exports, module) {
    'use strict';
    var defaults = {
      allowedAttributes: {
        '*': ['title', 'accesskey'],
        a: ['href', 'name', 'target', 'aria-label'],
        iframe: ['allowfullscreen', 'frameborder', 'src'],
        img: ['src', 'alt', 'title', 'aria-label'],
      },
      allowedClasses: {},
      allowedSchemes: ['http', 'https', 'mailto'],
      allowedTags: [
        'a',
        'abbr',
        'article',
        'b',
        'blockquote',
        'br',
        'caption',
        'code',
        'del',
        'details',
        'div',
        'em',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'hr',
        'i',
        'img',
        'ins',
        'kbd',
        'li',
        'main',
        'mark',
        'ol',
        'p',
        'pre',
        'section',
        'span',
        'strike',
        'strong',
        'sub',
        'summary',
        'sup',
        'table',
        'tbody',
        'td',
        'th',
        'thead',
        'tr',
        'u',
        'ul',
      ],
      filter: null,
    };
    module.exports = defaults;
  },
});

// ../../node_modules/sanitize-markdown/sanitize-markdown.js
var require_sanitize_markdown = __commonJS({
  '../../node_modules/sanitize-markdown/sanitize-markdown.js'(exports, module) {
    var she = require_she();
    var assign = require_assignment();
    var parser = require_parser();
    var sanitizer = require_sanitizer();
    var defaults = require_defaults();
    function sanitizeMarkdown(html, options, strict) {
      var buffer = [];
      var configuration =
        strict === true ? options : assign({}, defaults, options);
      var handler = sanitizer(buffer, configuration);
      parser(html, handler);
      return buffer.join('');
    }
    sanitizeMarkdown.defaults = defaults;
    module.exports = sanitizeMarkdown;
  },
});
export default require_sanitize_markdown();
//# sourceMappingURL=sanitize-markdown.js.map
