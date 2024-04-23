'use strict';

const tbody = document.querySelector('#tblVehiculos tbody');
const Filtro = document.querySelector('#txtFiltro');

let listaVehiculos = [];

let mostrarVehiculos = async() => {

    listaVehiculos = await listarVehiculos();

    for (let i = 0; i < listaVehiculos.length; i++) {
        let fila = tbody.insertRow();
        let vehiculo = document.createElement('h3');
        vehiculo.innerText = listaVehiculos[i]['placa'];
        // console.log(vehiculo);

        vehiculo.classList.add("tablaVehiculos");
        fila.insertCell().appendChild(vehiculo);

        // let mostrarPropietario = document.createElement("h3");

        // mostrarPropietario.innerText = listaVehiculos[i]['correoElectronicoPropietario'];
        // mostrarPropietario.classList.add("mostrarPropietario");
        // fila.insertCell().appendChild(mostrarPropietario);

        let btnModificar = document.createElement("button");
        btnModificar.type = "button";
        btnModificar.innerText = "Modificar";
        btnModificar.classList.add("btnModificar");
        fila.insertCell().appendChild(btnModificar);

        let btnEliminar = document.createElement("button");
        btnEliminar.type = "button";
        btnEliminar.innerText = "Eliminar";
        btnEliminar.classList.add("btnEliminar");
        fila.insertCell().appendChild(btnEliminar);

        btnEliminar.addEventListener('click', () => {

            Swal.fire({
                title: '¿Desea borrar este vehículo?',
                text: "Ésta acción no se puede revertir",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, estoy seguro!',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.value) {
                    eliminarVehiculo(listaVehiculos[i]['_id']);
                    Swal.fire(
                        'Proceso realizado con éxito!',
                        'El vehículo ha sido eliminado',
                        'success'
                    )
                }
            })



        })

        btnModificar.addEventListener('click', () => {
            console.log(listaVehiculos[i]['_id']);
            console.log(listaVehiculos[i]['placa']);
            localStorage.setItem('_id', listaVehiculos[i]['_id']);
            window.location.href = 'modificarVehiculo.html'


        })

        let celdaEstados = fila.insertCell();
        let btnEstados = document.createElement("button");
        btnEstados.type = "button";
        if (listaVehiculos[i]['estado'] == 'activo') {
            btnEstados.classList.add('btnEstadoDesactivado');
            btnEstados.innerText = 'Desactivar';
            btnEstados.addEventListener('click', () => {
                deshabilitarVehiculo(listaVehiculos[i]['_id']);
            })
        } else {
            btnEstados.classList.add('btnEstadoActivado');
            btnEstados.innerText = 'Activar';
            btnEstados.addEventListener('click', () => {
                habilitarVehiculo(listaVehiculos[i]['_id']);
            })
        }
        celdaEstados.appendChild(btnEstados);
    }





};

let filtrarDatos = () => {
    tbody.innerHTML = '';
    let filtro = Filtro.value.toLowerCase();

    let hayCoincidencias = false;

    for (let i = 0; i < listaVehiculos.length; i++) {
        let vehiculo = listaVehiculos[i]['placa'].toLowerCase();

        if (vehiculo.includes(filtro)) {
            let fila = tbody.insertRow();
            let vehiculo = document.createElement('h3');
            vehiculo.innerText = listaVehiculos[i]['placa'];
            // console.log(vehiculo);

            vehiculo.classList.add("tablaVehiculos");
            fila.insertCell().appendChild(vehiculo);

            // let mostrarPropietario = document.createElement("h3");

            // mostrarPropietario.innerText = listaVehiculos[i]['correoElectronicoPropietario'];
            // mostrarPropietario.classList.add("mostrarPropietario");
            // fila.insertCell().appendChild(mostrarPropietario);

            let btnModificar = document.createElement("button");
            btnModificar.type = "button";
            btnModificar.innerText = "Modificar";
            btnModificar.classList.add("btnModificar");
            fila.insertCell().appendChild(btnModificar);

            let btnEliminar = document.createElement("button");
            btnEliminar.type = "button";
            btnEliminar.innerText = "Eliminar";
            btnEliminar.classList.add("btnEliminar");
            fila.insertCell().appendChild(btnEliminar);

            btnEliminar.addEventListener('click', () => {

                Swal.fire({
                    title: '¿Desea borrar esta categoría?',
                    text: "Ésta acción no se puede revertir",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sí, estoy seguro!',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.value) {
                        eliminarVehiculo(listaVehiculos[i]['_id']);
                        Swal.fire(
                            'Proceso realizado con éxito!',
                            'El vehículo ha sido eliminado',
                            'success'
                        )
                    }
                })
            })

            btnModificar.addEventListener('click', () => {
                console.log(listaVehiculos[i]['_id']);
                console.log(listaVehiculos[i]['placa']);




            })

            let celdaEstados = fila.insertCell();
            let btnEstados = document.createElement("button");
            btnEstados.type = "button";
            if (listaVehiculos[i]['estado'] == 'activo') {
                btnEstados.classList.add('btnEstadoDesactivado');
                btnEstados.innerText = 'Desactivar';
                btnEstados.addEventListener('click', () => {
                    deshabilitarVehiculo(listaVehiculos[i]['_id']);
                })
            } else {
                btnEstados.classList.add('btnEstadoActivado');
                btnEstados.innerText = 'Activar';
                btnEstados.addEventListener('click', () => {
                    habilitarVehiculo(listaVehiculos[i]['_id']);
                })
            }
            celdaEstados.appendChild(btnEstados);

            hayCoincidencias = true;

        }

    };

    if (hayCoincidencias == false) {
        tbody.innerHTML = 'No hay datos que mostrar';
    }
};

mostrarVehiculos();
Filtro.addEventListener('keyup', filtrarDatos);