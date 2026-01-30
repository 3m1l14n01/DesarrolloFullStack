
class Tarea {
  constructor(nombre, estado = false) {
    this.nombre = nombre;
    this.estado = estado;
    this.id = Date.now();
  }

  editar(nuevoNombre) {
    this.nombre = nuevoNombre;
  }

  toggleEstado() {
    this.estado = !this.estado;
  }
}

class GestorDeTareas {
  constructor() {
    this.tareas = JSON.parse(localStorage.getItem("tareas")) || [];
  }

  agregarTarea(tarea) {
    this.tareas.push(tarea);
    this.guardar();
  }

  eliminarTarea(id) {
    this.tareas = this.tareas.filter(t => t.id !== id);
    this.guardar();
  }

  editarTarea(id, nuevoNombre) {
    const tarea = this.tareas.find(t => t.id === id);
    if (tarea) tarea.editar(nuevoNombre);
    this.guardar();
  }

  guardar() {
    localStorage.setItem("tareas", JSON.stringify(this.tareas));
  }

  obtenerTareas() {
    return this.tareas;
  }
}

const gestor = new GestorDeTareas();

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const errorMsg = document.getElementById("errorMsg");

const renderTareas = () => {
  taskList.innerHTML = "";
  gestor.obtenerTareas().forEach(tarea => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span style="text-decoration:${tarea.estado ? "line-through" : "none"}">
        ${tarea.nombre}
      </span>
      <div class="actions">
        <button class="edit">Editar</button>
        <button class="delete">Eliminar</button>
      </div>
    `;

    li.querySelector(".edit").addEventListener("click", () => {
      const nuevoNombre = prompt("Editar tarea:", tarea.nombre);
      if (nuevoNombre && nuevoNombre.trim() !== "") {
        gestor.editarTarea(tarea.id, nuevoNombre.trim());
        renderTareas();
      }
    });

    li.querySelector(".delete").addEventListener("click", () => {
      gestor.eliminarTarea(tarea.id);
      renderTareas();
    });

    li.querySelector("span").addEventListener("click", () => {
      tarea.toggleEstado();
      gestor.guardar();
      renderTareas();
    });

    taskList.appendChild(li);
  });
};

addTaskBtn.addEventListener("click", () => {
  const nombre = taskInput.value.trim();
  if (nombre === "") {
    errorMsg.textContent = "No puedes agregar una tarea vacia.";
    return;
  }
  errorMsg.textContent = "";
  const nuevaTarea = new Tarea(nombre);
  gestor.agregarTarea(nuevaTarea);
  taskInput.value = "";
  renderTareas();
});

renderTareas();
