import request from './Api';

const getTracks = async (template, code, limit) => {
    const endpoint = template === 'chart' 
        ? `chart/${code}/tracks?limit=${limit}` 
        : `artist/${code}/top?limit=${limit}`;

    return await request(endpoint);
};

export default getTracks;
