const monedaSelect = document.querySelector('#moneda');
const criptomonedasSelect = document.querySelector('#criptomonedas');
const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');

//Crear un obj para llenar conforme el usuario vaya seleccionando los select
const objBusqueda = {
    moneda: '', 
    criptomoneda: ''
}

document.addEventListener('DOMContentLoaded', () =>{

    consultarCriptomendas();

    monedaSelect.addEventListener('change', leerValor);

    criptomonedasSelect.addEventListener('change', leerValor);

    formulario.addEventListener('submit', submitFormulario);
})


function consultarCriptomendas(){
    //const url = 'https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,JPY,EUR';
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

    fetch(url)
        .then( respuesta => respuesta.json())
        .then( resultado =>selectCriptomonedas(resultado.Data))
}

//Rellenar el select de  criptomonedas
function selectCriptomonedas(criptomonedas){

    criptomonedas.forEach( cripto => {
        //console.log(cripto);//Muestra la monedas
        const { FullName, Name} = cripto.CoinInfo;

        //Crear las opciones del select
        const option = document.createElement('option');
        option.value = Name;//EL valor de 3 digitos que es el importamte para mandar una peticion(USD, MXN)
        option.textContent = FullName;

        criptomonedasSelect.appendChild(option);
    });
}

//Rellenar el objeto
function leerValor(e){
    objBusqueda[e.target.name] = e.target.value;//Obtener el valor de los object para llenar el obj(MXN, BIT)
    // console.log(objBusqueda);
}

function submitFormulario(e){
    e.preventDefault();

    //Validar Select
    const {moneda, criptomoneda} = objBusqueda;

    if(moneda === '' || criptomoneda === ''){
        mostrarAlerta('Ambos campos son obligatorios');
        return;
    }

    // consultar la API con los resultados
    consultarAPI();
}

function mostrarAlerta(mensaje){

    const existeError = document.querySelector('.error');

    if(!existeError){

        const divMensaje = document.createElement('DIV');
        divMensaje.classList.add('error', 'animacion');

        divMensaje.textContent = mensaje;

        formulario.appendChild(divMensaje);

        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }
    
}

function consultarAPI(){
    //Mostrar spinner
    mostrarSpinner();

    const { moneda, criptomoneda } = objBusqueda;

    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

    fetch(url)
        .then( respuesta => respuesta.json())
        .then( cotizacion => mostrarCotizacionHTML(cotizacion.DISPLAY[criptomoneda][moneda]))//Esta info se saca del consultar a la API
}

function mostrarCotizacionHTML(cotizacion){

    //Antes de imprimir limpipar el HTML previo
    limpiarHTML();

    console.log(cotizacion);//Aparece mucha informacion pero no se va a utilizar toda

    const {PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE} = cotizacion;

    const precio = document.createElement('P');
    precio.classList.add('precio');
    precio.innerHTML = `El precio es:<span> ${PRICE} </span>`;

    const precioAlto = document.createElement('P');
    precioAlto.innerHTML = `<p>Precio mas alto del dia <span>${HIGHDAY}</span></p>`;

    const precioBajo = document.createElement('P');
    precioBajo.innerHTML = `<p>Precio mas bajo del dia <span>${LOWDAY}</span></p>`;

    const ultimasHoras = document.createElement('P');
    ultimasHoras.innerHTML = `<p>Precio ultimas 24 horas <span>${CHANGEPCT24HOUR}%</span></p>`;

    const ultimaActualizacion = document.createElement('P');
    ultimaActualizacion.innerHTML = `<p>Ultima actualizacion <span>${LASTUPDATE}</span></p>`;

    resultado.appendChild(precio);
    resultado.appendChild(precioAlto);
    resultado.appendChild(precioBajo);
    resultado.appendChild(ultimasHoras);
    resultado.appendChild(ultimaActualizacion);
}

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

function mostrarSpinner(){
    limpiarHTML();

    const spinner = document.createElement('DIV');

    spinner.classList.add('spinner');
    spinner.innerHTML = `
                            <div class="bounce1"></div>
                            <div class="bounce2"></div>
                            <div class="bounce3"></div>`;

    resultado.appendChild(spinner);
}