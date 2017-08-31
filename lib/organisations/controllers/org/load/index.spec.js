const lab = (exports.lab = require('lab').script());
const chai = require('chai');

const expect = chai.expect;
chai.use(require('sinon-chai'));
const sinon = require('sinon');
const Promise = require('bluebird');
const fn = require('./index');

lab.experiment('org/load', () => {
  let loadOrg;
  let sandbox;
  let senecaStub;
  let exportMock;
  lab.beforeEach(done => {
    sandbox = sinon.sandbox.create();
    senecaStub = {
      act   : sandbox.stub(),
      export: sandbox.stub(),
    };
    exportMock = {
      org: {
        get: sandbox.stub().returns(Promise.resolve()),
      },
    };
    senecaStub.export.withArgs('cd-organisations/acts').returns(exportMock);
    loadOrg = fn().bind(senecaStub);
    done();
  });

  lab.afterEach(done => {
    sandbox.restore();
    done();
  });

  lab.test('should call get', done => {
    // ARRANGE
    const payload = { ctrl: 'org', id: 1 };
    // ACT
    loadOrg(payload, (err, val) => {
      expect(err).to.not.exist;
      expect(senecaStub.export).to.have.been.calledOnce;
      expect(exportMock.org.get).to.have.been.calledWith({ id: 1 }).any;
      done();
    });
  });
});
