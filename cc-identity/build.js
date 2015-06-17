
var fs = require('fs');
var _ = require('lodash');
var gulp = require('gulp');
var concat = require('gulp-concat');
var jsonSass = require('gulp-json-sass');
var dir = require('../build-utils/dir')(__dirname);
var normalize = require('normalize-object');

var taskName = 'cc-identity';

var ccData = require('./src');

gulp.task('build-json', function(callback) {
  var ccDataJSON = JSON.stringify(ccData);
  var ccDataJS = JSON.stringify(normalize(ccData));
  // JS variables are camel case for dot-notation
  fs.writeFile(dir('/cc-identity.json'), ccDataJS, _.noop);
  // TMP file used to create the SCSS variables (kebab case)
  fs.writeFile(dir('/tmp/cc-identity.json'), ccDataJSON, callback);
});

gulp.task(taskName, ['build-json'], function() {
  return gulp
    .src(dir('/tmp/cc-identity.json'))
    .pipe(jsonSass())
    .pipe(concat('cc-identity.scss'))
    .pipe(gulp.dest(dir('/')));
});

module.exports = taskName;
