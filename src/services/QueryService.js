import request from './Api';

const getQuery = async (query, limit) => {
    const endpoint = `search/?q=${query}&index=0&limit=${limit}&output=json`
    return await request(endpoint);
};

export default getQuery;
