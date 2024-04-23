// 'use strict';

// const tbody = document.querySelector('#tablaUsuarios tbody');
// const inputBusqueda = document.querySelector('#inputBuscar');
// let usuarios;

// let mostrarDatos = async() => {
//     let oUsuarios = await listarUsuarios();
//     usuarios = Object.values(oUsuarios);
//     tbody.innerHTML = '';
//     console.log(oUsuarios);

//     let accObUsuarios = usuarios[1];
//     usuarios = Object.values(accObUsuarios);

//     for (let i = 0; i < usuarios.length; i++) {
//         let fila = tbody.insertRow();
//         fila.insertCell().innerHTML = usuarios[i]['estado'];
//         fila.insertCell().innerHTML = usuarios[i]['tipoDeUsuario'];
//         fila.insertCell().innerHTML = usuarios[i]['numeroDeIdentificacion'];
//         fila.insertCell().innerHTML = usuarios[i]['primerNombre'];
//         fila.insertCell().innerHTML = usuarios[i]['primerApellido'];
//         fila.insertCell().innerHTML = usuarios[i]['correoElectronico'];
//         fila.insertCell().innerHTML = usuarios[i]['password'];
//         fila.insertCell().innerHTML = usuarios[i]['numeroDeTelefono'];
//         fila.insertCell().innerHTML = usuarios[i]['provincia'];
//         fila.insertCell().innerHTML = usuarios[i]['canton'];
//         fila.insertCell().innerHTML = usuarios[i]['distrito'];
//         fila.insertCell().innerHTML = usuarios[i]['profesion'];
//         fila.insertCell().innerHTML = usuarios[i]['tarifaPlataforma'];
//         fila.insertCell().innerHTML = usuarios[i]['montoBase'];
//     }



// }

// let buscarUsuarios = () => {
//     tbody.innerHTML = '';
//     let busqueda = inputBusqueda.value.toLowerCase();
//     let match = false;

//     for (let i = 0; i < usuarios.length; i++) {
//         let nombre = usuarios[i]['primerNombre'].toLowerCase();
//         let apellido = usuarios[i]['primerApellido'].toLowerCase();
//         let correo = usuarios[i]['correoElectronico'].toLowerCase();
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
//             fila.insertCell().innerHTML = usuarios[i]['correoElectronico'];
//             fila.insertCell().innerHTML = usuarios[i]['password'];
//             fila.insertCell().innerHTML = usuarios[i]['numeroDeTelefono'];
//             fila.insertCell().innerHTML = usuarios[i]['provincia'];
//             fila.insertCell().innerHTML = usuarios[i]['canton'];
//             fila.insertCell().innerHTML = usuarios[i]['distrito'];
//             fila.insertCell().innerHTML = usuarios[i]['profesion'];
//             fila.insertCell().innerHTML = usuarios[i]['tarifaPlataforma'];
//             fila.insertCell().innerHTML = usuarios[i]['montoBase'];
//             match = true;
//         } else {

//         }
//     }
//     if (match == false) {
//         tbody.innerHTML = 'No hay datos disponibles';
//     }
// }
// mostrarDatos();
// inputBusqueda.addEventListener('keyup', buscarUsuarios);

'use strict';


