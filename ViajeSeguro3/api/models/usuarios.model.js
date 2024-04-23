"use strict";

const mongoose = require("mongoose");
const usuarioSchema = new mongoose.Schema({
    tipoDeUsuario: { type: String, required: false, unique: false },
    primerNombre: { type: String, required: true, unique: false },
    segundoNombre: { type: String, required: false, unique: false },
    primerApellido: { type: String, required: true, unique: false },
    segundoApellido: { type: String, required: false, unique: false },
    tipoDePersona: { type: String, required: true, unique: false },
    tipoDeIdentificacion: { type: String, required: true, unique: false },
    numeroDeIdentificacion: { type: String, required: true, unique: true },
    genero: { type: String, required: true, unique: false },
    numeroDeTelefono: { type: String, required: true, unique: false },
    // correoElectronico: { type: String, required: false, unique: false },
    // password: { type: String, required: false, unique: false },
    // confirmarPassword: { type: String, required: false, unique: false },
    profesion: { type: String, required: false, unique: false },
    montoBase: { type: Number, required: false, unique: false },
    tarifaPlataforma: { type: Number, required: false, unique: false },
    cargosAdicionales: { type: String, required: true, unique: false },
    categorias: [{
        categoria: { type: String, required: false, unique: false }
    }],
    provincia: { type: String, required: false, unique: false },
    canton: { type: String, required: false, unique: false },
    distrito: { type: String, required: false, unique: false },
    estado: { type: String, required: false, unique: false },
    img: { type: String, required: true, unique: false }
});

module.exports = mongoose.model("Usuario", usuarioSchema, "usuarios");