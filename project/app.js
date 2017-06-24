var mongoose = require('mongoose');
var connectionString = 'mongodb://localhost/pressPortal';
if(process.env.MLAB_PRESS_PORTAL_UNAME) { // check if running remotely
    var username = process.env.MLAB_PRESS_PORTAL_UNAME; // get from environment
    var password = process.env.MLAB_PRESS_PORTAL_PASS;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds135382.mlab.com:35382/heroku_nnbgblqp'; // user yours
}
mongoose.connect(connectionString);
mongoose.Promise = require('q').Promise;

require("../project/services/user.service.server");
require("../project/services/post.service.server");
require("../project/services/comment.service.server");