'use strict';

let singup = async(correo, password, pNombre, identificacion) => {
    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/signup',
        responseType: 'json',
        data: {
            correo: correo,
            password: password,
            nombre: pNombre,
            identificacion: identificacion
        }

    }).then((response) => {
        console.log(response.data);
    }).catch((error) => {
        console.log(error);
    });
};


let registrarUsuario = async(correo, password, tipoUsuario, pNombre, sNombre, pApellido, sApellido, tipoPersona, tIdentificacion, nIdentificacion, genero, nTelefono, profesion, monto, tarifa, inputCargosAdicionales, categorias, provincia, canton, distrito, estado, imagen) => {
    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/registrar-usuarios',
        responseType: 'json',
        data: {
            tipoDeUsuario: tipoUsuario,
            primerNombre: pNombre,
            segundoNombre: sNombre,
            primerApellido: pApellido,
            segundoApellido: sApellido,
            tipoDePersona: tipoPersona,
            tipoDeIdentificacion: tIdentificacion,
            numeroDeIdentificacion: nIdentificacion,
            genero: genero,
            numeroDeTelefono: nTelefono,
            profesion: profesion,
            montoBase: monto,
            tarifaPlataforma: tarifa,
            cargosAdicionales: inputCargosAdicionales,
            provincia: provincia,
            canton: canton,
            distrito: distrito,
            estado: estado,
            img: imagen

        }
    }).then((res) => {
        let identificacion = res.data.usuarioDB._id;
        singup(correo, password, pNombre, identificacion);
        registrarCategorias(res.data.usuarioDB, categorias);
        console.log(res.data);

    }).catch((err) => {
        console.log(err);
    });
};

let obtenerProvincias = async() => {

    let listaProvincias = [];

    await axios({
        method: 'get',
        url: 'https://ubicaciones.paginasweb.cr/provincias.json',
        responseType: 'json'
    }).then((res) => {
        listaProvincias = res.data;
    }).catch((err) => {
        console.log('No se pudo establecer la comunicacion con el servidor por el siguiente error: ', err);
    });
    return listaProvincias;
};

let obtenerCantones = async() => {

    let listaSanJose = [];
    let listaAlajuela = [];
    let listaCartago = [];
    let listaHeredia = [];
    let listaGuanacaste = [];
    let listaPuntarenas = [];
    let listaLimon = [];

    await Promise.all([
        axios.get('https://ubicaciones.paginasweb.cr/provincia/1/cantones.json'),
        axios.get('https://ubicaciones.paginasweb.cr/provincia/2/cantones.json'),
        axios.get('https://ubicaciones.paginasweb.cr/provincia/3/cantones.json'),
        axios.get('https://ubicaciones.paginasweb.cr/provincia/4/cantones.json'),
        axios.get('https://ubicaciones.paginasweb.cr/provincia/5/cantones.json'),
        axios.get('https://ubicaciones.paginasweb.cr/provincia/6/cantones.json'),
        axios.get('https://ubicaciones.paginasweb.cr/provincia/7/cantones.json')
    ]).then(([resProv1, resProv2, resProv3, resProv4, resProv5, resProv6, resProv7]) => {
        listaSanJose = resProv1.data;
        listaAlajuela = resProv2.data;
        listaCartago = resProv3.data;
        listaHeredia = resProv4.data;
        listaGuanacaste = resProv5.data;
        listaPuntarenas = resProv6.data;
        listaLimon = resProv7.data;

    })

    return [listaSanJose, listaAlajuela, listaCartago, listaHeredia, listaGuanacaste, listaPuntarenas, listaLimon];

};

