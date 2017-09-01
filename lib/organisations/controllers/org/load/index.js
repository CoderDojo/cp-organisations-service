module.exports = function () {
  const ctx = this.context;
  return function (args, cb) {
    const acts = this.export('cd-organisations/acts')[args.ctrl];
    const id = args.id;
    acts.get({ id })
      .asCallback(cb);
  };
};
