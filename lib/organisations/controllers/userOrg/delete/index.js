module.exports = function () {
  const ctx = this.context;
  return function (args, cb) {
    const acts = this.export('cd-organisations/acts')[args.ctrl];
    acts.delete({ query: { userId: args.userId, orgId: args.orgId } })
      .asCallback(cb);
  };
};
