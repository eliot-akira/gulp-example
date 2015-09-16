
var gulp = require('gulp'),
		watch    = require('gulp-watch'),
  	log = require('../util/log');

module.exports = function watchTasks( config ) {

	// ----- Watch during development -----

	gulp.task('watch', function () {

	  for (var asset of config.assets) {

	    if ( asset.css && asset.css.watch ) {
	      log( 'Watching', 'css-dev-'+asset.css.slug);
	      gulp.watch( asset.css.watch, function () {
	        log( 'Changed', 'css-dev-'+asset.css.slug);
	        gulp.start( ['css-dev-'+asset.css.slug] );
	      });
	    }

	    if ( asset.js && asset.js.watch ) {
	      log( 'Watching', 'js-dev-'+asset.js.slug);
	      gulp.watch( asset.js.watch, function () {
	        log( 'Changed', 'js-dev-'+asset.js.slug);
	        gulp.start( ['js-dev-'+asset.js.slug] );
	      });
	    }

	    if ( asset.image && asset.image.watch ) {
	      log( 'Watching', 'image-min-'+asset.slug);
	      watch( asset.image.watch, function () {
	        log( 'Changed', 'image-min-'+asset.slug);
	        gulp.start( ['image-min-'+asset.slug] );
	      });
	    }

	  } // End for asset of config.assets
	});

};
