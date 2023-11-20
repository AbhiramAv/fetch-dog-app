# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


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
