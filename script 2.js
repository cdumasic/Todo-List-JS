import { configEstilosBotones } from './style_atributes.js'
// Constantes para obtener el formulario, la tarea ingresada, y las listas de tareas
const Formulario = document.querySelector('[data-js="form-1"]')
const tareaIngresada = document.querySelector('[data-js="input-text-1"]')
const TareasPorHacer = document.querySelector('[data-js="list-task-1"]');
const TareasEnProceso = document.querySelector('[data-js="list-task-2"]');
const TareasCompletadas = document.querySelector('[data-js="list-task-3"]');
const tareasGuardadas = localStorage.getItem("tareas"); // Constante para guardar tareas

let tareas = []; // Variable para las tareas en general

const TareasEnProceso_List = [];
const TareasPorHacer_List = [];
const TareasCompletadas_List = [];

const Estados = {
    1 : 'por-hacer',
    2 : 'en-proceso',
    3 : 'completado',
}

const EstadosBotones = {
    0 : 'Deshacer',
    1 : 'Comenzando',
    2 : 'Completado',
    3 : 'Eliminar'
}

const Listas = {
    'por-hacer': TareasPorHacer_List,
    'en-proceso': TareasEnProceso_List,
    'completado': TareasCompletadas_List
}

const ListasHTML = {
    'por-hacer': TareasPorHacer,
    'en-proceso': TareasEnProceso,
    'completado': TareasCompletadas
}

const ListaEstados = {
    'por-hacer': AlmacenarTareasEnListas,
    'en-proceso': AlmacenarTareasEnListas,
    'completado': AlmacenarTareasEnListas
}

function AlmacenarTareasEnListas(lista,tarea){
    lista.push(tarea);
}

const MoverEstados = {
    'por-hacer': MoverTareasEnListas,
    'en-proceso': MoverTareasEnListas,
    'completado': MoverTareasEnListas,
}

function MoverTareasEnListas(lista1,lista2,tarea){
    lista2.push(tarea);
    lista1.pop(tarea);
}

const EliminarEstados = {
    'por-hacer': EliminarTareasEnLista,
    'en-proceso': EliminarTareasEnLista,
    'completado': EliminarTareasEnLista
}

function EliminarTareasEnLista(lista, tarea){
    lista.remove(tarea);
}

function AgregarTareas(texto){ // Añade una nueva tarea con id, texto y estado
    const TareaNueva = {
        id: Date.now(),
        texto: texto,
        textoBotonDeshacer: false,
        textoBotonAccion: 1,
        estado: 1
    };
    tareas.push(TareaNueva);
    TareasPorHacer_List.push(TareaNueva)
    GuardarTareasLocalStorage();
    RenderInicial();
}

function CrearElementosLista(listaHTML, tarea){
    const TareaNueva = document.createElement("li");
    const BloquePrincipal = document.createElement("div");
    BloquePrincipal.setAttribute('class','mx-2 flex justify-between');
    const BloqueTexto = document.createElement("div");
    const BloqueBoton = document.createElement("div");
    BloqueBoton.setAttribute('class','flex justify-between');
    const Texto = document.createElement("span");
    Texto.textContent = tarea.texto;
    BloqueTexto.appendChild(Texto);
    if(CrearBoton1[tarea.estado]){
        CrearBotones(tarea,BloqueBoton);
    }
    BloquePrincipal.appendChild(BloqueTexto);
    BloquePrincipal.appendChild(BloqueBoton);
    TareaNueva.appendChild(BloquePrincipal);
    listaHTML.appendChild(TareaNueva);
}

function RenderInicial(){ //(Cambiar) Actualiza todas las tareas para ver si cambiaron de estado
    TareasPorHacer_List.forEach(tarea =>{
        CrearElementosLista(TareasPorHacer,tarea);
    })
    TareasEnProceso_List.forEach(tarea =>{
        CrearElementosLista(TareasEnProceso,tarea);
    })
    TareasCompletadas_List.forEach(tarea =>{
        CrearElementosLista(TareasCompletadas,tarea);
    })

}

