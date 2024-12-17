import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { ApolloServerPluginInlineTraceDisabled } from '@apollo/server/plugin/disabled';

import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { getSchemaA } from './a/subgraph.js';
import { getSchemaB } from './b/subgraph.js';
import { getSchemaC } from './c/subgraph.js';

export const LOCAL_SUBGRAPH_CONFIG = [
  {
    name: 'a',
    getSchema: getSchemaA,
  },
  {
    name: 'b',
    getSchema: getSchemaB,
  },
  {
    name: 'c',
    getSchema: getSchemaC,
  }
];

const getLocalSubgraphConfig = (subgraphName) =>
  LOCAL_SUBGRAPH_CONFIG.find(it => it.name === subgraphName);

export const startSubgraphs = async (httpPort) => {
  // Create a monolith express app for all subgraphs
  const app = express();
  const httpServer = http.createServer(app);
  const serverPort = process.env.PORT ?? httpPort;

  // Run each subgraph on the same http server, but at different paths
  for (const subgraph of LOCAL_SUBGRAPH_CONFIG) {
    const subgraphConfig = getLocalSubgraphConfig(subgraph.name);
    const schema = subgraphConfig.getSchema();
    const server = new ApolloServer({
      schema,
      // For a real subgraph introspection should remain off, but for demo we enabled
      introspection: true,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer }), ApolloServerPluginInlineTraceDisabled()]
    });

    await server.start();

    const path = `/${subgraphConfig.name}/graphql`;
    app.use(
      path,
      cors(),
      bodyParser.json(),
      expressMiddleware(server, {
        context: async ({ req }) => ({ headers: req.headers })
      })
    );

    console.log(`Setting up [${subgraphConfig.name}] subgraph at http://localhost:${serverPort}${path}`);
  }

  // Start entire monolith at given port
  await new Promise((resolve) => httpServer.listen({ port: serverPort }, resolve));

  console.log('All subgraphs started.')
};
