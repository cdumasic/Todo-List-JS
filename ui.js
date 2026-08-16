import { configEstilosBotones } from './style_atributes.js'
import { agregarTareas, renderizar } from './datos.js'
// Constantes para obtener el formulario, la tarea ingresada, y las listas de tareas
const Formulario = document.querySelector('[data-js="form-1"]')
const tareaIngresada = document.querySelector('[data-js="input-text-1"]')
const TareasPorHacer = document.querySelector('[data-js="list-task-1"]');
const TareasEnProceso = document.querySelector('[data-js="list-task-2"]');
const TareasCompletadas = document.querySelector('[data-js="list-task-3"]');

Formulario.addEventListener("submit", function(event){ // Obtener la tarea del formulario 
    event.preventDefault();
    if(tareaIngresada.value.trim() == "") return;
    console.log("Tarea Añadida: ",tareaIngresada.value);
    agregarTareas(tareaIngresada.value);
    tareaIngresada.value = "";
    tareaIngresada.focus();
})

renderizar();
