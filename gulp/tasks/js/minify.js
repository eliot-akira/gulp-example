
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var log = require('../../util/log');

module.exports = function runMinifyJS( options, dev ) {

  var stream = gulp.src( options.files );
  var message;

  dev = typeof dev !== 'undefined' ? dev : false;
  message = dev ? 'Renamed' : 'Minified';

  if ( ! options.concat ) {

    // Just rename
    stream = stream.pipe( plugins.rename( options.slug+'.min.js' ) );

  } else {

    // Combine
    if ( dev ) stream = stream.pipe( plugins.sourcemaps.init({ loadMaps: true }) );

    stream = stream
      .pipe( plugins.concat('combined.js') )
      .pipe( plugins.rename( options.slug+'.min.js' ) );

    if ( dev ) stream = stream.pipe( plugins.sourcemaps.write() );

    message = 'Combined and '+message.toLowerCase();
  }

  if ( ! dev ) {

    // Minify in production
    stream = stream
      .pipe( plugins.bytediff.start() )
      .pipe( plugins.uglify() )
      .pipe( plugins.bytediff.stop() );
  }

  stream = stream
    .pipe( gulp.dest( options.dest ) )
    .on('end', function(){ log( 'JS', message+' to '+options.dest+options.slug+'.min.js') });

  return stream;
};
