import Joi from "joi";
const bookSchema = Joi.object({
    name: Joi.string().min(2).max(20).required(),
    category:Joi.array().items(Joi.string().valid('מתח', 'ילדים', 'היסטוריה', 'עיון', 'Fantasy', 'קומיקס')).required(),
    price: Joi.number().positive().required(),
})
const registerSchema = Joi.object({
    userName: Joi.string().required(),
    email: Joi.string().email().lowercase().required(),
    phone:Joi.string().pattern(/^0(?:[23489]|5[0-9]|7[2-9])[-]?\d{7}$/)
        .message('מספר הטלפון אינו תקין לפי הסטנדרט הישראלי')
        .required(),
    password: Joi.string().min(4).required(),
})
const connectSchema = Joi.object({
    userName: Joi.string().required(),
    password: Joi.string().min(4).required(),
})
const idSchema = Joi.object({ id: Joi.string().hex().length(24).required() })
const idUserSchema=idSchema.fork(['id'],(schema)=>schema.optional())
const updateBookSchema = bookSchema.fork(['name', 'category', 'price'], (schema) => schema.optional())
export { bookSchema, registerSchema, connectSchema, idSchema, updateBookSchema,idUserSchema}