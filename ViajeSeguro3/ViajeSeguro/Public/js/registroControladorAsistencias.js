// 'use strict';
// const listaSolicitudAsistencias = document.querySelector('#listaSolicitudAsistencias');
// let listaSolicitudesAsistencia = [];
// let miPerfil = document.querySelector('#miPerfilC');

// let mostrarAsistencias = async() => {
//     listaSolicitudesAsistencia = await listarAsistencias();

//     for (let i = 0; i < listaSolicitudesAsistencia.length; i++) {
//         let containerAsistencias1 = document.createElement("div");
//         let containerAsistencias2 = document.createElement("div");
//         let containerAsistencias3 = document.createElement("div");
//         let containerAsistencias4 = document.createElement("div");
//         let containerAsistencias5 = document.createElement("div");
//         let containerAsistencias6 = document.createElement("div");
//         let containerAsistenciaBtn;
//         let containerAsistenciaBtnRechazar;
//         let asistencia = document.createElement('h3');
//         let descripcion = document.createElement('h3');
//         let nombreUsuario = document.createElement('h3');
//         let provincia = document.createElement('h3');
//         let canton = document.createElement('h3');
//         let distrito = document.createElement('h3');
//         asistencia.innerHTML = listaSolicitudesAsistencia[i]['tipoAsistencia'];
//         descripcion.innerHTML = listaSolicitudesAsistencia[i]['descripcionAsistencia'];
//         nombreUsuario.innerHTML = listaSolicitudesAsistencia[i]['usuarioSolicita'];
//         provincia.innerHTML = listaSolicitudesAsistencia[i]['provincia'];
//         canton.innerHTML = listaSolicitudesAsistencia[i]['canton'];
//         distrito.innerHTML = listaSolicitudesAsistencia[i]['distrito'];
//         containerAsistencias1.appendChild(asistencia);
//         containerAsistencias2.appendChild(descripcion);
//         containerAsistencias3.appendChild(nombreUsuario);
//         containerAsistencias4.appendChild(provincia);
//         containerAsistencias5.appendChild(canton);
//         containerAsistencias6.appendChild(distrito);
//         listaSolicitudAsistencias.appendChild(containerAsistencias1);
//         listaSolicitudAsistencias.appendChild(containerAsistencias2);
//         listaSolicitudAsistencias.appendChild(containerAsistencias3);
//         listaSolicitudAsistencias.appendChild(containerAsistencias4);
//         listaSolicitudAsistencias.appendChild(containerAsistencias5);
//         listaSolicitudAsistencias.appendChild(containerAsistencias6);
//         if (listaSolicitudesAsistencia[i]['estado'] == 'inactivo') {
//             let containerAsistenciaBtn = document.createElement('button');
//             containerAsistenciaBtn.innerText = 'Aceptar solicitud';
//             containerAsistenciaBtn.value = listaSolicitudesAsistencia[i]['provincia'];
//             containerAsistenciaBtn.classList.add('btnaceptar');
//             listaSolicitudAsistencias.appendChild(containerAsistenciaBtn);
//             containerAsistenciaBtn.addEventListener('click', () => {
//                 Swal.fire({
//                     title: 'Esta seguro que desea aceptar la solicitud?',
//                     icon: 'warning',
//                     showCancelButton: true,
//                     confirmButtonColor: '#4caf50',
//                     cancelButtonColor: '#eb4848',
//                     confirmButtonText: 'Aceptar',
//                     cancelButtonText: 'Cancelar'
//                 }).then((result) => {
//                     if (result.value) {
//                         Swal.fire(
//                             'Listo!',
//                             'La solicitud ha sido aceptada',
//                             'success'
//                         )
//                         activarAsistencia(listaSolicitudesAsistencia[i]['_id']);
//                         setTimeout(function() {
//                             window.location.reload();
//                         }, 2000);

//                     }
//                 })

