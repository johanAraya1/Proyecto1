'use strict';

const mongoose = require('mongoose');

const schemaRuta = new mongoose.Schema({
    // ruta: { type: String, required: true, unique: false },

    nombre: { type: String, required: true, unique: false },
    descripcion: { type: String, required: true, unique: false },
    coordenadas: { type: Object, required: true, unique: false },
    usuarioSolicita: { type: String, required: true, unique: false },
    estado: { type: String, required: true, unique: false }

});

module.exports = mongoose.model('Ruta', schemaRuta, 'rutas');