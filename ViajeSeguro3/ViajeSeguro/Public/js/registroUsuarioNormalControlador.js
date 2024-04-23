"use strict"

const botonRegistrar = document.querySelector("#enviarFormulario");


const primerNombreUsuario = document.querySelector("#inputPrimerNombre");
const segundoNombreUsuario = document.querySelector("#inputSegundoNombre");
const primerApellidoUsuario = document.querySelector("#inputPrimerApellido");
const segundoApellidoUsuario = document.querySelector("#inputSegundoApellido");
const tipoCedulaUsuario = document.querySelector("#tipoCedula");
const numeroIdentificacionUsuario = document.querySelector("#inputIdentificacion");
const telefonoUsuario = document.querySelector("#numeroTelefonico");
const correoUsuario = document.querySelector("#correo");
const passwordUsuario = document.querySelector("#pwd");
const confirmacionPasswordUsuario = document.querySelector("#confirmacionPwd");
const tipoPersonaUsuario = document.querySelector("#tipoPersona");
const mayuscula = new RegExp(".*[A-Z]");
const minuscula = new RegExp(".*[a-z]");
const numero = new RegExp(".*[0-9]");
const caracterEspecial = new RegExp(".[._\\-~}{)(,:?\"^$\\#!\\[\\]'/+%@|\\\\&;]");
const longitudPassword = new RegExp("^(?=.{4,16}$)[a-zA-Z0-9][^$%^&;:,<>?()\"']*$");
const formatoJuridica = new RegExp("^[3][1][0][1][0-9]{6}$");
const formatoNacional = new RegExp("^[1-9][0-9]{8}$");
const formatoDimex = new RegExp("^[1-9][0-9]{11,12}$");
const formatoPasaporte = new RegExp("^[a-zA-Z0-9\\-]{5,128}$");
const formatoNombre = new RegExp("^[^0-9,:?\"^$\\*#!\\[\\]/+%@|\\\\&~}{)(;]{2,32}$");
let timeout = null;


let validarInputs = () => {
    if (tipoCedulaUsuario.value == "") {
        document.querySelector("#inputIdentificacion").disabled = true;
        document.querySelector("#inputIdentificacion").placeholder = "";
    } else {
        document.querySelector("#inputIdentificacion").disabled = false;
    }

    switch (tipoCedulaUsuario.value) {

        case "Juridica":
            document.querySelector("#inputIdentificacion").placeholder = "Formato: XXXXXXXXXX";

            break;

        case "Nacional":
            document.querySelector("#inputIdentificacion").placeholder = "Formato: X XXXX XXXX";

            break;

        case "Residencia":
            document.querySelector("#inputIdentificacion").placeholder = "Formato: XXXXXXXXXXX ó XXXXXXXXXXXX";

            break;

        case "Extranjero":
            document.querySelector("#inputIdentificacion").placeholder = "Pasaporte";

            break;
    }
}


let validarFormulario = () => {
    let error = false;
    let nombreInvalido = errorNombre();
    let passwordInvalido = validacionPassword();
    let identificacionInvalida = validarCedula();
    let generoUsuario = document.querySelector("#inputGenero input[type=radio]:checked");
    let elementosRequeridos = document.querySelectorAll("#formularioUsuarioRegular [required]");
    for (let i = 0; i < elementosRequeridos.length; i++) {
        if (elementosRequeridos[i].value == "") {
            elementosRequeridos[i].classList.add("errorDeInput");
            error = true;
        } else {
            elementosRequeridos[i].classList.remove("errorDeInput");
        }

    }
    if (!tipoPersonaUsuario) {
        error = true;
        document.querySelector("#tipoPersona").classList.add("errorDeInput");
    } else {
        document.querySelector("#tipoPersona").classList.remove("errorDeInput");
    }



    if (!generoUsuario) {
        document.querySelector("#inputGenero").classList.add("errorDeInput");
        error = true;
    } else {
        document.querySelector("#inputGenero").classList.remove("errorDeInput");
    }

    if (passwordInvalido == true || passwordUsuario.value !== confirmacionPasswordUsuario.value || !longitudPassword.test(passwordUsuario.value)) {
        passwordUsuario.classList.add("errorDeInput");
        confirmacionPasswordUsuario.classList.add("errorDeInput");
        error = true;

    } else {
        passwordUsuario.classList.remove("errorDeInput");
        confirmacionPasswordUsuario.classList.remove("errorDeInput");
        error = false;

    }

    if (identificacionInvalida == true) {
        document.querySelector("#inputIdentificacion").classList.add("errorDeInput");
        error = true;
    } else {
        document.querySelector("#inputIdentificacion").classList.remove("errorDeInput");
    }

    if (nombreInvalido == true) {
        error = true;
    }

    if (tipoPersonaUsuario.value == "fisica" && primerApellidoUsuario.value == "") {
        error = true;
        primerApellidoUsuario.classList.add("errorDeInput");
    } else {
        primerApellidoUsuario.classList.remove("errorDeInput");
    }

    return error;
}

