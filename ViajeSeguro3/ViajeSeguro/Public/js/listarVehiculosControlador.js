    'use strict';

    const tbody = document.querySelector('#tblTipoVehiculos tbody');
    const inputFiltro = document.querySelector('#txtFiltro');

    let listaTipoVehiculos = [];

    let mostrarDatos = async() => {

        listaTipoVehiculos = await listarTipoDeVehiculos();
        tbody.innerHTML = '';

        for (let i = 0; i < listaTipoVehiculos.length; i++) {
            let fila = tbody.insertRow();

            let tipoVehiculo = document.createElement("div");
            tipoVehiculo.innerText = listaTipoVehiculos[i]['tipoDeVehiculo'];
            tipoVehiculo.classList.add("tipoVehiculoTabla");
            fila.insertCell().appendChild(tipoVehiculo);

            let descripcion = document.createElement("div");
            descripcion.innerText = listaTipoVehiculos[i]['descripcion'];
            descripcion.classList.add("descripcionTabla");
            fila.insertCell().appendChild(descripcion);

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
                    title: '¿Desea borrar este tipo de vehiculo?',
                    text: "Ésta acción no se puede revertir",
                    icon: 'warning',
                    showCancelButton: "true",
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sí, estoy seguro!',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.value) {
                        eliminarTipoVehiculo(listaTipoVehiculos[i]['_id']);
                        Swal.fire(
                            'Proceso realizado con éxito!',
                            'El tipo de vehículo ha sido eliminado',
                            'success'
                        )
                    }
                })

            });

            btnModificar.addEventListener('click', () => {
                console.log(listaTipoVehiculos[i]['_id']);
                localStorage.setItem('_id', listaTipoVehiculos[i]['_id']);
                window.location.href = 'modificarTipoDeVehiculo.html'


            });

            let celdaEstados = fila.insertCell();
            let botonEstados = document.createElement("button");
            botonEstados.type = "button";
            // botonEstados.classList.add("btnEstados");
            if (listaTipoVehiculos[i]['estado'] == "activo") {
                botonEstados.innerText = "Desactivar";
                botonEstados.classList.add('btnEstadoDesactivado');
                botonEstados.addEventListener("click", () => {
                    deshabilitarTipoDeVehiculos(listaTipoVehiculos[i]['_id']);
                });
            } else {
                botonEstados.classList.add('btnEstadoActivado');
                botonEstados.innerText = "Activar";
                botonEstados.addEventListener("click", () => {
                    habilitarTipoDeVehiculos(listaTipoVehiculos[i]['_id']);
                });
            }
            celdaEstados.appendChild(botonEstados);
        };



        // let celdaEstados = fila.insertCell();
        // let btnEstados = document.createElement("button");
        // btnEstados.type = "button";
        // if (listaTipoVehiculos[i]['estado'] == 'activo') {
        //     btnEstados.classList.add('btnEstadoDesactivado');
        //     btnEstados.innerText = 'Desactivar';
        //     btnEstados.addEventListener('click', () => {
        //         deshabilitarVehiculo(listaVehiculos[i]['_id']);
        //     })
        // } else {
        //     btnEstados.classList.add('btnEstadoActivado');
        //     btnEstados.innerText = 'Activar';
        //     btnEstados.addEventListener('click', () => {
        //         habilitarVehiculo(listaVehiculos[i]['_id']);
        //     })
        // }
        // celdaEstados.appendChild(btnEstados);


    };

    let filtrarDatos = () => {
        tbody.innerHTML = '';
        let filtro = inputFiltro.value.toLowerCase();
        let hayCoincidencias = false;

        for (let i = 0; i < listaTipoVehiculos.length; i++) {
            let tipoVehiculo = listaTipoVehiculos[i]['tipoDeVehiculo'].toLowerCase();
            let descripcion = listaTipoVehiculos[i]['descripcion'].toLowerCase();

            if (tipoVehiculo.includes(filtro) || descripcion.includes(filtro)) {
                let fila = tbody.insertRow();

                let tipoVehiculo = fila.insertCell().innerHTML = listaTipoVehiculos[i]['tipoDeVehiculo'];
                let descripcion = fila.insertCell().innerHTML = listaTipoVehiculos[i]['descripcion'];

                hayCoincidencias = true;



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
                        title: '¿Desea borrar este tipo de vehiculo?',
                        text: "Ésta acción no se puede revertir",
                        icon: 'warning',
                        showCancelButton: "true",
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Sí, estoy seguro!',
                        cancelButtonText: 'Cancelar'
                    }).then((result) => {
                        if (result.value) {
                            eliminarTipoVehiculo(listaTipoVehiculos[i]['_id']);
                            Swal.fire(
                                'Proceso realizado con éxito!',
                                'El tipo de vehículo ha sido eliminado',
                                'success'
                            )
                        }
                    })

                });

                btnModificar.addEventListener('click', () => {
                    console.log(listaTipoVehiculos[i]['_id']);
                    localStorage.setItem('_id', listaTipoVehiculos[i]['_id']);
                    window.location.href = 'modificarTipoDeVehiculo.html'


                });
            }
        };



        if (hayCoincidencias == false) {
            let fila = tbody.insertRow();
            let texto = document.createElement("div");
            texto.innerText = 'No hay datos que mostar';
            texto.classList.add("textoTabla");
            fila.insertCell().appendChild(texto);

            let descripcion = document.createElement("div");
            descripcion.innerText = '';
            descripcion.classList.add("descripcionTabla");
            fila.insertCell().appendChild(descripcion);

        }

    };



    mostrarDatos();
    inputFiltro.addEventListener('keyup', filtrarDatos);