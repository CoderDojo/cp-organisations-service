const Joi = require('joi');

module.exports = function () {
  const seneca = this;
  const name = 'org';
  const domain = 'cd-organisations';
  const plugin = 'cd-organisations';
  seneca.context = {};

  const definition = {
    name: Joi.string(),
  };

  return {
    name,
    plugin,
    domain,
    definition,
    acts: {
      create: {
        validation: require('./create/validation')(definition),
        cb: require('./create').bind(this)(),
      },
      load: {
        validation: require('./load/validation')(definition),
        cb: require('./load').bind(this)(),
      },
      list: {
        validation: require('./list/validation')(definition),
        cb: require('./list').bind(this)(),
      },
    },
  };
};
