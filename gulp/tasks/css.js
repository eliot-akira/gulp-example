
var gulp = require('gulp'),
    action = {
      clean : require('./css/clean'),
      compile : require('./css/compile'),
      minify : require('./css/minify')
    };

module.exports = function CSSTasks( config ) {

  for (var asset of config.assets) {

    if ( ! asset.css ) continue;

    var slug = asset.css.slug;

    // Remove old bundle
    gulp.task('css-clean-'+slug, function() {
      return action.clean( asset.css );
    });

    // Lint here


    // Compile Sass, etc.
    gulp.task('css-compile-'+slug, ['css-clean-'+slug], function() {
      return action.compile( asset.css );
    });
    gulp.task('css-compile-dev-'+slug, ['css-clean-'+slug], function() {
      return action.compile( asset.css, true );
    });

    // Combine & minify
    gulp.task('css-min-'+slug, ['css-compile-'+slug], function() {
      return action.minify( asset.css );
    });
    gulp.task('css-dev-'+slug, ['css-compile-dev-'+slug], function() {
      return action.minify( asset.css, true );
    });

  }

};
