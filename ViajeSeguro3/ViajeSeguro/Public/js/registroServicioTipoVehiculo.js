'use strict';

let listarTiposDeVehiculos = async() => {
    let tipoVehiculos = [];

    await axios({
            method: 'get',
            url: 'http://localhost:3000/api/listarTipoDeVehiculos',
            responseType: 'json'

        }).then(function(res) {
            tipoVehiculos = res.data.listaTipoVehiculos;
        })
        .catch(function(err) {
            console.log(err);
        });

    return tipoVehiculos;

};


let buscarTipoDeVehiculo = async(_id) => {
    try {
        const response = await axios({
            method: 'get',
            params: { _id: _id },
            url: 'http://localhost:3000/api/obtenerTipoVehiculo',
            responseType: 'json',

        })
        return response.data.tipoDeVehiculoDB
    } catch (error) {
        console.log(error);
    };
};



let eliminarTipoVehiculo = async(p_id) => {
    await axios({
        method: 'delete',
        url: 'http://localhost:3000/api/eliminarTipoVehiculo',
        responseType: 'json',
        data: {
            '_id': p_id
        }
    }).then((res) => {
        if (res.data.resultado == false) {
            console.log('No se pudo eliminar el tipo de vehículo');
        } else {
            console.log('El tipo de vehículo se eliminó exitosamente');
            window.location.href = 'listarTipoVehiculos.html'
        }
    }).catch((err) => {
        console.log(err);
    });
};

// Hay que convertirlo:


// let deshabilitarVehiculo = async(p_id) => {
//     await axios({
//         method: 'put',
//         url: 'http://localhost:3000/api/deshabilitarVehiculo',
//         responseType: 'json',
//         data: {
//             '_id': p_id
//         }
//     }).then((res) => {
//         if (res.data.resultado == false) {
//             console.log('No se pudo deshabilitar el vehículo');
//         } else {
//             console.log('El vehículo se deshabilitó exitosamente');
//             mostrarVehiculos();
//             window.location.href = 'listarVehiculos.html'
//         }
//     }).catch((err) => {
//         console.log(err);
//     });
// };

// let habilitarVehiculo = async(p_id) => {
//     await axios({
//         method: 'put',
//         url: 'http://localhost:3000/api/habilitarVehiculo',
//         responseType: 'json',
//         data: {
//             '_id': p_id
//         }
//     }).then((res) => {
//         if (res.data.resultado == false) {
//             console.log('No se pudo habilitar el vehículo');
//         } else {
//             console.log('El vehículo se habilitó exitosamente');
//             mostrarVehiculos();
//             window.location.href = 'listarVehiculos.html'
//         }
//     }).catch((err) => {
//         console.log(err);
//     });
// };