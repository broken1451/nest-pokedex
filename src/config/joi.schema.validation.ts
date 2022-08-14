
import * as Joi from 'joi';

export const joiValidationSchema = Joi.object({
    MONGODB: Joi.required(),
    PORT: Joi.number().default(3005), // si no viene por defecto es 3005 
    DEFAULT_LIMIT: Joi.number().default(6) // si no viene por defecto es 6, se crea la variable en el process.env
});