let obtenerDatos = () => {
    let errorValidacion = validarFormulario();
    if (!errorValidacion) {

        let primerNombre = primerNombreUsuario.value;
        let segundoNombre = segundoNombreUsuario.value;
        let primerApellido = primerApellidoUsuario.value;
        let segundoApellido = segundoApellidoUsuario.value;
        let tipoDeIdentificacion = tipoCedulaUsuario.value;
        let tipoDePersona = tipoPersonaUsuario.value;
        let numeroDeIdentificacion = numeroIdentificacionUsuario.value;
        let genero = document.querySelector("#inputGenero input[type=radio]:checked").value;
        let numeroDeTelefono = telefonoUsuario.value;
        let correoElectronico = correoUsuario.value;
        let password = passwordUsuario.value;
        let profesion = "N/A";
        let montoBase = "0";
        let tarifaPlataforma = "0";
        let cargosAdicionales = "N/A";
        let provincia = "N/A";
        let canton = "N/A";
        let distrito = "N/A";
        let tipoDeUsuario = "Usuario Regular";
        let foto = document.querySelector("#fotografiaUsuario").src;
        let estado = "desactivado";

        registrarUsuario(correoElectronico, password, tipoDeUsuario, primerNombre, segundoNombre, primerApellido, segundoApellido, tipoDeIdentificacion, tipoDePersona, numeroDeIdentificacion, genero, numeroDeTelefono, profesion, montoBase, tarifaPlataforma, cargosAdicionales, provincia, canton, distrito, foto, estado);



    } else {
        Swal.fire({
            title: "La solicitud de registro no se ha podido enviar",
            text: "Verifique los campos resaltados en rojo y llene los campos correctamente",
            icon: "warning"
        });
    }
}

let validacionPassword = () => {
    let error = false;
    let matchingError = verificarPasswords();

    if (passwordUsuario.value != "") {
        if (!mayuscula.test(passwordUsuario.value)) {
            document.querySelector("#complejidadPwd").innerHTML = "No contiene mayúsculas";
            error = true;
        } else {
            document.querySelector("#complejidadPwd").innerHTML = "";
        }
    } else {
        document.querySelector("#complejidadPwd").innerHTML = "";
        error = true;
    }

    if (passwordUsuario.value != "") {
        if (!minuscula.test(passwordUsuario.value)) {
            document.querySelector("#complejidadPwd2").innerHTML = "No contiene minúsculas";
            error = true;
        } else {
            document.querySelector("#complejidadPwd2").innerHTML = "";
        }
    } else {
        document.querySelector("#complejidadPwd2").innerHTML = "";
        error = true;
    }

    if (passwordUsuario.value != "") {
        if (!numero.test(passwordUsuario.value)) {
            document.querySelector("#complejidadPwd3").innerHTML = "No contiene números";
            error = true;
        } else {
            document.querySelector("#complejidadPwd3").innerHTML = "";
        }
    } else {
        document.querySelector("#complejidadPwd3").innerHTML = "";
        error = true;
    }

    if (passwordUsuario.value != "") {
        if (!caracterEspecial.test(passwordUsuario.value)) {
            document.querySelector("#complejidadPwd4").innerHTML = "No contiene caracteres especiales";
            error = true;
        } else {
            document.querySelector("#complejidadPwd4").innerHTML = "";
        }
    } else {
        document.querySelector("#complejidadPwd4").innerHTML = "";
        error = true;
    }

    if (passwordUsuario.value != "") {
        if (!longitudPassword.test(passwordUsuario.value)) {
            document.querySelector("#complejidadPwd5").innerHTML = "La contraseña debe tener mínimo 4 caracteres pero no más de 16!";
            document.querySelector("#complejidadPwd").innerHTML = "";
            error = true;
        } else {
            document.querySelector("#complejidadPwd5").innerHTML = "";
        }
    } else {
        document.querySelector("#complejidadPwd5").innerHTML = "";
        error = true;
    }

    if (!error) {
        document.querySelector("#complejidadPwd").innerHTML = "Contraseña Valida!";
        error = false;

    } else {
        error = true;
    }

    if (matchingError == true) {
        error = true;
    }

    return error;
}

let verificarPasswords = () => {
    let error = false;

    if (confirmacionPasswordUsuario.value != "") {

        if (passwordUsuario.value == confirmacionPasswordUsuario.value) {
            document.querySelector("#estadoPwd").innerHTML = "Concuerda";
            error = false;
        } else {
            document.querySelector("#estadoPwd").innerHTML = 'No concuerdan';
            error = true;
        }
    } else {
        document.querySelector("#estadoPwd").innerHTML = "";
        error = true;
    }

    return error;
}


