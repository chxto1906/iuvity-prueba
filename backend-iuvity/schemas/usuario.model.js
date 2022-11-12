const joi = require('joi');

const idSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);


const createUsuarioSchema = {
    nombre:             joi.string().max(100).required(),
    apellido:           joi.string().max(100).required(),
    edad:               joi.number().required(),
    email:              joi.string().email().required(),
    telefono:           joi.string().max(30),
    fecha_creacion:     joi.date().default(Date.now())
}

const updateUsuarioSchema = {
    nombre:                 joi.string().max(100).required(),
    apellido:               joi.string().max(100).required(),
    edad:                   joi.number().required(),
    email:                  joi.string().email().required(),
    telefono:               joi.string().max(30),
    fecha_actualizacion:    joi.date().default(Date.now())
}

module.exports = {
    idSchema,
    createUsuarioSchema,
    updateUsuarioSchema
}