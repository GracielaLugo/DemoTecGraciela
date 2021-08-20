const passport = require('passport');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { roleRights } = require('../config/roles');
const axios = require('axios');

const verifyCallback = (req, resolve, reject, requiredRights) => async (err, user, info) => {
  if (err || info || !user) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
  }
  req.user = user;

  if (requiredRights.length) {
    const userRights = roleRights.get(user.role);
    const hasRequiredRights = requiredRights.every((requiredRight) => userRights.includes(requiredRight));
    if (!hasRequiredRights && req.params.userId !== user.id) {
      return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
    }
  }

  resolve();
};

const auth = (...requiredRights) => async (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
  })
    .then(() => next())
    .catch((err) => next(err));
};

const authAuth0 = async (req, res, next) => {
  let token;
  try {
    // Check if authorization header is present
    if (req.headers && req.headers.authorization) {
      // authorization header is present
      const parts = req.headers.authorization.split(' ');
      if (parts.length === 2) {
        const scheme = parts[0];
        const credentials = parts[1];

        if (/^Bearer$/i.test(scheme)) {
          token = credentials;
        } else {
          throw new ApiError(httpStatus.UNAUTHORIZED, 'Token Malformed');
        }
      } else {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Token Malformed');
      }
    } else {
      // authorization header is not present
      throw new ApiError(httpStatus.UNAUTHORIZED, 'No token found');
    }
    const response = await axios.default.get('https://albitmx.us.auth0.com/userinfo', {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    /* EJEMPLO
    response.data {
      sub: 'auth0|611f40b4820362006c7b303c',
      given_name: 'jose martin',
      family_name: 'perez',
      nickname: 'jose martin',
      name: 'jose martin perez cuevas',
      picture: 'https://s.gravatar.com/avatar/1cb390a2b4973d553250eae2963c55a6?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fjm.png',
      updated_at: '2021-08-20T05:45:38.666Z',
      email: 'el_martin33@hotmail.com',
      email_verified: true
    }
    */
    req.user = response.data;
    req.userId = (response.data.sub || '').split('|')[1];

    next();
  } catch (error) {
    console.log('error', error);

    next(error);
  }
};

module.exports = { authAuth0, auth };
