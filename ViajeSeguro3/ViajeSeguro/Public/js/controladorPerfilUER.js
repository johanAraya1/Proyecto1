'use strict';

const nombreUsuario = document.querySelector("#nombre");
const nombreDos = document.querySelector("#nombreX2");
const apellidos = document.querySelector("#apellidoX2");
const identificacion = document.querySelector("#numeroDeIdentificacionX2");
const identificaciox2 = document.querySelector("#usuarioId");
const fotoPerfil = document.querySelector("#imgPerfil");
const tipoDeUsuario = document.querySelector("#tipoUsuario");
const generoUsuario = document.querySelector("#genero");
const telefonoUsuario = document.querySelector("#telefono");
const correoDeUsuario = document.querySelector("#txtCorreoX2");
const tipoDePersona = document.querySelector("#tipoDePersona");
const profesion = document.querySelector("#profesion");
const correox2 = document.querySelector("#usuarioCorreo");
const pass = document.querySelector("#usuarioPass");
const editarPerfil = document.querySelector("#botonEditarPerfil");
const genero = document.querySelector("#genero");


let mostrarPerfil = async() => {

    let correoUsuario = await buscarCorreoUsuario(localStorage.getItem("usuarioID"));
    let perfilUsuario = await buscarPerfilUsuario(localStorage.getItem("usuarioID"));

    fotoPerfil.src = perfilUsuario["img"];
    nombreDos.innerHTML = perfilUsuario.primerNombre;
    correox2.innerHTML = correoUsuario.correoElectronico;
    pass.innerHTML = "********";
    identificaciox2.innerHTML = perfilUsuario.numeroDeIdentificacion;

    nombreUsuario.innerHTML = perfilUsuario.primerNombre + " " + perfilUsuario.primerApellido;
    apellidos.innerHTML = perfilUsuario.primerApellido + " " + perfilUsuario.segundoApellido;
    telefonoUsuario.innerHTML = perfilUsuario["numeroDeTelefono"];
    correoDeUsuario.innerHTML = correoUsuario["correoElectronico"];
    profesion.innerHTML = perfilUsuario["profesion"];


    tipoDePersona.innerHTML = perfilUsuario["tipoDePersona"];
    identificacion.innerHTML = perfilUsuario["numeroDeIdentificacion"];
    tipoIdentificacion.innerHTML = perfilUsuario["tipoDeIdentificacion"];
    genero.innerHTML = perfilUsuario["genero"];
    tipoDeUsuario.innerHTML = perfilUsuario["tipoDeUsuario"];

};

mostrarPerfil();