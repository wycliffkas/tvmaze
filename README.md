# The Movies Database(Tv Maze)

A creative web application that uses `Tv maze api` to enable users keep track of their TV Shows.

## Features

- Register Users
- Login Users
- Display movies and their details
- Search for a movie by name, premiere data, status, genre or rating
- Add movies to watch list
- Add movies to favorite

## How to run the application

#### requirements

- Before you run the application make sure the following are installed
- `Node, npm or yarn`

#### installation

- Clone the repository on the local environment by running:
  `git clone https://github.com/wycliffkas/tvmaze.git`
- Create a .env file and add the variables below:
 `MONGO_DB_CONNECTION_STRING=<Mongo database connection string>`
 `JWT_SECRET=<jwt secret key>`
- Run `npm install` if you use npm or `yarn` if you use yarn, inorder to install dependencies in both the server and client directories.
- Run `yarn dev` to launch the app which will automatically launch the app in the browser.

## Available Scripts

In the project directory, you can run:

#### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
