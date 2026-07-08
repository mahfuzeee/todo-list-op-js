// ==========================================
// MODULE 1: Application Logic (class and methods)
// ==========================================
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

  init() {
    const defaultProject = this.createProject("Default");
    this.projects.push(defaultProject);
    this.currentProjectId = defaultProject.id;
  }

  addProject(name) {
    const newProject = this.createProject(name);
    this.projects.push(newProject);
    return newProject;
  }

  deleteProject = (projectId) => {
    this.projects = this.projects.filter((p) => p.id !== projectId);
    if (this.currentProjectId === projectId && this.projects.length > 0) {
      this.currentProjectId = this.projects[0].id;
    }
  };

  setCurrentProject = (projectId) => {
    this.currentProjectId = projectId;
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
      return newTodo;
    }
  };

  deleteTodo = (todoId) => {
    const project = this.getCurrentProject();
    project.todos = project.todos.filter((t) => t.id !== todoId);
  };

  updateTodo = (todoId, updates) => {
    const project = this.getCurrentProject();
    const todo = project.todos.find((t) => t.id === todoId);
    if (todo) {
      Object.assign(todo, updates);
    }
  };

  toggleTodoComplete = (todoId) => {
    const project = this.getCurrentProject();
    const todo = project.todos.find((t) => t.id === todoId);
    if (todo) todo.toggleComplete();
  };
}

const TodoApp = new Todos();

export default TodoApp;
