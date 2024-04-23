"use strict";
let registrarCorreoPass = async(pCorreoElectronico, pPassword, pPrimerNombre, identificacion) => {
    await axios({
        method: "post",
        url: "http://localhost:3000/api/signup",
        responseType: "json",
        data: {
            "correo": pCorreoElectronico,
            "password": pPassword,
            "nombre": pPrimerNombre,
            "identificacion": identificacion
        }
    }).then((response) => {
        console.log(response.data);
    }).catch((error) => {
        console.log(error);
    });
};
let registrarUsuario = async(pCorreoElectronico, pPassword, pTipoDeUsuario, pPrimerNombre, pSegundoNombre, pPrimerApellido, pSegundoApellido, pTipoDeIdentificacion, pTipoDePersona, pNumeroDeIdentificacion, pGenero, pNumeroDeTelefono, pProfesion, pMontoBase, pTarifaPlataforma, pCargosAdicionales, pProvincia, pCanton, pDistrito, pFoto, pEstado) => {
    await axios({
        method: "post",
        url: "http://localhost:3000/api/registrar-usuarios",
        responseType: "json",
        data: {
            "tipoDeUsuario": pTipoDeUsuario,
            "primerNombre": pPrimerNombre,
            "segundoNombre": pSegundoNombre,
            "primerApellido": pPrimerApellido,
            "segundoApellido": pSegundoApellido,
            "tipoDeIdentificacion": pTipoDeIdentificacion,
            "tipoDePersona": pTipoDePersona,
            "numeroDeIdentificacion": pNumeroDeIdentificacion,
            "genero": pGenero,
            "numeroDeTelefono": pNumeroDeTelefono,
            "profesion": pProfesion,
            "montoBase": pMontoBase,
            "tarifaPlataforma": pTarifaPlataforma,
            "cargosAdicionales": pCargosAdicionales,
            "provincia": pProvincia,
            "canton": pCanton,
            "distrito": pDistrito,
            "img": pFoto,
            "estado": pEstado
        }
    }).then(function(res) {
        if (res.data.resultado == false) {
            switch (res.data.error.code) {
                case 11000:
                    Swal.fire({
                        title: "No se puede registrar este usuario",
                        text: "Error " + (res.data.error.code) + ": Este error significa que la información enviada coincide con la de un usuario ya registrado",
                        icon: "error"
                    });
                    break;
                default:
                    Swal.fire({
                        title: "No se puede registrar este usuario",
                        text: "Error; El usuario no ha podido ser registrado",
                        icon: "error"
                    });
                    break;
            };
        } else {
            let identificacion = res.data.usuarioDB._id
            registrarCorreoPass(pCorreoElectronico, pPassword, pPrimerNombre, identificacion);
            Swal.fire({
                title: "La solicitud de registro se ha enviado correctamente",
                text: "Verifique su correo electrónico y ejecute el enlace de confirmación para completar el registro de su cuenta. ",
                icon: "success"
            }).then(() => {
                window.location.href = 'index.html';
                limpiarFormulario();
            });
        }
    }).catch(function(error) {
        console.log(error);
    });
};
let buscarPerfilUsuario = async(usuarioID) => {
    try {
        const response = await axios({
            method: "get",
            params: { usuarioID: usuarioID },
            url: "http://localhost:3000/api/buscar-perfil-usuario",
            responseType: "json"
        });
        return response.data.usuarioBuscado;
    } catch (error) {
        console.log(error);
    }
};
let buscarCorreoUsuario = async(usuarioID) => {
    try {
        const response = await axios({
            method: "get",
            params: { usuarioID: usuarioID },
            url: "http://localhost:3000/api/buscar-correo-usuario",
            responseType: "json",
        });
        return response.data.correoUsuario;
    } catch (error) {
        console.log(error);
    }
};

// "use strict";

