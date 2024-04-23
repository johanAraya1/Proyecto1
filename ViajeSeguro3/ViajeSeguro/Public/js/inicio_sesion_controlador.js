'use strict';

const btnIniciarSesion = document.querySelector('#btnIniciarSesion');
const correoInicio = document.querySelector('#correoInicioSesion');
const passInicio = document.querySelector('#passInicioSesion');




let limpiar = () => {
    correoInicio.value = '';
    passInicio.value = '';
}


let obtenerDatos = () => {



    let correo = correoInicio.value;
    let pass = passInicio.value;

    registrarInicioSesion(correo, pass);
    // console.log(correo, pass);

    // Swal.fire({
    //     title: 'El proceso se realizó correctamente',
    //     text: 'Sus datos han sido almacenados',
    //     icon: 'success'
    // }).then(() => {
    //     limpiar();
    // });

    // window.location = 'https://www.mongodb.com/es';





};














btnIniciarSesion.addEventListener('click', obtenerDatos);