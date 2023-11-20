

PawFinder is a web application that allows users to search for dogs, add them to favorites, and generate matches based on their favorite dogs.

Table of Contents
Features
Getting Started
Usage
Folder Structure
Dependencies
Contributing
License
Features
User authentication for login/logout.
Dog search functionality with filtering and sorting options.
Ability to add dogs to favorites.
Generation of matches based on favorite dogs.
Getting Started
Clone the repository:
bash
Copy code
git clone [repository-url]
cd pawfinder
Install dependencies:
bash
Copy code
npm install
Set up environment variables:

Duplicate the .env.example file and rename it to .env.
Populate the required environment variables.
Run the development server:

bash
Copy code
npm start
Open your browser and visit http://localhost:3000.
Usage
If you are a new user, click on the "Login" button to enter your name and email.
Explore the dog search functionality to find your favorite dogs.
Add dogs to your favorites and generate matches.
Folder Structure
lua
Copy code
pawfinder/
|-- src/
|   |-- components/
|   |   |-- AuthContext.tsx
|   |   |-- DogCard.tsx
|   |   |-- DogSearchComponent.tsx
|   |   |-- Login.tsx
|   |   |-- Logout.tsx
|   |-- api/
|   |-- styles/
|   |-- App.tsx
|   |-- index.tsx
|-- public/
|-- .env.example
|-- README.md
|-- package.json
|-- ...
Dependencies
React
Styled-components
Material-UI
Axios
