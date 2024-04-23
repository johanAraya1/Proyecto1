'use strict';

const botonRegistrar = document.querySelector('#btnRegistrar');
const tipoVehiculo = document.querySelector('#txtTipoVehiculo');
const descripcion = document.querySelector('#txtdescripcion');


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



let limpiar = () => {

    document.querySelector('tipoDevehiculo').reset();
};

let obtenerDatos = () => {

    let error = validar();


    if (!error) {
        let tipoVehiculo = document.querySelector('#txtTipoVehiculo').value;
        let inputDescripcion = document.querySelector('#txtdescripcion').value;
        let estado = 'activo'
        registrarTipoVehiculo(tipoVehiculo, inputDescripcion, estado);
        Swal.fire({
            title: 'Registrado',
            showConfirmButton: true,
            // timer: 7000,
            icon: "success"
        });
        window.location.href = 'listarTipoVehiculos.html'


    } else {
        switch (error) {
            case error:
                Swal.fire({
                    title: 'No se han podido enviar sus datos',
                    text: "Por favor debe llenar los espacios en blanco",
                    icon: "warning"
                });
                break;

        }

    }



};




botonRegistrar.addEventListener('click', obtenerDatos);