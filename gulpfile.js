'use strict';

var gulp = require('gulp')
var sass = require('gulp-sass')(require('sass'))
var sourceMaps = require('gulp-sourcemaps')
var cleanCSS = require('gulp-clean-css')
var imagemin = require('gulp-imagemin')

gulp.task('sass', function () {
  // place code for your default task here
  return gulp.src('./static/css/styles.scss')
    .pipe(sourceMaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(sourceMaps.write())
    .pipe(gulp.dest('./static/css/.'))
})

gulp.task('images', function () {
  return gulp.src('./static/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./static/img'))
})

gulp.task('watch', function () {
  gulp.watch('./static/css/styles.scss', gulp.series('sass'))
  gulp.watch('./static/img/*', gulp.series('images'))
})

gulp.task('default', gulp.series('sass', 'watch'))