let validarTipoPersona = () => {
    if (tipoPersonaUsuario.value == "juridica") {
        tipoCedulaUsuario.value = "Juridica";
        document.querySelector("#tipoCedula").disabled = true;
        document.querySelector("#radioNoDefine").checked = true;
        document.querySelector("#radioMasculino").disabled = true;
        document.querySelector("#radioFemenino").disabled = true;
        document.querySelector("#fotografiaUsuario").src = "https://res.cloudinary.com/buhosapiens/image/upload/v1586046875/other-icon.png";

    } else {
        document.querySelector("#tipoCedula").disabled = false;
        document.querySelector("#radioNoDefine").checked = false;
        document.querySelector("#radioMasculino").disabled = false;
        document.querySelector("#radioFemenino").disabled = false;
    }

    if (document.querySelector("#tipoCedula").disabled == true) {

        document.querySelector("#inputIdentificacion").disabled = false;
        document.querySelector("#inputIdentificacion").placeholder = "Formato: 3101XXXXXX";

    }

    if (tipoPersonaUsuario.value == "fisica") {

        document.querySelector("#tipoCedula").value = "";
        document.querySelector("#inputIdentificacion").placeholder = "";
        document.querySelector("#inputIdentificacion").disabled = true;
        document.querySelector("option[value='Juridica']").disabled = true;
    }

    if (tipoPersonaUsuario.value == "") {
        document.querySelector("#inputIdentificacion").placeholder = "";
        document.querySelector("#inputIdentificacion").disabled = true;
        document.querySelector("#inputIdentificacion").value = "";
        document.querySelector("#tipoCedula").value = "";
        document.querySelector("#fotografiaUsuario").src = "https://res.cloudinary.com/buhosapiens/image/upload/v1586048609/male-icon.png";
        document.querySelector("#radioNoDefine").checked = false;
        document.querySelector("#radioMasculino").checked = false;
        document.querySelector("#radioFemenino").checked = false;
    }
}

let errorNombre = () => {
    let error = false;

    if (primerNombreUsuario.value != "") {
        if (!formatoNombre.test(primerNombreUsuario.value)) {
            error = true;
            document.querySelector("#estadoNombre").innerHTML = "Formato Incorrecto: No utilice números ni caracteres especiales";
            document.querySelector("#inputPrimerNombre").classList.add("errorDeInput");

        } else {
            document.querySelector("#estadoNombre").innerHTML = "";
            document.querySelector("#inputPrimerNombre").classList.remove("errorDeInput");
        }
    } else {
        document.querySelector("#estadoNombre").innerHTML = "";
        document.querySelector("#inputPrimerNombre").classList.remove("errorDeInput");
    }

    if (segundoNombreUsuario.value != "") {
        if (!formatoNombre.test(segundoNombreUsuario.value)) {
            error = true;
            document.querySelector("#estadoNombre2").innerHTML = "Formato Incorrecto: No utilice números ni caracteres especiales";
            document.querySelector("#inputSegundoNombre").classList.add("errorDeInput");

        } else {
            document.querySelector("#estadoNombre2").innerHTML = "";
            document.querySelector("#inputSegundoNombre").classList.remove("errorDeInput");
        }
    } else {
        document.querySelector("#estadoNombre2").innerHTML = "";
        document.querySelector("#inputSegundoNombre").classList.remove("errorDeInput");
    }


    if (primerApellidoUsuario.value != "") {
        if (!formatoNombre.test(primerApellidoUsuario.value)) {
            error = true;
            document.querySelector("#estadoApellido").innerHTML = "Formato Incorrecto: No utilice números ni caracteres especiales";
            document.querySelector("#inputPrimerApellido").classList.add("errorDeInput");
        } else {
            document.querySelector("#estadoApellido").innerHTML = "";
            document.querySelector("#inputPrimerApellido").classList.remove("errorDeInput");
        }
    } else {
        document.querySelector("#estadoApellido").innerHTML = "";
        document.querySelector("#inputPrimerApellido").classList.remove("errorDeInput");
    }

    if (segundoApellidoUsuario.value != "") {
        if (!formatoNombre.test(segundoApellidoUsuario.value)) {
            error = true;
            document.querySelector("#estadoApellido2").innerHTML = "Formato Incorrecto: No utilice números ni caracteres especiales";
            document.querySelector("#inputSegundoApellido").classList.add("errorDeInput");
        } else {
            document.querySelector("#estadoApellido2").innerHTML = "";
            document.querySelector("#inputSegundoApellido").classList.remove("errorDeInput");
        }
    } else {
        document.querySelector("#estadoApellido2").innerHTML = "";
        document.querySelector("#inputSegundoApellido").classList.remove("errorDeInput");
    }

    return error;
}

