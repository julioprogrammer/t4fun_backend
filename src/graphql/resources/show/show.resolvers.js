import axios from 'axios';

import pubsub from '../../../pubsub';

const fetchToApiCEP = (cep) => {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    const config = {
        method: 'get',
        url,
    };
    return axios(config);
};

const mountObjectNewShow = async ({ name, image, description = '', cep, date, time }) => {
    const cepRequest = await fetchToApiCEP(cep)
        .then(res => {
            return res.data;
        })
        .catch(e => console.log(e));
    return {
        key: Date.now().toString(),
        name,
        image,
        description,
        cep,
        street: cepRequest.logradouro,
        neighborhood: cepRequest.bairro,
        locality: cepRequest.localidade,
        uf: cepRequest.uf,
        date,
        time,
    };
};

const buildFilters = ({OR = [], key_contains, name_contains}) => {
    const filter = (key_contains || name_contains) ? {} : null;
    if (key_contains) {
        filter.key = {$regex: `.*${key_contains}.*`};
    }
    if (name_contains) {
        filter.name = {$regex: `.*${name_contains}.*`};
    }

    let filters = filter ? [filter] : [];
    for (let i = 0; i < OR.length; i++) {
        filters = filters.concat(buildFilters(OR[i]));
    }
    return filters;
};

export const showResolvers = {
    Query: {

        allShows: async (parent, { filter }, { mongo: { Shows } }, info) => {
            let query = filter ? {$or: buildFilters(filter)} : {};
            return await Shows.find(query).toArray();
        },

    },

    Mutation: {

        createShows: async (parent, args, { mongo: { Shows } }, info) => {
            const newShow = mountObjectNewShow(args);
            const response = await Shows.insert(newShow);
            newShow.id = response.insertedIds[0];
            return newShow;
        },

        deleteShows: async (parent, { key }, { mongo: { Shows } }, info) => {
            const response = await Shows.deleteOne({key});
            return response.deletedCount === 1;
        }

    },

    Show: {
        id: parent => parent._id || parent.id,
        tickets: async (parent, args, { mongo: { Tickets } }, info) => {
            return await Tickets.find({ show: parent._id.toString() }).toArray();
        }
    }
};