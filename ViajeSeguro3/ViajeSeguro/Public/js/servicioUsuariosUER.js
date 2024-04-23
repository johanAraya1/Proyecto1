'use strict';

let modificarCorreoPass = async(inputCorreoElectronico, inputPassword, inputPrimerNombre, identificacion) => {

    await axios({
        method: "put",
        url: "http://localhost:3000/api/modificarCorreoPass",
        responseType: "json",
        data: {
            "correo": inputCorreoElectronico,
            "password": inputPassword,
            "nombre": inputPrimerNombre,
            "identificacion": identificacion
        }
    }).then((res) => {
        if (res.data.resultado == false) {
            console.log("No se ha modificado nada");
            console.log(res.data.error);
        } else {
            console.log(res.data.correoUsuario);
        }
    }).catch((error) => {
        console.log(error);
    });
};

let registrarCorreoPass = async(inputCorreoElectronico, inputPassword, inputPrimerNombre, identificacion) => {
    await axios({
        method: "post",
        url: "http://localhost:3000/api/signup",
        responseType: "json",
        data: {
            "correo": inputCorreoElectronico,
            "password": inputPassword,
            "nombre": inputPrimerNombre,
            "identificacion": identificacion
        }
    }).then((response) => {
        console.log(response.data);
    }).catch((error) => {
        console.log(error);
    });
};

// le tengo que mandar por parametros lo del postman
let registrarUsuarios = async(inputCorreoElectronico, inputPassword, inputTipoDeUsuario, inputPrimerNombre, inputSegundoNombre, inputPrimerApellido, inputSegundoApellido, inputTipoDePersona, inputTipoDeIdentificacion,
    inputNumeroDeIdentificacion, inputGenero, inputNumeroDeTelefono, inputProfesion, montoBase, tarifaPlataforma, cargosAdicionales, inputProvincia, inputCanton, inputDistrito, estado, img) => {
    await axios({
        method: "post",
        url: "http://localhost:3000/api/registrar-usuarios",
        responseType: "json",
        data: {
            "tipoDeUsuario": inputTipoDeUsuario,
            "primerNombre": inputPrimerNombre,
            "segundoNombre": inputSegundoNombre,
            "primerApellido": inputPrimerApellido,
            "segundoApellido": inputSegundoApellido,
            "tipoDeIdentificacion": inputTipoDeIdentificacion,
            "tipoDePersona": inputTipoDePersona,
            "numeroDeIdentificacion": inputNumeroDeIdentificacion,
            "genero": inputGenero,
            "numeroDeTelefono": inputNumeroDeTelefono,
            "profesion": inputProfesion,
            "montoBase": montoBase,
            "tarifaPlataforma": tarifaPlataforma,
            "cargosAdicionales": cargosAdicionales,
            "provincia": inputProvincia,
            "canton": inputCanton,
            "distrito": inputDistrito,
            "estado": estado,
            "img": img,

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
            registrarCorreoPass(inputCorreoElectronico, inputPassword, inputPrimerNombre, identificacion);

            Swal.fire({
                title: "La solicitud de registro se ha enviado correctamente",
                text: "Verifique su correo electrónico y ejecute el enlace de confirmación para completar el registro de su cuenta. ",
                icon: "success"
            }).then(() => {
                // limpiarFormulario();
                window.location.href = "index.html";

            });
        }
    }).catch(function(error) {
        console.log(error);
    });
};

let listarUsuarios = async() => {
    let usuarios = [];

    await axios({
            method: 'get',
            url: 'http://localhost:3000/api/listar-usuarios',
            responseType: 'json'

        }).then(function(res) {
            usuarios = res.data.listaUsuarios;
        })
        .catch(function(err) {
            console.log(err);
        });

    return usuarios;

};

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

let listarCorreos = async() => {
    let correos = [];
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar-correo',
        responseType: 'json'
    }).then((res) => {
        correos = res.data.coleccionInicioSesionDB;
        console.log(correos);
    }).catch((err) => {
        console.log(err);
    });


    return correos;
};

let obtenerPersonaId = async(numeroDeIdentificacion) => {
    try {
        const response = await axios({
            method: 'get',
            params: { "numeroDeIdentificacion": numeroDeIdentificacion },
            url: `http://localhost:3000/api/buscarPersonaIdentificacion/${numeroDeIdentificacion}`,
            responseType: 'json'
        });
        return response.data.persona;
    } catch (error) {
        console.log(error);
    }
};

