const axios = require('axios');

const axiosInsntance = axios.default.create({
  baseURL: 'https://albitmx.us.auth0.com/',
});

const generateToken = async () => {
  const response = await axiosInsntance.post('/oauth/token', {
    client_id: 'lNpP90GV3miwIWVF0Cr9wVA2kuvJfE63',
    client_secret: '1BMH-GFA5QNBw92ZKvTJexJ5txl6Y4jqEd3LyeFEGBC8CJYKBeSWE8rAfhiZyl7l',
    audience: 'https://albitmx.us.auth0.com/api/v2/',
    grant_type: 'client_credentials',
  });
  console.log('response.data token', response.data.access_token);
  return response.data.access_token;
};

const createUser = async (bodyUser) => {
  try {
    const token = await generateToken();
    console.log('bodyUser', bodyUser);

    const bodyAuth0 = {
      email: bodyUser.email,
      family_name: bodyUser.apellidoPaterno,
      given_name: bodyUser.nombre,
      name: `${bodyUser.nombre} ${bodyUser.apellidoPaterno} ${bodyUser.apellidoMaterno}`,
      nickname: bodyUser.nombre,
      password: bodyUser.password,
      //phone_number: bodyUser.telefono,
      connection: 'Username-Password-Authentication',
      user_id: bodyUser.id,
    };
    const response = await axiosInsntance.post('/api/v2/users', bodyAuth0, {
      headers: { authorization: `Bearer ${token}` },
    });
    console.log('data', response.data);
    return response.data;
  } catch (error) {
    const axiosError = error && error.response && error.response.data;
    console.log('createUser error', axiosError || error);
    return null;
  }
};

module.exports = {
  createUser,
};
