2
    'use strict';
let caracteristica;
let objectId = localStorage.getItem('objectIdCaracteristica');
const inputCaracteristica = document.querySelector('#txtCaracteristica');
const botonGuardar = document.querySelector('#btnGuardar');
let llenarFormulario = async() => {
    caracteristica = await obtenerIdCaracteristica(objectId);
    for (let i = 0; i < caracteristica.length; i++) {
        if (caracteristica[i]._id == objectId) {
            inputCaracteristica.value = caracteristica[i].caracteristica;
            console.log(caracteristica);
        }
    }
}
llenarFormulario();
let obtenerDatosCaracteristica = () => {
    let objectIdCarac = localStorage.getItem('objectIdCaracteristica');
    let espacioCaracteristica = inputCaracteristica.value;
    modificarCaracteristica(espacioCaracteristica, objectIdCarac);
    console.log(espacioCaracteristica);
}
botonGuardar.addEventListener('click', () => {
    Swal.fire({
        title: 'Esta seguro que desea modificar la caracteristica?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#4CAF50',
        cancelButtonColor: '#EB4848',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.value) {
            Swal.fire(
                'Listo!',
                'La caracteristica ha sido modificada',
                'success'
            )
            obtenerDatosCaracteristica();
            setTimeout(function() {
                window.location.href = 'listarcaracteristicas.html';
            }, 1000);
        }
    })
});