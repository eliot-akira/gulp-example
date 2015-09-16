var gulp = require('gulp'),
    log = require('../util/log'),
    allTasks = [],
    cssTasks = [], cssDevTasks = [],
    jsTasks = [], jsDevTasks = [], cleanTasks = [],
    lintTasks = [], imgTasks = [], zipTasks = [],
    task = '';

module.exports = function defaultTasks( config ) {

  for (var asset of config.assets) {

    if ( asset.css ) {
      task = 'css-min-'+asset.css.slug;
      allTasks.push(task);
      cssTasks.push(task);
      cssDevTasks.push('css-dev-'+asset.css.slug);
      cleanTasks.push('css-clean-'+asset.css.slug);
      lintTasks.push('css-lint-'+asset.css.slug);
    }

    if ( asset.js ) {
      task = 'js-min-'+asset.js.slug;
      allTasks.push(task);
      jsTasks.push(task);
      jsDevTasks.push('js-dev-'+asset.js.slug);
      cleanTasks.push('js-clean-'+asset.css.slug);
      lintTasks.push('js-lint-'+asset.js.slug);
    }

    if ( asset.image ) {
      task = 'image-min-'+asset.slug;
      allTasks.push(task);
      imgTasks.push(task);
    }

    if ( asset.zip ) {
      task = 'zip-'+asset.slug;
      allTasks.push(task);
      zipTasks.push(task);
    }

  } // End for asset of config.assets

  var devTasks = [];

  if ( cssTasks.length ) gulp.task('css', cssTasks);
  if ( cssDevTasks.length ) {
    gulp.task('css-dev', cssDevTasks);
    devTasks = devTasks.concat(cssDevTasks);
  }
  if ( jsTasks.length ) gulp.task('js', jsTasks);
  if ( jsDevTasks.length ) {
    gulp.task('js-dev', jsDevTasks);
    devTasks = devTasks.concat(jsDevTasks);
  }

  if ( cleanTasks.length ) gulp.task('clean', cleanTasks);
  if ( lintTasks.length ) gulp.task('lint', lintTasks);
  if ( imgTasks.length ) gulp.task('img', imgTasks);
  if ( zipTasks.length ) gulp.task('zip', zipTasks);

  gulp.task('dev', devTasks);

  gulp.task('default', allTasks);

};
