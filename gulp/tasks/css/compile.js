
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var log = require('../../util/log');
var path = require('path');

module.exports = function runCompileCSS( options, dev ) {

  dev = (typeof dev !== 'undefined') ? dev : false;

  var entry = path.join(options.src, options.entry+options.extension);
  var logTag = 'CSS';

  var stream = gulp.src( entry )
    .pipe(plugins.plumber());

  if (dev) stream = stream.pipe(plugins.sourcemaps.init({}));

  if ( options.sass ) {
    stream = stream.pipe(
      plugins.sass( options.sass ).on('error', plugins.sass.logError)
    );
    logTag = 'Sass';
  }

  if ( options.autoprefix ) {
    stream = stream.pipe( plugins.autoprefixer( options.autoprefix ));
  }

  stream = stream.pipe( plugins.rename( options.slug+'.css' ) );

  if (dev) stream = stream.pipe( plugins.sourcemaps.write() );

  stream = stream.pipe( gulp.dest( options.dest ) )
    .on('end', function() {
      log( logTag, 'Compiled with'+(dev?'':'out')+' source map from '+
        entry+' to '+path.join(options.dest, options.slug+'.css'));
    });

  return stream;
};
