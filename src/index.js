import express from 'express';
import bodyParser from 'body-parser';
import {
    graphqlExpress,
    graphiqlExpress,
} from 'apollo-server-express';
import {
    execute,
    subscribe,
} from 'graphql';
import {
    createServer
} from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import cors from 'cors';
import { apolloUploadExpress } from "apollo-upload-server";

import schema from './graphql/schema';
import connectMongo from './mongo-connector';

const PORT = process.env.GRAPHQL_PORT || 3003;

const start = async () => {

    const mongo = await connectMongo();
    const app = express();
    const buildOptions = async (req, res) => {
        return {
            context: {
                mongo
            },
            schema,
        };
    };

    app.use('/graphql', cors(), bodyParser.json(), apolloUploadExpress({ uploadDir: "./uploads/" }), graphqlExpress(buildOptions));
    app.use('/graphiql', graphiqlExpress({
        endpointURL: '/graphql',
        subscriptionsEndpoint: `ws://localhost:${PORT}/subscriptions`,
    }));

    const server = createServer(app);
    server.listen(PORT, () => {
        SubscriptionServer.create(
            { execute, subscribe, schema },
            { server, path: '/subscriptions' },
        );
        console.log(`T4Fun GraphQL server running on port ${PORT}.`)
    });

};

start();
