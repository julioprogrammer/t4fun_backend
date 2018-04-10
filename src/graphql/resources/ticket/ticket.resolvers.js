import pubsub from '../../../pubsub';
import updateExternalCollections from '../utils/updateExternalCollections';

const buildFilters = ({OR = [], show_contains}) => {
    const filter = (show_contains) ? {} : null;
    if (show_contains) {
        filter.show = {$regex: `.*${show_contains}.*`};
    }

    let filters = filter ? [filter] : [];
    for (let i = 0; i < OR.length; i++) {
        filters = filters.concat(buildFilters(OR[i]));
    }
    return filters;
};

export const ticketResolvers = {
    Query: {

        allTickets: async (parent, { filter }, { mongo: { Tickets } }, info) => {
            let query = filter ? {$or: buildFilters(filter)} : {};
            return await Tickets.find(query).toArray();
        },

    },

    Mutation: {

        createTickets: async (parent, { show, pricing, convenienceFee, gate, availability = true }, { mongo: { Tickets } }, info) => {
            const newTicket = {
                key: Date.now().toString(),
                show,
                pricing,
                convenienceFee,
                gate,
                availability,
            };
            const response = await Tickets.insert(newTicket);
            newTicket.id = response.insertedIds[0];
            return newTicket;
        },

        updateTickets: async (parent, { keys }, { mongo: { Tickets, Shows } }, info) => {
            const oldTickets = await Tickets.find({
                key: { $in: keys }
            }).toArray();
            const updatedTickets = keys.map((key, index) => ({
                ...oldTickets[index],
                availability: false,
            }));
            keys.forEach(async (key, index) => {
                await Tickets.update({ key }, { ...updatedTickets[index] });
            });
            const numberOfTicketsMadeAvailable = await Tickets.find( { show: oldTickets[0].show, availability: true } ).count();
            if (!numberOfTicketsMadeAvailable) await updateExternalCollections({
                collection: Shows,
                condition: { key: oldTickets[0].show },
                fieldsToBeChanged: { availability: false },
            });
            return updatedTickets;
        },

        deleteTickets: async (parent, { key }, { mongo: { Tickets } }, info) => {
            const response = await Tickets.deleteOne({ key });
            return response.deletedCount === 1;
        }

    },

    Ticket: {
        id: parent => parent._id || parent.id,
    }
};