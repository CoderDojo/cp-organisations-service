module.exports = {
  list: [{
    role: 'basic-user',
    customValidator: [{
      role: 'cd-users',
      cmd: 'is_self',
    }]
  }],
};
