'use strict';

let listarAsistencias = async() => {
    let listaAsistencias = [];

    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listarAsistencia',
        responseType: 'json',
    }).then((res) => {
        listaAsistencias = res.data.listaAsistencia
    }).catch((err) => {
        console.log('No se pudo establecer la comunicación con el servidor, ocurrió el siguiente error: ', err)
    });

    return listaAsistencias;
};

let inactivarAsistencia = async(_id) => {
    await axios({
        method: 'put',
        url: 'http://localhost:3000/api/inactivar-asistencia',
        responseType: 'json',
        data: {
            '_id': _id
        }
    }).then((res) => {
        if (res.data.resultado == true) {
            console.log(res.data)

        } else {
            console.log('No se pudo inactivar la asistencia')
        }
    })
}

let activarAsistencia = async(_id) => {
    await axios({
        method: 'put',
        url: 'http://localhost:3000/api/activar-asistencia',
        responseType: 'json',
        data: {
            '_id': _id
        }
    }).then((res) => {
        if (res.data.resultado == true) {
            console.log(res.data)

        } else {
            console.log('No se pudo inactivar la asistencia')
        }
    })
}

let eliminarAsistencia = async(p_id) => {
    await axios({
        method: 'delete',
        url: 'http://localhost:3000/api/eliminarAsistencia',
        responseType: 'json',
        data: {
            '_id': p_id
        }
    }).then((res) => {
        if (res.data.resultado == false) {
            console.log('No se pudo eliminar la asistencia');
        } else {
            console.log('La asistencia se eliminó exitosamente');
            window.location.href = 'listarAsistenciasADM.html'
        }
    }).catch((err) => {
        console.log(err);
    });
};