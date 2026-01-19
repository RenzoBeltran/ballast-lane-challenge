# Challenge Project

Este repositorio contiene los proyectos de backend y frontend. A continuación se detallan los stacks y las instrucciones para ejecutar cada uno.

## Backend (API)

El backend está construido con **Ruby on Rails**.

**Stack:**
- Ruby: 3.2.0
- Rails: 7.1
- Base de datos: SQLite3

**Instalación y Ejecución:**

1.  Navegar a la carpeta del backend:
    ```bash
    cd backend-pokedex
    ```
2.  Instalar dependencias:
    ```bash
    bundle install
    ```
3.  Configurar la base de datos:
    ```bash
    rails db:setup
    ```
4.  Iniciar el servidor:
    ```bash
    rails s
    ```
    El servidor correrá en `http://localhost:3000`.

## Frontend (App)

El frontend está construido con **React** utilizando **Vite**.

**Stack:**
- React 19
- Vite
- TypeScript
- TailwindCSS

**Instalación y Ejecución:**

1.  Navegar a la carpeta del frontend:
    ```bash
    cd frontend-pokedex
    ```
2.  Instalar dependencias:
    ```bash
    npm install
    ```
3.  Iniciar el servidor de desarrollo:
    ```bash
    npm run dev
    ```
    La aplicación estará disponible en la URL que indique la consola (usualmente `http://localhost:5173`).
