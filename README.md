# Task Creation APP
![Task Creation](![alt text](task_creation.png))

This is a Task Creation App that allows users to create tasks, assign tasks to users, and mark tasks as completed. The app is built with Django and Django REST Framework.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Testing](#testing)
5. [API Documentation](#api-documentation)
6. [Contributing](#contributing)
7. [License](#license)

## Getting Started

To get started with the Task Creation App, follow the instructions below to set up the project locally.

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/ezeisraeljohn/task_creation.git
    cd task_creation
    ```

2. **Set up a virtual environment:**

    ```bash
    python -m venv .venv
    source .venv/bin/activate  # On Windows use `.venv\Scripts\activate`
    ```

3. **Install the dependencies:**

    ```bash
    pip install -r requirements.txt
    ```

4. **Configure the database:**

    Ensure you have a PostgreSQL or MySQL database set up. Update the database settings in the `task_creatopm/settings.py` file.

    ```python
    DATABASE_URL = "postgresql://username:password@localhost/dbname"
    ```

5. **Apply the migrations:**

    ```bash
    python3 manage.py makemigrations
    python3 manage.py migrage
    ```

6. **Run the server:**

    ```bash
    python3 manage.py runserver
    ```

## Usage

Once the server is running, you can interact with the Application using the link http://127.0.0.1:8000

## Testing

## API Documentation

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b my-feature-branch`.
3. Make your changes.
4. Commit your changes: `git commit -m 'Add some feature'`.
5. Push to the branch: `git push origin my-feature-branch`.
6. Create a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
