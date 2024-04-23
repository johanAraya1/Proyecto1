'use strict';

// le tengo que mandar por parametros lo del postman

let registrarTipoVehiculo = async(tipoVehiculo, descripcion, estado) => {

    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/registrarTipoVehiculo',
        responseType: 'json',
        //data= body
        data: {
            "tipoDeVehiculo": tipoVehiculo,
            "descripcion": descripcion,
            "estado": estado

        }

    }).then(function(res) {
        if (res.data.resultado == false) {
            switch (res.data.error.code) {
                case 11000:
                    Swal.fire({
                        title: "No se puede registrar este usuario",
                        text: "Error " + (res.data.error.code) + ": Este error significa que la información enviada coincide con la de un tipo de vehículo ya registrado",
                        icon: "error"
                    });
                    break;
                default:
                    Swal.fire({
                        title: "No se puede registrar este usuario",
                        text: "Error " + (res.data.error.code) + ": El tipo de vehículo no ha podido ser registrado.",
                        icon: "error"
                    });
                    break;
            };
        } else {

            Swal.fire({
                title: "La solicitud de registro se ha enviado correctamente",
                text: "Verifique su correo electrónico y ejecute el enlace de confirmación para completar el registro de su cuenta. ",
                icon: "success"
            }).then(() => {
                limpiar();
            });
        }
    }).catch(function(error) {
        console.log(error);
    });


};

let modificarTipoVehiculo = async(tipoVehiculo, descripcion, estado) => {

    await axios({
        method: 'put',
        url: 'http://localhost:3000/api/modificarTipoVehiculo',
        responseType: 'json',
        //data= body
        data: {
            "tipoDeVehiculo": tipoVehiculo,
            "descripcion": descripcion,
            "estado": estado

        }

    }).then(function(res) {
        if (res.data.resultado == false) {
            switch (res.data.error.code) {
                case 11000:
                    Swal.fire({
                        title: "No se puede modificar este tipo de vehículo",
                        text: "Error " + (res.data.error.code) + ": Este error significa que la información enviada coincide con la de un tipo de vehículo ya registrado",
                        icon: "error"
                    });
                    break;
                default:
                    Swal.fire({
                        title: "No se puede modificar este tipo de vehículo",
                        text: "Error " + (res.data.error.code) + ": El tipo de vehículo no ha podido ser registrado.",
                        icon: "error"
                    });
                    break;
            };
        } else {

            Swal.fire({
                title: "La solicitud de registro se ha enviado correctamente",
                text: "Tipo de vehículo Registrado",
                icon: "success"
            }).then(() => {
                window.location.href = 'listarTipoVehiculos.html'
            });
        }
    }).catch(function(error) {
        console.log(error);
    });


};

let buscarTipoVehiculoId = async(_id) => {
    try {
        const response = await axios({
            method: 'get',
            params: { _id: _id },
            url: 'http://localhost:3000/api/obtenerTipoVehiculo',
            responseType: 'json'
        });
        return response.data.tipoDeVehiculoDB;

    } catch (err) {
        console.log(err);
    }

    // return tipoVehiculos;

}

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

let deshabilitarTipoDeVehiculos = async(p_id) => {
    await axios({
        method: 'put',
        url: 'http://localhost:3000/api/deshabilitarTipoVehiculo',
        responseType: 'json',
        data: {
            '_id': p_id
        }
    }).then((res) => {
        if (res.data.resultado == false) {
            console.log('No se pudo habilitar el tipo de vehículo');
        } else {
            console.log('Habilitado');
            window.location.href = 'listarTipoVehiculos.html';

        }
    }).catch((err) => {
        console.log(err);
    });
};

let habilitarTipoDeVehiculos = async(p_id) => {
    await axios({
        method: 'put',
        url: 'http://localhost:3000/api/habilitarTipoVehiculo',
        responseType: 'json',
        data: {
            '_id': p_id
        }
    }).then((res) => {
        if (res.data.resultado == false) {
            console.log('No se pudo habilitar el tipo de vehículo');
        } else {
            console.log('Habilitado');
            window.location.href = 'listarTipoVehiculos.html';

        }
    }).catch((err) => {
        console.log(err);
    });
};