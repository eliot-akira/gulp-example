
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var log = require('../../util/log');
var path = require('path');
var setDefault = require('../../util/set-default.js');

module.exports = function runMinifyCSS( options, dev ) {

  var stream = gulp.src( options.files );
  var message;

  dev = (typeof dev !== 'undefined') ? dev : false;
  message = dev ? 'Renamed' : 'Minified';

  if ( ! options.concat ) {

    // Just rename
    stream = stream.pipe( plugins.rename( options.slug+'.min.css' ) );

  } else {

    // Combine
    if ( dev ) stream = stream.pipe( plugins.sourcemaps.init({ loadMaps: true }) );

    stream = stream.pipe( plugins.concat( options.slug+'.css' ) );

    if ( dev ) stream = stream.pipe( plugins.sourcemaps.write() );

    stream = stream.pipe( plugins.rename( options.slug+'.min.css' ) );

    message = 'Combined and '+message.toLowerCase();
  }

  if ( ! dev ) {

    options.minify = setDefault.props( options.minify, {
      keepSpecialComments : false,
      relativeTo : options.dest,
      processImport: false
    });

    // Minify in production
    stream = stream
      .pipe( plugins.bytediff.start() )
      .pipe( plugins.minifyCss( options.minify ))
      .pipe( plugins.bytediff.stop() );
  }

  stream = stream
    .pipe( gulp.dest( options.dest ) )
    .on('end', function(){
      log( 'CSS', message+' to '+path.join(options.dest, options.slug+'.min.css'));
    });

  return stream;

};
