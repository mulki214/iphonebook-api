'use strict';

const Cloudant = require('cloudant');
const app = require('express');

module.exports = function(app) {
    var pbook = require('../services/phonebook');


    app.route('/pbook/create')
        .post(pbook.create_contact);

    app.route('/pbook/list')
        .get(pbook.list_contact);

    app.route('/pbook/remove')
        .delete(pbook.delete_contact);

    app.route('/pbook/update')
        .put(pbook.update_contact);
};