function RenderTareas(tarea){ //(Cambiar) Actualiza todas las tareas para ver si cambiaron de estado
    CrearElementosLista(TareasPorHacer,(tarea));
}

function GuardarTareasLocalStorage(){ // Guarda las tareas en el local storage
    localStorage.setItem("tareas",JSON.stringify(tareas)); 
}

function CrearBotones(tarea,Bloque){
    if(tarea.textoBotonDeshacer){
        let BotonDeshacer = CrearBotonesIndividuales(0);
        AsignarAccion(0,BotonDeshacer,tarea);
        Bloque.appendChild(BotonDeshacer);
    }
    let BotonAccion = CrearBotonesIndividuales(tarea.estado);
    BotonAccion = AsignarAccion(tarea.textoBotonAccion,BotonAccion,tarea);
    Bloque.appendChild(BotonAccion);
}

function CrearBotonesIndividuales(texto){
    const Boton = document.createElement("button");
    if(configEstilosBotones[EstadosBotones[texto]]){
        Boton.setAttribute("class",configEstilosBotones[EstadosBotones[texto]]);
    }
    Boton.textContent = EstadosBotones[texto];
    return Boton;
}

const CrearBoton1 = {
    1 : CrearBotones,
    2 : CrearBotones,
    3 : CrearBotones
}

function AsignarAccion(accion, boton, tarea){
    boton.addEventListener("click", () => {        
        Acciones[accion](tarea);
    }, {once : true});
    return boton;
}

const Acciones = {
    0 : Deshacer,
    1 : Mover,
    2 : Eliminar
}

function Deshacer(tarea){
    console.log("deshecho");
    const estadoOriginal = tarea.estado;
    tarea.estado -= 1;
    if(tarea.estado == 1){
        tarea.textoBotonDeshacer = false;
    }
    tarea.textoBotonAccion = 1; 
    ListasHTML[Estados[estadoOriginal]].replaceChildren();
    MoverEstados[Estados[estadoOriginal]](Listas[Estados[estadoOriginal]],Listas[Estados[tarea.estado]],tarea);
    RenderInicial();
}

function Mover(tarea){
    const estadoOriginal = tarea.estado;
    tarea.estado += 1;
    tarea.textoBotonDeshacer = true;
    if(tarea.estado == 3){
       tarea.textoBotonAccion = 2; 
    }
    ListasHTML[Estados[estadoOriginal]].replaceChildren();
    MoverEstados[Estados[estadoOriginal]](Listas[Estados[estadoOriginal]],Listas[Estados[tarea.estado]],tarea);
    RenderInicial();
}

function Eliminar(tarea){
    console.log("Eliminaddo");
    const estadoOriginal = tarea.estado;
    ListasHTML[Estados[estadoOriginal]].replaceChildren();
    EliminarEstados[Estados[estadoOriginal]](Listas[Estados[tarea.estado]],tarea);
    RenderInicial();
}

if (tareasGuardadas) { // Condicional para revisar si hay tareas disponibles y ponerlas
    const tareasCargadas = JSON.parse(tareasGuardadas);
    tareas = tareasCargadas;
    console.log(tareasCargadas);
    tareasCargadas.forEach(tarea =>{
        if(ListaEstados[Estados[tarea.estado]]){
            console.log("Entro");
            ListaEstados[Estados[tarea.estado]](Listas[Estados[tarea.estado]],tarea);
        }
    })
    console.log(TareasPorHacer_List, "por hacer");
    console.log(TareasEnProceso_List, "en proceso");
    console.log(TareasCompletadas_List, "completadas");
    RenderInicial();
}

Formulario.addEventListener("submit", function(event){ // Obtener la tarea del formulario 
    event.preventDefault();
    if(tareaIngresada.value.trim() == "") return;
    console.log("Tarea Añadida: ",tareaIngresada.value);
    AgregarTareas(tareaIngresada.value);
    tareaIngresada.value = "";
    tareaIngresada.focus();
})