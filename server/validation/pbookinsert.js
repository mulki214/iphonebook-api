var valid = require('joi');

exports.pbookinsert = {
    body: {
        name: valid.string().required(),
        phone: valid.number().required(),
        line: valid.string(),
        ig: valid.string(),
        wa: valid.string(),
        fb: valid.string()
    }
};