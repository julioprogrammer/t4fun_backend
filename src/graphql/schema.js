import { makeExecutableSchema } from 'graphql-tools';
import { merge } from 'lodash';

import { Query } from './query';
import { Mutation } from './mutation';
import { Subscription } from './subscription';

import { showTypes } from './resources/show/show.schema';
import { ticketTypes } from './resources/ticket/ticket.schema';
import { uploadTypes } from './resources/upload/upload.schema';

import { showResolvers } from './resources/show/show.resolvers';
import { ticketResolvers } from './resources/ticket/ticket.resolvers';

const resolvers = merge(
    showResolvers,
    ticketResolvers,
);

const SchemaDefinition = `
    type Schema {
        query: Query
        mutation: Mutation
        subscription: Subscription
    }
`;

export default makeExecutableSchema({
    typeDefs: [
        SchemaDefinition,
        Query,
        Mutation,
        Subscription,
        showTypes,
        ticketTypes,
        uploadTypes,
    ],
    resolvers
});