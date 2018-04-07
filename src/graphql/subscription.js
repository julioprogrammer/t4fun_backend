import { showSubscriptions } from './resources/show/show.schema';
import { ticketSubscriptions } from './resources/ticket/ticket.schema';

const Subscription = `
    type Subscription {
        ${showSubscriptions}
        ${ticketSubscriptions}
    }
`;

export {
    Subscription,
}