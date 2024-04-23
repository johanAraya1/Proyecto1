'use strict';

const botonRegistrar = document.querySelector('#btnRegistrar');
const tipoDeUsuario = document.querySelector('#sltTipoUsuario');
const primerNombre = document.querySelector('#txtPrimerNombre');
const segundoNombre = document.querySelector('#txtSegundoNombre');
const primerApellido = document.querySelector('#txtPrimerApellido');
const segundoApellido = document.querySelector('#txtSegundoApellido');
const tipoDePersona = document.querySelector('#sltTipoPersona');
const tipoDeIdentificacion = document.querySelector('#sltTipoIdentificacion');
const numeroDeIdentificacion = document.querySelector('#txtIdentificacion');
const genero = document.querySelector('#genero');
const numeroDeTelefono = document.querySelector('#txtTelefono');
const correoElectronico = document.querySelector('#txtCorreo');
const password = document.querySelector('#txtPasswordUno');
const profesion = document.querySelector('#txtProfesion');
const confirmacionPassword = document.querySelector('#txtConfirmarPassword');
const img = document.querySelector('#foto');





let validar = () => {
    let error = false;
    let inputsRequeridos = document.querySelectorAll('[required]');
    let inputGenero = document.querySelector('input[type=radio]:checked');
    let inputPassword = document.querySelector('#txtPasswordUno').value;
    let confirmacionPassword = document.querySelector('#txtConfirmarPassword').value;
    let expresion = /\w+@\w+.+[a-z]/;
    for (let i = 0; i < inputsRequeridos.length; i++) {
        if (inputsRequeridos[i].value == '') {
            inputsRequeridos[i].classList.add('inputError');
            error = true;
        } else {
            inputsRequeridos[i].classList.remove('inputError');
        }
    }
    if (inputGenero < 1) {
        error = true;
        document.querySelector('#genero').classList.add('inputError');
    } else {
        document.querySelector('#genero').classList.remove('inputError');
    }

    if (inputPassword.value == '' && confirmacionPassword.value == '') {
        document.querySelector('#txtPasswordUno').classList.add('inputError');
        document.querySelector('#txtConfirmarPassword').classList.add('inputError');
        error = true;


    }



    return error;
};

let errorCedula = () => {
    let error1 = false;

    let inputTipoIdentificacion = document.querySelector('#sltTipoIdentificacion').value;
    let numeroIdentificacion = document.querySelector('#txtIdentificacion').value;


    if (inputTipoIdentificacion == 'nacional')
        if (numeroIdentificacion.length == 9 && numeroIdentificacion == parseInt(numeroIdentificacion)) {
            document.querySelector('#txtIdentificacion').classList.remove('inputError');
        } else {
            document.querySelector('#txtIdentificacion').classList.add('inputError');
            error1 = true;
        }

    if (inputTipoIdentificacion == 'residencia' || inputTipoIdentificacion == 'permiso')
        if (numeroIdentificacion.length == 12 && numeroIdentificacion == parseInt(numeroIdentificacion)) {
            document.querySelector('#txtIdentificacion').classList.remove('inputError');
        } else {
            document.querySelector('#txtIdentificacion').classList.add('inputError');
            error1 = true;
        }

    if (inputTipoIdentificacion == 'jurídica' || inputTipoIdentificacion == 'pasaporte') {
        error1 = false;
        document.querySelector('#txtIdentificacion').classList.remove('inputError');
    }


    return error1;

};

let errorCorreo = () => {
    let error2 = false;

    let expresion = /\w+@\w+.+[a-z]/;
    //let inputCorreo = document.querySelector('#txtCorreo').value;
    if (!expresion.test(correoElectronico.value)) {
        error2 = true;
        document.querySelector('#txtCorreo').classList.add('inputError');
    } else {
        document.querySelector('#txtCorreo').classList.remove('inputError');
    }


    return error2;
};

let largoPassword = () => {
    let error3 = false;
    let inputPassword = document.querySelector('#txtPasswordUno').value;
    let confirmacionPassword = document.querySelector('#txtConfirmarPassword').value;

    if (inputPassword.length >= 6 && inputPassword.length <= 8) {
        document.querySelector('#txtPasswordUno').classList.remove('inputError');
    } else {
        error3 = true;
        document.querySelector('#txtPasswordUno').classList.add('inputError');
    }
    if (confirmacionPassword.length >= 6 && confirmacionPassword.length <= 8) {
        document.querySelector('#txtConfirmarPassword').classList.remove('inputError');
    } else {
        error3 = true;
        document.querySelector('#txtConfirmarPassword').classList.add('inputError');

    }

    return error3;

}

