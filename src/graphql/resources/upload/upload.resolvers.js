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

export const uploadResolvers = {
    Query: {

        hello: () => "hi"

    },

    Mutation: {

        uploadFile: async (parent, { file }, { mongo: { Uploads } }, info) => {
            console.log(file);
            return true;
        }

    },
};