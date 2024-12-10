// Variables
const resultado = document.querySelector('#resultado');
const yearMax = new Date().getFullYear();
const yearMin = yearMax - 25;

const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const transmision = document.querySelector('#transmision');

const datosBusqueda = {
    marca: '', 
    year: '',
    minimo: '',
    maximo: '',
    transmision: '',
}

//Eventos
document.addEventListener('DOMContentLoaded', () =>{
    mostrarAutos(autos);
    llenarSelect();
});

marca.addEventListener('change', e => {
    datosBusqueda.marca = e.target.value;

    filtrarAuto();
});

year.addEventListener('change', e => {
    datosBusqueda.year = e.target.value;

    filtrarAuto();
});

maximo.addEventListener('change', e => {
    datosBusqueda.maximo = e.target.value;

    filtrarAuto();
});

minimo.addEventListener('change', e => {
    datosBusqueda.minimo = e.target.value;

    filtrarAuto();
});

transmision.addEventListener('change', e => {
    datosBusqueda.transmision = e.target.value;
    console.log(datosBusqueda)
});


//Funciones

function mostrarAutos(autos){

    limpiarHTML();

    autos.forEach(auto => {

        const {marca, modelo, year, puertas, transmision, precio, color} = auto;

        const autoHTML = document.createElement('p');
        
        autoHTML.textContent = `
            ${marca} ${modelo} - ${year} - Transmision: ${transmision} - Precio: ${precio}
        `;

        resultado.appendChild(autoHTML);
    });
}

function llenarSelect(){

    for(let i = yearMax; i >= yearMin; i--){
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;

        year.appendChild(opcion);
    }

}


// Funcion de alto nivel

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

function filtrarAuto(){
    const resultado = autos.filter( filtrarMarca ).filter( filtrarYear ).filter( filtrarMinimo ).filter( filtrarMaximo );
    
    if(resultado.length){
        mostrarAutos(resultado);
    } else {
        noResultado();
    }
}

function noResultado(){

    limpiarHTML();

    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No hay resultado';
    resultado.appendChild(noResultado);
}

function filtrarMarca(auto){
    const {marca} = datosBusqueda;
    if( marca ){
        return auto.marca === marca;
    }
    return auto;
}

function filtrarYear(auto){
    const {year} = datosBusqueda;
    if( year ){
        return auto.year === parseInt(year);
    }
    return auto;
} 

function filtrarMinimo(auto){
    const {minimo} = datosBusqueda;
    if( minimo ){
        return auto.precio >= minimo;
    }
    return auto;
}

function filtrarMaximo(auto){
    const {maximo} = datosBusqueda;
    if( maximo ){
        return auto.precio <= maximo;
    }
    return auto;
}