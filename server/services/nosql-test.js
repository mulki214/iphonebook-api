var Cloudant = require('cloudant');

var me = '41ef6511-695d-4541-91f9-d89ee715aaf5-bluemix'; // Set this to your own account
var password = '0211d41b71640ee6b52e30dca397c4f97ba5bf83f8782e94949137b34e591181';

// Initialize the library with my account.
var cloudant = Cloudant({account:me, password:password});

cloudant.db.list(function(err, allDbs) {
    console.log('All my databases: %s', allDbs.join(', '))
});

