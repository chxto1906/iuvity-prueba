const request = require('supertest');
const app = require('../app');
const UsuariosService = require('../services/usuario.service');
const { createUsuarioSchema, updateUsuarioSchema } = require('../schemas/usuario.model');
const UsuarioService = require('../services/usuario.service');

describe('Pruebas sobre la API de usuarios', () => {
    
    describe('GET /api/user', () => {

        let response;
        beforeEach(async () => {
            response = await request('http://localhost:3000').get('/api/user').send();
        })

        it('La ruta funciona', async () => {
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        });

        it('La petición nos devuelve un array de usuarios', async () => {
            expect(response.body.data).toBeInstanceOf(Array);
        });

    });

    describe('GET /api/user/:iduser', () => {

        let usuario;
        let response;
        beforeEach(async () => {
            const usuariosService = new UsuariosService();
            usuario = await usuariosService.create({
                "nombre":"Test",
                "apellido": "Test",
                "edad":34,
                "email":"test@test.com",
                "telefono":"test"
            });
            response = await request('http://localhost:3000').get('/api/user/'+usuario.insertedId).send();
        });

        afterEach(async () => {
            const usuariosService = new UsuariosService();
            await usuariosService.deleteOne(usuario.insertedId)
        });


        it('La ruta funciona', async () => {
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        });

        it('La petición nos devuelve un Objeto de usuario', async () => {
            expect(response.body.data).toBeInstanceOf(Object);
        });

    });

    
    describe('POST /api/user', () => {

        const nuevoUsuario = {
            "nombre":"Test",
            "apellido": "Test",
            "edad":34,
            "email":"test@test.com",
            "telefono":"test"
        };
        const usuarioIncorrecto = { "nombre": 'Test' };

        it('La ruta funciona', async () => {
            const response = await request('http://localhost:3000').post('/api/user').send(nuevoUsuario);

            expect(response.status).toBe(201);
            expect(response.headers['content-type']).toContain('json');
        });

        it('Se inserta correctamente', async () => {
            const response = await request('http://localhost:3000').post('/api/user').send(nuevoUsuario);

            expect(response.body.data._id).toBeDefined();
            expect(response.body.data.nombre).toBe(nuevoUsuario.nombre);
        });

        it('Error al insertar', async () => {
            const response = await request('http://localhost:3000').post('/api/user').send(usuarioIncorrecto);

            expect(response.status).toBe(400);
            expect(response.body.error).toBeDefined();
        });

        afterAll(async () => {
            const usuariosService = new UsuariosService();
            await usuariosService.deleteMany(usuarioIncorrecto)
        });

    });

    describe('PUT /api/user/:iduser', () => {

        let usuario;
        let response;
        beforeEach(async () => {
            const usuariosService = new UsuariosService();
            usuario = await usuariosService.create({
                "nombre":"Test",
                "apellido": "Test",
                "edad":34,
                "email":"test@test.com",
                "telefono":"test"
            });
            
        });

        afterEach(async () => {
            const usuariosService = new UsuariosService();
            await usuariosService.deleteOne(usuario.insertedId)
        });

        it('La ruta funciona', async () => {
            response = await request('http://localhost:3000').put(`/api/user/${usuario.insertedId}`).send({
                "nombre":"Test modificado",
                "apellido": "Test",
                "edad":34,
                "email":"test@test.com",
                "telefono":"test"
            });

            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        });

        it('Se actualiza correctamente', async () => {
            const response = await request(app).put(`/api/user/${usuario.insertedId}`).send({
                "nombre":"Test modificado",
                "apellido": "Test",
                "edad":34,
                "email":"test@test.com",
                "telefono":"test"
            });

            expect(response.body.data._id).toBeDefined();
            expect(response.body.data.nombre).toBe('Test modificado');
        });

    });
    

    describe('DELETE /api/trips', () => {

        let usuario;
        let response;
        beforeEach(async () => {
            const usuariosService = new UsuariosService();
            usuario = await usuariosService.create({
                "nombre":"Test",
                "apellido": "Test",
                "edad":34,
                "email":"test@test.com",
                "telefono":"test"
            });
            response = await request(app).delete(`/api/user/${usuario.insertedId}`).send();
        });

        it('La ruta funciona', () => {
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        });

        it('Borra correctamente', async () => {
            const usuariosService = new UsuariosService();
            expect(response.body.data).toBeNull();

            const usuarioEliminado = await usuariosService.get(usuario.insertedId);
            expect(usuarioEliminado).toBeNull();
        })

    })

});