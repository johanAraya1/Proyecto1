'use strict';

let registrarAsistencias = async(ptipoAsistencia, descripciones, pcoordenadas, pusuario, provincia, canton, distrito) => {

    await axios({
            method: 'post',
            url: 'http://localhost:3000/api/registrarAsistencia',
            responseType: 'json',
            data: {
                'tipoAsistencia': ptipoAsistencia,
                'descripcionAsistencia': descripciones,
                'coordenadas': pcoordenadas,
                'usuarioSolicita': pusuario,
                'provincia': provincia,
                'canton': canton,
                'distrito': distrito
            }
        }).then(function(res) {
            if (res.data.resultado == false) {
                switch (res.data.err.code) {
                    case 11000:
                        console.log('Ya se registró una persona con esa identificación');
                        break;
                }
            }
        })
        .catch(function(err) {
            console.log(err);
        });
};

let listarAsistencias = async() => {
    let listaAsistencias = [];

    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar-personas',
        responseType: 'json',
    }).then((res) => {
        listaAsistencias = res.data.listaAsistencias
    }).catch((err) => {
        console.log('No se pudo establecer la comunicación con el servidor, ocurrió el siguiente error: ', err)
    });

    return listaAsistencias;
};

let buscarAsistenciaId = async(_id) => {
    try {
        let response = await axios({
            method: 'get',
            params: { _id: _id },
            url: 'http://localhost:3000/api/BuscarAsistenciaId',
            responseType: "json",



        })
        return response.data.solicitudDB

    } catch (error) {
        console.log(error);

    }


}

let modificarAsistencia = async(p_id, ptipoAsistencia, descripciones, pcoordenadas, pusuario, provincia, canton, distrito) => {

    await axios({
        method: 'put',
        url: 'http://localhost:3000/api/modificarAsistencia',
        responseType: 'json',
        //data= body
        data: {
            "_id": p_id,
            'tipoAsistencia': ptipoAsistencia,
            'descripcionAsistencia': descripciones,
            'coordenadas': pcoordenadas,
            'usuarioSolicita': pusuario,
            'provincia': provincia,
            'canton': canton,
            'distrito': distrito
        }

    }).then(function(res) {
        if (res.data.resultado == false) {
            switch (res.data.error.code) {
                case 11000:
                    Swal.fire({
                        title: "No se puede modificar esta Solicitud de asistencia",
                        text: "Error " + (res.data.error.code) + ": Este error significa que la información enviada coincide con la de una Solicitud de asistencia ya registrada",
                        icon: "error"
                    });
                    break;
                default:
                    Swal.fire({
                        title: "No se puede modificar esta Solicitud de asistencia",
                        text: "Error " + (res.data.error.code) + ": La Solicitud de asistencia no ha podido ser registrada.",
                        icon: "error"
                    });
                    break;
            };
        } else {

            Swal.fire({
                title: "La Solicitud de asistencia se ha modificado correctamente",
                text: "Registrada",
                icon: "success"
            }).then(() => {
                window.location.href = 'listarAsistenciasADM.html'
            });
        }
    }).catch(function(error) {
        console.log(error);
    });


};

/*let obtener_persona_id = async(identificacion) => {
    try {
        const response = await axios({
            method: 'get',
            params: { identificacion: identificacion },
            url: `http://localhost:3000/api/buscar-persona-identificacion`,
            responseType: 'json'
        });
        return response.data.persona;
    } catch (error) {
        console.log(error);
    }
};*/