"use strict"

const inputTarjetaCredito = document.querySelector("#numeroTarjeta");
const propietarioTarjeta = document.querySelector("#cardHolder");
const codigoDeSeguridad = document.querySelector("#securityCode");
const visaCard = new RegExp("^[4][0-9]*$");
const masterCard = new RegExp("^(51|52|53|54|55)[0-9]*$");
const amexCard = new RegExp("^(34|37)[0-9]*$");
const formatoTarjeta = new RegExp("^[0-9]{16}$");
const formatoMesVencimiento = new RegExp("^[0-9][0-2]*$");
const formatoAnnoVencimiento = new RegExp("^[0-9]{2}$");
const formatoCodigoSeguridad = new RegExp("^[0-9]+$");
const formatoTarjetahabiente = new RegExp("^[a-z\\sA-Z]{2,40}$");
const mesVencimiento = document.querySelector("#mesExpiracion");
const annoVencimiento = document.querySelector("#annoExpiracion");
const recopilarDatos = document.querySelector("#registrarTarjeta");
const formaDePago = document.querySelector("#metodoPago");
let idPropietarioTarjeta = localStorage.getItem("usuarioID");
let idTarjetaCredito = localStorage.getItem("idTarjetaCredito");
let tarjetaCreditoUsuario;


let traerDatosTarjeta = async() => {
    tarjetaCreditoUsuario = await buscarTarjetaUsuario(idTarjetaCredito);
    inputTarjetaCredito.value = tarjetaCreditoUsuario["numeroDeTarjeta"];
    propietarioTarjeta.value = tarjetaCreditoUsuario.nombreEnTarjeta;


};

let validarEntidadFinanciera = () => {
    let entidadTarjeta = "";

    if (inputTarjetaCredito.value != "" && inputTarjetaCredito.value != "5" && inputTarjetaCredito.value != "3") {
        if (visaCard.test(inputTarjetaCredito.value) == true) {
            entidadTarjeta = "VISA";
            document.querySelector("#entidadFinanciera").innerHTML = "VISA";
        } else {
            document.querySelector("#entidadFinanciera").innerHTML = "";
        }
        if (masterCard.test(inputTarjetaCredito.value) == true) {
            entidadTarjeta = "MASTERCARD";
            document.querySelector("#entidadFinanciera2").innerHTML = "MASTERCARD";
        } else {
            document.querySelector("#entidadFinanciera2").innerHTML = "";
        }

        if (amexCard.test(inputTarjetaCredito.value) == true) {
            entidadTarjeta = "AMERICAN EXPRESS";
            document.querySelector("#entidadFinanciera3").innerHTML = "AMERICAN EXPRESS";
        } else {
            document.querySelector("#entidadFinanciera3").innerHTML = ""
        }
        if (entidadTarjeta == "") {
            document.querySelector("#tarjetaValida").innerHTML = "Tarjeta no aceptable";
            inputTarjetaCredito.classList.add("errorDeInput");
        } else {
            document.querySelector("#tarjetaValida").innerHTML = "";
            inputTarjetaCredito.classList.remove("errorDeInput");
        }
    } else {
        document.querySelector("#entidadFinanciera").innerHTML = "";
        document.querySelector("#entidadFinanciera2").innerHTML = "";
        document.querySelector("#entidadFinanciera3").innerHTML = "";
        document.querySelector("#tarjetaValida").innerHTML = "";
        inputTarjetaCredito.classList.remove("errorDeInput");
    }


    return entidadTarjeta;

}

