
// Define configuration here
var config = {
  assets : {
    name : 'app',
    js : {
      //babel : true,
      //coffee : true
    },
    css : {
      sass : true
    }
  }
};

// Load defaults
config = require('./gulp/defaults')( config );

// Load tasks
for (var task of [ 'default', 'css', 'js', 'watch' ]) {
    require('./gulp/tasks/'+task)( config );
}
