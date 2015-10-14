/**
 * Created by lcymbura on 10/9/15.
 */
var gulp = require('gulp');
var config = require('./gulp.config')();
var $ = require('gulp-load-plugins')({lazy: true});

/*
 * Checks for JS errors
 * */
gulp.task('vet', function () {
  console.log('Analyzing source with JSHint');
  return gulp
    .src(config.alljs)
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish', {verbose: true}));
});

/*
* Coverts Less to CSS
* */
gulp.task('build-styles', function () {
  console.log('Compiling Less ---> CSS');
  return gulp
    .src(config.less)
    .pipe($.plumber()) // Find an error logger that works better
    .pipe($.less())
    .pipe($.autoprefixer())
    .pipe($.minifyCss())
    .pipe(gulp.dest(config.dist));
});

gulp.task('watch-styles', function () {
  gulp.watch(config.less, ['build-styles']);
});

/*
 * Coverts JSX and ES6
 * */
gulp.task('watch-jsx', function () {
  console.log('Watch converting JSX to JS');
  return gulp
    .src('./src/client/index.jsx')
    .pipe($.webpack({
      watch: true,
      module: {
        loaders: [
          { test: /\.jsx$/, loader: 'babel' },
        ],
      },
      output: {
        filename: 'bundle.js',
      },
    }))
    .pipe($.uglify())
    .pipe(gulp.dest(config.dist));
});

/*
 * Watches server and updates changes
 * */
gulp.task('watch-server', function () {
  console.log('Watch server');
  var nodeOptions = {
    scripts: config.nodeServer,
    watch: [config.server]
  };
  return $.nodemon(nodeOptions);
});

/*
* Watch Server, Less and JSX
* */
gulp.task('default', ['watch-jsx', 'watch-styles', 'watch-server']);