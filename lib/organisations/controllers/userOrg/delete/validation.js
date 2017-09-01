const Joi = require('joi');
const pick = require('lodash').pick;

module.exports = function (definition) {
  return pick(definition, ['userId', 'orgId']);
};
