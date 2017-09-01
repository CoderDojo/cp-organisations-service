const Joi = require('joi');

module.exports = function () {
  const seneca = this;
  const name = 'userOrg';
  const domain = 'cd-organisations';
  const plugin = 'cd-userOrg';
  seneca.context = {};

  const definition = {
    id: Joi.string(),
    userId: Joi.string(),
    orgId: Joi.string(),
  };

  return {
    name,
    plugin,
    domain,
    definition,
    acts: {
      isMemberOf: {
        validation: require('./perms/isMemberOf/validation')(definition),
        cb: require('./perms/isMemberOf').bind(this)(),
      },
      list: {
        validation: { joi$: require('./list/validation')(definition) },
        cb: require('./list').bind(this)(),
      },
      create: {
        validation: require('./create/validation')(definition),
        cb: require('./create').bind(this)(),
      },
      delete: {
        validation: require('./delete/validation')(definition),
        cb: require('./delete').bind(this)(),
      },
    },
  };
};
