'use strict';

const mongoose = require('mongoose');

const schemaVehiculos = new mongoose.Schema({
    placa: { type: String, required: true, unique: true },
    marca: { type: String, required: true, unique: false },
    modelo: { type: String, required: true, unique: false },
    ano: { type: Number, required: true, unique: false },
    color: { type: String, required: true, unique: false },
    tipoDeVehiculo: { type: String, required: true, unique: false },
    estilo: { type: String, required: true, unique: false },
    dobleTraccion: { type: String, required: false, unique: false },
    aireAcondicionado: { type: String, required: false, unique: false },
    transmision: { type: String, required: false, unique: false },
    direccionHidraulica: { type: String, required: false, unique: false },
    bolsasDeAire: { type: String, required: false, unique: false },
    cantidadPasajeros: { type: String, required: false, unique: false },
    cantidadPuertas: { type: String, required: false, unique: false },
    correoElectronicoPropietario: { type: String, required: false, unique: false },
    correoElectronicoEncargado1: { type: String, required: false, unique: false },
    correoElectronicoEncargado2: { type: String, required: false, unique: false },
    correoElectronicoEncargado3: { type: String, required: false, unique: false },
    correoElectronicoEncargado4: { type: String, required: false, unique: false },
    correoElectronicoEncargado5: { type: String, required: false, unique: false },
    estado: { type: String, required: true, unique: false },
    foto: { type: String, required: false, unique: false }

});

module.exports = mongoose.model('vehiculo', schemaVehiculos, 'vehiculo');