'use stict';
let obtenerImagen = cloudinary.createUploadWidget({
    cloudName: 'buhosapiens',
    uploadPreset: 'buhosapiens'
}, (error, result) => {
    if (!error && result && result.event === "success") {
        console.log('Hemos terminado! Este es el enlace de la imagen: ', result.info);
        document.querySelector("#foto").src = result.info.secure_url;
    }
})
let abrirWidget = () => {
    obtenerImagen.open();
}
document.getElementById("btnFoto").addEventListener("click", abrirWidget);