"use strict";
const tbody = document.querySelector("#tablaTarjetasCredito tbody");
const inputBuscar = document.querySelector("#filtroTarjetas");
let listaTarjetasCredito = [];
const agregarTarjeta = document.querySelector("#botonRegistrarTarjeta");
moment.locale("es");
let enmascarar = (numero) => {
    let codigo = String(numero);
    let divisor = codigo.slice(-4);
    let protegido = String(divisor).padStart(codigo.length, "●");
    return protegido;
};
let mostrarDatos = async() => {
    let propietarioDeTarjeta = localStorage.getItem("usuarioID");
    listaTarjetasCredito = await tarjetasUsuario(propietarioDeTarjeta);
    tbody.innerHTML = "";
    for (let i = 0; i < listaTarjetasCredito.length; i++) {
        let fila = tbody.insertRow();
        //  let celdaFormaDePago = fila.insertCell().innerHTML = listaTarjetasCredito[i]["formaDePago"];
        let celdaEntidadFinanciera = fila.insertCell().innerHTML = listaTarjetasCredito[i]["entidadFinanciera"];
        let celdaNumeroTarjeta = fila.insertCell().innerHTML = enmascarar(listaTarjetasCredito[i]["numeroDeTarjeta"]);
        let celdaFechaExpiracion = fila.insertCell().innerHTML = moment(listaTarjetasCredito[i]["fechaDeExpiracion"]).format("LL");
        //  let celdaCodigoSeguridad = fila.insertCell().innerHTML = listaTarjetasCredito[i]["codigoDeSeguridad"];
        let celdaNombreEnTarjeta = fila.insertCell().innerHTML = listaTarjetasCredito[i]["nombreEnTarjeta"];
        //   let celdaPropietarioRegistrado = fila.insertCell().innerHTML = listaTarjetasCredito[i]["propietarioDeTarjeta"];
        let celdaEstado = fila.insertCell().innerHTML = listaTarjetasCredito[i]["estado"];
        let celdaEditar = fila.insertCell();
        let botonEditar = document.createElement("button");
        botonEditar.type = "button";
        botonEditar.innerText = "Editar";
        botonEditar.id = "btnEditar";
        botonEditar.addEventListener("click", () => {
            localStorage.setItem("idTarjetaCredito", listaTarjetasCredito[i]["_id"]);
            window.location.href = "modificarTarjetaCredito.html";
        });
        celdaEditar.appendChild(botonEditar);
        let celdaEliminar = fila.insertCell();
        let botonEliminar = document.createElement("button");
        botonEliminar.type = "button";
        botonEliminar.id = "btnEliminar"
        botonEliminar.innerText = "Eliminar";
        botonEliminar.addEventListener("click", () => {
            Swal.fire({
                title: "Está seguro?",
                text: "No podrá deshacer esto una vez eliminada la tarjeta.",
                icon: "warning",
                showCancelButton: "true",
                confirmButtonColor: '#3085D6',
                cancelButtonColor: '#d33',
                confirmButtonText: "Si, deseo eliminarla!",
                cancelButtonText: "Cancelar"
            }).then((result) => {
                if (result.value) {
                    eliminarTarjetaUsuario(listaTarjetasCredito[i]["_id"]);
                    Swal.fire(
                        "Tarjeta eliminada",
                        "Proceso realizado con exito!",
                        "success"
                    )
                }
            })
        });
        celdaEliminar.appendChild(botonEliminar);
        let celdaEstados = fila.insertCell();
        let boton;
        if (listaTarjetasCredito[i]["estado"] == "Activa") {
            boton = document.createElement("button");
            boton.innerText = "Desactivar";
            boton.addEventListener("click", () => {
                desactivarTarjetaCredito(listaTarjetasCredito[i]["_id"]);
                Swal.fire({
                    title: "Tarjeta deshabilitada correctamente",
                    text: "La tajeta no podrá ser utilizada mientras se encuentre desactivada.",
                    icon: "success"
                });
            })
        } else {
            boton = document.createElement("button");
            boton.innerText = "Activar";
            boton.addEventListener("click", () => {
                activarTarjetaCredito(listaTarjetasCredito[i]["_id"]);
                Swal.fire({
                    title: "La tarjeta fue habilitada correctamente!",
                    text: "Ahora puede utilizar esta tarjeta para realizar sus pagos.",
                    icon: "success"
                });
            })
        }
        boton.type = "button";
        boton.id = "btnActivar";
        celdaEstados.appendChild(boton);
    }
};
let filtrarTarjetasCredito = () => {
    tbody.innerHTML = "";
    let filtro = inputBuscar.value.toUpperCase();
    let coincidencias = false;
    if (filtro != "") {
        for (let i = 0; i < listaTarjetasCredito.length; i++) {
            if (listaTarjetasCredito[i].entidadFinanciera.toUpperCase().includes(filtro) || listaTarjetasCredito[i].numeroDeTarjeta.toString().includes(filtro) || listaTarjetasCredito[i].nombreEnTarjeta.includes(filtro)) {
                let fila = tbody.insertRow();
                //  let celdaFormaDePago = fila.insertCell().innerHTML = listaTarjetasCredito[i]["formaDePago"];
                let celdaEntidadFinanciera = fila.insertCell().innerHTML = listaTarjetasCredito[i]["entidadFinanciera"];
                let celdaNumeroTarjeta = fila.insertCell().innerHTML = enmascarar(listaTarjetasCredito[i]["numeroDeTarjeta"]);
                let celdaFechaExpiracion = fila.insertCell().innerHTML = moment(listaTarjetasCredito[i]["fechaDeExpiracion"]).format("LL");
                //  let celdaCodigoSeguridad = fila.insertCell().innerHTML = listaTarjetasCredito[i]["codigoDeSeguridad"];
                let celdaNombreEnTarjeta = fila.insertCell().innerHTML = listaTarjetasCredito[i]["nombreEnTarjeta"];
                //  let celdaPropietarioRegistrado = fila.insertCell().innerHTML = listaTarjetasCredito[i]["propietarioDeTarjeta"];
                let celdaEstado = fila.insertCell().innerHTML = listaTarjetasCredito[i]["estado"];
                let celdaEditar = fila.insertCell();
                let botonEditar = document.createElement("button");
                botonEditar.type = "button";
                botonEditar.id = "btnEditar";
                botonEditar.innerText = "Editar";
                botonEditar.addEventListener("click", () => {
                    localStorage.setItem("idTarjetaCredito", listaTarjetasCredito[i]["_id"]);
                    window.location.href = "modificarTarjetaCredito.html";
                });
                celdaEditar.appendChild(botonEditar);
                let celdaEliminar = fila.insertCell();
                let botonEliminar = document.createElement("button");
                botonEliminar.type = "button";
                botonEliminar.id = "btnEliminar";
                botonEliminar.innerText = "Eliminar";
                botonEliminar.addEventListener("click", () => {
                    Swal.fire({
                        title: "Está seguro?",
                        text: "No podrá deshacer esto una vez eliminada la tarjeta.",
                        icon: "warning",
                        showCancelButton: "true",
                        confirmButtonColor: '#3085D6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: "Si, deseo eliminarla!",
                        cancelButtonText: "Cancelar"
                    }).then((result) => {
                        if (result.value) {
                            eliminarTarjetaUsuario(listaTarjetasCredito[i]["_id"]);
                            Swal.fire(
                                "Tarjeta eliminada",
                                "Proceso realizado con exito!",
                                "success"
                            )
                        }
                    })
                });
                celdaEliminar.appendChild(botonEliminar);
                let celdaEstados = fila.insertCell();
                let boton;
                if (listaTarjetasCredito[i]["estado"] == "Activa") {
                    boton = document.createElement("button");
                    boton.innerText = "Desactivar";
                    boton.addEventListener("click", () => {
                        Swal.fire({
                            title: "Tarjeta deshabilitada correctamente",
                            text: "La tajeta no podrá ser utilizada mientras se encuentre desactivada.",
                            icon: "success"
                        });
                    })
                } else {
                    boton = document.createElement("button");
                    boton.innerText = "Activar";
                    boton.addEventListener("click", () => {
                        Swal.fire({
                            title: "La tarjeta fue habilitada correctamente!",
                            text: "Ahora puede utilizar esta tarjeta para realizar sus pagos.",
                            icon: "success"
                        });
                    })
                }
                boton.type = "button";
                boton.id = "btnActivar";
                celdaEstados.appendChild(boton);
                coincidencias = true;
            }
        }
        if (coincidencias == false) {
            tbody.innerHTML = "No hay coincidencias";
        }
    } else {
        mostrarDatos();
    }
};
mostrarDatos();
inputBuscar.addEventListener("input", filtrarTarjetasCredito);
agregarTarjeta.addEventListener("click", () => {
    window.location.href = "registrarTarjetaCredito.html";
});