import { showQueries } from './resources/show/show.schema';
import { ticketQueries } from './resources/ticket/ticket.schema';
import { uploadQueries } from './resources/upload/upload.schema';

const Query = `
    type Query {
        ${showQueries}
        ${ticketQueries}
        ${uploadQueries}
    }
`;

export {
    Query,
}