let obtener_usuario_id = async(idMongo) => {
    let mongoId = [];
    await axios({
        method: 'get',
        params: { idMongo: idMongo },
        url: 'http://localhost:3000/api/buscar-usuarioId',
        responseType: 'json'
    }).then((res) => {
        mongoId = res.data.id;
        console.log(mongoId);
    }).catch((error) => {
        console.log(error);
    })

    return mongoId;
};

let obtenerIdUsuario = async(id) => {
    let mongoIdUsuarios = [];
    await axios({
        method: 'get',
        params: { id: id },
        url: 'http://localhost:3000/api/buscar-usuariodb',
        responseType: 'json'
    }).then((res) => {
        mongoIdUsuarios = res.data.id;
        console.log(mongoIdUsuarios);
    }).catch((err) => {
        console.log(err);
    });

    return mongoIdUsuarios;
};


let modificarSingup = async(inputCorreoElectronico, inputPassword) => {
    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/modificarSignup',
        responseType: 'json',
        data: {
            correo: inputCorreoElectronico,
            password: inputPassword
        }

    }).then((response) => {
        console.log(response.data);
    }).catch((error) => {
        console.log(error);
    });
};


let modificarUsuarios = async(idUsuario, inputCorreoElectronico, inputPassword, inputTipoDeUsuario, inputPrimerNombre, inputSegundoNombre, inputPrimerApellido, inputSegundoApellido, inputTipoDePersona, inputTipoDeIdentificacion,
    inputNumeroDeIdentificacion, inputGenero, inputNumeroDeTelefono, inputProfesion, montoBase, tarifaPlataforma, cargosAdicionales, inputProvincia, inputCanton, inputDistrito, estado, img) => {
    console.log(inputSegundoNombre);
    await axios({
        method: "put",
        url: "http://localhost:3000/api/modificarUsuarios",
        responseType: "json",
        data: {
            "idUsuario": idUsuario,
            "tipoDeUsuario": inputTipoDeUsuario,
            "primerNombre": inputPrimerNombre,
            "segundoNombre": inputSegundoNombre,
            "primerApellido": inputPrimerApellido,
            "segundoApellido": inputSegundoApellido,
            "tipoDeIdentificacion": inputTipoDeIdentificacion,
            "tipoDePersona": inputTipoDePersona,
            "numeroDeIdentificacion": inputNumeroDeIdentificacion,
            "genero": inputGenero,
            "numeroDeTelefono": inputNumeroDeTelefono,
            "profesion": inputProfesion,
            "montoBase": montoBase,
            "tarifaPlataforma": tarifaPlataforma,
            "cargosAdicionales": cargosAdicionales,
            "provincia": inputProvincia,
            "canton": inputCanton,
            "distrito": inputDistrito,
            "estado": estado,
            "img": img,

        }
    }).then(function(res) {
        if (res.data.resultado == false) {
            switch (res.data.error.code) {
                case 11000:
                    Swal.fire({
                        title: "No se lograron modificar los datos",
                        text: "Error " + (res.data.error.code) + ": Este error significa que la información enviada coincide con la de un usuario ya registrado",
                        icon: "error"
                    });

                    break;
                default:
                    Swal.fire({
                        title: "No se logró modificar este usuario",
                        text: "Error; El usuario no ha podido modificar",
                        icon: "error"
                    });
                    break;
            };
        } else {
            // let identificacion = idUsuario;
            // modificarCorreoPass(inputCorreoElectronico, inputPassword, inputPrimerNombre, identificacion);

            Swal.fire({
                title: "Los datos se han modificado correctamente",
                text: "Se han logrado realizar los cambios con éxito de su cuenta. ",
                icon: "success"
            }).then(() => {
                // limpiarFormulario();
                window.location.href = "perfil_usuariosUER.html";

            });
        }
    }).catch(function(error) {
        console.log(error);
    });
};


let deshabilitarPersona = async(p_id) => {
    await axios({
        method: 'put',
        url: 'http://localhost:3000/api/deshabilitarPersona',
        responseType: 'json',
        data: {
            '_id': p_id
        }
    }).then((res) => {
        if (res.data.resultado == false) {
            console.log('No se pudo deshabilitar la persona');
        } else {
            console.log('La persona se Deshabilitó exitosamente');
            mostrarDatos();
        }
    }).catch((err) => {
        console.log(err);
    });

};

let habilitarPersona = async(p_id) => {
    await axios({
        method: 'put',
        url: 'http://localhost:3000/api/habilitarPersona',
        responseType: 'json',
        data: {
            '_id': p_id
        }
    }).then((res) => {
        if (res.data.resultado == false) {
            console.log('No se pudo habilitar la persona');
        } else {
            console.log('La persona se habilitó exitosamente');
            mostrarDatos();
        }
    }).catch((err) => {
        console.log(err);
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