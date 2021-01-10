import axios from 'axios';

export default async function apiAxios(path){
    return axios.get(path);
}