const tbody = document.querySelector('#tablaUsuarios tbody');
const inputBusqueda = document.querySelector('#inputBuscar');
let usuarios;
let correos;
let mostrarDatos = async() => {
    let oUsuarios = await listarUsuarios();

    usuarios = Object.values(oUsuarios);

    let oCorreos = await listarCorreos();
    correos = Object.values(oCorreos);
    tbody.innerHTML = '';

    let accObCorreos = correos[1];

    correos = Object.values(accObCorreos);

    let accObUsuarios = usuarios[2];
    usuarios = Object.values(accObUsuarios);
    for (let i = 0; i < correos.length && usuarios.length; i++) {
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
        btn_perfil.innerText = 'Ver perfil';
        btn_perfil.addEventListener('click', () => {
            localStorage.setItem('mongoIdCorreos', correos[i]['_id']);
            localStorage.setItem('mongoIdUsuarios', usuarios[i]['_id']);
            window.location.href = 'perfil_usuarios_admin.html';
        })
        fila.appendChild(btn_perfil);

        let celdaEstados = fila.insertCell();

        let botonEstados = document.createElement('button');
        botonEstados.type = 'button';



        if (usuarios[i]['estado'] == 'activo') {
            botonEstados.classList.add('btnEstadoDesactivado');
            botonEstados.innerText = 'Desactivar';



            botonEstados.addEventListener('click', () => {
                localStorage.setItem('mongoIdCorreos', correos[i]['_id']);
                localStorage.setItem('mongoIdUsuarios', usuarios[i]['_id']);
                deshabilitarPersona(usuarios[i]['_id']);


            })
        } else {
            botonEstados.classList.add('btnEstadoActivado');
            botonEstados.innerText = 'Activar';
            let prueba = usuarios[i]['estado'];
            // prueba.value = 'inactivo';
            botonEstados.addEventListener('click', () => {
                localStorage.setItem('mongoIdCorreos', correos[i]['_id']);
                localStorage.setItem('mongoIdUsuarios', usuarios[i]['_id']);
                habilitarPersona(usuarios[i]['_id']);
                console.log(prueba);



            })
        }


        celdaEstados.appendChild(botonEstados);

        let celdaEliminar = fila.insertCell();
        let botonEliminar = document.createElement("button");
        botonEliminar.type = "button";
        botonEliminar.innerText = "Eliminar";
        botonEliminar.classList.add("btnEliminar");
        botonEliminar.addEventListener("click", () => {
            Swal.fire({
                title: "Está seguro?",
                text: "No podrá deshacer esto una vez eliminada la tarjeta.",
                icon: "warning",
                showCancelButton: "true",
                confirmButtonColor: '#3085D6',
                cancelButtonColor: '#d33',
                confirmButtonText: "Si, deseo eliminarla!",
                cancelButtonText: "Cancelar"
            }).then((result) => {
                if (result.value) {
                    eliminarUsuario(usuarios[i]["_id"], correos[i]["_id"]);
                }
            })
        })
        celdaEliminar.appendChild(botonEliminar);
    }
}
let buscarUsuarios = () => {
    tbody.innerHTML = '';
    let busqueda = inputBusqueda.value.toLowerCase();
    let match = false;
    for (let i = 0; i < usuarios.length; i++) {
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
                window.location.href = 'perfil_usuarios_admin.html';
            })
            fila.appendChild(btn_perfil);

            let celdaEstados = fila.insertCell();
            let botonEstados = document.createElement('button');
            botonEstados.type = 'button';
            if (usuarios[i]['estado'] == 'activo') {
                botonEstados.classList.add('btnEstadoDesactivado');
                botonEstados.innerText = 'Desactivar';
                botonEstados.addEventListener('click', () => {
                    deshabilitarPersona(usuarios[i]['_id']);
                })
            } else {
                botonEstados.classList.add('btnEstadoActivado');
                botonEstados.innerText = 'Activar';
                botonEstados.addEventListener('click', () => {
                    habilitarPersona(usuarios[i]['_id']);
                })
            }
            celdaEstados.appendChild(botonEstados);

            let celdaEliminar = fila.insertCell();
            let botonEliminar = document.createElement("button");
            botonEliminar.type = "button";
            botonEliminar.innerText = "Eliminar";
            botonEliminar.classList.add("btnEliminar");
            botonEliminar.addEventListener("click", () => {
                Swal.fire({
                    title: "Está seguro?",
                    text: "No podrá deshacer esto una vez eliminada la tarjeta.",
                    icon: "warning",
                    showCancelButton: "true",
                    confirmButtonColor: '#3085D6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: "Si, deseo eliminarla!",
                    cancelButtonText: "Cancelar"
                }).then((result) => {
                    if (result.value) {
                        eliminarUsuario(usuarios[i]["_id"], correos[i]["_id"]);
                    }
                })
            })
            celdaEliminar.appendChild(botonEliminar);

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