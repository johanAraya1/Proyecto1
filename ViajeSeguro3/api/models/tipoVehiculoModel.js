'use strict';

const mongoose = require('mongoose');

const tipoDeVehiculoSchema = new mongoose.Schema({
    tipoDeVehiculo: { type: String, required: true, unique: false },
    descripcion: { type: String, required: false, unique: false },
    estado: { type: String, required: false, unique: false }
});

// la primera es una variable creada por nosotros asi la vamos a llamar
//la segunda es el esquema que vamos a utilizar 
//la tercera es como la vamos a exportar
module.exports = mongoose.model('TipoDeVehiculo', tipoDeVehiculoSchema, 'tipoDeVehiculos');