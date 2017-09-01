const Joi = require('joi');

module.exports = function () {
  const seneca = this;
  const name = 'org';
  const domain = 'cp_organisations_schema.cd';
  const base = 'organisations';

  const definition = {
    id: Joi.string(),
    createdBy: Joi.string(),
    name: Joi.string(),
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
        validation: { org: Joi.object().required() },
        cb(args, cb) {
          const orm = seneca.make$(domain, base);
          orm.save$(args.org, cb);
        },
      },
      delete: {
        validation: { id: Joi.string() },
        cb(args, cb) {
          const orm = seneca.make$(domain, base);
          orm.remove$(args.id, cb);
        },
      },
    },
  };
};
