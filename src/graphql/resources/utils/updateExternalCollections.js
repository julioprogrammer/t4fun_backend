const updateExternalCollections = async ({ collection, condition, fieldsToBeChanged }) => {
    let updated = await collection.find(condition).toArray();
    updated[0] = {
        ...updated[0],
        ...fieldsToBeChanged,
    };
    await collection.update(condition, updated[0]);
};

export default updateExternalCollections;
