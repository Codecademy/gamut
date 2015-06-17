
var fs = require('fs');
var gulp = require('gulp');
var concat = require('gulp-concat');
var jsonSass = require('gulp-json-sass');
var dir = require('../build-utils/dir')(__dirname);

var taskName = 'cc-identity';

var ccData = require('./src');

gulp.task('build-json', function(callback) {
  var ccDataJSON = JSON.stringify(ccData);
  fs.writeFile(dir('/cc-identity.json'), ccDataJSON, callback);
});

gulp.task(taskName, ['build-json'], function() {
  return gulp
    .src(dir('/cc-identity.json'))
    .pipe(jsonSass())
    .pipe(concat('cc-identity.scss'))
    .pipe(gulp.dest(dir('/')));
});

module.exports = taskName;
