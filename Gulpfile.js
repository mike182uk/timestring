var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  scope: 'devDependencies'
});
var runSequence = require('run-sequence');

gulp.task('lint', function () {
  gulp.src('src/**/*.js')
    .pipe($.jshint('.jshintrc'))
    .pipe($.jshint.reporter('jshint-stylish'));
});

gulp.task('cs', function () {
  return gulp.src('src/**/*.js')
    .pipe($.jscs());
});

gulp.task('test', function () {
  return gulp.src('test/**/*.js', { read: false })
    .pipe($.mocha());
});

gulp.task('minify', function () {
  return gulp.src('src/*.js')
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
    ['lint', 'cs', 'test'],
    'minify',
    callback
  );
});

gulp.task('ci', ['lint', 'cs', 'test']);

gulp.task('default', ['build']);
