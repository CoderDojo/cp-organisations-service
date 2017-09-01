const Joi = require('joi');
const pick = require('lodash').pick;

module.exports = function (definition) {
  return { org: Joi.object().keys(pick(definition, ['name'])) };
};
