
var gulp = require('gulp'),
    action = {
      clean : require('./css/clean'),
      compile : require('./css/compile'),
      minify : require('./css/minify')
    };

module.exports = function CSSTasks( config ) {

  config.assets.forEach(function(asset) {

    if ( ! asset.css ) return;

    var slug = asset.css.slug;
    var cleaned;

    // TODO: Lint task

    if ( asset.clean ) {
      gulp.task('css-clean-'+slug, function() {
        return action.clean( asset.css );
      });
      cleaned = ['css-clean-'+slug];
    } else {
      cleaned = [];
    }

    // Compile Sass, etc.
    gulp.task('css-compile-'+slug, cleaned, function() {
      return action.compile( asset.css );
    });
    gulp.task('css-compile-dev-'+slug, cleaned, function() {
      return action.compile( asset.css, true );
    });

    // Combine & minify
    gulp.task('css-min-'+slug, ['css-compile-'+slug], function() {
      return action.minify( asset.css );
    });
    gulp.task('css-dev-'+slug, ['css-compile-dev-'+slug], function() {
      return action.minify( asset.css, true );
    });

  });

};
