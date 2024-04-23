"use strict"

const tablaDeRutas = document.querySelector("#tablaRutas tbody");
const filtroRutas = document.querySelector("#txtNombre");
let listaDeRutas = [];

let mostrarDatos = async() => {
    listaDeRutas = await buscarRutas();
    tablaDeRutas.innerHTML = "";
    for (let i = 0; i < listaDeRutas.length; i++) {
        let fila = tablaDeRutas.insertRow();

        let nombre = document.createElement("p");
        nombre.innerText = listaDeRutas[i].nombre;
        nombre.id = "celdaNombre";
        let celdaNombre = fila.insertCell().innerHTML = nombre.innerText;

        let descripcion = document.createElement("p");
        descripcion.innerText = listaDeRutas[i].descripcion;
        descripcion.id = "celdaDescripcion";
        let celdaDescripcion = fila.insertCell().innerHTML = descripcion.innerText;

        // let coordenadas = document.createElement("p");
        // coordenadas.innerText = listaDeRutas[i].coordenadas;
        // coordenadas.id = "celdaCoordenadas";
        // let celdaCoordenadas = fila.insertCell().innerHTML = coordenadas.innerText;


        let celdaEditar = fila.insertCell();
        let botonEditar = document.createElement("button");
        botonEditar.type = "button";
        botonEditar.classList.add("btnEditar");
        botonEditar.innerText = "Editar";
        botonEditar.addEventListener("click", () => {
            localStorage.setItem("idRuta", listaDeRutas[i]["_id"]);
            window.location.href = "";
        });
        celdaEditar.appendChild(botonEditar);

        let celdaEliminar = fila.insertCell();
        let botonEliminar = document.createElement("button");
        botonEliminar.type = "button";
        botonEliminar.classList.add("btnEliminar");
        botonEliminar.innerText = "Eliminar";
        botonEliminar.addEventListener("click", () => {
            Swal.fire({
                title: "Está seguro?",
                text: "No podrá deshacer esto una vez eliminada la ruta.",
                icon: "warning",
                showCancelButton: "true",
                confirmButtonColor: '#3085D6',
                cancelButtonColor: '#d33',
                confirmButtonText: "Si, deseo eliminarla!",
                cancelButtonText: "Cancelar"
            }).then((result) => {
                if (result.value) {
                    eliminarRuta(listaDeRutas[i]["_id"]);
                }
            })

        });
        celdaEliminar.appendChild(botonEliminar);


        let celdaEstados = fila.insertCell();
        let botonEstados = document.createElement("button");
        botonEstados.type = "button";
        // botonEstados.classList.add("btnEstados");
        if (listaDeRutas[i]["estado"] == "activo") {
            botonEstados.innerText = "Desactivar";
            botonEstados.classList.add('btnEstadoDesactivado');
            botonEstados.addEventListener("click", () => {
                deshabilitarRuta(listaDeRutas[i]['_id']);
            });
        } else {
            botonEstados.classList.add('btnEstadoActivado');
            botonEstados.innerText = "Activar";
            botonEstados.addEventListener("click", () => {
                habilitarRuta(listaDeRutas[i]['_id']);
            });
        }
        celdaEstados.appendChild(botonEstados);
    }
};

let filtrarRutas = () => {
    tablaDeRutas.innerHTML = "";
    let coincidencias = false;
    let filtro = filtroRutas.value.toLowerCase();

    if (filtro != "") {

        for (let i = 0; i < listaDeRutas.length; i++) {
            if (listaDeRutas[i].nombre.toLowerCase().includes(filtro) || listaDeRutas[i].descripcion.toLowerCase().includes(filtro)) {
                let fila = tablaDeRutas.insertRow();

                let nombre = document.createElement("p");
                nombre.innerText = listaDeRutas[i].nombre;
                nombre.id = "celdaNombre";
                let celdaNombre = fila.insertCell().innerHTML = nombre.innerText;

                let descripcion = document.createElement("p");
                descripcion.innerText = listaDeRutas[i].descripcion;
                descripcion.id = "celdaDescripcion";
                let celdaDescripcion = fila.insertCell().innerHTML = descripcion.innerText;

                // let coordenadas = document.createElement("p");
                // coordenadas.innerText = listaDeRutas[i].coordenadas;
                // coordenadas.id = "celdaCoordenadas";
                // let celdaCoordenadas = fila.insertCell().innerHTML = coordenadas.innerText;

                let celdaEditar = fila.insertCell();
                let botonEditar = document.createElement("button");
                botonEditar.type = "button";
                botonEditar.classList.add("btnEditar");
                botonEditar.innerText = "Editar";
                botonEditar.addEventListener("click", () => {
                    localStorage.setItem("idRuta", listaDeRutas[i]["_id"]);
                    window.location.href = "";
                });
                celdaEditar.appendChild(botonEditar);

                let celdaEliminar = fila.insertCell();
                let botonEliminar = document.createElement("button");
                botonEliminar.type = "button";
                botonEliminar.classList.add("btnEliminar");
                botonEliminar.innerText = "Eliminar";
                botonEliminar.addEventListener("click", () => {
                    Swal.fire({
                        title: "Está seguro?",
                        text: "No podrá deshacer esto una vez eliminada la ruta.",
                        icon: "warning",
                        showCancelButton: "true",
                        confirmButtonColor: '#3085D6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: "Si, deseo eliminarla!",
                        cancelButtonText: "Cancelar"
                    }).then((result) => {
                        if (result.value) {
                            eliminarRuta(listaDeRutas[i]["_id"]);
                        }
                    })
                });
                celdaEliminar.appendChild(botonEliminar);

                let celdaEstados = fila.insertCell();
                let botonEstados = document.createElement("button");
                botonEstados.type = "button";
                // botonEstados.classList.add("btnEstados");
                if (listaDeRutas[i]["estado"] == "activo") {
                    botonEstados.innerText = "Desactivar";
                    botonEstados.classList.add('btnEstadoDesactivado');
                    botonEstados.addEventListener("click", () => {
                        deshabilitarRuta(listaDeRutas[i]['_id']);
                    });
                } else {
                    botonEstados.classList.add('btnEstadoActivado');
                    botonEstados.innerText = "Activar";
                    botonEstados.addEventListener("click", () => {
                        habilitarRuta(listaDeRutas[i]['_id']);
                    });
                }
                celdaEstados.appendChild(botonEstados);
                coincidencias = true;
            }
        }

    } else {
        mostrarDatos();
    }
};



mostrarDatos();
filtroRutas.addEventListener("input", filtrarRutas);