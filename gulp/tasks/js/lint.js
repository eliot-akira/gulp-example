var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

module.exports = function runJSHint( options ) {

  if ( ! options.lint ) return;

  stream = gulp.src( options.lint );
//    .pipe( plugins.cache('linting') );

  if ( options.coffee ) {
    stream = stream
      .pipe( plugins.coffeelint() )
      .pipe( plugins.coffeelint.reporter('coffeelint-stylish') );
  } else {
    stream = stream
      .pipe( plugins.jshint() )
      .pipe( plugins.jshint.reporter('jshint-stylish') );
  }

  return stream;

};
