let obtenerImagen = cloudinary.createUploadWidget({

        cloudName: 'buhosapiens',
        uploadPreset: 'buhosapiens'
    }, (error, result) => {
        if (!error && result && result.event === "success") {

            document.querySelector("#fotografiaUsuario").src = result.info.secure_url;
        }

    }

)

let abrirWidget = () => {
    obtenerImagen.open();
}
document.getElementById("botonSubirImagen").addEventListener("click", abrirWidget);