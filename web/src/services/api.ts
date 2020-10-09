import axios from 'axios';

export const get = async (resource: string, headers: any = { 'Access-Control-Allow-Origin': '*' }) => {
    return axios.get(`${process.env.APP_URL}/${resource}`, { headers })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error);
            throw error;
        });
};

export const post = async (resource: string, body: any, headers: any = { 'Access-Control-Allow-Origin': '*' }) => {
    return axios.post(`${process.env.APP_URL}/${resource}`, body, { headers })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error);
            throw error;
        });
};

export default { get, post };