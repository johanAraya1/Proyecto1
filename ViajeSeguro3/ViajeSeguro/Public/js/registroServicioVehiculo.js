'use strict';

// let listarTipoDeSiniestro = async() => {
//     let listaTipodesiniestro = [];

//     await axios({
//         method: 'get',
//         url: 'http://localhost:3000/api/listarTipoSiniestro',
//         responseType: 'json',
//     }).then((res) => {
//         listaTipodesiniestro = res.data.listaCategorias
//     }).catch((err) => {
//         console.log('No se pudo establecer la comunicación con el servidor, ocurrió el siguiente error: ', err)
//     });

//     return listaTipodesiniestro;
// };

let listarTipoDeVehiculos = async() => {
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

let registrarVehiculo = async(pTxtPlaca, pTxtMarca, pEstado, pTxtModelo, pNumAno, pTxtColor, pSltTipoVehiculo, pSltEstilo, pCorreoElectronicoPropietario, pFoto, pinputCaracterEspecial) => {

    await axios({
            method: 'post',
            url: 'http://localhost:3000/api/registrarVehiculo',
            responseType: 'json',
            data: {
                'placa': pTxtPlaca,
                'marca': pTxtMarca,
                'estado': pEstado,
                "modelo": pTxtModelo,
                "ano": pNumAno,
                "color": pTxtColor,
                "tipoDeVehiculo": pSltTipoVehiculo,
                "estilo": pSltEstilo,
                "correoElectronicoPropietario": pCorreoElectronicoPropietario,
                // "correoElectronicoEncargado1": pCorreoElectronicoEncargado1,
                // "correoElectronicoEncargado2": pCorreoElectronicoEncargado2,
                // "correoElectronicoEncargado3": pCorreoElectronicoEncargado3,
                // "correoElectronicoEncargado4": pCorreoElectronicoEncargado4,
                // "correoElectronicoEncargado5": pCorreoElectronicoEncargado5,
                "foto": pFoto,
                // "caracteristicas": [{ "caracteristica": pinputCaracterEspecial }]
                //     // "caracteristicas": pinputCaracterEspecial

            }
        }).then(function(res) {
            if (res.data.resultado == false) {
                switch (res.data.error.code) {
                    case 11000:
                        Swal.fire({
                            title: "No se pudo registrar el vehículo",
                            text: "Error: " + (res.data.error.code) + ". Ya existe",
                            icon: "error"
                        });
                        break;
                    default:
                        Swal.fire({
                            title: "No se pudo registrar el vehículo",
                            text: "Error: No se pudo establecer contacto con el servidor",
                            icon: "error"

                        });
                        break;
                };
            } else {
                Swal.fire({
                    title: 'Almacenado',
                    text: 'El vehículo se almacenó correctamente',
                    icon: 'success'
                }).then(() => {
                    limpiar();
                });

            }
        })
        .catch(function(error) {
            console.log(error);

        });
};

let listarVehiculos = async() => {
    let listaVehiculos = [];

    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listarVehiculos',
        responseType: 'json',
    }).then((res) => {
        listaVehiculos = res.data.listaVehiculos
    }).catch((err) => {
        console.log('No se pudo establecer la comunicación con el servidor, ocurrió el siguiente error: ', err)
    });

    return listaVehiculos;
};

let listarCaracteristica = async() => {
    let listaCaracteristica = [];
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listarCaracteristica',
        responseType: 'json',
    }).then((res) => {
        listaCaracteristica = res.data.listaCaracteristica
    }).catch((err) => {
        console.log('No se pudo establecer la comunicación con el servidor, ocurrió el siguiente error: ', err)
    });
    console.log(listaCaracteristica);
    return listaCaracteristica;

};

let registrarCaracteristicasEspeciales = async(p_id, pCaracteristicas) => {
    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/registrarCaracteristicasEspeciales',
        responseType: 'json',
        data: {
            '_id': p_id,
            'caracteristicas': pCaracteristicas
        }
    }).then((res) => {
        if (res.data.resultado == false) {
            console.log('No se pudieron agregar las caracteristicas especiales');
        } else {
            console.log('Las caracteristicas especiales se registraron exitosamente');
        }
    }).catch((err) => {
        console.log(err);
    });

};

let eliminarVehiculo = async(p_id) => {
    await axios({
        method: 'delete',
        url: 'http://localhost:3000/api/eliminarVehiculo',
        responseType: 'json',
        data: {
            '_id': p_id
        }
    }).then((res) => {
        if (res.data.resultado == false) {
            console.log('No se pudo eliminar el vehículo');
        } else {
            console.log('El vehículo se eliminó exitosamente');
            window.location.href = 'listarVehiculos.html'
        }
    }).catch((err) => {
        console.log(err);
    });
};

let deshabilitarVehiculo = async(p_id) => {
    await axios({
        method: 'put',
        url: 'http://localhost:3000/api/deshabilitarVehiculo',
        responseType: 'json',
        data: {
            '_id': p_id
        }
    }).then((res) => {
        if (res.data.resultado == false) {
            console.log('No se pudo deshabilitar el vehículo');
        } else {
            console.log('El vehículo se deshabilitó exitosamente');
            mostrarVehiculos();
            window.location.href = 'listarVehiculos.html'
        }
    }).catch((err) => {
        console.log(err);
    });
};

let habilitarVehiculo = async(p_id) => {
    await axios({
        method: 'put',
        url: 'http://localhost:3000/api/habilitarVehiculo',
        responseType: 'json',
        data: {
            '_id': p_id
        }
    }).then((res) => {
        if (res.data.resultado == false) {
            console.log('No se pudo habilitar el vehículo');
        } else {
            console.log('El vehículo se habilitó exitosamente');
            mostrarVehiculos();
            window.location.href = 'listarVehiculos.html'
        }
    }).catch((err) => {
        console.log(err);
    });
};

listarCaracteristica();