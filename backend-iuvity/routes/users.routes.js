const express = require('express');
const UsuariosService = require('../services/usuario.service');

const { validation } = require("../utils/validationHandler")

const {
    idSchema,
    createUsuarioSchema,
    updateUsuarioSchema,
  } = require("../schemas/usuario.model");

function usersApi(app) {
    const router = express.Router();
    app.use("/api/user", router);

    const usuariosService = new UsuariosService();

    /**
     * Crea usuario
     */
    router.post('/', validation(createUsuarioSchema) , async (req, res, next) => {
        const { body: usuario } = req;
        console.dir(usuario)
        try {
            const createdUser = await usuariosService.create(usuario);
            res.status(201).json({
                data: createdUser.insertedId,
                message: "Usuario creado."
            });
        } catch (err) {
            next(err);
        }
    })

    /**
     * Obtiene lista de usuarios
     */
    router.get('/', async (req, res, next) => {
        try {
            const result = await usuariosService.find();
            res.status(200).json({
              data: result,
              message: "Usuarios listados"
            });
        } catch (err) {
            next(err);
        }
    })

    /**
     * Obtiene un usuario específico por Id
     */
    router.get('/:id', validation({ id: idSchema },"params"), async (req, res, next) => {
        const { id } = req.params;
        try {
            const usuario = await usuariosService.get(id);
            res.status(200).json({
                data: usuario,
                message: "Usuario obtenido."
            });
        } catch (err) {
            next(err);
        }
    })

    /**
     * Actualiza un usuario específico por Id
     */
    router.put('/:id', validation({ id: idSchema },"params"), validation(updateUsuarioSchema), async (req, res, next) => {
        const { id } = req.params;
        const { body: usuario } = req;
        try {
            const updatedusuario = await usuariosService.updateOne(id,usuario);
            const user = await usuariosService.get(id);
            res.status(200).json({
                data: user,
                message: "Usuario actualizado."
            });
        } catch (err) {
            next(err);
        }
    })

    /**
     * Elimina un usuario especifico por Id
     */
    router.delete('/:id', validation({ id: idSchema },"params") , async (req, res, next) => {
        const { id } = req.params;
        try {
            const deletedUsuario = await usuariosService.deleteOne(id);
            res.status(200).json({
                data: deletedUsuario,
                message: "Usuario eliminado."
            });
        } catch (err) {
            next(err);
        }
    })
}






module.exports = usersApi;