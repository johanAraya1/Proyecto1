'use strict';
const express = require('express');
const router = express.Router();
const Siniestro = require('../models/siniestroModel');

router.post('/registrarSiniestro', (req, res) => {
    let body = req.body;
    let nuevoSiniestro = new Siniestro({
        categoria: body.categoria,
        descripcionSiniestro: body.descripcionSiniestro,
        estado: body.estado,
        provincia: body.provincia,
        canton: body.canton,
        distrito: body.distrito,
        senas: body.senas,
        coordenadas: body.coordenadas,
        usuarioReporta: body.usuarioReporta,
        foto: body.foto,

        // ruta: ruta.body






    });

    nuevoSiniestro.save((err, siniestroDB) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudo registrar el siniestro, ocurrió el siguiente error:',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'El siniestro ha sido registrado correctamente',
                siniestroDB
            });
        }
    });


});

router.get('/listarSiniestros', (req, res) => {
    Siniestro.find((err, listaSiniestros) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudieron registrar los siniestros',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Los siniestros son:',
                listaSiniestros
            });
        }
    });
});

router.put('/modificarSiniestros', (req, res) => {
    let body = req.body;
    Siniestro.updateOne({ "_id": body._id }, {
            $set: {
                _id: body._id,
                categoria: body.categoria,
                descripcionSiniestro: body.descripcionSiniestro,
                foto: body.foto,
                coordenadas: body.coordenadas,
                usuarioReporta: body.usuarioReporta,
                provincia: body.provincia,
                canton: body.canton,
                distrito: body.distrito,
                senas: body.senas,

                estado: body.estado,

                ruta: ruta.body,


            }

        },
        (error, SiniestroId) => {
            if (error) {
                return res.json({
                    succes: false,
                    msj: "No se pudo actualizar los datos",
                    error


                });

            } else {
                return res.json({
                    succes: true,
                    msj: "Datos actualizados correctamente",
                    SiniestroId

                });
            }
        });

});

router.get('/buscarSiniestroId', function(req, res) {
    let _id = req.query._id
    Siniestro.findOne({ _id: _id }, (err, siniestroDB) => {
        if (err) {
            return res.json({
                success: false,
                msj: 'No se encontró ningun siniestro con ese id',
                err
            });
        } else {
            return res.json({
                success: true,
                siniestroDB
            });
        }
    })
});

router.delete('/eliminarTipoDeSiniestro', (req, res) => {
    let body = req.body;
    Siniestro.deleteOne({ _id: body._id }, (err) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudo eliminar el siniestro'
            });
        } else {
            res.json({
                resultado: true,
                msj: 'El siniestro se eliminó correctamente'
            });
        }
    })
});




module.exports = router;