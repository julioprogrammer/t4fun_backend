const showTypes = `

    # Show definition type
    type Show {
        id: ID!
        key: String!
        name: String!
        image: String!
        description: String
        cep: String!
        street: String!
        neighborhood: String!
        locality: String!
        uf: String!
        date: String!
        time: String!
        tickets: [Ticket!]!
    }

    type ShowSubscriptionPayload {
        mutation: _ModelMutationType!
        node: Show
    }

    input ShowSubscriptionFilter {
        mutation_in: [_ModelMutationType!]
    }
    
    input ShowFilter {
        OR: [ShowFilter!]
        key_contains: String
        name_contains: String
    }

    enum _ModelMutationType {
        CREATED
        UPDATED
        DELETED
    }

`;

const showQueries = `
    allShows(filter: ShowFilter): [Show!]!
`;

const showMutations = `
    createShows(name: String!, image: String!, description: String, cep: String!, date: String!, time: String!): Show!
    deleteShows(key: String!): Boolean!
`;

const showSubscriptions = `
    Show(filter: ShowSubscriptionFilter): ShowSubscriptionPayload
`;

export {
    showTypes,
    showQueries,
    showMutations,
    showSubscriptions
};