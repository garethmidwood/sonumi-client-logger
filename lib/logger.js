'use strict';

function logger(logAdapter) {
    this.logAdapter = logAdapter;
}

logger.prototype.log = function log(message) {
    this.logAdapter.log(message);
};

module.exports = logger;