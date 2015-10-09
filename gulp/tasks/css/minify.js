
var gulp = require('gulp');
var gulpif = require('gulp-if');
var plugins = require('gulp-load-plugins')();
var log = require('../../util/log');
var path = require('path');
var setDefault = require('../../util/set-default.js');

module.exports = function runMinifyCSS( options, dev ) {

  dev = (typeof dev !== 'undefined') ? dev : false;
  var message = dev ? 'Renamed' : 'Minified';

  var stream = gulp.src( options.files );

  if ( options.concat ) {

    stream = stream
      .pipe( gulpif( dev, plugins.sourcemaps.init({ loadMaps: true }) ) )
      .pipe( plugins.concat( options.slug+'.css' ) )
      .pipe( plugins.rename( options.slug+options.minExtension ) )
      .pipe( gulpif( dev, plugins.sourcemaps.write() ) );

    message = 'Combined and '+message.toLowerCase();

  } else {
    // Just rename
    stream = stream.pipe( plugins.rename( options.slug+options.minExtension ) );
  }

  if ( ! dev ) {
    // Minify in production
    stream = stream
      .pipe( plugins.bytediff.start() )
      .pipe( plugins.minifyCss( options.minify ))
      .pipe( plugins.bytediff.stop() );
  }

  stream = stream
    .pipe( gulp.dest( options.dest ) )
    .on('end', function(){
      if ( ! dev || options.slug+options.minExtension !== options.slug+'.css' )
        log( 'CSS', message + ' to ' +
          path.join(options.dest, options.slug+options.minExtension)
        );
    });


  if (options.browserSync) {
    stream = stream.pipe( options.browserSyncInstance.stream() );
  }

  return stream;
};
