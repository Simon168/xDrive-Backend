import jwt from 'jsonwebtoken';
import _ from 'lodash';
import bcrypt from 'bcryptjs';

// create token and refresh token
export const createTokens = async (user, secret, refresh_secret) => {
  /*
  jwt.sign({
    data: 'foobar'
    }, 'secret', { expiresIn: '1h' });
  */
  /*
  _.pick Example:
  var object = { 'a': 1, 'b': '2', 'c': 3 };
  _.pick(object, ['a', 'c']);
  // => { 'a': 1, 'c': 3 }
  */
  const createToken = jwt.sign(
    {user: _.pick(user, ['id', 'isAdmin'])},
    secret,
    { expiresIn: '8h'}
  );

  const createRefreshToken = jwt.sign(
    {user: _.pick(user, 'id')},
    refresh_secret,
    {expiresIn: '7d'}
  );
  // promisify and return in an array
  return Promise.all([createToken, createRefreshToken]);
};

// refresh token
export const refreshTokens = async (token, refreshToken, models, SECRET) => {
  // set userId to impossible value
  let userId = -1;
  try {
    // refreshToken: secret base64 encoded
    const { user: { id } } = jwt.decode(refreshToken);
    userId = id;
  } catch (ex) {
    // if err, return an empty object
    return {};
  }

  if (!userId) {
    // if no userId, return an empty object
    return {};
  }

  const user = await models.User.findOne({id: userId});

  if (!user) {
    return {};
  }

  try {
    jwt.verify(refreshToken, user.refreshSecret);
  } catch (ex) {
    return {};
  }
  // return promise all in an array
  const [newToken, newRefreshToken] = await createTokens(user, SECRET, user.refreshSecret);
  // return an object
  return {
    token: newToken,
    refreshToken: newRefreshToken,
    user,
  };
};

// user login authentication
export const tryLogin = async (email, password, models, SECRET) => {
  // extract user
  const user = await models.User.findOne({ email: email});
  if (!user) {
    // user with provided email not found
    throw new Error('Invalid login');
  }
  // compare hashed password with raw password, return true or false
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    // bad password
    throw new Error('Invalid login');
  }
  // return promise all in an array
  const [token, refreshToken] = await createTokens(user, SECRET, user.refreshSecret);
  // return an object with token and refresh token
  return {
    token,
    refreshToken,
  };

};