let encontro = () => {
    let mayuscula = parametrosPassword();
    if (mayuscula == false) {
        document.querySelector("#aviso").innerHTML = '';
    } else {
        document.querySelector("#aviso").innerHTML = ("No hay mayúsculas");
    }

    let minusculas = minuscula();
    if (minusculas == false) {
        document.querySelector("#aviso2").innerHTML = '';
    } else {

        document.querySelector("#aviso2").innerHTML = ("No hay minúsculas");

    }

    let caracter = especial();
    if (caracter == false) {
        document.querySelector("#aviso3").innerHTML = '';
    } else {
        document.querySelector("#aviso3").innerHTML = ("No hay caracter especial");
    }

    let positivo = compararPassword();
    if (confirmacionPassword.value == '') {
        document.querySelector("#aviso4").innerHTML = '';



    } else {
        if (positivo == false) {
            document.querySelector("#aviso4").innerHTML = 'Concuerdan';
        } else {
            document.querySelector("#aviso4").innerHTML = ("No concuerdan");
        };

    };


}

let parametrosPassword = () => {
    let error4 = false;

    let expresionMayuscula = new RegExp('.*[A-Z]');

    if (!expresionMayuscula.test(password.value)) {
        error4 = true;
        document.querySelector('#txtPasswordUno').classList.add('inputError');

    } else {
        document.querySelector('#txtPasswordUno').classList.remove('inputError');
        error4 = false;

    }



    return error4;

};

let minuscula = () => {
    let error5 = false;
    let expresionMinuscula = new RegExp('.*[a-z]');

    if (!expresionMinuscula.test(password.value)) {
        error5 = true;
        document.querySelector('#txtPasswordUno').classList.add('inputError');

    } else {
        document.querySelector('#txtPasswordUno').classList.remove('inputError');
        error5 = false;

    }
    return error5;

}

let especial = () => {
    let error6 = false;
    let expresionEspecial = new RegExp('.*[!@#$%&*?¿¡|°]');

    if (!expresionEspecial.test(password.value)) {
        error6 = true;
        document.querySelector('#txtPasswordUno').classList.add('inputError');

    } else {
        document.querySelector('#txtPasswordUno').classList.remove('inputError');
        error6 = false;

    }
    return error6;
}

let compararPassword = () => {
    let error7 = false;

    if (password.value == '' && confirmacionPassword.value == '') {
        document.querySelector('#txtPasswordUno').classList.add('inputError');
        document.querySelector('#txtConfirmarPassword').classList.add('inputError');

    } else {
        if (password.value != confirmacionPassword.value) {
            document.querySelector('#txtPasswordUno').classList.add('inputError');
            document.querySelector('#txtConfirmarPassword').classList.add('inputError');
            error7 = true;
        } else {
            document.querySelector('#txtPasswordUno').classList.remove('inputError');
            document.querySelector('#txtConfirmarPassword').classList.remove('inputError');
        };
    };

    return error7;
};

let validarIdentificacion = () => {
    let error8 = false;

    if (tipoDeIdentificacion.value == 'Nacional' && tipoDePersona.value == 'Jurídica') {
        document.querySelector('#sltTipoPersona').classList.add('inputError');
        document.querySelector('#sltTipoIdentificacion').classList.add('inputError');
        error8 = true;

    } else if (tipoDeIdentificacion.value == 'DIMEX' && tipoDePersona.value == 'Jurídica') {
        document.querySelector('#sltTipoPersona').classList.add('inputError');
        document.querySelector('#sltTipoIdentificacion').classList.add('inputError');
        error8 = true;

    } else {
        document.querySelector('#sltTipoPersona').classList.remove('inputError');
        document.querySelector('#sltTipoIdentificacion').classList.remove('inputError');

    }

    // if (tipoDeIdentificacion.value == 'DIMEX' && tipoDePersona.value == 'Jurídica') {
    //     document.querySelector('#sltTipoPersona').classList.add('inputError');
    //     document.querySelector('#sltTipoIdentificacion').classList.add('inputError');
    //     error8 = true;

    // } else {
    //     document.querySelector('#sltTipoPersona').classList.remove('inputError');
    //     document.querySelector('#sltTipoIdentificacion').classList.remove('inputError');

    // }

    // if (tipoDeIdentificacion.value == 'Pasaporte' && tipoDePersona.value == 'Jurídica') {
    //     document.querySelector('#sltTipoPersona').classList.add('inputError');
    //     document.querySelector('#sltTipoIdentificacion').classList.add('inputError');
    //     error8 = true;

    // } else {
    //     document.querySelector('#sltTipoPersona').classList.remove('inputError');
    //     document.querySelector('#sltTipoIdentificacion').classList.remove('inputError');

    // }


    return error8;
};

