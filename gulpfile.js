var gulp = require('gulp');
var sass = require('gulp-sass');
var order = require('gulp-order');
var concat = require('gulp-concat');
var gutil = require('gulp-util');

gulp.task('default', ['sass','js', 'watch']);

gulp.task('sass', function(){
  gulp.src('./scss/style.scss')
  .pipe(sass({
    outputStyle: 'compressed'
  })).on('error', sass.logError)
  .pipe(gulp.dest('css'));
});

gulp.task('js', function() {
  gulp.src(['app/**/*.js'])
  .pipe(order([
'app/app.module.js'
    ], { base: './' }))
        .pipe(concat('scripts.js'))
  .pipe(gulp.dest('js')).on('error', gutil.log)
});

gulp.task('watch', function() {
  gulp.watch('./scss/**/*.scss', ['sass']);
  gulp.watch('./app/**/*.js', ['js']);
});
