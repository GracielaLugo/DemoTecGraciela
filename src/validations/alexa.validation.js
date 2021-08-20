const Joi = require('joi');

const alexaLink = {
  query: Joi.object().keys({
    client_id: Joi.string().required(),
    response_type: Joi.string().required(),
    state: Joi.string().required(),
    scope: Joi.string().required(),
    redirect_uri: Joi.string().required(),
  }),
};

module.exports = {
  alexaLink,
};
