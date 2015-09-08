///////////////* Setup *///////////////

var gulp = require('gulp'),
  ghPages = require('gulp-gh-pages');

///////////////* Stream *///////////////

// Move to dist
gulp.task('css', function() {
  return gulp.src('css/*')
  .pipe(gulp.dest('dist/css'));
});

// Move to dist
gulp.task('js', ['css'], function() {
  return gulp.src('js/**/*')
  .pipe(gulp.dest('dist/js'));
});

// Move to dist
gulp.task('html', ['js'], function() {
  return gulp.src('./*.html')
  .pipe(gulp.dest('dist/'));
});

// Publish to gh-pages
gulp.task('deploy', ['html'], function() {
  return gulp.src('dist/**/*')
  .pipe(ghPages());
});

///////////////* Default *///////////////
// DEFAULT Group: Optimize, Build, then Deploy
gulp.task('default', ['css', 'js', 'html', 'deploy']);