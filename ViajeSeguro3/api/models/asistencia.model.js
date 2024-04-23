'use strict';
const mongoose = require('mongoose');
const schemaAsistencia = new mongoose.Schema({
    tipoAsistencia: { type: String, required: true, unique: false },
    descripcionAsistencia: { type: String, required: true, unique: false },
    coordenadas: { type: Object, required: true, unique: false },
    usuarioSolicita: { type: String, required: false, unique: false },
    provincia: { type: String, required: false, unique: false },
    canton: { type: String, required: false, unique: false },
    distrito: { type: String, required: false, unique: false },
    estado: { type: String, required: false, unique: false }
});
module.exports = mongoose.model('Asistencia', schemaAsistencia, 'asistencias');