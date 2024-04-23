'use strict';
const express = require('express');
const router = express.Router();
const TiposdeSiniestros = require('../models/tipoSiniestro.model');

router.post('/registrarTipoSiniestro', (req, res) => {


    let body = req.body;


    let nuevoSiniestro = new TiposdeSiniestros({
        tipoSiniestro: body.tipoSiniestro,
        estado: body.estado,
        icono: body.icono,
        descripcion: body.descripcion
    });

    nuevoSiniestro.save((err, tipoSiniestroDB) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudo registrar la categoría, ocurrió el siguiente error:',
                error: err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Se ha guardado la categoría',
                tipoSiniestroDB
            });
        }
    });


});

router.get('/listarTipoSiniestro', (req, res) => {

    TiposdeSiniestros.find((err, listaCategorias) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudieron listar las categorías',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Se listaron las categorías adecuadamente',
                listaCategorias
            });
        }
    });
});

router.put('/habilitarTipoSiniestro', function(req, res) {
    let body = req.body;
    TiposdeSiniestros.updateOne({ _id: body._id }, {
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

router.put('/deshabilitarTipoSiniestro', function(req, res) {
    let body = req.body;
    TiposdeSiniestros.updateOne({ _id: body._id }, {
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

router.delete('/eliminarTipoSiniestro', (req, res) => {
    let body = req.body;
    TiposdeSiniestros.deleteOne({ _id: body._id }, (err) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudo eliminar la categoría'
            });
        } else {
            res.json({
                resultado: true,
                msj: 'La categoría se eliminó correctamente'
            });
        }
    })
});

router.put("/modificar-categoria-incidente", (req, res) => {
    let identificacion = req.body.identificacion;
    let body = req.body;
    TiposdeSiniestros.updateOne({ _id: identificacion }, {
        $set: {
            tipoSiniestro: body.tipoSiniestro,
            estado: body.estado,
            icono: body.icono,
            descripcion: body.descripcion
        }
    }, (err, categoriaModificada) => {
        if (err) {
            res.json({
                resultado: false,
                msj: "La categoría no pudo ser modificada debido al siguiente error: ",
                error: err
            });
        } else {
            res.json({
                resultado: true,
                msj: "La categoría se ha modificado correctamente!",
                categoriaModificada
            });
        }
    })
});


router.get("/buscar-incidente", (req, res) => {
    let identificacion = req.query.identificacion;
    TiposdeSiniestros.findOne({ _id: identificacion }, (err, categoriaBuscada) => {
        if (err) {
            res.json({
                resultado: false,
                msj: "No se ha encontrado la categoría de incidente buscada",
                error: err
            });
        } else {
            res.json({
                resultado: true,
                msj: "La categoría buscada es la siguiente: ",
                categoriaBuscada
            });
        }
    })
});


module.exports = router;