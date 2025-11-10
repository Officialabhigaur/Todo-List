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
            <i class="fa-solid fa-pen" ></i>
            <i class="fa-solid fa-trash" onclick="deleteTask(${task.id})"></i>
          </div>
        </div>`;
  });
}

function formSubmitHandler(e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const dueDate = document.getElementById("dueDate").value;
  const priority = document.getElementById("priority").value;
  const form = document.querySelector("form");

  let task = {
    id: Date.now(),
    title,
    description,
    dueDate,
    priority,
  };

  tasks.push(task);
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
