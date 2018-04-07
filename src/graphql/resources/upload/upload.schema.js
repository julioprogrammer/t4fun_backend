const uploadTypes = `

    # Upload definition type
    input Upload {
        id: ID!
        name: String!
        type: String!
        size: Int!
        path: String!
        show: ID!
    }

`;

const uploadQueries = `
    hello: String
`;

const uploadMutations = `
    uploadFile(file: Upload!): Boolean!
`;

export {
    uploadTypes,
    uploadQueries,
    uploadMutations,
};