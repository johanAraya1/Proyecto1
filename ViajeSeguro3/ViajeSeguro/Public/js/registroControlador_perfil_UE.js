'use strict';
const txtNombre = document.querySelector('#nombre');
const txtNombreX2 = document.querySelector('#nombreX2');
const txtApellido = document.querySelector('#Apellido');
const txtApellidoX2 = document.querySelector('#apellidoX2');
const txtCorreo = document.querySelector('#usuarioCorreo');
const txtCorreoX2 = document.querySelector('#txtCorreoX2');
const txtId = document.querySelector('#usuarioId');
const txtPass = document.querySelector('#usuarioPass');
const divImgPerfil = document.querySelector('#divImgPerfil');
const imgPerfil = document.querySelector('#imgPerfil');
const txtTelefono = document.querySelector('#telefono');
const tipoDePersona = document.querySelector('#tipoDePersona');
const numeroDeIdentificacionX2 = document.querySelector('#numeroDeIdentificacionX2');
const provincia = document.querySelector('#provincia');
const canton = document.querySelector('#canton');
const profesion = document.querySelector('#profesion');
const montoBase = document.querySelector('#montoBase');
const distrito = document.querySelector('#distrito');
const tarifaPlataforma = document.querySelector('#tarifaPlataforma');
const btnCerrarSesion = document.querySelector('#cerrarSesion');
const caracteristicasContenedor = document.querySelector('#contenedorCategorias');
const contenedorInfoUsuario = document.querySelector('#perfilInfoContenedor');
btnCerrarSesion.addEventListener('click', () => {
    window.history.replaceState(null, 'Iniciar Sesion', 'iniciar_sesion.html');
    window.location.replace('iniciar_sesion.html');
})
let mostrar_perfil = async() => {
    let localStorageMongoIdCorreos = localStorage.getItem('objectIDInicioSesion');
    let perfilUsuario = await obtener_usuario_id(localStorageMongoIdCorreos);
    let localStorageMongoIdUsuarios = localStorage.getItem('mongoIdUsuarios');
    let perfilUsuarioInfo = await obtenerIdUsuario(localStorageMongoIdUsuarios);
    for (let i = 0; i < perfilUsuario.length; i++) {
        if (localStorageMongoIdCorreos === perfilUsuario[i]._id) {
            console.log(perfilUsuario);
            txtCorreo.innerHTML = perfilUsuario[i].correoElectronico;
            txtCorreoX2.innerHTML = perfilUsuario[i]['correoElectronico'];
        }
    }
    for (let k = 0; k < perfilUsuarioInfo.length; k++) {
        if (localStorageMongoIdUsuarios === perfilUsuarioInfo[k]._id) {
            imgPerfil.src = perfilUsuarioInfo[k]['img'];
            txtNombre.innerHTML = perfilUsuarioInfo[k].primerNombre;
            txtNombreX2.innerHTML = perfilUsuarioInfo[k].primerNombre;
            txtApellido.innerHTML = perfilUsuarioInfo[k].primerApellido;
            txtApellidoX2.innerHTML = perfilUsuarioInfo[k].primerApellido;
            txtTelefono.innerHTML = perfilUsuarioInfo[k]['numeroDeTelefono'];
            tipoDePersona.innerHTML = perfilUsuarioInfo[k]['tipoDePersona'];
            numeroDeIdentificacionX2.innerHTML = perfilUsuarioInfo[k].numeroDeIdentificacion;
            provincia.innerHTML = perfilUsuarioInfo[k]['provincia'];
            canton.innerHTML = perfilUsuarioInfo[k]['canton'];
            profesion.innerHTML = perfilUsuarioInfo[k]['profesion'];
            montoBase.innerHTML = perfilUsuarioInfo[k]['montoBase'];
            distrito.innerHTML = perfilUsuarioInfo[k]['distrito'];
            tarifaPlataforma.innerHTML = perfilUsuarioInfo[k]['tarifaPlataforma'];
            txtId.innerHTML = perfilUsuarioInfo[k].numeroDeIdentificacion;
            txtPass.innerHTML = '********';
            divImgPerfil.appendChild(imgPerfil);
            let arrayCategorias = perfilUsuarioInfo[k].categorias;
            for (let i = 0; i < arrayCategorias.length; i++) {
                let labelCategorias = document.createElement('label');
                labelCategorias.innerText = arrayCategorias[i].categoria;
                labelCategorias.classList.add('inputCategorias');
                let ulCategorias = document.createElement('ul');
                let listItemCategorias = document.createElement('li');
                ulCategorias.appendChild(listItemCategorias);
                listItemCategorias.appendChild(labelCategorias);
                caracteristicasContenedor.appendChild(ulCategorias);
            }
            let botoneditarCategorias = document.createElement('button');
            botoneditarCategorias.innerText = 'Editar categorías';
            perfilInfoContenedor.appendChild(botoneditarCategorias);
            botoneditarCategorias.classList.add('botoneditarCategorias');
        }
    }
    // imgPerfil.src = perfilUsuarioInfo.id['img'];
    // 
    // txtApellido.innerHTML = perfilUsuarioInfo.id.primerApellido;
    // txtNombreX2.innerHTML = perfilUsuarioInfo.id.primerNombre;
    // txtApellidoX2.innerHTML = perfilUsuarioInfo.id.primerApellido;
}
mostrar_perfil();
// 'use strict';
// const txtNombre = document.querySelector('#nombre');
// const txtNombreX2 = document.querySelector('#nombreX2');
// const txtApellido = document.querySelector('#Apellido');
// const txtApellidoX2 = document.querySelector('#apellidoX2');
// const txtCorreo = document.querySelector('#usuarioCorreo');
// const txtCorreoX2 = document.querySelector('#txtCorreoX2');
// const txtId = document.querySelector('#usuarioId');
// const txtPass = document.querySelector('#usuarioPass');
// const divImgPerfil = document.querySelector('#divImgPerfil');
// const imgPerfil = document.querySelector('#imgPerfil');
// const txtTelefono = document.querySelector('#telefono');
// const tipoDePersona = document.querySelector('#tipoDePersona');
// const numeroDeIdentificacionX2 = document.querySelector('#numeroDeIdentificacionX2');
// const provincia = document.querySelector('#provincia');
// const canton = document.querySelector('#canton');
// const profesion = document.querySelector('#profesion');
// const montoBase = document.querySelector('#montoBase');
// const distrito = document.querySelector('#distrito');
// const tarifaPlataforma = document.querySelector('#tarifaPlataforma');
// const btnCerrarSesion = document.querySelector('#cerrarSesion');
// btnCerrarSesion.addEventListener('click', () => {
//     window.history.replaceState(null, 'Iniciar Sesion', 'iniciar_sesion.html');
//     window.location.replace('iniciar_sesion.html');
// })
// let mostrar_perfil = async() => {
//     let localStorageMongoIdCorreos = localStorage.getItem('mongoIdCorreos');
//     let perfilUsuario = await obtener_usuario_id(localStorageMongoIdCorreos);
//     let localStorageMongoIdUsuarios = localStorage.getItem('mongoIdUsuarios');
//     let perfilUsuarioInfo = await obtenerIdUsuario(localStorageMongoIdUsuarios);
//     for (let i = 0; i < perfilUsuario.length; i++) {
//         if (localStorageMongoIdCorreos === perfilUsuario[i]._id) {
//             console.log(perfilUsuario);
//             txtCorreo.innerHTML = perfilUsuario[i].correoElectronico;
//             txtCorreoX2.innerHTML = perfilUsuario[i]['correoElectronico'];
//             txtPass.innerHTML = '**********';
//         }
//     }
//     for (let k = 0; k < perfilUsuarioInfo.length; k++) {
//         if (localStorageMongoIdUsuarios === perfilUsuarioInfo[k]._id) {
//             imgPerfil.src = perfilUsuarioInfo[k]['img'];
//             txtNombre.innerHTML = perfilUsuarioInfo[k].primerNombre;
//             txtNombreX2.innerHTML = perfilUsuarioInfo[k].primerNombre;
//             txtApellido.innerHTML = perfilUsuarioInfo[k].primerApellido;
//             txtApellidoX2.innerHTML = perfilUsuarioInfo[k].primerApellido;
//             txtTelefono.innerHTML = perfilUsuarioInfo[k]['numeroDeTelefono'];
//             tipoDePersona.innerHTML = perfilUsuarioInfo[k]['tipoDePersona'];
//             numeroDeIdentificacionX2.innerHTML = perfilUsuarioInfo[k].numeroDeIdentificacion;
//             provincia.innerHTML = perfilUsuarioInfo[k]['provincia'];
//             canton.innerHTML = perfilUsuarioInfo[k]['canton'];
//             profesion.innerHTML = perfilUsuarioInfo[k]['profesion'];
//             montoBase.innerHTML = perfilUsuarioInfo[k]['montoBase'];
//             distrito.innerHTML = perfilUsuarioInfo[k]['distrito'];
//             tarifaPlataforma.innerHTML = perfilUsuarioInfo[k]['tarifaPlataforma'];
//             txtId.innerHTML = perfilUsuarioInfo[k].numeroDeIdentificacion;
//             // txtPass.innerHTML = '********';
//             divImgPerfil.appendChild(imgPerfil);
//         }
//     }
//     // imgPerfil.src = perfilUsuarioInfo.id['img'];
//     // 
//     // txtApellido.innerHTML = perfilUsuarioInfo.id.primerApellido;
//     // txtNombreX2.innerHTML = perfilUsuarioInfo.id.primerNombre;
//     // txtApellidoX2.innerHTML = perfilUsuarioInfo.id.primerApellido;
// }
// mostrar_perfil();