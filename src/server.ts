import "reflect-metadata";
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { AppointmentsResolvers } from './resolvers/appointments-resolvers';
import path from "node:path"

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [AppointmentsResolvers],
    emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
  });

  const server = new ApolloServer({
    schema
  })

  const { url } = await server.listen(4001);

  console.log(`HTTP server ready at ${url}`)
}

bootstrap();