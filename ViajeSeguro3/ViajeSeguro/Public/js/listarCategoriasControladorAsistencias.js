'use strict';
// const tbody = document.querySelector('#tblCategorias tbody');
const sltTipoDeSiniestro = document.querySelector('#sltTipoDeSiniestroAsist');
let listaTipoDeSiniestro = [];

let mostrarCategorias = async() => {

    listaTipoDeSiniestro = await listarTipoDeSiniestro();
    // tbody.innerHTML = '';

    for (let i = 0; i < listaTipoDeSiniestro.length; i++) {
        // let option = tbody.insertRow();
        console.log(listaTipoDeSiniestro[i]['tipoSiniestro']);
        let option = document.createElement("option");
        option.text = listaTipoDeSiniestro[i]['tipoSiniestro'];
        option.value = listaTipoDeSiniestro[i]['tipoSiniestro'];
        sltTipoDeSiniestro.appendChild(option);
        // let MostrarDescripcion = document.createElement("h3");

        // MostrarDescripcion.innerText = listaTipoDeSiniestro[i]['descripcion'];
        // MostrarDescripcion.classList.add("MostrarDescripcion");
        // fila.insertCell().appendChild(MostrarDescripcion);

    }


}

mostrarCategorias();