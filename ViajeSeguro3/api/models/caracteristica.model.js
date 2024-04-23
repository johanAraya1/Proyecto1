'use strict';

const mongoose = require('mongoose');

const schemaCaracteristica = new mongoose.Schema({
    caracteristica: { type: String, required: true, unique: true },
    estado: { type: String, required: false, unique: false }


});

module.exports = mongoose.model('Caracteristica', schemaCaracteristica, 'caracteristica');