let validarCedula = () => {
    let error = false;

    switch (tipoCedulaUsuario.value) {

        case "Juridica":

            if (numeroIdentificacionUsuario.value != "") {
                if (!formatoJuridica.test(numeroIdentificacionUsuario.value)) {
                    error = true;
                    document.querySelector("#inputIdentificacion").classList.add("errorDeInput");
                    document.querySelector("#identificacionCorrecta").innerHTML = "Formato Incorrecto";
                } else {
                    document.querySelector("#identificacionCorrecta").innerHTML = "";
                    document.querySelector("#inputIdentificacion").classList.remove("errorDeInput");
                }
            } else {
                document.querySelector("#identificacionCorrecta").innerHTML = "";
                document.querySelector("#inputIdentificacion").classList.remove("errorDeInput");

            }
            break;

        case "Nacional":

            if (numeroIdentificacionUsuario.value != "") {
                if (!formatoNacional.test(numeroIdentificacionUsuario.value)) {
                    error = true;
                    document.querySelector("#identificacionCorrecta").innerHTML = "Formato Incorrecto";
                    document.querySelector("#inputIdentificacion").classList.add("errorDeInput");
                } else {
                    document.querySelector("#identificacionCorrecta").innerHTML = "";
                    document.querySelector("#inputIdentificacion").classList.remove("errorDeInput");
                }
            } else {
                document.querySelector("#identificacionCorrecta").innerHTML = "";
                document.querySelector("#inputIdentificacion").classList.remove("errorDeInput");
            }
            break;

        case "Residencia":

            if (numeroIdentificacionUsuario.value != "") {
                if (!formatoDimex.test(numeroIdentificacionUsuario.value)) {
                    error = true;
                    document.querySelector("#identificacionCorrecta").innerHTML = "Formato Incorrecto";
                    document.querySelector("#inputIdentificacion").classList.add("errorDeInput");
                } else {
                    document.querySelector("#identificacionCorrecta").innerHTML = "";
                    document.querySelector("#inputIdentificacion").classList.remove("errorDeInput");
                }
            } else {
                document.querySelector("#identificacionCorrecta").innerHTML = "";
                document.querySelector("#inputIdentificacion").classList.remove("errorDeInput");
            }
            break;

        case "Extranjero":

            if (numeroIdentificacionUsuario.value != "") {
                if (!formatoPasaporte.test(numeroIdentificacionUsuario.value)) {
                    error = true;
                    document.querySelector("#identificacionCorrecta").innerHTML = "Formato Incorrecto";
                    document.querySelector("#inputIdentificacion").classList.add("errorDeInput");
                } else {
                    document.querySelector("#identificacionCorrecta").innerHTML = "";
                    document.querySelector("#inputIdentificacion").classList.remove("errorDeInput");
                }
            } else {
                document.querySelector("#identificacionCorrecta").innerHTML = "";
                document.querySelector("#inputIdentificacion").classList.remove("errorDeInput");
            }
            break;

        default:
            document.querySelector("#inputIdentificacion").placeholder = "";
            document.querySelector("#identificacionCorrecta").innerHTML = "";
            break;
    }
    return error;
}

let validarNombre = () => {
    clearTimeout(timeout);
    timeout = setTimeout(errorNombre, 1000);
}

let validarFormatoCedula = () => {
    clearTimeout(timeout);
    timeout = setTimeout(validarCedula, 1000);
}

let limpiarFormulario = () => {
    document.querySelector("#formularioUsuarioRegular").reset();
    document.querySelector("#estadoPwd").innerHTML = "";
    document.querySelector("#complejidadPwd").innerHTML = "";
    document.querySelector("#complejidadPwd2").innerHTML = "";
    document.querySelector("#complejidadPwd3").innerHTML = "";
    document.querySelector("#complejidadPwd4").innerHTML = "";
    document.querySelector("#complejidadPwd5").innerHTML = "";
    document.querySelector("#identificacionCorrecta").innerHTML = "";
    document.querySelector("#inputIdentificacion").placeholder = "";
    document.querySelector("#fotografiaUsuario").src = "https://res.cloudinary.com/buhosapiens/image/upload/v1586048609/male-icon.png";

}

let validarGenero = () => {
    if (document.querySelector("#radioMasculino").checked == true) {
        document.querySelector("#fotografiaUsuario").src = "https://res.cloudinary.com/buhosapiens/image/upload/v1586048609/male-icon.png";
    }
    if (document.querySelector("#radioFemenino").checked == true) {
        document.querySelector("#fotografiaUsuario").src = "https://res.cloudinary.com/buhosapiens/image/upload/v1586046805/female-icon.png";
    }
    if (document.querySelector("#radioNoDefine").checked == true) {
        document.querySelector("#fotografiaUsuario").src = "https://res.cloudinary.com/buhosapiens/image/upload/v1586046875/other-icon.png";
    }
}

validarInputs();

numeroIdentificacionUsuario.addEventListener("keyup", validarFormatoCedula);
primerNombreUsuario.addEventListener("keyup", validarNombre);
segundoNombreUsuario.addEventListener("keyup", validarNombre);
primerApellidoUsuario.addEventListener("keyup", validarNombre);
segundoApellidoUsuario.addEventListener("keyup", validarNombre);
botonRegistrar.addEventListener("click", obtenerDatos);


// "use strict"

// const botonRegistrar = document.querySelector("#enviarFormulario");


