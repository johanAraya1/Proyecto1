'use strict';
const express = require('express');
const router = express.Router();
const Ruta = require('../models/rutas.model');

router.post('/registrarRuta', (req, res) => {
    let body = req.body;
    let nuevaRuta = new Ruta({

        nombre: body.nombre,
        descripcion: body.descripcion,
        coordenadas: body.coordenadas,
        usuarioSolicita: body.usuarioSolicita,
        estado: body.estado
    });

    nuevaRuta.save((err, rutasDB) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudo solicitar la asistencia, ocurrió el siguiente error:',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Los datos se enviaron de forma exitosa',
                rutasDB
            });
        }
    });


});

router.get('/listarRutas', (req, res) => {
    Ruta.find((err, listaRutas) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se lograron encontrar rutas debido al siguiente error',
                error: err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Las rutas registradas actualmente son las siguientes:',
                listaRutas: listaRutas
            });
        }
    });
});

router.delete("/eliminar-ruta", (req, res) => {
    let identificacion = req.body.identificacion;

    Ruta.deleteOne({ _id: identificacion }, (err) => {
        if (err) {
            res.json({
                resultado: false,
                msj: "La ruta no se ha eliminado debido al siguiente error: ",
                error: err
            });
        } else {
            res.json({
                resultado: true,
                msj: "La ruta ha sido eliminada correctamente"
            });
        }
    })
});

router.put('/habilitarRutas', function(req, res) {
    let body = req.body;
    Ruta.updateOne({ _id: body._id }, {
            $set: {
                'estado': 'activo'
            }
        },
        function(error, info) {
            if (error) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo activar la ruta',
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

router.put('/deshabilitarRutas', function(req, res) {
    let body = req.body;
    Ruta.updateOne({ _id: body._id }, {
            $set: {
                'estado': 'inactivo'
            }
        },
        function(error, info) {
            if (error) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo desactivar la ruta',
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


module.exports = router;