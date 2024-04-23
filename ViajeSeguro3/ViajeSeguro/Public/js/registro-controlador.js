'use strict';

const botonSolicitar = document.querySelector('#btnSolicitar');
const listaTipoAsistencia = document.querySelector('#sltTipoDeSiniestroAsist');
const descripcion = document.querySelector('#txtDescripcion');
const provincia = document.querySelector('#sltProvincia');
const canton = document.querySelector('#sltCanton');
const distrito = document.querySelector('#sltDistrito');



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
    listaTipoAsistencia.value = '';
    descripcion.value = '';
};

let obtenerSolicitud = () => {
    let errorValidacion = validar();
    if (!errorValidacion) {
        let tipoAsistencia = listaTipoAsistencia.value;
        let descripciones = descripcion.value;
        let coordenadas = document.getElementById("coordinates").innerText;
        let usuario = "Nombre del usuario que solicita";
        let provinciaC = provincia.value;
        let cantonC = canton.value;
        let distritoC = distrito.value;
        console.log(tipoAsistencia, descripciones, coordenadas, usuario);

        registrarAsistencias(tipoAsistencia, descripciones, coordenadas, usuario, provinciaC, cantonC, distritoC);
        console.log(coordenadas);
        console.log(coordinates);

        Swal.fire({
            title: 'El proceso se realizó correctamente',
            text: 'Sus datos han sido almacenados',
            icon: 'success'
        }).then(() => {
            window.location.href = 'listarSiniestros.html';
        });
    } else {
        Swal.fire({
            title: 'No se han podido enviar sus datos',
            text: 'Por favor revise los campos resaltados',
            icon: 'warning'
        })
    }


};


botonSolicitar.addEventListener('click', obtenerSolicitud);