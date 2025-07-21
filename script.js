document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("todo-form");
  const input = document.getElementById("todo-input");
  const list = document.getElementById("todo-list");

  // Load todos from localStorage
  const todos = JSON.parse(localStorage.getItem("todos")) || [];

  const saveTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const renderTodos = () => {
    list.innerHTML = "";
    todos.forEach((todo, index) => {
      const li = document.createElement("li");
      if (todo.completed) li.classList.add("completed");

      li.innerHTML = `
        <span>${todo.text}</span>
        <div class="actions">
          <button onclick="toggleComplete(${index})">&#10003;</button>
          <button onclick="deleteTodo(${index})">&#10060;</button>
        </div>
      `;
      list.appendChild(li);
    });
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (text !== "") {
      todos.push({ text, completed: false });
      input.value = "";
      saveTodos();
      renderTodos();
    }
  });

  window.toggleComplete = (index) => {
    todos[index].completed = !todos[index].completed;
    saveTodos();
    renderTodos();
  };

  window.deleteTodo = (index) => {
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
  };

  renderTodos();
});
