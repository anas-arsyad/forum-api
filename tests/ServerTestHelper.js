const Jwt = require('@hapi/jwt');
const UsersTableTestHelper = require('./UsersTableTestHelper');

const ServerTestHelper = {
  async getAccessToken(userId = 'user-00', username = 'testing-dd'+Date.now()) {
    const payloadUser = {
      id: userId,
      username: username,
      password: 'password',
      fullname: 'testing dd',
    };
    await UsersTableTestHelper.addUser(payloadUser);
    return Jwt.token.generate(payloadUser, process.env.ACCESS_TOKEN_KEY);
  },
};

module.exports = ServerTestHelper;
