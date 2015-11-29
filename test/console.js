var expect = require('chai').expect,
    assert = require('chai').assert,
    sinon  = require('sinon'),
    rewire = require('rewire'),
    logname = 'test';


describe("Write logs - console", function() {
    var consoleAdapter = rewire("../lib/adapters/console");

    beforeEach(function() {
        sinon.spy(console, 'log');
    });

    afterEach(function() {
        console.log.restore();
    });

    it('should write an opening message when created', function () {
        var logger = new consoleAdapter(logname);

        expect(console.log).to.be.called;
    });

    it('should write a message when the log method is called', function () {
        var logger = new consoleAdapter(logname);

        logger.log('an example message');

        expect(console.log).to.be.calledTwice;
    });
});
