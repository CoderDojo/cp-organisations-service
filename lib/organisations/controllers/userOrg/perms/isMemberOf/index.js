module.exports = function () {
  return function (args, done) {
    const seneca = this;
    let allowed = false;
    const userId = args.user.id;
    const orgId = args.params.orgId || args.params.org.id;
    seneca.act({ role: 'cd-organisations', entity: 'userOrg', cmd: 'list', query: { orgId, userId } },
      (err, userOrg) => {
        if (err) return done(null, { allowed: false });
        if (userOrg.length > 0) allowed = true;
        done(null, { allowed });
      });
  };
};
