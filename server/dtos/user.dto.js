module.exports = class UserDto {
  email;
  id;
  login;
  avatar;
  ownTasks;
  otherTasks;

  constructor(model) {
    this.email = model.email;
    this._id = model._id;
    this.login = model.login;
    this.avatar = model.avatar;
    this.ownTasks = model.ownTasks;
    this.otherTasks = model.otherTasks;
  }
};
