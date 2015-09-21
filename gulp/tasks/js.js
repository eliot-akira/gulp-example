
var gulp = require('gulp'),
    action = {
      clean : require('./js/clean'),
      compile : require('./js/compile'),
      lint : require('./js/lint'),
      minify : require('./js/minify')
    };

module.exports = function JSTasks( config ) {

  config.assets.forEach(function(asset) {

    if ( ! asset.js ) return;

    var slug = asset.js.slug;

    if ( asset.clean ) {
      gulp.task('js-clean-'+slug, function() {
        return action.clean( asset.js );
      });
      cleaned = ['js-clean-'+slug];
    } else {
      cleaned = [];
    }

    if (asset.js.lint) {
      gulp.task('js-lint-'+slug, function() {
        return action.lint( asset.js );
      });
      cleaned.push('js-lint-'+slug);
    }

    gulp.task('js-compile-'+slug, cleaned, function() {
      return action.compile( asset.js );
    });
    gulp.task('js-min-'+slug, ['js-compile-'+slug], function() {
      return action.minify( asset.js );
    });

    gulp.task('js-dev-compile-'+slug, cleaned, function() {
      return action.compile( asset.js, true );
    });
    gulp.task('js-dev-'+slug, ['js-dev-compile-'+slug], function() {
      return action.minify( asset.js, true );
    });

  });

};
