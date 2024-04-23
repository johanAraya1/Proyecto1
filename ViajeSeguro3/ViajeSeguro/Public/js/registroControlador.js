'use strict';
// Archivos controladores tienen las siguientes funciones:
// - Leer valores del html (formulario)
// - Muestra / imprime valores en el html
// - Realiza validaciones
// - Se comunica con el archivo servicio js
// let  es lo que vamos a utilizar
// const se utiliza para valores que no van a cambiar (el valor con el que se inicializar la variable no puede ser modificado)
// var ya no se suele utilizar
const botonGuardar = document.querySelector('#btnGuardar');
const TipoDeSiniestro = document.querySelector('#sltTipoDeSiniestro');
const Descripcion = document.querySelector('#txtDescripcion');
const Provincia = document.querySelector('#sltProvincia');
const Canton = document.querySelector('#sltCanton');
const Distrito = document.querySelector('#sltDistrito');
const Senas = document.querySelector('#txtSenas');
const usuarioActual = localStorage.getItem("usuarioID");
// const categoria = document.querySelector('#sltTipoDeSiniestro');
let validar = () => {
    let err = false;
    let elementosRequeridos = document.querySelectorAll('[required]');
    for (let i = 0; i < elementosRequeridos.length; i++) {
        if (elementosRequeridos[i].value == '') {
            elementosRequeridos[i].classList.add('inputError');
            err = true;
        } else {
            elementosRequeridos[i].classList.remove('inputError');
        }
    }
    return err;
};
let limpiar = () => {
    // TipoSiniestro.value = '';
    // document.querySelector("#imagenPrevia").src = "https://res.cloudinary.com/dpfv7ok9y/image/upload/v1585971909/iconoPredeterminado_te0kwd.ico";
    // descripcion.value = '';
};
let obtenerDatos = () => {
    let coordinatess = document.getElementById('coordinates');
    let coordenadas = [lngLat.lng, lngLat.lat];
    let errorValidacion = validar();
    if (!errorValidacion) {
        let categoria = TipoDeSiniestro.value;
        let txtDescripcion = Descripcion.value;
        let Estado = "activo";
        let txtProvincia = Provincia.value;
        let txtCanton = Canton.value;
        let txtDistrito = Distrito.value;
        let txtSenas = Senas.value;
        let coordenadas = coordinates;
        let usuarioReporta = usuarioActual
        let Foto = document.querySelector('#foto').src;
        console.log(coordinates);
        console.log(coordenadas);
        // console.log(lngLat.lat);
        registrarSiniestro(categoria, txtDescripcion, Estado, txtProvincia, txtCanton, txtDistrito, txtSenas, coordenadas, usuarioReporta, Foto);
        console.log(coordinatess)
    } else {
        Swal.fire({
            title: 'No fue posible guardar',
            text: 'Por favor llene los campos resaltados',
            icon: 'warning'
        })
    }
};
botonGuardar.addEventListener('click', obtenerDatos);


// 'use strict';

// // Archivos controladores tienen las siguientes funciones:

// // - Leer valores del html (formulario)
// // - Muestra / imprime valores en el html
// // - Realiza validaciones
// // - Se comunica con el archivo servicio js

// // let  es lo que vamos a utilizar
// // const se utiliza para valores que no van a cambiar (el valor con el que se inicializar la variable no puede ser modificado)
// // var ya no se suele utilizar

// const botonGuardar = document.querySelector('#btnGuardar');


// const TipoDeSiniestro = document.querySelector('#sltTipoDeSiniestro');
// const Descripcion = document.querySelector('#txtDescripcion');
// const Provincia = document.querySelector('#sltProvincia');
// const Canton = document.querySelector('#sltCanton');
// const Distrito = document.querySelector('#sltDistrito');
// const Senas = document.querySelector('#txtSenas');
// const usuarioActual = localStorage.getItem("usuarioID");
// // const categoria = document.querySelector('#sltTipoDeSiniestro');

// let validar = () => {
//     let err = false;
//     let elementosRequeridos = document.querySelectorAll('[required]');

//     for (let i = 0; i < elementosRequeridos.length; i++) {
//         if (elementosRequeridos[i].value == '') {
//             elementosRequeridos[i].classList.add('inputError');
//             err = true;
//         } else {
//             elementosRequeridos[i].classList.remove('inputError');
//         }
//     }

//     return err;
// };

// // let limpiar = () => {
// //     window.location.href = 'listarSiniestros.html'
// // };

// let obtenerDatos = () => {

//     let coordinates = document.getElementById('coordinates');
//     let coordenadas = [lngLat.lng, lngLat.lat];

//     let errorValidacion = validar();
//     if (!errorValidacion) {


//         let categoria = TipoDeSiniestro.value;
//         let txtDescripcion = Descripcion.value;
//         let Estado = "activo";
//         let txtProvincia = Provincia.value;
//         let txtCanton = Canton.value;
//         let txtDistrito = Distrito.value;
//         let txtSenas = Senas.value;
//         let coordenadas = coordinates;
//         let usuarioReporta = usuarioActual
//         let Foto = document.querySelector('#foto').src;

//         // let SolAsis = document.querySelector('#chxSolAsist input[type=checkbox]:checked').value;

//         console.log(coordenadas);



//         registrarSiniestro(categoria, txtDescripcion, Estado, txtProvincia, txtCanton, txtDistrito, txtSenas, coordenadas, usuarioReporta, Foto);

//         // if (SolAsis == 1) {

//         //     registrarAsistencia(categoria, txtDescripcion, JSON.parse(coordenadas), usuarioReporta, txtProvincia, txtCanton, txtDistrito);
//         //     console.log(categoria, txtDescripcion, JSON.parse(coordenadas), usuarioReporta, txtProvincia, txtCanton, txtDistrito)
//         // }

//         console.log(JSON.parse(coordenadas));

//         // console.log(Foto, usuarioReporta)

//     } else {
//         Swal.fire({
//             title: 'No fue posible guardar',
//             text: 'Por favor llene los campos resaltados',
//             icon: 'warning'
//         })

//     }

// };

// botonGuardar.addEventListener('click', obtenerDatos);