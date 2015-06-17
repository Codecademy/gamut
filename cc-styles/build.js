
var gulp = require('gulp');
var sass = require('gulp-sass');
var dir = require('../build-utils/dir')(__dirname);

var taskName = 'cc-styles';

gulp.task(taskName, function() {
  return gulp
    .src(dir('/cc-core.scss'))
    .pipe(sass())
    .pipe(gulp.dest(dir('/tmp/')));
});

module.exports = taskName;
