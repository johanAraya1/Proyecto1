'use strict';

const mongoose = require('mongoose');

const schemaSiniestro = new mongoose.Schema({
    categoria: { type: String, required: true, unique: false },
    descripcionSiniestro: { type: String, required: true, unique: false },
    estado: { type: String, required: true, unique: false },
    provincia: { type: String, required: false, unique: false },
    canton: { type: String, required: false, unique: false },
    distrito: { type: String, required: false, unique: false },
    senas: { type: String, required: false, unique: false },
    coordenadas: { type: Object, required: true, unique: false },
    usuarioReporta: { type: String, required: false, unique: false },
    foto: { type: String, required: false, unique: false },

    // ruta: { type: String, required: false, unique: false },


});

module.exports = mongoose.model('Siniestro', schemaSiniestro, 'siniestros');