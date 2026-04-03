const Formulario = document.getElementById("Form");
const tareaIngresada = document.getElementById("ftask");
const TareasPorHacer = document.querySelector(".Tareas1");
const TareasEnProceso = document.querySelector(".Tareas2");
const TareasCompletadas = document.querySelector(".Tareas3");
let ids = 0;

let tareas = [];

function AgregarTareas(texto){
    const TareaNueva = {
        id: ids,
        texto: texto,
        estado: "por-hacer"
    };
    tareas.push(TareaNueva);
    ids++;
    RenderTareas();
}

function CambiarEstado2(id,nuevoEstado){
    const tarea = tareas.find(t => t.id === id);
    if (tarea) tarea.estado = nuevoEstado;
    RenderTareas();
}

function RenderTareas(){
    TareasPorHacer.innerHTML = "";
    TareasEnProceso.innerHTML = "";
    TareasCompletadas.innerHTML = "";

    tareas.forEach(tarea =>{
        const TareaNueva = document.createElement("li");
        const Texto = document.createElement("span");
        Texto.setAttribute("class","Nombre-Tarea");
        Texto.textContent = tarea.texto;
        TareaNueva.appendChild(Texto);

        if(tarea.estado == "por-hacer"){
            TareasPorHacer.appendChild(TareaNueva);
            const Boton1 = CrearBotones("boton-tareas","Comenzando");
            Boton1.onclick = () => {
                CambiarEstado2(tarea.id,"en-proceso")
            }
            TareaNueva.appendChild(Boton1);       
        }
        else if(tarea.estado == "en-proceso"){
            TareasEnProceso.appendChild(TareaNueva);
            const Boton2 = CrearBotones("boton-deshacer","Deshacer");
            Boton2.onclick = () => {
                CambiarEstado2(tarea.id,"por-hacer")
            }
            TareaNueva.appendChild(Boton2);
            const Boton3 = CrearBotones("boton-completar","Completado");
            Boton3.onclick = () => {
                CambiarEstado2(tarea.id,"completado")
            }
            TareaNueva.appendChild(Boton3);
        }
        else if(tarea.estado == "completado"){
            TareasCompletadas.appendChild(TareaNueva);
            const Boton4 = CrearBotones("boton-deshacer-2","Deshacer");
            Boton4.onclick = () => {
                CambiarEstado2(tarea.id,"en-proceso")
            }
            TareaNueva.appendChild(Boton4);
            const Boton5 = CrearBotones("boton-eliminar","Eliminar");
            Boton5.onclick = () => {
                tareas = tareas.filter(t => t !== tarea);
                TareaNueva.remove();
            }
            TareaNueva.appendChild(Boton5);
        }
    })
}

function CrearBotones(name,text){
    const Boton = document.createElement("button");
    Boton.setAttribute("class",name);
    Boton.textContent = text;
    return Boton
}

Formulario.addEventListener("submit", function(event){
    event.preventDefault();
    if(tareaIngresada.value.trim() == "") return;
    console.log("Tarea Añadida: ",tareaIngresada.value);
    AgregarTareas(tareaIngresada.value);
    tareaIngresada.value = "";
    tareaIngresada.focus();
})



