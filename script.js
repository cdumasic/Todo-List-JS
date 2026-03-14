const Formulario = document.getElementById("Form");
const tarea = document.getElementById("ftask");
const TareasPorHacer = document.querySelector(".Tareas1");
const TareasRealizadas = document.querySelector(".Tareas2");

function BotonAñadirTarea(boton){
    boton.addEventListener('click', function(){
        const TareaHecha = this.parentElement;

        this.className = "boton-eliminar";
        this.textContent = "Eliminar";

        TareasRealizadas.appendChild(TareaHecha);
        const nuevoBoton = TareaHecha.querySelector(".boton-eliminar");
        BotonEliminarTarea(nuevoBoton);
    });
}

function BotonEliminarTarea(boton){
    boton.addEventListener('click', function(){
        const tareaRealizada = this.parentElement;
        tareaRealizada.remove();
    });
}

document.querySelectorAll(".boton-tareas").forEach(boton => {BotonAñadirTarea(boton)});
document.querySelectorAll(".boton-eliminar").forEach(boton => {BotonEliminarTarea(boton)});

Formulario.addEventListener("submit", function(event){
    event.preventDefault();
    if(tarea.value.trim() == "") return;
    console.log("Tarea Añadida: ",tarea.value);
    
    const TareaNueva = document.createElement("li");
    TareaNueva.textContent = tarea.value + " ";

    const Boton = document.createElement("button");
    Boton.setAttribute("class","boton-tareas");
    Boton.textContent = "Realizado";
    BotonAñadirTarea(Boton);

    TareaNueva.appendChild(Boton);
    TareasPorHacer.appendChild(TareaNueva);

    tarea.value = "";
})



