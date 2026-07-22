import Joi from "joi";
const bookSchema = Joi.object({
    name: Joi.string().min(2).required(),
    category: Joi.string().min(2).required(),
    price: Joi.number().positive().required(),
})
const registerSchema = Joi.object({
    userName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
})
const connectSchema = Joi.object({
    userName: Joi.string().required(),
    password: Joi.string().min(4).required(),
})
const idSchema = Joi.object({ id: Joi.string().hex().length(24).required()})
//const idUserSchema=idSchema.fork(['id'],(schema)=>schema.optional())
const updateBookSchema=bookSchema.fork(['name','category','price'],(schema)=>schema.optional())
export { bookSchema, registerSchema, connectSchema, idSchema,updateBookSchema,/*idUserSchema*/ }