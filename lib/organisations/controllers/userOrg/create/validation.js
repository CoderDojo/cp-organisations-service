const Joi = require('joi');
const pick = require('lodash').pick;

module.exports = function (definition) {
  return { userOrg: Joi.object().keys(pick(definition, ['userId', 'orgId'])) };
};
