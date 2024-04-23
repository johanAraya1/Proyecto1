'use strict';



let registrarTipoDeSiniestro = async(pTipoDeSiniestro, pEstado, pIcono, pDescripcion) => {

    await axios({
            method: 'post',
            url: 'http://localhost:3000/api/registrarTipoSiniestro',
            responseType: 'json',
            data: {
                'tipoSiniestro': pTipoDeSiniestro,
                "estado": pEstado,
                "icono": pIcono,
                "descripcion": pDescripcion
            }
        }).then(function(res) {
            if (res.data.resultado == false) {
                switch (res.data.error.code) {
                    case 11000:
                        Swal.fire({
                            title: "No se pudo registrar la categoría",
                            text: "Error: " + (res.data.error.code) + ". La caregoría ya existe",
                            icon: "error"
                        });
                        break;
                    default:
                        Swal.fire({
                            title: "No se pudo registrar la categoría",
                            text: "Error: No se pudo establecer contacto con el servidor",
                            icon: "error"

                        });
                        break;
                };
            } else {
                Swal.fire({
                    title: 'Almacenado',
                    text: 'La categoría se almacenó correctamente',
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

let listarTipoDeSiniestro = async() => {
    let listaTipodesiniestro = [];

    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listarTipoSiniestro',
        responseType: 'json',
    }).then((res) => {
        listaTipodesiniestro = res.data.listaCategorias
    }).catch((err) => {
        console.log('No se pudo establecer la comunicación con el servidor, ocurrió el siguiente error: ', err)
    });

    return listaTipodesiniestro;
};

let deshabilitarTipoDeSiniestro = async(p_id) => {
    await axios({
        method: 'put',
        url: 'http://localhost:3000/api/deshabilitarTipoSiniestro',
        responseType: 'json',
        data: {
            '_id': p_id
        }
    }).then((res) => {
        if (res.data.resultado == false) {
            console.log('No se pudo deshabilitar la categoría de siniestro');
        } else {
            console.log('La categoría de siniestro se deshabilitó exitosamente');
            mostrarDatos();
        }
    }).catch((err) => {
        console.log(err);
    });
};

let habilitarTipoDeSiniestro = async(p_id) => {
    await axios({
        method: 'put',
        url: 'http://localhost:3000/api/habilitarTipoSiniestro',
        responseType: 'json',
        data: {
            '_id': p_id
        }
    }).then((res) => {
        if (res.data.resultado == false) {
            console.log('No se pudo habilitar la categoría de siniestro');
        } else {
            console.log('La categoría de siniestro se habilitó exitosamente');
            mostrarDatos();
        }
    }).catch((err) => {
        console.log(err);
    });
};

// let eliminarTipoDeSiniestro = async(p_id) => {
//     await axios({
//         method: 'delete',
//         url: 'http://localhost:3000/api/eliminarTipoSiniestro',
//         responseType: 'json',
//         data: {
//             '_id': p_id
//         }
//     }).then((res) => {
//         if (res.data.resultado == false) {
//             console.log('No se pudo eliminar la categoría');
//         } else {
//             console.log('La categoría se eliminó exitosamente');
//             mostrarDatos();
//         }
//     }).catch((err) => {
//         console.log(err);
//     });
// };

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

let modificarTipoDeSiniestro = async(pIdCategoria, pTipoDeSiniestro, pEstado, pIcono, pDescripcion) => {

    await axios({
        method: "put",
        url: "http://localhost:3000/api/modificar-categoria-incidente",
        responseType: "json",
        data: {
            "identificacion": pIdCategoria,
            "tipoSiniestro": pTipoDeSiniestro,
            "estado": pEstado,
            "icono": pIcono,
            "descripcion": pDescripcion
        }
    }).then((res) => {
        if (res.data.resultado == false) {
            Swal.fire({
                title: "No se pudo modificar la categoría",
                text: "Debido al error: " + res.data.error.code + " no se pudo modificar el tipo de incidente",
                icon: "error"
            });
        } else {
            Swal.fire({
                title: "La categoría se ha modificado correctamente!",
                text: "Los datos han sido actualizados adecuadamente.",
                icon: "success"
            }).then(() => {
                window.location.href = "listarCategoria.html";
            })
        }
    }).catch((error) => {
        console.log(error)
    });

};

let buscarCategoriaIncidente = async(pIncidente) => {
    try {
        const response = await axios({
            method: "get",
            params: { identificacion: pIncidente },
            url: "http://localhost:3000/api/buscar-incidente",
            responseType: "json"
        });
        return response.data.categoriaBuscada;
    } catch (error) {
        console.log(error);
    }
};