// let registrarCorreoPass = async(pCorreoElectronico, pPassword, pPrimerNombre, identificacion) => {
//     await axios({
//         method: "post",
//         url: "http://localhost:3000/api/signup",
//         responseType: "json",
//         data: {
//             "correo": pCorreoElectronico,
//             "password": pPassword,
//             "nombre": pPrimerNombre,
//             "identificacion": identificacion
//         }
//     }).then((response) => {
//         window.location.href = "index.html"
//         console.log(response.data);
//     }).catch((error) => {
//         console.log(error);
//     });
// };

// let registrarUsuario = async(pCorreoElectronico, pPassword, pTipoDeUsuario, pPrimerNombre, pSegundoNombre, pPrimerApellido, pSegundoApellido, pTipoDeIdentificacion, pTipoDePersona, pNumeroDeIdentificacion, pGenero, pNumeroDeTelefono, pProfesion, pMontoBase, pTarifaPlataforma, pCargosAdicionales, pProvincia, pCanton, pDistrito, pFoto, pEstado) => {
//     await axios({
//         method: "post",
//         url: "http://localhost:3000/api/registrar-usuarios",
//         responseType: "json",
//         data: {
//             "tipoDeUsuario": pTipoDeUsuario,
//             "primerNombre": pPrimerNombre,
//             "segundoNombre": pSegundoNombre,
//             "primerApellido": pPrimerApellido,
//             "segundoApellido": pSegundoApellido,
//             "tipoDeIdentificacion": pTipoDeIdentificacion,
//             "tipoDePersona": pTipoDePersona,
//             "numeroDeIdentificacion": pNumeroDeIdentificacion,
//             "genero": pGenero,
//             "numeroDeTelefono": pNumeroDeTelefono,
//             "profesion": pProfesion,
//             "montoBase": pMontoBase,
//             "tarifaPlataforma": pTarifaPlataforma,
//             "cargosAdicionales": pCargosAdicionales,
//             "provincia": pProvincia,
//             "canton": pCanton,
//             "distrito": pDistrito,
//             "img": pFoto,
//             "estado": pEstado
//         }
//     }).then(function(res) {
//         if (res.data.resultado == false) {
//             switch (res.data.error.code) {
//                 case 11000:
//                     Swal.fire({
//                         title: "No se puede registrar este usuario",
//                         text: "Error " + (res.data.error.code) + ": Este error significa que la información enviada coincide con la de un usuario ya registrado",
//                         icon: "error"
//                     });

//                     break;
//                 default:
//                     Swal.fire({
//                         title: "No se puede registrar este usuario",
//                         text: "Error; El usuario no ha podido ser registrado",
//                         icon: "error"
//                     });
//                     break;
//             };

//             console.log("registrado pero con errores");

//         } else {
//             let identificacion = res.data.usuarioDB._id
//             registrarCorreoPass(pCorreoElectronico, pPassword, pPrimerNombre, identificacion);

//             console.log("entré al else.. wii!!!");

//             Swal.fire({
//                 title: "La solicitud de registro se ha enviado correctamente",
//                 text: "Verifique su correo electrónico y ejecute el enlace de confirmación para completar el registro de su cuenta. ",
//                 icon: "success"
//             });
//         }
//     }).catch(function(error) {
//         console.log(error);
//     });
// };

// let buscarPerfilUsuario = async(usuarioID) => {
//     try {
//         const response = await axios({
//             method: "get",
//             params: { usuarioID: usuarioID },
//             url: "http://localhost:3000/api/buscar-perfil-usuario",
//             responseType: "json"
//         });
//         return response.data.usuarioBuscado;

//     } catch (error) {
//         console.log(error);
//     }
// };

// let buscarCorreoUsuario = async(usuarioID) => {
//     try {
//         const response = await axios({
//             method: "get",
//             params: { usuarioID: usuarioID },
//             url: "http://localhost:3000/api/buscar-correo-usuario",
//             responseType: "json",
//         });
//         return response.data.correoUsuario;
//     } catch (error) {
//         console.log(error);
//     }
// };