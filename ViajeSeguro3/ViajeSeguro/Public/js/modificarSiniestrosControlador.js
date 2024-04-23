'use strict';


// let _id = localStorage.getItem('_id');

// traer el _id del siniestro en localStorge para llenar los datos del form

const TipoDeSiniestro = document.querySelector('#sltTipoDeSiniestro');
const Descripcion = document.querySelector('#txtDescripcion');
const Provincia = document.querySelector('#sltProvincia');
const Canton = document.querySelector('#sltCanton');
const Distrito = document.querySelector('#sltDistrito');
const Senas = document.querySelector('#txtSenas');
const usuarioActual = localStorage.getItem("usuarioID");
const siniestroId = localStorage.getItem("siniestroId");
const coordenadas = document.querySelector('#coordinates');
// const Lat;
// const Long;
// let listaTipoDeSiniestro = [];
const Foto = document.querySelector('#foto');




// siniestroId

let llenar = async() => {
    let siniestro = await buscarSiniestroId(siniestroId);
    Foto.src = siniestro.foto;
    TipoDeSiniestro.value = siniestro.categoria;
    Descripcion.value = siniestro.descripcionSiniestro;
    Provincia.value = siniestro.provincia;
    Canton.value = siniestro.canton;
    Distrito.value = siniestro.distrito;
    Senas.value = siniestro.senas;
    coordenadas.value = siniestro.coordenadas;
    // Lat.value = siniestro.latSiniestro;
    // Long.value = siniestro.longSiniestro;

    // console.log(Lat, Long);

    console.log(siniestro.coordenadas);
    console.log(coordenadas);
    console.log(coordinates.Longitude);

}

llenar();



// let llenarFormulario = async() => {
//     let siniestro = await listarSiniestros(siniestroId);
// listaTipoDeSiniestro = await listarTipoDeSiniestro();

// TipoDeSiniestro.value = siniestro.tipoSiniestro;

// Foto.src = siniestro.foto;



// tbody.innerHTML = '';

// for (let i = 0; i < listaTipoDeSiniestro.length; i++) {
//     // let option = tbody.insertRow();
//     if (listaTipoDeSiniestro[i]['tipoSiniestro'] == TipoDeSiniestro.value) {
//         TipoDeSiniestro.value = siniestro.categoria;

//     }

//     console.log(siniestro);
//     console.log(TipoDeSiniestro.value);
// }
// console.log(listaTipoDeSiniestro[i]['tipoSiniestro']);
// let option = document.createElement("option");
// option.text = listaTipoDeSiniestro[i]['tipoSiniestro'];
// option.value = listaTipoDeSiniestro[i]['tipoSiniestro'];
// sltTipoDeSiniestro.appendChild(option);


// };



// llenarFormulario();