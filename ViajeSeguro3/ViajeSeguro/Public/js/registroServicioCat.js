'use strict';

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