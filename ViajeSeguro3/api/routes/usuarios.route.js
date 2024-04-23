"use strict";

const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuarios.model');
const InicioSesion = require("../models/login.model");

router.post('/registrar-usuarios', (req, res) => {
    let body = req.body;
    let nuevoUsuario = new Usuario({
        tipoDeUsuario: body.tipoDeUsuario,
        primerNombre: body.primerNombre,
        segundoNombre: body.segundoNombre,
        primerApellido: body.primerApellido,
        segundoApellido: body.segundoApellido,
        tipoDePersona: body.tipoDePersona,
        tipoDeIdentificacion: body.tipoDeIdentificacion,
        numeroDeIdentificacion: body.numeroDeIdentificacion,
        genero: body.genero,
        numeroDeTelefono: body.numeroDeTelefono,
        // correoElectronico: body.correoElectronico,
        // password: body.password,
        // confirmarPassword: body.confirmarPassword,
        profesion: body.profesion,
        montoBase: body.montoBase,
        tarifaPlataforma: body.tarifaPlataforma,
        cargosAdicionales: body.cargosAdicionales,
        categorias: body.categorias,
        provincia: body.provincia,
        canton: body.canton,
        distrito: body.distrito,
        estado: body.estado,
        img: body.img
    });

    nuevoUsuario.save((err, usuarioDB) => {
        if (err) {
            res.json({
                resultado: false,
                msj: "El usuario no pudo ser registrado por el siguiente error: ",
                error: err
            });

        } else {

            res.json({
                resultado: true,
                msj: "El siguiente usuario se registro correctamente: ",
                usuarioDB
            });
        }
    });

});

router.get("/listar-usuarios", (req, res) => {
    Usuario.find((err, listaDePersonas) => {
        if (err) {
            res.json({
                resultado: false,
                msj: "No se ha podido recuperar la lista de usuarios",
                error: err
            });
        } else {
            res.json({
                resultado: true,
                msj: "Se ha obtenido la lista de usuarios correctamente",
                listaDePersonas
            });
        }
    });
});

router.get("/buscar-perfil-usuario", (req, res) => {
    let usuarioID = req.query.usuarioID;

    Usuario.findOne({ _id: usuarioID }, (err, usuarioDB) => {
        if (err) {
            return res.json({
                success: false,
                text: "No se ha encontrado a ninguna persona con esa identificación",
                error: err
            });
        } else {
            return res.json({
                success: true,
                text: "La información del usuario buscado es la siguiente: ",
                usuarioBuscado: usuarioDB
            });
        }
    })
});

router.get('/listar-correo', (requ, resp) => {
    InicioSesion.find((err, coleccionInicioSesionDB) => {
        if (err) {
            resp.json({
                resultado: false,
                error: err
            });

        } else {
            resp.json({
                resultado: true,
                coleccionInicioSesionDB: coleccionInicioSesionDB
            });
        }
    });
});

router.get('/listar-usuarios', (request, response) => {
    Usuario.find((err, coleccionUsuariosDB) => {
        if (err) {
            response.json({
                resultado: false,
                error: err
            });
        } else {
            response.json({
                resultado: true,
                coleccionUsuariosDB: coleccionUsuariosDB
            });
        }
    });
});

router.get('/buscar-usuarioId', (req, res) => {
    let id = req.query.id;

    InicioSesion.find({ idMongoVar: id }, (err, id) => {
        if (err) {
            return res.json({
                success: false,
                Mensaje: 'No se encontro ningun usuario con ese tipo ',
                error: err
            });
        } else {
            return res.json({
                id

            });

        }
    })
});

router.get('/buscar-usuariodb', (req, res) => {
    let id = req.param.id;

    Usuario.find({ id: id }, (err, id) => {
        if (err) {
            return res.json({
                resultado: false,
                error: err
            });
        } else {
            return res.json({
                id
            });
        }
    });
});

router.put('/habilitarPersona', function(req, res) {
    let body = req.body;
    Usuario.updateOne({ _id: body._id }, {
            $set: {
                'estado': 'activo'
            }
        },
        function(error, info) {
            if (error) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo activar la persona',
                    error
                });
            } else {
                res.json({
                    resultado: true,
                    info: info
                })
            }
        }
    )
});

router.put('/deshabilitarPersona', function(req, res) {
    let body = req.body;
    Usuario.updateOne({ _id: body._id }, {
            $set: {
                'estado': 'inactivo'
            }
        },
        function(error, info) {
            if (error) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo desactivar la persona',
                    error
                });
            } else {
                res.json({
                    resultado: true,
                    info: info
                })
            }
        }
    )
});

router.delete("/eliminar-usuario", (req, res) => {
    let identificacion = req.query.identificacion;
    Usuario.deleteOne({ _id: identificacion }, (err) => {
        if (err) {
            res.json({
                resultado: false,
                msj: "No se ha podido eliminar el usuario debido al siguiente error: ",
                error: err
            });
        }
    })
});

router.post('/registrar-categorias', (req, res) => {
    let body = req.body;
    let error;
    let categorias = JSON.parse(body.categorias);
    categorias.forEach(categoria => {
        Usuario.update({ _id: body._id }, {
                $push: {
                    'categorias': {
                        categoria: categoria
                    }
                }
            },
            (error) => {
                if (error) {
                    error = error
                }
            }
        )
    });
    if (error) {
        return res.json({
            resultado: false,
            msj: 'No se pudieron agregar las categorias por el siguiente error: ',
            error
        });
    } else {
        return res.json({
            resultado: true,
            msj: 'Se agregaron las categorias correctamente'
        })
    }
});

router.put('/modificarUsuarios', (req, res) => {
    let body = req.body;
    Usuario.updateOne({ '_id': body._id }, {
            $set: {
                tipoDeUsuario: body.tipoDeUsuario,
                primerNombre: body.primerNombre,
                segundoNombre: body.segundoNombre,
                primerApellido: body.primerApellido,
                segundoApellido: body.segundoApellido,
                tipoDePersona: body.tipoDePersona,
                tipoDeIdentificacion: body.tipoDeIdentificacion,
                genero: body.genero,
                numeroDeTelefono: body.numeroDeTelefono,
                correoElectronico: body.correoElectronico,
                password: body.password,
                confirmarPassword: body.confirmarPassword,
                profesion: body.profesion,
                montoBase: body.montoBase,
                tarifaPlataforma: body.tarifaPlataforma,
                cargosAdicionales: body.cargosAdicionales,
                provincia: body.provincia,
                canton: body.canton,
                distrito: body.distrito,
                img: body.img
            }
        },
        (err, usuarioDB) => {
            if (err) {
                return res.json({
                    success: false,
                    msj: ' No se pudieron actualizar los datos de la persona',
                    err
                });
            } else {
                return res.json({
                    success: true,
                    msj: 'Los datos de la persona se modificaron con exito',
                    cliente: usuarioDB
                })
            }
        });
});


module.exports = router;