let validarFormatoTarjeta = () => {
    let entidadFinanciera = validarEntidadFinanciera();
    let error = false;

    if (inputTarjetaCredito.value != "" && inputTarjetaCredito.value.length > 14) {

        if (inputTarjetaCredito.value.length == 15 && entidadFinanciera != "AMERICAN EXPRESS") {
            error = true;
            inputTarjetaCredito.classList.add("errorDeInput");
            document.querySelector("#formatoCorrecto").innerHTML = "Formato Incorrecto";

        } else {
            inputTarjetaCredito.classList.remove("errorDeInput");
            document.querySelector("#formatoCorrecto").innerHTML = "";
        }

        if (entidadFinanciera == "AMERICAN EXPRESS") {
            if (inputTarjetaCredito.value.length != 15) {
                error = true;
                inputTarjetaCredito.classList.add("errorDeInput");
                document.querySelector("#formatoCorrecto").innerHTML = "Formato incorrecto, no poner espacios, solo ingresar números y no más ni menos de 15 digitos";
            } else {

                document.querySelector("#formatoCorrecto").innerHTML = "";
            }
        }
        if (inputTarjetaCredito.value.length > 15 && entidadFinanciera == "VISA" || inputTarjetaCredito.value.length > 15 && entidadFinanciera == "MASTERCARD") {
            if (!formatoTarjeta.test(inputTarjetaCredito.value)) {
                error = true
                inputTarjetaCredito.classList.add("errorDeInput");
                document.querySelector("#formatoCorrecto").innerHTML = "Formato incorrecto, no poner espacios, solo ingresar números y no más ni menos de 16 digitos";
            } else {
                inputTarjetaCredito.classList.remove("errorDeInput");
                document.querySelector("#formatoCorrecto").innerHTML = "";
            }
        }
    }
    if (entidadFinanciera == "") {
        error = true
    }


    if (inputTarjetaCredito.value.length < 15 || entidadFinanciera == "" || inputTarjetaCredito.value.length > 16) {
        error = true;
        inputTarjetaCredito.classList.add("errorDeInput");
    }


    return error;
}

let nextFieldNumeroTarjeta = () => {

    validarFormatoTarjeta()
    let entidadValida = validarEntidadFinanciera();

    if (entidadValida == "AMERICAN EXPRESS" && inputTarjetaCredito.value.length == 15 || entidadValida != "" && inputTarjetaCredito.value.length >= inputTarjetaCredito.maxLength) {
        mesVencimiento.focus();
    }

}

let nextFieldMesVencimiento = () => {
    let error = false;

    if (mesVencimiento.value > "9" && mesVencimiento.value < "13") {
        annoVencimiento.focus();
    }
    if (mesVencimiento.value >= "2" && mesVencimiento.value <= "9") {
        annoVencimiento.focus();
        mesVencimiento.value = "0" + mesVencimiento.value;

    }

    if (mesVencimiento.value > "12" || mesVencimiento.value == "00" || mesVencimiento.value == "0") {
        error = true;
        mesVencimiento.classList.add("errorDeInput");

    } else {
        mesVencimiento.classList.remove("errorDeInput");
    }


    if (!error && mesVencimiento.value.length >= mesVencimiento.maxLength && mesVencimiento.value <= "12") {
        annoVencimiento.focus();
    }

}

let validarMesVencimiento = () => {
    let error = false;


    if (mesVencimiento.value > "12" || mesVencimiento.value == "00" || mesVencimiento.value == "0") {
        error = true;
        mesVencimiento.classList.add("errorDeInput");

    } else {
        mesVencimiento.classList.remove("errorDeInput");
    }

    if (mesVencimiento.value == "1") {
        mesVencimiento.value = 0 + mesVencimiento.value;
    }

    return error;
}

let nextFieldAnnoVencimiento = () => {
    let error = false;

    if (mesVencimiento.value == "1") {
        mesVencimiento.value = "0" + mesVencimiento.value;
    }
    if (annoVencimiento.value.length != "") {

        if (!formatoAnnoVencimiento.test(annoVencimiento.value)) {
            error = true;
            annoVencimiento.classList.add("errorDeInput");
        } else {
            annoVencimiento.classList.remove("errorDeInput");
        }
    } else {
        annoVencimiento.classList.remove("errorDeInput");
    }

    if (annoVencimiento.value.length >= annoVencimiento.maxLength && !error) {
        codigoDeSeguridad.focus();
    }

}

let validarAnnoVencimiento = () => {
    let error = false;

    if (mesVencimiento.value == "1") {
        mesVencimiento.value = "0" + mesVencimiento.value;
    }

    if (annoVencimiento.value.length != "") {

        if (!formatoAnnoVencimiento.test(annoVencimiento.value)) {
            error = true;
            annoVencimiento.classList.add("errorDeInput");
        } else {
            annoVencimiento.classList.remove("errorDeInput");
        }
    } else {
        annoVencimiento.classList.remove("errorDeInput");
    }

    return error;
}

