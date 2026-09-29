# Portfolio Website & CMS

A full-stack developer portfolio built with React and Node.js. The public portfolio displays projects from a backend API, while a separate admin dashboard provides authenticated project and user management.

## Overview

This project started as a React portfolio and has been extended with a backend and CMS for managing portfolio content.

The frontend is built with React and Vite and uses React Router, Redux Toolkit / RTK Query, CSS Modules, and React Icons.

The backend is built with Node.js and Express. It uses MongoDB with Mongoose for data storage and JWT-based authentication with access and refresh tokens. Refresh tokens are handled with httpOnly cookies.

Project images are uploaded through Multer and stored with Cloudinary rather than being stored directly in MongoDB.

The application is split into two parts:

- `client/` — React frontend and admin dashboard
- `server/` — Express backend, API routes, authentication, database access, and image upload handling

## Features

### Public Portfolio

- Responsive developer portfolio built with React
- Projects loaded dynamically from the backend
- Dedicated public projects page
- Public projects API
- Project information such as descriptions, technologies, images, and links

### Admin CMS

- Administrator login
- Authenticated admin dashboard
- Add projects
- Edit projects
- View/manage projects
- Upload project images through Cloudinary
- Manage users
- Role-based access control
- JWT access-token and refresh-token authentication
- Persistent authentication using refresh tokens stored in httpOnly cookies

## Tech Stack

### Frontend

- React
- Vite
- React Router
- Redux Toolkit
- RTK Query
- CSS Modules
- React Icons

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcrypt
- Multer
- Cloudinary
- CORS

### Deployment

- Frontend: Cloudflare Pages
- Backend: Render
- Database: MongoDB
- Image storage: Cloudinary

## Project Structure

```text
portfolio/
├── client/
├── server/
├── .gitignore
└── README.md
```

### `client/`

Contains the React/Vite frontend.

It includes:

- Public portfolio pages and components
- React Router configuration
- Redux Toolkit store and RTK Query services
- Authentication state and protected admin routes
- Admin dashboard pages
- CSS Modules for component/page styling
- Public and authenticated API services

### `server/`

Contains the Node.js/Express backend.

It includes:

- Express server setup
- MongoDB connection and Mongoose models
- Authentication and authorization
- Project and user controllers
- Public project API
- Admin project and user routes
- JWT verification middleware
- Request/error logging and error handling
- File upload handling with Multer
- Cloudinary configuration
- CORS configuration

The frontend and backend are kept as separate applications, with their own `package.json` files and dependencies.

## Authentication / Authorization

The admin area uses JWT authentication.

The authentication flow uses:

- An access token for authenticated API requests
- A refresh token stored in an `httpOnly` cookie
- JWT verification middleware on protected backend routes
- bcrypt for password hashing
- Authentication state managed on the frontend through Redux
- Protected admin routes on the frontend
- Role-based access control for admin functionality

The refresh token is not stored in client-side JavaScript-accessible storage. It is handled through an httpOnly cookie and sent with requests when required by the authentication flow.

## API / Backend Overview

The Express backend is responsible for the portfolio's dynamic data and admin functionality.

The backend is organized into separate route and controller modules for:

- Authentication
- Projects
- Public projects
- Users

The project API handles portfolio project data, while the public project API provides the data required by the public portfolio.

Protected admin functionality requires authentication and, where applicable, the required user role.

Project images are received by the backend through Multer and uploaded to Cloudinary. The resulting image information is used by the project data instead of storing the image file itself in MongoDB.

MongoDB stores the application's project and user data through Mongoose models.

## Environment Variables

Create the required environment files locally and provide your own values. Do not commit real credentials, secrets, API keys, or database connection strings.

### Frontend

Create a `.env` file inside `client/`:

```env
VITE_API_URL=your_backend_api_url
```

The frontend uses `VITE_API_URL` as the base URL for communicating with the backend.

### Backend

Create a `.env` file inside `server/` with the environment variables required by the backend configuration.

Use placeholders such as:

```env
NODE_ENV=your_environment
PORT=your_port
MONGO_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

The exact variable names required by the backend should match the names used in the server configuration. Keep all actual values private and do not commit them to Git.

## Local Development / Installation

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd portfolio
```

### 2. Install frontend dependencies

The frontend has its own `package.json`, so install its dependencies inside `client/`:

```bash
cd client
npm install
```

Create the frontend environment file:

```text
client/.env
```

Add:

```env
VITE_API_URL=your_backend_api_url
```

### 3. Install backend dependencies

Open another terminal or return to the project root and install the backend dependencies inside `server/`:

```bash
cd server
npm install
```

Create:

```text
server/.env
```

Add your local MongoDB connection details, JWT secrets, Cloudinary credentials, and other backend configuration values using the variable names expected by the server.

### 4. Start the backend

From `server/`:

```bash
npm run dev
```

If the backend package does not define a development script in your local version, use the start script provided by its `package.json`.

### 5. Start the frontend

From `client/`:

```bash
npm run dev
```

Vite will provide the local development URL for the frontend.

Make sure the frontend's `VITE_API_URL` points to the backend running locally.

## Deployment

The current project is deployed as separate frontend and backend applications.

### Frontend

The React/Vite frontend is deployed on Cloudflare Pages.

The frontend deployment requires the `VITE_API_URL` environment variable to point to the deployed backend API.

### Backend

The Node.js/Express backend is deployed on Render.

The backend deployment requires its database, JWT, Cloudinary, CORS, and other required environment variables to be configured in the Render environment.

### Database

MongoDB is used as the application's database, with Mongoose handling database models and queries.

### Image Storage

Cloudinary is used to store uploaded project images. Images are uploaded through the backend rather than being stored directly in the MongoDB database.

## Author

**Eniola Olokungbemi**

- GitHub: [BuzzAlvin](https://github.com/BuzzAlvin)
- Portfolio: [BuzzAlvin Portfolio](https://buzzalvin.pages.dev)
