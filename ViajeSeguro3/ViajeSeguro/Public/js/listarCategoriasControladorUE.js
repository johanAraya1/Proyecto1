'use strict';
// const tbody = document.querySelector('#tblCategorias tbody');
// const buscar = document.querySelector('#txtFiltro');
const listaCategorias = document.querySelector('#containerCat');
let listaTipoDeSiniestro = [];



let mostrarDatosCat = async() => {

    listaTipoDeSiniestro = await listarTipoDeSiniestro();

    for (let i = 0; i < listaTipoDeSiniestro.length; i++) {
        let containerC = document.createElement("div");
        let checkboxCat = document.createElement('input');
        checkboxCat.type = 'checkbox';
        checkboxCat.value = listaTipoDeSiniestro[i]['tipoSiniestro'];
        let tituloCat = document.createElement('label');
        tituloCat.innerHTML = listaTipoDeSiniestro[i]['tipoSiniestro'];
        containerC.appendChild(checkboxCat);
        containerC.appendChild(tituloCat);
        listaCategorias.appendChild(containerC);


    }

}

// let filtrarDatos = () => {
//     tbody.innerHTML = '';
//     let filtro = buscar.value.toLowerCase();
//     console.log(filtro);
//     let hayCoincidencias = false;

//     for (let i = 0; i < listaTipoDeSiniestro.length; i++) {
//         let tipoSiniestro = listaTipoDeSiniestro[i]['tipoSiniestro'].toLowerCase();

//         if (tipoSiniestro.includes(filtro)) {
//             let fila = tbody.insertRow();
//             let categoria = document.createElement("h3");
//             categoria.innerText = listaTipoDeSiniestro[i]['tipoSiniestro'];
//             categoria.classList.add("tablaCategoria");
//             fila.insertCell().appendChild(categoria);

//             let btnEliminar = document.createElement("button");
//             btnEliminar.type = "button";
//             btnEliminar.innerText = "Eliminar";
//             btnEliminar.classList.add("btnEliminar");
//             fila.insertCell().appendChild(btnEliminar);

//             let btnModificar = document.createElement("button");
//             btnModificar.type = "button";
//             btnModificar.innerText = "Modificar";
//             btnModificar.classList.add("btnModificar");
//             fila.insertCell().appendChild(btnModificar);

//             let MostrarDescripcion = document.createElement("button");
//             MostrarDescripcion.type = "button";
//             MostrarDescripcion.innerText = "Descripcion";
//             MostrarDescripcion.classList.add("MostrarDescripcion");
//             fila.insertCell().appendChild(MostrarDescripcion);

//             btnEliminar.addEventListener('click', () => {
//                 console.log("Aquí caso de uso de eliminar categoria")



//             })

//             btnModificar.addEventListener('click', () => {
//                 console.log("Aquí caso de uso de modificar categoria")



//             })

//             hayCoincidencias = true;

//         }

//     };

//     if (hayCoincidencias == false) {
//         tbody.innerHTML = 'No hay datos que mostrar';
//     }
// };

mostrarDatosCat();
// txtFiltro.addEventListener('keyup', filtrarDatos);