// const primerNombreUsuario = document.querySelector("#inputPrimerNombre");
// const segundoNombreUsuario = document.querySelector("#inputSegundoNombre");
// const primerApellidoUsuario = document.querySelector("#inputPrimerApellido");
// const segundoApellidoUsuario = document.querySelector("#inputSegundoApellido");
// const tipoCedulaUsuario = document.querySelector("#tipoCedula");
// const numeroIdentificacionUsuario = document.querySelector("#inputIdentificacion");
// const telefonoUsuario = document.querySelector("#numeroTelefonico");
// const correoUsuario = document.querySelector("#correo");
// const passwordUsuario = document.querySelector("#pwd");
// const confirmacionPasswordUsuario = document.querySelector("#confirmacionPwd");
// const tipoPersonaUsuario = document.querySelector("#tipoPersona");
// const mayuscula = new RegExp(".*[A-Z]");
// const minuscula = new RegExp(".*[a-z]");
// const numero = new RegExp(".*[0-9]");
// const caracterEspecial = new RegExp(".*[._\\-~}{)(,:?\"^$\\*#!\\[\\]'/+%@|\\\\&;]");
// const longitudPassword = new RegExp("^(?=.{4,16}$)[a-zA-Z0-9]*[^$%^&*;:,<>?()\"']*$");
// const formatoJuridica = new RegExp("^[3][1][0][1][0-9]{6}$");
// const formatoNacional = new RegExp("^[1-9][0-9]{8}$");
// const formatoDimex = new RegExp("^[1-9][0-9]{11,12}$");
// const formatoPasaporte = new RegExp("^[a-zA-Z0-9\\-]{5,128}$");
// const formatoNombre = new RegExp("^[^0-9,:?\"^$\\*#!\\[\\]/+%@|\\\\&~}{)(;]{2,32}$");
// let timeout = null;


// let validarInputs = () => {
//     if (tipoCedulaUsuario.value == "") {
//         document.querySelector("#inputIdentificacion").disabled = true;
//         document.querySelector("#inputIdentificacion").placeholder = "";
//     } else {
//         document.querySelector("#inputIdentificacion").disabled = false;
//     }

//     switch (tipoCedulaUsuario.value) {

//         case "Juridica":
//             document.querySelector("#inputIdentificacion").placeholder = "Formato: XXXXXXXXXX";

//             break;

//         case "Nacional":
//             document.querySelector("#inputIdentificacion").placeholder = "Formato: X XXXX XXXX";

//             break;

//         case "Residencia":
//             document.querySelector("#inputIdentificacion").placeholder = "Formato: XXXXXXXXXXX ó XXXXXXXXXXXX";

//             break;

//         case "Extranjero":
//             document.querySelector("#inputIdentificacion").placeholder = "Pasaporte";

//             break;
//     }
// }


// let validarFormulario = () => {
//     let error = false;
//     let nombreInvalido = errorNombre();
//     let passwordInvalido = validacionPassword();
//     let identificacionInvalida = validarCedula();
//     let generoUsuario = document.querySelector("#inputGenero input[type=radio]:checked");
//     let elementosRequeridos = document.querySelectorAll("#formularioUsuarioRegular [required]");
//     for (let i = 0; i < elementosRequeridos.length; i++) {
//         if (elementosRequeridos[i].value == "") {
//             elementosRequeridos[i].classList.add("errorDeInput");
//             error = true;
//         } else {
//             elementosRequeridos[i].classList.remove("errorDeInput");
//         }

//     }
//     if (!tipoPersonaUsuario) {
//         error = true;
//         document.querySelector("#tipoPersona").classList.add("errorDeInput");
//     } else {
//         document.querySelector("#tipoPersona").classList.remove("errorDeInput");
//     }



//     if (!generoUsuario) {
//         document.querySelector("#inputGenero").classList.add("errorDeInput");
//         error = true;
//     } else {
//         document.querySelector("#inputGenero").classList.remove("errorDeInput");
//     }

//     if (passwordInvalido == true || passwordUsuario.value !== confirmacionPasswordUsuario.value || !longitudPassword.test(passwordUsuario.value)) {
//         passwordUsuario.classList.add("errorDeInput");
//         confirmacionPasswordUsuario.classList.add("errorDeInput");
//         error = true;

//     } else {
//         passwordUsuario.classList.remove("errorDeInput");
//         confirmacionPasswordUsuario.classList.remove("errorDeInput");
//         error = false;

//     }

//     if (identificacionInvalida == true) {
//         document.querySelector("#inputIdentificacion").classList.add("errorDeInput");
//         error = true;
//     } else {
//         document.querySelector("#inputIdentificacion").classList.remove("errorDeInput");
//     }

//     if (nombreInvalido == true) {
//         error = true;
//     }

//     if (tipoPersonaUsuario.value == "fisica" && primerApellidoUsuario.value == "") {
//         error = true;
//         primerApellidoUsuario.classList.add("errorDeInput");
//     } else {
//         primerApellidoUsuario.classList.remove("errorDeInput");
//     }

//     return error;
// }

// let obtenerDatos = () => {
//     let errorValidacion = validarFormulario();
//     if (!errorValidacion) {

