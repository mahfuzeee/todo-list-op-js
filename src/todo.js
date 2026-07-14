class Todos {
  constructor() {
    this.projects = [];
    this.currentProjectId = null;
  }

  createTodo = (title, description, dueDate, priority, notes = "") => {
    return {
      id: Date.now().toString(),
      title,
      description,
      dueDate,
      priority,
      notes,
      completed: false,
      toggleComplete() {
        this.completed = !this.completed;
      },
    };
  };

  createProject = (name) => {
    return {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name,
      todos: [],
    };
  };

  saveToLocalStorage() {
    const data = {
      projects: this.projects,
      currentProjectId: this.currentProjectId,
    };
    localStorage.setItem("todoApp", JSON.stringify(data));
  }

  loadFromLocalStorage() {
    const saved = localStorage.getItem("todoApp");
    if (saved) {
      const data = JSON.parse(saved);
      this.projects = data.projects || [];
      this.currentProjectId = data.currentProjectId;

      // Ensure currentProjectId is valid
      if (this.projects.length > 0) {
        const currentProjectExists = this.projects.find(
          (p) => p.id === this.currentProjectId,
        );
        if (!currentProjectExists || !this.currentProjectId) {
          this.currentProjectId = this.projects[0].id;
        }
      } else {
        this.currentProjectId = null;
      }
      return true;
    }
    return false;
  }

  init() {
    if (!this.loadFromLocalStorage()) {
      const defaultProject = this.createProject("Default");
      this.projects.push(defaultProject);
      this.currentProjectId = defaultProject.id;
    }
  }

  addProject(name) {
    const newProject = this.createProject(name);
    this.projects.push(newProject);
    this.saveToLocalStorage();
    return newProject;
  }

  deleteProject = (projectId) => {
    this.projects = this.projects.filter((p) => p.id !== projectId);
    if (this.currentProjectId === projectId && this.projects.length > 0) {
      this.currentProjectId = this.projects[0].id;
    }
    this.saveToLocalStorage();
  };

  setCurrentProject = (projectId) => {
    this.currentProjectId = projectId;
    this.saveToLocalStorage();
  };

  getCurrentProject() {
    return this.projects.find((p) => p.id === this.currentProjectId);
  }

  getProjects() {
    return this.projects;
  }

  addTodoToCurrentProject = (title, description, dueDate, priority, notes) => {
    const project = this.getCurrentProject();
    if (project) {
      const newTodo = this.createTodo(
        title,
        description,
        dueDate,
        priority,
        notes,
      );
      project.todos.push(newTodo);
      this.saveToLocalStorage();
      return newTodo;
    }
  };

  deleteTodo = (todoId) => {
    const project = this.getCurrentProject();
    project.todos = project.todos.filter((t) => t.id !== todoId);
    this.saveToLocalStorage();
  };

  updateTodo = (todoId, updates) => {
    const project = this.getCurrentProject();
    const todo = project.todos.find((t) => t.id === todoId);
    if (todo) {
      Object.assign(todo, updates);
      this.saveToLocalStorage();
    }
  };

  toggleTodoComplete = (todoId) => {
    const project = this.getCurrentProject();
    const todo = project.todos.find((t) => t.id === todoId);
    if (todo) {
      todo.completed = !todo.completed;
      this.saveToLocalStorage();
    }
  };
}

const TodoApp = new Todos();

export default TodoApp;
