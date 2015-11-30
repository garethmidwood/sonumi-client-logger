'use strict';

var defaultLogAdapter = require('./adapter/logger/winston');
var defaultFsAdapter = require('./adapter/fs/fs');

function logger(logDirectory, adapters) {

    var fsAdapter = adapters.hasOwnProperty('fs') ? adapters['fs'] : defaultFsAdapter;
    var logAdapter = adapters.hasOwnProperty('logger') ? adapters['logger'] : defaultLogAdapter;

    try {
        fsAdapter.mkdir(logDirectory);
    } catch(e) {
        if (e.code != 'EEXIST') {
            throw e;
        }
    }

    logAdapter.addLogFile('errors', logDirectory + '/errors.log', 'error');

    return logAdapter;
}

module.exports = logger;