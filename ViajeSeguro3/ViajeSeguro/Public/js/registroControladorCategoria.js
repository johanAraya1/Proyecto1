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
const TipoSiniestro = document.querySelector('#txtTipoSiniestro');
const descripcion = document.querySelector('#txtDescripcion');




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
    TipoSiniestro.value = '';
    document.querySelector("#imagenPrevia").src = "https://res.cloudinary.com/dpfv7ok9y/image/upload/v1585971909/iconoPredeterminado_te0kwd.ico";
    descripcion.value = '';
};

let obtenerDatos = () => {

    let errorValidacion = validar();
    if (!errorValidacion) {
        let listaTipoDeSiniestro = TipoSiniestro.value;
        let estado = "activado";
        let icono = document.querySelector('#imagenPrevia').src;
        // let descripcion = descripcion.value;
        console.log(descripcion.value);


        registrarTipoDeSiniestro(listaTipoDeSiniestro, estado, icono, descripcion.value);



    } else {
        Swal.fire({
            title: 'No fue posible guardar',
            text: 'Por favor llene los campos resaltados',
            icon: 'warning'
        })
    }

};

botonGuardar.addEventListener('click', obtenerDatos);