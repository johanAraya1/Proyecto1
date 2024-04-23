'use strict';

let myWidget1 = cloudinary.createUploadWidget({
    cloudName: 'dpfv7ok9y',
    uploadPreset: 'ml_default'
}, (error, result) => {
    if (!error && result && result.event === "success") {
        console.log('Done! Here is the image info: ', result.info);

        document.querySelector('#imagenPrevia').src = result.info.secure_url;
    }
})

document.getElementById("btnSeleccionarIcono").addEventListener("click", function() {
    myWidget1.open();
}, false);