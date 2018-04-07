import { showMutations } from './resources/show/show.schema';
import { ticketMutations } from './resources/ticket/ticket.schema';
import { uploadMutations } from './resources/upload/upload.schema';

const Mutation = `
    type Mutation {
        ${showMutations}
        ${ticketMutations}
        ${uploadMutations}
    }
`;

export {
    Mutation,
}