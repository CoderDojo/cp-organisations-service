const _ = require('lodash');
const path = require('path');

module.exports = function (configOverride) {
  const config = require('./config/config.js')();
  const log = require('cp-logs-lib')({ name: 'cp-organisations', level: 'warn' });
  config.log = log.log;
  const seneca = require('seneca')(_.extend(config, configOverride));
  seneca.use(require('seneca-entity'))
    .use(require('seneca-basic'))
    .use(require('seneca-joi'));
  seneca.use('./cd-organisations', {});
  seneca.use(require('cp-permissions-plugin'), {
    config: path.resolve(`${__dirname}/lib/organisations/controllers/perm`) });
  return seneca;
};
