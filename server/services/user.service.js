const bcrypt = require("bcryptjs");
const User = require("../models/User");
const tokenService = require("./token.service");
const UserDto = require("../dtos/user.dto");

class UserService {
  async registration(login, email, password, avatar) {
    const candidateLogin = await User.findOne({ login });
    const candidateEmail = await User.findOne({ email });

    if (candidateLogin || candidateEmail) {
      return res.status(400).json({ message: "Логін або пошта зайняті" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      login,
      email,
      password: hashedPassword,
      avatar,
    });

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({
      id: user._id,
      email: user.email,
    });
    await tokenService.saveToken(userDto._id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
      message: `Ласкаво просимо, ${userDto.login}!`,
    };
  }

  async login(email, password) {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Користувача не знайдено" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Не вірний пароль, спробуйте знову" });
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({
      id: user._id,
      email: user.email,
    });
    await tokenService.saveToken(userDto._id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
      message: `Ласкаво просимо, ${userDto.login}!`,
    };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      return res.status(401).json({ message: "Немає авторизації" });
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      return res.status(401).json({ message: "Немає авторизації" });
    }

    const user = await User.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({
      id: user._id,
      email: user.email,
    });

    await tokenService.saveToken(userDto._id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async getOneUser(userId) {
    const user = await User.findOne({ _id: userId });
    const userDto = new UserDto(user);
    return userDto;
  }

  async getFilteredUsersByEmail(filterValue) {
    const users = await User.find({
      email: { $regex: new RegExp(filterValue, "gim") },
    });
    return users;
  }

  async addUserOwnTask(userId, taskId) {
    await User.updateOne({ _id: userId }, { $push: { ownTasks: taskId } });
  }

  async removeUserOwnTask(userId, taskId) {
    await User.updateOne({ _id: userId }, { $pull: { ownTasks: taskId } });
  }

  async addUserOtherTask(userId, taskId) {
    await User.updateOne({ _id: userId }, { $push: { otherTasks: taskId } });
  }

  async removeUserOtherTask(userId, taskId) {
    await User.updateOne({ _id: userId }, { $pull: { otherTasks: taskId } });
  }
}

module.exports = new UserService();
