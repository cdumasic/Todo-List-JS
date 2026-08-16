const tareasGuardadas = localStorage.getItem("tareas"); // Constante para guardar tareas

let tareas = [];  //variable madre

const Estados = {
    1 : 'por-hacer',
    2 : 'en-proceso',
    3 : 'completado',
}
const EstadosBotonAccion = {
    0 : 'Deshacer',
    1 : 'Mover',
    2 : 'Eliminar'
}
function MoverTareasEnListas(lista1,lista2,tarea){
    lista2.push(tarea);
    lista1.pop(tarea);
}

function eliminarTareasEnLista(lista, tarea){
    lista.remove(tarea);
}

export function agregarTareas(texto){ // Añade una nueva tarea con id, texto y estado
    const TareaNueva = crearNuevaTarea(texto,false,1,1);
    almacenarTareas(TareaNueva);
    guardarTareasLocalStorage();
}

export function renderizar(){
    if (tareasGuardadas) { // Condicional para revisar si hay tareas disponibles y ponerlas
        const tareasCargadas = JSON.parse(tareasGuardadas);
        tareasCargadas.forEach(tarea =>{
            tareas = [
                ...tareas,
                tarea
            ]
        })        
    }
}

function crearNuevaTarea(texto,BotonDeshacer,BotonAccion,estado){
    const TareaNueva = {
        id: Date.now(),
        texto: texto, //string
        textoBotonDeshacer: BotonDeshacer, //bool
        textoBotonAccion: BotonAccion, //int
        estado: estado //int
    };
    return TareaNueva;
}

function almacenarTareas(TareaNueva){
    tareas = [
        ...tareas,
        TareaNueva
    ]
}

function guardarTareasLocalStorage(){ // Guarda las tareas en el local storage
    localStorage.setItem("tareas",JSON.stringify(tareas)); 
}