//             })
//         } else {
//             let containerAsistenciaBtnRechazar = document.createElement('button');
//             containerAsistenciaBtnRechazar.innerText = 'Cancelar solicitud';
//             containerAsistenciaBtnRechazar.value = listaSolicitudesAsistencia[i]['provincia'];
//             containerAsistenciaBtnRechazar.classList.add('btnRechazar');
//             listaSolicitudAsistencias.appendChild(containerAsistenciaBtnRechazar);
//             containerAsistenciaBtnRechazar.addEventListener('click', () => {
//                 Swal.fire({
//                     title: 'Esta seguro que desea rechazar la solicitud?',
//                     icon: 'warning',
//                     showCancelButton: true,
//                     confirmButtonColor: '#4caf50',
//                     cancelButtonColor: '#eb4848',
//                     confirmButtonText: 'Aceptar',
//                     cancelButtonText: 'Cancelar'
//                 }).then((result) => {
//                     if (result.value) {
//                         Swal.fire(
//                             'Listo!',
//                             'La solicitud ha sido rechazada',
//                             'success'
//                         )
//                         inactivarAsistencia(listaSolicitudesAsistencia[i]['_id']);
//                         setTimeout(function() {
//                             window.location.reload();
//                         }, 2000);

//                     }
//                 })

//             })
//         }


//     }
// }

// mostrarAsistencias();

// let redireccionMiPerfil = () => {
//     miPerfil.addEventListener('click', async() => {
//         let oUsuarios = await listarUsuarios();
//         console.log(oUsuarios);
//         let usuarios = Object.values(oUsuarios);
//         console.log(usuarios);
//         let oCorreos = await listarCorreos();
//         let correos = Object.values(oCorreos);
//         console.log(oCorreos);
//         let accObCorreos = correos[1];
//         console.log(accObCorreos);
//         correos = Object.values(accObCorreos);
//         console.log(correos);
//         let accObUsuarios = usuarios[2];
//         usuarios = Object.values(accObUsuarios);
//         console.log(usuarios);

//         for (let i = 0; i < usuarios.length && correos.length; i++) {
//             let objectIdInicioSesion = localStorage.getItem('objectIDInicioSesion');
//             if (objectIdInicioSesion === correos[i]._id) {
//                 localStorage.setItem('mongoIdCorreos', correos[i]);
//                 localStorage.setItem('mongoIdUsuarios', usuarios[i]['_id']);
//                 window.location.href = 'perfil_usuarios.html';
//             }
//         }



//         localStorage.setItem('mongoIdCorreos', correos._id);

//     });

// }

'use strict';
const listaSolicitudAsistencias = document.querySelector('#listaSolicitudAsistencias');
let listaSolicitudesAsistencia = [];
let miPerfil = document.querySelector('#miPerfilC');

