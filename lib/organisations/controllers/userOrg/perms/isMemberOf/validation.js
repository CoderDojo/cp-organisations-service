const pick = require('lodash').pick;
const Joi = require('joi');

module.exports = function (definition) {
  return {
    user: Joi.object().required(),
    params: Joi.object().keys(pick(definition, ['userId', 'orgId'])).required(),
  };
};
