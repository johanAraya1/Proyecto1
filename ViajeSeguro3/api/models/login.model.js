'use strict';

const mongoose = require('mongoose');

const inicioSesionSchema = mongoose.Schema({
    correoElectronico: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },

    password: { type: String, required: true },
    identificacion: { type: String, required: true, unique: true }


});


module.exports = mongoose.model('InicioSesion', inicioSesionSchema, 'iniciarSesion');