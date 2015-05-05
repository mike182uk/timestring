var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  scope: 'devDependencies'
});

var browserify = require('browserify');
var del = require('del');
var runSequence = require('run-sequence');
var source = require('vinyl-source-stream');

gulp.task('static-analysis:lint', function () {
  gulp.src('./src/**/*.js')
    .pipe($.jshint('.jshintrc'))
    .pipe($.jshint.reporter('jshint-stylish'));
});

gulp.task('static-analysis:cs', function () {
  return gulp.src('./src/**/*.js')
    .pipe($.jscs());
});

gulp.task('test', function () {
  return gulp.src('./test/timestring.js', { read: false })
    .pipe($.mocha());
});

gulp.task('build:clean', function (callback) {
  del(['./build/**/*'], callback);
});

gulp.task('build:transpile', function () {
  return gulp.src(['./src/Timestring.js', './src/String.parseTime.js'])
    .pipe($.sourcemaps.init())
    .pipe($.concat('timestring.js'))
    .pipe($.babel())
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('./build'));
});

gulp.task('build:lib', function () {
  return gulp.src('./build/timestring.js')
    .pipe(gulp.dest('./dist/lib'));
});

gulp.task('build:browserify', function() {
  return browserify('./build/timestring.js', { standalone: 'Timestring', debug: true })
    .bundle()
    .on('error', function(e){
        console.log(e.message);

        this.emit('end');
    })
    .pipe(source('timestring.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('build:minify', function () {
  return gulp.src('./build/timestring.js')
    .pipe($.uglify())
    .pipe($.rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('build', function (callback) {
  runSequence(
    ['static-analysis:lint', 'static-analysis:cs'],
    'build:clean',
    'build:transpile',
    'test',
    ['build:lib', 'build:browserify'],
    'build:minify',
    callback
  );
});

gulp.task('sa', ['static-analysis:lint', 'static-analysis:cs']);

gulp.task('ci', function (callback) {
  runSequence(
    ['static-analysis:lint', 'static-analysis:cs'],
    'build:clean',
    'build:transpile',
    'test'
  );
});

gulp.task('default', ['build']);
