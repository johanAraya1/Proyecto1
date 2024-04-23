'use strict';
// let validarRepetidos = async(pRegistro) =>{
//     let listar = await listarCaracteristica();
//     let repetido = false;
//     for (let i = 0; i < listar.length; i++) {
//         if (pRegistro == listar[i].caracteristica) {
//             repetido = true;
//         }else{
//             repetido = false;
//         }
//         return repetido;
//     }
// }
let registrarCaracteristica = async(listaCaracteristicas) => {
    await axios({
            method: 'post',
            url: 'http://localhost:3000/api/registrarCaracteristica',
            responseType: 'json',
            data: {
                'caracteristica': listaCaracteristicas
            }
        }).then(function(res) {
            console.log(res);
        })
        .catch(function(err) {
            console.log(err);
        });
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
let inactivarCaracteristica = async(_id) => {
    await axios({
        method: 'put',
        url: 'http://localhost:3000/api/inactivar-caracteristica',
        responseType: 'json',
        data: {
            '_id': _id
        }
    }).then((res) => {
        if (res.data.resultado == true) {
            console.log(res.data)
        } else {
            console.log('No se pudo inactivar la caracteristica')
        }
    })
}
let activarCaracteristica = async(_id) => {
    await axios({
        method: 'put',
        url: 'http://localhost:3000/api/activar-caracteristica',
        responseType: 'json',
        data: {
            '_id': _id
        }
    }).then((res) => {
        if (res.data.resultado == true) {
            console.log(res.data)
        } else {
            console.log('No se pudo inactivar la Caracteristica')
        }
    })
}
let obtenerIdCaracteristica = async(id) => {
    let caracteristicaArray = [];
    await axios({
        method: 'get',
        params: { id: id },
        url: 'http://localhost:3000/api/buscar-caracteristica-objectid',
        responseType: 'json'
    }).then((res) => {
        caracteristicaArray = res.data.id;
        console.log(caracteristicaArray);
    }).catch((err) => {
        console.log(err);
    });
    return caracteristicaArray;
};
let modificarCaracteristica = async(espacioCaracteristica, objectIdCarac) => {
    await axios({
            method: 'put',
            url: 'http://localhost:3000/api/modificar-caracteristica',
            responseType: 'json',
            data: {
                '_id': objectIdCarac,
                'caracteristica': espacioCaracteristica
            }
        }).then(function(res) {
            console.log(res);
        })
        .catch(function(err) {
            console.log(err);
        });
};
let eliminarCaracteristica = async(_id) => {
    await axios({
        method: 'delete',
        url: 'http://localhost:3000/api/borrar-caracteristica',
        responseType: 'json',
        data: {
            '_id': _id
        }
    }).then((res) => {
        if (res.data.resultado === false) {
            console.log('No se pudo eliminar la persona');
        } else {
            console.log('La caracteristica fue eliminada correctamente');
        }
    }).catch((err) => {
        console.log(err);
    })
}
listarCaracteristica();