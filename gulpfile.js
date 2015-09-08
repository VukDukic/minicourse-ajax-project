///////////////* Setup *///////////////

var gulp = require('gulp'),
  ghPages = require('gulp-gh-pages');

///////////////* Stream *///////////////

// Publish to gh-pages
gulp.task('deploy', ['inline'], function() {
  return gulp.src('./dist/**/**/*')
  .pipe(ghPages());
});

///////////////* Default *///////////////
// DEFAULT Group: Optimize, Build, then Deploy
gulp.task('default', ['deploy']);