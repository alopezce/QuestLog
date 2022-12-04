window.addEventListener("load", () => {
  todos = JSON.parse(localStorage.getItem("todos")) || [];
  const nameInput = document.querySelector("#name");
  const questInput = document.querySelector("#list-name");
  const newQuest = document.querySelector("#quest");

  const username = localStorage.getItem("username") || "";
  const questName = localStorage.getItem("questName") || "";

  nameInput.value = username;
  questInput.value = questName;

  DisplayQuests();

  questInput.addEventListener("change", (event) => {
    localStorage.setItem("questName", event.target.value);
  });

  nameInput.addEventListener("change", (event) => {
    localStorage.setItem("username", event.target.value);
  });

  newQuest.addEventListener("submit", (event) => {
    event.preventDefault();

    const todo = {
      quest: event.target.elements.quest.value,
      dueDate: event.target.elements.dueDate.value,
      taskTag: event.target.elements.taskTag.value,
      // taskColor: event.target.elements.taskColor.value,
      // notes: event.target.elements.notes.value,
      done: false,
      createdAt: new Date().getTime(),
    };

    todos.push(todo);

    localStorage.setItem("todos", JSON.stringify(todos));

    event.target.reset();

    DisplayQuests();
  });
});

function DisplayQuests() {
  const questList = document.querySelector("#quest-list");
  questList.innerHTML = "";

  todos.forEach((todo) => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");

    const label = document.createElement("label");
    const input = document.createElement("input");
    const span = document.createElement("span");
    const quest = document.createElement("div");
    const dueDate = document.createElement("div");
    const taskTag = document.createElement("div");
    const actions = document.createElement("div");
    const dropDown = document.createElement("button");
    const notes = document.createElement("button");
    const modal = document.createElement("div");
    const edit = document.createElement("button");
    const deleteButton = document.createElement("button");

    input.type = "checkbox";
    input.checked = todo.done;
    span.classList.add("bubble");

    if (todo.category == "personal") {
      span.classList.add("personal");
    } else {
      span.classList.add("School");
    }

    quest.classList.add("todo-quest");
    dueDate.classList.add("todo-quest");
    taskTag.classList.add("todo-quest");

    actions.classList.add("actions");
    edit.classList.add("edit");
    edit.setAttribute("data-is-editing", false);
    deleteButton.classList.add("delete");

    quest.innerHTML = `<input type="text" value="${todo.quest}" readonly>`;
    dueDate.innerHTML = `<input type="text" value="${todo.dueDate}" readonly>`;
    taskTag.innerHTML = `<input type="text" value="${todo.taskTag}" readonly>`;
    //   notes.innerHTML = `<input type="text" value="${todo.notes}">`;
    edit.innerHTML = "Edit";
    deleteButton.innerHTML = "Delete";

    label.appendChild(input);
    label.appendChild(span);
    actions.appendChild(edit);
    actions.appendChild(deleteButton);

    todoItem.appendChild(label);
    todoItem.appendChild(quest);
    todoItem.appendChild(dueDate);
    todoItem.appendChild(taskTag);
    todoItem.appendChild(actions);

    questList.appendChild(todoItem);

    if (todo.done) {
      todoItem.classList.add("done");
    }

    input.addEventListener("click", (event) => {
      todo.done = event.target.checked;
      localStorage.setItem("todos", JSON.stringify(todos));

      if (todo.done) {
        todoItem.classList.add("done");
      } else {
        todoItem.classList.remove("done");
      }

      DisplayQuests();
    });

    edit.addEventListener("click", (event) => {
      const questInput = quest.querySelector("input");
      const dateInput = dueDate.querySelector("input");
      const tagInput = taskTag.querySelector("input");

      const isEdit = edit.getAttribute("data-is-editing");

      if (isEdit === "false") {
        event.target.innerHTML = "Save";

        questInput.removeAttribute("readonly");
        dateInput.removeAttribute("readonly");
        tagInput.removeAttribute("readonly");

        questInput.focus();

        edit.setAttribute("data-is-editing", "true");
      } else {
        event.target.innerHTML = "Edit";
        edit.setAttribute("data-is-editing", "false");

        todo.quest = questInput.value;
        todo.dueDate = dateInput.value;
        todo.taskTag = tagInput.value;

        localStorage.setItem("todos", JSON.stringify(todos));
      }
    });

    deleteButton.addEventListener("click", (event) => {
      todos = todos.filter((t) => t != todo);
      localStorage.setItem("todos", JSON.stringify(todos));
      DisplayQuests();
    });
  });
}
