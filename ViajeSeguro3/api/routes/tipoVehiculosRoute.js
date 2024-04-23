const express = require('express');
const router = express.Router();
const TipoDeVehiculo = require('../models/tipoVehiculoModel');

router.post('/registrarTipoVehiculo', (req, res) => {

    let body = req.body;
    let nuevoTipoDeVehiculo = new TipoDeVehiculo({
        tipoDeVehiculo: body.tipoDeVehiculo,
        descripcion: body.descripcion,
        estado: body.estado
    });
    //tipovehiculoDB va hacer la varieble en la cual se guardó

    nuevoTipoDeVehiculo.save((err, tipoDeVehiculoDB) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'El tipo de vehículo no pudo ser guardado por el siguiente error: ',
                error: err
            });

        } else {
            res.json({
                resultado: true,
                msj: 'El siguiente tipo de vehículo se registró correctamente: ',
                tipoDeVehiculoDB: tipoDeVehiculoDB
            });
        }
    });


});

router.get('/listarTipoDeVehiculos', (req, res) => {
    TipoDeVehiculo.find((err, listaTipoVehiculos) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudo registrar el tipo de vehículo',
                error: err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Los tipos de vehículos se listaron correctamente ',
                listaTipoVehiculos

            });
        }
    });

});

router.delete('/eliminarTipoVehiculo', (req, res) => {
    let body = req.body;
    TipoDeVehiculo.deleteOne({ _id: body._id }, (err) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudo eliminar el tipo de vehículo'
            });
        } else {
            res.json({
                resultado: true,
                msj: 'El tipo de vehículo se eliminó correctamente'
            });
        }
    })
});

router.get("/obtenerTipoVehiculo", (req, res) => {
    let _id = req.query._id

    TipoDeVehiculo.findOne({ _id: _id }, (error, tipoDeVehiculoDB) => {
        if (error) {
            return res.json({
                success: false,
                msj: "No se pudo encontrar el tipo de vehículo",
                error: error
            });
        } else {
            return res.json({
                success: true,
                msj: "El tipo de vehículo buscado es:",
                tipoDeVehiculoDB: tipoDeVehiculoDB
            });
        }
    });
});

router.put("/modificarTipoVehiculo", (req, res) => {
    let body = req.body;
    TipoDeVehiculo.updateOne({ 'tipoDeVehiculo': body.tipoDeVehiculo }, {
        $set: {
            tipoDeVehiculo: body.tipoDeVehiculo,
            descripcion: body.descripcion,
            estado: body.estado
        }
    }, (err, tipoDeVehiculoDB) => {
        if (err) {
            return res.json({
                success: false,
                msj: "No se pudo actualizar el tipo de vehículo",
                err


            });

        } else {
            return res.json({
                success: true,
                msj: "El tipo de vehículo ha sido actualizado correctamente",
                tipoDeVehiculoDB
            })
        }

    });

});

router.put('/habilitarTipoVehiculo', function(req, res) {
    let body = req.body;
    TipoDeVehiculo.updateOne({ _id: body._id }, {
            $set: {
                'estado': 'activo'
            }
        },
        function(error, info) {
            if (error) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo activar el tipo de vehículo',
                    error
                });
            } else {
                res.json({
                    resultado: true,
                    msg: 'activado',
                    info: info
                })
            }
        }
    )
});

router.put('/deshabilitarTipoVehiculo', function(req, res) {
    let body = req.body;
    TipoDeVehiculo.updateOne({ _id: body._id }, {
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
                    msg: 'desactivado',
                    info: info
                })
            }
        }
    )
});

// router.put("/modificarTipoVehiculo", (req, res) => {
//     let body = req.body;
//     TipoDeVehiculo.updateOne({ _id: body.idTipoVehiculo }, {
//         $set: {
//             tipoDeVehiculo: body.tipoDeVehiculo,
//             descripcion: body.descripcion
//         }
//     }, (err, tipoDeVehiculoDB) => {
//         if (err) {
//             return res.json({
//                 success: false,
//                 msj: "No se pudieron actualizar los datos",
//                 error: err
//             });
//         } else {
//             return res.json({
//                 success: true,
//                 msj: "El tipo de vehículo ha sido actualizado correctamente",
//                 tipoDeVehiculoDB
//             });
//         }
//     });
// });

module.exports = router;