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

export default { get };