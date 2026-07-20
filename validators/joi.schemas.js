import Joi from "joi";
const bookSchema = Joi.object({
    code: Joi.number().integer().positive().required(),
    name: Joi.string().min(2).required(),
    category: Joi.string().min(2).required(),
    price: Joi.number().positive().required(),
})
const registerSchema = Joi.object({
    userName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
})
const connsectSchema = Joi.object({
    userName: Joi.string().required(),
    password: Joi.string().min(4).required(),
})
const codeSchema = Joi.object({ code: Joi.number().integer().positive().required() })
const updateBookSchema=bookSchema.fork(['code','name','category','price'],(schema)=>schema.optional())
export { bookSchema, registerSchema, connsectSchema, codeSchema,updateBookSchema }