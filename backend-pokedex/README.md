# Backend Pokedex API

Professional REST API built with Ruby on Rails 7, designed to proxy requests to PokeAPI and handle user authentication.

## 🛠 Tech Stack

*   **Ruby**: 3.2.0
*   **Rails**: 7.2.3 (API Mode)
*   **Database**: SQLite
*   **Authentication**: Devise (Username based)
*   **HTTP Client**: Faraday
*   **Testing**: RSpec

## 🚀 Getting Started

### Prerequisites

*   Ruby 3.2.0
*   Bundler

### Installation

1.  **Clone the repository**
    ```bash
    git clone <repository_url>
    cd backend-pokedex
    ```

2.  **Install Dependencies**
    ```bash
    bundle install
    ```

3.  **Database Setup**
    This will create the database, run migrations, and seed the default admin user.
    ```bash
    bin/rails db:setup
    ```

### 🔑 Authentication

The project comes with a default admin user seeded:

*   **Username**: `admin`
*   **Password**: `admin`

## 🏃 Running the Application

Start the Rails server:

```bash
bin/rails server
```

The API will be available at `http://localhost:3000`.

## 🧪 Running Tests

This project uses RSpec for testing. Run the full test suite with:

```bash
bundle exec rspec
```

## 📡 API Endpoints

### Authentication

*   **POST** `/pokemon/auth`
    *   **Body**: `{ "username": "admin", "password": "admin" }`
    *   **Response**: Returns user details and a mock session token. Establishes a session cookie.

*   **DELETE** `/pokemon/logout`
    *   **Response**: Logs out the current user.

### Pokemon (Proxy)

*   **GET** `/pokemon`
    *   **Params**: `search` (optional name filter), `limit`, `offset`
    *   **Description**: Fetches a list of Pokemon from PokeAPI.

*   **GET** `/pokemon/:id`
    *   **Description**: Fetches details for a single Pokemon.
