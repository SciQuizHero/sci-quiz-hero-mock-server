# Science Quiz Mock Server

This is a mock web server built using Node.js and Express.js. It serves various science quiz questions for different categories.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Getting Started](#getting-started)
3. [Usage](#usage)
4. [Endpoints](#endpoints)
5. [Contributing](#contributing)
6. [License](#license)

## Prerequisites

Ensure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/) 18.x or later
- [yarn](https://classic.yarnpkg.com/) 1.x or later

## Getting Started

1. Clone this repository:

```bash
git clone https://github.com/SciQuizHero/sci-quiz-hero-mock-server.git
```

2. Install dependencies:

```bash
yarn install
```
3. Run the server:

```bash
node app.js
```
The server will start running at localhost:3000.

## Usage

The server provides a RESTful API to retrieve quiz questions based on category, size, and difficulty level.

## Endpoints

GET endpoint

**/quizzes?category=:category&size=:size&difficulty=:difficulty** 

- `:category` the category of science you want to quiz on, 
- `:size` the number of questions you want
- `:difficulty` the difficulty level (`easy`, `medium`, or `hard`). 

The server responds with a JSON object containing the requested quiz questions.

## Contributing

We welcome contributions from the community. To contribute:

1. Fork this repository.
2. Create your feature branch (`git checkout -b feature/fooBar`).
3. Commit your changes (`git commit -am 'Add some fooBar'`).
4. Push to the branch (`git push origin feature/fooBar`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License. See [`LICENSE`](LICENSE) for more details.



