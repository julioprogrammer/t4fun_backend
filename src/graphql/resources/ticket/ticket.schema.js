const ticketTypes = `

    # Ticket definition type
    type Ticket {
        id: ID!
        key: String!
        show: ID!
        pricing: Float!
        convenienceFee: Float!
        gate: String!
        availability: Boolean!
    }

    type TicketSubscriptionPayload {
        mutation: _ModelMutationType!
        node: Ticket
    }

    input TicketSubscriptionFilter {
        mutation_in: [_ModelMutationType!]
    }
    
    input TicketFilter {
        OR: [ShowFilter!]
        show_contains: String
    }

`;

const ticketQueries = `
    allTickets(filter: TicketFilter): [Ticket!]!
`;

const ticketMutations = `
    createTickets(show: ID!, pricing: Float!, convenienceFee: Float!, gate: String!): Ticket!
    updateTickets(keys: [String!]): [Ticket!]!
    deleteTickets(key: String!): Boolean!
`;

const ticketSubscriptions = `
    Ticket(filter: TicketSubscriptionFilter): TicketSubscriptionPayload
`;

export {
    ticketTypes,
    ticketQueries,
    ticketMutations,
    ticketSubscriptions
};