let limpiar = () => {

    document.querySelector('#encargadoRutas').reset();
    //redireccionar();

};


let obtenerDatos = () => {
    let error = validar();
    let error1 = errorCedula();
    let error2 = errorCorreo();
    let error3 = largoPassword();
    let error4 = parametrosPassword();
    let error5 = minuscula();
    let error6 = especial();
    let error7 = compararPassword();
    let error8 = validarIdentificacion();

    //le mando los datos en el mismo orden  a como esta en el servicio
    if (!error && !error1 && !error2 && !error3 && !error4 && !error5 && !error6 && !error7 && !error8) {
        let inputTipoDeUsuario = document.querySelector('#sltTipoUsuario').value;
        let inputPrimerNombre = document.querySelector('#txtPrimerNombre').value;
        let inputSegundoNombre = document.querySelector('#txtSegundoNombre').value;
        let inputPrimerApellido = document.querySelector('#txtPrimerApellido').value;
        let inputSegundoApellido = document.querySelector('#txtSegundoApellido').value;
        let inputTipoDePersona = document.querySelector('#sltTipoPersona').value
        let inputTipoDeIdentificacion = document.querySelector('#sltTipoIdentificacion').value;
        let inputNumeroDeIdentificacion = document.querySelector('#txtIdentificacion').value;
        let inputGenero = document.querySelector('#genero input[type=radio]:checked').value;
        let inputNumeroDeTelefono = document.querySelector('#txtTelefono').value;
        let inputCorreoElectronico = document.querySelector('#txtCorreo').value;
        let inputPassword = document.querySelector('#txtPasswordUno').value;
        let inputProfesion = document.querySelector('#txtProfesion').value;
        let montoBase = '0'
        let tarifaPlataforma = '0'
        let cargosAdicionales = 'N/A'
            // let categorias = "N/A";
        let inputProvincia = 'N/A';
        let inputCanton = 'N/A';
        let inputDistrito = 'N/A';
        let estado = "desactivado";
        let img = document.querySelector('#foto').src;



        registrarUsuarios(inputCorreoElectronico, inputPassword, inputTipoDeUsuario, inputPrimerNombre, inputSegundoNombre, inputPrimerApellido, inputSegundoApellido, inputTipoDePersona, inputTipoDeIdentificacion,
            inputNumeroDeIdentificacion, inputGenero, inputNumeroDeTelefono, inputProfesion, montoBase, tarifaPlataforma, cargosAdicionales, inputProvincia, inputCanton, inputDistrito, estado, img);


    } else {
        switch (error || error1 || error2 || error3 || error4 || error5 || error6 || error7 || error8) {

            case error:
                Swal.fire({
                    title: 'No se han podido enviar sus datos',
                    text: "Por favor debe llenar los espacios en blanco",
                    icon: "warning"
                });
                break;


            case error1:
                Swal.fire({
                    title: 'No se han podido enviar sus datos',
                    text: "Por favor revise el formato de la cédula, debe ir sin guiones y con ceros",
                    icon: "warning"
                });
                break;

            case error2:
                Swal.fire({
                    title: 'No se han podido enviar sus datos',
                    text: "Por favor revise el formato del correo electrónico",
                    icon: "warning"
                });
                break;

            case error3:
                Swal.fire({
                    title: 'No se han podido enviar sus datos',
                    text: "La contraseña debe poseer entre 6 y 8 caracteres",
                    icon: "warning"
                });
                break;
            case error4:
                Swal.fire({
                    title: 'No se han podido enviar sus datos',
                    text: "La contraseña debe poseer al menos una mayuscula.",
                    icon: "warning"
                });
                break;
            case error5:
                Swal.fire({
                    title: 'No se han podido enviar sus datos',
                    text: "La contraseña debe poseer al menos una minúscula",
                    icon: "warning"
                });
                break;
            case error6:
                Swal.fire({
                    title: 'No se han podido enviar sus datos',
                    text: "La contraseña debe poseer al menos un caracter especial",
                    icon: "warning"
                });
                break;

            case error7:
                Swal.fire({
                    title: 'No se han podido enviar sus datos',
                    text: "Las contraseñas no coinciden",
                    icon: "warning"
                });
                break;
            case error8:
                Swal.fire({
                    title: 'No se han podido enviar sus datos',
                    text: "El tipo de identificación y tipo de persona no concuerdan",
                    icon: "warning"
                });
                break;
            default:
                Swal.fire({
                    title: 'No se han podido enviar sus datos',
                    text: "Favor revise los espacios resaltados",
                    icon: "warning"
                });
                break;
        }

    }


};



botonRegistrar.addEventListener('click', obtenerDatos);