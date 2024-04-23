'use strict';
const express = require('express');
const router = express.Router();
const Caracteristica = require('../models/caracteristica.model');
router.post('/registrarCaracteristica', (req, res) => {
    let body = req.body;
    let nuevoCaracteristica = new Caracteristica({
        caracteristica: body.caracteristica,
        estado: 'activo'
    });
    nuevoCaracteristica.save((err, caracteristicaDB) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudo registrar la característica, ocurrió el siguiente error:',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Se ha guardado la caracteristica',
                caracteristicaDB
            });
        }
    });
});
router.get('/listarCaracteristica', (req, res) => {
    Caracteristica.find((err, listaCaracteristica) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudieron listar las características',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Se listaron las características adecuadamente',
                listaCaracteristica
            });
        }
    });
});
router.put('/inactivar-caracteristica', (req, res) => {
    let body = req.body;
    Caracteristica.updateOne({ _id: body._id }, {
            $set: {
                'estado': 'inactivo'
            }
        },
        function(error, caractDB) {
            if (error) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo inactivar la asistencia',
                    error
                });
            } else {
                res.json({
                    resultado: true,
                    caractDB: caractDB
                })
            }
        }
    )
});
router.put('/activar-caracteristica', (req, res) => {
    let body = req.body;
    Caracteristica.updateOne({ _id: body._id }, {
            $set: {
                'estado': 'activo'
            }
        },
        function(error, caractDB) {
            if (error) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo inactivar la asistencia',
                    error
                });
            } else {
                res.json({
                    resultado: true,
                    caractDB: caractDB
                })
            }
        }
    )
});
router.put('/modificar-caracteristica', (req, res) => {
    let body = req.body;
    Caracteristica.updateOne({ '_id': body._id }, {
        $set: {
            caracteristica: body.caracteristica
        }
    }, (err, caracteristicaDB) => {
        if (err) {
            return res.json({
                resultado: false,
                msj: 'La caracteristica no pudo ser modificada',
                err
            });
        } else {
            return res.json({
                resultado: true,
                mjs: 'caracteristica modificada correctamente',
                caracteristicaDB
            });
        }
    });
});
router.get('/buscar-caracteristica-objectid', (req, res) => {
    let id = req.param.id;
    Caracteristica.find({ id: id }, (err, id) => {
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
router.delete('/borrar-caracteristica', (req, res) => {
    let body = req.body;
    Caracteristica.deleteOne({ '_id': body._id }, (err) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudo eliminar la caracteristica '
            });
        } else {
            res.json({
                resultado: true,
                msj: 'La caracteristica se elimino correctamente'
            })
        }
    })
})
module.exports = router;