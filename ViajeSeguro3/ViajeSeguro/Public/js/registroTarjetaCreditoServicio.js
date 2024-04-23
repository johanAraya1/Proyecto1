"use strict";

let registrarTarjetaCredito = async(pMetodoDePago, pNumeroTarjeta, pEntidadFinanciera, pFechaDeExpiracion, pCodigoSeguridad, pNombreEnTarjeta, pPropietarioDeTarjeta, pEstado) => {
    await axios({
        method: "post",
        url: "http://localhost:3000/api/registrar-tarjeta-credito",
        responseType: "json",
        data: {
            "formaDePago": pMetodoDePago,
            "numeroDeTarjeta": pNumeroTarjeta,
            "entidadFinanciera": pEntidadFinanciera,
            "fechaDeExpiracion": pFechaDeExpiracion,
            "codigoDeSeguridad": pCodigoSeguridad,
            "nombreEnTarjeta": pNombreEnTarjeta,
            "propietarioDeTarjeta": pPropietarioDeTarjeta,
            "estado": pEstado
        }
    }).then(function(res) {
        if (res.data.resultado == false) {
            switch (res.data.error.code) {
                case 11000:
                    Swal.fire({
                        title: "Esta tarjeta no se puede registrar",
                        text: "La tarjeta que ha intentado registrar ya se encuentra activa en el sistema",
                        icon: "error"
                    });
                default:
                    Swal.fire({
                        title: "No se puede registrar esta tarjeta",
                        text: "La tarjeta no ha podido ser registrada en el sistema",
                        icon: "error"
                    });
            }
        } else {
            Swal.fire({
                title: "Tarjeta registrada correctamente!",
                text: "Ahora puede usar esta tarjeta para realizar sus pagos en cualquier momento.",
                icon: "success"
            }).then(() => {
                limpiarFormulario();
                window.location.href = "listarTarjetasCredito.html";
            });
        }
    }).catch(function(error) {
        console.log(error);
    });
};

let listaTarjetasBD = async() => {
    let listaTarjetasCredito = [];

    await axios({
        method: "get",
        url: "http://localhost:3000/api/listar-tarjetas-credito",
        responseType: "json",
    }).then((res) => {
        listaTarjetasCredito = res.data.listaTarjetasDeCredito
    }).catch((error) => {
        console.log("No se pudo establecer comunicación con el servidor debido al siguiente error: ", error)
    });
    return listaTarjetasCredito;
};

let tarjetasUsuario = async(propietarioDeTarjeta) => {
    try {
        const response = await axios({
            method: "get",
            params: { propietarioDeTarjeta: propietarioDeTarjeta },
            url: "http://localhost:3000/api/buscar-tarjetas-usuario",
            responseType: "json"
        });
        return response.data.tarjetasDeCredito;
    } catch (error) {
        console.log(error)
    }
}

let modificarTarjetaCredito = async(pIdTarjetaCredito, pNumeroTarjeta, pEntidadFinanciera, pFechaDeVencimiento, pCodigoDeSeguridad, pNombreEnTarjeta) => {
    await axios({
        method: "put",
        url: "http://localhost:3000/api/modificar-tarjeta-credito",
        responseType: "json",
        data: {
            "idTarjetaCredito": pIdTarjetaCredito,
            "numeroDeTarjeta": pNumeroTarjeta,
            "entidadFinanciera": pEntidadFinanciera,
            "fechaDeExpiracion": pFechaDeVencimiento,
            "codigoDeSeguridad": pCodigoDeSeguridad,
            "nombreEnTarjeta": pNombreEnTarjeta
        }
    }).then((res) => {
        if (res.data.success == false) {
            Swal.fire({
                title: "Los cambios no se han efectuado",
                text: "La tarjeta no se ha podido modificar por el siguiente error: " + res.data.error.code,
                icon: "error"
            });
        } else {
            Swal.fire({
                title: "La tarjeta se ha modificado correctamente",
                text: "Los datos de la tarjeta se han actualizado adecuadamente.",
                icon: "success"
            }).then(() => {
                window.location.href = "listarTarjetasCredito.html";
            });
        }
    }).catch((err) => {
        console.log(err);
    });
}

let buscarTarjetaUsuario = async(idTarjetaCredito) => {

    try {
        const response = await axios({
            method: "get",
            params: { idTarjetaCredito: idTarjetaCredito },
            url: "http://localhost:3000/api/obtener-tarjeta-usuario",
            responseType: "json"
        });
        return response.data.tarjetaCreditoDB;

    } catch (error) {
        console.log(error);
    }
}

let eliminarTarjetaUsuario = async(idTarjetaCredito) => {
    await axios({
        method: "delete",
        url: "http://localhost:3000/api/eliminar-tarjeta-credito",
        responseType: "json",
        data: {
            "idTarjetaCredito": idTarjetaCredito
        }
    }).then((res) => {
        if (res.data.resultado == false) {
            console.log("No se ha logrado eliminar la tarjeta de credito");
        } else {
            console.log("La tarjeta se ha eliminado correctamente");
            mostrarDatos();
        }
    }).catch((err) => {
        console.log(err);
    });
};

let desactivarTarjetaCredito = async(idTarjetaCredito) => {
    await axios({
        method: "put",
        url: "http://localhost:3000/api/deshabilitar-tarjeta-credito",
        responseType: "json",
        data: {
            "idTarjetaCredito": idTarjetaCredito
        }
    }).then((res) => {
        if (res.data.resultado == false) {
            console.log("No se ha logrado desactivar la tarjeta de credito");
        } else {
            console.log("La tarjeta se ha desactivado correctamente");
            mostrarDatos();
        }
    }).catch((err) => {
        console.log(err);
    });
};

let activarTarjetaCredito = async(idTarjetaCredito) => {
    await axios({
        method: "put",
        url: "http://localhost:3000/api/habilitar-tarjeta-credito",
        responseType: "json",
        data: {
            "idTarjetaCredito": idTarjetaCredito
        }
    }).then((res) => {
        if (res.data.resultado == false) {
            console.log("No se ha logrado activar la tarjeta de credito");
        } else {
            console.log("La tarjeta ha sido activada correctamente");
            mostrarDatos();
        }
    }).catch((err) => {
        console.log(err);
    });
};