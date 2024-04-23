'use strict';

const caractBody = document.querySelector('#tblCaracteristicasEspeciales tbody');

let caractericticaa;

let mostrarCaracteristicas = async() => {
    let oCaracteristicas = await listarCaracteristica();
    caractericticaa = Object.values(oCaracteristicas);
    caractBody.innerHTML = '';
    console.log(oCaracteristicas);

    for (let i = 0; i < oCaracteristicas.length; i++) {
        let fila = caractBody.insertRow();

        let div = document.createElement("div");
        div.classList.add("contenedor");


        let categoria = document.createElement("label");
        categoria.innerText = oCaracteristicas[i]['caracteristica'];
        categoria.classList.add("tablaCaract");

        let check = document.createElement("input");
        check.type = "checkbox";
        check.classList.add("checkTabla");

        div.appendChild(check);
        div.appendChild(categoria);

        fila.appendChild(div);
    };

}

mostrarCaracteristicas();