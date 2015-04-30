var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  scope: 'devDependencies'
});

var runSequence = require('run-sequence');
var del = require('del');

gulp.task('static-analysis:lint', function () {
  gulp.src('src/**/*.js')
    .pipe($.jshint('.jshintrc'))
    .pipe($.jshint.reporter('jshint-stylish'));
});

gulp.task('static-analysis:cs', function () {
  return gulp.src('src/**/*.js')
    .pipe($.jscs());
});

gulp.task('test', function () {
  return gulp.src('test/**/*.js', { read: false })
    .pipe($.mocha());
});

gulp.task('build:clean', function (callback) {
  del(['build/**/*'], callback);
});

gulp.task('build:copy-src-to-build', function () {
  return gulp.src('src/**/*.js')
    .pipe(gulp.dest('build'));
});

gulp.task('build:copy-build-to-dist', function () {
  return gulp.src('build/**/*.js')
    .pipe(gulp.dest('dist'));
});

gulp.task('build:minify', function () {
  return gulp.src('build/**/*.js')
    .pipe($.sourcemaps.init())
    .pipe($.uglify())
    .pipe($.rename({
      extname: '.min.js'
    }))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('dist'));
});

gulp.task('build', function (callback) {
  runSequence(
    ['static-analysis:lint', 'static-analysis:cs', 'test'],
    'build:clean',
    'build:copy-src-to-build',
    'build:copy-build-to-dist',
    'build:minify',
    callback
  );
});

gulp.task('sa', ['static-analysis:lint', 'static-analysis:cs']);

gulp.task('ci', ['static-analysis:lint', 'static-analysis:cs', 'test']);

gulp.task('default', ['build']);
