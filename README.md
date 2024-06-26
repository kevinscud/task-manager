# Task Management Application

This repository contains my solution to the Quatrix Frontend Interview Challenge, featuring a task management application built with React and using a provided Task API.

[![Netlify Status](https://api.netlify.com/api/v1/badges/dbb5c8fa-0c64-4a5e-8cf2-e8abb0d7dce0/deploy-status)](https://app.netlify.com/sites/regal-mermaid-18c954/deploys)

[Demo](https://regal-mermaid-18c954.netlify.app/)

<!-- --- -->

## Technology Stack

- **React**: Client-side rendered React for web apps.
- **TanStack Query**: For asynchronous state management and data fetching.
- **TanStack Router**: For managing routes in the application.

## Project Setup

Follow these steps to set up and run the project locally on your machine:

### Prerequisites

Node.js and npm installed on your machine ([Download Node.js](https://nodejs.org/))

### Installation

Clone the repository to your local machine and install the dependencies using npm:

```bash
git clone https://github.com/kevinscud/task-manager.git
cd task-manager
npm install
```

### Configuration

<details>

<summary>Update: The CORS restriction has been resolved and this configuration is no longer necessary.</summary>

<br>

To bypass CORS (Cross-Origin Resource Sharing) restrictions when accessing the Task API, a CORS proxy
server has been set up. This proxy server allows requests from `localhost` to access the Task API.

#### **Using the CORS Proxy Server**

I have created a CORS proxy server at `https://cors-proxy.kevinscud.workers.dev` for this project. This proxy server will fetch data from the Task API and forward it to this application, bypassing CORS restrictions.

#### **Set Up Environment Variables**

Create a `.env` file in the root of the project directory with the following configuration:

```plaintext
VITE_API_BASE_URL=https://cors-proxy.kevinscud.workers.dev/?url=https://task.quatrixglobal.com
```

**Note: This configuration is only needed for development (localhost) and should not be used in the hosted production application.**

</details>

### Running the Development Server

Start the development server:

```bash
npm run dev
```

Open your browser and visit [http://localhost:5173](http://localhost:5173) to view the application.

## Features

- Create new tasks by filling out a form with subject, priority, description, and optional due date.
- View existing tasks with details such as subject, priority, description, and due date.
- Update existing tasks by editing subject, priority, description, and due date.
- Delete tasks with a confirmation step to prevent accidental deletions.
- Pagination controls are available to navigate through multiple pages of tasks.

## Folder Structure

```plaintext
./
├── LICENSE
├── README.md
├── index.html
├── package-lock.json
├── package.json
├── public/
│   └── vite.svg
├── scratchpad/
│   ├── playground.http
│   └── scratchpad.md
├── src/
│   ├── assets/
│   │   ├── 404-not-found.svg
│   │   └── react.svg
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Loader.jsx
│   │   ├── Pagination.jsx
│   │   ├── StateContainer.jsx
│   │   ├── TaskDetails.jsx
│   │   ├── TaskList.jsx
│   │   └── TaskListItem.jsx
│   ├── index.css
│   ├── main.jsx
│   ├── pages/
│   │   ├── IndexPage.jsx
│   │   ├── NotFoundPage.jsx
│   │   ├── PageLayout.jsx
│   │   ├── TaskDetailPage.jsx
│   │   └── TaskListPage.jsx
│   ├── router.jsx
│   └── services/
│       └── queries.js
├── tests/
│   └── tests.js
└── vite.config.js
```

- `public/`: Contains static assets and the HTML template.
- `src/`: Contains all the source code for the React application.
  - `assets/`: Contains images, icons, or other static assets.
  - `components/`: Contains React components used to build the application.
  - `services/`: Contains functions to interact with the Task API.
- `.env`: Local environment configuration file for setting API base URL.
- `tests/`: Contains unit tests.
- `package.json`: Defines project dependencies and scripts.
- `README.md`: Documentation for the project.

## Author

- [Kevin Luse](https://github.com/kevinscud)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
