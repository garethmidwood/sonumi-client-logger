'use strict';

function logAdapter(logname) {
    this.log('===== Created ' + logname + ' =====');
}

logAdapter.prototype.log = function(message) {
    console.log(message);
};

module.exports = logAdapter;