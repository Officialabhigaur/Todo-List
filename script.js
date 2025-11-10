const btnAdd = document.querySelector(".btn-add");
const overlay = document.querySelector(".overlay");
const xMark = document.querySelector(".fa-xmark");
const btnSave = document.querySelector(".btn-save");
const todoContainer = document.querySelector(".todo-container");

btnAdd.addEventListener("click", () => {
  overlay.style.top = "0";
});

xMark.addEventListener("click", () => {
  overlay.style.top = "-100vh";
});

btnSave.addEventListener("click", () => {
  overlay.style.top = "-100vh";
});

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let editId = null;

function saveTasksToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTask() {
  todoContainer.innerHTML = "";
  tasks.map((task) => {
    const borderColor =
      task.priority === "high"
        ? "border-red"
        : task.priority === "medium"
        ? "border-orange"
        : "border-green";

    const backgroundColor =
      task.priority === "high"
        ? "background-red"
        : task.priority === "medium"
        ? "background-orange"
        : "background-green";

    todoContainer.innerHTML += `<div class="todo ${borderColor}">
          <div class="todo-content">
            <input type="checkbox" />
            <div>
              <h2>${task.title}</h2>
              <p>${task.description}</p>
              <div class="date-priority-container">
                <span class="${backgroundColor}">${task.priority} priority</span>
                <span>Due: ${task.dueDate}</span>
              </div>
            </div>
          </div>

          <div class="icon-container">
            <i class="fa-solid fa-pen"  onclick="editTask(${task.id})"></i>
            <i class="fa-solid fa-trash" onclick="deleteTask(${task.id})"></i>
          </div>
        </div>`;
  });
}

function formSubmitHandler(e) {
  e.preventDefault();

  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;
  let dueDate = document.getElementById("dueDate").value;
  let priority = document.getElementById("priority").value;
  const form = document.querySelector("form");

  if (editId) {
    let task = tasks.find((task) => task.id === editId);
    task.title = title;
    task.description = description;
    task.dueDate = dueDate;
    task.priority = priority;

    btnSave.innerText = "Add Task"
    form.reset()
  } else {
    let task = {
      id: Date.now(),
      title,
      description,
      dueDate,
      priority,
    };
    tasks.push(task);
  }
  saveTasksToLocalStorage();
  renderTask();
  form.reset();
}
renderTask();

// localStorage.clear()

// delete functionality
function deleteTask(Id) {
  tasks = tasks.filter((task) => task.id !== Id);
  saveTasksToLocalStorage();
  renderTask();
}

function editTask(Id) {
  let task = tasks.find((task) => task.id === Id);

  document.getElementById("title").value = task.title;
  document.getElementById("description").value = task.description;
  document.getElementById("dueDate").value = task.dueDate;
  document.getElementById("priority").value = task.priority;

  btnSave.innerText = "Update Task";
  editId = Id;
  overlay.style.top = "0";
}


