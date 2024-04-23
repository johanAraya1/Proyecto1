'use strict';

const tbody = document.querySelector('#tblTipoVehiculos tbody');
const inputFiltro = document.querySelector('#txtFiltro');
const sltVehiculos = document.querySelector('#sltTipoVehiculo');

let listaTipoVehiculos = [];

let mostrarTiposDeVehiculo = async() => {

    listaTipoVehiculos = await listarTipoDeVehiculos();

    for (let i = 0; i < listaTipoVehiculos.length; i++) {
        let option = document.createElement('option');
        option.text = listaTipoVehiculos[i]['tipoDeVehiculo'];
        option.value = listaTipoVehiculos[i]['tipoDeVehiculo'];
        sltVehiculos.appendChild(option);

    }

};

mostrarTiposDeVehiculo();