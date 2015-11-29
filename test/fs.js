var expect = require('chai').expect,
    assert = require('chai').assert,
    sinon  = require('sinon'),
    rewire = require('rewire'),
    filename = 'test.log',
    path = '/tmp/logger-test/';


describe("Write logs - file system", function() {
    var fsAdapter = rewire("../lib/adapters/fs");

    var fsMock, wsMock, sandbox;

    beforeEach(function() {
        sandbox = sinon.sandbox.create({}, {});

        wsMock = sinon.stub();
        wsMock.write = sinon.stub();

        fsMock = sinon.stub();
        fsMock.existsSync = sinon.stub();
        fsMock.mkdirSync = sinon.stub();
        fsMock.createWriteStream = sinon.stub();
        fsMock.createWriteStream.returns(wsMock);
    });

    afterEach(function() {
        // restore the environment as it was before
        sandbox.restore();
    });


    it('should create the log directory', function () {
        new fsAdapter(filename, path, fsMock);

        assert(fsMock.mkdirSync.calledOnce);
    });

    it('should write an opening message when created', function () {
        new fsAdapter(filename, path, fsMock);

        assert(wsMock.write.calledOnce);
    });

    it('should write a message when the log method is called', function () {
        var logger = new fsAdapter(filename, path, fsMock);

        logger.log('an example message');

        assert(wsMock.write.calledTwice);
    });

    it('should throw an error if the log directory cannot be created', function () {
        fsMock.mkdirSync.throws(new Error);

        expect(function() {
            (new fsAdapter(filename, path, fsMock))
        }).to.throw(Error);
    });

    it('shouldn\'t throw an error if the log directory already exists', function () {
        var error = new Error();
        error.code = 'EEXIST';
        fsMock.mkdirSync.throws(error);

        expect(function() {
            (new fsAdapter(filename, path, fsMock))
        }).to.not.throw(Error);
    });

});
