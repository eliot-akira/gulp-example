var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var log = require('../../util/log');
var path = require('path');
var setDefault = require('../../util/set-default.js');

var browserify = require('browserify');

  // Browserify -> gulp stream
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');


module.exports = function runCompileJS( options, dev ) {

  dev = setDefault.value( dev, false );

  var entry = path.join(options.src, options.entry+options.extension);
  var logTag = 'Browserify';

  var stream = browserify( setDefault.props( options.browserify, {
    entries: entry,
    debug: dev, // Sourcemap
    // cache: {}, packageCache: {},
    // fullPaths: true,
    extensions: options.extension
    // paths: ['./node_modules', options.src]
  }));

  if ( options.babel ) {

    var babelify = require('babelify');

    stream = stream.transform( babelify.configure( options.babelOptions || {} ) );
    logTag = 'Babelify';

  } else if ( options.coffee ) {
    stream = stream.transform( 'coffeeify' );
    logTag = 'Coffeeify';
  }

  stream = stream.bundle();

  if ( dev ) stream = stream.on('error', function(err){ // Prevent error from stopping watch
    console.log(err.message);
    this.emit("end"); // Keep stream going
  });

  stream = stream
    .pipe( source( options.slug+'.js' ) )
    .pipe( buffer() ) // Browserify -> gulp stream
    .pipe( gulp.dest( options.dest ) )
    .on('end', function(){
      log( logTag, 'Compiled with'+(dev?'':'out')+' sourcemap from '+
        entry+' to '+path.join(options.dest, options.slug+'.js'));
    });

  return stream;
};
