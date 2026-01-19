# Challenge Project

This repository contains the backend and frontend projects. Below are the stacks and instructions to run each of them.

## User Story: The Pokédex Explorer
**Title:** Access and Consultation of the Pokémon Database

As an **Authorized Pokémon Trainer (Admin User)**, I want to securely log in and access a centralized Pokémon directory, so that I can search, sort, and consult technical details (abilities, moves) of each species and prepare my strategies.

### Acceptance Criteria

These points define when the story is "done" and will serve as a guide for your tests (TDD).

#### 1. Authentication and Security
- Given I am on the Login screen, when I enter the credentials admin / admin, then I should be redirected to the main page.
- Given I enter incorrect credentials, then the system should display a validation error from the backend.
- Given I have not logged in, if I attempt to access protected routes (Main or Detail), then I should be redirected to the Login.
- Given I have already logged in, if I attempt to return to the Login, then I should be redirected automatically to the Main page.

#### 2. Visualization and Navigation (Dashboard)
- Given I am on the main page, I want to see a paginated list of Pokémon showing their photo, name, and number.
- I want to be able to sort this list by both name and number to quickly locate species.
- I want to have a search bar to filter specific Pokémon.

#### 3. Pokémon Detail
- Given I select a Pokémon from the list, then I want to navigate to a detail view.
- In the detail view, I want to see extended information including its abilities, moves, and forms.

## Backend (API)

The backend is built with **Ruby on Rails**.

**Stack:**
- Ruby: 3.2.0
- Rails: 7.1
- Database: SQLite3

**Installation and Execution:**

1.  Navigate to the backend folder:
    ```bash
    cd backend-pokedex
    ```
2.  Install dependencies:
    ```bash
    bundle install
    ```
3.  Configure the database:
    ```bash
    rails db:setup
    ```
4.  Start the server:
    ```bash
    rails s
    ```
    The server will run at `http://localhost:3000`.

## Frontend (App)

The frontend is built with **React** using **Vite**.

**Stack:**
- React 19
- Vite
- TypeScript
- TailwindCSS

**Installation and Execution:**

1.  Navigate to the frontend folder:
    ```bash
    cd frontend-pokedex
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
    The application will be available at the URL indicated in the console (usually `http://localhost:5173`).
