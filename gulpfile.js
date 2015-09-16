
// Define configuration here
var config = {
  assets: {
    name: 'app',
    folder: 'assets',
    js: {
      //babel : true,
      //extension: '.es6'
      //coffee : true
    },
    css: {
      sass : true
    }
  }
};

// Load defaults
config = require('./gulp/defaults')( config );

// Load tasks
[ 'default', 'css', 'js', 'watch' ].forEach(function(task) {
  require('./gulp/tasks/'+task)( config );
});
