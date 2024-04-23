'use strict';

const botonGuardar = document.querySelector('#btnGuardar');
const nombre = document.querySelector('#txtNombre');
const descripcion = document.querySelector('#txtDescripcion');





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
    localStorage.clear();
    nombre.value = '';
    descripcion.value = '';
    window.location.href = 'listarRutas.html';
};

let obtenerDatos = () => {

    let error_validacion = validar();
    if (!error_validacion) {
        let Nombre = nombre.value;
        let Descripcion = descripcion.value;
        let listaRutas = localStorage.getItem('Coordenadas');
        let UsuarioSolicita = "Usuario que solicita";
        let estado = "Activa";

        // let UsuarioSolicita = localStorage.getItem('IDusuario')



        registrarRuta(Nombre, Descripcion, listaRutas, UsuarioSolicita, estado);

        console.log(Nombre, Descripcion, listaRutas, UsuarioSolicita);

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



botonGuardar.addEventListener('click', obtenerDatos);