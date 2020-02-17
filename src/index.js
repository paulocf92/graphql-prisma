const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("./generated/prisma-client");

// resolvers that map query to data retrieval
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: (root, args, context, info) => {
      return context.prisma.links();
    }
  },
  Mutation: {
    post: (root, { url, description }, context) => {
      return context.prisma.createLink({
        url,
        description
      });
    }
  }
};

// start up the server passing previously set schema/resolvers
const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: { prisma }
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
