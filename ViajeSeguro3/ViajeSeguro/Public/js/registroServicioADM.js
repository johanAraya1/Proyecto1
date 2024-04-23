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

let registrarSiniestro = async(pSltTipoDeSiniestro, pTxtDescripcion, pEstado, pTxtProvincia, pTxtCanton, pTxtDistrito, pTxtSenas, pLatSiniestro, tLongSiniestro, pUsuarioReporta, pFoto) => {

    await axios({
            method: 'post',
            url: 'http://localhost:3000/api/registrarSiniestro',
            responseType: 'json',
            data: {
                'categoria': pSltTipoDeSiniestro,
                'descripcionSiniestro': pTxtDescripcion,
                'estado': pEstado,
                "provincia": pTxtProvincia,
                "canton": pTxtCanton,
                "distrito": pTxtDistrito,
                "senas": pTxtSenas,
                "latSiniestro": pLatSiniestro,
                "longSiniestro": tLongSiniestro,
                "usuarioReporta": pUsuarioReporta,
                "foto": pFoto

            }
        }).then(function(res) {
            if (res.data.resultado == false) {
                // switch (res.data.error.code) {
                //     case 11000:
                //         Swal.fire({
                //             title: "No se pudo registrar el siniestro",
                //             text: "Error: " + (res.data.error.code) + ". Ya existe",
                //             icon: "error"
                //         });
                //         break;
                //     default:
                Swal.fire({
                    title: "No se pudo registrar el siniestro",
                    text: "Error: No se pudo establecer contacto con el servidor",
                    icon: "error"

                });
                //         break;
                // };
            } else {
                Swal.fire({
                    title: 'Almacenado',
                    text: 'El siniestro ha sido reportado correctamente',
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

let listarSiniestros = async() => {
    let listaSiniestros = [];

    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listarSiniestros',
        responseType: 'json',
    }).then((res) => {
        listaSiniestros = res.data.listaSiniestros
    }).catch((err) => {
        console.log('No se pudo establecer la comunicación con el servidor, ocurrió el siguiente error: ', err)
    });

    return listaSiniestros;
};
let eliminarTipoDeSiniestro = async(p_id) => {
    await axios({
        method: 'delete',
        url: 'http://localhost:3000/api/eliminarTipoDeSiniestro',
        responseType: 'json',
        data: {
            '_id': p_id
        }
    }).then((res) => {
        if (res.data.resultado == false) {
            console.log('No se pudo eliminar el siniestro');
        } else {
            console.log('El siniestro se eliminó exitosamente');
            window.location.href = 'reporteDeSiniestros.html'
        }
    }).catch((err) => {
        console.log(err);
    });
};