'use strict';
const tbody = document.querySelector('#tblCategorias tbody');
const buscar = document.querySelector('#txtFiltro');
let listaTipoDeSiniestro = [];


let mostrarDatos = async() => {

    listaTipoDeSiniestro = await listarTipoDeSiniestro();
    tbody.innerHTML = '';

    for (let i = 0; i < listaTipoDeSiniestro.length; i++) {
        let fila = tbody.insertRow();

        let categoria = document.createElement("h2");
        categoria.innerText = listaTipoDeSiniestro[i]['tipoSiniestro'];
        categoria.classList.add("tablaCategoria");
        fila.insertCell().appendChild(categoria);

        let MostrarDescripcion = document.createElement("h3");

        MostrarDescripcion.innerText = listaTipoDeSiniestro[i]['descripcion'];
        MostrarDescripcion.classList.add("MostrarDescripcion");
        fila.insertCell().appendChild(MostrarDescripcion);

        let btnModificar = document.createElement("button");
        btnModificar.type = "button";
        btnModificar.innerText = "Modificar";
        btnModificar.classList.add("btnModificar");
        btnModificar.addEventListener("click", () => {
            localStorage.setItem("idCategoria", listaTipoDeSiniestro[i]["_id"]);
            window.location.href = "modificarCategoriaIncidente.html";
        })
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
                    eliminarTipoDeSiniestro(listaTipoDeSiniestro[i]['_id']);
                    Swal.fire(
                        'Proceso realizado con éxito!',
                        'La categoría ha sido eliminada',
                        'success'
                    )
                }
            })



        })


        let celdaEstados = fila.insertCell();
        let botonEstados = document.createElement('button');
        botonEstados.type = 'button';
        if (listaTipoDeSiniestro[i]['estado'] == 'activo') {
            botonEstados.classList.add('btnEstadoDesactivado');
            botonEstados.innerText = 'Desactivar';
            botonEstados.addEventListener('click', () => {
                deshabilitarTipoDeSiniestro(listaTipoDeSiniestro[i]['_id']);
            })
        } else {
            botonEstados.classList.add('btnEstadoActivado');
            botonEstados.innerText = 'Activar';
            botonEstados.addEventListener('click', () => {
                habilitarTipoDeSiniestro(listaTipoDeSiniestro[i]['_id']);
            })
        }
        celdaEstados.appendChild(botonEstados);

        // let categoria = fila.insertCell().innerHTML = listaTipoDeSiniestro[i]['tipoSiniestro'];

    }


}

let filtrarDatos = () => {
    tbody.innerHTML = '';
    let filtro = buscar.value.toLowerCase();
    console.log(filtro);
    let hayCoincidencias = false;

    for (let i = 0; i < listaTipoDeSiniestro.length; i++) {
        let tipoSiniestro = listaTipoDeSiniestro[i]['tipoSiniestro'].toLowerCase();

        if (tipoSiniestro.includes(filtro)) {
            let fila = tbody.insertRow();
            let categoria = document.createElement("h2");
            categoria.innerText = listaTipoDeSiniestro[i]['tipoSiniestro'];
            categoria.classList.add("tablaCategoria");
            fila.insertCell().appendChild(categoria);

            let MostrarDescripcion = document.createElement("h3");

            MostrarDescripcion.innerText = listaTipoDeSiniestro[i]['descripcion'];
            MostrarDescripcion.classList.add("MostrarDescripcion");
            fila.insertCell().appendChild(MostrarDescripcion);

            let btnModificar = document.createElement("button");
            btnModificar.type = "button";
            btnModificar.innerText = "Modificar";
            btnModificar.classList.add("btnModificar");
            btnModificar.addEventListener("click", () => {
                localStorage.setItem("idCategoria", listaTipoDeSiniestro[i]["_id"]);
                window.location.href = "modificarCategoriaIncidente.html";
            })
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
                        eliminarTipoDeSiniestro(listaTipoDeSiniestro[i]['_id']);
                        Swal.fire(
                            'Proceso realizado con éxito!',
                            'La categoría ha sido eliminada',
                            'success'
                        )
                    }
                })



            })



            let celdaEstados = fila.insertCell();
            let botonEstados = document.createElement('button');
            botonEstados.type = 'button';
            if (listaTipoDeSiniestro[i]['estado'] == 'activo') {
                botonEstados.classList.add('btnEstadoDesactivado');
                botonEstados.innerText = 'Desactivar';
                botonEstados.addEventListener('click', () => {
                    deshabilitarTipoDeSiniestro(listaTipoDeSiniestro[i]['_id']);
                })
            } else {
                botonEstados.classList.add('btnEstadoActivado');
                botonEstados.innerText = 'Activar';
                botonEstados.addEventListener('click', () => {
                    habilitarTipoDeSiniestro(listaTipoDeSiniestro[i]['_id']);
                })
            }
            celdaEstados.appendChild(botonEstados);

            hayCoincidencias = true;

        }

    };

    if (hayCoincidencias == false) {
        tbody.innerHTML = 'No hay datos que mostrar';
    }
};

mostrarDatos();
txtFiltro.addEventListener('keyup', filtrarDatos);