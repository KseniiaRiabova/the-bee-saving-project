const Joi = require('joi');

const requestValidateSchema = Joi.object({
  title: Joi.string()
    // .min(5)
    .max(100)
    .required()
    .regex(/^(?!\s*$)[A-Za-z][\w\s.,!'’-]*$/, 'valid title')
    .messages({
      'string.empty': `Title cannot be empty`,
      // 'string.min': 'Title should be at least 5 characters long',
      'string.pattern.name':
        'Title must contain valid characters and not be empty or just spaces.',
    }),
  description: Joi.string()
    .min(3)
    .max(750)
    .required()
    .regex(/^(?!\s*$).+$/, 'valid description')
    .messages({
      'string.empty': `Description cannot be empty`,
      'string.pattern.name':
        'Description must contain valid characters and not be empty or just spaces.',
      'string.min': 'Please enter at least 3 characters.',
    }),
  image: Joi.string().uri().optional().allow(null, '').messages({
    'string.uri': 'Enter valid URL',
  }),
  contactNumber: Joi.string()
    .pattern(/^\+?[1-9]\d{1,14}$/, 'valid contact number')
    .required()
    .messages({
      'string.empty': `Contact number cannot be empty`,
      'string.pattern.name': 'Enter valid contact number.',
    }),
  isActive: Joi.boolean(),
  isAccepted: Joi.boolean(),
  acceptedAt: Joi.date().optional().allow(null, ''),
  canceledAcceptedAt: Joi.date().optional().allow(null, ''),
  completedAt: Joi.date().optional().allow(null, ''),
  beefinderId: Joi.string().optional(),
  beekeeperId: Joi.string().optional().allow(null, ''),

  location: Joi.object({
    type: Joi.string().valid('Point').required(),
    coordinates: Joi.array().items(Joi.number()).length(2).required(),
    city: Joi.string().optional().allow(null, ''),
    country: Joi.string().optional().allow(null, ''),
    street: Joi.string().optional().allow(null, ''),
    houseNumber: Joi.string().optional().allow(null, ''),
    apartment: Joi.string().optional().allow(null, ''),
    postalCode: Joi.string().optional().allow(null, ''),
    fullAddress: Joi.string().optional().allow(null, ''),
  })
    .required()
    .messages({
      'any.required': 'Location coordinates are required.',
    }),
});
const validateRequest = (request) => {
  const { error, value } = requestValidateSchema.validate(request, {
    abortEarly: false,
  });
  if (error) {
    const errorDetails = {};
    error.details.forEach((detail) => {
      errorDetails[detail.context.key] = detail.message;
    });
    throw {
      status: 400,
      details: errorDetails,
    };
  }
  console.log('request validated successfully');
  return value;
};

module.exports = {
  validateRequest,
};
