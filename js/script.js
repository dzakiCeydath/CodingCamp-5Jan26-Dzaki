const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const addBtn = document.getElementById("addBtn");
const deleteAllBtn = document.getElementById("deleteAllBtn");
const filterBtn = document.getElementById("filterBtn");
const todoBody = document.getElementById("todoBody");

let todos = [];
let showOnlyPending = false;

function renderTodos() {
  todoBody.innerHTML = "";

  let filtered = showOnlyPending
    ? todos.filter(t => !t.done)
    : todos;

  if (filtered.length === 0) {
    todoBody.innerHTML = `
      <tr>
        <td colspan="4" class="empty">No task found</td>
      </tr>
    `;
    return;
  }

  filtered.forEach((todo, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${todo.task}</td>
      <td>${todo.date || "-"}</td>
      <td class="${todo.done ? "status-done" : "status-pending"}">
        ${todo.done ? "Done" : "Pending"}
      </td>
      <td>
        <button class="action-btn" onclick="toggleStatus(${index})">
          ✔
        </button>
        <button class="action-btn" onclick="deleteTodo(${index})">
          🗑
        </button>
      </td>
    `;

    todoBody.appendChild(row);
  });
}

addBtn.addEventListener("click", () => {
  const task = taskInput.value.trim();
  const date = dateInput.value;

  if (!task) return alert("Task cannot be empty!");

  todos.push({
    task,
    date,
    done: false
  });

  taskInput.value = "";
  dateInput.value = "";
  renderTodos();
});

function toggleStatus(index) {
  todos[index].done = !todos[index].done;
  renderTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

deleteAllBtn.addEventListener("click", () => {
  if (confirm("Delete all tasks?")) {
    todos = [];
    renderTodos();
  }
});

filterBtn.addEventListener("click", () => {
  showOnlyPending = !showOnlyPending;
  filterBtn.innerText = showOnlyPending ? "Show All" : "Filter";
  renderTodos();
});

// initial render
renderTodos();
