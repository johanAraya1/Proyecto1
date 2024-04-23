'use strict';

const tbody = document.querySelector('#tablaCaracteristica tbody');
const inputBusqueda = document.querySelector('#inputBuscar');
let caractericticaa;

let mostrarDatos = async() => {
    let oCaracteristicas = await listarCaracteristica();
    caractericticaa = Object.values(oCaracteristicas);
    tbody.innerHTML = '';
    console.log(oCaracteristicas);

    let accionCaracteristica = caractericticaa;
    caractericticaa = Object.values(accionCaracteristica);

    for (let i = 0; i < caractericticaa.length; i++) {
        let fila = tbody.insertRow();
        fila.insertCell().innerHTML = caractericticaa[i]['caracteristica'];
    }

}

let buscarCaracteristica = () => {
    tbody.innerHTML = '';
    let busqueda = inputBusqueda.value.toLowerCase();
    let match = false;

    for (let i = 0; i < caractericticaa.length; i++) {
        let caracteristicaas = caractericticaa[i]['caracteristica'].toLowerCase();


        if (caracteristicaas.includes(busqueda)) {
            let fila = tbody.insertRow();

            fila.insertCell().innerHTML = caractericticaa[i]['caracteristica'];
            match = true;
        } else {

        }
    }
    if (match == false) {
        tbody.innerHTML = 'No hay datos disponibles';
    }
}
mostrarDatos();
inputBusqueda.addEventListener('keyup', buscarCaracteristica);