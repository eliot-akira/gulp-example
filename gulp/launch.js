
module.exports = function launch( config ) {
here
  // Load defaults
  config = require('./defaults')( config );

  // Load tasks
  config.tasks.forEach(function( task ) {
    require('./tasks/'+task)( config );
  });
};
