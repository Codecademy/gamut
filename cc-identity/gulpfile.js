var path = require('path');
var fs = require('fs');
var _ = require('lodash');
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var jsonSass = require('gulp-json-sass');
var dir = _.partial(path.join, __dirname);

var ccData = require('./identity/index.js');

var kebabitize = function(obj) {
  var res = obj;
  if (_.isObject(obj)) {
    res = {};
    for (var k in obj) {
      res[_.kebabCase(k)] = kebabitize(obj[k]);
    }
  }
  return res;
};

gulp.task('build-json', function(callback) {
  var ccDataJSON = JSON.stringify(kebabitize(ccData));
  var ccDataJS = JSON.stringify(ccData);
  // JS variables are camel case for dot-notation
  fs.writeFile(dir('./identity.json'), ccDataJS, _.noop);
  // TMP file used to create the SCSS variables (kebab case)
  fs.writeFile(dir('/tmp/identity.json'), ccDataJSON, callback);
});

gulp.task('build-html', function(callback) {
  var colorData = [];

  var colorGroup = function(key, value) {
    var title = _.capitalize(key || 'base') + ' Colors';
    var colors = [];
    _.each(value, function(val, k) {
      if (_.isObject(val)) {
        return colorGroup(k, val);
      }
      var str = 'color';
      if (key) {
        str += ('.' + key);
      }
      str += ('.' + k);

      colors.push({
        value: val,
        JSON: str,
        SCSS: '$' + _.kebabCase(str)
      });
    });

    colorData.push({title: title, colors: colors});
  };

  colorGroup(null, ccData.color);
  colorData = _.sortBy(colorData, 'title');
  var tpl = null;
  fs.readFile(dir('/public/_index.html'), {encoding: 'utf8'}, function(err, data) {
    tpl = _.template(data);
    fs.writeFile(dir('/public/index.html'), tpl({yield: colorData}), callback);
  });

});

gulp.task('cc-identity', ['build-json', 'build-html'], function() {
  return gulp
    .src(dir('/tmp/identity.json'))
    .pipe(plumber())
    .pipe(jsonSass())
    .pipe(concat('./identity.scss'))
    .pipe(gulp.dest(dir('/')));
});

gulp.task('watch', ['cc-identity'], function() {
  gulp.watch('./identity/**/*', ['cc-identity']);
  gulp.watch('./public/**/*', ['cc-identity']);
});

gulp.task('default', ['cc-identity']);
