import axios from 'axios';

export const post = async (resource: string, body, headers: any = { 'Access-Control-Allow-Origin': '*' }) => {
    return axios.post(`${process.env.APP_URL}/${resource}`, body, { headers })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error);
            throw error;
        });
};

export default { post };