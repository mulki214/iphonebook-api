'use strict';
const appName = require('./../../package').name;
const Cloudant = require('cloudant');
const log4js = require('log4js');
const logger = log4js.getLogger(appName);

//connect to cloudant nosql
const me = '41ef6511-695d-4541-91f9-d89ee715aaf5-bluemix'; // Set this to your own account
const password = '0211d41b71640ee6b52e30dca397c4f97ba5bf83f8782e94949137b34e591181';
const cloudant = Cloudant({account:me, password:password});

var db = cloudant.db.use("mydb");

exports.create_contact = function(req, res) {

    // req.checkBody("name", "Please enter alphabetic character only.").isAlpha();
    req.checkBody("phone","Please enter numeric character only").isNumeric();
    req.checkBody("email","Please enter valid email format").isEmail();

    var errors = req.validationErrors();
    if (errors) {
        res.send(errors);
        return;
    }

    var data = [
        {
            "name": req.body.name,
            "phone": req.body.phone,
            "line": req.body.line,
            "ig": req.body.ig,
            "wa": req.body.wa,
            "fb": req.body.fb,
            "email": req.body.email
        }
    ];

    db.bulk({docs:data}, function(er) {
        if (er) {
            throw er;
        }

        logger.info('Inserted all data');
    });

    res.status(200)
    res.json({
        status: 200,
        data: data,
        message: 'Data successfully inserted'
    });
};

exports.list_contact = function(req, res) {
    var id = req.query.id;
    if(id != 'all'){
        db.get(id, function(er, result) {
            if (er) {
                throw er;
            }

            logger.info('Data successfully retrieved');

            res.status(200);
            res.json({
                status: 200,
                data: result,
                message: 'Data retrieved'
            })
        });
    }else {
        db.list({include_docs: true}, function (er, result) {
            if (er) {
                throw er;
            }

            var data = result.rows;
            var json = [];

            for (var i = 0; i < data.length; i++) {
                json.push(data[i].doc);
            }

            logger.info('Data successfully retrieved');

            res.status(200);
            res.json({
                status: 200,
                data: json,
                message: 'Data retrieved'
            })
        });
    }
};

exports.update_contact = function(req, res) {
    // req.checkBody("name", "Please enter alphabetic character only.").isAlpha();
    req.checkBody("phone","Please enter numeric character only").isNumeric();
    req.checkBody("email","Please enter valid email format").isEmail();

    var errors = req.validationErrors();
    if (errors) {
        res.send(errors);
        return;
    }

    var id = req.body.id;
    var rev = req.body.rev;

    var data = {
            "_id":id,
            "_rev":rev,
            "name": req.body.name,
            "phone": req.body.phone,
            "line": req.body.line,
            "ig": req.body.ig,
            "wa": req.body.wa,
            "fb": req.body.fb,
            "email": req.body.email
        };

    db.insert(data, function(er) {
        if (er) {
            throw er;
        }

    });

    logger.info('Data successfully updated');

    res.status(200)
    res.json({
        status: 200,
        data: data,
        message: 'Data successfully updated'
    });

};

exports.delete_contact = function(req, res) {

    var id = req.body.id;
    var rev = req.body.rev;

    db.destroy(id, rev, function(er) {
        if (er) {
            throw er;
        }

    });

    logger.info('Data successfully deleted');

    res.status(200)
    res.json({
        status: 200,
        message: 'Data successfully deleted'
    });

};
