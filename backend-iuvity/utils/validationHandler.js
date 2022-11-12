const Joi = require("joi");
const boom = require("boom");

function validate(data, schemaJson) {
  const schema = Joi.object(schemaJson);

  return schema.validate(data);
  //return  Joi.valid() Joi.validate(data, schema);
}

function validation(schema, check = "body") {
  return function(req, res, next) {
    const { error, value } = validate(req[check], schema);
    if (error) {
      next(boom.badRequest(error))
    } else {
      req[check] = value
      next()
    }
  };
}

module.exports = { validation };
