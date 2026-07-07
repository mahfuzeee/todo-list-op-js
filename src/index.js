import TodoApp from "./todo.js";
import UIController from "./uiController.js";
// ==========================================
// INITIALIZATION
// ==========================================
TodoApp.init();
UIController.init();
UIController.renderProjects();
UIController.renderTodos();
