'use strict';
// Archivos controladores tienen las siguientes funciones:
// - Leer valores del html (formulario)
// - Muestra / imprime valores en el html
// - Realiza validaciones
// - Se comunica con el archivo servicio js
// let  es lo que vamos a utilizar
// const se utiliza para valores que no van a cambiar (el valor con el que se inicializar la variable no puede ser modificado)
// var ya no se suele utilizar
// const botonGuardar = document.querySelector('#btnGuardar');
const caracteristicas = document.querySelector('#txtCaracteristica');
let caracteristicaC;
let objectIdCaracteristica = localStorage.getItem('objectIdCaracteristica');
let validar = () => {
    let error = false;
    let elementosRequeridos = document.querySelectorAll('[required]');
    for (let i = 0; i < elementosRequeridos.length; i++) {
        if (elementosRequeridos[i].value == '') {
            elementosRequeridos[i].classList.add('inputError');
            error = true;
        } else {
            elementosRequeridos[i].classList.remove('inputError');
        }
    }
    return error;
};
let limpiar = () => {
    caracteristicas.value = '';
};
let obtenerDatos = () => {
    let error_validacion = validar();
    if (!error_validacion) {
        let listaCaracteristicas = caracteristicas.value;
        console.log(caracteristicas.value);
        registrarCaracteristica(listaCaracteristicas);
        Swal.fire({
            title: 'Almacenado',
            text: 'La característica se almacenó correctamente',
            icon: 'success'
        }).then(() => {
            limpiar();
        });
    } else {
        Swal.fire({
            title: 'No fue posible Guardar',
            text: 'Por favor llene los campos resaltados',
            icon: 'warning'
        })
    }
};
// let modificarCaracteristica = async() => {
//     caracteristicaC = await obtenerObjectId(objectIdCaracteristica);
// }
// modificarCaracteristica();
// botonGuardar.addEventListener('click', obtenerDatos);