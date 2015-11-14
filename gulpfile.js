// Generated by CoffeeScript 1.10.0
(function() {
  var browserSync, coffee, connect, data, gulp, gutil, htmlmin, imagemin, jade, minifyCss, path, please, plumber, pngquant, prefix, purify, reload, sourcemaps, spritesmith, stripCssComments, stylus, uglify, util, watch, webpack;

  gulp = require('gulp');

  plumber = require('gulp-plumber');

  sourcemaps = require('gulp-sourcemaps');

  uglify = require('gulp-uglify');

  imagemin = require('gulp-imagemin');

  pngquant = require('imagemin-pngquant');

  spritesmith = require('gulp.spritesmith');

  prefix = require('gulp-autoprefixer');

  please = require('gulp-pleeease');

  jade = require('gulp-jade');

  util = require("util");

  data = require('gulp-data');

  stylus = require('gulp-stylus');

  connect = require('gulp-connect');

  gutil = require('gulp-util');

  htmlmin = require('gulp-htmlmin');

  purify = require('gulp-purifycss');

  minifyCss = require('gulp-minify-css');

  path = require('path');

  browserSync = require('browser-sync').create();

  watch = require('gulp-watch');

  stripCssComments = require('gulp-strip-css-comments');

  uglify = require('gulp-uglify');

  connect = require('gulp-connect');

  reload = browserSync.reload;

  gulp.task('purify-css', function() {
    return gulp.src('./app/styles/application.css').pipe(purify(['./app/bundle.js', './app/*.html'])).pipe(minifyCss()).pipe(gulp.dest('./app/styles/'));
  });

  gulp.task('minifyHTML', function() {
    return gulp.src('./app/*.html').pipe(htmlmin({
      collapseWhitespace: true
    })).pipe(gulp.dest('./app/'));
  });

  gulp.task('imagemin', function() {
    return gulp.src('./app/images/**/*').pipe(imagemin({
      progressive: true,
      svgoPlugins: [
        {
          removeViewBox: false
        }
      ],
      use: [pngquant()]
    })).pipe(gulp.dest('./app/images'));
  });

  gulp.task('stylus', function() {
    return gulp.src('./app/styles/application.styl').pipe(plumber({
      errorHandler: function(error, file) {
        console.log(error.message);
        return this.emit('end');
      }
    })).pipe(stylus({
      'include css': true,
      sourcemap: {
        inline: true,
        sourceRoot: '.',
        basePath: './app/styles'
      }
    })).pipe(please({
      'minifier': true,
      "autoprefixer": {
        'browsers': ['last 6 versions', 'Android 4', 'ie 9', 'ie 10', 'ie 11']
      },
      'filters': true,
      'oldIE': true,
      'rem': true,
      'pseudoElements': true,
      'opacity': true,
      'import': true,
      'mqpacker': true,
      'next': true,
      preserveHacks: true,
      removeAllComments: true,
      sourcemaps: true
    })).pipe(gulp.dest('./app/styles')).pipe(connect.reload());
  });

  gulp.task('sprite', function() {
    var spriteData;
    spriteData = gulp.src('./app/images/sprite/*.*').pipe(spritesmith({
      imgName: 'sprite.png',
      cssName: 'utilities/_sprite.styl',
      imgPath: '../images/sprite.png',
      padding: 4
    }));
    spriteData.img.pipe(gulp.dest('./app/images/'));
    return spriteData.css.pipe(gulp.dest('./app/styles/'));
  });

  gulp.task('jade', function() {
    data = {};
    data.images = {};
    return gulp.src('./app/jade/pages/*.jade').pipe(plumber({
      errorHandler: function(error, file) {
        console.log(error.message);
        return this.emit('end');
      }
    })).pipe(jade({
      pretty: true,
      locals: data
    })).pipe(gulp.dest('./app/')).pipe(connect.reload());
  });

  gulp.task('stripCss', function() {
    return gulp.src('./app/styles/application.css').pipe(stripCssComments()).pipe(gulp.dest('./app/styles/'));
  });

  gulp.task('jsmin', function() {
    return gulp.src('./app/scripts/vendors/loadCSS.js').pipe(uglify()).pipe(gulp.dest('./app/scripts/vendors/'));
  });

  gulp.task('browser-sync', function() {
    return browserSync.init({
      server: {
        baseDir: "./app"
      },
      open: false
    });
  });

  gulp.task('connect', function() {
    return connect.server({
      root: 'app',
      livereload: true,
      port: 3000
    });
  });

  gulp.task('watchSprite', function() {
    watch('./app/styles/**/*.styl', function() {
      return gulp.start('stylus');
    });
    return watch('./app/jade/**/*.jade', function() {
      return gulp.start('jade');
    });
  });

  gulp.task('watch', function() {});

  gulp.task('default', ['sprite', 'jade', 'watchSprite', 'connect']);

}).call(this);
