'use strict';
const tbody = document.querySelector('#tablaUsuarios tbody');
const inputBusqueda = document.querySelector('#inputBuscar');
let usuarios;
let correos;
let mostrarDatos = async() => {
    let oUsuarios = await listarUsuarios();
    console.log(oUsuarios);
    usuarios = Object.values(oUsuarios);
    console.log(usuarios);
    let oCorreos = await listarCorreos();
    correos = Object.values(oCorreos);
    tbody.innerHTML = '';
    console.log(oCorreos);
    let accObCorreos = correos[1];
    console.log(accObCorreos);
    correos = Object.values(accObCorreos);
    console.log(correos);
    let accObUsuarios = usuarios[2];
    usuarios = Object.values(accObUsuarios);
    console.log(usuarios);
    for (let i = 0; i < correos.length && usuarios.length; i++) {
        if (usuarios[i].tipoDeUsuario === 'Usuario especializado') {
            let fila = tbody.insertRow();
            fila.insertCell().innerHTML = usuarios[i]['estado'];
            fila.insertCell().innerHTML = usuarios[i]['tipoDeUsuario'];
            fila.insertCell().innerHTML = usuarios[i]['numeroDeIdentificacion'];
            fila.insertCell().innerHTML = usuarios[i]['primerNombre'];
            fila.insertCell().innerHTML = usuarios[i]['primerApellido'];
            fila.insertCell().innerHTML = correos[i]['correoElectronico'];
            fila.insertCell().innerHTML = usuarios[i]['numeroDeTelefono'];
            fila.insertCell().innerHTML = usuarios[i]['provincia'];
            fila.insertCell().innerHTML = usuarios[i]['canton'];
            fila.insertCell().innerHTML = usuarios[i]['distrito'];
            fila.insertCell().innerHTML = usuarios[i]['profesion'];
            // fila.insertCell().innerHTML = usuarios[i]['tarifaPlataforma'];
            // fila.insertCell().innerHTML = usuarios[i]['montoBase'];
            let btn_perfil = document.createElement('button');
            btn_perfil.type = 'button';
            btn_perfil.innerText = 'Mas informacion';
            btn_perfil.addEventListener('click', () => {
                localStorage.setItem('mongoIdCorreos', correos[i]['_id']);
                localStorage.setItem('mongoIdUsuarios', usuarios[i]['_id']);
                window.location.href = 'perfil_usuarios.html';
            })
            fila.appendChild(btn_perfil);
        }
    }
}
let buscarUsuarios = () => {
    tbody.innerHTML = '';
    let busqueda = inputBusqueda.value.toLowerCase();
    let match = false;
    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].tipoDeUsuario === 'Usuario especializado') {
            let nombre = usuarios[i]['primerNombre'].toLowerCase();
            let apellido = usuarios[i]['primerApellido'].toLowerCase();
            let correo = correos[i]['correoElectronico'].toLowerCase();
            let estado = usuarios[i]['estado'].toLowerCase();
            let identificacion = usuarios[i]['numeroDeIdentificacion'].toLowerCase();
            let profesion = usuarios[i]['profesion'].toLowerCase();
            if (nombre.includes(busqueda) || apellido.includes(busqueda) || correo.includes(busqueda) || estado.includes(busqueda) || identificacion.includes(busqueda) || profesion.includes(busqueda)) {
                let fila = tbody.insertRow();
                fila.insertCell().innerHTML = usuarios[i]['estado'];
                fila.insertCell().innerHTML = usuarios[i]['tipoDeUsuario'];
                fila.insertCell().innerHTML = usuarios[i]['numeroDeIdentificacion'];
                fila.insertCell().innerHTML = usuarios[i]['primerNombre'];
                fila.insertCell().innerHTML = usuarios[i]['primerApellido'];
                fila.insertCell().innerHTML = correos[i]['correoElectronico'];
                fila.insertCell().innerHTML = usuarios[i]['numeroDeTelefono'];
                fila.insertCell().innerHTML = usuarios[i]['provincia'];
                fila.insertCell().innerHTML = usuarios[i]['canton'];
                fila.insertCell().innerHTML = usuarios[i]['distrito'];
                fila.insertCell().innerHTML = usuarios[i]['profesion'];
                match = true;
                let btn_perfil = document.createElement('button');
                btn_perfil.type = 'button';
                btn_perfil.innerText = 'Ver perfil';
                btn_perfil.addEventListener('click', () => {
                    localStorage.setItem('mongoId', correos[i]['_id']);
                    localStorage.setItem('mongoIdUsuarios', usuarios[i]['_id']);
                    window.location.href = 'perfil_usuarios.html';
                })
                fila.appendChild(btn_perfil);
            }
        }
    }
    if (match === false) {
        tbody.innerHTML = 'No hay datos disponibles'
    }
}
mostrarDatos();
inputBusqueda.addEventListener('keyup', buscarUsuarios);
// 'use strict';
// const tbody = document.querySelector('#tablaUsuarios tbody');
// const inputBusqueda = document.querySelector('#inputBuscar');
// let usuarios;
// let correos;
// let mostrarDatos = async() => {
//     let oUsuarios = await listarUsuarios();
//     usuarios = Object.values(oUsuarios);
//     console.log(oUsuarios);
//     let oCorreos = await listarCorreos();
//     correos = Object.values(oCorreos);
//     tbody.innerHTML = '';
//     console.log(oCorreos);
//     let accObCorreos = correos[1];
//     correos = Object.values(accObCorreos);
//     let accObUsuarios = usuarios[1];
//     usuarios = Object.values(accObUsuarios);
//     for (let i = 0; i < correos.length && usuarios.length; i++) {
//         let fila = tbody.insertRow();
//         fila.insertCell().innerHTML = usuarios[i]['estado'];
//         fila.insertCell().innerHTML = usuarios[i]['tipoDeUsuario'];
//         fila.insertCell().innerHTML = usuarios[i]['numeroDeIdentificacion'];
//         fila.insertCell().innerHTML = usuarios[i]['primerNombre'];
//         fila.insertCell().innerHTML = usuarios[i]['primerApellido'];
//         fila.insertCell().innerHTML = correos[i]['correoElectronico'];
//         fila.insertCell().innerHTML = usuarios[i]['numeroDeTelefono'];
//         fila.insertCell().innerHTML = usuarios[i]['provincia'];
//         fila.insertCell().innerHTML = usuarios[i]['canton'];
//         fila.insertCell().innerHTML = usuarios[i]['distrito'];
//         fila.insertCell().innerHTML = usuarios[i]['profesion'];
//         // fila.insertCell().innerHTML = usuarios[i]['tarifaPlataforma'];
//         // fila.insertCell().innerHTML = usuarios[i]['montoBase'];
//         let btn_perfil = document.createElement('button');
//         btn_perfil.type = 'button';
//         btn_perfil.innerText = 'Ver perfil';
//         btn_perfil.addEventListener('click', () => {
//             localStorage.setItem('mongoIdCorreos', correos[i]['_id']);
//             localStorage.setItem('mongoIdUsuarios', usuarios[i]['_id']);
//             window.location.href = 'perfil_usuarios.html';
//         })
//         fila.appendChild(btn_perfil);
//     }
// }
// let buscarUsuarios = () => {
//     tbody.innerHTML = '';
//     let busqueda = inputBusqueda.value.toLowerCase();
//     let match = false;
//     for (let i = 0; i < usuarios.length; i++) {
//         let nombre = usuarios[i]['primerNombre'].toLowerCase();
//         let apellido = usuarios[i]['primerApellido'].toLowerCase();
//         let correo = correos[i]['correoElectronico'].toLowerCase();
//         let estado = usuarios[i]['estado'].toLowerCase();
//         let identificacion = usuarios[i]['numeroDeIdentificacion'].toLowerCase();
//         let profesion = usuarios[i]['profesion'].toLowerCase();
//         if (nombre.includes(busqueda) || apellido.includes(busqueda) || correo.includes(busqueda) || estado.includes(busqueda) || identificacion.includes(busqueda) || profesion.includes(busqueda)) {
//             let fila = tbody.insertRow();
//             fila.insertCell().innerHTML = usuarios[i]['estado'];
//             fila.insertCell().innerHTML = usuarios[i]['tipoDeUsuario'];
//             fila.insertCell().innerHTML = usuarios[i]['numeroDeIdentificacion'];
//             fila.insertCell().innerHTML = usuarios[i]['primerNombre'];
//             fila.insertCell().innerHTML = usuarios[i]['primerApellido'];
//             fila.insertCell().innerHTML = correos[i]['correoElectronico'];
//             fila.insertCell().innerHTML = usuarios[i]['numeroDeTelefono'];
//             fila.insertCell().innerHTML = usuarios[i]['provincia'];
//             fila.insertCell().innerHTML = usuarios[i]['canton'];
//             fila.insertCell().innerHTML = usuarios[i]['distrito'];
//             fila.insertCell().innerHTML = usuarios[i]['profesion'];
//             match = true;
//             let btn_perfil = document.createElement('button');
//             btn_perfil.type = 'button';
//             btn_perfil.innerText = 'Ver perfil';
//             btn_perfil.addEventListener('click', () => {
//                 localStorage.setItem('mongoId', correos[i]['_id']);
//                 localStorage.setItem('mongoIdUsuarios', usuarios[i]['_id']);
//                 window.location.href = 'perfil_usuarios.html';
//             })
//             fila.appendChild(btn_perfil);
//         }
//     }
//     if (match === false) {
//         tbody.innerHTML = 'No hay datos disponibles'
//     }
// }
// mostrarDatos();
// inputBusqueda.addEventListener('keyup', buscarUsuarios);