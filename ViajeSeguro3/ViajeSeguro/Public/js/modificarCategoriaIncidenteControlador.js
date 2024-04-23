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
let icono = document.querySelector("#imagenPrevia");
let informacionCategoria;
let idIncidente = localStorage.getItem("idCategoria");
let estado;



let llenarCampos = async() => {
    let informacionCategoria = await buscarCategoriaIncidente(idIncidente);

    TipoSiniestro.value = informacionCategoria.tipoSiniestro;
    descripcion.value = informacionCategoria.descripcion;
    icono.src = informacionCategoria.icono;
    estado = informacionCategoria.estado;
    idIncidente = informacionCategoria._id;

}

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
    descripcion.value = '';
};

let obtenerDatos = () => {

    let errorValidacion = validar();
    if (!errorValidacion) {
        let listaTipoDeSiniestro = TipoSiniestro.value;
        icono = document.querySelector('#imagenPrevia').src;
        let descripcionIncidente = descripcion.value;




        modificarTipoDeSiniestro(idIncidente, listaTipoDeSiniestro, estado, icono, descripcionIncidente);



    } else {
        Swal.fire({
            title: 'No fue posible guardar',
            text: 'Por favor llene los campos resaltados',
            icon: 'warning'
        })
    }

};

llenarCampos();
botonGuardar.addEventListener('click', obtenerDatos);