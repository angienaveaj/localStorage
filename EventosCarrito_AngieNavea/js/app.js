//Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');

const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');

const listacursos = document.querySelector('#lista-cursos');

const contadorCarrito = document.getElementById('cantidad-carrito');//contador
 
let articulosCarrito = []


cargarEventListeners();
function cargarEventListeners(){
    //Cuando se agrega un curso al presionar agregar al carrito
    listacursos.addEventListener('click', agregarCurso);
    //Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);
    //localstorage DOm
    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carritoRender();
    })
}

// Funciones
function agregarCurso(e){
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSelecionado = e.target.parentElement.parentElement
        leerDatosCurso(cursoSelecionado);
    }
}

// Elimina item del carrito
function eliminarCurso(e){
    console.log(e.target.classList);
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
        //elimina del arreglo
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        carritoRender(); //iterar sobre carrito y mostrar html
    }
}

// Lee el contenido html al q le dimos click y extrae la info de producto
function leerDatosCurso(curso){
    // Crear un objeto con el contenido de curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    //revisar si elemento ya existe en carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);
    if(existe){
        //actualizamos cantidad
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso;
            }else{
                return curso; 
            }
        });
        //sumatoria 
        carritoTotal()
        articulosCarrito.push();
    }else{
    // Agrega elementos al array carrito
    articulosCarrito.push(infoCurso);
    }
    console.log(articulosCarrito);

    carritoRender();
}


//Muestra carrito de compras en html
function carritoRender(){
    //limpiar html
    limpiarHTML();

    // Recorrer el carrito y crea html
    articulosCarrito.forEach( (curso) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${curso.imagen}" width="100"></td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>${curso.cantidad}</td>
            <td><a href="#" class="borrar-curso" data-id="${curso.id}"> BORRAR </td>
        `;
        //agregar el html de carrito en el tbody
        contenedorCarrito.appendChild(row);
    });
    //sumatoria 
    carritoTotal()
    //contador carrito
    contadorCarrito.innerText = articulosCarrito.length
    //actualiza total carrito
    // actualizarCarritoTotal()

    //Localstorage
    sincorizarStorage();
}
//funcion localstorage
function sincorizarStorage(){
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

// Eliminar los cursos del tbody
function limpiarHTML(){
    //
    contenedorCarrito.innerHTML = '';
}

function carritoTotal() {
    let total = 0;
    const cursoCantidadTotal = document.querySelector('.total');

    articulosCarrito.forEach((curso) => {
        const precio = Number(curso.precio.replace('$', ''));
        total = total + precio * curso.cantidad
    })
    cursoCantidadTotal.innerHTML = `Total $${total}`
}