let validarCodigoSeguridad = () => {
    let error = false;
    let entidadFinanciera = validarEntidadFinanciera();

    if (entidadFinanciera == "") {
        document.querySelector("#estadoCodigoSeguridad").innerHTML = "Por favor, ingrese primero un número de tarjeta valido."
    } else {
        document.querySelector("#estadoCodigoSeguridad").innerHTML = "";
    }

    if (entidadFinanciera == "AMERICAN EXPRESS" && codigoDeSeguridad.value.length != 4) {
        error = true;
        codigoDeSeguridad.classList.add("errorDeInput");
    } else {
        codigoDeSeguridad.classList.remove("errorDeInput");
    }

    if (entidadFinanciera == "AMERICAN EXPRESS" && codigoDeSeguridad.value.length == 4) {
        if (!formatoCodigoSeguridad.test(codigoDeSeguridad.value)) {
            error = true;
            codigoDeSeguridad.classList.add("errorDeInput");
        } else {
            codigoDeSeguridad.classList.remove("errorDeInput");

        }
    }


    if (entidadFinanciera != "AMERICAN EXPRESS" && entidadFinanciera != "" && codigoDeSeguridad.value.length == 3) {
        if (!formatoCodigoSeguridad.test(codigoDeSeguridad.value)) {
            error = true;
            codigoDeSeguridad.classList.add("errorDeInput");
        } else {
            codigoDeSeguridad.classList.remove("errorDeInput");

        }
    }

    if (codigoDeSeguridad.value != "" && codigoDeSeguridad.value.length < 3) {
        error = true;
        codigoDeSeguridad.classList.add("errorDeInput");
    } else {
        codigoDeSeguridad.classList.remove("errorDeInput");
    }

    if (entidadFinanciera != "AMERICAN EXPRESS" && codigoDeSeguridad.value.length > 3) {
        error = true;
        codigoDeSeguridad.classList.add("errorDeInput");
    } else {
        codigoDeSeguridad.classList.remove("errorDeInput");
    }

    return error;
}

let nextFieldCodigoSeguridad = () => {

    let entidadFinanciera = validarEntidadFinanciera();

    if (entidadFinanciera == "") {
        document.querySelector("#estadoCodigoSeguridad").innerHTML = "Por favor, ingrese primero un número de tarjeta valido."
    } else {
        document.querySelector("#estadoCodigoSeguridad").innerHTML = "";
    }

    if (entidadFinanciera == "AMERICAN EXPRESS" && codigoDeSeguridad.value.length != 4) {

        codigoDeSeguridad.classList.add("errorDeInput");
    } else {
        codigoDeSeguridad.classList.remove("errorDeInput");
    }

    if (entidadFinanciera == "AMERICAN EXPRESS" && codigoDeSeguridad.value.length == 4) {
        if (!formatoCodigoSeguridad.test(codigoDeSeguridad.value)) {

            codigoDeSeguridad.classList.add("errorDeInput");
        } else {
            codigoDeSeguridad.classList.remove("errorDeInput");
            propietarioTarjeta.focus();
        }
    }


    if (entidadFinanciera != "AMERICAN EXPRESS" && entidadFinanciera != "" && codigoDeSeguridad.value.length == 3) {
        if (!formatoCodigoSeguridad.test(codigoDeSeguridad.value)) {

            codigoDeSeguridad.classList.add("errorDeInput");
        } else {
            codigoDeSeguridad.classList.remove("errorDeInput");
            propietarioTarjeta.focus();
        }
    }

}

let validarTarjetahabiente = () => {
    let error = false;
    if (propietarioTarjeta.value != "") {
        if (!formatoTarjetahabiente.test(propietarioTarjeta.value)) {
            error = true;
            propietarioTarjeta.classList.add("errorDeInput");
        } else {
            propietarioTarjeta.classList.remove("errorDeInput");
        }
    } else {
        propietarioTarjeta.classList.remove("errorDeInput");
    }
    return error;
}

let validarFechaExpiracion = () => {
    let error = false;

    if (mesVencimiento.value == "00" || mesVencimiento.value > 12 || mesVencimiento.value == "0") {
        error = true
        mesVencimiento.classList.add("errorDeInput");
    } else {
        mesVencimiento.classList.remove("errorDeInput");
    }

    if (!error) {
        let mesExp = mesVencimiento.value - 1;
        let annoExp = 20 + annoVencimiento.value;
        let fechaActual = new Date();
        let fechaDeVencimiento = new Date();
        fechaDeVencimiento.setFullYear(annoExp, mesExp, 1);

        if (fechaDeVencimiento < fechaActual) {
            error = true;
        }
    }
    return error;
}

