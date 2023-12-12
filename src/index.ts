import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

let db= [
      {
        id: "1",
        name: "John Doe",
        bio: "A talented musician with a passion for jazz and blues.",
        instrument: "Guitar",
        genres: ["Jazz", "Blues", "Rock"],
        projects: [
          {
            id: "101",
            title: "Groovy Blues",
            description: "A soulful blues project with a modern twist.",
            genres: ["Blues", "Rock"],
            collaborators: [
              {
                id: "2",
                name: "Jane Smith",
                bio: "Versatile musician with a love for experimental music.",
                instrument: "Piano",
                genres: ["Experimental", "Jazz"],
                projects: [],
              },
            ],
          },
          {
            id: "102",
            title: "Jazz Fusion Journey",
            description: "Exploring the fusion of jazz with various styles.",
            genres: ["Jazz", "Fusion"],
            collaborators: [],
          },
        ],
      },
      {
        id: "2",
        name: "Jane Smith",
        bio: "Versatile musician with a love for experimental music.",
        instrument: "Piano",
        genres: ["Experimental", "Jazz"],
        projects: [
          {
            id: "101",
            title: "Groovy Blues",
            description: "A soulful blues project with a modern twist.",
            genres: ["Blues", "Rock"],
            collaborators: [
              {
                id: "1",
                name: "John Doe",
                bio: "A talented musician with a passion for jazz and blues.",
                instrument: "Guitar",
                genres: ["Jazz", "Blues", "Rock"],
                projects: [],
              },
            ],
          },
        ],
      },
]

const typeDefs = `#graphql

type Musician {
  id: ID!
  name: String!
  bio: String!
  instrument: String!
  genres: [String!]!
  projects: [MusicProject!]!
}

type MusicProject {
  id: ID!
  title: String!
  description: String!
  genres: [String!]!
  collaborators: [Musician!]!
}

type Query {
  musicians: [Musician!]!
  musician(id: ID!): Musician
  musicProjects: [MusicProject!]!
  musicProject(id: ID!): MusicProject
}
type Mutation{
  addMusicians(m: AddMusician): Musician
  deleteMusician(id: ID!): [Musician]
  updateMusician(id: ID! , editMusician: editMusician): Musician 
}
input AddMusician{
  name: String!
  bio: String!
  instrument: String!
}
input editMusician{
  bio: String!
  instrument: String!
}
`;

const resolvers = {
  Query: {
    musicians: () => db,
    musicProjects: () => db.flatMap((m) => m.projects),
    musician: (_, { id }) => db.find((m) => m.id === id),
    musicProject: (_, { id }) =>
      db.flatMap((m) => m.projects).find((p) => p.id === id),
  },
  Mutation: {
    addMusicians(_, args) {
      let m = {
        ...args.m,
        id: Math.floor(Math.random() * 1000).toString(),
      };
      db.push(m);
      return m;
    },
    deleteMusician(_, args) { 
      db= db.filter((m) => m.id !== args.id);
      return db;
    },
    updateMusician(_, args) {
      let m= db.find((m) => m.id === args.id);
      m.bio = args.editMusician.bio;
      m.instrument = args.editMusician.instrument;

      return m;
    }
  },
};

/*
query FindMusicProject($projectId: ID!) {
  musicProject(id: $projectId) {
    id
    title
    description
    genres
    collaborators {
      id
      name
      instrument
    }
  }
}
*/




const server = new ApolloServer({
  typeDefs,
  resolvers
});

const {url} = await startStandaloneServer(server,{
    listen: {port: 3000}
})

console.log("server is ready on 3000");
