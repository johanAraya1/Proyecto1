'use strict';


let registrarRuta = async(pnombre, pdescripcion, pcoordenadas, pusuarioSolicita, pestado) => {

    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/registrarRuta',
        responseType: 'json',
        //data= body
        data: {
            'nombre': pnombre,
            'descripcion': pdescripcion,
            'coordenadas': pcoordenadas,
            'usuarioSolicita': pusuarioSolicita,
            'estado': pestado

        }

    }).then(function(res) {
        if (res.data.resultado == false) {
            switch (res.data.error.code) {
                case 11000:
                    Swal.fire({
                        title: "No se puede registrar esta ruta",
                        text: "Error " + (res.data.error.code) + ": Este error significa que la información enviada coincide con una ruta ya registrada",
                        icon: "error"
                    });
                    break;
                default:
                    Swal.fire({
                        title: "No se puede registrar esta ruta",
                        text: "Error " + (res.data.error.code) + ": La ruta no ha podido ser registrado.",
                        icon: "error"
                    });
                    break;
            };
        } else {

            Swal.fire({
                title: "La solicitud de registro se ha realizado correctamente",
                icon: "success"
            }).then(() => {
                limpiar();
            });
        }
    }).catch(function(error) {
        console.log(error);
    });


};

let buscarRutas = async() => {
    let listaDeRutas = [];

    await axios({
            method: 'get',
            url: 'http://localhost:3000/api/listarRutas',
            responseType: 'json'

        }).then(function(res) {
            listaDeRutas = res.data.listaRutas;
        })
        .catch(function(error) {
            console.log(error);
        });

    return listaDeRutas;

};

let eliminarRuta = async(idRuta) => {
    await axios({
        method: "delete",
        url: "http://localhost:3000/api/eliminar-ruta",
        responseType: "json",
        data: {
            "identificacion": idRuta
        }
    }).then((res) => {
        if (res.data.resultado == false) {
            Swal.fire({
                title: "La ruta no ha podido ser eliminada",
                text: "Debido al error: " + res.data.error.code + " la ruta no se ha eliminado.",
                icon: "error"
            });
        } else {
            Swal.fire({
                title: "Ruta eliminada correctamente!",
                text: "La ruta seleccionada ha sido eliminada adecuadamente",
                icon: "success"
            }).then(() => {
                mostrarDatos();
            });
        }
    }).catch((error) => {
        console.log(error);
    });
};

let deshabilitarRuta = async(p_id) => {
    await axios({
        method: 'put',
        url: 'http://localhost:3000/api/deshabilitarRutas',
        responseType: 'json',
        data: {
            '_id': p_id
        }
    }).then((res) => {
        if (res.data.resultado == false) {
            console.log('No se pudo habilitar la ruta');
        } else {
            console.log('La ruta se habilitó exitosamente');
            mostrarDatos();
            // window.location.href = 'listarVehiculos.html'
        }
    }).catch((err) => {
        console.log(err);
    });
};

let habilitarRuta = async(p_id) => {
    await axios({
        method: 'put',
        url: 'http://localhost:3000/api/habilitarRutas',
        responseType: 'json',
        data: {
            '_id': p_id
        }
    }).then((res) => {
        if (res.data.resultado == false) {
            console.log('No se pudo habilitar la ruta');
        } else {
            console.log('La ruta se habilitó exitosamente');
            mostrarDatos();
            // window.location.href = 'listarVehiculos.html'
        }
    }).catch((err) => {
        console.log(err);
    });
};