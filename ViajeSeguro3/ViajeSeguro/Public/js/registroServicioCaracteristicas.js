'use strict';

let validarRepetidos = async(pRegistro) =>{
    let listar = await listarCaracteristica();
    let repetido = false;
    for (let i = 0; i < listar.length; i++) {
        
        if (pRegistro == listar[i].caracteristica) {
            repetido = true;
            
        }else{
            repetido = false;
            
        }
        return repetido;
    }
}



let registrarCaracteristica = async(pCaracteristica) => {
    let repetido = await validarRepetidos(pCaracteristica);
    if (repetido == false) {
     await axios({
            method: 'post',
            url: 'http://localhost:3000/api/registrarCaracteristica',
            responseType: 'json',
            data: {
                'caracteristica': pCaracteristica
            }
        }).then(function(res) {
            
        })
        .catch(function(err) {

        });   
    }else{
        Swal.fire({
            title: 'Error',
            text: 'La característica ya se almacenó anteriormente',
            icon: 'error'
        })
    }
    
};


let listarCaracteristica = async() => {
    let listaCaracteristica = [];
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listarCaracteristica',
        responseType: 'json',
    }).then((res) => {
        listaCaracteristica = res.data.listaCaracteristica
    }).catch((err) => {
        console.log('No se pudo establecer la comunicación con el servidor, ocurrió el siguiente error: ', err)
    });
    console.log(listaCaracteristica);
    return listaCaracteristica;
   
};

listarCaracteristica();

