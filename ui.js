import { configEstilosBotones, configEstiloUItarea } from './style_atributes.js'
import { agregarTareas, getTareas, renderizar } from './datos.js'
// Constantes para obtener el formulario, la tarea ingresada, y las listas de tareas
const Formulario = document.querySelector('[data-js="form-1"]')
const tareaIngresada = document.querySelector('[data-js="input-text-1"]')
const TareasPorHacer = document.querySelector('[data-js="list-task-1"]');
const TareasEnProceso = document.querySelector('[data-js="list-task-2"]');
const TareasCompletadas = document.querySelector('[data-js="list-task-3"]');
const BotonesEliminar = document.querySelectorAll('[data-js="btn-eliminar"]');


Formulario.addEventListener("submit", function(event){ // Obtener la tarea del formulario 
    event.preventDefault();
    if(tareaIngresada.value.trim() == "") return;
    console.log("Tarea Añadida: ",tareaIngresada.value);
    const TareaNueva = agregarTareas(tareaIngresada);
    crearNuevaTarea(TareaNueva);
    tareaIngresada.value = "";
    tareaIngresada.focus();
})

renderizar();
listarTareas();

BotonesEliminar.forEach(boton => {
    boton.addEventListener('click', event =>{
        if(confirm('GG?')){
            const bloque = event.target.parentNode.parentNode
            console.log(bloque);
        }
    })
})

console.log(BotonesEliminar);

function listarTareas(){
    const tareas = getTareas();
    tareas.forEach(tarea => {
        crearNuevaTarea(tarea);
    });
}


function crearNuevaTarea(tarea){
    const BloquePrincipal = crearNuevaUITarea(tarea);
    TareasPorHacer.appendChild(BloquePrincipal);
}

function crearBotonesPorHacer(bloque){
    const Boton = document.createElement("button");
    Boton.setAttribute("class",configEstilosBotones['Comenzando']);
    Boton.innerHTML = '<i class="fi fi-rr-angle-right"></i>';
    bloque.appendChild(Boton);
}

function crearBotonesEliminar(bloque){
    const Boton = document.createElement("button");
    Boton.setAttribute("data-js","btn-eliminar");
    Boton.setAttribute("class",configEstilosBotones['Eliminar']);
    Boton.innerHTML = '<i class="fi fi-rr-trash"></i>';
    bloque.appendChild(Boton);
}
/*
function borrarBotonEliminar(){
    BotonesEliminar.forEach(boton => {
        boton.addEventListener('click', event =>{
            if(confirm('GG?')){
                const bloque = event.target.parentNode.parentNode
                console.log(bloque);
            }
        })
    })
}*/

function crearNuevaUITarea(tarea){
    const NuevaTarea = {...tarea};
    const BloqueTareaNueva = document.createElement("li");
    const BloquePrincipal = document.createElement("div");
    BloquePrincipal.setAttribute("class",configEstiloUItarea[1]);
    const BloqueTexto = document.createElement("div");
    const BloqueBoton = document.createElement("div");
    BloquePrincipal.setAttribute("class",configEstiloUItarea[2]);
    const Texto = document.createElement("span");
    Texto.textContent = NuevaTarea.texto;
    BloqueTexto.appendChild(Texto);
    crearBotonesPorHacer(BloqueBoton);
    crearBotonesEliminar(BloqueBoton);
    BloquePrincipal.appendChild(BloqueTexto);
    BloquePrincipal.appendChild(BloqueBoton);
    BloqueTareaNueva.appendChild(BloquePrincipal);
    
    return BloqueTareaNueva;
}


