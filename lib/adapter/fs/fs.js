'use strict';

var fs = require('fs');
var adapter;

function fsAdapter() {
    adapter = new fs;

    return adapter;
}

fsAdapter.prototype = {
    mkdir: function (directory) {
        adapter.mkdirSync(directory);
    }
};

module.exports = fsAdapter;