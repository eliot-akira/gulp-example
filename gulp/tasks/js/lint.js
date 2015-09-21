
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

module.exports = function runJSHint( options ) {

  if ( ! options.lint ) return;

  bundle = gulp.src( options.lint );
//    .pipe( plugins.cache('linting') );

  if ( options.coffee ) {
    bundle = bundle
      .pipe( plugins.coffeelint() )
      .pipe( plugins.coffeelint.reporter('coffeelint-stylish') );
  } else {
    bundle = bundle
      .pipe( plugins.jshint() )
      .pipe( plugins.jshint.reporter('jshint-stylish') );
  }

  return bundle;

};
