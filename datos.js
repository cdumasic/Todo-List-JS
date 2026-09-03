const tareasGuardadas = localStorage.getItem("tareas");
 // Constante para guardar tareas
let tareas = [];  //variable madre
let ultimoID =  Number(localStorage.getItem("ultimoID")) || 0;

const Estados = {
    1 : 'por-hacer',
    2 : 'en-proceso',
    3 : 'completado',
}
export const EstadosBotonAccion = {
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

export function agregarTareas(tarea){ // Añade una nueva tarea con id, texto y estado
    console.log(ultimoID + "agregar");
    const NuevaTarea = tarea;
    const texto = NuevaTarea.value;
    const TareaCreada = crearNuevaTarea(texto,false,1,1);
    setTareas(TareaCreada);
    guardarTareasLocalStorage();
    guardarUltimoID();
    return TareaCreada;
}
 
export function renderizar(){
    console.log(ultimoID + "renderizar");
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

export function getTareas(){
    const AllTareas = [...tareas];
    return AllTareas;
}

function crearNuevaTarea(texto,BotonDeshacer,BotonAccion,estado){
    ultimoID++;
    const TareaNueva = {
        id: ultimoID,
        texto: texto, //string
        textoBotonDeshacer: BotonDeshacer, //bool
        textoBotonAccion: BotonAccion, //int
        estado: estado, //int
        fechaCreación: Date.now(),
        fechaModificacion: Date.now()
    };
    return TareaNueva;
    console.log(ultimoID + "gg");
}

function setTareas(TareaNueva){
    tareas = [
        ...tareas,
        TareaNueva
    ]
}

function eliminarElemento(idParaEliminar){
    const AllTareas = [...tareas];
    AllTareas = AllTareas.filter(item => item.id !== idParaEliminar);
    tareas = [...AllTareas];
    guardarEnStorage(); // Guarda la lista actualizada
}

function guardarTareasLocalStorage(){ // Guarda las tareas en el local storage
    localStorage.setItem("tareas",JSON.stringify(tareas)); 
}

function guardarUltimoID(){
    localStorage.setItem("ultimoID", ultimoID.toString());
}

function cambiarEstado(tarea,nuevoEstado){
    tareaNueva = [...tarea];
    tareaNueva = {
        ...tareaNueva,
        estado : nuevoEstado
    }
    return tareaNueva;
}