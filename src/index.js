import TodoApp from "./todo.js";
import UIController from "./uiController.js";
import "./styles.css";
// ==========================================
// INITIALIZATION
// ==========================================
TodoApp.init();
UIController.init();
UIController.renderProjects();
UIController.renderTodos();
