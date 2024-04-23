"use strict";

const express = require("express");
const router = express.Router();
const TarjetaDeCredito = require("../models/tarjetasCredito.model");

router.post("/registrar-tarjeta-credito", (req, res) => {
    let body = req.body;
    let nuevaTarjetaCredito = new TarjetaDeCredito({
        formaDePago: body.formaDePago,
        numeroDeTarjeta: body.numeroDeTarjeta,
        entidadFinanciera: body.entidadFinanciera,
        fechaDeExpiracion: body.fechaDeExpiracion,
        codigoDeSeguridad: body.codigoDeSeguridad,
        nombreEnTarjeta: body.nombreEnTarjeta,
        propietarioDeTarjeta: body.propietarioDeTarjeta,
        estado: body.estado
    });

    nuevaTarjetaCredito.save((err, tarjetaCreditoDB) => {
        if (err) {
            res.json({
                resultado: false,
                msj: "La tarjeta no se ha podido registrar por el siguiente error: ",
                error: err
            });
        } else {
            res.json({
                resultado: true,
                msj: "La tarjeta se ha registrado correctamente con la siguiente información: ",
                tarjetaCreditoDB
            })
        }
    })
});

router.get("/listar-tarjetas-credito", (req, res) => {
    TarjetaDeCredito.find((err, listaTarjetasDeCredito) => {
        if (err) {
            res.json({
                resultado: false,
                msj: "La lista de tarjetas no ha podido ser recuperada por el siguiente error: ",
                error: err
            });
        } else {
            res.json({
                resultado: true,
                msj: "Esta es la lista de tarjetas de crédito registradas actualmente: ",
                listaTarjetasDeCredito
            });
        }
    });
});

router.get("/buscar-tarjetas-usuario", (req, res) => {
    let propietarioDeTarjeta = req.query.propietarioDeTarjeta

    TarjetaDeCredito.find({ "propietarioDeTarjeta": propietarioDeTarjeta }, (err, tarjetaCreditoDB) => {
        if (err) {
            return res.json({
                success: false,
                msj: "No se encontraron tarjetas de crédito afiliadas a ese correo electrónico",
                error: err
            });
        } else {
            return res.json({
                success: true,
                tarjetasDeCredito: tarjetaCreditoDB
            });
        }
    })
});

router.get("/obtener-tarjeta-usuario", (req, res) => {
    let idTarjetaCredito = req.query.idTarjetaCredito

    TarjetaDeCredito.findOne({ _id: idTarjetaCredito }, (err, tarjetaCreditoDB) => {
        if (err) {
            return res.json({
                success: false,
                msj: "No se pudo encontrar la tarjeta de crédito buscada por el siguiente error:",
                error: err
            });
        } else {
            return res.json({
                success: true,
                msj: "La información de la tarjeta se ha recopilado correctamente.",
                tarjetaCreditoDB
            });
        }
    });
});

router.put("/modificar-tarjeta-credito", (req, res) => {
    let body = req.body;
    TarjetaDeCredito.updateOne({ _id: body.idTarjetaCredito }, {
        $set: {
            numeroDeTarjeta: body.numeroDeTarjeta,
            entidadFinanciera: body.entidadFinanciera,
            fechaDeExpiracion: body.fechaDeExpiracion,
            codigoDeSeguridad: body.codigoDeSeguridad,
            nombreEnTarjeta: body.nombreEnTarjeta,
        }
    }, (err, tarjetaCreditoDB) => {
        if (err) {
            return res.json({
                success: false,
                msj: "No se pudieron actualizar los datos",
                error: err
            });
        } else {
            return res.json({
                success: true,
                msj: "Los datos de la tarjeta han sido actualizados correctamente",
                tarjetaCreditoDB
            });
        }
    });
});

router.delete("/eliminar-tarjeta-credito", (req, res) => {
    let body = req.body;
    TarjetaDeCredito.deleteOne({ _id: body.idTarjetaCredito }, (err) => {
        if (err) {
            res.json({
                resultado: false,
                msj: "No se pudo eliminar la tarjeta indicada"
            });
        } else {
            res.json({
                resultado: true,
                msj: "La tarjeta se ha eliminado correctamente"
            });
        }
    })
});

router.put("/deshabilitar-tarjeta-credito", function(req, res) {
    let body = req.body;
    TarjetaDeCredito.updateOne({ _id: body.idTarjetaCredito }, {
        $set: {
            "estado": "Inactiva"
        }
    }, function(error, info) {
        if (error) {
            res.json({
                resultado: false,
                msj: "No se pudo desactivar la tarjeta de credito",
                error
            });
        } else {
            res.json({
                resultado: true,
                msj: "La tarjeta de credito ha sido desactivada correctamente",
                info: info
            });
        }
    });
});

router.put("/habilitar-tarjeta-credito", function(req, res) {
    let body = req.body;
    TarjetaDeCredito.updateOne({ _id: body.idTarjetaCredito }, {
        $set: {
            "estado": "Activa"
        }
    }, function(error, info) {
        if (error) {
            res.json({
                resultado: false,
                msj: "No se pudo activar la tarjeta de credito",
                error
            });
        } else {
            res.json({
                resultado: true,
                msj: "Los tarjeta de credito ha sido activada correctamente",
                info: info
            });
        }
    });
});

module.exports = router;