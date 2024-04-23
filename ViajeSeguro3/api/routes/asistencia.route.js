'use strict';
const express = require('express');
const router = express.Router();
const Asistencia = require('../models/asistencia.model');

router.post('/registrarAsistencia', (req, res) => {
    let body = req.body;
    let nuevaAsistencia = new Asistencia({
        tipoAsistencia: body.tipoAsistencia,
        descripcionAsistencia: body.descripcionAsistencia,
        coordenadas: body.coordenadas,
        usuarioSolicita: body.usuarioSolicita,
        provincia: body.provincia,
        canton: body.canton,
        distrito: body.distrito
    });
    nuevaAsistencia.save((err, solicitudDB) => {
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
                solicitudDB
            });
        }
    });
});
router.get('/listarAsistencia', (req, res) => {
    Asistencia.find((err, listaAsistencia) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudieron registrar las asistencias',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Las asistencias se listaron adecuadamente',
                listaAsistencia
            });
        }
    });
});
router.put('/activar-asistencia', (req, res) => {
    let body = req.body;
    Asistencia.updateOne({ _id: body._id }, {
            $set: {
                'estado': 'activo'
            }
        },
        function(error, asistenciaDB) {
            if (error) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo activar la asistencia',
                    error
                });
            } else {
                res.json({
                    resultado: true,
                    asistenciaDB: asistenciaDB
                })
            }
        }
    )
});
router.put('/inactivar-asistencia', (req, res) => {
    let body = req.body;
    Asistencia.updateOne({ _id: body._id }, {
            $set: {
                'estado': 'inactivo'
            }
        },
        function(error, asistenciaDB) {
            if (error) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo inactivar la asistencia',
                    error
                });
            } else {
                res.json({
                    resultado: true,
                    asistenciaDB: asistenciaDB
                })
            }
        }
    )
});

router.put('/modificarAsistencia', (req, res) => {
    let body = req.body;
    Asistencia.updateOne({ "_id": body._id }, {
            $set: {
                _id: body._id,
                tipoAsistencia: body.tipoAsistencia,
                descripcionAsistencia: body.descripcionAsistencia,
                coordenadas: body.coordenadas,
                usuarioSolicita: body.usuarioSolicita,
                provincia: body.provincia,
                canton: body.canton,
                distrito: body.distrito

            }

        },
        (error, solicitudDB) => {
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
                    solicitudDB

                });
            }
        });

});

router.get('/buscarAsistenciaId', function(req, res) {
    let _id = req.query._id
    Asistencia.findOne({ _id: _id }, (err, solicitudDB) => {
        if (err) {
            return res.json({
                success: false,
                msj: 'No se encontró ninguna Solicitud de Asistencia con ese id',
                err
            });
        } else {
            return res.json({
                success: true,
                solicitudDB
            });
        }
    })
});

router.delete('/eliminarAsistencia', (req, res) => {
    let body = req.body;
    Asistencia.deleteOne({ _id: body._id }, (err) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudo eliminar la asistencia'
            });
        } else {
            res.json({
                resultado: true,
                msj: 'La asistencia se eliminó correctamente'
            });
        }
    })
});
module.exports = router;