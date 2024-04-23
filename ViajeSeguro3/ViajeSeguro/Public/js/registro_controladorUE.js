'use strict';

const btnRegistrar = document.querySelector('#btnRegistrar ');

const sltTipoUsuario = document.querySelector('#sltTipoUsuario');
const txtPrimerNombre = document.querySelector('#txtPrimerNombre');
const txtSegundoNombre = document.querySelector('#txtSegundoNombre');
const txtPrimerApellido = document.querySelector('#txtPrimerApellido');
const txtSegundoApellido = document.querySelector('#txtSegundoApellido');
const tPersona = document.querySelector('#sltTipoPersona');
const sltTipoIdentificacion = document.querySelector('#sltTipoIdentificacion');
const txtNumeroIdentificacion = document.querySelector('#txtNumeroIdentificacion');
const sltGenero = document.querySelector('#sltGenero');
const txtNumeroTelefono = document.querySelector('#txtNumeroTelefono');
const emailCorreoElectronico = document.querySelector('#emailCorreoElectronico');
const txtPassword = document.querySelector('#txtPassword');
const txtConfirmPass = document.querySelector('#txtConfPassword');
const sltProfesion = document.querySelector('#sltProfesion');
const txtMonto = document.querySelector('#txtMonto');
const txtTarifa = document.querySelector('#txtTarifa');
const sltProvincia = document.querySelector('#sltProvincia');
const sltCanton = document.querySelector('#sltCanton');
const sltDistrito = document.querySelector('#sltDistrito');
const sltEstadoUsuario = document.querySelector('#sltEstadoUsuario');
const idRegex = new RegExp(".*[._\\-~}{)(,:?\"^$\\*#!\\[\\]'/+%@|\\\\&;]");
const sinLetras = new RegExp(/\D/g);
const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
const nombreRegex = new RegExp(/.*[0-9]/);
const logout = document.querySelector('#logout');
const btnCat = document.querySelector('#btnAsociarCat');

let redirectCat = () => {
    window.location.href = 'asociarCategoria.html';
}




let validarC = () => {
    let error = false;
    let requeridos = document.querySelectorAll('[required]');


    for (let i = 0; i < requeridos.length; i++) {
        if (requeridos[i].value == '') {
            requeridos[i].classList.add('errorInput');
            error = true;
        } else {
            requeridos[i].classList.remove('errorInput');
        }
    }

    return error;
};

let validarNombre = () => {
    let error = false;
    if (nombreRegex.test(txtPrimerNombre.value)) {
        error = true;
        if (error == true) {
            txtPrimerNombre.classList.add('errorInput');
        } else {
            txtPrimerNombre.classList.remove('errorInput');
        }

    } else if (nombreRegex.test(txtPrimerApellido.value)) {
        error = true;
        if (error == true) {
            txtPrimerApellido.classList.add('errorInput');
        } else {
            txtPrimerApellido.classList.remove('errorInput');
        }

    }

    return error;
};

let validacionId = () => {
    let error = false;
    if (tPersona.value == 'Fisica') {
        if (txtNumeroIdentificacion.value.length != 9) {
            error = true;
            txtNumeroIdentificacion.classList.add('errorInput');
        } else if (sinLetras.test(txtNumeroIdentificacion.value)) {
            error = true;
            txtNumeroIdentificacion.classList.add('errorInput');
        }
    } else if (tPersona.value == 'Juridica') {
        if (txtNumeroIdentificacion.value.length != 12) {
            error = true;
            txtNumeroIdentificacion.classList.add('errorInput');
        } else if (sinLetras.test(txtNumeroIdentificacion.value)) {
            error = true;
            txtNumeroIdentificacion.classList.add('errorInput');
        }
    } else if (tPersona.value == '') {
        error = true;
        txtNumeroIdentificacion.classList.add('errorInput');
    }

    return error;

};

