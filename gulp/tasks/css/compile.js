
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var log = require('../../util/log');

module.exports = function runCompileCSS( options, dev ) {

  dev = (typeof dev !== 'undefined') ? dev : false;

  var entry = options.src+options.entry+options.extension;

  var stream = gulp.src( entry )
    .pipe(plugins.plumber());

    if (dev) stream = stream.pipe(plugins.sourcemaps.init({}));

    if ( options.sass ) {
      stream = stream.pipe(
        plugins.sass( options.sass ).on('error', plugins.sass.logError)
      );
    }

    if ( options.autoprefix ) {
      stream = stream.pipe( plugins.autoprefixer( options.autoprefix ));
    }

    if (dev) stream = stream.pipe( plugins.sourcemaps.write() );

    stream = stream
      .pipe( plugins.rename( options.slug+'.css' ) )
      .pipe( gulp.dest( options.dest ) )
      .on('end', function() {
        log( 'Sass', 'Compiled with'+(dev?'':'out')+' source map: from '+
          entry+' to '+options.dest+options.slug+'.css');
      });

  return stream;
};
