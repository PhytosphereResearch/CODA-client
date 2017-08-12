var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var pump = require('pump');

gulp.task('sass', function(cb) {
  pump([
    gulp.src('src/styles/main.scss'),
    sass(),
    concat('style.css'),
    autoprefixer(),
    cleanCSS({ debug: true }, function(details) {
      console.log(details.name + ': ' + details.stats.originalSize);
      console.log(details.name + ': ' + details.stats.minifiedSize);
    }),
    gulp.dest('dist/')
  ], cb);
});

gulp.task('watch', ['sass'], function () {
  gulp.watch('src/styles/**/*.scss', ['sass']);
});
