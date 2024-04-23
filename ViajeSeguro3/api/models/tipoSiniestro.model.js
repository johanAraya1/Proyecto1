'use strict';

const mongoose = require('mongoose');

const schemaTipoSiniestro = new mongoose.Schema({
    tipoSiniestro: { type: String, required: true, unique: true },
    estado: { type: String, required: true, unique: false },
    icono: { type: String, required: false, unique: false },
    descripcion: { type: String, required: false, unique: false },

});

module.exports = mongoose.model('TiposdeSiniestros', schemaTipoSiniestro, 'tipoSiniestro');