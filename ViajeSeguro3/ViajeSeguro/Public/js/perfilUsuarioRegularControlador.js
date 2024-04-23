"use strict";
//let usuarioID = localStorage.getItem("idUsuario");
const nombreUsuario = document.querySelector("#nombreDeUsuario");
const identificacion = document.querySelector("#identificacion");
const fotoPerfil = document.querySelector("#fotoUsuario");
const tipoDeUsuario = document.querySelector("#tipoUsuario");
const generoUsuario = document.querySelector("#genero");
const telefonoUsuario = document.querySelector("#telefono");
const correoDeUsuario = document.querySelector("#correo");
const tipoDePersona = document.querySelector("#tipoPersona");
const estadoDeUsuario = document.querySelector("#estadoUsuario");
const metodosPago = document.querySelector("#verTarjetasCredito");
const editarPerfil = document.querySelector("#botonEditarPerfil");
let mostrarPerfil = async() => {
    let correoUsuario = await buscarCorreoUsuario(localStorage.getItem("usuarioID"));
    let perfilUsuario = await buscarPerfilUsuario(localStorage.getItem("usuarioID"));
    nombreUsuario.innerHTML = perfilUsuario.primerNombre + " " + perfilUsuario.primerApellido;
    identificacion.innerHTML = perfilUsuario["numeroDeIdentificacion"];
    fotoPerfil.src = perfilUsuario["img"];
    tipoDeUsuario.innerHTML = perfilUsuario["tipoDeUsuario"];
    tipoDePersona.innerHTML = perfilUsuario["tipoDePersona"];
    telefonoUsuario.innerHTML = perfilUsuario["numeroDeTelefono"];
    generoUsuario.innerHTML = perfilUsuario["genero"];
    correoDeUsuario.innerHTML = correoUsuario["correoElectronico"];
    estadoDeUsuario.innerHTML = perfilUsuario["estado"];
    console.log(correoUsuario.correoElectronico);
    metodosPago.addEventListener("click", () => {
        window.location.href = "listarTarjetasCredito.html";
    });
};
mostrarPerfil();
//editarPerfil.addEventListener("click", pordefinir);