"use strict"


const botonModificar = document.querySelector('#btnModificar');
const tipoVehiculo = document.querySelector('#txtTipoVehiculo');
const descripcion = document.querySelector('#txtdescripcion');

let tipoDeVehiculoId = localStorage.getItem('_id');


console.log(tipoDeVehiculoId)

let traerTipoVehiculo = async() => {

    let tipoDeVehiculo = await buscarTipoDeVehiculo(tipoDeVehiculoId);

    tipoVehiculo.value = tipoDeVehiculo.tipoDeVehiculo;
    descripcion.value = tipoDeVehiculo.descripcion;


    console.log(tipoDeVehiculo)



};

traerTipoVehiculo();

let limpiar = () => {

    document.querySelector('tipoDevehiculo').reset();
};

let enviarDatos = () => {
    let errorEnFormulario = validar();
    if (!errorEnFormulario) {

        let tipoVehiculo = document.querySelector('#txtTipoVehiculo').value;
        let inputDescripcion = document.querySelector('#txtdescripcion').value;

        modificarTipoVehiculo(tipoVehiculo, inputDescripcion);

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

    if (tipoVehiculo.value == '') {
        document.querySelector('#txtTipoVehiculo').classList.add('inputError');
        error = true;

    } else {
        document.querySelector('#txtTipoVehiculo').classList.remove('inputError');
    }

    return error;

};

// let obtenerDatos = () => {

//     let error = validar();


//     if (!error) {
//         let tipoVehiculo = document.querySelector('#txtTipoVehiculo').value;
//         let inputDescripcion = document.querySelector('#txtdescripcion').value;

//         registrarTipoVehiculo(tipoVehiculo, inputDescripcion);


//     } else {
//         switch (error) {
//             case error:
//                 Swal.fire({
//                     title: 'No se han podido enviar sus datos',
//                     text: "Por favor debe llenar los espacios en blanco",
//                     icon: "warning"
//                 });
//                 break;

//         }

//     }


// };




botonModificar.addEventListener('click', enviarDatos);