let obtenerDistritos = async() => {

    let listaCentral = [];
    let listaEscazu = [];
    let desamparados;
    let puriscal;
    let tarrazu;
    let aserri;
    let mora;
    let goicoechea;
    let santaana;
    let alajuelita;
    let vazquezdecoronado;
    let acosta;
    let tibas;
    let moravia;
    let montesdeoca;
    let turrubares;
    let dota;
    let curridabat;
    let perezzeledon;
    let leoncortescastro;
    let sanramon;
    let grecia;
    let sanmateo;
    let paraiso;
    let launion;
    let jimenez;
    let barva;
    let santodomingo;
    let santabarbara;
    let nicoya;
    let santacruz;
    let bagaces;
    let esparza;
    let buenosaires;
    let montesdeoro;
    let pococi;
    let siquirres;
    let talamanca;


    await Promise.all([
        axios.get('https://ubicaciones.paginasweb.cr/provincia/1/canton/1/distritos.json'),
        axios.get('https://ubicaciones.paginasweb.cr/provincia/1/canton/2/distritos.json'),
        axios.get('https://ubicaciones.paginasweb.cr/provincia/1/canton/3/distritos.json'),
        axios.get('https://ubicaciones.paginasweb.cr/provincia/1/canton/4/distritos.json'),
        axios.get('https://ubicaciones.paginasweb.cr/provincia/1/canton/5/distritos.json'),
        axios.get('https://ubicaciones.paginasweb.cr/provincia/1/canton/6/distritos.json'),
        axios.get('https://ubicaciones.paginasweb.cr/provincia/1/canton/7/distritos.json'),
        axios.get('https://ubicaciones.paginasweb.cr/provincia/1/canton/8/distritos.json'),
        axios.get('https://ubicaciones.paginasweb.cr/provincia/1/canton/9/distritos.json'),
        axios.get('https://ubicaciones.paginasweb.cr/provincia/1/canton/10/distritos.json'),
        axios.get('https://ubicaciones.paginasweb.cr/provincia/1/canton/11/distritos.json'),
        axios.get('https://ubicaciones.paginasweb.cr/provincia/1/canton/12/distritos.json'),
        axios.get('https://ubicaciones.paginasweb.cr/provincia/1/canton/13/distritos.json'),
        axios.get('https://ubicaciones.paginasweb.cr/provincia/1/canton/14/distritos.json'),
        axios.get('https://ubicaciones.paginasweb.cr/provincia/1/canton/15/distritos.json'),
        axios.get('https://ubicaciones.paginasweb.cr/provincia/1/canton/16/distritos.json'),
        axios.get('https://ubicaciones.paginasweb.cr/provincia/1/canton/17/distritos.json'),
        axios.get('https://ubicaciones.paginasweb.cr/provincia/1/canton/18/distritos.json'),
        axios.get('https://ubicaciones.paginasweb.cr/provincia/1/canton/19/distritos.json'),
        axios.get('https://ubicaciones.paginasweb.cr/provincia/1/canton/20/distritos.json'),
        axios.get('https://ubicaciones.paginasweb.cr/provincia/2/canton/1/distritos.json'),
        axios.get('https://ubicaciones.paginasweb.cr/provincia/2/canton/2/distritos.json'),
        axios.get('https://ubicaciones.paginasweb.cr/provincia/2/canton/3/distritos.json'),
        axios.get('https://ubicaciones.paginasweb.cr/provincia/3/canton/1/distritos.json'),
        axios.get('https://ubicaciones.paginasweb.cr/provincia/3/canton/2/distritos.json'),
        axios.get('https://ubicaciones.paginasweb.cr/provincia/3/canton/3/distritos.json'),
        axios.get('https://ubicaciones.paginasweb.cr/provincia/4/canton/1/distritos.json'),
        axios.get('https://ubicaciones.paginasweb.cr/provincia/4/canton/2/distritos.json'),
        axios.get('https://ubicaciones.paginasweb.cr/provincia/4/canton/3/distritos.json'),
        axios.get('https://ubicaciones.paginasweb.cr/provincia/5/canton/1/distritos.json'),
        axios.get('https://ubicaciones.paginasweb.cr/provincia/5/canton/2/distritos.json'),
        axios.get('https://ubicaciones.paginasweb.cr/provincia/5/canton/3/distritos.json'),
        axios.get('https://ubicaciones.paginasweb.cr/provincia/6/canton/1/distritos.json'),
        axios.get('https://ubicaciones.paginasweb.cr/provincia/6/canton/2/distritos.json'),
        axios.get('https://ubicaciones.paginasweb.cr/provincia/6/canton/3/distritos.json'),
        axios.get('https://ubicaciones.paginasweb.cr/provincia/7/canton/1/distritos.json'),
        axios.get('https://ubicaciones.paginasweb.cr/provincia/7/canton/2/distritos.json'),
        axios.get('https://ubicaciones.paginasweb.cr/provincia/7/canton/3/distritos.json')

    ]).then(([resProv1Can1, resProv1Can2, resProv1Can3, resProv1Can4, resProv1Can5, resProv1Can6, resProv1Can7, resProv1Can8, resProv1Can9, resProv1Can10, resProv1Can11, resProv1Can12, resProv1Can13, resProv1Can14, resProv1Can15, resProv1Can16, resProv1Can17, resProv1Can18, resProv1Can19, resProv1Can20, resProv2Can1, resProv2Can2, resProv2Can3, resProv3Can1, resProv3Can2, resProv3Can3, resProv4Can1, resProv4Can2, resProv4Can3, resProv5Can1, resProv5Can2, resProv5Can3, resProv6Can1, resProv6Can2, resProv6Can3, resProv7Can1, resProv7Can2, resProv7Can3]) => {
        listaCentral = resProv1Can1.data;
        listaEscazu = resProv1Can2.data;
        desamparados = resProv1Can3.data;
        puriscal = resProv1Can4.data;
        tarrazu = resProv1Can5.data;
        aserri = resProv1Can6.data;
        mora = resProv1Can7.data;
        goicoechea = resProv1Can8.data;
        santaana = resProv1Can9.data;
        alajuelita = resProv1Can10.data;
        vazquezdecoronado = resProv1Can11.data;
        acosta = resProv1Can12.data;
        tibas = resProv1Can13.data;
        moravia = resProv1Can14.data;
        montesdeoca = resProv1Can15.data;
        turrubares = resProv1Can16.data;
        dota = resProv1Can17.data;
        curridabat = resProv1Can18.data;
        perezzeledon = resProv1Can19.data;
        leoncortescastro = resProv1Can20.data;
        sanramon = resProv2Can1.data,
            grecia = resProv2Can2.data;
        sanmateo = resProv2Can3.data;
        paraiso = resProv3Can1.data;
        launion = resProv3Can2.data;
        jimenez = resProv3Can3.data;
        barva = resProv4Can1.data;
        santodomingo = resProv4Can2.data;
        santabarbara = resProv4Can3.data;
        nicoya = resProv5Can1.data;
        santacruz = resProv5Can2.data;
        bagaces = resProv5Can3.data;
        esparza = resProv6Can1.data;
        buenosaires = resProv6Can2.data;
        montesdeoro = resProv6Can3.data;
        pococi = resProv7Can1.data;
        siquirres = resProv7Can2.data;
        talamanca = resProv7Can3.data;


    });

    return [listaCentral, listaEscazu, desamparados, puriscal, tarrazu, aserri, mora, goicoechea, santaana, alajuelita, vazquezdecoronado, acosta, tibas, moravia, montesdeoca, turrubares, dota, curridabat, perezzeledon, leoncortescastro, sanramon, grecia, sanmateo, paraiso, launion, jimenez, barva, santodomingo, santabarbara, nicoya, santacruz, bagaces, esparza, buenosaires, montesdeoro, pococi, siquirres, talamanca];
};

let registrarCategorias = async(_id, categorias) => {
    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/registrar-categorias',
        responseType: 'json',
        data: {
            '_id': _id,
            'categorias': categorias
        }
    }).then((res) => {
        if (res.data.resultado == false) {
            console.log('No se pudieron agregar las categorias');
        } else {
            console.log('Las categorias se registraron correctamente');
        }
    }).catch((err) => {
        console.log(err);
    });
};