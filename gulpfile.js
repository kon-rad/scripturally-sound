const gulp = require('gulp');
const gutil = require('gulp-util');
const concat = require("gulp-concat");
const pug = require('gulp-pug');
const scss = require('gulp-scss');
const babel = require('gulp-babel');
const js_minify = require('gulp-minify');
const minifyCSS = require('gulp-csso');
const autoprefixer = require('gulp-autoprefixer');
const transpile  = require('gulp-es6-module-transpiler');
const rename = require("gulp-rename");
const del = require("del");

gulp.task('delete-build', () => {
  del('build');
});

gulp.task('css', () => {
  return gulp.src('src/partials/css/base.scss')
    .pipe(scss())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(minifyCSS())
    .pipe(gulp.dest('build/styles'))
});

gulp.task('js', () => {
  return gulp.src('src/partials/js/*.js')
    .pipe(transpile({
      formatter: 'bundle'
    }))
    .pipe(babel({presets: ['es2015']}))
    .pipe(concat('base.js')) // .pipe(js_minify())
    .pipe(gulp.dest('build/scripts'))
});

gulp.task('html', ['css', 'js'], () => {
  return gulp.src(['src/partials/html/views/song.pug', 'src/partials/html/views/index.pug'])
    .pipe(pug())
    .pipe(gulp.dest('build'))
});

gulp.task('default', [ 'css', 'js', 'html' ]);