let mostrarAsistencias = async() => {
    listaSolicitudesAsistencia = await listarAsistencias();
    let oUsuarios = await listarUsuarios();
    console.log(oUsuarios);
    let usuarios = Object.values(oUsuarios);
    console.log(usuarios);
    let accObUsuarios = usuarios[2];
    usuarios = Object.values(accObUsuarios);
    console.log(usuarios);
    let oCorreos = await listarCorreos();
    let correos = Object.values(oCorreos);
    console.log(oCorreos);
    let accObCorreos = correos[1];
    console.log(accObCorreos);
    correos = Object.values(accObCorreos);
    console.log(correos);
    let provinciaUsuarioLogueado = localStorage.getItem('provinciaMatchSolicitudAsistencia');
    for (let i = 0; i < listaSolicitudesAsistencia.length && usuarios.length && correos.length; i++) {
        if (provinciaUsuarioLogueado === listaSolicitudesAsistencia[i].provincia) {
            let containerAsistencias1 = document.createElement("div");
            let containerAsistencias2 = document.createElement("div");
            let containerAsistencias3 = document.createElement("div");
            let containerAsistencias4 = document.createElement("div");
            let containerAsistencias5 = document.createElement("div");
            let containerAsistencias6 = document.createElement("div");
            let containerAsistenciaBtn;
            let containerAsistenciaBtnRechazar;
            let asistencia = document.createElement('h3');
            let descripcion = document.createElement('h3');
            let nombreUsuario = document.createElement('h3');
            let provincia = document.createElement('h3');
            let canton = document.createElement('h3');
            let distrito = document.createElement('h3');
            asistencia.innerHTML = listaSolicitudesAsistencia[i]['tipoAsistencia'];
            descripcion.innerHTML = listaSolicitudesAsistencia[i]['descripcionAsistencia'];
            nombreUsuario.innerHTML = listaSolicitudesAsistencia[i]['usuarioSolicita'];
            provincia.innerHTML = listaSolicitudesAsistencia[i]['provincia'];
            canton.innerHTML = listaSolicitudesAsistencia[i]['canton'];
            distrito.innerHTML = listaSolicitudesAsistencia[i]['distrito'];
            containerAsistencias1.appendChild(asistencia);
            containerAsistencias2.appendChild(descripcion);
            containerAsistencias3.appendChild(nombreUsuario);
            containerAsistencias4.appendChild(provincia);
            containerAsistencias5.appendChild(canton);
            containerAsistencias6.appendChild(distrito);
            listaSolicitudAsistencias.appendChild(containerAsistencias1);
            listaSolicitudAsistencias.appendChild(containerAsistencias2);
            listaSolicitudAsistencias.appendChild(containerAsistencias3);
            listaSolicitudAsistencias.appendChild(containerAsistencias4);
            listaSolicitudAsistencias.appendChild(containerAsistencias5);
            listaSolicitudAsistencias.appendChild(containerAsistencias6);
            if (listaSolicitudesAsistencia[i]['estado'] == 'inactivo') {
                let containerAsistenciaBtn = document.createElement('button');
                containerAsistenciaBtn.innerText = 'Aceptar solicitud';
                containerAsistenciaBtn.value = listaSolicitudesAsistencia[i]['provincia'];
                containerAsistenciaBtn.classList.add('btnaceptar');
                listaSolicitudAsistencias.appendChild(containerAsistenciaBtn);
                containerAsistenciaBtn.addEventListener('click', () => {
                    Swal.fire({
                        title: 'Esta seguro que desea aceptar la solicitud?',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#4CAF50',
                        cancelButtonColor: '#EB4848',
                        confirmButtonText: 'Aceptar',
                        cancelButtonText: 'Cancelar'
                    }).then((result) => {
                        if (result.value) {
                            Swal.fire(
                                'Listo!',
                                'La solicitud ha sido aceptada',
                                'success'
                            )
                            activarAsistencia(listaSolicitudesAsistencia[i]['_id']);
                            setTimeout(function() {
                                window.location.reload();
                            }, 2000);
                        }
                    })
                })
            } else {
                let containerAsistenciaBtnRechazar = document.createElement('button');
                containerAsistenciaBtnRechazar.innerText = 'Cancelar solicitud';
                containerAsistenciaBtnRechazar.value = listaSolicitudesAsistencia[i]['provincia'];
                containerAsistenciaBtnRechazar.classList.add('btnRechazar');
                listaSolicitudAsistencias.appendChild(containerAsistenciaBtnRechazar);
                containerAsistenciaBtnRechazar.addEventListener('click', () => {
                    Swal.fire({
                        title: 'Esta seguro que desea cancelar la solicitud?',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#4CAF50',
                        cancelButtonColor: '#EB4848',
                        confirmButtonText: 'Aceptar',
                        cancelButtonText: 'Cancelar'
                    }).then((result) => {
                        if (result.value) {
                            Swal.fire(
                                'Listo!',
                                'La solicitud ha sido cancelada',
                                'success'
                            )
                            inactivarAsistencia(listaSolicitudesAsistencia[i]['_id']);
                            setTimeout(function() {
                                window.location.reload();
                            }, 2000);
                        }
                    })
                })
            }
        }
    }
}
mostrarAsistencias();
let redireccionMiPerfil = () => {
    miPerfil.addEventListener('click', async() => {
        let oUsuarios = await listarUsuarios();
        console.log(oUsuarios);
        let usuarios = Object.values(oUsuarios);
        console.log(usuarios);
        let oCorreos = await listarCorreos();
        let correos = Object.values(oCorreos);
        console.log(oCorreos);
        let accObCorreos = correos[1];
        console.log(accObCorreos);
        correos = Object.values(accObCorreos);
        console.log(correos);
        let accObUsuarios = usuarios[2];
        usuarios = Object.values(accObUsuarios);
        console.log(usuarios);
        for (let i = 0; i < usuarios.length && correos.length; i++) {
            let objectIdInicioSesion = localStorage.getItem('objectIDInicioSesion');
            if (objectIdInicioSesion === correos[i]._id) {
                localStorage.setItem('mongoIdCorreos', correos[i]);
                localStorage.setItem('mongoIdUsuarios', usuarios[i]['_id']);
                window.location.href = 'perfil_usuarios.html';
            }
        }
        localStorage.setItem('mongoIdCorreos', correos._id);
    });
}