//         let primerNombre = primerNombreUsuario.value;
//         let segundoNombre = segundoNombreUsuario.value;
//         let primerApellido = primerApellidoUsuario.value;
//         let segundoApellido = segundoApellidoUsuario.value;
//         let tipoDeIdentificacion = tipoCedulaUsuario.value;
//         let tipoDePersona = tipoPersonaUsuario.value;
//         let numeroDeIdentificacion = numeroIdentificacionUsuario.value;
//         let genero = document.querySelector("#inputGenero input[type=radio]:checked").value;
//         let numeroDeTelefono = telefonoUsuario.value;
//         let correoElectronico = correoUsuario.value;
//         let password = passwordUsuario.value;
//         let profesion = "N/A";
//         let montoBase = "0";
//         let tarifaPlataforma = "0";
//         let cargosAdicionales = "N/A";
//         let provincia = "N/A";
//         let canton = "N/A";
//         let distrito = "N/A";
//         let tipoDeUsuario = "Usuario Regular";
//         let foto = document.querySelector("#fotografiaUsuario").src;
//         let estado = "desactivado";

//         registrarUsuario(correoElectronico, password, tipoDeUsuario, primerNombre, segundoNombre, primerApellido, segundoApellido, tipoDeIdentificacion, tipoDePersona, numeroDeIdentificacion, genero, numeroDeTelefono, profesion, montoBase, tarifaPlataforma, cargosAdicionales, provincia, canton, distrito, foto, estado);

//         window.location.href = 'index.html';

//     } else {
//         Swal.fire({
//             title: "La solicitud de registro no se ha podido enviar",
//             text: "Verifique los campos resaltados en rojo y llene los campos correctamente",
//             icon: "warning"
//         });
//     }

// }

// let validacionPassword = () => {
//     let error = false;
//     let matchingError = verificarPasswords();

//     if (passwordUsuario.value != "") {
//         if (!mayuscula.test(passwordUsuario.value)) {
//             document.querySelector("#complejidadPwd").innerHTML = "No contiene mayúsculas";
//             error = true;
//         } else {
//             document.querySelector("#complejidadPwd").innerHTML = "";
//         }
//     } else {
//         document.querySelector("#complejidadPwd").innerHTML = "";
//         error = true;
//     }

//     if (passwordUsuario.value != "") {
//         if (!minuscula.test(passwordUsuario.value)) {
//             document.querySelector("#complejidadPwd2").innerHTML = "No contiene minúsculas";
//             error = true;
//         } else {
//             document.querySelector("#complejidadPwd2").innerHTML = "";
//         }
//     } else {
//         document.querySelector("#complejidadPwd2").innerHTML = "";
//         error = true;
//     }

//     if (passwordUsuario.value != "") {
//         if (!numero.test(passwordUsuario.value)) {
//             document.querySelector("#complejidadPwd3").innerHTML = "No contiene números";
//             error = true;
//         } else {
//             document.querySelector("#complejidadPwd3").innerHTML = "";
//         }
//     } else {
//         document.querySelector("#complejidadPwd3").innerHTML = "";
//         error = true;
//     }

//     if (passwordUsuario.value != "") {
//         if (!caracterEspecial.test(passwordUsuario.value)) {
//             document.querySelector("#complejidadPwd4").innerHTML = "No contiene caracteres especiales";
//             error = true;
//         } else {
//             document.querySelector("#complejidadPwd4").innerHTML = "";
//         }
//     } else {
//         document.querySelector("#complejidadPwd4").innerHTML = "";
//         error = true;
//     }

//     if (passwordUsuario.value != "") {
//         if (!longitudPassword.test(passwordUsuario.value)) {
//             document.querySelector("#complejidadPwd5").innerHTML = "La contraseña debe tener mínimo 4 caracteres pero no más de 16!";
//             document.querySelector("#complejidadPwd").innerHTML = "";
//             error = true;
//         } else {
//             document.querySelector("#complejidadPwd5").innerHTML = "";
//         }
//     } else {
//         document.querySelector("#complejidadPwd5").innerHTML = "";
//         error = true;
//     }

//     if (!error) {
//         document.querySelector("#complejidadPwd").innerHTML = "Contraseña Valida!";
//         error = false;

//     } else {
//         error = true;
//     }

//     if (matchingError == true) {
//         error = true;
//     }

//     return error;
// }

// let verificarPasswords = () => {
//     let error = false;

//     if (confirmacionPasswordUsuario.value != "") {

//         if (passwordUsuario.value == confirmacionPasswordUsuario.value) {
//             document.querySelector("#estadoPwd").innerHTML = "Concuerda";
//             error = false;
//         } else {
//             document.querySelector("#estadoPwd").innerHTML = 'No concuerdan';
//             error = true;
//         }
//     } else {
//         document.querySelector("#estadoPwd").innerHTML = "";
//         error = true;
//     }

//     return error;
// }


// let validarTipoPersona = () => {
//     if (tipoPersonaUsuario.value == "juridica") {
//         tipoCedulaUsuario.value = "Juridica";
//         document.querySelector("#tipoCedula").disabled = true;
//         document.querySelector("#radioNoDefine").checked = true;
//         document.querySelector("#radioMasculino").disabled = true;
//         document.querySelector("#radioFemenino").disabled = true;
//         document.querySelector("#fotografiaUsuario").src = "https://res.cloudinary.com/buhosapiens/image/upload/v1586046875/other-icon.png";