let validarPass = () => {
    let error = false;
    if (!passwordRegex.test(txtPassword.value)) {
        error = true;
        txtPassword.classList.add('errorInput');
    }

    return error;
};



let limpiar = () => {
    sltTipoUsuario.value = '';
    txtPrimerNombre.value = '';
    txtSegundoNombre.value = '';
    txtPrimerApellido.value = '';
    txtSegundoApellido.value = '';
    tPersona.value = '';
    sltTipoIdentificacion.value = '';
    txtNumeroIdentificacion.value = '';
    sltGenero.value = '';
    txtNumeroTelefono.value = '';
    emailCorreoElectronico.value = '';
    txtPassword.value = '';
    txtConfirmPass.value = '';
    sltProfesion.value = '';
    txtMonto.value = '';
    txtTarifa.value = '';
    sltProvincia.value = '';
    sltCanton.value = '';
    sltDistrito.value = '';
    sltEstadoUsuario.value = '';
    document.querySelector('#fotoUsuario').src = '';
};



let obtenerDatos = () => {
    let errorValidacionVacios = validarC();
    let errorId = validacionId();
    let errorPass = validarPass();
    let errorNombre = validarNombre();

    if (!errorValidacionVacios && !errorId && !errorPass && !errorNombre) {
        let tipoUsuario = sltTipoUsuario.value;
        let pNombre = txtPrimerNombre.value;
        let sNombre = txtSegundoNombre.value;
        let pApellido = txtPrimerApellido.value;
        let sApellido = txtSegundoApellido.value;
        let tipoPersona = tPersona.value;
        let tIdentificacion = sltTipoIdentificacion.value;
        let nIdentificacion = txtNumeroIdentificacion.value;
        let genero = sltGenero.value;
        let nTelefono = txtNumeroTelefono.value;
        let correo = emailCorreoElectronico.value;
        let password = txtPassword.value;
        let profesion = sltProfesion.value;
        let monto = txtMonto.value;
        let tarifa = txtTarifa.value;
        let inputCargosAdicionales = document.querySelector('#cargosAdicionales input[type=radio]:checked').value;
        let inputCategorias = document.querySelectorAll('#containerCat input[type=checkbox]:checked');
        let categorias = [];
        let provincia = sltProvincia.value;
        let canton = sltCanton.value;
        let distrito = sltDistrito.value;
        let estado = sltEstadoUsuario.value;
        let imagen = document.querySelector('#fotoUsuario').src;


        inputCategorias.forEach(input => {
            categorias.push(input.value);
        })

        console.log(inputCategorias);
        // singup(correo, password);
        registrarUsuario(correo, password, tipoUsuario, pNombre, sNombre, pApellido, sApellido, tipoPersona, tIdentificacion, nIdentificacion, genero, nTelefono, profesion, monto, tarifa, inputCargosAdicionales, JSON.stringify(categorias), provincia, canton, distrito, estado, imagen);



        Swal.fire({
            title: 'El proceso se realizó correctamente',
            text: 'Sus datos han sido almacenados',
            icon: 'success'
        }).then(() => {
            window.location.href = 'listar_usuarios.html'
        });
    } else if (errorValidacionVacios) {
        Swal.fire({
            title: 'No se han podido guardar los datos',
            text: 'Favor revisar los espacios requeridos',
            icon: 'warning'
        })
    } else if (errorId) {
        Swal.fire({
            title: 'No se han podido guardar los datos',
            text: 'Favor revisar la cedula',
            icon: 'warning'
        })
    } else if (errorPass) {
        Swal.fire({
            title: 'No se han podido guardar los datos',
            text: 'Contraseña incorrecta',
            icon: 'warning'
        })
    } else if (errorNombre) {
        Swal.fire({
            title: 'No se han podido guardar los datos',
            text: 'Favor revisar el nombre',
            icon: 'warning'
        })
    }
};

let redirectLogout = () => {
    window.location.replace('index.html');
}




// };



btnRegistrar.addEventListener('click', obtenerDatos);