'use strict';

var defaultFs      = require('fs');

var fs;

function createLogDirectory(logPath) {
    try {
        fs.mkdirSync(logPath);
    } catch(e) {
        if (e.code != 'EEXIST') {
            throw e;
        }
    }
}

function logAdapter(logname, logPath, fileStream) {
    var self = this;

    fs = (!fileStream) ? defaultFs : fileStream;

    if (!logPath) {
        logPath = '/tmp/logs/';
    }

    createLogDirectory(logPath);

    self.logFilename = logname;

    self.logFile = fs.createWriteStream(logPath + logname, {flags: 'a'});

    self.log('===== Created ' + logname + ' =====');
}

logAdapter.prototype.log = function(message) {
    var d = new Date();
    var formattedDate = d.toLocaleString();
    var prefix = (this.logFilename + '                         ').substring(0, 25);

    this.logFile.write(formattedDate + '::: ' + message + "\n");
};

module.exports = logAdapter;