let validarFormulario = () => {

    let error = false;
    let formatoTarjetaInvalido = validarFormatoTarjeta();
    let mesExpiracionInvalido = validarMesVencimiento();
    let annoExpiracionInvalido = validarAnnoVencimiento();
    let codigoSeguridadInvalido = validarCodigoSeguridad();
    let tarjetahabienteInvalido = validarTarjetahabiente();
    let fechaExpiracionInvalida = validarFechaExpiracion();
    let elementosRequeridos = document.querySelectorAll("#formularioTarjeta [required]");

    for (let i = 0; i < elementosRequeridos.length; i++) {
        if (elementosRequeridos[i].value == "") {
            error = true;
            elementosRequeridos[i].classList.add("errorDeInput");
        } else {
            elementosRequeridos[i].classList.remove("errorDeInput");
        }

    }

    if (formatoTarjetaInvalido == true || mesExpiracionInvalido == true || annoExpiracionInvalido == true || codigoSeguridadInvalido == true || tarjetahabienteInvalido == true || fechaExpiracionInvalida == true) {
        if (mesExpiracionInvalido == true) {
            mesVencimiento.classList.add("errorDeInput");
        } else {
            mesVencimiento.classList.remove("errorDeInput");
        }

        if (annoExpiracionInvalido == true) {
            mesVencimiento.classList.add("errorDeInput");
        } else {
            annoVencimiento.classList.remove("errorDeInput");
        }

        if (formatoTarjetaInvalido == true) {
            inputTarjetaCredito.classList.add("errorDeInput");
        } else {
            inputTarjetaCredito.classList.remove("errorDeInput");
        }
        if (codigoSeguridadInvalido == true) {
            codigoDeSeguridad.classList.add("errorDeInput");
        } else {
            codigoDeSeguridad.classList.remove("errorDeInput");
        }
        if (tarjetahabienteInvalido == true) {
            propietarioTarjeta.classList.add("errorDeInput");
        } else {
            propietarioTarjeta.classList.remove("errorDeInput");
        }
        if (fechaExpiracionInvalida == true) {
            mesVencimiento.classList.add("errorDeInput");
            annoVencimiento.classList.add("errorDeInput");
            document.querySelector("#estadoExpiracion2").innerHTML = "Tarjeta expirada o fecha de caducidad invalida";
        } else {
            mesVencimiento.classList.remove("errorDeInput");
            annoVencimiento.classList.remove("errorDeInput");
            document.querySelector("#estadoExpiracion2").innerHTML = "";
        }
        error = true;
    }

    return error;
}

let enviarDatos = () => {
    let errorEnFormulario = validarFormulario();
    if (!errorEnFormulario) {
        let mesExp = mesVencimiento.value - 1;
        let annoExp = 20 + annoVencimiento.value;
        let fechaDeVencimiento = new Date();
        fechaDeVencimiento.setFullYear(annoExp, mesExp, 1);

        let numeroTarjeta = inputTarjetaCredito.value;
        let nombreEnTarjeta = propietarioTarjeta.value.toUpperCase();
        let entidadFinanciera = validarEntidadFinanciera();
        fechaDeVencimiento.setFullYear(20 + annoVencimiento.value, mesVencimiento.value - 1, 1);
        let codigoSeguridad = codigoDeSeguridad.value;
        //idTarjetaCredito=tarjetaCreditoUsuario._id

        modificarTarjetaCredito(idTarjetaCredito, numeroTarjeta, entidadFinanciera, fechaDeVencimiento, codigoSeguridad, nombreEnTarjeta);

    } else {
        Swal.fire({
            title: "La actualización no se ha podido realizar",
            text: "Verifique los campos resaltados en rojo o con mensajes de alerta y llene los campos correctamente",
            icon: "warning"
        });
    }
}

let limpiarFormulario = () => {
    document.querySelector("#formularioTarjeta").reset();
}

traerDatosTarjeta();

recopilarDatos.addEventListener("click", enviarDatos);
propietarioTarjeta.addEventListener("input", validarTarjetahabiente);
codigoDeSeguridad.addEventListener("input", nextFieldCodigoSeguridad);
annoVencimiento.addEventListener("input", nextFieldAnnoVencimiento);
mesVencimiento.addEventListener("input", nextFieldMesVencimiento);
inputTarjetaCredito.addEventListener("input", nextFieldNumeroTarjeta);