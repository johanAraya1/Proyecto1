'use strict';

let agarrarTipoUsuario = async() => {
    let usuario = await buscarUsuario(localStorage.getItem("usuarioID"));
    localStorage.setItem("provinciaMatchSolicitudAsistencia", usuario.provincia);

    switch (usuario.tipoDeUsuario) {

        case "Usuario Regular":

            window.location.href = "listarSiniestros.html";
            break;

        case "Usuario especializado":

            window.location.href = "listarAsistencias.html";
            break;

        case "Usuario Administrador":

            window.location.href = "listarSiniestrosADM.html";
            break;

        case "Usuario encargado de rutas":

            window.location.href = "listarRutas.html";
            break;

        default:
            window.location.href = "registrarUsuarioNormal.html";
            break;

    }

}

let buscarUsuario = async(usuarioID) => {
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

let registrarInicioSesion = async(correo, pass) => {
    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/login',
        responseType: 'json',
        data: {
            correo: correo,
            password: pass
        }
    }).then((res) => {
        if (res.data.resultado == 'sinRegistro') {
            Swal.fire({
                title: res.data.mensaje,
                text: 'Favor registrarse antes de iniciar sesión',
                icon: 'warning'
            })
            console.log(res.data.mensaje);
        } else if (res.data.resultado == 'contraseña') {
            Swal.fire({
                title: res.data.mensaje,
                text: 'Favor revisar la contraseña antes de intentar de nuevo',
                icon: 'warning'
            })
        } else if (res.data.resultado == 'sesion') {
            Swal.fire({
                title: res.data.mensaje,
                text: 'Haga "Click" en OK para ser redireccionado a la pagina principal',
                icon: 'success'
            }).then(() => {

                localStorage.setItem("usuarioID", res.data.correoUsuario[0]["identificacion"]);
                localStorage.setItem("objectIDInicioSesion", res.data.correoUsuario[0]._id);
                agarrarTipoUsuario();


            })
        }
        // console.log(res.data);
    }).catch((err) => {
        console.log(err);
    });
};