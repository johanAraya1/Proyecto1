'use strict';
const express = require('express');
const router = express.Router();
const vehiculo = require('../models/vehiculo.model');

router.post('/registrarVehiculo', (req, res) => {
    let body = req.body;
    let nuevoVehiculo = new vehiculo({
        placa: body.placa,
        marca: body.marca,
        modelo: body.modelo,
        ano: body.ano,
        color: body.color,
        tipoDeVehiculo: body.tipoDeVehiculo,
        estilo: body.estilo,
        dobleTraccion: body.dobleTraccion,
        aireAcondicionado: body.aireAcondicionado,
        transmision: body.transmision,
        direccionHidraulica: body.direccionHidraulica,
        bolsasDeAire: body.bolsasDeAire,
        cantidadPasajeros: body.cantidadPasajeros,
        cantidadPuertas: body.cantidadPuertas,
        correoElectronicoPropietario: body.correoElectronicoPropietario,
        correoElectronicoEncargado1: body.numeroDeIdentificacionEncargado1,
        correoElectronicoEncargado2: body.numeroDeIdentificacionEncargado2,
        correoElectronicoEncargado3: body.numeroDeIdentificacionEncargado3,
        correoElectronicoEncargado4: body.numeroDeIdentificacionEncargado4,
        correoElectronicoEncargado5: body.numeroDeIdentificacionEncargado5,
        estado: body.estado,
        foto: body.foto
    });

    nuevoVehiculo.save((err, vehiculoDB) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudo registrar el vehículo, ocurrió el siguiente error:',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Vehículo registrado',
                vehiculoDB
            });
        }
    });


});

router.get('/listarVehiculos', (req, res) => {
    vehiculo.find((err, listaVehiculos) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudieron listar los vehículos',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Vehículos listados',
                listaVehiculos
            });
        }
    });
});

router.put('/deshabilitarVehiculo', function(req, res) {
    let body = req.body;
    vehiculo.updateOne({ _id: body._id }, {
            $set: {
                'estado': 'inactivo'
            }
        },
        function(error, info) {
            if (error) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo desactivar el vehículo',
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

router.put('/habilitarVehiculo', function(req, res) {
    let body = req.body;
    vehiculo.updateOne({ _id: body._id }, {
            $set: {
                'estado': 'activo'
            }
        },
        function(error, info) {
            if (error) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo activar el vehículo',
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

router.delete('/eliminarVehiculo', (req, res) => {
    let body = req.body;
    vehiculo.deleteOne({ _id: body._id }, (err) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudo eliminar el vehículo'
            });
        } else {
            res.json({
                resultado: true,
                msj: 'El vehículo se eliminó correctamente'
            });
        }
    })
});

module.exports = router;