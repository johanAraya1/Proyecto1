'use strict';
let myWidget1 = cloudinary.createUploadWidget({
    cloudName: 'buhosapiens',
    uploadPreset: 'buhosapiens'
}, (error, result) => {
    if (!error && result && result.event === "success") {
        console.log('Done! Here is the image info: ', result.info);
        document.querySelector('#fotoUsuario').src = result.info.secure_url;
    }
})

document.getElementById("btnFoto").addEventListener("click", function() {
    myWidget1.open();
}, false);