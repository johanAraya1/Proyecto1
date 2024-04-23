'use strict';
let listarUsuarios = async() => {
    let usuarios = [];
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar-usuarios',
        responseType: 'json'
    }).then((res) => {
        usuarios = res.data;
    }).catch((err) => {
        console.log(err);
    });
    return usuarios;
};

let listarCorreos = async() => {
    let correos = [];
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar-correo',
        responseType: 'json'
    }).then((res) => {
        correos = res.data;
        console.log(correos);
    }).catch((err) => {
        console.log(err);
    });
    return correos;
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

let eliminarUsuario = async(identificacion, identificacionCorreo) => {
    await axios({
        method: "delete",
        params: { identificacion: identificacion },
        url: "http://localhost:3000/api/eliminar-usuario",
        responseType: "json"
    }).then((res) => {
        if (res.data.resultado == false) {
            Swal.fire({
                title: "No se ha podido eliminar el usuario",
                text: "El usuario no ha podido ser eliminado por el error: " + res.data.error.code,
                icon: "error"
            });
        } else {
            window.location.href = 'listar_usuarios.html';
            eliminarCorreo(identificacionCorreo);
        }
    }).catch((error) => {
        console.log(error);
    });
};

let eliminarCorreo = async(identificacionCorreo) => {
    await axios({
        method: "delete",
        params: { identificacion: identificacionCorreo },
        url: "http://localhost:3000/api/eliminar-correo",
        responseType: "json"
    }).then((res) => {
        if (res.data.resultado == false) {
            Swal.fire({
                title: "No se ha podido eliminar el usuario",
                text: "El usuario no ha podido ser eliminado por el error: " + res.data.error.code,
                icon: "error"
            });
        } else {
            Swal.fire({
                title: "El usuario ha sido eliminado correctamente!",
                text: "Usuario eliminado satisfactoriamente.",
                icon: "success"
            }).then(() => {
                console.log("usuarioELiminadoConExito");
                window.location.href = 'listar_usuarios.html';
            })
        }
    }).catch((error) => {
        console.log(error)
    });
};