require('appmetrics').monitor();
const appName = require('./../package').name;
const express = require('express');
const log4js = require('log4js');
const localConfig = require('./config/local.json');
const Cloudant = require('cloudant');
const bodyParser = require('body-parser');
const validator = require('express-validator');

const logger = log4js.getLogger(appName);
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());

require('./services/index')(app);
require('./routers/index')(app);

//connect to cloudant nosql
const me = '41ef6511-695d-4541-91f9-d89ee715aaf5-bluemix'; // Set this to your own account
const password = '0211d41b71640ee6b52e30dca397c4f97ba5bf83f8782e94949137b34e591181';
const cloudant = Cloudant({account:me, password:password});

// Add your code here

const routes = require('./routers/phonebook');
routes(app);

const port = process.env.PORT || localConfig.port;
app.listen(port, function(){
	logger.info(`iphonebook listening on http://localhost:${port}`);
	
	logger.info(`OpenAPI (Swagger) spec is available at http://localhost:${port}/swagger/api`);
	logger.info(`Swagger UI is available at http://localhost:${port}/explorer`);
});

cloudant.db.list(function(err, allDbs) {
    logger.info('Cloudant databases: %s', allDbs.join(', '))
});
