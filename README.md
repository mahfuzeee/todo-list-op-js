# Todo List App

A feature-rich, interactive Todo List application built with vanilla JavaScript. Organize your tasks into projects, set priorities, due dates, and track completion status with a clean, modern interface.

## Features

- **Project Management**: Create and manage multiple projects to organize your tasks
- **Todo Creation**: Add todos with title, description, due date, priority levels (low/medium/high), and notes
- **Priority System**: Visual indicators for task priority (color-coded borders)
- **Task Completion**: Mark todos as complete/incomplete with visual feedback
- **Edit & Delete**: Modify existing todos or delete them when no longer needed
- **Local Storage Persistence**: All data is automatically saved to localStorage and restored on page reload
- **Responsive Design**: Clean, modern UI with sidebar navigation
- **Modal Forms**: User-friendly modals for adding/editing todos and projects

## Tech Stack

- **JavaScript (ES6+)**: Vanilla JavaScript with modern syntax
- **HTML5**: Semantic HTML structure
- **CSS3**: Custom styling with CSS variables and flexbox layout
- **Webpack 5**: Module bundling and build tool
- **Webpack Dev Server**: Development server with hot module replacement

## Installation

1. Clone the repository:

```bash
git clone https://github.com/mahfuzeee/todo-list-op-js.git
cd todo-list-op-js
```

2. Install dependencies:

```bash
npm install
```

## Usage

### Development Mode

Run the development server with hot module replacement:

```bash
npm run dev
```

The app will be available at `http://localhost:8080`

### Production Build

Build the project for production:

```bash
npm run build
```

The optimized files will be generated in the `dist` directory.

## Deployment to GitHub Pages

1. Build the project:

```bash
npm run build
```

2. Deploy to GitHub Pages:

```bash
npm run deploy
```

This command pushes the `dist` folder to the `gh-pages` branch, which GitHub Pages uses for deployment.

3. Enable GitHub Pages:

- Go to your repository Settings → Pages
- Select `gh-pages` branch as the source
- Your site will be available at `https://YOUR_USERNAME.github.io/todo-list-op-js`

## Project Structure

```
todo-list-op-js/
├── src/
│   ├── index.js          # Application entry point
│   ├── todo.js           # Core application logic (Todos class)
│   ├── uiController.js   # UI rendering and event handling
│   ├── styles.css        # Application styles
│   └── template.html     # HTML template
├── dist/                 # Build output (generated)
├── node_modules/         # Dependencies
├── webpack.config.js     # Webpack configuration
├── package.json          # Project metadata and scripts
└── README.md            # Project documentation
```

## How It Works

### Data Flow

1. **Initialization**: On app load, `TodoApp.init()` checks localStorage for saved data
2. **Data Loading**: If data exists, it loads projects and current project ID; otherwise creates a Default project
3. **UI Rendering**: `UIController.renderProjects()` and `UIController.renderTodos()` display the data
4. **User Interactions**: User actions trigger methods in the `Todos` class
5. **Data Persistence**: Every data mutation automatically saves to localStorage

### Key Components

- **Todos Class**: Manages all application state (projects, todos, current project)
- **UiController Class**: Handles DOM manipulation, event listeners, and rendering
- **localStorage**: Persists data between sessions

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run deploy` - Deploy to GitHub Pages

## Features in Detail

### Project Management

- Create new projects with custom names
- Switch between projects
- Delete projects (except the Default project)
- Active project highlighting

### Todo Management

- Add todos with:
  - Title (required)
  - Description
  - Due date
  - Priority (Low/Medium/High)
  - Notes
- Edit existing todos
- Delete todos
- Toggle completion status
- Expand/collapse todo details

### Priority System

- **High**: Red border indicator
- **Medium**: Orange border indicator
- **Low**: Green border indicator

### Data Persistence

- Automatic save to localStorage on every data change
- Automatic restore on page load/reload
- Handles corrupted or missing localStorage data gracefully

## Browser Compatibility

Works in all modern browsers that support:

- ES6+ JavaScript
- localStorage API
- CSS Flexbox
- CSS Variables

## Author

**Md. Mahfuzur Rahman**

- [LinkedIn](http://linkedin.com/in/mahfuzdh)
- [GitHub](http://github.com/mahfuzeee)

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

## Acknowledgments

Built with vanilla JavaScript to demonstrate DOM manipulation and state management without frameworks.
