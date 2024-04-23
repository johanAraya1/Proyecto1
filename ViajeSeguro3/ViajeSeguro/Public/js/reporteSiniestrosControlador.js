'use strict';

const tbody = document.querySelector('#tblSiniestros tbody');
const Filtro = document.querySelector('#txtFiltro');

let listaSiniestros = [];

let mostrarSiniestros = async() => {


    listaSiniestros = await listarSiniestros();

    for (let i = 0; i < listaSiniestros.length; i++) {
        let fila = tbody.insertRow();
        let siniestro = document.createElement('h3');
        siniestro.innerText = listaSiniestros[i]['categoria'];


        siniestro.classList.add("tablaSiniestros");
        fila.insertCell().appendChild(siniestro);

        let provincia = document.createElement("h3");
        provincia.innerText = listaSiniestros[i]["provincia"];
        provincia.classList.add("celdaProvincia");
        fila.insertCell().appendChild(provincia);

        let canton = document.createElement("h3");
        canton.innerText = listaSiniestros[i]["canton"];
        canton.classList.add("celdaCanton");
        fila.insertCell().appendChild(canton);

        let distrito = document.createElement("h3");
        distrito.innerText = listaSiniestros[i]["distrito"];
        distrito.classList.add("celdaDistrito");
        fila.insertCell().appendChild(distrito);




        let mostrarDescripcion = document.createElement("h3");

        mostrarDescripcion.innerText = listaSiniestros[i]['descripcionSiniestro'];
        mostrarDescripcion.classList.add("mostrarDescripcion");
        fila.insertCell().appendChild(mostrarDescripcion);

        let senas = document.createElement("h3");
        senas.innerText = listaSiniestros[i]["senas"];
        senas.classList.add("celdaSenas");
        fila.insertCell().appendChild(senas);

        let estado = document.createElement("h3");
        estado.innerText = listaSiniestros[i]["estado"];
        estado.classList.add("celdaEstado");
        fila.insertCell().appendChild(estado);

    }
};

let filtrarDatos = () => {
    tbody.innerHTML = '';
    let filtro = Filtro.value.toLowerCase();
    console.log(filtro);
    let hayCoincidencias = false;


    for (let i = 0; i < listaSiniestros.length; i++) {

        if (listaSiniestros[i]["categoria"].toLowerCase().includes(filtro) || listaSiniestros[i]["provincia"].toLowerCase().includes(filtro) || listaSiniestros[i]["canton"].toLowerCase().includes(filtro) || listaSiniestros[i]["distrito"].toLowerCase().includes(filtro)) {
            let fila = tbody.insertRow();
            let siniestro = document.createElement('h3');
            siniestro.innerText = listaSiniestros[i]['categoria'];
            console.log(siniestro);

            siniestro.classList.add("tablaSiniestros");
            fila.insertCell().appendChild(siniestro);

            let provincia = document.createElement("h3");
            provincia.innerText = listaSiniestros[i]["provincia"];
            provincia.classList.add("celdaProvincia");
            fila.insertCell().appendChild(provincia);

            let canton = document.createElement("h3");
            canton.innerText = listaSiniestros[i]["canton"];
            canton.classList.add("celdaCanton");
            fila.insertCell().appendChild(canton);

            let distrito = document.createElement("h3");
            distrito.innerText = listaSiniestros[i]["distrito"];
            distrito.classList.add("celdaDistrito");
            fila.insertCell().appendChild(distrito);

            let mostrarDescripcion = document.createElement("h3");

            mostrarDescripcion.innerText = listaSiniestros[i]['descripcionSiniestro'];
            mostrarDescripcion.classList.add("mostrarDescripcion");
            fila.insertCell().appendChild(mostrarDescripcion);

            let senas = document.createElement("h3");
            senas.innerText = listaSiniestros[i]["senas"];
            senas.classList.add("celdaSenas");
            fila.insertCell().appendChild(senas);

            let estado = document.createElement("h3");
            estado.innerText = listaSiniestros[i]["estado"];
            estado.classList.add("celdaEstado");
            fila.insertCell().appendChild(estado);

            let btnModificar = document.createElement("button");
            btnModificar.type = "button";
            btnModificar.innerText = "Modificar";
            btnModificar.classList.add("btnModificar");
            fila.insertCell().appendChild(btnModificar);



            hayCoincidencias = true;

        }

    };

    if (hayCoincidencias == false) {
        tbody.innerHTML = 'No hay datos que mostrar';
    }

};



let redirectLogout = () => {
    window.location.replace('index.html');
}

mostrarSiniestros();
txtFiltro.addEventListener('keyup', filtrarDatos);