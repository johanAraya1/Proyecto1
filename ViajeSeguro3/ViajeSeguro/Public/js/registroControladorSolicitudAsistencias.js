"use strict"


const botonModificar = document.querySelector('#btnModificar');
const tipoSolAsistencia = document.querySelector('#sltTipoDeSiniestroAsist');
const descripcion = document.querySelector('#txtDescripcion');
const coordenadas = document.querySelector('#coordinates');
const usuarioSolicita = document.querySelector('#usuario');
const provincia = document.querySelector('#sltProvincia');
const canton = document.querySelector('#sltCanton');
const distrito = document.querySelector('#sltDistrito');

let solicitudId = localStorage.getItem('idAsistencia');


console.log(solicitudId);


let traerSolicitudAsist = async() => {

    let solicitud = await buscarAsistenciaId(solicitudId);

    console.log(tipoSolAsistencia);
    console.log(descripcion);


    tipoSolAsistencia.value = solicitud.tipoAsistencia;
    descripcion.value = solicitud.descripcionAsistencia;
    coordenadas.value = solicitud.coordenadas;
    usuarioSolicita.value = solicitud.usuarioSolicita;
    provincia.value = solicitud.provincia;
    canton.value = solicitud.canton;
    distrito.value = solicitud.distrito;

    console.log(solicitud)
};

traerSolicitudAsist();

let limpiar = () => {

    document.querySelector('solicitud').reset();
    window.location.href = 'listarSiniestros.html';
};

let enviarDatos = () => {
    let errorEnFormulario = validar();
    if (!errorEnFormulario) {

        let tipoAsistencia = tipoSolAsistencia.value;
        let descripciones = descripcion.value;
        let coordenadas = document.getElementById("coordinates").innerText;
        let usuario = "Nombre del usuario que solicita";
        let provinciaC = provincia.value;
        let cantonC = canton.value;
        let distritoC = distrito.value;
        console.log(tipoAsistencia, descripciones, coordenadas, usuario);

        registrarAsistencia(tipoAsistencia, descripciones, coordenadas, usuario, provinciaC, cantonC, distritoC);



    } else {

        Swal.fire({
            title: "La actualización no se ha podido realizar",
            text: "Verifique los campos resaltados en rojo o con mensajes de alerta y llene los campos correctamente",
            icon: "warning"
        });
    }
}

let validar = () => {
    let error = false;

    if (tipoSolAsistencia.value == '') {
        document.querySelector('#sltTipoDeSiniestroAsist').classList.add('inputError');
        error = true;

    } else {
        document.querySelector('#sltTipoDeSiniestroAsist').classList.remove('inputError');
    }

    return error;

};



botonModificar.addEventListener('click', enviarDatos);