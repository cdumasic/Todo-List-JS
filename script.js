import { configEstilosBotones } from './style_atributes.js'
// Constantes para obtener el formulario, la tarea ingresada, y las listas de tareas
const Formulario = document.querySelector('[data-js="form-1"]')
const tareaIngresada = document.querySelector('[data-js="input-text-1"]')
const TareasPorHacer = document.querySelector('[data-js="list-task-1"]');
const TareasEnProceso = document.querySelector('[data-js="list-task-2"]');
const TareasCompletadas = document.querySelector('[data-js="list-task-3"]');
const tareasGuardadas = localStorage.getItem("tareas"); // Constante para guardar tareas

let tareas = []; // Variable para las tareas en general

function EstadoPorHacer(TareaNueva,tarea){ // Pone una tarea en estado por hacer
    TareasPorHacer.appendChild(TareaNueva);
    CrearElementos(TareaNueva,tarea,"Comenzando","en-proceso");
}
function EstadoEnProceso(TareaNueva,tarea){ // Pone una tarea en estado en proceso
    TareasEnProceso.appendChild(TareaNueva);
    CrearElementos(TareaNueva,tarea,"Deshacer","por-hacer")
    CrearElementos(TareaNueva,tarea,"Completado","completado")
}
function EstadoCompletado(TareaNueva,tarea){ // Pone una tarea en estado completado
    TareasCompletadas.appendChild(TareaNueva);
    CrearElementos(TareaNueva,tarea,"Deshacer","en-proceso")
    const Boton5 = CrearBotones("Eliminar");
    Boton5.onclick = () => {
        tareas = tareas.filter(t => t.id !== tarea.id);
        GuardarTareas();
        RenderTareas();
    }
    TareaNueva.appendChild(Boton5);
}

function AgregarTareas(texto){ // Añade una nueva tarea con id, texto y estado
    const TareaNueva = {
        id: Date.now(),
        texto: texto,
        estado: "por-hacer"
    };
    tareas.push(TareaNueva);
    GuardarTareas();
    RenderTareas();
}

function CambiarEstado(id,nuevoEstado){ // Cambia el estado de una tarea
    const tarea = tareas.find(t => t.id === id);
    if (tarea) tarea.estado = nuevoEstado;
    GuardarTareas();
    RenderTareas();
}

function RenderTareas(){ //(Cambiar) Actualiza todas las tareas para ver si cambiaron de estado
    TareasPorHacer.innerHTML = "";
    TareasEnProceso.innerHTML = "";
    TareasCompletadas.innerHTML = "";

    tareas.forEach(tarea =>{
        const TareaNueva = document.createElement("li");
        const Texto = document.createElement("span");
        Texto.setAttribute("id","Nombre-Tarea");
        Texto.textContent = tarea.texto;
        TareaNueva.appendChild(Texto);
        TareaNueva.setAttribute("class","my-2");

        if(configEstados[tarea.estado]){
            configEstados[tarea.estado](TareaNueva,tarea);
        }
        else {
            console.warn("Estado no reconocido:", tarea.estado);
        }
    })
}

function GuardarTareas(){ // Guarda las tareas en el local storage
    localStorage.setItem("tareas",JSON.stringify(tareas)); 
}

function CrearElementos(TareaNueva,tarea,nombreBoton,estado){ // Crea elementos de botones
    const Boton = CrearBotones(nombreBoton);
    Boton.onclick = () => {
        CambiarEstado(tarea.id,estado)
    }
    TareaNueva.appendChild(Boton);
}

function CrearBotones(text){ // Crea botones con clase y nombre
    const Boton = document.createElement("button");
    if(configEstilosBotones[text]){
        Boton.setAttribute("class",configEstilosBotones[text]);
    }
    Boton.textContent = text;
    return Boton
}

const configEstados = { // Lista de estados
    'por-hacer': EstadoPorHacer,
    'en-proceso': EstadoEnProceso,
    'completado': EstadoCompletado
};


if (tareasGuardadas) { // Condicional para revisar si hay tareas disponibles y ponerlas
    const tareasCargadas = JSON.parse(tareasGuardadas);
    tareas = tareasCargadas;
    RenderTareas();
}

Formulario.addEventListener("submit", function(event){ // Obtener la tarea del formulario 
    event.preventDefault();
    if(tareaIngresada.value.trim() == "") return;
    console.log("Tarea Añadida: ",tareaIngresada.value);
    AgregarTareas(tareaIngresada.value);
    tareaIngresada.value = "";
    tareaIngresada.focus();
})



