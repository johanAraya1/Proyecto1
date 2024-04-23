'use strict';
const tbody = document.querySelector('#tablaCaracteristica tbody');
const inputBusqueda = document.querySelector('#inputBuscar');
let caractericticaa;
let mostrarDatos = async() => {
    let oCaracteristicas = await listarCaracteristica();
    caractericticaa = Object.values(oCaracteristicas);
    tbody.innerHTML = '';
    console.log(oCaracteristicas);
    let accionCaracteristica = caractericticaa;
    caractericticaa = Object.values(accionCaracteristica);
    for (let i = 0; i < caractericticaa.length; i++) {
        let fila = tbody.insertRow();
        fila.insertCell().innerHTML = caractericticaa[i]['caracteristica'];
        fila.insertCell().innerHTML = caractericticaa[i]['estado'];
        if (caractericticaa[i]['estado'] === 'activo') {
            let botonDesactivar = document.createElement('button');
            botonDesactivar.innerText = 'Desactivar';
            fila.appendChild(botonDesactivar);
            botonDesactivar.addEventListener('click', () => {
                Swal.fire({
                    title: 'Esta seguro que desea desactivar la caracteristica?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#4CAF50',
                    cancelButtonColor: '#EB4848',
                    confirmButtonText: 'Aceptar',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.value) {
                        Swal.fire(
                            'Listo!',
                            'La caracteristica ha sido desactivada',
                            'success'
                        )
                        inactivarCaracteristica(caractericticaa[i]['_id']);
                        setTimeout(function() {
                            window.location.reload();
                        }, 2000);
                    }
                })
            })
        } else {
            let botonActivar = document.createElement('button');
            botonActivar.innerText = 'Activar';
            fila.appendChild(botonActivar);
            botonActivar.addEventListener('click', () => {
                Swal.fire({
                    title: 'Esta seguro que desea reactivar la caracteristica?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#4CAF50',
                    cancelButtonColor: '#EB4848',
                    confirmButtonText: 'Aceptar',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.value) {
                        Swal.fire(
                            'Listo!',
                            'La caracteristica ha sido reactivada',
                            'success'
                        )
                        activarCaracteristica(caractericticaa[i]['_id']);
                        setTimeout(function() {
                            window.location.reload();
                        }, 2000);
                    }
                })
            })
        }
        let botonModificar = document.createElement('button');
        botonModificar.innerText = 'Modificar';
        fila.appendChild(botonModificar);
        botonModificar.addEventListener('click', () => {
            localStorage.setItem('objectIdCaracteristica', caractericticaa[i]['_id']);
            console.log(localStorage.getItem('objectIdCaracteristica'));
            window.location.href = 'editar-caracteristica.html';
        })
        let botonEliminar = document.createElement('button');
        botonEliminar.innerText = 'Eliminar';
        fila.appendChild(botonEliminar);
        botonEliminar.addEventListener('click', () => {
            Swal.fire({
                title: 'Esta seguro que desea eliminar la caracteristica?',
                text: 'Esta acción no se puede revertir',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#4CAF50',
                cancelButtonColor: '#EB4848',
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.value) {
                    Swal.fire(
                        'Listo!',
                        'La caracteristica ha sido eliminada',
                        'success'
                    )
                    eliminarCaracteristica(caractericticaa[i]['_id']);
                    setTimeout(function() {
                        window.location.reload();
                    }, 2000);
                }
            })
        });
    }
}
let buscarCaracteristica = () => {
    tbody.innerHTML = '';
    let busqueda = inputBusqueda.value.toLowerCase();
    let match = false;
    for (let i = 0; i < caractericticaa.length; i++) {
        let caracteristicaas = caractericticaa[i]['caracteristica'].toLowerCase();
        if (caracteristicaas.includes(busqueda)) {
            let fila = tbody.insertRow();
            fila.insertCell().innerHTML = caractericticaa[i]['caracteristica'];
            match = true;
            if (caractericticaa[i]['estado'] === 'activo') {
                let botonDesactivar = document.createElement('button');
                botonDesactivar.innerText = 'Desactivar';
                fila.appendChild(botonDesactivar);
                botonDesactivar.addEventListener('click', () => {
                    Swal.fire({
                        title: 'Esta seguro que desea desactivar la caracteristica?',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#4CAF50',
                        cancelButtonColor: '#EB4848',
                        confirmButtonText: 'Aceptar',
                        cancelButtonText: 'Cancelar'
                    }).then((result) => {
                        if (result.value) {
                            Swal.fire(
                                'Listo!',
                                'La caracteristica ha sido desactivada',
                                'success'
                            )
                            inactivarCaracteristica(caractericticaa[i]['_id']);
                            setTimeout(function() {
                                window.location.reload();
                            }, 2000);
                        }
                    })
                })
            } else {
                let botonActivar = document.createElement('button');
                botonActivar.innerText = 'Activar';
                fila.appendChild(botonActivar);
                botonActivar.addEventListener('click', () => {
                    Swal.fire({
                        title: 'Esta seguro que desea reactivar la caracteristica?',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#4CAF50',
                        cancelButtonColor: '#EB4848',
                        confirmButtonText: 'Aceptar',
                        cancelButtonText: 'Cancelar'
                    }).then((result) => {
                        if (result.value) {
                            Swal.fire(
                                'Listo!',
                                'La caracteristica ha sido reactivada',
                                'success'
                            )
                            activarCaracteristica(caractericticaa[i]['_id']);
                            setTimeout(function() {
                                window.location.reload();
                            }, 2000);
                        }
                    })
                })
            }
            let botonModificar = document.createElement('button');
            botonModificar.innerText = 'Modificar';
            fila.appendChild(botonModificar);
            botonModificar.addEventListener('click', () => {
                localStorage.setItem('objectIdCaracteristica', caractericticaa[i]['_id']);
                console.log(localStorage.getItem('objectIdCaracteristica'));
                window.location.href = 'editar-caracteristica.html';
            })
            let botonEliminar = document.createElement('button');
            botonEliminar.innerText = 'Eliminar';
            fila.appendChild(botonEliminar);
            botonEliminar.addEventListener('click', () => {
                Swal.fire({
                    title: 'Esta seguro que desea eliminar la caracteristica?',
                    text: 'Esta acción no se puede revertir',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#4CAF50',
                    cancelButtonColor: '#EB4848',
                    confirmButtonText: 'Aceptar',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.value) {
                        Swal.fire(
                            'Listo!',
                            'La caracteristica ha sido eliminada',
                            'success'
                        )
                        eliminarCaracteristica(caractericticaa[i]['_id']);
                        setTimeout(function() {
                            window.location.reload();
                        }, 2000);
                    }
                })
            });
        } else {}
    }
    if (match == false) {
        tbody.innerHTML = 'No hay datos disponibles';
    }
}
mostrarDatos();
inputBusqueda.addEventListener('keyup', buscarCaracteristica);