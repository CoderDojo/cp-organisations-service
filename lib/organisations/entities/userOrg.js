const Joi = require('joi');

module.exports = function () {
  const seneca = this;
  const name = 'userOrg';
  const domain = 'cp_organisations_schema.cd';
  const base = 'user_org';

  const definition = {
    id: Joi.string(),
    userId: Joi.string(),
    orgId: Joi.string(),
  };

  return {
    name,
    domain,
    definition,
    acts: {
      get: {
        validation: { id: definition.id.required() },
        cb(args, cb) {
          const orm = seneca.make$(domain, base);
          orm.load$(args.id, cb);
        },
      },
      search: {
        validation: { query: Joi.object().required() },
        cb(args, cb) {
          const orm = seneca.make$(domain, base);
          orm.list$(args.query, cb);
        },
      },
      save: {
        validation: {
          userOrg: Joi.object().keys({
            userId: definition.userId.required(),
            orgId: definition.orgId.required(),
          }).required(),
        },
        cb(args, cb) {
          const orm = seneca.make$(domain, base);
          orm.save$(args.userOrg, cb);
        },
      },
      delete: {
        validation: { id: Joi.string() },
        cb(args, cb) {
          const orm = seneca.make$(domain, base);
          orm.remove$(args.query, cb);
        },
      },
    },
  };
};
