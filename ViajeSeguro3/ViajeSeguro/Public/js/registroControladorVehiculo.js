'use strict';

// Archivos controladores tienen las siguientes funciones:

// - Leer valores del html (formulario)
// - Muestra / imprime valores en el html
// - Realiza validaciones
// - Se comunica con el archivo servicio js

// let  es lo que vamos a utilizar
// const se utiliza para valores que no van a cambiar (el valor con el que se inicializar la variable no puede ser modificado)
// var ya no se suele utilizar

const botonGuardar = document.querySelector('#btnGuardar');
const sltTipoVehiculo = document.querySelector('#sltTipoVehiculo');
const txtPlaca = document.querySelector('#txtPlaca');
const txtMarca = document.querySelector('#txtMarca');
const txtModelo = document.querySelector('#txtModelo');
const numAno = document.querySelector('#numAno');
const txtColor = document.querySelector('#txtColor');
const sltEstilo = document.querySelector('#sltEstilo');
const usuarioActual = localStorage.getItem("usuarioID");


let validar = () => {
    let err = false;
    let elementosRequeridos = document.querySelectorAll('[required]');

    for (let i = 0; i < elementosRequeridos.length; i++) {
        if (elementosRequeridos[i].value == '') {
            elementosRequeridos[i].classList.add('inputError');
            err = true;
        } else {
            elementosRequeridos[i].classList.remove('inputError');
        }
    }

    return err;
};

let limpiar = () => {
    // TipoSiniestro.value = '';
    // document.querySelector("#imagenPrevia").src = "https://res.cloudinary.com/dpfv7ok9y/image/upload/v1585971909/iconoPredeterminado_te0kwd.ico";
    // descripcion.value = '';
};

let obtenerDatos = () => {

    let errorValidacion = validar();
    if (!errorValidacion) {
        let TxtPlaca = txtPlaca.value;
        let TxtMarca = txtMarca.value;
        let Estado = "activo";
        let TxtModelo = txtModelo.value;
        let NumAno = numAno.value;
        let TxtColor = txtColor.value;
        let SltTipoVehiculo = sltTipoVehiculo.value;
        let SltEstilo = sltEstilo.value;
        let CorreoElectronicoPropietario = usuarioActual;
        let Foto = document.querySelector('#foto').src;
        let CaracterEspecial = document.querySelectorAll("#CaracEsp input[type=checkbox]:checked");
        let inputCaracterEspecial = [];
        CaracterEspecial.forEach(input => {
            inputCaracterEspecial.push(input.value);
        });
        console.log(CorreoElectronicoPropietario);
        console.log(inputCaracterEspecial)

        registrarVehiculo(TxtPlaca, TxtMarca, Estado, TxtModelo, NumAno, TxtColor, SltTipoVehiculo, SltEstilo, CorreoElectronicoPropietario, Foto, JSON.stringify(inputCaracterEspecial));



    } else {
        Swal.fire({
            title: 'No fue posible guardar',
            text: 'Por favor llene los campos resaltados',
            icon: 'warning'
        })
    }

};

botonGuardar.addEventListener('click', obtenerDatos);