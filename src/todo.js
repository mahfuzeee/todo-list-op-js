// ==========================================
// MODULE 1: Application Logic (Factories & State)
// ==========================================
const TodoApp = () => {
  let projects = [];
  let currentProjectId = null;

  // Factory: Todo
  const createTodo = (title, description, dueDate, priority, notes = "") => {
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

  // Factory: Project
  const createProject = (name) => {
    return {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name,
      todos: [],
    };
  };

  const init = () => {
    const defaultProject = createProject("Default");
    projects.push(defaultProject);
    currentProjectId = defaultProject.id;
  };

  const addProject = (name) => {
    const newProject = createProject(name);
    projects.push(newProject);
    return newProject;
  };

  const deleteProject = (projectId) => {
    projects = projects.filter((p) => p.id !== projectId);
    if (currentProjectId === projectId && projects.length > 0) {
      currentProjectId = projects[0].id;
    }
  };

  const setCurrentProject = (projectId) => {
    currentProjectId = projectId;
  };

  const getCurrentProject = () =>
    projects.find((p) => p.id === currentProjectId);
  const getProjects = () => projects;

  const addTodoToCurrentProject = (
    title,
    description,
    dueDate,
    priority,
    notes,
  ) => {
    const project = getCurrentProject();
    if (project) {
      const newTodo = createTodo(title, description, dueDate, priority, notes);
      project.todos.push(newTodo);
      return newTodo;
    }
  };

  const deleteTodo = (todoId) => {
    const project = getCurrentProject();
    project.todos = project.todos.filter((t) => t.id !== todoId);
  };

  const updateTodo = (todoId, updates) => {
    const project = getCurrentProject();
    const todo = project.todos.find((t) => t.id === todoId);
    if (todo) {
      Object.assign(todo, updates);
    }
  };

  const toggleTodoComplete = (todoId) => {
    const project = getCurrentProject();
    const todo = project.todos.find((t) => t.id === todoId);
    if (todo) todo.toggleComplete();
  };

  return {
    init,
    addProject,
    deleteProject,
    setCurrentProject,
    getCurrentProject,
    getProjects,
    addTodoToCurrentProject,
    deleteTodo,
    updateTodo,
    toggleTodoComplete,
  };
};

export default TodoApp;
