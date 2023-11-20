# PawFinder

PawFinder is a web application that allows users to search for dogs, add them to favorites, and generate matches based on their favorite dogs.

## Features

- User authentication for login/logout.
- Dog search functionality with filtering and sorting options.
- Ability to add dogs to favorites.
- Generation of matches based on favorite dogs.

## Getting Started

1. **Clone the repository:**

    ```bash
    git clone [repository-url]
    cd pawfinder
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

4. **Run the development server:**

    ```bash
    npm start
    ```

5. **Open your browser and visit:**

    [http://localhost:3000](http://localhost:3000)

## Usage

- If you are a new user, enter your 'Name' and 'Email' then click on the "Login" button to enter the website.
- Explore the dog search functionality to find your favorite dogs.
- Add dogs to your favorites and generate matches.

## Folder Structure

pawfinder/
|-- src/
| |-- components/
| | |-- AuthContext.tsx
| | |-- DogCard.tsx
| | |-- DogSearchComponent.tsx
| | |-- Login.tsx
| | |-- Logout.tsx
| |-- api/
| |-- styles/
| |-- App.tsx
| |-- index.tsx
|-- public/
|-- .env.example
|-- README.md
|-- package.json
|-- ...


## Dependencies

- React
- Styled-components
- Material-UI
- Axios
