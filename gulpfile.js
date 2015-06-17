
var path = require('path');

var gulp = require('gulp');
var glob = require('glob');
var dir = require('./build-utils/dir')(__dirname);

gulp.task('build-all', function() {
  glob('*/build.js', function(er, files) {
    var buildTasks = files.map(function(file) {
      return require(dir(file));
    });
    gulp.run(buildTasks);
  });
});

gulp.task('default', ['build-all']);
