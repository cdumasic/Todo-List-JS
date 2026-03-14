const Formulario = document.getElementById("Form");

Formulario.addEventListener("submit", function(event){
    event.preventDefault();
    const tarea = document.getElementById("ftask").value;
    console.log("Tarea Añadida: ",tarea);
    const TareasPorHacer = document.getElementsByClassName("Tareas1");
    const TareaNueva = document.createElement("li");
    TareaNueva.textContent = tarea;
    const Boton = document.createElement("button");
    Boton.setAttribute("class","boton-tareas");
    Boton.textContent = "Realizado";
    TareaNueva.appendChild(Boton);
    TareasPorHacer[0].appendChild(TareaNueva);
    input.value = "";
})

const TareaTerminada = document.getElementsByClassName("boton-tareas");

for(let Tareas of TareaTerminada){
    Tareas.addEventListener('click', function(){
        const tareaRealizada = this.parentElement;

        this.className = "boton-eliminar";
        this.textContent = "Eliminar";

        const TareasHechas = document.getElementsByClassName("Tareas2");
        TareasHechas[0].appendChild(tareaRealizada);
    });
}

const TareasHechas = document.getElementsByClassName("boton-eliminar");

for(let Tareas2 of TareasHechas){
    Tareas2.addEventListener('click', function(){
        const tareaRealizada = this.parentElement;

        tareaRealizada.remove();
    });
}


