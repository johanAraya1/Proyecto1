const sltProvincias = document.querySelector('#sltProvincia');
const sltCantones = document.querySelector('#sltCanton');
const sltDistritos = document.querySelector('#sltDistrito');
let listaProvincias = [];
var arrayCantones = [];
// let listaProvincias = [];
// let listaSanJose = [];
// let listaAlajuela = [];


let mostrarProvincias = async() => {
    const objetoProvincias = await obtenerProvincias();

    listaProvincias = Object.values(objetoProvincias);

    for (let i = 0; i < listaProvincias.length; i++) {

        let option = document.createElement('option');
        option.text = listaProvincias[i];
        option.value = listaProvincias[i];
        sltProvincias.appendChild(option);
    }

};
mostrarProvincias();




let mostrarCantones = async() => {
    const objetoCantones = await obtenerCantones();

    let accesarObjeto1 = objetoCantones[0];
    listaSanJose = Object.values(accesarObjeto1);

    let accesarObjeto2 = objetoCantones[1];
    listaAlajuela = Object.values(accesarObjeto2);

    let accesarObjeto3 = objetoCantones[2];
    listaCartago = Object.values(accesarObjeto3);

    let accesarObjeto4 = objetoCantones[3];
    listaHeredia = Object.values(accesarObjeto4);

    let accesarObjeto5 = objetoCantones[4];
    listaGuanacaste = Object.values(accesarObjeto5);

    let accesarObjeto6 = objetoCantones[5];
    listaPuntarenas = Object.values(accesarObjeto6);

    let accesarObjeto7 = objetoCantones[6];
    listaLimon = Object.values(accesarObjeto7);

    let arrayCantones = [...listaSanJose, ...listaAlajuela, ...listaCartago, ...listaHeredia, ...listaGuanacaste, ...listaPuntarenas, ...listaLimon];


    for (let i = 0; i < arrayCantones.length; i++) {

        let option = document.createElement('option');

        option.text = arrayCantones[i];
        option.value = arrayCantones[i];
        sltCantones.appendChild(option);


    }


};



mostrarCantones();










let mostrarDistritos = async() => {
    const objetoDistritos = await obtenerDistritos();

    let dist1 = objetoDistritos[0];
    listaCentral = Object.values(dist1);

    let dist2 = objetoDistritos[1];
    listaEscazu = Object.values(dist2);

    let dist3 = objetoDistritos[2];
    desamparados = Object.values(dist3);

    let dist4 = objetoDistritos[3];
    puriscal = Object.values(dist4);

    let dist5 = objetoDistritos[4];
    tarrazu = Object.values(dist5);

    let dist6 = objetoDistritos[5];
    aserri = Object.values(dist6);

    let dist7 = objetoDistritos[6];
    mora = Object.values(dist7);

    let dist8 = objetoDistritos[7];
    goicoechea = Object.values(dist8);

    let dist9 = objetoDistritos[8];
    santaana = Object.values(dist9);

    let dist10 = objetoDistritos[9];
    alajuelita = Object.values(dist10);

    let dist11 = objetoDistritos[10];
    vazquezdecoronado = Object.values(dist11);

    let dist12 = objetoDistritos[11];
    acosta = Object.values(dist12);
    let dist13 = objetoDistritos[12];
    tibas = Object.values(dist13);

    let dist14 = objetoDistritos[13];
    moravia = Object.values(dist14);

    let dist15 = objetoDistritos[14];
    montesdeoca = Object.values(dist15);

    let dist16 = objetoDistritos[15];
    turrubares = Object.values(dist16);

    let dist17 = objetoDistritos[16];
    dota = Object.values(dist17);

    let dist18 = objetoDistritos[17];
    curridabat = Object.values(dist18);

    let dist19 = objetoDistritos[18];
    perezzeledon = Object.values(dist19);

    let dist20 = objetoDistritos[19];
    leoncortescastro = Object.values(dist20);

    let dist21 = objetoDistritos[20];
    sanramon = Object.values(dist21);

    let dist22 = objetoDistritos[21];
    grecia = Object.values(dist22);

    let dist23 = objetoDistritos[22];
    sanmateo = Object.values(dist23);

    let dist24 = objetoDistritos[23];
    paraiso = Object.values(dist24);

    let dist25 = objetoDistritos[24];
    launion = Object.values(dist25);

    let dist26 = objetoDistritos[25];
    jimenez = Object.values(dist26);

    let dist27 = objetoDistritos[26];
    barva = Object.values(dist27);

    let dist28 = objetoDistritos[27];
    santodomingo = Object.values(dist28);

    let dist29 = objetoDistritos[28];
    santabarbara = Object.values(dist29);

    let dist30 = objetoDistritos[29];
    nicoya = Object.values(dist30);
    let dist31 = objetoDistritos[30];
    santacruz = Object.values(dist31);

    let dist32 = objetoDistritos[31];
    bagaces = Object.values(dist32);

    let dist33 = objetoDistritos[32];
    esparza = Object.values(dist33);

    let dist34 = objetoDistritos[33];
    buenosaires = Object.values(dist34);

    let dist35 = objetoDistritos[34];
    montesdeoro = Object.values(dist35);

    let dist36 = objetoDistritos[35];
    pococi = Object.values(dist36);

    let dist37 = objetoDistritos[36];
    siquirres = Object.values(dist37);

    let dist38 = objetoDistritos[37];
    talamanca = Object.values(dist38);

    let listaDistritos = [...listaCentral, ...listaEscazu, ...desamparados, ...puriscal, ...tarrazu, ...aserri, ...mora, ...goicoechea, ...santaana, ...alajuelita, ...vazquezdecoronado, ...acosta, ...tibas, ...moravia, ...montesdeoca, ...turrubares, ...dota, ...curridabat, ...perezzeledon, ...leoncortescastro, ...sanramon, ...grecia, ...sanmateo, ...paraiso, ...launion, ...jimenez, ...barva, ...santodomingo, ...santabarbara, ...nicoya, ...santacruz, ...bagaces, ...esparza, ...buenosaires, ...montesdeoro, ...pococi, ...siquirres, ...talamanca];



    for (let i = 0; i < listaDistritos.length; i++) {

        let option = document.createElement('option');
        option.text = listaDistritos[i];
        option.value = listaDistritos[i];
        sltDistritos.appendChild(option);
    }


};


mostrarDistritos();