import TodoApp from "./todo.js";

class UiController {
  constructor() {
    this.elements = {
      projectList: document.getElementById("project-list"),
      todoList: document.getElementById("todo-list"),
      currentProjectTitle: document.getElementById("current-project-title"),
      newProjectBtn: document.getElementById("new-project-btn"),
      newTodoBtn: document.getElementById("new-todo-btn"),
      modalOverlay: document.getElementById("modal-overlay"),
      modalContent: document.getElementById("modal-content"),
    };
  }

  renderProjects = () => {
    const projects = TodoApp.getProjects();
    this.elements.projectList.innerHTML = "";
    const currentProj = TodoApp.getCurrentProject();

    projects.forEach((project) => {
      const li = document.createElement("li");
      li.classList.add("project-item");
      if (project.id === currentProj.id) li.classList.add("active");

      const nameSpan = document.createElement("span");
      nameSpan.textContent = project.name;
      nameSpan.addEventListener("click", () => {
        TodoApp.setCurrentProject(project.id);
        this.renderProjects();
        this.renderTodos();
      });

      if (project.name !== "Default") {
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("project-delete");
        deleteBtn.textContent = "✕";
        deleteBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          TodoApp.deleteProject(project.id);
          this.renderProjects();
          this.renderTodos();
        });
        li.appendChild(deleteBtn);
      }

      li.prepend(nameSpan);
      this.elements.projectList.appendChild(li);
    });

    this.elements.currentProjectTitle.textContent = currentProj.name;
  };

  renderTodos() {
    const project = TodoApp.getCurrentProject();
    this.elements.todoList.innerHTML = "";

    project.todos.forEach((todo) => {
      const li = document.createElement("li");
      li.classList.add("todo-item", `priority-${todo.priority}`);
      if (todo.completed) li.classList.add("completed");

      // Header Section
      const headerDiv = document.createElement("div");
      headerDiv.classList.add("todo-header");

      const titleSpan = document.createElement("span");
      titleSpan.classList.add("todo-title");
      titleSpan.textContent = todo.title;

      const dateSpan = document.createElement("span");
      dateSpan.classList.add("todo-due-date");
      dateSpan.textContent = `Due: ${todo.dueDate || "No date"}`;

      headerDiv.appendChild(titleSpan);
      headerDiv.appendChild(dateSpan);
      li.appendChild(headerDiv);

      // Details Section (Hidden by default)
      const detailsDiv = document.createElement("div");
      detailsDiv.classList.add("todo-details");
      detailsDiv.style.display = "none";

      const descP = document.createElement("p");
      descP.classList.add("todo-description");
      descP.textContent = `Description: ${todo.description || "None"}`;

      const notesP = document.createElement("p");
      notesP.classList.add("todo-notes");
      notesP.textContent = `Notes: ${todo.notes || "None"}`;

      const actionsDiv = document.createElement("div");
      actionsDiv.classList.add("todo-actions");

      const completeBtn = document.createElement("button");
      completeBtn.classList.add("btn-complete");
      completeBtn.textContent = todo.completed ? "Uncomplete" : "Complete";
      completeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        TodoApp.toggleTodoComplete(todo.id);
        this.renderTodos();
      });

      const editBtn = document.createElement("button");
      editBtn.classList.add("btn-edit");
      editBtn.textContent = "Edit";
      editBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.openTodoModal(todo);
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("btn-delete");
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        TodoApp.deleteTodo(todo.id);
        this.renderTodos();
      });

      actionsDiv.append(completeBtn, editBtn, deleteBtn);
      detailsDiv.append(descP, notesP, actionsDiv);
      li.appendChild(detailsDiv);

      // Expand/Collapse on click
      li.addEventListener("click", () => {
        detailsDiv.style.display =
          detailsDiv.style.display === "none" ? "block" : "none";
      });

      this.elements.todoList.appendChild(li);
    });
  }

  openTodoModal = (todo = null) => {
    const isEditing = !!todo;
    this.elements.modalContent.innerHTML = `
                    <form id="todo-form">
                        <h2>${isEditing ? "Edit Todo" : "New Todo"}</h2>
                        <div class="form-group">
                            <label>Title</label>
                            <input type="text" id="todo-title" required value="${isEditing ? todo.title : ""}">
                        </div>
                        <div class="form-group">
                            <label>Description</label>
                            <textarea id="todo-desc">${isEditing ? todo.description : ""}</textarea>
                        </div>
                        <div class="form-group">
                            <label>Due Date</label>
                            <input type="date" id="todo-date" value="${isEditing ? todo.dueDate : ""}">
                        </div>
                        <div class="form-group">
                            <label>Priority</label>
                            <select id="todo-priority">
                                <option value="low" ${isEditing && todo.priority === "low" ? "selected" : ""}>Low</option>
                                <option value="medium" ${isEditing && todo.priority === "medium" ? "selected" : ""}>Medium</option>
                                <option value="high" ${isEditing && todo.priority === "high" ? "selected" : ""}>High</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Notes</label>
                            <textarea id="todo-notes">${isEditing ? todo.notes : ""}</textarea>
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn-cancel" id="modal-cancel">Cancel</button>
                            <button type="submit" class="btn-submit">${isEditing ? "Update" : "Add"} Todo</button>
                        </div>
                    </form>
                `;

    this.elements.modalOverlay.classList.add("visible");

    document
      .getElementById("modal-cancel")
      .addEventListener("click", this.closeModal);
    document.getElementById("todo-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const data = {
        title: document.getElementById("todo-title").value,
        description: document.getElementById("todo-desc").value,
        dueDate: document.getElementById("todo-date").value,
        priority: document.getElementById("todo-priority").value,
        notes: document.getElementById("todo-notes").value,
      };

      if (isEditing) {
        TodoApp.updateTodo(todo.id, data);
      } else {
        TodoApp.addTodoToCurrentProject(
          data.title,
          data.description,
          data.dueDate,
          data.priority,
          data.notes,
        );
      }
      this.closeModal();
      this.renderTodos();
    });
  };

  openProjectModal = () => {
    this.elements.modalContent.innerHTML = `
                    <form id="project-form">
                        <h2>New Project</h2>
                        <div class="form-group">
                            <label>Project Name</label>
                            <input type="text" id="project-name" required>
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn-cancel" id="modal-cancel">Cancel</button>
                            <button type="submit" class="btn-submit">Add Project</button>
                        </div>
                    </form>
                `;
    this.elements.modalOverlay.classList.add("visible");

    document
      .getElementById("modal-cancel")
      .addEventListener("click", this.closeModal);
    document.getElementById("project-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("project-name").value;
      const newProj = TodoApp.addProject(name);
      TodoApp.setCurrentProject(newProj.id);
      this.closeModal();
      this.renderProjects();
      this.renderTodos();
    });
  };

  closeModal = () => {
    this.elements.modalOverlay.classList.remove("visible");
    this.elements.modalContent.innerHTML = "";
  };

  init() {
    this.elements.newProjectBtn.addEventListener(
      "click",
      this.openProjectModal,
    );
    this.elements.newTodoBtn.addEventListener("click", () =>
      this.openTodoModal(),
    );
    this.elements.modalOverlay.addEventListener("click", (e) => {
      if (e.target === this.elements.modalOverlay) this.closeModal();
    });
  }
}

const UIController = new UiController();
export default UIController;
