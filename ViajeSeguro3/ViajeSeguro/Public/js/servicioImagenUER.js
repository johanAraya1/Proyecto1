'use strict';

// let myWidget1 = cloudinary.createUploadWidget({

//     cloudName: 'dnglop0de',
//     uploadPreset: 'tkiorw5g'
// }, (error, result) => {

//     if (!error && result.event === "success") {
//         console.log('Done! Here is the image info:', result.info);
//         document.querySelector('#foto').src = result.info.secure_url;
//     }

// })
// document.getElementById('btnFoto').addEventListener("click", function() {
//     myWidget1.open();
// }, false);

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