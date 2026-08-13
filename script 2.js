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
    'completado': MoverTareasEnListas
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
    lista.pop(tarea);
}

/*
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
*/
function AgregarTareas(texto){ // Añade una nueva tarea con id, texto y estado
    const TareaNueva = {
        id: Date.now(),
        texto: texto,
        textoBotonDeshacer: true,
        textoBotonAccion: 1,
        estado: 1
    };
    tareas.push(TareaNueva);
    TareasPorHacer_List.push(TareaNueva)
    GuardarTareasLocalStorage();
    RenderInicial(TareaNueva);
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
/*
function CambiarEstado(id,nuevoEstado){ // Cambia el estado de una tarea
    const tarea = tareas.find(t => t.id === id);
    if (tarea) tarea.estado = nuevoEstado;
    GuardarTareas();
    RenderTareas();
}


*/
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
/*
function CrearElementos(TareaNueva,tarea,nombreBoton,estado){ // Crea elementos de botones
    const Boton = CrearBotones(nombreBoton);
    Boton.onclick = () => {
        CambiarEstado(tarea.id,estado)
    }
    TareaNueva.appendChild(Boton);
}
*/

function CrearBotones(tarea,Bloque){
    if(tarea.textoBotonDeshacer){
        const BotonDeshacer = CrearBotonesIndividuales(0);
        BotonDeshacer = AsignarAccion(0,BotonDeshacer,tarea);
        Bloque.appendChild(BotonDeshacer);
    }
    const BotonAccion = CrearBotonesIndividuales(tarea.textoBotonAccion);
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
    })
    return boton;
}

const Acciones = {
    0 : Deshacer,
    1 : Mover,
    2 : Eliminar
}

function Deshacer(tarea){
    console.log("deshecho");
}

function Mover(tarea){
    const estadoOriginal = tarea.estado;
    tarea.estado = tarea.estado + 1;
    MoverEstados(Estados(estadoOriginal))(Listas(estadoOriginal),Listas(tarea.estado),tarea);
}

function Eliminar(tarea){
    console.log("Eliminaddo");
}
/*
const configEstados = { // Lista de estados
    'por-hacer': EstadoPorHacer,
    'en-proceso': EstadoEnProceso,
    'completado': EstadoCompletado
};
*/

if (tareasGuardadas) { // Condicional para revisar si hay tareas disponibles y ponerlas
    const tareasCargadas = JSON.parse(tareasGuardadas);
    tareas = tareasCargadas;
    tareasCargadas.forEach(tarea =>{
        if(ListaEstados[tarea.estado]){
            ListaEstados[tarea.estado](Listas[tarea.estado],tarea); 
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