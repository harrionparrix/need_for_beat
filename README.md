# need_for_beat
# Musician Management GraphQL API

This repository contains a simple GraphQL API for managing musicians and their projects. The API allows you to perform CRUD operations on musicians and music projects, as well as retrieve information about them.

## Table of Contents
- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [GraphQL Schema](#graphql-schema)
- [Queries and Mutations](#queries-and-mutations)
- [Example Queries](#example-queries)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This GraphQL API is built using Apollo Server and is designed to manage information about musicians and their associated projects. The data is stored in-memory for simplicity, and the API supports basic CRUD operations for musicians and music projects.

## Prerequisites

Before you start, ensure you have the following installed:

- Node.js
- npm (Node Package Manager)

## Installation

1. Clone this repository:

   ```bash
   git clone <repository_url>
   ```

2. Navigate to the project directory:

   ```bash
   cd <project_directory>
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Usage

To start the GraphQL server, run the following command:

```bash
npm start
```

The server will be running at `http://localhost:3000`.

## GraphQL Schema

The GraphQL schema defines two main types: `Musician` and `MusicProject`. Here is a brief overview:

- **Musician**
  - `id`: ID!
  - `name`: String!
  - `bio`: String!
  - `instrument`: String!
  - `genres`: [String!]!
  - `projects`: [MusicProject!]!

- **MusicProject**
  - `id`: ID!
  - `title`: String!
  - `description`: String!
  - `genres`: [String!]!
  - `collaborators`: [Musician!]!

- **Query**
  - `musicians`: [Musician!]!
  - `musician(id: ID!): Musician`
  - `musicProjects`: [MusicProject!]!
  - `musicProject(id: ID!): MusicProject`

- **Mutation**
  - `addMusicians(m: AddMusician): Musician`
  - `deleteMusician(id: ID!): [Musician]`
  - `updateMusician(id: ID!, editMusician: editMusician): Musician`

- **Input Types**
  - `AddMusician`
    - `name`: String!
    - `bio`: String!
    - `instrument`: String!

  - `editMusician`
    - `bio`: String!
    - `instrument`: String!

## Queries and Mutations

- **Query**
  - `musicians`: Retrieve a list of all musicians.
  - `musician(id: ID!): Retrieve information about a specific musician.
  - `musicProjects`: Retrieve a list of all music projects.
  - `musicProject(id: ID!): Retrieve information about a specific music project.

- **Mutation**
  - `addMusicians(m: AddMusician): Add a new musician.
  - `deleteMusician(id: ID!): Delete a musician by ID.
  - `updateMusician(id: ID!, editMusician: editMusician): Update information about a musician.

## Example Queries

```graphql
# Retrieve information about all musicians
query {
  musicians {
    id
    name
    instrument
  }
}

# Add a new musician
mutation {
  addMusicians(m: {
    name: "New Musician",
    bio: "Talented artist with a passion for music.",
    instrument: "Drums"
  }) {
    id
    name
    instrument
  }
}

# Update information about a musician
mutation {
  updateMusician(id: "1", editMusician: {
    bio: "Updated bio",
    instrument: "Updated Instrument"
  }) {
    id
    bio
    instrument
  }
}

# Delete a musician
mutation {
  deleteMusician(id: "2") {
    id
    name
  }
}
```

## Contributing

Feel free to contribute to this project. Fork the repository, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