//     } else {
//         document.querySelector("#tipoCedula").disabled = false;
//         document.querySelector("#radioNoDefine").checked = false;
//         document.querySelector("#radioMasculino").disabled = false;
//         document.querySelector("#radioFemenino").disabled = false;
//     }

//     if (document.querySelector("#tipoCedula").disabled == true) {

//         document.querySelector("#inputIdentificacion").disabled = false;
//         document.querySelector("#inputIdentificacion").placeholder = "Formato: 3101XXXXXX";

//     }

//     if (tipoPersonaUsuario.value == "fisica") {

//         document.querySelector("#tipoCedula").value = "";
//         document.querySelector("#inputIdentificacion").placeholder = "";
//         document.querySelector("#inputIdentificacion").disabled = true;
//         document.querySelector("option[value='Juridica']").disabled = true;
//     }

//     if (tipoPersonaUsuario.value == "") {
//         document.querySelector("#inputIdentificacion").placeholder = "";
//         document.querySelector("#inputIdentificacion").disabled = true;
//         document.querySelector("#inputIdentificacion").value = "";
//         document.querySelector("#tipoCedula").value = "";
//         document.querySelector("#fotografiaUsuario").src = "https://res.cloudinary.com/buhosapiens/image/upload/v1586048609/male-icon.png";
//         document.querySelector("#radioNoDefine").checked = false;
//         document.querySelector("#radioMasculino").checked = false;
//         document.querySelector("#radioFemenino").checked = false;
//     }
// }

// let errorNombre = () => {
//     let error = false;

//     if (primerNombreUsuario.value != "") {
//         if (!formatoNombre.test(primerNombreUsuario.value)) {
//             error = true;
//             document.querySelector("#estadoNombre").innerHTML = "Formato Incorrecto: No utilice números ni caracteres especiales";
//             document.querySelector("#inputPrimerNombre").classList.add("errorDeInput");

//         } else {
//             document.querySelector("#estadoNombre").innerHTML = "";
//             document.querySelector("#inputPrimerNombre").classList.remove("errorDeInput");
//         }
//     } else {
//         document.querySelector("#estadoNombre").innerHTML = "";
//         document.querySelector("#inputPrimerNombre").classList.remove("errorDeInput");
//     }

//     if (segundoNombreUsuario.value != "") {
//         if (!formatoNombre.test(segundoNombreUsuario.value)) {
//             error = true;
//             document.querySelector("#estadoNombre2").innerHTML = "Formato Incorrecto: No utilice números ni caracteres especiales";
//             document.querySelector("#inputSegundoNombre").classList.add("errorDeInput");

//         } else {
//             document.querySelector("#estadoNombre2").innerHTML = "";
//             document.querySelector("#inputSegundoNombre").classList.remove("errorDeInput");
//         }
//     } else {
//         document.querySelector("#estadoNombre2").innerHTML = "";
//         document.querySelector("#inputSegundoNombre").classList.remove("errorDeInput");
//     }


//     if (primerApellidoUsuario.value != "") {
//         if (!formatoNombre.test(primerApellidoUsuario.value)) {
//             error = true;
//             document.querySelector("#estadoApellido").innerHTML = "Formato Incorrecto: No utilice números ni caracteres especiales";
//             document.querySelector("#inputPrimerApellido").classList.add("errorDeInput");
//         } else {
//             document.querySelector("#estadoApellido").innerHTML = "";
//             document.querySelector("#inputPrimerApellido").classList.remove("errorDeInput");
//         }
//     } else {
//         document.querySelector("#estadoApellido").innerHTML = "";
//         document.querySelector("#inputPrimerApellido").classList.remove("errorDeInput");
//     }

//     if (segundoApellidoUsuario.value != "") {
//         if (!formatoNombre.test(segundoApellidoUsuario.value)) {
//             error = true;
//             document.querySelector("#estadoApellido2").innerHTML = "Formato Incorrecto: No utilice números ni caracteres especiales";
//             document.querySelector("#inputSegundoApellido").classList.add("errorDeInput");
//         } else {
//             document.querySelector("#estadoApellido2").innerHTML = "";
//             document.querySelector("#inputSegundoApellido").classList.remove("errorDeInput");
//         }
//     } else {
//         document.querySelector("#estadoApellido2").innerHTML = "";
//         document.querySelector("#inputSegundoApellido").classList.remove("errorDeInput");
//     }

//     return error;
// }

// let validarCedula = () => {
//     let error = false;

//     switch (tipoCedulaUsuario.value) {

//         case "Juridica":

//             if (numeroIdentificacionUsuario.value != "") {
//                 if (!formatoJuridica.test(numeroIdentificacionUsuario.value)) {
//                     error = true;
//                     document.querySelector("#inputIdentificacion").classList.add("errorDeInput");
//                     document.querySelector("#identificacionCorrecta").innerHTML = "Formato Incorrecto";
//                 } else {
//                     document.querySelector("#identificacionCorrecta").innerHTML = "";
//                     document.querySelector("#inputIdentificacion").classList.remove("errorDeInput");
//                 }
//             } else {
//                 document.querySelector("#identificacionCorrecta").innerHTML = "";
//                 document.querySelector("#inputIdentificacion").classList.remove("errorDeInput");

