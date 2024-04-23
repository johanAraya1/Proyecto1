"use strict";

const mongoose = require("mongoose");
const tarjetaCreditoSchema = new mongoose.Schema({
    formaDePago: { type: String, required: true, unique: false },
    numeroDeTarjeta: { type: Number, required: true, unique: false },
    entidadFinanciera: { type: String, required: true, unique: false },
    fechaDeExpiracion: { type: Date, required: true, unique: false },
    codigoDeSeguridad: { type: Number, required: true, unique: false },
    nombreEnTarjeta: { type: String, required: true, unique: false },
    propietarioDeTarjeta: { type: String, required: true, unique: false },
    estado: { type: String, required: true, unique: false }
});

module.exports = mongoose.model("TarjetaDeCredito", tarjetaCreditoSchema, "tarjetasCredito");