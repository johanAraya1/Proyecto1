'use strict';
const listaSolicitudAsistencias = document.querySelector('#listaSolicitudAsistencias');
const buscarAsistencia = document.querySelector("#filtrarAsistencias");
let listaSolicitudesAsistencia = [];

let mostrarAsistencias = async() => {
    listaSolicitudesAsistencia = await listarAsistencias();

    for (let i = 0; i < listaSolicitudesAsistencia.length; i++) {
        let containerAsistencias1 = document.createElement("div");
        let containerAsistencias2 = document.createElement("div");
        let containerAsistencias3 = document.createElement("div");
        let containerAsistencias4 = document.createElement("div");
        let containerAsistencias5 = document.createElement("div");
        let containerAsistencias6 = document.createElement("div");

        let asistencia = document.createElement('h3');
        let descripcion = document.createElement('h3');
        let nombreUsuario = document.createElement('h3');
        let provincia = document.createElement('h3');
        let canton = document.createElement('h3');
        let distrito = document.createElement('h3');
        asistencia.innerHTML = listaSolicitudesAsistencia[i]['tipoAsistencia'];
        descripcion.innerHTML = listaSolicitudesAsistencia[i]['descripcionAsistencia'];
        descripcion.classList.add("desc");
        nombreUsuario.innerHTML = "";
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
        listaSolicitudAsistencias.appendChild(containerAsistenciaBtn);
        listaSolicitudAsistencias.appendChild(containerAsistenciaBtnEliminar);
        listaSolicitudAsistencias.appendChild(containerAsistenciaBtnActivar);

    }
}


// let filtroAsistencias = async() => {
//     let coincidencias = false;
//     listaSolicitudAsistencias.innerHTML = "";
//     console.log(listaSolicitudesAsistencia);
//     let filtro = buscarAsistencia.value.toLowerCase();
//     if (filtro != "") {
//         for (let i = 0; i < listaSolicitudesAsistencia.length; i++) {
//             if (listaSolicitudesAsistencia[i].usuarioSolicita.toLowerCase().includes(filtro) || listaSolicitudesAsistencia[i].canton.toLowerCase().includes(filtro) || listaSolicitudesAsistencia[i].provincia.toLowerCase().includes(filtro) || listaSolicitudesAsistencia[i].distrito.toLowerCase().includes(filtro) || listaSolicitudesAsistencia.tipoAsistencia.toLowerCase().includes(filtro) || listaSolicitudesAsistencia.descripcionAsistencia.toLowerCase().includes(filtro)) {

//                 let containerAsistencias1 = document.createElement("div");
//                 let containerAsistencias2 = document.createElement("div");
//                 let containerAsistencias3 = document.createElement("div");
//                 let containerAsistencias4 = document.createElement("div");
//                 let containerAsistencias5 = document.createElement("div");
//                 let containerAsistencias6 = document.createElement("div");
//                 let containerAsistenciaBtn = document.createElement('button');
//                 containerAsistenciaBtn.innerText = 'Editar';
//                 containerAsistenciaBtn.type = "button";
//                 containerAsistenciaBtn.addEventListener("click", () => {
//                     localStorage.setItem("idAsistencia", listaSolicitudesAsistencia[i]["_id"]);
//                     window.location.href = "modificarSolicitudAsistenciaADM.html";
//                 });
//                 let containerAsistenciaBtnEliminar = document.createElement("button");
//                 containerAsistenciaBtnEliminar.innerText = "Eliminar";
//                 containerAsistenciaBtnEliminar.type = "button";
//                 containerAsistenciaBtnEliminar.addEventListener("click", () => {
//                     funcionquehayquecrear();

//                 });
//                 let containerAsistenciaBtnActivar = document.createElement("button");
//                 containerAsistenciaBtnActivar.type = "button";
//                 if (listaSolicitudesAsistencia[i]["estado"] == "activa") {
//                     containerAsistenciaBtnActivar.innerText = "Desactivar";
//                     containerAsistenciaBtnActivar.addEventListener("click", () => {
//                         funcionquehayquecrear();
//                     });
//                 } else {
//                     containerAsistenciaBtnActivar.innerText = "Activar";
//                     containerAsistenciaBtnActivar.addEventListener("click", () => {
//                         funcionquehayquecrear();
//                     });
//                 }
//                 let asistencia = document.createElement('h3');
//                 let descripcion = document.createElement('h3');
//                 let nombreUsuario = document.createElement('h3');
//                 let provincia = document.createElement('h3');
//                 let canton = document.createElement('h3');
//                 let distrito = document.createElement('h3');
//                 asistencia.innerHTML = listaSolicitudesAsistencia[i]['tipoAsistencia'];
//                 descripcion.innerHTML = listaSolicitudesAsistencia[i]['descripcionAsistencia'];
//                 nombreUsuario.innerHTML = listaSolicitudesAsistencia[i]['usuarioSolicita'];
//                 provincia.innerHTML = listaSolicitudesAsistencia[i]['provincia'];
//                 canton.innerHTML = listaSolicitudesAsistencia[i]['canton'];
//                 distrito.innerHTML = listaSolicitudesAsistencia[i]['distrito'];
//                 containerAsistencias1.appendChild(asistencia);
//                 containerAsistencias2.appendChild(descripcion);
//                 containerAsistencias3.appendChild(nombreUsuario);
//                 containerAsistencias4.appendChild(provincia);
//                 containerAsistencias5.appendChild(canton);
//                 containerAsistencias6.appendChild(distrito);
//                 listaSolicitudAsistencias.appendChild(containerAsistencias1);
//                 listaSolicitudAsistencias.appendChild(containerAsistencias2);
//                 listaSolicitudAsistencias.appendChild(containerAsistencias3);
//                 listaSolicitudAsistencias.appendChild(containerAsistencias4);
//                 listaSolicitudAsistencias.appendChild(containerAsistencias5);
//                 listaSolicitudAsistencias.appendChild(containerAsistencias6);
//                 listaSolicitudAsistencias.appendChild(containerAsistenciaBtn);
//                 listaSolicitudAsistencias.appendChild(containerAsistenciaBtnEliminar);
//                 listaSolicitudAsistencias.appendChild(containerAsistenciaBtnActivar);

//                 coincidencias = true;
//             }
//             if (coincidencias == false) {
//                 document.querySelector("#resultadoFiltrar").innerText = "No se han encontrado coincidencias";
//             } else {
//                 document.querySelector("#resultadoFiltrar").innerHTML = "";
//             }
//         }
//     } else {
//         document.querySelector("#resultadoFiltrar").innerHTML = "";
//         mostrarAsistencias();
//     }

// };

// buscarAsistencia.addEventListener("input", filtroAsistencias);
mostrarAsistencias();