//             }
//             break;

//         case "Nacional":

//             if (numeroIdentificacionUsuario.value != "") {
//                 if (!formatoNacional.test(numeroIdentificacionUsuario.value)) {
//                     error = true;
//                     document.querySelector("#identificacionCorrecta").innerHTML = "Formato Incorrecto";
//                     document.querySelector("#inputIdentificacion").classList.add("errorDeInput");
//                 } else {
//                     document.querySelector("#identificacionCorrecta").innerHTML = "";
//                     document.querySelector("#inputIdentificacion").classList.remove("errorDeInput");
//                 }
//             } else {
//                 document.querySelector("#identificacionCorrecta").innerHTML = "";
//                 document.querySelector("#inputIdentificacion").classList.remove("errorDeInput");
//             }
//             break;

//         case "Residencia":

//             if (numeroIdentificacionUsuario.value != "") {
//                 if (!formatoDimex.test(numeroIdentificacionUsuario.value)) {
//                     error = true;
//                     document.querySelector("#identificacionCorrecta").innerHTML = "Formato Incorrecto";
//                     document.querySelector("#inputIdentificacion").classList.add("errorDeInput");
//                 } else {
//                     document.querySelector("#identificacionCorrecta").innerHTML = "";
//                     document.querySelector("#inputIdentificacion").classList.remove("errorDeInput");
//                 }
//             } else {
//                 document.querySelector("#identificacionCorrecta").innerHTML = "";
//                 document.querySelector("#inputIdentificacion").classList.remove("errorDeInput");
//             }
//             break;

//         case "Extranjero":

//             if (numeroIdentificacionUsuario.value != "") {
//                 if (!formatoPasaporte.test(numeroIdentificacionUsuario.value)) {
//                     error = true;
//                     document.querySelector("#identificacionCorrecta").innerHTML = "Formato Incorrecto";
//                     document.querySelector("#inputIdentificacion").classList.add("errorDeInput");
//                 } else {
//                     document.querySelector("#identificacionCorrecta").innerHTML = "";
//                     document.querySelector("#inputIdentificacion").classList.remove("errorDeInput");
//                 }
//             } else {
//                 document.querySelector("#identificacionCorrecta").innerHTML = "";
//                 document.querySelector("#inputIdentificacion").classList.remove("errorDeInput");
//             }
//             break;

//         default:
//             document.querySelector("#inputIdentificacion").placeholder = "";
//             document.querySelector("#identificacionCorrecta").innerHTML = "";
//             break;
//     }
//     return error;
// }

// let validarNombre = () => {
//     clearTimeout(timeout);
//     timeout = setTimeout(errorNombre, 1000);
// }

// let validarFormatoCedula = () => {
//     clearTimeout(timeout);
//     timeout = setTimeout(validarCedula, 1000);
// }

// let limpiarFormulario = () => {
//     document.querySelector("#formularioUsuarioRegular").reset();
//     document.querySelector("#estadoPwd").innerHTML = "";
//     document.querySelector("#complejidadPwd").innerHTML = "";
//     document.querySelector("#complejidadPwd2").innerHTML = "";
//     document.querySelector("#complejidadPwd3").innerHTML = "";
//     document.querySelector("#complejidadPwd4").innerHTML = "";
//     document.querySelector("#complejidadPwd5").innerHTML = "";
//     document.querySelector("#identificacionCorrecta").innerHTML = "";
//     document.querySelector("#inputIdentificacion").placeholder = "";
//     document.querySelector("#fotografiaUsuario").src = "https://res.cloudinary.com/buhosapiens/image/upload/v1586048609/male-icon.png";

// }

// let validarGenero = () => {
//     if (document.querySelector("#radioMasculino").checked == true) {
//         document.querySelector("#fotografiaUsuario").src = "https://res.cloudinary.com/buhosapiens/image/upload/v1586048609/male-icon.png";
//     }
//     if (document.querySelector("#radioFemenino").checked == true) {
//         document.querySelector("#fotografiaUsuario").src = "https://res.cloudinary.com/buhosapiens/image/upload/v1586046805/female-icon.png";
//     }
//     if (document.querySelector("#radioNoDefine").checked == true) {
//         document.querySelector("#fotografiaUsuario").src = "https://res.cloudinary.com/buhosapiens/image/upload/v1586046875/other-icon.png";
//     }
// }

// validarInputs();

// numeroIdentificacionUsuario.addEventListener("keyup", validarFormatoCedula);
// primerNombreUsuario.addEventListener("keyup", validarNombre);
// segundoNombreUsuario.addEventListener("keyup", validarNombre);
// primerApellidoUsuario.addEventListener("keyup", validarNombre);
// segundoApellidoUsuario.addEventListener("keyup", validarNombre);
// botonRegistrar.addEventListener("click", obtenerDatos);